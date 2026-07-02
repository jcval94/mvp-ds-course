# Skill Contracts

## Contrato universal

Toda skill debe:

- tener activador observable;
- leer inputs nombrados;
- producir un artefacto verificable;
- declarar supuestos y límites;
- incluir criterios de aceptación y rechazo;
- mantener un objetivo principal;
- preservar precisión técnica;
- separar MVP de post-MVP;
- escribir en español claro.
- cuando opere sobre una ruta narrativa, leer Story Bible, arco y ledger, y
  registrar deltas sin reescribir silenciosamente el canon.

## `curriculum-architect`

**Propósito:** ubicar conceptos dentro de una progresión y evitar saltos de prerrequisitos.

**Inputs:** `docs/CURRICULUM_MAP.md`, audiencia, nivel, objetivo solicitado y duración.

**Output:** bloque, nivel, prerrequisitos, objetivo priorizado, conceptos
anterior/siguiente, competencia auxiliar de agentes y alcance recomendado.

**No debe hacer:** convertir una lección en curso completo ni incluir formalismo no necesario.

**Aceptación:** el objetivo es observable y puede enseñarse con los prerrequisitos disponibles.

**Rechazo:** mezcla más de un objetivo central o requiere conceptos no declarados.

## `course-narrative-architect`

**Propósito:** convertir la progresión curricular en una historia continua sin
alterar los objetivos de ciencia de datos.

**Inputs:** `CourseStoryBible`, `CURRICULUM_MAP.md`, nivel, `ContinuityLedger`
previo, conceptos y competencia auxiliar de agentes.

**Output:** `LevelNarrativeArc` y `LevelStory` independiente con episodios y
escenas ordenados, conflicto, personajes, objetivo, evidencia, incidentes
distintos de práctica, dos subtítulos del narrador por escena, matriz incremental
de relaciones, estado de datos y crecimiento, resolución, `continuityDelta`,
`dataStateDelta`, `growthDelta` y puente.

**No debe hacer:** forzar la taquería cuando el dominio necesita un invitado,
enseñar dos objetivos principales, atribuir cualquier término o conclusión de
datos a Don Juan, olvidar que Paco estudia preparatoria, adelantar conocimiento,
revelar un secreto antes de tiempo o resolver Ejercitar dentro de Aprender.

**Aceptación:** la historia está separada de la implementación y puede marcarse
`aprobada`; todos los conceptos aparecen una vez, los subtítulos contienen las
conclusiones técnicas y otra skill puede generar cada modo sin inventar voz,
hechos, datos ni transiciones.

**Rechazo:** faltan estado previo, dueño de la explicación técnica, delta del
dataset o gancho siguiente; el arco contradice el currículo o una ficha.

## `concept-spec-designer`

**Propósito:** crear la fuente de verdad conceptual compartida por todos los modos.

**Inputs:** salida curricular, contexto, nivel, restricciones y, cuando aplique,
referencia al episodio y estado canónico del dataset.

**Output:** `ConceptSpec` con definición, intuición, errores, `visualSpec`,
dataset, procedencia/licencia cuando aplica, dominio, límites, referencia
narrativa y competencia auxiliar de agentes.

`visualSpec` debe declarar `kind`, mecanismo, estados, marcas con `evidenceId`,
secuencia, intención de movimiento y alternativa de movimiento reducido.

**No debe hacer:** inventar hechos, usar una analogía que contradiga el concepto o aprobar un visual decorativo.

**Aceptación:** otra skill puede generar los tres modos sin reinterpretar el concepto.

**Rechazo:** falta objetivo, prerrequisito, error común, visual o criterio de dominio.

## `learning-module-designer`

**Propósito:** producir una explicación visual progresiva.

**Inputs:** `ConceptSpec`, duración, restricciones docentes y episodio narrativo
cuando exista.

**Output:** `LearningModule` con activación previa, intuición, etapas,
interacción, error común, checkpoint, cierre y `continuityDelta`, sin resolver
el caso narrativo de Ejercitar.

**No debe hacer:** comenzar con una pared de fórmulas ni duplicar una definición en varias secciones.

**Aceptación:** el estudiante puede explicar el mecanismo central y superar el checkpoint usando el módulo.

**Rechazo:** la interacción no cambia nada significativo o el checkpoint puede contestarse por pistas de redacción.

## `practice-exercise-designer`

**Propósito:** generar una práctica donde la evidencia visual sea necesaria.

**Inputs:** `ConceptSpec`, contexto, visual, dificultad, Story Bible y estado de
continuidad cuando pertenezca a una ruta.

**Output:** `PracticeExercise` guiado y de transferencia desde Nivel 2, con rol,
protagonista, historia, presión realista, decisión, escenas animadas, evidencia,
preguntas, opciones, pistas, feedback, conclusión y `evidenceContract`.
El ejercicio registra además `continuityDelta` y `dataStateDelta` cuando aplica.

**No debe hacer:** premiar adivinanza, usar distractores absurdos ni pedir una decisión no sustentada.

**Aceptación:** existe una respuesta defendible, la animación revela evidencia antes de responder, los distractores corresponden a errores plausibles y cada feedback corrige razonamiento.

