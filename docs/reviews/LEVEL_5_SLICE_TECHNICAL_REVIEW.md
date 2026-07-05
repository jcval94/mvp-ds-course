# Revisión técnica · Slice Nivel 5

- **Decisión:** pasa.
- **Bloqueos:** ninguno.

| Comprobación | Evidencia | Resultado |
| --- | --- | --- |
| Unidad | Cierres: una noche; turnos: turno-noche; eventos: etiqueta-noche | Correcta |
| Llaves | `fecha` única en cierres; FK válida desde 8 turnos y 8 eventos | Correcta |
| Cardinalidad | El detalle de ambos lados crea N:M por fecha | Correcta |
| Aprender | 2026-11-14: 2 × 2 = 4 filas, 1 noche, $19,200 ingenuos, $4,800 correctos | Recalculada |
| Guiado | 2026-11-07: 1 × 2 = 2 filas, $7,200 ingenuos, $3,600 correctos | Recalculada |
| Transferencia | 2026-11-08: 2 × 1 = 2 filas, $7,800 ingenuos, $3,900 correctos | Recalculada |
| Leakage/causalidad | No usa futuro ni atribuye crecimiento | Correcta |
| Procedencia | Tres CSV sintéticos etiquetados, dimensiones y SHA-256 en metadata | Correcta |

La corrección raíz es preagregar cada tabla de detalle a una fila por noche o
cambiar explícitamente la unidad/llave. Borrar filas o cambiar `INNER/LEFT` no
resuelve por sí mismo la cardinalidad.
