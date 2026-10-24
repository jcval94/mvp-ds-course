# Intros de caso (página) · The Agentic Data Scientist

Gancho público de cada caso: escenas tipo videojuego de 8 bits, sin login, sin cookies, sin servidor. **Todo caso tiene
intro**, también los de «el costo del error», y **toda intro muestra material real del caso** (ver abajo).

| Formato | Para qué caso | Escenas | Duración |
| --- | --- | --- | --- |
| Completo | Caso principal de la clase (ingenio o mixto) | 5: lugar, personas, cifras, interacción, expediente | ~1 min |
| Corto | Caso de «el costo del error» | 3: el material real, el número que no cuadra, el expediente del costo | ~40 s |

La resolución (hipótesis calificada, datos, giro, rúbrica) vive en el cuaderno de Colab. Reparto completo en la skill
`tads-caso-reparto-pagina-colab`; cómo construir una intro con este motor, en `tads-intro-cinematica-8bits`.

## Contrato página ↔ cuaderno

| Página (esta carpeta) | Cuaderno de Colab (repo privado `agentic-ds-backen`, `docs/CINE.md`) |
| --- | --- |
| Termina con el expediente «SIN RESOLVER» y el botón «Abrir el caso en Colab» | Abre con `cine.portada(…, "EXPEDIENTE ABIERTO", …)` y termina con `cine.cierre(…, "CASO X.Y RESUELTO", …)` |
| Una o dos cifras del enigma, redondeadas con honestidad | Las mismas cifras, completas, con su fuente |
| Micro-interacciones sin nota; no guarda nada; sin opciones de respuesta | La apuesta (hipótesis) y las respuestas se piden y registran solo aquí, con `tdd` |
| Una pregunta abierta de cierre, distinta de la explicación calificada | Empieza donde termina la intro y no repite ninguna de sus frases (`PAGINA` del caso) |
| Paleta `--tq-*` de `design/tokens/tokens.css` (sin verde) | Paleta de la Taquería del paquete del alumno (`taqueria/__init__.py`) |

El botón de cada intro apunta al cuaderno vigente (`CUADERNO_URL` del caso en el backend). Si el cuaderno cambia de
archivo en Drive, cambia `colab` en `escenas.js`, el enlace del `noscript` de su `index.html` y `CUADERNOS` en
`site/alumno.js`. Vigentes: 4.1 v1.3 (`1FNfm7Lf5e69Lw3ER5BM8L4jQMrdbyAgQ`) y 4.2 v2.6 (`1dTrByn08HxKMfNRSDoy44FqGrCGS97qG`).

**No repetir.** El cuaderno copia las líneas de narración de cada intro en `PAGINA["frases"]` y el generador rechaza
el cuaderno si repite alguna. Si cambias las líneas de una intro, avisa en el PR para actualizar `PAGINA` en el
backend. Las piezas que la página ya mostró (rejillas de 100, balanza 44/35) no se repiten en el cuaderno.

## Material real del caso (`medios.json`)
Cada carpeta de caso trae `medios.json` con las fotos, grabados, recortes de noticias, documentos o videos reales del
caso. El motor los carga antes de la primera escena (`CASO.medios = 'medios.json'` en `escenas.js`) y las escenas los
muestran con `g.archivo(id, {lado, ms, ancho})` (una pieza «clavada» sobre la escena, con etiqueta FOTO REAL, IMAGEN DE
EPOCA, NOTICIA REAL o DOCUMENTO REAL, pie y crédito) o `g.video(id)` (póster local; YouTube en modo de privacidad
mejorada se carga solo si la persona toca reproducir, y la escena deja de avanzar sola). La ficha final lista los
créditos. Un medio que no está `listo` no se muestra y la escena sigue igual.

