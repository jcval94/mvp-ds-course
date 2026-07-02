# Paquete: Evento

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S01`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Probabilidad básica.
- **Objetivo:** Identificar un evento como subconjunto de resultados posibles.
- **Definición:** Un evento es una condición que puede ocurrir o no para cada observación.
- **Intuición:** Es una etiqueta que ilumina solo las filas que cumplen una regla.
- **Error plausible:** Confundir el evento con una fila individual o con toda la tabla.
- **Mecanismo visual:** subconjunto dentro de un espacio muestral.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es un pedido.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se marca qué pedidos fueron para llevar.
2. Ejecutar **Marcar evento**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa unidades seleccionadas y cita una marca visible. Incidente guiado de Evento: ¿Qué convierte a 'especie Adelie' en un evento?
- **Transferencia:** Observa unidades seleccionadas y cita una marca visible. Incidente de transferencia de Evento: Si cambias la regla del evento, ¿qué debe cambiar en la evidencia?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Evento con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Evento; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Evento; detecta conclusiones que excedan el diseño.
