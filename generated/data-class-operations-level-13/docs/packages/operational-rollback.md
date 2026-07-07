# Paquete: Rollback operativo

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_13.md`; escena `L13-S11`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 13, Respuesta a incidentes.
- **Objetivo:** Ejecutar reversión con responsables y comprobación.
- **Definición:** Rollback operativo sigue pasos, responsables y verificación.
- **Intuición:** El visual hace visible línea de tiempo de reversión antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** línea de tiempo de reversión.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** incidente_id, accion, comprobacion.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. El incidente INC-04 obliga a volver a r2.
2. Ejecutar **Comparar estados de rollback operativo**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa pasos, responsables y comprobación y cita una marca visible. ¿Qué conclusión guiada sobre rollback operativo conserva el alcance?
- **Transferencia:** Observa pasos, responsables y comprobación y cita una marca visible. ¿Qué exige transferir rollback operativo a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Rollback operativo con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Rollback operativo; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Rollback operativo; detecta conclusiones que excedan el diseño.
