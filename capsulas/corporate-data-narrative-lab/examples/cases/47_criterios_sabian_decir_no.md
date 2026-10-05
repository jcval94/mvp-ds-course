# Los criterios que si sabian decir no

<!-- story
concept: criterios de aceptacion y revision
characters: Karla, Hernan, Milo, la revisora
situation: un agente entrega una funcion que parece correcta pero no cumple casos limite
bad_logic: si la entrega se parece a lo pedido, se acepta
escalation: cada revision agrega una expectativa nueva y el trabajo se alarga
data_turn: Karla convierte expectativas en criterios verificables antes de implementar
chart: matriz alcance
decision: aceptar o rechazar con criterios previos y pruebas observables
punchline: Los criterios no eran mala onda; eran el unico que sabia decir hasta aqui.
rule: los criterios de aceptacion convierten opiniones tardias en pruebas previas
synthetic_data: true
-->

## Casi listo

> **Karla:** "La funcion ya se parece mucho a lo que pedimos."

> **Hernan:** "Parecerse no es pasar aceptacion."

> **Milo:** "La revisora pidio otro ajuste."

> **Karla:** "Ese ajuste estaba escrito antes."

> **Milo:** "No, pero era obvio."

> **la revisora:** "Lo obvio tarde se llama retrabajo."

Cada revision agrega una expectativa nueva y el trabajo se alarga. El problema llegó con una fecha y una persona responsable de responder, dos detalles que el resumen inicial no contenía.

## Casi tambien es retrabajo

> **Milo:** "Pidamos al agente que lo deje perfecto."

> **Hernan:** "Perfecto sin criterios es persecucion."

> **Milo:** "Le damos feedback hasta que se canse."

> **la revisora:** "El agente no se cansa; nosotros si."

> **Milo:** "Al menos cada vuelta mejora algo."

> **Karla:** "Tambien cambia que significa terminar."

> **Hernan:** "Cada revision agrega una expectativa nueva y el trabajo se alarga."

> **la revisora:** "Quiero ver matriz alcance antes de decidir."

Karla convierte expectativas en criterios verificables antes de implementar. Al revisar la medida correcta, el equipo pudo abandonar una salida vistosa y elegir otra que sí resistía preguntas.

## La matriz dice si

> **Karla:** "Converti expectativas en pruebas de aceptacion."

> **la revisora:** "Que queda dentro y que queda fuera."

> **Karla:** "La matriz separa requerido, opcional y no alcance."

> **Hernan:** "Ahora entiendo por qué si la entrega se parece a lo pedido, se acepta."

> **Karla:** "Respondía otra pregunta; no servía para aceptar o rechazar con criterios previos y pruebas observables."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="matriz alcance">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">matriz alcance</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="200" width="174" height="60" fill="#286d9b"/>
  <text x="157" y="190" font-size="18" text-anchor="middle">31</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">sin criterios</text>
  <rect x="272" y="152" width="174" height="108" fill="#d58b2f"/>
  <text x="359" y="142" font-size="18" text-anchor="middle">55</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">criterios vagos</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">89</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">verificables</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">Decir no antes reduce retrabajo.</text>
</svg>

<!-- learning:pause -->
> **Hernan:** "Como ayudan los criterios de aceptacion a revisar trabajo generado por agentes."

**Lo que muestra:** La evidencia muestra menos retrabajo cuando aceptar significa pasar casos definidos. Los criterios deben ser observables: entrada, comportamiento esperado, casos limite y exclusiones. Asi la revision no depende del humor de la ultima junta.

## Revisar con contrato

> **la revisora:** "Ninguna tarea pasa a agente sin criterios verificables."

> **la revisora:** "Dejen por escrito quién va a aceptar o rechazar con criterios previos y pruebas observables."

> **Milo:** "Discutiremos antes de construir."

> **Karla:** "Y no despues de tres vueltas."

> **Karla:** "¿Qué cambiaremos después de revisar matriz alcance?"

> **Hernan:** "La decisión es aceptar o rechazar con criterios previos y pruebas observables."

> **Milo:** "Y volvemos a medir criterios de aceptacion y revision antes del siguiente cierre."

> **Milo:** "Cada criterio tendrá entrada, salida esperada y una forma clara de rechazarla."

> **Hernan:** "Los criterios no eran mala onda; eran el unico que sabia decir hasta aqui."

**Regla:** los criterios de aceptacion convierten opiniones tardias en pruebas previas.
