# Harness Spec

## Responsabilidad

El harness coordina la generación documental de material educativo: recibe una solicitud, resuelve currículo y concepto, enruta skills, valida artefactos y entrega un paquete revisable. En el MVP es un protocolo auditable basado en archivos, no un servidor.

## Entrada mínima

- Concepto o resultado deseado.
- Nivel o supuesto de nivel principiante.
- Modo solicitado.
- Contexto o autorización para inferirlo.
- Duración o supuesto de 30 a 45 minutos.

## Estado mínimo

- `request`: solicitud normalizada.
- `curriculumDecision`: bloque, nivel y prerrequisitos.
- `conceptSpec`: fuente conceptual.
- `artifacts`: Aprender, Ejercitar y/o Enseñar en vivo.
- `modeSeparation`: evidencia de que Aprender, Ejercitar y En vivo tienen contenido distinto.
- `assumptions`: inferencias explícitas.
- `validation`: puntajes, bloqueos y correcciones.
- `status`: borrador, en revisión, listo o no listo.

## Flujo

1. Leer fuentes canónicas.
2. Normalizar entrada y supuestos.
3. Ejecutar `curriculum-architect`.
4. Crear o cargar `ConceptSpec`.
5. Enrutar a las skills de modo.
6. Ejecutar revisión técnica.
7. Ejecutar revisión visual interactiva en navegador.
8. Ejecutar revisión pedagógica.
9. Si falla, corregir la decisión raíz y regenerar dependencias.
10. Emitir paquete y reporte.

## Routing

- Temario o prerrequisitos -> `curriculum-architect`.
- Concepto nuevo o modificado -> `concept-spec-designer`.
- Aprender -> `learning-module-designer`.
- Ejercitar -> `practice-exercise-designer`.
- Enseñar en vivo -> `live-teaching-pack-builder`.
- Cualquier paquete -> `technical-content-reviewer`.
- Cualquier UI educativa -> `interactive-visual-reviewer`.
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
2. Corregir currículo o `ConceptSpec`.
3. Regenerar artefactos dependientes.
4. Repetir revisión técnica.
5. Repetir revisión pedagógica.

Máximo recomendado: dos reintentos automáticos antes de solicitar revisión humana por ambigüedad o conflicto.

## Manejo de errores

- Falta de nivel -> asumir principiante.
- Falta de dataset para Aprender/Ejercitar -> elegir un snapshot público licenciado; si no existe, generar uno sintético reproducible y etiquetado.
- Falta de dataset para En vivo -> buscar o registrar un snapshot público real licenciado; no usar sintético como fuente principal.
- Tema demasiado amplio -> elegir el primer objetivo curricular.
- Concepto sin visual útil -> proponer comparación, simulación o predicción antes de revelar; si sigue sin aplicar, justificar.
- Contradicción entre modos -> priorizar `ConceptSpec` y regenerar.
- Ejercitar igual a Aprender -> rediseñar la práctica como historia aplicada con evidencia animada.
- En vivo visible para estudiantes -> ocultar con modo docente y aclarar que no es autenticación real.
- Error técnico -> bloquear publicación y corregir todas las dependencias.
- Evidencia visual ausente o desbloqueo prematuro -> bloquear publicación y
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
- En vivo usa snapshot público real y no aparece sin modo docente;
- el promedio es 4 o más;
- ninguna dimensión obtiene 1;
- la prueba manual es reproducible;
- la prueba de navegador verifica marcas semánticas, números, secuencia,
  desbloqueo y movimiento reducido;
- el humano aprueba la siguiente fase.
- el manifest tiene estado `published` y su `validation.json` está aprobado.
