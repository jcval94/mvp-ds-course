# Eval Suite

## Propósito

Evaluar si DataClass Forge genera experiencias educativas completas en los tres modos: Aprender, Ejercitar y Enseñar en vivo.

## Bloqueos automáticos

- Concepto sin visualización.
- Modo Aprender sin mini-checkpoint.
- Modo Ejercitar sin feedback.
- Modo Enseñar en vivo sin prompt para Codex o Gemini.
- Live Teaching Pack que intenta ejecutar IA dentro de la app.
- App que requiere backend.
- Prompts que no incluyen restricciones técnicas ni criterios de aceptación.

## Para Aprender

- Claridad conceptual.
- Intuición.
- Visualización obligatoria.
- Progresión pedagógica.
- Error común.
- Mini-checkpoint.
- Transición a práctica.

## Para Ejercitar

- Pregunta alineada al concepto.
- Visualización adecuada.
- Distractores plausibles.
- Feedback útil.
- Storytelling.
- Nivel de dificultad.
- Exportabilidad.

## Para Enseñar en vivo

- Guion claro.
- Prompt para Codex ejecutable.
- Prompt para Gemini claro.
- Notebook blueprint útil.
- Dataset suficiente.
- Código Python copiable y coherente con el concepto.
- Plan B offline.
- Preguntas para alumnos.
- Errores anticipados.
- Cierre pedagógico.
- Checklist de preparación del profesor.
- Checklist durante clase.
- Botón Copiar por sección.
- JSON exportable.

## Revisión de consola y UX

Como no hay backend ni build step, la revisión mínima de QA debe abrir `app/index.html` en navegador y verificar:

- No hay errores críticos de consola al generar cada modo.
- Cambiar modo y concepto no rompe el estado.
- Los botones de copiar y descarga responden.
- Las vistas son distinguibles en desktop y móvil.

## Condiciones específicas de aprobación del Live Teaching Pack

- No intenta ejecutar IA en navegador.
- Codex prompt puede pedir HTML demo, notebook o mini app educativa.
- Gemini prompt pide salida docente estructurada y no inventar datos si ya hay dataset.
- Dataset muestra columnas, tipos, filas y lógica.
- Notebook muestra celdas ordenadas.
- Python usa librerías comunes y no datos externos.
