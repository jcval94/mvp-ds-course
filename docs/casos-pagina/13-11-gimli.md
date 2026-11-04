# Caso 13.11 en la página · «El planeador de Gimli» (vuelo 143 de Air Canada, 1983)

**Estado:** propuesta de diseño del 4 nov 2026 para el autor. Sigue el patrón de `docs/CASO_EN_PAGINA.md` (modelo: 1.1,
sección 6) en formato corto. Lo privado (claves de los retos, rúbricas, cifras resueltas, plan docente y el bloque para
`casos/caso_13_11.py`) vive en `docs/casos-pagina/13-11-gimli-privado.md` de `agentic-ds-backen`. Aquí no hay respuestas ni
rúbricas.

- **Ficha:** `casos/staging/gimli-glider-1983.json` (estado `candidate`: las cifras línea por línea todavía no se ubicaron en
  el informe Lockwood; ver `uncertainties`).
- **Datos reales:** `casos/data/gimli-glider-1983/cifras.csv`, las entradas del cálculo (lo que pide el plan, las lecturas de
  la varilla, los factores) con unidad y fuente por fila. Sin resultados derivados. La hoja de carga que ve el alumno es una
  reconstrucción visual con esas cifras; se avisa al abrir el expediente.
- **Hábito:** `verificar` (¿cómo lo verifico?). **Nivel:** 1. **Peldaño:** 3, una regla de unidades y de rango.
- **Tipo:** costo del error · solución simple · formato corto: intro de 3 escenas (~40 s) y caso en la página (~30 min).
- **Prerrequisitos:** 1.1 (calculadora 8 bits, mesa de verificación, firma). Multiplicar, dividir y restar con la
  calculadora. No hace falta saber qué es una densidad.
- **Objetivo observable:** ante una cuenta ya hecha (por una persona o por el asistente), el alumno le pone su unidad a cada
  número, compara el resultado con un rango físicamente posible, encuentra el factor que no corresponde y firma qué revisaría
  antes de despegar y quién responde por esa revisión.
- **Herramienta (se usa antes de nombrarse):** unidades y factor de conversión; validar rangos. Se nombra al final de la
  sección `kilos`, después del reto 3.
- **Supuestos:** el motor de `site/casos/caso.js` (E-10) con los componentes de la sección 7 de `docs/CASO_EN_PAGINA.md`;
  la página vive en `site/casos/13-11/caso.html` + `caso-escenas.js`; `cifras.csv` se copia al build igual que los datos de
  Wald. Hacen falta dos piezas nuevas del motor, sencillas: `etiquetas` (poner una unidad a cada número) y `regla` (una recta
  con un rango sombreado donde cae un valor). Ver «Lo que pide al motor».

### Indicadores (`docs/GUIA_CASOS.md`, propuesta)

| Pop | Did | Sus | Gan | Dat | Sol | Duración |
| ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 4 | 5 | 2 | 5 | 3 | 3 | 30 min |

Prueba del caso de ingenio: (1) la respuesta obvia es confiar en una cuenta bien multiplicada y repasada; (2) el giro se
descubre poniéndole unidad a cada número y comparando con lo posible, sin que nadie lo cuente; (3) la solución cabe en una
frase («un número sin su unidad no es un dato») y cambia la decisión de despegar. Sustancia baja a propósito: es el caso corto
de la clase 2.

## 1. Cuidado con el tema

Gimli no tuvo muertos, así que no lleva aviso de contenido. Aun así: sin humor sobre el desenlace, sin animar una caída ni
un choque, y las lesiones menores de la evacuación se mencionan una vez en la revelación. Las personas se nombran solo donde
el informe las nombra y sin culpar a una sola: el caso trata de una cadena de revisiones, no de un culpable.

## 2. Recorrido · «¿Cuánto combustible lleva el avión?»

Hábito `verificar` · Nivel 1 · peldaño 3 · ~30 min · **cifras reales** (al abrir el expediente: «Las cifras de este caso son
reales y vienen de la investigación del accidente y de reportes publicados. La hoja de carga es una reconstrucción con esas
cifras.»). Ocho secciones.

