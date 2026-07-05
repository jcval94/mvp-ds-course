# Paquete: Postmortem

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S12`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Respuesta a incidentes.
- **Objetivo:** Reconstruir hechos y mejorar controles sin buscar culpable.
- **Definición:** Un postmortem reconstruye hechos, controles y acciones.
- **Intuición:** El visual hace visible ciclo de hechos, controles y acciones antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** ciclo de hechos, controles y acciones.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** culpa_individual, revision_humana, comprobacion.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. El equipo revisa por qué la alerta temprana no escaló.
2. Ejecutar **Comparar estados de postmortem**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa hechos, controles y acciones sistémicas y cita una marca visible. ¿Qué conclusión guiada sobre postmortem conserva el alcance?
- **Transferencia:** Observa hechos, controles y acciones sistémicas y cita una marca visible. ¿Qué exige transferir postmortem a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Postmortem con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Postmortem; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Postmortem; detecta conclusiones que excedan el diseño.
