# Paquete: DuckDB y Polars

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S16`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Fuentes y formatos modernos.
- **Objetivo:** Aplicar duckdb y polars y justificar una decisión con evidencia verificable.
- **Definición:** DuckDB consulta datos locales con SQL; Polars expresa transformaciones columnarmente.
- **Intuición:** El visual separa los estados de la misma transformación mediante SQL local o expresión columnar para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido duckdb y polars sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** la misma transformación mediante SQL local o expresión columnar.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** operacion, interfaz, entrada, salida.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Elegir consulta SQL local o transformación tabular según operación
2. Ejecutar **Recorrer y verificar duckdb y polars**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa flujos SQL y columnar comparados y cita una marca visible. ¿Qué decisión sobre duckdb y polars está respaldada por las tres etapas?
- **Transferencia:** Observa flujos SQL y columnar comparados y cita una marca visible. ¿Qué debe volver a comprobarse al transferir duckdb y polars a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de DuckDB y Polars con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre DuckDB y Polars; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de DuckDB y Polars; detecta conclusiones que excedan el diseño.
