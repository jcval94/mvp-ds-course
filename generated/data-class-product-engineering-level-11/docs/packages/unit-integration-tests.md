# Paquete: Unit e integration tests

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S07`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Testing para datos y ML.
- **Objetivo:** Aplicar unit e integration tests y justificar una decisión con evidencia verificable.
- **Definición:** Un unit test aísla una unidad; un integration test verifica fronteras entre componentes reales.
- **Intuición:** El visual separa los estados de alcance aislado y fronteras reales por tipo de test para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido unit e integration tests sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** alcance aislado y fronteras reales por tipo de test.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** test, componente, frontera, resultado.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Probar una transformación sola y luego el flujo con archivo
2. Ejecutar **Recorrer y verificar unit e integration tests**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa unidades y fronteras cubiertas y cita una marca visible. ¿Qué decisión sobre unit e integration tests está respaldada por las tres etapas?
- **Transferencia:** Observa unidades y fronteras cubiertas y cita una marca visible. ¿Qué debe volver a comprobarse al transferir unit e integration tests a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Unit e integration tests con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Unit e integration tests; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Unit e integration tests; detecta conclusiones que excedan el diseño.
