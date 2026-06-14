# Implementation Plan

## Gates de calidad

Cada fase debe cerrar con:

- Entregable versionado.
- Supuestos nuevos documentados.
- Riesgos actualizados.
- Validacion minima contra evals relevantes.
- Decision: avanzar, ajustar o bloquear.

## Fase 0: Captura de idea

**Objetivo:** obtener contexto suficiente sin bloquear al usuario.

**Tareas:** completar `IDEA.md`, listar restricciones, aceptar supuestos permitidos.

**Entregables:** `IDEA.md` inicial.

**Criterios de aceptacion:** hay al menos idea en una frase, problema probable y resultado esperado o supuestos para inferirlos.

**Riesgos:** idea demasiado amplia.

**Complejidad:** baja.

## Fase 1: Documentos base

**Objetivo:** crear claridad de producto.

**Tareas:** generar Product Brief y PRD.

**Entregables:** `docs/PRODUCT_BRIEF.md`, `docs/PRD.md`.

**Criterios de aceptacion:** usuario, problema, valor, alcance y metricas estan conectados.

**Riesgos:** requisitos inflados.

**Complejidad:** media.

## Fase 2: Diseño de agente

**Objetivo:** definir como debe operar el agente principal.

**Tareas:** crear reglas de inferencia, preguntas, limites y salida.

**Entregables:** `docs/AGENT_OPERATING_SPEC.md`.

**Criterios de aceptacion:** el agente sabe que hacer sin pedir instrucciones extra.

**Riesgos:** reglas ambiguas.

**Complejidad:** media.

## Fase 3: Diseño de skills

**Objetivo:** dividir responsabilidades especializadas.

**Tareas:** crear mapa y contratos.

**Entregables:** `docs/SKILL_MAP.md`, `docs/SKILL_CONTRACTS.md`, `.agents/skills/*/SKILL.md`.

**Criterios de aceptacion:** cada skill tiene activador, inputs, outputs y limites.

**Riesgos:** skills duplicadas o genericas.

**Complejidad:** media.

## Fase 4: Diseño de evals

**Objetivo:** evaluar calidad antes de codigo.

**Tareas:** crear rubricas, checklists y regresiones.

**Entregables:** `docs/EVAL_SUITE.md`, `evals/*.md`.

**Criterios de aceptacion:** una salida mala puede fallar claramente.

**Riesgos:** evals superficiales.

**Complejidad:** media.

## Fase 5: Diseño de arnes

**Objetivo:** definir orquestacion minima.

**Tareas:** documentar routing, permisos, logs, validaciones y errores.

**Entregables:** `docs/HARNESS_SPEC.md`.

**Criterios de aceptacion:** el flujo puede ejecutarse manualmente o con script simple.

**Riesgos:** sobreingenieria.

**Complejidad:** media.

## Fase 6: Vertical slice

**Objetivo:** elegir el primer flujo construible.

**Tareas:** definir usuario, entrada, procesamiento, salida, DoD, prueba manual y no objetivos de la slice.

**Entregables:** seccion de vertical slice en PRD y plan, mas prompt de implementacion inicial.

**Criterios de aceptacion:** se puede construir en pocos dias con riesgo bajo.

**Riesgos:** elegir una slice demasiado grande.

**Complejidad:** baja.

## Fase 7: MVP tecnico

**Objetivo:** construir solo lo necesario para probar la vertical slice.

**Tareas:** crear estructura de app, implementar flujo principal, pruebas minimas.

**Entregables:** codigo de producto en proyecto derivado.

**Criterios de aceptacion:** cumple DoD y metricas iniciales.

**Riesgos:** agregar features post-MVP.

**Complejidad:** alta.

## Fase 8: Iteracion

**Objetivo:** mejorar con evidencia.

**Tareas:** recoger feedback, actualizar docs, ajustar evals, priorizar siguiente slice.

**Entregables:** version nueva del paquete documental y backlog.

**Criterios de aceptacion:** cada cambio responde a evidencia o riesgo.

**Riesgos:** perder trazabilidad.

**Complejidad:** media.
