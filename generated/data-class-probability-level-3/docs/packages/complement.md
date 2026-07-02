# Paquete: Complemento

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S02`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Probabilidad básica.
- **Objetivo:** Interpretar el complemento como todo lo que no pertenece al evento.
- **Definición:** El complemento de un evento reúne los resultados donde el evento no ocurre.
- **Intuición:** Es apagar lo seleccionado y mirar todo lo que quedó afuera.
- **Error plausible:** Sumar evento y complemento sin cubrir todo el espacio o contarlos dos veces.
- **Mecanismo visual:** partición exhaustiva y sin traslape.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es un pedido.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se separan pedidos para llevar y consumo aquí.
2. Ejecutar **Mostrar complemento**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa partición completa y cita una marca visible. Incidente guiado de Complemento: Si el evento es 'Adelie', ¿qué representa el complemento?
- **Transferencia:** Observa partición completa y cita una marca visible. Incidente de transferencia de Complemento: ¿Qué debe cumplirse para usar P(no A) = 1 - P(A)?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Complemento con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Complemento; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Complemento; detecta conclusiones que excedan el diseño.
