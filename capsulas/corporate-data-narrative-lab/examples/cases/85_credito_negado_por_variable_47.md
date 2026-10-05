# El crédito negado por la variable 47

<!-- story
concept: explicabilidad, revisión humana y derecho a corregir
characters: Yaz, Bruno, Lidia, la responsable de crédito
situation: un modelo rechaza solicitudes y solo entrega códigos técnicos sin una razón accionable
bad_logic: confundir una lista de variables importantes con una explicación individual y justa
escalation: atención no puede explicar ni corregir un rechazo causado por un dato desactualizado
data_turn: Yaz compara códigos internos con razones verificables y resultados de apelación
chart: Rechazos corregidos después de revisar la razón
decision: limitar decisiones automáticas, mostrar razones comprobables y habilitar apelación humana
punchline: La variable 47 tenía más autoridad que nombre.
rule: una explicación útil permite verificar, corregir y apelar la información que sostuvo la decisión
synthetic_data: true
-->

## Código V47

> **la responsable de crédito:** "La solicitud fue rechazada por V47."

> **Lidia:** "La clienta pregunta qué significa."

> **Bruno:** "Es la variable con mayor contribución negativa."

> **Yaz:** "Eso describe al modelo, no le dice qué puede revisar."

> **la responsable de crédito:** "¿Qué dato hay detrás de V47?"

> **Bruno:** "Estabilidad de domicilio calculada con un padrón externo."

El sistema entregaba un código breve y una decisión definitiva. Para atención, aquello era imposible de traducir; para la persona solicitante, era imposible saber si el dato podía estar equivocado.

## La dirección antigua

> **Lidia:** "La clienta se mudó hace tres años y ya entregó comprobante."

> **Bruno:** "El padrón todavía muestra la dirección anterior."

> **Yaz:** "Entonces el rechazo depende de un dato corregible."

> **la responsable de crédito:** "¿Cuántos casos similares tenemos?"

> **Lidia:** "Ciento veinte apelaciones este mes; 38 cambiaron al revisar documentos."

> **Bruno:** "El modelo no recibe esa corrección de vuelta."

La explicación local señaló la variable dominante, pero solo el documento de origen reveló el problema: una dirección antigua seguía activa en una fuente que nadie había actualizado.

## Razones que se comprueban

> **Yaz:** "Agrupé rechazos por razón comprensible y resultado de apelación."

> **Lidia:** "Domicilio desactualizado concentra 32 correcciones."

> **Bruno:** "El código técnico escondía un problema de fuente."

> **la responsable de crédito:** "Eso exige detener el rechazo automático en esa razón."

> **Yaz:** "Y devolver las correcciones al dato y al monitoreo."

Las apelaciones cambiadas no eran excepciones molestas. Funcionaban como evidencia de fallas de datos y de un proceso que necesitaba revisión humana antes de producir una consecuencia difícil de revertir.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Rechazos corregidos después de revisar la razón">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Rechazos corregidos después de revisar la razón</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="90" width="184" height="160" fill="#286d9b"/>
  <text x="152" y="80" font-size="17" text-anchor="middle">120 casos</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">apelaciones</text>
  <rect x="268" y="199" width="184" height="51" fill="#d58b2f"/>
  <text x="360" y="189" font-size="17" text-anchor="middle">38 casos</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">cambios totales</text>
  <rect x="476" y="207" width="184" height="43" fill="#4c8b63"/>
  <text x="568" y="197" font-size="17" text-anchor="middle">32 casos</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">domicilio corregido</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Las razones verificables convierten apelaciones en correcciones del sistema.</text>
</svg>

<!-- learning:pause -->
> **Bruno:** "¿Qué razón permite a una persona comprobar el rechazo y qué ocurre cuando presenta evidencia nueva?"

**Lo que muestra:** El código V47 no es una explicación accionable. Al traducirlo a domicilio desactualizado y revisar documentos, 32 rechazos cambian. La razón debe conectar con un dato verificable, permitir corrección y activar revisión humana cuando la decisión afecta acceso a crédito.

## Abrir una puerta humana

> **la responsable de crédito:** "V47 enviará a revisión, no a rechazo final."

> **Lidia:** "La persona verá la razón y podrá presentar evidencia."

> **Bruno:** "Versionaremos la fuente y registraremos correcciones."

> **Yaz:** "También mediremos apelaciones y cambios por grupo."

> **la responsable de crédito:** "Ningún código cerrará una puerta sin una vía de revisión."

> **Yaz:** "Para repetir explicabilidad, revisión humana y derecho a corregir, ¿qué vamos a comprobar primero?"

> **Bruno:** "Vamos a limitar decisiones automáticas, mostrar razones comprobables y habilitar apelación humana y a revisar si el efecto se mantiene."

> **Lidia:** "La variable 47 tenía más autoridad que nombre."

**Regla:** una explicación útil permite verificar, corregir y apelar la información que sostuvo la decisión.
