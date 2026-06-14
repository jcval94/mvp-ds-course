# Harness Spec

## Responsabilidad del arnes

Coordinar manualmente el flujo documental de Histohistorias: leer idea, activar skills, generar documentos, validar evals y decidir si la vertical slice puede pasar a construccion.

El arnes del MVP no es software. Es una especificacion operativa auditable.

## Flujo de orquestacion

1. Leer `IDEA.md`.
2. Confirmar problemas educativos y no objetivos.
3. Generar Brief y PRD.
4. Revisar agente, skills y evals.
5. Validar con rubrica y checklist.
6. Si aprueba, usar prompt de construccion futura.
7. Si falla, corregir documentos antes de construir.

## Routing entre skills

- Alcance educativo: `mvp-product-strategist`.
- Requisitos: `prd-writer`.
- Reglas del agente: `agent-architect`.
- Skills: `skill-designer`.
- Evals: `eval-designer`.
- Orquestacion: `harness-designer`.
- Prompts: `codex-prompt-builder`.
- Cierre: `qa-reviewer`.

## Permisos

Permitido en fase documental:

- Leer y escribir Markdown.
- Crear documentos en `docs/`.
- Crear evals.
- Proponer prompts.

No permitido en fase documental:

- Crear app HTML.
- Instalar dependencias.
- Usar datos reales.
- Desplegar.

## Memoria

La memoria vive en archivos:

- `IDEA.md`: contexto de entrada.
- `docs/PRODUCT_BRIEF.md`: decisiones de producto.
- `docs/PRD.md`: requisitos y criterios.
- `docs/EVAL_SUITE.md`: condiciones de calidad.
- Respuesta final del agente: validacion y decision.

## Logs

El agente debe reportar:

- Skills usadas.
- Archivos creados.
- Supuestos.
- Riesgos.
- Puntaje de rubrica.
- Bloqueos encontrados.

## Validaciones

- Rubrica local.
- Checklist de MVP.
- Revision de no objetivos.
- Verificacion de vertical slice.
- Confirmacion de maximo tres problemas educativos.

## Reintentos

Si falla una validacion:

1. Identificar documento origen.
2. Corregir la decision raiz.
3. Actualizar documentos dependientes.
4. Repetir QA.

## Manejo de errores

- Si falta dataset, usar calificaciones ficticias.
- Si aparece una feature grande, mover a post-MVP.
- Si se pide LMS, bloquear y pedir confirmacion para post-MVP.
- Si se pide app antes de QA, responder con el bloqueo y checklist pendiente.

## Guardrails

- Una sola leccion.
- Una sola visualizacion: histograma.
- Sin backend.
- Sin login.
- Sin LMS.
- Sin IA generativa.

## Human-in-the-loop

El humano decide:

- Si el dataset final sera calificaciones o tiempos de estudio.
- Si se aprueba construir HTML.
- Si se acepta mover una feature a post-MVP.

## Salida final esperada

```text
Paquete documental:
Skills usadas:
Rubrica:
Checklist:
Decision:
Siguiente prompt:
```

## Que queda fuera del arnes en el MVP

- CLI automatica.
- Ejecutor de skills.
- Validacion programatica.
- Tests de UI.
- Despliegue.

