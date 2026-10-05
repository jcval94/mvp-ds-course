# El loop que mando el mismo aviso a todos

<!-- story
concept: condicionales, loops y logica de automatizacion
characters: Nico, Irene, Joel, la coordinadora
situation: Programacion en Python se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: automatizar una repeticion basta aunque no separe casos distintos
escalation: el loop procesa todo igual y manda avisos incorrectos
data_turn: una persona compara el atajo contra una version verificable
chart: casos procesados con y sin condicion
decision: agregar condiciones antes de repetir acciones
punchline: El loop trabajo muchisimo; el problema es que nunca pregunto a quien.
rule: un loop repite, pero la condicion decide cuando debe cambiar el camino
synthetic_data: true
-->

## La automatizacion obediente

> **Nico:** "El script ya recorre todos los registros."

> **Irene:** "Tambien les manda el mismo aviso a todos."

> **Joel:** "Eso era la automatizacion."

> **Nico:** "Eso era repeticion, no criterio."

> **Joel:** "Antes lo haciamos a mano."

> **la coordinadora:** "A mano al menos alguien distinguia pendientes de cerrados."

El loop procesa todo igual y manda avisos incorrectos. La pantalla no mostraba un fallo espectacular; mostraba un resultado plausible que nadie sabía reconstruir de principio a fin.

## Repetir no es decidir

> **Joel:** "Hacemos dos scripts, uno para cada caso."

> **Irene:** "Mejor una condicion dentro del loop."

> **Joel:** "Pero dos scripts se sienten mas productivos."

> **la coordinadora:** "Y duplican el lugar donde equivocarnos."

> **Joel:** "El correo generico es educado."

> **Nico:** "Educado y falso sigue siendo falso."

> **Irene:** "El loop procesa todo igual y manda avisos incorrectos."

> **la coordinadora:** "Enséñame casos procesados con y sin condicion antes de cerrar."

El grupo puso casos procesados con y sin condicion junto al resultado anterior. Poner los pasos junto al resultado convirtió una explicación vaga en una comprobación que podía ejecutar cualquier integrante.

## La pregunta antes de la vuelta

> **Nico:** "Compare registros procesados antes y despues del if."

> **la coordinadora:** "Cuantos avisos dejaron de salir mal."

> **Nico:** "La condicion separo quien necesitaba accion y quien no."

> **Irene:** "Entonces debemos agregar condiciones antes de repetir acciones."

> **Nico:** "Un loop repite, pero la condicion decide cuando debe cambiar el camino."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="casos procesados con y sin condicion">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">casos procesados con y sin condicion</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="188" width="174" height="72" fill="#286d9b"/>
  <text x="157" y="178" font-size="18" text-anchor="middle">39</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">sin if</text>
  <rect x="272" y="147" width="174" height="113" fill="#d58b2f"/>
  <text x="359" y="137" font-size="18" text-anchor="middle">61</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">dos scripts</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">94</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">loop con if</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La condicion evita repetir el error.</text>
</svg>

<!-- learning:pause -->
> **Irene:** "Que papel tiene un if dentro de un loop de automatizacion."

**Lo que muestra:** La evidencia muestra que repetir sin logica amplifica errores. El loop permite recorrer muchos registros; el condicional decide que accion corresponde en cada caso. Automatizar bien no es hacer mas, es hacer lo correcto muchas veces.

## Menos correos, mas logica

> **la coordinadora:** "El loop solo enviara aviso si el estado lo requiere."

> **Joel:** "Hay que escribir la regla completa."

> **Nico:** "Y dejar de molestar a quien ya termino."

> **Nico:** "¿Qué cambiaremos después de revisar casos procesados con y sin condicion?"

> **Irene:** "La decisión es agregar condiciones antes de repetir acciones."

> **Joel:** "Y volvemos a medir condicionales, loops y logica de automatizacion antes del siguiente cierre."

> **Joel:** "El siguiente ejercicio incluirá un caso normal, una excepción y una entrada vacía."

> **Irene:** "El loop trabajo muchisimo; el problema es que nunca pregunto a quien."

**Regla:** un loop repite, pero la condicion decide cuando debe cambiar el camino.
