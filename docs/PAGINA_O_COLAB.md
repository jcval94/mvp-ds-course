# ¿Página o Colab? · Reparto de los casos de las clases 5 a 22

**Estado:** PROPUESTA del 13 de noviembre de 2026 (tablero u10, encargo E-14). **No está aprobada:** el autor la aprueba
o la cambia contestando la sección 7. Mientras tanto no cambia ningún otro documento ni se construye nada con base en ella.

**Qué decide:** para cada caso principal y cada caso de «el costo del error» de las clases 5 a 22, si se resuelve en la
página, en Colab o en los dos (mixto). Las clases 1 a 4 ya están decididas (página, `docs/CASO_EN_PAGINA.md`).

**De dónde sale:** decisiones del autor del 4 nov 2026 (Colab entra al inicio de la clase 5 con 4.1 Semmelweis; después
ya no es obligatorio: va solo donde hace falta o donde gana mucho), `docs/ESTRUCTURA_GENERACION_1.md` (casos e ids),
`docs/CRITERIO_PRIMERO.md` (arco y Delegar · Verificar · Firmar), `docs/CASO_EN_PAGINA.md` (qué puede hacer el
reproductor), `docs/GUIA_CASOS.md` (datos reales primero, casos con víctimas) y la skill
`tads-caso-reparto-pagina-colab`.

**Límite de esta propuesta:** `casos/cases.jsonl` está vacío y en `casos/staging/` solo hay dos casos de estas clases
(`hoy-no-circula` y `progresa-evaluacion`, ambos `candidate` y sin `dataset`). El indicador «Datos para reproducir» de
cada caso vive en el tablero de casos, no en el repo, así que **no pude comprobar qué datos reales hay ni con qué
licencia**. Donde el reparto depende de eso, la confianza baja y la fila dice qué dato falta. No contiene respuestas de
retos ni rúbricas.

## 1. Tres formas de resolver un caso

Todo caso conserva su intro pública en la página (gancho, sin apuesta, sin guardar nada). Lo que cambia es dónde se
resuelve.

| Forma | Qué ve el alumno | Cuaderno |
| --- | --- | --- |
| **Página** | Intro → `caso.html` con el arco completo (apuesta, mirar, fricción, herramienta, verificar, firma, revelación, transferir) | Ninguno |
| **Mixto** | Intro → `caso.html` con expediente, apuesta, mirar y fricción → **una sola estafeta** a un cuaderno corto (15 a 25 min) con el tramo de código | Corto, «caso» o «taquería» |
| **Colab** | Intro → cuaderno completo (el patrón actual de 4.1 y 4.2) | Completo, «caso» |

## 2. El criterio en seis reglas

1. **Si dudas, va a la página.** Un caso se resuelve en la página cuando todo lo que hay que hacer cabe en la pantalla
   y se puede hacer a mano: una tabla que se lee completa, una cuenta con la calculadora, una gráfica que se mueve, una
   mesa de verificación. Esto invierte el desempate que hoy tiene la skill («si dudas, va a Colab»).
2. **Colab solo cuando el alumno necesita ejecutar código.** Cinco motivos, y basta uno: (a) repetir una operación
   cientos de veces **y cambiar cómo se hace**; (b) una tabla que no cabe en pantalla (miles de filas); (c) SQL;
   (d) entrenar o validar un modelo; (e) encargar código a Codex y verificarlo. Un simulador con reglas fijas en el
   que el alumno solo mueve controles **no** es motivo: eso es un laboratorio de la página (como el de 1.1).
3. **Todo caso nuevo que necesite Colab es mixto.** La intro, el expediente, la apuesta, los datos mínimos y la
   fricción van en la página; a Colab pasa solo el tramo de código, que termina el caso (herramienta, verificación,
   firma, revelación). La estafeta es de ida, sin regreso, y cada cosa se dice una vez: la apuesta se registra en la
   página y el cuaderno no la vuelve a pedir. Colab completo queda solo para lo ya construido (4.1 y 4.2).
