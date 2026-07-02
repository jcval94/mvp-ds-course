# Paquete: Tipos de variables

## Trazabilidad

- **Currículo:** `docs/CURRICULUM_MAP.md`, Nivel 1.
- **Historia aprobada:** `docs/stories/LEVEL_1.md`, escenas `L1-S06` a `L1-S10`.
- **Estado narrativo:** `pedidos_crudos@L1.1` → `esquema@L1.2`.
- **Competencia auxiliar:** esquema y diccionario de datos.

## ConceptSpec

- **Objetivo:** clasificar variables por significado y elegir operaciones compatibles.
- **Prerrequisitos:** observación, variable y tabla.
- **Conceptos en orden:** numérica, categórica, ordinal, fecha y texto.
- **Variables:** `num_tacos`, `tipo_taco`, `nivel_salsa`, `fecha_hora`, `comentario` y `pedido_id` como identificador.
- **VisualSpec:** clasificar tarjetas, ordenar intensidades, colocar tickets en
  una línea temporal y conservar notas originales antes de transformarlas.
- **Error central:** decidir el tipo por apariencia en vez de significado.
- **Criterio de dominio:** justificar una operación permitida y una engañosa por variable.

## LearningModule

Paco intenta explicar la tabla después de su clase de IA. Don Juan cuestiona
para qué sirve cada columna sin utilizar terminología técnica.

1. El narrador distingue cantidad numérica de identificador.
2. `tipo_taco` se presenta como variable categórica.
3. `nivel_salsa` se ordena sin inventar distancias.
4. `fecha_hora` se diferencia de la etiqueta “Lunes”.
5. `comentario` se conserva como texto libre.

Paco construye un esquema con significado, tipo, valores permitidos, posibilidad
de vacío y validación. El esquema aporta contexto a un agente, pero no vuelve
correcta su respuesta automáticamente.

## PracticeExercise

**Regla de separación:** un proveedor entrega un catálogo nuevo; no se reutiliza
la discusión inicial de la tabla.

**Incidentes:** códigos numéricos que son IDs, variantes de `Pastor`, niveles de
salsa, fechas ambiguas y notas libres de entrega.

**Evidencia:** la animación mueve cada tarjeta hacia el tipo compatible y muestra
la operación que sí conserva significado.

**Decisión:** completar el esquema antes de pedir ayuda a una herramienta.

**Feedback:** rechaza promediar IDs, restar etiquetas, asignar proporciones a
ordinales, ordenar formatos ambiguos o tratar frases como categorías limpias.

## LiveTeachingPack

- **Visibilidad:** visible temporalmente en Nivel 1 para revisión docente.
- **Duración:** 75 minutos.
- **Dataset real:** Palmer Penguins, 344 filas y 8 columnas.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/
- **Licencia:** CC0-1.0.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Evaluación rápida:** clasificar variables y justificar operaciones compatibles.
- **Plan offline:** tarjetas impresas de variables y operaciones.

## Supuestos y límites

- “Lunes” se trata como categoría derivada; no sustituye una fecha completa.
- El texto no se interpreta automáticamente como intención del cliente.
- El esquema no concede a Don Juan conocimientos de datos ni delega decisiones a la IA.
