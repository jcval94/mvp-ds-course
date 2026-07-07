# Paquete: Límites multiagente

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S23`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Interoperabilidad y delegación.
- **Objetivo:** Aplicar límites multiagente y justificar una decisión con evidencia verificable.
- **Definición:** Multiagente introduce coordinación, pérdida de contexto y costos además de especialización.
- **Intuición:** El visual separa los estados de varios agentes como tradeoff, no mejora automática para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** varios agentes como tradeoff, no mejora automática.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** costo, duplicación, pérdida_contexto, control.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Tres agentes revisan lo mismo, duplican costo y contradicen el estado
2. Ejecutar **Recorrer y verificar límites multiagente**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa costo, duplicación, pérdida de contexto y control y cita una marca visible. ¿Qué decisión sobre límites multiagente está respaldada por las tres etapas?
- **Transferencia:** Observa costo, duplicación, pérdida de contexto y control y cita una marca visible. ¿Qué debe volver a comprobarse al transferir límites multiagente a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Límites multiagente con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Límites multiagente; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Límites multiagente; detecta conclusiones que excedan el diseño.
