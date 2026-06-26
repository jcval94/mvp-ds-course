# PRD

## Contexto

DataClass Forge es una fábrica documental especializada en material educativo de ciencia de datos. La fase actual define cómo los agentes convierten un concepto curricular en experiencias coherentes y evaluables. No construye todavía la aplicación final.

## Objetivos

- Reducir a menos de 20 minutos la preparación inicial de un paquete educativo revisable.
- Garantizar alineación entre objetivo, visualización, ejercicio, feedback y guía docente.
- Mantener un temario progresivo con prerrequisitos explícitos.
- Producir artefactos reutilizables por Codex, Claude Code, notebooks o una futura web local.
- Detectar contenido superficial, incorrecto o sobreconstruido antes de desarrollo.

## Usuarios

**Principal:** profesor o creador de cursos introductorios e intermedios de ciencia de datos.

**Secundarios:** instructor de talleres, mentor y estudiante autónomo que consume los materiales.

## Casos de uso

1. Convertir un concepto en una explicación visual progresiva.
2. Crear una práctica que exija interpretar evidencia.
3. Preparar una clase en vivo con datos, guion, preguntas y contingencias.
4. Ampliar el temario sin romper prerrequisitos ni criterios pedagógicos.
5. Revisar un paquete generado antes de usarlo o implementarlo.

## Historias de usuario

- Como docente, quiero seleccionar concepto y nivel para recibir una experiencia adecuada a mis estudiantes.
- Como creador de cursos, quiero que cada actividad se conecte con un objetivo para evitar contenido de relleno.
- Como instructor, quiero un guion y un plan offline para impartir la clase sin depender de una herramienta externa.
- Como revisor, quiero criterios de fallo claros para detectar visualizaciones decorativas y ejercicios triviales.
- Como agente, quiero contratos estructurados para producir artefactos consistentes.

## Modos obligatorios

### Aprender

Produce una explicación conceptual visual, breve y progresiva. No resuelve el caso narrativo de práctica ni muestra contenido docente.

### Ejercitar

Produce un caso aplicado distinto de Aprender, con protagonista, presión realista, evidencia visual animada, decisión, pregunta, pistas y feedback específico.

### Enseñar en vivo

Produce un paquete docente oculto por defecto en la UI estudiantil, con guion, snapshot público real, demostración, preguntas, evaluación, plan offline y artefactos copiables. El ocultamiento en estático no se presenta como seguridad real.

## Interfaces documentales

### `ConceptSpec`

- `id` y nombre estable.
- Bloque curricular y nivel.
- Prerrequisitos.
- Objetivo de aprendizaje observable.
- Definición e intuición.
- Errores comunes.
- `visualSpec`: `kind`, mecanismo, elementos, estados, marcas semánticas,
  secuencia, interacción, intención de movimiento, simplificación y alternativa
  para `prefers-reduced-motion`.
- Snapshot público versionado o dataset sintético etiquetado.
- Criterios de dominio y límites del concepto.

### `LearningModule`

- Referencia a `ConceptSpec`.
- Objetivo y duración.
- Activación de conocimiento previo.
- Intuición y visualización principal.
- Explicación por etapas.
- Experimento o control interactivo.
- Error común.
- Mini-checkpoint con respuesta explicada.
- Resumen y transición a práctica.

### `PracticeExercise`

- Referencia a `ConceptSpec`.
- Rol, protagonista, historia, tensión y decisión.
- Evidencia visual animada necesaria.
- `evidenceContract` con pasos requeridos, `evidenceIds` visibles y paso de desbloqueo.
- Secuencia de uno a tres pasos o escenas.
- Pregunta o acción observable.
- Respuesta correcta y distractores plausibles.
- Pistas graduadas.
- Feedback específico por respuesta.
- Conclusión y aprendizaje transferible.

### `LiveTeachingPack`

