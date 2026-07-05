# Paquete: Unidad y granularidad

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S01`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Arquitectura invisible de los datos.
- **Objetivo:** Aplicar unidad y granularidad y justificar una decisión con evidencia verificable.
- **Definición:** La unidad de análisis es aquello que representa una fila; la granularidad añade las dimensiones que hacen única esa fila.
- **Intuición:** El visual separa los estados de filas que cambian de noche a noche-persona para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido unidad y granularidad sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** filas que cambian de noche a noche-persona.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** tabla, entidad, fecha, unidad.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Comparar cierres por noche, turnos por persona y eventos por etiqueta
2. Ejecutar **Recorrer y verificar unidad y granularidad**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa filas y unidad antes y después del cambio de granularidad y cita una marca visible. ¿Qué decisión sobre unidad y granularidad está respaldada por las tres etapas?
- **Transferencia:** Observa filas y unidad antes y después del cambio de granularidad y cita una marca visible. ¿Qué debe volver a comprobarse al transferir unidad y granularidad a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Unidad y granularidad con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Unidad y granularidad; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Unidad y granularidad; detecta conclusiones que excedan el diseño.