| # | Sección (id) | Min | Qué pasa en pantalla | Qué hace el alumno | Qué se registra |
| --- | --- | ---: | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | 2 | Montreal, 23 de julio de 1983, en la plataforma. El expediente cae y saca cuatro piezas: el plan de vuelo (Montreal-Ottawa-Edmonton, pide 22,300 kg), la nota de mantenimiento (los indicadores de combustible de la cabina están en blanco; se mide a mano con una varilla), la hoja de carga (cerrada) y el visto bueno del asistente (cerrado, sello BORRADOR). Aviso de cifras reales y hoja reconstruida | Abrir el expediente | Sección |
| 2 | TU APUESTA (`apuesta`) | 3 | Se abre la hoja de carga tal como se llenó: lectura de la varilla 7,682 L · «densidad» 1.77 · 7,682 × 1.77 = 13,597 · faltan 22,300 − 13,597 = 8,703 · litros a cargar 8,703 ÷ 1.77 = 4,917. Sin unidades en las cuentas, como en el original. Pregunta: «¿Cargarías el avión con este cálculo?» con cuatro opciones: Sí, lo cargaría · No lo cargaría · Lo cargaría después de revisar algo · No sé | Elegir y escribir su razón; sello «APUESTA ANOTADA» | Hipótesis (opción) y su razón (`hipotesis_razon`) |
| 3 | LAS CUENTAS (`cuentas`) | 4 | La hoja otra vez, línea por línea, con la calculadora 8 bits al lado. Cada línea tiene un botón «Repetir esta cuenta»: el alumno la teclea en la calculadora y la línea recibe el sello CUADRA (anil). **Fricción:** las cuatro líneas cuadran. Debajo, el camión cisterna carga los litros y el tanque se llena en pixeles hasta la marca que dice la hoja | Repetir las cuentas. **Reto 1** (★, número): con la calculadora, ¿cuántos litros hay en los tanques después de cargar? | Sección, cada cuenta repetida (control `repetir_cuenta`) y el intento |
| 4 | EL VISTO BUENO DEL ASISTENTE (`asistente`) | 6 | El visto bueno cae con sello BORRADOR junto a la hoja. Aviso: «puede tener un error» (nunca dónde). Mesa de verificación con cuatro herramientas: **etiquetas** (poner su unidad a cada número de la hoja y del visto bueno: L, kg, lb, kg/L, lb/L, sin unidad), **la ficha del combustible** (un litro de combustible de avión pesa entre 0.775 y 0.840 kg; un litro de agua, cerca de 1 kg), **el manual de operaciones** (kilos = libras ÷ 2.2) y **la báscula de un litro**: el alumno calcula con la calculadora cuánto pesaría un litro según el visto bueno y la página lo coloca en una recta junto al rango de la ficha y al agua. Cada comprobación queda en su libreta | **Reto 2** (★★, opción, error plantado): ¿dónde está el error del visto bueno? | Sección, cada comprobación (control `comprobacion`, con `valor.accion`: `etiquetas`, `ficha`, `manual`, `bascula`), cada unidad puesta (control `etiqueta`) y el intento |
| 5 | LO QUE PESA DE VERDAD (`kilos`) | 7 | El tanque en pixeles se vacía y se vuelve a llenar con la báscula al lado. Dos barras: lo que pide el plan y una barra con «?» | **Reto 3** (★★★, número) con la calculadora: ¿cuántos kilos de combustible llevaba el avión al despegar de Montreal? Después del intento, la barra «?» toma la cifra que el alumno escribió (no la clave) y aparece la tarjeta que nombra lo que usaron: **unidades y factor de conversión** (cada número lleva su unidad, y un factor solo convierte la unidad que dice) y **validar rangos** (antes de creer un resultado, compararlo con lo que es físicamente posible). Al final, la libreta con las comprobaciones de las secciones 3 a 5 y dos renglones: qué revisó y qué encontró | Sección, el intento y la respuesta `verificacion` |
| 6 | ANTES DE DESPEGAR (`firma`) | 3 | La plataforma otra vez, con el avión cargado y la escalera puesta. Campos: ¿despegas? (sí · no · después de…); las revisiones que harías antes de despegar, en orden (hasta tres renglones); quién firma cada revisión y quién firma el despegue (lista: la persona que carga el combustible · el técnico de mantenimiento · el copiloto · el capitán · el despachador · el asistente · otra, ¿cuál?) y por qué; certeza; qué no sé; qué me haría cambiar; ¿necesito algo más que contar y comparar? | Firmar. Sin una revisión y sin un nombre de quien firma no se firma. Sello «DECISION FIRMADA · la firma es tuya, no del asistente» | Respuesta `firma` (texto con el formato de 1.1, más la lista de revisiones y quién firma) |
| 7 | LA REVELACION (`revelacion`) | 3 | Bloqueada hasta que la firma quedó guardada o en la cola. Línea de tiempo en pixeles: Montreal (la hoja) → Ottawa (otra medición con varilla y el mismo tipo de cuenta) → alarma de baja presión de combustible a 41,000 pies → los dos motores se apagan → unos 17 minutos de planeo → Gimli, una base militar en desuso con una parte de la pista usada para carreras → 69 personas a bordo, sin muertos. Expediente «VUELO 143 · VERIFICADO» con lo documentado (el factor 1.77 convierte litros en libras; las cuentas se repasaron y eran «matemáticamente correctas»; los indicadores en blanco iban contra la lista de equipo mínimo) y lo que no se sabe (ver la ficha). Su apuesta, su cifra del reto 3 y su firma, lado a lado | Mirar y comparar | Sección |
| 8 | TU PROPIA DECISION (`cierre`) | 2 | «La misma idea en la taquería»: el proveedor manda la carne en libras y la receta de Don Juan está en kilos; la cuenta del pedido está bien hecha y aun así llega la mitad de la carne. Campo de Mi decisión (pieza 4) | Escribir qué dato de su decisión viene en otra unidad o en otro formato y cómo lo revisaría; al guardar, sello «CASO 13.11 RESUELTO», el criterio en una frase y los bits del caso | Respuesta `mi_decision` y completo |

