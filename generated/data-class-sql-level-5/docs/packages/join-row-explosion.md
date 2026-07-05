# Paquete: Explosión de filas en un JOIN

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S07`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Relaciones y JOINs.
- **Objetivo:** Aplicar explosión de filas en un join y justificar una decisión con evidencia verificable.
- **Definición:** Una explosión de filas ocurre cuando coincidencias múltiples forman combinaciones que cambian la unidad de análisis.
- **Intuición:** El visual separa los estados de combinaciones many-to-many y reconciliación de filas, unidades y sumas para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido explosión de filas en un join sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** combinaciones many-to-many y reconciliación de filas, unidades y sumas.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** fecha, ventas_mxn, turno_id, evento_id.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. El 14 de noviembre tiene dos turnos y dos etiquetas; el JOIN produce cuatro copias del cierre
2. Ejecutar **Recorrer y verificar explosión de filas en un join**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa pares del JOIN, filas resultantes, noches únicas y suma reconciliada y cita una marca visible. ¿Qué decisión sobre explosión de filas en un join está respaldada por las tres etapas?
- **Transferencia:** Observa pares del JOIN, filas resultantes, noches únicas y suma reconciliada y cita una marca visible. ¿Qué debe volver a comprobarse al transferir explosión de filas en un join a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Explosión de filas en un JOIN con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Explosión de filas en un JOIN; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Explosión de filas en un JOIN; detecta conclusiones que excedan el diseño.
