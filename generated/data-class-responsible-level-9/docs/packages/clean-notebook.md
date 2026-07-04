# Paquete: Notebook limpio

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_9.md`; escena `L9-S12`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 9, Reproducibilidad.
- **Objetivo:** Ejecutar carga, validación, análisis y salida sin estado oculto.
- **Definición:** Un notebook limpio ejecuta de principio a fin sin estado oculto.
- **Intuición:** El visual hace visible pipeline ordenado y verificable antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** pipeline ordenado y verificable.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** periodo_semana, grupo_auditoria_agregado.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. Paco reinicia el análisis y descubre una celda fuera de orden.
2. Ejecutar **Comparar estados de notebook limpio**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa carga, validación, análisis y salida y cita una marca visible. ¿Qué conclusión guiada sobre notebook limpio conserva el alcance?
- **Transferencia:** Observa carga, validación, análisis y salida y cita una marca visible. ¿Qué exige transferir notebook limpio a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Notebook limpio con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Notebook limpio; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Notebook limpio; detecta conclusiones que excedan el diseño.
