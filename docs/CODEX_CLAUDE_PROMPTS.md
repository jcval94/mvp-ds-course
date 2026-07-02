# Codex y Claude Code Prompts

## 1. Generar un paquete educativo

```text
Lee AGENTS.md, IDEA.md, docs/PRODUCT_BRIEF.md, docs/PRD.md y
docs/CURRICULUM_MAP.md. Usa las skills de .agents/skills. Para el concepto
solicitado, define nivel, prerrequisitos y un objetivo observable; crea
ConceptSpec, LearningModule, dos PracticeExercise desde Nivel 2 y
LiveTeachingPack. Si pertenece a una ruta continua, carga Story Bible, arco y
ledger, genera episodios distintos por modo y ejecuta QA narrativa antes del
cierre. Prefiere snapshots públicos con licencia, fecha y hash; En vivo siempre
usa snapshot real como fuente principal. Valida con docs/EVAL_SUITE.md y evals/.
Corrige bloqueos antes de reportar archivos, supuestos, puntajes, riesgos y siguiente slice.
```

## 2. Expandir el temario

```text
Activa curriculum-architect. Lee docs/CURRICULUM_MAP.md y docs/PRD.md. Agrega o reorganiza conceptos sin romper la progresión. Para cada cambio declara bloque, nivel, prerrequisitos, objetivo observable, concepto anterior y siguiente, prioridad y tipo de visualización esperada. No conviertas el mapa en una lista enciclopédica. Actualiza documentos dependientes y valida con evals/curriculum_quality_checklist.md.
```

## 2A. Diseñar una ruta narrativa continua

```text
Activa course-narrative-architect. Lee IDEA.md, docs/CURRICULUM_MAP.md,
docs/COURSE_STORY_BIBLE.md y docs/CONTINUITY_LEDGER.md. Diseña el arco de
[nivel] con un objetivo principal de ciencia de datos y como máximo una
competencia auxiliar de agentes por episodio. Conserva a Don Juan y Paco como
padre e hijo; Paco estudia preparatoria y Don Juan solo habla del negocio en
lenguaje simple. El narrador introduce y concluye datos. Mantén matrices
incrementales de relaciones, secretos y crecimiento. Incorpora invitados solo
por necesidad del dominio y entrega estado previo, conflicto, evidencia,
decisión, resolución, continuityDelta, dataStateDelta, growthDelta y puente.
Bloquea voz impropia, conocimiento prematuro, secreto inferido o crecimiento sin condición.
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
Activa learning-module-designer. Usa la ConceptSpec de [concepto] y, cuando
aplique, episodio, Story Bible y ledger. Diseña una experiencia de [duración]
que active conocimiento previo, presente intuición visual, explique por etapas,
permita manipular una variable conceptual, compare escenarios, corrija un error
común y termine con checkpoint explicado. Respeta voces, asigna la precisión al
narrador, registra deltas y reserva un incidente nuevo para Ejercitar.
```

## 5. Diseñar el modo Ejercitar

```text
Activa practice-exercise-designer. Usa la ConceptSpec y el visual de [concepto].
Si existe continuidad, carga Story Bible, arco y ledger después de Aprender.
Crea un incidente nuevo con protagonista, presión realista, decisión y evidencia
animada; desde Nivel 2 añade ejercicio guiado y transferencia. Incluye respuesta
defendible, distractores derivados de errores comunes, pistas, feedback y
deltas. Comprueba que pierda sentido sin el visual y que no repita el caso de Aprender.

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

## 7A. Revisar continuidad narrativa

```text
Activa narrative-continuity-reviewer. Lee Story Bible, CharacterCards, arco,
ledger previo, ConceptSpec y episodios. Ejecuta la prueba de voz ciega; verifica
conocimiento adquirido, autoridad de invitados, cronología, humor, versiones,
conteos, relación padre-hijo, estado de secretos, crecimiento y separación entre
Aprender y Ejercitar. Reporta severidad, evidencia, regla rota, impacto y
corrección raíz. Aprueba continuityDelta, dataStateDelta y growthDelta solo
cuando no haya bloqueos.
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
Revisa todos los documentos y propuestas. Mueve a post-MVP cualquier LMS, autenticación, base de datos, pagos, seguimiento de alumnos, modelo propio, orquestación multiagente o cobertura completa del temario. Mantén la fábrica documental, cinco niveles estáticos y publicación automática de resultados validados.
```
