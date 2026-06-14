# Project Structure

## Estructura generada

```text
educational_data_app_mvp/
├── README.md
├── IDEA.md
├── docs/
│   ├── PRODUCT_BRIEF.md
│   ├── PRD.md
│   ├── AGENT_OPERATING_SPEC.md
│   ├── SKILL_MAP.md
│   ├── SKILL_CONTRACTS.md
│   ├── EVAL_SUITE.md
│   ├── HARNESS_SPEC.md
│   ├── PROJECT_STRUCTURE.md
│   ├── IMPLEMENTATION_PLAN.md
│   └── CODEX_CLAUDE_PROMPTS.md
└── evals/
    ├── rubric.md
    └── mvp_quality_checklist.md
```

## Proposito de cada archivo

- `README.md`: resumen operativo del MVP generado.
- `IDEA.md`: idea normalizada y supuestos.
- `docs/PRODUCT_BRIEF.md`: decision de producto.
- `docs/PRD.md`: requisitos y criterios de aceptacion.
- `docs/AGENT_OPERATING_SPEC.md`: reglas del agente.
- `docs/SKILL_MAP.md`: skills usadas y routing.
- `docs/SKILL_CONTRACTS.md`: contratos verificables.
- `docs/EVAL_SUITE.md`: pruebas documentales.
- `docs/HARNESS_SPEC.md`: arnes manual minimo.
- `docs/IMPLEMENTATION_PLAN.md`: fases para pasar a app.
- `docs/CODEX_CLAUDE_PROMPTS.md`: prompts ejecutables.
- `evals/rubric.md`: rubrica local de calidad.
- `evals/mvp_quality_checklist.md`: checklist de construibilidad.

## Estructura futura si se aprueba construir

```text
educational_data_app_mvp/
├── app/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── docs/
```

## Regla de separacion

La carpeta `app/` no debe crearse hasta que el humano apruebe construir la vertical slice.

