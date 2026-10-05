# La regla secreta que terminó en la capacitación

<!-- story
concept: manipulación alrededor de un umbral
characters: Paula, Beto, Renata, el jefe
situation: una alerta revisa operaciones mayores a diez mil pesos
bad_logic: mantener un umbral fijo evita riesgo porque todos conocen la regla
escalation: la operación divide montos, la capacitación enseña el límite y el comité propone subirlo
data_turn: Paula muestra la acumulación justo debajo de diez mil
chart: histograma con pico bajo el umbral
decision: usar señales múltiples, monitorear desplazamiento y revisar casos
punchline: La regla era confidencial hasta que la pusieron en el examen obligatorio.
rule: un umbral fijo también enseña cómo evitarlo
synthetic_data: true
-->

## La alerta de diez mil

> **El jefe:** "La regla está funcionando. Casi no tenemos alertas arriba de diez mil pesos."
>
> **Paula:** "Tenemos un montón en nueve mil novecientos."
>
> **Beto:** "Pues están abajo."
>
> **Renata:** "Por cien pesos."
>
> **Beto:** "La regla dice arriba de diez mil."
>
> **Paula:** "¿Y por qué antes los montos estaban repartidos y ahora todos aman el nueve mil novecientos?"
>
> **Beto:** "La gente aprende."
>
> **Renata:** "Eso es justo lo que me preocupa."

La regla se creó para priorizar revisión manual cuando el equipo tenía tres
personas y dos semanas de atraso. Funcionó al inicio. Después apareció en una
guía operativa para que nadie activara alertas “por error”.
La guía tenía ejemplos, ejercicios y una tabla completa de montos que convenía
no cruzar. Fue la capacitación mejor aprobada del trimestre.

## La mejora propuesta

> **El jefe:** "Si se acumulan abajo de diez mil, subimos el límite a quince."
>
> **Paula:** "Entonces se van a acumular abajo de quince."
>
> **Beto:** "No necesariamente."
>
> **Renata:** "¿La gente que aprendió diez mil se va a olvidar de sumar?"
>
> **Beto:** "Podemos no comunicar el nuevo límite."
>
> **Paula:** "El anterior era confidencial y salió en la capacitación."
>
> **El jefe:** "¿Quién lo puso?"
>
> **Beto:** "Cumplimiento pidió transparencia."
>
> **Renata:** "Transparencia para brincar la alerta. Muy completo el curso."
>
> **El jefe:** "¿Cuánta gente tomó la capacitación?"
>
> **Beto:** "Toda la operación."
>
> **Paula:** "¿Y cuánta aprobó?"
>
> **Beto:** "Noventa y seis por ciento."
>
> **Renata:** "Se nota. El cuatro por ciento restante todavía manda once mil."

## El montón de nueve mil novecientos

> **Paula:** "Miren cómo cambió la distribución después de publicar la guía."
>
> **El jefe:** "Eso sí está demasiado acomodado."
>
> **Beto:** "Puede ser casualidad."
>
> **Renata:** "Una casualidad con calculadora."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="Histograma con acumulación de operaciones justo debajo del umbral de diez mil pesos">
  <rect width="720" height="300" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Operaciones por monto después de publicar la guía</text>
  <line x1="60" y1="245" x2="680" y2="245" stroke="#777"/>
  <rect x="80" y="210" width="65" height="35" fill="#6da0bc"/>
  <rect x="155" y="195" width="65" height="50" fill="#6da0bc"/>
  <rect x="230" y="180" width="65" height="65" fill="#6da0bc"/>
  <rect x="305" y="155" width="65" height="90" fill="#6da0bc"/>
  <rect x="380" y="65" width="65" height="180" fill="#d58b30"/>
  <rect x="455" y="215" width="65" height="30" fill="#c64e36"/>
  <rect x="530" y="224" width="65" height="21" fill="#c64e36"/>
  <line x1="450" y1="50" x2="450" y2="250" stroke="#9f3625" stroke-width="4"/>
  <text x="458" y="67" font-size="14" fill="#9f3625">alerta: $10,000</text>
  <text x="360" y="270" font-size="13">$9,500-$9,999</text>
</svg>

<!-- learning:pause -->
> **Paula:** "Si el comportamiento se amontona justo antes del límite, ¿la regla está detectando riesgo o enseñando dónde esconderlo?"

**Lo que muestra:** El pico bajo diez mil aparece después de divulgar la regla.
El umbral dejó una frontera fácil de evitar. Hay que combinar señales y
monitorear cómo cambia la distribución, no solo mover la línea.

## La regla dejó de estar sola

> **El jefe:** "Mantenemos el monto como una señal, pero agregamos frecuencia, relación entre cuentas y revisión de patrones."
>
> **Beto:** "¿Y quitamos el límite de la capacitación?"
>
> **Renata:** "Sí. Podemos enseñar a reportar riesgo sin dar tutorial de evasión."
>
> **Paula:** "La regla era confidencial hasta que la pusieron en el examen obligatorio."

**Regla:** Un umbral fijo también enseña cómo evitarlo.
