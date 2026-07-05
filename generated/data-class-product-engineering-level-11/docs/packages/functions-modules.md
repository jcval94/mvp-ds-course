# Paquete: Funciones y módulos

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S04`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Código modular y contratos.
- **Objetivo:** Aplicar funciones y módulos y justificar una decisión con evidencia verificable.
- **Definición:** Una función modular declara entradas, salida y efectos; un módulo agrupa responsabilidades coherentes.
- **Intuición:** El visual separa los estados de función pura frente a dependencia de estado global para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido funciones y módulos sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** función pura frente a dependencia de estado global.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** input, funcion, output, efecto.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Extraer transformaciones puras del notebook
2. Ejecutar **Recorrer y verificar funciones y módulos**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa input, función, output y efectos y cita una marca visible. ¿Qué decisión sobre funciones y módulos está respaldada por las tres etapas?
- **Transferencia:** Observa input, función, output y efectos y cita una marca visible. ¿Qué debe volver a comprobarse al transferir funciones y módulos a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Funciones y módulos con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Funciones y módulos; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Funciones y módulos; detecta conclusiones que excedan el diseño.
