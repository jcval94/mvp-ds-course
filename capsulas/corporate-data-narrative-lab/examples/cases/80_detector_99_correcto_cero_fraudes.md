# El detector 99% correcto que encontró cero fraudes

<!-- story
concept: desbalance de clases y métricas de clasificación
characters: Lía, Chucho, Vania, el director de riesgo
situation: un clasificador presume 99% de exactitud en un problema con fraude muy raro
bad_logic: usar accuracy cuando predecir siempre no fraude ya obtiene un resultado alto
escalation: se planea reemplazar revisión humana con un modelo que no detecta ningún caso positivo
data_turn: Lía muestra recall, precisión y una matriz de confusión
chart: Casos reales detectados por cada cien fraudes
decision: mantener revisión humana y elegir umbral según fraude detectado y capacidad
punchline: El modelo acertaba siempre que no pasara nada, que era casi siempre.
rule: en clases raras, evalúa los errores que importan y no solo el porcentaje total de aciertos
synthetic_data: true
-->

## Noventa y nueve

> **el director de riesgo:** "El detector tiene 99% de exactitud; podemos automatizar."

> **Lía:** "¿Cuántos fraudes encontró?"

> **Chucho:** "Ninguno en la muestra final."

> **Vania:** "Entonces, ¿qué acertó?"

> **Chucho:** "Todos los casos normales, que son casi todos."

> **Lía:** "Predecir no fraude para cada operación también logra 99%."

La exactitud había pasado todas las diapositivas sin una sola pregunta sobre los casos positivos. En cien mil operaciones, la clase dominante era tan grande que podía ocultar un detector completamente inmóvil.

## La respuesta única

> **el director de riesgo:** "La cifra del proveedor sigue siendo correcta."

> **Vania:** "Correcta para contar tranquilidad, inútil para encontrar fraude."

> **Chucho:** "Si bajo el umbral, aparecerán muchas alertas."

> **Lía:** "Por eso necesitamos medir detección y carga de revisión."

> **el director de riesgo:** "¿Cuántos fraudes podemos dejar pasar?"

> **Vania:** "No cero, pero tampoco cien; depende del daño y la capacidad."

Bajar el umbral no era una decisión puramente técnica. Cada alerta terminaba en una mesa con capacidad limitada y cada error podía retener una compra legítima o dejar pasar una pérdida.

## Contar los fraudes

> **Lía:** "Con el umbral actual detectamos cero de cada cien fraudes."

> **Chucho:** "El umbral operativo detecta 71 y manda 430 alertas diarias."

> **Vania:** "El equipo puede revisar 450."

> **el director de riesgo:** "Ese punto sí conecta modelo y operación."

> **Lía:** "Y aún requiere monitorear falsos positivos por segmento."

La nueva comparación puso al centro los cien fraudes reales. El modelo dejó de esconderse detrás de operaciones normales y tuvo que mostrar cuántos casos encontraba y cuántas revisiones generaba.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Casos reales detectados por cada cien fraudes">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Casos reales detectados por cada cien fraudes</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="250" width="184" height="0" fill="#286d9b"/>
  <text x="152" y="240" font-size="17" text-anchor="middle">0 por cien</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">umbral actual</text>
  <rect x="268" y="99" width="184" height="151" fill="#d58b2f"/>
  <text x="360" y="89" font-size="17" text-anchor="middle">71 por cien</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">umbral operativo</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">75 por cien</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">capacidad</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Accuracy alto puede convivir con cero fraudes detectados.</text>
</svg>

<!-- learning:pause -->
> **el director de riesgo:** "¿Qué umbral encuentra más fraude sin rebasar la capacidad diaria de revisión?"

**Lo que muestra:** La exactitud de 99% se obtiene incluso prediciendo siempre la clase mayoritaria. El umbral operativo detecta 71 de cada cien fraudes y produce 430 alertas, dentro de una capacidad de 450. Recall, precisión y carga permiten evaluar la decisión real.

## Una métrica con trabajo

> **el director de riesgo:** "No retiramos a las personas de revisión."

> **Vania:** "Usaremos el score para ordenar alertas dentro de capacidad."

> **Chucho:** "El reporte mostrará recall, precisión y matriz de confusión."

> **Lía:** "También comparará contra la regla de siempre no fraude."

> **el director de riesgo:** "La métrica principal debe encontrar lo que buscamos."

> **Lía:** "Después de ajustar desbalance de clases y métricas de clasificación, ¿qué podría cambiar la decisión?"

> **Chucho:** "Toca mantener revisión humana y elegir umbral según fraude detectado y capacidad; si cambia el dato, volvemos a decidir."

> **Chucho:** "El modelo acertaba siempre que no pasara nada, que era casi siempre."

**Regla:** en clases raras, evalúa los errores que importan y no solo el porcentaje total de aciertos.
