# El piloto que ganó en diciembre

<!-- story
concept: estacionalidad y comparación temporal inválida
characters: Jiménez, Rodríguez, Iván, la directora
situation: un piloto presume 25% menos incidencias durante diciembre y enero
bad_logic: comparar meses de temporada alta contra meses de temporada baja atribuye toda la caída al piloto
escalation: se aprueba expansión, se fija una meta anual y agosto parece fracaso
data_turn: Iván abre tres años de historia y una región sin piloto
chart: serie estacional con grupo comparable
decision: separar baja esperada de efecto adicional y repetir fuera de temporada fácil
punchline: El piloto funcionó; la presentación fue la que se emocionó de más.
rule: no confundas una buena temporada con una buena intervención
synthetic_data: true
-->

## El veinticinco por ciento

> **La directora:** "El piloto bajó las incidencias veinticinco por ciento en diciembre y enero. Lo escalamos."
>
> **Jiménez:** "¿Contra qué meses lo compararon?"
>
> **Iván:** "Contra septiembre, octubre y noviembre."
>
> **Rodríguez:** "¿Y normalmente qué pasa de diciembre a enero?"
>
> **Iván:** "Bajan las incidencias."
>
> **Jiménez:** "Ah. Entonces hubiera bajado incluso si no hubiéramos hecho nada."
>
> **Iván:** "Sí, así mero."
>
> **Jiménez:** "¿Y cuánto nos costó hacer el análisis?"
>
> **Rodríguez:** "Pues lo que le pagan a Jiménez en el mes."
>
> **Jiménez:** "No manches, tampoco fue tan barato."
>
> **La directora:** "Bueno, menos mal. Pero de todos modos tenemos que hacer algo."

El piloto sí había cambiado rutinas y corregido alertas. El problema no era
decir que ayudó. Era cobrarle al proyecto toda una caída que diciembre llevaba
años haciendo gratis.
Cada año.

## La meta de agosto

> **La directora:** "La meta anual será mantener el veinticinco por ciento."
>
> **Iván:** "En temporada alta no vamos a ver el mismo nivel."
>
> **Rodríguez:** "Entonces en agosto vamos a parecer peor aunque el proceso funcione."
>
> **La directora:** "No pongamos `peor`. Pongamos `oportunidad de adopción`."
>
> **Jiménez:** "¿Eso baja incidencias?"
>
> **La directora:** "No, pero baja el tono del correo."
>
> **Iván:** "Necesitamos saber cuánto baja todos los años y cuánto bajó de más ahora."
>
> **La directora:** "¿Y cómo se ve la historia?"
>
> **Rodríguez:** "Porque si agosto sale mal, van a decir que Operación dejó de creer en el piloto."
>
> **Jiménez:** "Y Operación va a seguir creyendo. Nada más desde una llamada de atención."

## Tres años completos

> **Iván:** "Cada diciembre hay una caída parecida. La región sin piloto bajó dieciocho por ciento."
>
> **Jiménez:** "Entonces el piloto pudo aportar siete puntos, no veinticinco."
>
> **Rodríguez:** "Sigue siendo bueno."
>
> **Jiménez:** "Sí. Nada más ya no alcanza para ponerle capa."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Serie de incidencias con valles estacionales y comparación entre región tratada y región sin piloto">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Incidencias mensuales, tres años</text>
  <line x1="60" y1="255" x2="680" y2="255" stroke="#777"/>
  <line x1="60" y1="55" x2="60" y2="255" stroke="#777"/>
  <polyline points="70,90 95,105 120,158 145,190 170,112 195,94 220,101 245,121 270,163 295,193 320,116 345,96 370,104 395,126 420,168 445,197 470,120 495,98 520,106 545,132 570,174 595,204 620,124 650,102" fill="none" stroke="#6d7780" stroke-width="4"/>
  <polyline points="520,106 545,132 570,174 595,204 620,124" fill="none" stroke="#2f79a2" stroke-width="7"/>
  <polyline points="520,100 545,122 570,156 595,180 620,116" fill="none" stroke="#c64e36" stroke-width="4"/>
  <text x="72" y="280" font-size="13">Año 1</text><text x="285" y="280" font-size="13">Año 2</text><text x="510" y="280" font-size="13">Año 3</text>
  <text x="430" y="70" font-size="14" fill="#2f79a2">región con piloto: -25%</text>
  <text x="430" y="90" font-size="14" fill="#c64e36">región sin piloto: -18%</text>
  <text x="220" y="225" font-size="13" fill="#9f3625">los valles de diciembre-enero se repiten</text>
</svg>

<!-- learning:pause -->
> **Jiménez:** "Antes de atribuirle todo al piloto, ¿qué habría pasado en esos mismos meses sin hacer nada?"

**Lo que muestra:** El histórico y la región sin piloto sugieren una baja
cercana a 18% por temporada. La diferencia adicional ronda siete puntos. La
comparación anterior confundía estacionalidad con efecto del piloto.

## Menos grande, más cierto

> **La directora:** "Cambiamos el informe: caída total veinticinco, baja esperada dieciocho, efecto adicional estimado siete."
>
> **Rodríguez:** "¿Y repetimos la prueba fuera de diciembre?"
>
> **Iván:** "Sí, antes de convertir enero en meta de agosto."
>
> **Jiménez:** "El piloto funcionó; la presentación fue la que se emocionó de más."

**Regla:** No confundas una buena temporada con una buena intervención.
