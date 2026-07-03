# Paquete: Regularización

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S24`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Generalización.
- **Objetivo:** Elegir penalización usando validation.
- **Definición:** Regularización limita complejidad mediante una penalización ajustada fuera de train.
- **Intuición:** El visual hace visible trayectoria de complejidad y error validado antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** trayectoria de complejidad y error validado.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** penalizacion, error_validation.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. Aprieta la regla, pero no hasta dejarla inútil.
2. Ejecutar **Comparar estados de regularización**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa complejidad y error validado y cita una marca visible. ¿Qué conclusión guiada sobre regularización conserva el alcance?
- **Transferencia:** Observa complejidad y error validado y cita una marca visible. ¿Qué exige transferir regularización a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Regularización con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Regularización; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Regularización; detecta conclusiones que excedan el diseño.
