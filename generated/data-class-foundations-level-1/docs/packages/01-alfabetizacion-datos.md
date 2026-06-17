# Paquete: Alfabetización de datos

## ConceptSpec

**Nivel:** 1, Fundamentos.

**Objetivo:** identificar qué representan filas, columnas y el conjunto observado, y distinguir población de muestra.

**Prerrequisitos:** lectura básica de tablas.

**Conceptos:** observación, variable, tabla, población y muestra.

**VisualSpec:** tabla de personas con iluminación de filas y columnas, construcción animada de celdas y población de 40 unidades desde la que se selecciona una muestra.

**Dataset:** personas ficticias con ID, edad, género, ingresos y ciudad.

**Errores comunes:** confundir celda con observación, ID con medida y datos disponibles con población completa.

**Criterio de dominio:** el estudiante señala unidad de análisis, observación, variable, población y muestra en un escenario nuevo.

## LearningModule

Secuencia:

1. Iluminar una fila y nombrar la entidad que representa.
2. Recorrer columnas y describir la pregunta que responde cada una.
3. Construir la cuadrícula para mostrar el contexto de cada celda.
4. Expandir los casos visibles hacia una población conceptual.
5. Seleccionar una muestra y discutir representación.

Cada escena inicia con predicción, incluye una animación significativa y termina con checkpoint.

## PracticeExercise

**Historia:** Ana coordina un taller de datos para personal administrativo. El equipo recibe una tabla pequeña y quiere sacar conclusiones rápidas, pero algunas personas confunden una celda con una fila completa, un ID con una medida y las filas visibles con toda la población.

**Decisión:** elegir qué interpretación de la tabla sí está sostenida por la evidencia visual antes de continuar con cualquier análisis.

**Evidencia animada requerida:** ejecutar iluminación de filas, recorrido de columnas, construcción de tabla y selección de muestra.

**Escenas:**

1. Predicción: pedir qué creen que representa una fila completa.
2. Animación: revelar fila, columna o muestra según el concepto activo.
3. Decisión: responder citando la parte visible que cambió.

**Pistas graduadas:**

- Nombra primero la unidad observada.
- Revisa si estás señalando fila, columna, celda, población o muestra.
- Descarta respuestas que no puedan ubicarse en el visual.

El estudiante interpreta una tabla de movilidad del campus. Debe justificar:

- qué representa una fila;
- cuál columna es una variable medible;
- por qué una celda necesita fila y encabezado;
- cuál es la población;
- qué selección forma una muestra menos sesgada.

Los distractores representan confusión entre unidad, variable y universo.

**Cierre transferible:** antes de analizar un dataset nuevo, se debe poder decir qué representa una fila, qué significa cada columna y a qué población se quiere hablar.

## LiveTeachingPack

**Visibilidad:** En Vivo queda visible temporalmente en Nivel 1 para revisión docente; no es autenticación ni protección real.

**Duración:** 75 minutos.

**Dataset real para clase:** Palmer Penguins, 344 filas y 8 columnas, licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14.

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.

| Minutos | Actividad |
| --- | --- |
| 0-10 | Predecir qué representa una fila y revelar observaciones |
| 10-25 | Recorrer variables y construir la tabla |
| 25-40 | Diferenciar archivo, población y unidad de análisis |
| 40-55 | Seleccionar muestras y comparar sesgos |
| 55-70 | Resolver práctica con feedback |
| 70-75 | Explicar la estructura de un dataset nuevo |

**Codex:** generar una tabla interactiva y validaciones de estructura.

**Gemini:** conducir preguntas socráticas sobre unidad de análisis y muestra.

**ChatGPT:** proponer datasets alternativos y preguntas de transferencia.

**Evaluación rápida:** el estudiante identifica observación, variable, tabla, población y muestra en Palmer Penguins sin afirmar causalidad.

**Checklist antes de clase:** abrir el HTML local, verificar snapshot y SHA, preparar predicciones y tener una versión impresa de cinco filas.

**Checklist durante clase:** pedir evidencia visible, corregir confusiones entre celda/fila/columna y cerrar con una limitación.

**Plan offline:** usar los controles locales y dibujar una población con fichas de papel.
