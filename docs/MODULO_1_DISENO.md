# Módulo 1 · ¿Puedo creerle a estos datos?

**Estado:** diseño aprobado por el autor el 19 de octubre de 2026. Es la primera aplicación de
`docs/CRITERIO_PRIMERO.md` y la referencia para producir los casos y las dos clases de la Generación 1.
Ningún caso de este módulo está construido todavía con el contrato de criterio.

- **Nivel:** 1 · Fundamentos (`docs/CURRICULUM_MAP.md`).
- **Prerrequisitos:** ninguno. Los alumnos no saben Python y usan Colab por primera vez.
- **Objetivo observable:** ante un conjunto de datos y una decisión, el alumno dice qué representa cada fila, qué tipo
  tiene cada dato, qué podría estar mal o faltar, y cómo una transformación cambia la lectura. Firma una decisión
  con su certeza y lo que no sabe.
- **Duración:** dos clases de 3 horas (viernes 8 y sábado 9 de enero de 2027) y tarea corta entre ellas.
- **Supuestos:**
  - Los laboratorios de Nivel 1 se reutilizan sin cambios como práctica.
  - Los cuatro casos de costo usan datos públicos (Puerto Rico) o sintéticos etiquetados (Ariane 5, Horizon,
    Robodebt).
  - El contrato de criterio del generador (`agentic-ds-backen`, `docs/CRITERIO.md`) está fusionado antes de
    producir el primer cuaderno.

## Lo que ve el alumno

El alumno ve el módulo y sus temas como preguntas. Los nombres técnicos quedan para el docente y aparecen ante el
alumno solo cuando un caso ya los usó.

| Tema (docente) | Lo que ve el alumno | Casos |
| --- | --- | --- |
| Alfabetización de datos | ¿Qué representa cada dato? | 1.2 Literary Digest · 1.4 Puerto Rico: 64 o 2,975 |
| Tipos de variables | ¿Qué tipo de dato es y qué le puedo hacer? | 13.7 Los genes que Excel convertía en fechas · 13.9 Ariane 5 |
| Calidad de datos | ¿Puedo confiar en estos registros? | 13.10 Horizon |
| Preparación básica | ¿Qué le hice a los datos y qué cambió? | 8.9 Robodebt · reto de la taquería |
| Cierre del módulo | ¿Qué aviones no están en tus datos? | 1.1 Wald y los bombarderos |

En la ficha de cada caso el alumno ve tres cosas:

- **la decisión:** qué había que decidir y quién lo decidía;
- **los datos:** qué información existía;
- **la pregunta detonadora.**

El **giro**, las **herramientas** y la **revelación** viven en las notas docentes (`MATERIAL`) y en la sección de
revelación del cuaderno. La intro animada de la página no nombra herramientas ni pide la apuesta: la apuesta vive en
Colab.

Ids en la base: los casos nuevos entran al temario con su número de módulo.

| Caso | Id del catálogo | Id del temario y la base |
| --- | --- | --- |
| Puerto Rico | E64 | 1.4 |
| Ariane 5 | E44 | 13.9 |
| Horizon | E56 | 13.10 |
| Robodebt | E25 | 8.9 |

## Orden, hábitos y escalera

Dos casos seguidos nunca entrenan el mismo hábito. El módulo practica cuatro hábitos distintos.

| # | Caso | Clase | Hábito | Tipo y familia | Peldaño donde se resuelve | Herramienta (se nombra al final de su sección) | Cuaderno |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1.2 Literary Digest | 1 | `faltan` | mixto | 4 · comparación justa (Gallup frente al Digest) | población, muestra, marco muestral | intro y cuaderno, ~40 min |
| 2 | 1.4 Puerto Rico | 1 | `mide` | costo | 4 · comparación con lo esperado | definición de la variable, exceso de mortalidad | corto, ~20 min |
| 3 | 13.7 Genes | 1 | `verificar` | costo · solución simple | 2 · mirar los datos | tipo de dato, conversión implícita | corto, ~25 min |
| 4 | 13.9 Ariane 5 | 1 | `fuera` | costo | 3 · una regla de rango | tipos numéricos y su rango, desbordamiento | corto, ~20 min |
| 5 | 13.10 Horizon | 2 | `verificar` | costo | 3 · conciliar contra otra fuente | duplicados, conciliación | corto, ~25 min |
| 6 | 8.9 Robodebt | 2 | `mide` | costo | 2 · mirar la distribución | agregar, promediar, granularidad | corto, ~25 min |
| 7 | Reto de la taquería | 2 | práctica | práctica · trabajar con IA | 2 · mirar y contar | filtrar, ordenar, agrupar, transformar | reto, ~20 min |
| 8 | 1.1 Wald | 2 | `faltan` | ingenio · solución simple | 2 a 3 · mirar y preguntar por lo que falta | sesgo de supervivencia, faltantes no aleatorios | intro y cuaderno, ~50 min |

