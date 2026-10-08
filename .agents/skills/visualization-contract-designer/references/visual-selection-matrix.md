# Matriz de selección visual

- Nivel 3: conjuntos, matrices de probabilidad, tiras 0/1, PMF, densidad,
  línea temporal, dotplot, media acumulada, intervalos, distribuciones nulas,
  colas, curvas superpuestas y potencia.
- Nivel 4: scatterplots, líneas descriptivas, pequeños múltiples, rangos,
  DAG, comparaciones estratificadas, tabla 2×2, mosaico, heatmap y ratio plot.
- Nivel 5: diagramas de esquema y relaciones, claves y cardinalidad, linaje,
  granularidad, planes de JOIN y reconciliación de conteos. La slice aprobada usa
  `join-row-explosion`; los otros conceptos siguen bloqueados por renderer y prueba.
- Nivel 6: ajuste y residuales, diagnósticos, coeficientes, líneas de interacción,
  heatmap, scores, curva logística, árbol, flujo, one-hot, scaling y leakage.
- Nivel 7: splits, matrices de confusión, ROC/PR, calibración, errores y learning curves.
- Nivel 8: clusters, centroides, biplots, scree plots y anomaly scores.
- Nivel 9: series temporales, rezagos, ventanas y diagramas experimentales.
- Nivel 11: cobertura, tasas, rutas de daño, linaje y cadenas de afirmación.
- Nivel 12: contratos de producto, interfaces, flujo de build, revisión de diff,
  matriz de aceptación y resultados de tests. La slice aprobada usa
  `notebook-pipeline-contract`; los otros conceptos siguen bloqueados por renderer y prueba.
- Nivel 13: fronteras modelo/harness, ensamblaje de contexto, retrieval-evidencia, matriz tool/skill, loops, estado, memoria, stop budgets, checkpoints, MCP, delegación y blueprint trazable.
- Nivel 14: gates, drift, alertas persistentes, líneas de incidente y retiro.

Elegir por mecanismo: pertenencia→conjunto; cambio temporal→línea; relación
numérica→scatterplot; distribución→densidad/PMF; incertidumbre→intervalos;
estructura causal→DAG; clasificación→scores/umbrales; proceso→flujo. No elegir
por conveniencia del renderer.
