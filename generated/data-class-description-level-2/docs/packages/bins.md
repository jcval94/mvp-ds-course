# Paquete: Bins

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Bike Sharing Dataset · UCI` con procedencia, licencia y hash.
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
- **Visual:** Mantén la entrada fija y prueba tres particiones razonables.
- **Kind visual:** `histogram`.
- **Mecanismo:** sensibilidad de la forma a la partición.
- **Estados:** 6 bins → 12 bins → 24 bins.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Probar 6, 12 y 24 bins.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `num_tacos`, cantidad discreta; `minuto_turno`, minuto desde las 18:00.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S13`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.2`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** La misma entrada se muestra con 6, 12 y 24 intervalos.

**Don Juan:** Con tantos cajoncitos parece otro turno.

**Paco:** Beto hace algo parecido en su stop-motion: cada cuadro cambia lo visible.

**Subtítulos:** Los bins son un parámetro que define bordes y ancho de intervalos. / Estado «12 bins»: cambia el parámetro o el corte; la entrada sigue documentada. / Una lectura robusta se revisa con varias elecciones razonables de bins.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Probar 6, 12 y 24 bins** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Probar 6, 12 y 24 bins» y citar el cambio visible asociado con bins en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; una gráfica recortada llega sin indicar cuántos intervalos usó, en un incidente posterior a L2-S13. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de bins que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Probar 6, 12 y 24 bins» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Bins: recorrer todos los estados y citar la marca visible de sensibilidad de la forma a la partición. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Bins: recorrer todos los estados y citar la marca visible de sensibilidad de la forma a la partición.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs bins-state-1, bins-state-2, bins-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué estado muestra el mayor detalle de intervalos?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| 24 bins. | Sí | La evidencia visible sostiene «24 bins.» dentro de sensibilidad de la forma a la partición. |
| 6 bins. | No | El estado recorrido contradice «6 bins.»; compara las marcas y etiquetas. |
| Los tres tienen el mismo ancho. | No | El estado recorrido contradice «Los tres tienen el mismo ancho.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de bins y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de bins que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Probar 6, 12 y 24 bins» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Bins: recorrer todos los estados y citar la marca visible de sensibilidad de la forma a la partición. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Bins: recorrer todos los estados y citar la marca visible de sensibilidad de la forma a la partición.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs bins-state-1, bins-state-2, bins-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué patrón es comprobable en los tres estados?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La mayor concentración permanece en cantidades pequeñas. | Sí | La evidencia visible sostiene «La mayor concentración permanece en cantidades pequeñas.» dentro de sensibilidad de la forma a la partición. |
| El total cambia de 600 a 24 pedidos. | No | El estado recorrido contradice «El total cambia de 600 a 24 pedidos.»; compara las marcas y etiquetas. |
| Los pedidos raros desaparecen al usar más bins. | No | El estado recorrido contradice «Los pedidos raros desaparecen al usar más bins.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de bins y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Explicar cómo la elección de intervalos cambia el detalle visible.

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

**Evaluación rápida:** El estudiante interpreta bins con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Probar 6, 12 y 24 bins», estado inicial, estado animado y aserción que verifica que el visual cambia.

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
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
