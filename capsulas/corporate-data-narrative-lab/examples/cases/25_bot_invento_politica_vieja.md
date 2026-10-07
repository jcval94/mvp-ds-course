# El bot que invento la politica vieja

<!-- story
concept: RAG, fuentes y respuestas generativas
characters: Paola, Rene, Miriam, el gerente
situation: un bot de soporte responde con politicas antiguas porque recupera documentos sin vigencia
bad_logic: si la respuesta cita un documento, entonces es correcta
escalation: el bot ofrece beneficios vencidos y soporte recibe reclamos
data_turn: Paola muestra respuestas por fuente, fecha y vigencia
chart: fuentes citadas
decision: filtrar documentos vigentes, mostrar fuente y mandar dudas raras a revision
punchline: El bot no viajo al pasado; nada mas tenia mejor acceso al archivo viejo.
rule: RAG mejora respuestas solo si recupera fuentes vigentes y verificables
synthetic_data: true
-->

## La respuesta con cita

> **Paola:** "El bot ya contesta con fuente, eso nos tranquiliza."

> **Rene:** "La fuente de ayer era una politica vencida."

> **Miriam:** "Pero cito el documento."

> **Paola:** "Citar algo viejo no lo vuelve vigente."

> **Miriam:** "Estaba en la carpeta oficial."

> **el gerente:** "Oficialmente abandonada, pero oficial."

El bot ofrece beneficios vencidos y soporte recibe reclamos. La presión por cerrar seguía ahí, pero ahora también había un caso concreto que mostraba por qué la salida era insuficiente.

## El documento correcto del ano equivocado

> **Miriam:** "Le pedimos que sea mas cuidadoso."

> **Rene:** "El bot no siente pena por usar archivos viejos."

> **Miriam:** "Podemos escribirle que prefiera lo nuevo."

> **el gerente:** "Si no sabe la fecha, prefiere lo que encuentra primero."

> **Miriam:** "Ayer prometio una bonificacion retirada."

> **Paola:** "La nostalgia ya tiene costo de soporte."

> **Rene:** "El bot ofrece beneficios vencidos y soporte recibe reclamos."

> **el gerente:** "Quiero ver fuentes citadas antes de decidir."

Paola muestra respuestas por fuente, fecha y vigencia. Al ordenar la evidencia, el equipo pudo distinguir una coincidencia conveniente de una señal útil para decidir.

## La fuente tambien caduca

> **Paola:** "Cruce cada respuesta con la fecha de su fuente."

> **el gerente:** "Cuantas venian de documentos vivos."

> **Paola:** "Las correctas citan politica vigente; las malas citan historia."

> **Rene:** "Ahora entiendo por qué si la respuesta cita un documento, entonces es correcta."

> **Paola:** "Respondía otra pregunta; no servía para filtrar documentos vigentes, mostrar fuente y mandar dudas raras a revision."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="fuentes citadas">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">fuentes citadas</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="174" height="175" fill="#286d9b"/>
  <text x="157" y="75" font-size="18" text-anchor="middle">68</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">vigente</text>
  <rect x="272" y="199" width="174" height="61" fill="#d58b2f"/>
  <text x="359" y="189" font-size="18" text-anchor="middle">24</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">vencida</text>
  <rect x="474" y="240" width="174" height="20" fill="#4c8b63"/>
  <text x="561" y="230" font-size="18" text-anchor="middle">8</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">sin dueno</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La cita necesita vigencia, no solo parecido.</text>
</svg>

<!-- learning:pause -->
> **Rene:** "Que debe revisar un sistema RAG ademas de encontrar texto parecido a la pregunta."

**Lo que muestra:** La grafica separa documentos vigentes, vencidos y sin dueno. RAG no garantiza verdad por si solo; solo trae contexto. Si el indice contiene basura o documentos viejos, la respuesta puede sonar segura y estar equivocada.

## Responder con fecha

> **el gerente:** "El indice solo toma fuentes vigentes con dueno."

> **el gerente:** "Dejen por escrito quién va a filtrar documentos vigentes, mostrar fuente y mandar dudas raras a revision."

> **Miriam:** "Habra preguntas que no responda."

> **Paola:** "Mejor silencio que beneficios fantasma."

> **Paola:** "¿Qué cambiaremos después de revisar fuentes citadas?"

> **Rene:** "La decisión es filtrar documentos vigentes, mostrar fuente y mandar dudas raras a revision."

> **Miriam:** "Y volvemos a medir RAG, fuentes y respuestas generativas antes del siguiente cierre."

> **Rene:** "El bot no viajo al pasado; nada mas tenia mejor acceso al archivo viejo."

**Regla:** RAG mejora respuestas solo si recupera fuentes vigentes y verificables.
