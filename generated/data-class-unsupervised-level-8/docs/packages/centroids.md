# Paquete: Centroides

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_8.md`; escena `L8-S03`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 8, Clustering.
- **Objetivo:** Interpretar centros como promedios del grupo.
- **Definición:** Un centroide es el vector promedio de las observaciones asignadas.
- **Intuición:** El visual hace visible movimiento del promedio multivariable antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** movimiento del promedio multivariable.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche operativa, nunca una persona.
- **Variables:** cluster, variables_estandarizadas.
- **Límite:** Clusters y anomalías son hipótesis para revisión humana; no prueban tipos naturales, fraude ni causalidad.

## LearningModule

1. Los centros se mueven al cambiar sus miembros.
2. Ejecutar **Comparar estados de centroides**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa trayectoria de centroides y cita una marca visible. ¿Qué conclusión guiada sobre centroides conserva el alcance?
- **Transferencia:** Observa trayectoria de centroides y cita una marca visible. ¿Qué exige transferir centroides a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Centroides con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Centroides; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Centroides; detecta conclusiones que excedan el diseño.
