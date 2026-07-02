# Checklist del pipeline temario → historia → nivel

## Gate curricular

- [ ] La historia cita el nivel exacto de `docs/CURRICULUM_MAP.md`.
- [ ] Todos los conceptos aparecen una vez como objetivo principal y en orden.
- [ ] La narrativa no añade ni adelanta conceptos para resolver el conflicto.
- [ ] La competencia de agentes es auxiliar y no reemplaza ciencia de datos.

## Gate de historia independiente

- [ ] Existe `docs/stories/LEVEL_<N>.md` fuera de `generated/`.
- [ ] La historia se creó antes de la implementación y declara su estado.
- [ ] Solo el estado `aprobada` o `aprobada para implementación` habilita el nivel.
- [ ] Cada escena declara concepto, evidencia, subtítulos e incidente de práctica.
- [ ] Aprender y Ejercitar comparten mundo, pero no incidente, evidencia ni respuesta.
- [ ] Story Bible, arco y ledger no se contradicen.

## Gate de voz y subtítulos

- [ ] Don Juan solo aporta experiencia y conclusiones del negocio en lenguaje simple.
- [ ] Paco suena como hijo, ayudante parcial y estudiante de preparatoria.
- [ ] El narrador introduce todos los nombres y conclusiones técnicas.
- [ ] Cada intervención del narrador se renderiza como subtítulo de alto contraste.
- [ ] El narrador no aparece como personaje, globo o participante del diálogo.
- [ ] El mismo texto está disponible para tecnologías de asistencia.

## Gate de implementación

- [ ] El manifest declara `curriculum_source`, `story_source` y `story_status`.
- [ ] Todas las escenas implementadas apuntan a la historia aprobada y conservan el orden curricular.
- [ ] El estado del dataset evoluciona sin reinicios ni conteos contradictorios.
- [ ] No se registran atributos personales innecesarios.
- [ ] La UI no atribuye definiciones técnicas a Don Juan o Paco.
- [ ] Las prácticas permanecen bloqueadas hasta revelar su evidencia.

## Gate de publicación

- [ ] Pasa `scripts/validate_content.py`.
- [ ] Pasa la QA de navegador, incluidos subtítulos, teclado y movimiento reducido.
- [ ] El promedio de la rúbrica es al menos 4 y ninguna dimensión obtiene 1.
- [ ] `docs/VALIDATION_REPORT.md` registra supuestos, riesgos y siguiente slice.
