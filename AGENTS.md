# AGENTS.md

Este repositorio no es un producto final. Es una fabrica de documentacion y arquitectura para MVPs construidos con agentes.

Tu trabajo principal es producir documentos claros, consistentes y accionables antes de generar codigo de producto. No programes una aplicacion final salvo que el usuario lo solicite explicitamente despues de completar y validar los documentos.

## Principios

- Lee `IDEA.md` antes de generar o modificar documentos.
- Usa `/templates` como base estructural.
- Usa `.agents/skills` cuando la tarea coincida con una skill.
- Valida los documentos contra `/evals`.
- Evita codigo de producto salvo solicitud explicita.
- Documenta supuestos en cada documento relevante.
- Prefiere MVPs pequenos, verificables y construibles.
- Genera siempre una vertical slice recomendada.
- Mantiene consistencia entre brief, PRD, spec de agente, skills, evals y plan.
- No dejes placeholders vacios ni secciones sin criterio.
- Pregunta solo cuando una decision bloquee el avance o pueda causar dano material.
- Termina cada tarea con resumen de archivos modificados y proximos pasos.
- Mantiene una linea de trazabilidad: `IDEA.md` -> Product Brief -> PRD -> Agent Spec -> Skills -> Evals -> Harness -> Plan -> Prompts.

## Orden obligatorio de trabajo

1. Leer `IDEA.md`.
2. Identificar tipo de MVP.
3. Crear supuestos razonables.
4. Generar o actualizar `PRODUCT_BRIEF.md`.
5. Generar o actualizar `PRD.md`.
6. Generar o actualizar `AGENT_OPERATING_SPEC.md`.
7. Generar o actualizar `SKILL_MAP.md`.
8. Generar o actualizar `SKILL_CONTRACTS.md`.
9. Generar o actualizar `EVAL_SUITE.md`.
10. Generar o actualizar `HARNESS_SPEC.md`.
11. Generar `IMPLEMENTATION_PLAN.md`.
12. Generar `CODEX_CLAUDE_PROMPTS.md`.
13. Validar consistencia.
14. Reportar resultado.

## Como inferir

Si falta informacion, crea un supuesto razonable y marcalo como supuesto. Ejemplos:

- Si el usuario objetivo es difuso, elige el usuario que sufre el problema con mayor frecuencia.
- Si la plataforma no esta definida, sugiere la opcion mas barata de validar.
- Si el alcance es grande, reduce a una tarea principal y un resultado medible.
- Si falta metrica, propone una metrica de uso y una metrica de resultado.

## Validacion obligatoria

Antes de reportar listo, revisa:

- `evals/rubric.md`: ninguna dimension puede quedar en 1 y el promedio objetivo es 4 o mas.
- `evals/mvp_quality_checklist.md`: debe existir usuario, problema, resultado, no objetivos y vertical slice.
- `evals/document_quality_checklist.md`: no debe haber contradicciones entre brief, PRD, plan y prompts.
- `evals/regression_cases.md`: si la idea se parece a un caso, respeta sus condiciones de fallo.

Si una validacion falla, corrige documentos antes de pedir aprobacion.

## Reglas anti-placeholder

No dejes secciones con `TBD`, "pendiente", "por definir", corchetes sin resolver o contenido vacio fuera de `/templates`. Si falta informacion, escribe un supuesto razonable o una pregunta bloqueante claramente marcada.

## Cuando preguntar

Pregunta solo si:

- Hay dos direcciones incompatibles y ambas cambian el MVP.
- Falta informacion legal, medica, financiera o de seguridad critica.
- El usuario pide una integracion que requiere credenciales reales.
- No se puede definir usuario, problema ni resultado con la informacion disponible.

## Reglas de salida

Cada respuesta final debe incluir:

- Archivos creados o modificados.
- Supuestos principales.
- Riesgos relevantes.
- Resultado de validacion contra evals.
- Proxima vertical slice recomendada.

## Formato minimo de vertical slice

Toda vertical slice debe incluir:

- Usuario.
- Entrada.
- Flujo principal.
- Salida.
- Prueba manual.
- Definition of Done.
- No objetivos de la slice.

## Prohibiciones

- No crear apps completas durante la fase documental.
- No agregar dependencias innecesarias.
- No sobreingenierizar con microservicios, colas, modelos propios o autenticacion si el MVP no lo requiere.
- No producir prompts vagos.
- No aceptar documentos contradictorios.
