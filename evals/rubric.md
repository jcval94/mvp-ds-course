# Rubrica de evaluación

Evalúa cada dimensión de 1 a 5 y cita evidencia.

| Dimensión | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Claridad del MVP | No se entiende qué genera | Hay salidas, pero el alcance es amplio | Fábrica educativa concreta con slice verificable |
| Progresión curricular | Omite prerrequisitos | Secuencia usable con huecos | Nivel, prerrequisitos y conexiones explícitas |
| Exactitud técnica | Contiene errores | Correcto con ambigüedades | Preciso, consistente y con límites claros |
| Diseño conceptual | Solo definición | Incluye intuición parcial | Objetivo, intuición, errores y dominio coherentes |
| Calidad visual | Decorativo o engañoso | Representa el resultado | Revela el mecanismo mediante interacción |
| Calidad de práctica | Quiz de memoria | Aplica parcialmente el concepto | Exige interpretar evidencia y transferir |
| Calidad del feedback | Solo correcto/incorrecto | Explica la respuesta correcta | Corrige cada razonamiento plausible |
| Preparación docente | No impartible | Requiere completar partes | Guion, datos, evaluación y plan offline listos |
| Coherencia entre modos | Se contradicen | Comparten tema, no decisiones | Comparten ConceptSpec, datos y criterio de dominio |
| Skills y harness | Genéricos o pesados | Funcionan con dudas | Routing mínimo, contratos verificables y QA |
| Viabilidad | Requiere plataforma completa | Construible con riesgo | Validable documentalmente y slice pequeña |
| Trazabilidad | Decisiones aisladas | Conexiones parciales | IDEA -> currículo -> artefactos -> evals -> plan |
| Procedencia de datos | Fuente o licencia ausente | Fuente presente, trazabilidad parcial | Snapshot, licencia, cita, fecha y hash verificables |
| Publicación | Publica borradores | Gate manual incompleto | Build automático publica solo manifests aprobados |

## Interpretación

- Promedio menor a 3: no listo.
- Promedio entre 3 y 3.9: requiere correcciones.
- Promedio de 4 o más: candidato a `Listo`.
- Cualquier dimensión en 1 bloquea.

## Bloqueos automáticos

- No existe vertical slice con usuario, entrada, flujo, salida, prueba manual, DoD y no objetivos.
- Concepto visualizable sin visual.
- Ejercicio respondible sin evidencia.
- Feedback no explicativo.
- Error técnico o causalidad injustificada.
- Prerrequisito crítico omitido.
- Contradicción entre modos.
- Plan que inicia app antes de validar documentos.
- Placeholder fuera de `/templates`.
- Snapshot público sin licencia o hash válido.
- Manifest publicado con validación fallida.

## Evidencia requerida

Cada puntaje debe registrar:

- archivo y sección;
- razón;
- impacto;
- corrección si es menor a 4.
