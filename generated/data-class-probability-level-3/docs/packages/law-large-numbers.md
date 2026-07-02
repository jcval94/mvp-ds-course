# Paquete: Ley de los grandes números

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S11`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Muestreo.
- **Objetivo:** Interpretar cómo el promedio muestral se estabiliza al crecer n.
- **Definición:** La ley de los grandes números dice que el promedio muestral tiende a acercarse al promedio poblacional al aumentar n.
- **Intuición:** Es ver una línea nerviosa que se calma conforme acumula más observaciones.
- **Error plausible:** Creer que garantiza resultados exactos en muestras pequeñas.
- **Mecanismo visual:** trayectoria acumulada hacia una referencia.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. La media acumulada se estabiliza.
2. Ejecutar **Acumular observaciones**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Incidente guiado de Ley de los grandes números: ¿Qué patrón ilustra la ley de los grandes números?
- **Transferencia:** Incidente de transferencia de Ley de los grandes números: ¿Qué NO promete esta ley?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Ley de los grandes números con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Ley de los grandes números; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Ley de los grandes números; detecta conclusiones que excedan el diseño.
