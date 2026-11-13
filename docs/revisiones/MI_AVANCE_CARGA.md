# Mi avance: qué carga y cómo aligerarlo

**Fecha:** 13 de noviembre de 2026 · **Encargo:** E-09, fase 1 (tablero u05) · **Estado:** propuesta para decisión del autor.
No se editó ninguna página. Los textos visibles que aparecen aquí como propuesta los decide el autor.

## Resumen

- Un alumno nuevo recorre hoy **10.2 pantallas** de celular en Mi avance; a media generación, **13.2**. Más de la mitad
  son las tarjetas de caso (0.6 a 1.1 pantallas cada una).
- La primera pantalla no contesta «¿qué hago ahora?»: la ocupan el anillo de porcentaje, el saludo, tres etiquetas de
  identificación y tres datos. El botón para empezar el caso aparece en la segunda pantalla y la liga de Meet en la tercera.
- Un alumno nuevo ve 1.7 pantallas de cosas que todavía no puede usar: marcador en ceros, Top 5 vacío,
  alias, práctica cerrada, grabaciones vacías y filtros.
- **Recomendación:** la opción conservadora (sección 3, opción A) antes del 8 de enero, y decidir la radical después
  del piloto con datos de uso.
- Lo que E-09 pide «siempre» (intro antes que Colab y casos de la página sin botón de Colab) **ya está en el código**:
  `site/alumno.js:182-195` y `637-643`, con prueba en `harness/tests/test_caso_pagina.py:192-200`.

## Cómo se midió

- Copia de `site/` y `design/` en una carpeta temporal fuera del repo, Chrome sin interfaz con Playwright, ventana de
  **390 × 844 px**. Una «pantalla» en este documento son 844 px.
- La sesión se simuló igual que en `harness/tests/test_bits_ui.py`: `sesion.js` sustituido por un objeto `TDD` falso con
  **datos enteramente ficticios** y sin red. No se usó ninguna cuenta ni la base real.
- Dos alumnos ficticios: **nuevo** (8 casos publicados, 22 clases cargadas, ninguna dada, 0 bits, pago en 3 cuotas con
  código de recomendación) y **a media generación** (8 clases dadas con grabación, 3 casos entregados con comentarios del
  profesor, 1 en curso, 2 mensajes sin leer, 195 bits).
- Lo marcado **medido** sale de esa simulación. Lo marcado **estimado** se calculó a partir del marcado y el CSS.
- Límites: en un teléfono real la barra del navegador quita entre 80 y 150 px, así que las cifras reales en pantallas
  son algo mayores. El número de casos publicados, el catálogo de la Store y los textos que manda la base cambian las
  alturas; aquí se usaron 8 casos y 8 artículos ficticios.

## 1. Inventario

Estados: **SS** sin sesión · **SP** con sesión pero sin perfil (correo no inscrito) · **N** alumno nuevo · **M** a media
generación. Alturas en pantallas de 844 px; «med.» medido, «est.» estimado.

### 1.1 Marco de la página (todas las pestañas)

| Bloque | Qué es | Origen | Estados | Alto a 390 px |
| --- | --- | --- | --- | --- |
| Encabezado | Marca, campana de Mensajes con contador y botón del menú (con la etiqueta «Profile», en inglés). La navegación se oculta en celular | `alumno.html:360-402`, `area.css` (≤ 620 px) | Todos; campana y menú solo con sesión | 0.07 med. |
| Menú del perfil | Nombre, correo, etiquetas ID y Grupo, Mensajes, «Cómo conectar Colab (TDD_ID y TDD_CLAVE)», aviso de privacidad, términos, ayuda por correo y dos formas de cerrar sesión: 7 opciones | `alumno.html:380-400`, `alumno.js:52-71` | SP, N, M (al tocar) | 0.50 med. |
| Aviso general | Errores de sesión, de carga o «ese correo no está inscrito» | `alumno.html:405`, `alumno.js:78-82`, `574-578` | SP (es lo único que ve), errores | 0.22 med. en SP |
| Esqueleto de carga | Rectángulo animado mientras llegan los datos | `alumno.html:431` | Al entrar | 0.26 est. |
| Pestañas | Mi avance · Mi CV · Store (con etiqueta «Nuevo») · Clases grabadas | `alumno.html:433-438`, `alumno-cv.js:216-228` | N, M | 0.06 med. |
| Pie | Marca, tres enlaces y derechos | `alumno.html:701-709` | Todos | 0.18 med. |

