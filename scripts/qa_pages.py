#!/usr/bin/env python3
"""Browser QA for the generated GitHub Pages site and interactive labs."""

from __future__ import annotations

import json
import csv
import math
import random
import statistics
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


def load_curriculum(path: Path, global_name: str) -> dict[str, object]:
    text = path.read_text(encoding="utf-8").strip()
    prefix = f"window.{global_name} = "
    return json.loads(text[len(prefix) : -1])


def lesson_by_id(payload: dict[str, object], lesson_id: str) -> dict[str, object]:
    for module in payload["modules"].values():
        for lesson in module["lessons"]:
            if lesson["id"] == lesson_id:
                return lesson
    raise AssertionError(f"Concepto no encontrado: {lesson_id}")


def validate_numeric_semantics(
    level2_payload: dict[str, object],
    level3_payload: dict[str, object],
) -> None:
    with (ROOT / "datasets" / "snapshots" / "palmer_penguins.csv").open(
        encoding="utf-8", newline=""
    ) as handle:
        penguins = list(csv.DictReader(handle))
    with (ROOT / "datasets" / "snapshots" / "bike_sharing_day.csv").open(
        encoding="utf-8", newline=""
    ) as handle:
        bikes = list(csv.DictReader(handle))
    masses = [
        float(row["body_mass_g"])
        for row in penguins
        if row.get("body_mass_g") not in {"", "NA"}
    ]
    counts = [float(row["cnt"]) for row in bikes]
    mass_mean = statistics.mean(masses)
    mass_sd = statistics.stdev(masses)
    bike_mean = statistics.mean(counts)

    confidence = lesson_by_id(level3_payload, "confidence-interval")
    expected_90 = [
        mass_mean - 1.64 * mass_sd / math.sqrt(60),
        mass_mean,
        mass_mean + 1.64 * mass_sd / math.sqrt(60),
    ]
    expected_95 = [
        mass_mean - 1.96 * mass_sd / math.sqrt(60),
        mass_mean,
        mass_mean + 1.96 * mass_sd / math.sqrt(60),
    ]
    for actual, expected in zip(confidence["visual"]["states"][0]["interval"], expected_90):
        assert abs(actual - expected) < 0.01
    for actual, expected in zip(confidence["visual"]["states"][1]["interval"], expected_95):
        assert abs(actual - expected) < 0.01

    normal = lesson_by_id(level3_payload, "normal")
    assert all(abs(state["reference"] - bike_mean) < 0.01 for state in normal["visual"]["states"])
    assert all(len(state["series"]) == 80 for state in normal["visual"]["states"])

    law = lesson_by_id(level3_payload, "law-large-numbers")
    assert abs(law["visual"]["states"][1]["series"][-1] - bike_mean) < 0.01
    assert abs(law["visual"]["states"][1]["reference"] - bike_mean) < 0.01

    working = [float(row["cnt"]) for row in bikes if row["workingday"] == "1"]
    nonworking = [float(row["cnt"]) for row in bikes if row["workingday"] == "0"]
    observed = abs(statistics.mean(working) - statistics.mean(nonworking))
    p_value = lesson_by_id(level3_payload, "p-value")
    assert abs(p_value["visual"]["states"][0]["observed"] - observed) < 0.01
    null_values = p_value["visual"]["states"][0]["series"]
    extreme = sum(abs(value) >= observed for value in null_values)
    expected_marker = f"p aprox. = {extreme / len(null_values) * 100:.1f}%"
    assert expected_marker in p_value["visual"]["states"][1]["markers"]

    for lesson_id in ["type-i-error", "type-ii-error", "power"]:
        lesson = lesson_by_id(level3_payload, lesson_id)
        for state in lesson["visual"]["states"]:
            assert abs(sum(item["value"] for item in state["bars"]) - 1) < 0.001

    density = lesson_by_id(level2_payload, "density")
    assert density["visual"]["kind"] == "density-rug"
    bins = lesson_by_id(level2_payload, "bins")
    assert [state["label"] for state in bins["visual"]["states"]] == [
        "6 bins",
        "12 bins",
        "24 bins",
    ]


