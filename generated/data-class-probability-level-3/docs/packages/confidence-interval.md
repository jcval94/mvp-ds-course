# Paquete: Intervalo de confianza

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S13`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Incertidumbre.
- **Objetivo:** Comunicar una estimación con un rango de incertidumbre bajo un método.
- **Definición:** Un intervalo de confianza es un rango construido por un procedimiento que captura el parámetro en cierta proporción de repeticiones.
- **Intuición:** Es una red lanzada por un método; no una promesa sobre una red específica.
- **Error plausible:** Decir que hay 95% de probabilidad de que el parámetro fijo esté dentro del intervalo observado.
- **Mecanismo visual:** ancho de un rango sobre una escala común.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se construyen rangos de confianza.
2. Ejecutar **Abrir intervalo**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa intervalos repetidos y cita una marca visible. Incidente guiado de Intervalo de confianza: ¿Qué interpretación es correcta para un intervalo del 95%?
- **Transferencia:** Observa intervalos repetidos y cita una marca visible. Incidente de transferencia de Intervalo de confianza: ¿Qué hace un nivel de confianza más alto si n se mantiene?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Intervalo de confianza con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Intervalo de confianza; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Intervalo de confianza; detecta conclusiones que excedan el diseño.