4. **El tipo de cuaderno lo deciden los datos.** «Caso» si hay datos reales del caso con fuente y licencia
   verificadas. «Taquería» si no los hay o si el tramo es practicar la herramienta: entonces el caso se cierra en la
   página y el cuaderno es el paso «transferir» con los datos de Tacos Don Juan. Lo simulado se avisa en la primera
   celda (`docs/GUIA_CASOS.md`).
5. **Un tramo de Colab por clase, corto.** Como máximo un caso con Colab por clase y 25 minutos por tramo nuevo, para
   que lo que pase a tarea no rebase 1 hora por semana. El caso del costo del error va en la página, salvo que sea el
   único de su clase que necesita código. Los casos con víctimas van en la página, sin monedas ni humor.
6. **Colab no desaparece más de dos semanas.** Desde la clase 5, si pasan dos semanas sin cuaderno, se agrega una
   práctica «taquería» de 15 a 25 minutos. Todo cuaderno abre con los mismos tres pasos (guardar copia, ejecutar la
   primera celda, qué hacer si la sesión se cae) para que nadie tenga que acordarse.

**Prueba rápida para un caso nuevo:** completa la frase «en Colab el alumno hace ___, que en la página no podría». Si
no sale una acción concreta de la regla 2, el caso va en la página.

## 3. Reparto caso por caso (clases 5 a 22)

P = caso principal · E = caso del costo del error. «Regla» remite a la sección 2. Confianza: qué tan seguro es el
**lugar** propuesto; si es baja, la celda dice qué dato falta.

