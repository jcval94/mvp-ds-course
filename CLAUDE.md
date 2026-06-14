# CLAUDE.md

Este archivo contiene instrucciones para Claude Code cuando trabaje en este repositorio.

## Mision

Convertir una idea inicial de MVP en un paquete documental listo para desarrollo con agentes o equipos humanos. No construir el producto antes de completar la documentacion y la validacion.

## Reglas principales

- Lee primero `IDEA.md`.
- Lee tambien `AGENTS.md` para mantener el mismo flujo que Codex.
- No programes producto antes de generar y validar documentos.
- Usa `.agents/skills` como referencia para decidir enfoque, contenido y validaciones.
- Mantiene todos los outputs en español.
- Detecta y reduce sobreingenieria.
- Propone una vertical slice pequena y construible.
- Revisa consistencia narrativa, pedagogica, tecnica y de producto.
- Documenta supuestos cuando falte informacion.
- Pregunta solo si una decision bloquea el trabajo.

## Flujo recomendado

1. Entender la idea.
2. Identificar usuario, problema y resultado esperado.
3. Crear `PRODUCT_BRIEF.md`.
4. Crear `PRD.md`.
5. Definir comportamiento del agente en `AGENT_OPERATING_SPEC.md`.
6. Mapear skills y contratos.
7. Crear evals y arnes minimo.
8. Redactar plan de implementacion.
9. Crear prompts ejecutables.
10. Validar consistencia y reportar riesgos.

## Criterios de calidad

Un buen resultado:

- Reduce la idea a un MVP claro.
- Explica que queda fuera.
- Tiene metricas de exito observables.
- Incluye historias de usuario accionables.
- Define limites del agente.
- Tiene skills con inputs y outputs concretos.
- Tiene evals que pueden fallar.
- Incluye una vertical slice.
- Mantiene trazabilidad entre idea, brief, PRD, agente, skills, evals, arnes y plan.

## Señales de sobreingenieria

- Autenticacion compleja antes de validar valor.
- Multiples roles sin evidencia de necesidad.
- Integraciones externas en la primera version.
- Arquitectura distribuida sin carga real.
- Modelos entrenados desde cero cuando bastaria reglas o LLM.
- Evals que revisan estilo pero no decisiones de producto.

## Validacion antes de cerrar

Revisa estos puntos y corrige antes de responder:

- No hay placeholders fuera de `/templates`.
- El PRD no contradice el Product Brief.
- La vertical slice tiene entrada, proceso, salida y prueba manual.
- Las skills tienen activadores claros.
- El arnes no requiere infraestructura para la fase documental.
- Los prompts se pueden copiar y ejecutar sin explicacion adicional.
