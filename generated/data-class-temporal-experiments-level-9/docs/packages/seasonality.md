# Paquete: Estacionalidad

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S02`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Series de tiempo.
- **Objetivo:** Comparar posiciones repetidas del ciclo semanal.
- **Definición:** La estacionalidad es un patrón que se repite en periodos regulares.
- **Intuición:** El visual hace visible ciclos alineados por día de semana antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** ciclos alineados por día de semana.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** dia_semana, pedidos_totales.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. Miércoles y sábado ocupan lugares distintos del ciclo.
2. Ejecutar **Comparar estados de estacionalidad**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa ciclos alineados por periodo y cita una marca visible. ¿Qué conclusión guiada sobre estacionalidad conserva el alcance?
- **Transferencia:** Observa ciclos alineados por periodo y cita una marca visible. ¿Qué exige transferir estacionalidad a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Estacionalidad con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Estacionalidad; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Estacionalidad; detecta conclusiones que excedan el diseño.
