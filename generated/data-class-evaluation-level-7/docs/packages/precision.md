# Paquete: Precision

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_7.md`; escena `L7-S13`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 7, Métricas de clasificación.
- **Objetivo:** Medir qué fracción de alertas acertó.
- **Definición:** Precision divide TP entre TP más FP.
- **Intuición:** El visual hace visible denominador formado por todas las alertas antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** denominador formado por todas las alertas.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** tp, fp.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. Don Juan pregunta cuántos avisos sirvieron.
2. Ejecutar **Comparar estados de precision**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa TP entre alertas y cita una marca visible. ¿Qué conclusión guiada sobre precision conserva el alcance?
- **Transferencia:** Observa TP entre alertas y cita una marca visible. ¿Qué exige transferir precision a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Precision con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Precision; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Precision; detecta conclusiones que excedan el diseño.
