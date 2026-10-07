# Los 18 millones que salieron de doce clientes

<!-- story
concept: extrapolación con población no elegible
characters: Renata, Finanzas, Mateo, el jefe
situation: un equipo extrapola el ahorro de doce clientes especiales a toda la cartera
bad_logic: si el promedio por cliente es correcto se puede multiplicar por todos los clientes
escalation: el ahorro se anuncia, entra al presupuesto y luego se descubre que casi nadie cumple las condiciones
data_turn: Finanzas separa clientes elegibles y no elegibles
chart: barras de población total, elegible y ahorro observado
decision: proyectar solo sobre población elegible y usar rango
punchline: Los 18 millones eran reales; nomás les faltaban los clientes.
rule: una multiplicación correcta sigue estando mal si usa la población equivocada
synthetic_data: true
-->

## El número bonito

> **El jefe:** "La nueva regla nos puede ahorrar dieciocho millones al año."
>
> **Finanzas:** "¿Ya ahorramos algo?"
>
> **Mateo:** "En la prueba, doce clientes ahorraron quince mil pesos cada uno."
>
> **Renata:** "Eso son ciento ochenta mil."
>
> **Mateo:** "Sí, y tenemos mil doscientos clientes."
>
> **Finanzas:** "¿Multiplicaste quince mil por mil doscientos?"
>
> **Mateo:** "Correcto."
>
> **Finanzas:** "¿Los mil doscientos pueden usar la regla?"
>
> **Mateo:** "No todos al mismo tiempo."
>
> **El jefe:** "Bueno, pero eventualmente."

La cifra ya estaba en la presentación de presupuesto. Tenía separadores de
miles, un color verde muy serio y una nota que decía “estimación conservadora”.
Nadie había definido qué estaba conservando.

## La lista de requisitos

> **Renata:** "Para entrar a la prueba tenían que renovar contrato este año, usar el producto premium y tener más de cien operaciones."
>
> **Finanzas:** "¿Cuántos clientes cumplen eso?"
>
> **Mateo:** "Ochenta."
>
> **El jefe:** "¿De mil doscientos?"
>
> **Mateo:** "Sí, pero los demás pueden inspirarse."
>
> **Finanzas:** "No presupuestamos inspiración."
>
> **El jefe:** "A ver, no tiremos un buen proyecto por un tema de alcance."
>
> **Renata:** "El alcance es el número que multiplicamos."
>
> **Mateo:** "Podemos dejar los dieciocho y agregar `potencial máximo`."
>
> **Finanzas:** "Máximo si conseguimos mil ciento veinte clientes nuevos que ya sean como los ochenta."
>
> **El jefe:** "¿Y si ponemos una meta para volver elegibles a los demás?"
>
> **Renata:** "Primero tendrían que comprar el producto premium y multiplicar sus operaciones."
>
> **Finanzas:** "Excelente. Para ahorrar, empezamos gastando."

El ahorro había pasado de resultado observado a compromiso anual en menos de
una semana. La operación todavía no tenía lista de clientes elegibles, pero ya
tenía una meta por persona.

## Quién sí puede entrar

> **Finanzas:** "Separé la cartera total de la población que realmente cumple."
>
> **El jefe:** "¿Cuánto queda?"
>
> **Finanzas:** "Entre novecientos mil y un millón doscientos mil pesos, antes de costos."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="Clientes totales, clientes elegibles y ahorro proyectado">
  <rect width="720" height="300" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">De la cartera total a la población elegible</text>
  <rect x="70" y="65" width="540" height="42" fill="#2f79a2"/>
  <text x="82" y="91" font-size="15" fill="#fff">1,200 clientes totales</text>
  <rect x="70" y="130" width="36" height="42" fill="#d18b31"/>
  <text x="118" y="156" font-size="15">80 clientes elegibles</text>
  <rect x="70" y="205" width="55" height="42" fill="#4c8b63"/>
  <text x="137" y="231" font-size="15">12 clientes observados</text>
  <text x="380" y="150" font-size="14" fill="#9f3625">El cálculo de 18 millones usa 1,200.</text>
  <text x="380" y="174" font-size="14" fill="#9f3625">La oportunidad real empieza con 80.</text>
</svg>

<!-- learning:pause -->
> **Renata:** "Si solo ochenta clientes cumplen las condiciones, ¿sobre cuántos tiene sentido proyectar el ahorro?"

**Lo que muestra:** El promedio de la prueba puede ser correcto, pero no aplica
a toda la cartera. Primero se define la población elegible y luego se proyecta
con incertidumbre. Es un error de extrapolación por usar la base equivocada.

## El presupuesto bajó de peso

> **El jefe:** "Ponemos un rango y descontamos costo de implementación."
>
> **Mateo:** "¿Y quitamos los dieciocho millones?"
>
> **Finanzas:** "Déjalos en el archivo donde también presupuestamos inspiración."
>
> **Renata:** "Los 18 millones eran reales; nomás les faltaban los clientes."

**Regla:** Una multiplicación correcta sigue estando mal si usa la población
equivocada.
