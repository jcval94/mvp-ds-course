# Caso 2.1 en la página · «John Snow y el cólera» (Londres, 1854)

**Estado:** construido el 6 nov 2026 (`site/casos/2-1/`); diseño del 4 nov. Sin construir todavía: el visor del mapa con zoom y el recorte `tabla-ix` de la revelación (el caso usa un plano esquemático y enlaza el mapa en Commons). Sigue el patrón de `docs/CASO_EN_PAGINA.md` (modelo: 1.1,
sección 6) y los recorridos de 1.2 y 1.4. Lo privado (claves de los retos, rúbricas, cifras resueltas, plan docente y el
bloque para `casos/caso_2_1.py`) vive en `docs/casos-pagina/2-1-john-snow-privado.md` de `agentic-ds-backen`. Aquí no hay
respuestas ni rúbricas. Nada está construido; los textos visibles los aprueba el autor.

- **Clase:** 3 · «El mapa que detuvo una epidemia» (Módulo 2 · Ver para decidir). Caso principal; el costo del error de la
  misma clase es 2.3 Challenger (`faltan`).
- **Hábito:** `comparar` (¿contra qué lo comparo?). **Nivel:** 2. **Peldaño donde se resuelve:** 4, una comparación justa
  entre dos grupos mezclados en las mismas calles. **Formato:** completo, intro de 5 escenas (~1 min) y caso de ~40 min.
- **Ficha:** `casos/staging/john-snow-colera-1854.json` (estado `verified`; dudas en `uncertainties`).
- **Datos reales:** `casos/data/john-snow-colera-1854/` (CC0 la compilación; obras de Snow de dominio público): la Tabla IX
  de Snow 1855 y la fila de totales de la Tabla V de Snow 1856 (`companias.csv`), la cronología de Broad Street
  (`cronologia_broad_street.csv`) y las cifras del texto (`cifras.csv`). **No hay datos simulados.** Las coordenadas de
  cada muerte del mapa no se usan: las digitalizaciones conocidas no declaran licencia (ver su `README.md`).
- **Prerrequisitos:** Módulo 1 (1.1 a 1.4): preguntar qué falta, qué mide un número y comparar con lo esperado; dividir con
  la calculadora 8 bits.
- **Objetivo observable:** ante dos conteos de muertes, el alumno pasa a tasas por la población expuesta de cada grupo,
  encuentra una gráfica del asistente con el denominador equivocado, comprueba que la comparación aguanta con otra unidad y
  en el peor caso, y firma qué le recomienda a la autoridad sanitaria, con su certeza y lo que no sabe.
- **Herramienta (se usa antes de nombrarse):** tasa por población expuesta y comparación de dos grupos (razón de tasas;
  el «Grand Experiment» es un experimento natural). Se nombra en `sur`, después del reto 3.
- **Supuestos:** el motor de `site/casos/caso.js` sirve con sus componentes (tabla, barras, columnas, calculadora, reto,
  opciones, campos, libreta, sellos, puerta). Hacen falta dos piezas nuevas pequeñas: el visor del mapa con zoom (imagen
  fija, sin animación) y el armador de gráficas del laboratorio (sección 9).

### Indicadores (`docs/GUIA_CASOS.md`, propuesta)

| Pop | Did | Sus | Gan | Dat | Sol | Duración |
| ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 5 | 5 | 4 | 4 | 4 | 4 | 40 min |

Dat queda en 4 y no en 5 porque las muertes punto por punto del mapa no tienen licencia libre declarada.

**Prueba del caso de ingenio:** (1) la respuesta obvia es comparar conteos: Southwark & Vauxhall tiene más muertes pero
también más casas, y el «resto de Londres» tiene todavía más, así que el agua parece no explicar nada; (2) el giro se
descubre dividiendo entre las casas de cada compañía, con las cifras del caso; (3) cabe en una frase («compara muertes por
casa abastecida, no muertes») y cambia la recomendación.

## 1. Cuidado con el tema (casos con víctimas)

- **Aviso de contenido** al entrar al caso, antes del expediente: «Este caso trata sobre muertes reales por cólera en
  Londres en 1854. Trabajamos con conteos, no con historias personales.» (texto visible: lo aprueba el autor).
