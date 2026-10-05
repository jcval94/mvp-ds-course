# Narrative

Repositorio de `corporate-data-narrative-lab`: historias breves de oficina que
enseñan ciencia de datos con una sola gráfica SVG.

## Sitio público

El sitio de GitHub Pages vive en [`docs/`](docs/) y se regenera desde las
fuentes canónicas del laboratorio.

En GitHub, configura Pages así:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

Para reconstruirlo localmente:

```powershell
cd corporate-data-narrative-lab
python tools/build_pages_site.py
python -m pytest
```

No edites `docs/` a mano. Cambia los casos en
`corporate-data-narrative-lab/examples/` y vuelve a generar el sitio.
