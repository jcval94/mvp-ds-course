#!/usr/bin/env python3
"""Build the GitHub Pages artifact from approved manifests."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
BUILD = (ROOT / "_site").resolve()
SITE_SOURCE = ROOT / "site"
LEVEL_PATHS = [
    ROOT / "generated" / "data-class-foundations-level-1",
    ROOT / "generated" / "data-class-description-level-2",
    ROOT / "generated" / "data-class-probability-level-3",
    ROOT / "generated" / "data-class-relationships-level-4",
    ROOT / "generated" / "data-class-modeling-level-5",
    ROOT / "generated" / "data-class-evaluation-level-6",
    ROOT / "generated" / "data-class-unsupervised-level-7",
    ROOT / "generated" / "data-class-temporal-experiments-level-8",
]


def load_approved(path: Path) -> tuple[dict[str, object], dict[str, object]]:
    manifest = json.loads((path / "manifest.json").read_text(encoding="utf-8"))
    validation = json.loads((path / manifest["validation"]).read_text(encoding="utf-8"))
    if (
        manifest["status"] != "published"
        or validation["status"] != "passed"
        or validation["average"] < 4
        or validation["minimum_dimension"] <= 1
        or validation["blockers"]
    ):
        raise SystemExit(f"El nivel {path.name} no cumple el gate de publicación")
    return manifest, validation


def reset_build() -> None:
    expected_parent = ROOT.resolve()
    if BUILD.parent != expected_parent or BUILD.name != "_site":
        raise SystemExit(f"Ruta de build insegura: {BUILD}")
    if BUILD.exists():
        shutil.rmtree(BUILD)
    BUILD.mkdir()


def format_spanish_date(value: str) -> str:
    parsed = date.fromisoformat(value)
    months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ]
    return f"{parsed.day} de {months[parsed.month - 1]} de {parsed.year}"


def normalize_lab_home_links(path: Path) -> None:
    """Point source-friendly HOME links back to the published portal."""
    for html in path.rglob("*.html"):
        text = html.read_text(encoding="utf-8")
        updated = text.replace('href="../../site/index.html"', 'href="../../index.html"')
        if updated != text:
            html.write_text(updated, encoding="utf-8")


def main() -> None:
    reset_build()
    shutil.copytree(SITE_SOURCE, BUILD, dirs_exist_ok=True)
    registry = json.loads((ROOT / "datasets" / "registry.json").read_text(encoding="utf-8"))
    levels: list[dict[str, object]] = []
    validations: list[dict[str, object]] = []

    for path in LEVEL_PATHS:
        manifest, validation = load_approved(path)
        destination = BUILD / "labs" / f"level-{manifest['level']}"
        shutil.copytree(path, destination)
        normalize_lab_home_links(destination)
        level = {
            **manifest,
            "entrypoint": f"labs/level-{manifest['level']}/{manifest['entrypoint']}",
            "blocks": [
                {
                    **block,
                    "href": f"labs/level-{manifest['level']}/{block['href']}",
                }
                for block in manifest["blocks"]
            ],
        }
        levels.append(level)
        validations.append(validation)

    shutil.copytree(ROOT / "datasets", BUILD / "datasets", ignore=shutil.ignore_patterns("_downloads"))
    methodology = BUILD / "methodology"
    methodology.mkdir()
    shutil.copy2(ROOT / "docs" / "VALIDATION_REPORT.md", methodology / "VALIDATION_REPORT.md")
    shutil.copytree(ROOT / "evals", methodology / "evals")

    totals = {
        "concepts": sum(level["concept_count"] for level in levels),
        "exercises": sum(level["exercise_count"] for level in levels),
        "prompts": sum(level["prompt_count"] for level in levels),
    }
    catalog = {
        "schema_version": 1,
        "updated_at": format_spanish_date(
            max(level["updated_at"] for level in levels)
        ),
        "totals": totals,
        "levels": levels,
        "datasets": registry["datasets"],
        "validation": {
            "average": min(item["average"] for item in validations),
            "minimum_dimension": min(item["minimum_dimension"] for item in validations),
        },
    }
    (BUILD / "catalog.json").write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (BUILD / ".nojekyll").write_text("", encoding="ascii")
    print(
        f"GitHub Pages construido en {BUILD}: "
        f"{totals['concepts']} conceptos y {totals['exercises']} ejercicios."
    )


if __name__ == "__main__":
    main()
