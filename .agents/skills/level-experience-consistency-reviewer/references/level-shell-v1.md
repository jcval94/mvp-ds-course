# level-shell-v1

| Región | Escritorio | Móvil |
| --- | --- | --- |
| Temas | columna izquierda completa | primera franja horizontal |
| Conceptos | franja superior con nombres | segunda franja horizontal |
| Lección | centro | debajo de las franjas |
| Docente | derecha | debajo del contenido |

Selectores: `[data-level-blocks]`, `[data-level-concepts]`,
`[data-level-content]` y `[data-level-teacher]`. El `body` declara
`data-experience-contract="level-shell-v1"`.

La página conserva `?concept=<id>` y `?teacher=1`. El concepto y bloque activos
usan `aria-current="page"`. Las franjas pueden desplazarse internamente en móvil,
pero la página no puede tener desbordamiento horizontal.
