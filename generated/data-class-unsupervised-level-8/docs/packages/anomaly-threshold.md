# Paquete: Umbral de anomalía

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_8.md`; escena `L8-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 8, Detección de anomalías.
- **Objetivo:** Crear una cola acotada para revisión humana.
- **Definición:** Un umbral de anomalía convierte scores en una lista priorizada, no en un veredicto.
- **Intuición:** El visual hace visible corte sobre scores y capacidad de revisión antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** corte sobre scores y capacidad de revisión.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche operativa, nunca una persona.
- **Variables:** score_anomalia, umbral_revision.
- **Límite:** Clusters y anomalías son hipótesis para revisión humana; no prueban tipos naturales, fraude ni causalidad.

## LearningModule

1. El turno solo puede revisar cuatro casos esta semana.
2. Ejecutar **Comparar estados de umbral de anomalía**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa score, umbral y cola de revisión y cita una marca visible. ¿Qué conclusión guiada sobre umbral de anomalía conserva el alcance?
- **Transferencia:** Observa score, umbral y cola de revisión y cita una marca visible. ¿Qué exige transferir umbral de anomalía a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Umbral de anomalía con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Umbral de anomalía; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Umbral de anomalía; detecta conclusiones que excedan el diseño.