def exercise_contract(page, level: int, exercise_index: int) -> dict[str, object]:
    return page.evaluate(
        """([level, exerciseIndex]) => {
          const source = level === 2 ? window.DCF_LEVEL2 : window.DCF_LEVEL3;
          const id = new URLSearchParams(location.search).get("concept");
          const lesson = Object.values(source.modules)
            .flatMap((module) => module.lessons)
            .find((item) => item.id === id);
          return {
            visual: lesson.visual,
            contract: lesson.exercises[exerciseIndex].evidenceContract
          };
        }""",
        [level, exercise_index],
    )


def complete_evidence(page, level: int, exercise_index: int) -> dict[str, object]:
    payload = exercise_contract(page, level, exercise_index)
    states = payload["visual"]["states"]
    contract = payload["contract"]
    assert page.locator("#visualProgress").inner_text() == f"Paso 1 de {len(states)}"
    initial_id = states[0]["marks"][0]["evidenceId"]
    assert page.locator(f'[data-evidence-id="{initial_id}"]').count() == 1
    assert page.locator(".option:disabled").count() == 3
    for step in range(1, contract["requiredSteps"] + 1):
        page.locator("#runVisual").click()
        page.wait_for_timeout(30)
        evidence_id = states[step]["marks"][0]["evidenceId"]
        assert page.locator(f'[data-evidence-id="{evidence_id}"]').count() == 1
        if step < contract["unlockAtStep"]:
            assert page.locator(".option:disabled").count() == 3
    assert page.locator(".option:disabled").count() == 0
    assert page.locator("#runVisual").is_disabled()
    return payload


