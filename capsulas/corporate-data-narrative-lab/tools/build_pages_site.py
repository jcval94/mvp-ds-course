from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Any


REQUIRED_VISUAL_FIELDS = [
    "chart_type",
    "question_answered",
    "correct_read",
    "decision_changed",
]

TOPIC_OVERRIDES = {
    "01": "Sesgo de medicion",
    "02": "Sesgo de cobertura",
    "03": "Fuga temporal",
    "04": "Sesgo de asignacion",
    "05": "Distribuciones y colas",
    "06": "Metrica proxy",
    "07": "Ajuste por complejidad",
    "08": "Estacionalidad",
    "09": "Extrapolacion",
    "10": "Definicion de KPI",
    "11": "Umbrales manipulables",
    "12": "Calidad de datos",
    "13": "Inferencia experimental",
    "14": "Clasificacion desbalanceada",
    "15": "Drift y monitoreo",
    "16": "Gobernanza de metricas",
    "17": "Impacto incremental",
    "18": "Riesgo y revision humana",
    "19": "Instrucciones para IA",
    "20": "Etiquetado y variables",
    "21": "Permisos de agentes",
    "22": "Prototipo vs producto",
    "23": "Autorizacion de agentes",
    "24": "Taxonomia de IA",
    "25": "RAG y fuentes",
    "26": "Objetivos de agentes",
    "27": "Sesgo historico",
    "28": "Human-in-the-loop",
    "29": "Apelacion y gobernanza",
    "30": "Decision antes del modelo",
    "31": "Propiedad operativa",
    "32": "Metrica tecnica vs capacidad",
    "33": "Costo de error",
    "34": "Evaluacion por segmentos",
    "35": "Reproducibilidad en Colab",
    "36": "Rutas y carga de datos",
    "37": "Interpretes de Python",
    "38": "Entornos virtuales",
    "39": "Control de versiones",
    "40": "Reproducibilidad de graficos",
    "41": "Documentacion reproducible",
    "42": "Pull requests y ramas",
    "43": "Revision de cambios con asistentes",
    "44": "Verificacion con pruebas",
    "45": "Especificacion de prompts",
    "46": "PRD para agentes",
    "47": "Criterios de aceptacion",
    "48": "Tareas revisables para agentes",
    "49": "Programacion basica",
    "50": "Estructuras de datos en Python",
    "51": "Logica de automatizacion",
    "52": "Funciones reutilizables",
    "53": "Errores y archivos",
    "54": "Reto narrativo en Python",
    "55": "SQL basico",
    "56": "JOINs y granularidad",
    "57": "SQL analitico",
    "58": "ABT para ML",
    "59": "Esquema y contexto",
    "60": "Lectura de fuentes",
    "61": "Pandas esencial",
    "62": "Limpieza de datos",
    "63": "Conteos y tasas",
    "64": "Distribuciones y percentiles",
    "65": "Segmentacion y mezcla",
    "66": "Ventanas temporales",
    "67": "Valores atipicos",
    "68": "Seleccion de graficas",
    "69": "Escalas visuales",
    "70": "Color y jerarquia visual",
    "71": "Doble eje",
    "72": "Anotaciones y contexto",
    "73": "Sesgo de seleccion",
    "74": "Incertidumbre y muestra",
    "75": "Pruebas multiples",
    "76": "Correlacion y causalidad",
    "77": "Aleatorizacion",
    "78": "Fuga de objetivo",
    "79": "Particiones de datos",
    "80": "Clases desbalanceadas",
    "81": "Umbrales y capacidad",
    "82": "Sobreajuste",
    "83": "Ventanas de variables",
    "84": "Lineas base",
    "85": "Explicabilidad y apelacion",
    "86": "Drift y monitoreo",
    "87": "Contratos de datos",
}

