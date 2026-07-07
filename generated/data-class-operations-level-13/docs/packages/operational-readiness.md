# Paquete: Readiness operativo

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_13.md`; escena `L13-S01`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `PlantGrowth · R datasets`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 13, Readiness operativo.
- **Objetivo:** Decidir si un sistema de IA trazable puede entrar en operación bajo límites explícitos.
- **Definición:** Readiness operativo contrasta sistema, baseline, privacidad, autoridad y reversibilidad antes de activar.
- **Intuición:** El visual hace visible gate operativo sobre un sistema trazable existente antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** gate operativo sobre un sistema trazable existente.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** aprobacion_humana, procedimiento_activo.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. El equipo recibe `sistema_ia_trazable@L12.H1` y revisa si puede encenderlo sin modificar su diseño.
2. Ejecutar **Comparar estados de readiness operativo**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa gate aprobado o procedimiento apagado y cita una marca visible. ¿Qué conclusión guiada sobre readiness operativo conserva el alcance?
- **Transferencia:** Observa gate aprobado o procedimiento apagado y cita una marca visible. ¿Qué exige transferir readiness operativo a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://stat.ethz.ch/R-manual/R-patched/library/datasets/html/PlantGrowth.html · GPL-2 | GPL-3.
- **Fecha/hash:** 2026-07-03 · `46601db1bbb7c2b33d526658a355faaaa08bb4ef55e2aaa31f6390ed379a09ee`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Readiness operativo con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Readiness operativo; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Readiness operativo; detecta conclusiones que excedan el diseño.
