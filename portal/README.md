# portal/

Capa nueva del portal. Se compila junto con la fábrica a `dist/` con
`python -m harness build`.

| Fuente | Se publica en | Qué es |
| --- | --- | --- |
| `site/` (existente) | `dist/index.html`, `methodology.html`, `placement.html` | Portal de la fábrica; desde F1 toma todos sus colores de `design/tokens/tokens.css` |
| `portal/curso/` | `dist/curso/` | **Shell del curso** con la estructura de la página de referencia: barra lateral (vistas + 13 niveles) y escenario con `iframe`. Estado en la URL: `?vista=` / `?nivel=` |
| `portal/missions/` | `dist/missions/` | Lista de misiones desde `dist/missions.json` |
| `portal/casos/` | `dist/casos/` | Banco de casos (estilo Narrative Memory) desde `dist/casos.json`; solo casos aprobados y públicos |
| `portal/salud/` | `dist/salud/` | Salud del curso (estilo Salud del repo) desde `build-info.json` y `catalog.json` |
| `portal/assets/views.css` | `dist/assets/views.css` | Estilos compartidos de las vistas |
| `portal/404.html` | `dist/404.html` | Error 404 con estilos en línea |

Reglas de portabilidad y estilo (el harness las verifica):

- Ningún color literal en `site/` ni `portal/`: solo variables de `design/tokens/tokens.css`.
- Solo rutas relativas. Nada que empiece con `/` ni dominios de un proveedor.
- Ningún archivo de configuración de un hosting (`.nojekyll`, `_headers`,
  `_redirects`, `CNAME`) dentro de `dist/`; eso lo agrega la capa de deployment.
- El sitio funciona servido en la raíz (Cloudflare Pages) y bajo una subruta
  (GitHub Pages de proyecto: `/mvp-ds-course/`).

El shell vive en `dist/curso/` mientras la portada de la fábrica sigue en la raíz. Moverlo a la raíz es un paso aparte: cambiar `BASE` en `curso/index.html`, mover la portada actual a `inicio.html` y ajustar `scripts/qa_pages.py`.
