# Matriz visual canónica · Nivel 5

- **Estado:** implementada y validada para los 19 conceptos.
- **Registro:** `educational-svg-v1`.
- **Regla:** cada visual debe conservar unidad, granularidad, llaves, conteos y procedencia; ninguna tabla decorativa sustituye el mecanismo.

| Escena | Concepto | Mecanismo visible | Familia / kind | Estado de implementación |
| --- | --- | --- | --- | --- |
| L5-S01 | unidad y granularidad | Una misma fuente cambia de noche a noche-persona y cambia su conteo válido | zoom de grain / `grain-level-shift` | Renderer registrado y probado |
| L5-S02 | esquema y claves | Campos, tipos, PK/FK y cardinalidad conectan tablas | diagrama ER / `schema-key-map` | Renderer registrado y probado |
| L5-S03 | consulta orientada a pregunta | pregunta → filtro/proyección → tabla resultante | flujo tabular / `query-operation-flow` | Renderer registrado y probado |
| L5-S04 | agregación y grupos | filas colapsan por grupo conservando numerador y denominador | reconciliación / `groupby-grain-change` | Renderer registrado y probado |
| L5-S05 | semántica de JOIN y anti-join | matched, left-only y right-only sobreviven según operación | Venn tabular / `join-survival-map` | Renderer registrado y probado |
| L5-S06 | cardinalidad de JOIN | uno-a-uno, uno-a-muchos y muchos-a-muchos forman distinto número de pares | enlaces bipartitos / `join-cardinality-map` | Renderer registrado y probado |
| L5-S07 | explosión de filas | dos coincidencias por lado producen cuatro combinaciones y duplican una medida | plan de JOIN / `join-row-explosion` | Renderer registrado y probado |
| L5-S08 | CTE trazable | cada transformación intermedia expone filas de entrada/salida | linaje por etapas / `cte-count-lineage` | Renderer registrado y probado |
| L5-S09 | funciones de ventana | partición conserva filas y agrega orden/rango | bandas por partición / `window-partition-order` | Renderer registrado y probado |
| L5-S10 | rezagos y corte | `LAG` queda antes del corte y `LEAD` lo cruza | línea temporal / `sql-lag-cutoff` | Renderer registrado y probado |
| L5-S11 | población y ventanas | población, observación, features y target ocupan intervalos distintos | línea temporal / `abt-population-windows` | Renderer registrado y probado |
| L5-S12 | ABT temporal | múltiples fuentes terminan en una fila por unidad/fecha | constructor ABT / `abt-builder` | Renderer registrado y probado |
| L5-S13 | deduplicación | orden y regla eligen última observación válida sin borrar a ciegas | pila versionada / `dedup-last-valid` | Renderer registrado y probado |
| L5-S14 | CSV vs Parquet | lectura por filas frente a columnas seleccionadas | matriz de lectura / `row-columnar-read` | Renderer registrado y probado |
| L5-S15 | API paginada | cursor, páginas, retry y duplicado controlado | secuencia paginada / `api-pagination-flow` | Renderer registrado y probado |
| L5-S16 | DuckDB y Polars | la misma transformación adopta interfaz SQL o columnar | flujo comparado / `local-engine-choice` | Renderer registrado y probado |
| L5-S17 | contrato y esquema | cambio compatible/incompatible atraviesa un gate | contrato / `data-contract-gate` | Renderer registrado y probado |
| L5-S18 | integridad | unicidad, rango, nulos y FK señalan filas concretas | matriz de checks / `data-integrity-checks` | Renderer registrado y probado |
| L5-S19 | linaje y snapshot | fuente → transformación → feature → dataset, con versión y hash | DAG de procedencia / `dataset-lineage-map` | Renderer registrado y probado |

## Prueba bloqueante del nivel

`join-row-explosion` debe mostrar tablas izquierda/derecha, pares generados,
conteo de filas, conteo de noches únicas y suma inflada; movimiento reducido debe
mostrar los mismos estados y `evidenceIds`. Un fallback o barras genéricas falla.
