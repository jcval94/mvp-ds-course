# Tableros de seguimiento

La pestaña **Tableros** existe en `docente.html` y `admin.html`. Usa la sesión,
los grupos autorizados y los tokens visuales del portal. No añade dependencias
de gráficos ni guarda datos del alumno en almacenamiento local.

## Vistas

- **Clase en vivo:** elegir una clase del calendario con caso asignado. La
  población es la lista de alumnos del grupo; no es un registro de asistencia.
  La ventana empieza en el horario de la clase y termina al acabar su duración
  o en el momento actual, lo que ocurra primero.
- **Historial:** actividad de los últimos 14, 30 o 90 días, filtrada por grupo y
  caso. Matriz de actividades y actividad diaria en hora de Ciudad de México.
- **Ficha del periodo:** seleccionar una celda o alumno muestra respuestas,
  intentos y hasta 100 eventos recientes del periodo. La ficha completa y la
  conversación siguen disponibles desde ahí.

La matriz distingue visita registrada, intento, acierto y entrega. Ninguna
visita ni cantidad de bits se convierte en una medida de dominio.

## Medidas

| Medida | Numerador | Denominador |
| --- | --- | --- |
| Participación | Alumnos con eventos, respuestas o intentos en la ventana | Alumnos del grupo/filtro |
| Casos entregados | Alumnos con evento de entrega de todos los casos seleccionados en la ventana | Alumnos del grupo/filtro |
| Acierto al primer intento | Primeros intentos acertados recibidos en la ventana | Primeros intentos evaluables recibidos en la ventana |
| Distribución de respuestas | Alumnos cuya última respuesta coincide con la opción mostrada | Alumnos del grupo/filtro |
| Actividad diaria | Alumnos distintos con actividad en el día | Alumnos del grupo/filtro |

El primer intento es por alumno y reto, no por ejecución del navegador ni por
clase. Un reto cuyo primer intento ocurrió antes del periodo no vuelve a ser
«primer intento». Sin observaciones evaluables se muestra `—`.

Las señales de atención son mensajes sin leer y retos con tres o más intentos
en la ventana sin ningún acierto en esa misma ventana. Son señales para revisar,
no diagnósticos. Los mensajes sin leer pueden ser anteriores a la clase y se
consideran hasta el final del periodo elegido.

## Actualización y estados

El tablero actualiza la actividad cada 30 segundos cuando está visible, el
documento tiene foco visual, no hay diálogos abiertos y el refresco está marcado.
También ofrece actualización manual. Cambiar de filtros invalida respuestas
anteriores en vuelo. Salir de la sesión limpia el tablero.

El modo de proyección retira los nombres, la matriz y la atención individual;
solo presenta conteos agregados. No convierte esta pantalla en un enlace público.

Si falla la lectura principal se retiran los datos; si la evaluación o los mensajes
no están disponibles se indica esa limitación. Los fallos no se presentan como
ceros. Una clase futura o sin caso muestra un estado explícito.

La ventana usa la hora de recepción del servidor. Los envíos recibidos después de
una desconexión pueden quedar fuera de la clase. El tablero no mide tiempo activo,
asistencia a Meet, atención ni dominio conceptual.

## Verificación y entrega

`harness/tests/test_tableros.py` prueba ambas páginas, escritorio/móvil, filtros,
evidencia individual, proyección, estados de error, respuestas tardías de red,
pausa del refresco y accesibilidad. Los datos de prueba son completamente ficticios.
Las capturas se guardan en `output/qa/`, ignorado por Git.

Esta integración incluye un componente servidor complementario, mantenido y
documentado en el repositorio privado. Activarlo antes de publicar el portal.
El frontend degrada explícitamente si aún no está disponible.

El alcance siguiente recomendado es validar el tablero con una clase piloto y
etiquetar preguntas por objetivo de aprendizaje antes de añadir dominio por concepto.
