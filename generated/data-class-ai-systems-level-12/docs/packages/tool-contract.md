# Paquete: Contrato de tool

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S09`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Tools, skills y disclosure.
- **Objetivo:** Aplicar contrato de tool y justificar una decisión con evidencia verificable.
- **Definición:** Una tool expone una capacidad atómica con nombre, schema de entrada, salida y permisos.
- **Intuición:** El visual separa los estados de capacidad atómica expuesta por el sistema para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** capacidad atómica expuesta por el sistema.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** nombre, input_schema, output_schema, permiso.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. El asistente quiere consultar ventas, pero nadie escribió qué recibe ni qué devuelve
2. Ejecutar **Recorrer y verificar contrato de tool**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa nombre, input schema, output schema y permiso y cita una marca visible. ¿Qué decisión sobre contrato de tool está respaldada por las tres etapas?
- **Transferencia:** Observa nombre, input schema, output schema y permiso y cita una marca visible. ¿Qué debe volver a comprobarse al transferir contrato de tool a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Contrato de tool con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Contrato de tool; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Contrato de tool; detecta conclusiones que excedan el diseño.
