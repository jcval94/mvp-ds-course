# La sucursal con más quejas y más clientes

<!-- story
concept: conteos, tasas y denominadores
characters: Majo, Fabián, Bruno, la directora
situation: la dirección quiere intervenir la sucursal con más quejas del trimestre
bad_logic: comparar conteos sin considerar cuántos pedidos atendió cada sucursal
escalation: se prepara una sanción para el equipo más grande aunque su tasa no sea la peor
data_turn: Majo divide quejas entre pedidos y compara tasas por cada mil operaciones
chart: Quejas por cada mil pedidos
decision: priorizar la sucursal Centro y acompañar el conteo con su denominador
punchline: Norte no tenía más problemas; tenía más clientes haciendo fila para contarlos.
rule: un conteo solo se compara cuando también conocemos el tamaño de la población
synthetic_data: true
-->

## La lista de culpables

> **la directora:** "Norte juntó 240 quejas; mañana voy a poner orden."

> **Majo:** "También atendió veinte mil pedidos."

> **Bruno:** "Pero 240 sigue siendo el número más grande."

> **Fabián:** "Porque es la sucursal más grande."

> **la directora:** "¿Me están diciendo que muchas quejas pueden ser pocas?"

> **Majo:** "Estoy diciendo que falta saber entre cuántos pedidos ocurrieron."

Bruno había ordenado la tabla de mayor a menor y la primera fila parecía sentencia. En el calendario ya figuraba una visita correctiva, aunque nadie había abierto la columna de pedidos.

## Un número sin piso

> **Bruno:** "Podemos visitar las tres y regañar parejo."

> **Fabián:** "Eso sería justo para el calendario, no para el problema."

> **Bruno:** "El correo ya dice que Norte salió en rojo."

> **Majo:** "El color lo puso el conteo bruto."

> **la directora:** "¿Cuál equipo tiene más quejas por el trabajo que recibe?"

> **Majo:** "Centro: 18 por cada mil pedidos; Norte tiene 12."

La discusión cambió cuando Majo escribió los denominadores junto a los conteos. Centro atendía menos, pero acumulaba una queja por cada 56 pedidos; Norte, una por cada 83.

## La misma medida

> **Fabián:** "Entonces Centro se veía chico porque atiende menos volumen."

> **Bruno:** "Y yo ya había reservado la sala de Norte."

> **la directora:** "Cancela la sala y abre la hoja completa."

> **Majo:** "Aquí están las tres tasas con el mismo denominador."

> **Bruno:** "Ahora sí estoy comparando sucursales y no tamaños de sucursal."

Majo proyectó una sola medida para las tres sucursales. La barra más alta cambió de lugar y, con ella, cambió también el destino de la visita del día siguiente.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Quejas por cada mil pedidos">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Quejas por cada mil pedidos</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="143" width="184" height="107" fill="#286d9b"/>
  <text x="152" y="133" font-size="17" text-anchor="middle">12 por mil</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">Norte</text>
  <rect x="268" y="90" width="184" height="160" fill="#d58b2f"/>
  <text x="360" y="80" font-size="17" text-anchor="middle">18 por mil</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">Centro</text>
  <rect x="476" y="117" width="184" height="133" fill="#4c8b63"/>
  <text x="568" y="107" font-size="17" text-anchor="middle">15 por mil</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">Sur</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El volumen cambia el conteo; la tasa permite comparar.</text>
</svg>

<!-- learning:pause -->
> **la directora:** "¿Qué sucursal tiene realmente más quejas en relación con los pedidos que atiende?"

**Lo que muestra:** El conteo bruto señala dónde hay más casos acumulados, pero no permite comparar desempeño entre sucursales de tamaños distintos. Al usar quejas por cada mil pedidos, Centro aparece con la tasa más alta. El denominador cambia la prioridad sin borrar la carga total de Norte.

## Cambiar la visita

> **la directora:** "La visita será en Centro y revisaremos su proceso."

> **Fabián:** "Norte conservará el seguimiento por volumen total."

> **Bruno:** "¿Dejo el conteo en el reporte?"

> **Majo:** "Sí, junto a pedidos y tasa. Los tres cuentan historias distintas."

> **la directora:** "Y ningún color rojo sin explicar qué divide."

> **Majo:** "Sobre conteos, tasas y denominadores, ¿qué dato revisamos en el siguiente corte?"

> **Fabián:** "Primero vamos a priorizar la sucursal Centro y acompañar el conteo con su denominador; luego comparamos el resultado."

> **Bruno:** "Norte no tenía más problemas; tenía más clientes haciendo fila para contarlos."

**Regla:** un conteo solo se compara cuando también conocemos el tamaño de la población.