| Clase | Caso | Dónde | Regla que lo decide | Qué hace el alumno ahí que no podría en el otro lugar | Qué se pierde en el otro lugar | Cuaderno | Confianza |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 5 | **P** 4.1 Semmelweis y el lavado de manos | Colab | 2a y decisión del autor: primer cuaderno, ya construido (v1.3) | Ejecutar su primera celda y repetir el azar mil veces con seis años de registros | En la página se pierde el primer contacto guiado con Colab y un cuaderno ya probado | Caso (completo) | Alta |
| 5 | **E** 3.1 El caso Sally Clark | Página | 1 y 5: una multiplicación; caso con víctimas; la clase ya trae un cuaderno de ~50 min | Hacer la cuenta con la calculadora y comparar dos explicaciones lado a lado, sin cambiar de herramienta | En Colab sería un segundo cuaderno el primer día de Colab, para una cuenta de un renglón | — | Alta |
| 6 | **P** 3.3 La búsqueda del vuelo 447 de Air France | Página | 1: el mapa de probabilidad es una cuadrícula que se toca | Marcar una zona «buscada sin éxito» y ver cómo se reparte la probabilidad en el mapa; las primeras celdas se actualizan a mano | En Colab el mapa sería una imagen que se vuelve a dibujar; se pierde tocar el mapa | — | Media. Requiere un componente nuevo del motor (cuadrícula) y saber si el mapa real es reproducible |
| 6 | **E** E09 Fukushima y el tsunami «imposible» | Página | 1: periodos de retorno con calculadora y una línea de tiempo | Poner la altura del muro sobre el registro histórico y calcular «al menos una vez en N años» | En Colab no gana nada: son pocas cifras | — | Alta |
| 7 | **P** 4.2 Admisiones de posgrado en Berkeley | Colab | Ya construido (v2.6) y sostiene la continuidad en la semana 4. **Por la regla 1 iría en la página** (seis departamentos caben en pantalla): decisión 3 | Segunda vez en Colab una semana después de la primera, con un cuaderno pulido | En la página habría que rehacerlo; se ganaría mover la mezcla de solicitudes con un control | Caso (completo) | Media. Depende de la decisión 3 |
| 7 | **E** 6.2 La terapia hormonal en la menopausia | Página | 1: comparar dos estudios con dos tablas chicas | Poner lado a lado el estudio observacional y el ensayo, y buscar en qué difieren los grupos | En Colab no gana nada | — | Alta |
| 8 | **P** 6.3 El salario mínimo en Nueva Jersey | Página | 1: diferencias en diferencias con cuatro números | Restar a mano antes y después en los dos estados y mover la línea de «qué habría pasado» | En Colab se ganaría calcular los promedios desde la tabla de restaurantes; no es necesario para la idea | — | Media. Si el autor quiere el primer encargo de código aquí, pasa a mixto (decisión 6) |
| 8 | **E** E16 Hoy No Circula | Página | 1: una serie con una fecha de corte que se lee en la gráfica | Mover la ventana alrededor de la fecha de inicio y comparar antes y después | Con las mediciones horarias reales sería un buen cuaderno corto (regla 2b), con datos de la CDMX | — | **Baja.** `casos/staging/hoy-no-circula.json` no declara `dataset`: falta saber si las mediciones de 1986 a 1993 están publicadas y con qué licencia. Si lo están, es candidato a mixto con cuaderno «caso» |
| 9 | **P** S06 Progresa: quién entra primero, al azar | Página | 1: el sorteo es una acción visible | Sortear las comunidades en pantalla y comprobar que los dos grupos quedan parecidos; laboratorio de tamaño de muestra con un control | En Colab se ganaría que el alumno cambie la simulación de poder (regla 2a) | — | **Baja.** El caso sigue como `candidate`, sin `dataset` y con la fuente de la asignación por confirmar. Falta saber si hay datos por comunidad con licencia; si los hay, el tramo de poder puede ir en Colab |
| 9 | **E** E15 «Scared Straight» | Página | 1: tabla de resultados de pocos estudios | Comparar los programas con y sin grupo de control | En Colab no gana nada | — | Alta |
| 10 | **P** S09 Las cartas del fisco británico | Página | 1: tasas de respuesta por versión de carta | Calcular y ordenar las tasas, y decidir qué carta mandar | En Colab solo se ganaría repetir la simulación del azar, que ya hicieron en la clase 5 | — | Media. Suponiendo que los conteos por carta están publicados |
| 10 | **E** 5.6 Optimizely y el problema de espiar las pruebas | Mixto | 2a: hay que repetir cientos de pruebas y cambiar cada cuánto se «espía» | Correr cientos de pruebas donde no hay ninguna diferencia, cambiar la regla de parada y contar cuántas «ganan» | En la página el alumno vería el resultado, pero no podría cambiar la regla ni verificar la simulación (Trabajo con IA del módulo: verificar con una prueba A/A) | Caso (corto; datos simulados, se avisa) | Alta |
| 11 | **P** 7.1 Moneyball y los Oakland Athletics | Página | 1: una dispersión interactiva con una fila por equipo | Elegir la estadística y ver qué tan bien acompaña a las victorias, equipo por equipo | En Colab se ganaría trabajar con la base histórica completa | — | Media. Requiere un componente nuevo (dispersión) y confirmar la licencia de la base de béisbol |
| 11 | **E** E19 Volkswagen y el software que sabía cuándo lo medían | Página | 1: dos mediciones del mismo auto | Comparar la medición de laboratorio con la de carretera y decidir cuál creer | En Colab no gana nada | — | Alta |
| 12 | **P** S18 ¿Sigue siendo cliente? La regla del hiato | Mixto | 2c: SQL | Escribir (o encargar) una consulta que cuente clientes activos con la regla, y verificarla con filas que entran y salen | En la página no se puede ejecutar SQL; solo se podría leer una consulta hecha | Taquería (pedidos de Tacos Don Juan), salvo que haya datos reales | Alta para el lugar; media para el tipo: falta saber si existen datos reales de clientes con licencia |
| 12 | **E** 13.3 Los casos de COVID perdidos en Excel | Página | 1 y 5: una cuenta con el límite del formato; la clase ya trae un tramo de Colab | Calcular con la calculadora cuántos registros caben y hacer el total de control | En Colab se ganaría ver un archivo real cortarse; esa verificación (filas que entran y salen) ya se practica en el cuaderno de S18 | — | Media |
| 13 | **P** 13.8 Google y MapReduce | Mixto | 2b y 2c: agrupar una tabla que no cabe en pantalla | En la página, repartir y juntar tarjetas a mano; en Colab, agrupar y cruzar la tabla grande con DuckDB y detectar el cruce que duplica filas | En la página no hay tabla grande ni SQL; en Colab se pierde hacer «dividir y combinar» con las manos | Taquería (pedidos a escala; reutiliza el reto del cruce que duplica, que salió de la clase 1) | Media. Falta decidir el conjunto de datos y un componente de tarjetas |
| 13 | **E** E56 Horizon: cuando el sistema acusó a cientos | Página | 1 y 5: conciliar dos registros chicos; caso con víctimas | Poner lado a lado lo que dice el sistema y lo que dice la persona, y marcar lo que no cuadra | En Colab no gana nada | — | Alta |
| 14 | **P** 8.1 El árbol del dolor de pecho | Mixto | 2d y 2e: primer modelo | En la página, armar el árbol de tres preguntas a mano; en Colab, encargar un modelo y compararlo con esa regla fuera de muestra | En la página no se entrena nada; todo en Colab pierde la regla hecha a mano, que es la línea base | Por decidir: caso o taquería | **Baja.** Falta saber si hay datos de pacientes publicables. Sin ellos: o el cuaderno es «taquería», o el caso va completo en la página y el primer modelo se mueve a la clase 15 |
| 14 | **E** E23 El algoritmo que confundía gasto con necesidad | Página | 1 y 5: una gráfica y la pregunta «¿qué predice la etiqueta?» | Cambiar la etiqueta que se mira en la gráfica y ver a quién deja fuera | En Colab se ganaría reproducir el análisis con datos; no es necesario para el hábito `mide` | — | Media |
| 15 | **P** 8.4 El Netflix Prize | Mixto | 2d: separar entrenamiento y prueba, y buscar una fuga | Entrenar una línea base y un modelo más complejo, evaluarlos fuera de muestra y revisar una fuga | En la página solo se leería la tabla de posiciones; validar no se puede hacer a mano | Por decidir: caso o taquería | **Baja.** Falta la licencia de los datos de calificaciones. Si no se pueden usar: cuaderno «taquería», o 8.4 pasa a la página y el Colab de la clase es 8.6 (decisión 5) |
| 15 | **E** 8.6 La mantequilla de Bangladesh y la bolsa | Página | 5: la clase ya trae un tramo de Colab; laboratorio de reglas fijas | Probar series una por una hasta encontrar una que «prediga» la bolsa y luego verla fallar con años nuevos | En Colab se ganaría buscar entre mil series (regla 2a); es el relevo natural si 8.4 no tiene datos | — | Media. Depende de 8.4 |
| 16 | **P** D04 La cuarta oportunidad en el futbol americano | Página | 1: valor esperado con tres números y un control de umbral | Calcular a mano las dos opciones y mover la probabilidad hasta que la decisión cambia | En Colab se ganaría estimar las probabilidades desde las jugadas reales | — | Media. Falta confirmar si los datos de jugadas tienen licencia; no cambia el lugar, solo abre la opción de un tramo |
| 16 | **E** 8.8 Los subsidios en Países Bajos | Página | 1 y 5: mover un umbral y ver quién paga el error; caso con víctimas | Mover el umbral y contar los falsos positivos por grupo | En Colab no gana nada: los datos del sistema real no son públicos | — | Alta |
| 17 | **P** 9.1 Tesco Clubcard | Mixto | 2d: segmentar necesita ejecutar el algoritmo | En la página, agrupar clientes a mano moviendo los centros; en Colab, segmentar la tabla completa y revisar los grupos | En la página solo caben unas decenas de puntos; todo en Colab pierde hacer el algoritmo con las manos | Taquería (clientes de Tacos Don Juan): los datos de la tarjeta son privados | Media. Requiere un componente nuevo (centros que se mueven) |
| 17 | **E** 9.2 Markopolos y Madoff | Página | 1: una serie mensual corta | Contar los meses malos y comparar la serie con la del mercado | En Colab no gana nada | — | Alta |
| 18 | **P** D08 Cerrar la ciudad con pocos datos: influenza 2009 | Página | 1: el caso trata de decidir con pocos datos; caso con víctimas | Decidir día por día con los pocos conteos que había, antes de ver los siguientes | En Colab no gana nada | — | Media. No hay ficha del caso en `casos/staging/`: falta saber qué conteos diarios están verificados |
| 18 | **E** 10.3 Google Flu Trends | Mixto | 2e y 2b: comparar un pronóstico contra una línea base ingenua en cientos de semanas | Encargar la comparación semana por semana contra «lo mismo que hace dos semanas» y verificarla | En la página se verían las dos curvas, pero no se podría hacer la prueba hacia atrás | Caso (corto) | Media. Falta confirmar que las dos series semanales se pueden redistribuir |
| 19 | **P** S20 La frontera irregular de la IA | Página | 1: la herramienta es Claude, no un cuaderno | Clasificar tareas dentro y fuera de la frontera y probar una con Claude en otra pestaña | En Colab no gana nada | — | Alta |
| 19 | **E** 12.7 Los precedentes inventados del caso Avianca | Página | 1: mesa de verificación de citas | Comprobar cita por cita contra el registro | En Colab no gana nada | — | Alta |
| 20 | **P** S21 Más lentos con IA, y convencidos de ir más rápido | Página | 1: comparar lo percibido con lo medido | Anotar su propia estimación y compararla con la medición | En Colab no gana nada | — | Alta |
| 20 | **E** 15.4 El agente de Replit que borró una base | Página | 1: una tabla de permisos | Decidir qué permisos dar al agente y dónde va la firma | En Colab no gana nada | — | Alta |
| 21 | **P** 14.1 COMPAS y el riesgo de reincidencia | Mixto | 2b y 2d: miles de filas y una línea base de dos variables | En la página, las tablas de errores de cada grupo; en Colab, calcular los errores con la tabla completa y comparar contra la regla simple | En la página no cabe la tabla completa; todo en Colab pierde las tablas de errores hechas a mano | Caso (corto) | Media. Falta confirmar la licencia de los datos publicados del caso; si no, va completo en la página |
| 21 | **E** E66 Sweeney y el expediente del gobernador | Página | 1: tres filtros sobre una lista | Aplicar los filtros uno por uno y ver cuántas personas quedan | En Colab no gana nada | — | Alta |
| 22 | **P** S01 El bombardero que nadie podía volar de memoria | Página | 1: no hay cálculo; es la última clase, con el proyecto | Armar la lista de verificación y firmar | En Colab no gana nada | — | Alta |
| 22 | **E** E61 Boeing 737 MAX: un solo sensor | Página | 1 y 5: caso con víctimas; decisión de quién firma | Seguir la cadena de quién aprobó qué | En Colab no gana nada | — | Alta |

