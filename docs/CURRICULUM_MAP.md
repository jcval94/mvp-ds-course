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

La progresión canónica es:

```text
leer datos → describirlos → razonar con incertidumbre → estudiar relaciones
→ construir datasets confiables → modelar → evaluar
→ explorar estructura no supervisada → respetar tiempo y experimentación
→ analizar responsablemente → convertir análisis y modelos en productos
→ operar y monitorear esos productos
```

## Estado estructural de la ruta

| Nivel | Temario | Historia | Nivel educativo | Cobertura cuantificada |
| --- | --- | --- | --- | --- |
| 1–12 | canónico | aprobada | publicado | incluida en los totales publicados |

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

## Nivel 5: Sistemas de Datos Modernos y SQL

- **Estado del temario:** canónico.
- **Estado de la historia:** aprobada para implementación en `docs/stories/LEVEL_5.md`.
- **Estado del nivel educativo:** publicado; 19 ConceptSpecs, 19 módulos Aprender, 38 ejercicios y 19 paquetes docentes validados.
- **Propósito:** construir fuentes relacionadas y datasets de análisis confiables antes de modelar.
- **Prerrequisitos:** unidad de análisis, tipos y calidad de datos de Nivel 1; descripción de Nivel 2; denominadores y relaciones entre variables de Nivel 4.
- **Resultado esperado:** construir y validar con SQL un dataset analítico a partir de tablas relacionadas, preservando esquema, claves, granularidad, cardinalidad y procedencia, sin duplicar ni perder unidades de análisis.
- **Posición:** recibe `L4.4 / G3-espera` y produce el handoff validado `dataset_confiable@L5.H1` para Nivel 6.

| Orden | Bloque | Conceptos definitivos | Resultado observable |
| ---: | --- | --- | --- |
| 1 | Arquitectura invisible de los datos | unidad y granularidad; esquema y claves | Identificar entidad, evento, snapshot, tipos, llave primaria/foránea y cardinalidad; explicar qué representa cada fila. |
| 2 | SQL para hacer preguntas | consulta orientada a pregunta; agregación y grupos | Traducir pregunta → `SELECT/WHERE/CASE` o `GROUP BY/HAVING` → cambio de tabla → interpretación, sin memorizar sintaxis aislada. |
| 3 | Relaciones y JOINs | semántica de JOIN y anti-join; cardinalidad de JOIN; explosión de filas | Elegir `INNER`, `LEFT` o anti-join, anticipar uno-a-uno/uno-a-muchos/muchos-a-muchos y reconciliar conteos antes de interpretar. |
| 4 | SQL analítico y tiempo | CTE trazable; funciones de ventana; rezagos y fecha de corte | Encadenar transformaciones, usar `PARTITION BY/ROW_NUMBER/RANK` y calcular `LAG/LEAD` sin cruzar el corte temporal. |
| 5 | Construcción de la tabla analítica | población y ventanas; ABT temporal; deduplicación por entidad | Construir una ABT con población, fecha de observación, ventanas de features/target, última observación válida y agregaciones sin leakage. |
| 6 | Fuentes y formatos modernos | CSV frente a Parquet; API paginada; DuckDB y Polars | Elegir formato y herramienta según forma, escala y lectura; ingerir páginas con retry y límites explícitos sin prometer benchmarks universales. |
| 7 | Calidad, contratos y procedencia | contrato y esquema; integridad de datos; linaje y snapshot | Validar nullabilidad, rango, unicidad e integridad referencial; registrar fuente, transformación, versión, licencia y SHA-256. |

**No objetivos:** administración de servidores, tuning profundo, índices avanzados,
Spark/cloud empresarial, certificación SQL o catálogo exhaustivo de comandos.

## Nivel 6: Modelado supervisado

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Regresión lineal | ajuste, pendiente, intercepto, residuales, supuestos | Interpretar relación y error de predicción. |
| Regresión múltiple | variables explicativas, interacción, colinealidad | Explicar el efecto condicionado de una variable. |
| Clasificación | clase, score, umbral, probabilidad | Distinguir predicción de decisión. |
| Modelos interpretables | árbol de decisión, reglas, importancia | Seguir una decisión y detectar sobreajuste. |
| Preparación de variables | encoding, escalado, leakage | Preparar datos sin filtrar información del futuro. |

