# Paquete: Gráfico de barras

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `bar-chart`.
- **Bloque:** Comparación visual.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variables numéricas y categóricas, agrupación y resúmenes de centro.
- **Concepto anterior:** Bins.
- **Concepto siguiente:** Boxplot.
- **Objetivo:** Comparar magnitudes agregadas entre categorías con una línea base común.
- **Definición:** Un gráfico de barras usa longitud para comparar una medida por categoría.
- **Intuición:** Cada barra es una regla que parte de una base compartida.
- **Error común:** Usar barras para una variable continua sin agrupar o truncar el eje para exagerar.
- **Visual:** Compara conteo y media por especie manteniendo una línea base explícita.
- **Interacción:** Cambiar métrica.
- **Unidad de análisis:** una observación es un pingüino.
- **Variables:** `species`, categórica; `body_mass_g`, numérica continua en gramos.
- **Dataset:** Palmer Penguins, 344 filas, licencia CC0-1.0.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Cambiar métrica** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Alterna entre conteo y media de masa y lee la medida y unidad mostradas.

**Pregunta:** ¿Por qué el eje de barras debe iniciar en cero en esta comparación?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La longitud completa de la barra codifica la magnitud. | Sí | Truncar la base altera la proporción visual de longitudes. |
| Porque todo eje estadístico debe iniciar en cero. | No | Otros gráficos, como líneas, pueden requerir otra decisión. |
| Para que todas las categorías empaten. | No | Una base común no iguala los valores. |

**Pista:** Observa qué parte de la marca se compara.

### Ejercicio de transferencia

**Evidencia requerida:** Comprueba que todas las barras parten de la misma línea base.

**Pregunta:** ¿Qué debes escribir en el título o eje al mostrar una barra por especie?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La medida agregada, por ejemplo media de masa en gramos. | Sí | La barra necesita indicar qué resumen representa y su unidad. |
| Solo el color elegido. | No | El color no define la métrica. |
| La lista completa de cada observación. | No | Los datos completos pueden estar disponibles aparte. |

**Pista:** Pregunta qué número resume cada barra.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Gráfico de barras». Objetivo: Comparar magnitudes agregadas entre categorías con una línea base común. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Gráfico de barras». Objetivo: Comparar magnitudes agregadas entre categorías con una línea base común. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Gráfico de barras». Objetivo: Comparar magnitudes agregadas entre categorías con una línea base común. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
