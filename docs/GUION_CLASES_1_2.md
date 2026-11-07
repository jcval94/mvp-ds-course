# Guion docente · clases 1 y 2 (Módulo 1 · Datos que mienten)

**Estado:** propuesta del 6 nov 2026 para el autor; clase 1 revisada el 7 nov. Es material docente: vive en `docs/` y no
entra a `dist/`. Aquí no hay claves de retos ni rúbricas (están en el backend privado y en el panel docente). Plan de la
clase: `MODULO_1_EJERCICIOS.md`. Qué caso va en cada clase: `ESTRUCTURA_GENERACION_1.md`.

**Presentación de la clase 1:** «Clase 1 · ¿Qué aviones no volvieron?», en Claude (privada del autor). Tiene 23
diapositivas, una por bloque de este guion, con las notas del docente en cada una y una diapositiva de respaldo con la firma
en papel.

## Antes de la clase 1 (checklist del docente)

| Cuándo | Qué | Dónde |
| --- | --- | --- |
| 2 semanas antes | Calendario del grupo cargado (las 22 clases con su liga de Meet). Sin calendario, la práctica abre todo el banco a la vez | `admin.html` → Clases |
| 2 semanas antes | Esquema 0.15 y SQL de los casos 1.1, 1.4, 1.2 y 13.11 cargados; banco de micro-casos cargado (`sql/practica/microcasos.sql`) | Supabase → SQL Editor |
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

## Clase 2 · sáb 9 ene · «2.4 millones de boletas equivocadas»

Hábitos del día: `faltan` (marco muestral y no respuesta) y `verificar` (unidades, rangos y totales de control).

| Min | Bloque | Qué hace el docente | Qué hace el alumno |
| ---: | --- | --- | --- |
| 0–10 | Recuperación sin notas | `practica/vivo.html` → «5 de lo que ya vio el grupo» (empieza por lo que más le costó al grupo) | Contesta desde el celular |
| 10–55 | **1.2 Literary Digest** en la página | Igual que Wald | Resuelve el caso |
| 55–65 | Descanso | | |
| 65–80 | Encuesta sesgada en vivo y laboratorio de alfabetización | Pregunta al grupo algo cuya respuesta dependa de quién contesta | Laboratorio en el sitio |
| 80–110 | **13.11 Vuelo 143** en la página | Igual que Wald | Resuelve el caso |
| 110–120 | Descanso | | |
| 120–135 | Laboratorio de tipos de variables | Parejas | Laboratorio |
| 135–155 | Transferir | Piezas 3 y 4 de «Mi decisión» | En el sitio |
| 155–180 | Cierre del módulo | Repasa los tres hábitos con la tabla «Cómo va la práctica del grupo» de `practica/vivo.html` | — |

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
