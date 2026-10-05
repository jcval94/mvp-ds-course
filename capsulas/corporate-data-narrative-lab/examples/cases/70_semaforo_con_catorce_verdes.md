# El semáforo con catorce verdes

<!-- story
concept: color, jerarquía visual y categorías
characters: Mina, Joel, Karla, el responsable regional
situation: un reporte usa muchos tonos de verde para catorce estados operativos
bad_logic: asignar un color distinto a cada categoría aunque el color no tenga significado
escalation: una región crítica se interpreta como saludable por compartir la paleta verde
data_turn: Mina reduce la paleta y reserva el color de alerta para excepciones accionables
chart: Sucursales por estado operativo simplificado
decision: usar posición y etiquetas para categorías, y color solo para destacar riesgo
punchline: Teníamos catorce verdes y ni uno significaba siga.
rule: usa el color para comunicar una diferencia con sentido, no para decorar categorías
synthetic_data: true
-->

## Verde menta crítico

> **el responsable regional:** "La zona Bajío está en verde, así que no requiere visita."

> **Mina:** "Ese verde significa inventario crítico."

> **Joel:** "El saludable es verde bosque."

> **Karla:** "Yo pensé que verde menta era en observación."

> **el responsable regional:** "¿Cuántos verdes tenemos?"

> **Joel:** "Catorce, uno por cada estado del catálogo."

La pantalla parecía tranquila porque toda la paleta pertenecía a la misma familia. El problema era operativo: un tono agradable estaba cubriendo una sucursal sin inventario suficiente para abrir el fin de semana.

## La leyenda cromática

> **Karla:** "Podemos enviar una tabla con los códigos de color."

> **Mina:** "La gente tendría que memorizar catorce tonos antes de decidir."

> **Joel:** "Los eligió la agencia para que se vieran armónicos."

> **el responsable regional:** "Armonía no repone inventario."

> **Karla:** "Bajío lleva cuatro días bajo el mínimo."

> **Mina:** "Y el color que debía llamar la atención la volvió parte del paisaje."

La leyenda tenía catorce renglones y nombres creados por áreas distintas. Algunos describían nivel, otros causa y otros una acción; el color intentaba representar las tres cosas al mismo tiempo.

## Tres estados útiles

> **Mina:** "Agrupé los estados en normal, revisar hoy y detener."

> **Joel:** "Ahora solo las excepciones usan color fuerte."

> **Karla:** "Bajío aparece primero y con nombre."

> **el responsable regional:** "Eso permite llamar a alguien sin consultar una leyenda."

> **Mina:** "Las categorías restantes se leen por etiqueta y posición."

La nueva vista conservó el detalle en la fuente, pero redujo la decisión visible. Bajío quedó arriba, con una etiqueta clara y un color reservado exclusivamente para actuar ese día.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Sucursales por estado operativo simplificado">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Sucursales por estado operativo simplificado</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="90" width="184" height="160" fill="#286d9b"/>
  <text x="152" y="80" font-size="17" text-anchor="middle">42 sucursales</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">normal</text>
  <rect x="268" y="216" width="184" height="34" fill="#d58b2f"/>
  <text x="360" y="206" font-size="17" text-anchor="middle">9 sucursales</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">revisar hoy</text>
  <rect x="476" y="239" width="184" height="11" fill="#4c8b63"/>
  <text x="568" y="229" font-size="17" text-anchor="middle">3 sucursales</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">detener</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Pocos estados y un color de alerta hacen visible la acción.</text>
</svg>

<!-- learning:pause -->
> **Karla:** "¿Qué debería comunicar el color para que una persona sepa dónde actuar primero?"

**Lo que muestra:** Catorce tonos similares exigen memorizar una leyenda y no crean una jerarquía clara. Al reducir los estados operativos y reservar el color intenso para excepciones, la vista dirige la atención a Bajío. El texto conserva el significado y el color indica prioridad.

## Un color con trabajo

> **el responsable regional:** "Visitamos Bajío hoy y reducimos el catálogo visual."

> **Joel:** "Mantendré el detalle completo en los datos."

> **Karla:** "Pero la vista operativa tendrá tres decisiones."

> **Mina:** "Exacto: color para urgencia, texto para significado."

> **el responsable regional:** "Y contraste suficiente para quien no distingue todos los tonos."

> **Mina:** "Para repetir color, jerarquía visual y categorías, ¿qué vamos a comprobar primero?"

> **Joel:** "Vamos a usar posición y etiquetas para categorías, y color solo para destacar riesgo y a revisar si el efecto se mantiene."

> **Joel:** "Teníamos catorce verdes y ni uno significaba siga."

**Regla:** usa el color para comunicar una diferencia con sentido, no para decorar categorías.
