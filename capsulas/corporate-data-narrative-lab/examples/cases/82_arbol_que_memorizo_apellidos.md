# El árbol que memorizó apellidos

<!-- story
concept: sobreajuste, complejidad y generalización
characters: Nora, Felipe, Agus, la responsable de talento
situation: un árbol profundo predice renuncias históricas usando reglas demasiado específicas
bad_logic: premiar el ajuste perfecto al pasado aunque dependa de detalles irrepetibles
escalation: se propone intervenir personas nuevas con reglas basadas en apellidos y folios
data_turn: Nora compara entrenamiento y validación para distintas profundidades
chart: Desempeño de validación según profundidad del árbol
decision: usar un modelo más simple, excluir identificadores y limitarlo a apoyo agregado
punchline: El árbol conocía a todos por apellido y a nadie fuera de la oficina.
rule: un modelo útil aprende patrones que sobreviven fuera de sus datos de entrenamiento
synthetic_data: true
-->

## Cero errores

> **Felipe:** "El árbol clasifica sin un solo error el historial."

> **Nora:** "¿Qué profundidad tiene?"

> **Agus:** "Treinta y dos niveles y más de mil ramas."

> **la responsable de talento:** "¿Qué usa en las últimas ramas?"

> **Felipe:** "Folio, inicial del apellido y fecha exacta de ingreso."

> **Nora:** "Eso suena a memoria, no a patrón."

El diagrama era tan profundo que ninguna pantalla mostraba una ruta completa. Su exactitud perfecta venía de ramas capaces de aislar registros históricos uno por uno.

## La regla del folio

> **Agus:** "Podemos usarlo para llamar a cada persona en riesgo."

> **la responsable de talento:** "No con reglas que identifican individuos."

> **Felipe:** "Si quitamos folio, baja el ajuste."

> **Nora:** "Quiero saber si mejora en personas que nunca vio."

> **Agus:** "En validación nueva cae a 58%."

> **la responsable de talento:** "Entonces el cero de entrenamiento no compra confianza."

Además del problema técnico, el uso propuesto afectaba personas. Un identificador podía convertir una coincidencia del pasado en una conversación laboral injustificada y difícil de apelar.

## Podar para probar

> **Nora:** "Probé árboles de distintas profundidades sin identificadores."

> **Felipe:** "La validación alcanza 74% en profundidad cinco."

> **Agus:** "Después vuelve a bajar aunque entrenamiento siga subiendo."

> **la responsable de talento:** "Ese punto equilibra señal y generalización."

> **Nora:** "Aun así, no se usará para sancionar ni señalar personas."

La curva de validación subió hasta una profundidad moderada y luego retrocedió. Podar el árbol redujo su memoria y mejoró su capacidad de funcionar con registros que nunca había visto.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Desempeño de validación según profundidad del árbol">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Desempeño de validación según profundidad del árbol</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="105" width="184" height="145" fill="#286d9b"/>
  <text x="152" y="95" font-size="17" text-anchor="middle">67 % validación</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">profundidad 2</text>
  <rect x="268" y="90" width="184" height="160" fill="#d58b2f"/>
  <text x="360" y="80" font-size="17" text-anchor="middle">74 % validación</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">profundidad 5</text>
  <rect x="476" y="125" width="184" height="125" fill="#4c8b63"/>
  <text x="568" y="115" font-size="17" text-anchor="middle">58 % validación</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">profundidad 32</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Más profundidad mejora memoria, no necesariamente generalización.</text>
</svg>

<!-- learning:pause -->
> **Agus:** "¿Qué profundidad funciona mejor en datos nuevos aunque no sea perfecta en entrenamiento?"

**Lo que muestra:** El árbol de 32 niveles memoriza entrenamiento y cae a 58% en validación. Sin identificadores, una profundidad de cinco alcanza 74% y generaliza mejor. La brecha entre entrenamiento y validación muestra sobreajuste; además, el uso debe evitar daño individual.

## Usar patrones, no nombres

> **la responsable de talento:** "Usaremos tendencias por área para revisar condiciones de trabajo."

> **Agus:** "No habrá listas individuales para jefaturas."

> **Felipe:** "Eliminaré identificadores y limitaré complejidad."

> **Nora:** "También mediremos estabilidad en periodos nuevos."

> **la responsable de talento:** "La intervención será sobre procesos y con revisión humana."

> **Nora:** "Para repetir sobreajuste, complejidad y generalización, ¿qué vamos a comprobar primero?"

> **Felipe:** "Vamos a usar un modelo más simple, excluir identificadores y limitarlo a apoyo agregado y a revisar si el efecto se mantiene."

> **Felipe:** "El árbol conocía a todos por apellido y a nadie fuera de la oficina."

**Regla:** un modelo útil aprende patrones que sobreviven fuera de sus datos de entrenamiento.
