# Intros de caso (página) · The Agentic Data Scientist

Gancho público de cada caso: 5 escenas tipo videojuego de 8 bits (~1 min), sin login, sin cookies, sin servidor.
La resolución (hipótesis calificada, datos, giro, rúbrica) vive en el cuaderno de Colab. Reparto completo en la skill
`tads-caso-reparto-pagina-colab`; cómo construir una intro con este motor, en `tads-intro-cinematica-8bits`.

## Contrato página ↔ cuaderno

| Página (esta carpeta) | Cuaderno de Colab (repo privado `agentic-ds-backen`, `docs/CINE.md`) |
| --- | --- |
| Termina con el expediente «SIN RESOLVER» y el botón «Abrir el caso en Colab» | Abre con `cine.portada(…, "EXPEDIENTE ABIERTO", …)` y termina con `cine.cierre(…, "CASO X.Y RESUELTO", …)` |
| Una o dos cifras del enigma, redondeadas con honestidad | Las mismas cifras, completas, con su fuente |
| Micro-interacciones sin nota; no guarda nada | La hipótesis y las respuestas se registran con `tdd` |
| Paleta `--tq-*` de `design/tokens/tokens.css` (sin verde) | Paleta de la Taquería del paquete del alumno (`taqueria/__init__.py`) |

El botón de cada intro apunta al cuaderno vigente (`CUADERNO_URL` del caso en el backend). Si el cuaderno cambia de
archivo en Drive, cambia `colab` en `escenas.js` y el enlace del `noscript` de su `index.html`.

## Estructura
- `motor.css`, `motor.js`, `pixel.js`, `comun.js`: motor compartido (no se toca por caso).
  - `motor.js`: bucle de animación, cámara (zoom y paneo con parallax), transiciones de persiana, partículas,
    sacudida y destello, contadores, narración por líneas con avance automático, sonido 8 bits (apagado por defecto).
  - `pixel.js`: primitivas de dibujo (rectángulos, sprites, personajes que caminan, rejillas de 100 cuadros, expediente).
  - `comun.js`: piezas que se repiten (tablero de dos rejillas con contadores, escena final del expediente).
- `4-1/`, `4-2/`: un caso = `index.html` + `escenas.js` (arte, guion y datos de la ficha).
- `fuentes/`: Press Start 2P y Atkinson Hyperlegible (OFL), servidas desde el propio sitio.
- Colores: solo variables `--tq-*` de `design/tokens/tokens.css` (el harness rechaza colores literales en `site/`).
  `motor.css` las importa con una ruta relativa que funciona en el sitio publicado (`dist/`), donde `design/` queda junto
  a `casos/`. Para ver una intro en local, construye primero (`python -m harness all`) y sirve `dist/`.

## Qué hace dinámica cada escena
Cada escena combina un **plano** (la cámara se mueve o hay capas con parallax), un **gesto** (algo se mueve solo: gente
que camina, reloj, pájaros, monedas), una **sorpresa** (sello que golpea, sacudida, cascada de cuadros, contador que
sube) y, cada ~20 s, una **acción del alumno** que nunca se califica. La narración son líneas cortas que avanzan solas y
cada línea dispara un cambio visual. Entre escenas, una persiana de 16 tiras.

## Controles y accesibilidad
- **AUTO: SI/NO** pausa el avance automático (WCAG 2.2.2). Tocar un elemento de la escena también lo detiene.
- **SONIDO** apagado por defecto. **SALTAR** lleva a la ficha final. Teclado: flechas, Enter y Espacio sobre lo tocable.
- `prefers-reduced-motion`: sin animación ni máquina de escribir, sin avance automático; todo queda en su estado final.
- Texto real en el DOM con región `aria-live`, contraste alto, `noscript` con el resumen y el enlace a Colab.

## Caso nuevo
1. Copia `4-1/` a `X-Y/`; en `index.html` cambia título, descripción, `noscript` y enlace de Colab.
2. En `escenas.js` cambia `CASO` (id, título, `colab`, duraciones, herramientas, fuentes) y reescribe las escenas.
   Colores solo con `var(--tq-…)`; si hace falta un tono nuevo, agrégalo en `tokens.css` y `tokens.json` (sin verde).
3. Prueba de spoiler: quien solo vea la página no debe poder adivinar el giro. Si la pregunta detonadora o las
   herramientas lo delatan, usa una pregunta más suave y `herramientasOcultas: N`.
4. Cifras: solo con fuente consultada; que coincidan con el cuaderno y que ningún contador termine en un número
   que contradiga el dato (2.8 % se muestra como «menos de 3», nunca «3»).
5. Agrega el caso a `INTROS` en `site/alumno.js` para que su tarjeta muestre «Ver la intro (1 min)».
6. Pruebas (ver abajo) y `python -m harness all`. Publicar a nombre del docente requiere su permiso.

## Pruebas
El motor expone `window.__intro` (`ir(n)`, `estado()`, `g`) para pruebas automáticas. Con Playwright sobre `dist/`:
sin errores de consola; recorrido completo simulado (~45–50 s hasta el botón a Colab, jugando de corrido);
60 fps; móvil 390×844 sin desborde horizontal; modo reducido (`document.getAnimations().length === 0` y estados
finales correctos); teclado; con AUTO apagado se llega a la ficha.

## Modelo y nivel de razonamiento recomendados (puntos de partida; detalle en la skill de reparto)
| Fase | Modelo | Nivel |
| --- | --- | --- |
| Diseñar el caso: reparto página/Colab, gancho, prueba de spoiler, rúbrica | Opus 5.5 (Fable 5.1 si el caso es delicado) | high |
| Construir escenas, motor y cuaderno (trabajo ya especificado) | Sonnet 5.5 | medium; high para motor nuevo o una animación que no sale en 2 intentos |
| QA mecánico: capturas, desbordes, consola, enlaces, formato | Haiku 5.5 (subagente) | low–medium |
| Revisión independiente de cifras, spoilers y accesibilidad | Opus 5.5, agente aparte que no vio el trabajo | high |

## Pendiente
- `volver: '../../index.html'` lleva a la portada del sitio; cambiarlo si el área del alumno debe ser el destino.
- Duración del cuaderno (`~50 min`) es la estimación base; ajustar por caso.