- Sin nombres de víctimas (tampoco el de la bebé del caso índice), sin ilustraciones de enfermos ni de cuerpos. Las muertes
  se cuentan una vez, con la cifra de Snow, sin dramatizar.
- Los contadores de muertes no hacen sonido ni destello. Los bits se ganan por leer bien un dato, nunca por una cifra mayor.
- El mapa de Snow muestra barras por casa: se muestra como documento histórico, estático, sin animar las barras.

## 2. Lo que ve el alumno

- **La decisión:** otoño de 1854. Una ley de 1852 obliga a las compañías de agua a sacar el agua de más arriba en el
  Támesis, pero el plazo vence el 31 de agosto de 1855. La autoridad sanitaria pregunta: ¿esperamos al plazo o hacemos
  algo ya con el agua de una compañía?
- **Los datos:** el mapa de Soho (dominio público), las muertes que Snow anotó cerca de las bombas, la tabla de casas y
  muertes del sur de Londres por compañía, una gráfica del asistente y la tabla de toda la epidemia por personas.
- **La pregunta detonadora (apuesta):** si casi todos los puntos de un mapa de muertes caen alrededor de una bomba, ¿eso
  prueba que la culpa es del agua?

## 3. Recorrido sección por sección

Hábito `comparar` · Nivel 2 · peldaño 4 · ~40 min · **datos reales** (se dice al abrir el expediente: «Las cifras son las
que John Snow publicó en 1855 y 1856»). Avance manual (SEGUIR), persiana de pixeles, franja «NIVEL n/10». Un reto se puede
dejar con «Lo intento después» (no da bits hasta que se responde). La revelación es la única puerta cerrada.