Total: 30 min. Avanzar es manual (SEGUIR); un reto se puede dejar con «Lo intento después» (no da bits hasta que se
responde). La revelación es la única puerta cerrada. Al terminar: **Mi avance** y **Siguiente caso**.

**Arco de criterio:** apuesta (2) antes de cualquier comprobación · mirar y fricción (3: todo cuadra) · la herramienta se usa
sin nombre en 4 (etiquetas, ficha, báscula) y se nombra en 5 después del reto · verificación del asistente en 4 y
verificación escrita en 5 · firma (6) antes de la revelación (7) · transferencia (8).

**Criterio en una frase** (de `docs/MODULO_1_DISENO.md`): «¿Cómo lo verifico? Un número sin su unidad no es un dato.»

**Biblioteca:** desde `kilos`, «Para practicar lo que acabas de usar»: `labs/level-1/tipos-variables.html` (opcional, no
cuenta).

### Detalle de piezas (lo que la página muestra; sin claves)

**La hoja de carga** (sección `apuesta`, reconstrucción con cifras reales; en el original las cuentas no llevan unidades):

> | Línea | Cuenta |
> | --- | --- |
> | Lectura de la varilla, convertida con la tabla | 7,682 |
> | «Densidad» | 1.77 |
> | En los tanques | 7,682 × 1.77 = 13,597 |
> | Pide el plan | 22,300 kg |
> | Faltan | 22,300 − 13,597 = 8,703 |
> | Litros a cargar | 8,703 ÷ 1.77 = 4,917 |

**El visto bueno del asistente** (sección `asistente`, tal como aparece, con sello BORRADOR; es el error plantado):

> «Revisé la hoja de carga. En los tanques quedan 7,682 L y se cargan 4,917 L: 12,599 L en total. 12,599 × 1.77 =
> 22,300 kg, justo lo que pide el plan de vuelo. Las cuentas cuadran: el avión va lleno y puede despegar.»

Opciones del reto 2 (la correcta no se marca aquí):

- Multiplica los litros por 1.77, que convierte litros en libras, y escribe el resultado como kilos
- Suma mal los litros que había y los que se cargaron
- Usa una lectura de la varilla distinta de la de la hoja
- No tiene ningún error

