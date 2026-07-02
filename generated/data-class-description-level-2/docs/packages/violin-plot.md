# Paquete: Violin plot

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Palmer Penguins` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `violin-plot`.
- **Bloque:** Comparación visual.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variables numéricas y categóricas, agrupación y resúmenes de centro, densidad y boxplot.
- **Concepto anterior:** Boxplot.
- **Concepto siguiente:** ECDF.
- **Objetivo:** Comparar forma y densidad de varios grupos en un espacio compacto.
- **Definición:** Un violin plot refleja una estimación de densidad alrededor de un eje central.
- **Intuición:** El ancho muestra dónde se concentran más observaciones.
- **Error común:** Leer el ancho como conteo directo sin conocer la normalización.
- **Visual:** Compara la densidad reflejada por día con tres anchos de banda.
- **Kind visual:** `violin`.
- **Mecanismo:** densidad reflejada por grupo.
- **Estados:** Banda 0.4 → Banda 1 → Banda 2.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Ajustar el suavizado.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `tipo_taco`, `dia_semana` y `para_llevar`, categóricas; `num_tacos`, numérica discreta.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S16`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.3`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** La densidad reflejada compara días.

**Don Juan:** Ese dibujo enseña dónde se amontonan, ¿verdad?

**Paco:** Revisaré el suavizado para no exagerar la cintura.

**Subtítulos:** Un violin plot refleja una densidad por grupo. / Estado «Banda 1»: cambia el parámetro o el corte; la entrada sigue documentada. / Su forma depende del suavizado, la escala y el tamaño de grupo.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Ajustar el suavizado** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Ajustar el suavizado» y citar el cambio visible asociado con violin plot en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; un día parece tener dos concentraciones bajo cierto suavizado, en un incidente posterior a L2-S16. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de violin plot que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Ajustar el suavizado» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Violin plot: recorrer todos los estados y citar la marca visible de densidad reflejada por grupo. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Violin plot: recorrer todos los estados y citar la marca visible de densidad reflejada por grupo.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs violin-plot-state-1, violin-plot-state-2, violin-plot-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué día muestra el menor tamaño de grupo en las etiquetas?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Sábado, n=140. | Sí | La evidencia visible sostiene «Sábado, n=140.» dentro de densidad reflejada por grupo. |
| Jueves, n=154. | No | El estado recorrido contradice «Jueves, n=154.»; compara las marcas y etiquetas. |
| Viernes, n=600. | No | El estado recorrido contradice «Viernes, n=600.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de violin plot y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de violin plot que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Ajustar el suavizado» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Violin plot: recorrer todos los estados y citar la marca visible de densidad reflejada por grupo. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Violin plot: recorrer todos los estados y citar la marca visible de densidad reflejada por grupo.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs violin-plot-state-1, violin-plot-state-2, violin-plot-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué cambia al recorrer las tres bandas?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La anchura de la silueta cambia, no el n de cada día. | Sí | La evidencia visible sostiene «La anchura de la silueta cambia, no el n de cada día.» dentro de densidad reflejada por grupo. |
| El sábado gana pedidos nuevos. | No | El estado recorrido contradice «El sábado gana pedidos nuevos.»; compara las marcas y etiquetas. |
| La unidad cambia de tacos a fechas. | No | El estado recorrido contradice «La unidad cambia de tacos a fechas.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de violin plot y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Comparar forma y densidad de varios grupos en un espacio compacto.

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

**Evaluación rápida:** El estudiante interpreta violin plot con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Ajustar el suavizado», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Violin plot». Objetivo: Comparar forma y densidad de varios grupos en un espacio compacto. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Violin plot». Objetivo: Comparar forma y densidad de varios grupos en un espacio compacto. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Violin plot». Objetivo: Comparar forma y densidad de varios grupos en un espacio compacto. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
