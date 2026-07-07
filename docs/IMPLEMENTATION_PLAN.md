# Implementation Plan

## Objetivo

Mantener DataClass Forge como fábrica documental, añadir continuidad narrativa
verificable y publicar automáticamente trece niveles educativos validados dentro
de una ruta curricular de trece posiciones, sin
backend ni ejecución de IA desde el navegador.

## Gates de calidad

Cada fase debe cerrar con:

- entregable versionado;
- supuestos y riesgos actualizados;
- trazabilidad con decisiones anteriores;
- evals relevantes ejecutados;
- decisión de avanzar, corregir o bloquear.

## Fase 0: Reenfoque de la fábrica

**Entregables:** `IDEA.md`, Brief, PRD, mapa curricular y guías raíz.

**Aceptación:** usuario, problema, tres modos y no objetivos coinciden.

**Riesgo:** conservar lenguaje o flujos de la fábrica genérica.

## Fase 1: Arquitectura curricular

**Entregables:** `docs/CURRICULUM_MAP.md` y contrato de `ConceptSpec`.

**Tareas:**

- ordenar bloques y niveles;
- declarar prerrequisitos;
- mantener los diez conceptos existentes;
- agregar fundamentos, inferencia, evaluación, ética y proyectos;
- priorizar vertical slice y segunda ola.

**Aceptación:** cada concepto nuevo puede ubicarse sin inventar una progresión.

## Fase 1.5: Arquitectura narrativa

**Entregables:** Story Bible, fichas de personaje, arco de Nivel 1, ledger,
historia independiente `docs/stories/LEVEL_1.md` y templates narrativos.

**Tareas:**

- fijar a Don Juan y Paco como núcleo y las reglas para invitados;
- declarar relación padre-hijo, preparatoria de Paco, voz, autoridad técnica,
  secretos, dinámica incremental y reglas de humor;
- cuantificar tamaño inicial y crecimiento condicionado del puesto;
- mapear un arco general de trece niveles y cuatro episodios de Nivel 1;
- escribir primero la historia completa del nivel desde el temario, con 18
  escenas trazables y dos subtítulos del narrador por escena;
- versionar `pedidos_crudos`, esquema, reporte de calidad y datos preparados;
- separar incidentes de Aprender y Ejercitar;
- cerrar Nivel 1 con la pregunta que abre descripción y visualización.

**Aceptación:** un agente puede escribir el siguiente episodio sin inventar voz,
hechos, conocimiento, relaciones, secretos, datos ni tamaño del negocio.

## Fase 2: Sistema de skills

**Entregables:** Agent Spec, Skill Map, Skill Contracts y `.agents/skills/*`.

**Tareas:**

- enrutar currículo, concepto y tres modos;
- separar revisión técnica de pedagógica;
- definir propagación de cambios;
- declarar separación estricta de Aprender, Ejercitar narrativo y En vivo docente;
- crear `course-narrative-architect` y `narrative-continuity-reviewer`;
- hacer que las skills existentes consuman referencia narrativa y deltas;
- validar frontmatter y nombres.

**Aceptación:** cada skill tiene input, output, límites y criterio de fallo.

## Fase 3: Evals y harness

**Entregables:** Eval Suite, checklists, regresiones y Harness Spec.

**Tareas:**

- evaluar progresión, exactitud, visual, práctica y feedback;
- bloquear visuales decorativos y causalidad injustificada;
- bloquear práctica sin storytelling aplicado, sin animación o respondible antes de revelar evidencia;
- bloquear deriva de voz, conocimiento prematuro, dataset sin delta y episodios repetidos;
- bloquear En vivo con datos sintéticos como fuente principal o visible sin modo docente;
- definir reintentos desde la decisión raíz;
- mantener el harness basado en archivos.

**Aceptación:** una salida estructuralmente completa pero pedagógicamente débil reprueba.

## Fase 3.5: Vertical slice narrativa de Nivel 1

**Usuario:** creador de cursos para personas adultas principiantes.

**Entrada:** historia original de Don Juan y Paco, cuatro bloques de Nivel 1 y
decisiones canónicas de voz y agentes.

**Flujo:** temario predeterminado -> Story Bible -> arco -> ledger ->
`docs/stories/LEVEL_1.md` aprobada -> par Aprender/Ejercitar -> QA técnica ->
QA narrativa -> QA pedagógica.

**Salida inicial:** artefactos narrativos completos antes de modificar la aplicación HTML.

**Prueba manual:** ejecutar prueba de voz ciega, recorrer versiones del dataset y
resolver la práctica usando la evidencia.

**Definition of Done:** precisión técnica, voces consistentes, esquema y skill
verificables, promedio mínimo de 4 y ninguna dimensión en 1.

**No objetivos:** escribir los trece niveles completos o publicar la historia sin revisión humana.

## Fase 3.6: Reformulación del Nivel 1 desde la historia aprobada

**Usuario:** creador de cursos para personas adultas principiantes.

**Entrada:** temario canónico de 18 conceptos y `docs/stories/LEVEL_1.md` aprobada.

**Flujo:** historia -> ConceptSpecs y modos -> dataset narrativo -> subtítulos en
UI -> revisión técnica -> revisión narrativa -> QA visual -> evaluación pedagógica.

**Salida:** cuatro laboratorios reformulados con Don Juan y Paco, estado continuo
del dataset y narrador representado exclusivamente como subtítulos.

**Prueba manual:** reconocer las voces sin nombres, recorrer los 18 subtítulos,
comprobar los conteos y resolver cada práctica mirando evidencia nueva.

