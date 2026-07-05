# Paquete: Funciones de ventana

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S09`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, SQL analítico y tiempo.
- **Objetivo:** Aplicar funciones de ventana y justificar una decisión con evidencia verificable.
- **Definición:** Una función de ventana calcula sobre un grupo sin colapsar sus filas.
- **Intuición:** El visual separa los estados de particiones que conservan filas y añaden orden para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido funciones de ventana sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** particiones que conservan filas y añaden orden.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** particion, orden, fila, rango.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Numerar turnos por noche con `PARTITION BY` y `ROW_NUMBER`
2. Ejecutar **Recorrer y verificar funciones de ventana**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa particiones, orden y filas conservadas y cita una marca visible. ¿Qué decisión sobre funciones de ventana está respaldada por las tres etapas?
- **Transferencia:** Observa particiones, orden y filas conservadas y cita una marca visible. ¿Qué debe volver a comprobarse al transferir funciones de ventana a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Funciones de ventana con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Funciones de ventana; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Funciones de ventana; detecta conclusiones que excedan el diseño.
