# Caso 1.4 en la página · «Puerto Rico: 64 o 2,975» (huracán María, 2017)

**Estado:** propuesta de diseño del 4 nov 2026 para el autor. Sigue el patrón de `docs/CASO_EN_PAGINA.md` (modelo: 1.1,
sección 6) en formato corto. Lo privado (claves de los retos, rúbricas, cifras resueltas, plan docente y el bloque para
`casos/caso_1_4.py`) vive en `docs/casos-pagina/1-4-puerto-rico-privado.md` de `agentic-ds-backen`. Aquí no hay
respuestas ni rúbricas.

- **Ficha:** `casos/staging/puerto-rico-maria-2017.json` (estado `verified`; dudas declaradas en `uncertainties`).
- **Datos reales:** `casos/data/puerto-rico-maria-2017/defunciones_mensuales.csv`, defunciones por mes de ocurrencia de
  enero de 2015 a abril de 2018 del Registro Demográfico de Puerto Rico (tablas del 4 jun 2018; 2017 y 2018 preliminares).
  Procedencia, hash y licencia en su `README.md`. No hay datos simulados en el caso.
- **Hábito:** `mide` (¿qué mide realmente este número?). **Nivel:** 1. **Peldaño:** 4, comparación con lo esperado.
- **Tipo:** costo del error · formato corto: intro de 3 escenas (~40 s) y caso en la página (~25 min).
- **Prerrequisitos:** ninguno más allá de 1.1 (sumar, restar, promediar dos números con la calculadora 8 bits).
- **Objetivo observable:** ante una cifra oficial, el alumno dice qué tiene que pasar para que algo cuente en ella, la
  compara con lo que pasa en los mismos meses de años normales, encuentra una comparación mal hecha y firma qué cifra
  publicaría y cómo la explicaría.
- **Herramienta (se usa antes de nombrarse):** definir la variable y exceso sobre lo esperado (exceso de mortalidad). Se
  nombra al final de la sección `registro`, después del reto de octubre.
- **Supuestos:** el motor de `site/casos/caso.js` ya existe (E-10) con los componentes de la sección 7 de
  `docs/CASO_EN_PAGINA.md`; la página del caso vive en `site/casos/1-4/caso.html` + `caso-escenas.js`; los datos se copian
  al build igual que los de Wald.

### Indicadores (`docs/GUIA_CASOS.md`, propuesta)

| Pop | Did | Sus | Gan | Dat | Sol | Duración |
| ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | 5 | 3 | 4 | 5 | 4 | 25 min |

Prueba del caso de ingenio: (1) la respuesta obvia es confiar en el conteo oficial, que se armó caso por caso;
(2) el giro se descubre con la serie mensual, sin que nadie lo cuente; (3) la solución cabe en una frase («cuenta todas
las muertes y compáralas con los mismos meses de años normales») y cambia la cifra que se publica.

## 1. Cuidado con el tema (casos con víctimas)

- **Aviso de contenido** al entrar al caso, antes del expediente: «Este caso trata sobre muertes reales después del
  huracán María en Puerto Rico. Trabajamos con conteos, no con historias personales.» (texto visible: lo aprueba el autor).
- Las víctimas se mencionan con cifras verificadas y sin dramatizar. Sin nombres, fotos de personas, daños ni escenas de
  dolor. Las tarjetas de la sección `regla` describen **situaciones tipo**, no personas reales.
- Sin puntos ni monedas «por muertes»: los bits se ganan por leer bien un dato, nunca por una cifra mayor. Ninguna
  animación celebra un número de muertes; los contadores de defunciones no hacen sonido ni destello.
- Sin política: el caso no juzga a personas ni partidos. Lo documentado es una regla de conteo, sus límites y cómo se
  corrigió.
- Datos de personas: ninguno. El CSV tiene totales por mes.

## 2. Recorrido · «¿Cuántas muertes dejó María?»

Hábito `mide` · Nivel 1 · peldaño 4 · ~25 min · **datos reales** (se dice al abrir el expediente: «Estos son los registros
reales de defunciones de Puerto Rico. Las cifras de 2017 eran preliminares»). Ocho secciones.

