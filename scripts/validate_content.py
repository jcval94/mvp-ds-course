#!/usr/bin/env python3
"""Validate publishable content, manifests, datasets, counts, and links."""

from __future__ import annotations

from html.parser import HTMLParser
import csv
import hashlib
import json
import math
from pathlib import Path
import re
import statistics
import sys


ROOT = Path(__file__).resolve().parents[1]
LEVELS = [
    ROOT / "generated" / "data-class-foundations-level-1",
    ROOT / "generated" / "data-class-description-level-2",
    ROOT / "generated" / "data-class-probability-level-3",
    ROOT / "generated" / "data-class-relationships-level-4",
    ROOT / "generated" / "data-class-modeling-level-5",
    ROOT / "generated" / "data-class-evaluation-level-6",
    ROOT / "generated" / "data-class-unsupervised-level-7",
]


def fail(message: str) -> None:
    raise AssertionError(message)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    payload = path.read_bytes()
    if path.suffix.lower() in {".csv", ".json", ".md", ".js", ".html", ".css"}:
        payload = payload.replace(b"\r\n", b"\n").replace(b"\r", b"\n")
    digest.update(payload)
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
    if validation.get("browser_qa_required") is not True:
        fail(f"{path.name} no exige QA semántica de navegador")
    evidence = validation.get("evidence", {})
    if not isinstance(evidence, dict) or evidence.get("browser_qa") != "scripts/qa_pages.py":
        fail(f"{path.name} no referencia la evidencia de navegador")
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
    expected_story_metadata = {
        "curriculum_source": "docs/CURRICULUM_MAP.md#nivel-1-fundamentos",
        "story_source": "docs/stories/LEVEL_1.md",
        "story_status": "approved",
        "story_version": "don-juan-paco-level-1-v2",
    }
    for key, value in expected_story_metadata.items():
        if manifest.get(key) != value:
            fail(f"Nivel 1 no declara trazabilidad narrativa: {key}")
    curriculum = (LEVELS[0] / "assets" / "curriculum.js").read_text(encoding="utf-8")
    app = (LEVELS[0] / "assets" / "app.js").read_text(encoding="utf-8")
    css = (LEVELS[0] / "assets" / "styles.css").read_text(encoding="utf-8")
    index = (LEVELS[0] / "index.html").read_text(encoding="utf-8")
    for fragment in [
        "practiceStory",
        "liveTeachingPack",
        "animationRequired: true",
        "evidenceContract",
        "requiredEvidenceIds",
        "durationMs: 600",
        "visibilityNotice",
        "visible-temporal-level-1",
        "sha256",
        "hints",
        "socraticQuestions",
        "quickAssessment",
        "beforeClassChecklist",
        "duringClassChecklist",
        "const narrative = {",
        "storySource",
        "storyStatus",
        "subtitles",
        "Paco, hijo de Don Juan",
    ]:
        if fragment not in curriculum:
            fail(f"Nivel 1 no contiene contrato de modo: {fragment}")
    for fragment in [
        "let teacherEnabled = true;",
        'let teacherMode = "live";',
        'data-mode="live"',
        "Pistas graduadas",
        "live.socraticQuestions",
        "live.beforeClassChecklist",
        "Modo En vivo visible temporalmente",
        "contrato de evidencia",
        "visualProgress",
        "evidenceReady",
        "data-evidence-id",
        "data-home-link",
        "homeHref",
        "HOME",
        "scene-card",
        "narrator-subtitle",
        "renderNarratorSubtitle",
        "lesson.narrative.donJuan",
        "lesson.narrative.paco",
    ]:
        if fragment not in app:
            fail(f"Nivel 1 no implementa En vivo visible temporal: {fragment}")
    for fragment in ["data-home-link", "HOME", "../../site/index.html"]:
        if fragment not in index:
            fail(f"Nivel 1 no implementa HOME en portada: {fragment}")
    for fragment in [
        ".home-btn",
        ".home-sidebar-link",
        ".visual-progress",
        ".evidence-strip",
        ".scene-card",
        ".dialogue.don-juan",
        ".narrator-subtitle",
        ".subtitle-label",
    ]:
        if fragment not in css:
            fail(f"Nivel 1 no estiliza HOME: {fragment}")
    if ".option:disabled" not in css:
        fail("Nivel 1 no estiliza opciones bloqueadas antes de animar")
    scene_ids = re.findall(r'scene: "(L1-S\d{2})"', curriculum)
    expected_scene_ids = [f"L1-S{index:02d}" for index in range(1, 19)]
    if scene_ids != expected_scene_ids:
        fail(f"Nivel 1 no implementa las 18 escenas en orden: {scene_ids}")
    if curriculum.count("subtitles: [") != 18:
        fail("Cada concepto de Nivel 1 debe declarar dos subtítulos del narrador")


