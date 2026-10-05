# El modelo que ya sabía la devolución

<!-- story
concept: target leakage en aprendizaje automático
characters: Aída, Mauro, Ceci, el gerente de operaciones
situation: un modelo predice devoluciones con precisión casi perfecta antes del envío
bad_logic: usar una variable registrada después de la devolución como entrada del modelo
escalation: operaciones planea bloquear pedidos basándose en una señal del futuro
data_turn: Aída ordena variables por momento de disponibilidad y reentrena solo con datos previos
chart: Precisión con variables disponibles antes de decidir
decision: usar el modelo realista como apoyo y documentar la hora disponible de cada variable
punchline: El modelo no veía el futuro; estaba leyendo el recibo del regreso.
rule: cada variable debe existir en el momento exacto en que se tomará la decisión
synthetic_data: true
-->

## Noventa y nueve por ciento

> **el gerente de operaciones:** "El modelo acierta 99% de las devoluciones."

> **Aída:** "¿Qué variables usa?"

> **Mauro:** "Precio, categoría y fecha de recepción en devoluciones."

> **Ceci:** "Esa fecha aparece cuando el paquete ya volvió."

> **el gerente de operaciones:** "Pero mejora muchísimo la precisión."

> **Aída:** "Porque le cuenta la respuesta antes del examen."

La cifra de 99% había eliminado todas las dudas del informe, pero no las del proceso. La variable más importante se generaba varios días después de la decisión que el modelo debía apoyar.

## La fecha posterior

> **Mauro:** "Podemos conservarla como indicador indirecto."

> **Ceci:** "¿Indirecto de qué? Dice que la devolución fue recibida."

> **Mauro:** "El algoritmo le asignó mucho peso."

> **Aída:** "Eso confirma la fuga, no su utilidad operativa."

> **el gerente de operaciones:** "¿Qué sabremos justo antes de enviar?"

> **Ceci:** "Producto, cliente, pago y promesa de entrega; nada del regreso."

Mauro defendía el resultado porque la evaluación era impecable dentro del archivo histórico. El problema apareció al dibujar una línea de tiempo: producción nunca tendría aquella columna antes del envío.

## Cerrar la ventana

> **Aída:** "Reentrené usando solo datos disponibles al autorizar el envío."

> **Mauro:** "La precisión baja a 74%."

> **Ceci:** "Pero ese resultado sí puede existir en producción."

> **el gerente de operaciones:** "Prefiero 74% real que 99% de recuerdo."

> **Aída:** "También separé la validación por fecha para respetar el orden."

Sin la señal posterior, el desempeño bajó y se volvió creíble. La nueva barra no impresionaba tanto, pero representaba una predicción que podía ejecutarse cuando todavía había algo que decidir.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Precisión con variables disponibles antes de decidir">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Precisión con variables disponibles antes de decidir</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="90" width="184" height="160" fill="#286d9b"/>
  <text x="152" y="80" font-size="17" text-anchor="middle">99 % precisión</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">con dato futuro</text>
  <rect x="268" y="130" width="184" height="120" fill="#d58b2f"/>
  <text x="360" y="120" font-size="17" text-anchor="middle">74 % precisión</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">antes del envío</text>
  <rect x="476" y="140" width="184" height="110" fill="#4c8b63"/>
  <text x="568" y="130" font-size="17" text-anchor="middle">68 % precisión</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">base simple</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El resultado realista excluye información posterior a la decisión.</text>
</svg>

<!-- learning:pause -->
> **Ceci:** "¿Qué desempeño importa si solo usamos información disponible antes de autorizar el envío?"

**Lo que muestra:** La fecha de recepción de la devolución revela el objetivo y provoca fuga de información. Al retirarla, la precisión baja a 74%, pero ahora mide una situación posible en producción. El momento de disponibilidad es parte del significado de cada variable.

## Predecir sin viajar

> **el gerente de operaciones:** "No bloquearemos pedidos automáticamente."

> **Ceci:** "La señal priorizará revisión de casos costosos."

> **Mauro:** "Agregaré disponibilidad temporal al catálogo de variables."

> **Aída:** "Y una prueba que falle si entra información posterior."

> **el gerente de operaciones:** "La evaluación debe parecerse al momento de uso."

> **Aída:** "Sobre target leakage en aprendizaje automático, ¿qué dato revisamos en el siguiente corte?"

> **Mauro:** "Primero vamos a usar el modelo realista como apoyo y documentar la hora disponible de cada variable; luego comparamos el resultado."

> **Mauro:** "El modelo no veía el futuro; estaba leyendo el recibo del regreso."

**Regla:** cada variable debe existir en el momento exacto en que se tomará la decisión.
