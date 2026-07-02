# Paquete: Gráfico de barras

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Palmer Penguins` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `bar-chart`.
- **Bloque:** Comparación visual.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variables numéricas y categóricas, agrupación y resúmenes de centro.
- **Concepto anterior:** Bins.
- **Concepto siguiente:** Boxplot.
- **Objetivo:** Comparar magnitudes agregadas entre categorías con una línea base común.
- **Definición:** Un gráfico de barras usa longitud para comparar una medida por categoría.
- **Intuición:** Cada barra es una regla que parte de una base compartida.
- **Error común:** Usar barras para una variable continua sin agrupar o truncar el eje para exagerar.
- **Visual:** Cuenta pedidos por tipo de taco desde una base cero común.
- **Kind visual:** `zero-baseline-bars`.
- **Mecanismo:** conteo por tipo desde una base cero común.
- **Estados:** Conteo → Etiquetas visibles.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Mostrar etiquetas.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `tipo_taco`, `dia_semana` y `para_llevar`, categóricas; `num_tacos`, numérica discreta.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S14`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.3`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Se cuentan pedidos por tipo de taco desde cero.

**Don Juan:** ¿Cuál taco salió más veces?

**Paco:** Cuento pedidos por tipo; no sumo nombres.

**Subtítulos:** Las barras comparan categorías mediante longitudes desde una base común. / Aquí se cuentan pedidos por tipo; la operación y el eje deben permanecer visibles.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Mostrar etiquetas** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Mostrar etiquetas» y citar el cambio visible asociado con gráfico de barras en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; Don Juan compara qué tipo recibió más pedidos, en un incidente posterior a L2-S14. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de gráfico de barras que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Mostrar etiquetas» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Gráfico de barras: recorrer todos los estados y citar la marca visible de conteo por tipo desde una base cero común. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Gráfico de barras: recorrer todos los estados y citar la marca visible de conteo por tipo desde una base cero común.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs bar-chart-state-1, bar-chart-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué tipo de taco tiene la barra más alta?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Pastor, con 223 pedidos. | Sí | La evidencia visible sostiene «Pastor, con 223 pedidos.» dentro de conteo por tipo desde una base cero común. |
| Campechano, con 223 pedidos. | No | El estado recorrido contradice «Campechano, con 223 pedidos.»; compara las marcas y etiquetas. |
| Suadero, con 600 pedidos. | No | El estado recorrido contradice «Suadero, con 600 pedidos.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de gráfico de barras y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de gráfico de barras que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Mostrar etiquetas» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Gráfico de barras: recorrer todos los estados y citar la marca visible de conteo por tipo desde una base cero común. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Gráfico de barras: recorrer todos los estados y citar la marca visible de conteo por tipo desde una base cero común.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs bar-chart-state-1, bar-chart-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué operación representan las etiquetas finales?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Conteo de pedidos por tipo. | Sí | La evidencia visible sostiene «Conteo de pedidos por tipo.» dentro de conteo por tipo desde una base cero común. |
| Media de tacos por tipo. | No | El estado recorrido contradice «Media de tacos por tipo.»; compara las marcas y etiquetas. |
| Suma de minutos por tipo. | No | El estado recorrido contradice «Suma de minutos por tipo.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de gráfico de barras y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Comparar magnitudes agregadas entre categorías con una línea base común.

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

**Evaluación rápida:** El estudiante interpreta gráfico de barras con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Mostrar etiquetas», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Gráfico de barras». Objetivo: Comparar magnitudes agregadas entre categorías con una línea base común. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Gráfico de barras». Objetivo: Comparar magnitudes agregadas entre categorías con una línea base común. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Gráfico de barras». Objetivo: Comparar magnitudes agregadas entre categorías con una línea base común. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
