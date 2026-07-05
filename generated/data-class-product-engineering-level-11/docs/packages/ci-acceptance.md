# Paquete: Test/build gate y secrets

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S17`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Integración y entrega continua.
- **Objetivo:** Aplicar test/build gate y secrets y justificar una decisión con evidencia verificable.
- **Definición:** Un gate bloquea el avance cuando lint, tests, build o política incumplen criterios.
- **Intuición:** El visual separa los estados de fallo que detiene el artifact y expone alcance del diff para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido test/build gate y secrets sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** fallo que detiene el artifact y expone alcance del diff.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** diff, criterio, test, artifact.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Introducir fallo y detener build antes del artifact
2. Ejecutar **Recorrer y verificar test/build gate y secrets**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa diff, criterio, test y artifact bloqueado y cita una marca visible. ¿Qué decisión sobre test/build gate y secrets está respaldada por las tres etapas?
- **Transferencia:** Observa diff, criterio, test y artifact bloqueado y cita una marca visible. ¿Qué debe volver a comprobarse al transferir test/build gate y secrets a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Test/build gate y secrets con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Test/build gate y secrets; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Test/build gate y secrets; detecta conclusiones que excedan el diseño.
