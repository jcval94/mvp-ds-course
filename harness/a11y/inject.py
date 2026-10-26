"""Injection of no-visual accessibility behavior into published HTML copies.

_generated/_site content is regenerated; the canonical generated/ and design/ remain untouched.
The same transformation is applied to _site to preserve the existing byte-identity
contract between _site and dist/ for the legacy factory pages.
"""
from __future__ import annotations

import os
import re
import shutil
from pathlib import Path


MAIN_PAGES = {
    "index.html", "inscripcion.html", "colab.html", "placement.html",
    "terminos.html", "aviso-privacidad.html", "acceso.html", "alumno.html",
}


def applicable(relative: str) -> bool:
    # site/ (MAIN_PAGES) se corrige en su propio marcado; el script solo cubre lo que no se puede editar.
    return (bool(re.fullmatch(r"labs/level-[12]/[^/]+\.html", relative))
            or (relative == "capsulas/index.html")
            or bool(re.fullmatch(r"capsulas/(?:cases/[^/]+\.html|[^/]+\.html)", relative)))


SCRIPT = Path(__file__).resolve().parent / "semantic.js"


def inject(published: Path, source: Path = SCRIPT) -> list[str]:
    target = published / "a11y" / "semantic.js"
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
    touched: list[str] = []
    for path in sorted(published.rglob("*.html")):
        rel = path.relative_to(published).as_posix()
        if not applicable(rel):
            continue
        markup = path.read_text(encoding="utf-8")
        if 'data-course-a11y="semantic"' in markup:
            continue
        if "</body>" not in markup.lower():
            raise ValueError("Sin cierre body para accesibilidad: " + rel)
        address = os.path.relpath(target, start=path.parent).replace(os.sep, "/")
        tag = f'<script defer src="{address}" data-course-a11y="semantic"></script>'
        updated = re.sub(r"</body>", lambda match: tag + match.group(0),
                         markup, count=1, flags=re.IGNORECASE)
        path.write_text(updated, encoding="utf-8")
        touched.append(rel)
    return touched