La barra de pestañas mide 427 px de ancho dentro de 356 px disponibles (medido): **«Clases grabadas» queda cortada** y
hay que deslizar la barra para verla.

### 1.2 Sin sesión

| Bloque | Qué es | Origen | Alto |
| --- | --- | --- | --- |
| Entrada | Título, párrafo, botón «Entrar con Google», nota de privacidad, tres pasos y una tarjeta de caso de ejemplo | `alumno.html:407-429`, `alumno.js:86-92`, `716-721` | 1.28 med. (página completa 1.7) |

La tarjeta de ejemplo muestra el caso 4.1 con el botón «Continuar en Colab», mientras el paso 2 dice que los casos se
resuelven en el sitio y que Colab llega en la clase 5.

### 1.3 Pestaña Mi avance, en el orden en que aparece

| # | Bloque | Qué es | Origen | Estados | Alto a 390 px (med.) |
| --- | --- | --- | --- | --- | --- |
| 1 | Resumen | Anillo con el % de secciones, «Hola, nombre», etiquetas ID, Grupo y correo, y tres datos: casos entregados, próxima entrega, última actividad | `alumno.html:441-452`, `alumno.js:204-245` | N, M | 0.70 |
| 2 | Continuar misión | Caso que sigue, secciones hechas, siguiente sección y un botón (intro si no hay avance; página o Colab si lo hay) | `alumno.html:453-460`, `alumno.js:614-645`, `area.css` (`.resume`) | N, M | 0.26 N · 0.30 M |
| 3 | Práctica | Micro-casos: racha, bits de la semana y botón «Practicar» | `alumno.html:461-468`, `alumno.js:581-588` | N, M (si la base la ofrece) | 0.25 |
| 4 | Tira de mensajes nuevos | «Tienes N mensajes nuevos… Leer →» | `alumno.html:469`, `alumno.js:406-418` | M, solo con mensajes sin leer | 0.10 |
| 5 | Inscripción y pagos | Según el caso: cuotas al corriente y próximo cobro, cobro fallido con plazo, acceso en pausa, inscripción inactiva; debajo, el código de recomendación con su explicación | `alumno.html:470`, `alumno.js:651-679` | N, M (no aparece con alta manual, ni con pago de contado sin código) | 0.22 con cuotas y código; más con aviso de cobro (est.) |
| 6a | Próxima clase | Título, fecha y hora, cuenta regresiva en tres cajas, «Liga de Google Meet», «Agregar todas a mi calendario», nota y desplegable «Cómo se reparte la clase» | `alumno.html:472-483`, `alumno.js:282-322` | N, M (si el grupo tiene clases cargadas) | 0.56 |
| 6b | Grabaciones | Lista de todas las clases pasadas con «Ver grabación» y la nota de los 12 meses | `alumno.html:484-488`, `alumno.js:267-279` | N (vacía) · M | 0.23 N · 0.95 M con 8 clases; crece ≈ 0.09 por clase, hasta ≈ 2.2 con 22 (est.) |
| 7a | Marcador de bits | Bits, banda y lugar, cuánto falta para subir, escalera de cuatro bandas, barra de mezcla con leyenda de siete conceptos, dos comparaciones con el grupo y el desplegable «¿Cómo se ganan bits?» (cinco reglas y tres párrafos) | `alumno.html:491-517`, `alumno.js:468-519` | N (en ceros) · M | 0.59 N · 0.57 M |
| 7b | Top 5 y alias | Tabla de cinco lugares y formulario para cambiar el alias, con botón de ciudad al azar y nota | `alumno.html:518-530`, `alumno.js:474-480`, `522-537`; adornos en `alumno-store.js:67-78` | N (tabla vacía) · M | 0.39 N · 0.67 M |
| 8 | Encabezado de Casos | Título y una línea de explicación | `alumno.html:532-535` | N, M | 0.09 |
| 9 | Error de respuestas | Aviso con botón «Reintentar» | `alumno.html:536-539`, `alumno.js:342-344` | Solo si falla esa carga | 0.15 est. |
| 10 | Filtros de casos | Módulo, Estado, Orden, Buscar y conteo | `alumno.html:540-558`, `alumno.js:355-397` | N, M (con 2 casos o más) | 0.27 |
| 11 | Tarjetas de caso | Por caso: número y módulo, título, clase y fecha, estado, barra de secciones, «N de M secciones · tiempo», «Sigue: …», una etiqueta por sección, respuestas y comentarios del profesor, fecha de entrega, «Preguntar a mi profesor», «Ver la intro (1 min)» y el botón del caso | `alumno.html:559`, `alumno.js:143-202`; comentarios en `106-141` | N, M | 0.57 a 0.66 por caso sin comentarios; **1.08** con comentarios abiertos. Total con 8 casos: **5.3 N · 6.5 M** |
| 12 | Acceso para docentes | Tarjeta con el enlace al panel | `alumno.html:562-569`, `alumno.js:608` | Solo cuentas del equipo | 0.20 est. |
| 13 | Acceso a Colab | TDD_ID, TDD_CLAVE, «Copiar», «Generar mi TDD_CLAVE» y la advertencia de que se muestra una sola vez | `alumno.html:571-585`, `alumno.js:684-714` | Desde una semana antes de la clase 5 (o siempre si el grupo no tiene calendario): M | 0.50 |
| 14 | «¿No ves tu avance?» | Cuatro viñetas de diagnóstico (Gmail, Secretos de Colab, modo invitado, a quién escribir) | `alumno.html:587-595`, `alumno.js:579` | N, M | 0.56 |
| | **Total de la página** | | | | **10.2 N · 13.2 M** |

