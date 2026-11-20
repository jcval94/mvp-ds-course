"""Genera site/assets/compartir.png (1200 x 630) desde tarjeta.html con Chromium.

Uso: python scripts/imagen_social/generar.py
El texto de la tarjeta lo decide el autor; si cambia, se vuelve a correr y se versiona el PNG.
"""

from __future__ import annotations

from pathlib import Path

from playwright.sync_api import sync_playwright

AQUI = Path(__file__).resolve().parent
SALIDA = AQUI.parents[1] / "site" / "assets" / "compartir.png"


def main() -> None:
    with sync_playwright() as p:
        navegador = p.chromium.launch()
        pagina = navegador.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
        pagina.goto((AQUI / "tarjeta.html").as_uri())
        pagina.evaluate("document.fonts.ready")
        pagina.screenshot(path=str(SALIDA), type="png")
        navegador.close()
    print(f"{SALIDA.relative_to(AQUI.parents[1])}: {SALIDA.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
