# Caso 1.2 en la página · «2.4 millones de boletas»

**Estado:** propuesta de diseño del 4 nov 2026 (tablero r04, fase 1: reparto, guion y retos). Sigue el patrón de
`docs/CASO_EN_PAGINA.md` y el recorrido de 1.1 (sección 6) como modelo. Lo privado (claves de los retos, rúbricas, plan
docente y explicaciones) vive en `docs/casos-pagina/1-2-literary-digest-privado.md` de `agentic-ds-backen`. Nada aquí está
construido; los textos visibles los aprueba el autor.

- **Hábito:** `faltan` · **Nivel:** 1 · **Peldaño donde se resuelve:** 4, una comparación justa (otra encuesta, mucho más
  chica, frente al Digest) · **Duración:** ~42 min.
- **Datos reales** (`casos/data/literary-digest-1936/`, CC0 con fuente por fila; ficha `casos/staging/literary-digest-1936.json`).
  El único cálculo hipotético («¿qué haría falta entre los que no contestaron?») se marca como tal en pantalla.
- **Prerrequisitos:** 1.1 Wald (la pregunta «¿qué falta?»). No hace falta saber Python ni porcentajes más allá de dividir.
- **Objetivo observable:** ante un conteo enorme, el alumno distingue cuántas respuestas hay de quién respondió, encuentra
  un denominador equivocado y firma qué le diría al editor, con su certeza y lo que no sabe.
- **Supuesto:** el motor de `site/casos/caso.js` (E-10) sirve sin componentes nuevos salvo el control deslizante del
  laboratorio (sección 9).

## Lo que ve el alumno

- **La decisión:** a finales de octubre de 1936, el editor de The Literary Digest tiene que decidir qué publicar sobre la
  elección presidencial (Roosevelt contra Landon).
- **Los datos:** el conteo final de la revista, la bitácora del correo, un resumen del asistente y, más adelante, otra
  encuesta.
- **La pregunta detonadora:** ¿le crees a 2.4 millones de boletas?

## Recorrido sección por sección

Avance manual (SEGUIR), persiana de pixeles entre secciones, franja «NIVEL n/10». Un reto se puede dejar con «Lo intento
después». La revelación es la única puerta cerrada.

