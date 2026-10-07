# El examen con respuestas de práctica

<!-- story
concept: separación de entrenamiento, validación y prueba
characters: Iris, Julián, Tere, la directora analítica
situation: un equipo ajusta el modelo repetidamente mirando el conjunto que llama prueba
bad_logic: usar los mismos datos para elegir decisiones y para afirmar desempeño final
escalation: cada ajuste mejora el resultado hasta que llegan datos verdaderamente nuevos
data_turn: Iris reserva una prueba intacta y reconstruye entrenamiento y validación
chart: Desempeño en validación repetida y prueba nueva
decision: conservar un conjunto final sin tocar y registrar cada decisión de modelado
punchline: No pasamos el examen; nos aprendimos el simulador.
rule: los datos usados para decidir no pueden certificar de manera independiente el resultado
synthetic_data: true
-->

## Otra mejora

> **Julián:** "Subimos el F1 a 0.91 en prueba."

> **Iris:** "¿Cuántas veces miramos esa prueba?"

> **Tere:** "Después de cada cambio importante."

> **la directora analítica:** "Entonces también entrenamos nuestras decisiones con ella."

> **Julián:** "El modelo nunca vio esas filas."

> **Iris:** "Nosotros sí, y ajustamos el modelo con lo que vimos."

El archivo llamado prueba había sido abierto tantas veces que ya formaba parte de la rutina de desarrollo. Ninguna fila entraba al ajuste matemático, pero cada resultado cambiaba la siguiente decisión humana.

## Mirar para ajustar

> **Tere:** "Probamos ocho umbrales y cuatro grupos de variables."

> **Julián:** "Elegimos el que mejor salió."

> **Iris:** "Eso convierte la prueba en validación."

> **la directora analítica:** "¿Queda algún periodo sin consultar?"

> **Tere:** "Tenemos el último mes guardado por auditoría."

> **Iris:** "Abrámoslo una sola vez después de fijar todo."

La distinción parecía semántica hasta contar los intentos. Ocho umbrales y cuatro conjuntos de variables habían competido sobre el mismo marcador que después se presentó como evaluación independiente.

## Abrir datos intactos

> **Iris:** "El modelo obtiene 0.72 en el mes intacto."

> **Julián:** "La diferencia contra 0.91 es enorme."

> **Tere:** "El simulador nos dejó adaptarnos a sus preguntas."

> **la directora analítica:** "Ese 0.72 es la estimación que puedo defender."

> **Iris:** "Y ahora sabemos dónde necesita mejorar de verdad."

El periodo intacto redujo la cifra y aumentó su utilidad. Por primera vez, el equipo observó desempeño sin haber tenido oportunidad de adaptar el modelo a esos casos.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Desempeño en validación repetida y prueba nueva">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Desempeño en validación repetida y prueba nueva</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="90" width="184" height="160" fill="#286d9b"/>
  <text x="152" y="80" font-size="17" text-anchor="middle">91 F1 x100</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">validación reutilizada</text>
  <rect x="268" y="123" width="184" height="127" fill="#d58b2f"/>
  <text x="360" y="113" font-size="17" text-anchor="middle">72 F1 x100</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">prueba intacta</text>
  <rect x="476" y="129" width="184" height="121" fill="#4c8b63"/>
  <text x="568" y="119" font-size="17" text-anchor="middle">69 F1 x100</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">modelo base</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Consultar una prueba para ajustar la convierte en parte del desarrollo.</text>
</svg>

<!-- learning:pause -->
> **Tere:** "¿Por qué el mes intacto ofrece una estimación más honesta que la prueba consultada muchas veces?"

**Lo que muestra:** Cada consulta al conjunto anterior influyó en decisiones de variables y umbrales, así que dejó de ser una prueba independiente. El mes intacto no participó en esos ajustes y obtiene F1 de 0.72. Separar los tres conjuntos protege la evaluación final del aprendizaje indirecto.

## Tres usos distintos

> **la directora analítica:** "Separaremos entrenamiento, validación y prueba desde el inicio."

> **Tere:** "La validación guiará umbrales y variables."

> **Julián:** "La prueba final quedará bloqueada hasta congelar decisiones."

> **Iris:** "También guardaremos la fecha y razón de cada cambio."

> **la directora analítica:** "Un buen resultado necesita independencia, no sorpresa administrada."

> **Iris:** "Para repetir separación de entrenamiento, validación y prueba, ¿qué vamos a comprobar primero?"

> **Julián:** "Vamos a conservar un conjunto final sin tocar y registrar cada decisión de modelado y a revisar si el efecto se mantiene."

> **Julián:** "No pasamos el examen; nos aprendimos el simulador."

**Regla:** los datos usados para decidir no pueden certificar de manera independiente el resultado.
