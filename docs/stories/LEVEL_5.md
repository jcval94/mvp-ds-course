# Historia Nivel 5: Los clientes que se multiplicaban

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-5-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 5.
- **Arco:** `docs/LEVEL_5_NARRATIVE_ARC.md`.
- **Entrada/salida:** `L4.4 / G3-espera → dataset_confiable@L5.H1 / G3-espera`.
- **Periodo:** 16–18 de noviembre de 2026; auditoría de datos cerrados al 15 de noviembre.
- **Audiencia/duración:** personas adultas principiantes; siete sesiones de 35–45 minutos al producir el nivel completo.
- **Supuesto:** cada escena puede desarrollarse sin convertir el nivel en administración de bases de datos.

## Temario predeterminado y escenas

| Escena | Concepto | Incidente Aprender | Don Juan | Paco | Subtítulo inicial del narrador | Subtítulo final del narrador | Incidente distinto de Ejercitar |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L5-S01` | unidad y granularidad | Comparar cierres por noche, turnos por persona y eventos por etiqueta | “¿Cada renglón habla de una noche o de una persona?” | “Primero anoto qué representa, Pa.” | La unidad de análisis es aquello que representa una fila; la granularidad añade las dimensiones que hacen única esa fila. | Cambiar de noche a noche-persona cambia conteos y operaciones válidas. | Un proveedor mezcla entregas y productos; el alumno fija la unidad correcta. |
| `L5-S02` | esquema y claves | Marcar tipos, llave primaria, foránea y relaciones | “¿Con qué comprobamos que es la misma noche?” | “Con una llave documentada, no con que se parezcan.” | Un esquema define campos y tipos; las llaves identifican y relacionan entidades o eventos. | La cardinalidad esperada pertenece al contrato de la relación. | Otra tabla tiene una llave compuesta incompleta. |
| `L5-S03` | consulta orientada a pregunta | Filtrar noches cerradas y clasificar quincena con `SELECT/WHERE/CASE` | “Enséñame solo las noches que sí cuentan.” | “Cada operación responde una parte de la pregunta.” | Una consulta selecciona campos y filas para responder una pregunta declarada. | SQL válido no garantiza una pregunta ni una interpretación válidas. | Otra consulta omite el filtro de cierre. |
| `L5-S04` | agregación y grupos | Resumir ventas por etapa con `GROUP BY/HAVING` | “Dime cuántas noches sostienen ese total.” | “Conservo suma y número de noches.” | Agrupar cambia la granularidad y exige declarar funciones y denominadores. | `HAVING` filtra grupos ya agregados; no recupera filas ocultas. | Otro reporte compara totales con grupos de tamaño desigual. |
| `L5-S05` | semántica de JOIN y anti-join | Comparar `INNER`, `LEFT` y anti-join sobre cierres y turnos | “No me desaparezcas una noche nomás porque falta una hoja.” | “Marco las que coinciden y las que quedan sin pareja.” | El tipo de JOIN decide qué unidades sobreviven y cómo se representan ausencias. | Un anti-join convierte faltantes de relación en evidencia auditable. | Otra fuente pierde entregas sin turno asignado. |
| `L5-S06` | cardinalidad de JOIN | Anticipar uno-a-uno, uno-a-muchos y muchos-a-muchos | “¿Cuántas parejas puede formar cada noche?” | “Lo escribo antes de ejecutar.” | La cardinalidad describe cuántas filas de cada tabla pueden coincidir por llave. | Declararla antes del JOIN permite anticipar duplicación o pérdida. | Otra relación usa producto y fecha, no solo fecha. |
| `L5-S07` | explosión de filas | El 14 de noviembre tiene dos turnos y dos etiquetas; el JOIN produce cuatro copias del cierre | “Vendimos una noche, no cuatro.” | “La consulta corrió, pero multiplicó el cierre.” | Una explosión de filas ocurre cuando coincidencias múltiples forman combinaciones que cambian la unidad de análisis. | Reconciliar filas y unidades antes/después detecta un resultado sintácticamente válido pero analíticamente incorrecto. | El 7 y 8 de noviembre usan otros conteos; se debe elegir preagregar o cambiar la llave. |
| `L5-S08` | CTE trazable | Separar fuentes, agregaciones y unión en pasos nombrados | “Quiero ver en qué paso se infló.” | “Cada bloque deja un conteo comprobable.” | Una CTE nombra una transformación intermedia y hace visible su contrato. | Dividir pasos no corrige la lógica, pero localiza dónde verificarla. | Otra cadena es corta pero oculta un filtro. |
| `L5-S09` | funciones de ventana | Numerar turnos por noche con `PARTITION BY` y `ROW_NUMBER` | “¿Cuál registro queda primero para cada noche?” | “Ordeno dentro de cada grupo, no toda la tabla junta.” | Una función de ventana calcula sobre un grupo sin colapsar sus filas. | Partición y orden determinan el significado de `ROW_NUMBER` y `RANK`. | Otro caso resuelve empates de actualización. |
| `L5-S10` | rezagos y fecha de corte | Comparar ventas previas con `LAG` y bloquear `LEAD` al decidir inventario | “Lo de mañana no estaba en la libreta de hoy.” | “La fecha de corte separa pasado permitido y futuro prohibido.” | `LAG/LEAD` desplazan observaciones; la disponibilidad temporal decide si una variable es válida. | Una función correcta puede introducir leakage si cruza la fecha de corte. | Otro cálculo móvil incluye por error el resultado del mismo turno. |
| `L5-S11` | población y ventanas | Definir noches elegibles, fecha de observación y ventana objetivo | “¿Para cuáles noches vamos a tomar la decisión?” | “Primero fijo población y momento.” | Una tabla analítica parte de una población y una fecha de observación explícitas. | Las ventanas de features y target no pueden solaparse de forma no autorizada. | Otra población excluye cierres incompletos. |
| `L5-S12` | ABT temporal | Construir una fila por noche con información disponible antes de abrir | “Una noche, una fila, y nada de después.” | “Esa será la tabla que reciba el modelo.” | Una Analytical Base Table reúne una unidad por fila, features trazables y target definido. | La ABT materializa decisiones de granularidad; no aparece de manera natural. | Otra ABT usa cliente-mes y requiere otra granularidad. |
| `L5-S13` | deduplicación por entidad | Elegir última observación válida y agregar turnos antes del JOIN | “Quita copias solo si sabemos cuál conserva la historia.” | “Documento orden, criterio y filas descartadas.” | Deduplicar requiere entidad, orden y regla; no equivale a borrar repetidos visuales. | La última observación válida y las agregaciones deben poder reproducirse. | Otra tabla conserva dos estados igualmente válidos. |
| `L5-S14` | CSV frente a Parquet | Comparar lectura completa por filas con lectura selectiva columnar | “Si solo necesito dos columnas, ¿tengo que cargar todo?” | “Depende del formato, tamaño y herramienta.” | CSV es texto tabular interoperable; Parquet almacena columnas tipadas para lectura selectiva. | No existe una ventaja universal: importan escala, esquema, intercambio y patrón de lectura. | Otra fuente pequeña debe compartirse con una hoja de cálculo. |
| `L5-S15` | API paginada | Reunir páginas con cursor, rate limit y retry acotado | “Que no falte media lista por cerrar temprano.” | “Registro página, intento y respuesta.” | Una API paginada entrega subconjuntos; completar la extracción exige detectar fin, errores y límites. | Reintentar sin límite ni idempotencia puede duplicar o esconder fallos. | Otra API repite una página y exige deduplicar por ID. |
| `L5-S16` | DuckDB y Polars | Elegir consulta SQL local o transformación tabular según operación | “Quiero una herramienta que podamos comprobar aquí.” | “Elijo por forma del trabajo, no por moda.” | DuckDB consulta datos locales con SQL; Polars expresa transformaciones columnarmente. | La herramienta no corrige granularidad, contrato ni procedencia. | Otro caso compara exploración ad hoc y pipeline reutilizable. |
| `L5-S17` | contrato y esquema | Declarar campos, tipos, nullabilidad y evolución permitida | “Si cambia una columna, quiero que falle con claridad.” | “El contrato dice qué aceptamos antes de calcular.” | Un data contract fija interfaz, esquema y reglas verificables entre productor y consumidor. | Validar esquema detecta cambios incompatibles; no demuestra calidad semántica total. | Otra versión añade una columna opcional sin romper consumidores. |
| `L5-S18` | integridad de datos | Probar rango, unicidad, nulos e integridad referencial | “No quiero una llave que apunte a una noche que no existe.” | “Cada prueba nombra el fallo y la unidad afectada.” | Las restricciones de integridad convierten supuestos estructurales en comprobaciones. | Tests verdes cubren reglas declaradas; una regla ausente sigue siendo un riesgo. | Otro dataset pasa schema pero viola un rango operativo. |
| `L5-S19` | linaje y snapshot | Trazar fuente → transformación → ABT y fijar licencia, versión y SHA-256 | “Déjame el recibo de dónde salió cada número.” | “Fuente, paso, versión y hash quedan juntos.” | El linaje conecta cada salida con sus fuentes y transformaciones; un snapshot fija bytes reproducibles. | Procedencia y hash permiten repetir y auditar, no garantizan que el diseño sea adecuado. | Otra salida tiene el mismo nombre, pero un hash diferente. |

## Historia y tensión

El lunes 16, Don Juan ve un reporte que parece mostrar un salto extraordinario.
Paco admite que pidió a un agente una consulta para unir cierres, turnos y eventos.
La consulta es válida y se ejecuta sin avisos. El narrador guía la inspección:
una noche con dos turnos y dos etiquetas forma cuatro combinaciones. Don Juan no
culpa a Paco ni a la herramienta; exige que cada cifra vuelva a una noche real.
Durante tres tardes, antes del turno y sin descuidar la escuela, Paco convierte
esa vergüenza pequeña en un procedimiento de reconciliación y procedencia.
Evaristo aparece cuando alguien sobreinterpreta el ventilador de su laptop vieja
como “Procesamiento”. La escena se resuelve con conteos antes/después, llaves y
granularidad; Evaristo no escribe SQL ni valida el resultado.

## Estado de salida

- **Conocimiento:** Paco puede construir y auditar una tabla analítica; Don Juan conserva lenguaje y autoridad de negocio.
- **Negocio:** sin cambio; `G3-espera`, diez asientos y Mari pagada viernes/sábado.
- **Datos:** `dataset_confiable@L5.H1` queda materializado y validado como handoff del nivel completo.
- **Continuidad:** no se revelan secretos y Paco mantiene prioridad escolar.
- **Puente:** “Ahora que cada fila conserva su significado, ¿qué patrón puede aprender sin mirar el futuro?”

## Contrato de modos

- Aprender usa el cierre del 14 de noviembre con dos turnos y dos etiquetas.
- Ejercitar guiado usa el 7 de noviembre; transferencia usa el 8 de noviembre.
- Los conteos, tablas y decisiones son distintos; ninguna pregunta revela la respuesta antes de recorrer el JOIN.
- El narrador aparece únicamente como subtítulos accesibles.

## No objetivos

- Enseñar administración de servidores, optimización avanzada o cloud empresarial.
- Presentar SQL como lista de comandos.
- Administrar infraestructura de bases de datos o adelantar modelado supervisado.
- Cambiar el periodo histórico de Nivel 6 antes de completar el handoff.
