# Estructura de la Generación 1 · The Agentic Data Scientist

**Estado:** propuesta aprobada por el autor el 24 de octubre de 2026 (respuestas 16 a 24). Fuente de verdad de qué caso va en
cada clase. El tablero interactivo con todos los indicadores de cada caso vive en Claude («Tablero de casos · Generación 1»).

- **Calendario:** 22 clases de 3 horas, viernes 18:00–21:00 y sábados 8:00–11:00 (Ciudad de México), del 8 de enero al 20 de
  marzo de 2027.
- **Unidad:** 10 módulos con nombre atractivo y una pregunta para el alumno. Cada módulo combina uno o dos niveles de
  `docs/CURRICULUM_MAP.md`; los laboratorios de esos niveles son la biblioteca del módulo (práctica opcional, no se califica).
- **Cada clase:** un caso principal (ingenio o mixto) y un caso de «el costo del error», más opciones secundarias por si un
  caso no convence o hace falta tarea. Todos los casos, también los de error, tienen intro animada en la página con material
  real del caso (fotos, recortes de noticias, videos), con créditos y licencia (`site/casos/README.md`).
- **Mínimo viable por clase:** al menos un caso (el principal). Si una clase se alarga, el caso del error pasa a tarea.
- **Hábitos:** dos casos seguidos nunca entrenan el mismo hábito de criterio (`docs/CRITERIO_PRIMERO.md`). La columna «Hábito»
  es el que entrena el caso en esta clase; a veces difiere del sugerido por el catálogo.
- **Se califica lo que pasa en Colab** (apuestas, retos, encargos, verificaciones, firmas y Mi decisión). Las misiones web no
  cuentan para la calificación.
- **Fuera de la Generación 1:** el Nivel 12 (ingeniería de productos de datos) y la parte profunda del 13 quedan como
  autoestudio en los 12 meses de Augmented Studio incluidos; el Módulo 9 da lo que un analista necesita de agentes.

## Mapa de módulos

| Módulo | Para el alumno | Niveles | Clases |
| --- | --- | --- | --- |
| 1. **Datos que mienten** | ¿Puedo creerle a estos datos? | Nivel 1 · Fundamentos | 1–2 (vie 8 ene a sáb 9 ene) |
| 2. **Ver para decidir** | ¿Qué dicen los datos y cómo lo muestro? | Nivel 2 · Descripción y visualización | 3–4 (vie 15 ene a sáb 16 ene) |
| 3. **Apostar con incertidumbre** | ¿Es azar o es real? | Nivel 3 · Probabilidad e inferencia | 5–6 (vie 22 ene a sáb 23 ene) |
| 4. **Comparaciones justas** | ¿Contra qué lo comparo? | Nivel 4 · Relaciones entre variables + Nivel 10 · Causalidad | 7–8 (vie 29 ene a sáb 30 ene) |
| 5. **¿Funcionó?** | ¿Cómo sé que funcionó y qué debo medir? | Nivel 9 · Experimentación + Nivel 10 · Métricas de decisión | 9–11 (vie 5 feb a vie 12 feb) |
| 6. **Dónde viven los datos** | ¿Cómo saco la tabla correcta? | Nivel 5 · Sistemas de datos modernos y SQL | 12–13 (sáb 13 feb a vie 19 feb) |
| 7. **Predecir sin engañarte** | ¿Hace falta un modelo y cómo sé que sirve? | Nivel 6 · Modelado supervisado + Nivel 7 · Evaluación | 14–16 (sáb 20 feb a sáb 27 feb) |
| 8. **Patrones y futuro** | ¿Qué patrones hay y qué viene? | Nivel 8 · Aprendizaje no supervisado + Nivel 9 · Datos temporales | 17–18 (vie 5 mar a sáb 6 mar) |
| 9. **Tu equipo de agentes** | ¿Cómo delego en una IA sin perder el control? | Nivel 13 · Ingeniería de sistemas de IA (y Nivel 12, ligero) | 19–20 (vie 12 mar a sáb 13 mar) |
| 10. **Firmar la decisión** | ¿Quién responde por esta decisión? | Nivel 11 · Análisis responsable + Nivel 14 · Operación y monitoreo | 21–22 (vie 19 mar a sáb 20 mar) |

## Módulo 1 · Datos que mienten

**Para el alumno:** ¿Puedo creerle a estos datos? · **Niveles:** Nivel 1 · Fundamentos

**Objetivo observable:** Decir qué representa cada fila, qué tipo tiene cada dato, qué falta y por qué, antes de contar nada.

**Temas técnicos:** Proceso generador de datos y unidad de observación; Población, muestra y marco muestral; Sesgo de selección y de supervivencia; Faltantes al azar y no al azar (MCAR, MAR, MNAR); Definir la variable: qué tiene que pasar para que algo cuente; Tipos de datos, unidades y conversiones implícitas; Validar rangos y totales de control; Diccionario de datos.

**Lo reciente:** Datos sintéticos y datos generados por IA: cómo se etiquetan y cómo contaminan una tabla; El diccionario de datos como contexto para un asistente de IA.

