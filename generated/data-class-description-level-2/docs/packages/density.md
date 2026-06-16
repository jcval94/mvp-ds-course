# Paquete: Densidad

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `density`.
- **Bloque:** Distribuciones.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, frecuencia, rango y lectura de ejes, histograma y área.
- **Concepto anterior:** Histograma.
- **Concepto siguiente:** Forma.
- **Objetivo:** Interpretar una curva suavizada cuya área total representa uno.
- **Definición:** La densidad describe concentración relativa mediante una curva con área total igual a uno.
- **Intuición:** Es una silueta suave de la distribución, no un conteo de filas.
- **Error común:** Leer la altura de densidad como probabilidad exacta de un valor puntual.
- **Visual:** Cambia el suavizado y observa qué detalles se conservan o desaparecen.
- **Interacción:** Ajustar suavizado.
- **Unidad de análisis:** una observación es un día del sistema de bicicletas compartidas.
- **Variables:** `cnt`, conteo entero de alquileres diarios.
- **Dataset:** Bike Sharing Dataset · UCI, 731 filas, licencia CC BY 4.0.
- **Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Ajustar suavizado** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Cambia el ancho de banda y comprueba qué cimas se conservan en la curva normalizada.

**Pregunta:** ¿Qué propiedad debe mantenerse al cambiar el suavizado?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El área total bajo la curva es uno. | Sí | La densidad normaliza área, no altura máxima. |
| La altura máxima siempre es uno. | No | La altura depende de la escala y el ancho de banda. |
| Cada punto de la curva es un conteo entero. | No | La curva es continua y puede tomar valores no enteros. |

**Pista:** Piensa en área, no en la cima.

### Ejercicio de transferencia

**Evidencia requerida:** Contrasta la curva suave con las marcas de datos para detectar estructura que podría ocultarse.

**Pregunta:** Un suavizado excesivo muestra una sola cima. ¿Qué riesgo existe?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Ocultar subgrupos o modos presentes en los datos. | Sí | El ancho de banda puede borrar estructura local. |
| Crear observaciones nuevas en el CSV. | No | La curva no modifica el snapshot. |
| Cambiar la unidad de análisis. | No | Cada fila sigue siendo un día. |

**Pista:** Compara la curva con el histograma base.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Densidad». Objetivo: Interpretar una curva suavizada cuya área total representa uno. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Densidad». Objetivo: Interpretar una curva suavizada cuya área total representa uno. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Densidad». Objetivo: Interpretar una curva suavizada cuya área total representa uno. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
