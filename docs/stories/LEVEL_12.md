# Historia Nivel 12: Entregar también el freno

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-12-v1`.
- **Arco:** `docs/LEVEL_12_NARRATIVE_ARC.md`.
- **Entrada/salida:** `producto_operable@L11.H1 / G7-local → L12.4 / G7-local`.
- **Periodo:** 22 de enero a 26 de abril de 2028.

El producto ya fue construido y entregado por Nivel 11. Aquí no se crea API,
contenedor, CI/CD ni despliegue: se decide si operar y se practican observación,
contención, rollback, auditoría y retiro mediante snapshots y simulaciones. Don
Juan conserva autoridad de negocio; el narrador define términos.

## Escenas aprobadas

| Escena | Concepto | Incidente Aprender | Subtítulo inicial | Subtítulo final | Ejercitar distinto |
| --- | --- | --- | --- | --- | --- |
| `L12-S01` | readiness operativo | Revisar artifact, baseline, privacidad, autoridad y reversibilidad | Readiness operativo contrasta evidencia actual antes de activar un producto ya construido. | Si falta una condición operativa, el procedimiento permanece apagado. | Otro gate falla privacidad aunque el build esté verde. |
| `L12-S02` | baseline | Comparar contra regla sencilla | Un baseline establece referencia explícita de desempeño y costo. | Complejidad solo aporta si mejora una referencia relevante. | Otro baseline gana por estabilidad. |
| `L12-S03` | rollback | Definir condición y estado seguro | Rollback restaura un procedimiento anterior verificable. | Reversibilidad se diseña antes del incidente. | Otra señal activa reversión. |
| `L12-S04` | aprobación humana | Asignar autoridad y evidencia | Aprobación humana requiere rol, información y poder real de detener. | Un clic sin contexto no constituye supervisión. | Otro flujo carece de autoridad. |
| `L12-S05` | data drift | Comparar distribuciones de entrada | Data drift es cambio en entradas respecto de referencia. | Drift no implica automáticamente pérdida de desempeño. | Otra variable cambia de escala. |
| `L12-S06` | performance drift | Seguir error con etiquetas retrasadas | Performance drift es deterioro de resultados medidos. | Sin etiquetas oportunas, desempeño puede conocerse tarde. | Otro indicador usa proxy. |
| `L12-S07` | calibration drift | Comparar score y frecuencia por periodo | Calibration drift rompe correspondencia entre score y frecuencia. | Discriminación estable no garantiza calibración estable. | Otro periodo se vuelve sobreconfiado. |
| `L12-S08` | umbral de alerta | Definir banda, persistencia y escalamiento | Una alerta combina umbral, duración y acción. | Alertar cada variación produce fatiga y oculta incidentes. | Otra banda reduce ruido. |
| `L12-S09` | triage | Clasificar severidad y urgencia | Triage prioriza incidentes por daño, alcance y reversibilidad. | Lo llamativo no siempre es lo más grave. | Otro incidente afecta privacidad. |
| `L12-S10` | impacto | Mapear afectados y consecuencias | Impacto registra quién, qué, cuánto y durante cuánto tiempo. | Promedio global puede ocultar daño concentrado. | Otro mapa incluye terceros. |
| `L12-S11` | rollback operativo | Ejecutar reversión y comprobar | Rollback operativo sigue pasos, responsables y verificación. | Revertir sin comprobar puede conservar el daño. | Otro rollback falla un paso. |
| `L12-S12` | postmortem | Separar causa raíz de culpa | Un postmortem reconstruye hechos, controles y acciones. | Aprender exige corregir sistema, no buscar culpable. | Otro informe omite señales tempranas. |
| `L12-S13` | model card | Resumir uso, límites y evaluación | Una model card documenta propósito, datos, métricas y límites. | Documentar no compensa un sistema inseguro. | Otra tarjeta omite población. |
| `L12-S14` | runbook | Ordenar señales, acciones y escalamiento | Un runbook convierte una condición en pasos verificables. | Un runbook útil incluye detener y pedir ayuda. | Otro runbook no tiene dueño. |
| `L12-S15` | audit log | Encadenar evento, actor y cambio | Un audit log registra qué ocurrió, cuándo, quién y por qué. | Registro sin integridad no permite reconstrucción. | Otro log pierde versión. |
| `L12-S16` | retiro | Desactivar, archivar y comunicar | Retirar elimina uso activo preservando evidencia y obligaciones. | Un sistema sin dueño o beneficio suficiente debe poder apagarse. | Otro retiro olvida dependencias. |

- **Cierre:** el equipo entrega un procedimiento explicable, reversible, monitoreado y retirable; Paco continúa sus estudios y el puesto sigue siendo un solo local.