**Trabajo con IA:** Verificar un resultado «del asistente» que trae un error plantado (se avisa que puede haberlo, no dónde).

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 1 · vie 8 ene | **¿Qué aviones no volvieron?** | Sesgo de supervivencia, Faltantes no aleatorios, Proceso generador de datos, Definir la variable, Exceso sobre lo esperado | 1.1 Abraham Wald y los bombarderos (`faltan`) | E64 Puerto Rico: 64 o 2,975 (`mide`) | N01 (calentamiento), 1.3, E02, E03, E04 |
| 2 · sáb 9 ene | **2.4 millones de boletas equivocadas** | Marco muestral y no respuesta, Tamaño frente a representatividad, Unidades y factores de conversión, Validar rangos, Totales de control | 1.2 La encuesta del Literary Digest (`faltan`) | E48 El planeador de Gimli (`verificar`) | 13.7 (tarea), E44 (tarea), E01, 13.1 |

Por qué cada caso:

- **Clase 1.** 1.1 Abraham Wald y los bombarderos: El caso más enganchante y el más avanzado: abre el curso con «¿qué falta en mis datos?». El reembolso vale hasta la clase 2. E64 Puerto Rico: 64 o 2,975: Qué cuenta como muerte por el huracán cambió 64 por 2,975: definir la variable antes de comparar.
- **Clase 2.** 1.2 La encuesta del Literary Digest: Más datos no es mejores datos: marco muestral y no respuesta frente a la muestra chica de Gallup. E48 El planeador de Gimli: Libras por kilos: un factor de conversión dejó a un 767 sin combustible en pleno vuelo. Se calcula a mano.

## Módulo 2 · Ver para decidir

**Para el alumno:** ¿Qué dicen los datos y cómo lo muestro? · **Niveles:** Nivel 2 · Descripción y visualización

**Objetivo observable:** Resumir y graficar para responder una pregunta, con el denominador correcto y sin engañar a nadie (ni a uno mismo).

**Temas técnicos:** Distribuciones, centro y dispersión; Tasas frente a conteos y el denominador correcto; Mapas y agregación espacial; Comparaciones visuales y small multiples; Gráficas honestas: ejes, escalas y lo que se omite; Gráficos de control y de embudo para detectar lo inusual.

**Lo reciente:** Análisis exploratorio asistido por IA y cómo verificarlo; Dashboards que responden una decisión, no que lo muestran todo.

**Trabajo con IA:** Pedirle al asistente una gráfica y revisar ejes, denominadores y filas antes de usarla.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 3 · vie 15 ene | **El mapa que detuvo una epidemia** | Conteos espaciales, Tasas por población expuesta, Comparar dos grupos con una gráfica, Lo que una gráfica deja fuera | 2.1 John Snow y el cólera (`comparar`) | 2.3 El transbordador Challenger (`faltan`) | E05 |
| 4 · sáb 16 ene | **La rosa que cambió un hospital** | Tasas y estandarización, Gráficas que persuaden con honestidad, Gráfico de control y de embudo, Comparar con lo esperado | 2.2 Florence Nightingale en Crimea (`mide`) | E29 Shipman y el gráfico que nadie hizo (`comparar`) | E28, E06 |

Por qué cada caso:

- **Clase 3.** 2.1 John Snow y el cólera: Un mapa y una tasa por compañía de agua: análisis exploratorio que cambió una decisión. 2.3 El transbordador Challenger: La gráfica del Challenger sin los vuelos sin falla: lo omitido costó siete vidas.
- **Clase 4.** 2.2 Florence Nightingale en Crimea: Una gráfica bien hecha cambió la política sanitaria: tasas frente a conteos. E29 Shipman y el gráfico que nadie hizo: El gráfico de control que nadie hizo: comparar a un médico con lo esperado habría detenido a Shipman.

## Módulo 3 · Apostar con incertidumbre

**Para el alumno:** ¿Es azar o es real? · **Niveles:** Nivel 3 · Probabilidad e inferencia

**Objetivo observable:** Decidir si una diferencia es señal o ruido, y actualizar una creencia con evidencia, simulando antes que memorizando fórmulas.

**Temas técnicos:** Probabilidad, independencia y la falacia del fiscal; Simulación Monte Carlo y prueba de permutación; Valor p explicado con simulación; Intervalos y bootstrap; Bayes: actualizar con evidencia, incluida la negativa; Valor esperado; Colas pesadas y eventos raros.

**Lo reciente:** Inferencia por simulación en lugar de tablas y fórmulas; Probabilidades calibradas: qué significa «70 %».

**Trabajo con IA:** Delegar una simulación acotada al asistente y verificarla con un caso a mano.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 5 · vie 22 ene | **¿Azar o descubrimiento?** | Simular el azar, Prueba de permutación, Valor p intuitivo, Chi cuadrada, nombrada al final, Independencia | 4.1 Semmelweis y el lavado de manos (`incertidumbre`) | 3.1 El caso Sally Clark (`quien`) | E07, E08, 3.4, S11 |
| 6 · sáb 23 ene | **Encontrar un avión en el fondo del mar** | Bayes y mapas de probabilidad, Actualizar con lo que no se encontró, Estimar con poca información, Periodos de retorno y colas | 3.3 La búsqueda del vuelo 447 de Air France (`incertidumbre`) | E09 Fukushima y el tsunami «imposible» (`fuera`) | 3.2, E35, 10.5, 11.3 |

