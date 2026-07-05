# Paquete: Anomalía temporal

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S04`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Series de tiempo.
- **Objetivo:** Distinguir una desviación localizada de un patrón repetido.
- **Definición:** Una anomalía temporal es una desviación localizada respecto del patrón esperado.
- **Intuición:** El visual hace visible evento puntual y contexto de bitácora antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** evento puntual y contexto de bitácora.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** indice_tiempo, pedidos_totales, mantenimiento_documentado.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. Una noche de mantenimiento cae fuera del patrón.
2. Ejecutar **Comparar estados de anomalía temporal**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa evento localizado y patrón esperado y cita una marca visible. ¿Qué conclusión guiada sobre anomalía temporal conserva el alcance?
- **Transferencia:** Observa evento localizado y patrón esperado y cita una marca visible. ¿Qué exige transferir anomalía temporal a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Anomalía temporal con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Anomalía temporal; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Anomalía temporal; detecta conclusiones que excedan el diseño.
