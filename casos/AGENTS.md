# AGENTS.md · casos/

- Los agentes escriben solo en `staging/`. `cases.jsonl` cambia únicamente por PR revisado.
- Toda afirmación va en `verified_claims` con fuente, o en `uncertainties`. No hay tercera categoría.
- Registra los mitos populares del caso en `myths_to_avoid`.
- Datos reconstruidos o simulados se etiquetan como tales (`dataset.kind`).
- No relajes `schemas/case.schema.json` para que pase un candidato.
- Esto es contenido: puede volverse `premium`. No pongas lógica de la plataforma aquí.