def validate_story_contract(lesson: dict[str, object]) -> None:
    story = lesson.get("practiceStory")
    if not isinstance(story, dict) or story.get("animationRequired") is not True:
        fail(f"{lesson['id']} no exige animación en Ejercitar")
    if not story.get("evidence"):
        fail(f"{lesson['id']} no declara evidencia narrativa general")
    if len(story.get("hints", [])) < 3:
        fail(f"{lesson['id']} no declara pistas graduadas suficientes")
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
        "evidence",
        "feedbackRule",
        "transfer",
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
    for key in ["objective", "audience", "duration"]:
        if not live.get(key):
            fail(f"{lesson['id']} LiveTeachingPack no declara {key}")
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
    for key in [
        "socraticQuestions",
        "anticipatedErrors",
        "quickAssessment",
        "demoBlueprint",
        "beforeClassChecklist",
        "duringClassChecklist",
        "privacyProtocol",
    ]:
        if not live.get(key):
            fail(f"{lesson['id']} LiveTeachingPack no declara {key}")
    if len(live.get("socraticQuestions", [])) < 3:
        fail(f"{lesson['id']} LiveTeachingPack no tiene preguntas socráticas suficientes")
    if len(live.get("beforeClassChecklist", [])) < 3 or len(live.get("duringClassChecklist", [])) < 3:
        fail(f"{lesson['id']} LiveTeachingPack no tiene checklists docentes suficientes")
    if "sint" in json.dumps(live, ensure_ascii=False).lower():
        fail(f"{lesson['id']} usa sintéticos como fuente principal de En vivo")


def validate_separated_payload(
    level_index: int,
    public_dataset_ids: set[str],
    expected_concepts: int,
    expected_exercises: int,
    expected_prompts: int,
    global_name: str,
    label: str,
) -> None:
    level_path = LEVELS[level_index]
    path = level_path / "assets" / "curriculum.js"
    app = (level_path / "assets" / "app.js").read_text(encoding="utf-8")
    css = (level_path / "assets" / "styles.css").read_text(encoding="utf-8")
    index = (level_path / "index.html").read_text(encoding="utf-8")
    for fragment in [
        'teacherEnabled = params.get("teacher") === "1"',
        'data-mode="live" ${teacherEnabled ? "" : "hidden"}',
        "Modo docente oculto",
        "#practiceStory",
        "lesson.practiceStory.hints",
        "live.socraticQuestions",
        "live.beforeClassChecklist",
        "live.demoBlueprint",
        "data-home-link",
        "homeHref",
        "HOME",
        "visualProgress",
        "evidenceReady",
        "data-evidence-id",
        "prefers-reduced-motion",
    ]:
        if fragment not in app:
            fail(f"{label} no implementa separación de UI: {fragment}")
    for fragment in [
        ".practice-story",
        ".option:disabled",
        ".home-link",
        ".home-portal-link",
        ".visual-progress",
        ".evidence-strip",
        ".motion-line",
    ]:
        if fragment not in css:
            fail(f"{label} no estiliza contrato de UI: {fragment}")
    for fragment in ["data-home-link", "HOME", "../../site/index.html"]:
        if fragment not in index:
            fail(f"{label} no implementa HOME en portada: {fragment}")
    text = path.read_text(encoding="utf-8").strip()
    prefix = f"window.{global_name} = "
    if not text.startswith(prefix) or not text.endswith(";"):
        fail(f"curriculum.js de {label} no tiene el formato esperado")
    payload = json.loads(text[len(prefix) : -1])
    lessons = [
        lesson
        for module in payload["modules"].values()
        for lesson in module["lessons"]
    ]
    if len(lessons) != expected_concepts:
        fail(f"{label} contiene {len(lessons)} conceptos, se esperaban {expected_concepts}")
    if sum(len(lesson["exercises"]) for lesson in lessons) != expected_exercises:
        fail(f"{label} no contiene {expected_exercises} ejercicios")
    if sum(len(lesson["prompts"]) for lesson in lessons) != expected_prompts:
        fail(f"{label} no contiene {expected_prompts} prompts")
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
        visual = lesson.get("visual", {})
        for key in ["kind", "mechanism", "states", "sequence", "motion"]:
            if not visual.get(key):
                fail(f"{lesson['id']} no declara visual.{key}")
        if visual["motion"].get("durationMs") != 600:
            fail(f"{lesson['id']} no usa movimiento de 600 ms")
        if not visual["motion"].get("reducedMotion"):
            fail(f"{lesson['id']} no declara movimiento reducido")
        evidence_ids: set[str] = set()
        for state_index, visual_state in enumerate(visual["states"], start=1):
            if not visual_state.get("id") or not visual_state.get("marks"):
                fail(f"{lesson['id']} estado visual {state_index} incompleto")
            for mark in visual_state["marks"]:
                evidence_id = mark.get("evidenceId")
                if not evidence_id or evidence_id in evidence_ids:
                    fail(f"{lesson['id']} evidenceId ausente o duplicado")
                evidence_ids.add(evidence_id)
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
            contract = exercise.get("evidenceContract", {})
            if contract.get("requiredSteps") != len(visual["states"]) - 1:
                fail(f"Pasos de evidencia inconsistentes en {lesson['id']}")
            if contract.get("unlockAtStep") != contract.get("requiredSteps"):
                fail(f"Desbloqueo inconsistente en {lesson['id']}")
            if set(contract.get("requiredEvidenceIds", [])) != evidence_ids:
                fail(f"Evidence IDs inconsistentes en {lesson['id']}")
        package = level_path / "docs" / "packages" / f"{lesson['id']}.md"
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
            "**Kind visual:**",
            "**Mecanismo:**",
            "**Movimiento reducido:**",
            "**Regla de separación:**",
            "**Historia:**",
            "**Escenas animadas:**",
            "**Pistas graduadas:**",
            "**Regla de feedback:**",
            "**Visibilidad:**",
            "**Dataset real:**",
            "**Evaluación rápida:**",
            "**Checklist antes de clase:**",
            "**Checklist durante clase:**",
            "**Blueprint de demo:**",
        ]
        for fragment in required_fragments:
            if fragment not in package_text:
                fail(f"{lesson['id']} no contiene {fragment}")
        if package_text.count("**Evidencia requerida:**") != 2:
            fail(f"{lesson['id']} no documenta evidencia para dos ejercicios")
        if package_text.count("**Contrato de evidencia:**") != 2:
            fail(f"{lesson['id']} no documenta contratos de evidencia")


