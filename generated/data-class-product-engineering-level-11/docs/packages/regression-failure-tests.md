# Paquete: Regression, golden y failure cases

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S08`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Testing para datos y ML.
- **Objetivo:** Aplicar regression, golden y failure cases y justificar una decisión con evidencia verificable.
- **Definición:** Un regression test protege comportamiento conocido; golden y failure cases hacen explícitas salidas y errores.
- **Intuición:** El visual separa los estados de matriz de comportamiento esperado, regresiones y fallos para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido regression, golden y failure cases sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** matriz de comportamiento esperado, regresiones y fallos.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** caso, esperado, actual, resultado.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Fijar salida esperada y entradas inválidas
2. Ejecutar **Recorrer y verificar regression, golden y failure cases**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa casos esperados, actuales y fallidos y cita una marca visible. ¿Qué decisión sobre regression, golden y failure cases está respaldada por las tres etapas?
- **Transferencia:** Observa casos esperados, actuales y fallidos y cita una marca visible. ¿Qué debe volver a comprobarse al transferir regression, golden y failure cases a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Regression, golden y failure cases con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Regression, golden y failure cases; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Regression, golden y failure cases; detecta conclusiones que excedan el diseño.