## 4. Vista por semana

| Semana | Fechas | Clases | Clases con Colab | Qué se abre en Colab |
| --- | --- | --- | --- | --- |
| 1 | 8–9 ene | 1–2 | — | Nada (decidido) |
| 2 | 15–16 ene | 3–4 | — | Nada (decidido) |
| 3 | 22–23 ene | 5–6 | 5 | 4.1 completo: primer cuaderno |
| 4 | 29–30 ene | 7–8 | 7 | 4.2 completo |
| 5 | 5–6 feb | 9–10 | 10 | 5.6, tramo corto de simulación |
| 6 | 12–13 feb | 11–12 | 12 | S18, tramo de SQL |
| 7 | 19–20 feb | 13–14 | 13 y 14 | 13.8 (taquería, tabla grande) y 8.1 (primer modelo) |
| 8 | 26–27 feb | 15–16 | 15 | 8.4, validación |
| 9 | 5–6 mar | 17–18 | 17 y 18 | 9.1 (taquería, segmentos) y 10.3 (pronóstico) |
| 10 | 12–13 mar | 19–20 | — | Nada: la herramienta de esas clases es Claude |
| 11 | 19–20 mar | 21–22 | 21 | 14.1, tramo corto |

**Comprobación:** de la semana 3 a la 11 solo una semana queda sin Colab (la 10). El hueco más largo es de 13 días
(clase 18, sáb 6 mar, a clase 21, vie 19 mar): dentro del límite. Colab aparece en 10 de las 18 clases.

