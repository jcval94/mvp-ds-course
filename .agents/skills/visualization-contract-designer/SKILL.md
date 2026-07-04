---
name: visualization-contract-designer
description: Diseña VisualizationSpecs y asigna renderers educativos SVG según pregunta, variables y mecanismo. Usar antes de ConceptSpec, LearningModule o PracticeExercise al crear o corregir visualizaciones de ciencia de datos en Niveles 1–10.
---

# Diseñador de contratos visuales

1. Leer objetivo, pregunta, unidad, variables y datos disponibles.
2. Consultar `references/visual-selection-matrix.md` para elegir familia y `kind`.
3. Escribir `kind`, `mechanism`, `dataSource`, `fields`, `encodings`, `states`,
   `semanticMarks`, `evidenceIds`, `interaction`, `accessibleSummary`,
   `reducedMotion` y `limits`.
4. Confirmar que `kind` existe en el registro cerrado y que sus datos satisfacen el esquema.
5. Hacer que cada ejercicio cite marcas reales y permanezca bloqueado hasta visitar sus `evidenceIds`.
6. Generar casos de prueba normal, incompatible y de movimiento reducido.

Rechazar barras por defecto, visuales decorativos, `kind` sin renderer, datos
incompatibles, marcas inexistentes, evidencia que cambia con movimiento reducido
o un fallback genérico. Las barras solo son válidas para magnitudes categóricas o
importancia justificada.
