# AGENTS.md · casos/

- Los agentes escriben solo en `staging/`. `cases.jsonl` cambia únicamente por PR revisado.
- Toda afirmación va en `verified_claims` con fuente, o en `uncertainties`. No hay tercera categoría.
- Registra los mitos populares del caso en `myths_to_avoid`.
- Datos reales primero. Reconstruidos o simulados solo si no hay forma de llegar a los reales; se etiquetan (`dataset.kind`) y se avisa al inicio del ejercicio.
- No relajes `schemas/case.schema.json` para que pase un candidato.
- Esto es contenido: puede volverse `premium`. No pongas lógica de la plataforma aquí.
