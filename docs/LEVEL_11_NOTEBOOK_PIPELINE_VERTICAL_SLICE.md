# Vertical slice Nivel 11 · Del notebook frágil al pipeline verificable

## Usuario, entrada, flujo y salida

- **Usuario:** profesor de ciencia de datos para personas adultas principiantes-intermedias.
- **Entrada:** escena `L11-S01`, notebook didáctico frágil, contrato, diff y suite de tests.
- **Flujo:** reiniciar → revelar fallos → explicitar pipeline → revisar diff → contrastar criterios/tests → aceptar o rechazar.
- **Salida:** artifact offline reproducible y decisión justificada sobre un diff.
- **Duración:** 45 minutos.
- **Estado:** implementada en validación; no publicada y no equivale a Nivel 11 completo.

## ConceptSpec

### Identidad y trazabilidad

- **ID:** `notebook-to-verifiable-pipeline`.
- **Nivel/bloque:** 11, Del notebook al proyecto.
- **Historia:** `docs/stories/LEVEL_11.md`, aprobada; `L11-S01`, `L11-E1`.
- **Ledger:** `L10.4 → proyecto_reproducible@L11.1`.
- **Anterior/siguiente:** comunicación del proyecto → ejecución reproducible.
- **Competencia auxiliar:** especificar, revisar diff, ejecutar tests y rechazar una implementación que incumple el contrato.

### Objetivo

Reconstruir un notebook con estado oculto como pipeline explícito y rechazar un
diff cuyos tests verdes no prueban un requisito observable.

### Definición, intuición y límites

- **Definición:** un pipeline verificable declara configuración, entradas, transformaciones, salida y pruebas ejecutables desde estado limpio.
- **Intuición:** reiniciar borra la memoria accidental; cada valor necesario debe entrar por configuración o input.
- **Límite:** tests reducen riesgo solo para los comportamientos que ejercitan; verde no significa contrato completo.
- **Afirmaciones prohibidas:** “Docker despliega”, “CI es CD”, “health prueba calidad” y “tests verdes garantizan corrección”.

### Errores comunes

- Ejecutar celdas en orden accidental.
- Conservar ruta o secreto en código.
- Aceptar modularidad estética sin contrato.
- Contar tests en vez de mapearlos a criterios.

### VisualizationSpec

- **Kind:** `notebook-pipeline-contract`, registrado en `educational-svg-v1`.
- **Mecanismo:** dependencias ocultas se convierten en fronteras y criterios verificables.
- **Fuente:** `pipeline-verificable-nivel-11-slice`.
- **Campos:** `caso_id`, `entrada`, `criterio`, `resultado`, `detalle`.
- **Estados:** sesión → clean run → pipeline → diff → cobertura insuficiente → test del contrato → log inseguro → log seguro.
- **Marcas:** `notebook-to-verifiable-pipeline-state-1` a `state-8`.
- **Interacción:** ejecutar limpio y auditar contrato, diff y tests.
- **Movimiento reducido:** mismos nodos, resultados, IDs y desbloqueo sin transición.
- **Caso incompatible:** un estado sin criterio o resultado debe fallar el schema visual.

### Dataset y artifact

- **Dataset narrativo:** 6 casos × 5 campos, sintético etiquetado.
- **SHA-256:** `e25b4481407e843705139bd18d903296cd7e3b7cd404ed64189a9706a87f458d`.
- **Artifact:** `examples/level11_pipeline_slice/`.
- **Contrato:** input validado → transformación pura → regla versionada → response trazable.
- **Tests:** seis `unittest`; válidos, reproducibilidad, faltante, rango, configuración y log sin secreto.
- **Privacidad:** sin identificadores, red ni credenciales reales.

### Criterio de dominio

El estudiante mapea criterios a tests, ejecuta desde cero, identifica un requisito
no cubierto y rechaza un diff aunque sea elegante y la suite original esté verde.

## LearningModule · Aprender

- **Necesidad:** la demo funciona para Paco, pero Chava no puede ejecutarla.
- **Subtítulo inicial:** “Un notebook exploratorio puede depender de estado oculto; producción exige entradas y orden explícitos.”

### Progresión

1. Mostrar variable global, ruta local y token ficticio ya cargados.
2. Ejecutar `Run All` limpio y revelar `NameError`/archivo ausente.
3. Reorganizar como config → validate → transform → predict → response.
4. Ejecutar seis tests y confirmar cero secretos reales.

