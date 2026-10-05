# El modelo barato que salio caro

<!-- story
concept: costo de error y metrica de negocio
characters: Emilia, Raul, Berta, la CFO
situation: un modelo barato tiene precision aceptable pero falla en casos de alto costo
bad_logic: si dos modelos tienen precision parecida, gana el mas barato
escalation: se ahorra en computo y se pierde mas por errores caros
data_turn: Emilia compara costo total de errores y operacion
chart: costo por error
decision: elegir modelo por costo esperado y no solo por costo de ejecucion
punchline: Ahorramos en el modelo y pagamos la factura en los errores.
rule: la metrica correcta incluye el costo de equivocarse
synthetic_data: true
-->

## La opcion economica

> **Emilia:** "El modelo ligero cuesta menos y acierta casi igual."

> **Raul:** "Casi igual en casos, no en dinero."

> **Berta:** "La precision se ve muy cercana."

> **Emilia:** "Cuanto cuesta cuando se equivoca."

> **Berta:** "El presupuesto de tecnologia baja bastante."

> **la CFO:** "El presupuesto de reclamos sube con ganas."

Se ahorra en computo y se pierde mas por errores caros. La mala decisión no necesitó crecer más para hacerse visible: ya había alterado una prioridad, un turno o una respuesta al cliente.

## El ahorro encontro otro recibo

> **Berta:** "Tomemos el barato y monitoreamos."

> **Raul:** "Monitorear perdidas no las vuelve descuento."

> **Berta:** "Pero la factura del proveedor se vera preciosa."

> **la CFO:** "La del cliente afectado no."

> **Berta:** "Podemos aceptar algunos errores."

> **Emilia:** "Aceptemos primero saber cuales."

> **Raul:** "Se ahorra en computo y se pierde mas por errores caros."

> **la CFO:** "Quiero ver costo por error antes de decidir."

Emilia compara costo total de errores y operacion. La gráfica reunió contexto y resultado en un mismo lugar, suficiente para cambiar el siguiente paso sin exagerar la conclusión.

## No todos los errores cuestan igual

> **Emilia:** "Multiplique errores por costo de negocio."

> **la CFO:** "Que modelo sale barato despues del dano."

> **Emilia:** "El caro en computo cuesta menos al final."

> **Raul:** "Ahora entiendo por qué si dos modelos tienen precision parecida, gana el mas barato."

> **Emilia:** "Respondía otra pregunta; no servía para elegir modelo por costo esperado y no solo por costo de ejecucion."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="costo por error">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">costo por error</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="174" height="175" fill="#286d9b"/>
  <text x="157" y="75" font-size="18" text-anchor="middle">78</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">modelo barato</text>
  <rect x="272" y="164" width="174" height="96" fill="#d58b2f"/>
  <text x="359" y="154" font-size="18" text-anchor="middle">43</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">modelo robusto</text>
  <rect x="474" y="234" width="174" height="26" fill="#4c8b63"/>
  <text x="561" y="224" font-size="18" text-anchor="middle">12</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">solo computo</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">El costo total cambia la decision.</text>
</svg>

<!-- learning:pause -->
> **Raul:** "Que metrica falta cuando comparamos modelos solo por precision y precio de ejecucion."

**Lo que muestra:** La grafica muestra que errores raros pueden concentrar mucho costo. La precision trata errores como iguales, pero el negocio no. La comparacion debe incluir costo esperado, volumen, impacto y capacidad de corregir.

## Barato despues de sumar

> **la CFO:** "Elegimos por costo total esperado."

> **la CFO:** "Dejen por escrito quién va a elegir modelo por costo esperado y no solo por costo de ejecucion."

> **Berta:** "La factura tecnica sube."

> **Emilia:** "La factura completa baja."

> **Emilia:** "¿Qué cambiaremos después de revisar costo por error?"

> **Raul:** "La decisión es elegir modelo por costo esperado y no solo por costo de ejecucion."

> **Berta:** "Y volvemos a medir costo de error y metrica de negocio antes del siguiente cierre."

> **Raul:** "Ahorramos en el modelo y pagamos la factura en los errores."

**Regla:** la metrica correcta incluye el costo de equivocarse.
