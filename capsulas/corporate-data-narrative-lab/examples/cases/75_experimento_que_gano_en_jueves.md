# El experimento que ganó en jueves

<!-- story
concept: pruebas múltiples y falsos descubrimientos
characters: Mireya, Lalo, Simón, la líder de crecimiento
situation: crecimiento prueba muchas combinaciones y celebra la única que salió positiva
bad_logic: buscar entre muchas métricas, segmentos y días hasta encontrar un resultado favorable
escalation: se prepara un despliegue nacional a partir de una coincidencia de jueves
data_turn: Mireya cuenta todas las pruebas y replica la variante con una hipótesis definida
chart: Resultados positivos antes y después de una réplica
decision: declarar hipótesis y métrica antes de probar, y exigir réplica para hallazgos exploratorios
punchline: La variante no ganó el experimento; ganó el jueves.
rule: si buscas suficientes cortes, alguno parecerá ganador por azar
synthetic_data: true
-->

## El botón ganador

> **la líder de crecimiento:** "El botón naranja subió compras 14% entre usuarios nuevos del jueves."

> **Mireya:** "¿Esa era la métrica que definimos?"

> **Lalo:** "Definimos conversión general, pero revisé varios cortes."

> **Simón:** "¿Cuántos cortes?"

> **Lalo:** "Días, dispositivos, regiones y tipo de usuario."

> **Mireya:** "Eso son 36 oportunidades de encontrar una casualidad."

El resultado positivo ocupaba el centro del correo; las otras 35 comparaciones vivían en pestañas distintas. Al ver solo al ganador, la probabilidad de haberlo encontrado por casualidad desaparecía de la conversación.

## Treinta y seis maneras

> **la líder de crecimiento:** "Pero el jueves naranja sí ganó."

> **Simón:** "El miércoles perdió y el viernes quedó igual."

> **Lalo:** "Podemos lanzar solo los jueves."

> **Mireya:** "Esa regla nació después de mirar el resultado."

> **la líder de crecimiento:** "¿Cómo distinguimos señal de suerte?"

> **Mireya:** "Repetimos exactamente esa hipótesis en datos nuevos."

La segmentación posterior parecía razonable porque cada corte tenía nombre de negocio. El problema era el orden: primero aparecieron los datos y después se inventó la hipótesis que mejor les quedaba.

## Volver a probar

> **Mireya:** "La réplica mantuvo botón, jueves y usuarios nuevos."

> **Lalo:** "El aumento quedó en 1%, dentro del ruido."

> **Simón:** "La conversión general tampoco cambió."

> **la líder de crecimiento:** "Entonces la primera subida no resistió."

> **Mireya:** "Era un hallazgo exploratorio, no una conclusión confirmada."

En la réplica, la barra de 14% se redujo a una diferencia de 1%. La variante dejó de sobresalir cuando tuvo que responder una pregunta decidida antes de abrir los resultados.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Resultados positivos antes y después de una réplica">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Resultados positivos antes y después de una réplica</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="90" width="184" height="160" fill="#286d9b"/>
  <text x="152" y="80" font-size="17" text-anchor="middle">14 % cambio</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">hallazgo inicial</text>
  <rect x="268" y="239" width="184" height="11" fill="#d58b2f"/>
  <text x="360" y="229" font-size="17" text-anchor="middle">1 % cambio</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">réplica</text>
  <rect x="476" y="250" width="184" height="0" fill="#4c8b63"/>
  <text x="568" y="240" font-size="17" text-anchor="middle">0 % cambio</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">conversión general</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El efecto grande desaparece al repetir una hipótesis predefinida.</text>
</svg>

<!-- learning:pause -->
> **Simón:** "¿Qué nos dice la réplica sobre el aumento de 14% encontrado entre tantos cortes?"

**Lo que muestra:** Al revisar 36 combinaciones, aumenta la posibilidad de que alguna parezca positiva por azar. La réplica predefinida obtiene solo 1%, compatible con ausencia de efecto. El primer hallazgo sirve para formular una hipótesis, pero no para justificar por sí solo un despliegue.

## Nombrar la apuesta

> **la líder de crecimiento:** "No habrá despliegue nacional."

> **Lalo:** "Antes del siguiente experimento fijaré métrica y segmentos."

> **Simón:** "Los cortes adicionales se marcarán como exploratorios."

> **Mireya:** "Y cualquier sorpresa importante necesitará réplica."

> **la líder de crecimiento:** "Quiero menos ganadores encontrados después del partido."

> **Mireya:** "Sobre pruebas múltiples y falsos descubrimientos, ¿qué dato revisamos en el siguiente corte?"

> **Lalo:** "Primero vamos a declarar hipótesis y métrica antes de probar, y exigir réplica para hallazgos exploratorios; luego comparamos el resultado."

> **Lalo:** "La variante no ganó el experimento; ganó el jueves."

**Regla:** si buscas suficientes cortes, alguno parecerá ganador por azar.
