# Paquete: Umbral

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S11`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Clasificación.
- **Objetivo:** Convertir scores en alertas y observar el cambio.
- **Definición:** Un umbral convierte scores en decisiones binarias.
- **Intuición:** El visual revela corte operativo sobre scores y conserva cada noche observada.
- **Error plausible:** Presentar ajuste en muestra como desempeño futuro, causalidad o decisión automática.
- **Mecanismo visual:** corte operativo sobre scores.
- **Estados:** Entrada documentada → Resultado reproducible.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** probabilidad y umbral.
- **Límite:** Ajuste descriptivo dentro de 64 noches; train/test, métricas y generalización pertenecen a Nivel 7.

## LearningModule

1. Se mueve el corte de alerta.
2. Ejecutar **Revelar umbral**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa distribución y umbral y cita una marca visible. ¿Qué conclusión guiada sobre umbral respeta el momento de decisión?
- **Transferencia:** Observa distribución y umbral y cita una marca visible. ¿Qué debe cambiar al transferir umbral a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Umbral con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Umbral; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Umbral; detecta conclusiones que excedan el diseño.
