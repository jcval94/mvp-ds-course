#!/usr/bin/env python3
"""Semantic browser QA for the five-level GitHub Pages build."""

from __future__ import annotations

import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "playwright"
BASE = "http://127.0.0.1:4174"
LEVEL_DIRS = {
    1: "data-class-foundations-level-1",
    2: "data-class-description-level-2",
    3: "data-class-probability-level-3",
    4: "data-class-relationships-level-4",
    5: "data-class-modeling-level-5",
}


def payload(level: int) -> dict[str, object]:
    path = ROOT / "generated" / LEVEL_DIRS[level] / "assets" / "curriculum.js"
    text = path.read_text(encoding="utf-8").strip()
    prefix = "window.DCF_LEVEL = "
    if level == 2:
        prefix = "window.DCF_LEVEL2 = "
    if level == 1:
        raise ValueError("Nivel 1 usa módulos independientes")
    return json.loads(text[len(prefix):-1])


def manifest(level: int) -> dict[str, object]:
    return json.loads((ROOT / "generated" / LEVEL_DIRS[level] / "manifest.json").read_text(encoding="utf-8"))


def no_overflow(page, label: str) -> None:
    if page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth"):
        raise AssertionError(f"Desbordamiento horizontal: {label}")


def test_continuous_levels(page, payloads: dict[int, dict[str, object]]) -> None:
    exercised = 0
    for level in (3, 4, 5):
        for module in payloads[level]["modules"].values():
            for lesson in module["lessons"]:
                url = f"{BASE}/labs/level-{level}/{module['href']}?concept={lesson['id']}"
                page.goto(url, wait_until="networkidle")
                assert page.locator("#title").inner_text() == lesson["title"]
                assert page.locator("#sceneId").inner_text() == lesson["narrative"]["scene"]
                assert page.locator("#donJuan").inner_text() == lesson["narrative"]["donJuan"]
                assert page.locator("#paco").inner_text() == lesson["narrative"]["paco"]
                assert page.locator("#subtitle").inner_text() == lesson["narrative"]["subtitles"][0]
                assert page.get_by_role("button", name="En vivo").count() == 0
                for exercise_index, tab_name in enumerate(("Guiado", "Transferencia")):
                    if exercise_index:
                        page.get_by_role("button", name=tab_name).click()
                    assert not page.locator("#check").is_enabled()
                    assert "Recorre" in page.locator("#feedback").inner_text()
                    for _ in range(len(lesson["visual"]["states"]) - 1):
                        page.locator("#advance").click()
                    assert page.locator("#check").is_enabled()
                    assert page.locator("#subtitle").inner_text() == lesson["narrative"]["subtitles"][-1]
                    correct_index = next(i for i, option in enumerate(lesson["exercises"][exercise_index]["options"]) if option["correct"])
                    page.locator(f'input[name="answer"][value="{correct_index}"]').check()
                    page.locator("#check").click()
                    assert "Correcto" in page.locator("#feedback").inner_text() or "transferencia" in page.locator("#feedback").inner_text().lower()
                    exercised += 1
                no_overflow(page, f"Nivel {level} {lesson['id']}")
    # 19×2 + 15×2 + 18×2 = 104; this preserves the approved global total of 164.
    assert exercised == 104


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifests = {level: manifest(level) for level in LEVEL_DIRS}
    payloads = {level: payload(level) for level in (2, 3, 4, 5)}
    console_errors: list[str] = []
    page_errors: list[str] = []
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT / "_site"))
    server = ThreadingHTTPServer(("127.0.0.1", 4174), handler)
    Thread(target=server.serve_forever, daemon=True).start()

    with sync_playwright() as playwright:
        try:
            browser = playwright.chromium.launch(channel="chrome", headless=True)
        except Exception:
            browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 1000}, reduced_motion="reduce")
        page = context.new_page()
        page.on("console", lambda msg: console_errors.append(f"{msg.type}: {msg.text}") if msg.type in {"error", "warning"} else None)
        page.on("pageerror", lambda error: page_errors.append(str(error)))

        page.goto(BASE, wait_until="networkidle")
        assert page.title() == "Resultados | DataClass Forge"
        page.locator("#summaryRail").get_by_text("91", exact=True).wait_for()
        page.locator("#summaryRail").get_by_text("164", exact=True).wait_for()
        assert page.locator(".level-group").count() == 5
        assert page.locator(".catalog-row").count() == 22
        assert page.locator(".data-row:not(.header)").count() == 3
        no_overflow(page, "portal desktop")
        page.screenshot(path=OUTPUT / "github-pages-desktop.png", full_page=True)

        page.locator("#search").fill("Modelado")
        assert page.locator(".catalog-row:not([hidden])").count() >= 1
        page.locator("#search").fill("")
        page.get_by_role("button", name="Nivel 5").click()
        assert page.locator('.level-group[data-level="5"]:not([hidden])').count() == 1

        # Regression coverage: existing levels remain reachable and interactive.
        for level, href in [(1, manifests[1]["blocks"][0]["href"]), (2, manifests[2]["blocks"][0]["href"] + "?concept=mean")]:
            page.goto(f"{BASE}/labs/level-{level}/{href}", wait_until="networkidle")
            assert page.get_by_role("link", name="HOME").count() >= 1
            no_overflow(page, f"Nivel {level} representative")

        test_continuous_levels(page, payloads)

        representative = [
            (3, "probabilidad-basica.html?concept=event", "level-3-event-desktop.png"),
            (4, "confusion.html?concept=aggregation-bias", "level-4-aggregation-desktop.png"),
            (5, "regresion-lineal.html?concept=fit", "level-5-fit-desktop.png"),
            (5, "preparacion-variables.html?concept=leakage", "level-5-leakage-desktop.png"),
        ]
        for level, route, filename in representative:
            page.goto(f"{BASE}/labs/level-{level}/{route}", wait_until="networkidle")
            page.screenshot(path=OUTPUT / filename, full_page=True)

        for level, route in [(3, "probabilidad-basica.html?concept=event"), (4, "confusion.html?concept=aggregation-bias"), (5, "preparacion-variables.html?concept=leakage")]:
            page.goto(f"{BASE}/labs/level-{level}/{route}&teacher=1", wait_until="networkidle")
            button = page.get_by_role("button", name="En vivo")
            assert button.count() == 1
            button.click()
            page.get_by_text("Modo docente oculto", exact=True).wait_for()
            assert "filas" in page.locator("#teacherContent").inner_text()

        # Motion enabled uses a real transition; reduced motion disables it.
        motion = browser.new_context(viewport={"width": 1280, "height": 800}, reduced_motion="no-preference")
        motion_page = motion.new_page()
        motion_page.goto(f"{BASE}/labs/level-5/regresion-lineal.html?concept=fit", wait_until="networkidle")
        duration = motion_page.locator(".bar-row i").first.evaluate("el => getComputedStyle(el).transitionDuration")
        assert duration not in {"0s", "0ms"}
        motion_page.locator("#advance").click()
        assert motion_page.locator("#check").is_enabled()
        motion.close()

        mobile = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        mobile_page = mobile.new_page()
        mobile_page.on("console", lambda msg: console_errors.append(f"mobile {msg.type}: {msg.text}") if msg.type in {"error", "warning"} else None)
        mobile_page.on("pageerror", lambda error: page_errors.append(f"mobile: {error}"))
        mobile_page.goto(BASE, wait_until="networkidle")
        no_overflow(mobile_page, "portal mobile")
        mobile_page.screenshot(path=OUTPUT / "github-pages-mobile.png", full_page=True)
        for level, route, filename in [
            (3, "probabilidad-basica.html?concept=event", "level-3-event-mobile.png"),
            (4, "confusion.html?concept=aggregation-bias", "level-4-aggregation-mobile.png"),
            (5, "preparacion-variables.html?concept=leakage", "level-5-leakage-mobile.png"),
        ]:
            mobile_page.goto(f"{BASE}/labs/level-{level}/{route}", wait_until="networkidle")
            no_overflow(mobile_page, f"Nivel {level} mobile")
            assert not mobile_page.locator("#check").is_enabled()
            mobile_page.locator("#advance").click()
            assert mobile_page.locator("#check").is_enabled()
            mobile_page.screenshot(path=OUTPUT / filename, full_page=True)
        mobile.close(); context.close(); browser.close()

    server.shutdown(); server.server_close()
    if console_errors or page_errors:
        raise AssertionError("Errores de navegador:\n" + "\n".join([*console_errors, *page_errors]))
    print("QA de navegador aprobada: portal, 5 niveles, 52 escenas nuevas, 104 ejercicios, modo docente, movimiento, móvil y consola.")


if __name__ == "__main__":
    main()
