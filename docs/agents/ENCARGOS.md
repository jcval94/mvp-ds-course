# Encargos para agentes · repo público

**Estado:** 4 nov 2026 (u06 fase 1). Lista viva de tareas que el autor delega a otra IA (Codex) o a Claude Code. Cada encargo lleva su id
del «Tablero Generación 1» para que el avance se anote allá. Los encargos que tocan el backend privado viven en
`docs/ENCARGOS.md` de `agentic-ds-backen`, no aquí.

## Antes de cualquier encargo

1. Lee `docs/agents/COLABORADOR.md` completo, `AGENTS.md` y el `AGENTS.md` de la carpeta que vayas a tocar.
2. Trabaja en una rama nueva y abre un PR hacia `main`. **Nunca fusiones**: fusionar publica el sitio.
3. Corre `python -m harness all` antes de abrir el PR y pega el resultado en la descripción.
4. Nada de respuestas de retos, rúbricas, detalles del backend, datos de alumnos ni credenciales en este repo.
5. Si falta una decisión del autor (textos visibles, precios, fechas, estilo, esquema), detente y pregúntala en el PR.

## Entornos y modelos

**ChatGPT web** (con acceso de lectura a los repos, tokens sin límite) sirve para lecturas largas, auditorías,
inventarios y borradores de documentos: no ejecuta código ni corre el harness. Si no puede abrir un PR, entrega cada
archivo completo con su ruta. Modelo de partida: GPT-6.1 Sol en High.


| Entorno | Úsalo cuando | Modelo y razonamiento de partida |
| --- | --- | --- |
| **Codex** (app o CLI, sobre este repo) | El encargo está especificado y solo toca archivos del repo | `gpt-6.1-sol` en Medium; `gpt-6.1-terra` o `gpt-6-luna` en Light para cambios mecánicos; `gpt-6-astra` en High solo si falla dos veces |
| **Claude Code en el equipo del autor** | Hace falta el navegador con sesiones del autor, Supabase CLI, Drive o descargar de sitios que la nube no alcanza | Sonnet 5.5 en medium; Opus 5.5 en high para diseño o revisión |
| **Claude en la nube** (app de Claude) | Investigación con fuentes, diseño de casos, revisión independiente, documentos | Opus 5.5 en high; Sonnet 5.5 en medium para redactar con todo decidido |

Escala de razonamiento: en Codex, Light (Low en la CLI), Medium, High, Extra High; en Claude Code, low, medium, high, xhigh.
Sube un nivel solo si el primer intento falla por razonamiento, no por falta de contexto.

## Encargos abiertos

### E-01 · Intro de 1.2 Literary Digest (tablero r04)

- **Entorno:** Claude Code (las skills `tads-caso-reparto-pagina-colab` y `tads-intro-cinematica-8bits` son de Claude).
- **Modelo:** Opus 5.5 high para el reparto y el guion; Sonnet 5.5 medium para construir escenas.
- **Contexto:** `docs/MODULO_1_DISENO.md` (fila 1.2), `docs/CRITERIO_PRIMERO.md`, `site/casos/README.md`, `site/casos/1-1/` como modelo.
- **Terminado:** `site/casos/1-2/` con `index.html`, `escenas.js` y `medios.json`; la intro no nombra herramientas ni pide la
  apuesta; material real con licencia (o `candidato` con su `pendiente`); harness en verde; captura a 390 y 1440 px en el PR.

### E-02 · Intros cortas de 1.4 Puerto Rico y 13.11 Gimli (tablero c07)

- **Entorno:** Claude Code. **Modelo:** Sonnet 5.5 medium; Opus 5.5 high para revisar la prueba de spoiler.
- **Contexto:** `docs/MODULO_1_DISENO.md` (formato corto: 3 escenas, unos 40 s) y `docs/GUIA_CASOS.md` (casos con víctimas sin morbo).
- **Terminado:** `site/casos/1-4/` y `site/casos/13-11/`; Puerto Rico no muestra víctimas; cifras con fuente; harness en verde.

### E-03 · Detector de enlaces: estado «revisar a mano» para Colab y Drive (tablero q04)

- **Entorno:** Codex. **Modelo:** `gpt-6.1-sol` Medium.
- **Contexto:** Colab responde 200 aunque el cuaderno de Drive no esté compartido, así que un cuaderno privado pasa como correcto.
- **Terminado:** el detector marca los enlaces de `colab.research.google.com/drive/` y `drive.google.com` como «revisar a mano» en
  lugar de «correcto», con prueba en `harness/tests`; harness en verde.

