# El groupby que perdio los lunes

<!-- story
concept: pandas esencial con filtros, joins, groupby y fechas
characters: Olga, Ivan, Ceci, el mentor
situation: Lectura y Limpieza se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: si pandas devuelve una tabla, la transformacion quedo bien
escalation: un filtro de fechas mal convertido excluye dias y el resumen cambia
data_turn: una persona compara el atajo contra una version verificable
chart: filas antes y despues de filtros de fecha
decision: convertir tipos, filtrar explicitamente, unir con llaves y agrupar despues de validar
punchline: Pandas no odio los lunes; nosotros los dejamos como texto.
rule: en pandas, valida tipos y filas antes de confiar en filtros, joins o groupby
synthetic_data: true
-->

## La tabla bonita

> **Olga:** "El groupby ya resume ventas por dia."

> **Ivan:** "Pero faltan varios lunes."

> **Ceci:** "Tal vez esos dias no hubo ventas."

> **Olga:** "O la fecha no era fecha."

> **Ceci:** "Pandas no se quejo."

> **el mentor:** "Pandas no siempre se queja por ti."

Un filtro de fechas mal convertido excluye dias y el resumen cambia. La solución parecía suficiente mientras nadie pidiera repetirla con otro archivo, otra fecha o una cantidad diferente.

## La fecha era texto disfrazado

> **Ceci:** "Rellenamos los lunes con cero."

> **Ivan:** "Primero averigüemos si los borramos."

> **Ceci:** "El cero se ve ordenado."

> **el mentor:** "Ordenado y falso es peor."

> **Ceci:** "La grafica quedaba suave."

> **Olga:** "Demasiado suave para una semana real."

> **Ivan:** "Un filtro de fechas mal convertido excluye dias y el resumen cambia."

> **el mentor:** "Enséñame filas antes y despues de filtros de fecha antes de cerrar."

El grupo puso filas antes y despues de filtros de fecha junto al resultado anterior. Al contrastar resultados, el equipo sustituyó memoria y orden accidental por pasos que podían verificarse uno a uno.

## Filtrar despues de convertir

> **Olga:** "Revise tipos, filtros y filas antes del groupby."

> **el mentor:** "Donde se fueron los lunes."

> **Olga:** "Se perdieron al filtrar texto como si fuera fecha."

> **Ivan:** "Entonces debemos convertir tipos, filtrar explicitamente, unir con llaves y agrupar despues de validar."

> **Olga:** "En pandas, valida tipos y filas antes de confiar en filtros, joins o groupby."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="filas antes y despues de filtros de fecha">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">filas antes y despues de filtros de fecha</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="160" width="174" height="100" fill="#286d9b"/>
  <text x="157" y="150" font-size="18" text-anchor="middle">52</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">sin validar</text>
  <rect x="272" y="101" width="174" height="159" fill="#d58b2f"/>
  <text x="359" y="91" font-size="18" text-anchor="middle">83</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">fechas ok</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">91</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">join validado</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">Los tipos correctos protegen el resumen.</text>
</svg>

<!-- learning:pause -->
> **Ivan:** "Que validaciones conviene hacer antes de usar filtros, joins y groupby en pandas."

**Lo que muestra:** La evidencia muestra que pandas permite transformar rapido, pero exige revisar tipos, nulos, llaves y conteos. Convertir fechas antes de filtrar evita excluir datos validos. El groupby solo resume lo que sobrevivio.

## Agrupar con piso firme

> **el mentor:** "El flujo validara tipos y conteos antes de resumir."

> **Ceci:** "Habra mas pasos antes de la grafica."

> **Olga:** "Y menos dias desaparecidos."

> **Olga:** "¿Qué cambiaremos después de revisar filas antes y despues de filtros de fecha?"

> **Ivan:** "La decisión es convertir tipos, filtrar explicitamente, unir con llaves y agrupar despues de validar."

> **Ceci:** "Y volvemos a medir pandas esencial con filtros, joins, groupby y fechas antes del siguiente cierre."

> **Ceci:** "Cada transformación quedará en un paso nombrado y fácil de inspeccionar."

> **Ivan:** "Pandas no odio los lunes; nosotros los dejamos como texto."

**Regla:** en pandas, valida tipos y filas antes de confiar en filtros, joins o groupby.
