# La gráfica sin domicilio

<!-- story
concept: anotaciones y contexto para una decisión
characters: Rocío, Balam, Eva, el jefe de operaciones
situation: una línea muestra una caída sin fechas, unidad ni evento operativo
bad_logic: suponer que una tendencia se explica sola porque la forma parece evidente
escalation: el equipo culpa a capacitación sin notar un cambio de sistema en la semana crítica
data_turn: Rocío añade unidad, periodo, cambio de sistema y meta operativa
chart: Errores por mil capturas alrededor del cambio de sistema
decision: corregir el formulario nuevo y medir la recuperación durante dos semanas
punchline: La gráfica tenía flecha, pero nadie le había puesto dirección.
rule: anota el evento, la unidad y la referencia que permiten actuar sobre una tendencia
synthetic_data: true
-->

## La línea que bajaba

> **el jefe de operaciones:** "Esta caída demuestra que la capacitación falló."

> **Rocío:** "¿Caída de qué y en qué semana?"

> **Balam:** "La línea viene del reporte mensual."

> **Eva:** "No tiene eje horizontal ni unidad."

> **el jefe de operaciones:** "Pero se ve que algo empeoró."

> **Rocío:** "Sí. Lo que no se ve es qué, cuándo ni por qué."

La línea descendía con decisión sobre un fondo blanco. Sin escala ni fechas, servía para confirmar cualquier historia que ya estuviera en la sala, incluida la más cómoda: volver a capacitar.

## Culpar al curso

> **Balam:** "Podemos repetir el curso el lunes."

> **Eva:** "El curso terminó dos semanas antes de la caída."

> **Balam:** "Entonces hacemos otro para reforzar."

> **Rocío:** "Ese viernes cambiamos el formulario de captura."

> **el jefe de operaciones:** "¿La línea empieza ahí?"

> **Eva:** "Exactamente; el campo de unidades quedó debajo del botón guardar."

Eva recuperó el registro de despliegues y encontró una coincidencia precisa. El salto de errores comenzó horas después de mover un campo, no durante las semanas en que ocurrió el curso.

## Poner fecha al cambio

> **Rocío:** "Agregué fecha, errores por mil y una marca del despliegue."

> **Balam:** "Ahora el salto ocurre justo después del formulario nuevo."

> **Eva:** "También puse la meta anterior como referencia."

> **el jefe de operaciones:** "Eso señala una revisión de interfaz, no otro curso."

> **Rocío:** "La anotación conecta el dato con un hecho verificable."

La misma línea, ahora con domicilio, dejó de ser una señal vaga. Unidad, fecha y anotación situaron el problema en un formulario concreto que el equipo podía probar y corregir.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Errores por mil capturas alrededor del cambio de sistema">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Errores por mil capturas alrededor del cambio de sistema</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="211" width="184" height="39" fill="#286d9b"/>
  <text x="152" y="201" font-size="17" text-anchor="middle">7 por mil</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">antes</text>
  <rect x="268" y="206" width="184" height="44" fill="#d58b2f"/>
  <text x="360" y="196" font-size="17" text-anchor="middle">8 por mil</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">despliegue</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">29 por mil</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">después</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El salto comienza después del cambio de formulario.</text>
</svg>

<!-- learning:pause -->
> **Balam:** "¿Qué dato adicional permite distinguir entre un problema de capacitación y uno del formulario?"

**Lo que muestra:** La forma de una línea no explica su causa. Al mostrar errores por cada mil capturas, fechas y el momento del cambio de sistema, el salto queda alineado con el nuevo formulario. La anotación no prueba sola la causa, pero dirige una prueba concreta y evita repetir un curso sin evidencia.

## Una anotación accionable

> **el jefe de operaciones:** "Movemos el campo y probamos con diez usuarios."

> **Eva:** "Mediré errores por mil durante dos semanas."

> **Balam:** "La capacitación queda fuera de esta corrección."

> **Rocío:** "Puede evaluarse aparte, con su propio antes y después."

> **el jefe de operaciones:** "Toda tendencia llevará unidad, periodo y eventos relevantes."

> **Rocío:** "Sobre anotaciones y contexto para una decisión, ¿qué dato revisamos en el siguiente corte?"

> **Balam:** "Primero vamos a corregir el formulario nuevo y medir la recuperación durante dos semanas; luego comparamos el resultado."

> **Balam:** "La gráfica tenía flecha, pero nadie le había puesto dirección."

**Regla:** anota el evento, la unidad y la referencia que permiten actuar sobre una tendencia.
