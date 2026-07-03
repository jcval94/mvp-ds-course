# Paquete: Calibración

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S20`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Curvas y calibración.
- **Objetivo:** Comparar probabilidades con frecuencias observadas.
- **Definición:** Calibración contrasta scores pronosticados con proporciones observadas.
- **Intuición:** El visual hace visible diagrama de confiabilidad por bandas antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** diagrama de confiabilidad por bandas.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** probabilidad_alta, alta_demanda.
- **Límite:** El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.

## LearningModule

1. Un setenta debería parecerse a siete de diez.
2. Ejecutar **Comparar estados de calibración**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa probabilidad estimada frente a frecuencia y cita una marca visible. ¿Qué conclusión guiada sobre calibración conserva el alcance?
- **Transferencia:** Observa probabilidad estimada frente a frecuencia y cita una marca visible. ¿Qué exige transferir calibración a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Calibración con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Calibración; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Calibración; detecta conclusiones que excedan el diseño.
