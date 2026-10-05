# Una alerta para cada cliente

<!-- story
concept: umbrales, costos de error y capacidad operativa
characters: Ema, Roque, Pilar, la jefa de cobranza
situation: cobranza baja el umbral de riesgo hasta llenar la cola con casi toda la cartera
bad_logic: maximizar detección sin considerar falsos positivos ni capacidad de contacto
escalation: agentes llaman a clientes puntuales mientras los casos de mayor riesgo esperan
data_turn: Ema compara recuperación y volumen de contactos en tres umbrales
chart: Recuperación esperada y contactos diarios por umbral
decision: usar un umbral compatible con capacidad y reservar revisión para la zona incierta
punchline: La alerta era tan inclusiva que también quiso cobrarle al equipo de cobranza.
rule: elige el umbral con costos, beneficios y capacidad, no con una métrica aislada
synthetic_data: true
-->

## Nadie se escapa

> **la jefa de cobranza:** "El modelo ya marca 92% de la cartera."

> **Ema:** "¿Cuántos contactos podemos hacer hoy?"

> **Pilar:** "Mil doscientos; la cola tiene nueve mil."

> **Roque:** "Bajé el umbral para no perder morosos."

> **la jefa de cobranza:** "¿Y a quién llaman primero?"

> **Pilar:** "A quien entró primero, aunque su riesgo sea bajo."

La búsqueda de mayor detección había convertido una lista de prioridad en un padrón casi completo. El equipo trabajaba por antigüedad de entrada porque ya no podía distinguir urgencia dentro de la cola.

## La cola de ocho días

> **Roque:** "Podemos contratar otro turno."

> **Pilar:** "Aun así tardaríamos seis días en vaciar la cola."

> **Ema:** "Para entonces el score y el saldo ya cambiaron."

> **la jefa de cobranza:** "¿Qué umbral produce una lista que sí podamos trabajar?"

> **Roque:** "El de 0.74 genera mil cien contactos diarios."

> **Pilar:** "Y concentra 68% de la recuperación esperada."

Cada contacto tenía un costo y una consecuencia. Llamar a alguien que ya había pagado ocupaba minutos, generaba molestia y retrasaba cuentas donde una intervención temprana sí podía recuperar saldo.

## Tres puntos de corte

> **Ema:** "Comparé tres cortes con la misma capacidad y costo de llamada."

> **Roque:** "El umbral bajo detecta más, pero manda siete mil ochocientos casos extra."

> **Pilar:** "El intermedio cabe en el turno y mantiene los saldos grandes."

> **la jefa de cobranza:** "Entonces ese será el punto inicial."

> **Ema:** "La franja cercana al corte tendrá revisión y seguimiento semanal."

La comparación dejó de preguntar qué umbral detectaba más casos en abstracto. Puso sobre la mesa cuántas llamadas cabían, cuánto saldo esperaba recuperarse y qué reclamos podía provocar cada corte.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Recuperación esperada y contactos diarios por umbral">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Recuperación esperada y contactos diarios por umbral</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="90" width="184" height="160" fill="#286d9b"/>
  <text x="152" y="80" font-size="17" text-anchor="middle">9000 contactos</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">umbral bajo</text>
  <rect x="268" y="230" width="184" height="20" fill="#d58b2f"/>
  <text x="360" y="220" font-size="17" text-anchor="middle">1100 contactos</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">umbral 0.74</text>
  <rect x="476" y="229" width="184" height="21" fill="#4c8b63"/>
  <text x="568" y="219" font-size="17" text-anchor="middle">1200 contactos</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">capacidad diaria</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El umbral útil produce una cola que la operación puede atender.</text>
</svg>

<!-- learning:pause -->
> **Roque:** "¿Qué punto de corte concentra recuperación sin enviar más casos de los que el equipo puede atender?"

**Lo que muestra:** El umbral más bajo eleva cobertura, pero crea una cola imposible. El corte de 0.74 genera cerca de 1,100 contactos diarios, dentro de la capacidad de 1,200, y conserva 68% de la recuperación esperada. El umbral es una decisión operativa, no una propiedad fija del modelo.

## Prioridad que cabe

> **la jefa de cobranza:** "Ordenaremos por valor esperado dentro de la capacidad."

> **Pilar:** "Los clientes con pago vigente saldrán de la cola."

> **Roque:** "Monitorearé recuperación, reclamos y contactos inútiles."

> **Ema:** "El umbral podrá cambiar si cambia la capacidad."

> **la jefa de cobranza:** "Un score sirve cuando termina en una acción posible."

> **Ema:** "Sobre umbrales, costos de error y capacidad operativa, ¿qué dato revisamos en el siguiente corte?"

> **Roque:** "Primero vamos a usar un umbral compatible con capacidad y reservar revisión para la zona incierta; luego comparamos el resultado."

> **Pilar:** "La alerta era tan inclusiva que también quiso cobrarle al equipo de cobranza."

**Regla:** elige el umbral con costos, beneficios y capacidad, no con una métrica aislada.
