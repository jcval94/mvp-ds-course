# Paquete: Ejecución, error y retry de tool

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Tools, skills y disclosure.
- **Objetivo:** Aplicar ejecución, error y retry de tool y justificar una decisión con evidencia verificable.
- **Definición:** Ejecutar una tool produce resultado o error; retry requiere causa, límite y registro.
- **Intuición:** El visual separa los estados de acción ejecutada con resultado verificable y manejo de fallo para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** acción ejecutada con resultado verificable y manejo de fallo.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** argumentos, ejecución, resultado, error, retry.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. La consulta falla una vez y el sistema insiste sin cambiar nada
2. Ejecutar **Recorrer y verificar ejecución, error y retry de tool**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa argumentos, ejecución, resultado, error y retry y cita una marca visible. ¿Qué decisión sobre ejecución, error y retry de tool está respaldada por las tres etapas?
- **Transferencia:** Observa argumentos, ejecución, resultado, error y retry y cita una marca visible. ¿Qué debe volver a comprobarse al transferir ejecución, error y retry de tool a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Ejecución, error y retry de tool con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Ejecución, error y retry de tool; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Ejecución, error y retry de tool; detecta conclusiones que excedan el diseño.
