"""Deterministic SEO on build outputs; no source HTML or visible copy is edited."""

from __future__ import annotations

import json
import re
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlsplit
from xml.etree import ElementTree as ET

from .config import HarnessError, load_missions

SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
ROBOTS = "User-agent: *\nAllow: /\n"
TODO_DESCRIPTION = "TODO: derivar descripción del contenido de esta página."


def base_url(course: dict[str, Any]) -> str:
    value = course.get("build", {}).get("base_url", "")
    parsed = urlsplit(value)
    if (not value or parsed.scheme not in {"http", "https"} or not parsed.netloc
            or parsed.username or parsed.password or parsed.query or parsed.fragment
            or any(char.isspace() for char in value)
            or any(char in value for char in '<>"\\')
            or any(part in {".", ".."} for part in parsed.path.split("/"))):
        raise HarnessError("course.yaml: build.base_url debe ser una URL http(s) sin credenciales, query ni fragmento.")
    return value.rstrip("/")


def page_url(base: str, relative: str) -> str:
    route = relative[:-len("index.html")] if relative.endswith("/index.html") or relative == "index.html" else relative
    return base + "/" + quote(route, safe="/")


class PageMetadata(HTMLParser):
    """Read real head tags (not lookalikes in comments/scripts) and their offsets."""

    def __init__(self, text: str):
        super().__init__(convert_charrefs=True)
        self.lines = text.splitlines(keepends=True)
        self.in_head = False
        self.head_end: int | None = None
        self.canonicals: list[tuple[dict, bool, int, int]] = []
        self.descriptions: list[tuple[dict, bool, int, int]] = []
        self.noindex = False
        self.redirect = False
        self.titles: list[str] = []
        self.headings: list[str] = []
        self.capture: str | None = None
        self.buffer: list[str] = []
        self.hidden_depth = 0
        self.feed(text)
        self.close()

    def source_offset(self) -> int:
        line, column = self.getpos()
        return sum(len(line) for line in self.lines[:line - 1]) + column

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == "head":
            self.in_head = True
        start = self.source_offset()
        entry = (data, self.in_head, start, start + len(self.get_starttag_text()))
        if not self.hidden_depth and tag == "link" and "canonical" in (data.get("rel") or "").lower().split():
            self.canonicals.append(entry)
        if tag == "meta" and not self.hidden_depth:
            name = (data.get("name") or "").lower()
            if name == "description":
                self.descriptions.append(entry)
            if self.in_head and name in {"robots", "googlebot"}:
                self.noindex |= bool(re.search(r"\b(noindex|none)\b", data.get("content") or "", re.I))
            if self.in_head and (data.get("http-equiv") or "").lower() == "refresh":
                self.redirect = True
        if tag in {"script", "style", "template"}:
            self.hidden_depth += 1
        if not self.hidden_depth and (tag == "title" or (tag == "h1" and not any(self.headings))):
            self.capture = tag
            self.buffer = []

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag == "head":
            self.head_end = self.source_offset()
            self.in_head = False
        if tag == self.capture:
            value = " ".join("".join(self.buffer).split())
            (self.titles if tag == "title" else self.headings).append(value)
            self.capture = None
        if tag in {"script", "style", "template"}:
            self.hidden_depth = max(0, self.hidden_depth - 1)

    def handle_data(self, data):
        if self.capture and not self.hidden_depth:
            self.buffer.append(data)


def inject_metadata(tree: Path, base: str) -> list[str]:
    """Preserve existing descriptions; otherwise quote h1/title, or emit a TODO."""
    todos = []
    # Some level shells render their headings from JS. The existing public
    # catalog provides an exact route -> approved block title without running JS.
    catalog_path = tree / "catalog.json"
    catalog = json.loads(catalog_path.read_text(encoding="utf-8")) if catalog_path.is_file() else {}
    catalog_titles = {block["href"]: block.get("title", "")
                      for level in catalog.get("levels", []) if level.get("status") == "published"
                      for block in level.get("blocks", [])}
    for page in sorted(tree.rglob("*.html")):
        relative = page.relative_to(tree).as_posix()
        text = page.read_text(encoding="utf-8")
        metadata = PageMetadata(text)
        if metadata.head_end is None:
            raise HarnessError(f"{relative}: falta </head>; no se puede inyectar SEO sin alterar el documento.")
        canonical = page_url(base, relative)
        description = next((tag[0].get("content", "").strip() for tag in metadata.descriptions
                            if tag[1] and (tag[0].get("content") or "").strip()), "")
        description = description or next((value for value in metadata.headings + metadata.titles + [catalog_titles.get(relative, "")] if value), TODO_DESCRIPTION)
        if description == TODO_DESCRIPTION:
            todos.append(relative)
        if (len(metadata.canonicals) == len(metadata.descriptions) == 1
                and metadata.canonicals[0][1] and metadata.descriptions[0][1]
                and metadata.canonicals[0][0] == {"rel": "canonical", "href": canonical}
                and metadata.descriptions[0][0].get("content") == description):
            continue
        # Replace only metadata tags. All text and all other source bytes survive.
        edits = [(start, end, "") for _, _, start, end in metadata.canonicals + metadata.descriptions]
        tags = (f'<link rel="canonical" href="{escape(canonical, quote=True)}">\n'
                f'<meta name="description" content="{escape(description, quote=True)}">\n')
        edits.append((metadata.head_end, metadata.head_end, tags))
        for start, end, replacement in sorted(edits, reverse=True):
            text = text[:start] + replacement + text[end:]
        page.write_text(text, encoding="utf-8")
    return todos


