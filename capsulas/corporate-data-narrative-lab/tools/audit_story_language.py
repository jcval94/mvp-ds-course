from __future__ import annotations

import argparse
import re
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path


CANNED_PATTERNS = {
    "la sala todavia olia a cafe recalentado": "replace the generic office opening",
    "la mala idea no nacio como capricho": "show the concrete consequence instead",
    "la clase no se atoro por falta de ganas": "replace the generic classroom narration",
    "la solucion comoda tenia una virtud": "replace the template explanation",
    "entonces el atajo si tuvo costo, solo que en otro escritorio": "write a case-specific consequence",
    "entonces el atajo si hizo trabajo, solo que no el trabajo correcto": "write a case-specific consequence",
    "eso cambia lo que tenemos que ensenar": "say what changes",
    "primero la regla humana, luego la forma tecnica": "name the concrete rule",
    "quiero ver donde se separa la intuicion del resultado": "ask for the concrete comparison",
    "correcta para una pregunta que no era la importante": "name the actual wrong question",
    "eso va a incomodar a la prisa": "use a direct reaction",
    "la prisa ya nos estaba cobrando intereses": "avoid decorative personification",
}


def fold_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value.lower())
    ascii_text = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    return re.sub(r"\s+", " ", ascii_text).strip()


def strip_generated_blocks(markdown: str) -> str:
    text = re.sub(r"<!--.*?-->", " ", markdown, flags=re.DOTALL)
    return re.sub(r"<svg\b.*?</svg>", " ", text, flags=re.DOTALL | re.IGNORECASE)


def dialogue_lines(markdown: str) -> list[str]:
    clean = strip_generated_blocks(markdown)
    return [
        match.group(1).strip()
        for match in re.finditer(
            r'^>\s+\*\*[^*]+:\*\*\s+"(.+)"\s*$', clean, flags=re.MULTILINE
        )
    ]


def narrative_paragraphs(markdown: str) -> list[str]:
    clean = strip_generated_blocks(markdown)
    paragraphs: list[str] = []
    for block in re.split(r"\n\s*\n", clean):
        paragraph = " ".join(line.strip() for line in block.splitlines()).strip()
        if not paragraph or paragraph.startswith(("#", ">", "**")):
            continue
        if len(paragraph.split()) >= 12:
            paragraphs.append(paragraph)
    return paragraphs


def validate_case_language(markdown: str) -> list[str]:
    errors: list[str] = []
    folded = fold_text(strip_generated_blocks(markdown))
    for pattern, message in CANNED_PATTERNS.items():
        if pattern in folded:
            errors.append(f"Canned language: {message}.")

    for line in dialogue_lines(markdown):
        if len(line.split()) > 36:
            errors.append(f"Written-sounding dialogue over 36 words: {line}")
        if re.search(r"\b(la evidencia demuestra|procederemos a|en ese sentido)\b", fold_text(line)):
            errors.append(f"Formal dialogue needs a plain-language rewrite: {line}")
    return errors


def validate_collection(cases: dict[str, str]) -> list[str]:
    errors: list[str] = []
    repeated_dialogue: dict[str, list[str]] = defaultdict(list)
    repeated_narration: dict[str, list[str]] = defaultdict(list)
    repeated_phrases: dict[str, set[str]] = defaultdict(set)

    for name, markdown in cases.items():
        for line in set(dialogue_lines(markdown)):
            folded = fold_text(line)
            if len(folded.split()) >= 5:
                repeated_dialogue[folded].append(name)
        for paragraph in set(narrative_paragraphs(markdown)):
            repeated_narration[fold_text(paragraph)].append(name)
        passages = dialogue_lines(markdown) + narrative_paragraphs(markdown)
        for passage in passages:
            words = re.findall(r"[a-z0-9]+", fold_text(passage))
            for index in range(len(words) - 9):
                repeated_phrases[" ".join(words[index : index + 10])].add(name)

    for line, names in repeated_dialogue.items():
        if len(names) >= 3:
            errors.append(
                f"Repeated dialogue in {len(names)} cases: '{line}' ({', '.join(sorted(names))})"
            )
    for paragraph, names in repeated_narration.items():
        if len(names) >= 2:
            excerpt = paragraph[:120] + ("..." if len(paragraph) > 120 else "")
            errors.append(
                f"Repeated narration in {len(names)} cases: '{excerpt}' ({', '.join(sorted(names))})"
            )
    phrase_errors = [
        (phrase, names)
        for phrase, names in repeated_phrases.items()
        if len(names) >= 3
    ]
    for phrase, names in sorted(phrase_errors, key=lambda item: (-len(item[1]), item[0])):
        errors.append(
            f"Repeated 10-word phrase in {len(names)} cases: '{phrase}' "
            f"({', '.join(sorted(names))})"
        )
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit natural language in narrative cases.")
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
        errors.extend(f"{name}: {error}" for error in validate_case_language(markdown))
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
