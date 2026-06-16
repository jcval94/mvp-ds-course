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

### Ejercicio guiado

**Evidencia requerida:** Alterna entre todos los días y una temporada; describe centro, extensión y colas visibles.

**Pregunta:** ¿Qué descripción usa evidencia suficiente de la forma?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Una cima principal, cola hacia valores altos y extensión amplia. | Sí | Combina modo, asimetría y extensión. |
| La media es 4,504; eso describe todo. | No | Una media no muestra colas ni modos. |
| El gráfico tiene 12 barras. | No | El número de barras es una decisión de representación. |

**Pista:** Describe al menos tres rasgos visibles.

### Ejercicio de transferencia

**Evidencia requerida:** Compara dos perfiles con centro parecido y señala diferencias fuera del centro.

**Pregunta:** Dos distribuciones comparten media. ¿Qué comparación visual sigue siendo necesaria?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Revisar dispersión, modos y colas. | Sí | La forma puede diferir aunque el centro coincida. |
| Comprobar que usan la misma tipografía. | No | La tipografía no es evidencia estadística. |
| Elegir la de mayor color. | No | El color no determina la estructura. |

**Pista:** Busca diferencias más allá del marcador central.

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
