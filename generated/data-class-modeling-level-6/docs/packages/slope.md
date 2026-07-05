# Paquete: Pendiente

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S02`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Regresión lineal.
- **Objetivo:** Interpretar cambio ajustado con unidades.
- **Definición:** La pendiente es cambio ajustado en la salida por unidad de entrada.
- **Intuición:** El visual revela cambio vertical por unidad horizontal y conserva cada noche observada.
- **Error plausible:** Presentar ajuste en muestra como desempeño futuro, causalidad o decisión automática.
- **Mecanismo visual:** cambio vertical por unidad horizontal.
- **Estados:** Entrada documentada → Resultado reproducible.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** kg de inventario y pedidos.
- **Límite:** Ajuste descriptivo dentro de 64 noches; train/test, métricas y generalización pertenecen a Nivel 7.

## LearningModule

1. Se mueve inventario una unidad.
2. Ejecutar **Revelar pendiente**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa triángulo subida/avance y cita una marca visible. ¿Qué conclusión guiada sobre pendiente respeta el momento de decisión?
- **Transferencia:** Observa triángulo subida/avance y cita una marca visible. ¿Qué debe cambiar al transferir pendiente a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Pendiente con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Pendiente; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Pendiente; detecta conclusiones que excedan el diseño.
