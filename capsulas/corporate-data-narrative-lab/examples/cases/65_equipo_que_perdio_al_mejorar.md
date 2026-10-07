# El equipo que perdió al mejorar

<!-- story
concept: segmentación y paradoja de Simpson
characters: Dalia, Óscar, Memo, la vicepresidenta
situation: dos equipos compiten por conversión después de recibir mezclas distintas de clientes
bad_logic: comparar la tasa total sin revisar la dificultad de los segmentos asignados
escalation: se recorta el bono del equipo que mejoró dentro de cada segmento
data_turn: Dalia separa clientes nuevos y recurrentes antes de comparar conversión
chart: Conversión ajustada por mezcla de clientes
decision: comparar dentro de segmentos y revisar la regla de asignación de prospectos
punchline: Perdieron el ranking porque les dieron más oportunidades de perder.
rule: antes de comparar totales, revisa si los grupos recibieron mezclas distintas
synthetic_data: true
-->

## El bono en pausa

> **la vicepresidenta:** "Equipo Azul convirtió 31%; Verde, 27%. El bono es de Azul."

> **Dalia:** "Verde recibió casi todos los clientes nuevos."

> **Memo:** "El tablero no distingue excusas."

> **Óscar:** "Nuevo no es excusa; convierte mucho menos."

> **la vicepresidenta:** "¿Verde mejoró o no?"

> **Dalia:** "Mejoró con nuevos y con recurrentes, pero cambió su mezcla."

El bono ya estaba calculado y el mensaje de felicitación esperaba aprobación. Dalia pidió diez minutos antes de enviarlo porque la columna tipo de cliente se había movido más que la conversión.

## La cartera repartida

> **Memo:** "El total sigue diciendo 27%."

> **Óscar:** "Porque siete de cada diez contactos de Verde eran nuevos."

> **Memo:** "Azul aprovechó lo que le tocó."

> **Dalia:** "A Azul le tocaron ocho de cada diez recurrentes."

> **la vicepresidenta:** "¿Quién repartió las carteras?"

> **Óscar:** "La regla que manda lo difícil al equipo con más capacidad."

La regla de reparto tenía una intención sensata: usar al equipo más experimentado para clientes nuevos. El tablero después trataba esa carga distinta como si hubiera sido idéntica.

## Dos comparaciones

> **Dalia:** "Apliqué la misma mezcla a los dos equipos."

> **Memo:** "Ahora Verde queda en 34% y Azul en 32%."

> **Óscar:** "No cambiaste ventas; cambiaste la comparación."

> **la vicepresidenta:** "Eso sí cambia el bono."

> **Dalia:** "Y obliga a mirar la asignación, no solo el marcador."

Dalia fijó una mezcla común de clientes para ambos equipos. La ventaja agregada de Azul desapareció y quedó expuesta una comparación que premiaba la asignación, no el desempeño.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Conversión ajustada por mezcla de clientes">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Conversión ajustada por mezcla de clientes</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="104" width="184" height="146" fill="#286d9b"/>
  <text x="152" y="94" font-size="17" text-anchor="middle">31 %</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">Azul total</text>
  <rect x="268" y="123" width="184" height="127" fill="#d58b2f"/>
  <text x="360" y="113" font-size="17" text-anchor="middle">27 %</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">Verde total</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">34 %</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">Verde ajustado</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">La mezcla de clientes puede invertir el ranking total.</text>
</svg>

<!-- learning:pause -->
> **la vicepresidenta:** "¿Qué ocurre con el ranking cuando ambos equipos se comparan con la misma mezcla de clientes?"

**Lo que muestra:** La tasa total mezcla desempeño y composición. Verde recibió más clientes nuevos, que convierten menos, aunque superó a Azul dentro de cada segmento. Al estandarizar la mezcla, Verde queda arriba. Esta inversión del resultado agregado es una forma de la paradoja de Simpson.

## Devolver el contexto

> **la vicepresidenta:** "Congelamos el ranking hasta corregir por mezcla."

> **Memo:** "¿Entonces nadie gana esta semana?"

> **Óscar:** "Gana la cartera que deja de fingir igualdad."

> **Dalia:** "Publicaremos tasas por segmento y una tasa ajustada."

> **la vicepresidenta:** "También revisen por qué lo difícil siempre cae del mismo lado."

> **Dalia:** "Después de ajustar segmentación y paradoja de Simpson, ¿qué podría cambiar la decisión?"

> **Óscar:** "Toca comparar dentro de segmentos y revisar la regla de asignación de prospectos; si cambia el dato, volvemos a decidir."

> **Memo:** "Perdieron el ranking porque les dieron más oportunidades de perder."

**Regla:** antes de comparar totales, revisa si los grupos recibieron mezclas distintas.
