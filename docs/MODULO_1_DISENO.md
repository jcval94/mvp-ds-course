# Módulo 1 · Datos que mienten (¿Puedo creerle a estos datos?)

**Estado:** diseño aprobado por el autor el 19 de octubre de 2026 y actualizado el 24 de octubre con sus respuestas a las nueve
decisiones del plan (ver al final). Es la primera aplicación de `docs/CRITERIO_PRIMERO.md` y la referencia para producir los
casos y las dos clases de la Generación 1. La estructura completa del curso está en `docs/ESTRUCTURA_GENERACION_1.md`.
Ningún caso de este módulo está construido todavía con el contrato de criterio.

- **Nivel:** 1 · Fundamentos (`docs/CURRICULUM_MAP.md`).
- **Prerrequisitos:** ninguno. Los alumnos no saben Python y usan Colab por primera vez.
- **Objetivo observable:** ante un conjunto de datos y una decisión, el alumno dice qué representa cada fila, qué tipo tiene
  cada dato, qué podría estar mal o faltar, y cómo una transformación cambia la lectura. Firma una decisión con su certeza y lo
  que no sabe.
- **Duración:** dos clases de 3 horas (viernes 8 y sábado 9 de enero de 2027) y tarea corta entre ellas.
- **Por qué abre Wald:** el reembolso total vale hasta que termina la clase 2, así que las dos primeras clases llevan los casos
  más enganchantes del curso. Wald es el más popular del catálogo (5 de 5) y el más avanzado (caso verificado, datos y kit).
- **Supuestos:**
  - Los laboratorios de Nivel 1 se reutilizan sin cambios como práctica.
  - Puerto Rico usa datos públicos (estadísticas vitales); Gimli usa las cifras del informe de la investigación de 1985
    (el cálculo se reconstruye con ellas); Wald usa datos sintéticos etiquetados.
  - El contrato de criterio del generador (`agentic-ds-backen`, `docs/CRITERIO.md`) está fusionado antes de producir el primer
    cuaderno.

## Lo que ve el alumno

El alumno ve el módulo y sus temas como preguntas. Los nombres técnicos quedan para el docente y aparecen ante el alumno solo
cuando un caso ya los usó.

| Tema (docente) | Lo que ve el alumno | Dónde se trabaja |
| --- | --- | --- |
| Alfabetización de datos | ¿Qué representa cada dato? | 1.1 Wald · 1.4 Puerto Rico: 64 o 2,975 · 1.2 Literary Digest |
| Tipos de variables | ¿Qué tipo de dato es y qué le puedo hacer? | 13.11 Gimli · tarea opcional: 13.7 Genes y 13.9 Ariane 5 |
| Calidad de datos | ¿Puedo confiar en estos registros? | El error plantado de cada cuaderno · 1.1 Wald |
| Preparación básica | ¿Qué le hice a los datos y qué cambió? | Reto de la taquería |

En la ficha de cada caso el alumno ve tres cosas:

- **la decisión:** qué había que decidir y quién lo decidía;
- **los datos:** qué información existía;
- **la pregunta detonadora.**

El **giro**, las **herramientas** y la **revelación** viven en las notas docentes (`MATERIAL`) y en la sección de revelación
del cuaderno. La intro animada de la página no nombra herramientas ni pide la apuesta: la apuesta vive en Colab.

**Todos los casos tienen intro animada, también los de costo**, y toda intro incluye material real del caso: fotos, recortes
de noticias o documentos y, cuando existe, video, con créditos y licencia (`site/casos/README.md`). Los casos de costo usan el
formato corto: tres escenas (~40 s) con el material real, el número que no cuadra y el expediente «SIN RESOLVER».

Ids en la base: los casos nuevos entran al temario con su número de módulo.

| Caso | Id del catálogo | Id del temario y la base |
| --- | --- | --- |
| Puerto Rico | E64 | 1.4 |
| Gimli | E48 | 13.11 |
| Ariane 5 (tarea opcional) | E44 | 13.9 |
| Horizon (pasa a la clase 13) | E56 | 13.10 |
| Robodebt (pasa a la clase 14, como opción) | E25 | 8.9 |

## Orden, hábitos y escalera

Dos casos seguidos nunca entrenan el mismo hábito.