| Campo | Qué es |
| --- | --- |
| `id`, `tipo` | Nombre en minúsculas con guiones; `foto`, `grabado`, `recorte`, `documento` o `video` |
| `estado` | `listo` (se muestra) o `candidato` (verificado, falta el archivo) |
| `archivo` / `poster` | Imagen local en `medios/` (webp, jpg, png o avif, hasta 400 KB; ideal 1200 px y ≤ 350 KB). Nunca un enlace a otro sitio |
| `video` | Solo `https://www.youtube-nocookie.com/embed/ID?start=…&end=…`: un fragmento corto. El video no se versiona en el repo |
| `alt`, `pie` | Texto alternativo y pie corto en pantalla |
| `credito`, `licencia`, `fuente` | Autor o archivo; Dominio público, CC0, CC BY x.x, CC BY-SA x.x, Permiso escrito o Cita breve; enlace https de origen |
| `nota` | Obligatoria en una cita breve: qué parte se muestra (un titular, un encabezado) y por qué |
| `spoiler` | La prueba de spoiler de ese medio: qué no revela |
| `pendiente` | Si ningún medio está `listo`, qué falta para tenerlos |

Reglas:
- **Prueba de spoiler** también para el material: la foto o el titular no adelanta el giro ni la herramienta (en 4.1 no
  aparece el retrato de Semmelweis; en 4.2 se recorta solo el encabezado del artículo, no su resumen).
- **Licencia antes que gusto:** dominio público o Creative Commons con crédito; una noticia con derechos solo como cita
  breve (titular o encabezado, con referencia). Nada de capturas de video ni fotos de agencia sin permiso.
- **Casos con víctimas:** el material no muestra víctimas ni escenas de dolor; documentos, lugares y titulares sí.
- Las imágenes se sirven desde el sitio (nada de enlazar en caliente). Con movimiento reducido no hay efecto de
  acercamiento y la pieza se queda hasta que la persona la cierra.
- Si un caso usa video, el aviso de privacidad debe mencionar que YouTube se carga solo a petición de la persona.
- `python -m harness all` valida cada `medios.json`.

## Estructura
- `motor.css`, `motor.js`, `pixel.js`, `comun.js`: motor compartido (no se toca por caso).
  - `motor.js`: bucle de animación, cámara (zoom y paneo con parallax), transiciones de persiana, partículas,
    sacudida y destello, contadores, narración por líneas con avance automático, sonido 8 bits (apagado por defecto).
  - `pixel.js`: primitivas de dibujo (rectángulos, sprites, personajes que caminan, rejillas de 100 cuadros, expediente).
  - `comun.js`: piezas que se repiten (tablero de dos rejillas con contadores, escena final del expediente).
- `4-1/`, `4-2/`: un caso = `index.html` + `escenas.js` (arte, guion y datos de la ficha) + `medios.json` y `medios/`
  (material real del caso).
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
2. En `escenas.js` cambia `CASO` (id, título, `colab`, duraciones, herramientas, fuentes, `medios`) y reescribe las
   escenas: formato completo para un caso principal y corto (3 escenas) para uno de «el costo del error».
   Escribe `medios.json`, guarda las imágenes en `medios/` y llama `g.archivo`/`g.video` donde la historia lo pide
   (normalmente en la primera escena, después de la portada).
   Colores solo con `var(--tq-…)`; si hace falta un tono nuevo, agrégalo en `tokens.css` y `tokens.json` (sin verde).
3. Sin apuesta en la página: no ofrezcas opciones de hipótesis ni preguntes lo mismo que la explicación calificada del
   cuaderno; la página siembra la duda y el cuaderno pide la apuesta.
4. Prueba de spoiler: quien solo vea la página no debe poder adivinar el giro. Si la pregunta detonadora o las
   herramientas lo delatan, usa una pregunta más suave y `herramientasOcultas: N`.
5. Cifras: solo con fuente consultada; que coincidan con el cuaderno y que ningún contador termine en un número
   que contradiga el dato (2.8 % se muestra como «menos de 3», nunca «3»).
6. Agrega el caso a `INTROS` en `site/alumno.js` para que su tarjeta muestre «Ver la intro (1 min)».
7. Pruebas (ver abajo) y `python -m harness all`. Publicar a nombre del docente requiere su permiso.

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
- Material real de 4.1 y 4.2: los candidatos están verificados en su `medios.json`; falta descargar los archivos (el
  entorno de Claude no llega a Wikimedia ni al Wien Museum) y marcarlos `listo`.
- `volver: '../../index.html'` lleva a la portada del sitio; cambiarlo si el área del alumno debe ser el destino.
- Duración del cuaderno (`~50 min`) es la estimación base; ajustar por caso.
