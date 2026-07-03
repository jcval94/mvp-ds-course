# Reporte de validación

## Resultado

**Aprobado para publicación.** DataClass Forge publica siete niveles, 31 bloques, 125 conceptos, 232 ejercicios y 375 prompts. Los tres snapshots públicos conservan procedencia, licencia, fecha y SHA-256.

La ampliación añadió 34 escenas y 68 ejercicios: 24 conceptos de evaluación de modelos y 10 de aprendizaje no supervisado. Los siete niveles cumplen `level-shell-v1`; los 86 conceptos continuos de Niveles 3–7 usan `VisualizationSpec` y renderers registrados sin fallback universal.

## Cobertura implementada

| Nivel | Conceptos | Ejercicios | Prompts | Estado narrativo |
| ---: | ---: | ---: | ---: | --- |
| 1 | 18 | 18 | 54 | `L1.4`, `G1` |
| 2 | 21 | 42 | 63 | `L2.4`, `G1` |
| 3 | 19 | 38 | 57 | `L3.5`, `G2-piloto` |
| 4 | 15 | 30 | 45 | `L4.4`, `G3-espera` |
| 5 | 18 | 36 | 54 | `L5.6`, `G4-kiosco` |
| 6 | 24 | 48 | 72 | `L6.6`, `G4-kiosco` |
| 7 | 10 | 20 | 30 | `L7.3`, `G5-servicios` |
| **Total** | **125** | **232** | **375** | Continuidad aprobada |

## Datos nuevos

| Nivel | Artefacto | Dimensiones | Comprobación bloqueante |
| --- | --- | --- | --- |
| 6 | `noches_evaluacion_nivel_6.csv` | 96 × 19 | 48 train, 16 validation, 32 test; test fuera de cuatro folds; costos FP/FN y métricas reproducibles |
| 7 | `noches_segmentos_nivel_7.csv` | 64 × 11 | 60–85 pedidos; máximo dos servicios semanales; cinco variables estandarizadas; cuatro revisiones humanas |

Ambos datasets son sintéticos, determinísticos, etiquetados y no contienen nombres, secretos ni atributos personales. En vivo reutiliza Bike Sharing, Wine Quality y Palmer Penguins.

## Revisión contra evals

| Dimensión | Puntuación | Evidencia |
| --- | ---: | --- |
| Alcance y currículo | 5 | 125 conceptos en orden y puentes declarados |
| Continuidad y voz | 5 | Historias 6–7 aprobadas; Mari revela su meta voluntariamente; Don Juan no usa jerga |
| Pedagogía | 5 | Aprender, guiado y transferencia separados; 68 ejercicios nuevos bloqueados por evidencia |
| Precisión técnica | 5 | Particiones, costos, métricas, k-means, PCA y anomalías reproducibles |
| Visual e interacción | 5 | 34 kinds nuevos con marcas, estados y movimiento reducido |
| Consistencia | 5 | Siete manifests `level-shell-v1`, escritorio y móvil sin overflow |
| Datos y procedencia | 5 | Semillas, periodos, dimensiones, fórmulas y SHA-256 |
| Publicación | 5 | Build de siete niveles, 31 rutas y modo docente oculto |

- **Promedio:** 5.0.
- **Dimensión mínima:** 5.
- **Dimensiones en 1:** ninguna.
- **Bloqueadores:** ninguno.

## Evidencia ejecutada

- `python -m py_compile`: generadores, fábrica, build, validación y QA sin errores.
- `python scripts/validate_content.py`: 125 conceptos, 232 ejercicios, 375 prompts y tres datasets públicos.
- `python scripts/build_pages.py`: portal de siete niveles y 31 bloques.
- `python scripts/qa_pages.py`: 86 escenas continuas, 172 ejercicios, modo docente, movimiento, móvil y consola limpia.
- Validación visual representativa: FN, calibración, k-means y umbral de anomalía en escritorio; costo de umbral y anomalías en móvil.

## Supuestos y riesgos residuales

- Los costos de 22 MXN por pedido no atendido y 110 MXN por kg de merma son supuestos narrativos, no contabilidad real.
- El test de Nivel 6 queda inválido si se usa para seleccionar una alternativa futura.
- Los clusters dependen de escala y variables; no representan tipos naturales.
- Las anomalías solo priorizan revisión humana; no prueban fraude, error ni intención.
- `?teacher=1` oculta contenido por conveniencia y no constituye autenticación.

## Próxima vertical slice recomendada

- **Usuario:** creador de cursos.
- **Entrada:** `L7.3`, 64 noches operativas y piloto `G5-servicios`.
- **Flujo principal:** aprobar historia de Nivel 8 → congelar cortes temporales → construir ventanas y backtesting → diseñar experimento con guardrails → validar.
- **Salida:** Nivel 8 completo de series de tiempo y experimentación reproducible.
- **Prueba manual:** mover el corte temporal y comprobar que ninguna variable futura entra a entrenamiento o decisión.
- **Definition of Done:** ventanas trazables, leakage temporal bloqueado, efectos y guardrails diferenciados, promedio ≥4 y QA limpia.
- **No objetivos:** atribuir causalidad sin diseño, ampliar automáticamente el puesto, backend, cuentas o LMS.