| # | Caso | Clase | Hábito | Tipo y familia | Peldaño donde se resuelve | Herramienta (se nombra al final de su sección) | Formato |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 0 | Los gatos que caen (calentamiento) | 1 | `faltan` | mixto | 2 · mirar quién llega a la muestra | (ninguna: apuesta a mano alzada) | 5 min, sin cuaderno |
| 1 | 1.1 Wald | 1 | `faltan` | ingenio · solución simple | 2 a 3 · mirar y preguntar por lo que falta | sesgo de supervivencia, faltantes no aleatorios | completo: intro y cuaderno, ~50 min |
| 2 | 1.4 Puerto Rico | 1 | `mide` | costo | 4 · comparación con lo esperado | definición de la variable, exceso de mortalidad | corto: intro de 3 escenas y cuaderno, ~25 min |
| 3 | Reto de la taquería | 1 | práctica | práctica · trabajar con IA | 2 · mirar y contar | filtrar, ordenar, agrupar, transformar | reto, ~20 min |
| 4 | 1.2 Literary Digest | 2 | `faltan` | mixto | 4 · comparación justa (Gallup frente al Digest) | población, muestra, marco muestral, no respuesta | completo: intro y cuaderno, ~40 min |
| 5 | 13.11 Gimli | 2 | `verificar` | costo · solución simple | 3 · una regla de unidades y de rango | unidades, factor de conversión, validar rangos | corto: intro de 3 escenas y cuaderno, ~30 min |

El calentamiento de los gatos no es un caso calificado: siembra la pregunta «¿qué falta?» antes de Wald, que la desarrolla.

Ningún caso del módulo necesita un modelo. En cada firma el alumno responde también «¿necesitas algo más que contar y comparar
para decidir? ¿Qué?». Es la casilla de «¿hace falta un modelo?» adaptada al nivel 1. Desde el Nivel 6 la pregunta se vuelve
literal.

## Trabajo con IA en el Módulo 1

En los niveles 1 y 2 el alumno todavía no delega, pero aprende a verificar. Cada cuaderno trae un **resultado hecho «por el
asistente»**: una tabla o un resumen con un error realista. El cuaderno avisa que puede haber un error, nunca dónde. El alumno
lo busca con conteos, rangos y una gráfica antes de firmar.

Encontrar el error es un reto (`reto_error_…`) que da monedas. Lo que revisó queda registrado como verificación.

| Caso | Error plantado | Cómo se encuentra |
| --- | --- | --- |
| 1.1 Wald | El resumen dice que analizó 1,000 aviones; el archivo tiene 736 filas | Contar filas. La diferencia abre la pregunta por los aviones que no volvieron. |
| 1.4 Puerto Rico | La línea base compara un mes de 2017 con otro mes de 2016 | Un caso a mano: revisar el mes contra el mismo mes del año anterior |
| Reto de la taquería | Un cruce de tablas duplicó pedidos y la agrupación tiene más pedidos que el original | Filas que entran y filas que salen |
| 1.2 Literary Digest | La tasa de respuesta se calcula con las boletas devueltas como denominador y sale 100% | Rango plausible: una encuesta por correo no tiene 100% de respuesta |
| 13.11 Gimli | El asistente suma el combustible en kilos con el factor de libras y dice que el avión va lleno | Rango plausible y unidades: el total no llega ni a la mitad de lo que pide el plan de vuelo |

## Arco de cada caso

Cada cuaderno sigue el arco de revelación y el contrato de criterio del generador:

- `HABITO`, `NIVEL = 1`, `HERRAMIENTA`, `REVELACION` y `FRASE`;
- `PAGINA` con la intro del caso (todos los casos tienen intro);
- apuesta antes de la herramienta;
- verificación y error plantado antes de la firma;
- firma antes de la revelación;
- `BIBLIOTECA` con el laboratorio del tema.

| Caso | Apuesta | Fricción | Firma (antes de la revelación) | Frase del criterio |
| --- | --- | --- | --- | --- |
| 1.1 Wald | ¿Dónde blindarías? | Los aviones del archivo son los que regresaron | Qué recomiendas blindar, con qué certeza y qué no sabes | ¿Qué falta en mis datos? Pregunta qué casos no llegaron a tu tabla. |
| 1.4 Puerto Rico | ¿64 te parece una cifra razonable? ¿Por qué? | El conteo depende de qué certificado dice «huracán»; comparado con los meses normales, sobran muchas muertes | Qué cifra publicarías y cómo la explicarías | ¿Qué mide este número? Antes de comparar cifras, pregunta qué tiene que pasar para que algo cuente. |
| 1.2 Literary Digest | ¿Le crees a 2.4 millones de boletas? | La muestra enorme no se parece a los votantes: ¿quién recibió la boleta y quién la devolvió? | Qué le dirías al editor sobre su pronóstico, con qué certeza y qué te haría cambiar | ¿Qué falta en mis datos? Antes de contar respuestas, pregunta quién no pudo responder. |
| 13.11 Gimli | ¿Cargarías el avión con este cálculo? | Las cifras están bien multiplicadas, pero el factor está en libras y el plan en kilos | Qué revisarías antes de despegar y quién lo firma | ¿Cómo lo verifico? Un número sin su unidad no es un dato. |

