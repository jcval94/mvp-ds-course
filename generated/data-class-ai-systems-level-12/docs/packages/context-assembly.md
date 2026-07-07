# Paquete: Context assembly y compaction

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Contexto y conocimiento.
- **Objetivo:** Aplicar context assembly y compaction y justificar una decisión con evidencia verificable.
- **Definición:** Context assembly selecciona evidencia útil, reduce ruido y conserva lo necesario para responder.
- **Intuición:** El visual separa los estados de ensamblaje de contexto relevante y reducción de ruido para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** ensamblaje de contexto relevante y reducción de ruido.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** contexto disponible, selección, ensamblaje, memoria.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Paco debe preparar contexto de turno con pedido, regla, incidente y resumen previo
2. Ejecutar **Recorrer y verificar context assembly y compaction**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa contexto disponible, selección, ensamblaje y recuperación y cita una marca visible. ¿Qué decisión sobre context assembly y compaction está respaldada por las tres etapas?
- **Transferencia:** Observa contexto disponible, selección, ensamblaje y recuperación y cita una marca visible. ¿Qué debe volver a comprobarse al transferir context assembly y compaction a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Context assembly y compaction con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Context assembly y compaction; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Context assembly y compaction; detecta conclusiones que excedan el diseño.
