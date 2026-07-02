# Historias canónicas por nivel

Esta carpeta contiene una historia independiente por nivel. Su propósito es
separar la decisión narrativa de la implementación educativa y técnica.

## Convención

- `LEVEL_1.md`, `LEVEL_2.md`, ..., `LEVEL_9.md`.
- Cada archivo declara la versión exacta del temario que adapta.
- Cada concepto tiene escena, subtítulos del narrador y continuidad verificable.
- Una historia puede estar en `borrador`, `en revisión` o `aprobada`.
- Solo una historia `aprobada` puede alimentar paquetes o HTML del nivel.

## Orden

```text
docs/CURRICULUM_MAP.md
-> docs/stories/LEVEL_<N>.md
-> ConceptSpec / LearningModule / PracticeExercise
-> generated/<paquete>/
```

Consulta el procedimiento completo en [el pipeline](../pipeline/README.md).

## Historias disponibles

| Nivel | Historia | Estado |
| --- | --- | --- |
| 1 | [Don Juan, Paco y los datos del puesto](LEVEL_1.md) | aprobada |
| 2 | [Lo que cuentan los pedidos](LEVEL_2.md) | aprobada |
