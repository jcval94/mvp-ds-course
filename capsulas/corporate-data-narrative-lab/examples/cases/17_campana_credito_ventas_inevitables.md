# La campaña que vendió lo que ya estaba vendido

<!-- story
concept: impacto incremental y grupo de control
characters: Renata, Diego, Luisa, la jefa
situation: Marketing atribuye diez mil ventas a una campaña enviada a clientes muy propensos
bad_logic: toda compra posterior al mensaje fue causada por el mensaje
escalation: se paga bono por ventas brutas, se satura a clientes y el equipo pide más presupuesto
data_turn: Renata compara tratados con un grupo semejante sin mensaje
chart: barras de conversión tratamiento y control
decision: medir diferencia adicional y limitar saturación
punchline: La campaña convenció a miles de personas que ya venían con la tarjeta en la mano.
rule: ventas después de una campaña no son lo mismo que ventas causadas por la campaña
synthetic_data: true
-->

## Diez mil ventas

> **La jefa:** "La campaña generó diez mil ventas. Quiero el caso de éxito hoy."
>
> **Renata:** "¿Cómo sabemos que las generó?"
>
> **Diego:** "Compraron después de recibir el mensaje."
>
> **Luisa:** "¿A quiénes se lo mandaron?"
>
> **Diego:** "A clientes con alta probabilidad de comprar."
>
> **Renata:** "O sea, a los que ya estaban más cerca."
>
> **Diego:** "Por eso funcionó tan bien."
>
> **Luisa:** "También elegiste a la gente que funciona sin campaña."
>
> **La jefa:** "No nos enredemos. Antes del mensaje no habían comprado y después sí."
>
> **Renata:** "Antes del desayuno tampoco habían comprado."

El bono de Marketing dependía de ventas atribuidas. La regla era sencilla:
mensaje enviado, compra dentro de siete días, crédito para campaña. También era
sencillo mandarle mensajes a quienes ya habían visitado la página de pago.

## Más mensajes, más éxito

> **Diego:** "Si duplicamos envíos, duplicamos oportunidad."
>
> **Luisa:** "Ya reciben cuatro mensajes por semana."
>
> **La jefa:** "Entonces están familiarizados con la marca."
>
> **Renata:** "Dos mil clientes se dieron de baja."
>
> **Diego:** "Eso también prueba que vieron el mensaje."
>
> **Luisa:** "No manches."
>
> **La jefa:** "Necesito una forma justa de medir sin quitarle mérito al equipo."
>
> **Renata:** "Dejemos un grupo parecido sin mensaje y veamos la diferencia."
>
> **Diego:** "¿Y si compran igual?"
>
> **Luisa:** "Esa es exactamente la pregunta que no quieres pagar."
>
> **La jefa:** "¿Cuántos clientes dejamos sin mensaje?"
>
> **Renata:** "Los suficientes para comparar, no para abandonar ventas."
>
> **Diego:** "¿Y si luego reclaman que no recibieron la promoción?"
>
> **Luisa:** "Sería la primera vez que alguien reclama menos mensajes."

## Lo que pasó sin mensaje

> **Renata:** "En el grupo con campaña compró veinte por ciento. En el grupo sin campaña, dieciocho."
>
> **La jefa:** "Entonces sí ayudó."
>
> **Renata:** "Sí. Dos puntos, no veinte."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="Conversión de clientes con campaña y grupo comparable sin campaña">
  <rect width="720" height="300" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Conversión en grupos comparables</text>
  <line x1="90" y1="250" x2="650" y2="250" stroke="#777"/>
  <rect x="180" y="80" width="150" height="170" fill="#2f79a2"/>
  <rect x="410" y="97" width="150" height="153" fill="#8a969f"/>
  <text x="225" y="70" font-size="20">20%</text>
  <text x="455" y="87" font-size="20">18%</text>
  <text x="205" y="278" font-size="14">con campaña</text>
  <text x="435" y="278" font-size="14">sin campaña</text>
  <line x1="335" y1="80" x2="405" y2="97" stroke="#c64e36" stroke-width="3"/>
  <text x="325" y="64" font-size="14" fill="#c64e36">efecto adicional: 2 puntos</text>
</svg>

<!-- learning:pause -->
> **Luisa:** "Si dieciocho de cada cien iban a comprar sin mensaje, ¿cuántas ventas realmente cambió la campaña?"

**Lo que muestra:** La campaña se asocia con veinte por ciento de ventas, pero
dieciocho por ciento ocurría sin ella. La diferencia de dos puntos estima el
impacto adicional. Ese contraste se conoce como incrementalidad.

## El bono aprendió a restar

> **La jefa:** "Medimos ventas adicionales, bajas y saturación. El presupuesto sigue, pero con control."
>
> **Diego:** "El resultado se va a ver más chico."
>
> **Renata:** "El costo también debería verse."
>
> **Luisa:** "La campaña convenció a miles de personas que ya venían con la tarjeta en la mano."

**Regla:** Ventas después de una campaña no son lo mismo que ventas causadas
por la campaña.
