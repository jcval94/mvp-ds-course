# Paquete: Semántica de JOIN y anti-join

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Relaciones y JOINs.
- **Objetivo:** Aplicar semántica de join y anti-join y justificar una decisión con evidencia verificable.
- **Definición:** El tipo de JOIN decide qué unidades sobreviven y cómo se representan ausencias.
- **Intuición:** El visual separa los estados de unidades que sobreviven a cada tipo de JOIN para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido semántica de join y anti-join sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** unidades que sobreviven a cada tipo de JOIN.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** llave, matched, left_only, right_only.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Comparar `INNER`, `LEFT` y anti-join sobre cierres y turnos
2. Ejecutar **Recorrer y verificar semántica de join y anti-join**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa matched, left-only y right-only y cita una marca visible. ¿Qué decisión sobre semántica de join y anti-join está respaldada por las tres etapas?
- **Transferencia:** Observa matched, left-only y right-only y cita una marca visible. ¿Qué debe volver a comprobarse al transferir semántica de join y anti-join a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Semántica de JOIN y anti-join con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Semántica de JOIN y anti-join; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Semántica de JOIN y anti-join; detecta conclusiones que excedan el diseño.