Dónde quedan las acciones principales (medido, distancia desde arriba):

| Acción | Alumno nuevo | A media generación |
| --- | --- | --- |
| Botón de «Continuar misión» | 940 px (pantalla 2) | 974 px (pantalla 2) |
| Liga de Google Meet | 1,779 px (pantalla 3) | 1,919 px (pantalla 3) |
| Primer botón dentro de una tarjeta de caso | 3,859 px (pantalla 5) | 4,824 px (pantalla 6) |
| «Generar mi TDD_CLAVE» | no aparece | 10,224 px (pantalla 13) |

Otros conteos medidos: 1,008 palabras visibles para el alumno nuevo y 1,508 a media generación; 34 botones visibles;
17 a 18 títulos; 5 rótulos en mayúsculas pequeñas.

### 1.4 Pestaña Mi CV

| Bloque | Qué es | Origen | Alto (med.) |
| --- | --- | --- | --- |
| Encabezado | Título, explicación, contador de páginas, «Descargar PDF» | `alumno.html:598-609` | parte del total |
| Editor | Cinco bloques plegables (datos, educación, experiencia, actividades, habilidades) | `alumno.html:611`, `alumno-cv.js` (`pintarEditor`) | parte del total |
| Vista previa | Hoja carta reducida al ancho del celular | `alumno.html:612-617`, `alumno-cv.js:209-212` | parte del total |
| **Total** | Estados N y M | | **2.4** |

### 1.5 Pestaña Store

