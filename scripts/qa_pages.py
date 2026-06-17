#!/usr/bin/env python3
"""Browser QA for the generated GitHub Pages site and interactive labs."""

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


def assert_no_overflow(page, label: str) -> None:
    overflow = page.evaluate(
        "() => document.documentElement.scrollWidth > document.documentElement.clientWidth"
    )
    if overflow:
        raise AssertionError(f"Desbordamiento horizontal en {label}")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    console_errors: list[str] = []
    page_errors: list[str] = []
    level2 = json.loads(
        (
            ROOT
            / "generated"
            / "data-class-description-level-2"
            / "manifest.json"
        ).read_text(encoding="utf-8")
    )
    level1 = json.loads(
        (
            ROOT
            / "generated"
            / "data-class-foundations-level-1"
            / "manifest.json"
        ).read_text(encoding="utf-8")
    )

    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT / "_site"))
    server = ThreadingHTTPServer(("127.0.0.1", 4174), handler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 1024})
        page = context.new_page()
        page.on(
            "console",
            lambda message: console_errors.append(
                f"{message.type}: {message.text}"
            )
            if message.type in {"error", "warning"}
            else None,
        )
        page.on("pageerror", lambda error: page_errors.append(str(error)))

        page.goto(BASE, wait_until="networkidle")
        assert page.title() == "Resultados | DataClass Forge"
        page.locator("#summaryRail").get_by_text("39").wait_for()
        page.locator("#summaryRail").get_by_text("60").wait_for()
        assert page.locator(".level-group").count() == 2
        assert page.locator(".catalog-row").count() == 8
        assert page.locator(".data-row:not(.header)").count() == 3
        assert_no_overflow(page, "portal desktop")
        page.screenshot(path=OUTPUT / "github-pages-desktop.png", full_page=True)
        page.locator("#catalogo").screenshot(path=OUTPUT / "github-pages-catalog.png")
        page.locator("#datasets").screenshot(path=OUTPUT / "github-pages-datasets.png")

        page.locator("#search").fill("Distribuciones")
        assert page.locator(".catalog-row:not([hidden])").count() == 1
        page.locator("#search").fill("")
        page.get_by_role("button", name="Nivel 2").click()
        assert page.locator('.level-group[data-level="2"]:not([hidden])').count() == 1
        assert page.locator('.level-group[data-level="1"]:not([hidden])').count() == 0
        page.goto(f"{BASE}/methodology.html", wait_until="networkidle")
        assert page.title() == "Metodología | DataClass Forge"
        page.get_by_text("4.5 / 5", exact=True).wait_for()
        assert_no_overflow(page, "metodología desktop")

        for block in level1["blocks"]:
            page.goto(
                f"{BASE}/labs/level-1/{block['href']}",
                wait_until="networkidle",
            )
            assert page.get_by_role("button", name="En vivo").count() == 1
            page.get_by_text("Modo En vivo visible temporalmente").wait_for()
            page.get_by_text("SHA-256").first.wait_for()
            for lesson_index in range(block["concept_count"]):
                assert page.locator(".practice-story").inner_text()
                assert page.locator(".option:disabled").count() == 3
                page.locator("#animateVisual").click()
                page.wait_for_timeout(150)
                assert page.locator(".option:disabled").count() == 0
                correct_index = page.evaluate(
                    """([moduleId, lessonIndex]) =>
                    window.DCF_MODULES[moduleId].lessons[lessonIndex]
                      .practice.options.findIndex((option) => option.correct)""",
                    [block["id"], lesson_index],
                )
                page.locator(f'.option[data-option="{correct_index}"]').click()
                assert "success" in page.locator(".feedback").get_attribute("class")
                assert_no_overflow(
                    page,
                    f"Nivel 1 {block['id']} concepto {lesson_index + 1}",
                )
                if lesson_index < block["concept_count"] - 1:
                    page.locator("#nextLesson").click()

        for item in level2["concepts"]:
            page.goto(
                f"{BASE}/labs/level-2/{item['href']}",
                wait_until="networkidle",
            )
            assert page.locator("#lessonTitle").inner_text() == item["title"]
            assert page.get_by_role("button", name="En vivo").count() == 0
            assert page.locator("#practiceStory").inner_text()
            assert page.locator(".option:disabled").count() == 3
            assert page.locator("#exerciseEvidence").inner_text().startswith(
                "Evidencia:"
            )
            before = page.locator("#visual").inner_html()
            page.locator("#runVisual").click()
            after = page.locator("#visual").inner_html()
            if before == after:
                raise AssertionError(
                    f"Interacción sin cambio visible en Nivel 2: {item['id']}"
                )
            assert page.locator(".option:disabled").count() == 0
            page.locator('.option[data-correct="true"]').click()
            assert "success" in page.locator("#feedback").get_attribute("class")
            page.get_by_role("button", name="Transferencia").click()
            assert page.locator(".option:disabled").count() == 3
            transfer_before = page.locator("#visual").inner_html()
            page.locator("#runVisual").click()
            transfer_after = page.locator("#visual").inner_html()
            if transfer_before == transfer_after:
                raise AssertionError(
                    f"Interacción de transferencia sin cambio visible: {item['id']}"
                )
            page.locator('.option[data-correct="true"]').click()
            assert "success" in page.locator("#feedback").get_attribute("class")
            assert_no_overflow(page, f"Nivel 2 {item['id']}")

        page.goto(
            f"{BASE}/labs/level-2/distribuciones.html?concept=histogram",
            wait_until="networkidle",
        )
        assert page.get_by_role("button", name="En vivo").count() == 0
        page.screenshot(path=OUTPUT / "level-2-histogram-desktop.png", full_page=True)
        page.goto(
            f"{BASE}/labs/level-2/distribuciones.html?concept=histogram&teacher=1",
            wait_until="networkidle",
        )
        page.get_by_role("button", name="En vivo").click()
        page.get_by_text("Modo docente oculto").wait_for()
        page.get_by_text("SHA-256").first.wait_for()
        page.get_by_role("button", name="Copiar").first.click()
        page.get_by_text("Copiado").wait_for()
        page.goto(
            f"{BASE}/labs/level-1/alfabetizacion.html",
            wait_until="networkidle",
        )
        page.get_by_role("button", name="En vivo").click()
        page.get_by_text("Modo En vivo visible temporalmente").wait_for()
        page.get_by_text("SHA-256").first.wait_for()

        mobile = browser.new_context(viewport={"width": 390, "height": 844})
        mobile_page = mobile.new_page()
        mobile_page.on(
            "console",
            lambda message: console_errors.append(
                f"mobile {message.type}: {message.text}"
            )
            if message.type in {"error", "warning"}
            else None,
        )
        mobile_page.on("pageerror", lambda error: page_errors.append(f"mobile: {error}"))
        mobile_page.goto(BASE, wait_until="networkidle")
        assert_no_overflow(mobile_page, "portal mobile")
        mobile_page.screenshot(path=OUTPUT / "github-pages-mobile.png", full_page=True)
        mobile_page.goto(
            f"{BASE}/labs/level-2/distribuciones.html?concept=histogram",
            wait_until="networkidle",
        )
        assert mobile_page.get_by_role("button", name="En vivo").count() == 0
        assert mobile_page.locator("#practiceStory").inner_text()
        mobile_page.locator("#runVisual").click()
        mobile_page.get_by_role("button", name="Transferencia").click()
        mobile_page.locator("#runVisual").click()
        mobile_page.locator('.option[data-correct="true"]').click()
        assert_no_overflow(mobile_page, "Nivel 2 mobile")
        mobile_page.screenshot(path=OUTPUT / "level-2-histogram-mobile.png", full_page=True)

        mobile.close()
        context.close()
        browser.close()
    server.shutdown()
    server.server_close()

    if console_errors or page_errors:
        raise AssertionError(
            "Errores de navegador:\n"
            + "\n".join([*console_errors, *page_errors])
        )
    print(
        "QA de navegador aprobada: portal, filtros, 18 conceptos de Nivel 1, "
        "21 conceptos y 42 ejercicios de Nivel 2, interacciones, prompts y responsive."
    )


if __name__ == "__main__":
    main()