| # | Sección (id) | Min | Qué pasa en pantalla | Qué hace el alumno | Qué se registra |
| --- | --- | ---: | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | 2 | El expediente cae sobre una mesa de redacción y reparte cuatro piezas: el conteo final, la bitácora del correo, el resumen del asistente (cerrado, BORRADOR) y un sobre sellado «OTRA ENCUESTA» que no se abre todavía. Aviso: **datos reales**, publicados en 1936, con fuentes al final; un cálculo será hipotético y se marca | Abrir el expediente | Sección |
| 2 | TU APUESTA (`apuesta`) | 3 | Una sola postal grande en la mesa (no la montaña de sacos de la intro) con la pregunta del caso: «¿Le crees a 2.4 millones de boletas?» | Elegir: «Sí, con tantas boletas no se equivoca» · «Sí, pero con dudas» · «Poco» · «No». Escribir su razón; sello «APUESTA ANOTADA» | Hipótesis (opción) y su razón (`hipotesis_razon`) |
| 3 | EL CONTEO (`conteo`) | 8 | **Mirar:** tabla del conteo final (Landon 1,293,669 · Roosevelt 972,897 · otros 109,957 por diferencia · total 2,376,523) y barras. Barra de 531 votos electorales con el pronóstico de la revista (370 a 161). Después cae el **resumen del asistente** con sello BORRADOR: «Revisé las 2,376,523 boletas. Tasa de respuesta: 100% (2,376,523 de 2,376,523). Landon gana 57 a 43 entre los dos grandes. Con una respuesta tan completa, recomiendo publicar sin advertencias». Se avisa que **puede tener un error**, nunca dónde. Mesa de verificación: leer la bitácora del correo, contar las boletas del conteo, revisar el 57% de Landon, buscar cómo le fue a la encuesta en 1932 | Botón por candidato «Sacar su parte» (divide entre el total devuelto; las barras pasan a porcentaje). Elegir qué comprobar en la mesa; cada resultado cae en su libreta. **Reto 1** (★★, error plantado) y **Reto 2** (★, número) con la calculadora | Sección, cada «sacar su parte» y cada comprobación (control), intentos de los dos retos |
| 4 | LOS QUE NO CONTESTARON (`silencio`) | 7 | Contador de boletas que salieron y no regresaron. Tarjeta real «DE DONDE SALIERON LOS NOMBRES»: directorios telefónicos y registros de automóviles (la mayor parte), listas de clubes y asociaciones, padrones de votantes, registros de ocupaciones y directorios de ciudades; la revista decía que también llegaba a los que tenían menos. Botón «¿Y si los que callaron pensaran distinto?»: dos columnas, las que regresaron (con su reparto) y las que no (con un signo de interrogación) | Marcar a quién cree que le cuesta más aparecer en esa lista o devolver la boleta (no se califica). **Reto 3** (★★★, número, cálculo hipotético marcado) con la calculadora. Después del intento aparece la tarjeta que nombra lo que usó (ver «La herramienta») y el enlace al laboratorio de alfabetización | Sección, lo marcado (control) y el intento. La herramienta se nombra después del reto |
| 5 | LA OTRA ENCUESTA (`comparacion`) | 6 | Se abre el sobre: la última encuesta de Gallup (American Institute of Public Opinion), cerrada el 1 de noviembre: Roosevelt 53.8%, Landon 42.8%, el resto sin decidir u otros. Muestra de «entre unas 50 mil y 125 mil personas (las fuentes no coinciden)», elegida para parecerse a los votantes en lugar de mandar boletas a una lista. Al lado, el Digest con su 57% para Landon. Dos herramientas más en la mesa: «La pregunta de 1932» (la boleta preguntaba por quién votaste en 1932; entre quienes respondieron, los que dijeron Hoover estaban de más en 43 de 48 estados; Roosevelt ganó 1932 con 57.4%) y «El historial» (acertó desde 1924; en 1932 respondió el 15%) | Poner las dos encuestas en la misma escala con la calculadora. **Reto 4** (★★, número). Usar o no las herramientas de 1932 | Sección, cada comprobación (control) y el intento |
| 6 | VERIFICA (`verificacion`) | 3 | La libreta con lo que el alumno sí hizo en las secciones 3 a 5 | Escribir qué revisó y qué encontró, en dos renglones | Respuesta `verificacion` |
| 7 | FIRMA TU DECISION (`firma`) | 4 | «Es 31 de octubre de 1936. El editor te pregunta qué hacer con su pronóstico.» Cuatro opciones de decisión, un campo «Qué le dirías al editor» (una frase), certeza, lo que no sé, qué me haría cambiar, ¿necesitas algo más que contar y comparar? | Firmar. Sin opción ni frase no se firma. Sello «DECISION FIRMADA · la firma es tuya, no del asistente» | Respuesta `firma` |
| 8 | LA REVELACION (`revelacion`) | 3 | Bloqueada hasta que la firma quedó guardada o en la cola. 3 de noviembre: el resultado (60.8% para Roosevelt, 523 votos electorales contra 8; Landon gana solo Maine y Vermont). La encuesta de mayo de 1937: entre quienes dijeron haber recibido la boleta, los que la devolvieron contra los que no, en barras. Expediente «THE LITERARY DIGEST · VERIFICADO» con lo documentado, la discusión moderna y lo que no se sabe. Su apuesta y su firma, lado a lado | Mirar y comparar | Sección |
| 9 | LABORATORIO (`laboratorio`) | 3 | «La máquina de encuestas»: una lista de votantes en pixeles (1,000 cuadros) con tres controles: qué parte de la lista prefiere a Roosevelt, cuántos de cada 100 partidarios de cada candidato devuelven la boleta, y cuántas boletas se mandan (1, 10 o 20 millones). Marcador: lo que dice el conteo frente a lo que piensa la lista | Probar combinaciones; ver que mandar más boletas no mueve el conteo si cambian igual los que contestan. Parámetros ilustrativos, con un preajuste basado en lo que estima Lusinchi (2012) | Sección y combinaciones probadas (control, con pausa de 10 s) |
| 10 | TU PROPIA DECISION (`cierre`) | 3 | La tabla «la misma idea en la taquería» y el campo de Mi decisión | Escribir qué es una fila en los datos de su decisión y quién no aparece; al guardar, completo y sello «CASO 1.2 RESUELTO» | Respuesta `mi_decision` y completo |

