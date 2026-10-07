from __future__ import annotations

import re
from pathlib import Path

import pytest

from tools.build_pages_site import SiteBuildError, build_catalog, build_site


PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_catalog_contains_current_collection_with_topics() -> None:
    entries = build_catalog(PROJECT_ROOT)
    case_count = len(list((PROJECT_ROOT / "examples" / "cases").glob("[0-9][0-9]_*.md")))

    assert len(entries) == case_count
    assert len(entries) >= 87
    assert all(entry.topic for entry in entries)
    assert all(entry.published_path.startswith("cases/") for entry in entries)
    assert entries[0].case_id == "01"
    assert int(entries[-1].case_id) == max(int(entry.case_id) for entry in entries)


def test_missing_sibling_file_fails(tmp_path: Path) -> None:
    lab_root = tmp_path / "lab"
    case_dir = lab_root / "examples" / "cases"
    case_dir.mkdir(parents=True)
    (case_dir / "49_caso_nuevo.md").write_text("# Caso nuevo\n", encoding="utf-8")

    with pytest.raises(SiteBuildError, match="Missing data spec"):
        build_catalog(lab_root)


def test_unknown_future_topic_requires_rule_or_override(tmp_path: Path) -> None:
    lab_root = tmp_path / "lab"
    for directory in ["cases", "data_specs", "visual_specs", "html"]:
        (lab_root / "examples" / directory).mkdir(parents=True)

    stem = "99_caso_sin_mapa"
    (lab_root / "examples" / "cases" / f"{stem}.md").write_text("# Caso sin mapa\n", encoding="utf-8")
    (lab_root / "examples" / "data_specs" / f"{stem}.yml").write_text(
        'case_id: "99"\n'
        'title: "Caso sin mapa"\n'
        'concept: "concepto alienigena sin regla editorial"\n',
        encoding="utf-8",
    )
    (lab_root / "examples" / "visual_specs" / f"{stem}.yml").write_text(
        'title: "Caso sin mapa"\n'
        'case_id: "99"\n'
        'chart_type: "unknown_chart"\n'
        'question_answered: "Que lectura cambia?"\n'
        'correct_read: "La lectura correcta."\n'
        'decision_changed: "La decision correcta."\n',
        encoding="utf-8",
    )
    (lab_root / "examples" / "html" / f"{stem}.html").write_text(
        "<!doctype html><html><body><main><h1>Caso sin mapa</h1></main></body></html>",
        encoding="utf-8",
    )

    with pytest.raises(SiteBuildError, match="no topic match"):
        build_catalog(lab_root)


def test_generated_site_has_local_links_and_no_external_resources(tmp_path: Path) -> None:
    site_root = tmp_path / "docs"
    entries = build_site(PROJECT_ROOT, site_root)

    assert (site_root / "index.html").exists()
    assert (site_root / "catalog.json").exists()
    assert (site_root / ".nojekyll").exists()
    assert len(list((site_root / "cases").glob("*.html"))) == len(entries)

    for path in site_root.rglob("*"):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        assert not re.search(r"https?://", text), path
        if path.suffix not in {".html", ".css", ".js"}:
            continue
        for match in re.finditer(r"""(?:href|src)=["']([^"']+)["']""", text):
            link = match.group(1)
            if link.startswith("#"):
                continue
            target = (path.parent / link.split("#", 1)[0]).resolve()
            assert target.exists(), f"{path} links to missing {link}"