def public_pages(course: dict[str, Any], root: Path, dist: Path) -> list[str]:
    # This uses source manifests, never a potentially stale missions.json.
    missions = {mission.id: mission.data for mission in load_missions(course, root)}
    free_levels = set(course["access"]["free_lab_levels"])
    pages = []
    for page in sorted(dist.rglob("*.html")):
        relative = page.relative_to(dist).as_posix()
        # Match the deployment gate, including variants such as level-3-v2
        # and every HTML descendant, without removing their SEO metadata.
        level = re.match(r"^labs/level-(\d+)(?:[-/]|$)", relative)
        if level and int(level[1]) not in free_levels:
            continue
        parts = Path(relative).parts
        if parts[0] == "missions" and len(parts) > 2:
            mission = missions.get(parts[1], {})
            if mission.get("access") != "public" or mission.get("status") not in {"ready", "published"}:
                continue
        metadata = PageMetadata(page.read_text(encoding="utf-8"))
        if page.name == "404.html" or metadata.noindex or metadata.redirect:
            continue
        pages.append(relative)
    return pages


def write_seo(course: dict[str, Any], root: Path, dist: Path) -> list[str]:
    base = base_url(course)
    todos = inject_metadata(dist, base)
    urls = [page_url(base, page) for page in public_pages(course, root, dist)]
    # No Sitemap directive in robots: the absolute base is permitted only in
    # canonical and sitemap. /sitemap.xml remains at the conventional location.
    (dist / "robots.txt").write_text(ROBOTS, encoding="utf-8")
    entries = "".join(f"  <url><loc>{escape(url)}</loc></url>\n" for url in urls)
    (dist / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="{SITEMAP_NS}">\n{entries}</urlset>\n', encoding="utf-8")
    return todos


def check_seo(course: dict[str, Any], root: Path, dist: Path) -> list[str]:
    base = base_url(course)
    errors = []
    for page in sorted(dist.rglob("*.html")):
        relative = page.relative_to(dist).as_posix()
        metadata = PageMetadata(page.read_text(encoding="utf-8"))
        if (len(metadata.canonicals) != 1 or not metadata.canonicals[0][1]
                or metadata.canonicals[0][0] != {"rel": "canonical", "href": page_url(base, relative)}):
            errors.append(f"{relative}: falta canonical único en head con la URL de build.base_url y su ruta")
        if (len(metadata.descriptions) != 1 or not metadata.descriptions[0][1]
                or not (metadata.descriptions[0][0].get("content") or "").strip()):
            errors.append(f"{relative}: falta meta description única y no vacía en head")
    robots = dist / "robots.txt"
    if not robots.is_file() or robots.read_text(encoding="utf-8") != ROBOTS:
        errors.append("robots.txt: falta o no coincide con la política portable de rastreo")
    try:
        tree = ET.fromstring((dist / "sitemap.xml").read_text(encoding="utf-8"))
        ns = "{" + SITEMAP_NS + "}"
        valid_shape = (tree.tag == ns + "urlset" and not tree.attrib and bool(list(tree))
                       and all(url.tag == ns + "url" and not url.attrib and len(url) == 1
                               and url[0].tag == ns + "loc" and not url[0].attrib and not len(url[0]) for url in tree))
        actual = [url[0].text for url in tree] if valid_shape else []
        expected = [page_url(base, page) for page in public_pages(course, root, dist)]
        if not valid_shape or actual != expected:
            errors.append("sitemap.xml: debe listar exactamente las páginas públicas indexables, sin duplicados, niveles de pago ni misiones premium/draft")
    except (OSError, ET.ParseError):
        errors.append("sitemap.xml: falta o XML inválido")
    return errors


def portability_text(text: str, relative: str, base: str) -> str:
    """Mask only the exact canonical URL slot / valid sitemap loc slots for scans."""
    if relative.endswith(".html"):
        metadata = PageMetadata(text)
        for attrs, in_head, start, end in reversed(metadata.canonicals):
            if in_head and attrs == {"rel": "canonical", "href": page_url(base, relative)}:
                text = text[:start] + text[end:]
    elif relative == "sitemap.xml":
        # Only loc text in the sitemap namespace is an authorized URL slot.
        try:
            tree = ET.fromstring(text)
        except ET.ParseError:
            return text
        ns = "{" + SITEMAP_NS + "}"
        if tree.tag == ns + "urlset":
            for url in tree:
                if url.tag == ns + "url" and len(url) == 1 and url[0].tag == ns + "loc":
                    value = url[0].text or ""
                    if value.startswith(base + "/"):
                        text = text.replace("<loc>" + escape(value) + "</loc>", "<loc></loc>", 1)
    return text