| # | Sección (id) | Min | Qué pasa en pantalla | Qué hace el alumno | Qué se registra |
| --- | --- | ---: | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | 2 | Aviso de contenido. El expediente cae sobre una mesa de la parroquia y reparte cuatro piezas: el mapa de Soho (doblado), la libreta de Snow con las muertes cerca de las bombas, la tabla del sur de Londres (cerrada con cinta) y una gráfica del asistente con sello BORRADOR (cerrada). Aviso: datos reales de Snow, fuentes al final | Abrir el expediente | Sección |
| 2 | TU APUESTA (`apuesta`) | 3 | Una calle limpia en pixeles con una bomba y casas, sin puntos ni cifras (no es el mapa real). Pregunta: «Si pones un punto por cada muerte y casi todos caen alrededor de esta bomba, ¿eso prueba que la culpa es del agua?» | Elegir: «Sí, eso lo prueba» · «Es una pista fuerte, pero falta comparar» · «No: alrededor de la bomba también vive más gente» · «No: el aire malo del barrio está en el mismo lugar». Escribir su razón; sello «APUESTA ANOTADA» | Hipótesis (opción) y su razón (`hipotesis_razon`) |
| 3 | LA CALLE (`calle`) | 6 | **Mirar:** el mapa real de Snow en el visor (zoom y desplazamiento, sin animación), con las bombas marcadas en anil. Al lado, la libreta de Snow: de 83 muertes registradas en tres días, 10 en casas más cerca de otra bomba; diez tarjetas, una por muerte, que el alumno voltea (5 · «la familia mandaba por agua a Broad Street», 3 · «iba a la escuela junto a la bomba», 2 · «como las que ya había antes del brote»). Dos «islas» en el mapa: el asilo de Poland Street (535 internos, pozo propio, 5 muertes) y la cervecería (más de 70 obreros que tomaban cerveza, ninguna muerte grave). **Fricción:** el asilo está rodeado de barras pero casi no tiene, y la cervecería no tiene ninguna; la pregunta queda escrita en la mesa: «¿Pocas muertes porque ahí vive poca gente, o por otra cosa?» | Voltear las diez tarjetas (no se califica). Con la calculadora: muertes por cada 1,000 internos del asilo, a la libreta. **Reto 1** (★, opción): ¿qué deja fuera el mapa? | Sección, cada tarjeta y la cuenta del asilo (control `tarjeta`, `cuenta`) y el intento |
| 4 | EL SUR DE LONDRES (`sur`) | 8 | Se corta la cinta. Tarjeta: al sur del río, dos compañías llevan agua a las mismas calles; Lambeth movió su toma río arriba en 1852 y Southwark & Vauxhall sigue tomando en Battersea; Snow revisó casa por casa de qué compañía era el agua (recibos y una prueba de sal). **Mirar:** tabla con tres filas (Southwark & Vauxhall, Lambeth, resto de Londres) y dos columnas, casas y muertes de las primeras siete semanas; barras de muertes. **Fricción:** el resto de Londres tiene más muertes que ninguna compañía. **Acción del alumno:** la columna «por cada 10,000 casas» empieza vacía; el alumno escribe cada fila con la calculadora (la página solo comprueba que el número quepa en la columna, no lo califica) y, al llenar las tres, las barras pasan de muertes a muertes por casa | **Reto 2** (★★, número): muertes por cada 10,000 casas de Southwark & Vauxhall. **Reto 3** (★★★, número): ¿cuántas veces más que en las casas de Lambeth? Después del intento aparece la tarjeta que nombra lo que usaron (ver «La herramienta») | Sección, cada fila calculada (control `tasa_fila`) y los dos intentos |
| 5 | LA GRAFICA DEL ASISTENTE (`asistente`) | 5 | La gráfica del asistente cae con sello BORRADOR junto a la tabla ya abierta. Aviso: «puede tener un error» (nunca dónde). Mesa de verificación con cuatro herramientas: mirar dónde empieza el eje, contar las filas de la gráfica contra la tabla, recalcular una barra con la calculadora, leer el título y la nota de la gráfica | Elegir qué comprobar; cada resultado cae en la libreta. **Reto 4** (★★, opción, error plantado): ¿dónde está el error de la gráfica? | Sección, cada comprobación (control `comprobacion`) y el intento |
| 6 | LA SEGUNDA PRUEBA (`segunda_prueba`) | 6 | Tarjeta con la Tabla V de 1856: la epidemia completa en los distritos del sur, ahora por **personas**: Southwark & Vauxhall 267,625 personas y 3,706 muertes; Lambeth 171,528 y 411; además 338 muertes de bombas y otras fuentes y **623 sin averiguar**. Tarjeta con la cita de Snow sobre la mezcla: las tuberías de las dos pasaban por todas las calles y cada compañía abastecía a ricos y pobres. Botón «¿Y si las 623 fueran todas de un grupo?»: el alumno elige a qué grupo mandarlas y la tabla suma la fila (la página suma; la división la hace él). Al final, la libreta con lo que hizo en las secciones 3 a 6 y dos renglones | Con la calculadora: las dos tasas por cada 10,000 personas, a la libreta. **Reto 5** (★★★, número): en el peor caso para el agua, ¿cuántas veces más? Escribir qué revisó y qué encontró (comprobación 1 y 2) | Sección, cada cuenta y la elección del grupo (control `cuenta`, `peor_caso`), el intento y la respuesta `verificacion` |
| 7 | FIRMA TU DECISION (`firma`) | 3 | «Es noviembre de 1854. La autoridad sanitaria te pide una recomendación sobre el agua del sur de Londres.» Cuatro opciones de decisión, un campo «Qué le dirías en una frase», certeza, qué no sé, qué me haría cambiar, ¿necesito algo más que contar y comparar? | Firmar. Sin opción ni frase no se firma. Sello «DECISION FIRMADA · la firma es tuya, no del asistente» | Respuesta `firma` |
| 8 | LA REVELACION (`revelacion`) | 3 | Bloqueada hasta que la firma quedó guardada o en la cola. Columnas de ataques por día en Broad Street (19 ago a 30 sep, Tabla I de Snow) con la marca del 8 de septiembre: el día del mango. Expediente «JOHN SNOW · VERIFICADO» con lo documentado, lo que no se sabe y los mitos. El recorte de la Tabla IX impresa y la tasa del resto de Londres que no cuadra. Su apuesta y su firma, lado a lado | Mirar y comparar | Sección |
| 9 | LABORATORIO (`laboratorio`) | 2 | «El armador de gráficas»: los datos reales de la Tabla IX con cuatro controles: qué dividir (nada · casas de cada fila · casas de todo Londres), dónde empieza el eje (0 · 30), qué filas entran (las tres, sin el resto de Londres, sin Lambeth) y qué periodo (siete semanas por casas · epidemia completa por personas). Una línea abajo dice qué cuenta la gráfica que quedó | Probar combinaciones y ver cuáles cambian la historia | Sección y combinaciones probadas (control `laboratorio`, con pausa de 10 s) |
| 10 | TU PROPIA DECISION (`cierre`) | 2 | «La misma idea en la taquería» (ejercicio de transferencia) y el campo de Mi decisión | **Reto 6** (★, opción, transferencia). Escribir en su decisión qué dos grupos compara y cuál es la población expuesta de cada uno; al guardar, sello «CASO 2.1 RESUELTO», el criterio en una frase y los bits | Intento, respuesta `mi_decision` y completo |

