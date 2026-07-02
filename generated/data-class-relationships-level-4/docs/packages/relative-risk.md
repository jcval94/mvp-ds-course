# Paquete: Riesgo relativo

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_4.md`; escena `L4-S14`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 4, Tablas cruzadas.
- **Objetivo:** Dividir dos proporciones comparables.
- **Definición:** El riesgo relativo es la probabilidad en un grupo dividida entre la del referente.
- **Intuición:** La visualización hace visible razón de riesgos antes de resumirlo.
- **Error plausible:** Convertir asociación en causa o ignorar grupos, extremos y denominadores.
- **Mecanismo visual:** razón de riesgos.
- **Estados:** Vista inicial → Comparación completa.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** temperatura_c, espera_mediana_min, pedidos_totales, etapa_operativa y banderas de contexto.
- **Límite:** Las asociaciones describen 48 noches sintéticas y no identifican efectos causales.

## LearningModule

1. Se dividen proporciones de alta demanda.
2. Ejecutar **Revelar riesgo relativo**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa riesgos y referencia de razón 1 y cita una marca visible. ¿Qué lectura de riesgo relativo está respaldada por el incidente guiado?
- **Transferencia:** Observa riesgos y referencia de razón 1 y cita una marca visible. Al transferir riesgo relativo a otro grupo, ¿qué debe conservarse?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Riesgo relativo con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Riesgo relativo; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Riesgo relativo; detecta conclusiones que excedan el diseño.
