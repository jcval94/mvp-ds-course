# Vertical slice Nivel 5 · Explosión de filas en un JOIN

## Usuario, entrada, flujo y salida

- **Usuario:** profesor de ciencia de datos para personas adultas principiantes.
- **Entrada:** escena `L5-S07`, tres tablas sintéticas con granularidades distintas y snapshot público Bike Sharing para En vivo.
- **Flujo:** predecir cardinalidad → ejecutar JOIN → contar filas/noches → reconciliar suma → corregir mediante preagregación.
- **Salida:** explicación defendible y query aceptada o rechazada por unidad, cardinalidad y conteos.
- **Duración:** 40 minutos.
- **Estado:** implementada en validación; no publicada y no equivale a Nivel 5 completo.
- **Supuesto:** el alumnado reconoce filas, columnas, tablas y relaciones del Nivel 4.

## ConceptSpec

### Identidad y trazabilidad

- **ID:** `join-row-explosion`.
- **Nivel/bloque:** 5, Relaciones y JOINs.
- **Currículo:** `docs/CURRICULUM_MAP.md#nivel-5-sistemas-de-datos-modernos-y-sql`.
- **Historia:** `docs/stories/LEVEL_5.md`, aprobada; escena `L5-S07`, episodio `L5-E3`.
- **Ledger:** `L4.4 → joins_auditados@L5.3`.
- **Anterior/siguiente:** cardinalidad de JOIN → CTE trazable.
- **Competencia auxiliar:** auditar una query generada revisando tablas, llaves, cardinalidad, granularidad, conteos y procedencia.

### Objetivo

Detectar y corregir un JOIN many-to-many que cambia la unidad y duplica una
medida, citando filas resultantes, unidades únicas y suma reconciliada.

### Definición, intuición y límites

- **Definición:** una explosión de filas ocurre cuando coincidencias múltiples forman combinaciones que cambian la unidad de análisis.
- **Intuición:** por una llave compartida, cada coincidencia izquierda se combina con cada coincidencia derecha; 2 × 2 produce cuatro filas aunque exista una noche.
- **Límite:** más filas pueden ser correctas para una unidad nueva; el error aparece al interpretarlas como si conservaran la unidad original.
- **Afirmaciones prohibidas:** “INNER evita duplicados”, “más filas son más información”, “SQL ejecutado es análisis correcto” y “el reporte prueba crecimiento”.

### Errores comunes

- Sumar una medida de la tabla base después de duplicarla.
- Revisar solo nulos o errores de sintaxis.
- Borrar filas hasta obtener el total esperado sin regla.
- Cambiar tipo de JOIN sin declarar cardinalidad.

### VisualizationSpec

- **Kind:** `join-row-explosion`, registrado en `educational-svg-v1`.
- **Mecanismo:** combinación cartesiana dentro de la llave y reconciliación de conteos.
- **Fuente:** `join-explosion-nivel-5-slice`.
- **Campos:** `fecha`, `ventas_mxn`, `turno_id`, `evento_id`.
- **Encodings:** columnas para fuentes; enlaces/pares para coincidencias; texto para filas, noches únicas y suma.
- **Estados:** fuentes 14 → JOIN 14 → corrección 14 → fuentes/JOIN 7 → fuentes/JOIN 8.
- **Marcas:** `join-row-explosion-state-1` a `state-7`.
- **Interacción:** revelar pares y reconciliar conteos.
- **Resumen accesible:** dos turnos por dos eventos crean cuatro filas y repiten el cierre; preagregar restaura una fila por noche.
- **Movimiento:** pares aparecen desde ambas tablas en 560 ms; la identidad de cada cierre permanece.
- **Movimiento reducido:** estados finales inmediatos con los mismos valores, IDs y desbloqueo.
- **Caso incompatible:** si no hay llave ni cardinalidad declarada, el renderer debe rechazar los datos.

### Dataset narrativo

| Archivo | Unidad | Dimensiones | SHA-256 |
| --- | --- | ---: | --- |
| `cierres_nivel_5_slice.csv` | noche | 6 × 3 | `be0a7cde0704ea6657d3f1892a4accee4b8d2a4698d8e96c1164c3b170efd91f` |
| `turnos_nivel_5_slice.csv` | turno-noche | 8 × 3 | `d4b1b0748b21d6740747ac649aef5907d5ec82dbeb72af61f83fac41722522c3` |
| `eventos_nivel_5_slice.csv` | etiqueta-noche | 8 × 3 | `c734b2c8e0778193fec2dcd781fbc93b6608b412a8a81b05d834a93c9d66472b` |

Datos sintéticos etiquetados, sin personas ni atributos sensibles. La llave es
`fecha`; unir turnos con eventos por fecha produce relación muchos-a-muchos.

### Criterio de dominio

Ante otra pareja de tablas, el estudiante predice cardinalidad, cuenta unidades
antes/después, localiza una medida repetida y propone preagregar o ampliar la
llave sin borrar filas arbitrariamente.

## LearningModule · Aprender

- **Entrada narrativa:** el reporte del 14 de noviembre suma $19,200 aunque el cierre fue $4,800.
- **Activación:** predecir cuántas filas resultan de 2 turnos × 2 eventos.
- **Subtítulo inicial:** “Una explosión de filas ocurre cuando coincidencias múltiples cambian la unidad de análisis.”

