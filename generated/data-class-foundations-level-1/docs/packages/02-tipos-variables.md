# Paquete: Tipos de variables

## ConceptSpec

**Nivel:** 1, Fundamentos.

**Objetivo:** clasificar variables y elegir operaciones compatibles con su significado.

**Prerrequisitos:** variable y tabla.

**Conceptos:** numérica, categórica, ordinal, fecha y texto.

**VisualSpec:** tarjetas de variables que se clasifican, escalera ordinal, línea temporal y separación animada de palabras.

**Dataset:** catálogo ficticio de biblioteca con códigos, páginas, género literario, nivel, fechas y reseñas.

**Errores comunes:** tratar IDs como cantidades, códigos como medidas, ordinales como distancias exactas y fechas como texto sin formato.

**Criterio de dominio:** el estudiante clasifica una variable nueva y justifica una operación válida y una inválida.

## LearningModule

1. Probar si una diferencia numérica tiene interpretación.
2. Agrupar etiquetas sin orden.
3. Ordenar categorías sin inventar distancia.
4. Ubicar eventos y calcular duración.
5. Normalizar texto y extraer unidades comparables.

## PracticeExercise

**Historia:** Ana prepara un catálogo para una biblioteca comunitaria. El equipo quiere ordenar libros, calcular diferencias y resumir reseñas, pero algunas columnas tienen números que son etiquetas, categorías con orden parcial y texto libre.

**Decisión:** elegir qué operación sí tiene sentido para cada variable antes de crear un resumen engañoso.

**Evidencia animada requerida:** clasificar tarjetas, ordenar niveles, ubicar fechas en la línea temporal y separar palabras de una reseña.

**Escenas:**

1. Predicción: preguntar qué variable parece numérica pero puede ser solo identificador.
2. Animación: mover o resaltar la tarjeta compatible con el tipo.
3. Decisión: justificar la operación permitida con el visual.

**Pistas graduadas:**

- Pregunta si una resta o promedio tendría significado.
- Revisa si existe orden natural o solo etiquetas.
- Para fechas y texto, identifica primero la estructura que permite comparar.

La práctica pregunta qué operaciones tienen significado para cada tipo. La evidencia visible incluye tarjetas, grupos, línea temporal y tokens de texto.

**Cierre transferible:** una variable no se clasifica por su apariencia, sino por el significado de sus valores y las operaciones que permite.

## LiveTeachingPack

**Visibilidad:** En Vivo queda visible temporalmente en Nivel 1 para revisión docente; no es autenticación ni protección real.

**Duración:** 75 minutos.

**Dataset real para clase:** Palmer Penguins, 344 filas y 8 columnas, licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14.

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.

| Minutos | Actividad |
| --- | --- |
| 0-15 | Clasificar numéricas e identificadores |
| 15-30 | Comparar categóricas y ordinales |
| 30-45 | Ordenar eventos en una línea temporal |
| 45-60 | Tokenizar una reseña manteniendo el original |
| 60-75 | Resolver casos y justificar operaciones |

**Codex:** crear un validador de tipos y operaciones permitidas.

**Gemini:** facilitar clasificación con contraejemplos.

**ChatGPT:** crear variables ambiguas para discutir en grupo.

**Evaluación rápida:** el estudiante clasifica `species`, `island`, `body_mass_g`, `sex` y una fecha de captura hipotética, indicando una operación válida y una inválida.

**Checklist antes de clase:** preparar tarjetas, revisar columnas reales del snapshot y marcar un ejemplo de ID que no debe promediarse.

**Checklist durante clase:** no aceptar "es número" como justificación, pedir operación compatible y anotar casos ambiguos.

**Plan offline:** imprimir tarjetas y clasificarlas físicamente.
