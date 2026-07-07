# Paquete: Harness engineering

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S17`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Harness y entorno.
- **Objetivo:** Aplicar harness engineering y justificar una decisión con evidencia verificable.
- **Definición:** Harness engineering diseña el sistema alrededor del modelo: instrucciones, contexto, capacidades y verificación.
- **Intuición:** El visual separa los estados de sistema alrededor del modelo que controla trabajo repetible para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** sistema alrededor del modelo que controla trabajo repetible.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** instrucciones, contexto, tools, skills, loops, verificación.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. El equipo lista prompt, tools y logs, pero no ve quién gobierna la ejecución
2. Ejecutar **Recorrer y verificar harness engineering**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa instrucciones, contexto, tools, skills, loops y verificación y cita una marca visible. ¿Qué decisión sobre harness engineering está respaldada por las tres etapas?
- **Transferencia:** Observa instrucciones, contexto, tools, skills, loops y verificación y cita una marca visible. ¿Qué debe volver a comprobarse al transferir harness engineering a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Harness engineering con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Harness engineering; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Harness engineering; detecta conclusiones que excedan el diseño.
