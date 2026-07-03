# Paquete: Test

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S03`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Partición de datos.
- **Objetivo:** Usar test una sola vez tras congelar decisiones.
- **Definición:** Test estima desempeño final sobre datos no usados para ajustar ni elegir.
- **Intuición:** El visual hace visible apertura única de evidencia futura antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** apertura única de evidencia futura.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** split, fecha.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. El sobre con 32 noches queda cerrado.
2. Ejecutar **Comparar estados de test**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa sello y apertura única del test y cita una marca visible. ¿Qué conclusión guiada sobre test conserva el alcance?
- **Transferencia:** Observa sello y apertura única del test y cita una marca visible. ¿Qué exige transferir test a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Test con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Test; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Test; detecta conclusiones que excedan el diseño.
