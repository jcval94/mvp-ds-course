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

**Historia:** Roberto recibe miles de registros de control de calidad antes de una junta. Excel tarda en filtrar, la computadora se calienta y alguien propone borrar todo lo raro para terminar rápido.

**Decisión:** decidir qué problema requiere marcar, investigar o conservar antes de corregir datos sin evidencia.

**Evidencia animada requerida:** ejecutar el escáner, observar faltantes, duplicados, rangos inválidos y señales de medición desplazada.

**Escenas:**

1. Predicción: pedir qué error parece más tentador corregir automáticamente.
2. Animación: escanear la tabla y resaltar el patrón visible.
3. Decisión: elegir una acción conservadora que preserve trazabilidad.

**Pistas graduadas:**

- Distingue ausencia, repetición, regla imposible y desplazamiento sistemático.
- Pregunta si el valor puede ser real antes de eliminarlo.
- Conserva evidencia cuando no se conoce la causa.

El estudiante decide cómo tratar cada problema sin destruir evidencia. Las opciones incluyen correcciones tentadoras pero injustificadas.

**Cierre transferible:** calidad de datos no significa limpiar rápido; significa entender qué riesgo introduce cada problema y documentar la acción.

## LiveTeachingPack

**Visibilidad:** En Vivo queda visible temporalmente en Nivel 1 para revisión docente; no es autenticación ni protección real.

**Duración:** 70 minutos.

**Dataset real para clase:** Wine Quality · UCI, 6,497 filas y 13 columnas, licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality

**Fecha del snapshot:** 2026-06-14.

**SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.

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

**Evaluación rápida:** el estudiante clasifica un hallazgo como faltante, duplicado, rango inválido o posible sesgo de medición, y propone una primera acción conservadora.

**Checklist antes de clase:** verificar snapshot, fuente y SHA; preparar reglas de dominio; decidir qué valores no deben corregirse sin investigación.

**Checklist durante clase:** pedir causa plausible, acción inicial y límite de conclusión antes de aceptar una limpieza.

**Plan offline:** inspección manual con colores y una lista de reglas impresas.
