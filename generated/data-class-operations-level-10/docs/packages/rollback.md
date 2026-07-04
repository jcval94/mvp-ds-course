# Paquete: Rollback

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S03`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Preparación operativa.
- **Objetivo:** Diseñar condición, estado seguro y verificación antes del incidente.
- **Definición:** Rollback restaura un procedimiento anterior verificable.
- **Intuición:** El visual hace visible señal, estado seguro y comprobación antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** señal, estado seguro y comprobación.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** version_regla, procedimiento_activo.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; no hay backend, despliegue real ni decisión automática.

## LearningModule

1. El equipo ensaya volver a la regla r2.
2. Ejecutar **Comparar estados de rollback**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa señal, estado seguro y verificación y cita una marca visible. ¿Qué conclusión guiada sobre rollback conserva el alcance?
- **Transferencia:** Observa señal, estado seguro y verificación y cita una marca visible. ¿Qué exige transferir rollback a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Rollback con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Rollback; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Rollback; detecta conclusiones que excedan el diseño.
