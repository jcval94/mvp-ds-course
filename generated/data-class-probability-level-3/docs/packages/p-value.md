# Paquete: p-value

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S16`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Pruebas de hipótesis.
- **Objetivo:** Interpretar p-value como rareza de la evidencia bajo una hipótesis nula.
- **Definición:** El p-value es la probabilidad, bajo H0, de observar una estadística al menos tan extrema como la vista.
- **Intuición:** Es medir qué tan lejos cae la evidencia en la cola de un mundo hipotético.
- **Error plausible:** Decir que es la probabilidad de que H0 sea verdadera.
- **Mecanismo visual:** área extrema bajo la distribución nula.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se marca una cola extrema bajo el nulo.
2. Ejecutar **Sombrear cola**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Incidente guiado de p-value: ¿Qué probabilidad representa el p-value?
- **Transferencia:** Incidente de transferencia de p-value: ¿Qué debe acompañar a un p-value pequeño?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de p-value con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre p-value; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de p-value; detecta conclusiones que excedan el diseño.
