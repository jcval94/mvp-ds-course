# El indicador definitivo final ahora sí

<!-- story
concept: gobernanza y versionado de métricas
characters: Celia, Rodrigo, Ana, el director
situation: tres áreas llevan valores distintos del mismo indicador a la junta
bad_logic: el archivo con fecha más reciente debe ser la verdad
escalation: cada área corrige su copia, aparecen nombres finales y las decisiones cambian según quién comparte pantalla
data_turn: Celia alinea definición, fuente y fecha de corte de cada versión
chart: línea de versiones con valores distintos
decision: asignar dueño, definición versionada y registro de cambios
punchline: Encontraron la fuente única de verdad en tres carpetas diferentes.
rule: una métrica sin definición y dueño tiene tantas verdades como archivos
synthetic_data: true
-->

## Tres números

> **El director:** "¿Cuál fue la tasa de cancelación de mayo?"
>
> **Rodrigo:** "Doce por ciento."
>
> **Ana:** "Nueve punto ocho."
>
> **Celia:** "Yo tengo catorce."
>
> **El director:** "Les pregunté una tasa, no un menú."
>
> **Rodrigo:** "Mi archivo es el más nuevo."
>
> **Ana:** "El mío dice final."
>
> **Celia:** "El mío dice final ahora sí."
>
> **El director:** "Entonces gana Celia."
>
> **Celia:** "No debería funcionar así."

Los tres archivos venían de la misma base, pero uno excluía renovaciones, otro
usaba fecha de solicitud y el tercero fecha de aplicación. Cada cambio había
resuelto una urgencia legítima y luego se había quedado a vivir sin avisarle a
los demás.
Formalmente.

## El dueño del indicador

> **El director:** "¿Quién es responsable de la definición?"
>
> **Rodrigo:** "Negocio."
>
> **Ana:** "Data."
>
> **Celia:** "En el documento dice Operación."
>
> **El director:** "¿Y Operación qué dice?"
>
> **Ana:** "Que ellos solo mandan el archivo."
>
> **Rodrigo:** "Podemos crear una cuarta versión conciliada."
>
> **Celia:** "¿Y quién concilia la conciliada?"
>
> **El director:** "No den ideas. Todavía no acabamos la junta."
>
> **Ana:** "Mi archivo también excluye cancelaciones que se corrigieron el mismo mes."
>
> **Rodrigo:** "El mío las cuenta porque sí ocurrieron."
>
> **Celia:** "El mío las mueve al mes siguiente."
>
> **El director:** "Perfecto. También tenemos tres calendarios."

La tasa de doce justificaba una campaña. La de nueve punto ocho decía que no
había urgencia. La de catorce activaba una revisión de producto. En quince
minutos, la empresa tuvo tres estrategias basadas en el mismo mes.

El director pidió abrir la fuente oficial. Rodrigo abrió una carpeta compartida,
Ana un correo y Celia una liga de intranet que solicitaba permiso para consultar
la definición del indicador.

## De dónde salió cada verdad

> **Celia:** "Puse las versiones en orden con su definición y fecha de corte."
>
> **El director:** "¿Cuál es correcta?"
>
> **Celia:** "Las tres calculan bien. Contestan preguntas distintas."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Versiones del mismo indicador con definiciones y valores distintos">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Tasa de cancelación de mayo según versión</text>
  <line x1="85" y1="255" x2="660" y2="255" stroke="#777"/>
  <rect x="120" y="105" width="110" height="150" fill="#2f79a2"/>
  <rect x="305" y="132" width="110" height="123" fill="#d58b30"/>
  <rect x="490" y="80" width="110" height="175" fill="#c64e36"/>
  <text x="150" y="95" font-size="18">12.0%</text>
  <text x="335" y="122" font-size="18">9.8%</text>
  <text x="520" y="70" font-size="18">14.0%</text>
  <text x="125" y="278" font-size="13">solicitud</text>
  <text x="310" y="278" font-size="13">aplicación</text>
  <text x="495" y="278" font-size="13">incluye renovaciones</text>
</svg>

<!-- learning:pause -->
> **Ana:** "Antes de escoger un número, ¿qué pregunta queremos responder y con qué definición?"

**Lo que muestra:** Los cálculos no fallan; cambian población, evento y fecha.
La solución es versionar la definición, asignar dueño y registrar cambios. Es
gobernanza de métricas.

## Ahora sí definitivo

> **El director:** "Negocio será dueño, Data mantiene el cálculo y cada cambio lleva fecha y nota."
>
> **Rodrigo:** "¿Cómo nombramos el archivo?"
>
> **Celia:** "Con la versión. No con nuestro estado emocional."
>
> **Ana:** "Encontraron la fuente única de verdad en tres carpetas diferentes."

**Regla:** Una métrica sin definición y dueño tiene tantas verdades como
archivos.
