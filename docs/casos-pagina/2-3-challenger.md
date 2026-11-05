# Caso 2.3 en la página · «El transbordador Challenger» (1986)

**Estado:** propuesta de diseño del 4 nov 2026 para el autor. Sigue el patrón de `docs/CASO_EN_PAGINA.md` (modelo: 1.1,
sección 6) en formato corto, como `docs/casos-pagina/1-4-puerto-rico.md`. Lo privado (claves de los retos, rúbricas, cifras
resueltas, plan docente y el bloque para `casos/caso_2_3.py`) vive en `docs/casos-pagina/2-3-challenger-privado.md` de
`agentic-ds-backen`. Aquí no hay respuestas ni rúbricas.

- **Ficha:** `casos/staging/challenger-1986.json` (estado `verified`; dudas y discrepancias entre fuentes en
  `uncertainties`).
- **Datos reales:** `casos/data/challenger-1986/vuelos.csv`, los 23 vuelos previos con cohetes recuperados: fecha,
  temperatura de la junta (°F y °C) y juntas tóricas primarias de las juntas de campo con daño térmico (Comisión Rogers,
  vol. I, figura 2; Dalal, Fowlkes y Hoadley, 1989, tabla 1, vía UCI). Procedencia, hash, licencia y discrepancias en su
  `README.md`. No hay datos simulados en el caso.
- **Clase:** 3 (Módulo 2 «Ver para decidir»), caso de «el costo del error» junto a 2.1 John Snow.
- **Hábito:** `faltan` (¿qué falta en mis datos y por qué?). **Nivel:** 2. **Peldaño:** 2, mirar los datos (una gráfica y
  una tabla), con un conteo condicionado.
- **Tipo:** costo del error · formato corto: intro de 3 escenas (~40 s) y caso en la página (~25 min).
- **Prerrequisitos:** leer una gráfica de dispersión; contar y sacar un porcentaje con la calculadora 8 bits (1.1 y 1.4).
- **Objetivo observable:** ante una gráfica que se usa para decidir, el alumno pregunta qué casos quedaron fuera, los
  agrega y recalcula la proporción, ubica la decisión respecto al rango de lo observado, encuentra el mismo error en una
  tabla del asistente y firma si lanzaría y con qué condición.
- **Herramienta (se usa antes de nombrarse):** mirar lo que una gráfica deja fuera, en sus dos caras: las filas que no
  entraron (los vuelos sin daño, un sesgo de selección) y el rango que no cubre (extrapolar fuera de lo observado). Se
  nombra al final de la sección `vuelos`, después del reto 3.
- **Supuestos:** el motor de `site/casos/caso.js` ya existe con los componentes de la sección 7 de
  `docs/CASO_EN_PAGINA.md`, más una gráfica de dispersión (puntos con cifras en texto) si `barras` no alcanza; la página
  vive en `site/casos/2-3/caso.html` + `caso-escenas.js`; los datos se copian al build como en 1.4.

### Indicadores (`docs/GUIA_CASOS.md`, propuesta)

| Pop | Did | Sus | Gan | Dat | Sol | Duración |
| ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 5 | 5 | 3 | 4 | 5 | 4 | 25 min |

Prueba del caso de ingenio: (1) la respuesta obvia es leer la gráfica de los vuelos con daño y concluir que la
temperatura no importa; (2) el giro se descubre agregando los vuelos sin daño, sin que nadie lo cuente; (3) la solución
cabe en una frase («mira también los vuelos sin falla y no decidas fuera de lo que ya viste») y cambia la decisión de
lanzar.

## 1. Cuidado con el tema (casos con víctimas)

- **Aviso de contenido** al entrar al caso, antes del expediente: «Este caso trata sobre un accidente real en el que
  murieron siete personas. Trabajamos con la decisión y los datos de la víspera, no con el accidente.» (texto visible: lo
  aprueba el autor).
- Las víctimas se mencionan **una vez**, en la revelación, con la cifra verificada y sin dramatizar. Sin nombres de la
  tripulación (no hacen falta para entender la decisión), sin fotos de la tripulación, del despegue, del humo, de restos
  ni del momento del accidente. Ninguna animación muestra el lanzamiento ni una cuenta regresiva.
- Sin puntos ni monedas por el desastre: los bits se ganan por leer bien un dato. Ningún sonido ni destello en la
  revelación.
- Sin culpables de caricatura: la Comisión documentó una falla del proceso de decisión; el caso cuenta qué se sabía, qué
  se recomendó y quién decidió, sin juzgar a personas. El debate sobre si una gráfica «habría salvado» a la tripulación
  se presenta con las dos posturas (Tufte y Boisjoly et al.).
