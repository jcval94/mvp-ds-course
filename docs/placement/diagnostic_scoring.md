# Diagnostic Scoring

## Proposito

Este diagnostico orienta nivelacion para DataClass Forge. No es evaluacion academica formal ni seguimiento de estudiantes. Cada sesion responde maximo 10 preguntas, aunque el banco contiene 104 items para rotacion, pilotaje y revision docente.

## Inicio y parada

- La primera pregunta es `A01` porque evaluacion de modelos separa comprension descriptiva de juicio sobre modelos.
- Despues de cada respuesta se consulta `diagnostic_routing.csv`.
- La sesion termina al llegar a `END` o al responder 10 preguntas, lo que ocurra primero.
- Si una pregunta suplementaria `LNNQMM` se usa para revision manual, su ruta vuelve a una ancla del mismo nivel o termina.

## Evidencia y graficos

- Las preguntas con `visual_asset` requieren mirar el SVG antes de responder.
- La respuesta debe citar una marca visible: celda, umbral, linea, grupo, flujo, corte temporal o etiqueta.
- Si el estudiante responde correctamente sin poder explicar la marca visual, se registra como `verificar manualmente`, no como exencion plena.

## Regla conservadora de exencion

- Un nivel queda `exento` cuando hay al menos una respuesta correcta directa del nivel o de una ancla equivalente, y no hay fallos en prerrequisitos criticos anteriores.
- Un nivel queda `repasar` cuando falla una pregunta directa, falla una ancla de prerrequisito o el feedback apunta a sus `repasar_tags`.
- Un nivel queda `verificar manualmente` cuando el estudiante acierta una pregunta avanzada pero falla una base necesaria.
- Las exenciones se reportan como tramo contiguo desde Nivel 1 hasta el nivel mas alto sin hueco critico. Aciertos aislados por arriba se reportan como fortalezas, no como exencion automatica.

## Bandas diagnosticas

- L1-L2: lectura, tipos, calidad, descripcion y visualizacion.
- L3-L4: incertidumbre, inferencia, relaciones y causalidad prudente.
- L5: SQL, granularidad, joins, calidad y linaje.
- L6-L7: modelado supervisado, leakage, metricas, umbrales y generalizacion.
- L8-L9: no supervisado, anomalias, tiempo y experimentacion.
- L10: responsabilidad, privacidad, reproducibilidad y comunicacion.
- L11-L13: producto, sistemas de IA trazables, operacion, monitoreo e incidentes.

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
- Producto/IA: acierta L11-L12 y falla L13; exento hasta L12, repasa operacion responsable.
- Avanzado con huecos: acierta L12/L13 pero falla L5 o L7; fortalezas avanzadas, pero exencion contigua se detiene antes del hueco.
