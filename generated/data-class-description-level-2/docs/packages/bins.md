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

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

### Ejercicio guiado

**Historia:** Don José, dueño de una tienda de barrio quiere decidir a qué hora abrir sin revisar cientos de días en Excel. la computadora se vuelve lenta y necesita una señal visual rápida antes de contratar personal. La decisión es usar bins para leer concentración, forma o sensibilidad de la demanda.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Probar 6, 12 y 24» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Compara el mismo n=731 con 7, 12 y 22 intervalos.

**Pregunta:** ¿Cuál es la mejor práctica al elegir bins?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Probar varias opciones y verificar si la conclusión es estable. | Sí | La sensibilidad a bins debe formar parte de la revisión. |
| Usar siempre diez. | No | Diez es una convención, no una ley. |
| Elegir el número que haga más dramática la historia. | No | Ajustar para forzar una conclusión es engañoso. |

**Pista:** Compara qué patrones sobreviven.

### Ejercicio de transferencia

**Historia:** Don José, dueño de una tienda de barrio cambia de contexto para probar si el razonamiento se transfiere. la computadora se vuelve lenta y necesita una señal visual rápida antes de contratar personal. La decisión es usar bins para leer concentración, forma o sensibilidad de la demanda.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Probar 6, 12 y 24» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Verifica si el pico permanece o desaparece al cambiar la partición.

**Pregunta:** Un pico aparece con 24 bins, pero no con 12 ni 6. ¿Qué conclusión corresponde?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Es un detalle sensible a la partición y requiere cautela. | Sí | Un patrón inestable no debe presentarse como hallazgo robusto. |
| Es una población nueva confirmada. | No | La visualización sola no confirma un grupo. |
| Los otros dos histogramas están equivocados. | No | Cada partición es válida para distinto nivel de detalle. |

**Pista:** Busca estabilidad entre representaciones.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

| Minutos | Actividad |
| --- | --- |
| 0-5 | presentar fuente, licencia, unidad de análisis y pregunta. |
| 5-12 | pedir predicción y ejecutar la interacción local. |
| 12-20 | pedir a Codex verificar o modificar código reproducible sin cambiar el snapshot. |
| 20-27 | usar Gemini o ChatGPT para cuestionar interpretación y límites. |
| 27-35 | resolver práctica con evidencia y cerrar con una afirmación permitida. |

### Roles de IA

- **Codex:** ejecuta o modifica código reproducible sin cambiar el snapshot.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar cálculos, fuente, supuestos y conclusión antes de proyectar.
- **Privacidad:** no pegar datos sensibles ni credenciales.
- **Privacidad:** no pegar datos sensibles ni credenciales; el modo docente oculto no protege como login.
- **Plan offline:** Usar HTML local, CSV snapshot y pizarra. No pegar datos sensibles ni credenciales en herramientas externas.

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