**Dónde meter una práctica «taquería» si el reparto cambia:**

- **Semana 10 (opcional desde ya):** práctica de 15 a 20 min en la clase 19, «casos dorados en la taquería»: correr
  una lista corta de preguntas con respuestas ya guardadas del asistente y contar cuántas pasan. Sin llaves ni cuentas
  nuevas. Conviene si el autor quiere que ninguna semana quede en cero (decisión 7).
- **Si 8.1 y 8.4 caen a la página** (las dos filas de confianza baja): entre la clase 13 (19 feb) y la 17 (5 mar)
  pasan 14 días. Práctica en la clase 15: separar entrenamiento y prueba con los pedidos de la taquería.
- **Si 14.1 cae a la página:** desde la clase 18 ya no habría Colab. Práctica en la clase 20 o 21, pensada para el
  proyecto final: abrir un archivo propio y hacer dos verificaciones.
- **Semanas 7 y 9 traen dos tramos.** Si los dos pasan a tarea suman hasta 50 min: dentro de la hora, pero sin margen.
  En esas semanas el tramo «taquería» (13.8 y 9.1) es el que se puede acortar a 15 min.

## 5. Conteo y costo de producción

| | Página | Mixto | Colab | Total |
| --- | ---: | ---: | ---: | ---: |
| Casos principales | 10 | 6 | 2 | 18 |
| Casos del costo del error | 16 | 2 | 0 | 18 |
| **Total** | **26** | **8** | **2** | **36** |

