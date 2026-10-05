# La tabla madre que mezclaba pasado y futuro

<!-- story
concept: construccion de una ABT para aprendizaje automatico
characters: Abril, Tomas, Vega, la gerente
situation: SQL y Datos se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: una ABT es solo juntar todas las columnas utiles
escalation: la tabla incluye datos posteriores a la decision y el modelo presume resultados irreales
data_turn: una persona compara el atajo contra una version verificable
chart: features disponibles antes y despues de la fecha de corte
decision: definir entidad, fecha de corte, ventana de features y etiqueta futura
punchline: La tabla madre sabia demasiado porque habia leido el final.
rule: una ABT debe respetar entidad, tiempo de decision y disponibilidad de datos
synthetic_data: true
-->

## Todo junto

> **Abril:** "Ya arme la tabla madre con todas las columnas utiles."

> **Tomas:** "Incluiste la fecha de cancelacion."

> **Vega:** "Es una columna muy predictiva."

> **Abril:** "Porque ocurre despues de la decision."

> **Vega:** "Pero esta en la base."

> **la gerente:** "La ABT no puede viajar en el tiempo."

La tabla incluye datos posteriores a la decision y el modelo presume resultados irreales. La pantalla no mostraba un fallo espectacular; mostraba un resultado plausible que nadie sabía reconstruir de principio a fin.

## La columna del futuro

> **Vega:** "La dejamos y en produccion la ponemos vacia."

> **Tomas:** "Entonces entrenas con una verdad que luego quitas."

> **Vega:** "Podemos llamarla variable aspiracional."

> **la gerente:** "Aspiracional para el modelo, carisima para nosotros."

> **Vega:** "Sin ella baja el desempeno."

> **Abril:** "Baja a un numero que puede existir."

> **Tomas:** "La tabla incluye datos posteriores a la decision y el modelo presume resultados irreales."

> **la gerente:** "Enséñame features disponibles antes y despues de la fecha de corte antes de cerrar."

El grupo puso features disponibles antes y despues de la fecha de corte junto al resultado anterior. Poner los pasos junto al resultado convirtió una explicación vaga en una comprobación que podía ejecutar cualquier integrante.

## Fecha de corte primero

> **Abril:** "Separe columnas por disponibilidad al corte."

> **la gerente:** "Que sabia el modelo antes de decidir."

> **Abril:** "Menos, pero de forma honesta."

> **Tomas:** "Entonces debemos definir entidad, fecha de corte, ventana de features y etiqueta futura."

> **Abril:** "Una ABT debe respetar entidad, tiempo de decision y disponibilidad de datos."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="features disponibles antes y despues de la fecha de corte">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">features disponibles antes y despues de la fecha de corte</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="174" height="175" fill="#286d9b"/>
  <text x="157" y="75" font-size="18" text-anchor="middle">96</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">todas</text>
  <rect x="272" y="137" width="174" height="123" fill="#d58b2f"/>
  <text x="359" y="127" font-size="18" text-anchor="middle">68</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">antes corte</text>
  <rect x="474" y="133" width="174" height="127" fill="#4c8b63"/>
  <text x="561" y="123" font-size="18" text-anchor="middle">70</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">produccion</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La tabla valida solo con datos disponibles al decidir.</text>
</svg>

<!-- learning:pause -->
> **Tomas:** "Que decisiones de diseno definen una ABT para machine learning."

**Lo que muestra:** La grafica separa entidad, fecha de corte, features historicas y etiqueta futura. La ABT no es un pegado masivo; es una foto del mundo antes de decidir. Si incluye futuro, valida una fantasia.

## La tabla aprende a esperar

> **la gerente:** "La ABT se reconstruye con corte temporal y etiqueta posterior."

> **Vega:** "El score de prueba bajara."

> **Abril:** "Y dejara de hacer trampa elegante."

> **Abril:** "¿Qué cambiaremos después de revisar features disponibles antes y despues de la fecha de corte?"

> **Tomas:** "La decisión es definir entidad, fecha de corte, ventana de features y etiqueta futura."

> **Vega:** "Y volvemos a medir construccion de una ABT para aprendizaje automatico antes del siguiente cierre."

> **Tomas:** "La tabla madre sabia demasiado porque habia leido el final."

**Regla:** una ABT debe respetar entidad, tiempo de decision y disponibilidad de datos.