Total: 40 min. Al terminar: **Mi avance** y **Siguiente caso** (intro de 2.3 Challenger).

**Ejercicio guiado y de transferencia (Nivel 2):** el guiado es `sur` (tabla, columna vacía, calculadora, barras que
cambian); la transferencia es `cierre`, otro contexto donde hay que elegir la población expuesta antes de contar, no la
misma cuenta con otros números.

**Criterio en una frase (propuesta):** «¿Contra qué lo comparo? Antes de comparar conteos, divide entre cuántos estaban
expuestos en cada grupo.»

**Biblioteca:** desde `sur`, «Para practicar lo que acabas de usar»: Laboratorio de comparación visual
(`labs/level-2/comparacion-visual.html`), opcional y fuera de la calificación.

### Retos (las opciones están en la página; la clave, solo en la base)

| Reto | Sección | Tipo | Pregunta | Opciones o formato | Pista visible |
| --- | --- | --- | --- | --- | --- |
| `reto_mapa_deja_fuera` (★) | `calle` | opción | El mapa pone una barra por cada muerte en su casa. ¿Qué no te dice? | «Cuántas personas vivían en cada casa y de qué agua tomaban» · «Dónde estaban las bombas» · «En qué casas hubo muertes» · «Qué calles tuvieron más muertes» | Piensa en el asilo: tiene pocas barras. ¿Es porque vivía poca gente ahí? |
| `reto_tasa_sv` (★★) | `sur` | número | ¿Cuántas muertes hubo por cada 10,000 casas de Southwark & Vauxhall? | Un número entero o con un decimal | Muertes entre casas, por 10,000. |
| `reto_cuantas_veces` (★★★) | `sur` | número | ¿Cuántas veces más muertes por casa tuvieron las casas de Southwark & Vauxhall que las de Lambeth? | Un número con un decimal | Saca la de Lambeth igual y divide una entre otra. |
| `reto_error_grafica` (★★) | `asistente` | opción | Compara la gráfica con la tabla. ¿Dónde está el error? | «Divide las muertes de cada fila entre las casas de todo Londres, no entre las casas de esa fila» · «El eje vertical no empieza en cero y exagera la diferencia» · «Le falta la fila de Lambeth» · «No tiene ningún error» | Recalcula una barra con la calculadora y compárala con tu columna. |
| `reto_peor_caso` (★★★) | `segunda_prueba` | número | Supón que las 623 muertes sin averiguar fueran todas de clientes de Lambeth. ¿Cuántas veces más muertes por persona tendría todavía Southwark & Vauxhall? | Un número con un decimal | Suma las 623 a Lambeth, saca las dos tasas por personas y divide. |
| `reto_taqueria_expuestos` (★) | `cierre` | opción | Don Juan estrenó una salsa. Esta semana se quejaron del estómago 6 clientes que la probaron y 4 que no la probaron. ¿Qué necesita antes de culpar a la salsa? | «Cuántos clientes probaron la salsa y cuántos no» · «Nada: 6 es más que 4» · «A qué hora llegaron los que se quejaron» · «Cuánto cuesta la salsa» | ¿Contra cuántos estaban expuestos en cada grupo? |

