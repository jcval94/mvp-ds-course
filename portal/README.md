# portal/

Capa nueva del portal. Se compila junto con la fábrica a `dist/` con
`python -m harness build`.

| Fuente | Se publica en | Qué es |
| --- | --- | --- |
| `site/` (existente) | `dist/index.html`, `methodology.html`, `placement.html` | Portal actual de la fábrica, sin cambios |
| `portal/missions/` | `dist/missions/` | Lista de misiones desde `dist/missions.json` |
| `portal/404.html` | `dist/404.html` | Error 404 con estilos en línea |

Reglas de portabilidad (el harness las verifica):

- Solo rutas relativas. Nada que empiece con `/` ni dominios de un proveedor.
- Ningún archivo de configuración de un hosting (`.nojekyll`, `_headers`,
  `_redirects`, `CNAME`) dentro de `dist/`; eso lo agrega la capa de deployment.
- El sitio funciona servido en la raíz (Cloudflare Pages) y bajo una subruta
  (GitHub Pages de proyecto: `/mvp-ds-course/`).

`site/` y `portal/` se unificarán con la landing de The Agentic D. Scientist (ver `design/REFERENCE.md`).
