# Matriz visual canónica · Nivel 12

- **Estado:** implementada y validada para los 24 conceptos.
- **Registro:** `educational-svg-v1`.
- **Regla:** cada visual debe hacer visible frontera, contrato, evidencia, loop, permiso, estado, checkpoint o traza; una ventana de chat no cuenta como visual dominante.

| Escena | Concepto | Mecanismo visible | Familia / kind | Estado de implementación |
| --- | --- | --- | --- | --- |
| L12-S01 | modelo e inferencia | modelo, contexto, aplicación, entorno y harness se separan | frontera / `model-harness-boundary` | Renderer registrado y probado |
| L12-S02 | ventana y presupuesto de contexto | tokens disponibles, selección, descarte y compaction | presupuesto / `context-budget-window` | Renderer registrado y probado |
| L12-S03 | app, workflow, agente y sistema | componentes con responsabilidades distintas | mapa / `system-component-map` | Renderer registrado y probado |
| L12-S04 | agente frente a workflow | pasos fijos frente a decisión dinámica | comparación / `agent-workflow-map` | Renderer registrado y probado |
| L12-S05 | context assembly y compaction | contexto disponible se selecciona, ensambla y recupera | flujo / `context-assembly-flow` | Renderer registrado y probado |
| L12-S06 | output estructurado y schema | salida pasa por schema, validación y reparación | contrato / `structured-output-schema` | Renderer registrado y probado |
| L12-S07 | corpus, chunks y metadata | documentos se parten en chunks con metadata y procedencia | mapa / `knowledge-corpus-map` | Renderer registrado y probado |
| L12-S08 | retrieval, reranking y abstención | consulta, ranking, evidencia, cita y abstención | loop / `retrieval-evidence-loop` | Renderer registrado y probado |
| L12-S09 | contrato de tool | nombre, input schema, output schema y permiso | tarjeta / `tool-contract-card` | Renderer registrado y probado |
| L12-S10 | ejecución, error y retry de tool | argumentos, ejecución, resultado, error y retry | loop / `tool-execution-loop` | Renderer registrado y probado |
| L12-S11 | skill como procedimiento reutilizable | instrucciones, scripts, referencias y validaciones | procedimiento / `skill-procedure-map` | Renderer registrado y probado |
| L12-S12 | progressive disclosure | descubrir, activar, ejecutar y leer recursos | disclosure / `progressive-disclosure-flow` | Renderer registrado y probado |
| L12-S13 | agent loop | objetivo, observar, decidir, actuar y terminar | loop / `agent-execution-loop` | Renderer registrado y probado |
| L12-S14 | familia de loops | execution, tool-use, retrieval, verification, approval y recovery | router / `loop-family-router` | Renderer registrado y probado |
| L12-S15 | contexto, historial, estado y memoria | duración, persistencia y riesgo por tipo de información | mapa / `state-memory-map` | Renderer registrado y probado |
| L12-S16 | criterios de parada y budgets | max_turns, costo, tiempo, tools y retries | gate / `stop-budget-gate` | Renderer registrado y probado |
| L12-S17 | harness engineering | instrucciones, contexto, tools, skills, loops y verificación | arquitectura / `harness-architecture-map` | Renderer registrado y probado |
| L12-S18 | environment engineering | filesystem, terminal, SQL, browser y git bajo permisos | capacidades / `environment-capability-map` | Renderer registrado y probado |
| L12-S19 | hooks, checkpoints y resumibilidad | pre_hook, post_hook, checkpoint y recuperación | flujo / `hooks-checkpoint-flow` | Renderer registrado y probado |
| L12-S20 | reconstrucción de trayectoria | evento, tool_call, output, check y decisión | timeline / `trace-reconstruction-timeline` | Renderer registrado y probado |
| L12-S21 | MCP e interoperabilidad | cliente, servidor, tools, resources y permisos | cliente-servidor / `mcp-client-server-map` | Renderer registrado y probado |
| L12-S22 | delegación y handoffs | supervisor, especialista, contexto y responsabilidad | handoff / `delegation-handoff-map` | Renderer registrado y probado |
| L12-S23 | límites multiagente | costo, duplicación, pérdida de contexto y control | matriz de riesgo / `multiagent-risk-map` | Renderer registrado y probado |
| L12-S24 | blueprint de sistema de IA trazable | usuario, objetivo, harness, loop, verificación y traza | blueprint / `system-blueprint-map` | Renderer registrado y probado |

## Prueba bloqueante del nivel

`system-blueprint-map` debe conectar el producto operable de Nivel 11 con contexto, corpus, tools, skills, loop, permisos, stop budgets, checkpoints y traza. El ejercicio permanece bloqueado hasta recorrer todos los estados y citar una marca de evidencia.
