"""Static checks on dist/: internal links, host portability and size budgets."""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlsplit

from .config import DIST, HOST_CONFIG_FILES, HOST_COUPLING_MARKERS, ROOT, HarnessError, load_course
from .seo import base_url, check_seo, portability_text

MB = 1024 * 1024
URL_ATTRIBUTES = {"href", "src", "poster", "data"}
EXTERNAL_SCHEMES = ("http:", "https:", "mailto:", "tel:", "data:", "javascript:", "blob:", "about:")
TEXT_SUFFIXES = {".html", ".css", ".js", ".json", ".svg", ".txt", ".md", ".csv", ".xml"}
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


def check_portability(dist: Path = DIST, course: dict[str, Any] | None = None) -> list[str]:
    errors: list[str] = []
    base = base_url(course if course is not None else load_course())
    hostname = urlsplit(base).netloc
    for path in sorted(dist.rglob("*")):
        if path.is_file() and path.name in HOST_CONFIG_FILES:
            errors.append(f"{path.relative_to(dist).as_posix()}: configuración de un hosting; pertenece a la capa de deployment")
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
            text = path.read_text(encoding="utf-8", errors="ignore")
            text = portability_text(text, path.relative_to(dist).as_posix(), base)
            for marker in dict.fromkeys((*HOST_COUPLING_MARKERS, base, hostname)):
                if marker in text:
                    errors.append(f"{path.relative_to(dist).as_posix()}: contiene '{marker}' y acopla el sitio a un proveedor")
    for required in ("index.html", "404.html", "missions.json", "build-info.json"):
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


def check_level_themes(root: Path = ROOT, dist: Path = DIST) -> list[str]:
    """Levels listed in design/themes/levels.json must publish with tokens + their theme."""
    config = root / "design" / "themes" / "levels.json"
    if not config.exists():
        return []
    errors: list[str] = []
    themes = json.loads(config.read_text(encoding="utf-8"))
    for theme in themes["themes"]:
        if not (dist / "design" / theme["stylesheet"]).is_file():
            errors.append(f"design/{theme['stylesheet']}: el tema no se publicó en dist/")
        for level in theme["levels"]:
            pages = sorted((dist / "labs" / f"level-{level}").glob("*.html"))
            if not pages:
                errors.append(f"labs/level-{level}: nivel con tema sin páginas publicadas")
            for page in pages:
                text = page.read_text(encoding="utf-8", errors="ignore")
                for needed in ("../../design/tokens/tokens.css", f"../../design/{theme['stylesheet']}"):
                    if needed not in text:
                        errors.append(f"{page.relative_to(dist).as_posix()}: falta {needed}")
                if "DataClass Forge" in text:
                    errors.append(f"{page.relative_to(dist).as_posix()}: conserva la marca DataClass Forge")
    return errors


def check_student_levels(dist: Path = DIST) -> list[str]:
    """Fail closed if any instructor-only level artifact enters the public output."""
    errors: list[str] = []
    catalog = dist / "catalog.json"
    if catalog.is_file():
        def has_hash(value: Any) -> bool:
            if isinstance(value, dict):
                return any(key.lower().endswith("sha256") or has_hash(child) for key, child in value.items())
            if isinstance(value, list):
                return any(has_hash(child) for child in value)
            return False
        if has_hash(json.loads(catalog.read_text(encoding="utf-8"))):
            errors.append("catalog.json: contiene claves sha256 en build de alumnos")
    labs = dist / "labs"
    if not labs.is_dir():
        return ["dist/labs/: faltan los niveles del alumno"]
    levels = sorted(path for path in labs.glob("level-*") if path.is_dir() and path.name.split("-")[-1].isdigit())
    if not levels:
        errors.append("dist/labs/: no hay niveles numerados")
    private_names = {"README.md", "validation.json", "manifest.json"}
    private_dirs = {"docs", "evals"}
    source_markers = ("liveTeachingPack", "teacherScript", "teacherContent", 'data-mode="live"', 'class="teacher"', 'class="teacher-panel"', "Modo docente oculto")
    for level in levels:
        for file in level.rglob("*"):
            rel = file.relative_to(dist).as_posix()
            if (file.is_dir() and file.name in private_dirs) or (file.is_file() and file.name in private_names):
                errors.append(f"{rel}: material docente/interno en build de alumnos")
            if file.suffix in {".html", ".js"} and file.is_file():
                data = file.read_text(encoding="utf-8", errors="replace")
                if file.suffix == ".html" and "data-student-layout" not in data:
                    errors.append(f"{rel}: no tiene sello de build de alumno")
                if any(marker in data for marker in source_markers):
                    errors.append(f"{rel}: conserva interfaz o contenido docente")
    return errors


def run(root: Path = ROOT, dist: Path | None = None) -> dict[str, Any]:
    dist = dist or (root / "dist")
    if not (dist / "index.html").exists():
        raise HarnessError("dist/ no existe o está incompleto; ejecuta `python -m harness build`.")
    course = load_course(root)
    errors = check_links(dist) + check_portability(dist, course) + check_level_themes(root, dist)
    errors += check_seo(course, root, dist)
    errors += check_student_levels(dist)
    budget_errors, report = check_budgets(course, dist)
    errors += budget_errors
    if errors:
        shown = errors[:60]
        more = f"\n- … y {len(errors) - len(shown)} más" if len(errors) > len(shown) else ""
        raise HarnessError("Revisión de dist/ fallida:\n- " + "\n- ".join(shown) + more)
    return report