### Retos (las opciones están en la página; la clave, solo en la base)

| Reto | Sección | Tipo | Pregunta | Opciones o formato | Pista visible |
| --- | --- | --- | --- | --- | --- |
| `reto_error_tasa_respuesta` (★★) | `conteo` | opción | Compara el resumen con la bitácora y con el conteo. ¿Dónde está el error? | «La tasa de respuesta usa las boletas devueltas como denominador» · «El 57% de Landon no sale de las cifras del conteo» · «El total de boletas no coincide con la suma de Landon y Roosevelt» · «No tiene ningún error» | Una tasa de respuesta compara las que regresaron con las que salieron. Mira la bitácora. |
| `reto_tasa_real` (★) | `conteo` | número | ¿Cuál es la tasa de respuesta, en porcentaje? | Un número con un decimal | Boletas que regresaron entre boletas que salieron, por 100. |
| `reto_silencio` (★★★) | `silencio` | número | Supón que toda la lista vota y que solo cuentan Landon y Roosevelt. ¿Qué porcentaje de los que no contestaron tendría que preferir a Roosevelt para que él tuviera la mitad de toda la lista? | Un número con un decimal | La mitad de la lista son 5 millones. Réstale lo que Roosevelt ya tiene en el conteo y divide lo que falta entre los que no contestaron. |
| `reto_gallup_dos` (★★) | `comparacion` | número | El 57% del Digest cuenta solo a los dos grandes. ¿Qué porcentaje le da Gallup a Roosevelt si cuentas igual, solo a los dos grandes? | Un número con un decimal | Divide lo de Roosevelt entre lo de Roosevelt más lo de Landon. |

Preguntas abiertas con los mismos nombres que 1.1: `hipotesis_razon`, `verificacion`, `firma`, `mi_decision`.

**Prueba de que ningún reto se regala:** el botón «Sacar su parte» divide entre el total devuelto, no entre las enviadas, y
no da el 57%; la tasa de respuesta, lo que haría falta entre los que callaron y la escala de Gallup solo salen de la
calculadora. La bitácora dice «unos diez millones» solo si el alumno la lee.

### La herramienta (se usa en `silencio` y se nombra después del reto 3)

Tarjeta «LO QUE ACABAS DE USAR TIENE NOMBRE»: la **población** son los votantes; la lista de la que salen los nombres es el
**marco muestral**; quienes reciben la boleta son la **muestra**; los que no la devuelven son la **no respuesta**, y cuando
piensan distinto de los que sí contestan hay **sesgo de no respuesta**. Más boletas no corrigen quién llega a tu tabla.

Palabras que no aparecen antes de esa tarjeta (ni en la intro, ni en los títulos de secciones anteriores): marco muestral,
no respuesta, sesgo de no respuesta, sesgo de selección, muestra representativa, población objetivo. La palabra
«muestra» como verbo sí puede aparecer; como sustantivo técnico, no antes de `silencio`.

Biblioteca desde `silencio`: Laboratorio de alfabetización de datos (`labs/level-1/alfabetizacion.html`), opcional y fuera de
la calificación.

### La firma

Opciones de decisión (ninguna es «la buena»; se califica el razonamiento):

- Publicar «gana Landon» como viene.
- Publicar «gana Landon» con una advertencia sobre quién respondió.
- No publicar un ganador: la encuesta no alcanza para decirlo.
- Publicar que la elección puede ganarla Roosevelt.

Formato del texto que se guarda (como en 1.1): «Le digo al editor: <opción>. En una frase: … Certeza: … Lo que no sé: … Me
haría cambiar: … ¿Algo más que contar y comparar?: …».

### La revelación (qué muestra)

- El resultado de 1936 (National Archives; The American Presidency Project).
- La encuesta de Gallup de mayo de 1937, que preguntó a la gente si le había llegado la boleta del Digest y si la devolvió:
  764 dijeron que sí la recibieron; quienes la devolvieron se inclinaban por Landon y quienes no, por Roosevelt (Lusinchi
  2012, tabla 2).
