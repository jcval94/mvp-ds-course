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

## `curriculum-architect`

**Propósito:** ubicar conceptos dentro de una progresión y evitar saltos de prerrequisitos.

**Inputs:** `docs/CURRICULUM_MAP.md`, audiencia, nivel, objetivo solicitado y duración.

**Output:** bloque, nivel, prerrequisitos, objetivo priorizado, conceptos anterior/siguiente y alcance recomendado.

**No debe hacer:** convertir una lección en curso completo ni incluir formalismo no necesario.

**Aceptación:** el objetivo es observable y puede enseñarse con los prerrequisitos disponibles.

**Rechazo:** mezcla más de un objetivo central o requiere conceptos no declarados.

## `concept-spec-designer`

**Propósito:** crear la fuente de verdad conceptual compartida por todos los modos.

**Inputs:** salida curricular, contexto, nivel y restricciones.

**Output:** `ConceptSpec` con definición, intuición, errores, `visualSpec`,
dataset, procedencia/licencia cuando aplica, dominio y límites.

`visualSpec` debe declarar `kind`, mecanismo, estados, marcas con `evidenceId`,
secuencia, intención de movimiento y alternativa de movimiento reducido.

**No debe hacer:** inventar hechos, usar una analogía que contradiga el concepto o aprobar un visual decorativo.

**Aceptación:** otra skill puede generar los tres modos sin reinterpretar el concepto.

**Rechazo:** falta objetivo, prerrequisito, error común, visual o criterio de dominio.

## `learning-module-designer`

**Propósito:** producir una explicación visual progresiva.

**Inputs:** `ConceptSpec`, duración y restricciones docentes.

**Output:** `LearningModule` con activación previa, intuición, etapas, interacción, error común, checkpoint y cierre, sin resolver el caso narrativo de Ejercitar.

**No debe hacer:** comenzar con una pared de fórmulas ni duplicar una definición en varias secciones.

**Aceptación:** el estudiante puede explicar el mecanismo central y superar el checkpoint usando el módulo.

**Rechazo:** la interacción no cambia nada significativo o el checkpoint puede contestarse por pistas de redacción.

## `practice-exercise-designer`

**Propósito:** generar una práctica donde la evidencia visual sea necesaria.

**Inputs:** `ConceptSpec`, contexto, visual y dificultad.

**Output:** `PracticeExercise` guiado y de transferencia desde Nivel 2, con rol,
protagonista, historia, presión realista, decisión, escenas animadas, evidencia,
preguntas, opciones, pistas, feedback, conclusión y `evidenceContract`.

**No debe hacer:** premiar adivinanza, usar distractores absurdos ni pedir una decisión no sustentada.

**Aceptación:** existe una respuesta defendible, la animación revela evidencia antes de responder, los distractores corresponden a errores plausibles y cada feedback corrige razonamiento.

**Rechazo:** el ejercicio puede resolverse sin mirar la evidencia, la historia permite adivinar la respuesta, la animación solo cambia estilo o la conclusión excede los datos.

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

**Inputs:** `ConceptSpec` y artefactos generados.

**Output:** lista de hallazgos con severidad, evidencia, impacto y corrección aplicada o requerida.

**No debe hacer:** aprobar por estilo ni corregir números aislados sin revisar sus dependencias.

**Aceptación:** unidad de análisis, variables, datos, visuales, métricas y conclusiones son consistentes.

**Rechazo:** hay afirmaciones falsas, escalas engañosas, leakage, causalidad injustificada o métricas mal interpretadas.

## `pedagogy-eval-reviewer`

**Propósito:** cerrar el ciclo con evaluación pedagógica y documental.

**Inputs:** paquete completo, `docs/EVAL_SUITE.md` y `evals/`.

**Output:** puntaje por dimensión, bloqueos, correcciones y decisión `Listo`, `Listo con ajustes menores` o `No listo`.

**No debe hacer:** aprobar solo porque todas las secciones existen.

**Aceptación:** promedio de 4 o más, ninguna dimensión en 1 y prueba manual ejecutable.

**Rechazo:** falta trazabilidad, dependencia de evidencia, feedback útil o coherencia entre modos.

## Contrato de propagación

Si cambia una decisión raíz:

1. Actualizar `ConceptSpec`.
2. Revisar los tres modos.
3. Revisar datos y visualizaciones.
4. Reejecutar QA técnica.
5. Reejecutar QA visual interactiva.
6. Reejecutar QA pedagógica.

No se permite corregir únicamente el documento donde apareció el síntoma.