def answer_wrong_then_correct(page) -> None:
    wrong = page.locator('.option[data-correct="false"]')
    assert wrong.count() == 2
    wrong.first.click()
    assert "error" in page.locator("#feedback, .feedback").first.get_attribute("class")
    assert page.locator("#feedback p, .feedback p").first.inner_text().strip()
    page.locator('.option[data-correct="true"]').click()
    assert "success" in page.locator("#feedback, .feedback").first.get_attribute("class")


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
    level3 = json.loads(
        (
            ROOT
            / "generated"
            / "data-class-probability-level-3"
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
    level2_payload = load_curriculum(
        ROOT
        / "generated"
        / "data-class-description-level-2"
        / "assets"
        / "curriculum.js",
        "DCF_LEVEL2",
    )
    level3_payload = load_curriculum(
        ROOT
        / "generated"
        / "data-class-probability-level-3"
        / "assets"
        / "curriculum.js",
        "DCF_LEVEL3",
    )
    validate_numeric_semantics(level2_payload, level3_payload)

    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT / "_site"))
    server = ThreadingHTTPServer(("127.0.0.1", 4174), handler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()

    with sync_playwright() as playwright:
        try:
            browser = playwright.chromium.launch(channel="chrome", headless=True)
        except Exception:
            browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1440, "height": 1024},
            reduced_motion="reduce",
        )
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
        page.locator("#summaryRail").get_by_text("58").wait_for()
        page.locator("#summaryRail").get_by_text("98").wait_for()
        assert page.locator(".level-group").count() == 3
        assert page.locator(".catalog-row").count() == 13
        assert page.locator(".data-row:not(.header)").count() == 3
        assert_no_overflow(page, "portal desktop")
        page.screenshot(path=OUTPUT / "github-pages-desktop.png", full_page=True)
        page.locator("#catalogo").screenshot(path=OUTPUT / "github-pages-catalog.png")
        page.locator("#datasets").screenshot(path=OUTPUT / "github-pages-datasets.png")

        page.goto(f"{BASE}/labs/level-2/index.html", wait_until="networkidle")
        assert page.get_by_role("link", name="HOME").count() == 1
        page.get_by_role("link", name="HOME").click()
        page.wait_for_load_state("networkidle")
        assert page.url in {f"{BASE}/", f"{BASE}/index.html"}
        assert page.title() == "Resultados | DataClass Forge"

        page.locator("#search").fill("Distribuciones")
        assert page.locator(".catalog-row:not([hidden])").count() == 1
        page.locator("#search").fill("")
        page.get_by_role("button", name="Nivel 2").click()
        assert page.locator('.level-group[data-level="2"]:not([hidden])').count() == 1
        assert page.locator('.level-group[data-level="1"]:not([hidden])').count() == 0
        assert page.locator('.level-group[data-level="3"]:not([hidden])').count() == 0
        page.get_by_role("button", name="Nivel 3").click()
        assert page.locator('.level-group[data-level="3"]:not([hidden])').count() == 1
        assert page.locator('.level-group[data-level="1"]:not([hidden])').count() == 0
        assert page.locator('.level-group[data-level="2"]:not([hidden])').count() == 0
        page.goto(f"{BASE}/methodology.html", wait_until="networkidle")
        assert page.title() == "Metodología | DataClass Forge"
        page.get_by_text("4.5 / 5", exact=True).wait_for()
        assert_no_overflow(page, "metodología desktop")

        for block in level1["blocks"]:
            page.goto(
                f"{BASE}/labs/level-1/{block['href']}",
                wait_until="networkidle",
            )
            assert page.get_by_role("link", name="HOME").count() >= 1
            assert page.get_by_role("button", name="En vivo").count() == 1
            page.get_by_text("Modo En vivo visible temporalmente").wait_for()
            page.get_by_text("SHA-256").first.wait_for()
            for lesson_index in range(block["concept_count"]):
                assert page.locator(".practice-story").inner_text()
                assert page.locator("#visualProgress").inner_text() == "Paso 1 de 2"
                initial_evidence = page.evaluate(
                    """([moduleId, lessonIndex]) =>
                    window.DCF_MODULES[moduleId].lessons[lessonIndex]
                      .visual.states[0].marks[0].evidenceId""",
                    [block["id"], lesson_index],
                )
                assert page.locator(
                    f'[data-evidence-id="{initial_evidence}"]'
                ).count() == 1
                assert page.locator(".option:disabled").count() == 3
                page.locator("#animateVisual").click()
                page.wait_for_timeout(150)
                assert page.locator(".option:disabled").count() == 0
                final_evidence = page.evaluate(
                    """([moduleId, lessonIndex]) =>
                    window.DCF_MODULES[moduleId].lessons[lessonIndex]
                      .visual.states[1].marks[0].evidenceId""",
                    [block["id"], lesson_index],
                )
                assert page.locator(
                    f'[data-evidence-id="{final_evidence}"]'
                ).count() == 1
                correct_index = page.evaluate(
                    """([moduleId, lessonIndex]) =>
                    window.DCF_MODULES[moduleId].lessons[lessonIndex]
                      .practice.options.findIndex((option) => option.correct)""",
                    [block["id"], lesson_index],
                )
                wrong_index = page.evaluate(
                    """([moduleId, lessonIndex]) =>
                    window.DCF_MODULES[moduleId].lessons[lessonIndex]
                      .practice.options.findIndex((option) => !option.correct)""",
                    [block["id"], lesson_index],
                )
                page.locator(f'.option[data-option="{wrong_index}"]').click()
                assert "error" in page.locator(".feedback").get_attribute("class")
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
            page.get_by_text("Pistas graduadas").first.wait_for()
            page.get_by_text("Regla de feedback").first.wait_for()
            assert page.locator(".option:disabled").count() == 3
            assert page.locator("#exerciseEvidence").inner_text().startswith(
                "Evidencia:"
            )
            complete_evidence(page, 2, 0)
            answer_wrong_then_correct(page)
            page.get_by_role("button", name="Transferencia").click()
            assert page.locator(".option:disabled").count() == 3
            complete_evidence(page, 2, 1)
            answer_wrong_then_correct(page)
            assert_no_overflow(page, f"Nivel 2 {item['id']}")

        for item in level3["concepts"]:
            page.goto(
                f"{BASE}/labs/level-3/{item['href']}",
                wait_until="networkidle",
            )
            assert page.locator("#lessonTitle").inner_text() == item["title"]
            assert page.get_by_role("button", name="En vivo").count() == 0
            assert page.locator("#practiceStory").inner_text()
            page.get_by_text("Pistas graduadas").first.wait_for()
            page.get_by_text("Regla de feedback").first.wait_for()
            assert page.locator(".option:disabled").count() == 3
            assert page.locator("#exerciseEvidence").inner_text().startswith(
                "Evidencia:"
            )
            complete_evidence(page, 3, 0)
            answer_wrong_then_correct(page)
            page.get_by_role("button", name="Transferencia").click()
            assert page.locator(".option:disabled").count() == 3
            complete_evidence(page, 3, 1)
            answer_wrong_then_correct(page)
            assert_no_overflow(page, f"Nivel 3 {item['id']}")

        page.goto(
            f"{BASE}/labs/level-2/distribuciones.html?concept=density",
            wait_until="networkidle",
        )
        assert page.locator('[data-kind="density-rug"]').count() == 1
        assert page.locator(".rug-mark").count() > 20
        assert page.locator('[data-semantic="density-curve"]').count() == 1
        complete_evidence(page, 2, 0)

        page.goto(
            f"{BASE}/labs/level-2/distribuciones.html?concept=bins",
            wait_until="networkidle",
        )
        bins_contract = exercise_contract(page, 2, 0)
        observed_bin_labels = []
        for step in range(len(bins_contract["visual"]["states"])):
            observed_bin_labels.append(
                page.locator("#visual svg text").all_text_contents()[-1]
            )
            if step < len(bins_contract["visual"]["states"]) - 1:
                page.locator("#runVisual").click()
                page.wait_for_timeout(30)
        assert any("6 bins" in label for label in observed_bin_labels)
        assert any("12 bins" in label for label in observed_bin_labels)
        assert any("24 bins" in label for label in observed_bin_labels)

        page.goto(
            f"{BASE}/labs/level-2/valores-atipicos.html?concept=leverage",
            wait_until="networkidle",
        )
        assert page.locator(".fit-comparison").count() == 0
        complete_evidence(page, 2, 0)
        assert page.locator(".fit-comparison").count() == 1
        assert any(
            "Δ" in text
            for text in page.locator("#visual svg text").all_text_contents()
        )

        page.goto(
            f"{BASE}/labs/level-3/variables-aleatorias.html?concept=normal",
            wait_until="networkidle",
        )
        assert page.locator('[data-semantic="normal-curve"]').count() == 1
        assert page.locator(".distribution-bin").count() >= 6
        complete_evidence(page, 3, 0)

        page.goto(
            f"{BASE}/labs/level-3/incertidumbre.html?concept=confidence-interval",
            wait_until="networkidle",
        )
        assert page.locator('[data-semantic="confidence-interval"]').count() == 1
        complete_evidence(page, 3, 0)
        assert page.locator('[data-semantic="confidence-interval"]').count() == 1

        page.goto(
            f"{BASE}/labs/level-3/muestreo.html?concept=law-large-numbers",
            wait_until="networkidle",
        )
        assert page.locator('[data-semantic="running-mean"]').count() == 1
        complete_evidence(page, 3, 0)

        page.goto(
            f"{BASE}/labs/level-3/pruebas-hipotesis.html?concept=p-value",
            wait_until="networkidle",
        )
        assert page.locator('[data-semantic="null-curve"]').count() == 1
        assert page.locator('[data-semantic="tail-area"]').count() == 0
        complete_evidence(page, 3, 0)
        assert page.locator('[data-semantic="tail-area"]').count() == 2

        for concept_id, semantic in [
            ("type-i-error", "rejection-area"),
            ("type-ii-error", "beta-area"),
            ("power", "power-area"),
        ]:
            page.goto(
                f"{BASE}/labs/level-3/pruebas-hipotesis.html?concept={concept_id}",
                wait_until="networkidle",
            )
            complete_evidence(page, 3, 0)
            assert page.locator(f'[data-semantic="{semantic}"]').count() == 1

        page.goto(
            f"{BASE}/labs/level-2/distribuciones.html?concept=histogram",
            wait_until="networkidle",
        )
        assert page.get_by_role("link", name="HOME").count() >= 1
        assert page.get_by_role("button", name="En vivo").count() == 0
        page.screenshot(path=OUTPUT / "level-2-histogram-desktop.png", full_page=True)
        page.get_by_role("link", name="HOME").first.click()
        page.wait_for_load_state("networkidle")
        assert page.url in {f"{BASE}/", f"{BASE}/index.html"}
        assert page.title() == "Resultados | DataClass Forge"
        page.goto(
            f"{BASE}/labs/level-2/distribuciones.html?concept=histogram&teacher=1",
            wait_until="networkidle",
        )
        page.get_by_role("button", name="En vivo").click()
        page.get_by_text("Modo docente oculto").first.wait_for()
        page.get_by_text("SHA-256").first.wait_for()
        page.get_by_text("Preguntas y evaluación").wait_for()
        page.get_by_text("Checklist docente").wait_for()
        page.get_by_text("Blueprint de demo").wait_for()
        page.get_by_role("button", name="Copiar").first.click()
        page.get_by_text("Copiado").wait_for()
        page.goto(
            f"{BASE}/labs/level-3/pruebas-hipotesis.html?concept=p-value",
            wait_until="networkidle",
        )
        assert page.get_by_role("link", name="HOME").count() >= 1
        assert page.get_by_role("button", name="En vivo").count() == 0
        page.screenshot(path=OUTPUT / "level-3-pvalue-desktop.png", full_page=True)
        page.get_by_role("link", name="HOME").first.click()
        page.wait_for_load_state("networkidle")
        assert page.url in {f"{BASE}/", f"{BASE}/index.html"}
        assert page.title() == "Resultados | DataClass Forge"
        page.goto(
            f"{BASE}/labs/level-3/pruebas-hipotesis.html?concept=p-value&teacher=1",
            wait_until="networkidle",
        )
        page.get_by_role("button", name="En vivo").click()
        page.get_by_text("Modo docente oculto").first.wait_for()
        page.get_by_text("SHA-256").first.wait_for()
        page.get_by_text("Preguntas y evaluación").wait_for()
        page.get_by_text("Checklist docente").wait_for()
        page.get_by_text("Blueprint de demo").wait_for()
        page.get_by_role("button", name="Copiar").first.click()
        page.get_by_text("Copiado").wait_for()
        page.goto(
            f"{BASE}/labs/level-1/alfabetizacion.html",
            wait_until="networkidle",
        )
        page.get_by_role("button", name="En vivo").click()
        page.get_by_text("Modo En vivo visible temporalmente").wait_for()
        page.get_by_text("SHA-256").first.wait_for()

        motion = browser.new_context(viewport={"width": 1280, "height": 800})
        motion_page = motion.new_page()
        motion_page.goto(
            f"{BASE}/labs/level-3/pruebas-hipotesis.html?concept=p-value",
            wait_until="networkidle",
        )
        assert motion_page.locator(".option:disabled").count() == 3
        motion_page.locator("#runVisual").click()
        motion_page.wait_for_timeout(250)
        assert motion_page.locator(".option:disabled").count() == 3
        assert motion_page.locator('[data-semantic="tail-area"]').count() == 2
        motion_page.wait_for_timeout(400)
        assert motion_page.locator(".option:disabled").count() == 0
        animation_name = motion_page.locator(".visual-stage").evaluate(
            "(element) => getComputedStyle(element).animationName"
        )
        assert animation_name != "none"
        motion.close()

        mobile = browser.new_context(
            viewport={"width": 390, "height": 844},
            reduced_motion="reduce",
        )
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
        assert mobile_page.get_by_role("link", name="HOME").count() >= 1
        assert mobile_page.get_by_role("button", name="En vivo").count() == 0
        assert mobile_page.locator("#practiceStory").inner_text()
        complete_evidence(mobile_page, 2, 0)
        mobile_page.get_by_role("button", name="Transferencia").click()
        complete_evidence(mobile_page, 2, 1)
        mobile_page.locator('.option[data-correct="true"]').click()
        assert_no_overflow(mobile_page, "Nivel 2 mobile")
        mobile_page.screenshot(path=OUTPUT / "level-2-histogram-mobile.png", full_page=True)
        mobile_page.goto(
            f"{BASE}/labs/level-3/pruebas-hipotesis.html?concept=p-value",
            wait_until="networkidle",
        )
        assert mobile_page.get_by_role("link", name="HOME").count() >= 1
        assert mobile_page.get_by_role("button", name="En vivo").count() == 0
        assert mobile_page.locator("#practiceStory").inner_text()
        complete_evidence(mobile_page, 3, 0)
        mobile_page.get_by_role("button", name="Transferencia").click()
        complete_evidence(mobile_page, 3, 1)
        mobile_page.locator('.option[data-correct="true"]').click()
        assert_no_overflow(mobile_page, "Nivel 3 mobile")
        mobile_page.screenshot(path=OUTPUT / "level-3-pvalue-mobile.png", full_page=True)

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
        "21 conceptos y 42 ejercicios de Nivel 2, 19 conceptos y 38 ejercicios "
        "de Nivel 3, interacciones, prompts y responsive."
    )


if __name__ == "__main__":
    main()
