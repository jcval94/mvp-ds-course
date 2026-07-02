# Paquete: Independencia

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S03`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Probabilidad básica.
- **Objetivo:** Comparar probabilidades marginales y condicionadas para evaluar independencia.
- **Definición:** Dos eventos son independientes si saber que uno ocurrió no cambia la probabilidad del otro.
- **Intuición:** Es comparar una tasa global contra la tasa dentro de un filtro.
- **Error plausible:** Declarar independencia solo porque dos variables se ven distintas.
- **Mecanismo visual:** comparación de tasa marginal y condicionada.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es un pedido.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se comparan tasas con y sin encargo programado.
2. Ejecutar **Comparar tasas**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa celdas y tasas condicionadas y cita una marca visible. Incidente guiado de Independencia: ¿Qué evidencia contradice independencia entre especie e isla?
- **Transferencia:** Observa celdas y tasas condicionadas y cita una marca visible. Incidente de transferencia de Independencia: ¿Qué conclusión prudente permite la comparación?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Independencia con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Independencia; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Independencia; detecta conclusiones que excedan el diseño.
