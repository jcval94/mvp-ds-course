# Skill Map

## Core skills

| Skill | Proposito | Cuando se activa | Inputs | Outputs | Dependencias | Prioridad MVP | Prioridad post-MVP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `mvp-product-strategist` | Reducir la idea educativa a una leccion interactiva | Al definir alcance o si aparece curso completo | `IDEA.md`, restricciones | Brief, supuestos, no objetivos, vertical slice | Ninguna | Alta | Media |
| `prd-writer` | Convertir el brief en requisitos construibles | Despues del brief | Brief, vertical slice | PRD, criterios de aceptacion, DoD | `mvp-product-strategist` | Alta | Alta |
| `agent-architect` | Definir como debe trabajar el agente | Al coordinar generacion documental | Brief, PRD, evals | Agent Operating Spec | `prd-writer` | Media | Media |

## Support skills

| Skill | Proposito | Cuando se activa | Inputs | Outputs | Dependencias | Prioridad MVP | Prioridad post-MVP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-designer` | Mantener mapa y contratos de skills | Si se agregan tareas o responsabilidades | Agent Spec, PRD | Skill Map y Skill Contracts | `agent-architect` | Media | Media |
| `eval-designer` | Crear criterios de calidad educativa y MVP | Antes de aprobar desarrollo | Brief, PRD, riesgos | Eval Suite y rubrica | `prd-writer` | Alta | Alta |
| `harness-designer` | Definir orquestacion documental minima | Al preparar flujo repetible | Skills, evals | Harness Spec | `skill-designer`, `eval-designer` | Media | Baja |
| `codex-prompt-builder` | Crear prompts para construir despues la app | Al cerrar paquete documental | PRD, plan, restricciones | Prompts ejecutables | Todos | Alta | Alta |

## QA skills

| Skill | Proposito | Cuando se activa | Inputs | Outputs | Dependencias | Prioridad MVP | Prioridad post-MVP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `qa-reviewer` | Revisar consistencia, alcance y calidad | Al final del flujo | Todos los documentos y evals | Decision listo/no listo | Todas | Alta | Alta |

## Reglas de routing

- Si el agente detecta mas de una leccion, volver a `mvp-product-strategist`.
- Si falta criterio de aceptacion, activar `prd-writer`.
- Si falta prueba de calidad, activar `eval-designer`.
- Si se quiere implementar, activar primero `qa-reviewer` y luego `codex-prompt-builder`.

## Señales de sobrealcance

- Mas de una visualizacion estadistica.
- Carga de archivos.
- Registro de usuarios.
- Evaluacion automatica.
- Integracion LMS.

