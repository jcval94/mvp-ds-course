# Paquete: Delegación y handoffs

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S22`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Interoperabilidad y delegación.
- **Objetivo:** Aplicar delegación y handoffs y justificar una decisión con evidencia verificable.
- **Definición:** Delegar exige objetivo, contexto mínimo, autoridad, retorno y criterio de aceptación.
- **Intuición:** El visual separa los estados de traspaso controlado sin perder contexto ni responsabilidad para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** traspaso controlado sin perder contexto ni responsabilidad.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** supervisor, especialista, contexto, responsabilidad.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Un especialista puede ayudar, pero llega con poco contexto y responsabilidad difusa
2. Ejecutar **Recorrer y verificar delegación y handoffs**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa supervisor, especialista, contexto transferido y responsabilidad y cita una marca visible. ¿Qué decisión sobre delegación y handoffs está respaldada por las tres etapas?
- **Transferencia:** Observa supervisor, especialista, contexto transferido y responsabilidad y cita una marca visible. ¿Qué debe volver a comprobarse al transferir delegación y handoffs a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Delegación y handoffs con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Delegación y handoffs; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Delegación y handoffs; detecta conclusiones que excedan el diseño.
