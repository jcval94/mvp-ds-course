# Histohistorias MVP

Paquete documental generado con `mvp-agent-factory` a partir de `examples/educational_data_app/IDEA.md`.

Este proyecto no contiene todavia una app HTML. Su objetivo es validar que la fabrica puede transformar una idea educativa en documentos listos para desarrollo con agentes.

## Resumen

Histohistorias es una futura web app autocontenida para enseñar histogramas con storytelling, datos de ejemplo y una interaccion simple: cambiar la cantidad de bins para observar como cambia la lectura de una distribucion.

## Usuario inicial

Docente introductorio de ciencia de datos que quiere explicar histogramas en una clase corta, con opcion de que estudiantes principiantes practiquen de forma autonoma.

## MVP pequeño

El MVP debe incluir solo una experiencia educativa:

1. Mostrar un dataset incluido.
2. Visualizar un histograma.
3. Permitir cambiar la cantidad de bins.
4. Mostrar una explicacion narrativa breve.
5. Hacer una pregunta de reflexion.

## Primera vertical slice

Abrir una pagina, ver un histograma de calificaciones ficticias, cambiar el numero de bins y leer una explicacion sobre forma, centro y dispersion.

## Lo que queda fuera

- Login.
- LMS.
- Curso completo.
- Multiusuario.
- Panel docente.
- IA generativa.
- Carga de datasets propios.

## Documentos incluidos

- `docs/PRODUCT_BRIEF.md`
- `docs/PRD.md`
- `docs/AGENT_OPERATING_SPEC.md`
- `docs/SKILL_MAP.md`
- `docs/SKILL_CONTRACTS.md`
- `docs/EVAL_SUITE.md`
- `docs/HARNESS_SPEC.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/CODEX_CLAUDE_PROMPTS.md`
- `evals/rubric.md`
- `evals/mvp_quality_checklist.md`

## Siguiente paso

Usar el prompt de vertical slice en `docs/CODEX_CLAUDE_PROMPTS.md` para construir una app HTML estatica solo despues de aprobar este paquete documental.