**Definition of Done:** 18 conceptos trazables, voces consistentes, subtítulos
accesibles, esquema y skill verificables, promedio mínimo de 4 y ninguna dimensión en 1.

**No objetivos:** modificar Niveles 2 y 3, cambiar el temario o expandir el puesto.

## Fase 4: Nivel 1 publicado

**Salida:** 18 conceptos, 18 ejercicios, 54 prompts y cuatro laboratorios.

**Estado:** completado y validado.

## Fase 5: Nivel 2 publicado

**Usuario:** profesor de introducción a ciencia de datos.

**Entrada:** uno de 21 conceptos de descripción y visualización.

**Flujo principal:**

1. Cargar snapshot público y metadatos.
2. Crear `ConceptSpec`, módulo, dos ejercicios narrativos animados y paquete en vivo docente.
3. Generar tres prompts con roles complementarios.
4. Ejecutar revisión técnica y pedagógica.
5. Publicar el laboratorio solo si pasa el gate.

**Salida:** 21 conceptos, 42 ejercicios, 63 prompts y cuatro laboratorios.

**Definition of Done:**

- Los snapshots tienen fuente, licencia, fecha y SHA-256.
- Cada concepto tiene dos ejercicios dependientes de evidencia.
- Cada ejercicio cuenta un caso profesional o de negocio y revela evidencia con animación antes de responder.
- Codex y Gemini/ChatGPT tienen responsabilidades distintas.
- En vivo está oculto por defecto para estudiantes, usa snapshot público real y existe plan offline.
- Promedio de 4 o más, sin dimensiones en 1.

## Fase 6: Nivel 3 publicado

**Usuario:** profesor de introducción a ciencia de datos.

**Entrada:** uno de 19 conceptos de probabilidad e inferencia.

**Flujo principal:**

1. Cargar snapshots públicos y metadatos.
2. Crear `ConceptSpec`, módulo, dos ejercicios narrativos animados y paquete en vivo docente.
3. Generar tres prompts con roles complementarios.
4. Ejecutar revisión técnica, pedagógica y de procedencia.
5. Publicar el laboratorio solo si pasa el gate.

**Salida:** 19 conceptos, 38 ejercicios, 57 prompts y cinco laboratorios.

**Definition of Done:**

- Probabilidad, variables aleatorias, muestreo, incertidumbre y pruebas de hipótesis tienen progresión completa.
- Cada ejercicio depende de evidencia revelada por animación.
- En vivo permanece oculto para estudiantes, usa snapshot público real y declara límite de privacidad.
- Promedio de 4 o más, sin dimensiones en 1.

## Fase 7: Portal y publicación

1. Validar manifests, conteos, hashes y estados.
2. Construir `_site/` desde `site/`, niveles y datasets.
3. Probar búsqueda, filtros, enlaces y responsive.
4. Ejecutar QA semántica de los 454 ejercicios, animación y movimiento reducido.
5. Publicar mediante GitHub Actions en cada push a `main`.

**Aceptación:** el catálogo muestra 236 conceptos y 454 ejercicios, y publica
ningún paquete sin validación aprobada. Cada portada y laboratorio publicado
incluye un botón visible `HOME` que regresa al portal principal, también en
viewport móvil.

## Fase 8: Cierre responsable de la ruta

Niveles 10–12 completan la ruta con análisis responsable, construcción de
producto, readiness, monitoreo, incidentes, handoff y retiro. No
se construye backend: la operación se practica con snapshots, tableros estáticos,
runbooks y simulaciones verificables.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| Mucho catálogo, poca profundidad | Dos ejercicios, revisión y gate por concepto |
| Copiar patrones de histograma | Validar mecanismo específico por concepto |
| Continuidad rígida que fuerza la taquería | Incorporar invitados con autoridad explícita |
| Eje de agentes que compite con datos | Limitarlo a una competencia auxiliar por episodio |
| Voz o datos narrativos inconsistentes | Story Bible, ledger y QA narrativa bloqueante |
| Renderer universal de barras | Enrutar por `visual.kind` y probar marcas semánticas |
| Divergencia de navegación entre niveles | Aplicar `level-shell-v1` y validar bloques laterales/conceptos superiores |

## Reconstrucción visual de niveles publicados 3–4, 6–10 y 12

- Fuente: temarios, historias y datasets canónicos ya aprobados.
- Contrato: 133 `VisualizationSpec`, registro cerrado `educational-svg-v1` y sin fallback.
- Experiencia: trece niveles publicados bajo `level-shell-v1`; Niveles 1–2 conservan sus renderers y 5/11/12/13 usan el registro educativo cerrado.
- Práctica: 266 ejercicios continuos citan series, ventanas, curvas, áreas, nodos, celdas o intervalos.
- Publicación: generación → validación → build → navegador → `main` → Pages.
| Narrativa sin evidencia | Ejercicio debe fallar sin visual |
| QA superficial | Validar `evidenceContract`, números, pasos y desbloqueo en navegador |
| Modo En vivo confundido con contenido estudiantil | UI oculta por defecto y aviso de no autenticación |
| Inconsistencia entre modos | Una `ConceptSpec` común |
| Error técnico propagado | QA técnica antes de QA pedagógica |
| Dataset remoto cambia | Snapshot fijo y SHA-256 |
| Salida de IA incorrecta | Roles acotados y verificación humana |
| Publicación de borradores | Build rechaza validaciones no aprobadas |

## Criterio de cierre documental

La fábrica está lista para producir la vertical slice cuando:

- todos los documentos canónicos coinciden;
- las skills son válidas;
- los evals detectan los casos de regresión;
- no hay placeholders;
- la rubrica documental alcanza promedio 4 o más.
