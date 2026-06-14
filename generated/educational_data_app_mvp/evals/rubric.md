# Rubrica local

Evalua cada dimension de 1 a 5.

| Dimension | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Claridad del MVP | No se entiende que construir | Hay idea, pero la slice es difusa | Una pagina estatica de histogramas con bins y narrativa |
| Calidad pedagogica | No hay objetivo educativo | Objetivo presente pero poco medible | Maximo tres problemas educativos y prueba manual |
| Calidad del PRD | Requisitos vagos | Requisitos utiles pero incompletos | Historias, requisitos, metricas y DoD accionables |
| Coherencia del agente | Permite sobreconstruir | Tiene limites parciales | Bloquea codigo prematuro, LMS, login y curso completo |
| Calidad de skills | Genericas | Activadores parciales | Inputs, outputs, activadores y rechazo claros |
| Calidad de evals | Solo revisa formato | Revisa algunos riesgos | Bloquea sobrealcance y falta de vertical slice |
| Simplicidad del arnes | Propone infraestructura | Orquestacion pesada | Manual, auditable y sin runtime |
| Viabilidad tecnica | Requiere backend o dependencias | Construible con dudas | HTML/CSS/JS estatico construible en pocos dias |
| Preparacion para desarrollo | Faltan decisiones | Requiere ajustes | Prompt de construccion listo y especifico |

## Bloqueos automaticos

- No hay vertical slice.
- Se propone login, LMS o curso completo en MVP.
- Hay mas de tres problemas educativos.
- No hay criterios de aceptacion.
- No hay prueba manual.
- Se requieren datos reales de estudiantes.

## Interpretacion

- Promedio menor a 3: no listo.
- Promedio de 3 a 3.9: listo con ajustes.
- Promedio 4 o mayor sin bloqueos: listo para construir vertical slice.