- La discusión moderna, sin cerrarla: Squire (1988) concluye que la muestra y la respuesta estaban sesgadas y que, si todos
  hubieran contestado, el Digest al menos habría dado el ganador correcto; Lusinchi (2012) encuentra que la mayoría de los
  dueños de teléfono o coche votó por Roosevelt y que la no respuesta pesó más; Lohr y Brick (2017) muestran que con la
  pregunta de 1932 de la propia boleta se podía corregir el ganador, aunque no el margen.
- Gallup acertó al ganador pero también se quedó corto con Roosevelt.
- La revista dejó de publicarse en 1938.
- **Lo que no sabemos:** cuánto pesó cada filtro (lista o respuesta), el tamaño exacto de la muestra de Gallup, el reparto
  por estado del conteo (no se tiene un escaneo verificable).
- **Mitos que no se cuentan como hechos:** «solo preguntó a ricos con teléfono», «usó su lista de suscriptores», «Gallup
  acertó el resultado», «con más boletas habría acertado».

### La taquería y Mi decisión

| En la taquería | En 1936 |
| --- | --- |
| Don Juan pregunta qué tal la salsa nueva solo a quienes dejan propina | El Digest solo contó las boletas que regresaron |
| Quien se fue sin dejar propina no opina, y quizá se fue por la salsa | La mayoría de las boletas no regresó |
| Preguntar a uno de cada diez clientes en la caja, deje propina o no | Elegir a quién preguntar para parecerse a todos los votantes |

**Mi decisión (pieza 3):** «¿Qué es una fila en los datos de tu decisión? ¿Quién no aparece?»

**El criterio en una frase:** ¿Qué falta en mis datos? Antes de contar respuestas, pregunta quién no pudo responder.

Siguiente caso al cerrar: intro de 13.11 Gimli.

### Prueba de no repetición con la intro

- La intro muestra los sacos de correo, las dos torres de postales y el titular del conteo. El caso usa una sola postal para
  apostar, tablas y barras para el conteo, y otra escena (la encuesta de 1937) para la revelación.
- La intro **no** dice cuántas boletas salieron, ni la tasa de respuesta, ni de dónde salieron los nombres, ni nombra a
  Gallup, ni el resultado: todo eso aparece en el caso, en su sección.
- La intro termina con una pregunta distinta de la apuesta del caso. El caso no repite ninguna línea de narración.

## Intro propuesta · formato completo (5 escenas, ~1 min)

Gancho público sin apuesta, sin opciones y sin herramientas. Paleta `--tq-*`. Textos para aprobación del autor.

| # | Escena | Plano y gesto | Narración (líneas cortas) | Sorpresa o acción |
| --- | --- | --- | --- | --- |
| 1 | Lugar | Nueva York, otoño de 1936: paneo sobre la ciudad hasta la puerta de una revista; carteros entran con sacos | «Nueva York, otoño de 1936.» · «Cada mañana llegan más sacos de correo a una revista.» · «Adentro vienen postales con una sola pregunta: ¿por quién vas a votar?» | Los sacos se apilan hasta tapar la ventana |
| 2 | Personas | La redacción: mesas largas, gente abriendo sobres; al fondo dos carteles genéricos de campaña | «Se elige presidente: Franklin D. Roosevelt, que busca reelegirse, contra Alf Landon, gobernador de Kansas.» · «La revista hace esta encuesta desde hace años, y en las últimas elecciones acertó.» | Foto real del jefe de campaña de Landon (candidata B) clavada en la pared |
| 3 | Cifras | Las postales forman dos torres; contador que sube | «El conteo final: 2,376,523 boletas.» · «Landon, 1,293,669. Roosevelt, 972,897.» · «Una cifra enorme para cualquier encuesta.» | El titular real del 31 de octubre (candidata A) cae sobre la mesa |
| 4 | Interacción | Primer plano de los sacos | «Toca un saco para ver qué trae.» | Cada saco suelta postales en la proporción del conteo (de cada 100, unas 54 para Landon, 41 para Roosevelt, 5 otros); no se califica |
| 5 | Expediente | Carpeta con sello «SIN RESOLVER» | «El 31 de octubre la revista publica su pronóstico: gana Landon.» · «Faltan unos días para la elección.» · «¿Qué harías tú con este expediente?» | Títulos de qué sigue: «1 · Abres el expediente aquí mismo» · «2 · Apuestas antes de ver los datos» · «3 · Firmas tu decisión antes de saber qué pasó». Botón RESOLVER EL CASO. La ficha dice «CASO ~40 min» y oculta las herramientas (`herramientasOcultas`) |