### E-04 · Nivel 2: licencia y SHA-256 de los datasets al final de la página (tablero q05)

- **Entorno:** Codex. **Modelo:** `gpt-6.1-terra` Light.
- **Contexto:** decisión del autor (25 oct): el alumno ve la procedencia al final, no en el contenido principal. `generated/` no se
  edita a mano: se inyecta en el build.
- **Terminado:** cada página del Nivel 2 muestra licencia y SHA-256 al pie; harness en verde; captura en el PR.

### E-05 · Tabla caso ↔ misión ↔ nivel ↔ versión del cuaderno ↔ intro (tablero r07)

- **Entorno:** Codex. **Modelo:** `gpt-6-luna` Light.
- **Contexto:** `docs/ESTRUCTURA_GENERACION_1.md`, `docs/CASE_MISSION_MAP.md`, `site/casos/*/escenas.js` (campo `colab`).
- **Terminado:** `docs/MAPA_CASOS_G1.md` con una fila por caso de la Generación 1 y qué falta en cada uno; sin enlaces privados.

### E-06 · Página de micro-casos (tablero s08, después de que el autor decida)

- **Entorno:** Claude Code. **Modelo:** Opus 5.5 high para el diseño; Sonnet 5.5 medium para construir.
- **Contexto:** `docs/MODULO_1_EJERCICIOS.md` (formato y reglas). El banco con respuestas vive en el backend.
- **Terminado:** se define en el encargo cuando el autor apruebe el formato.

### E-07 · Cerrar las dudas de los 5 candidatos latinoamericanos (tablero s07)

- **Entorno:** Claude en la nube (necesita búsqueda web con fuentes). **Modelo:** Opus 5.5 high.
- **Contexto:** `casos/staging/{argentina-inflacion-precios-en-linea,impuesto-refrescos-mexico,exceso-mortalidad-covid-mexico,alerta-sismica-mexico,transantiago}.json`,
  `casos/AGENTS.md`, `docs/GUIA_CASOS.md`.
- **Terminado:** cada incertidumbre se cierra con una fuente o pasa a mito; el caso se propone como `verified` en un PR.

### E-08 · Final de la intro: qué sigue después (tablero u04)

- **Entorno:** Codex. **Modelo:** `gpt-6.1-sol` Medium. **Alternativa:** Claude Code (skill `tads-intro-cinematica-8bits`).
- **Contexto:** a muchos alumnos no les gustó el salto de la intro a Colab: la intro termina y de golpe están en otra
  herramienta. `site/casos/motor.js` (escena final, `C.final`), `site/casos/*/escenas.js`, `site/casos/README.md`.
- **Qué hacer:** la escena final muestra, antes del botón, 2 o 3 títulos cortos con lo que va a pasar después (por
  ejemplo: dónde se abre el caso, qué hay que ejecutar primero y qué decisión van a tomar), definidos por caso en un campo
  nuevo de `C.final` y con un texto por omisión en el motor. Debe servir tanto si el caso sigue en Colab como si sigue en
  la página (u01). No adelanta la herramienta ni el giro (prueba de spoiler de `docs/CRITERIO_PRIMERO.md`).
- **Terminado:** 1.1, 4.1 y 4.2 con sus títulos; README actualizado; con movimiento reducido se ven sin animación; harness
  en verde; capturas a 390 y 1440 px. **Los textos visibles los aprueba el autor en el PR:** propónlos, no los fijes.

### E-09 · Mi avance más ligero, con la intro antes que Colab (tablero u05)

- **Fase 1 · ChatGPT web, GPT-6.1 Sol High.** Inventario de todo lo que ve el alumno en `site/alumno.html` (pestaña Mi
  avance) en el orden en que aparece, con cuánto ocupa en un celular de 390 px, y una propuesta de jerarquía: qué queda
  arriba, qué se pliega y qué se mueve a otra pestaña o al menú. Entrega `docs/revisiones/MI_AVANCE_CARGA.md`. El autor
  decide sobre esa propuesta.
