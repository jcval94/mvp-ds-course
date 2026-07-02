# Paquete: Bootstrap

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S14`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Incertidumbre.
- **Objetivo:** Usar remuestreo con reemplazo para aproximar la incertidumbre de una estadística.
- **Definición:** Bootstrap toma muchas muestras con reemplazo del dataset observado y recalcula la estadística.
- **Intuición:** Es agitar una bolsa de observaciones y volver a sacar con devolución muchas veces.
- **Error plausible:** Creer que bootstrap crea información nueva o corrige una muestra sesgada.
- **Mecanismo visual:** remuestreo con reemplazo y distribución de estadísticas.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se remuestrean noches con reemplazo.
2. Ejecutar **Remuestrear**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa distribución de remuestras y cita una marca visible. Incidente guiado de Bootstrap: ¿Qué produce una corrida bootstrap?
- **Transferencia:** Observa distribución de remuestras y cita una marca visible. Incidente de transferencia de Bootstrap: ¿Qué limitación debe reportarse al usar bootstrap?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Bootstrap con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Bootstrap; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Bootstrap; detecta conclusiones que excedan el diseño.
