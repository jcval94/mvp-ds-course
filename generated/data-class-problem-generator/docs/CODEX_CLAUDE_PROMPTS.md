# Codex y Claude Code Prompts

## QA de los tres modos

```text
Lee generated/data-class-problem-generator/app/index.html, docs/PRD.md y evals/. Abre la app en navegador si tienes herramienta disponible. Verifica que existan los modos Aprender, Ejercitar y Enseñar en vivo. Prueba los 10 conceptos. Revisa que cada concepto genere módulo, ejercicio y Live Teaching Pack, que haya visualización obligatoria, copia de JSON/prompts, descarga de paquete JSON y descarga de notebook .ipynb simplificado. Corrige bugs sin agregar backend, frameworks ni APIs.
```

## Mejorar modo Aprender

```text
Mejora solo el modo Aprender en app/index.html. Cada concepto debe mostrar intuición, visual, secciones breves, error común, mini-checkpoint y botón para pasar a práctica. No agregues texto largo ni dependencias.
```

## Mejorar modo Enseñar en vivo

```text
Mejora solo el modo Enseñar en vivo. El Live Teaching Pack debe organizarse en tabs o acordeones: Resumen, Guion, Dataset, Notebook, Codex, Gemini, HTML demo, Evaluación, Plan B y Exportar. Debe incluir guion minuto a minuto, explicación docente, preguntas socráticas, dataset con columnas/tipos/filas, código Python sugerido, notebook blueprint, prompt para Codex, prompt para Gemini, prompt HTML demo, prompt de ejercicios adicionales, plan B offline, checklist antes de clase, checklist durante clase, errores comunes, cierre y JSON exportable. No ejecutes IA dentro del navegador.
```

## Mejorar calidad visual

```text
Lee app/index.html y evals/visual_concept_rubric.md. Mejora las visualizaciones de los 10 conceptos manteniendo un único HTML, Tailwind CDN y Chart.js CDN. Prioriza claridad, etiquetas, interacción educativa y consistencia visual. No agregues backend, React, Vite, Next ni APIs.
```

## Preparar integración post-MVP con IA

```text
Diseña una propuesta post-MVP para conectar OpenAI, Gemini o Claude. Mantén la regla: ningún contenido generado por IA se aprueba si no tiene visualSpec válido, pregunta alineada y plan docente revisable.
```
