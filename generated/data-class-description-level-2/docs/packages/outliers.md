# Paquete: Outliers

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Wine Quality · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `outliers`.
- **Bloque:** Valores atípicos.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** distribuciones, cuartiles, scatterplots y validación de dominio.
- **Concepto anterior:** ECDF.
- **Concepto siguiente:** Leverage.
- **Objetivo:** Detectar observaciones alejadas y formular preguntas antes de excluirlas.
- **Definición:** Un outlier es una observación inusualmente alejada según una regla y un contexto.
- **Intuición:** Es una señal para investigar, no una etiqueta automática de error.
- **Error común:** Eliminar todo valor exterior a 1.5 IQR sin revisar dominio ni impacto.
- **Visual:** Marca valores extremos de alcohol y abre su fila original.
- **Interacción:** Aplicar regla IQR.
- **Unidad de análisis:** una observación es una muestra de vino.
- **Variables:** `alcohol` y `density`, numéricas; `quality`, ordinal; `color`, categórica.
- **Dataset:** Wine Quality · UCI, 6497 filas, licencia CC BY 4.0.
- **Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Aplicar regla IQR** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

### Ejercicio guiado

**Historia:** Roberto, analista de calidad de una bodega recibe miles de registros y una alerta antes de presentar el lote semanal. Excel se congela al filtrar todo y borrar rápido podría eliminar un caso válido. La decisión es decidir cómo investigar outliers sin inventar una explicación.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Aplicar regla IQR» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Activa la revisión del valor máximo y compáralo con la cerca superior de 1.5 IQR.

**Pregunta:** ¿Qué conclusión permite la regla IQR?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El valor merece revisión por su posición relativa. | Sí | La regla detecta rareza estadística, no origen. |
| El registro es falso. | No | La gráfica no prueba falsedad. |
| El vino debe excluirse del análisis. | No | Excluir requiere una decisión documentada. |

**Pista:** Separa señal de acción.

### Ejercicio de transferencia

**Historia:** Roberto, analista de calidad de una bodega cambia de contexto para probar si el razonamiento se transfiere. Excel se congela al filtrar todo y borrar rápido podría eliminar un caso válido. La decisión es decidir cómo investigar outliers sin inventar una explicación.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Aplicar regla IQR» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Usa la fila trazable y la regla IQR para decidir si investigar, conservar o excluir.

**Pregunta:** El extremo coincide con una medición válida y repetible. ¿Qué corresponde?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Conservarlo y evaluar análisis robustos o por escenarios. | Sí | Un caso válido aporta información y debe permanecer trazable. |
| Cambiarlo a la media. | No | Imputar borraría evidencia real. |
| Ocultarlo del gráfico. | No | Ocultar una observación válida sesga la comunicación. |

**Pista:** Pregunta si el valor es plausible y verificable.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Wine Quality · UCI (6497 filas, 13 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Outliers». Objetivo: Detectar observaciones alejadas y formular preguntas antes de excluirlas. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Outliers». Objetivo: Detectar observaciones alejadas y formular preguntas antes de excluirlas. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Outliers». Objetivo: Detectar observaciones alejadas y formular preguntas antes de excluirlas. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
