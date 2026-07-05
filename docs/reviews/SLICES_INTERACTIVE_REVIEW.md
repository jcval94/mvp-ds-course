# Revisión interactiva · Slices Niveles 5 y 11

- **Entorno:** navegador integrado, escritorio y 390 × 844.
- **Decisión:** pasa con limitación menor en emulación de movimiento reducido.

| Control | Nivel 5 | Nivel 11 |
| --- | --- | --- |
| `level-shell-v1` | Sí | Sí |
| Renderer | `join-row-explosion` | `notebook-pipeline-contract` |
| Estados | 7/7 | 8/8 |
| Guiado bloqueado hasta | paso 5 | paso 6 |
| Transferencia bloqueada hasta | paso 7 | paso 8 |
| Evidence IDs visibles | uno único por estado | uno único por estado |
| En vivo oculto | Sí; visible solo con `?teacher=1` | Sí; visible solo con `?teacher=1` |
| Overflow móvil | No | No |
| Consola | Sin errores/warnings | Sin errores/warnings |

El navegador disponible reporta `prefers-reduced-motion=false` y no expone una
capacidad para cambiarlo. La equivalencia se verificó por código: la aplicación
usa los mismos estados, valores, marcas y desbloqueos; la media query solo elimina
transiciones. Se mantiene puntaje visual 4 hasta ejecutar la emulación oficial.