| Bloque | Qué es | Origen | Alto |
| --- | --- | --- | --- |
| Cabecera | Saldo, nota de la clase en que vas, garantía «Gastar no te baja de lugar», bits ganados, gastados y alias | `alumno.html:621-633`, `alumno-store.js:87-96` | parte del total |
| Metas del grupo | Barras de avance hacia premios del grupo | `alumno.html:635-641`, `alumno-store.js:98-111` | solo si hay metas |
| Filtros | Seis categorías | `alumno-store.js:113-120` | parte del total |
| Artículos | Una tarjeta por artículo con precio, descripción y «Canjear» o el motivo por el que no se puede | `alumno-store.js:123-144` | ≈ 0.30 por artículo (med.) |
| Lo que has canjeado | Lista de canjes | `alumno.html:644-647`, `alumno-store.js:223-251` | parte del total |
| **Total** | Estados N y M; oculta para cuentas del equipo | | **3.7** con 8 artículos ficticios (med.); el catálogo real no se conoce desde este repo |

### 1.6 Pestaña Clases grabadas

| Bloque | Qué es | Origen | Alto (med.) |
| --- | --- | --- | --- |
| Cabecera y buscador | Cuántas grabaciones hay y la regla de los 12 meses | `alumno.html:651-658`, `alumno-store.js:268-278` | parte del total |
| Reproductor | Aparece al tocar «Ver aquí» | `alumno.html:659-667`, `alumno-store.js:294-307` | al usarlo |
| Lista | Una fila por clase pasada con «Ver aquí» y «Drive» | `alumno-store.js:279-292` | 0.17 por clase |
| **Total** | | | **0.4 N** (vacía) · **1.8 M** con 8 clases |

### 1.7 Ventanas emergentes

| Ventana | Origen | Cuándo |
| --- | --- | --- |
| Mensajes con el profesor (hilo, tema, texto, enviar) | `alumno.html:687-698`, `alumno.js:399-461` | Campana, menú, tira de mensajes nuevos o «Preguntar a mi profesor» de cada caso |
| Canjear un artículo | `alumno.html:671-686`, `alumno-store.js:160-216` | Botón «Canjear» de la Store |

## 2. Diagnóstico

### 2.1 Qué compite por la atención

1. **La primera pantalla no dice qué hacer.** El resumen ocupa 0.70 de pantalla con información que no lleva a ninguna
   acción. Para un alumno nuevo dice «0 %», «0 de 8», «Nada pendiente» y «Aún no hay registros».
2. **Tres cuadros seguidos piden un clic con el mismo peso visual:** Continuar misión, Práctica y, cuando aplica, la tira
   de mensajes. Los dos primeros usan el mismo marco ámbar y el mismo tipo de botón.
3. **La clase en vivo queda en la tercera pantalla**, debajo del estado de pagos y del código de recomendación. El día de
   clase, la liga de Meet es lo más urgente. `docs/OPERACION_G1.md` (D2) la pone en segundo lugar, justo después de la
   bienvenida.
4. **El marcador ocupa una pantalla completa antes de los casos** y concentra el vocabulario más difícil para un
   principiante: banda, mediana del grupo, tasa de primer intento y una leyenda con siete conceptos.
5. **Cada tarjeta de caso repite el avance de cuatro formas:** barra, «N de M secciones», «Sigue: …» y una etiqueta por
   sección. Con tres acciones al pie, cada tarjeta llena más de media pantalla.

### 2.2 Duplicados

| Qué se repite | Dónde |
| --- | --- |
| El caso que sigue y su botón | Continuar misión y la primera tarjeta de Casos (con el orden sugerido es el mismo caso) |
| Avance general | Anillo, «Casos entregados», barra de cada tarjeta y línea de Continuar misión |
| Próxima entrega | Dato del resumen y pie de cada tarjeta |
| Grabaciones | Bloque 6b de Mi avance y la pestaña Clases grabadas (misma lista, dos diseños) |
| «12 meses» de las grabaciones | Próxima clase (al terminar el curso), bloque de grabaciones y pestaña Clases grabadas |
| ID, grupo y correo | Etiquetas del resumen y menú del perfil; el ID vuelve a salir en Acceso a Colab |
| Mensajes | Campana, opción del menú, tira de mensajes nuevos y «Preguntar a mi profesor» en cada tarjeta |
| Guía de Colab | Menú del perfil, Acceso a Colab y dos veces en «¿No ves tu avance?» |
| «Gastar bits no cambia tu lugar» | Reglas de bits, cabecera de la Store y ventana de canje |
| Bits ganados | Marcador y cabecera de la Store |
| Comentarios del profesor | Dentro de cada tarjeta de caso y en el hilo de Mensajes |