Por qué cada caso:

- **Clase 5.** 4.1 Semmelweis y el lavado de manos: Ya construido: su lluvia de mil mundos enseña a separar azar de señal. Es el ancla del Nivel 3. 3.1 El caso Sally Clark: Multiplicar probabilidades que no eran independientes encarceló a una madre.
- **Clase 6.** 3.3 La búsqueda del vuelo 447 de Air France: Bayes encontró el AF447 tras dos años: actualizar con la evidencia, incluida la negativa. E09 Fukushima y el tsunami «imposible»: Un tsunami «imposible»: subestimar las colas costó una planta nuclear.

## Módulo 4 · Comparaciones justas

**Para el alumno:** ¿Contra qué lo comparo? · **Niveles:** Nivel 4 · Relaciones entre variables + Nivel 10 · Causalidad

**Objetivo observable:** Comparar grupos que sí se pueden comparar y decir cuándo una diferencia es causal, con el supuesto que lo sostiene.

**Temas técnicos:** Confusores y paradoja de Simpson; Estratificar y ajustar; Diagramas causales (DAG): confusor, mediador y colisionador; Regresión a la media y extremos de muestras chicas; Diferencias en diferencias y tendencias paralelas; Regresión discontinua; Variable instrumental y control sintético.

**Lo reciente:** Inferencia causal con machine learning (doble ML) como mapa, no como receta; Control sintético para evaluar políticas.

**Trabajo con IA:** Pedirle al asistente una explicación causal y rechazarla si no hay una comparación válida.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 7 · vie 29 ene | **La paradoja que absolvió a Berkeley** | Paradoja de Simpson, Confusores, Estratificar, Diagrama causal, Regresión a la media | 4.2 Admisiones de posgrado en Berkeley (`comparar`) | 6.2 La terapia hormonal en la menopausia (`verificar`) | 4.4, 4.3, E10, E17, 4.5 |
| 8 · sáb 30 ene | **Causas sin experimento** | Diferencias en diferencias, Regresión discontinua, Variable instrumental, Control sintético, El supuesto que sostiene cada método | 6.3 El salario mínimo en Nueva Jersey (`comparar`) | E16 Hoy No Circula (`mide`) | 6.1, 6.5, 6.4 |

Por qué cada caso:

- **Clase 7.** 4.2 Admisiones de posgrado en Berkeley: Ya construido: Simpson y confusores con datos reales. Es el ancla del Nivel 4. 6.2 La terapia hormonal en la menopausia: La terapia hormonal: los estudios observacionales y el ensayo dijeron lo contrario; el confusor costó salud.
- **Clase 8.** 6.3 El salario mínimo en Nueva Jersey: Salario mínimo en Nueva Jersey: diferencias en diferencias con dos estados vecinos (Nobel 2021). Ancla del Nivel 10. E16 Hoy No Circula: Caso mexicano: Hoy No Circula no limpió el aire de la CDMX; evaluarlo bien lo mostró.

## Módulo 5 · ¿Funcionó?

**Para el alumno:** ¿Cómo sé que funcionó y qué debo medir? · **Niveles:** Nivel 9 · Experimentación + Nivel 10 · Métricas de decisión

**Objetivo observable:** Diseñar y leer un experimento, y elegir una métrica que no se pueda engañar.

**Temas técnicos:** Aleatorización y grupo de control; Poder, tamaño de muestra y efecto mínimo detectable; Pruebas A/B en línea; Espiar resultados y pruebas secuenciales; Reducción de varianza (CUPED); Bandits: explorar contra explotar; Efectos heterogéneos y uplift; Métrica norte y guardarraíles; Ley de Goodhart; Ética de experimentar con personas.

**Lo reciente:** Goodhart en los rankings de modelos de IA; Experimentar con productos que usan IA.

**Trabajo con IA:** Delegar el análisis de una prueba A/B y verificarlo con los conteos de asignación y una prueba A/A.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 9 · vie 5 feb | **El sorteo que convenció al mundo** | Ensayo aleatorizado, Grupo de control, Poder y tamaño de muestra, Efecto promedio, Ética de la asignación | S06 Progresa: quién entra primero, al azar (`comparar`) | E15 «Scared Straight» (`quien`) | N02, 5.1, D07, S04 |
| 10 · sáb 6 feb | **A/B: el botón, la carta y la paciencia** | A/B en línea, Espiar y pruebas secuenciales, CUPED, Bandits, Varias métricas a la vez | S09 Las cartas del fisco británico (`simple`) | 5.6 Optimizely y el problema de espiar las pruebas (`verificar`) | 5.2, S12, 5.4, 5.5, 5.3 |
| 11 · vie 12 feb | **La métrica que mentía** | Elegir la métrica, Indicadores sustitutos, Ley de Goodhart, Métrica norte y guardarraíles, Auditar una medición | 7.1 Moneyball y los Oakland Athletics (`mide`) | E19 Volkswagen y el software que sabía cuándo lo medían (`verificar`) | N03, E18, 7.3, E20, 7.4, E21 |

Por qué cada caso:

- **Clase 9.** S06 Progresa: quién entra primero, al azar: Caso mexicano: Progresa aleatorizó quién entraba primero y convenció al mundo de sus efectos. E15 «Scared Straight»: Scared Straight: sin grupo de control, un programa dañino parecía funcionar.
- **Clase 10.** S09 Las cartas del fisco británico: Una frase en una carta, probada al azar, hizo pagar a más contribuyentes. 5.6 Optimizely y el problema de espiar las pruebas: Optimizely: detenerse al ver un «ganador» llena de falsos positivos.
- **Clase 11.** 7.1 Moneyball y los Oakland Athletics: Moneyball: medir lo que de verdad gana partidos. E19 Volkswagen y el software que sabía cuándo lo medían: Volkswagen: optimizar la prueba en vez de la realidad, con software.

## Módulo 6 · Dónde viven los datos

**Para el alumno:** ¿Cómo saco la tabla correcta? · **Niveles:** Nivel 5 · Sistemas de datos modernos y SQL

**Objetivo observable:** Hacer preguntas en SQL sobre tablas reales, a escala, y saber cuándo un JOIN o un formato cambió la respuesta.

**Temas técnicos:** Modelo relacional, llaves y granularidad; SELECT, WHERE, GROUP BY y HAVING; JOINs, anti-join y explosión de filas; CTE y funciones de ventana; Tabla analítica con fecha de corte; Parquet, DuckDB y Polars; Contratos de datos, linaje y conciliación.

**Lo reciente:** Texto a SQL con un LLM y cómo verificar la consulta que escribe; Motores analíticos locales (DuckDB) en lugar de servidores.

**Trabajo con IA:** Delegar consultas SQL al asistente y verificarlas con filas que entran y salen y un caso a mano.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 12 · sáb 13 feb | **La consulta que perdió 16,000 casos** | SQL para hacer preguntas, Agrupar y contar, Funciones de ventana, Definiciones de negocio, Límites de formatos | S18 ¿Sigue siendo cliente? La regla del hiato (`simple`) | 13.3 Los casos de COVID perdidos en Excel (`verificar`) | E60, E52, 13.2 |
| 13 · vie 19 feb | **Cuando el sistema y la persona no coinciden** | JOINs que duplican, Conciliación, Contratos y esquemas, Linaje, Agrupar a escala (de MapReduce a DuckDB) | 13.8 Google y MapReduce (`simple`) | E56 Horizon: cuando el sistema acusó a cientos (`verificar`) | E57, E63, E49, E50, E62 |

Por qué cada caso:

- **Clase 12.** S18 ¿Sigue siendo cliente? La regla del hiato: Definir «cliente activo» con una regla simple en SQL: la regla del hiato. 13.3 Los casos de COVID perdidos en Excel: Un formato con límite de filas perdió casos de COVID en Inglaterra. Ancla del Nivel 5.
- **Clase 13.** 13.8 Google y MapReduce: Dividir y combinar: la idea de MapReduce detrás de agrupar datos a escala. E56 Horizon: cuando el sistema acusó a cientos: Horizon: registros duplicados tratados como prueba; conciliar antes de acusar.

## Módulo 7 · Predecir sin engañarte

**Para el alumno:** ¿Hace falta un modelo y cómo sé que sirve? · **Niveles:** Nivel 6 · Modelado supervisado + Nivel 7 · Evaluación

**Objetivo observable:** Comparar todo modelo con una línea base simple, validarlo sin fugas y elegir el umbral según lo que cuesta equivocarse.

**Temas técnicos:** Línea base y reglas simples; Regresión lineal y logística; Árboles de decisión; Ensambles: random forest y gradient boosting; Validación cruzada y temporal; Sobreajuste y fuga de información; Precisión, sensibilidad, AUC y matriz de confusión; Calibración y umbral por costos; Explicabilidad (SHAP); Equidad de los errores.

**Lo reciente:** Predicción conforme: intervalos con garantía de cobertura; En datos tabulares, el gradient boosting sigue ganando a las redes; La crisis de reproducibilidad por fugas en ciencia hecha con ML.

**Trabajo con IA:** Delegar un pipeline de modelo y verificarlo con la línea base fuera de muestra y una revisión de fugas.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 14 · sáb 20 feb | **¿Hace falta un modelo?** | Línea base, Reglas simples, Árbol de decisión, Regresión logística, Etiqueta proxy | 8.1 El árbol del dolor de pecho (`simple`) | E23 El algoritmo que confundía gasto con necesidad (`mide`) | S13, S05, S19, 8.2, E25 |
| 15 · vie 26 feb | **Validar sin hacer trampa** | Entrenamiento y prueba, Validación cruzada y temporal, Sobreajuste, Fuga de información, Complejidad contra valor | 8.4 El Netflix Prize (`simple`) | 8.6 La mantequilla de Bangladesh y la bolsa (`fuera`) | N04, 12.5, E24, 12.8 |
| 16 · sáb 27 feb | **Cuánto cuesta equivocarse** | Matriz de confusión, Costos asimétricos y umbral, Calibración, Predicción conforme, Valor esperado de la decisión | D04 La cuarta oportunidad en el futbol americano (`decision`) | 8.8 Los subsidios en Países Bajos (`quien`) | 12.3, 14.3, E26, 10.2 |

Por qué cada caso:

- **Clase 14.** 8.1 El árbol del dolor de pecho: Tres preguntas superaron al juicio experto: el árbol como línea base. Ancla del Nivel 6. E23 El algoritmo que confundía gasto con necesidad: Predecir gasto en vez de necesidad: la etiqueta equivocada discriminó pacientes.
- **Clase 15.** 8.4 El Netflix Prize: Netflix Prize: el ensamble ganador nunca se usó; precisión contra costo. 8.6 La mantequilla de Bangladesh y la bolsa: La mantequilla de Bangladesh predecía la bolsa: sobreajuste puro.
- **Clase 16.** D04 La cuarta oportunidad en el futbol americano: La cuarta oportunidad: decidir con valor esperado contra la costumbre. 8.8 Los subsidios en Países Bajos: Falsos positivos de fraude hundieron a miles de familias y al gobierno neerlandés. Ancla del Nivel 7.

## Módulo 8 · Patrones y futuro

**Para el alumno:** ¿Qué patrones hay y qué viene? · **Niveles:** Nivel 8 · Aprendizaje no supervisado + Nivel 9 · Datos temporales

**Objetivo observable:** Encontrar grupos y anomalías que valgan una revisión humana, y pronosticar contra una línea base ingenua.

**Temas técnicos:** Segmentación con k-means; Reducción de dimensión (PCA, UMAP); Detección de anomalías (isolation forest, Benford); Embeddings y similitud; Tendencia y estacionalidad; Líneas base ingenuas y estacionales; Backtesting; Pronóstico probabilístico.

**Lo reciente:** Embeddings para búsqueda semántica; Modelos fundacionales para series de tiempo (TimesFM, Chronos).

**Trabajo con IA:** Delegar un pronóstico y exigir el backtest contra la línea base ingenua antes de creerle.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 17 · vie 5 mar | **Encontrar lo raro** | Segmentación, Anomalías, Ley de Benford, Revisión humana de lo que marca el modelo | 9.1 Tesco Clubcard (`decision`) | 9.2 Markopolos y Madoff (`verificar`) | E31, 9.3, 9.4, 9.5 |
| 18 · sáb 6 mar | **Pronosticar la próxima ola** | Series de tiempo, Estacionalidad, Backtesting, Intervalos de pronóstico, Deriva | D08 Cerrar la ciudad con pocos datos: influenza 2009 (`decision`) | 10.3 Google Flu Trends (`fuera`) | D02, S15, 13.6, 10.4, E34, 10.1 |

Por qué cada caso:

- **Clase 17.** 9.1 Tesco Clubcard: Tesco Clubcard: segmentar clientes con datos de tarjeta para decidir. Ancla del Nivel 8. 9.2 Markopolos y Madoff: Madoff: rendimientos demasiado suaves; la anomalía que nadie quiso escuchar.
- **Clase 18.** D08 Cerrar la ciudad con pocos datos: influenza 2009: Caso mexicano: cerrar la ciudad con pocos datos durante la influenza de 2009. 10.3 Google Flu Trends: Google Flu Trends: las búsquedas dejaron de predecir; deriva y sobreajuste.

## Módulo 9 · Tu equipo de agentes

**Para el alumno:** ¿Cómo delego en una IA sin perder el control? · **Niveles:** Nivel 13 · Ingeniería de sistemas de IA (y Nivel 12, ligero)

**Objetivo observable:** Usar LLMs y agentes para analizar datos, con evidencia citada, evaluaciones y permisos, y firmar lo que entregan.

**Temas técnicos:** Cómo funciona un LLM para decidir: tokens, contexto y temperatura; Salida estructurada; Embeddings y recuperación (RAG) con citas; Alucinación y abstención; Evaluaciones: casos dorados y LLM como juez; Agentes y herramientas (MCP); Loops, estado y criterios de parada; Permisos e inyección de instrucciones; Costo y latencia.

**Lo reciente:** Agentes que ejecutan código y consultas; Protocolo MCP para conectar herramientas; Evaluar productividad real con IA, no la percibida.

**Trabajo con IA:** Construir un mini-agente de análisis que cite sus fuentes, pase una evaluación y deje la firma a una persona.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 19 · vie 12 mar | **Cómo piensa (y alucina) un LLM** | Tokens y contexto, RAG con citas, Alucinación y abstención, Evaluaciones con casos dorados | S20 La frontera irregular de la IA (`decision`) | 12.7 Los precedentes inventados del caso Avianca (`verificar`) | 15.1, E41, E69, E70, 15.2 |
| 20 · sáb 13 mar | **Delegar a un agente sin perder el control** | Agentes y herramientas, Permisos, Criterios de parada, Inyección de instrucciones, Medir la productividad real | S21 Más lentos con IA, y convencidos de ir más rápido (`mide`) | 15.4 El agente de Replit que borró una base (`firmar`) | 12.6, 15.3, S22, S23, E75, N05 |

Por qué cada caso:

- **Clase 19.** S20 La frontera irregular de la IA: La frontera irregular: dentro, la IA ayuda; fuera, empeora el trabajo. Cuándo delegar. 12.7 Los precedentes inventados del caso Avianca: Avianca: precedentes inventados ante un juez; verificar cada cita.
- **Clase 20.** S21 Más lentos con IA, y convencidos de ir más rápido: Creían ir más rápido con IA y fueron más lentos: medir antes de creer. 15.4 El agente de Replit que borró una base: Un agente borró una base en producción: permisos y firma. Ancla del Nivel 14.

