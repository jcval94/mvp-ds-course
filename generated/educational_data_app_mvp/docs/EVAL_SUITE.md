# Eval Suite

## Proposito

Validar que Histohistorias sea un MVP educativo pequeño, coherente y listo para construir una vertical slice estatica.

## Como ejecutar la evaluacion

1. Leer `IDEA.md`.
2. Revisar `docs/PRODUCT_BRIEF.md` y `docs/PRD.md`.
3. Confirmar maximo tres problemas educativos.
4. Revisar que la vertical slice tenga usuario, entrada, flujo, salida, prueba manual y DoD.
5. Puntuar con `evals/rubric.md`.
6. Revisar checklist de `evals/mvp_quality_checklist.md`.

## Casos felices

- El agente propone una sola pagina estatica con histograma y control de bins.
- El PRD define criterios de aceptacion verificables.
- Los no objetivos bloquean login, LMS y curso completo.

## Casos limite

- El usuario pide cargar datos propios: mover a post-MVP.
- El docente pide modo presentacion: mover a post-MVP.
- El estudiante pide retroalimentacion automatica: mantener solo pregunta de reflexion.

## Casos de fallo

- El MVP incluye curso completo.
- El MVP incluye login o LMS.
- La app usa datos reales de estudiantes.
- No hay prueba manual de aprendizaje.
- La explicacion no menciona que los bins agrupan valores.

## Rubrica de evaluacion 1 a 5

| Puntaje | Criterio |
| --- | --- |
| 1 | No hay MVP claro o incluye plataforma completa. |
| 2 | Hay idea educativa, pero sin vertical slice verificable. |
| 3 | La slice existe, pero faltan criterios o metricas. |
| 4 | MVP claro, pequeño, construible y evaluable manualmente. |
| 5 | Excelente: decisiones pedagogicas, tecnicas y de alcance estan alineadas. |

## Checklist de documentos

- [ ] Brief y PRD tienen el mismo usuario.
- [ ] Maximo tres problemas educativos.
- [ ] No objetivos presentes y respetados.
- [ ] Vertical slice completa.
- [ ] Criterios de aceptacion verificables.
- [ ] Prompts futuros prohiben backend y LMS.

## Checklist de MVP

- [ ] Una sola pantalla o flujo.
- [ ] Dataset incluido.
- [ ] Histograma visible al inicio.
- [ ] Control de bins.
- [ ] Explicacion narrativa.
- [ ] Pregunta de reflexion.
- [ ] Prueba manual de 5 minutos.

## Checklist de skills

- [ ] Skills relevantes activadas.
- [ ] Cada skill tiene output verificable.
- [ ] QA final obligatorio.

## Checklist de arnes

- [ ] Orquestacion manual documentada.
- [ ] Sin infraestructura runtime.
- [ ] Logs definidos como resumen de agente.
- [ ] Bloqueos claros antes de construir.

## Pruebas de regresion

- Si aparece "LMS", "login", "curso completo" o "panel docente" en MVP, reprobar.
- Si no aparece "bins" en criterios de aceptacion, reprobar.
- Si se propone cargar CSV en MVP, reprobar.
- Si no hay metrica de aprendizaje observable, reprobar.

## Ejemplo de output bueno

"La vertical slice es una pagina estatica con 30 calificaciones ficticias, histograma inicial, slider de bins, explicacion breve y pregunta de reflexion."

## Ejemplo de output malo

"Construiremos una plataforma educativa con cursos, usuarios, seguimiento de estudiantes, panel docente y ejercicios adaptativos."

## Decision final

Listo para construir solo si no hay bloqueos automaticos y la rubrica promedio es 4 o mayor.

