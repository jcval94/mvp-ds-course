# Paquete: Sesgo

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `skew`.
- **Bloque:** Distribuciones.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, frecuencia, rango y lectura de ejes.
- **Concepto anterior:** Forma.
- **Concepto siguiente:** Multimodalidad.
- **Objetivo:** Reconocer asimetría y la dirección de una cola prolongada.
- **Definición:** Una distribución sesgada tiene una cola más larga hacia uno de sus lados.
- **Intuición:** La cola apunta hacia los casos menos frecuentes y más alejados.
- **Error común:** Nombrar el sesgo por el lado donde se concentra la mayoría.
- **Visual:** Resalta la cola larga y compara media con mediana.
- **Interacción:** Resaltar cola.
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
3. Ejecutar **Resaltar cola** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Activa la cola y compara las posiciones de media y mediana.

**Pregunta:** Si la cola se extiende hacia alquileres altos, ¿cómo se llama el patrón?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Sesgo a la derecha. | Sí | La dirección se nombra por la cola larga. |
| Sesgo a la izquierda. | No | La mayoría puede estar a la izquierda, pero la cola apunta a la derecha. |
| Distribución uniforme. | No | Una distribución uniforme no tiene esa cola marcada. |

**Pista:** Sigue los valores poco frecuentes más alejados.

### Ejercicio de transferencia

**Evidencia requerida:** Usa la dirección de la cola resaltada para justificar la relación entre los dos centros.

**Pregunta:** En un sesgo fuerte a la derecha, ¿qué relación suele observarse?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La media queda por encima de la mediana. | Sí | Los valores altos arrastran la media hacia la cola. |
| La media siempre es cero. | No | El origen del eje no fija la media. |
| La moda debe desaparecer. | No | Puede seguir existiendo una moda. |

**Pista:** Observa qué marcador se acerca más a la cola.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Sesgo». Objetivo: Reconocer asimetría y la dirección de una cola prolongada. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Sesgo». Objetivo: Reconocer asimetría y la dirección de una cola prolongada. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Sesgo». Objetivo: Reconocer asimetría y la dirección de una cola prolongada. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
