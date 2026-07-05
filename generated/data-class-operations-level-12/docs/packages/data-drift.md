# Paquete: Data drift

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Monitoreo.
- **Objetivo:** Comparar entradas actuales con una referencia versionada.
- **Definición:** Data drift es cambio en entradas respecto de referencia.
- **Intuición:** El visual hace visible distribuciones de referencia y periodo actual antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** distribuciones de referencia y periodo actual.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** fase, pedidos_totales.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.

## LearningModule

1. Los pedidos suben después de la apertura del local.
2. Ejecutar **Comparar estados de data drift**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa distribuciones de referencia y periodo actual y cita una marca visible. ¿Qué conclusión guiada sobre data drift conserva el alcance?
- **Transferencia:** Observa distribuciones de referencia y periodo actual y cita una marca visible. ¿Qué exige transferir data drift a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Data drift con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Data drift; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Data drift; detecta conclusiones que excedan el diseño.