## Nivel 7: Evaluación de modelos

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Partición de datos | train, validation, test, cross-validation | Evaluar sin reutilizar indebidamente el test. |
| Error de regresión | MAE, MSE, RMSE, R² | Elegir una métrica según costo de error. |
| Matriz de confusión | TP, TN, FP, FN | Traducir cada celda a consecuencias del dominio. |
| Métricas de clasificación | precision, recall, specificity, F1 | Elegir métrica según el error más costoso. |
| Curvas y calibración | ROC, PR, threshold, calibration | Ajustar umbral y revisar confiabilidad del score. |
| Generalización | bias, variance, overfitting, regularización | Reconocer cuándo un modelo memoriza. |

## Nivel 8: Aprendizaje no supervisado

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Clustering | distancia, k-means, centroides, número de grupos | Tratar clusters como hipótesis exploratorias. |
| Reducción dimensional | PCA, componentes, varianza explicada | Visualizar estructura sin confundir componentes con variables originales. |
| Detección de anomalías | rareza, aislamiento, umbral | Priorizar casos para revisión, no declarar fraude automáticamente. |

## Nivel 9: Datos temporales y experimentación

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Series de tiempo | tendencia, estacionalidad, rezago, anomalía | Respetar orden temporal y distinguir patrón de evento. |
| Validación temporal | ventanas, backtesting, leakage temporal | Evaluar usando solo información disponible en cada momento. |
| A/B testing | asignación aleatoria, métrica, tamaño de muestra, efecto | Diseñar y leer una comparación controlada. |
| Experimentación | guardrails, múltiples pruebas, efecto práctico | Separar significancia estadística de relevancia operativa. |

## Nivel 10: Análisis responsable y reproducible

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Ética y sesgo | representación, fairness, daño, privacidad | Identificar quién puede verse perjudicado por datos o decisiones. |
| Comunicación | audiencia, incertidumbre, anotación, narrativa | Explicar hallazgos sin exagerar certeza. |
| Reproducibilidad | semillas, versiones, diccionario de datos, notebook limpio | Permitir que otra persona repita el análisis. |
| Mini-proyecto | pregunta, datos, análisis, evaluación, comunicación | Integrar el flujo completo con una decisión verificable. |

## Nivel 11: Ingeniería de Productos de Datos

- **Estado del temario:** canónico.
- **Estado de la historia:** aprobada para implementación en `docs/stories/LEVEL_11.md`.
- **Estado del nivel educativo:** publicado; 21 ConceptSpecs, 21 módulos Aprender, 42 ejercicios y 21 paquetes docentes validados.
- **Propósito:** convertir un análisis o modelo validado en un producto de datos versionado, comprobable y entregable antes de operarlo.
- **Prerrequisitos:** datasets confiables de Nivel 5; modelado y evaluación de Niveles 6–7; reproducibilidad, privacidad y comunicación de Nivel 10.
- **Resultado esperado:** especificar y construir un incremento de producto de datos con contrato de entrada/salida, criterios de aceptación, código revisable, tests ejecutables y artefactos reproducibles para handoff.
- **Posición:** recibe `L10.4 / G7-local` y produce el handoff validado `producto_operable@L11.H1` para Nivel 12.

| Orden | Bloque | Conceptos definitivos | Resultado observable |
| ---: | --- | --- | --- |
| 1 | Del notebook al proyecto | notebook frente a producción; ejecución reproducible; estructura y responsabilidades | Detectar estado oculto y convertir una secuencia frágil en un proyecto ejecutable desde cero. |
| 2 | Código modular y contratos | funciones y módulos; contrato de entrada/salida; configuración y secretos | Separar transformación, inferencia y respuesta; validar schemas y sacar configuración/secretos del código. |
| 3 | Testing para datos y ML | unit e integration tests; regression/golden/failure cases; fixtures y tests de schema | Distinguir “corre” de “conserva el comportamiento correcto” y probar límites reales. |
| 4 | APIs y contratos de servicio | request/response; errores y versionado; FastAPI y health check | Diseñar una frontera validada con respuestas 2xx/4xx/5xx controladas y health check mínimo. |
| 5 | Empaquetado y entornos | dependencias y lockfile; imagen y contenedor; runtime y artefacto | Distinguir código, entorno, imagen, contenedor y despliegue; producir un artefacto reproducible. |
| 6 | Integración y entrega continua | pipeline CI; test/build gate y secrets; CI frente a CD | Detener una entrega ante lint/tests/build fallidos y separar integración de despliegue autorizado. |
| 7 | Despliegue y operabilidad mínima | servicio y configuración por entorno; logs y fallos de arranque; handoff versionado | Desplegar una implementación de referencia con logs, health check, versión y candidato de rollback, sin adelantar monitoreo profundo. |

