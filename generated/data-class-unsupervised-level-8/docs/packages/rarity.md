# Paquete: Rareza

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_8.md`; escena `L8-S08`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 8, Detección de anomalías.
- **Objetivo:** Medir separación respecto de una vecindad.
- **Definición:** Rareza describe cuán poco común es una observación bajo variables y referencia definidas.
- **Intuición:** El visual hace visible distancia a centro y vecinos antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** distancia a centro y vecinos.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche operativa, nunca una persona.
- **Variables:** distancia_centro, variables_estandarizadas.
- **Límite:** Clusters y anomalías son hipótesis para revisión humana; no prueban tipos naturales, fraude ni causalidad.

## LearningModule

1. Dos noches quedan lejos del resto.
2. Ejecutar **Comparar estados de rareza**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa vecindad de una noche rara y cita una marca visible. ¿Qué conclusión guiada sobre rareza conserva el alcance?
- **Transferencia:** Observa vecindad de una noche rara y cita una marca visible. ¿Qué exige transferir rareza a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Rareza con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Rareza; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Rareza; detecta conclusiones que excedan el diseño.
