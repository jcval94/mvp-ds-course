# El modelo que seguía perfecto porque nadie volvió a medirlo

<!-- story
concept: drift y monitoreo de modelos
characters: Iván, Mónica, Samuel, el jefe
situation: un modelo conserva estatus verde aunque su precisión cayó durante nueve meses
bad_logic: si producción no reporta errores el modelo sigue funcionando
escalation: cambia la población, las alertas pierden utilidad y el tablero conserva el resultado de lanzamiento
data_turn: Mónica calcula desempeño mensual y cambio de población
chart: líneas de precisión y drift
decision: monitorear datos, desempeño y acción con umbrales de revisión
punchline: El modelo llevaba nueve meses fallando en perfecto estado.
rule: lo que funcionó al lanzamiento necesita volver a medirse en producción
synthetic_data: true
-->

## Todo verde

> **El jefe:** "¿Cómo va el modelo de riesgo?"
>
> **Samuel:** "Verde. Ochenta y seis por ciento de precisión."
>
> **Mónica:** "¿De qué mes es ese número?"
>
> **Samuel:** "Del lanzamiento."
>
> **Iván:** "Eso fue hace nueve meses."
>
> **Samuel:** "Sí, pero nadie ha levantado incidente."
>
> **Mónica:** "Operación dejó de usar varias alertas."
>
> **Samuel:** "Entonces no pueden decir que el modelo se equivocó."
>
> **Iván:** "Tampoco que acertó."
>
> **El jefe:** "A ver, ¿está funcionando o no?"
>
> **Samuel:** "El servicio está arriba."

La página de monitoreo medía memoria, tiempo de respuesta y si el proceso
contestaba. Todo estaba verde. El modelo podía recomendar cualquier cosa en
menos de doscientos milisegundos y eso, técnicamente, era una forma de
puntualidad.
La exactitud no tenía semáforo ni dueño.
Todavía.

## Los clientes nuevos

> **Mónica:** "Desde marzo entró un producto nuevo y cambió la mezcla de clientes."
>
> **Samuel:** "El modelo no sabe de productos. Usa variables."
>
> **Iván:** "Variables que cambiaron con el producto."
>
> **Samuel:** "Podemos reentrenar."
>
> **El jefe:** "¿Cada cuánto?"
>
> **Samuel:** "Cuando falle."
>
> **Mónica:** "¿Y cómo sabemos si falla?"
>
> **Samuel:** "Cuando reentrenemos podemos comparar."
>
> **Iván:** "Ese plan necesita viajar en el tiempo y ya tuvimos problemas con eso."
>
> **El jefe:** "¿Cuántas alertas está ignorando Operación?"
>
> **Mónica:** "Cuatro de cada diez."
>
> **Samuel:** "Entonces también hay un problema de adopción."
>
> **Iván:** "Sí. Adoptaron la costumbre de no hacerle caso."

Operación había creado reglas manuales para corregir alertas absurdas. Como las
correcciones vivían en un archivo local, el sistema central registraba que el
modelo seguía “activo” y nadie veía cuánto trabajo costaba traducirlo.

## Nueve meses de historia

> **Mónica:** "Uní resultados reales, alertas usadas y cambio en las variables."
>
> **El jefe:** "¿Qué pasó?"
>
> **Mónica:** "La precisión cayó a sesenta y uno por ciento y la población se movió desde marzo."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Caída de precisión y aumento de drift durante nueve meses">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Desempeño del modelo en producción</text>
  <line x1="65" y1="250" x2="675" y2="250" stroke="#777"/>
  <line x1="65" y1="55" x2="65" y2="250" stroke="#777"/>
  <polyline points="80,80 150,85 220,92 290,110 360,135 430,155 500,176 570,190 650,205" fill="none" stroke="#c64e36" stroke-width="5"/>
  <polyline points="80,220 150,218 220,205 290,180 360,155 430,132 500,112 570,92 650,78" fill="none" stroke="#2f79a2" stroke-width="5"/>
  <text x="490" y="200" font-size="14" fill="#c64e36">precisión: 86% → 61%</text>
  <text x="490" y="92" font-size="14" fill="#2f79a2">cambio de población</text>
  <line x1="265" y1="55" x2="265" y2="250" stroke="#9f3625" stroke-dasharray="6 5"/>
  <text x="275" y="70" font-size="13">producto nuevo</text>
</svg>

<!-- learning:pause -->
> **Iván:** "Si la gente y el proceso cambiaron, ¿qué tendríamos que vigilar además de que el servicio siga prendido?"

**Lo que muestra:** La distribución de datos cambió y el desempeño cayó. Hay
que monitorear población, precisión, uso de alertas y resultado operativo. Ese
cambio sostenido se conoce como drift.

## Verde significa otra cosa

> **El jefe:** "Definimos umbrales de revisión, medimos cada mes y registramos las correcciones de Operación."
>
> **Samuel:** "Entonces el tablero puede ponerse rojo."
>
> **Mónica:** "Esa es la idea de tener colores."
>
> **Iván:** "El modelo llevaba nueve meses fallando en perfecto estado."

**Regla:** Lo que funcionó al lanzamiento necesita volver a medirse en
producción.
