# El AUC alto y la cola llena

<!-- story
concept: metrica tecnica contra capacidad operativa
characters: Valeria, Nico, Patricia, el director
situation: un clasificador presume buen AUC pero manda demasiadas alertas para revisar
bad_logic: una metrica tecnica alta basta para aprobar el modelo
escalation: la operacion no puede revisar las alertas y atiende casos por orden de llegada
data_turn: Valeria compara curva de desempeno con capacidad semanal
chart: curva y capacidad
decision: elegir umbral por valor, costo y capacidad
punchline: El modelo separaba muy bien; nosotros juntamos todo en una fila imposible.
rule: una metrica tecnica debe conectarse con capacidad, costo y decision de negocio
synthetic_data: true
-->

## La metrica bonita

> **Valeria:** "El AUC salio excelente, ya podemos aprobar."

> **Nico:** "Operacion solo puede revisar ciertos casos por semana."

> **Patricia:** "La metrica tecnica es solida."

> **Valeria:** "La fila tambien tiene opinion."

> **Patricia:** "El modelo ordena mejor que antes."

> **el director:** "Ordenar mucho no aumenta sillas."

La operacion no puede revisar las alertas y atiende casos por orden de llegada. El problema llegó con una fecha y una persona responsable de responder, dos detalles que el resumen inicial no contenía.

## La fila fea

> **Patricia:** "Mandamos todas las alertas y que prioricen."

> **Nico:** "Eso convierte el modelo en una bandeja llena."

> **Patricia:** "Pero una bandeja cientificamente llena."

> **el director:** "Ayer revisaron casos baratos mientras esperaban los caros."

> **Patricia:** "El score estaba disponible."

> **Valeria:** "Disponible no es revisado."

> **Nico:** "La operacion no puede revisar las alertas y atiende casos por orden de llegada."

> **el director:** "Quiero ver curva y capacidad antes de decidir."

Valeria compara curva de desempeno con capacidad semanal. Al revisar la medida correcta, el equipo pudo abandonar una salida vistosa y elegir otra que sí resistía preguntas.

## El umbral tambien trabaja

> **Valeria:** "Puse el desempeno junto a la capacidad real."

> **el director:** "Donde cabe la operacion."

> **Valeria:** "El mejor umbral no es el mas vistoso, es el revisable."

> **Nico:** "Ahora entiendo por qué una metrica tecnica alta basta para aprobar el modelo."

> **Valeria:** "Respondía otra pregunta; no servía para elegir umbral por valor, costo y capacidad."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="curva y capacidad">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">curva y capacidad</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="174" height="175" fill="#286d9b"/>
  <text x="157" y="75" font-size="18" text-anchor="middle">91</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">AUC</text>
  <rect x="272" y="149" width="174" height="111" fill="#d58b2f"/>
  <text x="359" y="139" font-size="18" text-anchor="middle">58</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">alertas utiles</text>
  <rect x="474" y="195" width="174" height="65" fill="#4c8b63"/>
  <text x="561" y="185" font-size="18" text-anchor="middle">34</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">capacidad</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">Buen ranking no elimina la restriccion operativa.</text>
</svg>

<!-- learning:pause -->
> **Nico:** "Por que una metrica como AUC no basta para decidir si el modelo sirve al negocio."

**Lo que muestra:** La evidencia conecta ranking tecnico con capacidad. AUC resume separacion general, pero el negocio necesita saber cuantas alertas se atenderan, con que costo y que valor generan. El umbral debe elegirse con restricciones operativas.

## Aprobar con capacidad

> **el director:** "Aprobamos el modelo solo con umbral y cupo definidos."

> **el director:** "Dejen por escrito quién va a elegir umbral por valor, costo y capacidad."

> **Patricia:** "El reporte tecnico tendra una nota menos elegante."

> **Valeria:** "Y la operacion una fila que si puede terminar."

> **Valeria:** "¿Qué cambiaremos después de revisar curva y capacidad?"

> **Nico:** "La decisión es elegir umbral por valor, costo y capacidad."

> **Patricia:** "Y volvemos a medir metrica tecnica contra capacidad operativa antes del siguiente cierre."

> **Nico:** "El modelo separaba muy bien; nosotros juntamos todo en una fila imposible."

**Regla:** una metrica tecnica debe conectarse con capacidad, costo y decision de negocio.
