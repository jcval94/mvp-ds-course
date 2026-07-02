# Paquete: Ajuste

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S01`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Regresión lineal.
- **Objetivo:** Ajustar una recta descriptiva conservando puntos y errores.
- **Definición:** Ajustar estima parámetros que acercan predicciones a resultados observados.
- **Intuición:** El visual revela recta estimada sobre observaciones y conserva cada noche observada.
- **Error plausible:** Presentar ajuste en muestra como desempeño futuro, causalidad o decisión automática.
- **Mecanismo visual:** recta estimada sobre observaciones.
- **Estados:** Entrada documentada → Resultado reproducible.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** inventario_carne_kg → pedidos_totales.
- **Límite:** Ajuste descriptivo dentro de 64 noches; train/test, métricas y generalización pertenecen a Nivel 6.

## LearningModule

1. Una recta resume inventario y pedidos.
2. Ejecutar **Revelar ajuste**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa puntos y recta ajustada y cita una marca visible. ¿Qué conclusión guiada sobre ajuste respeta el momento de decisión?
- **Transferencia:** Observa puntos y recta ajustada y cita una marca visible. ¿Qué debe cambiar al transferir ajuste a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Ajuste con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Ajuste; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Ajuste; detecta conclusiones que excedan el diseño.