### 2.3 Textos largos

- «¿Cómo se ganan bits?»: cinco reglas y tres párrafos. Está plegado, que es lo correcto.
- «¿No ves tu avance?»: cuatro viñetas, 0.56 de pantalla, siempre abiertas. Dos hablan de Colab, que el alumno nuevo no
  usa hasta la clase 5.
- Código de recomendación: la explicación completa del descuento aparece en cada visita durante toda la generación.
- Nota del alias y nota de la clave de Colab: dos renglones cada una, siempre visibles.
- Línea de fecha de la clase: día, hora, zona, duración y caso en una sola frase; si el alumno está en otra zona
  horaria se agrega una segunda frase.

### 2.4 Lo que un alumno nuevo ve y todavía no puede usar

| Bloque | Qué ve el día 1 | Alto |
| --- | --- | --- |
| Marcador | 0 bits, escalera, siete conceptos en cero, dos comparaciones sin datos | 0.59 |
| Top 5 y alias | «Aún nadie suma bits» y un formulario para un alias que todavía no se muestra en ninguna tabla | 0.39 |
| Práctica | Botón «Practicar» activo junto a la nota «se abren al terminar tu primera clase» | 0.25 |
| Grabaciones | «Después de cada clase, aquí aparece su grabación» | 0.23 |
| Filtros de casos | Cuatro controles para una lista que todavía no empieza | 0.27 |
| «Aún no hay respuestas abiertas en este caso» | Una línea en cada una de las tarjetas | 8 veces |
| Pestañas Store y Clases grabadas | Sin saldo para gastar y sin grabaciones | — |
| Pestaña Mi CV | El CV crece con casos completos; el día 1 no hay ninguno | — |

Suma de los cinco primeros renglones: **1.7 pantallas** antes de llegar a los casos.

### 2.5 Hallazgos aparte (no son de jerarquía, pero salieron al medir)

1. **Acceso a Colab se queda visible en Mi CV, Store y Clases grabadas.** `alumno-cv.js:216` oculta al cambiar de
   pestaña `#vistaAvance`, `#vistaDocente` y `#ayuda`, pero no `#acceso-colab`, así que el cuadro aparece arriba del
   contenido de las otras pestañas (medido, alumno a media generación).
2. **La cuarta pestaña se corta** a 390 px (ver 1.1).
3. **D2 de `docs/OPERACION_G1.md` ya no coincide con el código:** pone Acceso a Colab como lo tercero que se ve el día
   1, y hoy ese cuadro se oculta hasta una semana antes de la clase 5 (`alumno.js:684-690`) y está al final de la página.
4. **Dos palabras para lo mismo:** el cuadro de arriba dice «misión» («Continuar misión», «Empezar misión») y las
   tarjetas dicen «caso». Las misiones web son otra cosa y no cuentan para la calificación
   (`docs/DECISIONES_GENERACION_1.md`).
5. **Botones por debajo de 44 px de alto (estimado del CSS):** los del pie de cada tarjeta y el del alias (42 px),
   «Copiar» de las claves y el enlace «Preguntar a mi profesor».
6. `scripts/qa_student_experience.py` **no abre `alumno.html`**: hoy Mi avance solo se prueba en `harness/tests/`.
7. La tarjeta de ejemplo de la entrada sin sesión enseña «Continuar en Colab» (ver 1.2).

## 3. Propuesta de jerarquía

Pregunta guía: **«¿qué hago ahora?»** La primera pantalla debe contestarla con una sola acción principal; todo lo demás
se ordena por «¿lo necesito hoy?».

