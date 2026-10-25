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
    _edit_yaml(_mission(repo), status="ready", kit=None)
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
    case.update(status="approved", verified_claims=[], sources=[])
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

    # Publication boundary: all 13 levels preserve student lessons, but not
    # teacher packs, evaluation files or teacher-driven JavaScript interfaces.
    for level in (1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14):
        folder = dist / "labs" / f"level-{level}"
        assert folder.is_dir()
        for name in ("README.md", "validation.json", "manifest.json", "docs", "evals"):
            assert not (folder / name).exists(), (level, name)
        assert "liveTeachingPack" not in (folder / "assets" / "curriculum.js").read_text(encoding="utf-8")
        assert "teacherContent" not in (folder / "assets" / "app.js").read_text(encoding="utf-8")
    assert checks.check_student_levels(dist) == []


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
    _write(tmp_path / "aviso-privacidad.html", "<!doctype html><meta charset=utf-8><title>A</title>")
    _write(tmp_path / "terminos.html", "<!doctype html><meta charset=utf-8><title>T</title>")
    _write(tmp_path / "colab.html", "<!doctype html><meta charset=utf-8><title>Colab</title>")
    _write(tmp_path / "instalacion.html", "<!doctype html><meta charset=utf-8><title>Instalación</title>")
    _write(tmp_path / "alumno.html", "<!doctype html><meta charset=utf-8><title>Al</title>")
    _write(tmp_path / "docente.html", "<!doctype html><meta charset=utf-8><title>Doc</title>")
    _write(tmp_path / "admin.html", "<!doctype html><meta charset=utf-8><title>Adm</title>")
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


def test_level_theme_check_requires_tokens_theme_and_brand(tmp_path: Path) -> None:
    from harness import checks

    _write(tmp_path / "design" / "themes" / "levels.json", '{"brand": "X", "themes": [{"stylesheet": "themes/t.css", "levels": [1]}]}')
    dist = tmp_path / "dist"
    _write(dist / "design" / "themes" / "t.css", "")
    _write(dist / "labs" / "level-1" / "index.html", "<head></head>DataClass Forge")
    errors = "\n".join(checks.check_level_themes(tmp_path, dist))
    assert "falta ../../design/tokens/tokens.css" in errors and "falta ../../design/themes/t.css" in errors and "DataClass Forge" in errors
    _write(dist / "labs" / "level-1" / "index.html", '<link href="../../design/tokens/tokens.css"><link href="../../design/themes/t.css">')
    assert checks.check_level_themes(tmp_path, dist) == []


def test_case_dataset_must_match_its_sha256(tmp_path: Path) -> None:
    from harness.validate import _dataset_errors
    import hashlib

    data = tmp_path / "casos" / "data" / "c1" / "d.csv"
    _write(data, "a,b\n1,2\n")
    good = {"id": "c1", "dataset": {"path": "casos/data/c1/d.csv", "sha256": hashlib.sha256(data.read_bytes()).hexdigest()}}
    assert _dataset_errors(good, "x", tmp_path) == []
    bad = {"id": "c1", "dataset": {"path": "casos/data/c1/d.csv", "sha256": "0" * 64}}
    assert "SHA-256" in _dataset_errors(bad, "x", tmp_path)[0]
    elsewhere = {"id": "c1", "dataset": {"path": "casos/data/otro/d.csv", "sha256": "0" * 64}}
    assert "casos/data/c1/" in _dataset_errors(elsewhere, "x", tmp_path)[0]


def test_only_public_ready_missions_publish_their_app_and_data(repo: Path, tmp_path: Path) -> None:
    course = yaml.safe_load((repo / "course.yaml").read_text(encoding="utf-8"))
    app = repo / "missions" / "m01-wald" / "app"
    _write(app / "index.html", "<!doctype html><title>m</title>")
    _write(repo / "casos" / "data" / "wald-bombers" / "x.csv", "a\\n1\\n")
    _write(repo / "casos" / "data" / "wald-bombers" / "generar.py", "print(1)")
    dist = tmp_path / "dist"
    dist.mkdir()
    build.publish_mission_apps(build.public_missions(course, repo), course, repo, dist)
    assert not (dist / "missions" / "m01-wald").exists()  # draft
    _edit_yaml(_mission(repo), status="ready")
    missions = build.public_missions(course, repo)
    assert missions[0]["href"] == "missions/m01-wald/"
    build.publish_mission_apps(missions, course, repo, dist)
    assert (dist / "missions" / "m01-wald" / "index.html").is_file()
    assert (dist / "missions" / "m01-wald" / "data" / "x.csv").is_file()
    assert not (dist / "missions" / "m01-wald" / "data" / "generar.py").exists()


def _caso_con_medios(root: Path, medios: dict | None) -> Path:
    case_dir = root / "site" / "casos" / "9-9"
    _write(case_dir / "escenas.js", "window.CASO = {};")
    if medios is not None:
        _write(case_dir / "medios.json", json.dumps(medios, ensure_ascii=False))
    return case_dir


def test_every_case_intro_declares_its_real_media(tmp_path: Path) -> None:
    _caso_con_medios(tmp_path, None)
    assert "falta medios.json" in "\n".join(validate.validate_case_media(tmp_path))


