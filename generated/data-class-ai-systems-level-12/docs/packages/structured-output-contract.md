# Paquete: Output estructurado y schema

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S06`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Contexto y conocimiento.
- **Objetivo:** Aplicar output estructurado y schema y justificar una decisión con evidencia verificable.
- **Definición:** Un output estructurado convierte texto en campos verificables mediante schema.
- **Intuición:** El visual separa los estados de salida libre que pasa a contrato validable para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** salida libre que pasa a contrato validable.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** schema, validación, parsing, reparación.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Una respuesta libre parece útil, pero no entra al handoff de turno
2. Ejecutar **Recorrer y verificar output estructurado y schema**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa schema, salida, validación y reparación y cita una marca visible. ¿Qué decisión sobre output estructurado y schema está respaldada por las tres etapas?
- **Transferencia:** Observa schema, salida, validación y reparación y cita una marca visible. ¿Qué debe volver a comprobarse al transferir output estructurado y schema a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Output estructurado y schema con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Output estructurado y schema; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Output estructurado y schema; detecta conclusiones que excedan el diseño.
