from __future__ import annotations

import argparse
import html
import re
import sys
import unicodedata
from pathlib import Path


BANNED = ("slide", "deck", "trae comparables", "escalaciones")


def fold_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", html.unescape(value).lower())
    return "".join(ch for ch in normalized if not unicodedata.combining(ch))


def validate_html(page: str) -> list[str]:
    errors: list[str] = []
    lowered = page.lower()
    if 'data-story-standard="absurd-office-data"' not in lowered:
        errors.append("Missing data-story-standard contract.")
    if "<script" in lowered:
        errors.append("Simple story HTML must not use JavaScript.")
    if re.search(r"(?:src|href)=[\"']https?://", lowered):
        errors.append("Simple story HTML must not use external resources.")
    if lowered.count("<svg") != 1:
        errors.append("HTML must contain exactly one SVG chart.")
    scenes = lowered.count("<section>")
    if not 3 <= scenes <= 5:
        errors.append("HTML must contain three to five story scenes.")
    if len(re.findall(r"<blockquote(?:\s+[^>]*)?>", lowered)) < 14:
        errors.append("HTML needs at least fourteen dialogue interventions.")
    if lowered.count('class="learning-pause"') != 1:
        errors.append("HTML must contain exactly one learning pause.")
    if lowered.count('class="explanation"') != 1:
        errors.append("HTML must contain exactly one chart explanation.")
    if lowered.count('class="rule"') != 1:
        errors.append("HTML must contain exactly one final rule.")
    if "<strong>" not in lowered:
        errors.append("Dialogue speakers are not visible.")
    folded = fold_text(re.sub(r"<[^>]+>", " ", page))
    for term in BANNED:
        if term in folded:
            errors.append(f"Forbidden dialogue vocabulary found: {term}")
    return errors


def validate_collection(pages: dict[str, str]) -> list[str]:
    errors: list[str] = []
    punchlines: dict[str, list[str]] = {}
    for name, page in pages.items():
        match = re.search(r'data-punchline="([^"]*)"', page, re.IGNORECASE)
        if not match:
            errors.append(f"{name}: Missing data-punchline.")
            continue
        punchline = fold_text(match.group(1)).strip()
        if punchline and punchline != "ah":
            punchlines.setdefault(punchline, []).append(name)
    for punchline, names in punchlines.items():
        if len(names) > 1:
            errors.append(f"Repeated HTML punchline '{punchline}': {', '.join(names)}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate simple linear story HTML.")
    parser.add_argument("--collection", action="store_true")
    parser.add_argument("html_paths", nargs="+", type=Path)
    args = parser.parse_args()

    missing = [path for path in args.html_paths if not path.exists()]
    if missing:
        for path in missing:
            print(f"ERROR: file not found: {path}", file=sys.stderr)
        return 2

    pages = {str(path): path.read_text(encoding="utf-8") for path in args.html_paths}
    errors: list[str] = []
    for name, page in pages.items():
        errors.extend(f"{name}: {error}" for error in validate_html(page))
    if args.collection:
        errors.extend(validate_collection(pages))

    if errors:
        print("NEEDS_REVISION")
        for error in errors:
            print(f"- {error}")
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
