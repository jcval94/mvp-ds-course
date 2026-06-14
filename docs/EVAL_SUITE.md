# Eval Suite

## Proposito

Validar que el paquete documental convierta una idea vaga en un MVP claro, pequeno, coherente y listo para desarrollo asistido por agentes.

## Como ejecutar la evaluacion

1. Leer `IDEA.md`.
2. Revisar `docs/PRODUCT_BRIEF.md` y `docs/PRD.md`.
3. Completar checklists de MVP, documentos, skills y arnes.
4. Puntuar cada dimension con la rubrica 1 a 5.
5. Revisar regression cases si aplica.
6. Emitir decision: listo, listo con ajustes menores o no listo.

## Condiciones de bloqueo automatico

- No hay vertical slice.
- Hay placeholders fuera de `/templates`.
- El MVP incluye una funcionalidad marcada como no objetivo.
- El arnes requiere infraestructura externa para la fase documental.
- Las skills no tienen activadores o outputs verificables.
- El promedio de rubrica es menor a 4.

## Casos felices

- Idea con usuario y problema claros genera brief, PRD y vertical slice sin preguntas.
- Idea incompleta genera supuestos razonables y preguntas no bloqueantes.
- Idea con alcance amplio se reduce a un flujo principal.

## Casos limite

- Usuario objetivo ambiguo pero inferible.
- Plataforma no definida.
- Inspiraciones contradictorias.
- Restricciones de tiempo muy agresivas.

## Casos de fallo

- No se puede identificar problema ni usuario.
- El agente intenta construir producto antes de documentos.
- El PRD contradice el Product Brief.
- No hay vertical slice.
- Los evals no incluyen casos de fallo.

## Rubrica de evaluacion 1 a 5

| Puntaje | Criterio |
| --- | --- |
| 1 | Confuso, contradictorio o no accionable. |
| 2 | Tiene estructura, pero faltan decisiones clave. |
| 3 | Aceptable, aunque con supuestos debiles o alcance amplio. |
| 4 | Claro, coherente, pequeno y validable. |
| 5 | Excelente: decisiones nitidas, riesgos explicitos, vertical slice lista. |

## Hoja de puntuacion sugerida

| Dimension | Puntaje | Evidencia | Correccion requerida |
| --- | --- | --- | --- |
| Claridad MVP | Registrar 1-5 | Citar seccion evaluada | Indicar ajuste o "sin ajuste" |
| PRD | Registrar 1-5 | Citar seccion evaluada | Indicar ajuste o "sin ajuste" |
| Agente | Registrar 1-5 | Citar seccion evaluada | Indicar ajuste o "sin ajuste" |
| Skills | Registrar 1-5 | Citar seccion evaluada | Indicar ajuste o "sin ajuste" |
| Evals | Registrar 1-5 | Citar seccion evaluada | Indicar ajuste o "sin ajuste" |
| Arnes | Registrar 1-5 | Citar seccion evaluada | Indicar ajuste o "sin ajuste" |
| Prompts | Registrar 1-5 | Citar seccion evaluada | Indicar ajuste o "sin ajuste" |

## Checklist de documentos

- [ ] Cada documento tiene proposito claro.
- [ ] No hay placeholders vacios.
- [ ] Los supuestos se repiten de forma consistente.
- [ ] El PRD refleja el Product Brief.
- [ ] El plan no contradice no objetivos.

## Checklist de MVP

- [ ] Usuario inicial definido.
- [ ] Problema concreto.
- [ ] Resultado observable.
- [ ] Funcionalidad principal unica.
- [ ] Post-MVP separado.
- [ ] Vertical slice construible.

## Checklist de skills

- [ ] Cada skill tiene frontmatter.
- [ ] Cada skill tiene activador claro.
- [ ] Cada skill define inputs y outputs.
- [ ] Cada skill dice que no debe hacer.
- [ ] Hay skill de QA.

## Checklist de arnes

- [ ] Define routing entre skills.
- [ ] Define permisos minimos.
- [ ] Incluye logs y validaciones.
- [ ] Tiene manejo de errores.
- [ ] Mantiene human-in-the-loop.
- [ ] No propone infraestructura innecesaria.

## Pruebas de regresion

Revisar `evals/regression_cases.md` despues de cambios importantes en templates, skills o prompts.

## Ejemplos de outputs buenos

- "El MVP sera una web local que recibe un CSV, calcula prioridad simple y muestra razones por lead. Quedan fuera CRM, login y modelos predictivos."
- "Supuesto: el primer usuario es un coordinador comercial. Si esto cambia, se debe revalidar el PRD."
- "Vertical slice: cargar 10 leads de ejemplo, mostrar top 5 y permitir exportar recomendaciones."

## Ejemplos de outputs malos

- "Construiremos una plataforma integral con IA, dashboard, login, pagos y automatizaciones."
- "El usuario son todas las empresas que quieran mejorar."
- "Metricas: que sea util y bonito."
- "Pendiente completar despues."

## Decision final

- `Listo`: promedio 4 o mayor, sin bloqueos automaticos.
- `Listo con ajustes menores`: promedio 4 o mayor, con problemas de redaccion o precision no bloqueantes.
- `No listo`: cualquier bloqueo automatico o promedio menor a 4.