def validate_level2_payload(public_dataset_ids: set[str]) -> None:
    validate_separated_payload(
        level_index=1,
        public_dataset_ids=public_dataset_ids,
        expected_concepts=21,
        expected_exercises=42,
        expected_prompts=63,
        global_name="DCF_LEVEL2",
        label="Nivel 2",
    )
    level_path = LEVELS[1]
    curriculum_path = level_path / "assets" / "curriculum.js"
    text = curriculum_path.read_text(encoding="utf-8").strip()
    payload = json.loads(text[len("window.DCF_LEVEL2 = ") : -1])
    lessons = [lesson for module in payload["modules"].values() for lesson in module["lessons"]]
    expected_ids = [
        "mean", "median", "mode", "range", "variance", "standard-deviation", "percentiles",
        "histogram", "density", "shape", "skew", "multimodality", "bins",
        "bar-chart", "boxplot", "violin-plot", "ecdf",
        "outliers", "leverage", "capture-error", "rare-valid",
    ]
    if [lesson["id"] for lesson in lessons] != expected_ids:
        fail("Nivel 2 no conserva los 21 conceptos curriculares en orden")
    expected_scenes = [f"L2-S{index:02d}" for index in range(1, 22)]
    if [lesson.get("narrative", {}).get("scene") for lesson in lessons] != expected_scenes:
        fail("Nivel 2 no implementa las 21 escenas narrativas en orden")
    forbidden_don_juan = [
        "variable", "muestra", "población", "promedio", "distribución", "algoritmo",
        "correlación", "métrica", "significancia", "varianza", "percentil", "leverage",
    ]
    level2_questions: list[str] = []
    for lesson in lessons:
        if lesson.get("storySource") != "docs/stories/LEVEL_2.md" or lesson.get("storyStatus") != "approved":
            fail(f"{lesson['id']} no apunta a la historia aprobada de Nivel 2")
        narrative = lesson.get("narrative", {})
        if len(narrative.get("subtitles", [])) != len(lesson["visual"]["states"]):
            fail(f"{lesson['id']} no declara un subtítulo por estado visual")
        if not narrative.get("donJuan") or not narrative.get("paco") or not narrative.get("agentCompetency"):
            fail(f"{lesson['id']} no declara voces o competencia auxiliar")
        don_line = narrative["donJuan"].lower()
        if any(term in don_line for term in forbidden_don_juan):
            fail(f"Don Juan usa terminología técnica en {lesson['id']}: {don_line}")
        if "pedido" not in lesson["unit"]:
            fail(f"{lesson['id']} no conserva pedido como unidad de análisis")
        level2_questions.extend(exercise["question"] for exercise in lesson["exercises"])
        practice_text = json.dumps(lesson["practiceStory"], ensure_ascii=False)
        for stale_name in ["Lucía", "Don José", "Mariana", "Roberto"]:
            if stale_name in practice_text:
                fail(f"{lesson['id']} conserva una práctica ajena al mundo narrativo")
        student_surface = json.dumps(
            {
                key: lesson.get(key)
                for key in [
                    "objective", "definition", "intuition", "error", "visual",
                    "exercises", "learningModule", "practiceStory", "unit", "variables",
                ]
            },
            ensure_ascii=False,
        ).lower()
        for stale_domain in ["pingü", "alquiler", "vino", "masa corporal", "731 días", "6,497"]:
            if stale_domain in student_surface:
                fail(f"{lesson['id']} conserva evidencia estudiantil de otro dominio: {stale_domain}")
    if len(set(level2_questions)) != 42:
        fail("Los 42 ejercicios de Nivel 2 deben plantear preguntas distintas")
    generic_answers = [
        "La entrada, el parámetro u operación compatible",
        "Afirmar que el cambio observado fue causado",
    ]
    exercise_text = json.dumps([lesson["exercises"] for lesson in lessons], ensure_ascii=False)
    if any(fragment in exercise_text for fragment in generic_answers):
        fail("Nivel 2 conserva respuestas genéricas que no dependen de la evidencia")

    metadata_path = ROOT / "datasets" / "narrative" / "pedidos_nivel_2.metadata.json"
    orders_path = ROOT / "datasets" / "narrative" / "pedidos_4_semanas_nivel_2.csv"
    audit_path = ROOT / "datasets" / "narrative" / "auditoria_atipicos_nivel_2.csv"
    metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
    if csv_dimensions(orders_path) != (600, 10):
        fail("El dataset narrativo de Nivel 2 debe tener 600 filas y 10 columnas")
    if csv_dimensions(audit_path) != (4, 7):
        fail("La auditoría narrativa de Nivel 2 debe tener 4 filas y 7 columnas")
    if metadata.get("seed") != 20260628 or metadata.get("generator") != "level2-orders-v1":
        fail("Metadata narrativa de Nivel 2 sin semilla o generador canónico")
    if sha256(orders_path) != metadata["files"]["orders"]["sha256"]:
        fail("Hash inválido del dataset narrativo de Nivel 2")
    if sha256(audit_path) != metadata["files"]["audit"]["sha256"]:
        fail("Hash inválido de la auditoría narrativa de Nivel 2")
    with orders_path.open("r", encoding="utf-8", newline="") as handle:
        order_rows = list(csv.DictReader(handle))
    counts: dict[str, int] = {}
    for row in order_rows:
        counts[row["noche_id"]] = counts.get(row["noche_id"], 0) + 1
    if sorted(counts.values()) != list(range(30, 46)):
        fail(f"Las 16 noches deben usar una vez cada conteo de 30 a 45: {counts}")
    if min(row["fecha_hora"][:10] for row in order_rows) != "2026-06-04" or max(row["fecha_hora"][:10] for row in order_rows) != "2026-06-28":
        fail("El periodo narrativo de Nivel 2 no coincide con junio de 2026")
    private_terms = ["rogelio", "dieta", "lupita", "beto", "paco", "don juan", "edad", "género", "ropa"]
    dataset_text = orders_path.read_text(encoding="utf-8").lower()
    if any(term in dataset_text for term in private_terms):
        fail("El dataset narrativo de Nivel 2 expone identidad o atributos personales")
    with audit_path.open("r", encoding="utf-8", newline="") as handle:
        audit_rows = list(csv.DictReader(handle))
    expected_audit = {("P-005", "500"), ("P-007", "30"), ("L2-X001", "360"), ("L2-A001", "36")}
    if {(row["caso_id"], row["valor"]) for row in audit_rows} != expected_audit:
        fail("La auditoría de Nivel 2 no conserva los cuatro casos canónicos")
    if payload.get("storyStatus") != "approved" or payload.get("narrativeDataset", {}).get("id") != "pedidos-puesto-nivel-2":
        fail("curriculum.js de Nivel 2 no publica trazabilidad narrativa")
    manifest = json.loads((level_path / "manifest.json").read_text(encoding="utf-8"))
    for key in ["curriculum_source", "story_source", "story_status", "story_version", "narrative_dataset"]:
        if not manifest.get(key):
            fail(f"Manifest de Nivel 2 no declara {key}")
    story = (ROOT / "docs" / "stories" / "LEVEL_2.md").read_text(encoding="utf-8")
    if re.findall(r"`(L2-S\d{2})`", story)[:21] != expected_scenes:
        fail("La historia independiente de Nivel 2 no contiene 21 escenas en orden")
    for required_fragment in [
        "aprobada para implementación", "600 pedidos sintéticos", "30 y 45 pedidos",
        "Subtítulo del narrador · inicio", "Subtítulo del narrador · evidencia",
        "L1.4 → pedidos_4_semanas@L2.1", "¿Esto se repetirá o fue casualidad?",
    ]:
        if required_fragment not in story:
            fail(f"Historia de Nivel 2 incompleta: {required_fragment}")
    app = (level_path / "assets" / "app.js").read_text(encoding="utf-8")
    css = (level_path / "assets" / "styles.css").read_text(encoding="utf-8")
    for fragment in ["sceneId", "donJuanLine", "pacoLine", "narratorSubtitle", "renderNarrativeOutlier"]:
        if fragment not in app:
            fail(f"UI narrativa de Nivel 2 incompleta: {fragment}")
    for fragment in [".scene-card", ".dialogue.don-juan", ".dialogue.paco", ".narrator-subtitle"]:
        if fragment not in css:
            fail(f"CSS narrativo de Nivel 2 incompleto: {fragment}")


