# Level Narrative Arc: Nivel 12

## Identidad

- **ID:** `don-juan-paco-level-12-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 12.
- **Historia canónica:** `docs/stories/LEVEL_12.md`.
- **Ledger de entrada:** `producto_operable@L11.H1 / G7-local`.
- **Entrada/salida:** `producto_operable@L11.H1 / G7-local → sistema_ia_trazable@L12.H1 / G7-local`.
- **Periodo narrativo:** 22 de enero a 18 de febrero de 2028, después del cierre de Nivel 11 y antes de operación responsable.
- **Conflicto:** el producto operable puede responder, pero todavía no sabe buscar evidencia, usar capacidades, repetir con control ni detenerse de forma trazable.
- **Promesa:** diseñar un sistema de IA alrededor del modelo con contexto, conocimiento, tools, skills, loops, permisos, checkpoints y trazas reconstruibles.
- **Competencia auxiliar:** diseñar y auditar un sistema de IA mediante contexto, tools, skills, loops y un harness explícito.
- **Estado del puesto:** `G7-local`; un solo local, 18 asientos y cuatro puestos pagados, sin crecimiento.
- **Referencia externa:** documentación oficial de Model Context Protocol y especificación de tools 2025-06-18 para cliente, servidor, tools, resources, schemas y revisión humana.

## Episodios

| Episodio | Escenas | Objetivo principal | Estado | Puente |
| --- | --- | --- | --- | --- |
| `L12-E1` Del modelo al sistema | `L12-S01`-`L12-S04` | Separar modelo, app, workflow, agente, sistema y presupuesto de contexto | `producto_operable@L11.H1 → arquitectura_sistema_ia@L12.1` | ¿Qué evidencia entra al sistema y cuál se queda fuera? |
| `L12-E2` Contexto que sirve | `L12-S05`-`L12-S08` | Ensamblar contexto, validar outputs, organizar corpus y abstenerse sin evidencia | `L12.1 → conocimiento_contextual@L12.2` | ¿Cómo actúa sin cargar todo el manual? |
| `L12-E3` Capacidades con contrato | `L12-S09`-`L12-S12` | Distinguir tool, ejecución, error, skill y progressive disclosure | `L12.2 → capacidades_procedimentales@L12.3` | ¿Cómo decide repetir, pedir ayuda o parar? |
| `L12-E4` Vueltas con freno | `L12-S13`-`L12-S16` | Representar loops, familias, estado, historial, memoria y presupuestos | `L12.3 → loop_verificable@L12.4` | ¿Qué gobierna al sistema alrededor del modelo? |
| `L12-E5` Harness recuperable | `L12-S17`-`L12-S20` | Diseñar harness, entorno, hooks, checkpoints y reconstrucción de trayectoria | `L12.4 → harness_recuperable@L12.5` | ¿Cómo descubre capacidades externas y delega sin perder control? |
| `L12-E6` Integración sin magia | `L12-S21`-`L12-S24` | Explicar MCP, delegación, límites multiagente y blueprint completo | `L12.5 → sistema_ia_trazable@L12.H1` | ¿Está listo para readiness, monitoreo, incidentes y retiro? |

## Deltas aprobados

- **`continuityDelta`:** Paco deja de llamar “asistente” a una caja de chat y aprende a dibujar el sistema completo; Don Juan conserva autoridad de negocio y puede pedir evidencias, permisos y puntos de parada.
- **`dataStateDelta`:** `producto_operable@L11.H1 → arquitectura_sistema_ia@L12.1 → conocimiento_contextual@L12.2 → capacidades_procedimentales@L12.3 → loop_verificable@L12.4 → harness_recuperable@L12.5 → sistema_ia_trazable@L12.H1`.
- **`growthDelta`:** ninguno; `G7-local` permanece.
- **`handoffDelta`:** `sistema_ia_trazable@L12.H1 → readiness@L13.1 → monitoring@L13.2 → incidents@L13.3 → handoff@L13.4`.

## Aprobación narrativa

- Don Juan habla de piezas, llaves, permisos, vueltas y frenos; no usa jerga técnica.
- Paco usa vocabulario técnico solo después de que el narrador lo introduce.
- El narrador distingue modelo, harness, contexto, conocimiento, tools, skills, estado, memoria, loop, permiso y parada.
- Aprender diseña el mecanismo; Ejercitar usa una traza distinta con un error plausible que solo se resuelve mirando evidencia visual.
- El nivel no ejecuta IA real, no llama APIs de proveedor, no crea backend, no publica un chatbot genérico y no adelanta monitoreo profundo de Nivel 13.

## Cierre

La salida `sistema_ia_trazable@L12.H1` exige blueprint versionado, contrato de contexto, corpus con procedencia, tools con schemas y permisos, skills activables, loop con budgets, checkpoints y traza reconstruible. La pregunta puente es:
**“¿Puede operarse, monitorearse, detenerse y retirarse sin depender de Paco?”**

## Supuestos y límites

- La arquitectura se enseña con mapas, estados y trazas estáticas; no hay inferencia real ni automatización productiva.
- MCP se presenta como protocolo interoperable para conectar clientes con servidores que exponen tools y resources; no se implementa servidor real.
- Tools y skills se diferencian por contrato atómico frente a procedimiento reutilizable.
- Multiagente se trata como tradeoff de costo, control y contexto, no como mejora automática.
- La vertical slice recomendada del nivel completo es `context-assembly → retrieval-evidence → tool-contract → agent-loop`.
