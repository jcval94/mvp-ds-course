# Diagnostic Scoring

## Propósito

Este diagnóstico orienta nivelación para DataClass Forge. No es evaluación académica formal ni seguimiento de estudiantes. Cada sesión responde máximo 10 preguntas, aunque el banco contiene 104 ítems para rotación, pilotaje y revisión docente.

## Inicio y parada

- La primera pregunta es `A01` porque evaluación de modelos separa comprensión descriptiva de juicio sobre modelos.
- Después de cada respuesta se consulta `diagnostic_routing.csv`.
- La sesión termina al llegar a `END` o al responder 10 preguntas, lo que ocurra primero.
- Si una pregunta suplementaria `LNNQMM` se usa para revisión manual, su ruta vuelve a una ancla del mismo nivel o termina.

## Evidencia y gráficos

- Las preguntas con `visual_asset` requieren mirar el SVG antes de responder.
- La respuesta debe citar una marca visible: celda, umbral, línea, grupo, flujo, corte temporal o etiqueta.
- Si el estudiante responde correctamente sin poder explicar la marca visual, se registra como `verificar manualmente`, no como exención plena.

## Regla conservadora de exención

- Un nivel queda `exento` cuando hay al menos una respuesta correcta directa del nivel o de una ancla equivalente, y no hay fallos en prerrequisitos críticos anteriores.
- Un nivel queda `repasar` cuando falla una pregunta directa, falla una ancla de prerrequisito o el feedback apunta a sus `repasar_tags`.
- Un nivel queda `verificar manualmente` cuando el estudiante acierta una pregunta avanzada pero falla una base necesaria.
- Las exenciones se reportan como tramo contiguo desde Nivel 1 hasta el nivel más alto sin hueco crítico. Aciertos aislados por arriba se reportan como fortalezas, no como exención automática.

## Bandas diagnósticas

- L1-L2: lectura, tipos, calidad, descripción y visualización.
- L3-L4: incertidumbre, inferencia, relaciones y causalidad prudente.
- L5: SQL, granularidad, joins, calidad y linaje.
- L6-L7: modelado supervisado, leakage, métricas, umbrales y generalización.
- L8-L9: no supervisado, anomalías, tiempo y experimentación.
- L10: responsabilidad, privacidad, reproducibilidad y comunicación.
- L11-L13: producto, sistemas de IA trazables, operación, monitoreo e incidentes.

## Salida recomendada

Para cada estudiante entregar:

1. Niveles exentos.
2. Niveles a repasar.
3. Secciones concretas a repasar desde `repasar_tags`.
4. Fortalezas avanzadas detectadas, si no forman tramo contiguo.
5. Confianza: alta si no hay contradicciones; media si hay una contradiccion menor; baja si acerto avanzado pero fallo fundamentos.

## Simulaciones esperadas

- Principiante: falla `A01`, `A03` y bases; repasa L1-L3.
- Descriptivo: falla modelado pero acierta L1-L2; exento L1-L2 y repasa L3-L7.
- Modelado: acierta L6-L7 pero falla responsabilidad o temporalidad; exento hasta L7 con repaso L9-L10.
- Producto/IA: acierta L11-L12 y falla L13; exento hasta L12, repasa operación responsable.
- Avanzado con huecos: acierta L12/L13 pero falla L5 o L7; fortalezas avanzadas, pero exención contigua se detiene antes del hueco.
