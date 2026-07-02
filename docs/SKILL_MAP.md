# Skill Map

## Skills principales

| Skill | Propósito | Activador | Input | Output | Prioridad |
| --- | --- | --- | --- | --- | --- |
| `curriculum-architect` | Ordenar conceptos y prerrequisitos | Nuevo tema, bloque o expansión del temario | `CURRICULUM_MAP.md`, audiencia, nivel | Ruta curricular y objetivo priorizado | Alta |
| `course-narrative-architect` | Diseñar mundo, relaciones, secretos, crecimiento e historia independiente | Nueva ruta, nivel o episodio continuo | Currículo, Story Bible y ledger previo | Arco, `LevelStory` aprobable, subtítulos y tres deltas verificables | Alta |
| `concept-spec-designer` | Crear la fuente conceptual común | Concepto nuevo o ficha incompleta | Ruta curricular y contexto | `ConceptSpec` validable | Alta |
| `learning-module-designer` | Diseñar el modo Aprender | Solicitud de explicación o módulo | `ConceptSpec`, duración | `LearningModule` separado de práctica y docencia | Alta |
| `practice-exercise-designer` | Diseñar práctica narrativa dependiente de evidencia animada | Solicitud de ejercicio o caso | `ConceptSpec`, visual, contexto | Ejercicio guiado y transferencia con storytelling | Alta |
| `live-teaching-pack-builder` | Preparar una clase docente reproducible | Solicitud docente o de clase en vivo | `ConceptSpec`, módulo, ejercicio, snapshot público | Guion, dataset real, roles de IA, prompts y plan offline | Alta |

## Skills de calidad

| Skill | Propósito | Activador | Input | Output | Prioridad |
| --- | --- | --- | --- | --- | --- |
| `technical-content-reviewer` | Revisar exactitud y coherencia de datos | Antes del cierre de cualquier paquete | Todos los artefactos | Hallazgos técnicos y correcciones | Alta |
| `narrative-continuity-reviewer` | Revisar voz, familia, secretos, crecimiento, cronología y datos | Antes de aprobar cualquier episodio continuo | Story Bible, arco, ledger y episodio | Hallazgos narrativos y tres deltas aprobados | Alta |
| `interactive-visual-reviewer` | Probar mecanismo, animación, evidencia y desbloqueo | Después de QA técnica y antes de QA pedagógica | ConceptSpec, UI renderizada y ejercicios | Hallazgos visuales con evidencia de navegador | Alta |
| `visualization-contract-designer` | Elegir representación y emitir `VisualizationSpec` | Antes de ConceptSpec y de cualquier modo | Objetivo, pregunta, variables, datos y nivel | Kind registrado, encodings, estados, marcas y límites | Alta |
| `level-experience-consistency-reviewer` | Preservar `level-shell-v1` entre niveles | Tras QA técnica/narrativa y antes de QA visual | Manifest, temario y UI renderizada | Hallazgos de navegación, responsive y modo docente | Alta |
| `pedagogy-eval-reviewer` | Evaluar alineación y profundidad | Cierre obligatorio | Paquete y evals | Puntajes, bloqueos y decisión | Alta |

## Dependencias

```text
curriculum-architect
        |
course-narrative-architect
        |
LevelStory aprobada
        |
visualization-contract-designer
        |
concept-spec-designer
   /         |          \
Aprender  Ejercitar  Enseñar en vivo
   \         |          /
 technical-content-reviewer
             |
 narrative-continuity-reviewer
             |
 level-experience-consistency-reviewer
             |
 interactive-visual-reviewer
             |
  pedagogy-eval-reviewer
```

## Reglas de routing

- Todo concepto nuevo pasa primero por currículo y `ConceptSpec`.
- Toda ruta continua pasa por `course-narrative-architect` después de currículo y
  antes de `ConceptSpec`; un episodio aislado puede omitirlo si declara que no
  pertenece a una continuidad.
- Ningún nivel continuo pasa a `ConceptSpec`, modos o implementación sin una
  `docs/stories/LEVEL_<N>.md` independiente y aprobada.
- Una solicitud de paquete completo activa las cinco skills base; si pertenece
  a una ruta continua activa además `course-narrative-architect`.
- Un cambio en la definición conceptual obliga a regenerar o revisar los tres modos.
- Un cambio solo editorial puede revisarse en el modo afectado, pero siempre vuelve a QA.
- Contenido técnico avanzado activa revisión de prerrequisitos antes de generación.
- QA técnica ocurre antes de QA pedagógica final.
- QA narrativa ocurre después de QA técnica y antes de QA visual/pedagógica.
- La asignación visual ocurre antes de ConceptSpec; la consistencia de experiencia
  ocurre antes de QA visual interactiva y esta ocurre antes de QA pedagógica.
- Todo snapshot público pasa por procedencia, licencia y hash.
- En vivo usa snapshot público real como fuente principal y se oculta por defecto en UI estudiantil.
- Ejercitar debe contar una historia profesional o de negocio distinta de Aprender.
- Codex asume el rol técnico; Gemini y ChatGPT facilitan o revisan.
- Cada episodio usa un objetivo principal de ciencia de datos y como máximo una
  competencia auxiliar de agentes.

## Señales de skill débil

- Produce texto libre sin esquema verificable.
- No declara inputs o límites.
- No puede fallar.
- Duplica otra responsabilidad.
- No vincula su output con objetivo, evidencia o evaluación.
- No declara voz, conocimiento previo, `continuityDelta` o `dataStateDelta` en
  una ruta narrativa.
- Permite aprobar contenido sin visualización cuando el concepto es visualizable.
- Aprueba cualquier diferencia de HTML sin comprobar marcas semánticas.

## Artefactos físicos

Las instrucciones ejecutables viven en `.agents/skills/<nombre>/SKILL.md`. Este mapa y `SKILL_CONTRACTS.md` son la fuente de diseño; los archivos de skill deben mantenerse sincronizados.