| # | Sección (id) | Min | Qué pasa en pantalla | Qué hace el alumno | Qué se registra |
| --- | --- | ---: | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | 1 | Aviso de contenido. El expediente cae y saca tres piezas: la nota con la cifra oficial («64», diciembre de 2017), el registro de defunciones (cerrado con cinta) y una tabla del asistente con sello BORRADOR (cerrada) | Abrir el expediente | Sección |
| 2 | TU APUESTA (`apuesta`) | 3 | Solo la nota del 64 sobre la mesa; nada del registro todavía. Pregunta: «¿64 te parece una cifra razonable? ¿Por qué?» con cuatro opciones: Sí, parece razonable · Se queda corta · Se pasa · No sé con qué compararla | Elegir y escribir su razón; sello «APUESTA ANOTADA» | Hipótesis (opción) y su razón (`hipotesis_razon`) |
| 3 | LA REGLA DEL 64 (`regla`) | 3 | La regla con la que se contó, en una tarjeta de documento: la muerte cuenta si el certificado menciona el huracán y la confirma el Instituto de Ciencias Forenses. Cinco tarjetas de **situaciones tipo** (sin personas reales) para poner en «cuenta» o «no cuenta» según esa regla. Al terminar, la pregunta queda escrita en la mesa: «¿Y las que la regla no ve, dónde quedan?» | Clasificar las cinco tarjetas con la regla (no se califica; no hay respuesta única: se discute en clase) | Sección y cada clasificación (control) |
| 4 | EL REGISTRO (`registro`) | 6 | Se corta la cinta: barras de defunciones por mes, enero de 2015 a diciembre de 2017, con cifras en texto. **Fricción:** septiembre y octubre de 2017 sobresalen, pero los diciembres y eneros también suben cada año. Acción «Poner al lado el mismo mes de 2015 y 2016»: el alumno toca un mes de enero a agosto de 2017 y aparecen sus dos «gemelos» y su promedio; la diferencia se dibuja como barra arriba o abajo de cero. Septiembre a diciembre quedan sin calcular | **Reto 1** (★, opción): de enero a agosto de 2017, ¿cuánto se alejan los meses del promedio de su mismo mes? **Reto 2** (★★, número) con la calculadora 8 bits: ¿cuántas muertes de más hubo en octubre de 2017 frente al promedio de octubre de 2015 y 2016? Después del intento aparece la tarjeta que nombra lo que hicieron: **definir la variable** (qué tiene que pasar para que algo cuente) y **exceso de mortalidad** (lo observado menos lo esperado) | Sección, cada mes comparado (control `comparar_mes`) y los dos intentos |
| 5 | LA TABLA DEL ASISTENTE (`asistente`) | 5 | La tabla del asistente cae con sello BORRADOR junto al registro abierto. Aviso: «puede tener un error» (nunca dónde). Mesa de verificación con tres herramientas: buscar un mes en el registro, poner dos meses lado a lado, sumar una columna. Al final, la libreta con lo que el alumno comprobó | **Reto 3** (★★, opción, error plantado): ¿dónde está el error de la tabla? Después, escribir en dos renglones qué revisó y qué encontró | Sección, cada comprobación (control `comprobacion`), el intento y la respuesta `verificacion` |
| 6 | FIRMA TU CIFRA (`firma`) | 3 | La nota del 64 otra vez, ahora con un espacio en blanco al lado. Campos: la cifra o el rango que publicarías y de qué periodo; qué cuenta en esa cifra (lista: solo certificados que mencionan el huracán · todas las muertes de más frente a lo esperado · otra, ¿cuál?); cómo la explicarías al público en una frase; certeza; qué no sé; qué me haría cambiar; ¿necesito algo más que contar y comparar? | Firmar. Sin cifra y sin frase para el público no se firma. Sello «CIFRA FIRMADA · la firma es tuya, no del asistente» | Respuesta `firma` (texto con el mismo formato que 1.1, más la cifra y qué cuenta) |
| 7 | LA REVELACION (`revelacion`) | 2 | Bloqueada hasta que la firma quedó guardada o en la cola. Línea de tiempo con cada cifra, su fuente y **qué contaba**: 64 (regla del certificado) · ~1,052 de NYT (mismos días de 2015 y 2016, sep–oct) · 4,645 de Harvard con su intervalo 793 a 8,498 (encuesta de hogares) · 1,427 del informe al Congreso (sep–dic contra cuatro años) · 2,975 de GWU con su intervalo 2,658 a 3,290 (sep–feb, con población ajustada), adoptada como oficial el 28 ago 2018. Expediente «PUERTO RICO · VERIFICADO» con lo documentado y lo que no. Su apuesta y su firma, lado a lado | Mirar y comparar su cifra con las de la línea de tiempo | Sección |
| 8 | TU PROPIA DECISION (`cierre`) | 2 | «La misma idea en la taquería»: Don Juan pregunta cuántos pedidos se cancelaron; dos empleados dan cifras distintas porque uno cuenta los que no se pagaron y otro los que no se entregaron. Campo de Mi decisión | Escribir cómo está definido el número más importante de su decisión y qué tiene que pasar para que algo cuente en él; al guardar, sello «CASO 1.4 RESUELTO», el criterio en una frase y los bits del caso | Respuesta `mi_decision` y completo |

