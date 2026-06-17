# Paquete: Boxplot

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `boxplot`.
- **Bloque:** Comparación visual.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variables numéricas y categóricas, agrupación y resúmenes de centro, mediana y cuartiles.
- **Concepto anterior:** Gráfico de barras.
- **Concepto siguiente:** Violin plot.
- **Objetivo:** Comparar mediana, cuartiles, extensión y puntos extremos entre grupos.
- **Definición:** El boxplot representa mediana, rango intercuartílico, bigotes y posibles atípicos.
- **Intuición:** Es un resumen compacto de posiciones ordenadas.
- **Error común:** Asumir normalidad o interpretar todo punto exterior como error.
- **Visual:** Activa mediana, caja, bigotes y puntos exteriores por especie.
- **Interacción:** Resaltar cuartiles.
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
3. Ejecutar **Resaltar cuartiles** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

### Ejercicio guiado

**Historia:** Mariana, bióloga que prepara un reporte para visitantes de un museo necesita comparar especies sin ocultar diferencias importantes. un promedio bonito puede volver invisible una diferencia que el público sí debe ver. La decisión es elegir una comparación visual que use boxplot sin exagerar conclusiones.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Resaltar cuartiles» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Activa las etiquetas de Q1, mediana, Q3, bigotes y puntos exteriores.

**Pregunta:** ¿Qué muestra la altura de la caja?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El rango intercuartílico entre Q1 y Q3. | Sí | La caja contiene la mitad central de los datos. |
| El rango total obligatorio. | No | Los bigotes y puntos pueden extenderse más. |
| La media más una desviación estándar. | No | El boxplot estándar no requiere mostrar la media. |

**Pista:** Ubica Q1 y Q3.

### Ejercicio de transferencia

**Historia:** Mariana, bióloga que prepara un reporte para visitantes de un museo cambia de contexto para probar si el razonamiento se transfiere. un promedio bonito puede volver invisible una diferencia que el público sí debe ver. La decisión es elegir una comparación visual que use boxplot sin exagerar conclusiones.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Resaltar cuartiles» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Usa el punto exterior y los bigotes para separar detección de decisión.

**Pregunta:** Una especie tiene un punto fuera del bigote. ¿Qué acción corresponde?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Investigar el registro y su contexto antes de decidir. | Sí | El punto es una señal de revisión, no un veredicto. |
| Eliminarlo automáticamente. | No | La regla del boxplot no identifica errores. |
| Declarar que pertenece a otra especie. | No | La gráfica no reclasifica observaciones. |

**Pista:** Distingue detección de decisión.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Boxplot». Objetivo: Comparar mediana, cuartiles, extensión y puntos extremos entre grupos. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Boxplot». Objetivo: Comparar mediana, cuartiles, extensión y puntos extremos entre grupos. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Boxplot». Objetivo: Comparar mediana, cuartiles, extensión y puntos extremos entre grupos. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