Ningún caso del módulo necesita un modelo. En cada firma el alumno responde también «¿necesitas algo más que contar
y comparar para decidir? ¿Qué?». Es la casilla de «¿hace falta un modelo?» adaptada al nivel 1. Desde el Nivel 6
la pregunta se vuelve literal.

## Trabajo con IA en el Módulo 1

En los niveles 1 y 2 el alumno todavía no delega, pero aprende a verificar. Cada cuaderno trae un **resultado
hecho «por el asistente»**: una tabla o un resumen con un error realista. El cuaderno avisa que puede haber un
error, nunca dónde. El alumno lo busca con conteos, rangos y una gráfica antes de firmar.

Encontrar el error es un reto (`reto_error_…`) que da monedas. Lo que revisó queda registrado como verificación.

| Caso | Error plantado | Cómo se encuentra |
| --- | --- | --- |
| 1.2 Literary Digest | La tasa de respuesta se calcula con las boletas devueltas como denominador y sale 100% | Rango plausible: una encuesta por correo no tiene 100% de respuesta |
| 1.4 Puerto Rico | La línea base compara un mes de 2017 con otro mes de 2016 | Un caso a mano: revisar el mes contra el mismo mes del año anterior |
| 13.7 Genes | La lista «limpia» todavía trae nombres de genes convertidos en fecha | Contar valores con forma de fecha en una columna de texto |
| 13.9 Ariane 5 | La conversión no marca error: los valores que no caben quedan en 32,767 | Contar cuántos valores quedaron exactamente en el máximo |
| 13.10 Horizon | El faltante calculado incluye transacciones repetidas | Contar identificadores únicos contra filas |
| 8.9 Robodebt | La suma anual del asistente no coincide con la suma de las quincenas: falta una | Total de control |
| Reto de la taquería | Un cruce de tablas duplicó pedidos y la agrupación tiene más pedidos que el original | Filas que entran y filas que salen |
| 1.1 Wald | El resumen dice que analizó 1,000 aviones; el archivo tiene 736 filas | Contar filas. La diferencia abre la pregunta por los aviones que no volvieron. |

## Arco de cada caso

Cada cuaderno sigue el arco de revelación y el contrato de criterio del generador:

- `HABITO`, `NIVEL = 1`, `HERRAMIENTA`, `REVELACION` y `FRASE`;
- apuesta antes de la herramienta;
- verificación y error plantado antes de la firma;
- firma antes de la revelación;
- `BIBLIOTECA` con el laboratorio del tema.