def test_case_media_needs_credit_license_and_local_file(tmp_path: Path) -> None:
    medio = {"id": "foto", "tipo": "foto", "estado": "listo", "archivo": "medios/foto.webp", "alt": "Una foto",
             "credito": "Autor", "licencia": "CC BY-SA 3.0", "fuente": "https://ejemplo.org/foto", "spoiler": "No revela nada."}
    case_dir = _caso_con_medios(tmp_path, {"caso": "9.9", "items": [medio]})
    assert "falta el archivo medios/foto.webp" in "\n".join(validate.validate_case_media(tmp_path))
    _write(case_dir / "medios" / "foto.webp", "x")
    assert validate.validate_case_media(tmp_path) == []
    malos = {
        "licencia": dict(medio, licencia="Copyright"),
        "credito": dict(medio, credito=""),
        "spoiler": dict(medio, spoiler=""),
        "enlace": dict(medio, archivo="https://otro.sitio/foto.jpg"),
        "video": dict(medio, tipo="video", video="https://www.youtube.com/watch?v=x", poster="medios/foto.webp"),
        "cita": dict(medio, licencia="Cita breve"),
    }
    for nombre, item in malos.items():
        _caso_con_medios(tmp_path, {"caso": "9.9", "items": [item]})
        assert validate.validate_case_media(tmp_path), nombre


def test_case_media_without_ready_items_must_say_what_is_pending(tmp_path: Path) -> None:
    candidato = {"id": "foto", "tipo": "foto", "estado": "candidato", "alt": "Una foto", "credito": "Autor",
                 "licencia": "CC0", "fuente": "https://ejemplo.org/foto", "spoiler": "No revela nada."}
    _caso_con_medios(tmp_path, {"caso": "9.9", "items": [candidato]})
    assert "pendiente" in "\n".join(validate.validate_case_media(tmp_path))
    _caso_con_medios(tmp_path, {"caso": "9.9", "items": [candidato], "pendiente": "Descargar la foto."})
    assert validate.validate_case_media(tmp_path) == []


def test_current_case_intros_declare_their_media() -> None:
    assert validate.validate_case_media() == []


@pytest.mark.parametrize("case", ["1-1", "4-1", "4-2"])
def test_each_current_intro_declares_its_media(tmp_path: Path, case: str) -> None:
    shutil.copytree(ROOT / "site" / "casos" / case, tmp_path / "site" / "casos" / case)
    assert validate.validate_case_media(tmp_path) == []


@pytest.mark.parametrize("exposure", [
    "README.md",
    "validation.json",
    "manifest.json",
    "docs/packages/guion.md",
    "evals/quality.md",
    "assets/app.js",
    "assets/curriculum.js",
])
def test_student_gate_rejects_instructor_leaks(tmp_path: Path, exposure: str) -> None:
    folder = tmp_path / "labs" / "level-1"
    _write(folder / "index.html", "<head><style data-student-layout></style></head><main>Alumno</main>")
    if exposure.endswith(".js"):
        _write(folder / exposure, "const liveTeachingPack = {teacherScript: ['Guion']};")
    else:
        _write(folder / exposure, "Solo docente")
    errors = checks.check_student_levels(tmp_path)
    assert errors, exposure


def test_student_gate_rejects_docente_html_and_missing_student_profile(tmp_path: Path) -> None:
    _write(tmp_path / "labs" / "level-1" / "index.html", '<aside class="teacher">En vivo</aside>')
    errors = checks.check_student_levels(tmp_path)
    assert any("sello de build" in error for error in errors)
    assert any("interfaz o contenido docente" in error for error in errors)



def test_docente_build_preserves_sources_without_public_seo(repo: Path, monkeypatch) -> None:
    course = yaml.safe_load((repo / "course.yaml").read_text())
    for component in course["components"].values():
        if isinstance(component, dict):
            component["publish"] = False
    (repo / "course.yaml").write_text(yaml.safe_dump(course))
    _write(repo / "dist" / "index.html", "Alumno intacto")
    _write(repo / "_site" / "index.html", "Fábrica alumno intacta")
    source = repo / "_site_docente"
    _write(source / "index.html", "Docente")
    _write(source / "labs/level-1/docs/guion.md", "Guion docente intacto")
    calls = []
    monkeypatch.setattr(build, "build_factory", lambda root, *, docente: calls.append(docente))
    def no_public_seo(*args):
        pytest.fail("El build docente no debe generar SEO público")
    monkeypatch.setattr(build, "inject_metadata", no_public_seo)
    monkeypatch.setattr(build, "write_seo", no_public_seo)
    build.build(repo, docente=True)
    output = repo / "dist-docente"
    assert calls == [True]
    assert (output / "labs/level-1/docs/guion.md").read_text() == "Guion docente intacto"
    assert not (output / "robots.txt").exists()
    assert not (output / "sitemap.xml").exists()
    assert (repo / "dist/index.html").read_text() == "Alumno intacto"
    assert (repo / "_site/index.html").read_text() == "Fábrica alumno intacta"


def test_check_only_visits_student_output_by_default(repo: Path, monkeypatch) -> None:
    _write(repo / "dist/index.html", "Alumno")
    _write(repo / "dist-docente/index.html", "Docente")
    visited = []
    monkeypatch.setattr(checks, "check_links", lambda dist: [])
    monkeypatch.setattr(checks, "check_portability", lambda dist, course: [])
    monkeypatch.setattr(checks, "check_level_themes", lambda root, dist: [])
    monkeypatch.setattr(checks, "check_student_levels", lambda dist: [])
    monkeypatch.setattr(checks, "check_seo", lambda course, root, dist: visited.append(dist) or [])
    monkeypatch.setattr(checks, "check_budgets", lambda course, dist: ([], {}))
    checks.run(repo)
    assert visited == [repo / "dist"]


@pytest.mark.parametrize("key", ["sha256", "contentSha256"])
def test_student_gate_rejects_hashes_anywhere_in_catalog(tmp_path: Path, key: str) -> None:
    _write(tmp_path / "labs/level-1/index.html", '<style data-student-layout></style>')
    _write(tmp_path / "catalog.json", json.dumps({"datasets": [{"nested": {key: "abc"}}]}))
    assert any("catalog.json" in error for error in checks.check_student_levels(tmp_path))
