# Paquete: Percentiles

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `percentiles`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas, datos ordenados y mediana.
- **Concepto anterior:** Desviación estándar.
- **Concepto siguiente:** Histograma.
- **Objetivo:** Ubicar una observación según el porcentaje de valores que no la supera.
- **Definición:** El percentil p es un punto de corte con aproximadamente p% de valores debajo o iguales.
- **Intuición:** Es una marca de posición en una lista ordenada de cien partes.
- **Error común:** Interpretar percentil 90 como obtener 90% en una prueba.
- **Visual:** Cambia el percentil y observa el punto de corte sobre datos ordenados.
- **Interacción:** Mover percentil.
- **Unidad de análisis:** una observación es un pingüino con masa corporal registrada.
- **Variables:** `body_mass_g`, numérica continua en gramos.
- **Dataset:** Palmer Penguins, 344 filas, licencia CC0-1.0.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Mover percentil** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Mueve el corte entre P25, P50 y P75 y cuenta qué proporción queda a la izquierda.

**Pregunta:** Una masa está en el percentil 75. ¿Qué indica?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Aproximadamente 75% de las masas no la supera. | Sí | El percentil describe posición relativa. |
| La masa vale 75 gramos. | No | El número del percentil no es la unidad medida. |
| Es 75% mayor que la media. | No | No expresa una diferencia porcentual respecto de la media. |

**Pista:** Cuenta observaciones a la izquierda del corte.

### Ejercicio de transferencia

**Evidencia requerida:** Compara el corte central con la extensión visible de ambos lados.

**Pregunta:** ¿Por qué dos datasets pueden tener el mismo percentil 50 y distinta dispersión?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El percentil 50 fija el centro ordenado, no la separación restante. | Sí | La mediana puede coincidir aunque las colas sean distintas. |
| Porque el percentil 50 siempre es cero. | No | El valor depende de los datos, no es siempre cero. |
| Porque los percentiles ignoran el orden. | No | Los percentiles se construyen precisamente con el orden. |

**Pista:** Compara las posiciones centrales y luego las colas.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Percentiles». Objetivo: Ubicar una observación según el porcentaje de valores que no la supera. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Percentiles». Objetivo: Ubicar una observación según el porcentaje de valores que no la supera. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Percentiles». Objetivo: Ubicar una observación según el porcentaje de valores que no la supera. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
