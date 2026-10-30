# Kit del piloto · Generación 1

Dos actividades antes de abrir la Generación 1, a cargo de José Carlos (único docente):

| Actividad | Quién | Vence | Resultado |
| --- | --- | --- | --- |
| [1. Ensayo en seco](#1-ensayo-en-seco-vence-el-1-de-noviembre) | Tú solo, con una cuenta de Gmail de prueba | **domingo 1 nov 2026** | Las 20 casillas marcadas o cada falla anotada |
| [2. Piloto con 2-3 personas](#2-piloto-con-2-3-personas-vence-el-8-de-noviembre) | Tú y 2-3 personas sin experiencia en datos | **domingo 8 nov 2026** | [Plantilla de resultados](#plantilla-de-resultados-para-devolver-a-claude) llena |

> **Repositorio público.** Este archivo es la plantilla. No subas aquí nombres, correos, respuestas, calificaciones ni la plantilla llena: devuélvela a Claude por chat o guárdala en tu Drive.

## Antes de empezar

| ✓ | Prerrequisito | Dónde |
| --- | --- | --- |
| ☐ | Fusiona el PR 21 del backend (esquema 0.12 + casos 1.1, 4.1 v1.4 y 4.2). El enlace del instalador abre `main`, así que sin fusionar correrías la versión anterior | https://github.com/jcval94/agentic-ds-backen/pull/21 |
| ☐ | Corre el instalador: pasos 1 a 4, luego 6 y 9 (como indica `docs/PAGOS.md` del backend). Si Colab no lo encuentra: **Archivo → Abrir cuaderno → GitHub → Incluir repositorios privados** | https://colab.research.google.com/github/jcval94/agentic-ds-backen/blob/main/instalador.ipynb |
| ☐ | La función `tdd-docente` está en 0.9.0 y `tdd-inscripcion` desplegada (de esta sale el botón **Generar mi TDD_CLAVE** del alumno) | https://supabase.com/dashboard/project/tvxhocccdetkukonhhnh/functions |
| ☐ | Corre el respaldo (paso 10 del instalador) para tener un punto de regreso | El mismo instalador |
| ☐ | Tienes a la mano una cuenta de Gmail **externa** (no de administración) y un perfil de Chrome aparte o ventana de incógnito para ella | — |

**admin.html → Datos → Estado del sistema** debe salir así (abre https://learninglabs.pages.dev/admin.html):

| ✓ | Renglón | Qué debe decir |
| --- | --- | --- |
| ☐ | Esquema | ✓ y, debajo, «Última instalación … · esquema 0.12.0» |
| ☐ | Función tdd-docente | ✓ «Función tdd-docente desplegada (0.9.0)» |
| ☐ | IA | ✓ «IA para sugerir calificaciones: OpenAI» |
| ☐ | Retos | ✓ «9 retos en 3 casos» (1.1, 4.1 y 4.2) |
| ☐ | Respaldo | ✓ «Último respaldo hace …» (menos de 7 días) |
| ☐ | Avisos arriba del panel | Ninguno rojo. En **Inscripciones** debe aparecer el estado de `tdd-inscripcion` (Stripe puede seguir en prueba: no hace falta para el piloto) |

Si algo sale con «!», no sigas: anota el texto exacto y mándalo a Claude.

---

## 1. Ensayo en seco (vence el 1 de noviembre)

Tú haces de alumno con la cuenta de prueba y de profesor con tu cuenta de administración. Usa **dos perfiles de navegador**: «Admin» (tu cuenta) y «Alumno» (la de prueba). Tiempo estimado: 2 horas.

En «Si falla, anota» registra siempre: paso, hora, texto exacto del error y captura.

| ✓ | # | Perfil | Paso | Enlace | Si funciona, ves | Si falla, anota |
| --- | --- | --- | --- | --- | --- | --- |
| ☐ | 1 | Admin | Si no existe, crea el grupo: **Grupos → + Nuevo grupo**, ID `PILOTO`, activo | https://learninglabs.pages.dev/admin.html | `PILOTO` en la lista de grupos | Mensaje del formulario |
| ☐ | 2 | Admin | **Alumnos → + Dar de alta → Un alumno**: deja el ID sugerido, grupo `PILOTO`, nombre y el Gmail de prueba → **Dar de alta** | https://learninglabs.pages.dev/admin.html | «✓ TDD-### · nombre (PILOTO) · correo» | Texto del renglón con ✗ |
| ☐ | 3 | Alumno | **Entrar con Google** con la cuenta de prueba | https://learninglabs.pages.dev/alumno.html | «Hola …», la tarjeta del caso 4.2 y la sección **Acceso a Colab** | Si te manda a un perfil vacío o pide inscribirte |
| ☐ | 4 | Alumno | En **Acceso a Colab**: copia `TDD_ID` y presiona **Generar mi TDD_CLAVE** → **Copiar** | https://learninglabs.pages.dev/alumno.html#acceso-colab | `TDD_ID` = el Gmail de prueba; clave tipo `KQ7M-3XPA` | Texto «No pudimos generar tu clave: …» |
| ☐ | 5 | Alumno | Lee el tutorial completo como si fuera la primera vez | https://learninglabs.pages.dev/colab.html | Pasos claros, sin términos que no se expliquen | Frase donde te detuviste y por qué |
| ☐ | 6 | Alumno | Desde Mi avance, **Abrir en Colab** en el caso 4.2. Comprueba que abre el mismo cuaderno que el enlace directo. Luego **Archivo → Guardar una copia en Drive** | https://colab.research.google.com/drive/1dTrByn08HxKMfNRSDoy44FqGrCGS97qG | «Copia de Caso…» abierta con la cuenta de prueba (no con la tuya) | Si abre otro cuaderno o con otra cuenta |
| ☐ | 7 | Alumno | En la copia: icono de llave (**Secretos**) → **+ Agregar nuevo secreto** dos veces: `TDD_ID` y `TDD_CLAVE`; enciende el acceso del cuaderno en los dos | (la copia de Colab) | Dos secretos con el interruptor encendido | Si Colab no muestra la llave o el interruptor |
| ☐ | 8 | Alumno | Ejecuta **▶ Prepara la taquería** | (la copia de Colab) | Portada «EXPEDIENTE ABIERTO» y **no** dice «Modo invitado» | Motivo del modo invitado si aparece |
| ☐ | 9 | Alumno | Avanza: **Anota tu hipótesis** (con razón), **Ver el total**, **Explorar departamento por departamento**, **Ver los seis departamentos juntos** | (la copia de Colab) | Sello de hipótesis anotada; gráficas y franjas «NIVEL n/9» | Celda y error |
| ☐ | 10 | Alumno | Responde **★ Reto 1 · ¿Dónde les fue mejor a las mujeres?** una vez mal y una vez bien | (la copia de Colab) | Respuesta inmediata: no acertado y luego acertado, con bits y monedas | Si dice «Reto sin comprobar» (eso es modo invitado) |
| ☐ | 11 | Alumno | Responde la pregunta abierta **Escribe tu explicación** con 2-3 frases | (la copia de Colab) | «Explicación anotada» | Texto del aviso |
| ☐ | 12 | Alumno | Termina el caso hasta **Escribe tu ejemplo y cierra el caso** y ejecuta **✔ Revisa que tu avance quedó guardado** | (la copia de Colab) | «Caso completado» y «Todo guardado. No hay nada pendiente.» | Número de eventos pendientes |
| ☐ | 13 | Alumno | Recarga Mi avance | https://learninglabs.pages.dev/alumno.html | 4.2 con 9 de 9 secciones, bits mayores a 0, tu alias en el **Top 5** y tus respuestas | Qué falta y cuánto tardó en aparecer |
| ☐ | 14 | Admin | **Alumnos** → abre la ficha de la cuenta de prueba | https://learninglabs.pages.dev/admin.html | Bits, caso 4.2, hipótesis, respuestas, «Retos: … al primer intento» y la línea de tiempo | Qué dato falta |
| ☐ | 15 | Admin | **Por calificar** → la explicación de la cuenta de prueba → **Sugerir con IA** | https://learninglabs.pages.dev/admin.html | «Sugerencia de la IA: nivel n…» con comentario editable | Error de la IA (y si en Datos la IA está en verde) |
| ☐ | 16 | Admin | Ajusta nivel y comentario, deja marcado **Avisar al alumno** y **Guardar** | https://learninglabs.pages.dev/admin.html | La respuesta sale de la bandeja | Mensaje de error |
| ☐ | 17 | Alumno | Recarga Mi avance | https://learninglabs.pages.dev/alumno.html | **Mensajes** (arriba a la derecha) con contador y el aviso con tu comentario; la calificación junto a la respuesta | Si el aviso no llega |
| ☐ | 18 | Alumno → Admin | El alumno escribe una duda en **Mensajes**; tú la contestas en la pestaña **Mensajes** de admin; el alumno la ve | alumno.html y admin.html | Hilo completo en los dos lados | Lado donde se pierde el mensaje |
| ☐ | 19 | Admin | **Datos → Modo invitado** | https://learninglabs.pages.dev/admin.html | Ninguna ejecución nueva durante el ensayo | Motivos que aparezcan |
| ☐ | 20 | Admin | Limpieza: ficha de la cuenta de prueba → **Grupo: Sin grupo** → **Guardar cambios** (borrar alumnos solo se hace desde el instalador) | https://learninglabs.pages.dev/admin.html | La cuenta en «Sin grupo»; el Top 5 de `PILOTO` ya no la muestra | Mensaje de error |

Al terminar: si todas las casillas están marcadas, pasa al piloto. Si no, manda a Claude la columna «Si falla, anota» de cada paso fallido.

---

## 2. Piloto con 2-3 personas (vence el 8 de noviembre)

Caso **4.2 · ¿Discriminaba Berkeley a las mujeres?** (tiempo estimado visible para el alumno: **70 min**). El caso 4.1 (80 min) no cabe en la misma sesión: si sobra tiempo, déjalo como tarea opcional entre la sesión y el 8 nov y revisa su avance en el panel (Mi avance toma el enlace de 4.1 v1.4 de la base después del instalador).

**Perfil buscado:** adultos que no programan y casi no han trabajado con datos (como los alumnos de la Generación 1). No familiares que ya conozcan el curso.

### Invitación por WhatsApp

> Hola ____, estoy probando el curso de ciencia de datos que voy a dar en enero y me ayudaría mucho que lo pruebes antes que nadie. Es una sesión de 1.5 a 2 horas, gratis, el ____ a las ____, por Google Meet. Resolverás un caso real (¿discriminaba la Universidad de Berkeley a las mujeres?) sin saber programar. Solo necesitas una laptop con Windows o macOS y una cuenta de Gmail. Si aceptas, la grabo para mejorar el curso; si no, no se graba. ¿Te late? Si sí, mándame tu nombre completo y tu Gmail.

### Invitación por correo

**Asunto:** ¿Me ayudas a probar un caso del curso? (90-120 min, gratis)

> Hola ____:
>
> En enero empiezo The Agentic Data Scientist, un curso de ciencia de datos desde cero con casos reales. Antes de abrirlo quiero probar un caso con 2 o 3 personas y me encantaría que fueras una.
>
> - **Qué es:** resolver el caso de Berkeley 1973 (¿discriminaba la universidad a las mujeres?) en Google Colab, sin programar.
> - **Cuándo y cuánto dura:** ____ a las ____, de 90 a 120 minutos, por Google Meet.
> - **Qué necesitas:** laptop con Windows o macOS, internet y una cuenta de Gmail.
> - **Costo:** gratis.
> - **Grabación:** solo si me das permiso al inicio de la sesión.
>
> Si te interesa, respóndeme con tu nombre completo y el Gmail con el que entrarás.
>
> Gracias,
> José Carlos · Augmented Learning Labs

### Datos que pides (y nada más)

| Dato | Para qué |
| --- | --- |
| Nombre completo | Alta en admin.html |
| Gmail | Alta en admin.html; con él entra a Mi avance y es su `TDD_ID` |
| ¿Acepta grabación? (sí/no, al inicio de la sesión) | Consentimiento; no grabes sin un sí explícito |

Guárdalos en tu Drive, no en este repositorio.

### Preparación (un día antes)

| ✓ | Tarea | Enlace |
| --- | --- | --- |
| ☐ | Alta de cada persona en el grupo `PILOTO` (**Alumnos → + Dar de alta**) | https://learninglabs.pages.dev/admin.html |
| ☐ | Liga de Meet lista y la grabación de Meet probada | https://meet.google.com |
| ☐ | Esta guía impresa o abierta, con cronómetro | — |
| ☐ | Pide que lleguen con la laptop cargada y con sesión iniciada en su Gmail | — |

### Agenda de la sesión (90-120 min)

| Min | Bloque | Qué haces tú |
| --- | --- | --- |
| 0-5 | Bienvenida | Pide permiso para grabar; explica que se prueba el curso, no a ellos; que piensen en voz alta |
| 5-10 | Regla del piloto | «Voy a ayudar poco a propósito: si te atoras, dilo en voz alta y sigue intentando» |
| 10-25 | Entrada y conexión | Mándales https://learninglabs.pages.dev/alumno.html y el tutorial https://learninglabs.pages.dev/colab.html. Ellos solos: entrar con Google, generar `TDD_CLAVE`, abrir 4.2, copia en Drive, secretos. Cronometra |
| 25-95 | Caso 4.2 | Ellos solos. Tú observas y anotas ([guía](#guía-de-observación)). Cronometra cada sección |
| 95-105 | Mi avance y encuesta | Que abran Mi avance (bits, Top 5) y respondan la [encuesta](#encuesta-de-salida-5-preguntas) |
| 105-120 | Cierre | Pregunta abierta: «¿Qué decidiste y por qué?»; anota la frase textual. Margen para quien vaya atrasado |

### Guía de observación

**Regla:** no ayudes salvo bloqueo de más de 2 minutos. Al llegar a 2 min, da la ayuda más pequeña posible («¿Qué dice la celda de arriba?») y anótala.

Anota por persona, en el momento:

| Hora | Sección o celda | Qué pasó (se detiene, duda, error, pregunta) | ¿Por qué? (cita textual si la hay) | ¿Pausa > 2 min? | ¿Ayudaste? ¿Con qué? |
| --- | --- | --- | --- | --- | --- |
| ____ | ____ | ____ | ____ | ☐ | ____ |

Fíjate sobre todo en estos puntos de riesgo de la revisión de principiante del 24 oct:

- Los campos técnicos de **Prepara la taquería** (¿cree que debe llenarlos?).
- Si responde dentro del formulario o intenta escribir código.
- **Reto 3 · Encuentra el punto de cruce** (control deslizante): ¿lo encuentra y lo usa?
- La demo **Las dos sucursales** pide un enlace que el profesor comparte: decide antes si lo das o si pides saltarla, y anota qué pasó.
- Si alguien usa **Reiniciar y ejecutar todo** (puede reenviar respuestas).
- Diferencia entre «Caso completado» y «Todo guardado» en la última celda.

### Criterios de éxito

| ✓ | Criterio | Cómo se mide | Meta |
| --- | --- | --- | --- |
| ☐ | Terminan sin ayuda a tiempo | Del primer ▶ en Colab a «Caso completado», sin ayudas de tu parte | **2 de 3** en ≤ 105 min (1.5 × 70) |
| ☐ | Justifican su decisión con un dato | La frase final de cada quien incluye un número o comparación del caso | **3 de 3** |
| ☐ | Cero eventos perdidos | Cada ficha en admin.html muestra 9 de 9 secciones de 4.2, hipótesis, explicación, ejemplo y los 3 retos intentados; la última celda dice «Todo guardado»; **Datos → Modo invitado** sin ejecuciones nuevas | **0** perdidos |
| ☐ | Pausas registradas | Cada pausa > 2 min está en la tabla de observación | **100 %** registradas |

Con 2 personas, «2 de 3» se lee como «2 de 2».

### Encuesta de salida (5 preguntas)

Mándala en un formulario de Google o hazla en voz alta.

1. Del 1 al 5, ¿qué tan claro fue qué hacer en cada paso? ¿Dónde fue menos claro?
2. ¿En qué momento te sentiste más perdido o perdida y qué te ayudó a seguir?
3. En una frase: ¿Berkeley discriminaba a las mujeres? ¿Qué dato lo muestra?
4. Del 1 al 5, ¿qué tan probable es que recomiendes el curso a alguien como tú? ¿Por qué?
5. Si pudieras cambiar una sola cosa del caso o de la plataforma, ¿cuál sería?

---

## Plantilla de resultados (para devolver a Claude)

Copia desde aquí, llénala y pégala en el chat. Usa iniciales (P1, P2, P3), no nombres.

```text
PILOTO G1 · caso 4.2 · fecha: ____ · personas: __ · grabada: sí/no

ENSAYO EN SECO
Pasos fallidos (número, texto exacto del error): ____

TIEMPOS (minutos)
Fuente: cronómetro; para confirmar, admin.html → Alumnos → ficha → Línea de tiempo.
Sección                                       | P1 | P2 | P3 | Estimado
Entrada y conexión (Mi avance, clave, secretos)|    |    |    | 10-15
Preparación                                   |    |    |    | 6-10
Hipótesis                                     |    |    |    | 4-6
Total                                         |    |    |    | 4-6
Departamentos + Reto 1                        |    |    |    | 8-12
Explicación                                   |    |    |    | (incl. arriba)
Pista                                         |    |    |    | 5-8
Revelación + Reto 2                           |    |    |    | 7-10
Laboratorio + Reto 3                          |    |    |    | 6-9
Cierre y «Revisa que tu avance quedó guardado»|    |    |    | 7-11
TOTAL caso (primer ▶ a «Caso completado»)     |    |    |    | 70 (límite 105)

ACIERTO AL PRIMER INTENTO POR RETO
Fuente: admin.html → Casos y retos → caso 4.2 → tabla «Retos calificados»,
columnas «Acertaron» y «1.er intento» (elige el grupo PILOTO arriba si aparece el filtro).
Reto 1 · ¿Dónde les fue mejor a las mujeres?  | alumnos: __ | acertaron: __ | 1.er intento: __ %
Reto 2 · Lleva la idea a otro lugar           | alumnos: __ | acertaron: __ | 1.er intento: __ %
Reto 3 · Encuentra el punto de cruce          | alumnos: __ | acertaron: __ | 1.er intento: __ %

CRITERIOS DE ÉXITO
Terminan sin ayuda en ≤ 105 min: __ de __
Justifican con un dato: __ de __
Eventos perdidos (secciones o respuestas que faltan en la ficha; invitados nuevos en Datos): __
Pausas > 2 min registradas: __ (todas: sí/no)

INCIDENCIAS
# | P | Hora | Sección o celda | Qué pasó | Ayuda dada | Gravedad (bloquea/confunde/menor)
1 |   |      |                 |          |            |

CITAS TEXTUALES
P_ : "____"

FRASE FINAL DE DECISIÓN
P1: "____"
P2: "____"
P3: "____"

ENCUESTA (P1 / P2 / P3)
1. Claridad 1-5: __ / __ / __ · dónde menos claro: ____
2. Más perdido: ____
3. Frase y dato: ____
4. Recomendación 1-5: __ / __ / __ · por qué: ____
5. Una cosa a cambiar: ____

CASO 4.1 (opcional): quién lo terminó y observaciones: ____
```

Al terminar el piloto, quita el grupo `PILOTO` a cada participante (ficha → **Grupo: Sin grupo** → **Guardar cambios**) o déjalos si vas a invitarlos a la Generación 1.
