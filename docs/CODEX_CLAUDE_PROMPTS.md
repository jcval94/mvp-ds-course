# Codex y Claude Code Prompts

## 1. Generar un paquete educativo

```text
Lee AGENTS.md, IDEA.md, docs/PRODUCT_BRIEF.md, docs/PRD.md y docs/CURRICULUM_MAP.md. Usa las skills de .agents/skills. Para el concepto solicitado, define nivel, prerrequisitos y un objetivo observable; crea ConceptSpec, LearningModule, dos PracticeExercise desde Nivel 2 y LiveTeachingPack. Separa contenido: Aprender enseña, Ejercitar cuenta un caso aplicado con evidencia animada y En vivo guía al docente. Prefiere snapshots públicos con licencia, fecha y hash; En vivo siempre usa snapshot real como fuente principal. Valida con docs/EVAL_SUITE.md y evals/. Corrige bloqueos antes de reportar archivos, supuestos, puntajes, riesgos y siguiente slice.
```

## 2. Expandir el temario

```text
Activa curriculum-architect. Lee docs/CURRICULUM_MAP.md y docs/PRD.md. Agrega o reorganiza conceptos sin romper la progresión. Para cada cambio declara bloque, nivel, prerrequisitos, objetivo observable, concepto anterior y siguiente, prioridad y tipo de visualización esperada. No conviertas el mapa en una lista enciclopédica. Actualiza documentos dependientes y valida con evals/curriculum_quality_checklist.md.
```

## 3. Crear una ConceptSpec

```text
Activa concept-spec-designer. Crea una ConceptSpec para [concepto] dirigida a [audiencia] con nivel [nivel]. Incluye objetivo, prerrequisitos, definición, intuición, errores comunes, límites, visualSpec, interacción significativa, dataset público versionado o sintético etiquetado y criterio de dominio. Verifica que los datos y el visual permitan generar Aprender, Ejercitar y Enseñar en vivo sin reinterpretar el concepto.

`visualSpec` debe declarar `kind`, mecanismo, estados, marcas con `evidenceId`,
secuencia, movimiento de aproximadamente 600 ms y alternativa equivalente para
`prefers-reduced-motion`.
```

## 4. Diseñar el modo Aprender

```text
Activa learning-module-designer. Usa la ConceptSpec de [concepto]. Diseña una experiencia de [duración] que active conocimiento previo, presente intuición visual, explique por etapas, permita manipular una variable conceptual, compare escenarios, corrija un error común y termine con checkpoint explicado. La interacción no puede limitarse a estilo o color.
```

## 5. Diseñar el modo Ejercitar

```text
Activa practice-exercise-designer. Usa la ConceptSpec y el visual de [concepto]. Crea un ejercicio guiado y otro de transferencia, ambos con protagonista, historia profesional o de negocio, presión realista, decisión y evidencia animada. Incluye respuesta defendible, distractores derivados de errores comunes, pistas graduadas y feedback específico. Comprueba que ambos pierdan sentido si se oculta la visualización o si no se ejecuta la animación.

Cada ejercicio debe incluir `evidenceContract.requiredSteps`,
`requiredEvidenceIds` y `unlockAtStep`.
```

## 6. Preparar Enseñar en vivo

```text
Activa live-teaching-pack-builder. Usa ConceptSpec, LearningModule y PracticeExercise. Crea un LiveTeachingPack con guion, snapshot público real local, fuente, licencia, fecha, SHA-256, demostración, preguntas, evaluación, cierre, blueprint y plan offline. Codex modifica o verifica código reproducible; Gemini y ChatGPT facilitan o revisan la interpretación. Incluye verificación humana, privacidad y aviso de que el modo docente oculto no es autenticación real. No ejecutes IA desde el HTML ni descargues datos durante clase.
```

## 7. Revisar precisión técnica

```text
Activa technical-content-reviewer. Revisa unidad de análisis, variables, tipos, valores, totales, escalas, visualizaciones, métricas, supuestos y conclusiones de todos los artefactos. Detecta causalidad injustificada, leakage, errores temporales y contradicciones entre modos. Reporta severidad, evidencia, impacto y corrección. Bloquea el paquete ante cualquier error crítico.
```

## 8. Ejecutar QA pedagógica

```text
Activa pedagogy-eval-reviewer. Lee docs/EVAL_SUITE.md y evals/. Puntúa alcance, progresión, exactitud, diseño conceptual, visual, práctica, feedback, preparación docente, coherencia, viabilidad y trazabilidad. Cita evidencia por puntaje. Corrige decisiones raíz y repite la evaluación hasta obtener promedio de 4 o más sin dimensiones en 1, o declara No listo.

Antes del cierre activa `interactive-visual-reviewer`: prueba la UI real,
verifica mecanismo, etiquetas, números, `evidenceIds`, secuencia, desbloqueo,
responsive y movimiento reducido. Un cambio de HTML no es evidencia suficiente.
```

## 9. Construir un nivel publicable

```text
Crea un nivel completo de DataClass Forge. Para cada concepto genera ConceptSpec, LearningModule, ejercicios narrativos animados y LiveTeachingPack docente con snapshot público real. Genera manifest y validation, ejecuta todos los evals y publica únicamente si el promedio es 4 o más, ninguna dimensión está en 1, En vivo está oculto por defecto y los snapshots tienen licencia y hash.
```

## 10. Evaluar preparación para código

```text
Revisa IDEA.md, docs/, .agents/skills, manifests y evals/. Confirma conteos, hashes, promedio 4 o más, ausencia de bloqueos y placeholders. Si falla, corrige documentos y paquetes. Si pasa, construye `_site/` y verifica el portal.
```

## 11. Implementar una vertical slice técnica futura

```text
Este prompt solo puede ejecutarse después de aprobación humana explícita. Lee el paquete documental validado de Histograma y construye una experiencia local autocontenida que conserve objetivo, datos, visual, interacción, práctica y feedback. Incluye cambio de bins, comparación de distribuciones y guía docente. No agregues login, backend, LMS, APIs de IA ni catálogo completo. Prueba en desktop y móvil contra los criterios del paquete.
```

## 12. Revisión de sobreingeniería

```text
Revisa todos los documentos y propuestas. Mueve a post-MVP cualquier LMS, autenticación, base de datos, pagos, seguimiento de alumnos, modelo propio, orquestación multiagente o cobertura completa del temario. Mantén la fábrica documental, tres niveles estáticos y publicación automática de resultados validados.
```
