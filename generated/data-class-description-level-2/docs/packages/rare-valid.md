# Paquete: Caso raro válido

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Wine Quality · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `rare-valid`.
- **Bloque:** Valores atípicos.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** distribuciones, cuartiles, scatterplots y validación de dominio.
- **Concepto anterior:** Error de captura.
- **Concepto siguiente:** Probabilidad, muestreo e incertidumbre.
- **Objetivo:** Conservar observaciones raras que son plausibles, verificadas y relevantes.
- **Definición:** Un caso raro válido es infrecuente pero consistente con el dominio y el proceso de medición.
- **Intuición:** Puede ser una excepción valiosa que amplía lo que sabemos del sistema.
- **Error común:** Normalizarlo o excluirlo solo para obtener una gráfica más limpia.
- **Visual:** Abre metadatos de un vino extremo y contrasta varias variables relacionadas.
- **Interacción:** Revisar contexto.
- **Unidad de análisis:** una observación es una muestra de vino.
- **Variables:** `alcohol` y `density`, numéricas; `quality`, ordinal; `color`, categórica.
- **Dataset:** Wine Quality · UCI, 6497 filas, licencia CC BY 4.0.
- **Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Revisar contexto** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Abre el detalle del vino con alcohol máximo y contrasta alcohol, densidad, calidad y color.

**Pregunta:** ¿Qué evidencia apoya conservar el caso marcado?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Sus variables son plausibles y no hay señal de fallo de captura. | Sí | La consistencia de dominio respalda su validez. |
| Es el punto más alejado. | No | Ser extremo no prueba validez. |
| Aumenta la correlación del gráfico. | No | Conservar datos para mejorar una métrica sería sesgado. |

**Pista:** Busca coherencia entre medición y contexto.

### Ejercicio de transferencia

**Evidencia requerida:** Compara el análisis con y sin el caso para comunicar sensibilidad de forma transparente.

**Pregunta:** ¿Cómo comunicar un resultado sensible a este caso raro?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Mostrar análisis con y sin el caso y justificar la versión principal. | Sí | El análisis por escenarios hace visible la dependencia. |
| Ocultar la sensibilidad. | No | Ocultarla impide evaluar robustez. |
| Elegir solo el resultado más llamativo. | No | Seleccionar por dramatismo introduce sesgo. |

**Pista:** La transparencia es parte del resultado.

## LiveTeachingPack

| Minutos | Actividad |
| --- | --- |
| 0-5 | Presentar fuente, licencia, unidad de análisis y pregunta |
| 5-12 | Pedir predicción y ejecutar la interacción local |
| 12-20 | Usar Codex para modificar o verificar la demo |
| 20-27 | Usar Gemini o ChatGPT para cuestionar la interpretación |
| 27-33 | Resolver los dos ejercicios con evidencia |
| 33-35 | Cierre y límite de la conclusión |

### Roles de IA

- **Codex:** ejecuta o modifica código reproducible sin cambiar el snapshot.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar cálculos, fuente, supuestos y conclusión antes de proyectar.
- **Privacidad:** no pegar datos sensibles ni credenciales.
- **Plan offline:** usar el HTML, el CSV local y las preguntas impresas.

### Prompts

**Codex**

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Caso raro válido». Objetivo: Conservar observaciones raras que son plausibles, verificadas y relevantes. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Caso raro válido». Objetivo: Conservar observaciones raras que son plausibles, verificadas y relevantes. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Caso raro válido». Objetivo: Conservar observaciones raras que son plausibles, verificadas y relevantes. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
