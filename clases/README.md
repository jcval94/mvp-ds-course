# Clases de la Generación 1

`mapa_conceptos.yaml` asigna cada uno de los 236 conceptos de los Niveles 1 a 14
(`generated/*/assets/curriculum.js`) a una clase y una etapa, una sola vez.

- **Ids:** `L<nivel>.<id de la lección>`, porque hay ids repetidos entre niveles
  (`L4.trend` y `L9.trend`, `L2.variance` y `L7.variance`).
- **Etapas:** `antes` (laboratorio previo, solo prerrequisitos), `caso` (se revela
  en el caso principal en Colab, después de la fricción), `error` (caso del costo
  del error, a mano), `taller` (taller con IA), `decision` (Mi decisión),
  `despues` (solo laboratorio) y `autoestudio` (fuera de clase).
- **Reglas:** ningún concepto se usa antes de su clase; la intro animada no nombra
  los conceptos de su caso; la recuperación de la clase N repasa caso y error de
  la clase N−1.
- **Casos por clase:** salen de `docs/ESTRUCTURA_GENERACION_1.md`.

Siguiente paso: un contrato por clase (`clase-NN.yaml`) con esquema en
`schemas/clase.schema.json`, que lean la intro, los cuadernos, el taller y la
plantilla de Mi decisión.
