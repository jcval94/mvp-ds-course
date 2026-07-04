# Paquete: Privacidad

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S04`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Ética y sesgo.
- **Objetivo:** Minimizar campos, acceso y retención según propósito.
- **Definición:** Privacidad limita colección, uso, acceso y retención.
- **Intuición:** El visual hace visible campos, propósito, acceso y retención antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** campos, propósito, acceso y retención.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** retencion_dias, consentimiento_agregado.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. Rogelio explica por voluntad propia qué ajuste necesita y pide no conservar detalles.
2. Ejecutar **Comparar estados de privacidad**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa campos, propósito, acceso y retención y cita una marca visible. ¿Qué conclusión guiada sobre privacidad conserva el alcance?
- **Transferencia:** Observa campos, propósito, acceso y retención y cita una marca visible. ¿Qué exige transferir privacidad a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Privacidad con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Privacidad; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Privacidad; detecta conclusiones que excedan el diseño.
