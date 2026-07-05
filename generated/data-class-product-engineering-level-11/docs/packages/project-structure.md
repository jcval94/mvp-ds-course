# Paquete: Estructura y responsabilidades

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S03`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Del notebook al proyecto.
- **Objetivo:** Aplicar estructura y responsabilidades y justificar una decisión con evidencia verificable.
- **Definición:** Una estructura de proyecto separa responsabilidades para probar y cambiar piezas de forma aislada.
- **Intuición:** El visual separa los estados de celdas mezcladas que se separan en fronteras comprobables para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido estructura y responsabilidades sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** celdas mezcladas que se separan en fronteras comprobables.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** componente, responsabilidad, entrada, salida.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Separar carga, validación, transformación, predicción y salida
2. Ejecutar **Recorrer y verificar estructura y responsabilidades**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa componentes y fronteras de responsabilidad y cita una marca visible. ¿Qué decisión sobre estructura y responsabilidades está respaldada por las tres etapas?
- **Transferencia:** Observa componentes y fronteras de responsabilidad y cita una marca visible. ¿Qué debe volver a comprobarse al transferir estructura y responsabilidades a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Estructura y responsabilidades con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Estructura y responsabilidades; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Estructura y responsabilidades; detecta conclusiones que excedan el diseño.
