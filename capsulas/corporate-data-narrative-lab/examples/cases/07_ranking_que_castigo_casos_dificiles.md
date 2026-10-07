# El ranking donde convenía hacerse menso

<!-- story
concept: métrica de velocidad sin ajuste por complejidad
characters: Mónica, Sara, Luis, el gerente
situation: Sara queda última en resoluciones diarias porque atiende los casos más complicados
bad_logic: una regla igual para todos es justa aunque el trabajo asignado sea distinto
escalation: especialistas pierden bono, los casos fáciles se pelean y los difíciles terminan con quien no los abandona
data_turn: Mónica cruza dificultad, velocidad, calidad y reaperturas
chart: dispersión de complejidad contra resoluciones
decision: comparar dentro de dificultad y premiar calidad sostenida
punchline: Luis ganó el bono y Sara resolvió lo que hacía posible pagarlo.
rule: una métrica de velocidad sin dificultad premia evitar lo complicado
synthetic_data: true
-->

## El último lugar

> **El gerente:** "Sara volvió a quedar última en el ranking. Cinco casos resueltos por día."
>
> **Mónica:** "¿Qué casos le mandan?"
>
> **Luis:** "Los que llegan con reclamo previo, fraude o documentos incompletos."
>
> **Sara:** "Los que nadie quiere tomar, pues."
>
> **El gerente:** "La regla es igual para todos."
>
> **Mónica:** "La regla sí. El trabajo que les cae no."
>
> **Luis:** "Yo cierro doce diarios."
>
> **Sara:** "Cambios de correo y desbloqueos."
>
> **Luis:** "También requieren compromiso."
>
> **Sara:** "Sí, Luis. Sobre todo cuando el cliente olvidó la contraseña dos veces."

El bono se calculaba esa semana. Resoluciones por día era una métrica fácil de
entender, fácil de auditar y muy fácil de aprender a jugar. Cuando se creó, casi
todos atendían lo mismo. Luego aparecieron especialistas, pero la fórmula no se
enteró porque nadie le mandó el cambio por correo.

## La nueva forma de colaborar

> **El gerente:** "Si alguien termina sus casos simples, puede apoyar a Sara."
>
> **Luis:** "Claro. ¿Eso cuenta en mi ranking?"
>
> **El gerente:** "No, porque el caso queda a nombre de Sara."
>
> **Luis:** "Entonces mejor le doy orientación."
>
> **Sara:** "¿Qué orientación?"
>
> **Luis:** "Ánimo."
>
> **Mónica:** "No manches."
>
> **El gerente:** "También valoramos el trabajo en equipo."
>
> **Sara:** "¿En el bono?"
>
> **El gerente:** "En la cultura."

Tres ciclos después, la gente revisaba la cola antes de tomar un folio. Los
casos fáciles duraban segundos sin dueño. Los complicados podían pasar veinte
minutos disponibles hasta que Sara o alguien de su equipo los recogía.

## Velocidad con dificultad

> **Mónica:** "Crucé resoluciones con dificultad, calidad y reaperturas."
>
> **El gerente:** "¿Sara sigue abajo?"
>
> **Mónica:** "En velocidad bruta sí. Entre casos parecidos, está arriba y reabre menos."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Relación entre complejidad de casos y resoluciones diarias">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Velocidad según dificultad del trabajo</text>
  <line x1="70" y1="255" x2="665" y2="255" stroke="#777"/>
  <line x1="70" y1="55" x2="70" y2="255" stroke="#777"/>
  <text x="280" y="290" font-size="14">dificultad promedio</text>
  <text x="17" y="190" font-size="14" transform="rotate(-90 17 190)">casos resueltos por día</text>
  <line x1="130" y1="82" x2="620" y2="225" stroke="#8a929a" stroke-dasharray="6 5"/>
  <circle cx="155" cy="78" r="12" fill="#2f77a1"/><text x="115" y="62" font-size="13">Luis: 12</text>
  <circle cx="230" cy="104" r="9" fill="#5692b3"/>
  <circle cx="355" cy="150" r="9" fill="#d69a42"/>
  <circle cx="500" cy="196" r="9" fill="#c7654b"/>
  <circle cx="590" cy="215" r="14" fill="#4c8b63"/><text x="525" y="190" font-size="13">Sara: 5, calidad 94%</text>
  <text x="90" y="275" font-size="13" fill="#9f3625">El ranking bruto mezcla velocidad con tipo de caso.</text>
</svg>

<!-- learning:pause -->
> **Sara:** "Si me comparan con quien recibe lo fácil, ¿cómo saben si soy lenta o si el caso simplemente tarda más?"

**Lo que muestra:** A mayor dificultad, menos cierres diarios. Para evaluar
desempeño hay que comparar trabajo semejante y revisar calidad y reaperturas.
La métrica estaba confundiendo complejidad con eficiencia.

## El bono corregido

> **El gerente:** "Probamos seis semanas con grupos de dificultad y calidad mínima."
>
> **Luis:** "¿Entonces mis doce ya no valen?"
>
> **Mónica:** "Sí valen. Nada más ya no valen el doble que resolver un fraude."
>
> **Sara:** "¿Y el trabajo en equipo?"
>
> **El gerente:** "Ahora sí entra al bono."
>
> **Sara:** "Mira. La cultura aprendió Excel."
>
> **Mónica:** "Luis ganó el bono y Sara resolvió lo que hacía posible pagarlo."

**Regla:** Una métrica de velocidad sin dificultad premia evitar lo complicado.
