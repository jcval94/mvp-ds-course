"""SEO build contracts, including negative gates and narrowly scoped host exceptions."""

from __future__ import annotations

import json
from pathlib import Path
from xml.etree import ElementTree as ET

import pytest
import yaml

from harness import build, checks, seo, validate
from harness.config import HarnessError, load_course


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def html(title="Una decisión & su evidencia", body="<h1>Evidencia observada</h1>", head=""):
    return f"<!doctype html><html><head><title>{title}</title>{head}</head><body>{body}</body></html>"


@pytest.fixture
def site(tmp_path):
    course = load_course()
    course["missions"] = []
    write(tmp_path / "course.yaml", yaml.safe_dump(course))
    dist = tmp_path / "dist"
    write(dist / "index.html", html())
    write(dist / "404.html", html(head='<meta name="robots" content="noindex">'))
    write(dist / "build-info.json", "{}")
    write(dist / "missions.json", '{"missions": []}')
    seo.write_seo(course, tmp_path, dist)
    return course, tmp_path, dist


def test_seo_is_deterministic_and_preserves_visible_content(site):
    course, root, dist = site
    page = dist / "nested" / "index.html"
    source = html(head='<meta name="description" content="Descripción existente &amp; exacta.">')
    write(page, source)
    assert seo.write_seo(course, root, dist) == []
    first = {p.relative_to(dist): p.read_bytes() for p in dist.rglob("*") if p.is_file()}
    seo.write_seo(course, root, dist)
    assert first == {p.relative_to(dist): p.read_bytes() for p in dist.rglob("*") if p.is_file()}
    metadata = seo.PageMetadata(page.read_text())
    assert metadata.descriptions[0][0]["content"] == "Descripción existente & exacta."
    assert metadata.canonicals[0][0]["href"] == seo.base_url(course) + "/nested/"
    assert page.read_text().split("<body>")[1] == source.split("<body>")[1]
    assert seo.check_seo(course, root, dist) == []
    assert checks.check_portability(dist, course) == []
    assert checks.check_links(dist) == []


@pytest.mark.parametrize("base", ["https://example.org/curso/", "https://preview.pages.dev/curso"])
def test_base_is_configurable_and_only_appears_in_authorized_slots(site, base):
    course, root, dist = site
    course["build"]["base_url"] = base
    seo.write_seo(course, root, dist)
    assert seo.check_seo(course, root, dist) == []
    assert checks.check_portability(dist, course) == []
    assert base.rstrip("/") + "/" in (dist / "sitemap.xml").read_text()
    assert base not in (dist / "robots.txt").read_text()


def test_description_derivation_and_explicit_todo(site):
    course, root, dist = site
    write(dist / "heading.html", html(body='<h1>Decidir <em>con evidencia</em></h1>'))
    write(dist / "title.html", html(title="Título verificable &amp; literal", body=""))
    write(dist / "empty.html", html(title="", body='<script><h1>No es contenido</h1></script>'))
    todos = seo.write_seo(course, root, dist)
    assert todos == ["empty.html"]
    for name, expected in [("heading", "Decidir con evidencia"), ("title", "Título verificable & literal"), ("empty", seo.TODO_DESCRIPTION)]:
        assert seo.PageMetadata((dist / f"{name}.html").read_text()).descriptions[0][0]["content"] == expected


@pytest.mark.parametrize("access,status,allowed", [
    ("public", "published", True), ("public", "ready", True),
    ("public", "draft", False), ("premium", "published", False), ("premium", "ready", False),
])
def test_sitemap_filters_missions_from_source_manifests_even_if_html_leaks(site, access, status, allowed):
    course, root, dist = site
    manifest = "missions/m01-test/mission.yaml"
    course["missions"] = [{"id": "m01-test", "manifest": manifest}]
    # Even an expanded build access list must never index premium missions.
    course["access"]["public_build_includes"] = ["public", "premium"]
    write(root / manifest, yaml.safe_dump({"id": "m01-test", "access": access, "status": status}))
    write(dist / "missions" / "m01-test" / "index.html", html())
    write(dist / "missions" / "m01-test" / "details.html", html())
    write(dist / "private.html", html(head='<meta name="robots" content="noindex,follow">'))
    write(dist / "redirect.html", html(head='<meta http-equiv="refresh" content="0;url=index.html">'))
    seo.write_seo(course, root, dist)
    sitemap = (dist / "sitemap.xml").read_text()
    assert ("/missions/m01-test/" in sitemap) is allowed
    assert ("/missions/m01-test/details.html" in sitemap) is allowed
    assert "/private.html" not in sitemap and "/404.html" not in sitemap and "/redirect.html" not in sitemap
    assert seo.check_seo(course, root, dist) == []
    # Injecting a private URL must fail the gate (not only be omitted at generation).
    if not allowed:
        sitemap = sitemap.replace("</urlset>", f'<url><loc>{seo.base_url(course)}/missions/m01-test/</loc></url></urlset>')
        write(dist / "sitemap.xml", sitemap)
        assert any("sitemap.xml" in error for error in seo.check_seo(course, root, dist))


