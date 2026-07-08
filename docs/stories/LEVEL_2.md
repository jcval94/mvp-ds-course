# Historia Nivel 2: Lo que cuentan los pedidos

## Control del documento

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-2-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 2: Descripción y visualización.
- **Story Bible:** `docs/COURSE_STORY_BIBLE.md`, versión `don-juan-paco-course-v2`.
- **Ledger de entrada:** `L1.4-v2`.
- **Arco:** `docs/LEVEL_2_NARRATIVE_ARC.md`.
- **Dataset narrativo:** 600 pedidos sintéticos, 16 noches, del 4 al 28 de junio de 2026.

Esta historia fue aprobada antes de modificar el nivel interactivo. El diálogo pertenece a Don Juan y Paco; toda voz del narrador se representa visualmente como subtítulo.

## 1. Temario predeterminado

| Orden | Bloque | Concepto |
| ---: | --- | --- |
| 1 | Resumen numérico | media |
| 2 | Resumen numérico | mediana |
| 3 | Resumen numérico | moda |
| 4 | Resumen numérico | rango |
| 5 | Resumen numérico | varianza |
| 6 | Resumen numérico | desviación estándar |
| 7 | Resumen numérico | percentiles |
| 8 | Distribuciones | histograma |
| 9 | Distribuciones | densidad |
| 10 | Distribuciones | forma |
| 11 | Distribuciones | sesgo |
| 12 | Distribuciones | multimodalidad |
| 13 | Distribuciones | bins |
| 14 | Comparación visual | barras |
| 15 | Comparación visual | boxplot |
| 16 | Comparación visual | violin plot |
| 17 | Comparación visual | ECDF |
| 18 | Valores atípicos | outliers |
| 19 | Valores atípicos | leverage |
| 20 | Valores atípicos | error de captura |
| 21 | Valores atípicos | caso raro válido |

**Competencia auxiliar:** declarar entrada, parámetro, operación, salida, comprobaciones y límites. Nunca desplaza el objetivo estadístico de la escena.

## 2. Estado de entrada

El puesto conserva 3 × 2 metros, ocho asientos, un trompo, un comal y venta directa. Don Juan trabaja el turno completo; Paco, su hijo, ayuda tres noches después de la preparatoria. Lupita y Beto no forman parte de la plantilla. Se observaron entre 30 y 45 pedidos en cada una de 16 noches; esto describe el periodo y no demuestra que una mejora lo haya causado.

## 3. Matriz trazable de 21 escenas

