# Paquete: Calidad de datos

## ConceptSpec

**Nivel:** 1, Fundamentos.

**Objetivo:** detectar problemas de calidad antes de analizarlos y evitar correcciones sin evidencia.

**Prerrequisitos:** observación, variable y tipo.

**Conceptos:** faltantes, duplicados, rangos inválidos y sesgo de medición.

**VisualSpec:** escáner animado sobre una tabla, pulsos en celdas vacías, separación de filas duplicadas, reacción de valores inválidos y comparación de instrumentos.

**Dataset:** encuesta ficticia de satisfacción con errores deliberados.

**Errores comunes:** convertir faltantes en cero, eliminar coincidencias legítimas, corregir rangos inventando valores y confiar en el tamaño de muestra para resolver sesgo sistemático.

**Criterio de dominio:** el estudiante identifica el problema, explica su posible causa y propone una acción inicial conservadora.

## LearningModule

1. Escanear faltantes y observar su patrón.
2. Comparar duplicado técnico con evento repetido legítimo.
3. Aplicar reglas de dominio a edades.
4. Contrastar sensor patrón con sensor descalibrado.

## PracticeExercise

El estudiante decide cómo tratar cada problema sin destruir evidencia. Las opciones incluyen correcciones tentadoras pero injustificadas.

## LiveTeachingPack

**Duración:** 70 minutos.

| Minutos | Actividad |
| --- | --- |
| 0-15 | Escaneo y predicción de riesgos |
| 15-30 | Diagnóstico de faltantes y duplicados |
| 30-45 | Reglas de rango y tratamiento conservador |
| 45-60 | Sesgo de medición y calibración |
| 60-70 | Reporte de calidad y cierre |

**Codex:** generar reglas reproducibles y reporte de hallazgos.

**Gemini:** facilitar diagnóstico causal y preguntas sobre riesgo.

**ChatGPT:** generar ejemplos alternativos y preguntas de revisión.

**Plan offline:** inspección manual con colores y una lista de reglas impresas.