Lo que debe seguir a la vista o a un clic, según los documentos del repo:

| Obligación | Fuente |
| --- | --- |
| Clase de hoy con hora y liga de Meet; el día 1 nada pide más de un clic para llegar a la clase y al caso de hoy | `OPERACION_G1.md` D2 |
| Estado de la inscripción y aviso de cobro fallido con su plazo | D2; `DECISIONES_GENERACION_1.md` (cobro fallido) |
| Código de recomendación | `DECISIONES_GENERACION_1.md` |
| Casos con su intro antes que el caso | D2; `COLABORADOR.md` 1.1 |
| Bits (son la calificación), banda propia y Top 5 con alias | D2, D5; `DECISIONES_GENERACION_1.md` |
| Grabaciones y su vigencia de 12 meses | `DECISIONES_GENERACION_1.md` |
| Mensajes con el profesor y avisos al grupo (plan B de Meet) | D2, D7 |
| Acceso a Colab cuando Colab entre | D2 |

Ninguna opción quita algo de esta lista; cambian el lugar y si está abierto o plegado.

### Opción A · Conservadora: reordenar y plegar

Mismo contenido y mismas cuatro pestañas. Orden propuesto de Mi avance:

| Lugar | Bloque | Cambio |
| --- | --- | --- |
| 1 | Avisos que piden acción | Cobro fallido o acceso en pausa y mensajes nuevos, solo cuando existen |
| 2 | **Qué sigue** | El cuadro actual de Continuar misión, primero. Si hay clase hoy o está por empezar, el botón de Meet entra en este mismo cuadro |
| 3 | Próxima clase | Sube; cuenta regresiva en una línea; el calendario pasa a enlace secundario |
| 4 | Casos | Suben. La tarjeta se queda con una sola forma de avance (barra y «N de M»); las etiquetas por sección y las respuestas se pliegan; una acción principal por tarjeta |
| 5 | Práctica | Baja y se reduce a una línea; aparece solo cuando hay micro-casos abiertos |
| 6 | Bits y Top 5 | Plegado a una línea («195 bits · Top 50 % · lugar 9 de 20»); al abrir, el marcador actual. Con 0 bits, una línea que explica cómo se gana el primero |
| 7 | Resumen | El saludo se queda como título; el anillo y los tres datos se reducen a una línea o se pliegan |
| 8 | Pagos al corriente y código de recomendación | Plegado, al final |
| 9 | Acceso a Colab | Sube al lugar 3 durante la semana previa a la clase 5 y mientras el alumno no tenga clave; después, plegado |
| 10 | Ayuda | Plegada |

Además: las grabaciones salen de Mi avance (queda un enlace a la pestaña); los filtros aparecen a partir de cierto
número de casos; ID, grupo y correo se quedan solo en el menú; se corrigen los hallazgos 1 y 2 de 2.5.

- **Se gana:** la acción principal queda en la primera pantalla y la clase en la segunda. Altura estimada con todo
  plegado: **4 a 5 pantallas** para el alumno nuevo (hoy 10.2) y **5 a 6** a media generación (hoy 13.2), con 8 casos.
  Estimado: suma de los bloques medidos con las reducciones descritas; se confirma con capturas en la fase 2.
- **Se arriesga:** los bits quedan a un toque (son la calificación y un motivador). Las pruebas del marcador esperan
  verlo abierto. La página sigue siendo una sola columna larga cuando haya 20 casos o más.

### Opción B · Radical: Mi avance pasa a ser «Hoy»

Mi avance contesta solo la pregunta guía; lo demás se reparte.

| Dónde | Qué queda |
| --- | --- |
| Pestaña principal | Avisos que piden acción · un cuadro «Qué sigue» que une la clase (fecha o botón de Meet) y el caso (intro o continuar) · una línea de bits y banda · los casos de esta semana en filas compactas |
| Pestaña Casos (nueva) | Todos los casos con filtros, respuestas y comentarios del profesor |
| Pestaña Bits (une marcador y Store) | Marcador, Top 5, alias, reglas, metas del grupo y canjes |
| Pestaña Clases (une próxima clase y grabadas) | Calendario, agenda de la clase y grabaciones |
| Menú del perfil | Mi CV, pagos y código de recomendación, Acceso a Colab, ayuda |

