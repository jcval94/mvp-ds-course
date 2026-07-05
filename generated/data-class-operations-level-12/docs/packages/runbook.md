# Paquete: Runbook

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S14`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Entrega responsable.
- **Objetivo:** Convertir señales en pasos verificables y escalamiento.
- **Definición:** Un runbook convierte una condición en pasos verificables.
- **Intuición:** El visual hace visible flujo de señal, acción, detención y ayuda antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** flujo de señal, acción, detención y ayuda.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** alerta_persistente, procedimiento_activo.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. Nora ensaya la alerta sin depender de Paco.
2. Ejecutar **Comparar estados de runbook**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa señal, acción, detención y escalamiento y cita una marca visible. ¿Qué conclusión guiada sobre runbook conserva el alcance?
- **Transferencia:** Observa señal, acción, detención y escalamiento y cita una marca visible. ¿Qué exige transferir runbook a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Runbook con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Runbook; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Runbook; detecta conclusiones que excedan el diseño.
