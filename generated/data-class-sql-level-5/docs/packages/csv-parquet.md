# Paquete: CSV frente a Parquet

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S14`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Fuentes y formatos modernos.
- **Objetivo:** Aplicar csv frente a parquet y justificar una decisión con evidencia verificable.
- **Definición:** CSV es texto tabular interoperable; Parquet almacena columnas tipadas para lectura selectiva.
- **Intuición:** El visual separa los estados de lectura completa por filas frente a selección columnar para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido csv frente a parquet sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** lectura completa por filas frente a selección columnar.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** formato, filas, columnas, bytes.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Comparar lectura completa por filas con lectura selectiva columnar
2. Ejecutar **Recorrer y verificar csv frente a parquet**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa celdas leídas por fila o columna y cita una marca visible. ¿Qué decisión sobre csv frente a parquet está respaldada por las tres etapas?
- **Transferencia:** Observa celdas leídas por fila o columna y cita una marca visible. ¿Qué debe volver a comprobarse al transferir csv frente a parquet a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de CSV frente a Parquet con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre CSV frente a Parquet; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de CSV frente a Parquet; detecta conclusiones que excedan el diseño.
