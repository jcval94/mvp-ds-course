# La formula que vivia en cinco lugares

<!-- story
concept: funciones limpias y reutilizables
characters: Paz, Leo, Marta, el lider
situation: Programacion en Python se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: copiar y pegar codigo es reutilizarlo
escalation: cinco calculos parecidos cambian de forma distinta y producen resultados incompatibles
data_turn: una persona compara el atajo contra una version verificable
chart: copias de codigo contra resultados consistentes
decision: extraer la logica repetida a una funcion con nombre claro y pruebas simples
punchline: No teniamos cinco soluciones; teniamos una solucion con cinco disfraces.
rule: si una logica se repite, conviertela en funcion y hazla facil de probar
synthetic_data: true
-->

## Copiar parecia rapido

> **Paz:** "Copie el calculo donde lo necesitaba y ya quedo."

> **Leo:** "Tambien quedo en cinco versiones."

> **Marta:** "Pero todas hacen casi lo mismo."

> **Paz:** "Casi es justo donde nacen los errores."

> **Marta:** "Copiar fue mas rapido que pensar una funcion."

> **el lider:** "Corregir cinco copias ya no fue rapido."

Cinco calculos parecidos cambian de forma distinta y producen resultados incompatibles. La dificultad surgió al reutilizar el ejercicio: el atajo guardaba supuestos que solo conocía quien había escrito la primera versión.

## La correccion no llego a todas partes

> **Marta:** "Buscamos todas y las editamos."

> **Leo:** "Eso depende de que las encontremos todas."

> **Marta:** "Podemos nombrarlas igual para ubicarlas."

> **el lider:** "Nombrar copias no las vuelve una sola."

> **Marta:** "Al menos cada area la adapto."

> **Paz:** "Y ahora cada area tiene una verdad privada."

> **Leo:** "Cinco calculos parecidos cambian de forma distinta y producen resultados incompatibles."

> **el lider:** "Enséñame copias de codigo contra resultados consistentes antes de cerrar."

El grupo puso copias de codigo contra resultados consistentes junto al resultado anterior. La nueva comparación hizo visibles entradas, transformaciones y salida, justo lo necesario para detectar el punto de ruptura.

## Una funcion, una verdad

> **Paz:** "Compare salidas antes y despues de extraer la funcion."

> **el lider:** "Donde se redujo la diferencia."

> **Paz:** "Cuando todos llamaron la misma logica."

> **Leo:** "Entonces debemos extraer la logica repetida a una funcion con nombre claro y pruebas simples."

> **Paz:** "Si una logica se repite, conviertela en funcion y hazla facil de probar."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="copias de codigo contra resultados consistentes">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">copias de codigo contra resultados consistentes</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="174" width="174" height="86" fill="#286d9b"/>
  <text x="157" y="164" font-size="18" text-anchor="middle">48</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">copias</text>
  <rect x="272" y="95" width="174" height="165" fill="#d58b2f"/>
  <text x="359" y="85" font-size="18" text-anchor="middle">92</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">funcion</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">97</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">con prueba</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">Una funcion reduce diferencias entre resultados.</text>
</svg>

<!-- learning:pause -->
> **Leo:** "Que hace que una funcion sea limpia y reutilizable."

**Lo que muestra:** La grafica muestra que copiar codigo dispersa la regla. Una funcion con nombre claro, entradas explicitas y salida definida concentra la logica. Eso facilita probar, corregir y reutilizar sin perseguir variantes.

## Reusar sin perseguir copias

> **el lider:** "El calculo compartido queda en una funcion."

> **Marta:** "Habra que cambiar llamadas existentes."

> **Paz:** "Y dejar de mantener cinco disfraces."

> **Paz:** "¿Qué cambiaremos después de revisar copias de codigo contra resultados consistentes?"

> **Leo:** "La decisión es extraer la logica repetida a una funcion con nombre claro y pruebas simples."

> **Marta:** "Y volvemos a medir funciones limpias y reutilizables antes del siguiente cierre."

> **Marta:** "La función devolverá resultados sin depender de variables escondidas."

> **Leo:** "No teniamos cinco soluciones; teniamos una solucion con cinco disfraces."

**Regla:** si una logica se repite, conviertela en funcion y hazla facil de probar.