### Progresión

1. Mostrar una fila de cierre, dos turnos y dos eventos.
2. Revelar los cuatro pares producidos por `fecha`.
3. Comparar 4 filas con 1 noche única y rastrear $4,800 en cada par.
4. Preagregar turnos/eventos por noche y repetir el JOIN.
5. Confirmar una fila, una noche y $4,800.

- **Error corregido:** que la query corra no preserva el grain.
- **Checkpoint:** “¿Qué tres conteos revisarías?” Respuesta: filas, llaves únicas de la unidad y suma/medida reconciliada.
- **Subtítulo final:** “Reconciliar filas y unidades antes y después detecta un JOIN válido pero analíticamente incorrecto.”
- **Deltas:** `continuityDelta` aprobado; `dataStateDelta=L5.2→L5.3`; `growthDelta=ninguno`.
- **Incidente reservado:** el 7 de noviembre, con un turno y dos eventos.

## PracticeExercise · Ejercitar

### Guiado

- **Historia:** la compra de insumos usa el 7 de noviembre; el JOIN devuelve dos filas y $7,200.
- **Decisión:** aceptar, corregir o rechazar la query.
- **Evidencia:** estados 4–5; un cierre de $3,600, una noche única y dos pares.
- **EvidenceContract:** 5 pasos; IDs `state-4` y `state-5`; desbloqueo al paso 5.
- **Respuesta:** preagregar eventos o reconciliar por noche; $7,200 repite dos veces el cierre de $3,600.
- **Distractores:** aceptar por tener dos filas válidas; borrar una fila al azar.
- **Feedback:** nombra dos pares, una noche y el monto repetido; cada distractor recibe corrección específica.

### Transferencia

- **Historia:** el 8 de noviembre cambia a dos turnos y un evento.
- **Evidencia:** estados 6–7; dos filas, una noche y $7,800 frente a cierre de $3,900.
- **Pregunta:** qué demuestra cambiar el lado con duplicados.
- **Respuesta:** la explosión persiste; la cardinalidad debe auditarse antes.
- **Distractores:** llamar noches a los turnos; asumir que `INNER JOIN` garantiza unicidad.
- **EvidenceContract:** 7 pasos; IDs `state-6` y `state-7`; desbloqueo al paso 7.

## LiveTeachingPack · Enseñar en vivo

- **Snapshot principal:** Bike Sharing Dataset · UCI, 731 días × 16 columnas.
- **Fuente/licencia:** UCI, CC BY 4.0; Fanaee-T (2013).
- **Fecha/hash:** 2026-06-14; `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Relación:** el snapshot aporta una fila real por día; en clase se derivan dimensiones de calendario únicas y una fixture duplicada etiquetada para demostrar el fallo. La fixture no sustituye al snapshot público.
- **Visibilidad:** oculta salvo `?teacher=1`; no es autenticación.

| Minutos | Docente | Estudiante | Visual/insight |
| ---: | --- | --- | --- |
| 0–5 | Presenta fuente, licencia, hash y unidad día | Verifica encabezado | El grain precede al JOIN |
| 5–10 | Deriva calendario único | Predice cardinalidad | 1:1 conserva días |
| 10–20 | Introduce una duplicación didáctica etiquetada | Predice filas y suma | La query sigue siendo válida |
| 20–28 | Reconciliación y corrección | Cita conteos | Filas y unidades no son sinónimos |
| 28–35 | Caso nuevo y evaluación rápida | Decide aceptar/rechazar | Evidencia antes de decisión |

- **Demo offline:** script/HTML local; sin red ni IA.
- **Preguntas:** “¿qué representa una fila?”, “¿cuántas parejas puede formar cada llave?”, “¿qué medida se repite?”.
- **Evaluación rápida:** auditar una relación con 1×3 coincidencias y justificar la corrección.
- **Codex:** generar una query de auditoría que reporte filas, llaves únicas y suma antes/después; incluir aserciones y no alterar el snapshot.
- **Gemini:** facilitar predicciones sin revelar el conteo y pedir evidencia contraria.
- **ChatGPT:** revisar si la explicación confunde sintaxis, cardinalidad o causalidad.
- **Verificación humana:** recalcular 2×2=4 y comprobar hash/licencia.
- **Privacidad:** no introducir identificadores de usuarios del sistema de bicicletas.
- **Plan offline:** snapshot, HTML y tarjetas impresas con tablas.

## Prueba manual y Definition of Done

1. Confirmar renderer exacto, siete estados, valores y `evidenceIds`.
2. Intentar responder antes de los estados 5 y 7; debe permanecer bloqueado.
3. Repetir con movimiento reducido y obtener la misma evidencia.
4. Verificar que Aprender, guiado y transferencia usan fechas distintas.
5. Verificar los tres hashes narrativos y el hash público.
6. Puntuar evals con promedio ≥4 y ninguna dimensión en 1.

## No objetivos

- Completar o publicar Nivel 5.
- Enseñar optimización SQL, servidores o índices.
- Usar datos personales o afirmar crecimiento.
- Regenerar Nivel 6 antes del handoff completo.
