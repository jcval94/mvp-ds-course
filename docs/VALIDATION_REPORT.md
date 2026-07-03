# Reporte de validación

## Resultado

**Aprobado para publicación.** DataClass Forge publica ocho niveles, 35 bloques, 139 conceptos, 260 ejercicios y 417 prompts. Los cuatro snapshots públicos conservan procedencia, licencia, fecha y SHA-256.

Nivel 8 añade 14 escenas y 28 ejercicios de datos temporales y experimentación. Los 100 conceptos continuos de Niveles 3–8 usan `VisualizationSpec`, evidencia bloqueante y renderers registrados bajo `level-shell-v1`.

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
| 8 | 14 | 28 | 42 | `L8.4`, `G6-prepedido` |
| **Total** | **139** | **260** | **417** | Continuidad aprobada |

## Datos de Nivel 8

| Artefacto | Dimensiones | Comprobación bloqueante |
| --- | --- | --- |
| `noches_temporales_nivel_8.csv` | 100 × 18 | Fechas estrictamente ordenadas; 40 noches base y 60 piloto; evento de mantenimiento trazable |
| `prepedidos_experimento_nivel_8.csv` | 400 × 10 | 200 A / 200 B; elegibilidad previa; métrica y tamaño congelados; sin atributos personales |
| `plant_growth.csv` | 30 × 3 | Snapshot oficial de R, grupos control/tratamiento, licencia GPL-2/GPL-3 y hash fijo |

El experimento narrativo estima B−A en 0.19, con intervalo 95% `[0.102577, 0.277423]`. El aumento de espera es 0.4725 minutos y la diferencia de cancelación es −0.02; ambos cumplen los guardrails declarados. Son datos sintéticos didácticos, no resultados reales del puesto.

## Revisión contra evals

| Dimensión | Puntuación | Evidencia |
| --- | ---: | --- |
| Alcance y currículo | 5 | 139 conceptos en orden; Nivel 8 conserva cuatro bloques y puente responsable |
| Continuidad y voz | 5 | Historia 8 aprobada; Nora tiene autoridad operativa; Paco conserva escuela y rol parcial |
| Pedagogía | 5 | Aprender, guiado y transferencia separados; 28 ejercicios nuevos dependen de evidencia |
| Precisión técnica | 5 | Orden, ventanas, backtesting, asignación, efecto, guardrails y multiplicidad reproducibles |
| Visual e interacción | 5 | 14 kinds nuevos; estados cambian evidencia y conservan movimiento reducido |
| Consistencia | 5 | Ocho manifests `level-shell-v1`, escritorio y móvil sin overflow |
| Datos y procedencia | 5 | Dos datasets narrativos versionados y PlantGrowth con fuente, licencia y SHA-256 |
| Publicación | 5 | Build de ocho niveles, 35 rutas y modo docente oculto |

- **Promedio:** 5.0.
- **Dimensión mínima:** 5.
- **Dimensiones en 1:** ninguna.
- **Bloqueadores:** ninguno.

## Evidencia ejecutada

- Generador de Nivel 8 ejecutado dos veces con hashes idénticos.
- `python -m py_compile`: generadores, fábrica, build, validación y QA sin errores.
- `python scripts/validate_content.py`: 139 conceptos, 260 ejercicios, 417 prompts y cuatro datasets públicos.
- `python scripts/build_pages.py`: portal de ocho niveles y 35 bloques.
- `python scripts/qa_pages.py`: 100 escenas continuas, 200 ejercicios, modo docente, movimiento, móvil y consola limpia.
- Inspección visual: anomalía temporal, leakage, aleatorización, efecto práctico y guardrails en escritorio/móvil.

## Supuestos y riesgos residuales

- El efecto, costos y guardrails narrativos son sintéticos y no autorizan decisiones reales.
- Un corte temporal mal ubicado o una agregación centrada puede reintroducir leakage.
- La interpretación causal se limita al mensaje aleatorizado, elegibles y periodo del piloto.
- PlantGrowth ilustra diseño experimental público, pero su dominio botánico no sustituye el contexto operativo narrativo.
- `?teacher=1` no constituye autenticación.

## Próxima vertical slice recomendada

- **Usuario:** creador de cursos.
- **Entrada:** `L8.4`, canal de prepedido, serie versionada y resultados experimentales.
- **Flujo principal:** aprobar historia de Nivel 9 → mapear personas afectadas → revisar representación, fairness, daño y privacidad → comunicar incertidumbre → cerrar con mini-proyecto reproducible.
- **Salida:** Nivel 9 completo y cierre responsable del curso.
- **Prueba manual:** seguir una decisión desde procedencia y población afectada hasta visual, límite, revisión y comunicación.
- **Definition of Done:** daños y límites visibles, privacidad protegida, notebook/artefacto reproducible, promedio ≥4 y QA limpia.
- **No objetivos:** vigilancia, perfiles personales, decisiones automáticas de alto impacto, sucursal, backend, cuentas o LMS.
