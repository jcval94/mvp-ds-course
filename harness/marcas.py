"""Quita marcas viejas del texto publicado sin editar generated/ (recortes r08, fila 1).

Las páginas de los niveles salen de la fábrica con «DataClass Forge» y «Corporate Data Narrative Lab». El alumno solo
debe ver el nombre del curso. El cambio se aplica a la copia de build, igual que la inyección de SEO.
"""

from __future__ import annotations

import re
from pathlib import Path

CURSO = "The Agentic Data Scientist"
MARCAS = ("DataClass Forge", "Corporate Data Narrative Lab")
SUFIJOS = {".html", ".js", ".md", ".json", ".txt", ".svg", ".xml"}

# Primero los contextos con forma propia; al final, el reemplazo general.
_REGLAS: tuple[tuple[re.Pattern[str], str], ...] = (
    # Una descripción que solo dice la marca no describe la página: se quita y la deriva el SEO del h1 o el título.
    (re.compile(r'[ \t]*<meta name="description" content="(?:DataClass Forge|Corporate Data Narrative Lab)">\n?'), ""),
    (re.compile(r"<small>powered by DataClass Forge</small>"), ""),
    (re.compile(r"\(fábrica DataClass Forge\)"), "(fábrica de niveles)"),
    (re.compile(r"la fábrica DataClass Forge"), "la fábrica de niveles del curso"),
    (re.compile(r"DataClass Forge|Corporate Data Narrative Lab"), CURSO),
)


def limpiar_texto(texto: str) -> str:
    for patron, reemplazo in _REGLAS:
        texto = patron.sub(reemplazo, texto)
    return texto


def limpiar(arbol: Path) -> int:
    """Reescribe los archivos de texto del árbol; devuelve cuántos cambiaron."""
    cambiados = 0
    for ruta in sorted(arbol.rglob("*")):
        if not ruta.is_file() or ruta.suffix.lower() not in SUFIJOS:
            continue
        texto = ruta.read_text(encoding="utf-8", errors="strict")
        if not any(marca in texto for marca in MARCAS):
            continue
        ruta.write_text(limpiar_texto(texto), encoding="utf-8")
        cambiados += 1
    return cambiados


def revisar(dist: Path) -> list[str]:
    errores = []
    for ruta in sorted(dist.rglob("*")):
        if ruta.is_file() and ruta.suffix.lower() in SUFIJOS:
            texto = ruta.read_text(encoding="utf-8", errors="ignore")
            for marca in MARCAS:
                if marca in texto:
                    errores.append(f"{ruta.relative_to(dist).as_posix()}: muestra la marca vieja «{marca}»")
    return errores