**Rechazo:** el ejercicio puede resolverse sin mirar la evidencia, la historia
permite adivinar la respuesta, repite el incidente de Aprender, rompe una voz,
adelanta conocimiento, la animación solo cambia estilo o la conclusión excede los datos.

## `narrative-continuity-reviewer`

**Propósito:** comprobar que un episodio respete mundo, voces, cronología,
conocimiento acumulado, datos y separación de modos.

**Inputs:** Story Bible, `CharacterCard`, arco, ledger previo, `ConceptSpec`,
episodios Aprender/Ejercitar y deltas propuestos.

**Output:** hallazgos con severidad, evidencia, regla rota, impacto y corrección;
ledger actualizado solo cuando no existen bloqueos.

**No debe hacer:** reescribir hechos para justificar una inconsistencia, aprobar
por tono atractivo ni sustituir la revisión técnica.

**Aceptación:** los diálogos son atribuibles sin nombre, la relación padre-hijo
es visible, cada concepto usado fue adquirido, secretos y crecimiento respetan
su estado, los conteos coinciden y los dos modos usan problemas distintos.

**Rechazo:** Don Juan usa o concluye ciencia de datos, Paco deja de sonar como
hijo/estudiante, un invitado excede su profesión, cambia dataset o puesto sin
delta, un secreto se infiere desde datos o el humor degrada la evidencia.

## `interactive-visual-reviewer`

**Propósito:** comprobar en navegador que cada visual hace visible el mecanismo
declarado y que la interacción controla correctamente la evidencia.

**Inputs:** `ConceptSpec`, `PracticeExercise`, renderer, datos y URL local.

**Output:** hallazgos con severidad, concepto, estado, `evidenceId`, captura o
estado DOM, impacto pedagógico y corrección.

**No debe hacer:** aprobar por cambio de color, diferencia de HTML, presencia de
SVG o animación fluida sin significado.

**Aceptación:** las marcas requeridas existen, los números coinciden con los
datos, el movimiento revela el mecanismo, el desbloqueo ocurre en el paso
declarado y `prefers-reduced-motion` conserva la evidencia.

**Rechazo:** renderer genérico inadecuado, evidencia ausente, desbloqueo
prematuro, solapamiento que oculta etiquetas, error de escala o animación
decorativa.

## `live-teaching-pack-builder`

**Propósito:** preparar una clase reproducible y operable por un docente.

**Inputs:** `ConceptSpec`, `LearningModule`, `PracticeExercise`, duración y formato técnico preferido.

**Output:** `LiveTeachingPack` con guion, snapshot público real, demo, preguntas,
evaluación, blueprint, prompt técnico para Codex, prompts de facilitación para
Gemini y ChatGPT, verificación humana, privacidad, plan offline y checklists.

**No debe hacer:** depender de ejecutar IA, descargar datos externos durante clase, usar datos sintéticos como fuente principal, mostrarse como pestaña estudiantil visible o dejar al docente completar secciones.

**Aceptación:** otro docente puede impartir la sesión con ajustes menores, verificar fuente/licencia/hash y ejecutar el plan offline.

**Rechazo:** no hay tiempos, snapshot real reproducible, aviso de privacidad/ocultamiento, cierre o contingencia.

## `technical-content-reviewer`

**Propósito:** verificar exactitud conceptual, numérica y estadística.

**Inputs:** `ConceptSpec`, artefactos generados y ledger/versiones cuando exista narrativa.

**Output:** lista de hallazgos con severidad, evidencia, impacto y corrección aplicada o requerida.

**No debe hacer:** aprobar por estilo ni corregir números aislados sin revisar sus dependencias.

**Aceptación:** unidad de análisis, variables, datos, visuales, métricas,
afirmaciones del narrador, versiones y conclusiones son consistentes.

**Rechazo:** hay afirmaciones falsas, escalas engañosas, leakage, causalidad injustificada o métricas mal interpretadas.

## `pedagogy-eval-reviewer`

**Propósito:** cerrar el ciclo con evaluación pedagógica y documental.

**Inputs:** paquete completo, `docs/EVAL_SUITE.md`, `evals/` y revisión narrativa
cuando exista continuidad.

**Output:** puntaje por dimensión, bloqueos, correcciones y decisión `Listo`, `Listo con ajustes menores` o `No listo`.

**No debe hacer:** aprobar solo porque todas las secciones existen.

**Aceptación:** promedio de 4 o más, ninguna dimensión en 1 y prueba manual ejecutable.

**Rechazo:** falta trazabilidad, dependencia de evidencia, feedback útil o coherencia entre modos.

## Contrato de propagación

Si cambia una decisión raíz:

1. Actualizar currículo si cambió nivel, orden o resultado.
2. Actualizar `LevelStory` si cambió escena, voz, subtítulo, hecho o evidencia.
3. Actualizar `ConceptSpec`.
4. Revisar los tres modos.
5. Revisar datos y visualizaciones.
6. Revisar arco y ledger si cambia voz, hecho, conocimiento o estado de datos.
7. Reejecutar QA técnica.
8. Reejecutar QA narrativa.
9. Reejecutar QA visual interactiva.
10. Reejecutar QA pedagógica.

No se permite corregir únicamente el documento donde apareció el síntoma.
