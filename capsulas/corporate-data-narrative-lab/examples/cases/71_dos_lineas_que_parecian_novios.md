# Las dos líneas que parecían novios

<!-- story
concept: doble eje y relaciones visuales engañosas
characters: Santi, Luisa, Omar, la directora financiera
situation: finanzas superpone visitas y margen con dos ejes ajustados para que las líneas coincidan
bad_logic: interpretar líneas paralelas como relación sin revisar escalas ni datos subyacentes
escalation: se atribuye la caída de margen al tráfico web y se propone recortar campañas rentables
data_turn: Luisa separa las series, normaliza cambios y revisa la relación por semana
chart: Cambio relativo de visitas y margen
decision: mantener campañas y analizar descuentos como causa directa del margen
punchline: Las líneas no estaban enamoradas; alguien les acomodó la cita.
rule: dos series que se mueven juntas en un doble eje no prueban una relación
synthetic_data: true
-->

## La pareja perfecta

> **Santi:** "Cuando suben las visitas, baja el margen. Aquí se ve clarísimo."

> **Luisa:** "¿Por qué una línea usa porcentajes y la otra miles de sesiones?"

> **Omar:** "Para que compartan espacio."

> **la directora financiera:** "Parecen un espejo."

> **Luisa:** "También parecerían espejo si movemos cualquiera de los dos ejes."

> **Santi:** "Pero coinciden durante seis semanas."

La presentación mostraba dos curvas casi simétricas, una azul y otra roja. Sus escalas tenían rangos distintos y habían sido ajustadas hasta ocupar la misma altura en la pantalla.

## Mover los ejes

> **Omar:** "Recortemos campaña y protegemos margen."

> **Luisa:** "La campaña trae ventas con margen positivo."

> **Santi:** "La gráfica dice que el tráfico presiona."

> **la directora financiera:** "La gráfica no firmó esa conclusión. ¿Qué cambió en precios?"

> **Omar:** "Entró un descuento automático en esas mismas semanas."

> **Luisa:** "Y ese descuento sí toca el margen de cada pedido."

La propuesta de cortar campañas parecía rápida porque actuaba sobre una serie visible. Sin embargo, nadie había conectado una visita individual con una pérdida de margen; el descuento sí aparecía en cada transacción afectada.

## Cada serie en su escala

> **Luisa:** "Convertí ambas series a cambio contra su propia base."

> **Santi:** "Ya no se mueven como espejo."

> **Omar:** "El margen cae cuando aumenta el descuento, no las visitas."

> **la directora financiera:** "Entonces el doble eje juntó una coincidencia y una escala conveniente."

> **Luisa:** "Exacto. La relación aparente dependía del acomodo visual."

Al expresar ambas series como cambio relativo, la coreografía se desarmó. La coincidencia semanal perdió fuerza y el descuento quedó como la explicación operativa que podía verificarse pedido por pedido.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Cambio relativo de visitas y margen">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Cambio relativo de visitas y margen</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="148" width="184" height="102" fill="#286d9b"/>
  <text x="152" y="138" font-size="17" text-anchor="middle">14 % cambio</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">visitas</text>
  <rect x="268" y="214" width="184" height="36" fill="#d58b2f"/>
  <text x="360" y="204" font-size="17" text-anchor="middle">5 % cambio</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">margen</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">22 % cambio</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">descuento</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Con una escala común, el descuento sigue al margen más de cerca.</text>
</svg>

<!-- learning:pause -->
> **la directora financiera:** "¿Qué queda de la relación cuando ambas series se comparan con una escala común?"

**Lo que muestra:** Los dos ejes pueden ajustarse para hacer que series con unidades distintas parezcan paralelas. Al comparar cambios relativos, visitas y margen dejan de coincidir. La caída del margen sigue el descuento aplicado, una relación que además puede comprobarse a nivel de pedido.

## Buscar la causa correcta

> **la directora financiera:** "No recortamos campaña; revisamos la regla de descuentos."

> **Santi:** "Voy a separar las series en el reporte."

> **Luisa:** "Y si se comparan, usarán una transformación explicada."

> **Omar:** "También mediré margen por pedido expuesto al descuento."

> **la directora financiera:** "Quiero causa operativa, no líneas simpáticas."

> **Santi:** "Después de ajustar doble eje y relaciones visuales engañosas, ¿qué podría cambiar la decisión?"

> **Luisa:** "Toca mantener campañas y analizar descuentos como causa directa del margen; si cambia el dato, volvemos a decidir."

> **Santi:** "Las líneas no estaban enamoradas; alguien les acomodó la cita."

**Regla:** dos series que se mueven juntas en un doble eje no prueban una relación.