TOPIC_RULES = [
    ("Sesgo de medicion", ("sesgo de medicion", "cambio de canal")),
    ("Sesgo de cobertura", ("sesgo de cobertura", "no respuesta")),
    ("Fuga temporal", ("fuga de informacion temporal", "leakage")),
    ("Sesgo de asignacion", ("sesgo de asignacion",)),
    ("Distribuciones y colas", ("cola de distribucion", "long_tail", "percentiles")),
    ("Metrica proxy", ("metrica proxy", "productividad aparente")),
    ("Ajuste por complejidad", ("complejidad", "difficulty")),
    ("Estacionalidad", ("estacionalidad", "seasonal")),
    ("Extrapolacion", ("extrapolacion", "poblacion elegible")),
    ("Definicion de KPI", ("definicion de kpi", "cambio de definicion")),
    ("Umbrales manipulables", ("umbral", "threshold")),
    ("Calidad de datos", ("calidad de datos", "taxonomia", "otros")),
    ("Inferencia experimental", ("muestra pequena", "parada anticipada", "intervalo")),
    ("Clasificacion desbalanceada", ("clases desbalanceadas", "falsos positivos", "confusion")),
    ("Drift y monitoreo", ("drift", "monitoreo")),
    ("Gobernanza de metricas", ("gobernanza", "versionado de metricas")),
    ("Impacto incremental", ("impacto incremental", "treatment_control")),
    ("Riesgo y revision humana", ("revision humana", "alto impacto")),
    ("Instrucciones para IA", ("instrucciones precisas", "comunicarse con una maquina")),
    ("Etiquetado y variables", ("variables", "etiquetas", "lenguaje formal")),
    ("Permisos de agentes", ("permisos", "acciones y permisos")),
    ("Prototipo vs producto", ("prototipo", "producto operable")),
    ("Autorizacion de agentes", ("autorizacion en agentes", "permission")),
    ("Taxonomia de IA", ("diferencias entre ia", "capability_matrix")),
    ("RAG y fuentes", ("rag", "fuentes")),
    ("Objetivos de agentes", ("objetivos mal definidos", "metrica proxy")),
    ("Sesgo historico", ("sesgo en datos historicos", "decision automatizada")),
    ("Human-in-the-loop", ("human in the loop",)),
    ("Apelacion y gobernanza", ("apelacion", "decisiones automaticas")),
    ("Decision antes del modelo", ("decision antes del modelo",)),
    ("Propiedad operativa", ("propiedad operativa",)),
    ("Metrica tecnica vs capacidad", ("auc", "capacidad operativa")),
    ("Costo de error", ("costo de error",)),
    ("Evaluacion por segmentos", ("evaluacion por segmentos",)),
    ("Reproducibilidad en Colab", ("google colab", "colab_setup")),
    ("Rutas y carga de datos", ("rutas", "montaje de drive", "data_paths")),
    ("Interpretes de Python", ("interpretes de python", "python_paths")),
    ("Entornos virtuales", ("entornos virtuales", "package_envs")),
    ("Control de versiones", ("control de versiones", "version_history")),
    ("Reproducibilidad de graficos", ("reproducible", "data_code_diff")),
    ("Documentacion reproducible", ("documentacion minima", "readme")),
    ("Pull requests y ramas", ("branches", "pull requests")),
    ("Revision de cambios con asistentes", ("asistentes de codigo", "reviewed_diff")),
    ("Verificacion con pruebas", ("verificacion", "test_verification")),
    ("Especificacion de prompts", ("prompts", "limites para asistentes")),
    ("PRD para agentes", ("prd", "acceptance_criteria")),
    ("Criterios de aceptacion", ("criterios de aceptacion",)),
    ("Tareas revisables para agentes", ("tareas para agentes", "review_flow")),
    ("Programacion basica", ("programar", "ejecutar instrucciones", "instruction_steps")),
    ("Estructuras de datos en Python", ("listas", "diccionarios", "data_structures")),
    ("Logica de automatizacion", ("condicionales", "loops", "automation_logic")),
    ("Funciones reutilizables", ("funciones limpias", "function_reuse")),
    ("Errores y archivos", ("manejo de errores", "error_handling")),
    ("Reto narrativo en Python", ("mini reto", "minecraft_resources")),
    ("SQL basico", ("sql basico", "basic_sql")),
    ("JOINs y granularidad", ("joins", "granularidad", "join_duplicates")),
    ("SQL analitico", ("ctes", "funciones de ventana", "window_metrics")),
    ("ABT para ML", ("abt", "cutoff")),
    ("Esquema y contexto", ("esquema", "schema_context")),
    ("Lectura de fuentes", ("csv", "excel", "json", "apis", "file_reading")),
    ("Pandas esencial", ("pandas", "pandas_flow")),
    ("Limpieza de datos", ("limpieza", "nulos", "duplicados", "cleaning_quality")),
]