| Caso | Apuesta | Fricción | Firma (antes de la revelación) | Frase del criterio |
| --- | --- | --- | --- | --- |
| 1.2 Literary Digest | ¿Le crees a 2.4 millones de boletas? | La muestra enorme no se parece a los votantes: ¿quién recibió la boleta y quién la devolvió? | Qué le dirías al editor sobre su pronóstico, con qué certeza y qué te haría cambiar | ¿Qué falta en mis datos? Antes de contar respuestas, pregunta quién no pudo responder. |
| 1.4 Puerto Rico | ¿64 te parece una cifra razonable? ¿Por qué? | El conteo depende de qué certificado dice «huracán»; comparado con los meses normales, sobran muchas muertes | Qué cifra publicarías y cómo la explicarías | ¿Qué mide este número? Antes de comparar cifras, pregunta qué tiene que pasar para que algo cuente. |
| 13.7 Genes | ¿Qué puede salir mal al abrir una lista de nombres en una hoja de cálculo? | La lista «se ve bien», pero algunas filas ya no son genes | Qué harías con las listas ya publicadas | ¿Cómo lo verifico? No confíes en lo que tu herramienta «corrigió» sin avisarte. |
| 13.9 Ariane 5 | ¿Reutilizarías un programa que nunca ha fallado? | Los datos del cohete nuevo están fuera del rango para el que se escribió el programa | Qué revisarías antes de volver a lanzar | ¿Funciona fuera de mis datos? Lo que nunca falló pudo no haber visto nunca este caso. |
| 13.10 Horizon | Cuando el sistema y la persona no coinciden, ¿a quién le crees? | El faltante desaparece al quitar registros repetidos | Qué le dirías al juez sobre los datos del sistema | ¿Cómo lo verifico? Ningún sistema es prueba hasta que alguien lo concilia. |
| 8.9 Robodebt | Si alguien ganó lo mismo en el año, ¿debe lo mismo? | Repartir el año en quincenas iguales inventa ingresos que nadie tuvo | A quién le cobrarías y con qué evidencia | ¿Qué mide este número? Un promedio describe al año, no a cada quincena. |
| 1.1 Wald | ¿Dónde blindarías? | Los aviones del archivo son los que regresaron | Qué recomiendas blindar, con qué certeza y qué no sabes | ¿Qué falta en mis datos? Pregunta qué casos no llegaron a tu tabla. |

**Cuidado con el mito de Wald.** La revelación cuenta lo que dicen las fuentes de `casos/staging/wald-bombers.json`:

- Wald escribió memorandos con un método para estimar la vulnerabilidad a partir de los aviones que regresaban.
- No hay registro de que recomendara blindar los motores ni de cuántas vidas se salvaron.
- La imagen del avión con puntos rojos no muestra sus datos.

Los datos del cuaderno son sintéticos y así se dice.

**Casos con muertes, condenas o deudas injustas** (Puerto Rico, Horizon, Robodebt): se cuenta el mecanismo y el
costo con cifras verificadas, sin detalles de víctimas, y la tarjeta del tema avisa del contenido.

## Laboratorios como biblioteca

Los laboratorios de Nivel 1 dejan de ser la puerta de entrada al tema. Cada cuaderno los enlaza desde la sección
donde usó la herramienta (`BIBLIOTECA`), como práctica opcional que no cuenta para la calificación. En clase, el
laboratorio va después del caso.

| Tema | Laboratorio | Enlazado desde |
| --- | --- | --- |
| Alfabetización de datos | `labs/level-1/alfabetizacion.html` | 1.2 y 1.4 |
| Tipos de variables | `labs/level-1/tipos-variables.html` | 13.7 y 13.9 |
| Calidad de datos | `labs/level-1/calidad-datos.html` | 13.10 y 1.1 |
| Preparación básica | `labs/level-1/preparacion-basica.html` | 8.9 y el reto de la taquería |

## Transferir en tres escalones

Cada caso termina con el mismo hábito en dos contextos más. Primero la taquería: Don Juan aporta el problema del
negocio y el narrador nombra el concepto. Después **Mi decisión**, el proyecto propio del alumno.

| Caso | En la taquería | En Mi decisión |
| --- | --- | --- |
| 1.2 Literary Digest | Don Juan pregunta por la salsa nueva solo a quienes dejan propina | ¿Qué es una fila en los datos de tu decisión? ¿Quién no aparece? |
| 1.4 Puerto Rico | ¿Qué cuenta como «pedido cancelado»: el que no se pagó o el que no se entregó? | ¿Cómo está definido el número más importante de tu decisión? |
| 13.7 Genes | La hoja convierte el folio de pedido 03-04 en una fecha | Lista tres datos de tu decisión y su tipo. ¿Cuál podría convertirse mal? |
| 13.9 Ariane 5 | El contador de tickets solo llega a 999 | ¿Qué supuesto de tu proceso podría dejar de cumplirse? |
| 13.10 Horizon | La caja dice que faltan 300 pesos: ¿el cajero o el sistema? | ¿Qué registro de tu decisión podría estar repetido o mal capturado? |
| 8.9 Robodebt | Repartir la venta del mes entre 30 días inventa días malos | ¿Qué promedio o agrupación cambiaría tu conclusión? |
| 1.1 Wald | Solo opinan los clientes que regresan | ¿Qué aviones no están en tus datos? |