- Datos de personas: ninguno. El CSV tiene vuelos y juntas.

## 2. Recorrido · «¿Lanzarías mañana?»

Hábito `faltan` · Nivel 2 · peldaño 2 · ~25 min · **datos reales** (se dice al abrir el expediente: «Estos son los
registros reales de los 23 vuelos anteriores, del informe de la Comisión Rogers»). Ocho secciones.

| # | Sección (id) | Min | Qué pasa en pantalla | Qué hace el alumno | Qué se registra |
| --- | --- | ---: | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | 1 | Aviso de contenido. El expediente cae sobre la mesa de la víspera (27 ene 1986, noche) y saca tres piezas: el pronóstico, una gráfica con sello «VISPERA» (cerrada) y un resumen del asistente con sello BORRADOR (cerrado). El registro de los 23 vuelos viene cerrado con cinta | Abrir el expediente | Sección |
| 2 | TU APUESTA (`apuesta`) | 3 | Solo la tarjeta del pronóstico: «Mañana, 9:38 a. m.: unos 26 °F (−3 °C). Mínima de la madrugada: 22 °F (−6 °C)» y la nota «El vuelo más frío hasta hoy: 53 °F (12 °C)». Nada de la gráfica todavía. Pregunta: «¿Lanzarías mañana?» con tres opciones: Sí, lanzaría · No, esperaría a que suba la temperatura · No sé: necesito ver los vuelos anteriores | Elegir y escribir su razón; sello «APUESTA ANOTADA» | Hipótesis (opción) y su razón (`hipotesis_razon`) |
| 3 | LA GRAFICA DE LA VISPERA (`grafica`) | 2 | Se abre la gráfica: puntos de **los vuelos que tuvieron daño en las juntas**, temperatura (eje x, 50 a 85 °F) contra juntas con daño (eje y, 0 a 3), con cifras en texto. Pie: «Así compararon los gerentes la víspera, según la Comisión Rogers (reconstrucción, figura 6)» | **Reto 1** (★, opción): ¿qué ves entre la temperatura y el daño en esta gráfica? | Sección y el intento |
| 4 | LOS VUELOS QUE FALTAN (`vuelos`) | 7 | Se corta la cinta: el registro de los 23 vuelos, ordenable por fecha o temperatura, con los puntos de la gráfica marcados. **Fricción:** el registro tiene más vuelos que la gráfica. Acción «Agregar a la gráfica»: el alumno toca cada fila que no está (o un bloque de filas por rango de temperatura) y su punto cae en y = 0. Un contador dice cuántos vuelos lleva la gráfica de los 23. Después, acción «Marcar mañana»: el eje x se estira hasta 20 °F, se sombrea el rango de temperaturas ya voladas y el alumno arrastra (o elige con teclado) la marca de mañana | **Reto 2** (★★, número) con la calculadora: ¿qué porcentaje de los vuelos a 66 °F o más tuvo al menos una junta con daño? **Reto 3** (★★, opción): ¿qué dicen los 23 vuelos sobre lo que pasará mañana? Después del reto 3 aparece la tarjeta que nombra lo que hicieron: **lo que una gráfica deja fuera** (las filas que no entraron: sesgo de selección) y **extrapolar fuera del rango observado** | Sección, cada vuelo agregado (control `agregar_vuelo`), la marca de mañana (control `marcar_manana`) y los dos intentos |
| 5 | EL RESUMEN DEL ASISTENTE (`asistente`) | 5 | El resumen del asistente cae con sello BORRADOR junto al registro. Aviso: «puede tener un error» (nunca dónde). Mesa de verificación con tres herramientas: contar vuelos del registro en un rango de temperatura, contar los vuelos que usó la tabla, sumar las juntas de un grupo. La libreta guarda lo que el alumno comprobó | **Reto 4** (★★, opción, error plantado): ¿dónde está el error del resumen? Después, escribir en dos renglones qué revisó y qué encontró | Sección, cada comprobación (control `comprobacion`), el intento y la respuesta `verificacion` |
| 6 | FIRMA TU DECISION (`firma`) | 3 | La tarjeta del pronóstico otra vez, con un espacio en blanco al lado. Campos: decisión (Lanzar mañana · No lanzar hasta que las juntas estén al menos a la temperatura más baja ya volada · Posponer y pedir pruebas en frío · Otra, ¿cuál?); a qué temperatura mínima lanzarías y por qué; una frase para quien decide; certeza; qué no sé; qué me haría cambiar; ¿necesito algo más que contar y comparar? | Firmar. Sin decisión y sin la frase para quien decide no se firma. Sello «DECISION FIRMADA · la firma es tuya, no del asistente» | Respuesta `firma` (mismo formato que 1.1, más la decisión y la temperatura mínima) |
| 7 | LA REVELACION (`revelacion`) | 2 | Bloqueada hasta que la firma quedó guardada o en la cola. Línea de tiempo de la víspera y del día, con fuentes: la teleconferencia (5:45 p. m. y 8:45 p. m.), la recomendación de no lanzar por debajo de 53 °F, la pausa de unos 30 minutos, el cambio de recomendación y el telefax (documento real, medio `telefax-thiokol`); el 28 de enero a las 11:38 a. m., 36 °F en el aire; el vuelo terminó a los 73 segundos y murieron los siete tripulantes (una sola línea, sin imagen). Las figuras 6 y 7 de la Comisión, lado a lado con la gráfica que armó el alumno. El hallazgo de la Comisión sobre el análisis que nadie hizo. Dalal et al. (1989), después del accidente, con su advertencia sobre la extrapolación. Expediente «CHALLENGER · VERIFICADO» con lo documentado y lo que se discute. Su apuesta y su firma, lado a lado | Mirar y comparar su firma con lo que se decidió | Sección |
| 8 | TU PROPIA DECISION (`cierre`) | 2 | «La misma idea en la taquería»: Don Juan quiere saber si la lluvia retrasa las entregas y revisa solo las quejas de los días con retraso; nunca mira los días sin quejas ni ha repartido con tormenta. Campo de Mi decisión | Escribir qué casos deja fuera la gráfica o la tabla con la que decide y si decide fuera de lo que ya vio; al guardar, sello «CASO 2.3 RESUELTO», el criterio en una frase y los bits del caso | Respuesta `mi_decision` y completo |

