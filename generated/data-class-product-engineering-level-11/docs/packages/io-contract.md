# Paquete: Contrato de entrada y salida

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Código modular y contratos.
- **Objetivo:** Aplicar contrato de entrada y salida y justificar una decisión con evidencia verificable.
- **Definición:** Un contrato de código define forma, tipos, invariantes, errores y compatibilidad.
- **Intuición:** El visual separa los estados de entradas válidas e inválidas atravesando un schema para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido contrato de entrada y salida sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** entradas válidas e inválidas atravesando un schema.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** campo, tipo, invariante, error.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Definir schema, tipos y respuesta
2. Ejecutar **Recorrer y verificar contrato de entrada y salida**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa casos válidos e inválidos frente al schema y cita una marca visible. ¿Qué decisión sobre contrato de entrada y salida está respaldada por las tres etapas?
- **Transferencia:** Observa casos válidos e inválidos frente al schema y cita una marca visible. ¿Qué debe volver a comprobarse al transferir contrato de entrada y salida a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Contrato de entrada y salida con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Contrato de entrada y salida; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Contrato de entrada y salida; detecta conclusiones que excedan el diseño.