**Mi decisión** empieza en la clase 1. Cada alumno elige una decisión real de su trabajo y le agrega una pieza por
caso. Al cierre del módulo tiene siete piezas sobre la misma decisión. El proyecto crece en cada módulo con el
hábito nuevo y desemboca en el proyecto final del temario.

## Retención

- **La apuesta vuelve al cierre** de cada caso: el cuaderno muestra la apuesta del alumno junto a lo que encontró.
- **La clase 2 abre sin notas:** 10 minutos con una apuesta rápida sobre un caso de la clase 1 y una firma anónima
  para discutir. El Módulo 2 abrirá igual con un caso del Módulo 1.
- **El criterio en una frase:** el generador la agrega al final de cada cuaderno, y el cierre de cada clase repasa
  las frases de los casos del día.

## Las dos clases

Caso primero. El concepto aparece dentro del caso y el laboratorio va después, como práctica. Las sumas dan 180
minutos por clase.

### Clase 1 · viernes 8 de enero, 18:00 a 21:00

| Hora | Min | Actividad |
| --- | ---: | --- |
| 18:00 | 20 | Bienvenida y Colab (secretos `TDD_ID` y `TDD_CLAVE`). Cada quien elige la decisión real de **Mi decisión**. |
| 18:20 | 5 | Intro de 1.2 en pantalla y apuesta del grupo |
| 18:25 | 40 | Caso 1.2 en Colab: apuesta, mirar, fricción, herramienta, error plantado y firma. Revelación. |
| 19:05 | 15 | Laboratorio de alfabetización como práctica y la encuesta sesgada en vivo |
| 19:20 | 10 | Descanso |
| 19:30 | 20 | Caso 1.4 Puerto Rico: 64 o 2,975 |
| 19:50 | 5 | Transferir: la taquería y Mi decisión (tema 1) |
| 19:55 | 25 | Caso 13.7 Genes |
| 20:20 | 20 | Caso 13.9 Ariane 5 |
| 20:40 | 10 | Laboratorio de tipos de variables como práctica |
| 20:50 | 10 | Cierre: las cuatro frases del día, Mi decisión (tema 2) y tarea |

### Clase 2 · sábado 9 de enero, 8:00 a 11:00

| Hora | Min | Actividad |
| --- | ---: | --- |
| 8:00 | 10 | Recuperación sin notas: apuesta rápida sobre un caso de la clase 1 y una firma anónima |
| 8:10 | 25 | Caso 13.10 Horizon |
| 8:35 | 15 | Laboratorio de calidad de datos como práctica |
| 8:50 | 25 | Caso 8.9 Robodebt |
| 9:15 | 20 | Reto de la taquería en Colab, con su error plantado |
| 9:35 | 10 | Descanso |
| 9:45 | 5 | Intro de 1.1 en pantalla y apuesta del grupo |
| 9:50 | 50 | Caso 1.1 Wald: integra los cuatro temas |
| 10:40 | 20 | Cierre del módulo: firmas, frases, Mi decisión completa y qué sigue (Módulo 2, John Snow) |

Si una clase se alarga, el caso de costo pendiente pasa a tarea: su cuaderno registra solo.

## Definition of Done del módulo

- Los siete cuadernos pasan el contrato de criterio y `verificar.py` en `agentic-ds-backen`.
- 1.1 y 1.2 tienen intro animada que no nombra herramientas.
- Cada cifra tiene fuente, y los datos sintéticos están etiquetados.
- La revisión con `evals/rubric.md` no tiene ninguna dimensión en 1 y promedia 4 o más, incluidas las tres de
  `docs/CRITERIO_PRIMERO.md`.
- 2 o 3 personas sin Python resolvieron el módulo, y se corrigió lo que les costó.

**No objetivos:** cambiar los laboratorios de Nivel 1, enseñar Python, delegar código a una IA en este módulo,
publicar los casos fuera del grupo.