class SiteBuildError(RuntimeError):
    pass


@dataclass(frozen=True)
class CaseEntry:
    case_id: str
    slug: str
    title: str
    topic: str
    concept: str
    chart_type: str
    question_answered: str
    correct_read: str
    decision_changed: str
    case_path: Path
    data_spec_path: Path
    visual_spec_path: Path
    html_path: Path
    published_path: str

    def catalog_item(self, lab_root: Path) -> dict[str, Any]:
        return {
            "id": self.case_id,
            "title": self.title,
            "slug": self.slug,
            "topic": self.topic,
            "concept": self.concept,
            "chart_type": self.chart_type,
            "question_answered": self.question_answered,
            "correct_read": self.correct_read,
            "decision_changed": self.decision_changed,
            "source_paths": {
                "case": as_posix(self.case_path.relative_to(lab_root.parent)),
                "data_spec": as_posix(self.data_spec_path.relative_to(lab_root.parent)),
                "visual_spec": as_posix(self.visual_spec_path.relative_to(lab_root.parent)),
                "html": as_posix(self.html_path.relative_to(lab_root.parent)),
            },
            "published_path": self.published_path,
        }


def fold_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", html.unescape(value).lower())
    ascii_text = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    return re.sub(r"\s+", " ", ascii_text).strip()


def as_posix(path: Path) -> str:
    return path.as_posix()


def parse_scalar(value: str) -> Any:
    value = value.strip()
    if not value:
        return ""
    if value[0:1] in {"'", '"'} and value[-1:] == value[0]:
        return value[1:-1]
    folded = value.lower()
    if folded == "true":
        return True
    if folded == "false":
        return False
    if value.startswith("[") and value.endswith("]"):
        raw_items = [item.strip() for item in value[1:-1].split(",")]
        return [parse_scalar(item) for item in raw_items if item]
    if re.fullmatch(r"-?\d+", value):
        return int(value)
    if re.fullmatch(r"-?\d+\.\d+", value):
        return float(value)
    return value


def parse_yaml(path: Path) -> dict[str, Any]:
    try:
        import yaml  # type: ignore
    except ModuleNotFoundError:
        yaml = None

    if yaml is not None:
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        if not isinstance(data, dict):
            raise SiteBuildError(f"{path}: YAML root must be a mapping.")
        return data

    data: dict[str, Any] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or line[:1].isspace():
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = parse_scalar(value)
    return data


def markdown_title(path: Path) -> str:
    match = re.search(r"^#\s+(.+)$", path.read_text(encoding="utf-8"), re.MULTILINE)
    return match.group(1).strip() if match else path.stem


def infer_topic(case_id: str, concept: str, chart_type: str, question: str) -> str:
    if case_id in TOPIC_OVERRIDES:
        return TOPIC_OVERRIDES[case_id]

    haystack = fold_text(" ".join([concept, chart_type, question]))
    matches = {
        topic
        for topic, needles in TOPIC_RULES
        if any(needle in haystack for needle in needles)
    }
    if len(matches) == 1:
        return next(iter(matches))
    if not matches:
        raise SiteBuildError(
            f"Case {case_id} has no topic match. Add a TOPIC_RULES keyword or "
            "TOPIC_OVERRIDES entry."
        )
    raise SiteBuildError(
        f"Case {case_id} matches multiple topics ({', '.join(sorted(matches))}). "
        "Add a TOPIC_OVERRIDES entry."
    )


def discover_case_paths(lab_root: Path) -> list[Path]:
    case_dir = lab_root / "examples" / "cases"
    paths = sorted(case_dir.glob("[0-9][0-9]_*.md"))
    if not paths:
        raise SiteBuildError(f"No cases found in {case_dir}.")
    return paths


