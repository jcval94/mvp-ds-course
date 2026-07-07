# Paquete: Baseline

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_13.md`; escena `L13-S02`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 13, Readiness operativo.
- **Objetivo:** Comparar complejidad contra una referencia simple y relevante.
- **Definición:** Un baseline establece referencia explícita de desempeño y costo.
- **Intuición:** El visual hace visible referencia simple frente a propuesta antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** referencia simple frente a propuesta.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** mae_confirmado, version_regla.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. Una regla estable compite con el procedimiento nuevo.
2. Ejecutar **Comparar estados de baseline**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa referencia simple frente a propuesta y cita una marca visible. ¿Qué conclusión guiada sobre baseline conserva el alcance?
- **Transferencia:** Observa referencia simple frente a propuesta y cita una marca visible. ¿Qué exige transferir baseline a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Baseline con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Baseline; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Baseline; detecta conclusiones que excedan el diseño.
