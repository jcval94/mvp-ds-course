---
name: concept-spec-designer
description: Crea o corrige ConceptSpecs para conceptos de ciencia de datos con objetivo, prerrequisitos, intuición, errores, visualización, interacción, dataset y criterio de dominio. Usar antes de generar módulos, ejercicios o clases para un concepto nuevo o modificado.
---

# Concept Spec Designer

1. Partir de la decisión curricular y un solo objetivo observable.
2. Definir el concepto con lenguaje adecuado al nivel.
3. Separar definición, intuición y límites.
4. Registrar errores comunes plausibles.
5. Diseñar `visualSpec`: `kind`, mecanismo, representación, elementos, estados,
   marcas con `evidenceId`, secuencia, interacción, movimiento, simplificación
   y alternativa para `prefers-reduced-motion`.
6. Preferir un snapshot público reproducible con fuente, licencia, fecha y
   SHA-256; usar un dataset sintético etiquetado cuando no exista una fuente
   adecuada o se necesite aislar el mecanismo.
7. Definir criterio de dominio y afirmaciones que no deben hacerse.

La salida debe permitir generar los tres modos sin reinterpretar el concepto.

Bloquear si falta visual para un concepto visualizable, si la analogía
contradice la definición, si los datos no sustentan la conclusión o si un
snapshot público carece de licencia o procedencia verificable.
Bloquear también si el renderer propuesto no corresponde al mecanismo o si no
puede identificarse qué evidencia visible sostendrá cada ejercicio.
