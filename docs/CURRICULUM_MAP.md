# Curriculum Map

## Propósito

Definir el temario canónico de DataClass Forge y evitar colecciones de conceptos sin progresión. El mapa guía prerrequisitos, nivel, objetivos y prioridad de creación de materiales.

## Principios curriculares

- Avanzar de lectura de datos a decisiones con modelos.
- Introducir una representación visual antes de formalismo innecesario.
- Conectar cada concepto con un error frecuente y una decisión real.
- No enseñar una métrica sin explicar qué comportamiento premia o castiga.
- Separar asociación, predicción y causalidad.
- Preferir snapshots públicos pequeños, licenciados y reproducibles; usar datos
  sintéticos etiquetados cuando permitan aislar mejor el mecanismo.

## Nivel 1: Fundamentos

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Alfabetización de datos | observación, variable, tabla, población, muestra | Identificar qué representa una fila, columna y unidad de análisis. |
| Tipos de variables | numérica, categórica, ordinal, fecha, texto | Elegir operaciones y visualizaciones compatibles. |
| Calidad de datos | faltantes, duplicados, rangos inválidos, sesgo de medición | Detectar problemas antes de analizar. |
| Preparación básica | filtrar, ordenar, agrupar, transformar | Explicar cómo una transformación cambia la interpretación. |

## Nivel 2: Descripción y visualización

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Resumen numérico | media, mediana, moda, rango, varianza, desviación estándar, percentiles | Comparar centro y dispersión sin depender de una sola medida. |
| Distribuciones | histograma, densidad, forma, sesgo, multimodalidad, bins | Construir y leer una distribución, incluyendo sensibilidad a bins. |
| Comparación visual | barras, boxplot, violin plot, ECDF | Elegir una visualización según variable y pregunta. |
| Valores atípicos | outliers, leverage, error de captura, caso raro válido | Investigar un valor extremo sin eliminarlo automáticamente. |

## Nivel 3: Probabilidad e inferencia

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Probabilidad básica | evento, complemento, independencia, probabilidad condicional | Razonar sobre eventos y dependencias. |
| Variables aleatorias | Bernoulli, binomial, normal, Poisson | Relacionar mecanismo de datos con distribución plausible. |
| Muestreo | variabilidad muestral, sesgo de selección, ley de grandes números | Explicar por qué dos muestras difieren. |
| Incertidumbre | error estándar, intervalo de confianza, bootstrap | Comunicar estimaciones con incertidumbre. |
| Pruebas de hipótesis | hipótesis, p-value, errores I y II, potencia | Interpretar evidencia sin convertir p-value en certeza. |

## Nivel 4: Relaciones entre variables

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Relación visual | scatterplot, tendencia, forma, grupos | Describir patrones antes de calcular métricas. |
| Correlación | dirección, fuerza, Pearson, Spearman, sensibilidad a outliers | Reconocer asociación y evitar inferir causalidad. |
| Variables de confusión | causalidad, confusores, sesgo de agregación | Proponer explicaciones alternativas a una relación. |
| Tablas cruzadas | proporciones, riesgo relativo, odds | Comparar variables categóricas con denominadores correctos. |

## Nivel 5: Modelado supervisado

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Regresión lineal | ajuste, pendiente, intercepto, residuales, supuestos | Interpretar relación y error de predicción. |
| Regresión múltiple | variables explicativas, interacción, colinealidad | Explicar el efecto condicionado de una variable. |
| Clasificación | clase, score, umbral, probabilidad | Distinguir predicción de decisión. |
| Modelos interpretables | árbol de decisión, reglas, importancia | Seguir una decisión y detectar sobreajuste. |
| Preparación de variables | encoding, escalado, leakage | Preparar datos sin filtrar información del futuro. |

## Nivel 6: Evaluación de modelos

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Partición de datos | train, validation, test, cross-validation | Evaluar sin reutilizar indebidamente el test. |
| Error de regresión | MAE, MSE, RMSE, R² | Elegir una métrica según costo de error. |
| Matriz de confusión | TP, TN, FP, FN | Traducir cada celda a consecuencias del dominio. |
| Métricas de clasificación | precision, recall, specificity, F1 | Elegir métrica según el error más costoso. |
| Curvas y calibración | ROC, PR, threshold, calibration | Ajustar umbral y revisar confiabilidad del score. |
| Generalización | bias, variance, overfitting, regularización | Reconocer cuándo un modelo memoriza. |

## Nivel 7: Aprendizaje no supervisado

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Clustering | distancia, k-means, centroides, número de grupos | Tratar clusters como hipótesis exploratorias. |
| Reducción dimensional | PCA, componentes, varianza explicada | Visualizar estructura sin confundir componentes con variables originales. |
| Detección de anomalías | rareza, aislamiento, umbral | Priorizar casos para revisión, no declarar fraude automáticamente. |

## Nivel 8: Datos temporales y experimentación

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Series de tiempo | tendencia, estacionalidad, rezago, anomalía | Respetar orden temporal y distinguir patrón de evento. |
| Validación temporal | ventanas, backtesting, leakage temporal | Evaluar usando solo información disponible en cada momento. |
| A/B testing | asignación aleatoria, métrica, tamaño de muestra, efecto | Diseñar y leer una comparación controlada. |
| Experimentación | guardrails, múltiples pruebas, efecto práctico | Separar significancia estadística de relevancia operativa. |

## Nivel 9: Práctica responsable y comunicación

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Ética y sesgo | representación, fairness, daño, privacidad | Identificar quién puede verse perjudicado por datos o decisiones. |
| Comunicación | audiencia, incertidumbre, anotación, narrativa | Explicar hallazgos sin exagerar certeza. |
| Reproducibilidad | semillas, versiones, diccionario de datos, notebook limpio | Permitir que otra persona repita el análisis. |
| Mini-proyecto | pregunta, datos, análisis, evaluación, comunicación | Integrar el flujo completo con una decisión verificable. |

## Prioridades de producción

### Publicado

1. Nivel 1 completo: 18 conceptos y 18 ejercicios.
2. Nivel 2 completo: 21 conceptos y 42 ejercicios.
3. Nivel 3 completo: 19 conceptos y 38 ejercicios.

### Próxima vertical slice

Relaciones entre variables: scatterplot, tendencia, forma, grupos,
correlación, sensibilidad a outliers y variables de confusión.

### Roadmap

Relaciones, modelado, evaluación, reducción dimensional, series de tiempo,
experimentación, ética, comunicación y mini-proyectos.

## Contrato por concepto

Cada concepto incorporado debe declarar:

- bloque y nivel;
- prerrequisitos;
- objetivo observable;
- intuición y definición;
- representación visual;
- interacción que revele el concepto;
- error común;
- dataset público con procedencia y licencia, o sintético etiquetado;
- dos ejercicios dependientes de evidencia desde Nivel 2;
- criterio de dominio;
- conexiones con el concepto anterior y siguiente.

## Inspiración aplicada

Los demos de histograma inspiran la profundidad, no la forma exacta. Un concepto cumple el estándar cuando:

- hace visible su mecanismo central;
- permite manipular una variable significativa;
- compara estados o escenarios;
- pide interpretar evidencia;
- ofrece feedback que corrige el razonamiento;
- termina en una decisión o explicación transferible.
