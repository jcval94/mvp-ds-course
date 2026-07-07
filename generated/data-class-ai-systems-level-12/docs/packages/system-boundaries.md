# Paquete: App, workflow, agente y sistema

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S03`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Del modelo al sistema.
- **Objetivo:** Aplicar app, workflow, agente y sistema y justificar una decisión con evidencia verificable.
- **Definición:** App, workflow, agente y sistema tienen responsabilidades distintas aunque compartan el mismo modelo.
- **Intuición:** El visual separa los estados de componentes con responsabilidades distintas para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** componentes con responsabilidades distintas.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** modelo, aplicación, workflow, agente, sistema.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. El diagrama mezcla pantalla, pasos fijos, decisiones y entorno en una sola caja
2. Ejecutar **Recorrer y verificar app, workflow, agente y sistema**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa modelo, aplicación, workflow, agente y sistema y cita una marca visible. ¿Qué decisión sobre app, workflow, agente y sistema está respaldada por las tres etapas?
- **Transferencia:** Observa modelo, aplicación, workflow, agente y sistema y cita una marca visible. ¿Qué debe volver a comprobarse al transferir app, workflow, agente y sistema a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de App, workflow, agente y sistema con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre App, workflow, agente y sistema; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de App, workflow, agente y sistema; detecta conclusiones que excedan el diseño.
