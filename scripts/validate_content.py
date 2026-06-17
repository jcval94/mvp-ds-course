#!/usr/bin/env python3
"""Validate publishable content, manifests, datasets, counts, and links."""

from __future__ import annotations

from html.parser import HTMLParser
import csv
import hashlib
import json
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
LEVELS = [
    ROOT / "generated" / "data-class-foundations-level-1",
    ROOT / "generated" / "data-class-description-level-2",
]


def fail(message: str) -> None:
    raise AssertionError(message)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def csv_dimensions(path: Path) -> tuple[int, int]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.reader(handle)
        header = next(reader)
        return sum(1 for _ in reader), len(header)


class LocalLinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag not in {"a", "link", "script"}:
            return
        values = dict(attrs)
        target = values.get("href") or values.get("src")
        if target:
            self.links.append(target)


def validate_links(html_path: Path) -> None:
    parser = LocalLinkParser()
    parser.feed(html_path.read_text(encoding="utf-8"))
    for link in parser.links:
        if link.startswith(("http://", "https://", "#", "mailto:")):
            continue
        target = link.split("?", 1)[0].split("#", 1)[0]
        if not target:
            continue
        resolved = (html_path.parent / target).resolve()
        if not resolved.exists():
            fail(f"Enlace local roto en {html_path}: {link}")


def validate_datasets() -> list[dict[str, object]]:
    registry_path = ROOT / "datasets" / "registry.json"
    lock_path = ROOT / "datasets" / "registry.lock.json"
    registry = json.loads(registry_path.read_text(encoding="utf-8"))
    lock = json.loads(lock_path.read_text(encoding="utf-8"))
    if registry != lock:
        fail("registry.json y registry.lock.json no coinciden")
    expected_rows = {
        "palmer-penguins": 344,
        "bike-sharing-day": 731,
        "wine-quality": 6497,
    }
    for item in registry["datasets"]:
        metadata_path = ROOT / "datasets" / "metadata" / f"{item['id']}.json"
        if not metadata_path.exists():
            fail(f"Falta metadata individual para {item['id']}")
        metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
        if metadata != item:
            fail(f"Metadata individual inconsistente para {item['id']}")
        path = ROOT / "datasets" / item["path"]
        if not path.exists():
            fail(f"Falta snapshot: {path}")
        rows, columns = csv_dimensions(path)
        if rows != item["rows"] or columns != item["columns"]:
            fail(f"Dimensiones inconsistentes para {item['id']}")
        if rows != expected_rows[item["id"]]:
            fail(f"Conteo inesperado para {item['id']}: {rows}")
        if sha256(path) != item["sha256"]:
            fail(f"Hash inválido para {item['id']}")
        for key in ["source_url", "source_page", "license", "license_url", "citation"]:
            if not item.get(key):
                fail(f"Metadato ausente {key} en {item['id']}")
    return registry["datasets"]


def validate_level(path: Path) -> dict[str, object]:
    manifest = json.loads((path / "manifest.json").read_text(encoding="utf-8"))
    validation = json.loads((path / manifest["validation"]).read_text(encoding="utf-8"))
    if manifest["status"] != "published":
        fail(f"Nivel no publicable: {path.name}")
    if validation["status"] != "passed":
        fail(f"Validación fallida: {path.name}")
    checks = validation.get("checks", {})
    if not checks:
        fail(f"Validación sin dimensiones: {path.name}")
    calculated_average = round(sum(checks.values()) / len(checks), 2)
    if abs(calculated_average - validation["average"]) > 0.01:
        fail(f"Promedio de rúbrica inconsistente: {path.name}")
    if min(checks.values()) != validation["minimum_dimension"]:
        fail(f"Dimensión mínima inconsistente: {path.name}")
    if validation["average"] < 4 or validation["minimum_dimension"] <= 1:
        fail(f"Gate de rúbrica fallido: {path.name}")
    if validation["blockers"]:
        fail(f"Bloqueos activos: {path.name}")
    if not (path / manifest["entrypoint"]).exists():
        fail(f"Entrypoint ausente: {path.name}")
    for html in path.glob("*.html"):
        validate_links(html)
    return manifest