Cuadernos: 2 completos ya construidos (4.1 y 4.2) y 8 cortos nuevos (3 «caso» seguros: 5.6, 10.3 y 14.1; 3 «taquería»:
S18, 13.8 y 9.1; 2 por decidir: 8.1 y 8.4). Antes de esta propuesta el plan era 36 cuadernos (34 nuevos).

**Costo relativo.** Son estimaciones mías para comparar escenarios, no horas medidas; conviene calibrarlas con lo que
costaron 1.1 en la página (E-10) y el cuaderno 4.1. La intro se cuenta aparte porque todo caso la lleva.

| Pieza | Unidades |
| --- | ---: |
| Caso corto en la página (costo del error, 15 a 25 min) | 1 |
| Caso completo en la página (principal, 40 a 45 min, con laboratorio) | 2 |
| Cuaderno corto nuevo (generador, publicación en Drive y enlaces) | 1.5 |
| Mixto, caso del error (página corta + cuaderno corto) | 2 |
| Mixto, caso principal (página parcial + cuaderno corto) | 3 |
| Cuaderno completo nuevo | 3 |
| Cuaderno ya construido (ajustes: salidas sueltas y aviso de sesión) | 0.3 |

| Escenario | Cuenta | Unidades |
| --- | --- | ---: |
| **Esta propuesta** | 10×2 + 16×1 + 6×3 + 2×2 + 2×0.3 | ≈ 59 |
| Todo en Colab (plan del 24 oct) | 16×3 + 18×1.5 + 2×0.3 | ≈ 76 |
| Todo en la página | 18×2 + 18×1 | 54, pero no es viable: SQL y modelos no se pueden ejecutar en la página |

Lo que la cuenta no incluye:

- **Componentes nuevos del motor de la página**, que se pagan una vez: cuadrícula de probabilidad (3.3), dispersión
  interactiva (7.1), control de umbral con conteo por grupo (D04, 8.8, E23), serie con ventana (E16, D08, 9.2),
  tarjetas que se reparten y se juntan (13.8) y centros que se mueven (9.1).
- **El mixto cuesta más que cualquiera de los otros dos** por caso: dos piezas, una estafeta y la prueba de no
  repetición entre ambas. Por eso la regla 5 lo limita a uno por clase.
- **El backend:** la apuesta registrada en la página y los retos en el cuaderno deben contar como un solo caso.

