# El README que salvo el lunes

<!-- story
concept: documentacion minima reproducible
characters: Tania, Joel, Eva, la coordinadora
situation: un proyecto de datos funciona solo para quien lo hizo porque no explica como correrlo
bad_logic: el codigo se explica solo si esta bien escrito
escalation: la persona dueña sale de vacaciones y el equipo no puede regenerar resultados
data_turn: Tania compara tiempos de arranque con y sin README
chart: checklist de reproducibilidad
decision: agregar objetivo, datos, setup, comandos y salida esperada
punchline: El README no hizo analisis; solo encontro la luz del cuarto.
rule: un README util permite correr, entender y verificar el proyecto
synthetic_data: true
-->

## La carpeta muda

> **Tania:** "El proyecto esta listo, solo hay que correrlo."

> **Joel:** "Nadie sabe con que comando."

> **Eva:** "El codigo esta bastante claro."

> **Tania:** "El codigo no dice donde bajar datos."

> **Eva:** "Eso lo sabia Eva."

> **la coordinadora:** "Eva esta de vacaciones y no dejo webhook mental."

La persona dueña sale de vacaciones y el equipo no puede regenerar resultados. Nadie necesitó imaginar un riesgo futuro; el problema ya estaba ocupando tiempo y retrasando una decisión del día.

## El codigo no contestaba llamadas

> **Eva:** "Le escribimos rapido."

> **Joel:** "Tambien necesitamos repetirlo el proximo mes."

> **Eva:** "Podemos guardar sus respuestas en favoritos."

> **la coordinadora:** "Eso se llama README con pasos extra."

> **Eva:** "La carpeta tiene nombres descriptivos."

> **Tania:** "Descriptivos para quien ya entiende la historia."

> **Joel:** "La persona dueña sale de vacaciones y el equipo no puede regenerar resultados."

> **la coordinadora:** "Quiero ver checklist de reproducibilidad antes de decidir."

Tania compara tiempos de arranque con y sin README. El contraste permitió ubicar el error sin convertir la conversación en una discusión sobre intenciones.

## Cinco cosas para empezar

> **Tania:** "Medi cuanto tarda alguien nuevo en correrlo."

> **la coordinadora:** "Que parte los detiene."

> **Tania:** "Faltan objetivo, setup, datos, comando y salida esperada."

> **Joel:** "Ahora entiendo por qué el codigo se explica solo si esta bien escrito."

> **Tania:** "Respondía otra pregunta; no servía para agregar objetivo, datos, setup, comandos y salida esperada."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="checklist de reproducibilidad">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">checklist de reproducibilidad</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="224" width="174" height="36" fill="#286d9b"/>
  <text x="157" y="214" font-size="18" text-anchor="middle">18</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">sin README</text>
  <rect x="272" y="136" width="174" height="124" fill="#d58b2f"/>
  <text x="359" y="126" font-size="18" text-anchor="middle">62</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">con comandos</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">87</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">con salida</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La documentacion minima acelera reproduccion.</text>
</svg>

<!-- learning:pause -->
> **Joel:** "Que debe decir un README minimo para que otra persona reproduzca un analisis."

**Lo que muestra:** La evidencia muestra que el README reduce tiempo perdido antes del analisis. Debe explicar objetivo, fuentes, entorno, comandos, salida esperada y criterios de verificacion. No reemplaza el codigo; abre la puerta correcta.

## El lunes encuentra instrucciones

> **la coordinadora:** "Agregamos README antes de compartir resultados."

> **la coordinadora:** "Dejen por escrito quién va a agregar objetivo, datos, setup, comandos y salida esperada."

> **Eva:** "Tardaremos una hora en escribirlo."

> **Tania:** "Y ahorraremos muchas horas de lunes."

> **Tania:** "¿Qué cambiaremos después de revisar checklist de reproducibilidad?"

> **Joel:** "La decisión es agregar objetivo, datos, setup, comandos y salida esperada."

> **Eva:** "Y volvemos a medir documentacion minima reproducible antes del siguiente cierre."

> **Eva:** "Mañana otra persona repetirá el proceso usando solo el README y los archivos del repositorio."

> **la coordinadora:** "La prueba termina cuando alguien nuevo reproduce la salida sin pedir ayuda por chat."

> **Joel:** "El README no hizo analisis; solo encontro la luz del cuarto."

**Regla:** un README util permite correr, entender y verificar el proyecto.
