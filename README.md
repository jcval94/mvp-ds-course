# mvp-agent-factory

`mvp-agent-factory` es una fabrica de documentacion y arquitectura para convertir ideas vagas de MVP en paquetes listos para desarrollo con agentes, Codex, Claude Code, Cursor o equipos humanos.

No es una aplicacion final. Es un sistema versionado para pensar, reducir alcance, documentar, evaluar y preparar un MVP antes de escribir codigo de producto.

## Problema que resuelve

Muchas ideas de MVP empiezan con entusiasmo y poca claridad: usuario impreciso, alcance inflado, criterios de exito ambiguos, agentes sin limites y prompts dificiles de repetir. Este repo fuerza un flujo simple:

```text
1. Escribe tu idea en IDEA.md
2. Ejecuta Codex con AGENTS.md
3. Genera documentos en /docs
4. Valida con /evals
5. Define vertical slice
6. Construye MVP
7. Itera
```

El resultado esperado es un paquete documental coherente, pequeno y accionable.

## Para que sirve

- Transformar una idea incompleta en un `PRODUCT_BRIEF.md`.
- Crear un `PRD.md` claro antes de programar.
- Definir como debe operar el agente principal.
- Disenar skills especializadas con contratos verificables.
- Crear evals y rubricas para revisar calidad.
- Proponer una vertical slice pequena.
- Preparar prompts ejecutables para Codex, Claude Code o Cursor.

## Como se usa

1. Edita `IDEA.md` con lo que sepas. Puedes dejar campos incompletos.
2. Abre Codex, Claude Code o Cursor en la raiz del repo.
3. Pide al agente: "Lee AGENTS.md e IDEA.md y genera el paquete documental inicial".
4. Revisa los documentos creados en `docs/`.
5. Ejecuta la revision contra `evals/`.
6. Ajusta alcance y vertical slice.
7. Solo entonces crea codigo de producto en un proyecto derivado.

## Definition of Ready

Un MVP esta listo para pasar a desarrollo cuando:

- El usuario objetivo, problema y resultado esperado son explicitos.
- El PRD contiene una vertical slice con entrada, proceso, salida y prueba manual.
- Los no objetivos bloquean al menos tres tentaciones de sobrealcance.
- Las skills necesarias tienen activadores, inputs, outputs y criterios de aceptacion.
- La rubrica de `evals/rubric.md` alcanza promedio 4 o superior.
- No hay secciones vacias, `TBD`, "pendiente" ni decisiones sin supuesto documentado.

## Uso recomendado con Codex

Usa este prompt inicial:

```text
Lee AGENTS.md e IDEA.md. Usa las plantillas de /templates y las skills de .agents/skills. Genera o actualiza los documentos de /docs siguiendo el orden obligatorio. Valida contra /evals y termina con archivos modificados, supuestos, riesgos y proxima vertical slice recomendada.
```

Codex debe trabajar primero sobre documentos. Si una decision no bloquea el avance, debe inferir un supuesto razonable y documentarlo.

## Uso recomendado con Claude Code

Usa este prompt inicial:

```text
Lee CLAUDE.md, AGENTS.md e IDEA.md. No programes producto todavia. Genera el paquete documental para el MVP, revisa consistencia narrativa, tecnica y de producto, y propone una vertical slice pequena.
```

Claude Code debe usar las skills como referencia operativa, aunque no las cargue automaticamente como herramientas.

## Documentos que genera

- `docs/PRODUCT_BRIEF.md`: decision de producto, usuario, valor y alcance.
- `docs/PRD.md`: requisitos, historias, metricas y Definition of Done.
- `docs/AGENT_OPERATING_SPEC.md`: reglas del agente principal.
- `docs/SKILL_MAP.md`: mapa de skills necesarias.
- `docs/SKILL_CONTRACTS.md`: contratos detallados por skill.
- `docs/EVAL_SUITE.md`: suite de evaluacion documental.
- `docs/HARNESS_SPEC.md`: arnes minimo para orquestar agentes.
- `docs/PROJECT_STRUCTURE.md`: estructura del repo y de proyectos generados.
- `docs/IMPLEMENTATION_PLAN.md`: fases de ejecucion.
- `docs/CODEX_CLAUDE_PROMPTS.md`: prompts listos para usar.

## Que son las skills

Las skills son instrucciones especializadas para agentes. Cada skill vive en `.agents/skills/<nombre>/SKILL.md` y define cuando usarse, que entradas necesita, que salidas produce y que no debe hacer.

Este repo incluye skills para estrategia de MVP, PRD, arquitectura de agente, diseno de skills, evals, arnes, prompts y QA.

## Que son los evals

Los evals son rubricas, checklists y casos de regresion para validar que el paquete documental sea claro, pequeno, consistente y listo para desarrollo. No prueban una app final; prueban la calidad de la metodologia y de los documentos.

La validacion minima debe responder tres preguntas:

1. Que se construye primero?
2. Como sabemos que funciono?
3. Que queda explicitamente fuera?

## Crear un nuevo proyecto MVP

Puedes iniciar una estructura minima con:

```bash
python scripts/scaffold_mvp.py my-new-mvp
```

Esto crea carpetas base, un `IDEA.md` editable y archivos iniciales para documentacion, evals, skills, ejemplos y app.

El script no copia una app ni instala dependencias. Deja `app/` como carpeta reservada para despues de aprobar la vertical slice.

## Mejorar la fabrica con el tiempo

- Agrega nuevos casos en `examples/` cuando encuentres patrones repetibles.
- Refina `evals/regression_cases.md` si una salida mala se cuela.
- Endurece `docs/SKILL_CONTRACTS.md` cuando una skill produzca resultados ambiguos.
- Versiona cambios de metodologia como si fueran cambios de producto.
- Mantiene el foco: menos alcance, mejores decisiones, prompts mas claros.

## Anti-patrones

- Usar la fabrica para saltar directo a codigo.
- Tratar el PRD como documento final y no como herramienta de decision.
- Crear skills que no producen un artefacto verificable.
- Aprobar evals que solo revisan estilo.
- Agregar infraestructura antes de probar la vertical slice.
