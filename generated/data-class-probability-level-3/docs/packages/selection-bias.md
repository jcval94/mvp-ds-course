# Paquete: Sesgo de selección

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Muestreo.
- **Objetivo:** Detectar cuándo el proceso de selección cambia el grupo observado.
- **Definición:** El sesgo de selección ocurre cuando la muestra sobre-representa ciertos casos.
- **Intuición:** Es preguntar solo a quien pasa por una puerta y creer que hablaste con todo el barrio.
- **Error plausible:** Confundir una muestra grande con una muestra representativa.
- **Mecanismo visual:** cambio del estimando por regla de selección.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Solo noches con encargo elevan el promedio.
2. Ejecutar **Comparar muestra sesgada**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Incidente guiado de Sesgo de selección: ¿Qué evidencia indica sesgo de selección?
- **Transferencia:** Incidente de transferencia de Sesgo de selección: ¿Qué debe reportarse junto con una estimación de muestra sesgada?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Sesgo de selección con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Sesgo de selección; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Sesgo de selección; detecta conclusiones que excedan el diseño.
