# Vertical slice narrativa: Alfabetización de datos

## Usuario, entrada y resultado

- **Usuario:** creador de cursos para personas adultas principiantes.
- **Entrada:** bloque Alfabetización de datos, Story Bible, episodio `L1-E1` y
  `pedidos_crudos_nivel_1.csv`.
- **Resultado de aprendizaje:** identificar qué representan fila, columna y
  unidad de análisis, y distinguir población de muestra en un escenario nuevo.
- **Duración:** 40 minutos.
- **Competencia auxiliar de agentes:** describir el contexto mínimo de una tabla
  antes de pedir apoyo a una herramienta.

## ConceptSpec

### Identidad y narrativa

- **ID:** `level-1-data-literacy-taco-orders-v1`.
- **Nivel:** 1, Fundamentos.
- **Prerrequisito:** lectura básica de tablas.
- **Story Bible:** `don-juan-paco-course-v2`.
- **Arco y episodio:** `don-juan-paco-level-1-v1`, `L1-E1`.
- **Ledger de entrada:** `L1.0`.
- **Dinámica:** Paco conecta una tarea de la profesora Elena con una necesidad
  concreta de su papá; Don Juan habla solo del puesto y el narrador introduce los términos.
- **Crecimiento:** estado `G1`; no se modifica tamaño, horario, equipo ni plantilla.

### Objetivo

Dada una tabla y una selección visible de filas, señalar la unidad de análisis,
una observación, una variable, la población objetivo y la muestra, explicando
una limitación de representatividad.

### Definición, intuición y límites

- Una observación reúne los valores registrados para una unidad; en esta historia, un pedido.
- Una variable describe una característica registrada de cada pedido.
- Una población es el conjunto sobre el que se quiere concluir; una muestra es
  la parte observada o seleccionada.
- Una celda aislada no es una observación completa.
- Una muestra no se vuelve representativa solo por estar digitalizada o contener varias filas.

### Errores comunes

- Confundir celda con observación.
- Tratar `pedido_id` como cantidad.
- Llamar población a todas las filas disponibles sin formular la pregunta.
- Suponer que las páginas recuperadas o el primer turno representan toda la venta.

### VisualSpec

- **Kind:** tabla semántica conectada con un conjunto de pedidos.
- **Mecanismo:** cambiar el alcance visible de celda a fila, columna, población y muestra.
- **Estados:** tabla sin marcas; fila P-002; columna `num_tacos`; diez pedidos;
  selección de tres pedidos del primer turno; advertencia de cobertura.
- **Interacción:** avanzar, retroceder y seleccionar otra muestra.
- **Marcas:** `row-p002`, `column-num-tacos`, `population-ten-orders`,
  `sample-first-three`, `sample-coverage-warning`.
- **Movimiento:** contorno que se expande de celda a fila, recorrido vertical de
  columna y desplazamiento de tres tarjetas desde población a muestra.
- **Movimiento reducido:** mostrar cada estado final con las mismas marcas y números.

### Dataset

- **Unidad:** pedido.
- **Tipo:** sintético etiquetado.
- **Entrada:** captura sintética controlada de dos noches nuevas, 10 filas y 7 columnas en
  `datasets/narrative/pedidos_crudos_nivel_1.csv`.
- **SHA-256:** `beb9df84625b6defc1f4d7dda3dbbc96cae0c7be5a54225ce051d33628689718`.
- **Límite:** las diez filas representan dos noches ficticias, no todo el negocio.

### Criterio de dominio

El estudiante identifica los cinco elementos en una tabla distinta y explica
por qué una selección por conveniencia puede no representar a la población.

## LearningModule: las páginas recuperadas

### Activación

Don Juan señala el número `3` de P-002 y pregunta: “Hijo, ¿ese tres de cuál
pedido es?”. Paco recuerda la tarea de observar registros; el estudiante predice
antes de que el narrador introduzca fila, columna y unidad de análisis.

### Progresión

1. Resaltar `row-p002`: la fila completa corresponde a un pedido.
2. Resaltar `column-num-tacos`: la columna responde la misma pregunta para cada pedido.
3. Mostrar la celda `3`: necesita fila y encabezado para conservar significado.
4. Expandir a diez pedidos: formular la población objetivo de las dos noches.
5. Separar las páginas recuperadas: nombrarlas muestra y mostrar qué horarios faltan.

El narrador introduce todos los términos después de cada observación. Don Juan
aporta únicamente el significado operativo del pedido y Paco verbaliza una
hipótesis escolar, sin nombrar formalmente población o muestra antes del narrador.

### Experimento

El estudiante alterna entre una muestra de los primeros tres pedidos y otra de
tres pedidos repartidos entre las dos noches. Debe explicar cuál cubre mejor el
periodo y por qué ninguna representa automáticamente otros días.