def build_catalog(lab_root: Path) -> list[CaseEntry]:
    lab_root = lab_root.resolve()
    entries: list[CaseEntry] = []
    for case_path in discover_case_paths(lab_root):
        match = re.match(r"^(\d{2,})_(.+)$", case_path.stem)
        if not match:
            raise SiteBuildError(f"Unexpected case filename: {case_path.name}")
        case_id, slug = match.groups()
        data_spec_path = lab_root / "examples" / "data_specs" / f"{case_path.stem}.yml"
        visual_spec_path = lab_root / "examples" / "visual_specs" / f"{case_path.stem}.yml"
        html_path = lab_root / "examples" / "html" / f"{case_path.stem}.html"
        for required_path, label in (
            (data_spec_path, "data spec"),
            (visual_spec_path, "visual spec"),
            (html_path, "canonical HTML"),
        ):
            if not required_path.exists():
                raise SiteBuildError(f"Missing {label} for case {case_id}: {required_path}")

        data = parse_yaml(data_spec_path)
        visual = parse_yaml(visual_spec_path)
        missing_visual = [field for field in REQUIRED_VISUAL_FIELDS if not visual.get(field)]
        if missing_visual:
            raise SiteBuildError(
                f"{visual_spec_path}: missing required fields: {', '.join(missing_visual)}"
            )

        title = str(data.get("title") or visual.get("title") or markdown_title(case_path))
        concept = str(data.get("concept") or "")
        if not concept:
            raise SiteBuildError(f"{data_spec_path}: missing required field: concept")

        chart_type = str(visual["chart_type"])
        question = str(visual["question_answered"])
        topic = infer_topic(case_id, concept, chart_type, question)
        published_name = f"{case_id}_{slug}.html"

        entries.append(
            CaseEntry(
                case_id=case_id,
                slug=slug,
                title=title,
                topic=topic,
                concept=concept,
                chart_type=chart_type,
                question_answered=question,
                correct_read=str(visual["correct_read"]),
                decision_changed=str(visual["decision_changed"]),
                case_path=case_path,
                data_spec_path=data_spec_path,
                visual_spec_path=visual_spec_path,
                html_path=html_path,
                published_path=f"cases/{published_name}",
            )
        )
    return entries


def extract_main_body(page: str, html_path: Path) -> str:
    match = re.search(r"<main>\s*(.*?)\s*</main>", page, re.DOTALL | re.IGNORECASE)
    if not match:
        raise SiteBuildError(f"{html_path}: canonical HTML must contain a <main> block.")
    return match.group(1)


def clean_site_root(site_root: Path) -> None:
    site_root.mkdir(parents=True, exist_ok=True)
    for path in [
        site_root / "index.html",
        site_root / "catalog.json",
        site_root / ".nojekyll",
        site_root / "assets" / "site.css",
        site_root / "assets" / "site.js",
    ]:
        if path.exists():
            path.unlink()
    for directory in [site_root / "cases", site_root / "assets"]:
        directory.mkdir(parents=True, exist_ok=True)
        for child in directory.iterdir():
            if child.is_dir():
                shutil.rmtree(child)
            else:
                child.unlink()


def topic_counts(entries: list[CaseEntry]) -> list[tuple[str, int]]:
    counts: dict[str, int] = {}
    for entry in entries:
        counts[entry.topic] = counts.get(entry.topic, 0) + 1
    return sorted(counts.items(), key=lambda item: (item[0].lower(), item[1]))


def render_index(entries: list[CaseEntry]) -> str:
    topics = topic_counts(entries)
    cards = "\n".join(render_card(entry) for entry in entries)
    topic_buttons = "\n".join(
        f'<button class="filter-button" type="button" data-filter="{html.escape(topic)}">'
        f"{html.escape(topic)} <span>{count}</span></button>"
        for topic, count in topics
    )
    return f"""<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Corporate Data Narrative Lab</title>
  <link rel="stylesheet" href="assets/site.css">
  <script src="assets/site.js" defer></script>
</head>
<body data-page="index">
  <header class="site-hero">
    <nav class="topbar" aria-label="Navegacion principal">
      <a class="brand" href="index.html">Corporate Data Narrative Lab</a>
      <a class="text-link" href="catalog.json">catalog.json</a>
    </nav>
    <div class="hero-grid">
      <div>
        <p class="eyebrow">Historias breves con evidencia visual</p>
        <h1>Una biblioteca para aprender ciencia de datos desde decisiones que casi salieron en comite.</h1>
      </div>
      <div class="hero-panel" aria-label="Resumen de la coleccion">
        <strong>{len(entries)}</strong>
        <span>casos publicados</span>
        <span>{len(topics)} temas navegables</span>
      </div>
    </div>
  </header>

  <main class="site-main">
    <section class="controls" aria-label="Filtros de casos">
      <label class="search-label" for="case-search">Buscar por titulo, tema, concepto o pregunta</label>
      <input id="case-search" class="search-input" type="search" placeholder="Ej. drift, KPI, RAG, Colab">
      <div class="filter-row" aria-label="Filtrar por tema">
        <button class="filter-button is-active" type="button" data-filter="all">Todos <span>{len(entries)}</span></button>
{topic_buttons}
      </div>
      <p class="result-count"><span data-result-count>{len(entries)}</span> casos visibles</p>
    </section>

    <section class="case-grid" aria-label="Casos publicados">
{cards}
    </section>
  </main>
</body>
</html>
"""


