# Paquete: Causalidad

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_4.md`; escena `L4-S10`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 4, Confusión.
- **Objetivo:** Separar asociación de atribución causal.
- **Definición:** Causalidad exige un contraste y supuestos capaces de identificar un efecto.
- **Intuición:** La visualización hace visible explicaciones alternativas antes de resumirlo.
- **Error plausible:** Convertir asociación en causa o ignorar grupos, extremos y denominadores.
- **Mecanismo visual:** explicaciones alternativas.
- **Estados:** Vista inicial → Comparación completa.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** temperatura_c, espera_mediana_min, pedidos_totales, etapa_operativa y banderas de contexto.
- **Límite:** Las asociaciones describen 48 noches sintéticas y no identifican efectos causales.

## LearningModule

1. Se muestran rutas alternativas.
2. Ejecutar **Revelar causalidad**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** ¿Qué lectura de causalidad está respaldada por el incidente guiado?
- **Transferencia:** Al transferir causalidad a otro grupo, ¿qué debe conservarse?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Causalidad con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Causalidad; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Causalidad; detecta conclusiones que excedan el diseño.
