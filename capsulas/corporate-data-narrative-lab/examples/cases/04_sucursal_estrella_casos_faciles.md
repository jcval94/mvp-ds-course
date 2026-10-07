# La sucursal estrella que recibía lo fácil

<!-- story
concept: sesgo de asignación y comparación injusta
characters: Celia, Omar, Brenda, el director
situation: Norte gana por tercer trimestre con mejor tiempo de resolución
bad_logic: el mismo promedio permite comparar sucursales aunque reciban casos distintos
escalation: Norte recibe trámites simples, Sur absorbe reclamos graves y el premio empuja a transferir casos difíciles
data_turn: Celia separa resultados por nivel de dificultad
chart: barras de desempeño bruto y ajustado
decision: comparar casos semejantes y vigilar la asignación
punchline: El trofeo se quedó en Norte; la metodología tuvo que viajar a Sur.
rule: no premies diferencias de asignación como si fueran diferencias de desempeño
synthetic_data: true
-->

## La tercera foto con trofeo

> **El director:** "Norte volvió a quedar primero. Resuelve en nueve minutos promedio."
>
> **Brenda:** "Sur está en veintisiete."
>
> **Omar:** "¿Qué tipo de casos recibe cada una?"
>
> **Brenda:** "Norte altas de contraseña y cambios de domicilio."
>
> **Celia:** "Sur recibe fraudes, aclaraciones y clientes que ya hablaron con tres personas."
>
> **El director:** "Pero el indicador es igual para todos."
>
> **Omar:** "El indicador sí. Los casos no."
>
> **Brenda:** "Norte también tiene casos difíciles."
>
> **Celia:** "Sí. Los manda a Sur."

La ceremonia empezaba en veinte minutos. Ya habían impreso el diploma, pedido
el pastel y reservado quince minutos para que Norte explicara sus “hábitos de
alto rendimiento”.

## La práctica de alto rendimiento

> **El director:** "A ver, tampoco les quitemos mérito. Nueve minutos son nueve minutos."
>
> **Omar:** "Claro. ¿Cuántos reclamos graves cerraron?"
>
> **Brenda:** "Seis."
>
> **Omar:** "¿Y Sur?"
>
> **Brenda:** "Ciento ochenta y cuatro."
>
> **El director:** "Entonces Sur necesita trabajar su velocidad."
>
> **Celia:** "O Norte necesita dejar de poner `requiere especialista` cada vez que alguien levanta la voz."
>
> **Brenda:** "Eso está permitido."
>
> **Celia:** "También está permitido no competir por el premio. Mira qué conveniente."
>
> **Omar:** "¿Quién decidió que Norte recibiera los trámites simples?"
>
> **Brenda:** "El enrutador."
>
> **Omar:** "¿Y quién configuró el enrutador?"
>
> **Brenda:** "Norte, cuando apoyó el proyecto."

Al trimestre siguiente, las transferencias subieron. Nadie había ordenado
evitar casos difíciles. El ranking solo había explicado, con bastante claridad,
qué comportamiento recibía pastel.
Sur también empezó a perder gente: resolver lo complicado daba más trabajo,
menos bono y ninguna foto con diploma.

## La comparación pareja

> **Celia:** "Separé los casos simples, medios y complicados."
>
> **El director:** "¿Sigue ganando Norte?"
>
> **Celia:** "En simples, sí por poquito. En complicados, Sur resuelve más y reabre menos."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="Tiempo de resolución bruto y resultado ajustado por dificultad">
  <rect width="720" height="300" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Resultado por mezcla de casos</text>
  <text x="60" y="62" font-size="14">Promedio bruto, minutos</text>
  <rect x="210" y="48" width="135" height="28" fill="#2d739e"/>
  <rect x="210" y="86" width="405" height="28" fill="#c54d36"/>
  <text x="355" y="68" font-size="14">Norte 9</text>
  <text x="625" y="106" font-size="14">Sur 27</text>
  <text x="60" y="155" font-size="14">Casos complicados resueltos sin reapertura</text>
  <rect x="210" y="142" width="96" height="30" fill="#2d739e"/>
  <rect x="210" y="184" width="390" height="30" fill="#4c8b63"/>
  <text x="316" y="163" font-size="14">Norte 6</text>
  <text x="610" y="205" font-size="14">Sur 184</text>
  <text x="210" y="250" font-size="14" fill="#9f3625">La mezcla explica gran parte del ranking bruto.</text>
</svg>

<!-- learning:pause -->
> **Omar:** "Si Norte y Sur no reciben el mismo trabajo, ¿qué tendríamos que comparar para saber quién lo hace mejor?"

**Lo que muestra:** El promedio bruto mezcla desempeño con asignación. Al
comparar casos de dificultad semejante y revisar reaperturas, Sur deja de
parecer ineficiente. Es un problema de sesgo de asignación.

## El diploma con letra atrás

> **El director:** "Conservamos el reconocimiento, pero desde el siguiente ciclo comparamos por dificultad y auditamos transferencias."
>
> **Brenda:** "¿Todavía damos el pastel?"
>
> **Celia:** "Sí. Nada más ya no viene con permiso para mandar lo difícil a otra sucursal."
>
> **Omar:** "El trofeo se quedó en Norte; la metodología tuvo que viajar a Sur."

**Regla:** No premies diferencias de asignación como si fueran diferencias de
desempeño.
