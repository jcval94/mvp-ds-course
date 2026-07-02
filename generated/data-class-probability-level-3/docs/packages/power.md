# Paquete: Potencia

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_3.md`; escena `L3-S19`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 3, Pruebas de hipótesis.
- **Objetivo:** Interpretar potencia como probabilidad de detectar un efecto real bajo condiciones dadas.
- **Definición:** La potencia es la probabilidad de rechazar H0 cuando una alternativa específica es verdadera.
- **Intuición:** Es la sensibilidad del detector cuando el problema sí está presente.
- **Error plausible:** Hablar de potencia sin fijar efecto, variabilidad, alpha y tamaño de muestra.
- **Mecanismo visual:** área detectada bajo una alternativa.
- **Estados:** Antes de comparar → Evidencia revelada.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** pedidos_totales, tacos_vendidos, pedidos_para_llevar y encargo_programado.
- **Límite:** La evidencia es sintética, observacional y no identifica causalidad ni garantiza demanda futura.

## LearningModule

1. Se comparan diseños de 16 y 32 noches.
2. Ejecutar **Aumentar muestra**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa curva de potencia y cita una marca visible. Incidente guiado de Potencia: ¿Qué suele aumentar la potencia?
- **Transferencia:** Observa curva de potencia y cita una marca visible. Incidente de transferencia de Potencia: ¿Qué debe especificarse al reportar potencia?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Potencia con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Potencia; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Potencia; detecta conclusiones que excedan el diseño.
