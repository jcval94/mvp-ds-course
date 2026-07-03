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
- Mantener un objetivo principal de ciencia de datos por episodio y, como
  máximo, una competencia auxiliar de trabajo con agentes.

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

## Eje transversal de trabajo con agentes

Este eje es acumulativo y auxiliar: nunca sustituye el resultado esperado del
bloque de ciencia de datos.

| Nivel | Competencia acumulativa | Evidencia observable |
| --- | --- | --- |
| 1 | Esquema, diccionario de datos y skill como procedimiento verificable | Describe unidad, variables, vacíos y una skill con entrada, pasos, salida, comprobaciones y límites. |
| 2 | Parámetros, entradas, salidas y operaciones compatibles | Ajusta un parámetro y explica qué operación y salida siguen siendo válidas. |
| 3 | Incertidumbre, supuestos y validación de respuestas | Señala qué no se sabe y contrasta una respuesta del agente con evidencia. |
| 4 | Contexto, asociación frente a causalidad | Escribe contexto suficiente y rechaza una explicación causal no sustentada. |
| 5 | Pipelines, preparación y prevención de leakage | Ordena pasos y evita introducir información futura o del objetivo. |
| 6 | Evals, casos de prueba y costos de error | Define aceptación y prueba fallos conectados con consecuencias del dominio. |
| 7 | Revisión humana de segmentos y anomalías | Usa la salida como priorización y documenta la revisión humana. |
| 8 | Versionado temporal y experimentos reproducibles | Fija corte temporal, versión, tratamiento y criterio de decisión. |
| 9 | Procedencia, privacidad, auditoría y transferencia de skills | Entrega artefactos rastreables que otra persona puede ejecutar y revisar. |

## Prioridades de producción

### Publicado

1. Nivel 1 completo: 18 conceptos y 18 ejercicios.
2. Nivel 2 completo: 21 conceptos y 42 ejercicios.
3. Nivel 3 completo: 19 conceptos y 38 ejercicios.
4. Nivel 4 completo: 15 conceptos y 30 ejercicios.
5. Nivel 5 completo: 18 conceptos y 36 ejercicios.

### Próxima vertical slice

Nivel 6 completo: partir de los modelos descriptivos de `L5.6`, definir costos de
error, separar train/validation/test y evaluar sin reutilizar indebidamente el test.

### Roadmap

Evaluación, reducción dimensional, series de tiempo, experimentación, ética,
comunicación y mini-proyectos.

## Contrato por concepto

Cada concepto incorporado debe declarar:

- bloque y nivel;
- prerrequisitos;
- objetivo observable;
- intuición y definición;
- `kind`, mecanismo, estados y marcas semánticas de la representación;
- entrada en la matriz visual del nivel, renderer registrado y caso de prueba;
- interacción que revele el concepto y alternativa con movimiento reducido;
- error común;
- dataset público con procedencia y licencia, o sintético etiquetado;
- dos ejercicios dependientes de evidencia desde Nivel 2;
- contrato de evidencia y paso exacto de desbloqueo por ejercicio;
- criterio de dominio;
- conexiones con el concepto anterior y siguiente.
- referencia al arco y episodio cuando pertenezca a una ruta narrativa;
- competencia auxiliar de agentes o declaración explícita de que no aplica;
- estado canónico del dataset antes y después del episodio;
- `continuityDelta` verificable sin adelantar conocimiento.

Cada nivel debe declarar `level-shell-v1`. Para Niveles 6–9 las familias base
son, respectivamente: evaluación y curvas de error; clusters y reducción;
series/experimentos; fairness, procedencia, privacidad y auditoría. La familia
orienta la selección, pero el mecanismo de cada concepto determina el `kind`.

## Inspiración aplicada

Los demos de histograma inspiran la profundidad, no la forma exacta. Un concepto cumple el estándar cuando:

- hace visible su mecanismo central;
- permite manipular una variable significativa;
- compara estados o escenarios;
- conserva la identidad semántica de las marcas durante la animación;
- pide interpretar evidencia;
- ofrece feedback que corrige el razonamiento;
- termina en una decisión o explicación transferible.

## Cobertura publicada

- **Niveles aprobados:** 1–7.
- **Total:** 125 conceptos, 232 ejercicios y 375 prompts en 31 bloques.
- **Siguiente entrada:** Nivel 8 inicia con tendencia temporal y exige respetar orden, ventanas y leakage temporal.
