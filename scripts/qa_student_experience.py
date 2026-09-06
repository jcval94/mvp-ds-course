#!/usr/bin/env python3
"""Browser QA for the student-first experience across desktop, tablet and phone."""

from __future__ import annotations

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE = "http://127.0.0.1:4175"
BUILD = ROOT / "_site"

LEVEL3_CODE_ROUTES = [
    ("probabilidad-basica.html", "event"),
    ("probabilidad-basica.html", "complement"),
    ("probabilidad-basica.html", "independence"),
    ("probabilidad-basica.html", "conditional-probability"),
    ("variables-aleatorias.html", "bernoulli"),
    ("variables-aleatorias.html", "binomial"),
    ("variables-aleatorias.html", "normal"),
    ("variables-aleatorias.html", "poisson"),
    ("muestreo.html", "sampling-variability"),
    ("muestreo.html", "selection-bias"),
    ("muestreo.html", "law-large-numbers"),
    ("muestreo.html", "standard-error"),
    ("incertidumbre.html", "confidence-interval"),
    ("incertidumbre.html", "bootstrap"),
    ("pruebas-hipotesis.html", "hypothesis"),
    ("pruebas-hipotesis.html", "p-value"),
    ("pruebas-hipotesis.html", "type-i-error"),
    ("pruebas-hipotesis.html", "type-ii-error"),
    ("pruebas-hipotesis.html", "power"),
]


def no_overflow(page, label: str) -> None:
    overflow = page.evaluate(
        "() => document.documentElement.scrollWidth > document.documentElement.clientWidth"
    )
    if overflow:
        raise AssertionError(f"Desbordamiento horizontal: {label}")


def minimum_touch_target(page, selector: str, minimum: int = 44) -> None:
    box = page.locator(selector).first.bounding_box()
    if not box or box["height"] < minimum:
        raise AssertionError(f"Target táctil menor a {minimum}px: {selector} -> {box}")


def assert_home(page) -> None:
    page.goto(BASE, wait_until="networkidle")
    page.get_by_text("The Agentic Data Scientist", exact=True).first.wait_for()
    page.get_by_role("heading", name="Ciencia de datos que se entiende, se practica y se usa.").wait_for()
    page.get_by_text("Historia", exact=True).first.wait_for()
    page.get_by_text("Intuición", exact=True).first.wait_for()
    page.get_by_text("Visual", exact=True).first.wait_for()
    page.get_by_text("Código", exact=True).first.wait_for()
    page.get_by_text("Decisión", exact=True).first.wait_for()
    assert page.locator("#continueLink").count() == 1
    assert page.locator("#catalog .catalog-row").count() == 63
    no_overflow(page, "student home")


def assert_placement(page) -> None:
    page.goto(f"{BASE}/placement.html", wait_until="networkidle")
    page.get_by_role("heading", name="No estudies lo que ya sabes.").wait_for()
    page.get_by_text("≈ 5 min", exact=True).wait_for()
    page.get_by_text("≤ 10", exact=True).wait_for()
    page.get_by_text("No requiere", exact=True).wait_for()
    page.get_by_text("Ruta personal", exact=True).wait_for()
    assert page.locator("#optionGrid button").count() == 4
    assert page.locator("#submitAnswer").is_disabled()
    page.locator("#optionGrid button").first.click()
    assert page.locator("#submitAnswer").is_enabled()
    page.locator("#submitAnswer").click()
    assert page.locator("#submitAnswer").is_hidden()
    assert page.locator("#nextQuestion").is_visible()
    no_overflow(page, "student diagnostic")


