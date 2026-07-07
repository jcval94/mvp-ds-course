# Paquete: MCP e interoperabilidad

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S21`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Interoperabilidad y delegación.
- **Objetivo:** Aplicar mcp e interoperabilidad y justificar una decisión con evidencia verificable.
- **Definición:** MCP conecta clientes con servidores que exponen tools y resources mediante contratos.
- **Intuición:** El visual separa los estados de contrato interoperable para capacidades y recursos externos para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** contrato interoperable para capacidades y recursos externos.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** cliente, servidor, tools, resources, permisos.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Paco quiere que el sistema descubra capacidades externas sin acoplarse a una app
2. Ejecutar **Recorrer y verificar mcp e interoperabilidad**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa cliente, servidor, tools, resources, schemas y permisos y cita una marca visible. ¿Qué decisión sobre mcp e interoperabilidad está respaldada por las tres etapas?
- **Transferencia:** Observa cliente, servidor, tools, resources, schemas y permisos y cita una marca visible. ¿Qué debe volver a comprobarse al transferir mcp e interoperabilidad a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de MCP e interoperabilidad con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre MCP e interoperabilidad; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de MCP e interoperabilidad; detecta conclusiones que excedan el diseño.
