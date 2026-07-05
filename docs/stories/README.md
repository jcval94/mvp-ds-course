# Historias canónicas por nivel

Esta carpeta contiene una historia independiente por nivel. Su propósito es
separar la decisión narrativa de la implementación educativa y técnica.

## Convención

- `LEVEL_1.md`, `LEVEL_2.md`, ..., `LEVEL_12.md`.
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
| 3 | [El piloto y la incertidumbre](LEVEL_3.md) | aprobada |
| 4 | [Lo que se mueve junto](LEVEL_4.md) | aprobada |
| 5 | [Los clientes que se multiplicaban](LEVEL_5.md) | aprobada para implementación parcial |
| 6 | [Anticipar sin adivinar](LEVEL_6.md) | aprobada |
| 7 | [Abrir el sobre una sola vez](LEVEL_7.md) | aprobada |
| 8 | [Patrones que todavía son preguntas](LEVEL_8.md) | aprobada |
| 9 | [El calendario y la prueba justa](LEVEL_9.md) | aprobada |
| 10 | [Antes de entregar, mirar a quién toca](LEVEL_10.md) | aprobada |
| 11 | [La máquina que solo funcionaba con Paco](LEVEL_11.md) | aprobada para implementación parcial |
| 12 | [Entregar también el freno](LEVEL_12.md) | aprobada |
