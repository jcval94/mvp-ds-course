# Paquete: Media

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Palmer Penguins` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `mean`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas.
- **Concepto anterior:** Tipos de variables y calidad de datos.
- **Concepto siguiente:** Mediana.
- **Objetivo:** Calcular e interpretar la media como punto de equilibrio.
- **Definición:** La media suma los valores y divide entre el número de observaciones.
- **Intuición:** Es el punto donde una regla con pesos iguales quedaría equilibrada.
- **Error común:** Tratar la media como un valor típico aunque existan extremos o asimetría.
- **Visual:** Compara la media antes y después de añadir un pedido grande confirmado.
- **Kind visual:** `number-line`.
- **Mecanismo:** desplazamiento del punto de equilibrio.
- **Estados:** Pedidos observados → Pedido grande añadido.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Añadir un pedido grande.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `num_tacos`, numérica discreta en tacos por pedido.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S01`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.1`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Un pedido grande mueve el punto de equilibrio de tacos por pedido.

**Don Juan:** Hijo, esa cuenta se fue para arriba. ¿Qué pedido la jaló?

**Paco:** Déjame comparar antes y después, Pa.

**Subtítulos:** La media reparte el total por igual entre todos los pedidos. / Un extremo modifica la media; no vuelve típico ese tamaño.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Añadir un pedido grande** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Añadir un pedido grande» y citar el cambio visible asociado con media en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; una compra de tortillas debe recalcularse al separar un encargo grande, en un incidente posterior a L2-S01. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de media que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Añadir un pedido grande» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Media: recorrer todos los estados y citar la marca visible de desplazamiento del punto de equilibrio. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Media: recorrer todos los estados y citar la marca visible de desplazamiento del punto de equilibrio.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs mean-state-1, mean-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** Al añadir el pedido grande, ¿qué marcador se desplaza más?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La media se desplaza más que la mediana. | Sí | La evidencia visible sostiene «La media se desplaza más que la mediana.» dentro de desplazamiento del punto de equilibrio. |
| La mediana se desplaza más que la media. | No | El estado recorrido contradice «La mediana se desplaza más que la media.»; compara las marcas y etiquetas. |
| Ambos marcadores permanecen en el mismo lugar. | No | El estado recorrido contradice «Ambos marcadores permanecen en el mismo lugar.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de media y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de media que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Añadir un pedido grande» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Media: recorrer todos los estados y citar la marca visible de desplazamiento del punto de equilibrio. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Media: recorrer todos los estados y citar la marca visible de desplazamiento del punto de equilibrio.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs mean-state-1, mean-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué comparación visible impide llamar típico al pedido grande?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La media cambia mucho y la mediana cambia poco. | Sí | La evidencia visible sostiene «La media cambia mucho y la mediana cambia poco.» dentro de desplazamiento del punto de equilibrio. |
| Media y mediana terminan exactamente sobre el extremo. | No | El estado recorrido contradice «Media y mediana terminan exactamente sobre el extremo.»; compara las marcas y etiquetas. |
| El número de pedidos baja al añadir el extremo. | No | El estado recorrido contradice «El número de pedidos baja al añadir el extremo.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de media y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Calcular e interpretar la media como punto de equilibrio.

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

**Evaluación rápida:** El estudiante interpreta media con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Añadir un pedido grande», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Media». Objetivo: Calcular e interpretar la media como punto de equilibrio. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Media». Objetivo: Calcular e interpretar la media como punto de equilibrio. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Media». Objetivo: Calcular e interpretar la media como punto de equilibrio. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