### Error común

“Las diez filas del archivo son toda la población”. Corrección: solo son la
población si la pregunta se limita exactamente a esos diez pedidos; para hablar
de todas las ventas del puesto son una muestra pequeña.

### Checkpoint

- **Pregunta:** en `P-007`, ¿qué es `num_tacos`, qué representa la fila y cuál
  sería la población si Don Juan pregunta por todos los pedidos de junio?
- **Respuesta:** `num_tacos` es una variable; P-007 es una observación de un
  pedido; la población serían todos los pedidos de junio, no las diez filas visibles.

### Cierre y deltas

- **`continuityDelta`:** Paco aprende a nombrar unidad, observación, variable,
  población y muestra; Don Juan pide, en lenguaje cotidiano, que cada renglón se
  pueda contrastar con un ticket.
- **`dataStateDelta`:** notas parciales pasan a `pedidos_crudos@L1.1`, 10 × 7;
  no se corrigen todavía sus problemas.
- **`growthDelta`:** ninguno; Paco sigue ayudando tres noches y la escuela mantiene prioridad.
- **Transición:** el tipo y significado de cada columna se abordarán en `L1-E2`.

## PracticeExercise: la foto del primer turno

### Historia y decisión

Al día siguiente, un proveedor pide una estimación para todo el fin de semana.
Paco solo tiene una fotografía con los tres primeros pedidos del lunes. Don Juan
necesita decidir si puede tratar esa foto como toda la venta esperada.

Este incidente ocurre después de la libreta y no repite el accidente del yogurt.

### Evidencia y secuencia

1. Mostrar únicamente la fotografía con tres filas; marcar `sample-first-three`.
2. Revelar que las filas pertenecen a 19:05–19:18 del lunes.
3. Expandir a los diez pedidos disponibles; marcar `population-ten-orders` para
   la pregunta limitada a las dos noches.
4. Mostrar `sample-coverage-warning`: la fotografía no cubre la segunda noche ni
   el resto del fin de semana.

### EvidenceContract

- **Pasos requeridos:** 4.
- **Evidence IDs:** `sample-first-three`, `row-p002`,
  `population-ten-orders`, `sample-coverage-warning`.
- **Desbloqueo:** después del paso 4.

### Pregunta

¿Cuál interpretación está respaldada por la evidencia visible?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Las tres filas son toda la población del fin de semana porque están en una tabla. | No | El formato no define la población. La foto solo contiene tres pedidos del inicio del lunes y no cubre el fin de semana. |
| Cada fila es un pedido y la foto es una muestra de conveniencia; no basta para estimar todo el fin de semana. | Sí | La unidad, el periodo visible y la cobertura sustentan esa conclusión limitada. |
| Cada celda es un cliente distinto, así que hay muchas más observaciones. | No | Una observación es la fila completa de un pedido; las celdas son valores de sus variables. |
| Los diez pedidos revelados son todos los pedidos futuros del puesto. | No | Son el conjunto disponible de dos noches ficticias; no incluyen pedidos futuros ni garantizan representatividad. |

### Pistas

1. Nombra primero qué representa una fila completa.
2. Compara el horario de la foto con el periodo de la pregunta.
3. Pregunta qué pedidos no tuvieron posibilidad de aparecer en la selección.

### Cierre y deltas

- **Conclusión:** antes de pedir una estimación a un agente, se debe declarar la
  unidad, la población objetivo, cómo se obtuvo la muestra y qué cobertura falta.
- **`continuityDelta`:** Paco deja de llamar población a cualquier archivo completo.
- **`dataStateDelta`:** ninguno; la práctica selecciona filas, pero no modifica `L1.1`.
- **`growthDelta`:** ninguno.
- **Puente:** definir los tipos y reglas de las columnas mediante un esquema.

## Prueba manual y Definition of Done

1. Ocultar nombres de hablante y confirmar que Don Juan, Paco y narrador siguen siendo atribuibles.
2. Confirmar que Don Juan no usa vocabulario técnico y que toda definición o
   conclusión de datos pertenece al narrador.
3. Recorrer los cinco estados visuales y verificar IDs, números y movimiento reducido.
4. Intentar responder antes del paso 4: la respuesta debe permanecer bloqueada.
5. Cambiar la muestra y comprobar que la explicación de cobertura también cambia.
6. Verificar que la historia no permita acertar sin inspeccionar periodo y selección.

La slice está completa cuando pasa las revisiones curricular, técnica, narrativa,
visual y pedagógica con promedio mínimo de 4 y ninguna dimensión en 1.

## No objetivos

- Implementar HTML o modificar los laboratorios publicados.
- Usar datos reales de clientes.
- Enseñar tipos de variables o limpieza dentro de esta misma slice.
- Afirmar que dos noches describen el comportamiento habitual del puesto.