Preguntas abiertas con los mismos nombres que 1.1: `hipotesis_razon`, `verificacion`, `firma`, `mi_decision`.

**Prueba de que ningún reto se regala:**

- La tabla de `sur` muestra casas y muertes, **sin** la columna de tasas que imprimió Snow. La columna «por cada 10,000
  casas» la llena el alumno con la calculadora; la página no la califica ni la corrige, solo cambia las barras.
- Antes de la revelación, la página no trae las tasas impresas de la Tabla IX ni la frase de Snow sobre cuántas veces
  más; este repo solo las tiene en el recorte `tabla-ix`, que se muestra en la revelación. La explicación del reto 3 (que
  da la base al responder) es la que las cuenta.
- Copiar las barras de la gráfica del asistente no resuelve ningún reto.
- En `segunda_prueba`, el botón suma las 623 a la fila elegida, pero no divide ni compara: las tasas y la razón salen de
  la calculadora.
- **Riesgo aceptado (como en 1.4):** casas y muertes son públicas (CSV, libro de Snow, Data 8, UCLA) y las tasas impresas
  están en fuentes externas. Las claves, las explicaciones y las rúbricas solo viven en la base.

### El error plantado (sección `asistente`, tal como aparece en pantalla, con sello BORRADOR)

> «Le pedí al asistente: *haz una gráfica que compare la tasa de muertes por cada 10,000 casas de las dos compañías y del
> resto de Londres, primeras siete semanas*.»
>
> **Gráfica:** barras con eje desde 0, título «Muertes por cada 10,000 casas, julio y agosto de 1854». Tres barras:
> Southwark & Vauxhall **39.2**, Lambeth **3.0**, Resto de Londres **44.1**. Nota al pie: «Fuente: Snow (1855), Tabla IX.
> 322,576 casas.»
>
> «Conclusión del asistente: el resto de Londres tiene la tasa más alta. La diferencia entre las dos compañías no alcanza
> para culpar al agua.»

Las opciones del reto 4 recorren los tres chequeos del trabajo con IA del Módulo 2 (ejes, denominadores y filas) más
«ningún error». La mesa de verificación tiene una herramienta para cada chequeo; cuál es el error y por qué está solo en la
parte privada.

### La herramienta (se usa en `calle` y `sur`; se nombra en `sur`, después del reto 3)

Tarjeta «LO QUE ACABAS DE USAR TIENE NOMBRE»: dividir las muertes de cada grupo entre cuántos estaban expuestos (casas o
personas) es una **tasa por población expuesta**; dividir una tasa entre otra es una **razón de tasas** (o riesgo
relativo). Y cuando la vida reparte a la gente en dos grupos que no eligió un investigador, pero que están mezclados en lo
demás, se llama **experimento natural**. Un mapa o una barra de conteos no te dicen contra qué comparar.

Palabras que no aparecen antes de esa tarjeta (ni en la intro, ni en títulos de secciones anteriores, ni en opciones de
retos): tasa por población expuesta, población expuesta, razón de tasas, riesgo relativo, experimento natural, grupo de
comparación. La palabra «tasa» sola sí puede aparecer en la gráfica del asistente (después de la tarjeta).

### La firma

Opciones de decisión (ninguna es «la buena»; se califica el razonamiento):

- Esperar al plazo de la ley: el cólera viene del aire y mover las tomas antes no cambia nada.
- Pedir que Southwark & Vauxhall adelante el cambio de su toma y avisar ya a sus clientes.
- Avisar a los clientes de Southwark & Vauxhall y seguir midiendo hasta el plazo.
- No recomendar nada todavía: la comparación no alcanza.

Formato del texto que se guarda (como en 1.1): «Le recomiendo a la autoridad: <opción>. En una frase: … Certeza: … Lo que
no sé: … Me haría cambiar: … ¿Algo más que contar y comparar?: …».

### La revelación (qué muestra)

