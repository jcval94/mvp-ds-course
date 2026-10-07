# Los helados que causaban devoluciones

<!-- story
concept: correlación, confusión y causalidad
characters: René, Sol, Jacinto, la gerente de comercio
situation: un análisis encuentra que ventas de helado y devoluciones suben al mismo tiempo
bad_logic: tratar una correlación temporal como causa directa sin revisar variables comunes
escalation: se propone retirar helados de las tiendas para reducir devoluciones de otros productos
data_turn: Sol incorpora temperatura, volumen de pedidos y categoría devuelta
chart: Devoluciones según volumen de pedidos en días cálidos
decision: mantener helados y ajustar capacidad logística durante días de alta demanda
punchline: El helado quedó libre; el culpable era julio con demasiados pedidos.
rule: una correlación propone preguntas, pero necesita mecanismo y comparaciones para sostener causalidad
synthetic_data: true
-->

## La curva del cono

> **René:** "Cada vez que vendemos más helado, suben las devoluciones."

> **la gerente de comercio:** "¿Los helados llegan derretidos?"

> **Jacinto:** "Las devoluciones son de ropa y electrónicos."

> **Sol:** "Entonces falta un mecanismo que conecte ambas cosas."

> **René:** "La correlación es de 0.82."

> **Sol:** "Un número alto tampoco empaca televisores."

Las dos líneas subían juntas cada verano y la coincidencia se veía convincente. Sin embargo, las devoluciones pertenecían a productos que nunca habían compartido caja, ruta ni temperatura con un helado.

## Sacar el congelador

> **la gerente de comercio:** "¿Qué pasa si retiramos helados en julio?"

> **Jacinto:** "Perdemos una categoría rentable."

> **René:** "Pero podríamos bajar devoluciones."

> **Sol:** "En julio también suben temperatura y pedidos totales."

> **la gerente de comercio:** "¿Las devoluciones crecen como proporción o solo en cantidad?"

> **Jacinto:** "La tasa sube cuando el almacén rebasa su capacidad diaria."

Sol agregó el volumen diario. Los días cálidos traían más visitas y más órdenes; cuando el almacén cruzaba su límite, aumentaban errores de surtido en varias categorías.

## El tercer dato

> **Sol:** "Separé días por volumen de pedidos y temperatura."

> **René:** "Con el mismo volumen, vender helado no cambia la tasa."

> **Jacinto:** "La barra alta aparece al pasar doce mil pedidos diarios."

> **la gerente de comercio:** "Eso apunta a saturación logística."

> **Sol:** "Y nos da una causa operativa que sí podemos probar."

Al comparar días con carga similar, la presencia de helados dejó de separar resultados. La barra decisiva correspondía a capacidad excedida, una condición que logística podía anticipar y modificar.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Devoluciones según volumen de pedidos en días cálidos">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Devoluciones según volumen de pedidos en días cálidos</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="206" width="184" height="44" fill="#286d9b"/>
  <text x="152" y="196" font-size="17" text-anchor="middle">3 % devolución</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">carga normal</text>
  <rect x="268" y="192" width="184" height="58" fill="#d58b2f"/>
  <text x="360" y="182" font-size="17" text-anchor="middle">4 % devolución</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">alta con capacidad</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">11 % devolución</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">capacidad rebasada</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">La tasa salta al rebasar capacidad, no al vender helado.</text>
</svg>

<!-- learning:pause -->
> **René:** "¿Qué sucede con la relación entre helados y devoluciones cuando comparamos días con el mismo volumen?"

**Lo que muestra:** La correlación original mezcla temporada, temperatura y volumen de pedidos. Con una carga comparable, vender más helado no aumenta la tasa de devolución. El salto ocurre cuando el almacén supera su capacidad diaria, un mecanismo plausible que puede probarse con turnos adicionales.

## Liberar al postre

> **la gerente de comercio:** "Los helados se quedan."

> **Jacinto:** "Aumentaremos turnos cuando el pronóstico rebase capacidad."

> **René:** "Voy a reportar tasas, no solo devoluciones totales."

> **Sol:** "Y separaré correlación observada de explicación causal."

> **la gerente de comercio:** "Probemos la capacidad antes de culpar a una categoría."

> **René:** "Para repetir correlación, confusión y causalidad, ¿qué vamos a comprobar primero?"

> **Sol:** "Vamos a mantener helados y ajustar capacidad logística durante días de alta demanda y a revisar si el efecto se mantiene."

> **René:** "El helado quedó libre; el culpable era julio con demasiados pedidos."

**Regla:** una correlación propone preguntas, pero necesita mecanismo y comparaciones para sostener causalidad.
