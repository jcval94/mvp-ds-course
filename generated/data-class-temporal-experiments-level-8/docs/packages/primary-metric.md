# Paquete: Métrica primaria

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_8.md`; escena `L8-S09`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 8, A/B testing.
- **Objetivo:** Congelar finalización con numerador y denominador.
- **Definición:** Una métrica primaria define el resultado principal antes de observar diferencias.
- **Intuición:** El visual hace visible tasa de prepedidos completados antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** tasa de prepedidos completados.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** prepedido_completado, variante.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. Don Juan define qué cuenta como funcionar.
2. Ejecutar **Comparar estados de métrica primaria**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa numerador y denominador primarios y cita una marca visible. ¿Qué conclusión guiada sobre métrica primaria conserva el alcance?
- **Transferencia:** Observa numerador y denominador primarios y cita una marca visible. ¿Qué exige transferir métrica primaria a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Métrica primaria con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Métrica primaria; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Métrica primaria; detecta conclusiones que excedan el diseño.