## Módulo 10 · Firmar la decisión

**Para el alumno:** ¿Quién responde por esta decisión? · **Niveles:** Nivel 11 · Análisis responsable + Nivel 14 · Operación y monitoreo

**Objetivo observable:** Entregar una decisión con privacidad, equidad, monitoreo y firma, y presentar el proyecto Mi decisión.

**Temas técnicos:** Reidentificación y anonimización; Privacidad diferencial; Métricas de equidad y su imposibilidad simultánea; Explicabilidad, tarjetas de modelo y de decisión; Reproducibilidad; Monitoreo y deriva; Gobernanza y regulación; Firma humana.

**Lo reciente:** Ley de IA de la Unión Europea (en vigor desde 2024); Privacidad diferencial del Censo de EE. UU. 2020; Tarjetas de decisión para trabajo con agentes.

**Trabajo con IA:** Auditar un sistema con IA y firmar la decisión final de Mi decisión: encargo, verificaciones y firma registrados.

| Clase | Título | Temas de la clase | Caso principal (hábito) | Costo del error (hábito) | Opciones secundarias |
| --- | --- | --- | --- | --- | --- |
| 21 · vie 19 mar | **Lo que el modelo no debía saber** | Equidad y sus métricas, Privacidad y reidentificación, Explicabilidad, Regulación | 14.1 COMPAS y el riesgo de reincidencia (`quien`) | E66 Sweeney y el expediente del gobernador (`verificar`) | 14.4, E65, E68, 14.2, 14.5 |
| 22 · sáb 20 mar | **Firmo esta decisión** | Monitoreo, Listas de verificación, Responsabilidad, Presentación del proyecto Mi decisión | S01 El bombardero que nadie podía volar de memoria (`simple`) | E61 Boeing 737 MAX: un solo sensor (`firmar`) | S03, 13.4, E30 |

Por qué cada caso:

- **Clase 21.** 14.1 COMPAS y el riesgo de reincidencia: COMPAS: no se pueden cumplir todas las métricas de equidad a la vez. Ancla del Nivel 11. E66 Sweeney y el expediente del gobernador: Tres datos bastaron para reidentificar el expediente médico de un gobernador.
- **Clase 22.** S01 El bombardero que nadie podía volar de memoria: Cerrar donde empezamos: un bombardero que nadie podía volar de memoria y la primera lista de verificación. E61 Boeing 737 MAX: un solo sensor: Boeing 737 MAX: un solo sensor sin redundancia; quién firma el riesgo.

## Banco por módulo

Casos del catálogo que no quedaron en una clase. Se quedan en el módulo donde encajan, como reemplazo o lectura.

