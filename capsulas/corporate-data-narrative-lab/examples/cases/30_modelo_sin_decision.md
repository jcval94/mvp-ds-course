# El modelo que no sabia que decision tomar

<!-- story
concept: definir la decision antes del modelo
characters: Clara, Diego, Ramon, la directora
situation: un equipo predice abandono sin definir que accion tomara con cada prediccion
bad_logic: predecir algo importante ya es un producto
escalation: las areas reciben scores pero nadie sabe si llamar, descontar o esperar
data_turn: Clara convierte el score en un arbol de decisiones por accion y costo
chart: arbol de decision
decision: crear segmentos accionables y medir respuesta por accion
punchline: El modelo sabia quien se iba; nosotros no sabiamos que hacer con la despedida.
rule: un modelo de datos debe ayudar a tomar una decision concreta
synthetic_data: true
-->

## La lista de riesgo

> **Clara:** "Tenemos una lista de clientes con alto riesgo de irse."

> **Diego:** "Que hara el negocio con esa lista."

> **Ramon:** "La va a usar para retener."

> **Clara:** "Retener como, llamar, descontar o cambiar servicio."

> **Ramon:** "Eso lo define cada area."

> **la directora:** "Entonces el producto es una adivinanza compartida."

Las areas reciben scores pero nadie sabe si llamar, descontar o esperar. El plan seguía pareciendo razonable desde lejos, pero en la operación diaria ya estaba enviando el trabajo al lugar equivocado.

## Saber no era actuar

> **Ramon:** "Mandamos el score y que prioricen."

> **Diego:** "Priorizar sin accion solo ordena la ansiedad."

> **Ramon:** "Podemos poner semaforo para que se vea claro."

> **la directora:** "Rojo no dice si conviene llamar o no molestar."

> **Ramon:** "Ventas pedira descuento para todos los rojos."

> **Clara:** "Finanzas acaba de sentir un escalofrio."

> **Diego:** "Las areas reciben scores pero nadie sabe si llamar, descontar o esperar."

> **la directora:** "Quiero ver arbol de decision antes de decidir."

Clara convierte el score en un arbol de decisiones por accion y costo. La comparación mostró la distancia entre el indicador presentado y la decisión que realmente necesitaba tomar el equipo.

## El score necesita verbo

> **Clara:** "Cruce riesgo con accion posible y costo."

> **la directora:** "Quien necesita que respuesta."

> **Clara:** "Hay clientes para llamada, oferta y no intervencion."

> **Diego:** "Ahora entiendo por qué predecir algo importante ya es un producto."

> **Clara:** "Respondía otra pregunta; no servía para crear segmentos accionables y medir respuesta por accion."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="arbol de decision">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">arbol de decision</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="187" width="174" height="73" fill="#286d9b"/>
  <text x="157" y="177" font-size="18" text-anchor="middle">34</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">solo score</text>
  <rect x="272" y="105" width="174" height="155" fill="#d58b2f"/>
  <text x="359" y="95" font-size="18" text-anchor="middle">72</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">accion definida</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">81</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">resultado medido</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La utilidad aparece cuando hay decision y seguimiento.</text>
</svg>

<!-- learning:pause -->
> **Diego:** "Que decision debe existir antes de entrenar o publicar un modelo predictivo."

**Lo que muestra:** El arbol muestra que el score solo ordena probabilidad. Para crear producto hacen falta acciones, responsables, costos y resultados esperados. La prediccion vale cuando cambia una decision concreta y medible.

## Prediccion con accion

> **la directora:** "Publicamos recomendaciones por accion, no solo riesgo."

> **la directora:** "Dejen por escrito quién va a crear segmentos accionables y medir respuesta por accion."

> **Ramon:** "El modelo se vera menos magico."

> **Clara:** "Y mas facil de usar el lunes."

> **Clara:** "¿Qué cambiaremos después de revisar arbol de decision?"

> **Diego:** "La decisión es crear segmentos accionables y medir respuesta por accion."

> **Ramon:** "Y volvemos a medir definir la decision antes del modelo antes del siguiente cierre."

> **Diego:** "El modelo sabia quien se iba; nosotros no sabiamos que hacer con la despedida."

**Regla:** un modelo de datos debe ayudar a tomar una decision concreta.
