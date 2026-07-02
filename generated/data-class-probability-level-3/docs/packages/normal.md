# Paquete: Normal

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S07`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Variables aleatorias.
- **Objetivo:** Reconocer una distribución continua simétrica como aproximación útil bajo supuestos.
- **Definición:** La normal es una curva continua definida por media y desviación estándar.
- **Intuición:** Es una campana que resume variación alrededor de un centro.
- **Error plausible:** Usar la normal sin revisar forma, escala o si la variable es continua.
- **Mecanismo visual:** forma continua y concentración alrededor del centro.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Medias simuladas de pedidos se concentran.
2. Ejecutar **Comparar campana**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Incidente guiado de Normal: ¿Qué rasgo visual sugiere una aproximación normal razonable?
- **Transferencia:** Incidente de transferencia de Normal: ¿Cuál es el límite correcto al usar la normal aquí?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Normal con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Normal; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Normal; detecta conclusiones que excedan el diseño.
