# Implementation Plan

## Objetivo

Mantener DataClass Forge como fábrica documental y publicar automáticamente
tres niveles educativos validados, sin backend ni ejecución de IA desde el navegador.

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

## Fase 2: Sistema de skills

**Entregables:** Agent Spec, Skill Map, Skill Contracts y `.agents/skills/*`.

**Tareas:**

- enrutar currículo, concepto y tres modos;
- separar revisión técnica de pedagógica;
- definir propagación de cambios;
- declarar separación estricta de Aprender, Ejercitar narrativo y En vivo docente;
- validar frontmatter y nombres.

**Aceptación:** cada skill tiene input, output, límites y criterio de fallo.

## Fase 3: Evals y harness

**Entregables:** Eval Suite, checklists, regresiones y Harness Spec.

**Tareas:**

- evaluar progresión, exactitud, visual, práctica y feedback;
- bloquear visuales decorativos y causalidad injustificada;
- bloquear práctica sin storytelling aplicado, sin animación o respondible antes de revelar evidencia;
- bloquear En vivo con datos sintéticos como fuente principal o visible sin modo docente;
- definir reintentos desde la decisión raíz;
- mantener el harness basado en archivos.

**Aceptación:** una salida estructuralmente completa pero pedagógicamente débil reprueba.

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
4. Ejecutar QA semántica de los 98 ejercicios, animación y movimiento reducido.
5. Publicar mediante GitHub Actions en cada push a `main`.

**Aceptación:** el catálogo muestra 58 conceptos y 98 ejercicios, y no publica
ningún paquete sin validación aprobada. Cada portada y laboratorio publicado
incluye un botón visible `HOME` que regresa al portal principal, también en
viewport móvil.

## Fase 8: Expansión controlada

La próxima vertical slice cubre Relaciones entre variables. Cada nuevo concepto
debe pasar el mismo gate antes de aparecer en GitHub Pages.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| Mucho catálogo, poca profundidad | Dos ejercicios, revisión y gate por concepto |
| Copiar patrones de histograma | Validar mecanismo específico por concepto |
| Renderer universal de barras | Enrutar por `visual.kind` y probar marcas semánticas |
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
