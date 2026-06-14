# Skill Contracts

## Contrato universal

Cada skill debe producir un artefacto verificable, mantener visualización obligatoria, no depender de backend y separar claramente MVP local de post-MVP con IA.

## `learning-module-designer`

Diseña módulos explicativos con objetivo, intuición, visualización, secciones, error común, mini-checkpoint y cierre.

**No debe hacer:** crear texto largo sin visual.

**Aceptación:** el alumno puede entender la intuición antes de practicar.

## `visual-explanation-builder`

Define metáfora visual, elementos mínimos, interacción y estrategia de simplificación para cada concepto.

**No debe hacer:** aprobar conceptos sin visual.

**Aceptación:** `visualSpec` es renderizable por `renderVisual`.

## `practice-case-generator`

Genera casos con rol, historia, evidencia visual, pregunta, opciones, feedback y conclusión.

**No debe hacer:** preguntar algo que no dependa del concepto.

**Aceptación:** exactamente una opción correcta y distractores plausibles.

## `live-teaching-pack-builder`

Crea paquete de clase en vivo con guion, explicación docente, preguntas socráticas, dataset, Python, prompts, notebook blueprint, plan offline, checklists y cierre.

**No debe hacer:** intentar ejecutar IA desde la app.

**Aceptación:** el profesor puede copiar o descargar guion, dataset, Python, prompts, notebook blueprint, plan B y checklist antes/durante clase.

## `notebook-blueprint-designer`

Diseña un notebook blueprint en Markdown o JSON `.ipynb` descargable.

**No debe hacer:** requerir librerías no explicadas.

**Aceptación:** incluye objetivo, datos, visualización, preguntas, experimento, cierre y ejercicios.

## `codex-live-demo-prompt-writer`

Escribe prompts para que Codex genere HTML, notebook o mini app educativa reproducible.

**Aceptación:** incluye concepto, nivel, contexto, objetivo, dataset, visualización, interacciones, restricciones técnicas, criterios de aceptación y qué no hacer.

## `gemini-teaching-prompt-writer`

Escribe prompts para que Gemini ayude al profesor en vivo.

**Aceptación:** incluye explicación paso a paso, analogía, preguntas socráticas, posibles respuestas, correcciones, mini demostración con datos, actividad de 5 minutos, cierre y salida estructurada.

## `teacher-script-writer`

Crea guion de clase minuto a minuto.

**Aceptación:** cada bloque incluye minuto, acción docente, acción del estudiante, acción visual e insight esperado.

## `classroom-assessment-designer`

Genera preguntas socráticas, actividad de 5 minutos y prompt de ejercicios adicionales.

**Aceptación:** las preguntas pueden responderse mirando la visualización y anticipan errores comunes.

## `visual-concept-qa-reviewer`

Revisa visualización, pedagogía, exportación, prompts y funcionamiento local.

**No debe hacer:** aprobar sin probar mentalmente los tres modos.

**Aceptación:** entrega decisión listo, listo con ajustes o no listo.

