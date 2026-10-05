# La variable que llegó mañana

<!-- story
concept: ingeniería de variables con ventanas temporales
characters: Dora, Toño, Mila, el líder de retención
situation: un modelo de abandono usa actividad ocurrida después del día de predicción
bad_logic: construir variables con toda la semana aunque la decisión se toma al inicio
escalation: retención planea contactar clientes usando comportamiento que todavía no sucede
data_turn: Dora reconstruye cada variable con una fecha de corte estricta
chart: Desempeño por ventana de información disponible
decision: versionar ventanas, probarlas por fecha y entrenar con el mismo corte de producción
punchline: La variable llegaba puntual, nomás un día después de que la necesitábamos.
rule: la ventana de cada variable debe terminar antes de la predicción y la acción
synthetic_data: true
-->

## Actividad de siete días

> **el líder de retención:** "El modelo usa actividad de lunes a domingo para llamar el lunes."

> **Dora:** "Entonces conoce seis días que todavía no ocurrieron."

> **Toño:** "La tabla semanal ya los trae completos."

> **Mila:** "Porque se construye el domingo siguiente."

> **el líder de retención:** "En producción necesitamos la lista al iniciar la semana."

> **Dora:** "La variable debe cerrarse antes de esa hora."

La tabla histórica parecía ordenada por semanas completas, pero la decisión ocurría antes de que esas semanas existieran. El diseño del archivo había borrado el reloj de la operación.

## Decidir el lunes

> **Toño:** "Podemos retrasar las llamadas hasta el domingo."

> **Mila:** "Para entonces varios clientes ya habrán cancelado."

> **Toño:** "O dejamos la variable porque funciona bien."

> **Dora:** "Funciona bien en un calendario que producción no puede usar."

> **el líder de retención:** "¿Qué información sí existe el lunes a las ocho?"

> **Mila:** "Las cuatro semanas anteriores y la actividad hasta el domingo."

Retrasar la acción conservaba el número del modelo a costa de perder la oportunidad de retener. La alternativa correcta era menos espectacular: reconstruir información tal como habría estado disponible cada lunes.

## Cortar el calendario

> **Dora:** "Reconstruí las variables con corte dominical."

> **Toño:** "El AUC baja de 0.88 a 0.76."

> **Mila:** "Pero la lista puede generarse antes de llamar."

> **el líder de retención:** "Ese es el desempeño que interesa."

> **Dora:** "Y una prueba automática verifica que ninguna fecha cruce el corte."

El desempeño disminuyó cuando desaparecieron los días futuros. A cambio, la nueva variable podía calcularse a tiempo y su ventana quedaba definida de forma reproducible para cada observación.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Desempeño por ventana de información disponible">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Desempeño por ventana de información disponible</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="90" width="184" height="160" fill="#286d9b"/>
  <text x="152" y="80" font-size="17" text-anchor="middle">88 AUC x100</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">semana completa</text>
  <rect x="268" y="112" width="184" height="138" fill="#d58b2f"/>
  <text x="360" y="102" font-size="17" text-anchor="middle">76 AUC x100</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">corte dominical</text>
  <rect x="476" y="125" width="184" height="125" fill="#4c8b63"/>
  <text x="568" y="115" font-size="17" text-anchor="middle">69 AUC x100</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">base simple</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Una métrica menor puede ser la única que existe a tiempo.</text>
</svg>

<!-- learning:pause -->
> **Mila:** "¿Qué versión del modelo podemos ejecutar el lunes sin usar actividad futura?"

**Lo que muestra:** La variable semanal original incluye seis días posteriores a la predicción. Con un corte al domingo anterior, el AUC baja a 0.76, pero representa información disponible al momento de actuar. Definir inicio y fin de cada ventana evita fuga temporal.

## Llegar antes de actuar

> **el líder de retención:** "La campaña usará la versión de 0.76."

> **Mila:** "Mediremos cancelación evitada y molestias por contacto."

> **Toño:** "Cada variable guardará inicio y fin de ventana."

> **Dora:** "Entrenamiento y producción compartirán la misma función de corte."

> **el líder de retención:** "Nada de datos semanales cuando la semana apenas empieza."

> **Dora:** "Después de ajustar ingeniería de variables con ventanas temporales, ¿qué podría cambiar la decisión?"

> **Toño:** "Toca versionar ventanas, probarlas por fecha y entrenar con el mismo corte de producción; si cambia el dato, volvemos a decidir."

> **Toño:** "La variable llegaba puntual, nomás un día después de que la necesitábamos."

**Regla:** la ventana de cada variable debe terminar antes de la predicción y la acción.
