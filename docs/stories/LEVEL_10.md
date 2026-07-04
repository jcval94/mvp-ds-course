# Historia Nivel 10: Entregar también el freno

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-10-v1`.
- **Arco:** `docs/LEVEL_10_NARRATIVE_ARC.md`.
- **Entrada/salida:** `L9.4 / G7-local → L10.4 / G7-local`.

No se construye backend. El nivel practica operación mediante snapshots, tableros estáticos, runbooks y simulaciones de incidentes. Don Juan conserva autoridad de negocio; el narrador define términos.

## Escenas aprobadas

| Escena | Concepto | Incidente Aprender | Subtítulo inicial | Subtítulo final | Ejercitar distinto |
| --- | --- | --- | --- | --- | --- |
| `L10-S01` | criterio de aceptación | Revisar gate previo | Un criterio de aceptación fija evidencia mínima antes de operar. | Sin gate aprobado, el procedimiento permanece apagado. | Otro gate falla privacidad. |
| `L10-S02` | baseline | Comparar contra regla sencilla | Un baseline establece referencia explícita de desempeño y costo. | Complejidad solo aporta si mejora una referencia relevante. | Otro baseline gana por estabilidad. |
| `L10-S03` | rollback | Definir condición y estado seguro | Rollback restaura un procedimiento anterior verificable. | Reversibilidad se diseña antes del incidente. | Otra señal activa reversión. |
| `L10-S04` | aprobación humana | Asignar autoridad y evidencia | Aprobación humana requiere rol, información y poder real de detener. | Un clic sin contexto no constituye supervisión. | Otro flujo carece de autoridad. |
| `L10-S05` | data drift | Comparar distribuciones de entrada | Data drift es cambio en entradas respecto de referencia. | Drift no implica automáticamente pérdida de desempeño. | Otra variable cambia de escala. |
| `L10-S06` | performance drift | Seguir error con etiquetas retrasadas | Performance drift es deterioro de resultados medidos. | Sin etiquetas oportunas, desempeño puede conocerse tarde. | Otro indicador usa proxy. |
| `L10-S07` | calibration drift | Comparar score y frecuencia por periodo | Calibration drift rompe correspondencia entre score y frecuencia. | Discriminación estable no garantiza calibración estable. | Otro periodo se vuelve sobreconfiado. |
| `L10-S08` | umbral de alerta | Definir banda, persistencia y escalamiento | Una alerta combina umbral, duración y acción. | Alertar cada variación produce fatiga y oculta incidentes. | Otra banda reduce ruido. |
| `L10-S09` | triage | Clasificar severidad y urgencia | Triage prioriza incidentes por daño, alcance y reversibilidad. | Lo llamativo no siempre es lo más grave. | Otro incidente afecta privacidad. |
| `L10-S10` | impacto | Mapear afectados y consecuencias | Impacto registra quién, qué, cuánto y durante cuánto tiempo. | Promedio global puede ocultar daño concentrado. | Otro mapa incluye terceros. |
| `L10-S11` | rollback operativo | Ejecutar reversión y comprobar | Rollback operativo sigue pasos, responsables y verificación. | Revertir sin comprobar puede conservar el daño. | Otro rollback falla un paso. |
| `L10-S12` | postmortem | Separar causa raíz de culpa | Un postmortem reconstruye hechos, controles y acciones. | Aprender exige corregir sistema, no buscar culpable. | Otro informe omite señales tempranas. |
| `L10-S13` | model card | Resumir uso, límites y evaluación | Una model card documenta propósito, datos, métricas y límites. | Documentar no compensa un sistema inseguro. | Otra tarjeta omite población. |
| `L10-S14` | runbook | Ordenar señales, acciones y escalamiento | Un runbook convierte una condición en pasos verificables. | Un runbook útil incluye detener y pedir ayuda. | Otro runbook no tiene dueño. |
| `L10-S15` | audit log | Encadenar evento, actor y cambio | Un audit log registra qué ocurrió, cuándo, quién y por qué. | Registro sin integridad no permite reconstrucción. | Otro log pierde versión. |
| `L10-S16` | retiro | Desactivar, archivar y comunicar | Retirar elimina uso activo preservando evidencia y obligaciones. | Un sistema sin dueño o beneficio suficiente debe poder apagarse. | Otro retiro olvida dependencias. |

- **Cierre:** el equipo entrega un procedimiento explicable, reversible, monitoreado y retirable; Paco continúa sus estudios y el puesto sigue siendo un solo local.
