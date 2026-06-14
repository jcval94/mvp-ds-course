# Harness Spec

## Responsabilidad del arnes

El arnes minimo coordina el flujo documental: leer idea, enrutar skills, generar documentos, validar calidad y producir una recomendacion de vertical slice.

En el MVP, el arnes es una especificacion operativa y una lista de pasos auditables. No necesita runtime, servidor, base de datos ni cola de tareas.

## Flujo de orquestacion

1. Leer `IDEA.md`.
2. Detectar tipo de MVP.
3. Seleccionar skills necesarias.
4. Generar documentos en orden.
5. Ejecutar checklists de `evals/`.
6. Registrar supuestos, riesgos y validaciones.
7. Emitir salida final.

## Estado minimo

El arnes solo necesita mantener estos estados en archivos:

- Idea leida.
- Supuestos creados.
- Documentos generados.
- Evals ejecutados.
- Ajustes pendientes.
- Vertical slice aprobada o bloqueada.

## Routing entre skills

- Producto: `mvp-product-strategist`.
- Requisitos: `prd-writer`.
- Agente: `agent-architect`.
- Skills: `skill-designer`.
- Evals: `eval-designer`.
- Arnes: `harness-designer`.
- Prompts: `codex-prompt-builder`.
- QA: `qa-reviewer`.

## Permisos

MVP:

- Leer y escribir archivos Markdown del proyecto.
- Crear carpetas documentales.
- Ejecutar script local sin red.

Fuera del MVP:

- Modificar repos remotos.
- Usar credenciales.
- Desplegar servicios.

## Memoria

La memoria minima vive en archivos versionados:

- `IDEA.md` para contexto inicial.
- `docs/` para decisiones.
- `evals/` para criterios.
- Resumen final de cada ejecucion en respuesta del agente.

## Logs

Registrar en la respuesta final:

- Skills usadas.
- Archivos modificados.
- Supuestos creados.
- Validaciones ejecutadas.
- Riesgos pendientes.

## Validaciones

- Checklist documental.
- Checklist de MVP.
- Rubrica 1 a 5.
- Revision de contradicciones.
- Verificacion de vertical slice.

## Criterio de paso

El arnes puede recomendar desarrollo solo si:

- No hay bloqueos automaticos de `docs/EVAL_SUITE.md`.
- El promedio de rubrica es 4 o mayor.
- La vertical slice tiene prueba manual.
- El humano aprueba iniciar codigo.

## Reintentos

Si una validacion falla:

1. Identificar documento afectado.
2. Corregir la decision raiz.
3. Propagar cambios a documentos dependientes.
4. Repetir QA.

## Manejo de errores

- Si falta informacion no bloqueante, inferir y documentar.
- Si falta informacion bloqueante, preguntar con una sola pregunta clara.
- Si hay contradiccion, priorizar documentos tempranos del flujo.
- Si el alcance crece, moverlo a post-MVP.

## Guardrails

- No construir producto antes de documentos.
- No crear dependencias externas.
- No introducir automatizaciones irreversibles.
- No aprobar documentos sin evals.

## Human-in-the-loop

El humano debe aprobar:

- Supuestos criticos.
- Vertical slice.
- Inicio de codigo de producto.
- Uso de datos reales.
- Cambios de alcance.

## Salida final esperada

```text
Paquete documental generado.
Skills usadas:
Validaciones:
Puntaje estimado:
Vertical slice recomendada:
Riesgos:
Proximos pasos:
```

## Fuera del arnes en el MVP

- Interfaz visual.
- Cola de tareas.
- Persistencia en base de datos.
- Multiagente automatico.
- Despliegue.
- Integraciones con LLM externas.
