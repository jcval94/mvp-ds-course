# Level Narrative Arc: Nivel 5

## Identidad

- **ID:** `don-juan-paco-level-5-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 5.
- **Historia canónica:** `docs/stories/LEVEL_5.md`.
- **Ledger de entrada:** `L4.4 / G3-espera`.
- **Conflicto:** un reporte válido aumenta ventas y noches después de juntar cierres, turnos y eventos; nadie recibió un error, pero la misma noche aparece varias veces.
- **Promesa:** construir una tabla analítica reproducible demostrando unidad, granularidad, cardinalidad, corte temporal, calidad y procedencia.
- **Competencia auxiliar:** auditar una query generada por un agente antes de confiar en el resultado.
- **Estado del puesto:** `G3-espera`; diez asientos, Mari pagada viernes y sábado, sin crecimiento.
- **Periodo narrativo:** 16–18 de noviembre de 2026; se auditan datos ya observados hasta el 15 de noviembre, sin añadir ventas futuras.

## Episodios

| Episodio | Escenas | Objetivo principal | Estado de datos | Puente |
| --- | --- | --- | --- | --- |
| `L5-E1` Cada renglón promete algo | `L5-S01`–`L5-S02` | Fijar unidad, granularidad, esquema, claves y cardinalidad | `L4.4 → fuentes_relacionadas@L5.1` | ¿Cómo convertimos una pregunta en operaciones verificables? |
| `L5-E2` Preguntar sin perder la tabla | `L5-S03`–`L5-S04` | Usar SQL para seleccionar y agregar con denominadores explícitos | `L5.1 → consultas_auditadas@L5.2` | ¿Qué pasa al combinar tablas con distinta granularidad? |
| `L5-E3` Los clientes que se multiplicaban | `L5-S05`–`L5-S07` | Elegir JOIN, anticipar cardinalidad y detectar explosión de filas | `L5.2 → joins_auditados@L5.3` | ¿Cómo conservamos orden y tiempo en consultas largas? |
| `L5-E4` Lo disponible a esa hora | `L5-S08`–`L5-S10` | Encadenar CTE, ventanas y rezagos respetando fecha de corte | `L5.3 → sql_temporal@L5.4` | ¿Cómo se convierte esto en una tabla para modelar? |
| `L5-E5` Una fila por noche antes de abrir | `L5-S11`–`L5-S13` | Definir población, ABT temporal y deduplicación | `L5.4 → abt_verificada@L5.5` | ¿Cómo llegan fuentes externas sin cambiar el significado? |
| `L5-E6` No todos los archivos se leen igual | `L5-S14`–`L5-S16` | Elegir formato, paginar una API y ejecutar localmente según escala | `L5.5 → fuentes_versionadas@L5.6` | ¿Cómo demostramos que la tabla sigue cumpliendo su contrato? |
| `L5-E7` El recibo de cada transformación | `L5-S17`–`L5-S19` | Validar contrato, integridad, linaje, snapshot y hash | `L5.6 → dataset_confiable@L5.H1` | Un modelo aprenderá exactamente de esta tabla, incluidos sus errores. |

## Deltas aprobados

- **`continuityDelta`:** Don Juan deja de aceptar “salieron más filas” como evidencia de crecimiento; Paco incorpora reconciliación antes/después y revisión de SQL asistido.
- **`dataStateDelta`:** `L4.4 → fuentes_relacionadas@L5.1 → consultas_auditadas@L5.2 → joins_auditados@L5.3 → sql_temporal@L5.4 → abt_verificada@L5.5 → fuentes_versionadas@L5.6 → dataset_confiable@L5.H1`.
- **`growthDelta`:** ninguno; `G3-espera` permanece sin cambios.
- **`evaristoDelta`:** Evaristo aparece en el incidente de filas duplicadas. Su
  silencio o el ventilador de su laptop puede sobreinterpretarse como
  “Procesamiento”, pero Paco reconcilia conteos y el narrador nombra JOIN,
  cardinalidad y explosión de filas.
- **Secretos:** ninguno se revela ni se infiere.

## Aprobación narrativa

- Don Juan solo habla de cierres, turnos, ventas, noches y consecuencias.
- Paco actúa como hijo y estudiante fuera del horario escolar; no se convierte en administrador de bases de datos.
- El narrador introduce toda terminología técnica en subtítulos.
- Aprender usa el reporte inflado del 14 de noviembre; Ejercitar usa cierres y eventos del 7 y 8 de noviembre con conteos distintos.
- La historia no altera fechas, plantilla, capacidad ni secretos aprobados.
- La pregunta “¿cómo saben?” de Evaristo puede abrir una revisión, pero no es
  evidencia, query ni respuesta técnica.

## Cierre

El subtítulo final establece: **“Un modelo solo puede aprender de la tabla que construiste, incluidos sus errores.”**
La pregunta puente a Nivel 6 es: **“Ahora que cada fila conserva su significado, ¿qué patrón puede aprender sin mirar el futuro?”**

## Supuestos y límites

- Las fuentes narrativas son sintéticas y no contienen clientes identificables.
- “Clientes que se multiplican” describe conteos duplicados del reporte, no personas perfiladas.
- DuckDB y Polars aparecen como herramientas de referencia; el objetivo es decidir y verificar, no memorizar APIs.
- La historia completa queda aprobada y sus 19 escenas están implementadas en el nivel publicado.