## 6. Qué habría que cambiar en otros documentos si se aprueba

Solo la lista; esta tarea no los toca.

- Skill `tads-caso-reparto-pagina-colab`: el desempate («si dudas, va a Colab»), «la apuesta vive solo en Colab» y la
  tabla de decisión.
- `docs/CASO_EN_PAGINA.md`, regla 1 («un caso, un lugar»): admitir el mixto con una sola estafeta.
- `docs/CRITERIO_PRIMERO.md`, tabla de artefactos («la apuesta vive en Colab»).
- `docs/ESTRUCTURA_GENERACION_1.md`: «se califica lo que pasa en Colab» y los formatos de la sección Producción.
- `docs/DECISIONES_GENERACION_1.md`, fila Calificación («solo bits de los cuadernos de Colab»): es texto publicado en
  los términos; lo decide el autor.
- `docs/agents/COLABORADOR.md`, sección 1.1: el cambio de las clases 1 a 4 ya no está «en revisión».

## 7. Decisiones para el autor

Contesta cada una con «sí» o «cambio: …».

1. **Desempate.** Desde la clase 5, si hay duda el caso va en la página (regla 1), y Colab entra solo por los cinco
   motivos de la regla 2. ¿Sí?
2. **Forma mixta.** Los casos nuevos que necesitan código son mixtos: apuesta y fricción en la página, tramo de 15 a
   25 min en Colab que termina el caso, estafeta de ida sin regreso. Implica cambiar «un caso, un lugar» y «la apuesta
   vive solo en Colab». ¿Sí?
3. **4.2 Berkeley se queda en Colab** tal como está (ya construido, segunda vez en Colab en la semana 4), aunque por
   la regla 1 cabría en la página. ¿Sí? (Cambio posible: rehacerlo en la página y poner en la clase 7 u 8 una práctica
   «taquería» para no dejar la semana 4 sin Colab.)
4. **Cuaderno «taquería» como transferencia.** En S18, 13.8 y 9.1 el caso se cierra en la página y el cuaderno
   practica la herramienta con los datos de Tacos Don Juan. ¿Sí?
5. **Clases 14 y 15 (confianza baja).** Si no hay datos con licencia para 8.1 y 8.4: el primer modelo se hace con un
   cuaderno «taquería» en la clase 14, y en la clase 15 el Colab pasa a 8.6 (buscar entre mil series) mientras 8.4 va
   en la página. ¿Sí?
6. **Dónde empieza el código escrito con Codex.** Propuesta: en los cuadernos de las clases 5 a 10 el código viene
   escrito y el alumno cambia valores; el primer encargo de código a Codex es el SQL de la clase 12 y sigue en 13, 14,
   15, 17, 18 y 21. ¿Sí? Dato que me falta: si el código que escribe Codex se ejecuta en Colab o en un repositorio del
   alumno con GitHub; si es lo segundo, la regla 2e no manda casos a Colab y hay que revisar las clases 12 a 21.
7. **Semana 10 sin Colab.** Se acepta (un hueco de 13 días) y la práctica «casos dorados en la taquería» queda como
   opcional. ¿Sí? (Cambio posible: hacerla obligatoria en la clase 19.)
8. **Un tramo por clase y el caso del error en la página** (regla 5), con las dos excepciones de esta tabla: 5.6
   (clase 10) y 10.3 (clase 18), donde el caso del error es el único de su clase que necesita código. ¿Sí?
9. **Calificación.** Con 26 casos resueltos en la página, los bits de la página cuentan igual que los de Colab y hay
   que corregir el texto «solo bits de los cuadernos de Colab» en los términos y en la estructura. ¿Sí?
10. **Datos por verificar antes de construir.** Las filas de confianza baja (E16, S06, 8.1 y 8.4) y las de licencia
    por confirmar (S18, 7.1, D04, 10.3 y 14.1) se revisan contra el tablero de casos antes de abrir sus encargos; lo
    que no tenga datos reales con licencia se queda en la página o usa cuaderno «taquería». ¿Sí?
