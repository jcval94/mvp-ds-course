# Paquete: TN

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Matriz de confusión.
- **Objetivo:** Traducir un acierto de no alerta.
- **Definición:** TN es una noche normal correctamente no alertada.
- **Intuición:** El visual hace visible celda real normal y predicción normal antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** celda real normal y predicción normal.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** alta_demanda, probabilidad_alta.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. No hizo falta preparar de más.
2. Ejecutar **Comparar estados de tn**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa celda TN resaltada y cita una marca visible. ¿Qué conclusión guiada sobre tn conserva el alcance?
- **Transferencia:** Observa celda TN resaltada y cita una marca visible. ¿Qué exige transferir tn a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de TN con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre TN; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de TN; detecta conclusiones que excedan el diseño.
