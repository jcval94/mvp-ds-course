# La apelacion que pedia entrar a la cuenta bloqueada

<!-- story
concept: apelacion y gobernanza de decisiones automatizadas
characters: Rocio, Ivan, Teresa, el director
situation: un flujo automatico bloquea cuentas y solo permite apelar desde la cuenta bloqueada
bad_logic: si el sistema ya decidio, el usuario puede resolver todo por autoservicio
escalation: las personas afectadas no pueden ver motivo ni presentar evidencia
data_turn: Rocio dibuja el flujo de bloqueo, notificacion y apelacion
chart: flujo de apelacion
decision: abrir canal externo, mostrar motivo y registrar revision
punchline: La apelacion existia; estaba guardada detras de la puerta cerrada.
rule: toda decision automatizada de alto impacto necesita explicacion y via real de apelacion
synthetic_data: true
-->

## El canal autoservicio

> **Rocio:** "El flujo ya tiene boton de apelacion."

> **Ivan:** "El boton aparece despues de iniciar sesion."

> **Teresa:** "Eso protege datos del usuario."

> **Rocio:** "Tambien protege al bloqueo de ser revisado."

> **Teresa:** "No queriamos abrir canales inseguros."

> **el director:** "Abrimos un laberinto seguro."

Las personas afectadas no pueden ver motivo ni presentar evidencia. Para cuando llegó la siguiente junta, el procedimiento cómodo ya había producido una excepción imposible de ignorar.

## La llave adentro del cuarto

> **Teresa:** "Que llamen al centro de ayuda."

> **Ivan:** "El centro pide validar en la cuenta."

> **Teresa:** "Entonces si son ellos, podran entrar."

> **el director:** "No pueden, porque por eso llaman."

> **Teresa:** "El sistema cierra el caso por falta de respuesta."

> **Rocio:** "Respuesta que encerramos con el caso."

> **Ivan:** "Las personas afectadas no pueden ver motivo ni presentar evidencia."

> **el director:** "Quiero ver flujo de apelacion antes de decidir."

Rocio dibuja el flujo de bloqueo, notificacion y apelacion. La evidencia puso nombre y tamaño a esa excepción, de modo que la corrección dejó de depender de insistir más fuerte.

## El flujo se mordia la cola

> **Rocio:** "Dibuje el recorrido desde bloqueo hasta apelacion."

> **el director:** "Donde se atoran las personas."

> **Rocio:** "En el mismo paso que exige acceso negado."

> **Ivan:** "Ahora entiendo por qué si el sistema ya decidio, el usuario puede resolver todo por autoservicio."

> **Rocio:** "Respondía otra pregunta; no servía para abrir canal externo, mostrar motivo y registrar revision."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="flujo de apelacion">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">flujo de apelacion</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="124" height="175" fill="#286d9b"/>
  <text x="132" y="75" font-size="18" text-anchor="middle">84</text>
  <text x="132" y="286" font-size="13" text-anchor="middle">notificados</text>
  <rect x="222" y="196" width="124" height="64" fill="#d58b2f"/>
  <text x="284" y="186" font-size="18" text-anchor="middle">31</text>
  <text x="284" y="286" font-size="13" text-anchor="middle">entienden motivo</text>
  <rect x="374" y="223" width="124" height="37" fill="#4c8b63"/>
  <text x="436" y="213" font-size="18" text-anchor="middle">18</text>
  <text x="436" y="286" font-size="13" text-anchor="middle">pueden apelar</text>
  <rect x="526" y="96" width="124" height="164" fill="#c64e36"/>
  <text x="588" y="86" font-size="18" text-anchor="middle">79</text>
  <text x="588" y="286" font-size="13" text-anchor="middle">canal externo</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La via real de apelacion no puede depender de acceso bloqueado.</text>
</svg>

<!-- learning:pause -->
> **Ivan:** "Cuando una decision automatica afecta a alguien, que debe existir fuera del sistema que lo bloqueo."

**Lo que muestra:** El flujo muestra un ciclo imposible: el usuario necesita entrar para apelar, pero la decision le impide entrar. Una apelacion real requiere canal alterno, motivo comprensible, evidencia recibida y revision registrada.

## Apelar desde afuera

> **el director:** "Abrimos apelacion externa con motivo y folio visible."

> **el director:** "Dejen por escrito quién va a abrir canal externo, mostrar motivo y registrar revision."

> **Teresa:** "Habra mas casos para revisar."

> **Rocio:** "Al menos seran casos que pueden entrar por la puerta."

> **Rocio:** "¿Qué cambiaremos después de revisar flujo de apelacion?"

> **Ivan:** "La decisión es abrir canal externo, mostrar motivo y registrar revision."

> **Teresa:** "Y volvemos a medir apelacion y gobernanza de decisiones automatizadas antes del siguiente cierre."

> **Ivan:** "La apelacion existia; estaba guardada detras de la puerta cerrada."

**Regla:** toda decision automatizada de alto impacto necesita explicacion y via real de apelacion.