def validate_level1_contract(public_dataset_ids: set[str]) -> None:
    manifest = json.loads((LEVELS[0] / "manifest.json").read_text(encoding="utf-8"))
    if not set(manifest.get("datasets", [])).issubset(public_dataset_ids):
        fail("Nivel 1 referencia datasets que no existen en el registro público")
    if not manifest.get("datasets"):
        fail("Nivel 1 no declara snapshots públicos para En vivo")
    curriculum = (LEVELS[0] / "assets" / "curriculum.js").read_text(encoding="utf-8")
    app = (LEVELS[0] / "assets" / "app.js").read_text(encoding="utf-8")
    css = (LEVELS[0] / "assets" / "styles.css").read_text(encoding="utf-8")
    for fragment in [
        "practiceStory",
        "liveTeachingPack",
        "animationRequired: true",
        "visibilityNotice",
        "teacher-only-static",
        "sha256",
    ]:
        if fragment not in curriculum:
            fail(f"Nivel 1 no contiene contrato de modo: {fragment}")
    for fragment in [
        'teacherEnabled = params.get("teacher") === "1"',
        'data-mode="live" ${teacherEnabled ? "" : "hidden"}',
        "Primero ejecuta la animación",
    ]:
        if fragment not in app:
            fail(f"Nivel 1 no implementa separación de UI: {fragment}")
    if ".option:disabled" not in css:
        fail("Nivel 1 no estiliza opciones bloqueadas antes de animar")
    if 'let teacherMode = "live"' in app:
        fail("Nivel 1 inicia En vivo como modo estudiantil")


def validate_story_contract(lesson: dict[str, object]) -> None:
    story = lesson.get("practiceStory")
    if not isinstance(story, dict) or story.get("animationRequired") is not True:
        fail(f"{lesson['id']} no exige animación en Ejercitar")
    cases = story.get("cases", [])
    if len(cases) != len(lesson["exercises"]):
        fail(f"{lesson['id']} no tiene historia por ejercicio")
    required = [
        "storyTitle",
        "protagonist",
        "context",
        "problem",
        "pressure",
        "decision",
        "scenes",
        "closing",
    ]
    for index, case in enumerate(cases, start=1):
        for key in required:
            if not case.get(key):
                fail(f"{lesson['id']} caso {index} no declara {key}")
        if len(case.get("scenes", [])) < 3:
            fail(f"{lesson['id']} caso {index} no tiene escenas suficientes")


def validate_live_contract(
    lesson: dict[str, object], public_dataset_ids: set[str]
) -> None:
    live = lesson.get("liveTeachingPack")
    if not isinstance(live, dict):
        fail(f"{lesson['id']} no contiene LiveTeachingPack")
    if live.get("visibility") != "teacher-only-static":
        fail(f"{lesson['id']} no oculta En vivo como modo docente")
    dataset = live.get("dataset", {})
    if dataset.get("id") not in public_dataset_ids:
        fail(f"{lesson['id']} usa dataset En vivo fuera del registro público")
    for key in [
        "name",
        "rows",
        "columns",
        "source_page",
        "license",
        "snapshot_date",
        "sha256",
    ]:
        if not dataset.get(key):
            fail(f"{lesson['id']} LiveTeachingPack no declara dataset.{key}")
    if "sint" in json.dumps(live, ensure_ascii=False).lower():
        fail(f"{lesson['id']} usa sintéticos como fuente principal de En vivo")


