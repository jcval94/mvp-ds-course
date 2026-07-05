# Paquete: Request y response

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, APIs y contratos de servicio.
- **Objetivo:** Aplicar request y response y justificar una decisión con evidencia verificable.
- **Definición:** Una API define una frontera entre cliente y servidor mediante request, validación y response.
- **Intuición:** El visual separa los estados de flujo de request validado hasta response para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido request y response sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** flujo de request validado hasta response.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** request, validacion, proceso, response.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Seguir JSON desde cliente a validación y salida
2. Ejecutar **Recorrer y verificar request y response**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa request, validación, proceso y response y cita una marca visible. ¿Qué decisión sobre request y response está respaldada por las tres etapas?
- **Transferencia:** Observa request, validación, proceso y response y cita una marca visible. ¿Qué debe volver a comprobarse al transferir request y response a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Request y response con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Request y response; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Request y response; detecta conclusiones que excedan el diseño.
