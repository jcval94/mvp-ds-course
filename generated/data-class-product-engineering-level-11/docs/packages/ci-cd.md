# Paquete: CI frente a CD

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S18`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Integración y entrega continua.
- **Objetivo:** Aplicar ci frente a cd y justificar una decisión con evidencia verificable.
- **Definición:** CI valida e integra; CD automatiza entrega o despliegue bajo una política explícita.
- **Intuición:** El visual separa los estados de artifact verificado que espera autorización de entrega para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido ci frente a cd sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** artifact verificado que espera autorización de entrega.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** artifact, gate, autorizacion, deploy.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Separar artifact verificado de autorización de deploy
2. Ejecutar **Recorrer y verificar ci frente a cd**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa artifact verificado y autorización de entrega y cita una marca visible. ¿Qué decisión sobre ci frente a cd está respaldada por las tres etapas?
- **Transferencia:** Observa artifact verificado y autorización de entrega y cita una marca visible. ¿Qué debe volver a comprobarse al transferir ci frente a cd a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de CI frente a CD con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre CI frente a CD; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de CI frente a CD; detecta conclusiones que excedan el diseño.
