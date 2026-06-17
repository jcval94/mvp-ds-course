# Skill Map

## Skills principales

| Skill | Propósito | Activador | Input | Output | Prioridad |
| --- | --- | --- | --- | --- | --- |
| `curriculum-architect` | Ordenar conceptos y prerrequisitos | Nuevo tema, bloque o expansión del temario | `CURRICULUM_MAP.md`, audiencia, nivel | Ruta curricular y objetivo priorizado | Alta |
| `concept-spec-designer` | Crear la fuente conceptual común | Concepto nuevo o ficha incompleta | Ruta curricular y contexto | `ConceptSpec` validable | Alta |
| `learning-module-designer` | Diseñar el modo Aprender | Solicitud de explicación o módulo | `ConceptSpec`, duración | `LearningModule` separado de práctica y docencia | Alta |
| `practice-exercise-designer` | Diseñar práctica narrativa dependiente de evidencia animada | Solicitud de ejercicio o caso | `ConceptSpec`, visual, contexto | Ejercicio guiado y transferencia con storytelling | Alta |
| `live-teaching-pack-builder` | Preparar una clase docente reproducible | Solicitud docente o de clase en vivo | `ConceptSpec`, módulo, ejercicio, snapshot público | Guion, dataset real, roles de IA, prompts y plan offline | Alta |

## Skills de calidad

| Skill | Propósito | Activador | Input | Output | Prioridad |
| --- | --- | --- | --- | --- | --- |
| `technical-content-reviewer` | Revisar exactitud y coherencia de datos | Antes del cierre de cualquier paquete | Todos los artefactos | Hallazgos técnicos y correcciones | Alta |
| `pedagogy-eval-reviewer` | Evaluar alineación y profundidad | Cierre obligatorio | Paquete y evals | Puntajes, bloqueos y decisión | Alta |

## Dependencias

```text
curriculum-architect
        |
concept-spec-designer
   /         |          \
Aprender  Ejercitar  Enseñar en vivo
   \         |          /
 technical-content-reviewer
             |
  pedagogy-eval-reviewer
```

## Reglas de routing

- Todo concepto nuevo pasa primero por currículo y `ConceptSpec`.
- Una solicitud de paquete completo activa las cinco skills principales.
- Un cambio en la definición conceptual obliga a regenerar o revisar los tres modos.
- Un cambio solo editorial puede revisarse en el modo afectado, pero siempre vuelve a QA.
- Contenido técnico avanzado activa revisión de prerrequisitos antes de generación.
- QA técnica ocurre antes de QA pedagógica final.
- Todo snapshot público pasa por procedencia, licencia y hash.
- En vivo usa snapshot público real como fuente principal y se oculta por defecto en UI estudiantil.
- Ejercitar debe contar una historia profesional o de negocio distinta de Aprender.
- Codex asume el rol técnico; Gemini y ChatGPT facilitan o revisan.

## Señales de skill débil

- Produce texto libre sin esquema verificable.
- No declara inputs o límites.
- No puede fallar.
- Duplica otra responsabilidad.
- No vincula su output con objetivo, evidencia o evaluación.
- Permite aprobar contenido sin visualización cuando el concepto es visualizable.

## Artefactos físicos

Las instrucciones ejecutables viven en `.agents/skills/<nombre>/SKILL.md`. Este mapa y `SKILL_CONTRACTS.md` son la fuente de diseño; los archivos de skill deben mantenerse sincronizados.
