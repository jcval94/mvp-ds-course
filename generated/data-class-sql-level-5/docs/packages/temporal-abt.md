# Paquete: ABT temporal

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S12`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Construcción de la tabla analítica.
- **Objetivo:** Aplicar abt temporal y justificar una decisión con evidencia verificable.
- **Definición:** Una Analytical Base Table reúne una unidad por fila, features trazables y target definido.
- **Intuición:** El visual separa los estados de fuentes que terminan en una fila trazable por unidad y corte para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido abt temporal sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** fuentes que terminan en una fila trazable por unidad y corte.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** unidad, fecha_corte, feature, target.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Construir una fila por noche con información disponible antes de abrir
2. Ejecutar **Recorrer y verificar abt temporal**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa fuentes y fila final de la ABT y cita una marca visible. ¿Qué decisión sobre abt temporal está respaldada por las tres etapas?
- **Transferencia:** Observa fuentes y fila final de la ABT y cita una marca visible. ¿Qué debe volver a comprobarse al transferir abt temporal a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de ABT temporal con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre ABT temporal; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de ABT temporal; detecta conclusiones que excedan el diseño.