- Referencia a `ConceptSpec`.
- Objetivo, audiencia y duración.
- Guion minuto a minuto.
- Snapshot público real con esquema, tipos, filas, fuente, licencia, fecha y SHA-256.
- Demostración visual y experimento.
- Preguntas socráticas y errores anticipados.
- Blueprint de notebook o demo HTML.
- Prompts técnicos y docentes copiables.
- Evaluación rápida, cierre y extensión.
- Plan offline y checklists antes/durante la clase.

## Requisitos funcionales

- Leer `IDEA.md` y `docs/CURRICULUM_MAP.md` antes de generar material.
- Seleccionar un solo objetivo principal por paquete.
- Resolver o documentar prerrequisitos.
- Reutilizar una `ConceptSpec` común para los tres modos.
- Preferir snapshots públicos no sensibles con fuente, licencia, fecha y hash.
- Generar datos sintéticos reproducibles y etiquetados cuando no exista una
  fuente pública adecuada o se necesite aislar un mecanismo.
- Usar siempre snapshot público real como fuente principal de `LiveTeachingPack`.
- Exigir visualización para conceptos visualizables.
- Justificar explícitamente cualquier concepto sin visualización.
- Incluir feedback explicativo, no solo correcto/incorrecto.
- Separar contenido de los modos: Aprender enseña, Ejercitar narra y decide, En vivo guía al docente.
- Ocultar `Enseñar en vivo` por defecto en la UI estudiantil y activarlo solo con modo docente.
- Etiquetar supuestos, nivel y limitaciones.
- Validar cada artefacto antes de declararlo listo.
- Ejecutar revisión visual interactiva después de la revisión técnica y antes
  de la evaluación pedagógica final.
- Mantener prompts ejecutables con archivos, restricciones, salida y aceptación.
- Generar dos ejercicios por concepto desde Nivel 2.
- Separar roles en vivo: Codex modifica o verifica código; Gemini o ChatGPT
  facilita, critica e interpreta.
- Publicar únicamente paquetes cuyo `validation.json` esté aprobado.

## Requisitos no funcionales

- Documentos en español claro y Markdown.
- Sin dependencias externas obligatorias en la fase documental.
- Trazabilidad auditable entre todos los artefactos.
- Datasets sin información sensible.
- Material usable en desktop o proyección cuando llegue a implementarse.
- Precisión técnica prioritaria sobre estilo narrativo.

## Temario

El catálogo canónico vive en `docs/CURRICULUM_MAP.md`. Incluye fundamentos de datos, estadística descriptiva, probabilidad, inferencia, relaciones, regresión, clasificación, aprendizaje no supervisado, evaluación de modelos, series de tiempo, experimentación, ética y proyectos.

Los diez conceptos del prototipo existente se mantienen dentro de una progresión más amplia:

- Histograma.
- Correlación.
- Regresión lineal.
- Clasificación.
- Clustering.
- Árbol de decisión.
- Matriz de confusión.
- Outliers.
- Series de tiempo.
- A/B testing.

## Cobertura publicada

**Usuario:** profesor de introducción a ciencia de datos.

**Entrada:** uno de 58 conceptos de Nivel 1, Nivel 2 o Nivel 3, contexto aplicado y
duración de 30 a 90 minutos.

**Cobertura:**

1. Nivel 1 · Fundamentos: 18 conceptos, 18 ejercicios y 54 prompts.
2. Nivel 2 · Descripción y visualización: 21 conceptos, 42 ejercicios y 63 prompts.
3. Nivel 3 · Probabilidad e inferencia: 19 conceptos, 38 ejercicios y 57 prompts.

**Flujo principal:**

1. Leer la `ConceptSpec`, prerrequisitos y procedencia del dataset.
2. Diseñar una visualización con al menos una interacción significativa.
3. Generar Aprender, dos ejercicios desde Nivel 2 y Enseñar en vivo.
4. Ejecutar evals pedagógicos, técnicos, documentales y de datasets.
5. Corregir la decisión raíz si falla algún modo.
6. Construir el catálogo estático desde manifests aprobados.
7. Publicar automáticamente mediante GitHub Actions.

