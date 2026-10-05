# La prediccion que llego sin dueno

<!-- story
concept: propiedad operativa del producto de datos
characters: Monica, Esteban, Silvia, el sponsor
situation: un modelo entrega alertas diarias pero ningun equipo acepta operar la decision
bad_logic: si el dato llega a tiempo, alguien naturalmente lo usara
escalation: las alertas se reenvian entre areas hasta vencer
data_turn: Monica mide alertas recibidas, tomadas y cerradas por dueno
chart: uso real por area
decision: asignar dueno, horario, SLA y cierre de cada alerta
punchline: La prediccion era puntual; lo que llego tarde fue el organigrama.
rule: un producto de datos necesita dueno operativo antes de automatizar alertas
synthetic_data: true
-->

## La alerta impecable

> **Monica:** "Las alertas salen diario a primera hora."

> **Esteban:** "Y se contestan diario con esto no es mio."

> **Silvia:** "Tecnicamente llegan a tiempo."

> **Monica:** "Llegar no es aterrizar."

> **Silvia:** "El correo incluye a todas las areas relevantes."

> **el sponsor:** "Todas relevantes significa nadie responsable."

Las alertas se reenvian entre areas hasta vencer. La primera defensa explicaba por qué se eligió el atajo, aunque no resolvía el daño que había aparecido después.

## El correo viajo mas que el caso

> **Silvia:** "Agregamos mas copias para que alguien reaccione."

> **Esteban:** "Mas copias no crean dueno."

> **Silvia:** "Pero aumentan la probabilidad de culpa."

> **el sponsor:** "Ayer una alerta dio cinco vueltas y caduco."

> **Silvia:** "Al menos todos estaban informados."

> **Monica:** "Informados de que nadie la tomo."

> **Esteban:** "Las alertas se reenvian entre areas hasta vencer."

> **el sponsor:** "Quiero ver uso real por area antes de decidir."

Monica mide alertas recibidas, tomadas y cerradas por dueno. El dato central permitió conservar la presión legítima y cambiar solamente la lógica que estaba produciendo el error.

## Recibir no es hacerse cargo

> **Monica:** "Segui cada alerta hasta su cierre."

> **el sponsor:** "Cuantas pasan de recibidas a atendidas."

> **Monica:** "Las que tienen dueno sobreviven; las demas circulan."

> **Esteban:** "Ahora entiendo por qué si el dato llega a tiempo, alguien naturalmente lo usara."

> **Monica:** "Respondía otra pregunta; no servía para asignar dueno, horario, SLA y cierre de cada alerta."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="uso real por area">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">uso real por area</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="124" height="175" fill="#286d9b"/>
  <text x="132" y="75" font-size="18" text-anchor="middle">100</text>
  <text x="132" y="286" font-size="13" text-anchor="middle">recibidas</text>
  <rect x="222" y="180" width="124" height="80" fill="#d58b2f"/>
  <text x="284" y="170" font-size="18" text-anchor="middle">46</text>
  <text x="284" y="286" font-size="13" text-anchor="middle">tomadas</text>
  <rect x="374" y="210" width="124" height="50" fill="#4c8b63"/>
  <text x="436" y="200" font-size="18" text-anchor="middle">29</text>
  <text x="436" y="286" font-size="13" text-anchor="middle">cerradas</text>
  <rect x="526" y="131" width="124" height="129" fill="#c64e36"/>
  <text x="588" y="121" font-size="18" text-anchor="middle">74</text>
  <text x="588" y="286" font-size="13" text-anchor="middle">con dueno</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">El dueno operativo cambia el uso real.</text>
</svg>

<!-- learning:pause -->
> **Esteban:** "Que elemento operativo falta cuando una prediccion correcta no cambia nada."

**Lo que muestra:** La grafica separa entrega, toma de responsabilidad y cierre. Una alerta puede ser tecnicamente correcta y aun asi inutil si no tiene dueno, horario, criterio de accion y seguimiento. El producto de datos incluye operacion.

## El dueno aparece antes de la alarma

> **el sponsor:** "Cada alerta tendra dueno y tiempo de respuesta."

> **el sponsor:** "Dejen por escrito quién va a asignar dueno, horario, SLA y cierre de cada alerta."

> **Silvia:** "Menos personas recibiran el correo."

> **Monica:** "Y por fin alguien lo contestara con accion."

> **Monica:** "¿Qué cambiaremos después de revisar uso real por area?"

> **Esteban:** "La decisión es asignar dueno, horario, SLA y cierre de cada alerta."

> **Silvia:** "Y volvemos a medir propiedad operativa del producto de datos antes del siguiente cierre."

> **Silvia:** "Operaciones confirmará cada semana si la lista llegó a tiempo y alguien la usó."

> **Esteban:** "La prediccion era puntual; lo que llego tarde fue el organigrama."

**Regla:** un producto de datos necesita dueno operativo antes de automatizar alertas.