Total: 25 min. Avanzar es manual (SEGUIR); un reto se puede dejar con «Lo intento después» (no da bits hasta que se
responde). La revelación es la única puerta cerrada. Al terminar: **Mi avance** y **Siguiente caso** (la próxima clase).

**Criterio en una frase** (propuesta): «¿Qué falta en mis datos? Antes de leer una gráfica, pregunta qué casos quedaron
fuera y si vas a decidir más allá de lo que ya viste.»

**Biblioteca:** desde `vuelos`, «Para practicar lo que acabas de usar»: `labs/level-2/comparacion-visual.html`
(opcional, no cuenta).

### Detalle de piezas (lo que la página muestra; sin claves)

**Gráfica de la víspera** (sección `grafica`): siete puntos, uno por vuelo con al menos una junta de campo con daño, con
los valores de `juntas_con_dano` del CSV. El pie dice que es una reconstrucción de la comparación que describe la
Comisión (figura 6), no una lámina de la teleconferencia. Las cifras de cada punto están en texto (accesible).

**Opciones del reto 1:** Hay daño tanto en vuelos fríos como en cálidos; no se ve un patrón claro · Todos los vuelos
fríos tuvieron más daño que los cálidos · El daño crece cuanto más calor hace · Ningún vuelo tuvo más de una junta dañada.

**Opciones del reto 3:** Nada seguro: ningún vuelo previo bajó de 53 °F · Que habrá 2 juntas dañadas, como a 53 °F · Que
no habrá daño, porque la mayoría de los vuelos no tuvo · Que el riesgo es el mismo que en cualquier vuelo.

**Resumen del asistente** (sección `asistente`, tal como aparece en pantalla, con sello BORRADOR):

> «Juntas con daño por vuelo, según la temperatura (vuelos con problemas en las juntas)»
>
> | Grupo | Vuelos | Juntas con daño | Promedio por vuelo |
> | --- | ---: | ---: | ---: |
> | Fríos (menos de 66 °F) | 4 | 5 | 1.25 |
> | Cálidos (66 °F o más) | 3 | 4 | 1.33 |
>
> «Conclusión: los vuelos cálidos tienen tanto daño por vuelo como los fríos; la temperatura no explica el daño.
> Recomiendo lanzar.»

**Opciones del reto 4** (la correcta no se marca aquí):

- Solo cuenta los vuelos que tuvieron daño; deja fuera los vuelos sin daño
- Suma mal las juntas dañadas de los vuelos fríos
- Pone el corte en 66 °F cuando debía ser 53 °F
- No tiene ningún error