| Módulo | Caso | Hábito | Por qué en este módulo |
| --- | --- | --- | --- |
| 5. ¿Funcionó? | D01 Estudios antes de operar cataratas | `decision` | Un ensayo mostró que los estudios previos no cambiaban nada: valor de la información. |
| 5. ¿Funcionó? | S08 Ahorro para el retiro: inscribir a todos por defecto | `decision` | Inscripción automática: un efecto enorme medido con cohortes, y otro no buscado. |
| 5. ¿Funcionó? | S02 El puntaje Apgar | `mide` | Construir una medición simple y confiable: cinco observaciones de 0 a 2. |
| 5. ¿Funcionó? | E14 El experimento de las emociones de Facebook | `quien` | Significativo pero minúsculo, y sin consentimiento: tamaño de efecto y ética del experimento. |
| 5. ¿Funcionó? | S10 Opower y la comparación con los vecinos | `comparar` | Experimento a gran escala con efecto pequeño que cambia entre empresas: heterogeneidad. |
| 5. ¿Funcionó? | E22 Las vistas de video de Facebook | `mide` | El denominador escondido en una métrica de video: auditar la métrica antes de usarla. |
| 5. ¿Funcionó? | S07 Donar órganos: la casilla marcada de antemano | `decision` | La opción predeterminada explica la diferencia entre países: arquitectura de decisiones. |
| 5. ¿Funcionó? | E12 La nueva Coca-Cola | `mide` | Un experimento impecable que medía otra cosa (un sorbo): validez antes que significancia. |
| 5. ¿Funcionó? | E13 Amazon y los precios distintos para el mismo DVD | `quien` | Una prueba de precios que los clientes descubrieron: ética y contaminación entre grupos. |
| 5. ¿Funcionó? | D06 Google y la pregunta de si los jefes importan | `decision` | Un análisis que podía refutar lo que el equipo quería oír: formular la hipótesis. |
| 5. ¿Funcionó? | 7.2 Facebook y los 7 amigos en 10 días | `mide` | Cohortes y retención: una señal temprana como métrica norte de producto. |
| 6. Dónde viven los datos | E46 El Patriot y la décima de segundo | `verificar` | Un error de redondeo que se acumula con las horas: representación de decimales. |
| 6. Dónde viven los datos | E53 Boeing 787: reiniciar cada 248 días | `verificar` | Un entero de 32 bits que se desborda a los 248 días: calcular los límites del tipo. |
| 6. Dónde viven los datos | E11 Duke y las firmas genómicas | `verificar` | Firmas genómicas que nadie pudo reproducir: revisión independiente de un pipeline. |
| 6. Dónde viven los datos | E45 Therac-25: el contador que llegó a 256 | `verificar` | Un contador de un byte que se desbordó: tipos de datos con consecuencias. |
| 6. Dónde viven los datos | E47 El índice de Vancouver que se hundía solo | `verificar` | Truncar en vez de redondear hundió un índice: tipo y precisión. |
| 6. Dónde viven los datos | E51 El año 2000 | `verificar` | Fechas con dos dígitos: formatos con fecha de caducidad (y 2038). |
| 6. Dónde viven los datos | E58 Surgisphere: la base de datos que nadie pudo ver | `verificar` | Una base que nadie pudo auditar: procedencia y chequeos de plausibilidad. |
| 6. Dónde viven los datos | 13.5 La IA para retinopatía en Tailandia | `fuera` | Exacta en el laboratorio, frágil en la clínica: validar donde se usa. |
| 6. Dónde viven los datos | E55 Fidelity y el signo menos | `verificar` | Un signo menos perdido: controles de suma en cada transformación. |
| 6. Dónde viven los datos | E54 El error de división del Pentium | `verificar` | Un error raro de división: frecuencia frente a impacto en casos borde. |
| 6. Dónde viven los datos | E59 Equifax y los puntajes mal calculados | `verificar` | Una migración que calculó mal durante semanas: pruebas de regresión y monitoreo. |
| 7. Predecir sin engañarte | S17 Repartir en partes iguales: la cartera 1/N | `simple` | Dividir en partes iguales le ganó a 14 modelos: la línea base ingenua. |
| 7. Predecir sin engañarte | S14 El reto de las Familias Frágiles | `simple` | 160 equipos con ML apenas superaron una regresión de cuatro variables: línea base y techo. |
| 7. Predecir sin engañarte | D03 Van Dantzig y la altura de los diques | `decision` | La altura de los diques como costo seguro contra pérdida probable: valor esperado. |
| 7. Predecir sin engañarte | 8.7 El sesgo húmedo de los pronósticos | `incertidumbre` | Probabilidades calibradas frente a infladas: diagrama de confiabilidad y puntaje de Brier. |
| 7. Predecir sin engañarte | 11.2 UPS y las vueltas a la izquierda | `mide` | Una función objetivo bien elegida: la ruta más larga puede costar menos. |
| 7. Predecir sin engañarte | S16 El perro y el frisbee | `simple` | Reglas simples frente a indicadores de capital complejos: sobreajuste con pocos datos. |
| 7. Predecir sin engañarte | 11.1 American Airlines y la gestión de ingresos | `decision` | Pronóstico de demanda y optimización de precios: decidir con lo que predices. |
| 7. Predecir sin engañarte | E36 La Ballena de Londres | `verificar` | Un error de fórmula redujo a la mitad el riesgo estimado: verificar el cálculo del modelo. |
| 7. Predecir sin engañarte | 8.5 Obama y los persuadibles | `decision` | Predecir a quién le cambia la decisión el contacto, no quién vota por ti: uplift. |
| 7. Predecir sin engañarte | E27 Watson para oncología | `fuera` | Recomendaba tratamientos sin validación clínica: ¿funciona fuera de sus datos? |
| 7. Predecir sin engañarte | E37 La Navidad de Southwest | `incertidumbre` | Un sistema de programación que colapsó bajo estrés: incertidumbre y resiliencia. |
| 7. Predecir sin engañarte | 8.3 Target y la predicción de embarazos | `mide` | Clasificación con etiquetas indirectas: predecir bien también puede ser el problema. |
| 7. Predecir sin engañarte | D05 Puertas de un sentido y de dos sentidos | `decision` | Decisiones reversibles e irreversibles: cuánta precisión pide cada una. |
| 7. Predecir sin engañarte | E38 La fórmula de la crisis de 2008 | `incertidumbre` | Una correlación que se suponía estable: riesgo de modelo y colas pesadas. |
| 8. Patrones y futuro | E32 Grand Forks y los 9 pies que nadie dijo | `incertidumbre` | Un pronóstico sin su margen de error: comunicar el intervalo, no solo el punto. |
| 8. Patrones y futuro | E33 Nike y el sistema de pronóstico | `verificar` | Un sistema de pronóstico lanzado sin backtesting: validar antes de desplegar. |
| 9. Tu equipo de agentes | 12.1 Los ensayos disputados de El Federalista | `mide` | Estilometría con palabras funcionales: texto como datos antes de los LLM. |
| 9. Tu equipo de agentes | 12.4 El sesgo en los vectores de palabras | `quien` | Sesgo en embeddings: lo que un modelo de lenguaje hereda de sus datos. |
| 9. Tu equipo de agentes | E42 Robert Williams y el arresto por una coincidencia | `firmar` | Una coincidencia de reconocimiento facial tratada como prueba: nadie firmó. |
| 9. Tu equipo de agentes | 12.2 J. K. Rowling y Robert Galbraith | `verificar` | Autoría con n-gramas y distancias: cuatro señales débiles que coinciden. |
| 9. Tu equipo de agentes | E39 Tay, el bot que aprendió de Twitter | `verificar` | Un bot que aprendió de usuarios hostiles: envenenamiento y pruebas adversariales. |
| 9. Tu equipo de agentes | 15.5 Klarna y la atención con IA | `mide` | Métricas de velocidad y costo sin calidad: qué medir en un agente. |
| 9. Tu equipo de agentes | E72 CNET y los artículos escritos con IA | `verificar` | Artículos escritos con IA y cálculos equivocados: revisar antes de publicar. |
| 9. Tu equipo de agentes | E40 Las etiquetas de Google Photos | `quien` | Un error de clasificación con costo humano: evaluar por subgrupo. |
| 9. Tu equipo de agentes | E73 Las imágenes históricas de Gemini | `verificar` | Un ajuste que se aplicó donde no debía: evaluar por casos antes de lanzar. |
| 9. Tu equipo de agentes | E71 Cursor y la política que el bot inventó | `verificar` | Un bot de soporte inventó una política: respuestas basadas en documentos. |
| 9. Tu equipo de agentes | E74 Samsung: el código pegado en ChatGPT | `firmar` | Código confidencial pegado en un chatbot: gobernanza de datos al usar IA. |
| 10. Firmar la decisión | E67 Los taxis de Nueva York y el hash reversible | `quien` | Un hash que se podía revertir: anonimizar no es esconder el identificador. |
| 10. Firmar la decisión | E43 Rekognition y los 28 congresistas | `quien` | Umbral por defecto y falsos positivos por grupo: quién paga el error. |
| 10. Firmar la decisión | 14.6 Italia suspende ChatGPT | `firmar` | Un regulador detuvo un servicio por cómo trataba los datos: quién responde. |

