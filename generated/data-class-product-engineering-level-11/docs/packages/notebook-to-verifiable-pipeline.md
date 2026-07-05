# Paquete: Notebook frente a producción

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S01`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Del notebook al proyecto.
- **Objetivo:** Aplicar notebook frente a producción y justificar una decisión con evidencia verificable.
- **Definición:** Un notebook exploratorio puede depender de estado oculto; producción exige entradas y orden explícitos.
- **Intuición:** El visual separa los estados de dependencias ocultas que se vuelven fronteras y criterios verificables para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido notebook frente a producción sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** dependencias ocultas que se vuelven fronteras y criterios verificables.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** caso, dependencia, comando, resultado.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. La sesión actual funciona; `Run All` falla por variable global y ruta local
2. Ejecutar **Recorrer y verificar notebook frente a producción**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa dependencias ocultas, ejecución limpia, contrato y resultados de tests y cita una marca visible. ¿Qué decisión sobre notebook frente a producción está respaldada por las tres etapas?
- **Transferencia:** Observa dependencias ocultas, ejecución limpia, contrato y resultados de tests y cita una marca visible. ¿Qué debe volver a comprobarse al transferir notebook frente a producción a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Notebook frente a producción con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Notebook frente a producción; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Notebook frente a producción; detecta conclusiones que excedan el diseño.
