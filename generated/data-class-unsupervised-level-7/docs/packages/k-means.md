# Paquete: K-means

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_7.md`; escena `L7-S02`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 7, Clustering.
- **Objetivo:** Recorrer asignación y actualización de centros.
- **Definición:** K-means alterna asignar cada observación al centro cercano y recalcular centros.
- **Intuición:** El visual hace visible iteración asignar-recalcular antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** iteración asignar-recalcular.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche operativa, nunca una persona.
- **Variables:** variables_estandarizadas, cluster.
- **Límite:** Clusters y anomalías son hipótesis para revisión humana; no prueban tipos naturales, fraude ni causalidad.

## LearningModule

1. Tres centros empiezan en noches documentadas.
2. Ejecutar **Comparar estados de k-means**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa asignación y actualización y cita una marca visible. ¿Qué conclusión guiada sobre k-means conserva el alcance?
- **Transferencia:** Observa asignación y actualización y cita una marca visible. ¿Qué exige transferir k-means a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de K-means con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre K-means; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de K-means; detecta conclusiones que excedan el diseño.
