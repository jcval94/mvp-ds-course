# capsulas/

Cápsulas de oficina: historias breves que enseñan ciencia de datos con una sola
gráfica SVG. Importadas con historial completo desde el repo
[`narrative`](https://github.com/jcval94/narrative) (commit `904d027`).

## Dentro del monorepo

- Fuente canónica: `corporate-data-narrative-lab/` (casos Markdown, specs YAML,
  herramientas y pruebas). Sus reglas siguen en `corporate-data-narrative-lab/AGENTS.md`.
- El sitio generado **ya no se versiona**: `capsulas/docs/` está en `.gitignore`.
  El harness lo construye directamente en `dist/capsulas/`:

```powershell
python -m harness build
```

- Para revisar o probar solo las cápsulas:

```powershell
cd capsulas/corporate-data-narrative-lab
python -m pytest
python tools/build_pages_site.py   # escribe en capsulas/docs/ (ignorado por Git)
```

El repo `narrative` original sigue publicado sin cambios hasta demostrar paridad.
