"""Static checks on dist/: internal links, host portability and size budgets."""

from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlsplit

from .config import DIST, HOST_CONFIG_FILES, HOST_COUPLING_MARKERS, ROOT, HarnessError, load_course

MB = 1024 * 1024
URL_ATTRIBUTES = {"href", "src", "poster", "data"}
EXTERNAL_SCHEMES = ("http:", "https:", "mailto:", "tel:", "data:", "javascript:", "blob:", "about:")
TEXT_SUFFIXES = {".html", ".css", ".js", ".json", ".svg", ".txt", ".md", ".csv"}
CSS_URL = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")


class _UrlCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.urls: list[tuple[str, int]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name in URL_ATTRIBUTES and value:
                self.urls.append((value.strip(), self.getpos()[0]))
            elif name == "srcset" and value:
                for candidate in value.split(","):
                    url = candidate.strip().split(" ")[0]
                    if url:
                        self.urls.append((url, self.getpos()[0]))


def _is_internal(url: str) -> bool:
    lowered = url.lower()
    if not url or lowered.startswith(EXTERNAL_SCHEMES) or url.startswith(("#", "//")):
        return False
    return not any(token in url for token in ("${", "{{", "' +", "\" +"))


def _resolve(dist: Path, page: Path, url: str) -> Path:
    path = unquote(urlsplit(url).path)
    target = (page.parent / path).resolve()
    if path.endswith("/") or target.is_dir():
        target = target / "index.html"
    return target


def check_links(dist: Path = DIST) -> list[str]:
    errors: list[str] = []
    dist = dist.resolve()
    for page in sorted(dist.rglob("*.html")):
        collector = _UrlCollector()
        collector.feed(page.read_text(encoding="utf-8"))
        relative_page = page.relative_to(dist).as_posix()
        for url, line in collector.urls:
            if not _is_internal(url):
                continue
            if url.startswith("/"):
                errors.append(f"{relative_page}:{line}: ruta absoluta '{url}' rompe el sitio bajo una subruta; usa una ruta relativa")
                continue
            if not urlsplit(url).path:
                continue
            target = _resolve(dist, page, url)
            if not str(target).startswith(str(dist)):
                errors.append(f"{relative_page}:{line}: '{url}' apunta fuera del sitio publicado")
            elif not target.exists():
                errors.append(f"{relative_page}:{line}: enlace roto '{url}'")
    for stylesheet in sorted(dist.rglob("*.css")):
        relative_css = stylesheet.relative_to(dist).as_posix()
        for url in CSS_URL.findall(stylesheet.read_text(encoding="utf-8")):
            if not _is_internal(url):
                continue
            if url.startswith("/"):
                errors.append(f"{relative_css}: url('{url}') absoluta; usa una ruta relativa")
            elif not _resolve(dist, stylesheet, url).exists():
                errors.append(f"{relative_css}: recurso roto url('{url}')")
    return errors


def check_portability(dist: Path = DIST) -> list[str]:
    errors: list[str] = []
    for path in sorted(dist.rglob("*")):
        if path.is_file() and path.name in HOST_CONFIG_FILES:
            errors.append(f"{path.relative_to(dist).as_posix()}: configuración de un hosting; pertenece a la capa de deployment")
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
            text = path.read_text(encoding="utf-8", errors="ignore")
            for marker in HOST_COUPLING_MARKERS:
                if marker in text:
                    errors.append(f"{path.relative_to(dist).as_posix()}: contiene '{marker}' y acopla el sitio a un proveedor")
    for required in ("index.html", "404.html", "missions.json", "casos.json", "build-info.json", "curso/index.html"):
        if not (dist / required).is_file():
            errors.append(f"dist/{required} no existe")
    return errors


def check_budgets(course: dict[str, Any], dist: Path = DIST) -> tuple[list[str], dict[str, Any]]:
    budgets = course["build"]["budgets"]
    files = [path for path in dist.rglob("*") if path.is_file()]
    total = sum(path.stat().st_size for path in files)
    largest = max(files, key=lambda path: path.stat().st_size)
    errors: list[str] = []
    if len(files) > budgets["dist_max_files"]:
        errors.append(f"dist/: {len(files)} archivos (límite {budgets['dist_max_files']})")
    if total > budgets["dist_max_total_mb"] * MB:
        errors.append(f"dist/: {total / MB:.1f} MB (límite {budgets['dist_max_total_mb']} MB)")
    for path in files:
        if path.stat().st_size > budgets["dist_max_file_mb"] * MB:
            errors.append(f"dist/{path.relative_to(dist).as_posix()}: {path.stat().st_size / MB:.1f} MB (límite {budgets['dist_max_file_mb']} MB)")
    report = {
        "files": len(files),
        "total_mb": round(total / MB, 2),
        "largest": [largest.relative_to(dist).as_posix(), round(largest.stat().st_size / MB, 2)],
    }
    return errors, report


def run(root: Path = ROOT, dist: Path | None = None) -> dict[str, Any]:
    dist = dist or (root / "dist")
    if not (dist / "index.html").exists():
        raise HarnessError("dist/ no existe o está incompleto; ejecuta `python -m harness build`.")
    errors = check_links(dist) + check_portability(dist)
    budget_errors, report = check_budgets(load_course(root), dist)
    errors += budget_errors
    if errors:
        shown = errors[:60]
        more = f"\n- … y {len(errors) - len(shown)} más" if len(errors) > len(shown) else ""
        raise HarnessError("Revisión de dist/ fallida:\n- " + "\n- ".join(shown) + more)
    return report
