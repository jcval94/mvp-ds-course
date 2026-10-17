# Nivel 1 V2 — Alfabetización narrativa (piloto)

Alternativa experimental para el bloque **Alfabetización de datos** de `labs/level-1/`. No reemplaza ningún nivel aprobado ni altera `generated/`.

## Ver publicada

- GitHub Pages: https://jcval94.github.io/mvp-ds-course/labs/level-1-v2/
- Cloudflare Pages: https://learninglabs.pages.dev/labs/level-1-v2/

## Qué cambia

El alumno atraviesa una historia continua de Don Juan y Paco con cinco escenas ilustradas y una decisión por concepto:

1. Observación: un ticket completo por registro.
2. Variable: identificar una columna de cantidades frente a identificadores y categorías.
3. Tabla: recuperar el contexto de un valor aislado.
4. Población: delimitar el conjunto completo en dos noches.
5. Muestra: entender el sesgo potencial tras perder registros.

Se mantienen la historia canónica `docs/stories/LEVEL_1.md`, los cinco conceptos curriculares y sus consecuencias de negocio. Las tablas y pedidos mostrados son **datos didácticos ficticios**, no observaciones reales. La V2 funciona como experiencia narrativa de introducción y **no sustituye** los recursos docentes detallados, datasets, ni los otros tres bloques originales.

## UX y accesibilidad

- Una decisión por pantalla, sin sidebar, acordeón masivo ni densidad de libro.
- Evidencia visual que cambia al acertar y explica la respuesta; se permite reintentar sin penalización.
- Progreso local en el navegador mediante `localStorage` (sin cuentas ni solicitudes de red del JavaScript).
- Navegación por botones y foco de teclado; texto de estados anunciado con `aria-live`.
- Adaptación móvil y `prefers-reduced-motion`.
- Sin librerías de JavaScript ni APIs externas; la tipografía usa Google Fonts con fallback a fuentes del sistema.

## Arquitectura

Fuente: `experiences/level-1-v2/{index.html,styles.css,app.js}`.

`scripts/build_pages.py` copia la experiencia a `_site/labs/level-1-v2/`. `harness/build.py` mantiene la publicación a `dist/labs/level-1-v2/` para ambos proveedores. La versión aprobada actual queda en `labs/level-1/`.

Validación: `python -m harness build && python -m harness check && python -m harness smoke`. El smoke test prueba las cinco decisiones y la persistencia para ambas rutas de hosting, además de desbordamiento horizontal móvil.

## Qué evaluar antes de ampliar a otros bloques

- Comprensión autónoma, especialmente diferenciar población y muestra.
- Si las escenas y animaciones ayudan o distraen.
- Tiempo hasta la primera decisión, legibilidad y carga cognitiva móvil.
- Cobertura de profundidad: añadir exploración opcional sin densificar la vista principal.
