# La consulta que trajo toda la tienda

<!-- story
concept: SQL basico con SELECT, WHERE, GROUP BY y ORDER BY
characters: Meli, Sergio, Paula, el gerente
situation: SQL y Datos se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: pedir todos los datos primero y pensar despues es mas rapido
escalation: la consulta devuelve filas innecesarias y una conclusion sin agrupar
data_turn: una persona compara el atajo contra una version verificable
chart: filas consultadas contra respuesta necesaria
decision: seleccionar columnas, filtrar filas, agrupar ventas y ordenar resultados
punchline: La consulta no respondio la pregunta; trajo la tienda completa para que la entrevistaramos.
rule: una consulta basica debe pedir solo las columnas, filas y agrupaciones que responden la pregunta
synthetic_data: true
-->

## Todo por si acaso

> **Meli:** "Hice SELECT estrella para revisar ventas."

> **Sergio:** "Eso trajo columnas que nadie pidio."

> **Paula:** "Mejor tener todo por si acaso."

> **Meli:** "Por si acaso no es una pregunta de negocio."

> **Paula:** "Querian saber productos mas vendidos."

> **el gerente:** "Entonces faltaba filtrar, agrupar y ordenar."

La consulta devuelve filas innecesarias y una conclusion sin agrupar. El ejercicio dejó de ser demostración cuando tuvo que responder una pregunta nueva y el código no sabía dónde buscar el dato.

## La tabla no era la respuesta

> **Paula:** "Abrimos la tabla y buscamos a ojo."

> **Sergio:** "Eso convierte SQL en vitrina."

> **Paula:** "Podemos ordenar en Excel despues."

> **el gerente:** "Despues siempre llega con otro despues."

> **Paula:** "La consulta si corrio."

> **Meli:** "Correr no es responder."

> **Sergio:** "La consulta devuelve filas innecesarias y una conclusion sin agrupar."

> **el gerente:** "Enséñame filas consultadas contra respuesta necesaria antes de cerrar."

El grupo puso filas consultadas contra respuesta necesaria junto al resultado anterior. La comparación mostró qué estructura o regla permitía adaptar la solución sin esconder un caso especial dentro del resultado.

## Cuatro palabras que ordenan la pregunta

> **Meli:** "Compare la consulta completa contra una consulta enfocada."

> **el gerente:** "Cuantas filas necesitabamos leer."

> **Meli:** "Muchas menos cuando la pregunta guia SELECT y WHERE."

> **Sergio:** "Entonces debemos seleccionar columnas, filtrar filas, agrupar ventas y ordenar resultados."

> **Meli:** "Una consulta basica debe pedir solo las columnas, filas y agrupaciones que responden la pregunta."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="filas consultadas contra respuesta necesaria">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">filas consultadas contra respuesta necesaria</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="226" width="174" height="34" fill="#286d9b"/>
  <text x="157" y="216" font-size="18" text-anchor="middle">18</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">todo</text>
  <rect x="272" y="143" width="174" height="117" fill="#d58b2f"/>
  <text x="359" y="133" font-size="18" text-anchor="middle">61</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">filtrado</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">91</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">agrupado</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">Filtrar y agrupar acerca la consulta a la pregunta.</text>
</svg>

<!-- learning:pause -->
> **Sergio:** "Como se conectan SELECT, WHERE, GROUP BY y ORDER BY en una pregunta simple."

**Lo que muestra:** La evidencia muestra que SQL basico no es traer todo. SELECT elige columnas, WHERE filtra filas, GROUP BY resume y ORDER BY ordena la respuesta. La consulta debe parecerse a la decision que quieres tomar.

## La consulta deja de cargar cajas

> **el gerente:** "La pregunta se escribira antes de la consulta."

> **Paula:** "Ya no tendremos todo por si acaso."

> **Meli:** "Y tendremos algo que si contesta."

> **Meli:** "¿Qué cambiaremos después de revisar filas consultadas contra respuesta necesaria?"

> **Sergio:** "La decisión es seleccionar columnas, filtrar filas, agrupar ventas y ordenar resultados."

> **Paula:** "Y volvemos a medir SQL basico con SELECT, WHERE, GROUP BY y ORDER BY antes del siguiente cierre."

> **Sergio:** "La consulta no respondio la pregunta; trajo la tienda completa para que la entrevistaramos."

**Regla:** una consulta basica debe pedir solo las columnas, filas y agrupaciones que responden la pregunta.