## Casos nuevos (verificados el 24 de octubre de 2026)

| Id | Caso | Dónde | Cifra verificada | Fuente |
| --- | --- | --- | --- | --- |
| N01 | Los gatos que caen de los edificios (1987 y 2004) | Clase 1 · calentamiento | El estudio de 1987 (132 gatos) vio menos lesiones arriba de ~6 pisos; uno de 2004 (119 casos) encontró lo contrario. | [High-rise syndrome (Wikipedia, con Whitney y Mehlhaff 1987 y Vnuk et al. 2004)](https://en.wikipedia.org/wiki/High-rise_syndrome) |
| N02 | Pfizer y los 170 casos que decidieron una vacuna (2020) | Clase 9 · secundaria | Eficacia contra COVID sintomático 7 días después de la segunda dosis; 10 casos graves (9 placebo, 1 vacuna). | [Pfizer y BioNTech, comunicado del análisis final (18 nov 2020)](https://www.businesswire.com/news/home/20201118005595/en/Pfizer-and-BioNTech-Conclude-Phase-3-Study-of-COVID-19-Vaccine-Candidate-Meeting-All-Primary-Efficacy-Endpoints) |
| N03 | Llama 4 y el ranking que se podía optimizar (2025) | Clase 11 · secundaria | LMArena se disculpó, cambió sus reglas y evaluó la versión sin modificar. | [TechCrunch, 11 abr 2025](https://techcrunch.com/2025/04/11/metas-vanilla-maverick-ai-model-ranks-below-rivals-on-a-popular-chat-benchmark) |
| N04 | Ninguno de 62 modelos de COVID por imagen servía (2020–2021) | Clase 15 · secundaria | De 2,212 estudios, 415 pasaron el primer filtro y 62 la revisión de calidad; ninguno con uso clínico potencial. | [Universidad de Cambridge sobre Roberts et al., Nature Machine Intelligence (15 mar 2021)](https://www.cam.ac.uk/research/news/machine-learning-models-for-diagnosing-covid-19-are-not-yet-suitable-for-clinical-use) |
| N05 | Arup: la videollamada con un director falso (2024) | Clase 20 · secundaria | Unos US$25.6 millones; Arup dijo que sus sistemas internos no fueron comprometidos. | [CNN, 16 may 2024](https://edition.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk) |

## Producción

- **Meta:** cada clase lista dos semanas antes. **Límite:** una semana antes.
- **Módulos 1 a 3 (clases 1 a 6) listos el 20 de diciembre de 2026**; del 23 de diciembre al 3 de enero no hay trabajo planeado.
- **Ya construidos:** 4.1 Semmelweis (clase 5) y 4.2 Berkeley (clase 7). 1.1 Wald tiene caso verificado, datos y kit: va primero.
- **Formatos** (plantilla común del generador; cada caso cambia datos, animaciones y retos):
  - **Completo** para el caso principal: intro de 5 escenas (~1 min) y cuaderno de 40 a 60 minutos.
  - **Corto** para el caso del error: intro de 3 escenas (~40 s: el material real, el número que no cuadra y el expediente
    del costo) y cuaderno de 15 a 25 minutos.
- **Carga:** 42 casos nuevos con intro (20 principales y 22 de error). Si no alcanza, el orden de recorte es: primero las
  opciones secundarias, después el cuaderno del caso del error (queda su intro y una lectura guiada), nunca el caso principal.

## Pendiente de decidir

- Fechas de producción clase por clase (tablero, tarea r01).
- Si los cuadernos del Módulo 1 son gratuitos fuera del curso (propuesta: sí, como el Nivel 1).
