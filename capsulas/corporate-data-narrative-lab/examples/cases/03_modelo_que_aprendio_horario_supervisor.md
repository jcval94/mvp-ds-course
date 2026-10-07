# El modelo de 97% que llegaba cuatro horas tarde

<!-- story
concept: fuga de información temporal
characters: Abril, Iván, Sergio, la directora
situation: un modelo presume 97% de precisión usando una evaluación cargada después de la decisión
bad_logic: si una columna está en la tabla final entonces estaba disponible para predecir
escalation: la evaluación posterior domina el modelo, se promete una demo y se propone rellenarla con cero en producción
data_turn: Abril ordena cada variable por la hora real en que existe
chart: línea de tiempo de disponibilidad
decision: reconstruir datos al momento de decidir y validar en sombra
punchline: La inteligencia artificial sí sabía el futuro; nada más esperaba a que ya hubiera pasado.
rule: un modelo solo puede usar información disponible antes de la decisión
synthetic_data: true
-->

## La demo de las ocho

> **La directora:** "El modelo dio 97% de precisión. ¿Ya podemos decir que usa inteligencia artificial?"
>
> **Abril:** "Sí usa. Lo que no sé es si adivina."
>
> **Sergio:** "La variable más importante es la evaluación del supervisor."
>
> **Abril:** "¿A qué hora se carga?"
>
> **Sergio:** "Está en la tabla."
>
> **Abril:** "Te pregunté la hora."
>
> **Sergio:** "Como a las seis de la tarde."
>
> **Iván:** "¿Y la alerta para cuándo la necesitamos?"
>
> **Sergio:** "A las dos."
>
> **Iván:** "No manches. El modelo llega cuando ya recogieron las sillas."

Eran las siete y veinte. La demo era a las ocho. El 97% ya estaba en la
presentación, en el correo y en una solicitud de presupuesto que describía el
resultado como “capacidad predictiva superior”.

## Una solución rápida

> **La directora:** "A ver, quizá el supervisor detecta cosas que sí estaban pasando."
>
> **Abril:** "Puede ser. Pero necesitamos las señales que veía antes de las dos, no su evaluación de las seis."
>
> **Sergio:** "En producción ponemos esa columna en cero hasta que llegue."
>
> **Iván:** "¿Y el modelo qué hace con el cero?"
>
> **Sergio:** "Aprende que todavía no sabemos."
>
> **Abril:** "No aprendió incertidumbre. Aprendió el dictamen del supervisor."
>
> **La directora:** "¿Cuánto baja si quitamos esa columna?"
>
> **Sergio:** "La precisión baja a 71%."
>
> **La directora:** "Qué feo se ve el presente cuando le quitas el futuro."

La propuesta de rellenar con cero sobrevivió doce minutos porque conservaba la
fecha de demo. Murió cuando Iván preguntó si también podían poner en cero el
incidente mientras llegaba la evaluación.

## A qué hora existe cada dato

> **Abril:** "Ordené las columnas por la hora en que realmente aparecen."
>
> **La directora:** "Enséñame."
>
> **Abril:** "La variable estrella nace cuatro horas después de la decisión."

<svg data-chart="central" viewBox="0 0 720 280" role="img" aria-label="Línea de tiempo de señales, decisión, incidente y evaluación del supervisor">
  <rect width="720" height="280" fill="#fff"/>
  <text x="36" y="30" font-size="18" font-weight="bold">Cuándo existe la información</text>
  <line x1="70" y1="145" x2="660" y2="145" stroke="#737b83" stroke-width="4"/>
  <line x1="285" y1="62" x2="285" y2="225" stroke="#c4432e" stroke-width="5"/>
  <text x="250" y="52" font-size="14" fill="#c4432e">14:00 decisión</text>
  <circle cx="160" cy="145" r="11" fill="#286d9b"/>
  <text x="104" y="178" font-size="14">13:40 señales</text>
  <circle cx="355" cy="145" r="11" fill="#d58b2f"/>
  <text x="322" y="178" font-size="14">14:25 incidente</text>
  <circle cx="510" cy="145" r="11" fill="#68727d"/>
  <text x="465" y="178" font-size="14">17:30 revisión</text>
  <circle cx="615" cy="145" r="12" fill="#c4432e"/>
  <text x="570" y="120" font-size="14">18:00 evaluación</text>
  <text x="415" y="92" font-size="14" fill="#9f3625">no disponible al decidir</text>
</svg>

<!-- learning:pause -->
> **Iván:** "Si a las dos todavía no existe la evaluación, ¿con qué información tendría que entrenarse el modelo?"

**Lo que muestra:** Solo puede usar señales disponibles antes de las 14:00. La
evaluación de las 18:00 contiene información posterior y hace que la validación
parezca brillante. El problema se llama fuga de información temporal.

## Menos mágico, más útil

> **La directora:** "Quitamos lo posterior, reconstruimos cada caso como se veía a las dos y corremos un mes en sombra."
>
> **Sergio:** "Entonces ya no podemos presumir 97% de precisión."
>
> **Abril:** "Podemos presumir que funciona antes del incidente."
>
> **Iván:** "La inteligencia artificial sí sabía el futuro; nada más esperaba a que ya hubiera pasado."

**Regla:** Un modelo solo puede usar información disponible antes de la
decisión.
