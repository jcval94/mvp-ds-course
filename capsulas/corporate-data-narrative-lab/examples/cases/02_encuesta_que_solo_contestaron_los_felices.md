# La encuesta que llegaba después del problema

<!-- story
concept: sesgo de cobertura y no respuesta
characters: Renata, Celia, Tomás, la jefa
situation: el puntaje de satisfacción sube a 72 porque la encuesta solo se envía al terminar el trámite
bad_logic: si alguien no terminó, no es buen momento para preguntarle cómo le fue
escalation: los abandonos no reciben encuesta, el puntaje sube y el comité llama voz del cliente a una cuarta parte de los iniciadores
data_turn: Renata dibuja el embudo completo desde inicio hasta respuesta
chart: embudo de cobertura de encuesta
decision: reportar cobertura y escuchar una muestra de abandonos
punchline: El cliente inconforme no dio mala calificación; ni siquiera recibió el link.
rule: una encuesta no representa a quien nunca tuvo oportunidad de contestarla
synthetic_data: true
-->

## Setenta y dos puntos

> **La jefa:** "El puntaje de satisfacción subió a 72. ¿Quién manda la felicitación?"
>
> **Renata:** "Antes, ¿quién contestó?"
>
> **Tomás:** "Clientes."
>
> **Renata:** "Sí, Tomás. ¿Cuáles?"
>
> **Tomás:** "Los que terminaron el trámite y recibieron el correo."
>
> **Celia:** "¿Y los que se salieron antes?"
>
> **Tomás:** "No les llegó."
>
> **Celia:** "Justo eran los que tenían más cosas que decir."
>
> **Tomás:** "Por eso no quisimos molestarlos."

La encuesta se activaba con `trámite completado`. Era el único evento estable
del sistema y la presentación cerraba esa noche. Renata había pedido un
disparador para abandono. Le dijeron que entraba “en la siguiente fase”, una
fase que ya llevaba dos presupuestos viviendo con sus papás.

## La voz del cliente, pero no de todos

> **La jefa:** "A ver, los 72 puntos sí son reales."
>
> **Renata:** "Sí. Para la gente que terminó y contestó."
>
> **Tomás:** "Entonces podemos poner `voz del cliente`."
>
> **Celia:** "Pon `voz del cliente que sobrevivió al trámite`."
>
> **Tomás:** "Eso se oye agresivo."
>
> **Celia:** "El trámite también."
>
> **La jefa:** "¿Cuánta gente estamos dejando fuera?"
>
> **Renata:** "Todavía no sé. El reporte empieza cuando se manda la encuesta."
>
> **Celia:** "Qué práctico. La gente desaparece antes de que empiece el reporte."

Dos meses después, el puntaje subió otros tres puntos. También subieron las
llamadas de personas que no podían terminar. En el informe, ambas cosas vivían
en páginas distintas y nunca se saludaban.

## El embudo completo

> **Renata:** "Abrí el proceso desde que la persona entra, no desde que recibe el correo."
>
> **La jefa:** "¿Cuántas empiezan?"
>
> **Renata:** "Diez mil. Terminan seis mil doscientas. Responden mil quinientas."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="Embudo de clientes que inician, terminan, reciben encuesta y responden">
  <rect width="720" height="300" fill="#fff"/>
  <text x="40" y="30" font-size="18" font-weight="bold">Quién tuvo oportunidad de opinar</text>
  <rect x="70" y="55" width="580" height="42" fill="#286d9b"/>
  <rect x="150" y="115" width="420" height="42" fill="#5a91b5"/>
  <rect x="164" y="175" width="392" height="42" fill="#87afc8"/>
  <rect x="285" y="235" width="150" height="34" fill="#c64e36"/>
  <text x="86" y="82" font-size="15" fill="#fff">10,000 iniciaron</text>
  <text x="166" y="142" font-size="15" fill="#fff">6,200 terminaron</text>
  <text x="180" y="202" font-size="15" fill="#17313d">6,000 recibieron encuesta</text>
  <text x="300" y="258" font-size="15" fill="#fff">1,500 respondieron</text>
  <text x="460" y="108" font-size="14" fill="#9f3625">3,800 abandonaron antes del envío</text>
</svg>

<!-- learning:pause -->
> **Celia:** "Entonces, cuando decimos satisfacción de clientes, ¿estamos hablando de diez mil personas o de las mil quinientas que sí llegaron hasta el final?"

**Lo que muestra:** La calificación describe a quienes terminaron, recibieron
la invitación y respondieron. No incluye a quienes abandonaron antes. Aquí hay
sesgo de cobertura y también no respuesta; son dos ausencias distintas.

## El correo nuevo

> **La jefa:** "Publicamos el puntaje, pero junto con cobertura y abandono."
>
> **Tomás:** "¿Y si el número baja cuando preguntemos antes?"
>
> **Renata:** "No bajó la experiencia. Dejamos de entrevistar solo a los que llegaron."
>
> **Celia:** "El cliente inconforme no dio mala calificación; ni siquiera recibió el link."

El siguiente mes se envió una pregunta corta a una muestra de abandonos, con
consentimiento y sin perseguir a nadie con cinco recordatorios.

**Regla:** Una encuesta no representa a quien nunca tuvo oportunidad de
contestarla.
