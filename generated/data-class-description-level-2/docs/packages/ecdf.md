# Paquete: ECDF

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `ecdf`.
- **Bloque:** Comparación visual.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variables numéricas y categóricas, agrupación y resúmenes de centro, percentiles y proporciones acumuladas.
- **Concepto anterior:** Violin plot.
- **Concepto siguiente:** Outliers.
- **Objetivo:** Leer la proporción acumulada de observaciones hasta cualquier valor.
- **Definición:** La ECDF muestra, para cada x, la fracción de observaciones menores o iguales.
- **Intuición:** Es una escalera que acumula casos desde cero hasta uno.
- **Error común:** Confundir la altura acumulada con frecuencia local.
- **Visual:** Mueve un umbral de masa y compara la proporción acumulada por especie.
- **Interacción:** Consultar umbral.
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
3. Ejecutar **Consultar umbral** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

### Ejercicio guiado

**Historia:** Mariana, bióloga que prepara un reporte para visitantes de un museo necesita comparar especies sin ocultar diferencias importantes. un promedio bonito puede volver invisible una diferencia que el público sí debe ver. La decisión es elegir una comparación visual que use ecdf sin exagerar conclusiones.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Consultar umbral» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Mueve el umbral y lee la proporción acumulada de cada especie.

**Pregunta:** Si la ECDF vale 0.8 en 4,000 g, ¿qué significa?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| 80% de las observaciones pesa 4,000 g o menos. | Sí | La altura es una proporción acumulada. |
| 80 observaciones pesan exactamente 4,000 g. | No | Se necesita conocer n para convertir proporción en conteo. |
| La densidad en 4,000 g es 0.8. | No | La densidad es una representación diferente. |

**Pista:** Lee todo lo acumulado a la izquierda.

### Ejercicio de transferencia

**Historia:** Mariana, bióloga que prepara un reporte para visitantes de un museo cambia de contexto para probar si el razonamiento se transfiere. un promedio bonito puede volver invisible una diferencia que el público sí debe ver. La decisión es elegir una comparación visual que use ecdf sin exagerar conclusiones.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Consultar umbral» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Compara la posición horizontal de las tres curvas sin asumir emparejamiento ni causalidad.

**Pregunta:** Una curva queda consistentemente a la derecha de otra. ¿Qué sugiere?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Sus valores tienden a ser mayores en buena parte de la distribución. | Sí | La comparación es distributiva, no pareada ni causal. |
| Cada observación es mayor de manera pareada. | No | Las filas no están emparejadas. |
| Existe una causa biológica confirmada. | No | La gráfica describe diferencias, no su causa. |

**Pista:** Limita la afirmación a tendencia distributiva.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «ECDF». Objetivo: Leer la proporción acumulada de observaciones hasta cualquier valor. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «ECDF». Objetivo: Leer la proporción acumulada de observaciones hasta cualquier valor. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «ECDF». Objetivo: Leer la proporción acumulada de observaciones hasta cualquier valor. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