| Escena | Concepto | Situación de Aprender | Don Juan | Paco | Subtítulo del narrador · inicio | Subtítulo del narrador · evidencia | Incidente distinto de Ejercitar |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L2-S01` | media | Un pedido grande mueve el punto de equilibrio de `num_tacos` | “Hijo, esa cuenta se fue para arriba. ¿Qué pedido la jaló?” | “Déjame comparar antes y después, Pa.” | La media reparte el total por igual entre todos los pedidos. | Un extremo modifica la media porque aporta toda su magnitud; no vuelve típico ese tamaño. | Una compra de tortillas exige comparar una noche sin el encargo grande. |
| `L2-S02` | mediana | Los pedidos se ordenan y se marca el centro | “¿Cuál queda en medio aunque llegue el pedido grandote?” | “Primero los acomodo; no voy a adivinar el centro.” | La mediana es la posición central de los valores ordenados. | El extremo cambia poco la posición central; resistencia no significa inmunidad. | Un turno con dos retrasos enormes requiere elegir un centro prudente. |
| `L2-S03` | moda | Se cuentan tamaños exactos de pedido | “Yo quiero saber cuál se repite más, no cuál queda bonito.” | “Voy a contar cada tamaño, Pa.” | La moda es el valor con mayor frecuencia y puede no ser única. | La barra más alta identifica el tamaño más frecuente en esta entrada y agrupación. | Preparar bolsas exige identificar el tamaño más común en otra noche. |
| `L2-S04` | rango | Se separan el pedido menor y el mayor | “Del más chico al más grande hay buen trecho.” | “Sí, pero todavía no dice dónde están los demás.” | El rango es máximo menos mínimo. | Dos conjuntos pueden compartir rango y tener interiores distintos. | Don Juan compara la extensión de dos noches antes de aceptar una compra extra. |
| `L2-S05` | varianza | Se hacen visibles distancias cuadradas al centro | “Ese pedido lejano está pesando muchísimo en la cuenta.” | “Porque la distancia se está usando como lado de un cuadrado.” | La varianza promedia desviaciones cuadradas respecto de la media. | Elevar al cuadrado amplifica distancias grandes y cambia la unidad. | Paco revisa dos noches con igual media pero dispersión diferente. |
| `L2-S06` | desviación estándar | La dispersión vuelve a expresarse en tacos | “Ahora sí: dime la separación en tacos, no en tacos cuadrados.” | “Eso sí se puede contar en la mesa, Pa.” | La desviación estándar es la raíz de la varianza y conserva la unidad original. | Resume separación respecto de la media; no garantiza una forma normal. | Un pedido de insumos exige comparar variación en la unidad original. |
| `L2-S07` | percentiles | Se recorren P25, P50 y P75 | “¿Hasta cuántos tacos quedan tres de cada cuatro pedidos?” | “Muevo el corte y leo qué proporción queda antes.” | Un percentil es un umbral con una proporción acumulada a su izquierda. | P75 no significa que 75% de los valores sean iguales al corte. | Se elige capacidad de bolsas para cubrir una proporción declarada. |
| `L2-S08` | histograma | Cantidades se agrupan en intervalos | “Ya veo montones; nomás dime qué metiste en cada cajón.” | “La entrada es la misma, cambio cuántos intervalos uso.” | Un histograma cuenta valores numéricos dentro de intervalos contiguos. | Las barras conservan el total; cambiar intervalos cambia el detalle visible. | Otra noche requiere detectar concentración sin leer 40 tickets uno por uno. |
| `L2-S09` | densidad | Una curva suaviza las marcas individuales | “La curva se ve pareja, pero no quiero que desaparezcan los pedidos.” | “Dejo las marquitas abajo para comprobarlos.” | Una estimación de densidad suaviza observaciones; el área total representa proporción. | El ancho de banda cambia el suavizado y puede ocultar o inventar apariencia de picos. | Paco compara dos suavizados antes de describir concentración. |
| `L2-S10` | forma | Se observan centro, extensión, picos y colas | “No me cuentes solo dónde está el montón; también quiero ver las orillas.” | “Voy a describir todo el dibujo, no nada más una barra.” | La forma integra centro, extensión, picos, huecos y colas. | Describir forma no explica su causa. | Una noche de partido se compara sin atribuir el patrón al partido. |
| `L2-S11` | sesgo | Se resalta una cola hacia pedidos grandes | “Hay pocos pedidos que estiran la cuenta para un lado.” | “Entonces digo hacia dónde va la cola, no si está bien o mal.” | El sesgo describe la dirección de una cola prolongada. | En una cola derecha, la media suele quedar más atraída por valores grandes que la mediana. | Don Juan decide qué centro comunicar ante otra cola visible. |
| `L2-S12` | multimodalidad | `minuto_turno` revela dos concentraciones | “Se nos junta gente dos veces, no una.” | “Una temprano y otra más tarde; lo compruebo en los minutos.” | La multimodalidad aparece cuando una distribución tiene más de una concentración. | Dos picos sugieren subestructuras para investigar; no identifican por sí solos la causa. | Se comparan dos noches con picos en momentos distintos. |
| `L2-S13` | bins | La misma entrada se muestra con 6, 12 y 24 intervalos | “Con tantos cajoncitos parece otro turno.” | “Beto hace algo parecido en su stop-motion: cada cuadro cambia lo que alcanzas a ver.” | Los bins son un parámetro: definen bordes y ancho de los intervalos. | Una conclusión robusta debe revisarse con varias elecciones razonables de bins. | Paco recibe una gráfica recortada y debe pedir parámetro y entrada antes de decidir. |
| `L2-S14` | barras | Se cuentan pedidos por `tipo_taco` desde cero | “¿Cuál taco salió más veces?” | “Cuento pedidos por tipo; no sumo nombres.” | Un gráfico de barras compara categorías mediante longitudes desde una base común. | El eje y la operación deben ser visibles: aquí se cuentan pedidos, no tacos. | Don Juan compara modalidades con un conteo nuevo. |
| `L2-S15` | boxplot | `num_tacos` se compara por `para_llevar` | “Enséñame el centro y qué tan abiertas están las cajas.” | “Y dejo marcados los puntos que toca revisar.” | Un boxplot resume mediana, cuartiles, bigotes y candidatos atípicos. | Compacta bien, pero no muestra toda la forma ni declara errores. | Se comparan dos días con cajas similares y distribuciones distintas. |
| `L2-S16` | violin plot | La densidad reflejada compara días | “Ese dibujo enseña dónde se amontonan, ¿verdad?” | “Sí, pero revisaré el suavizado para no exagerar la cintura.” | Un violin plot refleja una densidad por grupo; el ancho representa concentración. | Su forma depende del suavizado y necesita escala y tamaño de grupo. | Paco compara modalidades con otro ancho de banda. |
| `L2-S17` | ECDF | Se lee la proporción de pedidos bajo un umbral | “Si preparo bolsas para seis tacos, ¿a cuántos pedidos alcanzo?” | “Busco seis y leo la altura acumulada.” | La ECDF asigna a cada umbral la proporción observada menor o igual. | Permite comparar todos los umbrales sin elegir bins. | Se decide entre dos capacidades usando curvas de otra noche. |
| `L2-S18` | outliers | Un pedido grande cruza la cerca IQR | “Raro sí está; borrarlo nomás porque sí, no.” | “Lo marco y busco el ticket.” | Un outlier es una señal estadística para investigar, no un veredicto de error. | La regla IQR detecta candidatos; el contexto determina la acción. | Un nuevo pedido extremo queda pendiente hasta consultar comprobante. |
| `L2-S19` | leverage | Un minuto muy lejano cambia una recta descriptiva | “Ese punto apartado está torciendo la raya.” | “Comparo la raya con y sin él; no diré que una cosa causa la otra.” | Leverage describe una posición extrema en la entrada de un ajuste. | Un punto con leverage puede cambiar la pendiente; influencia y error no son sinónimos. | Otra relación de turno exige medir sensibilidad sin predecir. |
| `L2-S20` | error de captura | La auditoría contrasta `P-005=500` y `L2-X001=360` | “Eso era el total de la noche, no un solo pedido.” | “Lo marco con su fuente; no lo convierto en un número que se vea bonito.” | Un error de captura contradice el significado o la fuente del campo. | Corregir requiere evidencia; mientras tanto se conserva el original y su estado. | Un total de turno nuevo se mezcla con pedidos y debe separarse. |
| `L2-S21` | caso raro válido | Tickets confirman `P-007=30` y `L2-A001=36` | “Fue grande, pero sí salió de esta plancha.” | “Entonces se queda, con la comprobación anotada.” | Un caso raro válido es extremo y auténtico; eliminarlo ocultaría parte del proceso. | La rareza se decide estadísticamente y la validez se confirma con contexto trazable. | Un encargo distinto se conserva sin inferir nada personal del cliente. |

## 4. Separación Aprender / Ejercitar

Cada escena de Aprender revela el mecanismo con el conjunto de 600 pedidos. Cada ejercicio guiado usa un incidente posterior y cada transferencia cambia noche, grupo, umbral o caso de auditoría. Ninguna pregunta puede contestarse antes de recorrer todos los estados visuales; el subtítulo inicial nunca revela la opción correcta.

## 5. Estado de datos

```text
L1.4 → pedidos_4_semanas@L2.1 → resumen@L2.2 → distribuciones@L2.3 → comparaciones_atipicos@L2.4
```

- **Unidad:** pedido.
- **Esquema:** `pedido_id`, `fecha_hora`, `noche_id`, `dia_semana`, `tipo_taco`, `num_tacos`, `nivel_salsa`, `para_llevar`, `minuto_turno`, `estado_calidad`.
- **Auditoría separada:** conserva dos casos históricos y dos nuevos; no contamina la tabla canónica.
- **Versionado:** semilla, generador, dimensiones y SHA-256 se publican en metadata.

## 6. Deltas aprobados

- **`continuityDelta`:** Don Juan pide evidencia en lenguaje del negocio; Paco aprende a declarar entrada, parámetros, salida y límites. Beto revela su stop-motion solo como apoyo de comunicación visual bajo supervisión.
- **`dataStateDelta`:** `L1.4 → L2.4`, con 600 pedidos canónicos y cuatro casos de auditoría trazables.
- **`growthDelta`:** ninguno; el puesto conserva `G1` y el rango observado de 30–45 pedidos por noche no recibe una explicación causal.

## Cierre

Don Juan deja una compra reversible y dice: “Con esto preparo mejor la lista; si mañana cambia, la volvemos a mirar”. El subtítulo final pregunta: **“¿Esto se repetirá o fue casualidad?”**

## Supuestos y límites

- Los pedidos son ficticios y no contienen nombres, edad, género, dieta, ropa ni perfiles inferidos.
- Beto no trabaja, no accede a registros y no se convierte en autoridad técnica.
- Los gráficos describen el periodo; no prueban causalidad ni garantizan demanda futura.
- En vivo utiliza Penguins, Bike Sharing y Wine Quality, con procedencia, licencia y hash, exclusivamente como datasets públicos docentes.