@pytest.mark.parametrize("missing", ["robots.txt", "sitemap.xml", "canonical", "description"])
def test_check_command_fails_when_seo_is_missing(site, missing):
    _, root, dist = site
    if missing in {"robots.txt", "sitemap.xml"}:
        (dist / missing).unlink()
    else:
        page = dist / "index.html"
        text = page.read_text()
        metadata = seo.PageMetadata(text)
        entries = metadata.canonicals if missing == "canonical" else metadata.descriptions
        _, _, start, end = entries[0]
        write(page, text[:start] + text[end:])
    with pytest.raises(HarnessError, match=missing):
        checks.run(root, dist)


@pytest.mark.parametrize("change", ["wrong-url", "duplicate", "outside-head", "empty-description", "fake-comment", "fake-script"])
def test_invalid_metadata_is_rejected(site, change):
    course, root, dist = site
    page = dist / "index.html"
    text = page.read_text()
    if change == "wrong-url":
        text = text.replace(seo.base_url(course) + "/", "https://wrong.example/", 1)
    elif change == "duplicate":
        tag = '<link rel="canonical" href="' + seo.base_url(course) + '/">'
        text = text.replace("</head>", tag + "</head>")
    elif change == "empty-description":
        text = text.replace('content="Evidencia observada"', 'content=" "')
    else:
        _, _, start, end = seo.PageMetadata(text).canonicals[0]
        tag = text[start:end]
        text = text[:start] + text[end:]
        if change == "outside-head":
            text = text.replace("</body>", tag + "</body>")
        else:
            fake = "<!--" + tag + "-->" if change == "fake-comment" else "<script>const fake = `" + tag + "`;</script>"
            text = text.replace("</head>", fake + "</head>")
    write(page, text)
    assert seo.check_seo(course, root, dist)


@pytest.mark.parametrize("target,addition", [
    ("index.html", '<a href="{base}/">link</a>'),
    ("index.html", '<script>const base = "{base}"</script>'),
    ("index.html", '<!-- {base} -->'),
    ("styles.css", 'body{{background:url("{base}/asset.png")}}'),
    ("app.js", 'const url = "{base}";'),
    ("data.json", '{{"url":"{base}"}}'),
    ("robots.txt", 'Sitemap: {base}/sitemap.xml'),
    ("other.xml", '<loc>{base}/</loc>'),
    ("sitemap.xml", '<!-- {base} -->'),
])
def test_portability_rejects_base_everywhere_except_exact_seo_slots(site, target, addition):
    course, _, dist = site
    # Also guard a custom domain, not just the historical provider markers.
    course["build"]["base_url"] = "https://course.example/curso"
    path = dist / target
    text = path.read_text() if path.exists() else ""
    write(path, text + addition.format(base=seo.base_url(course)))
    assert any(target in error for error in checks.check_portability(dist, course))


@pytest.mark.parametrize("value", ["", "/curso", "ftp://example.org", "https://u:p@example.org", "https://example.org?q=1", "https://example.org/#x", "https://example.org/../x"])
def test_invalid_base_is_rejected(value):
    course = load_course()
    course["build"]["base_url"] = value
    with pytest.raises(HarnessError, match="base_url"):
        seo.base_url(course)


def test_schema_requires_single_base_configuration():
    course = load_course()
    del course["build"]["base_url"]
    assert any("base_url" in error for error in validate._schema_errors(course, "course.schema.json", "course.yaml"))


def test_build_wires_metadata_sitemap_and_todo_inventory(site, monkeypatch):
    course, root, dist = site
    course["components"]["portal"]["publish"] = False
    course["components"]["design"]["publish"] = False
    course["components"]["capsulas"]["publish"] = False
    write(root / "course.yaml", yaml.safe_dump(course))
    legacy = root / "_site"
    write(legacy / "index.html", html())
    write(legacy / "empty.html", html(title="", body=""))
    monkeypatch.setattr(build, "build_factory", lambda root: None)
    first = build.build(root)
    second = build.build(root)
    assert first["content_sha256"] == second["content_sha256"]
    assert first["seo_description_todos"] == ["empty.html"]
    assert json.loads((dist / "build-info.json").read_text())["seo_description_todos"] == ["empty.html"]
    assert (dist / "index.html").read_bytes() == (legacy / "index.html").read_bytes()
    assert seo.check_seo(course, root, dist) == []


def test_js_shell_description_uses_exact_published_catalog_block_title(site):
    course, root, dist = site
    write(dist / "shell.html", html(title="", body='<div id="app"></div>'))
    write(dist / "catalog.json", json.dumps({"levels": [{"status": "published", "blocks": [
        {"href": "shell.html", "title": "Alfabetización de datos"}]}]}))
    assert seo.write_seo(course, root, dist) == []
    assert seo.PageMetadata((dist / "shell.html").read_text()).descriptions[0][0]["content"] == "Alfabetización de datos"
    assert seo.check_seo(course, root, dist) == []
