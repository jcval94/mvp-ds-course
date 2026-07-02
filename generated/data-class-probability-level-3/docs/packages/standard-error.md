# Paquete: Error estándar

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S12`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Incertidumbre.
- **Objetivo:** Interpretar el error estándar como variabilidad esperada de una estimación.
- **Definición:** El error estándar describe cuánto varía una estadística entre muestras repetidas.
- **Intuición:** Es la respiración del estimador, no la dispersión de cada individuo.
- **Error plausible:** Confundir desviación estándar de datos con error estándar de una media.
- **Mecanismo visual:** variación de un estimador al cambiar n.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se compara la variación del estimador con 8 y 32 noches.
2. Ejecutar **Cambiar tamaño de muestra**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa intervalos frente a n y cita una marca visible. Incidente guiado de Error estándar: ¿Qué reduce el error estándar de la media?
- **Transferencia:** Observa intervalos frente a n y cita una marca visible. Incidente de transferencia de Error estándar: ¿Qué diferencia clave hay entre DE y error estándar?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Error estándar con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Error estándar; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Error estándar; detecta conclusiones que excedan el diseño.
