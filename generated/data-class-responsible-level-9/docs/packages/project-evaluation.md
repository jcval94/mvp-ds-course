# Paquete: Evaluación del proyecto

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S16`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Mini-proyecto.
- **Objetivo:** Contrastar aceptación, fallos, privacidad y subgrupos.
- **Definición:** Evaluar contrasta aceptación y casos de fallo.
- **Intuición:** El visual hace visible tarjeta de criterios y fallos antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** tarjeta de criterios y fallos.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** grupo_auditoria_agregado, espera_mediana_min.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. El promedio cumple pero un grupo conserva espera alta.
2. Ejecutar **Comparar estados de evaluación del proyecto**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa criterios, fallos y límites y cita una marca visible. ¿Qué conclusión guiada sobre evaluación del proyecto conserva el alcance?
- **Transferencia:** Observa criterios, fallos y límites y cita una marca visible. ¿Qué exige transferir evaluación del proyecto a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Evaluación del proyecto con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Evaluación del proyecto; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Evaluación del proyecto; detecta conclusiones que excedan el diseño.
