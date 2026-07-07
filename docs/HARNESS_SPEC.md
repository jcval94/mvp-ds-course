# Harness Spec

## Responsabilidad

El harness coordina la generación documental de material educativo: recibe una solicitud, resuelve currículo y concepto, enruta skills, valida artefactos y entrega un paquete revisable. En el MVP es un protocolo auditable basado en archivos, no un servidor.

## Entrada mínima

- Concepto o resultado deseado.
- Nivel o supuesto de nivel principiante.
- Modo solicitado.
- Contexto o autorización para inferirlo.
- Duración o supuesto de 30 a 45 minutos.
- Identificador de Story Bible, arco y ledger cuando se solicita continuidad.

## Estado mínimo

- `request`: solicitud normalizada.
- `curriculumDecision`: bloque, nivel y prerrequisitos.
- `narrativeState`: Story Bible, fichas, arco, ledger de entrada y episodio.
- `levelStory`: ruta, estado, matriz de escenas y contrato de subtítulos; debe
  estar `aprobada` antes de crear el nivel.
- `conceptSpec`: fuente conceptual.
- `artifacts`: Aprender, Ejercitar y/o Enseñar en vivo.
- `modeSeparation`: evidencia de que Aprender, Ejercitar y En vivo tienen contenido distinto.
- `assumptions`: inferencias explícitas.
- `validation`: puntajes, bloqueos y correcciones.
- `continuityDelta`: cambio aprobado en hechos y conocimiento.
- `dataStateDelta`: cambio aprobado en versión y contenido del dataset narrativo.
- `growthDelta`: cambio aprobado en formato, capacidad, horario, equipo o plantilla.
- `status`: borrador, en revisión, listo o no listo.

## Flujo

1. Leer fuentes canónicas.
2. Normalizar entrada y supuestos.
3. Ejecutar `curriculum-architect`.
4. Si hay continuidad, ejecutar `course-narrative-architect` con el ledger vigente.
5. Crear `docs/stories/LEVEL_<N>.md` desde el temario y ejecutar revisión
   técnica y de continuidad hasta marcarla `aprobada`.
6. Crear o cargar `ConceptSpec` con referencia a esa historia.
7. Enrutar a las skills de modo.
8. Ejecutar revisión técnica.
9. Ejecutar `narrative-continuity-reviewer` y aprobar o rechazar los deltas.
10. Ejecutar revisión visual interactiva en navegador, incluidos subtítulos.
11. Ejecutar revisión pedagógica.
12. Si falla, corregir la decisión raíz y regenerar dependencias.
13. Emitir paquete, ledger actualizado y reporte.

## Routing

- Temario o prerrequisitos -> `curriculum-architect`.
- Ruta o episodio continuo -> `course-narrative-architect`.
- Concepto nuevo o modificado -> `concept-spec-designer`.
- Aprender -> `learning-module-designer`.
- Ejercitar -> `practice-exercise-designer`.
- Enseñar en vivo -> `live-teaching-pack-builder`.
- Cualquier paquete -> `technical-content-reviewer`.
- Cualquier episodio continuo -> `narrative-continuity-reviewer`.
- Cualquier UI educativa -> `interactive-visual-reviewer`.
- Concepto o visual nuevo -> `visualization-contract-designer` antes de ConceptSpec.
- Nivel nuevo o regenerado -> `level-experience-consistency-reviewer` antes de QA visual.
- Cierre -> `pedagogy-eval-reviewer`.

## Permisos

Permitido:

- leer y escribir Markdown del repositorio;
- leer ejemplos y demos como inspiración;
- crear datos sintéticos;
- leer snapshots públicos versionados y sus metadatos;
- ejecutar validaciones locales;
- generar prompts y blueprints no ejecutados.

Requiere aprobación:

- escribir código de producto;
- descargar o renovar datos reales;
- acceder a red o servicios externos;
- publicar material;
- modificar repositorios remotos.

## Memoria y trazabilidad

- `IDEA.md`: misión y restricciones.
- `PRODUCT_BRIEF.md`: usuario y valor.
- `PRD.md`: contratos y slice.
- `CURRICULUM_MAP.md`: progresión.
- `COURSE_STORY_BIBLE.md`: mundo, voces y arco general.
- `LEVEL_*_NARRATIVE_ARC.md`: secuencia de episodios por nivel.
- `CONTINUITY_LEDGER.md`: hechos, conocimiento, versiones de datos, relaciones,
  secretos y crecimiento.
- `SKILL_*`: responsabilidades.
- `evals/`: criterios de paso.
- `IMPLEMENTATION_PLAN.md`: secuencia.
- `CODEX_CLAUDE_PROMPTS.md`: ejecución reproducible.

Cada artefacto debe registrar su concepto, objetivo, nivel y supuestos.

## Logs

El reporte final registra:

- skills activadas;
- archivos modificados;
- supuestos;
- validaciones y puntajes;
- bloqueos encontrados y correcciones;
- riesgos restantes;
- siguiente vertical slice.

## Reintentos

Si falla una evaluación:

1. Identificar la decisión raíz.
2. Corregir currículo, `LevelStory` o `ConceptSpec`, según la primera fuente del error.
3. Regenerar artefactos dependientes.
4. Repetir revisión técnica.
5. Repetir revisión narrativa cuando aplique.
6. Repetir revisión visual, incluidos subtítulos.
7. Repetir revisión pedagógica.

Máximo recomendado: dos reintentos automáticos antes de solicitar revisión humana por ambigüedad o conflicto.

## Manejo de errores

- Falta de nivel -> asumir principiante.
- Falta de dataset para Aprender/Ejercitar -> elegir un snapshot público licenciado; si no existe, generar uno sintético reproducible y etiquetado.
- Falta de dataset para En vivo -> buscar o registrar un snapshot público real licenciado; no usar sintético como fuente principal.
- Tema demasiado amplio -> elegir el primer objetivo curricular.
- Concepto sin visual útil -> proponer comparación, simulación o predicción antes de revelar; si sigue sin aplicar, justificar.
- Contradicción entre modos -> priorizar `ConceptSpec` y regenerar.
- Ejercitar igual a Aprender -> rediseñar la práctica como historia aplicada con evidencia animada.
- Voz o conocimiento fuera de canon -> corregir el episodio o la ficha raíz; no justificarlo reescribiendo el ledger.
- Dataset narrativo inconsistente -> restaurar la última versión aprobada y declarar una transformación verificable.
- Crecimiento sin condición o secreto inferido -> restaurar el canon y rechazar el episodio.
- Metáfora forzada -> introducir un invitado o contexto compatible sin abandonar el núcleo narrativo.
- En vivo visible para estudiantes -> ocultar con modo docente y aclarar que no es autenticación real.
- Error técnico -> bloquear publicación y corregir todas las dependencias.
- Evidencia visual ausente o desbloqueo prematuro -> bloquear publicación y
  corregir el `VisualizationSpec`, renderer o contrato de evidencia.
- `kind` ausente/incompatible o shell distinto -> detener generación; no usar fallback.
  corregir `ConceptSpec`, ejercicio, renderer y QA.

## Human-in-the-loop

El humano confirma:

- audiencia y objetivo cuando cambian el alcance;
- precisión en dominios de alto impacto;
- uso de datos reales;
- licencias y renovación de snapshots;
- aceptación de la vertical slice;
- transición de documentación a código.

## Fuera del MVP

- Base de datos.
- Cola de tareas.
- Autenticación.
- Telemetría de estudiantes.
- Orquestación multiagente autónoma.
- Ejecución de LLMs o notebooks desde una app.

## Criterio de paso

El harness recomienda uso o desarrollo solo cuando:

- todos los artefactos requeridos existen;
- no hay bloqueos automáticos;
- los tres modos están separados en contenido y navegación;
- Story Bible, arco y ledger no tienen referencias rotas cuando existe continuidad;
- la historia independiente del nivel existe, está aprobada y precede al paquete;
- la revisión narrativa aprueba voces, conocimiento y deltas;
- cada intervención del narrador se representa como subtítulo accesible;
- En vivo usa snapshot público real y no aparece sin modo docente;
- el promedio es 4 o más;
- ninguna dimensión obtiene 1;
- la prueba manual es reproducible;
- la prueba de navegador verifica marcas semánticas, números, secuencia,
  desbloqueo y movimiento reducido;
- el humano aprueba la siguiente fase.
- el manifest tiene estado `published` y su `validation.json` está aprobado.

Casos obligatorios adicionales:

- Niveles 5 y 11: comprobar temario completo, historia aprobada y exactamente un
  paquete publicado por nivel; exigir 19/21 conceptos, 38/42 ejercicios, 57/63 prompts,
  renderer específico, dataset validado y contribución exacta a los totales publicados.
- Nivel 7: comprobar 48/16/32, cuatro folds restringidos a desarrollo, test
  sellado, métricas recalculables y costos FP/FN con fórmulas versionadas.
- Nivel 8: comprobar 64 noches, máximo dos servicios semanales, `k` revisable,
  PCA con cargas y varianza, y exactamente cuatro anomalías enviadas a revisión humana.
- Nivel 9: comprobar 100 fechas ordenadas, 40/60 noches por fase, cortes anteriores
  al horizonte y 400 asignaciones A/B balanceadas con métrica, tamaño, efecto,
  guardrails, multiplicidad y mínimo práctico congelados.
- Nivel 10: comprobar 48 celdas agregadas, mínimo 25 elegibles, cero identificadores
  o texto libre, denominadores válidos y revelaciones voluntarias ausentes del CSV.
- Nivel 12: comprobar 24 componentes de arquitectura y 12 trazas, stop reasons, permisos de escritura y ausencia de IA real.
- Nivel 13: comprobar 48 snapshots de referencia y 48 de monitoreo, siete etiquetas
  retrasadas sin imputar, persistencia de tres cortes, revisión humana, rollback
  verificado, ocho incidentes sin culpa individual y crecimiento `G7-local → G7-local`.
