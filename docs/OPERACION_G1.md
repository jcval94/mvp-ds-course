# Operación de la Generación 1 · plataforma y datos

**Estado:** respuestas del bloque D del cuaderno de preguntas, delegadas por el autor el 1 de noviembre de 2026 («respóndelo
y documéntalo»). Son la referencia operativa hasta que el autor cambie algo. Las reglas de la oferta viven en
`docs/DECISIONES_GENERACION_1.md`; qué caso va en cada clase, en `docs/ESTRUCTURA_GENERACION_1.md`.

## D1 · Lo mínimo que debe funcionar el 8 de enero

| Pieza | Estado al 1 nov 2026 | Qué falta |
| --- | --- | --- |
| Sitio, términos y aviso de privacidad | Listo y publicado | — |
| Inscripción y cobro (pago único, meses sin intereses, 3 pagos, código de recomendación) | Código fusionado | El autor corre el instalador (base 0.13), vuelve a desplegar la función de inscripción, activa meses sin intereses en Stripe y hace la prueba de punta a punta en modo de prueba; después, llaves reales |
| Alta automática del alumno y bienvenida | Código listo | Correo configurado desde augmentedlearninglabs@gmail.com (`correo/README.md` del backend) |
| Recordatorios Sesión 0 y víspera | Botones en admin.html | Mandarlos el 1 y el 7 de enero |
| Mi avance (clases, bits, Top 5, mensajes, TDD_CLAVE) | Listo | Liga de Meet recurrente cargada en admin.html → Clases |
| Cuadernos de Colab con registro de avance | Listos los casos 1.1, 4.1 y 4.2 | **Faltan los cuadernos e intros de las demás clases**, empezando por la clase 2 (1.2 Literary Digest y E48 Gimli). Es el pendiente más grande |
| Panel docente y de administración | Listo | — |
| Ensayo en seco y piloto (`docs/PILOTO_G1.md`) | Pendiente | Ensayo en seco y piloto con 2 o 3 personas antes del 8 de noviembre |

Orden de prioridad hasta el inicio: (1) que se pueda cobrar, (2) clase 1 y clase 2 completas, (3) un caso por clase
de las semanas 2 a 4, (4) el resto antes de cada semana, al menos una semana antes de cada clase.

## D2 · Lo que ve el alumno el día 1 en Mi avance

Orden aprobado el 13 nov 2026 (tablero u05; inventario en `docs/revisiones/MI_AVANCE_CARGA.md`). La pregunta guía es «¿qué hago ahora?».

1. Saludo con un anillo pequeño de avance; el resumen (casos entregados, próxima entrega, última actividad) va plegado.
2. **Aviso de pagos**, solo si hay algo que hacer (cobro fallido o acceso en pausa).
3. **Qué sigue**: el caso que toca, con su botón («Empezar el caso» lleva a la intro; «Continuar el caso», a donde se resuelve). El día de clase, también la liga de Meet.
4. Mensajes nuevos del profesor, si los hay.
5. **Próxima clase**: título, hora, cuenta regresiva, Meet y un enlace a la pestaña Clases grabadas.
6. **Acceso a Colab** abierto la semana previa a la clase 5 y durante ella; antes no aparece y después queda plegado al final.
7. **Casos**: tarjetas compactas (estado, barra, avance y una acción principal; secciones y respuestas plegadas, salvo la respuesta con comentario más reciente). Filtros solo desde 6 casos.
8. **Práctica**, solo cuando hay micro-casos abiertos.
9. **Bits y Top 5**, abiertos. Con 0 bits, una línea que explica cómo ganar el primero. El alias se cambia en un desplegable.
10. Plegados al final: pagos al corriente y código de recomendación, y «¿No ves tu avance?» (sus viñetas de Colab solo desde que Colab aparece).

ID, grupo y correo viven en el menú **Mi cuenta**. Regla: el día 1 nada pide más de un clic para llegar a la clase y al caso de hoy.

## D3 · Las preguntas que el docente contesta en 10 segundos