Total: 25 min. Avanzar es manual (SEGUIR); un reto se puede dejar con «Lo intento después» (no da bits hasta que se
responde). La revelación es la única puerta cerrada. Al terminar: **Mi avance** y **Siguiente caso** (la próxima clase).

**Criterio en una frase** (de `docs/MODULO_1_DISENO.md`): «¿Qué mide este número? Antes de comparar cifras, pregunta qué
tiene que pasar para que algo cuente.»

**Biblioteca:** desde `registro`, «Para practicar lo que acabas de usar»: `labs/level-1/alfabetizacion.html` (opcional,
no cuenta).

### Detalle de piezas (lo que la página muestra; sin claves)

**Tarjetas de la sección `regla`** (situaciones tipo, redactadas sin personas reales ni detalles de sufrimiento; textos
finales los aprueba el autor):

1. Una muerte por lesiones durante el paso del huracán, revisada por Ciencias Forenses.
2. Una muerte semanas después en una casa sin electricidad, de alguien que dependía de un equipo eléctrico; el
   certificado no menciona el huracán.
3. Una muerte en un hospital que funcionaba con planta de emergencia; el médico anotó solo la causa clínica.
4. Una muerte por una enfermedad crónica en un municipio sin agua potable desde hacía un mes.
5. Una muerte que habría ocurrido igual sin huracán.

Propósito: que el alumno vea que la regla decide qué entra y que hay muertes que ningún certificado conecta con el
huracán, sin decirle todavía cómo contarlas. La tarjeta 5 abre la pregunta que el exceso responde: ninguna regla caso por
caso sabe cuáles «habrían ocurrido igual»; la comparación con lo esperado sí lo estima en conjunto.

**Tabla del asistente** (sección `asistente`, tal como aparece en pantalla, con sello BORRADOR):

> «Exceso de muertes, septiembre a diciembre de 2017, comparado con el mismo mes de 2016»
>
> | Mes de 2017 | Muertes 2017 | Mismo mes de 2016 | Diferencia |
> | --- | ---: | ---: | ---: |
> | Septiembre | 2,928 | 2,367 | 561 |
> | Octubre | 3,040 | 2,854 | 186 |
> | Noviembre | 2,671 | 2,484 | 187 |
> | Diciembre | 2,820 | 2,854 | −34 |
> | **Total** | | | **900** |
>
> «Conclusión: hubo unas 900 muertes de más; octubre fue un mes casi normal.»

Opciones del reto 3 (la correcta no se marca aquí):

- En octubre compara con diciembre de 2016, no con octubre de 2016
- Suma mal el total de septiembre a diciembre
- En noviembre usa noviembre de 2015 en lugar de 2016
- No tiene ningún error

**Opciones del reto 1:** Ninguno se aleja más de 200, arriba o abajo · Todos están más de 300 por encima · Varios se alejan
más de 500 · Son idénticos a su promedio.

