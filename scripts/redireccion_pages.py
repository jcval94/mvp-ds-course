"""Genera el sitio de GitHub Pages que solo redirige al sitio oficial.

GitHub Pages (https://jcval94.github.io/mvp-ds-course/) ya no publica el portal: cada
página HTML de dist/ se reemplaza por una página mínima que lleva a la misma ruta en
el sitio oficial, conservando ?consulta y #ancla. Las rutas que no existan caen en
404.html, que también redirige quitando el prefijo /mvp-ds-course.

Pertenece a la capa de deployment: nunca escribe en dist/.

Uso: python scripts/redireccion_pages.py DIST SALIDA [DESTINO]
     (DESTINO por omisión: https://learninglabs.pages.dev/)
"""

from __future__ import annotations

import html
import json
import sys
from pathlib import Path

DESTINO = "https://learninglabs.pages.dev/"
PREFIJO = "/mvp-ds-course"

PLANTILLA = """<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Nos mudamos · Augmented Learning Labs</title>
<link rel="canonical" href="{url_attr}">
<meta http-equiv="refresh" content="0; url={url_attr}">
<script>{script}</script>
<style>body{{font-family:system-ui,sans-serif;margin:0;min-height:100vh;display:grid;place-items:center;padding:16px;text-align:center;line-height:1.5}}</style>
</head>
<body>
<p>El sitio ahora vive en <a href="{url_attr}">{destino_txt}</a>. Te llevamos ahí.</p>
</body>
</html>
"""


def _pagina(url: str, script: str, destino: str) -> str:
    return PLANTILLA.format(url_attr=html.escape(url, quote=True), script=script,
                            destino_txt=html.escape(destino.split("//", 1)[-1].rstrip("/")))


def ruta_destino(rel: str) -> str:
    """index.html → carpeta; cualquier otro archivo conserva su nombre."""
    if rel == "index.html":
        return ""
    if rel.endswith("/index.html"):
        return rel[: -len("index.html")]
    return rel


def generar(dist: Path, salida: Path, destino: str = DESTINO) -> int:
    destino = destino.rstrip("/") + "/"
    if not dist.is_dir():
        raise SystemExit(f"No existe {dist}")
    salida.mkdir(parents=True, exist_ok=True)
    n = 0
    for f in sorted(dist.rglob("*.html")):
        rel = f.relative_to(dist).as_posix()
        if rel == "404.html":
            continue
        url = destino + ruta_destino(rel)
        script = "location.replace(%s + location.search + location.hash);" % json.dumps(url)
        out = salida / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(_pagina(url, script, destino), encoding="utf-8")
        n += 1
    # Cualquier otra ruta: misma ruta en el sitio oficial, sin el prefijo del repositorio.
    script_404 = ("var p = location.pathname; if (p.indexOf(%s) === 0) p = p.slice(%d);"
                  " location.replace(%s + p.replace(/^\\/+/, '') + location.search + location.hash);"
                  % (json.dumps(PREFIJO), len(PREFIJO), json.dumps(destino)))
    (salida / "404.html").write_text(_pagina(destino, script_404, destino), encoding="utf-8")
    (salida / ".nojekyll").write_text("", encoding="utf-8")
    return n + 1


if __name__ == "__main__":
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    total = generar(Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3] if len(sys.argv) > 3 else DESTINO)
    print(f"OK redirección · {total} páginas → {sys.argv[3] if len(sys.argv) > 3 else DESTINO}")
