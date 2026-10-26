# CLAUDE.md

> Agentes colaboradores: lean primero `docs/agents/COLABORADOR.md`.

## Misión

Ayudar a construir y operar **The Agentic Data Scientist**, el curso de ciencia
de datos e IA de Augmented Learning Labs: portal, área del alumno, casos reales
con intro y cuaderno, y la biblioteca de laboratorios por nivel. La fábrica de
niveles es la herramienta interna que produce esa biblioteca.

## Reglas para todo el repositorio

- Lee `AGENTS.md` (reglas generales y qué flujo aplica según la tarea) y el
  `AGENTS.md` de la carpeta que vayas a editar.
- Antes de cerrar, ejecuta `python -m harness all`.
- Repositorio público: nunca escribas respuestas de retos, rúbricas, detalles del
  backend privado, datos de alumnos ni credenciales.
- `generated/` no se edita a mano; el material docente no entra a `dist/`.
- Mantén outputs en español.
- Textos visibles, precios, fechas, acceso gratis o de pago, estilo visual y
  esquema de la base los decide el autor.

## Casos, misiones, cuadernos y clases

- Lee `docs/CRITERIO_PRIMERO.md`: criterio antes que herramienta, la herramienta
  llega cuando el caso la pide y todo trabajo con IA sigue Delegar · Verificar ·
  Firmar.
- Usa `docs/ESTRUCTURA_GENERACION_1.md` para saber qué caso va en cada clase.
- Para intros y cuadernos, usa las skills `tads-*` disponibles.
- Etiqueta cualquier dato simulado; los hechos históricos llevan fuente.

## Niveles de la biblioteca (fábrica)

Solo al crear o modificar un nivel:

- Consulta `IDEA.md`, `docs/CURRICULUM_MAP.md` y `docs/pipeline/README.md`.
- Usa `.agents/skills` según el artefacto y valida contra `evals/`.
- Declara nivel, prerrequisitos, objetivo y supuestos.
- Prefiere snapshots públicos no sensibles con licencia, fecha y hash; etiqueta
  cualquier dato sintético.
- Exige que la visualización represente el mecanismo y que el ejercicio dependa
  de evidencia. Desde el Nivel 2, ejercicio guiado y de transferencia.
- Separa revisión técnica de revisión pedagógica y reduce cada pieza a un
  objetivo principal.

### Flujo de un nivel

1. Encuadrar usuario, concepto y nivel.
2. Ubicar el concepto en el mapa curricular.
3. Crear o validar `ConceptSpec`.
4. Generar Aprender, Ejercitar y Enseñar en vivo.
5. Revisar datos, métricas y conclusiones.
6. Ejecutar todos los evals.
7. Corregir decisiones raíz.
8. Reportar artefactos, supuestos, riesgos y siguiente slice.

### Criterios de calidad

- Objetivo observable y prerrequisitos explícitos.
- Intuición antes de formalismo para principiantes.
- Hábito de criterio declarado y apuesta del estudiante antes de la herramienta.
- Línea base simple antes de cualquier modelo.
- Interacción significativa, distractores plausibles y feedback específico.
- Guion y plan offline en el material docente.
- Coherencia entre modos.
- Promedio de 4 o más y ninguna dimensión en 1.

## Bloqueos

- Error técnico.
- Visualización engañosa.
- Causalidad injustificada.
- Ejercicio de memoria desconectado del visual.
- Caso que nombra su herramienta antes de la apuesta del estudiante.
- Modelo predictivo sin línea base simple.
- Decisión atribuida a una IA sin firma de una persona.
- Datos inconsistentes.
- Placeholder fuera de templates.
- Información privada o de calificación en el repositorio público.

## Cierre

Reporta archivos modificados, validaciones, supuestos, riesgos y lo que queda
para decisión del autor.
