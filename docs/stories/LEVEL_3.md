# Historia Nivel 3: El piloto y la incertidumbre

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-3-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 3.
- **Arco:** `docs/LEVEL_3_NARRATIVE_ARC.md`.
- **Entrada:** `L2.4`, puesto `G1`.
- **Salida:** `L3.5`, puesto `G2-piloto` sin cambio físico.

La historia fue aprobada antes de modificar el generador. Don Juan habla solo desde el negocio; Paco habla como hijo, ayudante parcial y estudiante; el narrador aparece exclusivamente como subtítulos y concentra nombres, precisión y conclusiones de ciencia de datos.

## Temario canónico y escenas

| Escena | Concepto | Situación de Aprender | Don Juan | Paco | Subtítulo inicial | Subtítulo de evidencia | Ejercitar usa evidencia distinta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L3-S01` | evento | Se marca qué pedidos fueron para llevar | “Mijo, ¿cuáles sí entran en esa cuenta?” | “Primero escribo la regla, apá.” | Un evento es una condición que cada pedido cumple o no. | El numerador contiene solo pedidos que cumplen la regla; el denominador conserva el universo. | Otra noche usa encargo programado como evento. |
| `L3-S02` | complemento | Se separan para llevar y consumo aquí | “Entonces lo de afuera también cuenta.” | “Sí, entre los dos cubren la noche.” | El complemento reúne todos los resultados donde el evento no ocurre. | Evento y complemento no se traslapan y suman el total. | Se separan pedidos con y sin salsa alta. |
| `L3-S03` | independencia | Se comparan tasas de para llevar con y sin encargo | “¿Una cosa cambia cuando miro la otra?” | “Comparo la tasa completa y la filtrada.” | La independencia exige que conocer un evento no cambie la probabilidad del otro. | Una diferencia de tasas describe dependencia en estos datos, no una causa. | Se comparan día de semana y pedido grande. |
| `L3-S04` | probabilidad condicional | El universo se contrae a noches con encargo | “No me mezcles todas las noches si pregunté por esas.” | “Cambio el denominador antes de dividir.” | Una probabilidad condicional recalcula dentro del subconjunto indicado. | El denominador filtrado responde la condición; usar 1,360 pedidos respondería otra pregunta. | Otra condición usa viernes y sábado. |
| `L3-S05` | Bernoulli | Cada noche queda como cumplió/no cumplió el umbral | “Una noche, una respuesta: sí o no.” | “Dejo visible cuál cuenta como éxito.” | Una variable Bernoulli codifica un ensayo binario como 1 o 0. | Cambiar el umbral cambia la definición de éxito, no los registros. | Se cambia el umbral de tacos vendidos. |
| `L3-S06` | binomial | Se cuentan éxitos en bloques de ocho noches | “Ya no es una noche; son varias juntas.” | “Fijo cuántas y cuento los unos.” | Una binomial cuenta éxitos en un número fijo de ensayos comparables. | El conteo varía entre grupos aunque `n` permanezca fijo. | Se usan ocho noches posteriores con otra regla. |
| `L3-S07` | normal | Medias simuladas de pedidos se concentran | “La mayoría cae cerca, pero no todas igual.” | “Es una aproximación, no una promesa.” | La distribución normal es un modelo continuo simétrico definido por centro y dispersión. | La forma de campana aproxima estas medias simuladas bajo supuestos visibles. | Se comparan muestras de 4 y 16 noches. |
| `L3-S08` | Poisson | Se cuentan encargos por semana | “Quiero contar cuántos caen en cada semana.” | “Mantengo la misma ventana.” | Poisson modela conteos de eventos en una exposición fija bajo supuestos. | Cambiar semana por quincena exige ajustar la exposición; los ceros también informan. | Se cuentan agotados en ventanas iguales. |
| `L3-S09` | variabilidad muestral | Muestras distintas producen medias distintas | “Mismo puesto, cuentas algo movidas.” | “Cambió la muestra, no la historia completa.” | Una estadística varía de muestra a muestra. | Muestras mayores suelen reducir la variación, pero no corrigen sesgos. | Se comparan proporciones de para llevar. |
| `L3-S10` | sesgo de selección | Solo noches con encargo elevan el promedio | “Si eliges nomás las cargadas, claro que sale alto.” | “Anoto cómo entró cada noche.” | El sesgo de selección aparece cuando la regla de inclusión altera sistemáticamente lo estimado. | Agregar más noches elegidas con la misma regla no vuelve representativa la muestra. | Se eligen solo noches sin lluvia. |
| `L3-S11` | ley de los grandes números | La media acumulada se estabiliza | “Al principio brinca mucho; luego se calma.” | “Se acerca, pero no queda garantizada.” | Con ensayos comparables, el promedio acumulado tiende a estabilizarse. | La estabilización no elimina sesgo ni convierte el pasado en futuro seguro. | Otra secuencia usa proporción de alta demanda. |
| `L3-S12` | error estándar | Se compara variación del estimador con 8 y 32 noches | “¿Qué tan nerviosa es esa cuenta?” | “No es la variación de cada pedido, apá.” | El error estándar cuantifica la variación esperada de un estimador. | Aumentar `n` reduce el error estándar si el muestreo sigue siendo comparable. | Se estima una proporción en dos tamaños. |
| `L3-S13` | intervalo de confianza | Se construyen rangos 90% y 95% | “Dame un margen, no un número con corbata.” | “También digo cómo se construyó.” | Un intervalo de confianza es un procedimiento que produce rangos con cobertura de largo plazo. | Mayor confianza ensancha el intervalo; no asigna probabilidad al parámetro fijo. | Se estima la media de tacos por noche. |
| `L3-S14` | bootstrap | Se remuestrean noches con reemplazo | “Reusas noches para ver cuánto se mueve la cuenta.” | “Son remuestras, no ventas nuevas.” | Bootstrap aproxima variabilidad remuestreando observaciones con reemplazo. | La distribución bootstrap hereda límites y sesgos de la muestra original. | Se remuestrea una mediana distinta. |
| `L3-S15` | hipótesis | Se contrasta una diferencia observada con un mundo nulo | “Primero dime qué estamos poniendo a prueba.” | “Escribo las dos posibilidades.” | Una prueba compara una estadística observada con lo esperable bajo una hipótesis nula. | No rechazar no prueba igualdad; rechazar tampoco explica una causa. | Se compara proporción de para llevar. |
| `L3-S16` | p-value | Se marca la cola más extrema bajo el nulo | “¿Qué tan raro sería esto si no hubiera diferencia?” | “Leo la cola, no la probabilidad de que la idea sea cierta.” | El p-value es la probabilidad, bajo el nulo, de un resultado tan extremo o más. | No es la probabilidad de que la hipótesis nula sea verdadera. | Otra diferencia observada usa una cola nueva. |
| `L3-S17` | error tipo I | Una alarma aparece aunque el nulo sea cierto | “No quiero mover compras por una falsa alarma.” | “El umbral controla ese riesgo a largo plazo.” | Error tipo I es rechazar una hipótesis nula verdadera. | Un alpha mayor amplía la región de rechazo y el riesgo de falso positivo. | Se cambia alpha con el mismo escenario. |
| `L3-S18` | error tipo II | Una diferencia real no se detecta | “Tampoco quiero que se nos pase algo importante.” | “Eso puede ocurrir si hay poco dato o mucho ruido.” | Error tipo II es no rechazar una hipótesis nula falsa. | Un resultado no significativo no demuestra ausencia de diferencia. | Se compara un efecto menor con el mismo tamaño. |
| `L3-S19` | potencia | Se comparan diseños de 16 y 32 noches | “Antes de esperar milagros, veamos qué puede detectar.” | “Declaro tamaño, efecto y regla.” | La potencia es la probabilidad de detectar un efecto especificado cuando existe. | Depende de tamaño, ruido, alpha y efecto; no se deduce solo del p-value observado. | Se plantea otro efecto mínimo relevante. |

## Continuidad, secretos y crecimiento

- Lupita muestra a Paco un menú de postres que practica; no vende, trabaja ni entra a los datos.
- Elena comparte que creció en un puesto de fruta para explicar por qué pregunta por temporadas; no se vuelve autoridad estadística.
- Iván aclara que sus errores de demostración son deliberados y aislados; el dataset canónico permanece trazable.
- El piloto acepta como máximo un encargo planeado por semana. No hay nueva mesa, equipo, personal ni canal digital.

## Separación de modos y cierre

Aprender usa una escena canónica por concepto. El ejercicio guiado cambia noche, regla o tamaño; la transferencia cambia además la decisión. Ambos permanecen bloqueados hasta recorrer todos los estados y citar evidencia. En vivo usa únicamente snapshots públicos. El cierre es: **“¿Qué cosas cambian juntas?”**

## Supuestos y no objetivos

- Pedidos ficticios sin atributos personales.
- No estimar causalidad, garantizar demanda ni expandir físicamente el puesto.
- No revelar secretos en CSV, prompts o feedback.
