# design/

Sistema visual del curso. Fuente única de colores, tipografía y componentes.

- `tokens/tokens.css`: variables CSS y componentes base.
- `tokens/tokens.json`: los mismos valores para Remotion y Python.
- `REFERENCE.md`: de dónde salen los tokens (The Agentic D. Scientist, proyecto
  "Remix of Continuum 1").

Dos capas: **base** (secciones claras, hero oscuro `#050d0a`, acento ámbar
`#fdaa3e`, Plus Jakarta Sans, nunca verde) y **juego 8 bits** (sprites,
insignias, XP), que vive solo dentro de misiones y ejercicios.

Se publica en `dist/design/`. Las páginas lo enlazan con rutas relativas, nunca
con rutas absolutas ni dominios de un proveedor de hosting.

El harness exige paridad entre `tokens.css` y `tokens.json`.
