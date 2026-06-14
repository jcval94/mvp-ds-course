# Skill Contracts

## Contrato universal

Cada skill debe:

- Tener activador claro.
- Leer inputs concretos.
- Producir output verificable.
- Mantener foco en una sola leccion interactiva.
- Separar MVP y post-MVP.
- Rechazar sobreingenieria.

## `mvp-product-strategist`

**Descripcion:** reduce la idea educativa a un MVP concreto.

**Cuando usar:** si el alcance incluye curso completo, LMS, multiples temas o funcionalidades no esenciales.

**Inputs:** `IDEA.md`, restricciones, problemas educativos.

**Outputs:** usuario, problema, propuesta de valor, no objetivos, supuestos, vertical slice.

**No debe hacer:** proponer app multiusuario, curso completo, IA generativa o analitica.

**Validaciones:** maximo tres problemas educativos, una sola leccion, una sola vertical slice.

**Ejemplo de uso:** "Reduce Histohistorias a una primera experiencia de 5 minutos".

**Fallos comunes:** agregar demasiadas graficas; convertirlo en plataforma; omitir prueba manual.

**Criterios de aceptacion:** el resultado se puede construir como pagina estatica.

## `prd-writer`

**Descripcion:** convierte el brief en requisitos accionables.

**Cuando usar:** despues de aprobar el alcance de la leccion.

**Inputs:** Product Brief, vertical slice, restricciones.

**Outputs:** PRD, historias, requisitos, metricas, criterios de aceptacion, DoD.

**No debe hacer:** agregar funcionalidades post-MVP al MVP.

**Validaciones:** cada requisito apoya un problema educativo.

**Ejemplo de uso:** "Escribe requisitos para cambiar bins y explicar la grafica".

**Fallos comunes:** requisitos vagos; metricas no observables; no definir prueba manual.

**Criterios de aceptacion:** un agente puede construir la slice sin preguntar por alcance.

## `agent-architect`

**Descripcion:** define el comportamiento del agente documental.

**Cuando usar:** al preparar instrucciones para Codex o Claude.

**Inputs:** Brief, PRD, evals.

**Outputs:** reglas de inferencia, preguntas, limites, salida esperada.

**No debe hacer:** permitir codigo antes de QA.

**Validaciones:** incluye cuando inferir, preguntar, detenerse y activar skills.

**Ejemplo de uso:** "Define como evitar que el agente construya un LMS".

**Fallos comunes:** reglas ambiguas; sin human-in-the-loop.

**Criterios de aceptacion:** el agente mantiene el alcance en una pagina estatica.

## `skill-designer`

**Descripcion:** diseña y ajusta skills del paquete.

**Cuando usar:** si aparecen responsabilidades nuevas o skills ambiguas.

**Inputs:** Agent Spec, PRD, Skill Map.

**Outputs:** mapa y contratos actualizados.

**No debe hacer:** crear skills sin output verificable.

**Validaciones:** activadores, inputs, outputs y criterios de rechazo.

**Ejemplo de uso:** "Revisa si hace falta una skill pedagogica adicional".

**Fallos comunes:** skills duplicadas; skills demasiado generales.

**Criterios de aceptacion:** cada skill tiene una responsabilidad diferenciada.

## `eval-designer`

**Descripcion:** crea evaluaciones para calidad de MVP educativo.

**Cuando usar:** antes de aprobar desarrollo.

**Inputs:** Brief, PRD, riesgos, no objetivos.

**Outputs:** rubrica, checklists, casos felices, limite y fallo.

**No debe hacer:** evaluar solo estilo visual.

**Validaciones:** debe detectar curso completo, LMS, falta de vertical slice y ausencia de metricas.

**Ejemplo de uso:** "Crea una rubrica para saber si el paquete esta listo para app estatica".

**Fallos comunes:** checklists faciles de aprobar; no incluir bloqueos.

**Criterios de aceptacion:** una salida sobreingenierizada falla.

## `harness-designer`

**Descripcion:** define orquestacion documental minima.

**Cuando usar:** cuando se necesita repetir el flujo de idea a docs.

**Inputs:** Skill Map, Eval Suite, Agent Spec.

**Outputs:** Harness Spec con routing, permisos, logs y validaciones.

**No debe hacer:** proponer servidor, base de datos o cola.

**Validaciones:** el arnes se puede ejecutar manualmente.

**Ejemplo de uso:** "Coordina el paso de PRD a QA sin runtime".

**Fallos comunes:** sobreingenieria; falta de criterio de paso.

**Criterios de aceptacion:** define como aprobar o bloquear desarrollo.

## `codex-prompt-builder`

**Descripcion:** crea prompts ejecutables para construir despues la app.

**Cuando usar:** cuando el paquete documental ya esta validado.

**Inputs:** PRD, plan, restricciones, evals.

**Outputs:** prompts de implementacion, QA y reduccion de alcance.

**No debe hacer:** pedir app completa ni backend.

**Validaciones:** cada prompt dice archivos a leer, tarea, restricciones y salida esperada.

**Ejemplo de uso:** "Crea el prompt para construir la vertical slice HTML".

**Fallos comunes:** prompt demasiado amplio; no prohibir dependencias.

**Criterios de aceptacion:** se puede copiar y ejecutar sin contexto adicional.

## `qa-reviewer`

**Descripcion:** revisa consistencia y calidad antes de desarrollo.

**Cuando usar:** al final del paquete documental y antes de construir HTML.

**Inputs:** todos los docs, evals y restricciones.

**Outputs:** decision listo, listo con ajustes menores o no listo.

**No debe hacer:** aprobar si no hay vertical slice.

**Validaciones:** no hay placeholders, el PRD respeta el brief, la rubrica es 4 o mayor.

**Ejemplo de uso:** "Revisa si Histohistorias esta listo para construir la slice".

**Fallos comunes:** ignorar no objetivos; aprobar sin prueba manual.

**Criterios de aceptacion:** entrega hallazgos, riesgos y decision clara.

