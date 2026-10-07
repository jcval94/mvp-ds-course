# La grafica que cambio sola

<!-- story
concept: diferencias reproducibles en codigo y datos
characters: Noe, Sara, Miguel, la gerente
situation: una grafica cambia porque el dato fuente se actualizo sin registro
bad_logic: si el codigo no cambio, el resultado debe ser el mismo
escalation: se discute el analisis sin saber que tabla alimento cada version
data_turn: Sara compara hash de datos, fecha de extraccion y commit de codigo
chart: diff de datos y codigo
decision: registrar versiones de datos y parametros junto con cada salida
punchline: La grafica no cambio sola; solo fue mas discreta que nosotros.
rule: para reproducir un analisis versiona codigo, datos y parametros
synthetic_data: true
-->

## El mismo notebook

> **Noe:** "La grafica de hoy no coincide con la de ayer."

> **Sara:** "El codigo no cambio."

> **Miguel:** "Entonces alguien movio una formula."

> **Noe:** "O cambio el dato de entrada."

> **Miguel:** "La consulta jala lo mas reciente."

> **la gerente:** "Eso es comodo y peligrosamente silencioso."

Se discute el analisis sin saber que tabla alimento cada version. La presión por cerrar seguía ahí, pero ahora también había un caso concreto que mostraba por qué la salida era insuficiente.

## El dato se movio sin hacer ruido

> **Miguel:** "Ponemos una nota de actualizado."

> **Sara:** "La nota no dice que filas cambiaron."

> **Miguel:** "Podemos jurar que corrimos lo mismo."

> **la gerente:** "Corrimos lo mismo contra otro mundo."

> **Miguel:** "El numero nuevo se ve mejor."

> **Noe:** "No confundamos mejora con actualizacion."

> **Sara:** "Se discute el analisis sin saber que tabla alimento cada version."

> **la gerente:** "Quiero ver diff de datos y codigo antes de decidir."

Sara compara hash de datos, fecha de extraccion y commit de codigo. Al ordenar la evidencia, el equipo pudo distinguir una coincidencia conveniente de una señal útil para decidir.

## Tres huellas para una grafica

> **Noe:** "Compare codigo, parametros y fuente usada."

> **la gerente:** "Que huella cambio entre salidas."

> **Noe:** "El commit era igual; el corte de datos no."

> **Sara:** "Ahora entiendo por qué si el codigo no cambio, el resultado debe ser el mismo."

> **Noe:** "Respondía otra pregunta; no servía para registrar versiones de datos y parametros junto con cada salida."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="diff de datos y codigo">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">diff de datos y codigo</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="242" width="174" height="18" fill="#286d9b"/>
  <text x="157" y="232" font-size="18" text-anchor="middle">0</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">codigo</text>
  <rect x="272" y="85" width="174" height="175" fill="#d58b2f"/>
  <text x="359" y="75" font-size="18" text-anchor="middle">63</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">datos</text>
  <rect x="474" y="227" width="174" height="33" fill="#4c8b63"/>
  <text x="561" y="217" font-size="18" text-anchor="middle">12</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">parametros</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">El cambio principal venia de los datos fuente.</text>
</svg>

<!-- learning:pause -->
> **Sara:** "Que piezas deben guardarse para reproducir una grafica de negocio."

**Lo que muestra:** La evidencia separa tres fuentes de cambio: codigo, parametros y datos. Si solo se versiona el notebook, una actualizacion de fuente puede cambiar resultados sin explicacion. Cada salida debe guardar corte o identificador de datos.

## La salida lleva acta

> **la gerente:** "Cada grafica guardara commit, fecha de datos y parametros."

> **la gerente:** "Dejen por escrito quién va a registrar versiones de datos y parametros junto con cada salida."

> **Miguel:** "La carpeta de salidas tendra mas metadata."

> **Noe:** "Y menos misterio."

> **Noe:** "¿Qué cambiaremos después de revisar diff de datos y codigo?"

> **Sara:** "La decisión es registrar versiones de datos y parametros junto con cada salida."

> **Miguel:** "Y volvemos a medir diferencias reproducibles en codigo y datos antes del siguiente cierre."

> **Sara:** "La grafica no cambio sola; solo fue mas discreta que nosotros."

**Regla:** para reproducir un analisis versiona codigo, datos y parametros.
