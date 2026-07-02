# Paquete: Variabilidad muestral

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S09`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Muestreo.
- **Objetivo:** Explicar por qué estimaciones de muestras distintas no coinciden exactamente.
- **Definición:** La variabilidad muestral es el cambio natural de una estadística entre muestras.
- **Intuición:** Es pedir varias cucharadas de la misma olla y no obtener idéntico sabor cada vez.
- **Error plausible:** Tratar una muestra pequeña como si fuera el valor exacto de la población.
- **Mecanismo visual:** distribución de estimaciones entre muestras.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Muestras distintas producen medias distintas.
2. Ejecutar **Tomar muestras**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Incidente guiado de Variabilidad muestral: ¿Por qué las medias de muestra no son idénticas?
- **Transferencia:** Incidente de transferencia de Variabilidad muestral: ¿Qué decisión es prudente con una muestra pequeña y muy alta?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Variabilidad muestral con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Variabilidad muestral; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Variabilidad muestral; detecta conclusiones que excedan el diseño.