**Prueba de que los retos no se regalan:** la acción «Poner al lado el mismo mes» solo existe para enero a agosto de 2017;
octubre no tiene botón y se calcula con la calculadora (regla 4 del patrón). En la tabla del asistente, la mesa muestra el
dato de un mes del registro solo si el alumno lo busca; el reto pide encontrar la contradicción, no leer una cifra.

### Prueba de no repetición con la intro

- La intro muestra la isla de noche (material de NASA), la cifra 64 y el expediente. El caso no vuelve a mostrar la imagen
  de las luces ni anima un contador hasta 64: la nota del 64 es estática.
- La intro no muestra el registro de defunciones, ni ninguna cifra mensual, ni la regla del certificado, ni 2,975 como
  respuesta. Todo eso aparece en el caso, en su sección.
- Ninguna línea de narración de `escenas.js` se repite en `caso-escenas.js` (el harness lo revisa).

### Registro en la base (mismo contrato que 1.1)

Mismas tablas y función que en `docs/CASO_EN_PAGINA.md`, sección 9, con `caso = "1.4"` y `version = "pagina-1.0"`. Ids de
retos: `reto_meses_normales`, `reto_octubre_exceso`, `reto_error_linea_base`. Preguntas abiertas: `hipotesis_razon`,
`verificacion`, `firma`, `mi_decision`. Controles: `clasificar` (en `regla`), `comparar_mes` (en `registro`),
`comprobacion` (en `asistente`).

## 3. Intro corta de 3 escenas (propuesta)

Formato corto de `site/casos/README.md` (~40 s): el material real, el número que no cuadra y el expediente del costo. Sin
apuesta, sin opciones y sin nombrar herramientas. Narración propuesta (la aprueba el autor):

| # | Escena | Narración (líneas cortas) | Material real | Acción del alumno (sin nota) |
| --- | --- | --- | --- | --- |
| 1 | La isla a oscuras | «20 de septiembre de 2017. El huracán María cruza Puerto Rico.» · «Una semana después, así se ve la isla de noche.» | Imagen nocturna antes y después (NASA, `luces-pr-2017`) | Deslizar entre «antes» y «después» |
| 2 | El número que no cuadra | «En diciembre, la cifra oficial de muertes es 64.» · «El 18 de diciembre, el gobernador ordena revisar todas las muertes desde el huracán.» | Titular, cita breve (`titular-revision-2017`) | Tocar la carpeta para ver la fecha del titular |
| 3 | El expediente del costo | «Un número oficial. Un registro de defunciones. Nadie sabe todavía cuál dice la verdad.» · Pregunta abierta de cierre: «¿Qué tendrías que revisar antes de creerle a una cifra oficial?» | Encabezado del documento del Registro Demográfico, sin cifras (`registro-demografico-2018`) | RESOLVER EL CASO |

Ficha final: «CASO ~25 min», aviso de contenido y créditos de los medios. Títulos de «qué sigue» (E-08): «1 · Abres el
expediente aquí mismo», «2 · Apuestas antes de ver el registro», «3 · Firmas tu cifra antes de saber qué pasó».

**Prueba de spoiler de la intro:** no dice cómo se contó el 64, no muestra el registro mensual, no dice «exceso», «lo
esperado», «línea base» ni «definir la variable», y no da 2,975 como respuesta. La pregunta de cierre es distinta de la
apuesta del caso. Riesgo: el título «64 o 2,975» sí adelanta la cifra final (ver dudas para el autor).

**Medios candidatos (`site/casos/1-4/medios.json`, estado `candidato` hasta tener el archivo):**