**Salida:** 58 paquetes conceptuales trazables, trece laboratorios, catálogo
estático, snapshots y reportes de validación.

**Prueba manual:** un docente recorre los trece laboratorios, responde los 98
ejercicios usando la evidencia, copia prompts y verifica el plan offline.

**Definition of Done:**

- Existen 58 conceptos, 98 ejercicios y 174 prompts.
- Cada artefacto usa la `ConceptSpec` correspondiente.
- Cada ejercicio depende de evidencia visual.
- Cada ejercicio incluye historia aplicada y animación antes de responder.
- Cada ejercicio permanece bloqueado hasta satisfacer su `evidenceContract`.
- Cada visual usa una gramática adecuada a su mecanismo; compartir renderer
  solo es válido entre conceptos con la misma estructura conceptual.
- Cada distractor tiene feedback específico.
- No hay contradicciones entre objetivo, datos, visual y conclusión.
- Cada concepto obtiene promedio de 4 o más y ninguna dimensión obtiene 1.
- No hay placeholders fuera de templates.
- Cada snapshot público tiene fuente, licencia, fecha, dimensiones y SHA-256.
- Cada paquete En vivo usa snapshot público real y declara que el modo docente oculto no es autenticación.
- GitHub Pages solo incluye manifests con estado `published` y validación aprobada.

**No objetivos:**

- LMS, autenticación, persistencia o backend.
- Integración con APIs de IA desde los HTML.
- Cubrir niveles posteriores al Nivel 3 en esta entrega.
- Evaluación formal o seguimiento del estudiante.

## Funcionalidades post-MVP

- Generador web local.
- Exportación HTML y `.ipynb`.
- Variaciones asistidas por LLM con revisión.
- Importación de datos del docente.
- Biblioteca versionada de paquetes.
- Adaptación por audiencia y duración basada en evidencia de uso.

## Métricas de éxito

- Paquete inicial generado en 20 minutos o menos.
- 100% de campos obligatorios presentes en la vertical slice.
- Promedio de rubrica de 4 o más.
- Al menos 2 de 3 docentes consideran utilizable el paquete con ajustes menores.
- Cero afirmaciones técnicas críticas sin respaldo, supuesto o advertencia.

## Matriz de trazabilidad

| Decisión | Fuente | Artefactos dependientes | Validación |
| --- | --- | --- | --- |
| Usuario docente | `IDEA.md` | Brief, PRD, prompts | Checklist MVP |
| Tres modos | Brief | Agent Spec, Skills, Harness | Eval Suite |
| Temario progresivo | `CURRICULUM_MAP.md` | ConceptSpec, Plan | Rubrica curricular |
| Visual obligatorio | Demos de inspiración y Brief | Skills, ejercicios, evals | Checklist pedagógico |
| Contrato de evidencia | Auditoría visual de junio de 2026 | ConceptSpec, UI, QA y publicación | Revisión visual interactiva |
| Tres niveles publicados | Brief y PRD | Manifests, portal y prompts | Build y prueba manual |
| Snapshots públicos fijos | Solicitud de usuario | Datasets, skills y evals | Hash, licencia y procedencia |
| GitHub Pages automático | Solicitud de usuario | `site/` y workflow | Build en `main` |
| Sin app en fase documental | `AGENTS.md` y PRD | Harness y Plan | Revisión de sobreingeniería |

## Riesgos

- Generalizar el patrón de histograma a conceptos donde no corresponde.
- Confundir narrativa atractiva con aprendizaje verificable.
- Crear demasiados temas con poca profundidad.
- Usar datos o métricas inconsistentes entre modos.
- Generar material técnicamente correcto pero inadecuado para el nivel.

## Preguntas abiertas

- Priorizar HTML, notebook o ambos como primer formato técnico después de validar documentos.
- Elegir el siguiente bloque de referencia según feedback docente de la vertical slice.
