# Paquete: Fuerza

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_4.md`; escena `L4-S06`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 4, Correlación.
- **Objetivo:** Comparar qué tan estrecho es un patrón.
- **Definición:** La fuerza describe cercanía de los puntos a un patrón.
- **Intuición:** La visualización hace visible dispersión alrededor del patrón antes de resumirlo.
- **Error plausible:** Convertir asociación en causa o ignorar grupos, extremos y denominadores.
- **Mecanismo visual:** dispersión alrededor del patrón.
- **Estados:** Vista inicial → Comparación completa.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** temperatura_c, espera_mediana_min, pedidos_totales, etapa_operativa y banderas de contexto.
- **Límite:** Las asociaciones describen 48 noches sintéticas y no identifican efectos causales.

## LearningModule

1. Nubes con distinta dispersión quedan lado a lado.
2. Ejecutar **Revelar fuerza**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** ¿Qué lectura de fuerza está respaldada por el incidente guiado?
- **Transferencia:** Al transferir fuerza a otro grupo, ¿qué debe conservarse?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Fuerza con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Fuerza; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Fuerza; detecta conclusiones que excedan el diseño.
