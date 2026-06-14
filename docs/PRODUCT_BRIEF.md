# Product Brief

Este documento es una version inicial generica. Al ejecutar la fabrica sobre una idea real, debe reemplazarse con informacion derivada de `IDEA.md`.

## Nombre provisional

Fabrica de MVP asistida por agentes.

## Resumen ejecutivo

El proyecto convierte una idea vaga en un paquete documental listo para desarrollo. El MVP recomendado no intenta construir el producto final; primero produce claridad: brief, PRD, arquitectura de agente, skills, evals, arnes minimo, plan de implementacion y prompts ejecutables.

## Problema

Los equipos comienzan MVPs con requisitos incompletos, alcance excesivo y prompts ambiguos. Esto genera retrabajo, prototipos fragiles y discusiones tardias sobre producto.

## Usuario objetivo

Founders, product managers, builders independientes y equipos pequenos que quieren usar agentes para acelerar el descubrimiento y la preparacion de MVPs.

## Propuesta de valor

Pasar de una idea informal a un paquete claro y validado en menos tiempo, con menos ambiguedad y menor riesgo de sobreconstruccion.

## Jobs to be Done

- Cuando tengo una idea difusa, quiero estructurarla para decidir si vale construirla.
- Cuando uso Codex o Claude Code, quiero instrucciones claras para que no programe antes de tiempo.
- Cuando preparo un MVP, quiero una vertical slice pequena y verificable.

## Resultado esperado para el usuario

El usuario obtiene documentos coherentes, un alcance MVP reducido, criterios de exito y prompts listos para iniciar desarrollo.

## MVP recomendado

Una fabrica basada en Markdown con plantillas, skills, evals, ejemplos y un script simple para iniciar nuevos proyectos. No requiere backend, UI ni dependencias externas.

## Vertical slice recomendada

Entrada: una idea escrita en `IDEA.md`.

Proceso: el agente lee instrucciones, selecciona skills, genera Product Brief y PRD, valida con checklists y propone una vertical slice.

Salida: un paquete documental minimo con decisiones trazables y una recomendacion clara de desarrollo.

Prueba manual: usar `examples/educational_data_app/IDEA.md` como entrada y verificar que el output no proponga una plataforma educativa completa.

## Diferenciador

El sistema combina pensamiento de producto, arquitectura de agentes y evaluacion documental antes de escribir codigo.

## Supuestos razonables

- El usuario acepta trabajar con Markdown.
- El primer valor esta en la claridad documental, no en automatizacion completa.
- Los agentes pueden inferir informacion no critica.
- La vertical slice debe ser construible por una persona o un agente en pocos dias.

## No objetivos

- No construir una aplicacion SaaS.
- No implementar un orquestador de agentes completo.
- No entrenar modelos propios.
- No depender de servicios externos en el MVP documental.

## Riesgos

- Los documentos pueden volverse demasiado largos si no se controla alcance.
- Las skills pueden quedar genericas si no tienen contratos verificables.
- Los evals pueden convertirse en checklist superficial si no incluyen casos de fallo.

## Criterios de salida

- Hay usuario, problema y resultado esperado.
- Hay vertical slice con entrada, proceso y salida.
- Hay no objetivos suficientemente claros para bloquear sobrealcance.
- Los riesgos tienen mitigacion o decision pendiente.
- El PRD puede escribirse sin reabrir discovery completo.

## Proximos pasos

1. Completar `IDEA.md` con una idea real.
2. Ejecutar el flujo obligatorio de `AGENTS.md`.
3. Validar con `evals/rubric.md`.
4. Elegir una vertical slice.
