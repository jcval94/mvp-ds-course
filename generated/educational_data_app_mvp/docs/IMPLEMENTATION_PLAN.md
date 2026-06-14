# Implementation Plan

## Fase 0: Captura de idea

**Objetivo:** normalizar la idea educativa.

**Tareas:** copiar idea fuente, documentar supuestos, limitar problemas educativos a tres.

**Entregables:** `IDEA.md`.

**Criterios de aceptacion:** usuario, problema y resultado esperado estan claros.

**Riesgos:** intentar enseñar demasiados conceptos.

**Complejidad:** baja.

## Fase 1: Documentos base

**Objetivo:** definir producto y requisitos.

**Tareas:** crear Product Brief y PRD.

**Entregables:** `docs/PRODUCT_BRIEF.md`, `docs/PRD.md`.

**Criterios de aceptacion:** existe vertical slice con prueba manual.

**Riesgos:** convertir el MVP en curso completo.

**Complejidad:** media.

## Fase 2: Diseño de agente

**Objetivo:** definir reglas para que el agente no sobreconstruya.

**Tareas:** crear spec de agente con limites, inferencias y bloqueos.

**Entregables:** `docs/AGENT_OPERATING_SPEC.md`.

**Criterios de aceptacion:** el agente sabe cuando detenerse.

**Riesgos:** permitir codigo prematuro.

**Complejidad:** baja.

## Fase 3: Diseño de skills

**Objetivo:** mapear skills relevantes.

**Tareas:** crear Skill Map y Skill Contracts.

**Entregables:** `docs/SKILL_MAP.md`, `docs/SKILL_CONTRACTS.md`.

**Criterios de aceptacion:** cada skill tiene activador, input, output y criterio de aceptacion.

**Riesgos:** skills genericas.

**Complejidad:** media.

## Fase 4: Diseño de evals

**Objetivo:** bloquear baja calidad antes de construir.

**Tareas:** crear suite, rubrica y checklist local.

**Entregables:** `docs/EVAL_SUITE.md`, `evals/rubric.md`, `evals/mvp_quality_checklist.md`.

**Criterios de aceptacion:** la suite falla si aparece LMS, login o curso completo.

**Riesgos:** evals demasiado blandos.

**Complejidad:** media.

## Fase 5: Diseño de arnes

**Objetivo:** documentar orquestacion minima.

**Tareas:** definir routing, permisos, logs, validaciones y bloqueos.

**Entregables:** `docs/HARNESS_SPEC.md`.

**Criterios de aceptacion:** no requiere runtime ni infraestructura.

**Riesgos:** confundir arnes con framework.

**Complejidad:** baja.

## Fase 6: Vertical slice

**Objetivo:** construir una sola experiencia educativa.

**Tareas:** crear HTML, CSS y JS con histograma, bins y narrativa.

**Entregables futuros:** `app/index.html`, `app/styles.css`, `app/app.js`.

**Criterios de aceptacion:** prueba manual de 5 minutos cumple DoD.

**Riesgos:** agregar features post-MVP.

**Complejidad:** media.

## Fase 7: MVP tecnico

**Objetivo:** pulir la slice sin expandir alcance.

**Tareas:** accesibilidad basica, responsive simple, copy pedagogico, prueba manual.

**Entregables futuros:** app estatica validada.

**Criterios de aceptacion:** usuarios pueden explicar el efecto de bins.

**Riesgos:** optimizar UI antes de validar aprendizaje.

**Complejidad:** media.

## Fase 8: Iteracion

**Objetivo:** decidir siguiente mejora con evidencia.

**Tareas:** revisar feedback, actualizar docs, elegir post-MVP.

**Entregables:** backlog priorizado.

**Criterios de aceptacion:** cada nueva feature responde a evidencia.

**Riesgos:** expandir a plataforma educativa.

**Complejidad:** baja.