**Prueba de que los retos no se regalan:** ninguna acción calcula los resultados de los retos 1 y 3: solo la calculadora. La
báscula de un litro coloca en la recta el valor que el alumno calculó, no uno que la página sabe; si el alumno no la usa, la
recta queda vacía. Las etiquetas de unidad no dicen si están bien puestas: el reto 2 pide encontrar la contradicción entre
la etiqueta del 1.77, la ficha y la báscula, no leer una respuesta. `cifras.csv` es público y trae solo entradas; cualquier
reto numérico se puede calcular con él, igual que en Wald.

**Por qué el error plantado es el mismo error histórico:** el asistente recibe la hoja y repite su factor sin preguntar la
unidad. La lección del hábito `verificar` es que un visto bueno que rehace las mismas cuentas no verifica nada: verificar es
comprobar con algo que no salió de la misma hoja (la unidad, el rango, el manual).

### Prueba de no repetición con la intro

- La intro muestra el avión (material real), la varilla con 7,682 litros, el plan con 22,300 kilos y el expediente. El caso
  no vuelve a animar la varilla ni el avión en vuelo; trabaja con la hoja, las etiquetas, la báscula y el tanque.
- La intro no muestra el 1.77, la hoja de carga, el visto bueno del asistente, la alarma, el planeo ni Gimli.
- Ninguna línea de narración de `escenas.js` se repite en `caso-escenas.js` (el harness lo revisa).

### Registro en la base (mismo contrato que 1.1)

Mismas tablas y función que en `docs/CASO_EN_PAGINA.md`, sección 9, con `caso = "13.11"` y `version = "pagina-1.0"`. Ids de
retos: `reto_litros_total`, `reto_error_factor`, `reto_kilos_reales`. Preguntas abiertas: `hipotesis_razon`,
`verificacion`, `firma`, `mi_decision`. Controles: `repetir_cuenta` (en `cuentas`), `comprobacion` y `etiqueta` (en
`asistente`).

### Lo que pide al motor (`site/casos/caso.js`)

| Componente | Para qué | Accesible |
| --- | --- | --- |
| `etiquetas({numeros, unidades})` | Poner una unidad a cada número; queda en la libreta; no califica | Cada número es un grupo de botones de opción |
| `regla({min, max, marcas, valor})` | Recta con un rango sombreado y marcas de referencia (agua 1.0) donde cae el valor que calculó el alumno | Texto en el DOM: «Tu valor: x. Rango de la ficha: 0.775 a 0.840. Agua: 1.0» |
| `tanque(litros, max)` | Tanque en pixeles que se llena hasta una marca (decorativo) | `aria-hidden`; la cifra va en texto |

## 3. Intro corta de 3 escenas (propuesta)

Formato corto de `site/casos/README.md` (~40 s): el material real, el número que no cuadra y el expediente del costo. Sin
apuesta, sin opciones y sin nombrar herramientas. Narración propuesta (la aprueba el autor):

| # | Escena | Narración (líneas cortas) | Material real | Acción del alumno (sin nota) |
| --- | --- | --- | --- | --- |
| 1 | El avión nuevo | «Montreal, 23 de julio de 1983.» · «Un Boeing 767 casi nuevo va a volar a Edmonton, con escala en Ottawa.» | Foto del C-GAUN en servicio (`c-gaun-1985`, si se aprueba su licencia) o, sin foto, el avión en pixeles | Tocar el avión para ver su matrícula |
| 2 | El número que no cuadra | «En la cabina, los indicadores de combustible están en blanco.» · «Se mide a mano, con una varilla: 7,682 litros.» · «El plan de vuelo pide 22,300 kilos.» | — (escena dibujada: la varilla y el plan, cada cifra en su papel) | Tocar la varilla para leerla |
| 3 | El expediente del costo | «Alguien tiene que decidir cuánto cargar, y alguien tiene que firmar.» · «VUELO 143 · SIN RESOLVER» · Pregunta abierta de cierre: «¿Con qué comprobarías una cuenta que ya hizo otra persona?» | Encabezado del informe de la investigación, solo el título corto, como cita breve (`informe-lockwood-1985`); ver la prueba de spoiler | RESOLVER EL CASO |

