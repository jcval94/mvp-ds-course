# Codex y Claude Code Prompts

## 1. Generar un paquete educativo

```text
Lee AGENTS.md, IDEA.md, docs/PRODUCT_BRIEF.md, docs/PRD.md y
docs/CURRICULUM_MAP.md. Usa las skills de .agents/skills. Para el concepto
solicitado, define nivel, prerrequisitos y un objetivo observable; crea
ConceptSpec, LearningModule, dos PracticeExercise desde Nivel 2 y
LiveTeachingPack. Si pertenece a una ruta continua, carga Story Bible, arco y
ledger, genera episodios distintos por modo y ejecuta QA narrativa antes del
cierre. Prefiere snapshots públicos con licencia, fecha y hash; En vivo siempre
usa snapshot real como fuente principal. Valida con docs/EVAL_SUITE.md y evals/.
Corrige bloqueos antes de reportar archivos, supuestos, puntajes, riesgos y siguiente slice.
```

## 2. Expandir el temario

```text
Activa curriculum-architect. Lee docs/CURRICULUM_MAP.md y docs/PRD.md. Agrega o reorganiza conceptos sin romper la progresión. Para cada cambio declara bloque, nivel, prerrequisitos, objetivo observable, concepto anterior y siguiente, prioridad y tipo de visualización esperada. No conviertas el mapa en una lista enciclopédica. Actualiza documentos dependientes y valida con evals/curriculum_quality_checklist.md.
```

## 2A. Diseñar una ruta narrativa continua

```text
Activa course-narrative-architect. Lee IDEA.md, docs/CURRICULUM_MAP.md,
docs/COURSE_STORY_BIBLE.md y docs/CONTINUITY_LEDGER.md. Diseña el arco de
[nivel] con un objetivo principal de ciencia de datos y como máximo una
competencia auxiliar de agentes por episodio. Conserva a Don Juan y Paco como
padre e hijo; Paco estudia preparatoria y Don Juan solo habla del negocio en
lenguaje simple. El narrador introduce y concluye datos. Mantén matrices
incrementales de relaciones, secretos y crecimiento. Incorpora invitados solo
por necesidad del dominio y entrega estado previo, conflicto, evidencia,
decisión, resolución, continuityDelta, dataStateDelta, growthDelta y puente.
Bloquea voz impropia, conocimiento prematuro, secreto inferido o crecimiento sin condición.
```

## 3. Crear una ConceptSpec

```text
Activa concept-spec-designer. Crea una ConceptSpec para [concepto] dirigida a [audiencia] con nivel [nivel]. Incluye objetivo, prerrequisitos, definición, intuición, errores comunes, límites, visualSpec, interacción significativa, dataset público versionado o sintético etiquetado y criterio de dominio. Verifica que los datos y el visual permitan generar Aprender, Ejercitar y Enseñar en vivo sin reinterpretar el concepto.

Antes activa `visualization-contract-designer`: selecciona el visual por mecanismo,
emite el `VisualizationSpec` completo y falla si el `kind` no tiene renderer y prueba.

`visualSpec` debe declarar `kind`, mecanismo, estados, marcas con `evidenceId`,
secuencia, movimiento de aproximadamente 600 ms y alternativa equivalente para
`prefers-reduced-motion`.
```

## 4. Diseñar el modo Aprender

```text
Activa learning-module-designer. Usa la ConceptSpec de [concepto] y, cuando
aplique, episodio, Story Bible y ledger. Diseña una experiencia de [duración]
que active conocimiento previo, presente intuición visual, explique por etapas,
permita manipular una variable conceptual, compare escenarios, corrija un error
común y termine con checkpoint explicado. Respeta voces, asigna la precisión al
narrador, registra deltas y reserva un incidente nuevo para Ejercitar.
```

## 5. Diseñar el modo Ejercitar

```text
Activa practice-exercise-designer. Usa la ConceptSpec y el visual de [concepto].
Si existe continuidad, carga Story Bible, arco y ledger después de Aprender.
Crea un incidente nuevo con protagonista, presión realista, decisión y evidencia
animada; desde Nivel 2 añade ejercicio guiado y transferencia. Incluye respuesta
defendible, distractores derivados de errores comunes, pistas, feedback y
deltas. Comprueba que pierda sentido sin el visual y que no repita el caso de Aprender.

Cada ejercicio debe incluir `evidenceContract.requiredSteps`,
`requiredEvidenceIds` y `unlockAtStep`.
```

## 6. Preparar Enseñar en vivo

```text
Activa live-teaching-pack-builder. Usa ConceptSpec, LearningModule y PracticeExercise. Crea un LiveTeachingPack con guion, snapshot público real local, fuente, licencia, fecha, SHA-256, demostración, preguntas, evaluación, cierre, blueprint y plan offline. Codex modifica o verifica código reproducible; Gemini y ChatGPT facilitan o revisan la interpretación. Incluye verificación humana, privacidad y aviso de que el modo docente oculto no es autenticación real. No ejecutes IA desde el HTML ni descargues datos durante clase.
```

## 7. Revisar precisión técnica

```text
Activa technical-content-reviewer. Revisa unidad de análisis, variables, tipos, valores, totales, escalas, visualizaciones, métricas, supuestos y conclusiones de todos los artefactos. Detecta causalidad injustificada, leakage, errores temporales y contradicciones entre modos. Reporta severidad, evidencia, impacto y corrección. Bloquea el paquete ante cualquier error crítico.
```

## 7A. Revisar continuidad narrativa

