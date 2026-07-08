# Reporte histórico de migración curricular previa

> Nota de continuidad: este reporte queda como antecedente histórico. La ruta
> vigente publicada tiene 13 niveles después de insertar Nivel 12 · Ingeniería
> de Sistemas de IA y preservar la operación como Nivel 13.

> **Registro histórico:** este archivo conserva el estado al cerrar la migración
> estructural. El estado vigente de producción está en `docs/CURRICULUM_MAP.md`
> y `docs/VALIDATION_REPORT.md`. Este documento conserva las cifras del momento
> estructural como registro histórico; Niveles 5 y 11 fueron completados y
> publicados posteriormente, por lo que el estado vigente está en el mapa y el reporte.

## Decisión canónica

La ruta oficial conserva esta progresión:

```text
leer datos → describirlos → razonar con incertidumbre → estudiar relaciones
→ construir datasets confiables → modelar → evaluar
→ explorar estructura no supervisada → respetar tiempo y experimentación
→ analizar responsablemente → convertir análisis y modelos en productos
→ operar y monitorear esos productos
```

## Tabla antes → después

| Origen | Destino | Estado de contenido |
| --- | --- | --- |
| actual 1 | nuevo 1 | completo y publicado |
| actual 2 | nuevo 2 | completo y publicado |
| actual 3 | nuevo 3 | completo y publicado |
| actual 4 | nuevo 4 | completo y publicado |
| nuevo | nuevo 5 · Sistemas de Datos Modernos y SQL | temario canónico; historia borrador; nivel diseño |
| actual 5 | nuevo 6 · Modelado supervisado | completo y publicado |
| actual 6 | nuevo 7 · Evaluación de modelos | completo y publicado |
| actual 7 | nuevo 8 · Aprendizaje no supervisado | completo y publicado |
| actual 8 | nuevo 9 · Datos temporales y experimentación | completo y publicado |
| actual 9 | nuevo 10 · Análisis responsable y reproducible | completo y publicado |
| nuevo | nuevo 11 · Ingeniería de Productos de Datos | temario canónico; historia borrador; nivel diseño |
| actual 10 | nuevo 12 · Operación y monitoreo responsable | completo y publicado |

## Inventario previo

La lectura automatizada completa identificó 330 archivos con un identificador de
nivel en contenido o nombre: 35 documentos, 25 artefactos narrativos de datos,
14 scripts, 215 archivos dentro de paquetes generados, 31 capturas binarias y
10 archivos adicionales entre raíz, evals, site y skills. El corpus sumó
9,920,807 bytes antes de editar.

### Fuente canónica

- `README.md`, `docs/PRD.md`, `docs/CURRICULUM_MAP.md`.
- `docs/COURSE_STORY_BIBLE.md`, `docs/CONTINUITY_LEDGER.md`.
- `docs/LEVEL_<N>_NARRATIVE_ARC.md` y `docs/stories/LEVEL_<N>.md`.
- `docs/AGENT_OPERATING_SPEC.md`, `docs/SKILL_MAP.md`,
  `docs/SKILL_CONTRACTS.md`, `docs/HARNESS_SPEC.md` y
  `docs/CODEX_CLAUDE_PROMPTS.md`.
- `docs/pipeline/README.md` y los checklists/regresiones de `evals/`.

### Archivos derivados

- `scripts/generate_level<N>.py`, `scripts/narrative_level_factory.py`,
  `scripts/validate_content.py`, `scripts/build_pages.py` y `scripts/qa_pages.py`.
- `datasets/narrative/*nivel_<N>*` y sus metadatos.
- `generated/data-class-*-level-<N>/`.
- `site/methodology.html`.

### Artefactos históricos

- Las capturas `output/playwright/level-<N>-*.png` conservan sus píxeles; solo
  cambió el nombre para mantener la trazabilidad al nivel migrado.
- Los snapshots públicos de `datasets/snapshots/` no cambiaron: su contenido y
  sus hashes no dependen de la numeración curricular.
- Los demos de `reference/` y los ejemplos sin identificadores de nivel se
  conservaron sin cambios.

### Archivos publicados

