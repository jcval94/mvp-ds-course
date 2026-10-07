# El score que no sabia que era mudanza

<!-- story
concept: human in the loop para decisiones de alto impacto
characters: Ines, Marco, Paula, la directora
situation: un score de riesgo marca cambios normales como senales peligrosas
bad_logic: si el score sube, la decision automatica debe endurecerse
escalation: personas con eventos normales quedan bloqueadas sin explicacion
data_turn: Ines compara errores con y sin revision de contexto
chart: errores por umbral y revision
decision: usar score como alerta, pedir contexto y dejar apelacion
punchline: El score veia riesgo; Paula tuvo que recordarle que la gente se muda.
rule: en decisiones de alto impacto, el score debe informar, no sustituir el juicio
synthetic_data: true
-->

## El riesgo que subio solo

> **Ines:** "El score sube cuando alguien cambia direccion y telefono."

> **Marco:** "Eso tambien pasa cuando alguien se muda."

> **Paula:** "El patron se parece a fraude."

> **Ines:** "Parecerse no alcanza para bloquear."

> **Paula:** "La automatizacion baja tiempo de respuesta."

> **la directora:** "Tambien baja la oportunidad de explicar."

Personas con eventos normales quedan bloqueadas sin explicacion. El costo no era abstracto: alguien ya estaba corrigiendo a mano lo que la primera decisión había dejado pasar.

## Cambiar de vida parecia fraude

> **Paula:** "Subimos el umbral y ya."

> **Marco:** "Seguira castigando eventos normales extremos."

> **Paula:** "Entonces que la gente avise antes de vivir."

> **la directora:** "La vida no siempre abre ticket preventivo."

> **Paula:** "Podemos mandar mensaje automatico."

> **Ines:** "Si la cuenta esta bloqueada, no lo va a leer."

> **Marco:** "Personas con eventos normales quedan bloqueadas sin explicacion."

> **la directora:** "Quiero ver errores por umbral y revision antes de decidir."

Ines compara errores con y sin revision de contexto. Con la medida adecuada, el equipo identificó qué supuesto fallaba y pudo revisar la decisión sin empezar de cero.

## El contexto baja errores

> **Ines:** "Compare decisiones automaticas con revision de contexto."

> **la directora:** "Cuanto error quitamos al preguntar antes."

> **Ines:** "La revision conserva alertas y baja bloqueos injustos."

> **Marco:** "Ahora entiendo por qué si el score sube, la decision automatica debe endurecerse."

> **Ines:** "Respondía otra pregunta; no servía para usar score como alerta, pedir contexto y dejar apelacion."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="errores por umbral y revision">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">errores por umbral y revision</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="174" height="175" fill="#286d9b"/>
  <text x="157" y="75" font-size="18" text-anchor="middle">29</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">automatico</text>
  <rect x="272" y="134" width="174" height="126" fill="#d58b2f"/>
  <text x="359" y="124" font-size="18" text-anchor="middle">21</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">umbral alto</text>
  <rect x="474" y="218" width="174" height="42" fill="#4c8b63"/>
  <text x="561" y="208" font-size="18" text-anchor="middle">7</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">con revision</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La revision humana baja errores de alto impacto.</text>
</svg>

<!-- learning:pause -->
> **Marco:** "Que papel debe tener una persona cuando el modelo afecta acceso, dinero o derechos."

**Lo que muestra:** La evidencia separa score, contexto y decision. El score detecta similitudes, pero una revision humana puede identificar explicaciones normales y pedir datos adicionales. Human in the loop no es adorno: reduce dano cuando la decision afecta a personas.

## Alerta no es sentencia

> **la directora:** "El bloqueo automatico queda limitado a casos confirmados."

> **la directora:** "Dejen por escrito quién va a usar score como alerta, pedir contexto y dejar apelacion."

> **Paula:** "Algunas revisiones tardaran mas."

> **Ines:** "La rapidez deja de atropellar mudanzas."

> **Ines:** "¿Qué cambiaremos después de revisar errores por umbral y revision?"

> **Marco:** "La decisión es usar score como alerta, pedir contexto y dejar apelacion."

> **Paula:** "Y volvemos a medir human in the loop para decisiones de alto impacto antes del siguiente cierre."

> **Marco:** "El score veia riesgo; Paula tuvo que recordarle que la gente se muda."

**Regla:** en decisiones de alto impacto, el score debe informar, no sustituir el juicio.
