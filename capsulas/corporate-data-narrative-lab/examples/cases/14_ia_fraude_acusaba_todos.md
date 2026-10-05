# La IA que encontraba fraude en todas partes

<!-- story
concept: clases desbalanceadas y falsos positivos
characters: Abril, Toño, Lucía, la directora
situation: un modelo detecta 98% de los fraudes pero manda a revisión miles de operaciones normales
bad_logic: maximizar detección basta aunque la precisión operativa sea inútil
escalation: la cola de revisión explota, clientes normales quedan bloqueados y se propone contratar más gente para atender al modelo
data_turn: Abril muestra la matriz de confusión en números absolutos
chart: matriz de confusión
decision: elegir umbral por capacidad, costo y revisión humana
punchline: La IA no dejó pasar fraude; tampoco dejó pasar a casi nadie.
rule: una tasa alta de detección no basta cuando los falsos positivos saturan la operación
synthetic_data: true
-->

## Noventa y ocho por ciento

> **La directora:** "El modelo detecta noventa y ocho por ciento del fraude. Ya estamos."
>
> **Lucía:** "¿Cuántas operaciones está mandando a revisión?"
>
> **Toño:** "Como ocho mil por semana."
>
> **Lucía:** "Podemos revisar mil doscientas."
>
> **Abril:** "¿Cuántas de las ocho mil sí son fraude?"
>
> **Toño:** "Doscientas cuarenta."
>
> **La directora:** "Pero detectamos casi todo."
>
> **Lucía:** "Sí. También detectamos siete mil setecientas sesenta personas que no hicieron nada."
>
> **Toño:** "Son casos preventivos."
>
> **Lucía:** "Para ellos el bloqueo se siente bastante definitivo."

El fraude era raro: unas doscientas cincuenta operaciones entre cien mil. El
modelo encontraba casi todas, pero marcaba cualquier cosa remotamente extraña.
En la presentación eso se veía como sensibilidad. En Operación se veía como
una fila que ya doblaba la esquina.
Y seguía creciendo.
Cada hora.

## La solución de capacidad

> **La directora:** "Contratamos más revisores."
>
> **Lucía:** "Necesitaríamos multiplicar el equipo por siete."
>
> **Toño:** "Podemos automatizar la revisión."
>
> **Abril:** "¿Con qué?"
>
> **Toño:** "Con otro modelo."
>
> **Lucía:** "¿Y quién revisa al segundo modelo?"
>
> **Toño:** "El primero ya tiene mucha experiencia."
>
> **La directora:** "A ver, no hagamos una familia de modelos nada más para cuidar al primero."
>
> **Lucía:** "Mientras discutimos, hay siete mil personas esperando."
>
> **Toño:** "No todas van a llamar."
>
> **Lucía:** "Porque algunas también quedaron sin acceso al teléfono registrado."

Durante el piloto, clientes legítimos esperaron dos días para usar su dinero.
El fraude bajó, las quejas subieron y el equipo de revisión comenzó a resolver
por orden de llegada porque ya no alcanzaba a investigar riesgo real.

## Todos los cuadros

> **Abril:** "Puse los resultados en números, no solo en porcentajes."
>
> **La directora:** "¿Qué tan grande es el error?"
>
> **Abril:** "Por cada fraude correcto mandamos treinta y dos operaciones normales."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Matriz de confusión del modelo de fraude">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Resultado semanal sobre 100,000 operaciones</text>
  <text x="285" y="62" font-size="14">Fraude real</text>
  <text x="480" y="62" font-size="14">Operación normal</text>
  <text x="85" y="130" font-size="14">Modelo alerta</text>
  <text x="85" y="230" font-size="14">Modelo deja pasar</text>
  <rect x="255" y="80" width="160" height="80" fill="#4c8b63"/>
  <rect x="440" y="80" width="200" height="80" fill="#c64e36"/>
  <rect x="255" y="180" width="160" height="80" fill="#d58b30"/>
  <rect x="440" y="180" width="200" height="80" fill="#6da0bc"/>
  <text x="310" y="125" font-size="20" fill="#fff">245</text>
  <text x="505" y="125" font-size="20" fill="#fff">7,760</text>
  <text x="325" y="225" font-size="20">5</text>
  <text x="510" y="225" font-size="20">91,990</text>
  <text x="470" y="285" font-size="13" fill="#9f3625">La mayoría de las alertas es falsa.</text>
</svg>

<!-- learning:pause -->
> **Lucía:** "Con capacidad para mil doscientas revisiones, ¿qué umbral encuentra riesgo sin llenar la cola de gente inocente?"

**Lo que muestra:** Detectar 98% del fraude suena excelente, pero la baja
frecuencia del fraude genera miles de falsos positivos. Hay que mirar precisión,
capacidad, costo y daño, no solo sensibilidad.

## El modelo aprendió a escoger

> **La directora:** "Ajustamos el umbral, priorizamos por riesgo y nadie se bloquea sin revisión humana."
>
> **Toño:** "Va a detectar un poco menos."
>
> **Abril:** "Y vamos a poder investigar lo que detecta."
>
> **Lucía:** "La IA no dejó pasar fraude; tampoco dejó pasar a casi nadie."

**Regla:** Una tasa alta de detección no basta cuando los falsos positivos
saturan la operación.
