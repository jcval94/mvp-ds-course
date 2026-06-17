# AGENTS.md

Este repositorio es una fábrica documental para crear material educativo de ciencia de datos con agentes. No es un LMS ni una aplicación final.

Tu trabajo principal es transformar conceptos curriculares en materiales claros, visuales, técnicamente correctos y accionables antes de generar código de producto.

## Principios

- Lee `IDEA.md` antes de actuar.
- Usa `docs/CURRICULUM_MAP.md` para nivel y prerrequisitos.
- Usa `/templates` como base estructural.
- Activa `.agents/skills` cuando la tarea coincida con una skill.
- Valida contra `/evals`.
- Evita código de producto salvo solicitud explícita después de validar documentos.
- Documenta supuestos en cada artefacto relevante.
- Prefiere una lección profunda y verificable sobre muchos temas superficiales.
- Mantén consistencia entre objetivo, visualización, ejercicio, feedback y guía docente.
- Genera siempre una vertical slice recomendada.
- No dejes placeholders vacíos ni secciones sin criterio.
- Pregunta solo cuando una decisión bloquee el avance o pueda causar daño material.

## Línea de trazabilidad

```text
IDEA.md
-> Product Brief
-> PRD
-> Curriculum Map
-> Agent Spec
-> Skills
-> Evals
-> Harness
-> Implementation Plan
-> Prompts
-> ConceptSpec
-> LearningModule / PracticeExercise / LiveTeachingPack
```

## Orden obligatorio de trabajo

1. Leer `IDEA.md`.
2. Identificar usuario, concepto, nivel y resultado de aprendizaje.
3. Crear supuestos razonables.
4. Generar o actualizar `docs/PRODUCT_BRIEF.md`.
5. Generar o actualizar `docs/PRD.md`.
6. Generar o actualizar `docs/CURRICULUM_MAP.md`.
7. Generar o actualizar `docs/AGENT_OPERATING_SPEC.md`.
8. Generar o actualizar `docs/SKILL_MAP.md`.
9. Generar o actualizar `docs/SKILL_CONTRACTS.md`.
10. Sincronizar `.agents/skills/*/SKILL.md`.
11. Generar o actualizar `docs/EVAL_SUITE.md` y `/evals`.
12. Generar o actualizar `docs/HARNESS_SPEC.md`.
13. Generar `docs/IMPLEMENTATION_PLAN.md`.
14. Generar `docs/CODEX_CLAUDE_PROMPTS.md`.
15. Validar consistencia, precisión técnica y pedagogía.
16. Reportar resultado.

## Artefactos educativos

### `ConceptSpec`

Fuente de verdad del concepto: bloque, nivel, prerrequisitos, objetivo, definición, intuición, errores, visual, interacción, dataset y criterio de dominio.

### `LearningModule`

Modo Aprender: activación previa, intuición, explicación progresiva, visualización, experimento, error común, checkpoint y cierre.

### `PracticeExercise`

Modo Ejercitar: historia aplicada distinta de Aprender, protagonista profesional o negocio realista, presión o restricción concreta, evidencia visual animada, decisión, pregunta, distractores plausibles, pistas, feedback específico y conclusión transferible.

### `LiveTeachingPack`

Modo Enseñar en vivo: contenido docente oculto en la experiencia estática, guion, snapshot público real con procedencia/licencia/fecha/SHA-256, demo, preguntas, evaluación, blueprint, prompts, checklists y plan offline.

## Cómo inferir

Si falta información no crítica:

- Asume profesor o creador de cursos como usuario principal.
- Asume nivel principiante.
- Usa una duración de 30 a 45 minutos.
- Prefiere un snapshot público pequeño con fuente, licencia, fecha y SHA-256;
  usa un dataset sintético etiquetado cuando no exista una alternativa adecuada.
- Para `LiveTeachingPack`, usa siempre un snapshot público real versionado como fuente principal; los datos sintéticos solo pueden aparecer como apoyo offline etiquetado.
- Reduce a un objetivo de aprendizaje principal.
- Propón una interacción que revele el mecanismo del concepto.
- Marca cada inferencia como supuesto.

## Inspiración de complejidad

`concepro_histograma.html` y `ejercicios_histograma.html` son inspiración, no base.

Extrae patrones:

- construcción visual paso a paso;
- manipulación de parámetros;
- comparación de escenarios;
- narrativa al servicio de una decisión;
- historias de práctica con protagonistas, restricciones reales y consecuencias razonables;
- animaciones fluidas que revelan evidencia antes de permitir responder;
- preguntas dependientes de evidencia;
- feedback por error plausible.

No copies estructura, textos, casos ni estética como solución universal.

## Validación obligatoria

Antes de reportar listo, revisa:

- `evals/rubric.md`: ninguna dimensión en 1 y promedio de 4 o más.
- `evals/mvp_quality_checklist.md`: usuario, problema, resultado, no objetivos y vertical slice.
- `evals/document_quality_checklist.md`: ausencia de contradicciones.
- `evals/curriculum_quality_checklist.md`: nivel y prerrequisitos.
- `evals/pedagogy_quality_checklist.md`: visual, práctica y feedback.
- `evals/technical_content_checklist.md`: datos, métricas y conclusiones.
- Verifica procedencia, licencia y hash de cada snapshot público.
- `evals/regression_cases.md`: condiciones específicas por concepto.

Si una validación falla, corrige la decisión raíz y propaga el cambio antes de pedir aprobación.

## Reglas anti-placeholder

No dejes `TBD`, "pendiente", "por definir", corchetes sin resolver o contenido vacío fuera de `/templates`. Si falta información, escribe un supuesto razonable o una pregunta bloqueante claramente marcada.

## Cuándo preguntar

Pregunta solo si:

- dos objetivos incompatibles cambian el material;
- faltan datos reales requeridos o permisos;
- existe riesgo legal, médico, financiero, de privacidad o seguridad;
- se solicita evaluación formal automatizada;
- no puede definirse concepto, usuario ni resultado.

## Prohibiciones

- No crear una app completa durante la fase documental.
- No agregar LMS, cuentas, pagos o seguimiento de estudiantes.
- No agregar dependencias innecesarias.
- No ejecutar IA desde una futura app local en el MVP.
- No publicar paquetes cuyo manifest o validación no estén aprobados.
- No aceptar visualizaciones decorativas.
- No producir ejercicios respondibles sin mirar la evidencia.
- No reutilizar Aprender como Ejercitar; la práctica debe contar un caso distinto que se resuelve con lo aprendido.
- No publicar `En vivo` como pestaña estudiantil visible; en estático solo puede mostrarse con modo docente y aclaración de que no es seguridad real.
- No usar datasets sintéticos como fuente principal de `En vivo`.
- No usar feedback limitado a correcto o incorrecto.
- No afirmar causalidad sin diseño o evidencia suficiente.
- No producir prompts vagos.
- No aceptar documentos contradictorios.

## Formato mínimo de vertical slice

Toda vertical slice debe incluir:

- Usuario.
- Entrada.
- Flujo principal.
- Salida.
- Prueba manual.
- Definition of Done.
- No objetivos.

## Reglas de salida

Cada respuesta final debe incluir:

- archivos creados o modificados;
- supuestos principales;
- riesgos relevantes;
- resultado de validación contra evals;
- próxima vertical slice recomendada.
