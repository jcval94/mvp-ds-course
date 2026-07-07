# Paquete: Criterios de parada y budgets

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S16`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Loops, estado y parada.
- **Objetivo:** Aplicar criterios de parada y budgets y justificar una decisión con evidencia verificable.
- **Definición:** Stop criteria y budgets hacen controlable un sistema que puede continuar.
- **Intuición:** El visual separa los estados de límites que hacen controlable la autonomía para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** límites que hacen controlable la autonomía.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** max_turns, max_cost, max_time, max_tools, max_retries.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. El loop puede seguir pidiendo evidencia sin costo visible ni final claro
2. Ejecutar **Recorrer y verificar criterios de parada y budgets**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa máximo de turnos, costo, tiempo, tools y retries y cita una marca visible. ¿Qué decisión sobre criterios de parada y budgets está respaldada por las tres etapas?
- **Transferencia:** Observa máximo de turnos, costo, tiempo, tools y retries y cita una marca visible. ¿Qué debe volver a comprobarse al transferir criterios de parada y budgets a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Criterios de parada y budgets con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Criterios de parada y budgets; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Criterios de parada y budgets; detecta conclusiones que excedan el diseño.