- **El mango.** Columnas de ataques por día de la Tabla I de Snow: suben del 30 de agosto al 1 de septiembre (143) y ya
  van en 12 el 8 de septiembre, cuando se quita el mango tras la junta del 7. Snow mismo escribió que los ataques habían
  bajado tanto que no se podía saber si el pozo seguía contaminado. Total de la tabla: 616.
- **El mapa no fue el descubrimiento.** La idea del agua es anterior; Snow publicó el mapa en su libro de 1855 para
  mostrar lo que ya había encontrado casa por casa (Brody y otros, *Lancet* 2000).
- **No convenció a todos.** La autoridad sanitaria siguió con la explicación del aire; el libro vendió 56 de 300 ejemplares
  (UCLA). El reverendo Henry Whitehead, que creía en el miasma, encontró en 1855 el caso índice junto al pozo.
- **Las tomas.** Southwark & Vauxhall se mudó a Hampton en agosto de 1855, al vencer el plazo de la ley.
- **La tabla de Snow también tenía un detalle.** Para el resto de Londres Snow imprimió 59 muertes por cada 10,000 casas;
  con sus mismas cifras salen 55.5. La comparación no cambia, pero hasta la tabla famosa se revisa. (La página muestra
  aquí el recorte de la tabla impresa, `tabla-ix`, que llega después de los retos.)
- **Lo que no sabemos:** cuántas personas vivían en cada casa por compañía (por eso la segunda prueba), quién eligió la
  compañía de cada casa, la cifra total del brote según el área (616 en la tabla de Snow, 420 en otras fuentes).
- **Mitos que no se cuentan como hechos:** «quitar el mango acabó con la epidemia», «Snow lo descubrió mirando el mapa»,
  «el mapa convenció a todos», «el mapa prueba la causa», «Snow hizo un experimento con asignación al azar», «Snow
  descubrió el bacilo» (lo describió Pacini en 1854 y lo aisló Koch en 1883).

### La taquería y Mi decisión

| En la taquería | En 1854 |
| --- | --- |
| La sucursal del centro tiene más quejas que la del norte | El resto de Londres tiene más muertes que cualquier compañía |
| Pero el centro vende seis veces más tacos | Pero tiene seis veces más casas que Southwark & Vauxhall |
| Quejas por cada mil pedidos, en cada sucursal | Muertes por cada 10,000 casas, en cada compañía |

**Mi decisión (pieza 3):** «En tu decisión, ¿qué dos grupos comparas? ¿Cuántos estaban expuestos en cada uno?»

### Prueba de no repetición con la intro

- La intro muestra Soho en pixeles, la gente en las bombas, a Snow y la cifra de más de 500 muertes en diez días. El caso
  no vuelve a animar la ciudad ni el contador: abre con el expediente, apuesta sobre una calle limpia y usa el mapa real
  como documento fijo.
- La intro **no** muestra el mapa de Snow, ni las compañías de agua, ni la tabla del sur, ni dice qué pidió Snow a la
  junta, ni cuándo se quitó el mango.
- Ninguna línea de narración de `escenas.js` se repite en `caso-escenas.js` (el harness lo revisa).

### Registro en la base (mismo contrato que 1.1)

Mismas tablas y función que en `docs/CASO_EN_PAGINA.md`, sección 9, con `caso = "2.1"` y `version = "pagina-1.0"`.
Controles: `tarjeta` y `cuenta` (en `calle`), `tasa_fila` (en `sur`), `comprobacion` (en `asistente`), `cuenta` y
`peor_caso` (en `segunda_prueba`), `laboratorio`.

## 4. Intro propuesta · formato completo (5 escenas, ~1 min)

Gancho público sin apuesta, sin opciones y sin nombrar herramientas. Paleta `--tq-*`. Textos para aprobación del autor.
Sin morbo: ningún enfermo, cuerpo ni carroza fúnebre; la cifra se dice una vez.

