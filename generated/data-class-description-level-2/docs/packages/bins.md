# Paquete: Bins

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `bins`.
- **Bloque:** Distribuciones.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, frecuencia, rango y lectura de ejes.
- **Concepto anterior:** Multimodalidad.
- **Concepto siguiente:** Gráfico de barras.
- **Objetivo:** Explicar cómo la elección de intervalos cambia el detalle visible.
- **Definición:** Los bins son intervalos que definen cómo se agrupan los valores de un histograma.
- **Intuición:** Son una cuadrícula móvil: más celdas muestran detalle, menos celdas resumen.
- **Error común:** Buscar un número universalmente correcto de bins.
- **Visual:** Compara tres particiones del mismo snapshot.
- **Interacción:** Probar 6, 12 y 24.
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
3. Ejecutar **Probar 6, 12 y 24** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Compara el mismo n=731 con 7, 12 y 22 intervalos.

**Pregunta:** ¿Cuál es la mejor práctica al elegir bins?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Probar varias opciones y verificar si la conclusión es estable. | Sí | La sensibilidad a bins debe formar parte de la revisión. |
| Usar siempre diez. | No | Diez es una convención, no una ley. |
| Elegir el número que haga más dramática la historia. | No | Ajustar para forzar una conclusión es engañoso. |

**Pista:** Compara qué patrones sobreviven.

### Ejercicio de transferencia

**Evidencia requerida:** Verifica si el pico permanece o desaparece al cambiar la partición.

**Pregunta:** Un pico aparece con 24 bins, pero no con 12 ni 6. ¿Qué conclusión corresponde?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Es un detalle sensible a la partición y requiere cautela. | Sí | Un patrón inestable no debe presentarse como hallazgo robusto. |
| Es una población nueva confirmada. | No | La visualización sola no confirma un grupo. |
| Los otros dos histogramas están equivocados. | No | Cada partición es válida para distinto nivel de detalle. |

**Pista:** Busca estabilidad entre representaciones.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Bins». Objetivo: Explicar cómo la elección de intervalos cambia el detalle visible. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Bins». Objetivo: Explicar cómo la elección de intervalos cambia el detalle visible. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Bins». Objetivo: Explicar cómo la elección de intervalos cambia el detalle visible. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