def validate_level2_payload(public_dataset_ids: set[str]) -> None:
    path = LEVELS[1] / "assets" / "curriculum.js"
    app = (LEVELS[1] / "assets" / "app.js").read_text(encoding="utf-8")
    css = (LEVELS[1] / "assets" / "styles.css").read_text(encoding="utf-8")
    for fragment in [
        'teacherEnabled = params.get("teacher") === "1"',
        'data-mode="live" ${teacherEnabled ? "" : "hidden"}',
        "Modo docente oculto",
        "#practiceStory",
    ]:
        if fragment not in app:
            fail(f"Nivel 2 no implementa separación de UI: {fragment}")
    if ".practice-story" not in css or ".option:disabled" not in css:
        fail("Nivel 2 no estiliza storytelling u opciones bloqueadas")
    text = path.read_text(encoding="utf-8").strip()
    prefix = "window.DCF_LEVEL2 = "
    if not text.startswith(prefix) or not text.endswith(";"):
        fail("curriculum.js de Nivel 2 no tiene el formato esperado")
    payload = json.loads(text[len(prefix) : -1])
    lessons = [
        lesson
        for module in payload["modules"].values()
        for lesson in module["lessons"]
    ]
    if len(lessons) != 21:
        fail(f"Nivel 2 contiene {len(lessons)} conceptos, se esperaban 21")
    if sum(len(lesson["exercises"]) for lesson in lessons) != 42:
        fail("Nivel 2 no contiene 42 ejercicios")
    if sum(len(lesson["prompts"]) for lesson in lessons) != 63:
        fail("Nivel 2 no contiene 63 prompts")
    for lesson in lessons:
        if len(lesson["exercises"]) != 2:
            fail(f"{lesson['id']} no tiene dos ejercicios")
        for key in [
            "prerequisites",
            "unit",
            "variables",
            "previous",
            "next",
        ]:
            if not lesson.get(key):
                fail(f"{lesson['id']} no declara {key}")
        if set(lesson["prompts"]) != {"codex", "gemini", "chatgpt"}:
            fail(f"Prompts incompletos en {lesson['id']}")
        if not lesson.get("learningModule"):
            fail(f"{lesson['id']} no contiene LearningModule estructurado")
        validate_story_contract(lesson)
        validate_live_contract(lesson, public_dataset_ids)
        for exercise in lesson["exercises"]:
            if not exercise.get("evidence"):
                fail(f"Evidencia ausente en {lesson['id']}")
            if len(exercise["options"]) < 3:
                fail(f"Opciones insuficientes en {lesson['id']}")
            if sum(bool(option["correct"]) for option in exercise["options"]) != 1:
                fail(f"Respuesta correcta ambigua en {lesson['id']}")
            if any(not option["feedback"] for option in exercise["options"]):
                fail(f"Feedback ausente en {lesson['id']}")
        package = LEVELS[1] / "docs" / "packages" / f"{lesson['id']}.md"
        if not package.exists():
            fail(f"Paquete Markdown ausente para {lesson['id']}")
        package_text = package.read_text(encoding="utf-8")
        required_fragments = [
            "## ConceptSpec",
            "## LearningModule",
            "## PracticeExercise",
            "## LiveTeachingPack",
            "**Fuente:**",
            "**Fecha del snapshot:**",
            "**SHA-256:**",
            "**Unidad de análisis:**",
            "**Variables:**",
            "**Concepto anterior:**",
            "**Concepto siguiente:**",
            "**Regla de separación:**",
            "**Historia:**",
            "**Escenas animadas:**",
            "**Visibilidad:**",
            "**Dataset real:**",
        ]
        for fragment in required_fragments:
            if fragment not in package_text:
                fail(f"{lesson['id']} no contiene {fragment}")
        if package_text.count("**Evidencia requerida:**") != 2:
            fail(f"{lesson['id']} no documenta evidencia para dos ejercicios")


def validate_placeholders() -> None:
    pattern = re.compile(r"\b(TBD|por definir)\b", re.IGNORECASE)
    roots = [ROOT / "docs", ROOT / "generated", ROOT / "site", ROOT / "datasets"]
    for base in roots:
        for path in base.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in {".md", ".html", ".js", ".json"}:
                continue
            if pattern.search(path.read_text(encoding="utf-8", errors="ignore")):
                fail(f"Placeholder encontrado en {path}")


def main() -> int:
    datasets = validate_datasets()
    public_dataset_ids = {str(item["id"]) for item in datasets}
    manifests = [validate_level(path) for path in LEVELS]
    for html in (ROOT / "site").rglob("*.html"):
        validate_links(html)
    validate_level1_contract(public_dataset_ids)
    validate_level2_payload(public_dataset_ids)
    validate_placeholders()
    totals = {
        "concepts": sum(item["concept_count"] for item in manifests),
        "exercises": sum(item["exercise_count"] for item in manifests),
        "prompts": sum(item["prompt_count"] for item in manifests),
    }
    expected = {"concepts": 39, "exercises": 60, "prompts": 117}
    if totals != expected:
        fail(f"Totales incorrectos: {totals}, se esperaba {expected}")
    print(
        "Validación aprobada: "
        f"{totals['concepts']} conceptos, {totals['exercises']} ejercicios, "
        f"{totals['prompts']} prompts y {len(datasets)} datasets."
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)
