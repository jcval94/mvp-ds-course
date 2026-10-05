# El promedio de 14 minutos y el folio de seis horas

<!-- story
concept: promedio engañoso y daño en la cola de la distribución
characters: Rodríguez, Nadia, Félix, el jefe
situation: atención celebra un promedio de 14 minutos mientras varios clientes esperan horas
bad_logic: muchos casos rápidos compensan a los pocos casos extremadamente tardados
escalation: el promedio queda verde, los casos difíciles se acumulan y se propone cerrar y reabrir folios para reiniciar el reloj
data_turn: Nadia muestra mediana y percentiles de espera
chart: distribución de tiempos con p90 y p95
decision: gestionar la cola con percentiles, volumen y antigüedad
punchline: Al folio 0098 no le ayudó el promedio; ni siquiera lo conoció.
rule: cuando el daño vive en la cola, la media no basta
synthetic_data: true
-->

## Todo en verde

> **El jefe:** "El tiempo promedio de atención quedó en catorce minutos. Buen cierre."
>
> **Nadia:** "El folio 0098 lleva seis horas esperando."
>
> **Félix:** "Sí, pero hay muchos de dos minutos."
>
> **Rodríguez:** "¿Eso le sirve al 0098?"
>
> **Félix:** "Al cliente no. Al promedio bastante."
>
> **El jefe:** "¿Cuántos están así?"
>
> **Nadia:** "Ciento doce llevan más de una hora."
>
> **Félix:** "De nueve mil casos."
>
> **Rodríguez:** "Ah, entonces son poquitos. Nada más son ciento doce personas encabronadas."

El reporte cerraba a las seis. Los casos fáciles entraban por un flujo nuevo y
se resolvían casi solos. Los complicados necesitaban documentos, llamadas y una
persona que ya estaba cubriendo dos turnos.

## La solución para el reloj

> **El jefe:** "Necesito una acción para bajar los casos vencidos."
>
> **Félix:** "Podemos cerrar los que esperan documentos y reabrirlos cuando llegue la respuesta."
>
> **Nadia:** "¿Eso resuelve el caso?"
>
> **Félix:** "Reinicia el tiempo."
>
> **Rodríguez:** "Te preguntó por el caso."
>
> **Félix:** "El caso sigue. El atraso ya no."
>
> **El jefe:** "No hagan eso."
>
> **Félix:** "Perfecto. Lo dejo como idea que nunca se implementó."
>
> **Rodríguez:** "¿Y por qué ya tiene nombre?"
>
> **Félix:** "Para que quede claro qué fue lo que no implementamos."

Una semana después, alguien la implementó con otro nombre: “gestión activa de
esperas externas”. El promedio bajó a trece minutos y aparecieron doscientos
folios con fecha de nacimiento nueva y problemas viejos.
El cliente siguió esperando.

## La fila completa

> **Nadia:** "Puse todos los tiempos, no solo el promedio."
>
> **El jefe:** "¿Qué tan mal está?"
>
> **Nadia:** "La mitad espera menos de ocho minutos. El cinco por ciento espera más de dos horas."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="Distribución de tiempos de espera con cola larga y percentiles">
  <rect width="720" height="300" fill="#fff"/>
  <text x="36" y="30" font-size="18" font-weight="bold">Tiempo de espera de 9,000 folios</text>
  <line x1="60" y1="245" x2="680" y2="245" stroke="#777"/>
  <rect x="80" y="80" width="70" height="165" fill="#397fa8"/>
  <rect x="165" y="115" width="70" height="130" fill="#4d8fb3"/>
  <rect x="250" y="160" width="70" height="85" fill="#6ba0bd"/>
  <rect x="335" y="193" width="70" height="52" fill="#91b5ca"/>
  <rect x="420" y="215" width="70" height="30" fill="#d58b2f"/>
  <rect x="505" y="226" width="70" height="19" fill="#c64e36"/>
  <rect x="590" y="234" width="70" height="11" fill="#9e3525"/>
  <text x="82" y="265" font-size="12">0-5m</text><text x="165" y="265" font-size="12">5-15m</text>
  <text x="248" y="265" font-size="12">15-30m</text><text x="335" y="265" font-size="12">30-60m</text>
  <text x="420" y="265" font-size="12">1-2h</text><text x="510" y="265" font-size="12">2-4h</text>
  <text x="596" y="265" font-size="12">4h+</text>
  <line x1="495" y1="55" x2="495" y2="245" stroke="#d58b2f" stroke-dasharray="5 4"/>
  <line x1="570" y1="55" x2="570" y2="245" stroke="#c64e36" stroke-dasharray="5 4"/>
  <text x="470" y="50" font-size="13">p90</text><text x="552" y="50" font-size="13">p95</text>
</svg>

<!-- learning:pause -->
> **Rodríguez:** "Si queremos defender a la gente que peor la está pasando, ¿qué número tenemos que poner junto al promedio?"

**Lo que muestra:** La mediana explica al caso típico, pero los percentiles p90
y p95 muestran la cola donde viven las esperas graves. El promedio de catorce
minutos no describe ese daño. Hay que mirar la distribución.

## El reporte dejó de caber en una cifra

> **El jefe:** "Desde hoy reportamos mediana, p90, p95 y cuántos folios llevan más de una hora."
>
> **Félix:** "Se va a ver más feo."
>
> **Nadia:** "La fila ya se veía fea. El reporte era el que no volteaba."
>
> **Rodríguez:** "Al folio 0098 no le ayudó el promedio; ni siquiera lo conoció."

**Regla:** Cuando el daño vive en la cola, la media no basta.
