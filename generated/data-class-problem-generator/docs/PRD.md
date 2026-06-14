# PRD

## Contexto

DataClass Forge deja de ser solo un generador de problemas y pasa a ser un generador de experiencias educativas visuales de ciencia de datos. El MVP conserva la generación local por plantillas y amplía la salida a tres modos: `Aprender`, `Ejercitar` y `Enseñar en vivo`.

## Objetivos

- Generar módulos explicativos visuales.
- Generar ejercicios interactivos con feedback.
- Generar paquetes para profesor que quiera enseñar en vivo usando Codex, Gemini, notebooks o prompts.
- Mantener funcionamiento local sin backend ni API keys.
- Garantizar visualización obligatoria para cada concepto.

## Usuarios

- Profesor.
- Creador de cursos.
- Estudiante.
- Instructor que enseña en vivo con apoyo de herramientas de IA externas.

## Vistas obligatorias

1. Dashboard.
2. Generador.
3. Aprender.
4. Ejercitar.
5. Enseñar en vivo.
6. Biblioteca visual.

## Requisitos funcionales

- El usuario puede elegir modo: Aprender, Ejercitar o Enseñar en vivo.
- El usuario puede elegir concepto, nivel, contexto, intensidad visual, duración y tipo de datos.
- El botón de generación cambia según el modo.
- `generateLearningModule` devuelve un módulo explicativo.
- `generatePracticeCase` devuelve un ejercicio compatible con el modo de práctica.
- `generateLiveTeachingPack` devuelve un paquete de enseñanza en vivo.
- `renderVisual` renderiza visualizaciones para todos los conceptos.
- El modo Aprender incluye intuición, visual, secciones, error común, mini-checkpoint y transición a práctica.
- El modo Ejercitar incluye historia, rol, visual, pregunta, feedback, pistas y JSON.
- El modo Enseñar en vivo incluye guion, dataset, prompts, notebook blueprint, plan offline y descargas.
- El modo Enseñar en vivo incluye checklist de preparación docente.
- Los prompts generados no ejecutan IA dentro del navegador; solo se copian para usarse fuera de la app.
- El modo Enseñar en vivo organiza artefactos en secciones tipo tabs: Resumen, Guion, Dataset, Notebook, Codex, Gemini, HTML demo, Evaluación, Plan B y Exportar.

## Modelo de datos

La app debe definir:

- `LEARNING_EXPERIENCE_TYPES`.
- `CONCEPT_LIBRARY`.
- `VISUAL_CONCEPT_LIBRARY`.
- `MODULE_TEMPLATES`.
- `PRACTICE_TEMPLATES`.
- `LIVE_TEACHING_TEMPLATES`.
- `STATE`.

## Conceptos soportados

- Histograma.
- Correlación.
- Regresión lineal.
- Clasificación.
- Clustering.
- Árbol de decisión.
- Matriz de confusión.
- Outliers.
- Series de tiempo.
- A/B testing.

## Criterios de aceptación

1. `app/index.html` abre sin backend.
2. Existen tres modos: Aprender, Ejercitar, Enseñar en vivo.
3. Cada concepto tiene representación visual.
4. Cada concepto puede generar al menos un módulo explicativo.
5. Cada concepto puede generar al menos un ejercicio.
6. Cada concepto puede generar un Live Teaching Pack.
7. El modo Enseñar en vivo exporta prompts útiles para Codex y Gemini.
8. El modo Enseñar en vivo no depende de ejecutar IA dentro del navegador.
9. La app permite copiar JSON.
10. La app permite copiar prompts.
11. La app permite descargar paquete JSON.
12. Los documentos reflejan la nueva arquitectura.
13. Las evals cubren los tres modos.
14. No hay errores críticos de consola.
15. El diseño sigue siendo visualmente llamativo.

## Artefactos mínimos del Live Teaching Pack

- Guion minuto a minuto.
- Visualización recomendada.
- Dataset sintético o estructura sugerida.
- Prompt para Codex con criterios de aceptación.
- Prompt para Gemini con preguntas socráticas y errores anticipados.
- Notebook blueprint copiable.
- Código Python sugerido para demo en vivo.
- Prompt para HTML demo.
- Prompt para ejercicios adicionales.
- Preguntas para alumnos.
- Plan offline.
- Checklist de preparación del profesor.
- Checklist durante clase.
- Errores comunes del alumno.
- Cómo cerrar la clase.

## Restricción del modo Enseñar en vivo

El navegador solo genera artefactos copiables y descargables. No ejecuta Codex, Gemini, OpenAI ni ningún LLM. La integración real con IA queda para post-MVP.

## Post-MVP

- Conectar OpenAI, Gemini o Claude para variaciones ilimitadas.
- Separar componentes en archivos si el HTML crece demasiado.
- Modo offline completo sin CDN.
- Importar datos pegados por profesor.
- Exportar notebooks más completos.
