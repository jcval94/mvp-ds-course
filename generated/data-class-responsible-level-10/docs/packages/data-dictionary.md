# Paquete: Diccionario de datos

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S11`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Reproducibilidad.
- **Objetivo:** Definir unidad, tipo, origen, disponibilidad y límites.
- **Definición:** Un diccionario define significado, tipo, origen y límites.
- **Intuición:** El visual hace visible mapa semántico de campos antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** mapa semántico de campos.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** elegibles, ofrecidos, completados.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. El campo ofrecidos se confunde con completados.
2. Ejecutar **Comparar estados de diccionario de datos**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa unidad, campo, tipo, origen y límite y cita una marca visible. ¿Qué conclusión guiada sobre diccionario de datos conserva el alcance?
- **Transferencia:** Observa unidad, campo, tipo, origen y límite y cita una marca visible. ¿Qué exige transferir diccionario de datos a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Diccionario de datos con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Diccionario de datos; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Diccionario de datos; detecta conclusiones que excedan el diseño.
