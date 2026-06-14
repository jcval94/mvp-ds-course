# Project Structure

## Estructura de esta fabrica

```text
mvp-agent-factory/
├── README.md
├── IDEA.md
├── AGENTS.md
├── CLAUDE.md
├── .gitignore
├── docs/
├── templates/
├── .agents/
│   └── skills/
├── evals/
├── examples/
└── scripts/
```

## Proposito de cada carpeta

- `README.md`: explicacion general y flujo de uso.
- `IDEA.md`: entrada editable para una idea de MVP.
- `AGENTS.md`: instrucciones principales para Codex.
- `CLAUDE.md`: instrucciones equivalentes para Claude Code.
- `.gitignore`: exclusiones basicas para Python, entornos locales y archivos temporales.
- `docs/`: documentos base y outputs esperados.
- `templates/`: plantillas reutilizables para nuevos MVPs.
- `.agents/skills/`: skills especializadas para agentes.
- `evals/`: rubricas, checklists y regresiones.
- `examples/`: ideas de ejemplo y resumen esperado.
- `scripts/`: utilidades simples sin dependencias.

## Estructura recomendada para proyectos generados

```text
new-mvp-project/
├── README.md
├── IDEA.md
├── AGENTS.md
├── CLAUDE.md
├── .gitignore
├── docs/
├── .agents/
│   └── skills/
├── evals/
├── examples/
└── app/
```

## Criterio de separacion

- La fabrica define metodologia.
- El proyecto generado aplica la metodologia a una idea concreta.
- La carpeta `app/` solo debe aparecer en proyectos derivados cuando se apruebe construir producto.
- El MVP documental puede existir sin `app/`.

## Estructura minima que crea el script

`scripts/scaffold_mvp.py` crea una base ligera con:

- `README.md`, `IDEA.md`, `AGENTS.md`, `CLAUDE.md` y `.gitignore`.
- `docs/README.md` como destino documental.
- `evals/rubric.md`, `evals/mvp_quality_checklist.md` y `evals/document_quality_checklist.md`.
- `.agents/skills/README.md` para skills futuras.
- `examples/README.md`.
- `app/README.md` reservado para codigo de producto aprobado.

## Reglas para mantener orden

- No mezclar ejemplos con documentos finales.
- No duplicar instrucciones entre `AGENTS.md` y cada skill salvo reglas criticas.
- Mantener evals pequenos pero exigentes.
- Versionar cambios de plantillas junto con actualizacion de ejemplos.
