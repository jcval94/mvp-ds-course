# Paquete: MAE

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Error de regresión.
- **Objetivo:** Interpretar el error absoluto medio en pedidos.
- **Definición:** MAE promedia magnitudes absolutas de error.
- **Intuición:** El visual hace visible distancias absolutas observado-predicho antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** distancias absolutas observado-predicho.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, prediccion_pedidos.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. Don Juan cuenta cuántos pedidos se desvió.
2. Ejecutar **Comparar estados de mae**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa errores absolutos y cita una marca visible. ¿Qué conclusión guiada sobre mae conserva el alcance?
- **Transferencia:** Observa errores absolutos y cita una marca visible. ¿Qué exige transferir mae a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de MAE con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre MAE; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de MAE; detecta conclusiones que excedan el diseño.
