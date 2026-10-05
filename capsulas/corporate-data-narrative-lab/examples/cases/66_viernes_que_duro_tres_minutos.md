# El viernes que duró tres minutos

<!-- story
concept: ventanas temporales y datos incompletos
characters: Noé, Vero, Camila, el gerente comercial
situation: ventas compara una semana cerrada contra un viernes que apenas comenzó
bad_logic: tratar periodos parciales y completos como si tuvieran la misma maduración
escalation: se activa una promoción de emergencia por una caída que solo existe en el corte temprano
data_turn: Noé alinea las horas transcurridas y compara viernes equivalentes
chart: Ventas acumuladas a la misma hora del viernes
decision: esperar una ventana comparable y mostrar la hora de corte en cada reporte
punchline: El viernes no iba mal; apenas estaba buscando dónde estacionarse.
rule: compara periodos con la misma ventana y el mismo grado de maduración
synthetic_data: true
-->

## Alarma a las nueve

> **el gerente comercial:** "Ventas cayó 72% contra el viernes pasado."

> **Noé:** "El reporte corrió a las nueve con tres minutos."

> **Camila:** "Pero el porcentaje ya está calculado."

> **Vero:** "Compara nueve horas del viernes pasado contra tres minutos de hoy."

> **el gerente comercial:** "¿Por qué el sistema permite eso?"

> **Noé:** "Porque le pedimos viernes contra viernes, no horas equivalentes."

La alerta llegó antes que la mayoría del equipo. El porcentaje rojo ya circulaba en dos chats y el cupón de emergencia esperaba un clic, aunque las cortinas de varias tiendas seguían abajo.

## La promoción relámpago

> **Camila:** "Lanzo descuento de emergencia y recuperamos volumen."

> **Vero:** "A las nueve con seis todavía no sabemos si falta volumen."

> **Camila:** "El cupón ya está escrito."

> **Noé:** "Y regalaría margen durante el pico del mediodía."

> **el gerente comercial:** "¿Cuánto vendíamos otros viernes a esta hora?"

> **Vero:** "Casi lo mismo: entre 48 y 55 pedidos acumulados."

Vero abrió los cortes históricos minuto por minuto. A la misma hora, los viernes anteriores también parecían pequeños; la diferencia estaba en cuánto día había entrado al cálculo.

## Relojes alineados

> **Noé:** "Alineé cada viernes por minuto transcurrido."

> **Camila:** "La caída de 72% se convirtió en 4%."

> **Vero:** "Cuatro cabe dentro de la variación normal de esa hora."

> **el gerente comercial:** "Entonces no tenemos incendio."

> **Noé:** "Tenemos un corte sin reloj visible."

Al poner tres viernes a la misma hora, las barras quedaron casi juntas. El desastre desapareció sin vender un pedido adicional: bastó con devolverle al reporte su reloj.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Ventas acumuladas a la misma hora del viernes">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Ventas acumuladas a la misma hora del viernes</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="96" width="184" height="154" fill="#286d9b"/>
  <text x="152" y="86" font-size="17" text-anchor="middle">50 pedidos</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">hoy 09:03</text>
  <rect x="268" y="90" width="184" height="160" fill="#d58b2f"/>
  <text x="360" y="80" font-size="17" text-anchor="middle">52 pedidos</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">viernes A 09:03</text>
  <rect x="476" y="102" width="184" height="148" fill="#4c8b63"/>
  <text x="568" y="92" font-size="17" text-anchor="middle">48 pedidos</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">viernes B 09:03</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">A la misma hora, la supuesta caída casi desaparece.</text>
</svg>

<!-- learning:pause -->
> **Camila:** "¿Qué comparación permite saber si este viernes realmente empezó peor?"

**Lo que muestra:** Un periodo parcial no puede compararse con otro ya cerrado. Al medir ventas acumuladas a la misma hora, la diferencia baja de 72% a 4%, compatible con la variación habitual. La ventana temporal y la hora de corte son parte de la definición de la métrica.

## Dejar terminar el día

> **el gerente comercial:** "El cupón queda guardado y revisamos al mediodía."

> **Camila:** "Voy a poner hora de corte junto al total."

> **Vero:** "Y una marca cuando el periodo todavía esté abierto."

> **Noé:** "También bloquearemos comparaciones entre ventanas distintas."

> **el gerente comercial:** "Bien. Que la alarma espere a que exista el día."

> **Noé:** "Sobre ventanas temporales y datos incompletos, ¿qué dato revisamos en el siguiente corte?"

> **Vero:** "Primero vamos a esperar una ventana comparable y mostrar la hora de corte en cada reporte; luego comparamos el resultado."

> **Camila:** "El viernes no iba mal; apenas estaba buscando dónde estacionarse."

**Regla:** compara periodos con la misma ventana y el mismo grado de maduración.