- **Fase 2 · Codex, `gpt-6.1-sol` Medium.** Aplica lo aprobado en `site/alumno.html`, `site/alumno.js` y `site/area.css`.
  Siempre, aunque la fase 1 no esté aprobada: en cada tarjeta de caso y en «Continuar misión», el botón de la intro va
  **antes** que el de Colab; los casos que se rehacen en la página (lista `EN_PAGINA` en `alumno.js`, por ahora `"1.1"`)
  no muestran ningún botón de Colab, aunque la base traiga `cuaderno_url`.
- **Terminado:** `python scripts/qa_student_experience.py` y harness en verde; capturas antes y después a 390 y 1440 px.

### E-10 · Resolver un caso en la página: motor y 1.1 Wald (tablero u06, fase 3)

- **Hecho el 4 nov** (PR de `e10-caso-1-1-en-pagina`). Para los casos siguientes, copia el patrón: `site/casos/caso.js` no se toca;
  cada caso agrega `caso.html` y `caso-escenas.js` y su fila en `harness/tests/test_caso_pagina.py`.

- **Depende de:** B-07 del backend (casos en la página, `mis_retos`). Diseño cerrado: `docs/CASO_EN_PAGINA.md`.
- **Entorno:** Claude Code en el equipo del autor (Sonnet 5.5 medium; Opus 5.5 high si el motor se traba) o Codex
  (`gpt-6.1-sol` Medium). Usa la skill `tads-intro-cinematica-8bits` para el estilo y las reglas de accesibilidad.
- **Qué hacer:** `site/casos/caso.js` y `caso.css` con los componentes de la sección 7; `site/casos/1-1/caso.html` y
  `caso-escenas.js` con el recorrido de la sección 6; los cambios de la sección 8 (ficha de la intro con `C.resolver`,
  `EN_PAGINA` en `alumno.js`, `tiempos.json`); el laboratorio con `missions/m01-wald/app/sim.js`.
- **Terminado:** recorrido completo con una cuenta de prueba (alumno, sin perfil y sin sesión); reanudar tras cerrar la
  pestaña; la revelación no se abre sin firma; ninguna línea de la intro repetida (revisión nueva en el harness); harness y
  `qa_student_experience.py` en verde; capturas a 390 y 1440 px y con movimiento reducido. Ninguna clave ni rúbrica en el
  repo. Los textos visibles van como propuesta en el PR.

### E-11 · Inventario de lo que supone Colab en los Módulos 1 y 2 (tablero u07)

- **Entorno:** ChatGPT web. **Modelo:** GPT-6.1 Sol High. **Depende de:** u01.
- **Contexto:** si los Módulos 1 y 2 se resuelven en la página, varios documentos y páginas quedan mal: por ejemplo
  `docs/ESTRUCTURA_GENERACION_1.md` («se califica lo que pasa en Colab»), `docs/MODULO_1_DISENO.md` (agenda de las
  clases 1 y 2), `docs/OPERACION_G1.md`, `docs/PILOTO_G1.md`, `site/instalacion.html`, `site/colab.html`, `site/alumno.js`.
- **Terminado:** `docs/revisiones/COLAB_M1_M2.md` con una fila por mención (archivo, línea, qué dice, qué cambiaría y si
  es texto visible que decide el autor). Solo inventario: no cambies los documentos.

### E-12 · El tutorial de Colab con ojos de principiante (tablero u08)

- **Entorno:** ChatGPT web. **Modelo:** GPT-6.1 Sol High. **Alternativa:** Claude en la nube, Opus 5.5 high.
- **Contexto:** `site/colab.html`, la sección «Acceso a Colab» de `site/alumno.html` y `site/instalacion.html`. Alumnos que
  nunca han programado ni usado Colab.
- **Terminado:** `docs/revisiones/TUTORIAL_COLAB.md` con cada paso donde alguien se puede atorar (término sin explicar,
  botón que no se ve igual, paso implícito), qué pasa si Colab se desconecta, y una redacción propuesta. Los textos los
  decide el autor: no edites las páginas.

### E-13 · Harness: el enlace del cuaderno coincide en todos lados (tablero u09)

- **Entorno:** Codex. **Modelo:** `gpt-6.1-terra` Light.
- **Contexto:** `site/casos/README.md` pide cambiar el enlace del cuaderno en tres lugares a mano: `colab` de
  `escenas.js`, el `noscript` de `index.html` del caso y `CUADERNOS` de `site/alumno.js`.
- **Terminado:** una revisión en `harness/` que falla si los tres no coinciden para cada caso (y que acepta casos sin
  cuaderno, como los de la página), con prueba en `harness/tests`; harness en verde.
