# Rubrica de evaluacion

Evalua cada dimension de 1 a 5.

| Dimension | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Claridad del MVP | No se entiende que construir | Hay idea, pero el alcance es difuso | MVP pequeno, concreto y verificable |
| Calidad del PRD | Requisitos vagos o contradictorios | Requisitos utiles pero incompletos | Historias, requisitos y DoD accionables |
| Coherencia del agente | Sin limites claros | Flujo parcial | Reglas claras para inferir, preguntar y detenerse |
| Calidad de skills | Genericas o duplicadas | Utiles pero con activadores debiles | Responsabilidades claras, inputs, outputs y validaciones |
| Calidad de evals | Checklists superficiales | Evalua estructura basica | Detecta fallos reales y sobreingenieria |
| Simplicidad del arnes | Infraestructura innecesaria | Orquestacion algo pesada | Minimo, auditable y suficiente |
| Viabilidad tecnica | No construible | Construible con dudas | Construible en pocos dias |
| Riesgo de sobreingenieria | Alto y no reconocido | Riesgo moderado | Riesgo bajo o mitigado |
| Preparacion para desarrollo | Falta informacion clave | Requiere ajustes | Listo para vertical slice |

## Interpretacion

- Promedio menor a 3: no listo.
- Promedio entre 3 y 3.9: listo solo con ajustes.
- Promedio 4 o mayor: listo para iniciar vertical slice.
- Cualquier dimension con 1 bloquea el inicio de codigo.

## Bloqueos automaticos

Aunque el promedio sea alto, el paquete queda `no listo` si ocurre cualquiera de estos casos:

- No existe vertical slice con entrada, flujo, salida y prueba manual.
- El PRD incluye una funcionalidad marcada como no objetivo.
- El agente puede programar producto antes de validar documentos.
- Una skill no tiene output verificable.
- Las evals no incluyen casos de fallo.
- El arnes requiere infraestructura externa para operar la fase documental.

## Evidencia requerida

Cada puntaje debe citar evidencia concreta:

- Archivo revisado.
- Seccion evaluada.
- Razon del puntaje.
- Correccion requerida si el puntaje es menor que 4.
