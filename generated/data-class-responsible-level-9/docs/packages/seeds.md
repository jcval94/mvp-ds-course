# Paquete: Semillas

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S09`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Reproducibilidad.
- **Objetivo:** Repetir aleatoriedad computacional y probar sensibilidad.
- **Definición:** Una semilla fija aleatoriedad computacional reproducible.
- **Intuición:** El visual hace visible ejecuciones repetidas con semilla antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** ejecuciones repetidas con semilla.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** periodo_semana, grupo_auditoria_agregado.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. Paco reproduce el muestreo del reporte.
2. Ejecutar **Comparar estados de semillas**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa ejecuciones repetidas con semilla y cita una marca visible. ¿Qué conclusión guiada sobre semillas conserva el alcance?
- **Transferencia:** Observa ejecuciones repetidas con semilla y cita una marca visible. ¿Qué exige transferir semillas a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Semillas con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Semillas; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Semillas; detecta conclusiones que excedan el diseño.