def correlation(xs: list[float], ys: list[float]) -> float:
    mx, my = statistics.mean(xs), statistics.mean(ys)
    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / math.sqrt(
        sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys)
    )


def validate_continuous_level(
    level_index: int,
    public_dataset_ids: set[str],
    expected_ids: list[str],
) -> dict[str, object]:
    level = level_index + 1
    level_path = LEVELS[level_index]
    text = (level_path / "assets" / "curriculum.js").read_text(encoding="utf-8").strip()
    prefix = "window.DCF_LEVEL = "
    if not text.startswith(prefix) or not text.endswith(";"):
        fail(f"Nivel {level} no publica el payload narrativo esperado")
    payload = json.loads(text[len(prefix):-1])
    lessons = [lesson for module in payload["modules"].values() for lesson in module["lessons"]]
    if [lesson["id"] for lesson in lessons] != expected_ids:
        fail(f"Nivel {level} no conserva el temario canónico en orden")
    if payload.get("storyStatus") != "approved" or payload.get("storySource") != f"docs/stories/LEVEL_{level}.md":
        fail(f"Nivel {level} carece de historia aprobada")
    app = (level_path / "assets" / "app.js").read_text(encoding="utf-8")
    css = (level_path / "assets" / "styles.css").read_text(encoding="utf-8")
    manifest = json.loads((level_path / "manifest.json").read_text(encoding="utf-8"))
    expected_shell = {
        "experienceContract": "level-shell-v1", "blockNavigation": "left",
        "conceptNavigation": "top", "visualizationMatrix": f"level-{level}-visuals-v1",
        "rendererRegistry": "educational-svg-v1",
    }
    for key, expected in expected_shell.items():
        if manifest.get(key) != expected:
            fail(f"Nivel {level} no cumple {key}={expected}")
    renderer_source = (level_path / "assets" / "renderers.js").read_text(encoding="utf-8")
    if "bar-row" in app or "bar-row" in css:
        fail(f"Nivel {level} conserva el renderer universal de barras")
    from narrative_level_factory import VISUALIZATION_MATRIX
    for fragment in ['params.get("teacher")', "evidenceContract", "subtitle", "donJuan", "paco", "prefers-reduced-motion"]:
        if fragment not in app and fragment not in css:
            fail(f"Nivel {level} no implementa contrato de UI: {fragment}")
    forbidden = ["correlación", "p-value", "variable", "algoritmo", "regresión", "leakage", "distribución"]
    all_evidence: set[str] = set()
    for position, lesson in enumerate(lessons, start=1):
        narrative = lesson.get("narrative", {})
        if narrative.get("scene") != f"L{level}-S{position:02d}":
            fail(f"Escena fuera de orden en {lesson['id']}")
        states = lesson.get("visual", {}).get("states", [])
        spec = lesson.get("visualizationSpec", {})
        required_spec = {"kind", "mechanism", "dataSource", "fields", "encodings", "states", "semanticMarks", "evidenceIds", "interaction", "accessibleSummary", "reducedMotion", "limits", "rendererRegistry"}
        if set(spec) != required_spec or spec.get("kind") != VISUALIZATION_MATRIX[level].get(lesson["id"]):
            fail(f"VisualizationSpec ausente o incompatible en {lesson['id']}")
        if f'"{spec["kind"]}"' not in renderer_source:
            fail(f"Renderer declarado no registrado en {lesson['id']}")
        if spec["kind"].endswith("bars") and spec["kind"] != "importance-bars":
            fail(f"Barras no justificadas en {lesson['id']}")
        if len(states) < 2 or len(narrative.get("subtitles", [])) != len(states):
            fail(f"Subtítulo ausente por estado en {lesson['id']}")
        if any(term in narrative.get("donJuan", "").lower() for term in forbidden):
            fail(f"Don Juan usa jerga en {lesson['id']}")
        evidence_ids = {
            mark["evidenceId"] for state in states for mark in state.get("marks", [])
        }
        if len(evidence_ids) != len(states) or evidence_ids & all_evidence:
            fail(f"Evidencia ausente o duplicada en {lesson['id']}")
        all_evidence |= evidence_ids
        if len(lesson.get("exercises", [])) != 2:
            fail(f"{lesson['id']} no contiene guiado y transferencia")
        questions = set()
        for exercise in lesson["exercises"]:
            contract = exercise.get("evidenceContract", {})
            if contract.get("requiredSteps") != len(states) - 1 or contract.get("unlockAtStep") != len(states) - 1:
                fail(f"Bloqueo de evidencia inconsistente en {lesson['id']}")
            if set(contract.get("requiredEvidenceIds", [])) != evidence_ids:
                fail(f"Marcas requeridas inconsistentes en {lesson['id']}")
            if sum(bool(option.get("correct")) for option in exercise.get("options", [])) != 1:
                fail(f"Respuesta ambigua en {lesson['id']}")
            if not exercise.get("evidence") or exercise["question"] in questions:
                fail(f"Ejercicios no diferenciados en {lesson['id']}")
            if not exercise["question"].startswith("Observa ") or spec["semanticMarks"] not in exercise["question"]:
                fail(f"Ejercicio sin referencia a marca visual real en {lesson['id']}")
            questions.add(exercise["question"])
        live_id = lesson.get("liveTeachingPack", {}).get("dataset", {}).get("id")
        if live_id not in public_dataset_ids:
            fail(f"En vivo de {lesson['id']} no usa snapshot público registrado")
        package = level_path / "docs" / "packages" / f"{lesson['id']}.md"
        if not package.exists() or "## LiveTeachingPack" not in package.read_text(encoding="utf-8"):
            fail(f"Paquete incompleto en {lesson['id']}")
    metadata = payload.get("narrativeDataset", {})
    metadata_path = ROOT / metadata.get("metadataPath", "")
    if not metadata_path.exists() or sha256(metadata_path) != metadata.get("metadataSha256"):
        fail(f"Metadata narrativa inválida en Nivel {level}")
    for record in metadata.get("files", []):
        path = ROOT / record["path"]
        if csv_dimensions(path) != (record["rows"], record["columns"]) or sha256(path) != record["sha256"]:
            fail(f"Archivo narrativo inválido: {path}")
        content = path.read_text(encoding="utf-8").lower()
        if any(term in content for term in ["don juan", "paco", "mari", "chava", "lupita", "dieta", "beca", "radio"]):
            fail(f"Datos narrativos exponen personaje o secreto: {path}")
    return payload


