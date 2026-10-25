#!/usr/bin/env python3
"""Walk public case intros from dist/ without login or requests to external services."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
from threading import Thread
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / os.environ.get("QA_SCREENSHOT_DIR", "output/qa")


def check_intro(browser, base, case, viewport, motion, label):
    print(f"Checking {case} {label} {motion}", flush=True)
    context = browser.new_context(viewport=viewport, reduced_motion=motion)
    # Fail on any accidental attempt to load external content; candidates stay unloaded.
    external, errors, missing = [], [], []

    def route_request(route):
        if route.request.url.startswith(base):
            route.continue_()
        else:
            external.append(route.request.url)
            route.abort()

    context.route("**/*", route_request)
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.on("response", lambda response: missing.append(response.url) if response.status >= 400 else None)
    response = page.goto(f"{base}casos/{case}/", wait_until="networkidle")
    assert response.status == 200
    page.wait_for_function("() => window.__intro && window.__intro.estado()")
    if motion == "no-preference":
        page.locator("#aut").click()
    assert page.locator("#aut").inner_text() == "AUTO: NO"
    scenes = page.evaluate("() => CASO.escenas.length")
    visited = []
    for scene in range(scenes):
        page.wait_for_function("n => __intro.estado().n === n && !__intro.estado().trans", arg=scene)
        if motion == "no-preference":
            page.wait_for_function("() => __intro.estado().linea >= 0")
        visited.append(scene)
        # Advance narration using the actual button, never __intro.ir() or SALTAR.
        for _ in range(20):
            if page.evaluate("() => __intro.estado().fin"):
                break
            if not page.locator("#sig").is_visible():
                # The final line hides SIGUIENTE while its typewriter finishes.
                page.wait_for_function("() => __intro.estado().fin")
                break
            page.locator("#sig").press("Enter")
        assert page.evaluate("() => __intro.estado().fin"), page.evaluate("() => {const s=__intro.estado();return {n:s.n,linea:s.linea,fin:s.fin,tecleo:!!s.tecleo,texto:s.texto}}")
        for hot in page.locator("[data-hot]").all():
            hot.press("Enter")
        for button in page.locator("#extra > button").all():
            if button.is_enabled():
                button.press("Enter")
        assert not page.evaluate("() => document.documentElement.scrollWidth > innerWidth")
        assert page.locator("#sr").inner_text().strip()
        if case == "1-1" and scene == 2:
            page.wait_for_function("() => document.querySelector(\"[data-id=cnt]\").textContent === \"AGUJEROS: 1,481\"")
            assert page.locator('[data-id="cnt"]').text_content() == "AGUJEROS: 1,481"
            assert page.locator('[data-d][style*="opacity: 1"]').count() == 149
            page.screenshot(path=OUTPUT / f"intro-{case}-{label}-{motion}-map.png", full_page=True)
        if scene < scenes - 1:
            # Reduced motion initially concatenates the narration while leaving linea=-1.
            # Exercise the same button until it advances, including those narration steps.
            for _ in range(20):
                if page.evaluate("n => __intro.estado().n !== n", scene):
                    break
                page.locator("#sig").press("Enter")
                if motion == "no-preference" and page.evaluate("() => __intro.estado().trans"):
                    page.wait_for_function("n => __intro.estado().n !== n", arg=scene)
            assert page.evaluate("n => __intro.estado().n === n + 1", scene)
    assert visited == list(range(scenes))
    page.locator("#cta").wait_for(state="visible")
    assert "SIN RESOLVER" in page.locator("#juego").inner_text()
    if motion == "reduce":
        assert page.evaluate("() => document.getAnimations().length") == 0
    # Exercise every internal link, including dynamic CTA and SITIO, without following externals.
    links = page.locator("a[href]").evaluate_all("nodes => nodes.map(n => n.href)")
    for href in links:
        if urlsplit(href).netloc == urlsplit(base).netloc:
            assert context.request.get(href).status == 200, href
    if case == "1-1":
        assert page.locator("#cta").get_attribute("href") == "../../colab.html"
        page.screenshot(path=OUTPUT / f"intro-{case}-{label}-{motion}-final.png", full_page=True)
    page.locator("#repetir").press("Enter")
    page.wait_for_function("() => __intro.estado().n === 0")
    assert not errors, errors
    assert not missing, missing
    assert not external, external
    context.close()
    return {"case": case, "viewport": label, "motion": motion, "scenes": scenes}


def main():
    assert (ROOT / "dist/index.html").is_file(), "Ejecuta python -m harness build"
    OUTPUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(SimpleHTTPRequestHandler, directory=str(ROOT / "dist")))
    Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_port}/"
    results = []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            for case in ("1-1", "4-1", "4-2"):
                for label, viewport in (("desktop", {"width": 1440, "height": 1000}),
                                        ("mobile", {"width": 390, "height": 844})):
                    for motion in ("reduce", "no-preference"):
                        results.append(check_intro(browser, base, case, viewport, motion, label))
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    print("OK case intros · " + json.dumps(results))


if __name__ == "__main__":
    main()
