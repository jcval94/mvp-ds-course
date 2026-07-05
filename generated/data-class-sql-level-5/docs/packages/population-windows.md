# Paquete: Población y ventanas

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S11`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Construcción de la tabla analítica.
- **Objetivo:** Aplicar población y ventanas y justificar una decisión con evidencia verificable.
- **Definición:** Una tabla analítica parte de una población y una fecha de observación explícitas.
- **Intuición:** El visual separa los estados de intervalos separados de población, observación, features y target para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido población y ventanas sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** intervalos separados de población, observación, features y target.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** unidad, observacion, feature_start, target_end.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Definir noches elegibles, fecha de observación y ventana objetivo
2. Ejecutar **Recorrer y verificar población y ventanas**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa población y ventanas temporales separadas y cita una marca visible. ¿Qué decisión sobre población y ventanas está respaldada por las tres etapas?
- **Transferencia:** Observa población y ventanas temporales separadas y cita una marca visible. ¿Qué debe volver a comprobarse al transferir población y ventanas a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Población y ventanas con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Población y ventanas; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Población y ventanas; detecta conclusiones que excedan el diseño.
