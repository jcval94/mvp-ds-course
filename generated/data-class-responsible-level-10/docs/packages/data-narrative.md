# Paquete: Narrativa de datos

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S08`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Comunicación.
- **Objetivo:** Encadenar evidencia, interpretación, decisión y revisión.
- **Definición:** Una narrativa de datos conserva la cadena de evidencia.
- **Intuición:** El visual hace visible evidencia, interpretación y decisión antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** evidencia, interpretación y decisión.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** ofrecidos, completados, espera_mediana_min.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. Paco ordena el informe para que la recomendación no aparezca antes de la evidencia.
2. Ejecutar **Comparar estados de narrativa de datos**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa evidencia, interpretación y decisión y cita una marca visible. ¿Qué conclusión guiada sobre narrativa de datos conserva el alcance?
- **Transferencia:** Observa evidencia, interpretación y decisión y cita una marca visible. ¿Qué exige transferir narrativa de datos a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Narrativa de datos con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Narrativa de datos; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Narrativa de datos; detecta conclusiones que excedan el diseño.
