# Skill Contracts

## Contrato universal

Toda skill de este repositorio debe cumplir:

- Tener un activador observable.
- Leer al menos un input documentado.
- Producir un output nombrado.
- Declarar que no debe hacer.
- Incluir validaciones que puedan fallar.
- Mantener foco MVP y separar post-MVP.
- Escribir en español claro.

Si una skill no cumple este contrato, debe corregirse antes de usarse.

## `mvp-product-strategist`

**Descripcion:** transforma una idea vaga en un MVP concreto.

**Cuando usar:** al iniciar un proyecto, al cambiar alcance o al detectar una idea demasiado amplia.

**Inputs:** `IDEA.md`, restricciones, inspiraciones, preguntas abiertas.

**Outputs:** supuestos razonables, usuario objetivo, problema, propuesta de valor, alcance MVP, no objetivos, vertical slice, riesgos.

**No debe hacer:** escribir codigo, inventar usuarios multiples sin prioridad, ampliar alcance.

**Validaciones:** usuario claro, problema concreto, resultado observable, no objetivos presentes.

**Ejemplo de uso:** "Con esta idea de dashboard, define el MVP minimo y una vertical slice".

**Fallos comunes:** convertir el MVP en plataforma completa; omitir riesgos; no declarar supuestos.

**Criterios de aceptacion:** el brief permite decidir que construir primero y que dejar fuera.

**Criterios de rechazo:** no hay usuario principal, no hay no objetivos o la vertical slice incluye mas de un flujo central.

## `prd-writer`

**Descripcion:** crea PRDs claros, accionables y orientados a MVP.

**Cuando usar:** despues de definir brief y alcance.

**Inputs:** Product Brief, supuestos, usuario, vertical slice.

**Outputs:** PRD completo, historias de usuario, requisitos funcionales, requisitos no funcionales, metricas, Definition of Done.

**No debe hacer:** agregar funcionalidades post-MVP al alcance MVP.

**Validaciones:** cada requisito se conecta con un caso de uso; las metricas son medibles.

**Ejemplo de uso:** "Crea el PRD para el MVP educativo de histogramas".

**Fallos comunes:** historias vagas; requisitos sin criterio de aceptacion; metricas de vanidad.

**Criterios de aceptacion:** un desarrollador puede estimar la vertical slice sin pedir contexto basico.

**Criterios de rechazo:** requisitos no verificables, metricas vagas o funcionalidades post-MVP mezcladas con MVP.

## `agent-architect`

**Descripcion:** disena el comportamiento del agente principal.

**Cuando usar:** cuando se requiere que Codex, Claude o Cursor sigan un flujo estable.

**Inputs:** PRD, Product Brief, riesgos, restricciones.

**Outputs:** Agent Operating Spec, reglas de inferencia, reglas de preguntas, flujo operativo, limites y guardrails.

**No debe hacer:** crear prompts largos sin estructura ni permitir acciones fuera de alcance.

**Validaciones:** el agente sabe cuando inferir, preguntar, activar skills y detenerse.

**Ejemplo de uso:** "Define como debe operar el agente para generar documentos sin programar producto".

**Fallos comunes:** reglas ambiguas; no definir salida esperada; ignorar human-in-the-loop.

**Criterios de aceptacion:** el agente puede ejecutar el flujo obligatorio sin instrucciones extra.

**Criterios de rechazo:** no define cuando detenerse, no contiene human-in-the-loop o permite codigo prematuro.

## `skill-designer`

**Descripcion:** crea mapas y contratos de skills.

**Cuando usar:** cuando el MVP necesita tareas especializadas o delegables.

**Inputs:** Agent Spec, PRD, documentos objetivo.

**Outputs:** Skill Map, Skill Contracts, inputs/outputs, activadores, validaciones, fallos comunes.

**No debe hacer:** crear skills genericas sin criterio de activacion.

**Validaciones:** cada skill tiene proposito, limites, ejemplos y criterios de aceptacion.

**Ejemplo de uso:** "Disena skills para producto, PRD, evals y QA".