**Prueba de que los retos no se regalan:** la gráfica nunca calcula porcentajes; el contador solo dice cuántos vuelos
lleva la gráfica, no cuántos tienen daño en un rango. El reto 2 pide contar en un rango que el alumno elige con la vista y
dividir con la calculadora (regla 4 del patrón). En el reto 3, la marca de mañana muestra dónde cae, no qué pasará. En el
reto 4, la mesa muestra un conteo solo si el alumno lo pide, y el reto pide encontrar la contradicción, no leer una cifra.
El error del resumen no es una copia de la gráfica de la sección 3: es una tabla con promedios bien sumados y un
denominador que deja fuera a los vuelos sin daño, así que hay que aplicar la herramienta a otra forma.

### Prueba de no repetición con la intro

- La intro muestra la plataforma con hielo, la recomendación de los ingenieros (53 °F) y el expediente. El caso no vuelve a
  mostrar la foto de la plataforma ni la lámina de Thiokol; la tarjeta del pronóstico es estática.
- La intro no muestra ninguna gráfica, ni el registro de los vuelos, ni el cambio de recomendación, ni el telefax, ni el
  desenlace. Todo eso aparece en el caso, en su sección.
- La intro cierra con «¿Qué tendrías que ver antes de decir sí o no?»; el caso abre con la apuesta «¿Lanzarías mañana?»,
  que es otra pregunta.
- Ninguna línea de narración de `escenas.js` se repite en `caso-escenas.js` (el harness lo revisa).

### Registro en la base (mismo contrato que 1.1)

Mismas tablas y función que en `docs/CASO_EN_PAGINA.md`, sección 9, con `caso = "2.3"` y `version = "pagina-1.0"`. Ids de
retos: `reto_grafica_patron`, `reto_vuelos_calidos`, `reto_fuera_de_rango`, `reto_error_sin_ceros`. Preguntas abiertas:
`hipotesis_razon`, `verificacion`, `firma`, `mi_decision`. Controles: `agregar_vuelo` y `marcar_manana` (en `vuelos`),
`comprobacion` (en `asistente`).

## 3. Intro corta de 3 escenas (propuesta)

Formato corto de `site/casos/README.md` (~40 s): el material real, la advertencia de la víspera y el expediente. Sin
apuesta, sin opciones, sin nombrar herramientas y **sin el lanzamiento ni el accidente**. Narración propuesta (la aprueba
el autor):

| # | Escena | Narración (líneas cortas) | Material real | Acción del alumno (sin nota) |
| --- | --- | --- | --- | --- |
| 1 | La plataforma helada | «Florida, enero de 1986. El Challenger espera en la plataforma 39B.» · «Para la mañana del lanzamiento se pronostica la helada más fuerte de todo el programa.» | Foto del transbordador en la plataforma 39B y del hielo en el canal de agua (`plataforma-hielo-1986`) | Tocar el canal para acercar el hielo |
| 2 | La llamada de la víspera | «27 de enero, de noche. NASA llama a Morton Thiokol, que fabrica los cohetes.» · «Sus ingenieros recomiendan no lanzar por debajo de 53 °F, el vuelo más frío hasta entonces.» | Lámina de recomendación de Thiokol presentada en la segunda teleconferencia (`lamina-recomendacion-thiokol`) | Tocar el teléfono para ver la hora de la llamada |
| 3 | El expediente | «Hay un historial de vuelos anteriores. La decisión se toma esta noche.» · Pregunta abierta de cierre: «¿Qué tendrías que ver antes de decir sí o no?» | Ninguno nuevo: el expediente en pixeles, cerrado con cinta | RESOLVER EL CASO |

Ficha final: «CASO ~25 min», aviso de contenido y créditos de los medios. Títulos de «qué sigue» (E-08): «1 · Abres el
expediente aquí mismo», «2 · Apuestas antes de ver los vuelos», «3 · Firmas tu decisión antes de saber qué pasó».

**Prueba de spoiler de la intro:** no muestra ninguna gráfica ni el registro, no dice cuántos vuelos tuvieron daño, no dice
«faltan», «deja fuera», «sesgo» ni «extrapolar», no cuenta el cambio de recomendación ni el telefax, y no muestra el
lanzamiento ni el accidente. Todo el mundo sabe cómo terminó el Challenger: la intro no lo oculta ni lo usa como gancho;
el misterio es la decisión de la víspera. La pregunta de cierre es distinta de la apuesta del caso.

**Medios candidatos (`site/casos/2-3/medios.json`, estado `candidato` hasta tener el archivo):**

