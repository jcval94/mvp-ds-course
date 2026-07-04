# Paquete: Umbral de alerta

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S08`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Monitoreo.
- **Objetivo:** Combinar banda, persistencia, dueño y acción.
- **Definición:** Una alerta combina umbral, duración y acción.
- **Intuición:** El visual hace visible banda, persistencia y escalamiento antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** banda, persistencia y escalamiento.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** brecha_calibracion, alerta_persistente.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; no hay backend, despliegue real ni decisión automática.

## LearningModule

1. Variaciones aisladas generan ruido hasta exigir tres cortes.
2. Ejecutar **Comparar estados de umbral de alerta**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa banda, persistencia y escalamiento y cita una marca visible. ¿Qué conclusión guiada sobre umbral de alerta conserva el alcance?
- **Transferencia:** Observa banda, persistencia y escalamiento y cita una marca visible. ¿Qué exige transferir umbral de alerta a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Umbral de alerta con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Umbral de alerta; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Umbral de alerta; detecta conclusiones que excedan el diseño.
