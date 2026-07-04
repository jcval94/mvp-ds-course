# Paquete: Audit log

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_10.md`; escena `L10-S15`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 10, Entrega responsable.
- **Objetivo:** Registrar evento, momento, actor, versión y motivo con integridad.
- **Definición:** Un audit log registra qué ocurrió, cuándo, quién y por qué.
- **Intuición:** El visual hace visible cadena reconstruible de cambios antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** cadena reconstruible de cambios.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona.
- **Variables:** snapshot_id, fecha, version_datos, version_regla.
- **Límite:** Los tableros son estáticos y educativos: toda alerta requiere revisión humana; no hay backend, despliegue real ni decisión automática.

## LearningModule

1. El equipo reconstruye la reversión sin sobrescribir entradas.
2. Ejecutar **Comparar estados de audit log**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa evento, momento, actor, versión y motivo y cita una marca visible. ¿Qué conclusión guiada sobre audit log conserva el alcance?
- **Transferencia:** Observa evento, momento, actor, versión y motivo y cita una marca visible. ¿Qué exige transferir audit log a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Audit log con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Audit log; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Audit log; detecta conclusiones que excedan el diseño.
