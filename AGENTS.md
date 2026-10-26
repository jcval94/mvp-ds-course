# AGENTS.md

> Agentes colaboradores: lean primero `docs/agents/COLABORADOR.md`.

Monorepo público de **The Agentic Data Scientist**, el curso de ciencia de datos e
IA de Augmented Learning Labs (sitio: learninglabs.pages.dev). El producto es el
curso: portal, área del alumno, intros de casos, misiones, cuadernos y una
biblioteca de laboratorios por nivel. La **fábrica de niveles** (más abajo) es la
herramienta interna que produce esos laboratorios; no es el producto.

## Reglas para todo el repositorio

- Antes de editar una carpeta, lee su `AGENTS.md`: `missions/`, `casos/`, `kits/`,
  `design/`, `portal/`, `studio/` y `capsulas/corporate-data-narrative-lab/`.
- Todo cambio debe pasar `python -m harness all`. No relajes un validador para que
  pase un artefacto.
- **Repositorio público.** Nunca escribas aquí (archivos, commits, PRs ni
  comentarios) respuestas o tolerancias de retos, rúbricas, código o detalles del
  backend privado, datos de alumnos ni credenciales. La única clave permitida es
  la publicable de Supabase que ya usa el sitio.
- Engine (`harness/`, `schemas/`, `design/`, `portal/`, `scripts/` y el motor de
  `site/`) y contenido (`missions/`, `casos/`, `kits/`, `capsulas/`,
  `generated/` y las carpetas de caso de `site/casos/`) se mantienen separados.
- `generated/` es contenido aprobado: no se edita a mano. Si una página publicada
  necesita algo, se inyecta en el build.
- El build del alumno (`dist/`) no lleva material docente; ese material solo
  existe en `python -m harness build --docente` (local, nunca se publica).
- `dist/` es reproducible y agnóstico del hosting: rutas relativas; la URL base
  (`course.yaml → build.base_url`) solo aparece en canonical y sitemap.
- Nada de MP4, datos pesados ni artefactos regenerables en Git.
- Fusionar en `main` publica el sitio. Trabaja en ramas y PRs.
- Textos visibles, precios, fechas, qué es gratis o de pago, estilo visual y
  esquema de la base son decisiones del autor.

## Qué flujo aplica según la tarea

| Tarea | Lee primero | Flujo |
| --- | --- | --- |
| Portal, área del alumno, harness, CI, deployment | `docs/architecture/` | Cambio mínimo con pruebas; **no** regeneres documentos de la fábrica |
| Caso, intro, misión, cuaderno o clase | `docs/CRITERIO_PRIMERO.md`, `docs/ESTRUCTURA_GENERACION_1.md`, `site/casos/README.md` | Criterio primero: apuesta del alumno antes de la herramienta; Delegar · Verificar · Firmar |
| Nivel de la biblioteca (crear o modificar) | `IDEA.md`, `docs/CURRICULUM_MAP.md`, `docs/pipeline/README.md` | Fábrica de niveles (abajo) |
| Oferta de la Generación 1 | `docs/DECISIONES_GENERACION_1.md` | Solo con confirmación del autor; se actualiza el documento y el sitio a la vez |

# Fábrica de niveles

Todo lo que sigue aplica **solo** a producir o modificar niveles de la biblioteca
(`generated/`, `docs/stories/`, `.agents/skills/`, `evals/`, `templates/`). Su
trabajo es transformar conceptos curriculares en materiales claros, visuales,
técnicamente correctos y accionables.

## Principios

- Lee `IDEA.md` antes de actuar.
- Usa `docs/CURRICULUM_MAP.md` para nivel y prerrequisitos.
- Usa `docs/CRITERIO_PRIMERO.md` para casos, misiones, cuadernos y clases: hábito
  de criterio, escalera de complejidad, arco de revelación y protocolo Delegar ·
  Verificar · Firmar.
- Usa `/templates` como base estructural.
- Activa `.agents/skills` cuando la tarea coincida con una skill.
- Valida contra `/evals`.
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
-> Course Story Bible / Level Story
-> VisualizationSpec
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
7. Para una ruta continua, generar o actualizar Story Bible, arco, ledger y
   `docs/stories/LEVEL_<N>.md`; la historia debe quedar aprobada antes del nivel.
8. Generar y aprobar `VisualizationSpec`; no continuar si falta renderer registrado o prueba.
9. Generar o actualizar `docs/AGENT_OPERATING_SPEC.md`.
10. Generar o actualizar `docs/SKILL_MAP.md`.
11. Generar o actualizar `docs/SKILL_CONTRACTS.md`.
12. Sincronizar `.agents/skills/*/SKILL.md`.
13. Generar o actualizar `docs/EVAL_SUITE.md` y `/evals`.
14. Generar o actualizar `docs/HARNESS_SPEC.md`.
15. Generar `docs/IMPLEMENTATION_PLAN.md`.
16. Generar `docs/CODEX_CLAUDE_PROMPTS.md`.
17. Validar consistencia, precisión técnica y pedagogía.
18. Reportar resultado.

## Artefactos educativos

### `ConceptSpec`

Fuente de verdad del concepto: bloque, nivel, prerrequisitos, objetivo, definición, intuición, errores, visual, interacción, dataset y criterio de dominio.

### `LearningModule`

Modo Aprender: activación previa, intuición, explicación progresiva, visualización, experimento, error común, checkpoint y cierre.

### `PracticeExercise`

Modo Ejercitar: historia aplicada distinta de Aprender, protagonista profesional o negocio realista, presión o restricción concreta, evidencia visual animada, decisión, pregunta, distractores plausibles, pistas, feedback específico y conclusión transferible.

### `LiveTeachingPack`

Modo Enseñar en vivo: contenido docente (solo en el build docente, nunca en `dist/`), guion, snapshot público real con procedencia/licencia/fecha/SHA-256, demo, preguntas, evaluación, blueprint, prompts, checklists y plan offline.

## Cómo inferir

Si falta información no crítica:

- Asume como usuario final a un adulto principiante del curso; el docente usa el build docente.
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

- No agregar dentro de un nivel cuentas, pagos ni seguimiento propios: el portal ya los resuelve.
- No agregar dependencias innecesarias.
- No ejecutar modelos de IA desde los laboratorios.
- No publicar paquetes cuyo manifest o validación no estén aprobados.
- No aceptar visualizaciones decorativas.
- No producir ejercicios respondibles sin mirar la evidencia.
- No reutilizar Aprender como Ejercitar; la práctica debe contar un caso distinto que se resuelve con lo aprendido.
- No publicar `En vivo` ni ningún material docente en el build del alumno.
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
