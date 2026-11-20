# Guion docente · clases 1 y 2 (Módulo 1 · Datos que mienten)

**Estado:** propuesta del 6 nov 2026 para el autor; clase 1 revisada el 7 nov y clase 2 el 19 nov. Es material docente: vive en `docs/` y no
entra a `dist/`. Aquí no hay claves de retos ni rúbricas (están en el backend privado y en el panel docente). Plan de la
clase: `MODULO_1_EJERCICIOS.md`. Qué caso va en cada clase: `ESTRUCTURA_GENERACION_1.md`.

**Presentación de la clase 1:** «Clase 1 · ¿Qué aviones no volvieron?», en Claude (privada del autor). Tiene 23
diapositivas, una por bloque de este guion, con las notas del docente en cada una y una diapositiva de respaldo con la firma
en papel.

## Antes de la clase 1 (checklist del docente)

| Cuándo | Qué | Dónde |
| --- | --- | --- |
| 2 semanas antes | Calendario del grupo cargado (las 22 clases con su liga de Meet). Sin calendario, la práctica abre todo el banco a la vez | `admin.html` → Clases |
| 2 semanas antes | Esquema 0.16 y SQL de los casos 1.1, 1.4, 1.2 y 13.11 cargados; banco de micro-casos cargado (`sql/practica/microcasos.sql`) | Supabase → SQL Editor |
| 1 semana antes | Recordatorio a los inscritos: Sesión 0 (`instalacion.html`) y entrar una vez a Mi avance con su Gmail | Correo o Mi avance → Mensajes |
| 1 día antes | Recorrer 1.1 y 1.4 de punta a punta con una cuenta de prueba en el celular y en la laptop | `casos/1-1/`, `casos/1-4/` |
| 1 día antes | Abrir `practica/vivo.html`, elegir el grupo y probar «Calentamiento de la clase 1» con una cuenta de alumno | `practica/vivo.html` |
| 30 min antes | Dos pestañas listas: `practica/vivo.html` (proyector) y el panel docente (avance por sección) | — |

## Clase 1 · vie 8 ene · «¿Qué aviones no volvieron?» (180 min con dos descansos de 10)

Hábitos del día: `faltan` (¿qué falta en mis datos?) y `mide` (¿qué mide este número?).

| Min | Bloque | Qué hace el docente | Qué hace el alumno | Si algo falla |
| ---: | --- | --- | --- | --- |
| 0–20 | Bienvenida | Presenta el curso: criterio antes que herramienta, y Delegar · Verificar · Firmar. Pide que todos entren a Mi avance con su Gmail y escriban «listo» en el chat; resuelve quién no puede (el aviso dice con qué correo entró) | Entra a Mi avance. Escribe en papel o en sus notas la decisión real que seguirá en «Mi decisión»: el sitio no tiene un campo aparte, cada caso cierra con una pieza sobre esa decisión | Si alguien entró con otro Gmail, ve «SIN INSCRIPCION · NO CUENTA» en el caso. Como invitado («SIN GUARDAR · PRUEBA») el caso no guarda nada ni califica retos: que trabaje en pareja con alguien hasta corregirlo en el descanso |
| 20–25 | Calentamiento: los gatos que caen | `practica/vivo.html` → «Calentamiento de la clase 1». Proyecta, espera a que voten, revela | Contesta en `learninglabs.pages.dev/practica` (o a mano alzada) | Sin celulares: votación a mano alzada; el botón REVELAR funciona igual |
| 25–70 | **1.1 Wald** en la página | Abre la intro proyectada (1 min) y deja que cada quien entre al caso. Camina el panel docente: quién está en qué sección. No da respuestas; cuando varios se atoran en el mismo reto, hace una pregunta en voz alta | Resuelve el caso: apuesta, registro, error del asistente, lo que no llegó, verificación, firma, revelación | Si la página no carga a alguien, que siga en otra laptop o en parejas; lo registrado no se pierde (la cola guarda y reintenta) |
| 70–80 | Descanso | | | |
| 80–105 | **1.4 Puerto Rico** en la página | Lee el aviso de contenido antes de abrir la intro. Mismo modo que Wald | Resuelve el caso | Si no alcanza el tiempo, 1.4 pasa a la tarea de la semana (el mínimo de la clase es Wald) |
| 105–120 | Laboratorio de calidad de datos | Forma parejas | Laboratorio en el sitio | — |
| 120–130 | Descanso | | | |
| 130–145 | Transferir | Pregunta: «¿qué falta en los datos de tu trabajo?» y «¿qué tiene que pasar para que algo cuente?». Dos o tres voluntarios | Comparte las piezas 1 y 2 de «Mi decisión», que escribió al cerrar 1.1 y 1.4; quien no llegó a un cierre la escribe ahí | Si la discusión se seca, usa la taquería de cada caso |
| 145–160 | Primera práctica en vivo | `practica/vivo.html` → ELEGIR MICRO-CASOS, filtro «Clase 1», marcar 5 y EMPEZAR CON LOS ELEGIDOS («5 de lo que ya vio el grupo» solo toma micro-casos de clases anteriores: en la clase 1 responde «No hay micro-casos para esta ronda») | Contesta desde el celular | Mano alzada |
| 160–180 | Cierre | Las frases del día (el criterio en una frase de cada caso). Tarea: 3 sesiones de práctica antes del viernes y lo que no cupo | — | — |

## Antes de la clase 2