def assert_level_three_vertical_slice(page) -> None:
    url = f"{BASE}/labs/level-3/probabilidad-basica.html?concept=event"
    page.goto(url, wait_until="networkidle")
    assert page.locator("body").get_attribute("data-experience-contract") == "level-shell-v1"
    assert page.locator(".journey-rail li").count() == 5
    for phase in ("Historia", "Intuición", "Visual", "Código", "Decisión"):
        page.get_by_text(phase, exact=True).first.wait_for()
    assert page.locator("#intuitionDefinition").inner_text().strip()
    assert page.locator("#codeLab").is_visible()
    snippet = page.locator("#codeSnippet").inner_text().strip()
    assert len(snippet.splitlines()) >= 3
    assert page.locator(".edu-svg").count() == 1
    no_overflow(page, "level 3 student vertical slice")

    # Opening a lesson must become the exact mission offered by the home.
    page.goto(BASE, wait_until="networkidle")
    assert page.locator("#continueKicker").inner_text().startswith("Continúa · Nivel 3")
    assert page.locator("#continueTitle").inner_text().strip()
    assert "concept=event" in page.locator("#continueLink").get_attribute("href")


def assert_level_three_code_coverage(page) -> None:
    for route, concept in LEVEL3_CODE_ROUTES:
        page.goto(f"{BASE}/labs/level-3/{route}?concept={concept}", wait_until="networkidle")
        assert page.locator("#codeLab").is_visible(), f"Código oculto: {concept}"
        snippet = page.locator("#codeSnippet").inner_text().strip()
        assert len(snippet.splitlines()) >= 3, f"Código insuficiente: {concept}"
        assert not page.locator("#journeyCode").evaluate("el => el.classList.contains('muted')"), f"Paso Código marcado como opcional: {concept}"
    assert len(LEVEL3_CODE_ROUTES) == 19


def assert_placement_to_home(page) -> None:
    page.goto(BASE, wait_until="networkidle")
    page.evaluate(
        """() => {
          localStorage.removeItem('dcf-last-mission');
          localStorage.setItem('dcf-placement-result', JSON.stringify({startLevel: 4, review: [2], strengths: [6]}));
        }"""
    )
    page.reload(wait_until="networkidle")
    assert page.locator("#continueKicker").inner_text().startswith("Tu ruta recomendada · Nivel 4")
    assert "Nivel 2" in page.locator("#continueMeta").inner_text()
    href = page.locator("#continueLink").get_attribute("href")
    assert href and "level-4" in href


def main() -> None:
    if not BUILD.exists():
        raise SystemExit("Ejecuta scripts/build_pages.py antes de qa_student_experience.py")

    handler = partial(SimpleHTTPRequestHandler, directory=str(BUILD))
    server = ThreadingHTTPServer(("127.0.0.1", 4175), handler)
    Thread(target=server.serve_forever, daemon=True).start()

    with sync_playwright() as playwright:
        try:
            browser = playwright.chromium.launch(channel="chrome", headless=True)
        except Exception:
            browser = playwright.chromium.launch(headless=True)

        desktop = browser.new_context(viewport={"width": 1440, "height": 1000}, reduced_motion="reduce")
        page = desktop.new_page()
        assert_home(page)
        assert_placement(page)
        assert_level_three_vertical_slice(page)
        assert_level_three_code_coverage(page)
        assert_placement_to_home(page)
        desktop.close()

        tablet = browser.new_context(viewport={"width": 820, "height": 1180}, reduced_motion="reduce")
        tablet_page = tablet.new_page()
        assert_home(tablet_page)
        assert_placement(tablet_page)
        assert_level_three_vertical_slice(tablet_page)
        no_overflow(tablet_page, "tablet final")
        tablet.close()

        phone = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        phone_page = phone.new_page()
        assert_home(phone_page)
        assert phone_page.locator(".mobile-nav").is_visible()
        minimum_touch_target(phone_page, ".student-primary")
        assert_placement(phone_page)
        minimum_touch_target(phone_page, "#nextQuestion")
        assert_level_three_vertical_slice(phone_page)
        minimum_touch_target(phone_page, "#advance")
        no_overflow(phone_page, "phone final")
        phone.close()

        browser.close()

    server.shutdown()
    print("Student experience QA aprobada: desktop, tablet, phone, diagnóstico, continuidad y 19 code labs.")


if __name__ == "__main__":
    main()
