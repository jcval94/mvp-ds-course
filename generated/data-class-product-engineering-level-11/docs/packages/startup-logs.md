# Paquete: Logs y fallos de arranque

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S20`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Despliegue y operabilidad mínima.
- **Objetivo:** Aplicar logs y fallos de arranque y justificar una decisión con evidencia verificable.
- **Definición:** Logging registra eventos estructurados; un startup failure debe ser visible y detener el servicio.
- **Intuición:** El visual separa los estados de timeline de arranque, eventos estructurados y fallo visible para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido logs y fallos de arranque sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** timeline de arranque, eventos estructurados y fallo visible.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** evento, request_id, version, error.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Registrar versión, request y error controlado
2. Ejecutar **Recorrer y verificar logs y fallos de arranque**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa eventos de arranque y fallo visible y cita una marca visible. ¿Qué decisión sobre logs y fallos de arranque está respaldada por las tres etapas?
- **Transferencia:** Observa eventos de arranque y fallo visible y cita una marca visible. ¿Qué debe volver a comprobarse al transferir logs y fallos de arranque a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Logs y fallos de arranque con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Logs y fallos de arranque; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Logs y fallos de arranque; detecta conclusiones que excedan el diseño.
