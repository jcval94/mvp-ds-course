# F1 · Diseño — avance

Fecha: 2026-10-05 · Rama: `f1-diseno` (encima de `f0-consolidar`)

## Paso 1 (hecho): el portal toma todos sus colores de `design/`

| Cambio | Detalle |
| --- | --- |
| Tokens solo variables | `design/tokens/tokens.css` contiene únicamente variables; componentes y capa 8 bits pasan a `design/components/components.css` |
| Tokens nuevos | `--text-soft`, `--accent-strong`, `--ok-bg`, `--warn-bg`, `--critical-bg` (v0.2.0, espejo en `tokens.json`) |
| Portal | `site/index.html`, `placement.html`, `methodology.html` y `styles.css` cargan `design/tokens/tokens.css`; cero colores literales. Tema oscuro, acento cian e Inter como la página de referencia |
| Fábrica | `build_pages.py` publica `design/` junto al portal (una línea). `validate_content.py` resuelve enlaces a `design/` como ya lo hacía con `placement/` |
| Guardia | `harness validate` rechaza colores literales (hex, `white`, `black`) en `site/` y `portal/`; única excepción documentada: `portal/404.html` |
| Evidencia | `output/playwright/github-pages-desktop.png` y `-mobile.png` actualizadas al nuevo aspecto |

### Pruebas

| Prueba | Resultado |
| --- | --- |
| `validate_content.py` · `test_vertical_slices.py` | ✔ |
| `qa_pages.py` | ✔ portal, 13 niveles, móvil y consola |
| `harness/tests` | ✔ 13/13 (2 nuevas: la guardia detecta los 30+ colores del portal anterior) |
| `harness all` | ✔ 608 archivos; smoke en `/` y `/mvp-ds-course/` |
| Contraste WCAG de los pares de texto | ✔ AA (texto 17.9, muted 5.6–6.3, acento 11.4, texto sobre acento 11.7) |

### Decisión pendiente para ti

Las imágenes `reference/design/github-pages-*-approved.png` documentan el aspecto
claro anterior como "aprobado". Con este paso dejan de representar el portal. Si
apruebas el nuevo aspecto, se reemplazan por capturas del tema oscuro.

## Paso 2 (siguiente): un nivel con el sistema visual

Los niveles comparten `scripts/assets/level_shell_v1.css` y
`level_shell_bridge.css` (aplicados con `apply_level_shell.py`). El paso es
conectar esos dos archivos a `design/tokens/tokens.css`, aplicarlos primero al
Nivel 1 y aprobar con `qa_pages.py` y una comparación de capturas. No se corren
los generadores de nivel: ya no reproducen `generated/` (ver deuda de F0).

## Pasos 3–4

3. Cargar Inter y Press Start 2P de forma auto-hospedada en `design/` (sin CDN) y
   conectar `studio/` a `tokens.json`.
4. Primeros sprites (Don Juan, Paco, narrador) en `design/` con paleta de 16 colores.
