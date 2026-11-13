# Revisión del tutorial de Colab con ojos de principiante (u08)

**Fecha:** 13 de noviembre de 2026 · **Tablero:** u08 (encargo E-12) · **Página:** `site/colab.html`
(«Conecta tu cuaderno para que tu avance cuente»), más la sección Acceso a Colab de `site/alumno.html`.

Lectora imaginada: adulta que nunca ha programado ni abierto Colab, en la semana de la clase 5 (4.1 Semmelweis). Quejas
reales del piloto: el salto de la intro a Colab, los `NameError` cuando Colab se desconecta y las salidas sueltas (estas
dos últimas ya resueltas en el backend #42). Los textos son propuesta: los decides tú. No se editó la página.

## 1. Dónde se atora

| # | Paso | Dice hoy | Dónde se atora | Gravedad | Propuesta |
| --- | --- | --- | --- | --- | --- |
| 1 | Datos, `colab.html:112` | TDD_CLAVE: «Te la manda tu profesor; si la perdiste, pídele una nueva» | **Contradice Mi avance**, donde el alumno la genera con «Generar mi TDD_CLAVE» (`alumno.html:499`). Esperará un correo que nunca llega | **Alta** | «Tu clave la generas tú en Mi avance → Acceso a Colab → Generar mi TDD_CLAVE. Solo se muestra una vez: cópiala en ese momento. Si la pierdes, genera otra y actualízala en tus secretos.» |
| 2 | Paso 5, «Ejecuta la primera celda» | «Presiona ▶ en la celda **Preparación**» | La celda se llama «▶ Prepara la taquería (ejecuta esta celda primero)». No encuentra «Preparación» | **Alta** | «Presiona ▶ en la primera celda, la que dice **ejecuta esta celda primero**.» (sirve aunque cambie el nombre con los tipos de cuaderno, u03) |
| 3 | Paso 5 | No menciona el aviso de Google | Al ejecutar la primera celda, Colab muestra una advertencia de que el cuaderno no lo creó Google, que puede pedir acceso a datos, con el botón «Ejecutar de todos modos» ([guía de la UGR](https://abierta.ugr.es/pluginfile.php/83032/mod_page/intro/Instrucciones%20NoteBook.pdf)). Asusta y muchos cancelan | **Alta** | «Colab te avisa que este cuaderno no lo creó Google. Es normal: lo creó tu profesor. Presiona **Ejecutar de todos modos**.» Con una captura |
| 4 | No existe | — | Qué hacer si Colab se desconecta. Si se deja de usar más de 90 minutos, la sesión se desconecta y hay que volver a ejecutar el código ([artículo de la Universidad de Chile sobre Colab en docencia](https://revistasdex.uchile.cl/index.php/int/article/download/15668/15695/41079)) | **Alta** | Sección nueva: «Si Colab se desconecta o reinicia, vuelve a ejecutar ▶ la primera celda. Lo que ya aparece en Mi avance no se pierde. Si una celda te muestra la tarjeta "Esta celda necesita tu sesión", es esto.» (mismo texto que el cuaderno, backend #42) |
| 5 | No existe | — | Cómo volver mañana a **su** copia y no al original. Las copias quedan en la carpeta «Colab Notebooks» de Drive ([guía de la BUAP](https://www.fcfm.buap.mx/emoyotl/docs/Google_Colab_breve_introduccion.pdf)) | Media | «Para volver otro día: abre Drive → Colab Notebooks → "Copia de Caso…", o en Colab, Archivo → Abrir cuaderno → Recientes. Si abres el enlace de Mi avance, abres el original, no tu copia.» |
| 6 | Paso 2 | «Archivo → Guardar una copia en Drive» | Si su Colab está en inglés, ve «File → Save a copy in Drive» | Media | Poner los dos: «Archivo → Guardar una copia en Drive (en inglés: File → Save a copy in Drive)» |
| 7 | Paso 4 | «enciende el interruptor de acceso del cuaderno» | No sabe cuál es el interruptor; el rótulo exacto en pantalla no está verificado | Media | Captura real del panel Secretos con el interruptor señalado. **Verificar en pantalla** el rótulo actual |
| 8 | Todo el tutorial | «celda», «ejecutar», «secreto», «copia» sin explicar | Términos nuevos para quien nunca programó | Media | Glosario de 6 términos (sección 3) |
| 9 | No existe | — | Si abre el enlace en el celular | Baja | «Usa la laptop: en el celular Colab funciona a medias y el panel de secretos es difícil de usar.» (la laptop ya es requisito del curso) |
| 10 | No existe | — | Cómo saber si una celda sigue trabajando | Baja | «Mientras trabaja, el ▶ gira. Espera a que se detenga antes de ejecutar la siguiente.» |
| 11 | Encabezado | «Tutorial · 2 minutos, una sola vez» | Con secretos y copia son unos 5 minutos la primera vez | Baja | «Tutorial · 5 minutos la primera vez» |

## 2. Versión propuesta del tutorial (texto para aprobar)

**Conecta tu cuaderno para que tu avance cuente** · 5 minutos la primera vez, una sola vez

Desde la clase 5 algunos casos se resuelven en Google Colab, un cuaderno en línea donde el código ya está escrito y tú
lo ejecutas. Para que tu avance cuente a tu nombre, el cuaderno necesita saber quién eres: eso son tus dos secretos.

0. **Ten a la mano tus dos datos.** `TDD_ID` es el Gmail con el que te inscribiste. `TDD_CLAVE` la generas tú en Mi avance
   → Acceso a Colab → Generar mi TDD_CLAVE; solo se muestra una vez, así que cópiala en ese momento.
1. **Abre el caso y guarda tu copia.** En Mi avance, presiona Abrir en Colab. El original es de solo lectura: ve a Archivo
   → Guardar una copia en Drive (en inglés: File → Save a copy in Drive). Trabaja siempre en esa copia.
2. **Abre el panel Secretos.** En la barra de la izquierda, presiona el icono de llave.
3. **Crea los dos secretos.** + Agregar nuevo secreto, dos veces: `TDD_ID` con tu Gmail y `TDD_CLAVE` con tu clave, con
   su guion. Escribe los nombres exactamente así. Enciende el interruptor de acceso en los dos.
4. **Ejecuta la primera celda.** Presiona ▶ en la celda que dice *ejecuta esta celda primero*. Colab te avisará que el
   cuaderno no lo creó Google: es normal, lo creó tu profesor; presiona Ejecutar de todos modos. Si te pregunta si el
   cuaderno puede leer tus secretos, elige Otorgar acceso. Listo si ves «Hola, …».
5. **Comprueba en Mi avance.** Cada sección que resuelves aparece en tu tarjeta del caso en segundos.

**Si Colab se desconecta o reinicia** (pasa si lo dejas solo un buen rato): vuelve a ejecutar ▶ la primera celda. Lo que
ya aparece en Mi avance no se pierde.

**Para volver otro día:** abre Drive → Colab Notebooks → «Copia de Caso…». El enlace de Mi avance abre el original.

**Usa la laptop.** En el celular, Colab funciona a medias.

## 3. Glosario propuesto

- **Cuaderno:** un documento de Colab con texto y código ya escrito, que tú ejecutas paso a paso.
- **Celda:** cada bloque del cuaderno. Las de código tienen un ▶ a la izquierda.
- **Ejecutar:** presionar ▶ para que la celda haga su trabajo. Mientras trabaja, el ▶ gira.
- **Copia:** tu versión del cuaderno, guardada en tu Drive. Lo que hagas ahí es tuyo.
- **Secreto:** un dato privado que Colab guarda en tu cuenta (no en el cuaderno), como tu clave.
- **Sesión:** la conexión de Colab mientras trabajas. Si se corta, se recupera ejecutando la primera celda.

## 4. Decisiones para el autor

1. ¿Corregimos ya las filas 1 y 2? Son errores de hecho, no de estilo. (Recomiendo sí.)
2. ¿Agregamos la advertencia de Google (fila 3) y la sección «Si Colab se desconecta» (fila 4)? (Recomiendo sí.)
3. ¿Usamos la versión propuesta de la sección 2 completa o solo las correcciones?
4. ¿Agregamos el glosario como desplegable al final?
5. ¿Tomas tú las dos capturas reales (aviso de Google y panel Secretos) o las simulo con el estilo actual de la página?
