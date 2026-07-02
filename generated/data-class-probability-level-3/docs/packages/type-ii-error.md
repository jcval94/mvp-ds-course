# Paquete: Error tipo II

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S18`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Pruebas de hipótesis.
- **Objetivo:** Reconocer el riesgo de falso negativo al no rechazar H0 cuando H1 es cierta.
- **Definición:** Un error tipo II ocurre cuando existe un efecto real pero la prueba no lo detecta.
- **Intuición:** Es no escuchar una alarma baja aunque el problema sí existe.
- **Error plausible:** Interpretar 'no significativo' como prueba de ausencia de efecto.
- **Mecanismo visual:** área no detectada bajo una alternativa.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Una diferencia real no se detecta.
2. Ejecutar **Mostrar falso negativo**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa área beta entre curvas y cita una marca visible. Incidente guiado de Error tipo II: ¿Qué describe un error tipo II?
- **Transferencia:** Observa área beta entre curvas y cita una marca visible. Incidente de transferencia de Error tipo II: ¿Qué significa 'no significativo' con baja potencia?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Error tipo II con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Error tipo II; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Error tipo II; detecta conclusiones que excedan el diseño.