| Pregunta | Dónde |
| --- | --- |
| ¿Quién no ha abierto el cuaderno de hoy? | Panel → Atención |
| ¿Quién lleva dos clases sin actividad? | Panel → Actividad · últimos 14 días y Atención |
| ¿Qué respuestas abiertas faltan por calificar? | Por calificar |
| ¿Qué reto falló la mayoría? (señal para repasarlo en clase) | Casos y retos |
| ¿Quién tiene un pago vencido o el acceso en pausa? | Inscripciones |
| ¿Quién me escribió? | Mensajes |

Ritual sugerido: abrir Atención 15 minutos antes de cada clase y dedicar la sección de dudas a los dos retos más fallados.

## D4 · Datos personales

Se guarda solo lo que el aviso de privacidad (`site/aviso-privacidad.html`) ya declara: identificación y contacto,
avance académico y bits, alias, mensajes, inscripción y pagos (los datos de tarjeta los tiene Stripe), origen de la
visita y grabaciones de clase.

- Avance, respuestas y calificaciones: mientras haya acceso y hasta dos años después, para aclaraciones.
- Grabaciones: 12 meses desde cada clase.
- Pagos: lo que pida la ley fiscal.
- El repositorio público nunca guarda datos de alumnos; las exportaciones de calificación viven en el Drive del autor.

## D5 · Top 5 y bandas

- El Top 5 muestra el **alias** de cada alumno, nunca su nombre. Por omisión es un alias de ciudad con número.
- Quien no quiera aparecer con algo reconocible deja ese alias por omisión.
- Las bandas (Top 20 %, Top 50 %, En camino) solo las ve cada alumno sobre sí mismo.
- Se recalcula cada vez que se abre Mi avance (no hace falta tiempo real).
- Desde que la calificación son los bits, el Top 5 se presenta como avance del grupo, no como ranking de calificación.

## D6 · Al terminar el curso

| Qué | Cuánto dura |
| --- | --- |
| Grabaciones | 12 meses desde cada clase |
| Augmented Studio (niveles de pago) | 12 meses incluidos con el curso |
| Mi avance, bits y cuadernos | Siguen disponibles mientras haya acceso; los cuadernos son del alumno en su Drive |
| Proyecto final | Vive en el GitHub del alumno; es lo que se lleva al CV |
| Constancia | Se emite con el proyecto final entregado |

## D7 · Plan B si algo falla en plena clase

| Falla | Qué hacer |
| --- | --- |
| Supabase o el registro de avance | El cuaderno sigue funcionando sin guardar; el alumno vuelve a ejecutar la celda de registro después. Nadie pierde bits: el registro admite reintentos sin duplicar |
| Colab | Trabajar el caso en papel o en la pizarra de Meet (cada caso tiene su versión a mano) y dejar el cuaderno como tarea |
| Meet | Tener lista una segunda reunión de Meet y avisar la liga por Mi avance (aviso al grupo) y por correo; si la falla dura más de 15 minutos, ese tiempo se repone al final del curso |
| Internet del profesor | Avisar por Mi avance y correo; la clase se repone |
| La IA (Codex o Claude) no responde | Seguir con el criterio del caso, que nunca depende de la IA para la decisión |

## D8 · Encargos para la otra IA

Cada encargo trae su criterio de «terminado». Se trabaja en una rama y PR, nunca en `main`.

1. **Cuaderno e intro del caso 1.2 (Literary Digest) y E48 (Gimli) para la clase 2.** Terminado: las skills `tads-*`
   aplicadas, `python -m harness all` en verde, retos con respuesta inmediata y el caso registrado en el instalador.
2. **Revisión de fuentes de los 7 candidatos latinoamericanos** (`casos/staging/`). Terminado: cada incertidumbre de la
   lista cerrada con una fuente o pasada a mito, y el caso propuesto como `verified` en un PR.
3. **Ensayo en seco del piloto** con una cuenta de prueba, siguiendo `docs/PILOTO_G1.md`. Terminado: las 20 casillas
   marcadas o cada falla anotada con captura, devuelta por chat (no en el repo).
