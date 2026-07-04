# Paquete: Criterio de aceptación

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S01`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Preparación operativa.
- **Objetivo:** Definir el gate mínimo antes de activar un procedimiento.
- **Definición:** Un criterio de aceptación fija evidencia mínima antes de operar.
- **Intuición:** El visual hace visible gate previo con condiciones explícitas antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** gate previo con condiciones explícitas.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** aprobacion_humana, procedimiento_activo.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; no hay backend, despliegue real ni decisión automática.

## LearningModule

1. Paco revisa desempeño, privacidad y guardrails antes de encender.
2. Ejecutar **Comparar estados de criterio de aceptación**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa gate aprobado o procedimiento apagado y cita una marca visible. ¿Qué conclusión guiada sobre criterio de aceptación conserva el alcance?
- **Transferencia:** Observa gate aprobado o procedimiento apagado y cita una marca visible. ¿Qué exige transferir criterio de aceptación a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Criterio de aceptación con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Criterio de aceptación; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Criterio de aceptación; detecta conclusiones que excedan el diseño.
