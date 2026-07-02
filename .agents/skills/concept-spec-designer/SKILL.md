---
name: concept-spec-designer
description: Crea o corrige ConceptSpecs para conceptos de ciencia de datos con objetivo, prerrequisitos, intuición, errores, visualización, interacción, dataset, historia de nivel aprobada y criterio de dominio. Usar antes de generar módulos, ejercicios o clases para un concepto nuevo o modificado.
---

# Concept Spec Designer

1. Partir de la decisión curricular y un solo objetivo observable.
2. Cuando exista continuidad, cargar la `LevelStory` aprobada, escena, Story
   Bible y estado canónico del dataset. No derivar la historia desde el HTML.
3. Definir el concepto con lenguaje adecuado al nivel y separar definición, intuición y límites.
4. Registrar errores comunes plausibles.
5. Diseñar `visualSpec`: `kind`, mecanismo, representación, elementos, estados,
   marcas con `evidenceId`, secuencia, interacción, movimiento, simplificación y
   alternativa para `prefers-reduced-motion`.
6. Declarar dataset, unidad de análisis, versión narrativa y transformaciones;
   preferir snapshot público reproducible o sintético etiquetado según el modo.
7. Registrar `curriculumSource`, `storySource`, escena, subtítulos del narrador,
   competencia auxiliar de agentes, criterio de dominio y afirmaciones prohibidas.

La salida debe permitir generar los tres modos sin reinterpretar concepto,
canon, escena, subtítulos ni estado de datos.

Bloquear si la historia no existe o no está aprobada; falta visual; la analogía
contradice la definición; el dataset no coincide con el ledger; los datos no
sustentan la conclusión; el renderer no representa el mecanismo o no puede
identificarse la evidencia visible.