**Prueba de spoiler de la intro:** quien solo vea la intro sabe que la revista contó 2.4 millones de boletas y pronosticó
a Landon. No sabe cuántas salieron, cuántas no regresaron, de dónde salieron los nombres, que hubo otra encuesta ni quién
ganó. La pregunta final no apunta a «quién respondió».

### Material real candidato (`site/casos/1-2/medios.json`)

| id | Pieza | Autor y archivo | Licencia | Estado y pendiente | Prueba de spoiler |
| --- | --- | --- | --- | --- | --- |
| `titular` (recorte, escena 3) | Titular «Landon, 1,293,669; Roosevelt, 972,897», The Literary Digest, 31 oct 1936, vol. 122, p. 5. Texto transcrito en History Matters: https://historymatters.gmu.edu/d/5168 | The Literary Digest (Funk & Wagnalls) | Probable **dominio público en EE. UU.**: The Online Books Page no encontró renovaciones de los números de la revista (https://onlinebooks.library.upenn.edu/webbin/cinfo/literarydigest). Si no se confirma, **cita breve** del titular | `candidato`. Falta un escaneo de la página (HathiTrust, Internet Archive o una biblioteca), confirmar que el artículo no es una contribución renovada y recortar **solo el titular**: el subtítulo dice cuántas boletas salieron | Muestra el pronóstico, que es el gancho. Recortado, no dice cuántas boletas salieron, ni quién respondió, ni el resultado |
| `campana` (foto, escena 2) | «"It's a spending race," Washington, D.C. September 10», 1936: John Hamilton, jefe de campaña de Landon, en el National Press Club, convencido de que Landon va a ganar | Harris & Ewing, Library of Congress (Prints and Photographs, LCCN 2016878441). En Commons: `File:"It's a spending race," Washington, D.C. September 10. In a speech before the National Press Club John Hamilton, Landon's campaign manager, declared his conviction that Landon is going to LCCN2016878441.jpg` | Dominio público: «No known restrictions on publication» (LOC); publicada en EE. UU. sin aviso de derechos | `candidato`. Confirmar la ficha en https://www.loc.gov/item/2016878441/ (URL deducida del LCCN), bajar a 1200 px y ≤ 350 KB como `medios/campana.webp` | Muestra la confianza de una campaña, no el resultado ni el mecanismo. Sin fotos de los candidatos celebrando o derrotados |

## Fuentes

- Lusinchi, D. (2012). *Social Science History* 36(1): 23–54. https://doi.org/10.1017/S014555320001035X
- Lohr, S. L. y Brick, J. M. (2017). *Statistics, Politics and Policy* 8(1): 65–84. https://doi.org/10.1515/spp-2016-0006
- Squire, P. (1988). «Why the 1936 Literary Digest Poll Failed». *Public Opinion Quarterly* 52(1): 125–133.
  https://doi.org/10.1086/269085
- History Matters (GMU), «Landon, 1,293,669; Roosevelt, 972,897». https://historymatters.gmu.edu/d/5168
- National Archives, «1936 Electoral College Results». https://www.archives.gov/electoral-college/1936
- The American Presidency Project, «1936». https://www.presidency.ucsb.edu/statistics/elections/1936
- Salganik, M. J., *Bit by Bit*, 3.3.1. https://www.bitbybitbook.com/en/1st-ed/asking-questions/total-survey-error/representation/

## Decisiones del autor

1. **Gallup en el caso:** se muestra con «entre 50 mil y 125 mil» porque las fuentes no coinciden. ¿Se acepta el rango o se
   omite el tamaño y se dice solo «decenas de veces menos boletas»?
2. **La pregunta de 1932 antes de la firma:** es evidencia que el editor tenía en 1936 y fortalece la segunda verificación,
   pero acerca mucho la decisión. ¿Va en `comparacion` (propuesta) o en la revelación?
3. **Tabla por estado:** no hay una fuente verificable. ¿Se transcribe del escaneo original (dos personas, revisión cruzada)
   para una versión 1.1 del caso, o el caso se queda con cifras nacionales?
4. **Textos visibles** de la intro, del caso y de las opciones de la firma.
