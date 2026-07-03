# Paquete: Cross-validation

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S04`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Partición de datos.
- **Objetivo:** Rotar folds dentro del desarrollo.
- **Definición:** Cross-validation rota subconjuntos de ajuste y validación para medir estabilidad.
- **Intuición:** El visual hace visible rotación de cuatro folds sin test antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** rotación de cuatro folds sin test.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** fold_desarrollo, split.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. Paco rota cuatro montones de desarrollo.
2. Ejecutar **Comparar estados de cross-validation**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa folds rotados sin tocar test y cita una marca visible. ¿Qué conclusión guiada sobre cross-validation conserva el alcance?
- **Transferencia:** Observa folds rotados sin tocar test y cita una marca visible. ¿Qué exige transferir cross-validation a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Cross-validation con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Cross-validation; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Cross-validation; detecta conclusiones que excedan el diseño.
