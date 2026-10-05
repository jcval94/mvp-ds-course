# El experimento que ganó el martes a las once

<!-- story
concept: muestra pequeña y parada anticipada
characters: Karla, Bruno, Elisa, el jefe
situation: Marketing declara ganador un botón después de dos horas y cuarenta conversiones
bad_logic: revisar continuamente y detenerse en el primer resultado favorable demuestra rapidez
escalation: el experimento se detiene temprano, el efecto desaparece y cada equipo aprende a esperar su mejor minuto
data_turn: Elisa muestra el intervalo de confianza a lo largo del día
chart: efecto estimado e intervalo conforme crece la muestra
decision: fijar duración, muestra y criterio antes de iniciar
punchline: El botón ganó a las once y perdió en cuanto llegó el resto de la gente.
rule: si decides cuándo parar después de ver el resultado también eliges qué historia contar
synthetic_data: true
-->

## Ganamos

> **El jefe:** "El botón nuevo aumentó conversión treinta por ciento. Lo publicamos hoy."
>
> **Elisa:** "¿Cuántas personas entraron al experimento?"
>
> **Bruno:** "Doscientas."
>
> **Karla:** "Y ya tenemos cuarenta compras."
>
> **Elisa:** "¿Cuánto tiempo lleva corriendo?"
>
> **Bruno:** "Dos horas."
>
> **Elisa:** "¿La prueba duraba una semana?"
>
> **Karla:** "Sí, pero ya ganó."
>
> **El jefe:** "Eso es eficiencia. ¿Para qué esperar seis días a que cambie de opinión?"

La campaña salía esa tarde. El botón nuevo llevaba ventaja desde las diez
cuarenta y siete. A las once se tomó captura. A las once cinco se apagó la
prueba. A las once diez ya existía un correo con el asunto `resultado
contundente`.
Duró poco.
Muy poco.

## El método del mejor momento

> **Elisa:** "Si revisamos cada cinco minutos, alguna vez una variante va a verse arriba por suerte."
>
> **Bruno:** "Pero no fue suerte. Fue treinta por ciento."
>
> **Karla:** "Además, si mañana baja, hoy ya habremos lanzado."
>
> **Elisa:** "Ese no es un argumento estadístico."
>
> **El jefe:** "Es un argumento de calendario."
>
> **Bruno:** "Podemos dejar una parte del tráfico para seguir midiendo."
>
> **Karla:** "¿Y si descubre que no funcionó?"
>
> **El jefe:** "Que descubra despacio."
>
> **Elisa:** "¿Qué criterio acordamos antes de empezar?"
>
> **Bruno:** "Que ganara."
>
> **Elisa:** "Eso no es un criterio."
>
> **Karla:** "Pues fue bastante claro cuando ganó."

En los siguientes tres experimentos, cada equipo aprendió a mirar el resultado
hasta encontrar un momento favorable. Ninguno manipuló datos. Solo desarrolló
una relación muy flexible con la hora de cierre.

## Lo que pasó al llegar más gente

> **Elisa:** "Reconstruí el efecto si la prueba hubiera seguido abierta."
>
> **Bruno:** "¿Se mantiene el treinta?"
>
> **Elisa:** "No. Termina cerca de dos por ciento y el rango todavía incluye cero."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Efecto estimado del experimento y su incertidumbre conforme aumenta la muestra">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Mejora estimada conforme entra tráfico</text>
  <line x1="65" y1="245" x2="675" y2="245" stroke="#777"/>
  <line x1="65" y1="55" x2="65" y2="245" stroke="#777"/>
  <line x1="65" y1="190" x2="675" y2="190" stroke="#999" stroke-dasharray="4 4"/>
  <text x="25" y="194" font-size="12">0%</text>
  <polyline points="90,85 180,112 270,135 360,160 450,172 540,180 640,184" fill="none" stroke="#2f79a2" stroke-width="5"/>
  <polyline points="90,55 180,75 270,98 360,120 450,137 540,148 640,153" fill="none" stroke="#8ab0c6" stroke-width="2"/>
  <polyline points="90,145 180,166 270,181 360,200 450,207 540,211 640,215" fill="none" stroke="#8ab0c6" stroke-width="2"/>
  <line x1="185" y1="50" x2="185" y2="245" stroke="#c64e36" stroke-dasharray="6 5"/>
  <text x="195" y="68" font-size="13" fill="#c64e36">se detuvo aquí: +30%</text>
  <text x="500" y="170" font-size="13" fill="#2f79a2">resultado final: +2%</text>
  <text x="245" y="282" font-size="14">personas acumuladas</text>
</svg>

<!-- learning:pause -->
> **Karla:** "Si el resultado cambia cada vez que entra más gente, ¿cuándo debimos decidir que la prueba terminaba?"

**Lo que muestra:** Con pocas observaciones, la estimación salta y el rango es
muy amplio. La duración, muestra y regla de decisión deben fijarse antes de
mirar. Detenerse al ver una ventaja favorable produce parada anticipada.

## La siguiente prueba

> **El jefe:** "La repetimos una semana completa y dejamos por escrito qué cuenta como ganador."
>
> **Bruno:** "¿Entonces borramos el correo contundente?"
>
> **Elisa:** "No. Guárdalo como evidencia del método anterior."
>
> **Karla:** "El botón ganó a las once y perdió en cuanto llegó el resto de la gente."

**Regla:** Si decides cuándo parar después de ver el resultado, también eliges
qué historia contar.
