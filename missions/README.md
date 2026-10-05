# missions/

Una carpeta por misión con su `mission.yaml` (contrato: `schemas/mission.schema.json`).
`course.yaml` solo lista las misiones; todo su detalle vive aquí.

Una misión une: caso (`casos/`), conceptos, nivel de la fábrica, kit (`kits/`),
video externo y cápsula secundaria (`capsulas/`).

Estados: `draft` → `review` → `ready` → `published`. Solo `ready` y `published`
aparecen en el portal. Una misión `ready` exige caso `approved` y kit existente.

`access: premium` saca la misión del build público aunque esté publicada.
