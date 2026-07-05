# Paquete: Audiencia

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Comunicación.
- **Objetivo:** Adaptar detalle y lenguaje sin alterar la evidencia.
- **Definición:** La audiencia determina contexto, lenguaje y acción necesaria.
- **Intuición:** El visual hace visible capas de detalle por audiencia antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** capas de detalle por audiencia.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales.
- **Variables:** grupo_auditoria_agregado, espera_mediana_min.
- **Límite:** Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.

## LearningModule

1. El mismo hallazgo debe servir a Don Juan, al turno y a una revisión.
2. Ejecutar **Comparar estados de audiencia**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa capas de detalle por audiencia y cita una marca visible. ¿Qué conclusión guiada sobre audiencia conserva el alcance?
- **Transferencia:** Observa capas de detalle por audiencia y cita una marca visible. ¿Qué exige transferir audiencia a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Audiencia con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Audiencia; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Audiencia; detecta conclusiones que excedan el diseño.
