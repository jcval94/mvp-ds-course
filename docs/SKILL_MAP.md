# Skill Map

## Core skills

| Skill | Proposito | Cuando se activa | Inputs | Outputs | Dependencias | Prioridad MVP | Prioridad post-MVP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `mvp-product-strategist` | Convertir idea vaga en MVP concreto | Inicio del flujo o cambios de alcance | `IDEA.md`, contexto del usuario | Brief, supuestos, vertical slice | Ninguna | Alta | Alta |
| `prd-writer` | Crear PRD claro y accionable | Despues del brief | Brief, supuestos, no objetivos | PRD, historias, requisitos, metricas | `mvp-product-strategist` | Alta | Alta |
| `agent-architect` | Definir comportamiento del agente principal | Al disenar flujo de agentes | PRD, brief, restricciones | Agent Operating Spec | `prd-writer` | Alta | Media |
| `skill-designer` | Crear mapa y contratos de skills | Cuando hay tareas especializadas | Agent Spec, PRD | Skill Map, Skill Contracts | `agent-architect` | Alta | Alta |

## Support skills

| Skill | Proposito | Cuando se activa | Inputs | Outputs | Dependencias | Prioridad MVP | Prioridad post-MVP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `eval-designer` | Crear evaluaciones y rubricas | Antes de cerrar documentacion | Docs generados, riesgos | Eval Suite, casos, checklists | Brief, PRD | Alta | Alta |
| `harness-designer` | Disenar arnes minimo | Cuando el flujo requiere orquestacion | Skill Map, Evals | Harness Spec | `skill-designer`, `eval-designer` | Media | Alta |
| `codex-prompt-builder` | Redactar prompts ejecutables | Al preparar trabajo con agentes | Docs, fases, criterios | Prompts por fase y QA | Todos los docs | Alta | Alta |

## QA skills

| Skill | Proposito | Cuando se activa | Inputs | Outputs | Dependencias | Prioridad MVP | Prioridad post-MVP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `qa-reviewer` | Revisar consistencia y calidad | Al final de cada ciclo | Todos los documentos y evals | Hallazgos, correcciones, decision go/no-go | Todas | Alta | Alta |

## Reglas de routing

- Si una tarea toca producto y requisitos, activar primero producto y luego PRD.
- Si una tarea toca agente, activar `agent-architect` antes de skills.
- Si una tarea toca calidad, activar `eval-designer` y cerrar con `qa-reviewer`.
- Si hay duda entre dos skills, elegir la que produzca el documento mas temprano en el flujo.

## Reglas de prioridad

- MVP primero: usar solo skills necesarias para generar documentos y validar vertical slice.
- Post-MVP despues: automatizacion, CLI avanzada e integraciones no deben activar skills nuevas en el primer ciclo.
- QA siempre al cierre: `qa-reviewer` es obligatorio antes de aprobar desarrollo.

## Señales de skill demasiado generica

- No especifica archivo de entrada.
- No produce artefacto verificable.
- No define que queda fuera.
- No tiene criterio de fallo.
- Puede aplicarse a cualquier proyecto sin cambios.
