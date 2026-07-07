# Paquete: Familia de loops

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S14`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Loops, estado y parada.
- **Objetivo:** Aplicar familia de loops y justificar una decisión con evidencia verificable.
- **Definición:** Las familias de loops resuelven problemas distintos y tienen salidas distintas.
- **Intuición:** El visual separa los estados de familias de loop agrupadas por problema y criterio de parada para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** familias de loop agrupadas por problema y criterio de parada.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** execution, tool-use, retrieval, verification, approval, recovery.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Retrieval, verificación, recuperación y aprobación se mezclan en una sola ruta
2. Ejecutar **Recorrer y verificar familia de loops**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa execution, tool-use, retrieval, verification, approval y recovery y cita una marca visible. ¿Qué decisión sobre familia de loops está respaldada por las tres etapas?
- **Transferencia:** Observa execution, tool-use, retrieval, verification, approval y recovery y cita una marca visible. ¿Qué debe volver a comprobarse al transferir familia de loops a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Familia de loops con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Familia de loops; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Familia de loops; detecta conclusiones que excedan el diseño.
