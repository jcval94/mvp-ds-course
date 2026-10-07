# Las primeras runas y el archivo que hablaba raro

<!-- story
concept: lectura de CSV, Excel, JSON y APIs
characters: Mora, Diego, Vicky, la instructora
situation: Lectura y Limpieza se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: todos los datos se leen igual si al final parecen tabla
escalation: se mezclan separadores, hojas, objetos anidados y respuestas de API sin validar
data_turn: una persona compara el atajo contra una version verificable
chart: fuentes leidas con validacion de formato
decision: elegir lector por formato y validar filas, columnas y tipos al entrar
punchline: El CSV no estaba poseido; solo venia con separador regional.
rule: leer datos empieza por reconocer formato, estructura y validaciones basicas
synthetic_data: true
-->

## El archivo con runas

> **Mora:** "El CSV se abrio todo en una sola columna."

> **Diego:** "Probablemente usa otro separador."

> **Vicky:** "Pero es archivo de datos."

> **Mora:** "Datos no significa mismo idioma."

> **Vicky:** "Excel si lo abre."

> **la instructora:** "Excel adivina cosas que Python necesita explicitas."

Se mezclan separadores, hojas, objetos anidados y respuestas de API sin validar. El grupo avanzó hasta que un cambio mínimo produjo un número distinto y no quedó claro si era error, excepción o regla.

## No todo es tabla al nacer

> **Vicky:** "Copiamos y pegamos a mano."

> **Diego:** "Eso convierte lectura en artesania."

> **Vicky:** "Podemos hacerlo solo esta vez."

> **la instructora:** "Esa frase funda muchos procesos eternos."

> **Vicky:** "JSON y API tambien parecen convertibles."

> **Mora:** "Primero hay que entender como vienen."

> **Diego:** "Se mezclan separadores, hojas, objetos anidados y respuestas de API sin validar."

> **la instructora:** "Enséñame fuentes leidas con validacion de formato antes de cerrar."

El grupo puso fuentes leidas con validacion de formato junto al resultado anterior. La evidencia separó cada etapa del procedimiento y permitió corregir una sola parte sin rehacer todo el ejercicio.

## Cada fuente pide su llave

> **Mora:** "Probe lectores por formato y valide la entrada."

> **la instructora:** "Que fuentes entran correctamente."

> **Mora:** "Las que usan el lector y parametros correctos."

> **Diego:** "Entonces debemos elegir lector por formato y validar filas, columnas y tipos al entrar."

> **Mora:** "Leer datos empieza por reconocer formato, estructura y validaciones basicas."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="fuentes leidas con validacion de formato">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">fuentes leidas con validacion de formato</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="200" width="174" height="60" fill="#286d9b"/>
  <text x="157" y="190" font-size="18" text-anchor="middle">33</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">adivinar</text>
  <rect x="272" y="118" width="174" height="142" fill="#d58b2f"/>
  <text x="359" y="108" font-size="18" text-anchor="middle">78</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">lector correcto</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">96</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">validado</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La validacion confirma que la fuente entro bien.</text>
</svg>

<!-- learning:pause -->
> **Diego:** "Que debes revisar al leer CSV, Excel, JSON o una API por primera vez."

**Lo que muestra:** La evidencia separa formato y validacion. CSV necesita separador y encoding, Excel hoja y encabezados, JSON estructura anidada y API estado de respuesta. Leer bien evita limpiar errores creados al importar.

## Leer antes de limpiar

> **la instructora:** "Cada fuente tendra funcion de lectura y validacion inicial."

> **Vicky:** "La primera celda sera mas cuidadosa."

> **Mora:** "Y menos mistica."

> **Diego:** "Tambien podremos repetirla mañana."

> **Mora:** "Exacto. Leer datos no deberia depender del humor del archivo."

> **la instructora:** "Ni del pulso de quien copia y pega."

> **Mora:** "¿Qué cambiaremos después de revisar fuentes leidas con validacion de formato?"

> **Diego:** "La decisión es elegir lector por formato y validar filas, columnas y tipos al entrar."

> **Vicky:** "Y volvemos a medir lectura de CSV, Excel, JSON y APIs antes del siguiente cierre."

> **Diego:** "El CSV no estaba poseido; solo venia con separador regional."

**Regla:** leer datos empieza por reconocer formato, estructura y validaciones basicas.