**Cuidado con el mito de Wald.** La revelación cuenta lo que dicen las fuentes de `casos/staging/wald-bombers.json`:

- Wald escribió memorandos con un método para estimar la vulnerabilidad a partir de los aviones que regresaban.
- No hay registro de que recomendara blindar los motores ni de cuántas vidas se salvaron.
- La imagen del avión con puntos rojos no muestra sus datos. Si la intro usa material real, es un documento o una foto de la
  época con su crédito, nunca esa imagen presentada como dato.

**Gimli:** 23 de julio de 1983, vuelo 143 de Air Canada (Boeing 767). Se cargó menos de la mitad del combustible necesario
porque se usó 1.77 libras por litro en lugar de 0.803 kilos por litro; el avión planeó 17 minutos y aterrizó en una antigua base
de Gimli, Manitoba, sin muertos. Cifras del informe de 1985 y de [Wikipedia](https://en.wikipedia.org/wiki/Gimli_Glider); se
verifican en el informe antes de construir.

**Casos con muertes** (Puerto Rico): se cuenta el mecanismo y el costo con cifras verificadas, sin detalles de víctimas, y la
tarjeta del tema avisa del contenido. El material real de su intro no muestra víctimas.

## Laboratorios como biblioteca

Los laboratorios de Nivel 1 dejan de ser la puerta de entrada al tema. Cada cuaderno los enlaza desde la sección donde usó la
herramienta (`BIBLIOTECA`), como práctica opcional que no cuenta para la calificación. En clase, el laboratorio va después del
caso.

| Tema | Laboratorio | Enlazado desde |
| --- | --- | --- |
| Alfabetización de datos | `labs/level-1/alfabetizacion.html` | 1.4 y 1.2 |
| Tipos de variables | `labs/level-1/tipos-variables.html` | 13.11 |
| Calidad de datos | `labs/level-1/calidad-datos.html` | 1.1 |
| Preparación básica | `labs/level-1/preparacion-basica.html` | el reto de la taquería |

## Transferir en tres escalones

Cada caso termina con el mismo hábito en dos contextos más. Primero la taquería: Don Juan aporta el problema del negocio y el
narrador nombra el concepto. Después **Mi decisión**, el proyecto propio del alumno.

| Caso | En la taquería | En Mi decisión |
| --- | --- | --- |
| 1.1 Wald | Solo opinan los clientes que regresan | ¿Qué aviones no están en tus datos? |
| 1.4 Puerto Rico | ¿Qué cuenta como «pedido cancelado»: el que no se pagó o el que no se entregó? | ¿Cómo está definido el número más importante de tu decisión? |
| 1.2 Literary Digest | Don Juan pregunta por la salsa nueva solo a quienes dejan propina | ¿Qué es una fila en los datos de tu decisión? ¿Quién no aparece? |
| 13.11 Gimli | El proveedor manda la carne en libras y la receta está en kilos | ¿Qué dato de tu decisión viene en otra unidad o en otro formato? |

**Mi decisión** empieza en la clase 1. Cada alumno elige una decisión real de su trabajo y le agrega una pieza por caso. Al
cierre del módulo tiene cuatro piezas sobre la misma decisión. El proyecto crece en cada módulo con el hábito nuevo y desemboca
en la presentación final de la clase 22.

## Retención

- **La apuesta vuelve al cierre** de cada caso: el cuaderno muestra la apuesta del alumno junto a lo que encontró.
- **La clase 2 abre sin notas:** 10 minutos con una apuesta rápida sobre un caso de la clase 1 y una firma anónima para
  discutir. El Módulo 2 abrirá igual con un caso del Módulo 1.
- **El criterio en una frase:** el generador la agrega al final de cada cuaderno, y el cierre de cada clase repasa las frases
  de los casos del día.

## Las dos clases

Caso primero. El concepto aparece dentro del caso y el laboratorio va después, como práctica. Las sumas dan 180 minutos por
clase.

### Clase 1 · viernes 8 de enero, 18:00 a 21:00 · «¿Qué aviones no volvieron?»

| Hora | Min | Actividad |
| --- | ---: | --- |
| 18:00 | 20 | Bienvenida y Colab (secretos `TDD_ID` y `TDD_CLAVE`). Cada quien elige la decisión real de **Mi decisión**. |
| 18:20 | 5 | Calentamiento: los gatos que caen de los edificios (apuesta a mano alzada, sin cuaderno) |
| 18:25 | 5 | Intro de 1.1 en pantalla y apuesta del grupo |
| 18:30 | 50 | Caso 1.1 Wald en Colab: apuesta, mirar, fricción, herramienta, error plantado y firma. Revelación. |
| 19:20 | 10 | Descanso |
| 19:30 | 5 | Intro de 1.4 Puerto Rico (material real) |
| 19:35 | 25 | Caso 1.4 Puerto Rico: 64 o 2,975 |
| 20:00 | 15 | Laboratorio de alfabetización y calidad como práctica |
| 20:15 | 15 | Transferir: la taquería y Mi decisión (piezas 1 y 2) |
| 20:30 | 20 | Reto de la taquería en Colab, con su error plantado |
| 20:50 | 10 | Cierre: las frases del día y tarea (13.7 Genes, opcional) |

### Clase 2 · sábado 9 de enero, 8:00 a 11:00 · «2.4 millones de boletas equivocadas»

| Hora | Min | Actividad |
| --- | ---: | --- |
| 8:00 | 10 | Recuperación sin notas: apuesta rápida sobre Wald o Puerto Rico y una firma anónima |
| 8:10 | 5 | Intro de 1.2 en pantalla y apuesta del grupo |
| 8:15 | 40 | Caso 1.2 Literary Digest en Colab |
| 8:55 | 15 | Práctica: la encuesta sesgada en vivo y el laboratorio de alfabetización |
| 9:10 | 10 | Descanso |
| 9:20 | 5 | Intro de 13.11 Gimli (material real) |
| 9:25 | 30 | Caso 13.11 Gimli: el cálculo del combustible |
| 9:55 | 15 | Laboratorio de tipos de variables como práctica |
| 10:10 | 20 | Transferir: la taquería y Mi decisión (piezas 3 y 4) |
| 10:30 | 30 | Cierre del módulo: firmas, frases, Mi decisión con cuatro piezas, qué sigue (Módulo 2, John Snow) y tarea opcional (Ariane 5) |

Si una clase se alarga, el caso de costo pendiente pasa a tarea: su cuaderno registra solo. El mínimo de cada clase es su caso
principal.

## Decisiones del plan (respondidas el 24 de octubre de 2026)

| # | Pregunta | Decisión |
| --- | --- | --- |
| 1 | ¿El Módulo 1 son los 4 temas del Nivel 1? | Sí |
| 2 | ¿Cuántas clases lleva el módulo? | 2: viernes 8 y sábado 9 de enero |
| 3 | ¿El caso 13.7 lleva intro animada? | Queda como tarea opcional. Si se produce como caso, lleva intro como todos |
| 4 | ¿Qué hacemos con la misión m01-wald? | Las misiones web no cuentan para la calificación: su simulador de 1,000 aviones pasa al cuaderno de Colab y la página jugable se retira; la intro de 1 minuto toma su lugar |
| 5 | ¿Qué id llevan los casos en la base? | Los del temario (1.1, 1.2, 13.7…), como 4.1 y 4.2 |
| 6 | ¿Los cuadernos del Nivel 1 son gratuitos? | Sí, como el Nivel 1 en el sitio |
| 7 | ¿Quién hace el piloto? | 2 o 3 personas sin Python, fuera del grupo: uno en noviembre con 4.2 (plataforma) y otro la semana del 7 de diciembre con los casos de este módulo |
| 8 | ¿Cuáles son los casos de costo? | Puerto Rico (clase 1) y Gimli (clase 2). Ariane 5 queda como tarea opcional, Horizon pasa a la clase 13 y Robodebt a la 14 |
| 9 | ¿Los casos de costo llevan intro animada y qué id llevan? | **Sí: todos los casos llevan intro animada con material real** (formato corto de 3 escenas). Ids del temario: 1.4 y 13.11 |

## Definition of Done del módulo

- Los cuatro cuadernos (1.1, 1.4, 1.2 y 13.11) pasan el contrato de criterio y `verificar.py` en `agentic-ds-backen`.
- Los cuatro tienen intro animada que no nombra herramientas, con material real con créditos y licencia en su `medios.json`.
- Cada cifra tiene fuente, y los datos sintéticos están etiquetados.
- La revisión con `evals/rubric.md` no tiene ninguna dimensión en 1 y promedia 4 o más, incluidas las tres de
  `docs/CRITERIO_PRIMERO.md`.
- 2 o 3 personas sin Python resolvieron el módulo, y se corrigió lo que les costó.
- Todo listo el 20 de diciembre de 2026.

**No objetivos:** cambiar los laboratorios de Nivel 1, enseñar Python, delegar código a una IA en este módulo, publicar los
casos fuera del grupo.
