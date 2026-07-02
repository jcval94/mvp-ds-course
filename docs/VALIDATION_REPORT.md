# Reporte de validación

## Resultado

**Aprobado para publicación.** DataClass Forge publica cinco niveles, veintidós bloques, 91 conceptos, 164 ejercicios y 273 prompts. Los tres snapshots públicos conservan procedencia, licencia, fecha y SHA-256.

La entrega añadió o reformuló 52 escenas de Niveles 3–5 y 104 ejercicios asociados: `19×2 + 15×2 + 18×2`. El valor “106” del plan era incompatible con el total final de 164; se preservó el total curricular aprobado.

La reconstrucción visual asigna 52 `VisualizationSpec` distintos a 52 conceptos,
los renderiza mediante el registro cerrado `educational-svg-v1` y elimina el
renderer universal de barras. Los cinco niveles cumplen `level-shell-v1`:
temas a la izquierda, conceptos nombrados arriba y modo docente oculto.

## Cobertura implementada

| Nivel | Conceptos | Ejercicios | Prompts | Estado narrativo |
| ---: | ---: | ---: | ---: | --- |
| 1 | 18 | 18 | 54 | `L1.4`, puesto `G1` |
| 2 | 21 | 42 | 63 | `L2.4`, puesto `G1` |
| 3 | 19 | 38 | 57 | `L3.5`, puesto `G2-piloto` |
| 4 | 15 | 30 | 45 | `L4.4`, puesto `G3-espera` |
| 5 | 18 | 36 | 54 | `L5.6`, puesto `G4-kiosco` |
| **Total** | **91** | **164** | **273** | Continuidad aprobada |

## Datos narrativos

| Nivel | Artefacto | Dimensiones y periodo | Comprobación bloqueante |
| --- | --- | --- | --- |
| 3 | pedidos y resumen de noches del piloto | 1,360 × 12 y 32 × 9; 2026-07-02 a 2026-08-23 | 35–50 pedidos, cada conteo dos veces; ocho encargos planeados |
| 4 | noches con contexto operativo | 48 × 16; 2026-08-27 a 2026-11-15 | 40–60 pedidos y reversión agregada positiva con correlaciones negativas dentro de ambos grupos |
| 5 | noches para modelado descriptivo | 64 × 16; 2026-11-19 a 2027-03-07 | 55–75 pedidos; coeficientes reproducibles; tres resultados posteriores bloqueados por leakage |

Todos son sintéticos, determinísticos, etiquetados y sin nombres, secretos o atributos personales. En vivo usa exclusivamente Palmer Penguins, Bike Sharing y Wine Quality.

## Revisión contra evals

| Dimensión | Puntuación | Evidencia |
| --- | ---: | --- |
| Alcance y currículo | 5 | 91 conceptos en orden y puentes declarados |
| Continuidad y voz | 5 | Don Juan sin jerga, Paco como hijo/estudiante, narrador como subtítulo |
| Pedagogía | 5 | Aprender, guiado y transferencia separados; respuesta bloqueada hasta revelar evidencia |
| Precisión técnica | 5 | denominadores, intervalos, correlaciones, reversión, coeficientes, scores y leakage reproducibles |
| Visual e interacción | 5 | 52 kinds especializados, correspondencia `data-renderer`, estados semánticos, movimiento real/reducido y feedback específico |
| Consistencia entre niveles | 5 | cinco manifests `level-shell-v1`, temas laterales, conceptos superiores y móvil sin overflow |
| Datos y procedencia | 5 | dimensiones, semillas, periodos y SHA-256; snapshots públicos versionados |
| Publicación | 5 | build de cinco niveles, 22 rutas de bloque y modo docente oculto |

- **Promedio:** 5.0.
- **Dimensión mínima:** 5.
- **Dimensiones en 1:** ninguna.
- **Bloqueadores:** ninguno.

## Evidencia ejecutada

- Tres generadores determinísticos: aprobados.
- `python scripts/validate_content.py`: 91 conceptos, 164 ejercicios, 273 prompts y tres datasets públicos.
- `python scripts/build_pages.py`: portal de cinco niveles y 22 bloques.
- `python scripts/qa_pages.py`: 52 escenas y 104 ejercicios de Niveles 3–5, modo docente, movimiento, móvil, responsive y consola limpia.
- Validación renderizada manual: `aggregation-reversal` en Nivel 4 y
  `leakage-timeline` en Nivel 5 móvil; navegación, evidencia, bloqueo y consola aprobados.
- `quick_validate.py`: ambas skills nuevas aprobadas.
- `python -m py_compile`: generadores, fábrica, validación, build y QA sin errores.
- `git diff --check`: sin errores de espacios o líneas finales.

## Riesgos residuales

- Las 52 escenas deben impartirse por bloques, no como una sola sesión.
- El registro contiene más renderers que antes; todo kind nuevo debe añadir esquema,
  prueba y entrada en la matriz o la generación se detendrá.
- La asociación puede tentar a explicar causalidad; el contrato técnico lo bloquea, pero requiere vigilancia docente.
- Nivel 5 no demuestra generalización. Cualquier uso fuera de las 64 noches requiere Nivel 6.

## Próxima vertical slice recomendada

- **Usuario:** creador de cursos.
- **Entrada:** modelos descriptivos y matriz sin leakage de `L5.6`.
- **Flujo principal:** aprobar historia de Nivel 6 → separar train/validation/test → definir costos de error → construir evals y casos de fallo → crear Aprender/Ejercitar → validar.
- **Salida:** Nivel 6 completo con evaluación reproducible de regresión y clasificación.
- **Prueba manual:** modificar un umbral y comprobar que cambian errores y costo visible sin tocar el test durante el ajuste.
- **Definition of Done:** métricas recalculables, costos conectados al negocio, promedio ≥4, ninguna dimensión en 1 y QA limpia.
- **No objetivos:** ampliar el puesto, afirmar causalidad, crear backend, cuentas o LMS.

## Supuestos

- Audiencia adulta principiante y español mexicano cálido.
- Don Juan conserva conocimiento del negocio; Paco sigue estudiando; Mari y Chava son personal pagado con autoridad operativa limitada.
- GitHub Pages es estático; `?teacher=1` no ofrece seguridad real.
