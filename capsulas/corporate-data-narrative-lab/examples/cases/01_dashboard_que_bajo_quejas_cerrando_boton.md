# El botón que arregló las quejas

<!-- story
concept: sesgo de medición por cambio en el canal de captura
characters: Mónica, Leo, Paula, el jefe
situation: Producto celebra 40% menos quejas después de un rediseño
bad_logic: menos formularios enviados significa menos clientes molestos
escalation: el botón se esconde, el indicador mejora, Soporte recibe los reclamos y Producto propone medir quejas no encontradas
data_turn: Paula junta abandonos del portal con mensajes de chat y redes
chart: series antes y después por canal
decision: volver visible la ruta y medir intentos, abandonos y contactos
punchline: Le quitaron tres clics al cliente y cuatro aplausos al reporte.
rule: si cambias la puerta de entrada, no compares visitantes como si fuera la misma puerta
synthetic_data: true
-->

## El correo de felicitación

> **El jefe:** "¿Ya bajaron las quejas del portal?"
>
> **Leo:** "Cuarenta por ciento desde que salió el rediseño."
>
> **El jefe:** "No manches. ¿Qué cambiaron?"
>
> **Mónica:** "El botón para levantar una queja."
>
> **El jefe:** "¿Lo hicieron más fácil?"
>
> **Mónica:** "Lo movimos a Ayuda, luego Contacto, luego Otros."
>
> **Paula:** "Y luego aparece una liga que dice `¿Todavía necesitas ayuda?`."
>
> **El jefe:** "Pues sí necesita. Se quiere quejar."
>
> **Leo:** "Sí, pero ahora tiene que estar muy seguro."

Faltaban quince minutos para mandar el correo. El rediseño había salido con dos
personas, cuatro días y la instrucción de “limpiar la pantalla sin perder
funcionalidad”. La funcionalidad seguía ahí. Nada más estaba haciendo prácticas
profesionales de escondite.

## Seis semanas después

> **Paula:** "Soporte trae el doble de mensajes que dicen `no encuentro dónde reportar esto`."
>
> **Leo:** "Pero las quejas formales siguen abajo."
>
> **Paula:** "Porque están llegando por chat."
>
> **Mónica:** "Chat no cuenta como queja. Cuenta como conversación."
>
> **Paula:** "El cliente está escribiendo en mayúsculas."
>
> **Mónica:** "Conversación intensa."
>
> **El jefe:** "A ver, necesitamos cuidar el indicador sin ignorar al cliente."
>
> **Leo:** "Podemos crear una métrica de quejas que no encontraron dónde quejarse."
>
> **Paula:** "¿Y cómo la llenamos?"
>
> **Leo:** "Cuando se quejen de que no pudieron quejarse."

Nadie se rió de inmediato porque la propuesta ya tenía nombre de indicador y
eso, en esa oficina, le daba una oportunidad real de llegar a comité.

## Lo que estaba entrando por otra puerta

> **Paula:** "Espérense. Junté formularios, abandonos en Ayuda y contactos por chat y redes."
>
> **El jefe:** "¿Y cómo se ve la historia?"
>
> **Paula:** "Como que no bajó el enojo. Bajó el formulario."

<svg data-chart="central" viewBox="0 0 720 300" role="img" aria-label="Quejas registradas bajan mientras abandonos y contactos alternos suben">
  <rect width="720" height="300" fill="#ffffff"/>
  <text x="36" y="30" font-size="18" font-weight="bold">Contactos relacionados con quejas por semana</text>
  <line x1="60" y1="245" x2="680" y2="245" stroke="#777"/>
  <line x1="60" y1="55" x2="60" y2="245" stroke="#777"/>
  <line x1="340" y1="55" x2="340" y2="245" stroke="#b6432d" stroke-dasharray="6 5"/>
  <text x="348" y="72" font-size="13" fill="#b6432d">rediseño</text>
  <polyline points="75,105 155,100 235,108 315,102 365,150 445,168 525,177 605,184 670,188" fill="none" stroke="#2468a2" stroke-width="5"/>
  <polyline points="75,205 155,201 235,207 315,202 365,138 445,112 525,94 605,82 670,74" fill="none" stroke="#c84d36" stroke-width="5"/>
  <polyline points="75,220 155,218 235,216 315,214 365,184 445,158 525,142 605,126 670,116" fill="none" stroke="#65717e" stroke-width="4"/>
  <text x="500" y="199" font-size="14" fill="#2468a2">formularios</text>
  <text x="515" y="90" font-size="14" fill="#c84d36">abandonos</text>
  <text x="520" y="137" font-size="14" fill="#65717e">chat y redes</text>
</svg>

<!-- learning:pause -->
> **Mónica:** "Antes de decir que mejoramos, ¿cuántas personas intentaron reportar algo y no llegaron al formulario?"

**Lo que muestra:** Los formularios bajaron justo cuando subieron los abandonos
y los contactos por otros canales. El portal dejó de observar una parte de la
demanda. Eso es sesgo de medición por cambio en el canal de captura.

## El botón volvió

> **El jefe:** "Entonces regresamos el botón a la primera pantalla y medimos todo el recorrido."
>
> **Leo:** "Producto va a decir que ensucia el diseño."
>
> **Paula:** "Ahorita está limpio porque aventamos la mugre a Soporte."
>
> **Mónica:** "¿Y el correo de felicitación?"
>
> **El jefe:** "Guárdenlo. Le quitaron tres clics al cliente y cuatro aplausos al reporte."

La prueba siguiente comparó una ruta visible contra la escondida y contó
intentos, abandonos, formularios, chat y redes.

**Regla:** Si cambias la puerta de entrada, no compares visitantes como si fuera
la misma puerta.
