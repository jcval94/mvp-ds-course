# La sucursal campeona por cuatro respuestas

<!-- story
concept: incertidumbre, tamaño de muestra e intervalos
characters: Fero, Itzel, Pau, el gerente de zona
situation: un ranking de satisfacción coloca primero a una sucursal con cuatro encuestas
bad_logic: ordenar porcentajes puntuales sin mostrar cuánta información sostiene cada uno
escalation: se planea copiar el proceso de la supuesta campeona en 40 sucursales
data_turn: Itzel muestra tamaños de muestra e intervalos de confianza
chart: Satisfacción y tamaño de muestra por sucursal
decision: esperar más respuestas y mostrar incertidumbre antes de declarar una ganadora
punchline: La sucursal campeona cabía completa en un taxi.
rule: un porcentaje sin tamaño de muestra ni incertidumbre puede convertir azar en ranking
synthetic_data: true
-->

## Cien por ciento

> **el gerente de zona:** "La sucursal Lago obtuvo 100% de satisfacción."

> **Itzel:** "Respondieron cuatro personas."

> **Fero:** "Y las cuatro quedaron satisfechas."

> **Pau:** "En Centro respondieron 380 y quedó en 91%."

> **el gerente de zona:** "Cien sigue siendo mayor que 91."

> **Itzel:** "El punto es mayor; la certeza es muchísimo menor."

El ranking tenía dos decimales y una copa dorada junto al primer lugar. Nada en la vista indicaba que aquella precisión descansaba sobre cuatro respuestas obtenidas durante una jornada incompleta.

## Cuatro personas

> **Fero:** "Podemos copiar el guion de Lago en toda la zona."

> **Pau:** "Lago atendió una falla de internet y cerró temprano."

> **Fero:** "Eso vuelve más admirable el cien."

> **Itzel:** "También vuelve rara la muestra de ese día."

> **el gerente de zona:** "¿Qué tan lejos podría estar el resultado real?"

> **Itzel:** "Con cuatro respuestas, el intervalo es tan ancho que no ordena nada."

Copiar el proceso de Lago requería capacitación, materiales y cambios de turno en 40 sucursales. El costo de actuar ya estaba definido; la evidencia para hacerlo cabía en cuatro formularios.

## La barra con margen

> **Itzel:** "Puse porcentaje, número de respuestas y margen de incertidumbre."

> **Fero:** "Lago ya no aparece claramente arriba."

> **Pau:** "Centro tiene un rango mucho más estrecho."

> **el gerente de zona:** "Entonces el ranking está fingiendo precisión."

> **Itzel:** "Sí. Podemos observar Lago, pero todavía no llamarla campeona."

Los intervalos transformaron puntos exactos en rangos honestos. Lago podía ser excelente, promedio o algo intermedio; la muestra disponible todavía no permitía distinguir esas posibilidades.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Satisfacción y tamaño de muestra por sucursal">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Satisfacción y tamaño de muestra por sucursal</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="248" width="184" height="2" fill="#286d9b"/>
  <text x="152" y="238" font-size="17" text-anchor="middle">4 </text>
  <text x="152" y="278" font-size="12" text-anchor="middle">Lago respuestas</text>
  <rect x="268" y="212" width="184" height="38" fill="#d58b2f"/>
  <text x="360" y="202" font-size="17" text-anchor="middle">91 </text>
  <text x="360" y="278" font-size="12" text-anchor="middle">Centro satisfecho</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">380 </text>
  <text x="568" y="278" font-size="12" text-anchor="middle">Centro respuestas</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El porcentaje necesita mostrar cuántas respuestas lo sostienen.</text>
</svg>

<!-- learning:pause -->
> **Fero:** "¿Podemos afirmar que Lago supera a Centro cuando vemos el tamaño de sus muestras?"

**Lo que muestra:** Cuatro respuestas positivas producen 100%, pero dejan mucha incertidumbre sobre la satisfacción real. Centro tiene 380 respuestas y un estimado más estable. Los intervalos se superponen ampliamente, así que no hay base para ordenar ambas sucursales como si la diferencia fuera segura.

## Posponer la medalla

> **el gerente de zona:** "Esperaremos una base mínima antes de entregar bonos."

> **Pau:** "También separaremos días con cierre parcial."

> **Fero:** "¿Dejo Lago en el reporte?"

> **Itzel:** "Déjala con su muestra y su intervalo visibles."

> **el gerente de zona:** "Sin medalla hasta que haya suficiente gente."

> **Fero:** "Después de ajustar incertidumbre, tamaño de muestra e intervalos, ¿qué podría cambiar la decisión?"

> **Itzel:** "Toca esperar más respuestas y mostrar incertidumbre antes de declarar una ganadora; si cambia el dato, volvemos a decidir."

> **Pau:** "La sucursal campeona cabía completa en un taxi."

**Regla:** un porcentaje sin tamaño de muestra ni incertidumbre puede convertir azar en ranking.
