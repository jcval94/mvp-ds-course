"""Unit and contract tests for the course harness. Run: python -m pytest harness/tests -q"""

from __future__ import annotations

import json
import shutil
from pathlib import Path

import pytest
import yaml

from harness import build, checks, validate
from harness.config import ROOT, HarnessError


@pytest.fixture()
def repo(tmp_path: Path) -> Path:
    """Minimal copy of the content contracts so tests can mutate them safely."""
    for name in ("course.yaml",):
        shutil.copy2(ROOT / name, tmp_path / name)
    for folder in ("missions", "casos", "design"):
        shutil.copytree(ROOT / folder, tmp_path / folder)
    (tmp_path / "capsulas" / "corporate-data-narrative-lab" / "examples" / "cases").mkdir(parents=True)
    return tmp_path


def _mission(repo: Path) -> Path:
    return repo / "missions" / "m01-wald" / "mission.yaml"


def _edit_yaml(path: Path, **changes) -> None:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    data.update(changes)
    path.write_text(yaml.safe_dump(data, allow_unicode=True, sort_keys=False), encoding="utf-8")


def test_current_repository_passes_validation() -> None:
    validate.run()


def test_ready_mission_requires_approved_case_and_kit(repo: Path) -> None:
    _edit_yaml(_mission(repo), status="ready")
    errors = validate.validate_contracts(repo)
    assert any("exige el caso 'wald-bombers' aprobado" in error for error in errors)
    assert any("exige un kit" in error for error in errors)


def test_unregistered_mission_folder_is_rejected(repo: Path) -> None:
    shutil.copytree(repo / "missions" / "m01-wald", repo / "missions" / "m02-snow")
    errors = validate.validate_contracts(repo)
    assert any("m02-snow" in error and "no está registrada" in error for error in errors)


def test_mission_schema_rejects_unknown_status(repo: Path) -> None:
    _edit_yaml(_mission(repo), status="live")
    errors = validate.validate_contracts(repo)
    assert any("status" in error for error in errors)


def test_approved_case_needs_sources_and_claims(repo: Path) -> None:
    case = json.loads((repo / "casos" / "staging" / "wald-bombers.json").read_text(encoding="utf-8"))
    case["status"] = "approved"
    (repo / "casos" / "cases.jsonl").write_text(json.dumps(case) + "\n", encoding="utf-8")
    errors = validate.validate_contracts(repo)
    assert any("cases.jsonl[wald-bombers]" in error and "verified_claims" in error for error in errors)
    assert any("cases.jsonl[wald-bombers]" in error and "sources" in error for error in errors)


def test_premium_missions_never_enter_the_public_build(repo: Path) -> None:
    _edit_yaml(_mission(repo), status="published", access="premium")
    course = yaml.safe_load((repo / "course.yaml").read_text(encoding="utf-8"))
    assert build.public_missions(course, repo) == []
    _edit_yaml(_mission(repo), access="public")
    assert [item["id"] for item in build.public_missions(course, repo)] == ["m01-wald"]


def test_design_token_drift_is_detected(repo: Path) -> None:
    tokens = repo / "design" / "tokens" / "tokens.json"
    data = json.loads(tokens.read_text(encoding="utf-8"))
    data["color"]["accent"] = "#ff0000"
    tokens.write_text(json.dumps(data), encoding="utf-8")
    assert any("--accent" in error for error in validate.validate_design_tokens(repo))


def _write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def test_link_checker_flags_broken_and_root_absolute_links(tmp_path: Path) -> None:
    _write(tmp_path / "index.html", '<a href="ok.html">ok</a><a href="missing.html">x</a><link href="/abs.css" rel="stylesheet"><a href="https://example.com">e</a>')
    _write(tmp_path / "ok.html", "<p>ok</p>")
    _write(tmp_path / "a.css", "body{background:url(img/none.png)}")
    errors = checks.check_links(tmp_path)
    assert any("enlace roto 'missing.html'" in error for error in errors)
    assert any("ruta absoluta '/abs.css'" in error for error in errors)
    assert any("img/none.png" in error for error in errors)
    assert not any("example.com" in error for error in errors)


def test_portability_rejects_host_config_and_host_urls(tmp_path: Path) -> None:
    for name in ("index.html", "404.html", "missions.json", "build-info.json"):
        _write(tmp_path / name, "{}")
    _write(tmp_path / ".nojekyll", "")
    _write(tmp_path / "page.html", '<a href="https://jcval94.github.io/mvp-ds-course/">x</a>')
    errors = checks.check_portability(tmp_path)
    assert any(".nojekyll" in error for error in errors)
    assert any("jcval94.github.io" in error for error in errors)


def test_build_is_reproducible_and_matches_legacy_site() -> None:
    first = build.build()
    second = build.build()
    assert first["content_sha256"] == second["content_sha256"]
    legacy = ROOT / "_site"
    dist = ROOT / "dist"
    for path in legacy.rglob("*"):
        if path.is_file() and path.name != ".nojekyll":
            assert (dist / path.relative_to(legacy)).read_bytes() == path.read_bytes(), path


def test_smoke_detects_root_absolute_assets_under_a_subpath(tmp_path: Path) -> None:
    pytest.importorskip("playwright")
    from harness import smoke

    _write(tmp_path / "index.html", '<!doctype html><meta charset=utf-8><title>Inicio</title><link rel="stylesheet" href="/styles.css">')
    _write(tmp_path / "styles.css", "body{}")
    _write(tmp_path / "404.html", "<!doctype html><meta charset=utf-8><title>404</title><p>Esta página no existe</p>")
    _write(tmp_path / "missions.json", json.dumps({"missions": []}))
    _write(tmp_path / "catalog.json", json.dumps({"levels": []}))
    _write(tmp_path / "methodology.html", "<!doctype html><meta charset=utf-8><title>M</title>")
    _write(tmp_path / "placement.html", "<!doctype html><meta charset=utf-8><title>P</title>")
    _write(tmp_path / "missions" / "index.html", '<!doctype html><meta charset=utf-8><title>Misiones</title><section id="missionList">Todavía no hay misiones</section>')
    _write(tmp_path / "capsulas" / "index.html", "<!doctype html><meta charset=utf-8><title>Cápsulas</title>")
    smoke.run(base_paths=["/"], dist=tmp_path)
    with pytest.raises(HarnessError, match="recurso local no disponible"):
        smoke.run(base_paths=["/curso/"], dist=tmp_path)


def test_color_guard_rejects_literal_colors_in_portal_sources(tmp_path: Path) -> None:
    _write(tmp_path / "site" / "styles.css", ".a{color:#fff;background:white}.b{color:var(--text)}")
    _write(tmp_path / "site" / "index.html", '<a href="#add">x</a><style>.c{border:1px solid #223043}</style><p style="color: #abc">y</p>')
    _write(tmp_path / "site" / "app.js", 'const c = "#ff0000"; location.hash = "#add";')
    _write(tmp_path / "portal" / "404.html", "<style>body{background:#080d13}</style>")
    errors = validate.validate_color_literals(tmp_path)
    joined = "\n".join(errors)
    assert "site/styles.css" in joined and "#fff" in joined and "white" in joined
    assert "site/index.html" in joined and "#223043" in joined and "#abc" in joined and "#add" not in joined
    assert "site/app.js" in joined and "#ff0000" in joined
    assert "portal/404.html" not in joined


def test_current_portal_uses_only_design_tokens() -> None:
    assert validate.validate_color_literals() == []
