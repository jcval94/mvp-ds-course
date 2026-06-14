# Codex y Claude Code Prompts

## 1. Generar documentos desde `IDEA.md`

```text
Lee AGENTS.md e IDEA.md. Usa /templates y .agents/skills como referencia. Genera o actualiza todos los documentos de /docs en el orden obligatorio. No programes producto. Si falta informacion no bloqueante, crea supuestos razonables y documentalos. No dejes placeholders fuera de /templates. Termina con: archivos modificados, supuestos, riesgos, validacion contra cada archivo de /evals, puntaje estimado y vertical slice con usuario, entrada, flujo, salida, prueba manual y Definition of Done.
```

## 2. Revisar consistencia entre documentos

```text
Revisa docs/PRODUCT_BRIEF.md, docs/PRD.md, docs/AGENT_OPERATING_SPEC.md, docs/SKILL_MAP.md, docs/SKILL_CONTRACTS.md, docs/EVAL_SUITE.md, docs/HARNESS_SPEC.md, docs/IMPLEMENTATION_PLAN.md y docs/CODEX_CLAUDE_PROMPTS.md. Detecta contradicciones, alcance inflado, metricas faltantes, terminos inconsistentes y decisiones sin soporte. Corrige lo necesario. Reporta hallazgos por archivo con impacto y correccion aplicada.
```

## 3. Crear o mejorar skills

```text
Lee docs/SKILL_MAP.md y docs/SKILL_CONTRACTS.md. Revisa .agents/skills/*/SKILL.md. Asegura que cada skill tenga frontmatter valido, activadores claros, inputs, outputs, limites, validaciones, fallos comunes y criterios de aceptacion. No crees skills nuevas salvo que haya una responsabilidad no cubierta. Reporta cambios y razon.
```

## 4. Crear evals

```text
Lee docs/EVAL_SUITE.md, evals/rubric.md, evals/mvp_quality_checklist.md, evals/document_quality_checklist.md y evals/regression_cases.md. Mejora las evaluaciones para que puedan detectar salidas malas, contradicciones, falta de vertical slice y sobreingenieria. Incluye casos felices, limite y fallo. Mantiene los evals simples y ejecutables manualmente.
```

## 5. Diseñar arnes minimo

```text
Lee docs/AGENT_OPERATING_SPEC.md, docs/SKILL_MAP.md y docs/EVAL_SUITE.md. Diseña o ajusta docs/HARNESS_SPEC.md para describir el arnes minimo de orquestacion documental: routing, permisos, memoria, logs, validaciones, reintentos, errores y human-in-the-loop. No propongas infraestructura compleja si Markdown y ejecucion manual bastan.
```

## 6. Crear vertical slice

```text
Lee IDEA.md, docs/PRODUCT_BRIEF.md y docs/PRD.md. Define una vertical slice de MVP que incluya entrada, usuario, flujo principal, salida, datos de prueba, criterios de aceptacion, prueba manual y no objetivos. Debe poder construirse en pocos dias. Actualiza docs/IMPLEMENTATION_PLAN.md y el PRD si hace falta.
```

## 7. Revisar sobreingenieria

```text
Revisa todos los documentos en /docs. Busca autenticacion prematura, integraciones innecesarias, modelos propios, arquitectura distribuida, dashboards extensos, roles multiples o features post-MVP dentro del MVP. Mueve lo que no sea esencial a post-MVP y explica cada reduccion de alcance.
```

## 8. Preparar proyecto para desarrollo

```text
Valida que el paquete documental este listo para iniciar codigo de producto. Usa evals/rubric.md y ambos checklists. Si el promedio es menor a 4, corrige documentos antes de aprobar. Si esta listo, genera un resumen de desarrollo con vertical slice, archivos iniciales recomendados y primer prompt de implementacion. No escribas codigo todavia.
```

## 9. Crear README final

```text
Con base en IDEA.md y docs/, crea o actualiza README.md para un proyecto MVP derivado. Debe explicar problema, usuario, alcance MVP, vertical slice, como ejecutar el proyecto cuando exista codigo, limitaciones y roadmap post-MVP. No incluyas claims no validados.
```

## 10. Hacer revision QA

```text
Actua como qa-reviewer. Revisa contradicciones entre documentos, exceso de alcance, falta de metricas, skills genericas, evals debiles, arnes sobreingenierizado, ausencia de vertical slice y placeholders vacios. Usa evals/rubric.md, evals/mvp_quality_checklist.md, evals/document_quality_checklist.md y evals/regression_cases.md. Entrega decision: listo, listo con ajustes menores o no listo. Incluye hallazgos con archivo, impacto, correccion aplicada o recomendada, y puntaje por dimension.
```