**Implementación de referencia:** FastAPI, Docker, GitHub Actions y un despliegue
conceptual principal en Cloud Run. Los conceptos sobreviven al cambio de proveedor.
**No objetivos:** Kubernetes, Terraform, service mesh, microservicios empresariales,
Linux profundo, certificación cloud, frontend avanzado o DevOps general.

## Nivel 12: Operación y monitoreo responsable

| Bloque | Conceptos | Resultado esperado |
| --- | --- | --- |
| Readiness operativo | readiness, baseline, ensayo de rollback, aprobación humana | Autorizar o detener la operación de un producto ya construido mediante evidencia, referencia, reversibilidad y autoridad. |
| Monitoreo | data drift, performance drift, calibration drift, umbral de alerta | Detectar cambios sin convertir cada variación en incidente. |
| Respuesta a incidentes | triage, impacto, rollback operativo, postmortem | Contener daño, preservar evidencia y corregir la causa raíz. |
| Handoff responsable | model card, runbook, audit log, retiro | Entregar, operar y retirar un sistema de forma trazable. |

## Eje transversal de trabajo con agentes

Este eje es acumulativo y auxiliar: nunca sustituye el resultado esperado del
bloque de ciencia de datos.

| Nivel | Competencia acumulativa | Evidencia observable |
| --- | --- | --- |
| 1 | Esquema, diccionario de datos y skill como procedimiento verificable | Describe unidad, variables, vacíos y una skill con entrada, pasos, salida, comprobaciones y límites. |
| 2 | Parámetros, entradas, salidas y operaciones compatibles | Ajusta un parámetro y explica qué operación y salida siguen siendo válidas. |
| 3 | Incertidumbre, supuestos y validación de respuestas | Señala qué no se sabe y contrasta una respuesta del agente con evidencia. |
| 4 | Contexto, asociación frente a causalidad | Escribe contexto suficiente y rechaza una explicación causal no sustentada. |
| 5 | Esquemas, relaciones y validación de SQL asistido | Inspecciona esquemas y relaciones; verifica granularidad y procedencia; valida queries generadas por agentes y detecta JOINs que duplican o pierden unidades. |
| 6 | Pipelines, preparación y prevención de leakage | Ordena pasos y evita introducir información futura o del objetivo. |
| 7 | Evals, casos de prueba y costos de error | Define aceptación y prueba fallos conectados con consecuencias del dominio. |
| 8 | Revisión humana de segmentos y anomalías | Usa la salida como priorización y documenta la revisión humana. |
| 9 | Versionado temporal y experimentos reproducibles | Fija corte temporal, versión, tratamiento y criterio de decisión. |
| 10 | Procedencia, privacidad, auditoría y transferencia de skills | Entrega artefactos rastreables que otra persona puede ejecutar y revisar. |
| 11 | Especificación y revisión de código asistido | Escribe contratos y criterios de aceptación para agentes de código, revisa diffs, ejecuta tests y rechaza implementaciones que incumplen el contrato. |
| 12 | Operación, monitoreo, incidentes y retiro | Define gates, alertas, rollback y responsabilidades que otra persona puede ejecutar. |

## Prioridades de producción

### Publicado

Los doce niveles tienen contenido completo y publicado: 212 conceptos, 406
ejercicios, 636 prompts y 57 bloques. Los totales resultan de sumar a la base
histórica 40 conceptos implementados, dos ejercicios y tres prompts por concepto,
y catorce bloques nuevos.

### Próxima vertical slice

Revisar con docentes el handoff `dataset_confiable@L5.H1 → Nivel 6` en una clase
piloto y registrar únicamente ajustes de comprensión; la ruta estructural queda cerrada.

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

Cada nivel implementado debe declarar `level-shell-v1`. Para Niveles 7–10 las familias base
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

- **Niveles estructuralmente aprobados:** 1–12.
- **Niveles con contenido completo y publicado:** 1–12 (12 niveles).
- **Niveles pendientes de producción:** ninguno.
- **Total publicado:** 212 conceptos, 406 ejercicios y 636 prompts en 57 bloques.
- **Cierre:** Nivel 12 termina con operación, monitoreo, respuesta a incidentes y retiro responsable.
