# Paquete: Histograma

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `histogram`.
- **Bloque:** Distribuciones.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, frecuencia, rango y lectura de ejes.
- **Concepto anterior:** Percentiles.
- **Concepto siguiente:** Densidad.
- **Objetivo:** Construir e interpretar frecuencias de una variable numérica por intervalos.
- **Definición:** Un histograma agrupa valores numéricos continuos en intervalos contiguos.
- **Intuición:** Es una vista comprimida de cuántas observaciones caen en cada tramo.
- **Error común:** Confundirlo con barras categóricas o leer cada barra como una observación.
- **Visual:** Ajusta el número de bins sin cambiar los 731 días observados.
- **Kind visual:** `histogram`.
- **Mecanismo:** conteo por intervalos conservando el total.
- **Estados:** 7 bins → 12 bins → 22 bins.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Cambiar intervalos.
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
3. Ejecutar **Cambiar intervalos** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

**Evidencia narrativa común:** Ejecutar «Cambiar intervalos» y citar el cambio visible asociado con histograma.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Don José, dueño de una tienda de barrio quiere decidir a qué hora abrir sin revisar cientos de días en Excel. la computadora se vuelve lenta y necesita una señal visual rápida antes de contratar personal. La decisión es usar histograma para leer concentración, forma o sensibilidad de la demanda.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Cambiar intervalos» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Compara 7, 12 y 22 bins y verifica que n=731 permanezca constante.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs histogram-state-1, histogram-state-2, histogram-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** Al pasar de pocos a muchos bins, ¿qué permanece igual?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El dataset y sus 731 días. | Sí | Solo cambia la agrupación visual. |
| La altura de cada barra. | No | Las frecuencias se redistribuyen entre más barras. |
| El ancho de cada intervalo. | No | Más bins producen intervalos más estrechos. |

**Pista:** Distingue datos de representación.

### Ejercicio de transferencia

**Historia:** Don José, dueño de una tienda de barrio cambia de contexto para probar si el razonamiento se transfiere. la computadora se vuelve lenta y necesita una señal visual rápida antes de contratar personal. La decisión es usar histograma para leer concentración, forma o sensibilidad de la demanda.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Cambiar intervalos» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Usa la altura de las barras del extremo derecho para justificar la frecuencia de alquileres altos.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs histogram-state-1, histogram-state-2, histogram-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué evidencia permite afirmar que los alquileres altos son poco frecuentes?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Las barras del extremo alto tienen conteos pequeños. | Sí | La altura representa frecuencia por intervalo. |
| El eje usa color teal. | No | El color no aporta frecuencia. |
| La primera barra está a la izquierda. | No | La posición sola no indica cuántos días hay. |

**Pista:** Combina posición y altura.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Construir e interpretar frecuencias de una variable numérica por intervalos.

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

**Evaluación rápida:** El estudiante interpreta histograma con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Cambiar intervalos», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Histograma». Objetivo: Construir e interpretar frecuencias de una variable numérica por intervalos. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Histograma». Objetivo: Construir e interpretar frecuencias de una variable numérica por intervalos. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Histograma». Objetivo: Construir e interpretar frecuencias de una variable numérica por intervalos. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
