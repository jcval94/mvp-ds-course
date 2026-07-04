# Reporte de validación

## Resultado

**Aprobado para publicación.** DataClass Forge publica diez niveles, 43 bloques,
172 conceptos, 326 ejercicios y 516 prompts. Los cuatro snapshots públicos
conservan procedencia, licencia, fecha y SHA-256.

Los Niveles 9 y 10 añaden 33 escenas y 66 ejercicios. En total, los 133 conceptos
continuos de Niveles 3–10 usan `VisualizationSpec`, evidencia bloqueante,
renderers registrados y `level-shell-v1`.

## Cobertura

| Nivel | Conceptos | Ejercicios | Prompts | Estado |
| --- | ---: | ---: | ---: | --- |
| 1–8 | 139 | 260 | 417 | Regresión aprobada |
| 9 · Análisis responsable y reproducible | 17 | 34 | 51 | Aprobado |
| 10 · Operación y monitoreo responsable | 16 | 32 | 48 | Aprobado |
| **Total** | **172** | **326** | **516** | **Continuidad aprobada** |

## Datos nuevos

| Archivo | Dimensiones | Comprobaciones |
| --- | ---: | --- |
| `auditoria_responsable_nivel_9.csv` | 48 × 10 | 12 semanas; celdas ≥25; sin identificadores ni texto libre; denominadores válidos |
| `monitoreo_operativo_nivel_10.csv` | 96 × 14 | 48 referencia + 48 monitoreo; siete etiquetas retrasadas vacías; alerta persistente y detención humana |
| `incidentes_operativos_nivel_10.csv` | 8 × 9 | Revisión humana; cero culpa individual; rollback con comprobación |

Los datos son sintéticos, determinísticos y etiquetados. Rogelio, Chava y sus
revelaciones voluntarias no aparecen en los archivos. Nivel 10 no representa un
backend ni despliegue real.

## Rúbrica

| Dimensión | Puntaje | Evidencia |
| --- | ---: | --- |
| Alcance y currículo | 5 | Diez niveles y 43 bloques en orden canónico |
| Narrativa | 5 | Historias aprobadas, voces y deltas hasta `L10.4` |
| Pedagogía | 5 | Aprender, guiado, transferencia y En vivo por concepto |
| Técnica | 5 | Fórmulas, denominadores, drift, retrasos y rollback validados |
| Visual | 5 | 133 contratos sin fallback y evidencia semántica bloqueante |
| Reproducibilidad | 5 | Semillas, metadata, dimensiones y hashes determinísticos |
| Publicación | 5 | Diez niveles, escritorio/móvil, modo docente y consola limpia |

**Promedio:** 5.0. **Mínimo:** 5. **Bloqueadores:** 0.

## Ejecuciones

- `python -m py_compile ...`: aprobado.
- Generadores de Niveles 9 y 10 ejecutados con salidas determinísticas.
- `python scripts/validate_content.py`: 172 conceptos, 326 ejercicios, 516 prompts y cuatro datasets públicos.
- `python scripts/build_pages.py`: portal de diez niveles y 43 bloques.
- `python scripts/qa_pages.py`: 133 escenas continuas, 266 ejercicios, modo docente, movimiento, móvil y consola limpia.
- Revisión visual: privacidad, evaluación del proyecto, calibration drift, alertas y retiro legibles en escritorio y móvil.

## Supuestos y riesgos residuales

- Audiencia adulta principiante-intermedia; sesiones por bloque en español mexicano.
- Los grupos de Nivel 9 son categorías agregadas y consentidas, no identidades.
- Drift y alertas solo priorizan revisión humana; no prueban fraude, daño o fallo por sí mismos.
- El modo docente oculto no es autenticación.
- La operación de Nivel 10 es una simulación estática; implementar un sistema real requeriría una revisión de seguridad, privacidad y operación separada.

## Próxima vertical slice recomendada

Revisión docente de cierre y publicación: elegir un concepto de Nivel 9 y otro de
Nivel 10, ejecutar sus guiones En vivo con los snapshots públicos, registrar
observaciones y publicar solo si no aparece un bloqueo. No se recomienda abrir un
Nivel 11 antes de validar esa transferencia con docentes.
