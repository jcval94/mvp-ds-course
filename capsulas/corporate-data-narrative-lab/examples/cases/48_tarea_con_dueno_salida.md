# La tarea que tenia dueno, salida y no drama

<!-- story
concept: tareas para agentes con responsable, salida y revision
characters: Fabi, Tono, Greta, el responsable
situation: un equipo convierte pedidos ambiguos en tareas listas para un agente
bad_logic: una tarea corta es mejor aunque no diga salida esperada
escalation: los agentes entregan cosas incompatibles y nadie sabe quien aprueba
data_turn: Fabi compara tareas con dueno, salida y revision contra tareas abiertas
chart: flujo de revision
decision: crear tareas con contexto, archivos, salida esperada, pruebas y aprobador
punchline: La tarea no se volvio larga; se volvio adulta.
rule: una tarea para agentes necesita contexto, limites, salida verificable y responsable de revision
synthetic_data: true
-->

## La tarea chiquita

> **Fabi:** "La tarea dice ajustar reporte."

> **Tono:** "Eso no dice quien aprueba ni que debe salir."

> **Greta:** "Era para no abrumar al agente."

> **Fabi:** "Lo abrumador es adivinar."

> **Greta:** "Mientras menos texto, mas rapido empieza."

> **el responsable:** "Y mas rapido se va por otra calle."

Los agentes entregan cosas incompatibles y nadie sabe quien aprueba. La mala decisión no necesitó crecer más para hacerse visible: ya había alterado una prioridad, un turno o una respuesta al cliente.

## Chiquita pero incompleta

> **Greta:** "Le damos libertad y corregimos despues."

> **Tono:** "Corregir despues es escribir la tarea tarde."

> **Greta:** "Entonces hacemos la especificacion cuando falle."

> **el responsable:** "Ese metodo ya tiene calendario completo."

> **Greta:** "Al menos la tarea se ve simple."

> **Fabi:** "Simple para enviar, cara para revisar."

> **Tono:** "Los agentes entregan cosas incompatibles y nadie sabe quien aprueba."

> **el responsable:** "Quiero ver flujo de revision antes de decidir."

Fabi compara tareas con dueno, salida y revision contra tareas abiertas. La gráfica reunió contexto y resultado en un mismo lugar, suficiente para cambiar el siguiente paso sin exagerar la conclusión.

## La salida se puede revisar

> **Fabi:** "Compare tareas abiertas contra tareas con salida verificable."

> **el responsable:** "Cuales llegan listas para revision."

> **Fabi:** "Las que tienen dueno, archivos, pruebas y aprobador."

> **Tono:** "Ahora entiendo por qué una tarea corta es mejor aunque no diga salida esperada."

> **Fabi:** "Respondía otra pregunta; no servía para crear tareas con contexto, archivos, salida esperada, pruebas y aprobador."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="flujo de revision">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">flujo de revision</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="196" width="124" height="64" fill="#286d9b"/>
  <text x="132" y="186" font-size="18" text-anchor="middle">33</text>
  <text x="132" y="286" font-size="13" text-anchor="middle">abierta</text>
  <rect x="222" y="128" width="124" height="132" fill="#d58b2f"/>
  <text x="284" y="118" font-size="18" text-anchor="middle">68</text>
  <text x="284" y="286" font-size="13" text-anchor="middle">con salida</text>
  <rect x="374" y="101" width="124" height="159" fill="#4c8b63"/>
  <text x="436" y="91" font-size="18" text-anchor="middle">82</text>
  <text x="436" y="286" font-size="13" text-anchor="middle">con dueno</text>
  <rect x="526" y="85" width="124" height="175" fill="#c64e36"/>
  <text x="588" y="75" font-size="18" text-anchor="middle">90</text>
  <text x="588" y="286" font-size="13" text-anchor="middle">con revision</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La tarea ejecutable deja evidencia revisable.</text>
</svg>

<!-- learning:pause -->
> **Tono:** "Que campos hacen que una tarea para agentes sea ejecutable y revisable."

**Lo que muestra:** La evidencia muestra el flujo completo: contexto, alcance, salida esperada, prueba y responsable. Una tarea buena no describe cada movimiento, pero si elimina decisiones que el agente no debe inventar. Eso reduce vueltas y sorpresas.

## Menos drama por escrito

> **el responsable:** "Adoptamos plantilla de tarea antes de invocar agentes."

> **el responsable:** "Dejen por escrito quién va a crear tareas con contexto, archivos, salida esperada, pruebas y aprobador."

> **Greta:** "La tarea tendra mas lineas."

> **Fabi:** "Y menos drama en la revision."

> **Fabi:** "¿Qué cambiaremos después de revisar flujo de revision?"

> **Tono:** "La decisión es crear tareas con contexto, archivos, salida esperada, pruebas y aprobador."

> **Greta:** "Y volvemos a medir tareas para agentes con responsable, salida y revision antes del siguiente cierre."

> **Tono:** "La tarea no se volvio larga; se volvio adulta."

**Regla:** una tarea para agentes necesita contexto, limites, salida verificable y responsable de revision.
