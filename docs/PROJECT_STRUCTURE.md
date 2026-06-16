# Project Structure

## Estructura de DataClass Forge

```text
mvp-ds-course/
|-- README.md
|-- IDEA.md
|-- AGENTS.md
|-- CLAUDE.md
|-- docs/
|   |-- PRODUCT_BRIEF.md
|   |-- PRD.md
|   |-- CURRICULUM_MAP.md
|   |-- AGENT_OPERATING_SPEC.md
|   |-- SKILL_MAP.md
|   |-- SKILL_CONTRACTS.md
|   |-- EVAL_SUITE.md
|   |-- HARNESS_SPEC.md
|   |-- IMPLEMENTATION_PLAN.md
|   `-- CODEX_CLAUDE_PROMPTS.md
|-- .agents/skills/
|-- evals/
|-- templates/
|-- examples/
|-- generated/
|-- datasets/
|   |-- registry.json
|   |-- metadata/
|   `-- snapshots/
|-- site/
|-- .github/workflows/pages.yml
|-- reference/
`-- scripts/
```

## Responsabilidades

- `IDEA.md`: misión, usuario, restricciones e inspiración.
- `docs/CURRICULUM_MAP.md`: temario, niveles y prerrequisitos.
- `.agents/skills/`: flujos ejecutables por artefacto.
- `evals/`: gates curriculares, técnicos, pedagógicos y documentales.
- `templates/`: esqueletos para nuevos paquetes.
- `examples/`: entradas y resultados de referencia.
- `generated/`: proyectos derivados; no son fuente canónica.
- `datasets/`: snapshots públicos fijos, metadatos, licencias y hashes.
- `site/`: fuente del portal minimalista de resultados.
- `_site/`: build descartable para GitHub Pages.
- `.github/workflows/pages.yml`: validación y despliegue automático.
- `reference/`: demos históricas o contexto no bloqueante.
- `scripts/`: scaffolding y validaciones simples.

## Estructura de un proyecto derivado

```text
material-project/
|-- README.md
|-- IDEA.md
|-- AGENTS.md
|-- CLAUDE.md
|-- docs/
|   |-- CURRICULUM_MAP.md
|   `-- packages/
|       `-- concept-name/
|           |-- CONCEPT_SPEC.md
|           |-- LEARNING_MODULE.md
|           |-- PRACTICE_EXERCISE.md
|           `-- LIVE_TEACHING_PACK.md
|-- .agents/skills/
|-- evals/
|-- examples/
`-- app/
```

## Regla de separación

- La raíz define metodología y temario.
- Los paquetes documentales aplican la metodología.
- `generated/` conserva derivados o prototipos.
- `app/` solo se usa después de aprobación explícita.

## Convenciones

- Un directorio por concepto cuando existan artefactos reales.
- Una `ConceptSpec` compartida por los tres modos.
- Snapshots públicos registrados y datos sintéticos etiquetados.
- Evals versionados junto con cambios de contratos.
- Nada en `generated/` reemplaza una decisión de `docs/`.