**Fallos comunes:** duplicar responsabilidades; crear demasiadas skills; no definir dependencias.

**Criterios de aceptacion:** el mapa permite enrutar tareas sin confusion.

**Criterios de rechazo:** skills duplicadas, activadores ambiguos o ausencia de criterios de aceptacion.

## `eval-designer`

**Descripcion:** crea evaluaciones y rubricas para revisar calidad.

**Cuando usar:** antes de cerrar documentos o al agregar un nuevo tipo de MVP.

**Inputs:** Docs, riesgos, no objetivos, criterios de exito.

**Outputs:** Eval Suite, casos de prueba, rubricas 1 a 5, checklists, pruebas de regresion.

**No debe hacer:** limitarse a revisar estilo.

**Validaciones:** los evals pueden detectar contradicciones, alcance excesivo y falta de metricas.

**Ejemplo de uso:** "Crea evals para validar que el PRD sea construible".

**Fallos comunes:** checklists faciles de aprobar; casos de fallo inexistentes.

**Criterios de aceptacion:** una salida mala recibe puntuacion baja con razones concretas.

**Criterios de rechazo:** evals puramente estilisticos o sin casos de fallo.

## `harness-designer`

**Descripcion:** disena el arnes minimo para orquestar el flujo.

**Cuando usar:** cuando se define como se ejecutan skills, validaciones y salidas.

**Inputs:** Skill Map, Eval Suite, Agent Spec.

**Outputs:** Harness Spec, routing, permisos, logs, validaciones, reintentos, manejo de errores, human-in-the-loop.

**No debe hacer:** proponer infraestructura compleja sin necesidad.

**Validaciones:** el arnes puede ejecutarse manualmente o con script simple.

**Ejemplo de uso:** "Define un arnes minimo para generar docs desde IDEA.md".

**Fallos comunes:** colas, bases de datos o servicios cuando basta Markdown.

**Criterios de aceptacion:** describe orquestacion suficiente para el MVP y deja fuera lo demas.

**Criterios de rechazo:** requiere base de datos, colas, servicios externos o despliegue para la fase documental.

## `codex-prompt-builder`

**Descripcion:** crea prompts ejecutables para Codex, Claude Code o Cursor.

**Cuando usar:** al preparar tareas por fase, QA, refactor o vertical slice.

**Inputs:** Docs, objetivos, archivos objetivo, restricciones.

**Outputs:** prompts por fase, prompts de QA, prompts de refactor, prompts de vertical slice, prompts de revision.

**No debe hacer:** escribir prompts genericos como "mejora esto".

**Validaciones:** cada prompt incluye contexto, archivos, restricciones, salida esperada y criterio de aceptacion.

**Ejemplo de uso:** "Crea un prompt para revisar sobreingenieria en el PRD".

**Fallos comunes:** pedir demasiadas tareas a la vez; omitir archivos fuente.

**Criterios de aceptacion:** el prompt puede copiarse y ejecutarse sin explicacion adicional.

**Criterios de rechazo:** prompt sin archivos fuente, salida esperada o criterio de aceptacion.

## `qa-reviewer`

**Descripcion:** revisa consistencia y calidad del paquete documental.

**Cuando usar:** al final de cada ciclo o antes de iniciar codigo.

**Inputs:** todos los docs, evals, templates y outputs generados.

**Outputs:** contradicciones, problemas de alcance, metricas faltantes, skills debiles, evals debiles, arnes sobreingenierizado, placeholders vacios.

**No debe hacer:** reescribir todo sin explicar hallazgos.

**Validaciones:** cada hallazgo incluye archivo, problema, impacto y recomendacion.

**Ejemplo de uso:** "Revisa si estos documentos estan listos para desarrollo".

**Fallos comunes:** aprobar sin verificar no objetivos; ignorar vertical slice.

**Criterios de aceptacion:** entrega decision clara: listo, listo con ajustes menores o no listo.

**Criterios de rechazo:** no revisa vertical slice, no identifica impacto o aprueba documentos con placeholders.