def render_card(entry: CaseEntry) -> str:
    searchable = " ".join(
        [
            entry.case_id,
            entry.title,
            entry.topic,
            entry.concept,
            entry.chart_type,
            entry.question_answered,
            entry.correct_read,
        ]
    )
    return f"""      <article class="case-card" data-card data-topic="{html.escape(entry.topic)}" data-search="{html.escape(searchable, quote=True)}">
        <div class="card-topline">
          <span class="case-number">{html.escape(entry.case_id)}</span>
          <span class="topic-chip">{html.escape(entry.topic)}</span>
        </div>
        <h2><a href="{html.escape(entry.published_path)}">{html.escape(entry.title)}</a></h2>
        <p class="concept">{html.escape(entry.concept)}</p>
        <dl class="card-meta">
          <div><dt>Grafica</dt><dd>{html.escape(entry.chart_type)}</dd></div>
          <div><dt>Pregunta</dt><dd>{html.escape(entry.question_answered)}</dd></div>
        </dl>
      </article>"""


def render_case_page(entry: CaseEntry, previous_entry: CaseEntry | None, next_entry: CaseEntry | None) -> str:
    body = extract_main_body(entry.html_path.read_text(encoding="utf-8"), entry.html_path)
    previous_link = (
        f'<a class="pager-link" href="{html.escape(Path(previous_entry.published_path).name)}">'
        f"Anterior: {html.escape(previous_entry.title)}</a>"
        if previous_entry
        else '<span class="pager-link is-disabled">Anterior</span>'
    )
    next_link = (
        f'<a class="pager-link" href="{html.escape(Path(next_entry.published_path).name)}">'
        f"Siguiente: {html.escape(next_entry.title)}</a>"
        if next_entry
        else '<span class="pager-link is-disabled">Siguiente</span>'
    )
    return f"""<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(entry.title)}</title>
  <link rel="stylesheet" href="../assets/site.css">
</head>
<body data-page="case">
  <header class="case-header">
    <nav class="topbar" aria-label="Navegacion principal">
      <a class="brand" href="../index.html">Corporate Data Narrative Lab</a>
      <a class="text-link" href="../index.html">Indice</a>
    </nav>
    <div class="case-kicker">
      <span class="case-number">{html.escape(entry.case_id)}</span>
      <span class="topic-chip">{html.escape(entry.topic)}</span>
    </div>
    <h1>{html.escape(entry.title)}</h1>
    <div class="case-summary">
      <p><strong>Concepto:</strong> {html.escape(entry.concept)}</p>
      <p><strong>Pregunta de la grafica:</strong> {html.escape(entry.question_answered)}</p>
      <p><strong>Lectura correcta:</strong> {html.escape(entry.correct_read)}</p>
      <p><strong>Decision que cambia:</strong> {html.escape(entry.decision_changed)}</p>
    </div>
  </header>

  <main class="story-shell">
{body}
  </main>

  <nav class="case-pager" aria-label="Navegacion entre casos">
    {previous_link}
    <a class="pager-link" href="../index.html">Todos los casos</a>
    {next_link}
  </nav>
</body>
</html>
"""


def write_assets(site_root: Path) -> None:
    (site_root / "assets" / "site.css").write_text(SITE_CSS, encoding="utf-8")
    (site_root / "assets" / "site.js").write_text(SITE_JS, encoding="utf-8")