| # | Escena | Plano y gesto | Narración (líneas cortas) | Sorpresa o acción |
| --- | --- | --- | --- | --- |
| 1 | Lugar | Londres, verano de 1854: paneo del Támesis a las calles de Soho; gente con cubetas en una bomba de calle | «Londres, finales de agosto de 1854.» · «En Soho no hay agua en las casas: la gente la saca de bombas en la calle.» | El grabado del Támesis de la época (candidato `tamesis`) se funde con el pixel |
| 2 | Personas | Un médico camina entre las casas con una libreta | «John Snow es médico y vive cerca.» · «Casi todos sus colegas creen que el cólera viaja en el aire sucio.» | Retrato real de Snow (candidato `retrato`) clavado en la pared |
| 3 | Cifras | Ventanas que se apagan una por una en una manzana, sin cuerpos ni sonido | «Un jueves empieza un brote en unas cuantas manzanas.» · «En diez días mueren más de quinientas personas.» | Se queda una sola ventana encendida |
| 4 | Interacción | Plano de calle con varias bombas iguales | «Toca una bomba para ver de dónde sale su agua.» | Cada bomba muestra su nombre de calle (todas iguales, sin datos); no se califica |
| 5 | Expediente | Carpeta con sello «SIN RESOLVER» | «El 7 de septiembre, Snow pide hablar con la junta de la parroquia.» · «Trae una petición que a casi todos les parece rara.» · «¿Qué tendrías que ver para creerle?» | Títulos de qué sigue: «1 · Abres el expediente aquí mismo» · «2 · Apuestas antes de ver los datos» · «3 · Firmas tu decisión antes de saber qué pasó». Botón RESOLVER EL CASO. La ficha dice «CASO ~40 min», aviso de contenido y `herramientasOcultas` |

**Prueba de spoiler de la intro:** quien solo vea la intro sabe que hubo un brote en Soho con más de 500 muertes en diez
días, que la gente tomaba agua de bombas, que casi todos los médicos culpaban al aire y que Snow pidió algo a la junta.
No ve el mapa ni puntos por casa, no sabe qué pidió, ni que hubo dos compañías de agua, ni cifras del sur de Londres, ni
qué pasó con el mango. No aparecen «tasa», «denominador», «población expuesta», «comparar grupos» ni «experimento». La
pregunta final es distinta de la apuesta del caso. Riesgo: el título de la clase («El mapa que detuvo una epidemia») ya
afirma un mito (ver dudas para el autor). «Un jueves» es el 31 de agosto de 1854 (fue jueves).

### Material real candidato (`site/casos/2-1/medios.json`)

