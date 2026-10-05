# design/

Sistema visual del curso. Fuente única de colores, tipografía y componentes.

- `tokens/tokens.css`: variables CSS y componentes base.
- `tokens/tokens.json`: los mismos valores para Remotion y Python.
- `REFERENCE.md`: de dónde salen los tokens (página de referencia del 2026-10-05).

Dos capas: **base** (la página de referencia: tema oscuro, acento cian, Inter) y
**juego 8 bits** (sprites, insignias, XP), que solo decora.

Se publica en `dist/design/`. Las páginas lo enlazan con rutas relativas, nunca
con rutas absolutas ni dominios de un proveedor de hosting.

El harness exige paridad entre `tokens.css` y `tokens.json`.
