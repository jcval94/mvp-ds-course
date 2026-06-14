# Codex y Claude Code Prompts

## Prompt 1: Revisar paquete documental

```text
Lee README.md, IDEA.md, todos los archivos de docs/ y evals/. No construyas la app. Revisa consistencia, sobrealcance, placeholders, criterios de aceptacion y vertical slice. Usa evals/rubric.md y evals/mvp_quality_checklist.md. Entrega decision: listo, listo con ajustes menores o no listo, con puntaje por dimension.
```

## Prompt 2: Construir vertical slice HTML

```text
Lee README.md, IDEA.md, docs/PRODUCT_BRIEF.md, docs/PRD.md, docs/HARNESS_SPEC.md y evals/mvp_quality_checklist.md.

Construye solo la vertical slice aprobada de Histohistorias. Crea app/index.html, app/styles.css y app/app.js. No uses backend, build step, dependencias externas, login, LMS, IA generativa ni carga de archivos.

La app debe ser una pagina estatica en español con:
- dataset ficticio incluido de 30 calificaciones;
- histograma visible al cargar;
- control para cambiar bins entre 4 y 12;
- explicacion narrativa breve sobre forma, centro, dispersion y bins;
- pregunta de reflexion;
- diseño claro y accesible.

No agregues funcionalidades post-MVP. Al final reporta archivos creados, como probar manualmente y que criterios de aceptacion cumple.
```

## Prompt 3: QA de la app futura

```text
Lee docs/PRD.md, evals/mvp_quality_checklist.md y los archivos de app/. Verifica que la app cumple la vertical slice: histograma inicial, control de bins, narrativa coherente, pregunta de reflexion y sin dependencias innecesarias. Reporta bugs, incumplimientos del PRD y riesgos pedagogicos. No agregues features.
```

## Prompt 4: Reducir sobreingenieria

```text
Revisa docs/PRD.md, docs/IMPLEMENTATION_PLAN.md y cualquier archivo de app/ si existe. Detecta login, LMS, curso completo, carga de archivos, analitica, IA generativa o multiples lecciones. Elimina o mueve a post-MVP cualquier cosa fuera de la vertical slice. Mantiene solo una pagina estatica para enseñar histogramas.
```

## Prompt 5: Preparar prueba con usuarios

```text
Lee docs/PRD.md y evals/mvp_quality_checklist.md. Diseña una prueba manual de 5 minutos para 3 a 5 usuarios principiantes. Incluye guion, tareas, preguntas y criterios de exito. No cambies la app ni agregues tracking automatico.
```

