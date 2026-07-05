# Paquete: Múltiples pruebas

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S13`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Experimentación.
- **Objetivo:** Controlar falsos positivos al revisar varias métricas.
- **Definición:** Probar muchas hipótesis aumenta la probabilidad de resultados extremos por azar.
- **Intuición:** El visual hace visible familia de cuatro pruebas y criterio ajustado antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** familia de cuatro pruebas y criterio ajustado.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** familia_pruebas, alpha.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. Paco registra cuatro comparaciones.
2. Ejecutar **Comparar estados de múltiples pruebas**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa familia de pruebas y criterio ajustado y cita una marca visible. ¿Qué conclusión guiada sobre múltiples pruebas conserva el alcance?
- **Transferencia:** Observa familia de pruebas y criterio ajustado y cita una marca visible. ¿Qué exige transferir múltiples pruebas a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Múltiples pruebas con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Múltiples pruebas; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Múltiples pruebas; detecta conclusiones que excedan el diseño.
