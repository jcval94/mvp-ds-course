# Paquete: Versiones

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Reproducibilidad.
- **Objetivo:** Enlazar datos, código, reglas y salidas.
- **Definición:** Versionar enlaza cada salida con entradas y transformaciones.
- **Intuición:** El visual hace visible linaje de datos, código y salida antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** linaje de datos, código y salida.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** periodo_semana, retencion_dias.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. Una regla de agregación cambia entre dos informes.
2. Ejecutar **Comparar estados de versiones**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa linaje de datos, código y salida y cita una marca visible. ¿Qué conclusión guiada sobre versiones conserva el alcance?
- **Transferencia:** Observa linaje de datos, código y salida y cita una marca visible. ¿Qué exige transferir versiones a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Versiones con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Versiones; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Versiones; detecta conclusiones que excedan el diseño.
