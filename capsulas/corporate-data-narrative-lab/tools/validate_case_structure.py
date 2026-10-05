from __future__ import annotations

import argparse
import html
import math
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path


REQUIRED_STORY_FIELDS = [
    "concept",
    "characters",
    "situation",
    "bad_logic",
    "escalation",
    "data_turn",
    "chart",
    "decision",
    "punchline",
    "rule",
    "synthetic_data",
]

BANNED_DIALOGUE_PATTERNS = {
    r"\bslide\b": "use 'presentacion', not 'slide'.",
    r"\bdeck\b": "use 'presentacion', not 'deck'.",
    r"\btrae comparables\b": "ask what happened in other periods or groups.",
    r"\bincrementalidad\b": "explain additional impact before naming the term.",
    r"\bescalaciones\b": "use casos complicados, reclamos or folios atorados.",
    r"\bdata llego con una grafica\b": "give the chart an entrance specific to the scene.",
    r"\beso explica mucho y arregla poco\b": "remove the canned punchline.",
    r"\bperfecto, entonces ya tenemos otro problema\b": "remove the canned punchline.",
    r"\bno le regalemos todo al calendario\b": "use direct temporal language.",
    r"\bla formula no pesa\b": "use direct metric language.",
}

METRIC_CONTEXT_WORDS = {
    "queja",
    "quejas",
    "incidencia",
    "incidencias",
    "satisfaccion",
    "puntos",
    "precision",
    "minutos",
    "horas",
    "clientes",
    "casos",
    "folios",
    "ventas",
    "ahorro",
    "millones",
    "por ciento",
    "promedio",
    "tiempo",
    "rotacion",
    "fraude",
    "reaperturas",
    "conversion",
    "alertas",
    "resoluciones",
    "muestra",
    "personas",
    "tramites",
    "respuestas",
    "porcentaje",
    "%",
    "tasa",
    "tasas",
    "entrega",
    "dias",
    "pedidos",
    "refrigeradores",
    "aparatos",
    "piezas",
    "unidades",
    "categorias",
    "rebanadas",
    "eje",
    "barra",
    "correlacion",
    "auc",
    "f1",
    "exactitud",
    "recuperacion",
    "cartera",
    "correcciones",
    "disponibilidad",
    "catalogo",
    "version",
    "semana",
    "devoluciones",
    "modelo",
    "fraudes",
    "contactos",
    "valor",
    "folio",
    "variable",
    "profundidad",
    "validacion",
    "estimacion",
    "errores",
}


def fold_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value.lower())
    ascii_text = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    return re.sub(r"\s+", " ", ascii_text).strip()


def strip_comments(markdown: str) -> str:
    return re.sub(r"<!--.*?-->", " ", markdown, flags=re.DOTALL)


def strip_svg(markdown: str) -> str:
    return re.sub(r"<svg\b.*?</svg>", " ", markdown, flags=re.DOTALL | re.IGNORECASE)


def visible_text(markdown: str) -> str:
    text = strip_svg(strip_comments(markdown))
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^>\s*", "", text, flags=re.MULTILINE)
    text = re.sub(r"[*_`]", "", text)
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def parse_story(markdown: str) -> dict[str, str]:
    match = re.search(r"<!--\s*story\s*(.*?)-->", markdown, re.DOTALL | re.IGNORECASE)
    if not match:
        return {}
    fields: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        fields[key.strip().lower()] = value.strip()
    return fields


def dialogue_lines(markdown: str) -> list[tuple[str, str]]:
    result: list[tuple[str, str]] = []
    pattern = re.compile(r'^>\s+\*\*([^*]+):\*\*\s+"(.+)"\s*$', re.MULTILINE)
    for match in pattern.finditer(strip_comments(markdown)):
        result.append((match.group(1).strip(), match.group(2).strip()))
    return result


def body_lines(markdown: str) -> list[str]:
    cleaned = strip_comments(markdown)
    lines = []
    for raw in cleaned.splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or line.startswith("<svg") or line.startswith("</svg"):
            continue
        if line.startswith("<") and not line.startswith(">"):
            continue
        lines.append(line)
    return lines


def word_count(value: str) -> int:
    return len(re.findall(r"\b[\wáéíóúüñÁÉÍÓÚÜÑ]+\b", value, flags=re.UNICODE))


def validate_metric_context(dialogue: list[tuple[str, str]]) -> list[str]:
    errors: list[str] = []
    for index, (_, line) in enumerate(dialogue):
        folded = fold_text(line)
        if not re.search(r"\b\d+(?:[.,]\d+)?\b|%", folded):
            continue
        window = " ".join(
            fold_text(item[1]) for item in dialogue[max(0, index - 1) : index + 1]
        )
        if not any(term in window for term in METRIC_CONTEXT_WORDS):
            errors.append(f"Metric without conversational context: {line}")
    return errors


