# Skill Map

## Skills del nuevo MVP

| Skill | Propósito | Activador | Output |
| --- | --- | --- | --- |
| `learning-module-designer` | Diseñar módulos explicativos visuales | Modo Aprender | Módulo con intuición, secciones y checkpoint |
| `visual-explanation-builder` | Convertir conceptos abstractos en visuales | Todo concepto | `visualSpec` y explicación visual |
| `practice-case-generator` | Crear ejercicios interactivos | Modo Ejercitar | Caso con historia, pregunta y feedback |
| `live-teaching-pack-builder` | Crear paquete para profesor | Modo Enseñar en vivo | Guion, prompts, dataset y plan offline |
| `notebook-blueprint-designer` | Diseñar blueprint copiable de notebook | Live Teaching Pack | Markdown o `.ipynb` generado |
| `codex-live-demo-prompt-writer` | Escribir prompt para Codex | Enseñanza en vivo | Prompt técnico ejecutable |
| `gemini-teaching-prompt-writer` | Escribir prompt para Gemini | Enseñanza en vivo | Prompt pedagógico estructurado |
| `teacher-script-writer` | Crear guion minuto a minuto | Enseñanza en vivo | `classFlow` |
| `classroom-assessment-designer` | Crear preguntas de aula | Cierre de clase | Assessment prompt y preguntas |
| `visual-concept-qa-reviewer` | Revisar calidad visual/pedagógica | QA final | Hallazgos y decisión |

## Reglas de routing

- Si se agrega un concepto, activar `visual-explanation-builder` y `visual-concept-qa-reviewer`.
- Si se cambia modo Aprender, activar `learning-module-designer`.
- Si se cambia modo Ejercitar, activar `practice-case-generator`.
- Si se cambia modo Enseñar en vivo, activar `live-teaching-pack-builder`, `teacher-script-writer`, `codex-live-demo-prompt-writer` y `gemini-teaching-prompt-writer`.
- Si se toca exportación de notebook, activar `notebook-blueprint-designer`.

