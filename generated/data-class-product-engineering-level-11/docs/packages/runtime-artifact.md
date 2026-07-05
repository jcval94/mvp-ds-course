# Paquete: Runtime y artefacto

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S15`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Empaquetado y entornos.
- **Objetivo:** Aplicar runtime y artefacto y justificar una decisión con evidencia verificable.
- **Definición:** Runtime es el entorno de ejecución; un artefacto versionado es la salida promovible del build.
- **Intuición:** El visual separa los estados de capas que separan build, configuración y ejecución para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido runtime y artefacto sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** capas que separan build, configuración y ejecución.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** archivo, runtime, config, artifact.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Fijar puerto, comando, archivos y versión
2. Ejecutar **Recorrer y verificar runtime y artefacto**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa capas de build, artifact, config y runtime y cita una marca visible. ¿Qué decisión sobre runtime y artefacto está respaldada por las tres etapas?
- **Transferencia:** Observa capas de build, artifact, config y runtime y cita una marca visible. ¿Qué debe volver a comprobarse al transferir runtime y artefacto a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Runtime y artefacto con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Runtime y artefacto; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Runtime y artefacto; detecta conclusiones que excedan el diseño.