| id | tipo | Qué se muestra | Crédito | Licencia | Fuente | Prueba de spoiler |
| --- | --- | --- | --- | --- | --- | --- |
| `plataforma-hielo-1986` | foto | El transbordador 51-L en la plataforma 39B en la madrugada del día del lanzamiento y el hielo grueso en un canal de agua pese al anticongelante (informe Rogers, vol. I, p. 112) | NASA / Comisión Presidencial sobre el Accidente del Transbordador Challenger | Dominio público (obra del Gobierno de EE. UU.; crédito «NASA») | <https://www.nasa.gov/history/rogersrep/v1p112.htm> (imagen: <https://www.nasa.gov/wp-content/uploads/static/history/rogersrep/v1p112.jpg>) | Vehículo quieto y hielo; sin personas, sin despegue ni humo. Dice que hizo frío, no qué falta en los datos |
| `lamina-recomendacion-thiokol` | documento | Lámina inicial de recomendación de Thiokol, presentada por Robert K. Lund en la segunda teleconferencia, antes de la pausa (informe Rogers, vol. I, p. 90). Recorte: el título y la línea de los 53 °F | Morton Thiokol, reproducida en el informe de la Comisión Rogers | Publicada en un informe del Gobierno de EE. UU.; falta confirmar el estado de un documento de contratista (ver dudas) | <https://www.nasa.gov/history/rogersrep/v1ch5.htm> (imagen: <https://www.nasa.gov/wp-content/uploads/static/history/rogersrep/v1p90.jpg>) | Muestra la recomendación inicial, no el cambio. Revisar al recortar que no se vean cifras de otros vuelos |
| `telefax-thiokol` | documento | **Solo en el caso, sección `revelacion`:** telefax con la posición final de Thiokol (informe Rogers, vol. I, p. 97) | Morton Thiokol, reproducido en el informe de la Comisión Rogers | Igual que la lámina | <https://www.nasa.gov/history/rogersrep/v1p97.htm> | Es la revelación del cambio: nunca va en la intro |

Material descartado: cualquier foto o video del despegue, del humo o del accidente; fotos de la tripulación (aunque sean
oficiales de NASA y de dominio público, son personas que murieron y no aportan a la decisión); las figuras 6 y 7 de la
Comisión en la intro (son el caso); la gráfica de Tufte (mezcla temperaturas de la junta y del aire y está protegida por
derechos de autor).

## 4. Dudas para el autor

1. **¿Qué temperatura es «mañana»?** Las fuentes dan cuatro: 26 °F pronosticados para las 9:38 a. m. (lo que oyó Thiokol
   la víspera), 28 ± 5 °F calculados para las juntas, 31 °F en la figura 2 y en Dalal et al. (y en el temario, «31 °F /
   −0.6 °C»), y 36 °F del aire al despegar a las 11:38 a. m. Propuesta: el caso usa el pronóstico de la víspera (26 °F)
   porque es lo que se sabía al decidir, y la revelación muestra las cuatro con su fuente.
2. **Una herramienta o dos.** El arco pide no más de una herramienta nueva por caso. Aquí se presenta como una («lo que una
   gráfica deja fuera») con dos caras (filas y rango). Si prefieres un caso más corto, el reto 3 sale y la extrapolación
   queda solo en la revelación.
3. **Nivel y lugar.** El temario de la Generación 1 pone 2.3 en la clase 3 (Nivel 2), pero `docs/CASE_MISSION_MAP.md` lo
   lista en el banco del Nivel 4 (relación visual). ¿Se actualiza el mapa?
4. **Lámina de Thiokol.** ¿La usamos en la intro (es material real y fuerte) o basta la foto de la plataforma y la
   recomendación narrada? Falta confirmar su licencia.
5. **El debate Tufte–Boisjoly.** La revelación lo menciona para no culpar a los ingenieros. ¿Lo dejas para la discusión
   en vivo o va en pantalla?

## 5. Construcción y revisión

1. **Backend:** `casos/caso_2_3.py` con `DONDE = "pagina"` a partir del bloque de la parte privada; SQL generado.
2. **Sitio:** `site/casos/2-3/` (intro `index.html` + `escenas.js` + `medios.json`; caso `caso.html` + `caso-escenas.js` +
   `datos.js`), gráfica de dispersión en el motor si hace falta, datos copiados al build, `INTROS` y `EN_PAGINA` en
   `site/alumno.js`, `site/tiempos.json` con `min: 25`.
3. **Revisión independiente:** cifras contra el CSV y la ficha, prueba de spoiler y de no repetición, ninguna clave en el
   repo, aviso de contenido presente, ninguna imagen del accidente, accesibilidad y una pasada completa como alumno de
   prueba.