- **Se gana:** la pestaña principal baja a **1.5 a 2 pantallas** (estimado). Cada cosa vive en un solo lugar y
  desaparecen casi todos los duplicados de 2.2.
- **Se arriesga:** mover Mi CV, la Store y Acceso a Colab al menú los hace menos visibles (la Store se estrenó el 8 de
  noviembre con etiqueta «Nuevo»). Cambia D2, que pide bits, Top 5 y Colab en Mi avance. Hay que reescribir buena parte
  de las tres pruebas del área y coordinar `alumno.js`, `alumno-cv.js` y `alumno-store.js`. Es un cambio grande a ocho
  semanas del inicio, sin tiempo de probarlo con alumnos antes del 8 de enero.

### Recomendación

**Opción A ahora**, con dos piezas de la B que cuestan poco: las grabaciones solo en su pestaña y el botón de Meet
dentro del cuadro «Qué sigue» el día de clase. Razones: cumple la regla de D2 sin cambiar dónde vive cada cosa, cabe
antes del piloto y no obliga a redefinir las pestañas recién estrenadas. La opción B conviene decidirla después de las
dos primeras semanas de clase, con lo que el panel docente muestre que los alumnos sí abren.

## 4. Decisiones para el autor

Contesta cada una con «sí», «no» o «cambio: …».

1. ¿Va la opción A (reordenar y plegar) para la fase 2?
2. ¿La primera pantalla empieza con el cuadro «Qué sigue» y el resumen (anillo y tres datos) baja o se pliega?
3. ¿El anillo de porcentaje se quita de Mi avance? (Alternativa: se queda pequeño junto al saludo.)
4. ¿El día de clase el botón de Meet entra en el cuadro «Qué sigue», además de quedar en Próxima clase?
5. ¿La clase sube al segundo lugar, por encima de pagos y del código de recomendación?
6. ¿El aviso de pagos se muestra arriba solo cuando hay algo que hacer (cobro fallido o acceso en pausa) y, al corriente,
   baja plegado junto con el código de recomendación?
7. ¿Bits y Top 5 quedan plegados en una línea que se abre al tocar? (Alternativa: abiertos, pero debajo de Casos.)
8. Con 0 bits, ¿se sustituye el marcador completo por una línea que explica cómo ganar el primero?
9. ¿El formulario del alias se muestra solo al abrir el Top 5?
10. ¿Las grabaciones salen de Mi avance y quedan solo en la pestaña Clases grabadas, con un enlace desde Próxima clase?
11. ¿La tarjeta de caso se reduce a título, estado, barra, «N de M» y una acción principal, con secciones y respuestas
    plegadas? ¿«Preguntar a mi profesor» se queda en cada tarjeta?
12. ¿Las respuestas con comentario nuevo del profesor siguen abriéndose solas? (Hoy sí; cada una agrega media pantalla.)
13. ¿Los filtros de casos aparecen solo a partir de un mínimo de casos? Propuesta: 6.
14. ¿Práctica se oculta mientras no haya micro-casos abiertos y, después, baja debajo de Casos?
15. ¿ID, grupo y correo se quedan solo en el menú del perfil?
16. ¿«¿No ves tu avance?» queda plegada al final? ¿Las dos viñetas de Colab se muestran solo desde que Colab aparece?
17. ¿Acceso a Colab sube al tercer lugar la semana previa a la clase 5 y mientras no haya clave, y después se pliega?
18. ¿Se usa una sola palabra en el cuadro de arriba y en las tarjetas? Propuesta: «caso» («Empezar el caso», «Continuar
    el caso»), y dejar «misión» para las misiones web.
