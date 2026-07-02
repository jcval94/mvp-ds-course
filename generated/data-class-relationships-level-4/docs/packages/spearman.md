# Paquete: Spearman

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_4.md`; escena `L4-S08`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 4, Correlación.
- **Objetivo:** Calcular asociación monótona con rangos.
- **Definición:** Spearman aplica Pearson a los rangos de los valores.
- **Intuición:** La visualización hace visible orden relativo por rangos antes de resumirlo.
- **Error plausible:** Convertir asociación en causa o ignorar grupos, extremos y denominadores.
- **Mecanismo visual:** orden relativo por rangos.
- **Estados:** Vista inicial → Comparación completa.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** temperatura_c, espera_mediana_min, pedidos_totales, etapa_operativa y banderas de contexto.
- **Límite:** Las asociaciones describen 48 noches sintéticas y no identifican efectos causales.

## LearningModule

1. Los valores se convierten a rangos.
2. Ejecutar **Revelar spearman**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** ¿Qué lectura de spearman está respaldada por el incidente guiado?
- **Transferencia:** Al transferir spearman a otro grupo, ¿qué debe conservarse?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Spearman con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Spearman; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Spearman; detecta conclusiones que excedan el diseño.