Los diez paquetes publicados quedaron en los niveles 1–4, 6–10 y 12. Sus
manifests, payloads, historias, rutas, datasets narrativos y validaciones se
renumeraron; no se crearon paquetes para 5 ni 11.

## Estrategia de seguridad

1. Se inventariaron nombres, contenido y enlaces antes de editar.
2. Historias, arcos, generadores, paquetes, datasets y capturas se movieron en
   dos pasos (`origen → temporal → destino`) para evitar colisiones.
3. Los identificadores `LEVEL_N`, `Nivel N`, `level-N`, `nivel_N` y `LN-*` se
   migraron de mayor a menor para evitar cascadas.
4. Los paquetes existentes se regeneraron desde sus generadores determinísticos;
   metadata y SHA-256 se recalcularon desde los archivos migrados.
5. En la migración original, los Niveles 5 y 11 quedaron reservados; en el estado
   vigente posterior ya fueron materializados y publicados.

## Handoffs estructurales

- `dataset_confiable@L5.H1` fue la salida reservada para Nivel 5 y ahora está
  materializada en la ruta publicada.
- `producto_operable@L11.H1` fue la salida reservada para Nivel 11 y ahora está
  materializada antes de Nivel 12.
- `sistema_ia_trazable@L12.H1` es la salida vigente de Nivel 12; Nivel 13 recibe
  ese sistema como diseño trazable y practica operación, monitoreo e incidentes.

## Cobertura histórica de esta migración

- **Estado al momento de la migración:** 12 niveles estructurales, con 5 y 11
  reservados.
- **Uso actual de este documento:** registro histórico de cómo se movieron
  identificadores, no fuente vigente de cobertura.

## Cobertura vigente posterior

- **Niveles publicados:** 13 (1–13).
- **Niveles pendientes de producción:** ninguno.
- **Totales publicados:** 236 conceptos, 454 ejercicios, 708 prompts y 63 bloques.
- **Secuencia final:** Nivel 11 produce `producto_operable@L11.H1`; Nivel 12
  produce `sistema_ia_trazable@L12.H1`; Nivel 13 valida readiness, monitoreo,
  incidentes, handoff y retiro.

## Referencias no modificadas automáticamente

- Durante la migración original no se asignaron fechas, escenas, diálogos,
  invitados, secretos, datasets ni renderers definitivos a los Niveles 5 y 11;
  esos vacíos ya fueron resueltos en los documentos vigentes.
- No se desplazaron las fechas históricas de los niveles existentes. La futura
  autoría debe decidir cómo encajar las dos historias sin cambiar la cronología
  en silencio.
- No se modificaron píxeles dentro de capturas históricas ni contenido de demos
  de referencia; sus nombres o referencias se migraron cuando correspondía.
- No se inventaron conceptos, ejercicios, prompts, bloques ni cifras para las
  reservas durante la migración; las cifras actuales provienen de manifests,
  inventario y generadores publicados.

## Validación

Los resultados de comandos, tests, enlaces, IDs y búsquedas de obsolescencia se
registran en `docs/VALIDATION_REPORT.md` al cerrar la migración.

## Próxima vertical slice recomendada

- **Usuario:** docente o creador de cursos de ciencia de datos.
- **Entrada:** `producto_operable@L11.H1`, `sistema_ia_trazable@L12.H1`, ledger
  vigente y Story Bible actualizada.
- **Flujo principal:** revisar trazas de Nivel 12 → comprobar readiness de Nivel 13
  → ejecutar incidente simulado → validar rollback, postmortem y retiro.
- **Salida:** una lección profunda de operación responsable que demuestre cuándo
  un sistema trazable puede continuar, revertirse o retirarse.
- **Prueba manual:** ante una alerta persistente, decidir si observar, escalar,
  hacer rollback o retirar citando evidencia y runbook.
- **Definition of Done:** evidencia visible, criterios de parada, responsable
  humano, feedback específico, promedio ≥4 y ninguna dimensión en 1.
- **No objetivos:** crear chatbot, backend, API real, MCP real, LMS, cuentas,
  automatizaciones productivas o una nueva expansión del negocio.
