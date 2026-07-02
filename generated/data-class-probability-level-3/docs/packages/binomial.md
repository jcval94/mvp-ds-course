# Paquete: Binomial

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S06`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Variables aleatorias.
- **Objetivo:** Interpretar el conteo de éxitos en varios ensayos Bernoulli.
- **Definición:** Una binomial cuenta cuántos éxitos ocurren en n ensayos con la misma probabilidad.
- **Intuición:** Es sumar varias luces de Bernoulli en una sola cuenta.
- **Error plausible:** Tratar una binomial como si fuera un solo día o ignorar n.
- **Mecanismo visual:** conteo de éxitos en n ensayos.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se cuentan éxitos en bloques de ocho noches.
2. Ejecutar **Acumular ensayos**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Incidente guiado de Binomial: ¿Qué cambia al pasar de Bernoulli a Binomial?
- **Transferencia:** Incidente de transferencia de Binomial: Si n aumenta y p se mantiene, ¿qué interpretación del conteo es prudente?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Binomial con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Binomial; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Binomial; detecta conclusiones que excedan el diseño.