| id | Dónde | Pieza | Autor y archivo | Licencia | Estado y pendiente | Prueba de spoiler |
| --- | --- | --- | --- | --- | --- | --- |
| `mapa-snow` | Caso, `calle` (no la intro) | Mapa de las muertes por cólera alrededor de Broad Street, litografía de la 2.ª ed. de *On the Mode of Communication of Cholera* (1855) | John Snow; litografía de Charles F. Cheffins. Commons: `File:Snow-cholera-map-1.jpg` (<https://commons.wikimedia.org/wiki/File:Snow-cholera-map-1.jpg>); escaneo del libro en el Wellcome (<https://archive.org/details/b28985266>) | **Dominio público** (obra de 1854–55; Snow murió en 1858). Confirmar la plantilla de Commons (PD-old) | `candidato`. No se pudo abrir la ficha de Commons desde esta sesión: confirmar autor del grabado, licencia y resolución; bajar a 2000 px para el zoom, ≤ 600 KB, `medios/mapa-snow.webp` | Va en el caso, no en la intro: es la pieza que el alumno mira en `calle` |
| `retrato` | Intro, escena 2 | Retrato fotográfico de John Snow (hacia 1856–57) | Fotógrafo por confirmar. Commons: `File:John Snow.jpg` (<https://commons.wikimedia.org/wiki/File:John_Snow.jpg>) | Probable **dominio público** por antigüedad | `candidato`. Confirmar ficha, autor y fecha; 600 px, ≤ 150 KB | Una persona, sin datos ni mapa |
| `tamesis` | Intro, escena 1 | Grabado del Támesis o de una bomba de calle de Londres, 1850–1860, sin texto sobre cólera | Por elegir en Wellcome Collection (<https://wellcomecollection.org/>) o Commons | Dominio público por antigüedad; algunas imágenes del Wellcome van con CC BY 4.0 (crédito obligatorio) | `por localizar` | Sin cólera, sin muertes y sin compañías de agua a la vista |
| `tabla-ix` | Caso, revelación | Recorte de la Tabla IX, p. 86 del libro de 1855 (con la columna de tasas impresas) | Escaneo del Wellcome en Internet Archive (<https://archive.org/details/b28985266>) | Dominio público | `candidato`. Sirve además para cerrar la duda de la ficha (cotejar la tabla) | Solo en la revelación: trae las tasas |

Material descartado: la caricatura de *Punch* «Death's Dispensary» (1866; adelanta que el agua es la culpable y es
posterior), fotos o grabados de enfermos, la réplica actual de la bomba en Broadwick Street con su placa (dice qué pasó) y
el mapa en la intro (adelanta el conteo espacial).

## 5. Dudas para el autor

1. **Título de la clase.** «El mapa que detuvo una epidemia» afirma el mito que el caso desmonta (el mango no la detuvo y
   el mapa no fue la prueba). ¿Se cambia el título visible, por ejemplo a «La tabla detrás del mapa», o se deja y la
   revelación lo discute?
2. **Coordenadas del mapa.** Sin licencia declarada, el conteo por bomba usa las cifras del texto de Snow (83 y 10). ¿Pido
   permiso a Robin Wilson o confirmo la licencia de `HistData` para que el alumno cuente puntos por bomba en una versión
   1.1?
3. **Casas o personas en el reto 2.** La Tabla IX compara por casas (lo que Snow tenía en agosto); la segunda prueba usa
   personas. ¿Se queda así o se invierte el orden?
4. **Textos visibles** de la intro, del caso, de las opciones de la apuesta y de la firma.

## 6. Construcción y revisión

1. **Backend:** `casos/caso_2_1.py` con `DONDE = "pagina"` a partir del bloque de la parte privada; SQL generado.
2. **Sitio:** `site/casos/2-1/` (intro `index.html` + `escenas.js` + `medios.json`; caso `caso.html` + `caso-escenas.js`
   + `datos.js` con las cifras de los CSV sin las tasas impresas), `INTROS` y `EN_PAGINA` en `site/alumno.js`,
   `site/tiempos.json` con `min: 40`.
3. **Revisión independiente:** cifras contra los CSV y la ficha, prueba de spoiler y de no repetición, ninguna clave en el
   repo, aviso de contenido presente, accesibilidad y una pasada completa como alumno de prueba.

## Fuentes

- Snow, J. (1855). *On the Mode of Communication of Cholera*, 2.ª ed. Londres: John Churchill.
  <https://www.gutenberg.org/ebooks/72894> · escaneo del Wellcome: <https://archive.org/details/b28985266>
- Snow, J. (1856). «Cholera and the Water Supply in the South Districts of London in 1854». *Journal of Public Health*.
  <https://www.gutenberg.org/ebooks/66507>
- Coleman, T. *SnowCholera* (transcripciones de las tablas, BSD-2-Clause). <https://github.com/tscoleman/SnowCholera>
- Brody, H., Rip, M. R., Vinten-Johansen, P., Paneth, N. y Rachman, S. (2000). «Map-making and myth-making in Broad
  Street: the London cholera epidemic, 1854». *The Lancet* 356(9223): 64–68.
  <https://doi.org/10.1016/S0140-6736(00)02442-9>
- Frerichs, R. R. *John Snow* (UCLA Fielding School of Public Health): brote de Broad Street
  <https://epi-snow.ph.ucla.edu/Stream2_BSPoutbreak_f.html> y Grand Experiment
  <https://epi-snow.ph.ucla.edu/Stream3_GrandExperiment_d.html>
- Adhikari, A., DeNero, J. y Wagner, D. *Computational and Inferential Thinking* (Data 8), «Snow's Grand Experiment».
  <https://data8.datascience.uchicago.edu/chapters/02/2/snow-s-grand-experiment>
- «Metropolis Water Act 1852», Wikipedia. <https://en.wikipedia.org/wiki/Metropolis_Water_Act_1852>
- «1854 Broad Street cholera outbreak», Wikipedia. <https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak>
