# Paquete: Hooks, checkpoints y resumibilidad

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S19`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Harness y entorno.
- **Objetivo:** Aplicar hooks, checkpoints y resumibilidad y justificar una decisión con evidencia verificable.
- **Definición:** Hooks ejecutan controles antes o después de acciones; checkpoints permiten recuperar estado.
- **Intuición:** El visual separa los estados de controles alrededor de acciones y puntos de reanudación para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** controles alrededor de acciones y puntos de reanudación.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** pre_hook, post_hook, checkpoint, recuperación.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Una acción riesgosa necesita revisión previa y punto de regreso
2. Ejecutar **Recorrer y verificar hooks, checkpoints y resumibilidad**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa pre-hook, tool, post-hook, checkpoint y recuperación y cita una marca visible. ¿Qué decisión sobre hooks, checkpoints y resumibilidad está respaldada por las tres etapas?
- **Transferencia:** Observa pre-hook, tool, post-hook, checkpoint y recuperación y cita una marca visible. ¿Qué debe volver a comprobarse al transferir hooks, checkpoints y resumibilidad a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Hooks, checkpoints y resumibilidad con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Hooks, checkpoints y resumibilidad; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Hooks, checkpoints y resumibilidad; detecta conclusiones que excedan el diseño.
