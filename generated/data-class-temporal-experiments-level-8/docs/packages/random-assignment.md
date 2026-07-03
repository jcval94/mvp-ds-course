# Paquete: Asignación aleatoria

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_8.md`; escena `L8-S08`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 8, A/B testing.
- **Objetivo:** Asignar 400 prepedidos a A/B antes del resultado.
- **Definición:** La asignación aleatoria usa azar para equilibrar explicaciones alternativas en expectativa.
- **Intuición:** El visual hace visible flujo balanceado de asignaciones antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** flujo balanceado de asignaciones.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** asignacion_id, variante, elegible_antes_asignacion.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. Nora recibe cupos A y B sin elegir por pedido.
2. Ejecutar **Comparar estados de asignación aleatoria**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa asignaciones balanceadas A/B y cita una marca visible. ¿Qué conclusión guiada sobre asignación aleatoria conserva el alcance?
- **Transferencia:** Observa asignaciones balanceadas A/B y cita una marca visible. ¿Qué exige transferir asignación aleatoria a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Asignación aleatoria con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Asignación aleatoria; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Asignación aleatoria; detecta conclusiones que excedan el diseño.
