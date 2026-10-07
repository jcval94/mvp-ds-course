# La columna que cambió de pesos a centavos

<!-- story
concept: contratos de datos y confiabilidad de pipelines
characters: Ciro, Mayra, Vale, la dueña de facturación
situation: un proveedor cambia la unidad de una columna sin modificar su nombre
bad_logic: asumir que una carga exitosa conserva el significado de los datos
escalation: el reporte multiplica ingresos por cien y el cierre está a punto de publicarse
data_turn: Mayra compara distribución, unidad esperada y versión del esquema
chart: Ingreso mediano antes y después del cambio de unidad
decision: establecer contrato versionado, pruebas de rango y cuarentena ante cambios incompatibles
punchline: El pipeline llegó a tiempo; los pesos llegaron disfrazados de centavos.
rule: un pipeline confiable valida significado, unidad y esquema, no solo que el archivo llegue
synthetic_data: true
-->

## El mejor día del siglo

> **la dueña de facturación:** "El ingreso de ayer creció diez mil por ciento."

> **Mayra:** "Las transacciones no crecieron."

> **Ciro:** "El pipeline terminó sin errores."

> **Vale:** "Cada importe viene cien veces más grande."

> **la dueña de facturación:** "¿Cambió el precio?"

> **Mayra:** "Cambió la unidad: ahora el proveedor envía centavos."

Todos los indicadores técnicos estaban verdes: archivo recibido, columnas presentes, filas cargadas y tarea terminada. La anomalía vivía fuera de esas comprobaciones, en el significado económico de una cifra.

## Todo cargó verde

> **Ciro:** "La columna todavía se llama amount."

> **Vale:** "El nombre sobrevivió; el significado no."

> **Ciro:** "Podemos dividir entre cien y cerrar."

> **Mayra:** "Primero confirmemos desde qué archivo y fecha aplica."

> **la dueña de facturación:** "¿Hay otros consumidores de esa columna?"

> **Vale:** "Contabilidad, alertas de fraude y conciliación bancaria."

Dividir entre cien arreglaba el reporte principal, pero podía dejar tres sistemas con reglas distintas. Antes de tocar el dato, Mayra buscó la versión exacta del cambio y todos sus consumidores.

## Revisar el contrato

> **Mayra:** "Comparé mediana, rango y versión del esquema."

> **Ciro:** "El salto coincide con la versión 3 del proveedor."

> **Vale:** "La documentación confirma centavos desde las cero horas."

> **la dueña de facturación:** "Entonces corregimos una sola vez en la entrada."

> **Mayra:** "Y bloqueamos la carga si unidad o rango rompen el contrato."

La mediana saltó de 480 pesos a 48,000 unidades numéricas en el mismo minuto en que cambió el esquema. Esa ruptura era suficientemente grande para detener la carga antes de llegar a cualquier reporte.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Ingreso mediano antes y después del cambio de unidad">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Ingreso mediano antes y después del cambio de unidad</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="248" width="184" height="2" fill="#286d9b"/>
  <text x="152" y="238" font-size="17" text-anchor="middle">480 unidades</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">pesos esperados</text>
  <rect x="268" y="90" width="184" height="160" fill="#d58b2f"/>
  <text x="360" y="80" font-size="17" text-anchor="middle">48000 unidades</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">valor recibido</text>
  <rect x="476" y="248" width="184" height="2" fill="#4c8b63"/>
  <text x="568" y="238" font-size="17" text-anchor="middle">480 unidades</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">valor normalizado</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">El esquema conservó el nombre y cambió el significado.</text>
</svg>

<!-- learning:pause -->
> **Vale:** "¿Qué validación habría detenido el archivo antes de publicar ingresos cien veces mayores?"

**Lo que muestra:** La carga técnica fue exitosa, pero el contrato no verificaba unidad ni rango. La mediana salta de 480 pesos a un valor equivalente a 48,000 porque la nueva versión usa centavos. Un contrato versionado y pruebas de distribución permiten poner el archivo en cuarentena.

## Fallar con claridad

> **la dueña de facturación:** "El cierre esperará la recarga validada."

> **Ciro:** "Versionaré el esquema con unidad explícita."

> **Vale:** "Los archivos incompatibles irán a cuarentena."

> **Mayra:** "Las pruebas compararán rango, volumen y continuidad antes de publicar."

> **la dueña de facturación:** "Prefiero una carga detenida que un ingreso imaginario."

> **Ciro:** "Sobre contratos de datos y confiabilidad de pipelines, ¿qué dato revisamos en el siguiente corte?"

> **Mayra:** "Primero vamos a establecer contrato versionado, pruebas de rango y cuarentena ante cambios incompatibles; luego comparamos el resultado."

> **Ciro:** "El pipeline llegó a tiempo; los pesos llegaron disfrazados de centavos."

**Regla:** un pipeline confiable valida significado, unidad y esquema, no solo que el archivo llegue.
