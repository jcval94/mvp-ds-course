# Paquete: Validation

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S02`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Partición de datos.
- **Objetivo:** Elegir alternativas usando solo validación.
- **Definición:** Validation compara decisiones sin tocar el test.
- **Intuición:** El visual hace visible comparación de umbrales fuera de train antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** comparación de umbrales fuera de train.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** split, probabilidad_alta.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. Don Juan compara compras posibles.
2. Ejecutar **Comparar estados de validation**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa alternativas comparadas en validación y cita una marca visible. ¿Qué conclusión guiada sobre validation conserva el alcance?
- **Transferencia:** Observa alternativas comparadas en validación y cita una marca visible. ¿Qué exige transferir validation a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Validation con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Validation; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Validation; detecta conclusiones que excedan el diseño.
