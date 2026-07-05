# Paquete: Model card

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S13`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Entrega responsable.
- **Objetivo:** Documentar propósito, datos, métricas, usos y límites.
- **Definición:** Una model card documenta propósito, datos, métricas y límites.
- **Intuición:** El visual hace visible tarjeta de propósito y límites antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** tarjeta de propósito y límites.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** version_datos, version_regla.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. Paco resume el procedimiento para quien lo reciba.
2. Ejecutar **Comparar estados de model card**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa propósito, datos, métricas y límites y cita una marca visible. ¿Qué conclusión guiada sobre model card conserva el alcance?
- **Transferencia:** Observa propósito, datos, métricas y límites y cita una marca visible. ¿Qué exige transferir model card a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Model card con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Model card; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Model card; detecta conclusiones que excedan el diseño.