def validate_markdown(markdown: str) -> list[str]:
    errors: list[str] = []
    story = parse_story(markdown)
    if not story:
        errors.append("Missing <!-- story --> contract.")
    for field in REQUIRED_STORY_FIELDS:
        if not story.get(field):
            errors.append(f"Missing story field: {field}")
    if story and fold_text(story.get("synthetic_data", "")) not in {"true", "yes", "si"}:
        errors.append("synthetic_data must be true.")

    clean = strip_comments(markdown)
    body = body_lines(markdown)
    if not body or not body[0].startswith(">"):
        errors.append("The first visible story content must be dialogue.")

    headings = re.findall(r"^##\s+(.+)$", clean, re.MULTILINE)
    if not 3 <= len(headings) <= 5:
        errors.append("Stories need three to five visible scenes.")

    dialogue = dialogue_lines(markdown)
    raw_quotes = re.findall(r"^>\s+.+$", clean, re.MULTILINE)
    if len(dialogue) != len(raw_quotes):
        errors.append("Every dialogue intervention must use **Character:** \"Line\".")
    if len(dialogue) < 14:
        errors.append("Stories need at least fourteen dialogue interventions.")

    visible = visible_text(markdown)
    total_words = word_count(visible)
    if not 400 <= total_words <= 750:
        errors.append(f"Story length must be 400-750 words; found {total_words}.")
    dialogue_words = sum(word_count(line) for _, line in dialogue)
    if total_words and dialogue_words / total_words < 0.45:
        errors.append("Dialogue must contain at least 45% of visible words.")

    svg_count = len(re.findall(r"<svg\b", markdown, re.IGNORECASE))
    if svg_count != 1:
        errors.append(f"Story needs exactly one SVG chart; found {svg_count}.")
    if markdown.lower().count("<!-- learning:pause -->") != 1:
        errors.append("Story needs exactly one <!-- learning:pause -->.")
    if len(re.findall(r"^\*\*Lo que muestra:\*\*", clean, re.MULTILINE | re.IGNORECASE)) != 1:
        errors.append("Story needs exactly one **Lo que muestra:** explanation.")
    if len(re.findall(r"^\*\*Regla:\*\*", clean, re.MULTILINE | re.IGNORECASE)) != 1:
        errors.append("Story needs exactly one **Regla:** ending.")

    dialogue_text = "\n".join(fold_text(line) for _, line in dialogue)
    for pattern, message in BANNED_DIALOGUE_PATTERNS.items():
        if re.search(pattern, dialogue_text):
            errors.append(f"Unnatural dialogue: {message}")
    if re.search(r"(?:^|\n)\s*[ABC][.)]\s+", clean):
        errors.append("Visible A/B/C questions are not allowed.")

    long_lines = [line for _, line in dialogue if word_count(line) > 32]
    if len(long_lines) > 2:
        errors.append("Too many written-sounding dialogue lines longer than 32 words.")
    errors.extend(validate_metric_context(dialogue))
    return errors


def validate_collection(cases: dict[str, str]) -> list[str]:
    errors: list[str] = []
    punchlines: dict[str, list[str]] = {}
    openings: dict[str, list[str]] = {}
    characters: Counter[str] = Counter()

    for name, markdown in cases.items():
        story = parse_story(markdown)
        punchline = fold_text(story.get("punchline", ""))
        if punchline and punchline != "ah":
            punchlines.setdefault(punchline, []).append(name)
        dialogue = dialogue_lines(markdown)
        if dialogue:
            opening = " ".join(fold_text(dialogue[0][1]).split()[:7])
            openings.setdefault(opening, []).append(name)
        for character in {fold_text(person) for person, _ in dialogue}:
            characters[character] += 1

    for punchline, names in punchlines.items():
        if len(names) > 1:
            errors.append(f"Repeated punchline '{punchline}': {', '.join(names)}")
    for opening, names in openings.items():
        if opening and len(names) > 1:
            errors.append(f"Repeated opening '{opening}': {', '.join(names)}")

    max_character_reuse = max(6, math.ceil(len(cases) * 0.6))
    for character, count in characters.items():
        if character not in {"el jefe", "la jefa"} and count > max_character_reuse:
            errors.append(f"Character '{character}' appears in {count} cases; vary the cast.")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate office comedy data stories.")
    parser.add_argument("--collection", action="store_true")
    parser.add_argument("case_paths", nargs="+", type=Path)
    args = parser.parse_args()

    missing = [path for path in args.case_paths if not path.exists()]
    if missing:
        for path in missing:
            print(f"ERROR: file not found: {path}", file=sys.stderr)
        return 2

    cases = {str(path): path.read_text(encoding="utf-8") for path in args.case_paths}
    errors: list[str] = []
    for name, markdown in cases.items():
        errors.extend(f"{name}: {error}" for error in validate_markdown(markdown))
    if args.collection:
        errors.extend(validate_collection(cases))

    if errors:
        print("NEEDS_REVISION")
        for error in errors:
            print(f"- {error}")
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
