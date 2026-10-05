# La categoría Otros que ya era medio negocio

<!-- story
concept: calidad de datos y taxonomía insuficiente
characters: Nadia, Julián, Fer, la directora
situation: casi la mitad de los reclamos aparece clasificada como Otros
bad_logic: una categoría amplia permite cerrar rápido aunque destruya la explicación
escalation: Otros crece, cada área interpreta algo distinto y se compra una herramienta para analizar etiquetas vacías
data_turn: Nadia lee una muestra de textos dentro de Otros
chart: barras antes y después de reclasificar
decision: corregir captura, taxonomía y responsables antes de modelar
punchline: Compramos inteligencia para descubrir que Otros quería decir no sé.
rule: no modeles una etiqueta que la operación usa para dejar de preguntar
synthetic_data: true
-->

## Cuarenta y siete por ciento

> **La directora:** "¿Cuál es el principal motivo de reclamo?"
>
> **Julián:** "Otros. Cuarenta y siete por ciento."
>
> **Fer:** "¿Otros qué?"
>
> **Julián:** "Pues otros."
>
> **Nadia:** "¿Qué escribe la gente cuando selecciona eso?"
>
> **Julián:** "Texto libre."
>
> **Fer:** "¿Lo leemos?"
>
> **Julián:** "No, porque son como ocho mil comentarios."
>
> **La directora:** "Entonces necesitamos inteligencia artificial."
>
> **Nadia:** "O leer cien antes de comprar nada."

La categoría nació cuando el catálogo tenía cinco opciones y el equipo debía
cerrar llamadas en menos de cuatro minutos. Si el motivo no cabía rápido,
`Otros` evitaba una discusión con el sistema y con la fila de clientes.
También evitaba aprender por qué llamaban.
Cada mes.
Siempre.

## La herramienta nueva

> **La directora:** "El proveedor dice que puede clasificar texto con noventa por ciento de precisión."
>
> **Nadia:** "¿Contra qué etiquetas lo va a validar?"
>
> **Julián:** "Contra las actuales."
>
> **Fer:** "¿Las que dicen Otros?"
>
> **Julián:** "Sí, pero con tecnología."
>
> **Nadia:** "Entonces va a aprender a decir Otros más rápido."
>
> **La directora:** "No seamos negativos. Ya aprobamos la prueba."
>
> **Fer:** "¿Cuánto cuesta?"
>
> **La directora:** "Más que leer cien comentarios."
>
> **Nadia:** "¿Y quién va a revisar si las categorías que invente tienen sentido?"
>
> **Julián:** "Operación."
>
> **Fer:** "¿La misma Operación que usa Otros porque no tiene tiempo?"
>
> **La directora:** "Con la herramienta van a tener mejores Otros."

Nadia tomó una muestra. En menos de una hora encontró cobros duplicados,
cancelaciones no aplicadas, fallas de entrega y asesores que elegían `Otros`
porque la opción correcta estaba en otra pantalla.

## Lo que había adentro

> **Nadia:** "Reclasifiqué quinientos comentarios con Operación."
>
> **La directora:** "¿Otros sigue siendo el motivo principal?"
>
> **Nadia:** "No. Era una bolsa con cuatro problemas grandes."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Motivos de reclamo antes y después de reclasificar la categoría Otros">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Motivos de reclamo</text>
  <text x="60" y="67" font-size="14">Antes</text>
  <rect x="135" y="50" width="420" height="32" fill="#7c8790"/><text x="565" y="71" font-size="14">Otros 47%</text>
  <text x="60" y="125" font-size="14">Después</text>
  <rect x="135" y="108" width="190" height="28" fill="#c64e36"/><text x="335" y="128" font-size="13">cobro duplicado 21%</text>
  <rect x="135" y="145" width="150" height="28" fill="#d58b30"/><text x="295" y="165" font-size="13">cancelación 17%</text>
  <rect x="135" y="182" width="125" height="28" fill="#2f79a2"/><text x="270" y="202" font-size="13">entrega 14%</text>
  <rect x="135" y="219" width="100" height="28" fill="#4c8b63"/><text x="245" y="239" font-size="13">acceso 11%</text>
  <rect x="135" y="256" width="72" height="28" fill="#7c8790"/><text x="217" y="276" font-size="13">Otros 8%</text>
</svg>

<!-- learning:pause -->
> **Fer:** "Antes de entrenar un modelo, ¿no tendríamos que arreglar qué significa cada opción y por qué la gente usa Otros?"

**Lo que muestra:** La etiqueta no describía un fenómeno; escondía problemas
distintos y una captura incómoda. Primero se mejora la taxonomía, la interfaz y
el responsable de mantenerlas. Es un problema de calidad de datos.

## La prueba cambió de objetivo

> **La directora:** "La prueba ahora ayuda a sugerir categorías nuevas, pero una persona valida."
>
> **Julián:** "¿Y qué hacemos con Otros?"
>
> **Nadia:** "Lo dejamos para lo raro, no para lo que da flojera buscar."
>
> **Fer:** "Compramos inteligencia para descubrir que Otros quería decir no sé."

**Regla:** No modeles una etiqueta que la operación usa para dejar de preguntar.
