# Paquete: Odds

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_4.md`; escena `L4-S15`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 4, Tablas cruzadas.
- **Objetivo:** Distinguir odds de probabilidad.
- **Definición:** Los odds dividen eventos entre no eventos.
- **Intuición:** La visualización hace visible evento frente a no evento antes de resumirlo.
- **Error plausible:** Convertir asociación en causa o ignorar grupos, extremos y denominadores.
- **Mecanismo visual:** evento frente a no evento.
- **Estados:** Vista inicial → Comparación completa.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** temperatura_c, espera_mediana_min, pedidos_totales, etapa_operativa y banderas de contexto.
- **Límite:** Las asociaciones describen 48 noches sintéticas y no identifican efectos causales.

## LearningModule

1. La tabla muestra evento y no evento.
2. Ejecutar **Revelar odds**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** ¿Qué lectura de odds está respaldada por el incidente guiado?
- **Transferencia:** Al transferir odds a otro grupo, ¿qué debe conservarse?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Odds con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Odds; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Odds; detecta conclusiones que excedan el diseño.
