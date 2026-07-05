# Paquete: Rezagos y fecha de corte

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, SQL analítico y tiempo.
- **Objetivo:** Aplicar rezagos y fecha de corte y justificar una decisión con evidencia verificable.
- **Definición:** `LAG/LEAD` desplazan observaciones; la disponibilidad temporal decide si una variable es válida.
- **Intuición:** El visual separa los estados de rezagos permitidos y futuro bloqueado por el corte para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido rezagos y fecha de corte sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** rezagos permitidos y futuro bloqueado por el corte.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** fecha, lag, lead, corte.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Comparar ventas previas con `LAG` y bloquear `LEAD` al decidir inventario
2. Ejecutar **Recorrer y verificar rezagos y fecha de corte**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa línea temporal, rezagos y corte y cita una marca visible. ¿Qué decisión sobre rezagos y fecha de corte está respaldada por las tres etapas?
- **Transferencia:** Observa línea temporal, rezagos y corte y cita una marca visible. ¿Qué debe volver a comprobarse al transferir rezagos y fecha de corte a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Rezagos y fecha de corte con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Rezagos y fecha de corte; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Rezagos y fecha de corte; detecta conclusiones que excedan el diseño.
