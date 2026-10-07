# La categoria Otro que se comio la limpieza

<!-- story
concept: limpieza real con nulos, duplicados, tipos, outliers y categorias rotas
characters: Sara, Tomas, Lina, la gerente
situation: Lectura y Limpieza se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: limpiar datos es borrar lo feo hasta que el reporte se vea estable
escalation: nulos, duplicados y categorias rotas se ocultan y la metrica parece mejorar
data_turn: una persona compara el atajo contra una version verificable
chart: problemas de calidad antes y despues de limpieza documentada
decision: perfilado, reglas de limpieza, bitacora y validacion de impacto
punchline: No limpiamos la casa; metimos todo al closet llamado Otro.
rule: limpiar datos exige reglas explicitas y revisar como cambian las metricas
synthetic_data: true
-->

## El reporte quedo limpio

> **Sara:** "Ya limpie los datos y la metrica se estabilizo."

> **Tomas:** "Tambien subio la categoria Otro."

> **Lina:** "Eso absorbe rarezas."

> **Sara:** "Absorber no es explicar."

> **Lina:** "Quite nulos, duplicados y valores extremos."

> **la gerente:** "Sin bitacora no sabemos que quitaste."

Nulos, duplicados y categorias rotas se ocultan y la metrica parece mejorar. El ejercicio dejó de ser demostración cuando tuvo que responder una pregunta nueva y el código no sabía dónde buscar el dato.

## El closet de Otro

> **Lina:** "Dejamos solo registros bonitos."

> **Tomas:** "Entonces el reporte describe un mundo decorado."

> **Lina:** "Pero muy consistente."

> **la gerente:** "La consistencia tambien se puede fabricar."

> **Lina:** "Los outliers molestaban la grafica."

> **Sara:** "A veces molestan porque son el hallazgo."

> **Tomas:** "Nulos, duplicados y categorias rotas se ocultan y la metrica parece mejorar."

> **la gerente:** "Enséñame problemas de calidad antes y despues de limpieza documentada antes de cerrar."

El grupo puso problemas de calidad antes y despues de limpieza documentada junto al resultado anterior. La comparación mostró qué estructura o regla permitía adaptar la solución sin esconder un caso especial dentro del resultado.

## Limpiar no es desaparecer

> **Sara:** "Compare problemas antes y despues de reglas documentadas."

> **la gerente:** "Que cambio la limpieza en la metrica."

> **Sara:** "La limpieza correcta arregla tipos sin esconder categorias."

> **Tomas:** "Entonces debemos perfilado, reglas de limpieza, bitacora y validacion de impacto."

> **Sara:** "Limpiar datos exige reglas explicitas y revisar como cambian las metricas."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="problemas de calidad antes y despues de limpieza documentada">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">problemas de calidad antes y despues de limpieza documentada</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="197" width="174" height="63" fill="#286d9b"/>
  <text x="157" y="187" font-size="18" text-anchor="middle">34</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">oculto</text>
  <rect x="272" y="113" width="174" height="147" fill="#d58b2f"/>
  <text x="359" y="103" font-size="18" text-anchor="middle">79</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">reglas</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">94</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">validado</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">Documentar limpieza evita mejorar por esconder problemas.</text>
</svg>

<!-- learning:pause -->
> **Tomas:** "Que debe documentarse al limpiar nulos, duplicados, tipos, outliers y categorias."

**Lo que muestra:** La evidencia muestra que limpiar no es borrar incomodidad. Cada regla debe explicar que cambia, cuantos registros afecta y si altera la metrica. Nulos, duplicados, tipos, outliers y categorias rotas necesitan tratamiento visible.

## La regla deja rastro

> **la gerente:** "La limpieza tendra perfilado, reglas y bitacora de impacto."

> **Lina:** "El reporte mostrara cicatrices."

> **Sara:** "Y tambien confianza."

> **Tomas:** "Entonces limpiar no es dejarlo bonito."

> **Sara:** "Es dejar claro que cambiaste y por que."

> **la gerente:** "Eso si lo puedo defender en comite."

> **Sara:** "¿Qué cambiaremos después de revisar problemas de calidad antes y despues de limpieza documentada?"

> **Tomas:** "La decisión es perfilado, reglas de limpieza, bitacora y validacion de impacto."

> **Lina:** "Y volvemos a medir limpieza real con nulos, duplicados, tipos, outliers y categorias rotas antes del siguiente cierre."

> **Tomas:** "No limpiamos la casa; metimos todo al closet llamado Otro."

**Regla:** limpiar datos exige reglas explicitas y revisar como cambian las metricas.
