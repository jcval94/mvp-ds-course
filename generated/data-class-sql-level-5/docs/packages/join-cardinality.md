# Paquete: Cardinalidad de JOIN

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S06`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Relaciones y JOINs.
- **Objetivo:** Aplicar cardinalidad de join y justificar una decisión con evidencia verificable.
- **Definición:** La cardinalidad describe cuántas filas de cada tabla pueden coincidir por llave.
- **Intuición:** El visual separa los estados de enlaces uno-a-uno, uno-a-muchos y muchos-a-muchos para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido cardinalidad de join sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** enlaces uno-a-uno, uno-a-muchos y muchos-a-muchos.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** llave, lado_izquierdo, lado_derecho, pares.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Anticipar uno-a-uno, uno-a-muchos y muchos-a-muchos
2. Ejecutar **Recorrer y verificar cardinalidad de join**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa nodos, enlaces y pares esperados y cita una marca visible. ¿Qué decisión sobre cardinalidad de join está respaldada por las tres etapas?
- **Transferencia:** Observa nodos, enlaces y pares esperados y cita una marca visible. ¿Qué debe volver a comprobarse al transferir cardinalidad de join a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Cardinalidad de JOIN con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Cardinalidad de JOIN; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Cardinalidad de JOIN; detecta conclusiones que excedan el diseño.
