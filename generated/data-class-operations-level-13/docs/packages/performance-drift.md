# Paquete: Performance drift

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_13.md`; escena `L13-S06`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 13, Monitoreo.
- **Objetivo:** Seguir deterioro con resultados confirmados y retraso explícito.
- **Definición:** Performance drift es deterioro de resultados medidos.
- **Intuición:** El visual hace visible error confirmado a través del tiempo antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** error confirmado a través del tiempo.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** fecha, mae_confirmado, retraso_etiqueta_dias.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. El MAE aumenta, pero las últimas etiquetas tardan siete días.
2. Ejecutar **Comparar estados de performance drift**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa error observado a través del tiempo y cita una marca visible. ¿Qué conclusión guiada sobre performance drift conserva el alcance?
- **Transferencia:** Observa error observado a través del tiempo y cita una marca visible. ¿Qué exige transferir performance drift a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Performance drift con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Performance drift; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Performance drift; detecta conclusiones que excedan el diseño.
