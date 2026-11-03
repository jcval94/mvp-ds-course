# Encargos para agentes · repo público

**Estado:** 2 nov 2026. Lista viva de tareas que el autor delega a otra IA (Codex) o a Claude Code. Cada encargo lleva su id
del «Tablero Generación 1» para que el avance se anote allá. Los encargos que tocan el backend privado viven en
`docs/ENCARGOS.md` de `agentic-ds-backen`, no aquí.

## Antes de cualquier encargo

1. Lee `docs/agents/COLABORADOR.md` completo, `AGENTS.md` y el `AGENTS.md` de la carpeta que vayas a tocar.
2. Trabaja en una rama nueva y abre un PR hacia `main`. **Nunca fusiones**: fusionar publica el sitio.
3. Corre `python -m harness all` antes de abrir el PR y pega el resultado en la descripción.
4. Nada de respuestas de retos, rúbricas, detalles del backend, datos de alumnos ni credenciales en este repo.
5. Si falta una decisión del autor (textos visibles, precios, fechas, estilo, esquema), detente y pregúntala en el PR.

## Entornos y modelos

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
