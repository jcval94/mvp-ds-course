# Paquete: Pipeline CI

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S16`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Integración y entrega continua.
- **Objetivo:** Aplicar pipeline ci y justificar una decisión con evidencia verificable.
- **Definición:** CI integra cambios frecuentemente mediante jobs automatizados y reproducibles.
- **Intuición:** El visual separa los estados de commit que activa jobs reproducibles y deja evidencia para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido pipeline ci sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** commit que activa jobs reproducibles y deja evidencia.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** commit, job, check, evidencia.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Commit dispara lint y tests
2. Ejecutar **Recorrer y verificar pipeline ci**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa commit, jobs, checks y evidencia y cita una marca visible. ¿Qué decisión sobre pipeline ci está respaldada por las tres etapas?
- **Transferencia:** Observa commit, jobs, checks y evidencia y cita una marca visible. ¿Qué debe volver a comprobarse al transferir pipeline ci a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Pipeline CI con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Pipeline CI; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Pipeline CI; detecta conclusiones que excedan el diseño.