def validate_levels_3_to_7(public_dataset_ids: set[str]) -> None:
    ids3 = ["event", "complement", "independence", "conditional-probability", "bernoulli", "binomial", "normal", "poisson", "sampling-variability", "selection-bias", "law-large-numbers", "standard-error", "confidence-interval", "bootstrap", "hypothesis", "p-value", "type-i-error", "type-ii-error", "power"]
    ids4 = ["scatterplot", "trend", "relationship-shape", "groups", "direction", "strength", "pearson", "spearman", "correlation-outliers", "causality", "confounders", "aggregation-bias", "proportions", "relative-risk", "odds"]
    ids5 = ["fit", "slope", "intercept", "residuals", "assumptions", "explanatory-variables", "interaction", "collinearity", "class", "score", "threshold", "probability", "decision-tree", "rules", "importance", "encoding", "scaling", "leakage"]
    ids6 = ["train", "validation", "test", "cross-validation", "mae", "mse", "rmse", "r2", "true-positive", "true-negative", "false-positive", "false-negative", "precision", "recall", "specificity", "f1", "roc", "pr", "threshold-cost", "calibration", "bias", "variance", "overfitting", "regularization"]
    ids7 = ["distance", "k-means", "centroids", "cluster-count", "pca", "components", "explained-variance", "rarity", "isolation", "anomaly-threshold"]
    payload3 = validate_continuous_level(2, public_dataset_ids, ids3)
    payload4 = validate_continuous_level(3, public_dataset_ids, ids4)
    payload5 = validate_continuous_level(4, public_dataset_ids, ids5)
    payload6 = validate_continuous_level(5, public_dataset_ids, ids6)
    payload7 = validate_continuous_level(6, public_dataset_ids, ids7)

    l3_orders = ROOT / "datasets/narrative/pedidos_piloto_nivel_3.csv"
    l3_nights = ROOT / "datasets/narrative/noches_piloto_nivel_3.csv"
    if csv_dimensions(l3_orders) != (1360, 12) or csv_dimensions(l3_nights) != (32, 9):
        fail("Dimensiones de Nivel 3 incorrectas")
    with l3_nights.open("r", encoding="utf-8", newline="") as handle:
        n3 = list(csv.DictReader(handle))
    counts3 = [int(row["pedidos_totales"]) for row in n3]
    if sorted(counts3) != sorted(list(range(35, 51)) * 2) or sum(int(row["encargo_programado"]) for row in n3) != 8:
        fail("Conteos o encargos de Nivel 3 inconsistentes")

    l4_path = ROOT / "datasets/narrative/noches_contexto_nivel_4.csv"
    with l4_path.open("r", encoding="utf-8", newline="") as handle:
        n4 = list(csv.DictReader(handle))
    if len(n4) != 48 or min(int(row["pedidos_totales"]) for row in n4) < 40 or max(int(row["pedidos_totales"]) for row in n4) > 60:
        fail("Rango de pedidos de Nivel 4 incorrecto")
    aggregate = correlation([float(row["temperatura_c"]) for row in n4], [float(row["espera_mediana_min"]) for row in n4])
    group_corrs = []
    for stage in ["piloto", "espera_marcada"]:
        group = [row for row in n4 if row["etapa_operativa"] == stage]
        group_corrs.append(correlation([float(row["temperatura_c"]) for row in group], [float(row["espera_mediana_min"]) for row in group]))
    if not (aggregate > 0.5 and all(value < -0.2 for value in group_corrs)):
        fail("Nivel 4 no conserva la reversión agregada validada")

    l5_path = ROOT / "datasets/narrative/noches_modelado_nivel_5.csv"
    with l5_path.open("r", encoding="utf-8", newline="") as handle:
        n5 = list(csv.DictReader(handle))
    if len(n5) != 64 or min(int(row["pedidos_totales"]) for row in n5) < 55 or max(int(row["pedidos_totales"]) for row in n5) > 75:
        fail("Rango de pedidos de Nivel 5 incorrecto")
    meta5 = payload5["narrativeDataset"]
    blocked = {"tacos_vendidos", "espera_mediana_min", "merma_kg"}
    if set(meta5.get("blocked_leakage", [])) != blocked or blocked & set(meta5.get("allowed_predictors", [])):
        fail("Nivel 5 permite leakage")
    xs = [float(row["inventario_carne_kg"]) for row in n5]; ys = [float(row["pedidos_totales"]) for row in n5]
    slope = sum((x - statistics.mean(xs)) * (y - statistics.mean(ys)) for x, y in zip(xs, ys)) / sum((x - statistics.mean(xs)) ** 2 for x in xs)
    intercept = statistics.mean(ys) - slope * statistics.mean(xs)
    if abs(slope - meta5["simple_regression"]["slope"]) > 1e-7 or abs(intercept - meta5["simple_regression"]["intercept"]) > 1e-7:
        fail("Coeficientes de Nivel 5 no son reproducibles")
    if meta5.get("fit_scope") != "descriptivo_en_muestra":
        fail("Nivel 5 adelanta generalización")

    l6_path = ROOT / "datasets/narrative/noches_evaluacion_nivel_6.csv"
    with l6_path.open("r", encoding="utf-8", newline="") as handle:
        n6 = list(csv.DictReader(handle))
    splits = {name: sum(row["split"] == name for row in n6) for name in ("train", "validation", "test")}
    if len(n6) != 96 or splits != {"train": 48, "validation": 16, "test": 32}:
        fail("Particiones de Nivel 6 incorrectas")
    if any(row["fold_desarrollo"] for row in n6 if row["split"] == "test"):
        fail("Nivel 6 filtra test dentro de cross-validation")
    conserved_text = ["fecha", "dia_semana"]
    conserved_numeric = ["temperatura_c", "lluvia_mm", "partido_cerca", "encargo_programado", "inventario_carne_kg", "pedidos_totales"]
    for previous, current in zip(n5, n6[:64]):
        if any(previous[field] != current[field] for field in conserved_text) or any(float(previous[field]) != float(current[field]) for field in conserved_numeric):
            fail("Nivel 6 no conserva las 64 noches canónicas de L5.6")
    meta6 = payload6["narrativeDataset"]
    cm = meta6.get("test_confusion", {})
    if sum(cm.values()) != 32 or meta6.get("test_policy") != "sellado hasta congelar modelo, umbral y regularización":
        fail("Contrato de test de Nivel 6 inválido")
    if not (0 <= meta6["classification_metrics"]["precision"] <= 1 and meta6["regression_metrics"]["rmse"] >= 0):
        fail("Métricas de Nivel 6 fuera de rango")

    l7_path = ROOT / "datasets/narrative/noches_segmentos_nivel_7.csv"
    with l7_path.open("r", encoding="utf-8", newline="") as handle:
        n7 = list(csv.DictReader(handle))
    if len(n7) != 64 or min(int(row["pedidos_totales"]) for row in n7) < 60 or max(int(row["pedidos_totales"]) for row in n7) > 85:
        fail("Rango o tamaño de Nivel 7 incorrecto")
    if any(sum(int(row["servicio_reunion"]) for row in n7[start:start + 4]) > 2 for start in range(0, 64, 4)):
        fail("Nivel 7 excede dos servicios semanales")
    meta7 = payload7["narrativeDataset"]
    if meta7.get("anomaly_review", {}).get("policy") != "prioridad para revisión humana; no fraude ni borrado":
        fail("Nivel 7 convierte anomalías en veredictos")
    if len(meta7.get("anomaly_review", {}).get("review_night_indices", [])) != 4:
        fail("Nivel 7 no respeta capacidad de revisión")