| id | tipo | Qué se muestra | Crédito | Licencia | Fuente | Prueba de spoiler |
| --- | --- | --- | --- | --- | --- | --- |
| `luces-pr-2017` | foto (satélite) | Luces nocturnas de Puerto Rico en una noche típica antes de María y el 27–28 sep 2017 (Suomi NPP, VIIRS, banda día-noche) | NASA Earth Observatory, imágenes de Joshua Stevens con datos de Miguel Román (NASA GSFC) y Andrew Molthan (NASA MSFC) | Dominio público (NASA; reutilización libre, crédito obligatorio «NASA»: <https://earthobservatory.nasa.gov/image-use-policy>) | <https://science.nasa.gov/earth/earth-observatory/pinpointing-where-lights-went-out-in-puerto-rico-91044> | Es un lugar, sin personas ni daños; muestra que la isla quedó a oscuras, no cómo se cuentan las muertes |
| `titular-revision-2017` | recorte | Solo el titular de NBC News, dic 2017: «Puerto Rico governor orders review of death count after Hurricane Maria» | NBC News | Cita breve (nota: solo el titular, para fechar la revisión del 64) | <https://www.nbcnews.com/storyline/puerto-rico-crisis/puerto-rico-governor-orders-review-death-count-after-hurricane-maria-n830761> | No da otra cifra ni método; el cuerpo de la nota (que menciona «análisis estadístico» y ~1,000 muertes) no se muestra |
| `registro-demografico-2018` | documento | Solo el encabezado «Departamento de Salud - Registro Demográfico - División de Calidad y Estadísticas Vitales» y el título «Defunciones Ocurridas en Septiembre por Día y Año», recortados sin la tabla ni la gráfica | Registro Demográfico, Departamento de Salud de Puerto Rico (4 jun 2018), copia en c2-d2/pr_mort_official | CC BY 3.0 US (redistribución del repositorio de Harvard); documento público del Gobierno de Puerto Rico | <https://github.com/c2-d2/pr_mort_official/blob/master/data/RD-Mortality-Report_2015-18-180531.pdf> | Sin cifras visibles: dice que existe un registro, no qué muestra |

Alternativa para la escena 1, si el autor prefiere el huracán mismo: imagen del satélite GOES-16 (NOAA) del 20 sep 2017 en
la entrada a tierra. Falta confirmar la página de origen y su licencia en NOAA o Wikimedia Commons antes de usarla.

Material descartado: fotos de daños con personas, de hospitales o de funerales; titulares con 1,052, 4,645 o 2,975 en la
intro (adelantan la revelación); la cita del gobernador sobre «análisis estadístico» (adelanta la herramienta; puede ir en
la revelación).

## 4. Dudas para el autor

1. **Título visible.** «64 o 2,975» adelanta la cifra final: el alumno puede firmar 2,975 sin calcular. ¿Se muestra al
   alumno como «Puerto Rico: ¿64?» o «¿Cuántas muertes dejó María?» y se deja «64 o 2,975» para el temario docente?
2. **La cifra simple no da 2,975.** La cuenta del caso (mismo mes, promedio de 2015 y 2016, sin ajustar población) da una
   cifra que no coincide con ningún estudio. ¿Te parece bien que la revelación lo use como lección («cada cifra depende de
   la comparación») o prefieres limitar el caso a octubre y dejar el total para la discusión?
3. **Tarjetas de situaciones tipo (sección `regla`).** ¿Te parecen dentro de «sin morbo»? Alternativa más sobria: una sola
   pregunta abierta sobre la regla, sin tarjetas.
4. **Licencia de los datos:** se usan los conteos del Registro Demográfico vía el repositorio de Harvard (CC BY 3.0 US).
   ¿Basta ese crédito o prefieres pedir los datos finales al Instituto de Estadísticas de Puerto Rico?

## 5. Construcción y revisión

1. **Backend:** `casos/caso_1_4.py` con `DONDE = "pagina"` a partir del bloque de la parte privada; SQL generado.
2. **Sitio:** `site/casos/1-4/` (intro `index.html` + `escenas.js` + `medios.json`; caso `caso.html` + `caso-escenas.js`),
   datos copiados al build, `INTROS` y `EN_PAGINA` en `site/alumno.js`, `site/tiempos.json` con `min: 25`.
3. **Revisión independiente:** cifras contra el CSV y la ficha, prueba de spoiler y de no repetición, ninguna clave en el
   repo, aviso de contenido presente, accesibilidad y una pasada completa como alumno de prueba.