```text
Activa narrative-continuity-reviewer. Lee Story Bible, CharacterCards, arco,
ledger previo, ConceptSpec y episodios. Ejecuta la prueba de voz ciega; verifica
conocimiento adquirido, autoridad de invitados, cronología, humor, versiones,
conteos, relación padre-hijo, estado de secretos, crecimiento y separación entre
Aprender y Ejercitar. Reporta severidad, evidencia, regla rota, impacto y
corrección raíz. Aprueba continuityDelta, dataStateDelta y growthDelta solo
cuando no haya bloqueos.
```

## 8. Ejecutar QA pedagógica

```text
Activa pedagogy-eval-reviewer. Lee docs/EVAL_SUITE.md y evals/. Puntúa alcance, progresión, exactitud, diseño conceptual, visual, práctica, feedback, preparación docente, coherencia, viabilidad y trazabilidad. Cita evidencia por puntaje. Corrige decisiones raíz y repite la evaluación hasta obtener promedio de 4 o más sin dimensiones en 1, o declara No listo.

Antes del cierre activa `interactive-visual-reviewer`: prueba la UI real,
pero primero activa `level-experience-consistency-reviewer` para comprobar
`level-shell-v1`, navegación, responsive, accesibilidad y modo docente.
verifica mecanismo, etiquetas, números, `evidenceIds`, secuencia, desbloqueo,
responsive y movimiento reducido. Un cambio de HTML no es evidencia suficiente.
```

## 9. Construir un nivel publicable

```text
Crea un nivel completo de DataClass Forge. Para cada concepto genera ConceptSpec, LearningModule, ejercicios narrativos animados y LiveTeachingPack docente con snapshot público real. Genera manifest y validation, ejecuta todos los evals y publica únicamente si el promedio es 4 o más, ninguna dimensión está en 1, En vivo está oculto por defecto y los snapshots tienen licencia y hash.
```

## 10. Evaluar preparación para código

```text
Revisa IDEA.md, docs/, .agents/skills, manifests y evals/. Confirma conteos, hashes, promedio 4 o más, ausencia de bloqueos y placeholders. Si falla, corrige documentos y paquetes. Si pasa, construye `_site/` y verifica el portal.
```

## 11. Implementar una vertical slice técnica futura

```text
Este prompt solo puede ejecutarse después de aprobación humana explícita. Lee el paquete documental validado de Histograma y construye una experiencia local autocontenida que conserve objetivo, datos, visual, interacción, práctica y feedback. Incluye cambio de bins, comparación de distribuciones y guía docente. No agregues login, backend, LMS, APIs de IA ni catálogo completo. Prueba en desktop y móvil contra los criterios del paquete.
```

## 12. Revisión de sobreingeniería

```text
Revisa todos los documentos y propuestas. Mueve a post-MVP cualquier LMS, autenticación, base de datos, pagos, seguimiento de alumnos, modelo propio, orquestación multiagente prematura o cobertura posterior al Nivel 13. Mantén la fábrica documental, una ruta de trece niveles estáticos publicados y publicación automática de resultados validados.
```

## 13. Auditar Nivel 7

```text
Verifica que train, validation y test tengan 48, 16 y 32 noches; que cross-validation use solo desarrollo; que modelo, umbral y regularización se congelen antes de test; y que FP/FN se conecten con merma y pedidos no atendidos. Recalcula MAE, MSE, RMSE, R², matriz y métricas. Bloquea cualquier contaminación del test.
```

## 14. Auditar Nivel 8

```text
Verifica estandarización, iteraciones de k-means, centroides, comparación de k, cargas y varianza de PCA, score y umbral de anomalía. Trata clusters como hipótesis y selecciona exactamente cuatro noches para revisión humana. Bloquea etiquetas de personas, fraude automático, borrado de filas o inferencia del secreto de Mari.
```

## 15. Auditar Nivel 9

```text
Verifica orden cronológico, ventanas, folds de backtesting y disponibilidad de cada campo. Rechaza cualquier dato futuro. En el experimento confirma 400 asignaciones 200/200, métrica y tamaño congelados, efecto con intervalo, guardrails, familia de pruebas y mínimo práctico. Solo la asignación aleatoria sustenta causalidad limitada al piloto.

## 16. Auditar Nivel 10

Verifica cobertura y denominadores por grupo agregado, mínimo 25 elegibles por celda, cero identificadores o texto libre y revelaciones voluntarias ausentes del CSV. Separa fairness de justicia total, anotación de causalidad y narrativa de evidencia. Exige semilla, versiones, diccionario, ejecución limpia y procedencia del mini-proyecto.

## 17. Auditar Nivel 12

Revisa que Nivel 12 diseñe sistemas de IA trazables con contexto, tools, skills, loops, harness, permisos, checkpoints y traza, sin ejecutar IA real ni adelantar monitoreo operativo.

## 18. Auditar Nivel 13

Verifica gate, baseline, autoridad humana y rollback antes de operar. Distingue data drift, performance drift y calibration drift; conserva siete etiquetas retrasadas sin inventarlas y exige tres señales persistentes antes de escalar. En incidentes revisa impacto, comprobación, postmortem sin culpa, model card, runbook, audit log y retiro. No construyas backend ni automatices decisiones.
```

## 19. Auditar Nivel 5 publicado

```text
Verifica los 19 conceptos y la historia aprobada de Sistemas de Datos Modernos y SQL. Exige renderer registrado por concepto, reconciliación de unidad y granularidad, dos prácticas con evidencia distinta y manifest `published`. Rechaza cualquier total que no derive de los 19 paquetes completos.
```

## 20. Auditar Nivel 11 publicado

```text
Verifica los 21 conceptos y la historia aprobada de Ingeniería de Productos de Datos. Ejecuta el artifact y sus tests, revisa contratos, diffs, secretos, gates y desbloqueo; exige manifest `published`. Rechaza el handoff si cualquiera de los 21 paquetes falta o adelanta monitoreo.
```
