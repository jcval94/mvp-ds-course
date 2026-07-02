# Paquete: Probabilidad condicional

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S04`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Probabilidad básica.
- **Objetivo:** Calcular una probabilidad dentro de un subconjunto dado.
- **Definición:** La probabilidad condicional restringe el denominador a los casos donde la condición se cumple.
- **Intuición:** Es hacer zoom a una parte de la tabla y recalcular dentro de ella.
- **Error plausible:** Mantener el denominador total después de filtrar por la condición.
- **Mecanismo visual:** contracción explícita del denominador.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es un pedido.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. El universo se contrae a noches con encargo.
2. Ejecutar **Filtrar denominador**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Incidente guiado de Probabilidad condicional: Para P(Adelie | Torgersen), ¿cuál es el denominador correcto?
- **Transferencia:** Incidente de transferencia de Probabilidad condicional: ¿Qué error comete quien usa el total de 344 como denominador después del filtro?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Probabilidad condicional con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Probabilidad condicional; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Probabilidad condicional; detecta conclusiones que excedan el diseño.
