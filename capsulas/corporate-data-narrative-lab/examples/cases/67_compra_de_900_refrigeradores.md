# La compra de 900 refrigeradores

<!-- story
concept: detección e investigación de outliers
characters: Paloma, Saúl, Gina, el contralor
situation: compras reporta un salto mensual provocado por una orden imposible
bad_logic: borrar el valor extremo para que el promedio vuelva a verse normal
escalation: el equipo está a punto de ocultar un error de unidad que también afecta inventario
data_turn: Paloma rastrea el registro extremo hasta una captura de cajas como piezas
chart: Refrigeradores registrados por orden
decision: corregir la unidad, conservar una bitácora y agregar validaciones de rango
punchline: No compramos 900 refrigeradores; compramos nueve y un cero muy seguro de sí mismo.
rule: un outlier se investiga antes de corregirse o eliminarse
synthetic_data: true
-->

## La bodega imposible

> **el contralor:** "¿Quién autorizó 900 refrigeradores para una oficina de dos pisos?"

> **Gina:** "El sistema dice que fue Compras."

> **Saúl:** "Podemos quitar esa fila; claramente está mal."

> **Paloma:** "Si está mal, primero necesitamos saber cómo llegó."

> **el contralor:** "Necesito cerrar el gasto hoy."

> **Paloma:** "Y mañana Inventario va a buscar 891 aparatos fantasma."

La cifra había inflado el gasto mensual y también el inventario esperado. Eliminarla arreglaba dos gráficas en segundos, pero dejaba intacta la captura que podía repetir el error con cualquier otro producto.

## Borrar la fila

> **Saúl:** "Marco el valor como atípico y lo excluyo del promedio."

> **Gina:** "El proveedor cobró nueve cajas."

> **Saúl:** "Entonces ya sabemos que sobra."

> **Paloma:** "Todavía falta saber si cada caja trae una pieza o cien."

> **el contralor:** "¿Qué dice la orden original?"

> **Gina:** "Nueve cajas, una unidad por caja; alguien capturó centenares."

Gina encontró el PDF del proveedor y la pantalla de captura. El campo cantidad estaba correcto; el selector de unidad había quedado en centenas después de una compra anterior de tornillos.

## El folio completo

> **Paloma:** "Puse cada orden del mes en la misma escala."

> **Saúl:** "Las demás están entre dos y doce refrigeradores."

> **Gina:** "El folio de 900 también tiene usuario y hora."

> **el contralor:** "Entonces corregimos el dato, no lo desaparecemos."

> **Paloma:** "Y dejamos evidencia del valor anterior y del documento fuente."

La barra extrema no probaba fraude ni justificaba borrado. Señalaba el folio que debía investigarse y la regla de captura que necesitaba una protección nueva.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Refrigeradores registrados por orden">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Refrigeradores registrados por orden</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="249" width="184" height="1" fill="#286d9b"/>
  <text x="152" y="239" font-size="17" text-anchor="middle">6 unidades</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">orden típica</text>
  <rect x="268" y="248" width="184" height="2" fill="#d58b2f"/>
  <text x="360" y="238" font-size="17" text-anchor="middle">12 unidades</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">orden alta válida</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">900 unidades</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">orden capturada</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El valor extremo apunta a una unidad mal capturada.</text>
</svg>

<!-- learning:pause -->
> **el contralor:** "¿Qué debemos hacer con el valor de 900 antes de calcular de nuevo el gasto?"

**Lo que muestra:** El valor extremo identifica una observación que merece revisión, no una fila que deba borrarse automáticamente. La orden original confirma nueve unidades y revela un error de unidad. Corregir con trazabilidad evita distorsionar el gasto y permite reparar la captura que originó el problema.

## Corregir con recibo

> **el contralor:** "Contabilidad corregirá la orden a nueve unidades."

> **Gina:** "Inventario recibirá la misma corrección."

> **Saúl:** "Agregaré una alerta arriba de cincuenta piezas."

> **Paloma:** "La alerta pedirá confirmar unidad, no borrará registros."

> **el contralor:** "Quiero la bitácora junto al cierre."

> **Paloma:** "Para repetir detección e investigación de outliers, ¿qué vamos a comprobar primero?"

> **Saúl:** "Vamos a corregir la unidad, conservar una bitácora y agregar validaciones de rango y a revisar si el efecto se mantiene."

> **Saúl:** "No compramos 900 refrigeradores; compramos nueve y un cero muy seguro de sí mismo."

**Regla:** un outlier se investiga antes de corregirse o eliminarse.
