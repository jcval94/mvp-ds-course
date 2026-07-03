# Paquete: Efecto práctico

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_8.md`; escena `L8-S14`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 8, Experimentación.
- **Objetivo:** Comparar efecto e intervalo con mínimo útil.
- **Definición:** La relevancia práctica compara magnitud e incertidumbre con un umbral operativo.
- **Intuición:** El visual hace visible intervalo frente a mínimo útil antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** intervalo frente a mínimo útil.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** efecto, intervalo, minimo_util.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. Don Juan compara la mejora con costo y cupo.
2. Ejecutar **Comparar estados de efecto práctico**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa efecto frente a mínimo útil y cita una marca visible. ¿Qué conclusión guiada sobre efecto práctico conserva el alcance?
- **Transferencia:** Observa efecto frente a mínimo útil y cita una marca visible. ¿Qué exige transferir efecto práctico a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Efecto práctico con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Efecto práctico; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Efecto práctico; detecta conclusiones que excedan el diseño.
