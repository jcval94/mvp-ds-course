# Paquete: Percentiles

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Palmer Penguins` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `percentiles`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas, datos ordenados y mediana.
- **Concepto anterior:** Desviación estándar.
- **Concepto siguiente:** Histograma.
- **Objetivo:** Ubicar una observación según el porcentaje de valores que no la supera.
- **Definición:** El percentil p es un punto de corte con aproximadamente p% de valores debajo o iguales.
- **Intuición:** Es una marca de posición en una lista ordenada de cien partes.
- **Error común:** Interpretar percentil 90 como obtener 90% en una prueba.
- **Visual:** Recorre P25, P50 y P75 sobre cantidades ordenadas.
- **Kind visual:** `quantile-line`.
- **Mecanismo:** proporción acumulada a la izquierda del corte.
- **Estados:** P25 → P50 → P75.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Mover el percentil.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `num_tacos`, numérica discreta en tacos por pedido.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S07`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.1`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Paco recorre P25, P50 y P75.

**Don Juan:** ¿Hasta cuántos tacos quedan tres de cada cuatro pedidos?

**Paco:** Muevo el corte y leo qué proporción queda antes.

**Subtítulos:** Un percentil es un umbral asociado con una proporción acumulada. / Estado «P50»: cambia el parámetro o el corte; la entrada sigue documentada. / P75 no significa que 75% de los valores sean iguales al corte.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Mover el percentil** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Mover el percentil» y citar el cambio visible asociado con percentiles en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; se elige una bolsa que cubra una proporción declarada de pedidos, en un incidente posterior a L2-S07. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de percentiles que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Mover el percentil» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Percentiles: recorrer todos los estados y citar la marca visible de proporción acumulada a la izquierda del corte. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Percentiles: recorrer todos los estados y citar la marca visible de proporción acumulada a la izquierda del corte.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs percentiles-state-1, percentiles-state-2, percentiles-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué secuencia de cortes aparece al recorrer P25, P50 y P75?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| 3, 4 y 5 tacos. | Sí | La evidencia visible sostiene «3, 4 y 5 tacos.» dentro de proporción acumulada a la izquierda del corte. |
| 5, 4 y 3 tacos. | No | El estado recorrido contradice «5, 4 y 3 tacos.»; compara las marcas y etiquetas. |
| 25, 50 y 75 tacos. | No | El estado recorrido contradice «25, 50 y 75 tacos.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de percentiles y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de percentiles que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Mover el percentil» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Percentiles: recorrer todos los estados y citar la marca visible de proporción acumulada a la izquierda del corte. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Percentiles: recorrer todos los estados y citar la marca visible de proporción acumulada a la izquierda del corte.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs percentiles-state-1, percentiles-state-2, percentiles-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** En P75, ¿dónde queda el corte observado?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| En 5 tacos por pedido. | Sí | La evidencia visible sostiene «En 5 tacos por pedido.» dentro de proporción acumulada a la izquierda del corte. |
| En 75 tacos por pedido. | No | El estado recorrido contradice «En 75 tacos por pedido.»; compara las marcas y etiquetas. |
| En el pedido máximo de 36 tacos. | No | El estado recorrido contradice «En el pedido máximo de 36 tacos.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de percentiles y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Ubicar una observación según el porcentaje de valores que no la supera.

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

**Evaluación rápida:** El estudiante interpreta percentiles con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Mover el percentil», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Percentiles». Objetivo: Ubicar una observación según el porcentaje de valores que no la supera. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Percentiles». Objetivo: Ubicar una observación según el porcentaje de valores que no la supera. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Percentiles». Objetivo: Ubicar una observación según el porcentaje de valores que no la supera. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
