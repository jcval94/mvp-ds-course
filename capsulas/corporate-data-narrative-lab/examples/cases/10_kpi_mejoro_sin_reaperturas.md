# El KPI que mejoró dejando de contar reaperturas

<!-- story
concept: cambio de definición de KPI
characters: Sofía, Carlos, Diana, el director
situation: la resolución al primer contacto mejora después de excluir casos reabiertos
bad_logic: una nueva definición puede compararse con la histórica porque conserva el mismo nombre
escalation: el KPI sube, se paga bono y los casos reabiertos quedan en otro reporte
data_turn: Sofía reconstruye la serie con una definición constante
chart: dos líneas oficial y comparable
decision: versionar la definición y conservar serie comparable
punchline: El indicador mejoró en cuanto dejamos de invitar a los casos que regresaban.
rule: un KPI con la misma etiqueta puede estar respondiendo otra pregunta
synthetic_data: true
-->

## El mejor trimestre

> **El director:** "Resolución al primer contacto subió de 68 a 84 por ciento. Récord."
>
> **Sofía:** "¿Cambió algo en la definición?"
>
> **Diana:** "Nada importante."
>
> **Carlos:** "¿Qué significa nada importante?"
>
> **Diana:** "Los casos que reabren ya no cuentan como primer contacto."
>
> **Sofía:** "Pero justo demuestran que no se resolvieron."
>
> **Diana:** "Sí se resolvieron. Luego tuvieron otra necesidad."
>
> **Carlos:** "Con el mismo folio y el mismo problema."
>
> **Diana:** "Una necesidad muy parecida."

La nueva regla nació porque dos sistemas no conciliaban reaperturas. Sacarlas
permitió cerrar el reporte a tiempo. El problema fue que el parche recibió
nombre definitivo, meta trimestral y un bono que llegó antes que la corrección.
Las llamadas repetidas, por supuesto, siguieron llegando.

## Dos reportes, una sola realidad

> **El director:** "A ver, las reaperturas siguen visibles."
>
> **Sofía:** "¿Dónde?"
>
> **Diana:** "En el reporte de seguimiento posterior."
>
> **Carlos:** "¿Ese reporte llega al comité?"
>
> **Diana:** "No, porque el comité revisa primer contacto."
>
> **Carlos:** "Entonces el problema sí está visible. Nada más no para la gente que decide."
>
> **El director:** "No podemos cambiar el número ahorita. Ya se pagó el bono."
>
> **Sofía:** "El bono no vuelve comparable la historia."
>
> **Diana:** "Podemos aclararlo en letra pequeña."
>
> **Carlos:** "Si la letra explica dieciséis puntos, ya no es letra pequeña. Es el reporte."
>
> **El director:** "¿Quién aprobó sacar las reaperturas?"
>
> **Diana:** "Se aprobó en una junta de conciliación."
>
> **Sofía:** "¿Estaba Negocio?"
>
> **Diana:** "No, porque era una junta técnica."
>
> **Carlos:** "¿Y estaba Data?"
>
> **Diana:** "No, porque era una conciliación operativa."
>
> **El director:** "Qué bien. La definición se aprobó sin molestar a nadie que la usa."

## La serie con la misma regla

> **Sofía:** "Recalculé todos los meses contando reaperturas como antes."
>
> **El director:** "¿Seguimos en récord?"
>
> **Sofía:** "No. La mejora real es de tres puntos."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="KPI oficial sube al cambiar definición mientras serie comparable cambia poco">
  <rect width="720" height="300" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Resolución al primer contacto</text>
  <line x1="65" y1="250" x2="675" y2="250" stroke="#777"/>
  <line x1="65" y1="55" x2="65" y2="250" stroke="#777"/>
  <line x1="390" y1="55" x2="390" y2="250" stroke="#c44b34" stroke-dasharray="6 5"/>
  <text x="398" y="72" font-size="13" fill="#c44b34">cambio de definición</text>
  <polyline points="80,190 160,182 240,188 320,180 405,120 490,103 575,92 655,86" fill="none" stroke="#2f79a2" stroke-width="5"/>
  <polyline points="80,190 160,182 240,188 320,180 405,176 490,170 575,166 655,162" fill="none" stroke="#6b747d" stroke-width="5"/>
  <text x="515" y="105" font-size="14" fill="#2f79a2">oficial: 84%</text>
  <text x="515" y="184" font-size="14" fill="#6b747d">misma definición: 71%</text>
</svg>

<!-- learning:pause -->
> **Carlos:** "Para saber si el equipo mejoró, ¿qué pasa cuando calculamos todos los meses con la misma regla?"

**Lo que muestra:** La línea oficial salta cuando dejan de contar reaperturas.
Con una definición constante, la mejora es pequeña. El KPI cambió de pregunta;
por eso necesita versión y una serie comparable.

## El récord con fecha

> **El director:** "Publicamos ambas líneas y marcamos desde cuándo cambió la definición."
>
> **Diana:** "¿Y el récord?"
>
> **Sofía:** "Récord de la versión nueva."
>
> **Carlos:** "El indicador mejoró en cuanto dejamos de invitar a los casos que regresaban."

**Regla:** Un KPI con la misma etiqueta puede estar respondiendo otra pregunta.
