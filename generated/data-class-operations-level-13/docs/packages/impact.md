# Paquete: Impacto

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_13.md`; escena `L13-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 13, Respuesta a incidentes.
- **Objetivo:** Registrar afectados, consecuencia, magnitud y duración.
- **Definición:** Impacto registra quién, qué, cuánto y durante cuánto tiempo.
- **Intuición:** El visual hace visible mapa de afectados y consecuencias antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** mapa de afectados y consecuencias.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** alcance, duracion, tipo.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. El error global oculta solicitudes de apoyo afectadas.
2. Ejecutar **Comparar estados de impacto**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa afectados, consecuencia, magnitud y duración y cita una marca visible. ¿Qué conclusión guiada sobre impacto conserva el alcance?
- **Transferencia:** Observa afectados, consecuencia, magnitud y duración y cita una marca visible. ¿Qué exige transferir impacto a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Impacto con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Impacto; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Impacto; detecta conclusiones que excedan el diseño.