def validate_placeholders() -> None:
    pattern = re.compile(r"\b(TBD|por definir)\b", re.IGNORECASE)
    roots = [ROOT / "docs", ROOT / "generated", ROOT / "site", ROOT / "datasets"]
    for base in roots:
        for path in base.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in {".md", ".html", ".js", ".json"}:
                continue
            if pattern.search(path.read_text(encoding="utf-8", errors="ignore")):
                fail(f"Placeholder encontrado en {path}")


def validate_narrative_contract() -> None:
    required = [
        ROOT / "docs" / "COURSE_STORY_BIBLE.md",
        ROOT / "docs" / "LEVEL_1_NARRATIVE_ARC.md",
        ROOT / "docs" / "LEVEL_2_NARRATIVE_ARC.md",
        ROOT / "docs" / "CONTINUITY_LEDGER.md",
        ROOT / "docs" / "stories" / "README.md",
        ROOT / "docs" / "stories" / "LEVEL_1.md",
        ROOT / "docs" / "stories" / "LEVEL_2.md",
        ROOT / "docs" / "pipeline" / "README.md",
        ROOT / "docs" / "LEVEL_1_ALFABETIZACION_VERTICAL_SLICE.md",
        ROOT / "evals" / "narrative_continuity_checklist.md",
        ROOT / "evals" / "story_pipeline_checklist.md",
        ROOT / "templates" / "level_story.template.md",
    ]
    for path in required:
        if not path.exists():
            fail(f"Falta artefacto narrativo: {path}")

    raw_path = ROOT / "datasets" / "narrative" / "pedidos_crudos_nivel_1.csv"
    prepared_path = (
        ROOT / "datasets" / "narrative" / "pedidos_preparados_nivel_1.csv"
    )
    if csv_dimensions(raw_path) != (10, 7):
        fail("pedidos_crudos_nivel_1.csv debe tener 10 filas y 7 columnas")
    if csv_dimensions(prepared_path) != (9, 9):
        fail("pedidos_preparados_nivel_1.csv debe tener 9 filas y 9 columnas")

    expected_hashes = {
        raw_path: "beb9df84625b6defc1f4d7dda3dbbc96cae0c7be5a54225ce051d33628689718",
        prepared_path: "b38fffd6b3fedb3f99ca329ac7168698c08898d3b4ff77fa961fb69eb45ae675",
    }
    for path, expected_hash in expected_hashes.items():
        if sha256(path) != expected_hash:
            fail(f"Hash narrativo inválido: {path}")

    with raw_path.open("r", encoding="utf-8", newline="") as handle:
        raw_rows = list(csv.DictReader(handle))
    if len({row["pedido_id"] for row in raw_rows}) != 9:
        fail("La tabla cruda debe conservar 9 IDs únicos en 10 filas")
    if not any(row["pedido_id"] == "P-007" and row["num_tacos"] == "30" for row in raw_rows):
        fail("P-007 debe conservar el caso raro válido de 30 tacos")

    with prepared_path.open("r", encoding="utf-8", newline="") as handle:
        prepared_rows = list(csv.DictReader(handle))
    statuses: dict[str, int] = {}
    for row in prepared_rows:
        status = row["estado_calidad"]
        statuses[status] = statuses.get(status, 0) + 1
    expected_statuses = {
        "valido": 7,
        "faltante_no_imputado": 1,
        "invalido_pendiente_fuente": 1,
    }
    if statuses != expected_statuses:
        fail(f"Estados narrativos inconsistentes: {statuses}")

    fragments = {
        ROOT / "docs" / "COURSE_STORY_BIBLE.md": [
            "don-juan-paco-course-v2",
            "CharacterCard: Don Juan",
            "CharacterCard: Paco",
            "CharacterCard: Narrador",
            "CharacterCard: Lupita",
            "CharacterCard: Beto",
            "CharacterCard: profesora Elena",
            "CharacterCard: profesor Iván",
            "CharacterCard: señor Rogelio",
            "Matriz incremental de dinámica y relaciones",
            "Tamaño inicial canónico del puesto",
            "Matriz incremental de crecimiento del puesto",
            "25–40 pedidos por noche",
            "18 asientos",
            "Arco general de nueve niveles",
        ],
        ROOT / "docs" / "LEVEL_1_NARRATIVE_ARC.md": [
            "L1-E1",
            "L1-E2",
            "L1-E3",
            "L1-E4",
            "continuityDelta",
            "dataStateDelta",
            "growthDelta",
            "Matriz incremental de dinámica de Nivel 1",
        ],
        ROOT / "docs" / "CONTINUITY_LEDGER.md": [
            "L2.4-v1",
            "Estado de secretos narrativos",
            "Estado del crecimiento",
            "Estado de Nivel 2",
            "pedidos_4_semanas@L2.1",
            "growthDelta",
        ],
        ROOT / "docs" / "LEVEL_1_ALFABETIZACION_VERTICAL_SLICE.md": [
            "EvidenceContract",
            "sample-first-three",
            "population-ten-orders",
            "sample-coverage-warning",
            "Este incidente ocurre después de la libreta",
            "growthDelta",
        ],
        ROOT / "docs" / "stories" / "LEVEL_1.md": [
            "aprobada para implementación",
            "don-juan-paco-level-1-v2",
            "segundo de preparatoria",
            "profesora Elena",
            "profesor Iván",
            "Lupita",
            "Beto",
            "El puesto no crece durante Nivel 1",
            "Subtítulo del narrador · inicio",
            "Subtítulo del narrador · evidencia",
            "pedidos_crudos -> esquema -> reporte_de_calidad -> pedidos_preparados",
        ],
        ROOT / "docs" / "pipeline" / "README.md": [
            "temario predeterminado -> historia independiente -> nivel educativo",
            "Puerta curricular",
            "Puerta narrativa",
            "Puerta de implementación",
            "docs/stories/LEVEL_<N>.md",
        ],
    }
    for path, expected_fragments in fragments.items():
        content = path.read_text(encoding="utf-8")
        for fragment in expected_fragments:
            if fragment not in content:
                fail(f"{path.name} no contiene contrato narrativo: {fragment}")

    level_story = (ROOT / "docs" / "stories" / "LEVEL_1.md").read_text(encoding="utf-8")
    ordered_concepts = [
        "observación", "variable", "tabla", "población", "muestra",
        "numérica", "categórica", "ordinal", "fecha", "texto", "faltantes",
        "duplicados", "rangos inválidos", "sesgo de medición", "filtrar",
        "ordenar", "agrupar", "transformar",
    ]
    positions = [level_story.find(f"| {concept} |") for concept in ordered_concepts]
    if any(position < 0 for position in positions) or positions != sorted(positions):
        fail("La historia de Nivel 1 no conserva los 18 conceptos curriculares en orden")
    if level_story.count("Subtítulo del narrador · inicio") < 18:
        fail("La historia de Nivel 1 no contiene subtítulo inicial por escena")
    if level_story.count("Subtítulo del narrador · evidencia") < 18:
        fail("La historia de Nivel 1 no contiene subtítulo de evidencia por escena")
    if "**Narrador:**" in level_story:
        fail("El narrador no puede aparecer como personaje de diálogo")
    forbidden_don_juan = [
        "variable", "muestra", "población", "algoritmo", "correlación",
        "distribución", "métrica", "significancia", "dataframe",
    ]
    don_juan_lines = [
        line.lower() for line in level_story.splitlines() if line.startswith("**Don Juan:**")
    ]
    for line in don_juan_lines:
        if any(term in line for term in forbidden_don_juan):
            fail(f"Don Juan usa terminología técnica en la historia: {line}")

    story_bible = (ROOT / "docs" / "COURSE_STORY_BIBLE.md").read_text(encoding="utf-8")
    for level in range(1, 10):
        if story_bible.count(f"| {level} |") < 2:
            fail(f"Story Bible no declara arco y crecimiento del Nivel {level}")

    private_terms = ["rogelio", "dieta", "lupita", "beto", "paco", "don juan"]
    narrative_data = raw_path.read_text(encoding="utf-8").lower() + prepared_path.read_text(
        encoding="utf-8"
    ).lower()
    for term in private_terms:
        if term in narrative_data:
            fail(f"El dataset narrativo expone identidad o secreto: {term}")

    for name in ["course-narrative-architect", "narrative-continuity-reviewer", "level-experience-consistency-reviewer", "visualization-contract-designer"]:
        skill = ROOT / ".agents" / "skills" / name / "SKILL.md"
        metadata = ROOT / ".agents" / "skills" / name / "agents" / "openai.yaml"
        if not skill.exists() or not metadata.exists():
            fail(f"Skill narrativa incompleta: {name}")
        if "TODO" in skill.read_text(encoding="utf-8"):
            fail(f"Skill narrativa con placeholder: {name}")


