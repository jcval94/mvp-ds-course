# Paquete: Forma

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `shape`.
- **Bloque:** Distribuciones.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, frecuencia, rango y lectura de ejes.
- **Concepto anterior:** Densidad.
- **Concepto siguiente:** Sesgo.
- **Objetivo:** Describir una distribución por centro, extensión, simetría y número de modos.
- **Definición:** La forma resume cómo se reparte la frecuencia a lo largo de los valores.
- **Intuición:** Es el perfil completo de montañas, valles y colas.
- **Error común:** Reducir la descripción a una sola medida de centro.
- **Visual:** Alterna entre temporadas y describe centro, extensión y colas.
- **Interacción:** Comparar perfiles.
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
3. Ejecutar **Comparar perfiles** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

### Ejercicio guiado

**Historia:** Don José, dueño de una tienda de barrio quiere decidir a qué hora abrir sin revisar cientos de días en Excel. la computadora se vuelve lenta y necesita una señal visual rápida antes de contratar personal. La decisión es usar forma para leer concentración, forma o sensibilidad de la demanda.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar perfiles» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Alterna entre todos los días y una temporada; describe centro, extensión y colas visibles.

**Pregunta:** ¿Qué descripción usa evidencia suficiente de la forma?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Una cima principal, cola hacia valores altos y extensión amplia. | Sí | Combina modo, asimetría y extensión. |
| La media es 4,504; eso describe todo. | No | Una media no muestra colas ni modos. |
| El gráfico tiene 12 barras. | No | El número de barras es una decisión de representación. |

**Pista:** Describe al menos tres rasgos visibles.

### Ejercicio de transferencia

**Historia:** Don José, dueño de una tienda de barrio cambia de contexto para probar si el razonamiento se transfiere. la computadora se vuelve lenta y necesita una señal visual rápida antes de contratar personal. La decisión es usar forma para leer concentración, forma o sensibilidad de la demanda.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar perfiles» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Compara dos perfiles con centro parecido y señala diferencias fuera del centro.

**Pregunta:** Dos distribuciones comparten media. ¿Qué comparación visual sigue siendo necesaria?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Revisar dispersión, modos y colas. | Sí | La forma puede diferir aunque el centro coincida. |
| Comprobar que usan la misma tipografía. | No | La tipografía no es evidencia estadística. |
| Elegir la de mayor color. | No | El color no determina la estructura. |

**Pista:** Busca diferencias más allá del marcador central.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Forma». Objetivo: Describir una distribución por centro, extensión, simetría y número de modos. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Forma». Objetivo: Describir una distribución por centro, extensión, simetría y número de modos. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Forma». Objetivo: Describir una distribución por centro, extensión, simetría y número de modos. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