| Cuándo | Qué | Dónde |
| --- | --- | --- |
| Vie, al terminar la clase 1 | Quién no terminó Wald: le toca como tarea antes de la clase 2, porque 1.2 lo da por visto | Panel docente → avance por sección |
| Vie en la noche | Recorrer 1.2 y 13.11 de punta a punta con la cuenta de prueba, en el celular y en la laptop | `casos/1-2/`, `casos/13-11/` |
| 30 min antes | Las mismas dos pestañas de la clase 1 (`practica/vivo.html` en el proyector y el panel docente) y el chat de Meet abierto para la encuesta en vivo | — |

## Clase 2 · sáb 9 ene · «2.4 millones de boletas equivocadas» (180 min con dos descansos de 10)

Hábitos del día: `faltan` (quién no aparece en la lista y quién no contestó) y `verificar` (unidades, rangos y totales de
control). Los dos casos son de datos reales; 13.11 no tuvo muertos y no lleva aviso de contenido.

| Min | Bloque | Qué hace el docente | Qué hace el alumno | Si algo falla |
| ---: | --- | --- | --- | --- |
| 0–15 | Entrada y recuperación sin notas | Mientras entran, revisa en el chat quién no pudo entrar a Mi avance el viernes. `practica/vivo.html` → «5 de lo que ya vio el grupo»: toma micro-casos de la clase 1 y empieza por lo que más le costó al grupo | Contesta desde el celular, sin notas | Mano alzada. Quien sigue sin cuenta trabaja en pareja, igual que en la clase 1 |
| 15–60 | **1.2 Literary Digest** en la página (~42 min) | Proyecta la intro (1 min) y deja que cada quien entre al caso. Camina el panel docente. El reto 3 (★★★, lo que haría falta entre los que no contestaron) es un cálculo hipotético: si varios se atoran, pregunta en voz alta «¿cuántos no contestaron?» y no da la cuenta | Resuelve el caso: apuesta, conteo y error del asistente, los que no contestaron, la otra encuesta, verificación, firma, revelación y laboratorio | Si no alcanza el tiempo, el laboratorio de la sección 9 y el cierre pasan a la tarea; la firma y la revelación se hacen en clase. El mínimo de la clase es 1.2 |
| 60–70 | Descanso | | | |
| 70–85 | Encuesta sesgada en vivo | En el chat de Meet: «Contesta solo si te gusta contestar encuestas: ¿cuántas contestaste este mes?». Saca el promedio en voz alta y pregunta: «¿esto describe al grupo?», «¿quién no está en esta cuenta?» y «¿qué pasaría si fuéramos 2 millones?». Cierra con la frase de 1.2: más respuestas no corrigen quién llega a tu tabla | Contesta (o no) y discute. Quien quiera repasa después el laboratorio de alfabetización, que es opcional y no cuenta para la calificación | Si el chat no responde, la misma pregunta a mano alzada |
| 85–120 | **13.11 Vuelo 143** en la página (~30 min) | Proyecta la intro (40 s). Mismo modo que Wald. Si preguntan qué es una densidad, devuelve la pregunta: «¿qué unidad tiene cada número de la hoja?» | Resuelve el caso: apuesta, las cuentas, el visto bueno del asistente, lo que pesa de verdad, antes de despegar, revelación | Si no alcanza el tiempo, 13.11 pasa a la tarea de la semana |
| 120–130 | Descanso | | | |
| 130–145 | Laboratorio de tipos de variables | Forma parejas | Laboratorio en el sitio (`labs/level-1/tipos-variables.html`) | Si ya terminaron, que comparen su firma de 13.11 con la de su pareja |
| 145–160 | Transferir | Pregunta: «¿qué es una fila en los datos de tu trabajo y quién no aparece?» y «¿qué número de tu trabajo viene en otra unidad o formato?». Dos o tres voluntarios | Comparte las piezas 3 y 4 de «Mi decisión», que escribió al cerrar 1.2 y 13.11; quien no llegó a un cierre la escribe ahí | Si la discusión se seca, usa la taquería de cada caso |
| 160–170 | Práctica en vivo | `practica/vivo.html` → ELEGIR MICRO-CASOS, filtro «Clase 2», marcar 5 y EMPEZAR CON LOS ELEGIDOS (hay unos 15 de la clase 2, dos tercios de `verificar`) | Contesta desde el celular | Mano alzada |
| 170–180 | Cierre del Módulo 1 | Repasa los tres hábitos (`faltan`, `mide` y `verificar`) con la tabla «Cómo va la práctica del grupo» y lee las frases del día. Tarea: 3 sesiones de práctica antes del viernes y lo que no cupo de 1.2 o 13.11 | — | — |

## Plan sin internet (si se cae la conexión del grupo)

- Los casos guardan lo registrado en el navegador y lo suben cuando vuelve la red; nadie pierde su avance.
- Si nadie tiene red: el docente proyecta desde su laptop (con su propia conexión) la intro y el expediente, y el grupo
  trabaja la apuesta y la firma en papel. El diseño de cada caso (`docs/casos-pagina/`, sin claves) trae el expediente y el
  formato de la firma para imprimirlos antes.
- La ronda en vivo funciona con votación a mano alzada aunque los alumnos no tengan red: basta la conexión del docente.

## Después de cada clase

- Panel docente: quién no terminó el caso principal (va a la tarea) y qué respuestas abiertas calificar.
- `practica/vivo.html` → «Cómo va la práctica del grupo»: los micro-casos con menor acierto a la primera son los temas de
  la sesión de dudas.