def main() -> int:
    datasets = validate_datasets()
    public_dataset_ids = {str(item["id"]) for item in datasets}
    manifests = [validate_level(path) for path in LEVELS]
    for level, (path, manifest) in enumerate(zip(LEVELS, manifests), start=1):
        for key, expected_value in {"experienceContract": "level-shell-v1", "blockNavigation": "left", "conceptNavigation": "top"}.items():
            if manifest.get(key) != expected_value:
                fail(f"Nivel {level} incumple el shell común: {key}")
        html = next((candidate for candidate in path.glob("*.html") if candidate.name != "index.html"), None)
        if not html or "level-shell-v1" not in html.read_text(encoding="utf-8"):
            fail(f"Nivel {level} no carga level-shell-v1")
    for html in (ROOT / "site").rglob("*.html"):
        validate_links(html)
    validate_level1_contract(public_dataset_ids)
    validate_level2_payload(public_dataset_ids)
    validate_levels_3_to_7(public_dataset_ids)
    validate_narrative_contract()
    validate_placeholders()
    totals = {
        "concepts": sum(item["concept_count"] for item in manifests),
        "exercises": sum(item["exercise_count"] for item in manifests),
        "prompts": sum(item["prompt_count"] for item in manifests),
    }
    expected = {"concepts": 125, "exercises": 232, "prompts": 375}
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