Ficha final: «CASO ~30 min» y créditos de los medios. Títulos de «qué sigue» (E-08): «1 · Abres el expediente aquí mismo»,
«2 · Apuestas antes de revisar la hoja», «3 · Firmas qué revisarías antes de despegar».

**Prueba de spoiler de la intro:** no muestra el 1.77 ni la hoja; no dice libras, densidad, factor, conversión, unidad ni
rango; no cuenta que el avión se quedó sin combustible, ni el planeo, ni Gimli. La pregunta de cierre no es la apuesta del
caso («¿Cargarías el avión?»). Riesgos: (a) el título «El planeador de Gimli» adelanta que el avión planeó, o sea, que le faltó
combustible (ver dudas para el autor); (b) poner litros junto a kilos en la escena 2 siembra la duda de la unidad, que es la
intención, pero no dice cuál está mal.

**Medios candidatos (`site/casos/13-11/medios.json`, estado `candidato` hasta tener el archivo y confirmar la licencia):**

| id | tipo | Qué se muestra | Crédito | Licencia | Fuente | Prueba de spoiler |
| --- | --- | --- | --- | --- | --- | --- |
| `c-gaun-1985` | foto | El C-GAUN en Los Ángeles (LAX), 26 de enero de 1985, en servicio normal (después del accidente, ya reparado) | Ted Quackenbush | GFDL 1.2 según la copia de la página del archivo; **no está en la lista de licencias de `site/casos/README.md`**: decide el autor (o se busca otra) | `File:Boeing_767-233,_Air_Canada_AN0078557.jpg` en Wikimedia Commons; la página original no se pudo abrir desde esta sesión, solo una copia: https://wiki.riteme.site/wiki/File:Boeing_767-233,_Air_Canada_AN0078557.jpg | Muestra un 767 entero en tierra; no muestra el accidente ni Gimli. El pie no debe decir la fecha de 1985 sin explicar que voló de nuevo (adelanta que el avión sobrevivió): proponer pie «El C-GAUN, el avión del vuelo 143» |
| `gimli-glider-commons` | foto | Archivo `Gimli Glider.jpg` de la categoría «C-GAUN (aircraft)» de Commons; probablemente el avión ya en Gimli | Sin leer | Sin leer | https://commons.wikimedia.org/wiki/Category:C-GAUN_(aircraft) | **Falla la prueba para la intro** si muestra el avión en Gimli. Solo para la revelación |
| `informe-lockwood-1985` | documento | Solo el encabezado del informe final de la junta de investigación (abril de 1985) | G. H. Lockwood, Gobierno de Canadá | Cita breve (derechos de la Corona); copia del FAA | https://www.faa.gov/sites/faa.gov/files/2024-12/AirCanada143_C-GAUN.pdf | El título completo menciona el aterrizaje de emergencia en Gimli: en la intro se recorta a «Final Report of the Board of Inquiry · Air Canada Boeing 767 C-GAUN»; completo, solo en la revelación |

`pendiente` del `medios.json`: abrir las páginas de archivo en Commons, confirmar autor y licencia, y decidir la GFDL; si no
hay foto libre del C-GAUN, la escena 1 va con el avión en pixeles y el documento recortado.

## 4. Decisiones del autor

1. **Título visible:** «El planeador de Gimli» adelanta el desenlace. Propuesta: en la intro y en el caso, «Vuelo 143» o
   «¿Cuánto combustible lleva el avión?»; «El planeador de Gimli» aparece en la revelación y en el catálogo.
2. **Foto del avión:** ¿se acepta GFDL 1.2 para `c-gaun-1985` o se va sin foto?
3. **Quién firma:** la lista de la firma incluye «el asistente» como distractor. ¿Se deja?
4. **Textos visibles** del caso, de la ficha y de «qué sigue».
5. **Ficha:** pasa a `verified` cuando las cifras línea por línea se ubiquen en el informe (o en una segunda fuente primaria)
   y una sesión independiente las revise.
