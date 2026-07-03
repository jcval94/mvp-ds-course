# Paquete: Ventanas temporales

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_8.md`; escena `L8-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 8, Validación temporal.
- **Objetivo:** Definir qué pasado está disponible en cada corte.
- **Definición:** Una ventana temporal selecciona observaciones anteriores a un corte.
- **Intuición:** El visual hace visible ventana deslizante o expansiva antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** ventana deslizante o expansiva.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche ordenada o una asignación experimental, según el bloque.
- **Variables:** fecha, corte, horizonte.
- **Límite:** El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.

## LearningModule

1. El borde del historial avanza.
2. Ejecutar **Comparar estados de ventanas temporales**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa ventana y corte temporal y cita una marca visible. ¿Qué conclusión guiada sobre ventanas temporales conserva el alcance?
- **Transferencia:** Observa ventana y corte temporal y cita una marca visible. ¿Qué exige transferir ventanas temporales a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Ventanas temporales con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Ventanas temporales; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Ventanas temporales; detecta conclusiones que excedan el diseño.