19. ¿El botón del menú deja de decir «Profile»? Propuesta: «Mi cuenta».
20. ¿La tarjeta de ejemplo sin sesión cambia a un caso que se resuelve en la página?
21. ¿Se actualiza D2 de `docs/OPERACION_G1.md` con el orden que apruebes? (Hoy ya no coincide por Acceso a Colab.)
22. ¿La opción B se vuelve a plantear después de la clase 4, con datos de uso?

## 5. Alcance técnico estimado de la fase 2

Para la opción A. Sin cambios en la base ni en el backend: todo se resuelve con los datos que la página ya recibe.

| Archivo | Cambio |
| --- | --- |
| `site/alumno.html` | Reordenar las secciones dentro de `#vistaAvance`; envolver marcador, pagos al corriente, ayuda y resumen en desplegables; quitar el bloque de grabaciones; ajustar los estilos en línea de `.summary`, `.case`, `.board` y `.classes`. Conservar los `id` actuales, que usan las pruebas |
| `site/alumno.js` | `pintarContinuar` (botón de Meet el día de clase), `tarjetaCaso` y `comentarios` (tarjeta compacta), `pintarClases` y `pintarProxima` (sin grabaciones, cuenta regresiva en línea), `pintarMarcador` (línea resumen y caso de 0 bits), `pintarPago` (arriba solo con acción), `llenarFiltros` (mínimo de casos), `pintarAccesoColab` (lugar según la fecha), práctica (ocultar sin micro-casos) |
| `site/area.css` | Estilos del cuadro «Qué sigue», de los desplegables y de la barra de pestañas a 390 px |
| `site/alumno-cv.js` | Una línea: agregar `#acceso-colab` a la lista que se oculta al cambiar de pestaña (hallazgo 1 de 2.5) |
| `site/alumno-store.js`, `site/alumno-store.css` | Sin cambios, salvo el enlace a la pestaña Clases grabadas (`window.TDD_PESTANA` ya existe) |
| `docs/OPERACION_G1.md` | D2, si el autor aprueba la decisión 21 |

Pruebas:

| Prueba | Qué hay que cuidar o agregar |
| --- | --- |
| `harness/tests/test_bits_ui.py` | Espera ver `#marcador`, `#escalera`, `#mezcla`, `#comparar` y el formulario del alias. Si quedan plegados, la prueba debe abrir el desplegable antes |
| `harness/tests/test_alumno_respuestas.py` | Usa `#casos`, las respuestas dentro de la tarjeta y `#respuestasError`. Si las respuestas se pliegan, ajustar los pasos |
| `harness/tests/test_store_ui.py` | Usa las pestañas y `#grabadasLista`; no debería cambiar |
| `harness/tests/test_caso_pagina.py:192-200` | Comprueba el orden de los textos «Ver la intro (1 min)», «Resolver el caso» y «Abrir en Colab» dentro de `alumno.js`. Si cambian esos textos, la prueba cambia con ellos |
| `scripts/qa_student_experience.py` | Hoy no abre `alumno.html`. Agregar una revisión con sesión simulada y datos ficticios (el patrón de `test_bits_ui.py`) a 390 y 1440 px: sin desbordamiento horizontal, botón principal dentro de la primera pantalla, liga de Meet dentro de las dos primeras, objetivos táctiles de 44 px, las cuatro pestañas alcanzables, y Acceso a Colab oculto fuera de Mi avance. Guardar capturas antes y después en `output/qa/` |
| `python -m harness all` | En verde; el guardia de colores rechaza literales, así que los estilos nuevos usan solo `design/tokens` |

Tamaño estimado: un PR mediano, de 250 a 400 líneas tocadas entre HTML, JS y CSS, más 80 a 120 líneas de pruebas. La
opción B sería de tres a cuatro veces eso y tocaría los tres scripts del área.

No comprobado en esta fase: el comportamiento con la base real, el número de casos que verá la Generación 1, el
catálogo real de la Store y la vista a 1440 px. Por indicación de la tarea no se corrieron `python -m harness` ni
comandos de Git en esta carpeta.