def write_catalog(site_root: Path, lab_root: Path, entries: list[CaseEntry]) -> None:
    payload = {
        "version": 1,
        "generated_by": "tools/build_pages_site.py",
        "case_count": len(entries),
        "topics": [{"topic": topic, "count": count} for topic, count in topic_counts(entries)],
        "cases": [entry.catalog_item(lab_root) for entry in entries],
    }
    (site_root / "catalog.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def build_site(lab_root: Path, site_root: Path) -> list[CaseEntry]:
    entries = build_catalog(lab_root)
    clean_site_root(site_root)
    write_assets(site_root)
    (site_root / "index.html").write_text(render_index(entries), encoding="utf-8")
    write_catalog(site_root, lab_root.resolve(), entries)
    for index, entry in enumerate(entries):
        previous_entry = entries[index - 1] if index else None
        next_entry = entries[index + 1] if index + 1 < len(entries) else None
        output_path = site_root / entry.published_path
        output_path.write_text(render_case_page(entry, previous_entry, next_entry), encoding="utf-8")
    (site_root / ".nojekyll").write_text("", encoding="utf-8")
    return entries


SITE_CSS = """
:root {
  color-scheme: light;
  --ink: #182026;
  --muted: #5e6870;
  --paper: #fbfaf7;
  --panel: #ffffff;
  --line: #d7d0c5;
  --teal: #276b64;
  --plum: #7b3f53;
  --moss: #617249;
  --gold: #a87524;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0;
}

a {
  color: inherit;
}

.site-hero,
.case-header {
  background: #eee8dc;
  border-bottom: 1px solid var(--line);
}

.topbar {
  width: min(1120px, calc(100% - 32px));
  min-height: 64px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand,
.text-link {
  text-decoration: none;
}

.brand {
  font-weight: 700;
}

.text-link {
  color: var(--teal);
  border-bottom: 1px solid currentColor;
}

.hero-grid {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 58px 0 66px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 42px;
  align-items: end;
}

.eyebrow {
  margin: 0 0 16px;
  color: var(--plum);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.site-hero h1 {
  max-width: 820px;
  margin: 0;
  font-size: 3.15rem;
  line-height: 1.02;
  font-weight: 800;
}

.hero-panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 22px;
  display: grid;
  gap: 8px;
}

.hero-panel strong {
  font-size: 3rem;
  line-height: 1;
}

.hero-panel span {
  color: var(--muted);
}

.site-main {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 72px;
}

.controls {
  padding: 0 0 28px;
}

.search-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
}

.search-input {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--panel);
  color: var(--ink);
  font: inherit;
}

.filter-row {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-button {
  min-height: 38px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--panel);
  color: var(--ink);
  padding: 8px 10px;
  font: inherit;
  cursor: pointer;
}

.filter-button span {
  color: var(--muted);
}

.filter-button.is-active {
  background: var(--ink);
  border-color: var(--ink);
  color: #ffffff;
}

.filter-button.is-active span {
  color: #ded8cf;
}

.result-count {
  margin: 14px 0 0;
  color: var(--muted);
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.case-card {
  min-height: 310px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-topline,
.case-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.case-number {
  color: var(--gold);
  font-weight: 800;
}

.topic-chip {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  border: 1px solid #c5b7a3;
  border-radius: 8px;
  padding: 4px 8px;
  color: var(--teal);
  background: #f6f0e7;
  font-size: 0.86rem;
  font-weight: 700;
}

.case-card h2 {
  margin: 0;
  font-size: 1.22rem;
  line-height: 1.2;
}

.case-card h2 a {
  text-decoration: none;
}

.case-card h2 a:hover {
  color: var(--teal);
}

.concept {
  margin: 0;
  color: var(--muted);
  line-height: 1.45;
}

.card-meta {
  margin: auto 0 0;
  display: grid;
  gap: 10px;
}

.card-meta div {
  border-top: 1px solid var(--line);
  padding-top: 10px;
}

.card-meta dt {
  margin-bottom: 4px;
  color: var(--plum);
  font-weight: 700;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.card-meta dd {
  margin: 0;
  color: var(--ink);
  line-height: 1.4;
}

.case-header {
  padding-bottom: 34px;
}

.case-header > h1,
.case-kicker,
.case-summary {
  width: min(900px, calc(100% - 32px));
  margin-left: auto;
  margin-right: auto;
}

.case-header > h1 {
  margin-top: 18px;
  margin-bottom: 22px;
  font-size: 2.7rem;
  line-height: 1.04;
}

.case-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.case-summary p {
  margin: 0;
  padding: 14px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  line-height: 1.45;
}

.story-shell {
  width: min(820px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 28px;
}

.story-shell h1 {
  display: none;
}

.story-shell h2 {
  margin: 0 0 18px;
  font-size: 1.28rem;
}

.story-shell section {
  border-top: 2px solid var(--ink);
  padding: 26px 0 14px;
}

.story-shell p {
  line-height: 1.62;
}

.story-shell blockquote {
  margin: 10px 0;
  padding: 12px 14px;
  background: var(--panel);
  border-left: 5px solid var(--teal);
  line-height: 1.45;
}

.story-shell blockquote strong {
  display: block;
  margin-bottom: 3px;
  color: var(--teal);
}

.story-shell .learning-pause {
  border-left-color: var(--plum);
  background: #fff7ef;
}

.story-shell .explanation {
  background: var(--panel);
  padding: 14px;
  border: 1px solid var(--line);
}

.story-shell .rule {
  font-size: 1.08rem;
  border-top: 2px solid var(--plum);
  padding-top: 16px;
}

.story-shell svg {
  width: 100%;
  height: auto;
  display: block;
  margin: 22px 0;
  background: #ffffff;
  border: 1px solid var(--line);
}

.case-pager {
  width: min(900px, calc(100% - 32px));
  margin: 0 auto 70px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.pager-link {
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--panel);
  padding: 10px;
  text-align: center;
  text-decoration: none;
  line-height: 1.25;
}

.pager-link:not(.is-disabled):hover {
  border-color: var(--teal);
  color: var(--teal);
}

.pager-link.is-disabled {
  color: var(--muted);
}

[hidden] {
  display: none !important;
}

@media (max-width: 900px) {
  .hero-grid,
  .case-summary,
  .case-grid {
    grid-template-columns: 1fr;
  }

  .site-hero h1 {
    font-size: 2.45rem;
  }
}

@media (max-width: 560px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 12px 0;
  }

  .hero-grid {
    padding: 38px 0 44px;
  }

  .site-hero h1,
  .case-header > h1 {
    font-size: 2.05rem;
  }

  .case-card {
    min-height: 0;
  }

  .case-pager {
    grid-template-columns: 1fr;
  }
}
"""

SITE_JS = """
(() => {
  const cards = Array.from(document.querySelectorAll("[data-card]"));
  if (!cards.length) return;

  const search = document.querySelector("#case-search");
  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const count = document.querySelector("[data-result-count]");
  let activeTopic = "all";

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "")
      .trim();

  const applyFilters = () => {
    const query = normalize(search ? search.value : "");
    let visible = 0;

    cards.forEach((card) => {
      const topic = card.getAttribute("data-topic") || "";
      const text = normalize(card.getAttribute("data-search") || "");
      const topicMatch = activeTopic === "all" || topic === activeTopic;
      const searchMatch = !query || text.includes(query);
      const show = topicMatch && searchMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (count) count.textContent = String(visible);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = button.getAttribute("data-filter") || "all";
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      applyFilters();
    });
  });

  if (search) search.addEventListener("input", applyFilters);
})();
"""


def main() -> int:
    default_lab_root = Path(__file__).resolve().parents[1]
    default_site_root = default_lab_root.parent / "docs"
    parser = argparse.ArgumentParser(description="Build the GitHub Pages site for the case collection.")
    parser.add_argument("--lab-root", type=Path, default=default_lab_root)
    parser.add_argument("--site-root", type=Path, default=default_site_root)
    args = parser.parse_args()

    try:
        entries = build_site(args.lab_root, args.site_root)
    except SiteBuildError as error:
        print(f"NEEDS_REVISION: {error}")
        return 1
    print(f"PASS: wrote {len(entries)} cases to {args.site_root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
