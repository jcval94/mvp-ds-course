# Paquete: Sesgo

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Bike Sharing Dataset · UCI` con procedencia, licencia y hash.
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
- **Visual:** Compara la cola derecha con las posiciones de media y mediana.
- **Kind visual:** `histogram-tail`.
- **Mecanismo:** dirección de cola y separación media-mediana.
- **Estados:** Distribución → Cola resaltada.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Resaltar la cola.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `num_tacos`, cantidad discreta; `minuto_turno`, minuto desde las 18:00.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S11`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.2`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Se resalta una cola hacia pedidos grandes.

**Don Juan:** Hay pocos pedidos que estiran la cuenta para un lado.

**Paco:** Digo hacia dónde va la cola, no si está bien o mal.

**Subtítulos:** El sesgo describe la dirección de una cola prolongada. / Una cola derecha suele atraer más a la media que a la mediana.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Resaltar la cola** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Resaltar la cola» y citar el cambio visible asociado con sesgo en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; pocos encargos estiran la cola hacia cantidades grandes, en un incidente posterior a L2-S11. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de sesgo que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Resaltar la cola» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Sesgo: recorrer todos los estados y citar la marca visible de dirección de cola y separación media-mediana. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Sesgo: recorrer todos los estados y citar la marca visible de dirección de cola y separación media-mediana.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs skew-state-1, skew-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Hacia qué lado queda resaltada la cola?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Hacia cantidades grandes, a la derecha. | Sí | La evidencia visible sostiene «Hacia cantidades grandes, a la derecha.» dentro de dirección de cola y separación media-mediana. |
| Hacia cantidades pequeñas, a la izquierda. | No | El estado recorrido contradice «Hacia cantidades pequeñas, a la izquierda.»; compara las marcas y etiquetas. |
| No se resalta ninguna cola. | No | El estado recorrido contradice «No se resalta ninguna cola.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de sesgo y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de sesgo que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Resaltar la cola» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Sesgo: recorrer todos los estados y citar la marca visible de dirección de cola y separación media-mediana. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Sesgo: recorrer todos los estados y citar la marca visible de dirección de cola y separación media-mediana.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs skew-state-1, skew-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué pedidos ocupan la zona sombreada final?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Los que quedan por encima de P75 hacia el extremo derecho. | Sí | La evidencia visible sostiene «Los que quedan por encima de P75 hacia el extremo derecho.» dentro de dirección de cola y separación media-mediana. |
| Solo los pedidos iguales a la mediana. | No | El estado recorrido contradice «Solo los pedidos iguales a la mediana.»; compara las marcas y etiquetas. |
| Todos los pedidos menores al mínimo. | No | El estado recorrido contradice «Todos los pedidos menores al mínimo.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de sesgo y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Reconocer asimetría y la dirección de una cola prolongada.

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

**Evaluación rápida:** El estudiante interpreta sesgo con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Resaltar la cola», estado inicial, estado animado y aserción que verifica que el visual cambia.

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
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