- **Checkpoint:** “¿Qué cambió además de mover código?” Respuesta: entradas, orden, errores, configuración y criterios se volvieron explícitos.
- **Subtítulo final:** “Si una ejecución limpia falla, la demo no es todavía un producto reproducible.”
- **Deltas:** `continuityDelta` aprobado; `dataStateDelta=L10.4→L11.1`; `growthDelta=ninguno`.

## PracticeExercise · Ejercitar

### Guiado: diff elegante, contrato incompleto

- **Historia:** el agente modulariza y entrega tres tests verdes.
- **Presión:** la entrada vacía debe fallar de forma visible.
- **Evidencia:** estados 4–6; ningún test inicial cubre input vacío y el nuevo caso falla.
- **EvidenceContract:** 6 pasos; IDs `state-4`, `state-5`, `state-6`; desbloqueo al paso 6.
- **Respuesta:** rechazar hasta que implementación y tests cubran el requisito.
- **Distractores:** aceptar por elegancia/verde; añadir comentarios sin probar.
- **Feedback:** cita el criterio incumplido y diferencia estilo de comportamiento.

### Transferencia: servicio funcional, log inseguro

- **Historia:** otro artifact responde correctamente pero registra `TOKEN_DEMO`.
- **Evidencia:** estados 7–8; el log seguro conserva request_id y versión.
- **EvidenceContract:** 8 pasos; IDs `state-7`, `state-8`; desbloqueo al paso 8.
- **Respuesta:** redactar secretos y mantener trazabilidad no sensible.
- **Distractores:** conservar token para reproducir; eliminar todos los logs.

## LiveTeachingPack · Enseñar en vivo

- **Snapshot principal:** Wine Quality · UCI, 6,497 filas × 13 columnas.
- **Fuente/licencia:** UCI, CC BY 4.0; Cortez et al. (2009).
- **Fecha/hash:** 2026-06-14; `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Relación:** el docente ejecuta validación de schema y una transformación reproducible sobre el snapshot; los fallos de sesión son fixtures sintéticas de apoyo.
- **Visibilidad:** oculta salvo `?teacher=1`; no es autenticación.

| Minutos | Docente | Estudiante | Insight |
| ---: | --- | --- | --- |
| 0–6 | Presenta fuente, licencia, hash y artifact | Verifica archivos | Datos y código tienen versiones |
| 6–14 | Ejecuta fixture frágil desde cero | Predice fallo | La sesión ocultaba dependencias |
| 14–24 | Recorre pipeline y tests | Mapea criterios | Test y requisito no son sinónimos |
| 24–34 | Muestra diff con input inválido omitido | Acepta/rechaza | Verde puede ser insuficiente |
| 34–42 | Corrige test y log | Ejecuta suite | Fallo visible y secreto ausente |
| 42–45 | Cierre rápido | Transfiere regla | Producto = contrato + artifact + evidencia |

- **Demo:** comandos locales del README; sin FastAPI ni red para esta slice.
- **Preguntas:** “¿qué dependía de la sesión?”, “¿qué criterio no tiene test?”, “¿qué dato necesita el log?”.
- **Evaluación:** escribir un criterio y el caso de fallo mínimo que lo prueba.
- **Codex:** implementar únicamente el criterio especificado, listar archivos, mostrar diff y ejecutar tests; rechazar secretos y ampliación de alcance.
- **Gemini:** facilitar revisión socrática de criterios frente a tests.
- **ChatGPT:** auditar si tests y conclusiones cubren el contrato real.
- **Verificación humana:** ejecutar seis tests, revisar diff y buscar secretos/rutas locales.
- **Plan offline:** Python estándar, snapshot y salidas impresas.

## Prueba manual y Definition of Done

1. Ejecutar desde cero: seis tests deben pasar.
2. Confirmar ocho estados, renderer exacto y `evidenceIds`.
3. Verificar bloqueo antes de pasos 6 y 8.
4. Repetir con movimiento reducido.
5. Confirmar que el modo docente no aparece sin `?teacher=1`.
6. Puntuar evals con promedio ≥4 y ninguna dimensión en 1.

## No objetivos

- Completar o publicar Nivel 11.
- Desplegar un servicio real o usar secretos.
- Convertir la slice en curso general de software.
- Enseñar drift, alertas, incidentes o retiro.
