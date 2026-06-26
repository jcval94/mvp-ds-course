# Paquete: Leverage

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Wine Quality · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `leverage`.
- **Bloque:** Valores atípicos.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** distribuciones, cuartiles, scatterplots y validación de dominio, microintroducción a predictor, residuo y línea ajustada.
- **Concepto anterior:** Outliers.
- **Concepto siguiente:** Error de captura.
- **Objetivo:** Reconocer puntos con valores explicativos inusuales que pueden influir en un ajuste.
- **Definición:** El leverage describe qué tan alejada está una observación en el espacio de variables explicativas.
- **Intuición:** Un punto en una zona horizontal solitaria puede tirar de una línea ajustada.
- **Error común:** Confundir leverage alto con residuo alto o con un error confirmado.
- **Visual:** Activa y desactiva un punto extremo en alcohol para observar la pendiente.
- **Kind visual:** `scatter-fit`.
- **Mecanismo:** posición horizontal extrema y sensibilidad del ajuste.
- **Estados:** Con extremo → Sin extremo.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Comparar ajuste.
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
3. Ejecutar **Comparar ajuste** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

**Evidencia narrativa común:** Ejecutar «Comparar ajuste» y citar el cambio visible asociado con leverage.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Roberto, analista de calidad de una bodega recibe miles de registros y una alerta antes de presentar el lote semanal. Excel se congela al filtrar todo y borrar rápido podría eliminar un caso válido. La decisión es decidir cómo investigar leverage sin inventar una explicación.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar ajuste» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Compara el ajuste con y sin el punto de alcohol más extremo.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs leverage-state-1, leverage-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué hace que el punto marcado tenga leverage alto?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Su valor de alcohol está lejos del centro de los demás predictores. | Sí | Leverage depende de la posición en variables explicativas. |
| Su calidad observada es exactamente la media. | No | La respuesta no define su distancia horizontal. |
| El punto tiene un color distinto. | No | El color solo destaca la observación. |

**Pista:** Mira la separación horizontal.

### Ejercicio de transferencia

**Historia:** Roberto, analista de calidad de una bodega cambia de contexto para probar si el razonamiento se transfiere. Excel se congela al filtrar todo y borrar rápido podría eliminar un caso válido. La decisión es decidir cómo investigar leverage sin inventar una explicación.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar ajuste» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Usa su posición horizontal y el cambio de pendiente para distinguir leverage de influencia.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs leverage-state-1, leverage-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué diagnóstico falta antes de llamarlo influyente?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Evaluar cuánto cambia el ajuste y considerar su residuo. | Sí | Leverage es potencial de influencia; el efecto real requiere más evidencia. |
| Comprobar que esté en la última fila. | No | El orden de filas es irrelevante. |
| Ver si su etiqueta es larga. | No | La longitud del texto no es estadística. |

**Pista:** Compara el modelo con y sin el punto.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Wine Quality · UCI (6497 filas, 13 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`

**Objetivo docente:** Reconocer puntos con valores explicativos inusuales que pueden influir en un ajuste.

**Audiencia:** Docente de Nivel 2 con grupo que completó Fundamentos.

**Duración:** 35 minutos por concepto o 90 minutos por bloque.

| Minutos | Actividad |
| --- | --- |
| 0-5 | presentar fuente, licencia, unidad de análisis y pregunta. |
| 5-12 | pedir predicción y ejecutar la interacción local. |
| 12-20 | pedir a Codex verificar o modificar código reproducible sin cambiar el snapshot. |
| 20-27 | usar Gemini o ChatGPT para cuestionar interpretación y límites. |
| 27-35 | resolver práctica con evidencia y cerrar con una afirmación permitida. |

### Preguntas, evaluación y errores

**Preguntas socráticas:**

- ¿Qué predijiste antes de activar la animación y qué cambió?
- ¿Qué evidencia visible sostiene la decisión?
- ¿Qué conclusión sería tentadora pero excede el snapshot?
- ¿Qué pasaría si cambiamos de grupo, bins, umbral o caso extremo?

**Errores anticipados:**

- Confundir una representación visual con una prueba causal.
- Responder por definición sin citar evidencia animada.
- Ignorar unidad de análisis, escala o tamaño de grupo.

**Evaluación rápida:** El estudiante interpreta leverage con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Comparar ajuste», estado inicial, estado animado y aserción que verifica que el visual cambia.

**Checklist antes de clase:**

- Abrir el laboratorio con y sin ?teacher=1 para revisar visibilidad docente.
- Verificar fuente, licencia, fecha, dimensiones y SHA-256 del snapshot.
- Preparar una predicción y una pregunta de transferencia.

**Checklist durante clase:**

- Bloquear respuestas hasta ejecutar la animación.
- Pedir que cada respuesta cite una marca, barra, curva, punto o umbral.
- Separar descripción, decisión y límite de conclusión.

### Roles de IA

- **Codex:** ejecuta o modifica código reproducible sin cambiar el snapshot.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar cálculos, fuente, supuestos y conclusión antes de proyectar.
- **Privacidad:** No pegar datos sensibles, credenciales ni archivos privados en herramientas externas; el modo docente oculto no reemplaza autenticación.
- **Plan offline:** Usar HTML local, CSV snapshot y pizarra. No pegar datos sensibles ni credenciales en herramientas externas.

### Prompts

**Codex**

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Leverage». Objetivo: Reconocer puntos con valores explicativos inusuales que pueden influir en un ajuste. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Leverage». Objetivo: Reconocer puntos con valores explicativos inusuales que pueden influir en un ajuste. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Leverage». Objetivo: Reconocer puntos con valores explicativos inusuales que pueden influir en un ajuste. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
