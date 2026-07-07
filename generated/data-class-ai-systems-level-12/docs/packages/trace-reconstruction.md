# Paquete: Reconstrucción de trayectoria

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S20`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Harness y entorno.
- **Objetivo:** Aplicar reconstrucción de trayectoria y justificar una decisión con evidencia verificable.
- **Definición:** Una traza reconstruible enlaza observaciones, acciones, resultados, checks y decisiones.
- **Intuición:** El visual separa los estados de traza que permite explicar qué hizo el sistema para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** traza que permite explicar qué hizo el sistema.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** evento, tool_call, output, check, decisión.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Don Juan pide explicar por qué el sistema recomendó detener un turno
2. Ejecutar **Recorrer y verificar reconstrucción de trayectoria**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa eventos, tool calls, outputs, checks y decisiones y cita una marca visible. ¿Qué decisión sobre reconstrucción de trayectoria está respaldada por las tres etapas?
- **Transferencia:** Observa eventos, tool calls, outputs, checks y decisiones y cita una marca visible. ¿Qué debe volver a comprobarse al transferir reconstrucción de trayectoria a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Reconstrucción de trayectoria con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Reconstrucción de trayectoria; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Reconstrucción de trayectoria; detecta conclusiones que excedan el diseño.
