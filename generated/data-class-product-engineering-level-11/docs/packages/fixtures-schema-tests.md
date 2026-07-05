# Paquete: Fixtures y tests de schema

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S09`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Testing para datos y ML.
- **Objetivo:** Aplicar fixtures y tests de schema y justificar una decisión con evidencia verificable.
- **Definición:** Una fixture controla entradas repetibles; un schema test verifica estructura antes del cálculo.
- **Intuición:** El visual separa los estados de fixture mínima que cubre schema, nulos y bordes para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido fixtures y tests de schema sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** fixture mínima que cubre schema, nulos y bordes.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** fixture, campo, borde, cobertura.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Preparar datos mínimos y validar columnas
2. Ejecutar **Recorrer y verificar fixtures y tests de schema**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa campos, nulos y bordes cubiertos y cita una marca visible. ¿Qué decisión sobre fixtures y tests de schema está respaldada por las tres etapas?
- **Transferencia:** Observa campos, nulos y bordes cubiertos y cita una marca visible. ¿Qué debe volver a comprobarse al transferir fixtures y tests de schema a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Fixtures y tests de schema con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Fixtures y tests de schema; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Fixtures y tests de schema; detecta conclusiones que excedan el diseño.
