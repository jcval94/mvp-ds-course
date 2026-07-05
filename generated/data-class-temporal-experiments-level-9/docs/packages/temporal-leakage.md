# Paquete: Leakage temporal

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S07`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Validación temporal.
- **Objetivo:** Bloquear agregaciones o columnas posteriores al corte.
- **Definición:** Leakage temporal usa información que aún no existía al decidir.
- **Intuición:** El visual hace visible corte de disponibilidad y dato futuro antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** corte de disponibilidad y dato futuro.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** fecha, disponibilidad, media_movil.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. Una media centrada incluye mañana por accidente.
2. Ejecutar **Comparar estados de leakage temporal**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa corte y dato futuro bloqueado y cita una marca visible. ¿Qué conclusión guiada sobre leakage temporal conserva el alcance?
- **Transferencia:** Observa corte y dato futuro bloqueado y cita una marca visible. ¿Qué exige transferir leakage temporal a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Leakage temporal con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Leakage temporal; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Leakage temporal; detecta conclusiones que excedan el diseño.
