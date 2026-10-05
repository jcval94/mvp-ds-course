# El promedio de entrega que nadie recibió

<!-- story
concept: promedio, mediana y percentiles
characters: Rebeca, Yahir, Inés, el jefe de logística
situation: logística presume una entrega promedio de cinco días mientras crecen los reclamos tardíos
bad_logic: usar el promedio como si describiera la experiencia de todos los pedidos
escalation: se promete una fecha única aunque una cola pequeña espera casi tres semanas
data_turn: Rebeca compara mediana y percentil noventa de los tiempos de entrega
chart: Días de entrega en distintos puntos de la distribución
decision: publicar una promesa por percentil y atacar la cola de entregas tardías
punchline: El cliente promedio recibió un paquete que no existe.
rule: cuando importa la espera extrema, acompaña el promedio con distribución y percentiles
synthetic_data: true
-->

## Cinco días exactos

> **el jefe de logística:** "Bajamos la entrega promedio a cinco días."

> **Inés:** "Entonces, ¿por qué soporte tiene 86 reclamos por demora?"

> **Yahir:** "Son clientes impacientes."

> **Rebeca:** "Algunos llevan diecinueve días esperando."

> **el jefe de logística:** "Diecinueve no puede ser promedio."

> **Rebeca:** "No lo es. Es lo que el promedio está escondiendo."

La cifra de cinco días cabía perfecta en el encabezado del informe. Los reclamos, en cambio, ocupaban una bandeja completa y llegaban con números de guía, cumpleaños perdidos y muebles sin armar.

## La caja del día diecinueve

> **Yahir:** "Podemos responder que la mayoría llega rápido."

> **Inés:** "El cliente con la cuna atorada no compra mayorías."

> **Yahir:** "La mitad llega antes de cuatro días."

> **Rebeca:** "Y uno de cada diez tarda 16 días o más."

> **el jefe de logística:** "¿Qué pasó en esos pedidos?"

> **Inés:** "Cambian de transportista dos veces y pierden un fin de semana."

Rebeca rastreó los pedidos lentos. No eran errores sueltos: compartían cambios de transportista y cortes de fin de semana, dos pasos invisibles dentro de un promedio amable.

## La cola aparece

> **Rebeca:** "Separé el centro de la distribución y su cola."

> **Yahir:** "La barra de 16 días sí se ve fea."

> **Inés:** "Se ve como los correos que contestamos."

> **el jefe de logística:** "Quiero una promesa que incluya a casi todos."

> **Rebeca:** "Entonces usemos el percentil noventa, no solo el promedio."

La gráfica puso tres referencias en la misma escala. La mediana describía el centro; el percentil noventa mostró la experiencia que estaba llenando la cola de soporte.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Días de entrega en distintos puntos de la distribución">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Días de entrega en distintos puntos de la distribución</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="210" width="184" height="40" fill="#286d9b"/>
  <text x="152" y="200" font-size="17" text-anchor="middle">4 días</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">mediana</text>
  <rect x="268" y="200" width="184" height="50" fill="#d58b2f"/>
  <text x="360" y="190" font-size="17" text-anchor="middle">5 días</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">promedio</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">16 días</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">percentil 90</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El promedio no muestra cuánto espera la cola tardía.</text>
</svg>

<!-- learning:pause -->
> **Inés:** "¿Qué número explica mejor por qué siguen llegando reclamos si el promedio es de cinco días?"

**Lo que muestra:** La mediana indica que la mitad de los pedidos llega en cuatro días o menos, pero el percentil noventa muestra una cola de 16 días. Esa cola concentra la mala experiencia. Ninguna medida resume todo: los percentiles permiten ver cuánto espera la parte más afectada.

## Una promesa que sí llega

> **el jefe de logística:** "Publicaremos rango y fecha límite, no cinco días mágicos."

> **Inés:** "También marcaré pedidos que reboten entre transportistas."

> **Yahir:** "¿El promedio se queda?"

> **Rebeca:** "Sí, pero deja de trabajar solo."

> **el jefe de logística:** "La meta será bajar la cola sin empeorar la mediana."

> **Rebeca:** "Para repetir promedio, mediana y percentiles, ¿qué vamos a comprobar primero?"

> **Yahir:** "Vamos a publicar una promesa por percentil y atacar la cola de entregas tardías y a revisar si el efecto se mantiene."

> **Inés:** "El cliente promedio recibió un paquete que no existe."

**Regla:** cuando importa la espera extrema, acompaña el promedio con distribución y percentiles.
