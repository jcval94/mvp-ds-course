# Level Narrative Arc: Nivel 6

## Identidad

- **ID:** `don-juan-paco-level-6-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 6.
- **Historia canónica:** `docs/stories/LEVEL_6.md`.
- **Entrada/salida:** `L5.6 / G4-kiosco → L6.6 / G4-kiosco`.
- **Conflicto:** los modelos ajustan las noches conocidas, pero merma y faltantes tienen costos distintos y el test no puede convertirse en herramienta de afinación.
- **Promesa:** evaluar regresión y clasificación con particiones, métricas y costos reproducibles.
- **Competencia auxiliar:** evals, casos de prueba y costos de error.

## Episodios

| Episodio | Escenas | Decisión | Datos | Crecimiento |
| --- | --- | --- | --- | --- |
| `L6-E1` El sobre cerrado | `L6-S01`–`L6-S04` | Congelar train, validation, test y folds | `L5.6 → particiones@L6.1` | Ninguno |
| `L6-E2` Cuánto se desvía | `L6-S05`–`L6-S08` | Comparar errores de pedidos con línea base | `L6.1 → error_regresion@L6.2` | Ninguno |
| `L6-E3` Cada error cuesta distinto | `L6-S09`–`L6-S12` | Traducir celdas a merma o faltantes | `L6.2 → matriz_confusion@L6.3` | Ninguno |
| `L6-E4` La pregunta elige la métrica | `L6-S13`–`L6-S16` | Conservar denominadores y costos | `L6.3 → metricas@L6.4` | Ninguno |
| `L6-E5` Congelar el corte | `L6-S17`–`L6-S20` | Elegir umbral en validation y abrir test una vez | `L6.4 → curvas@L6.5` | Ninguno |
| `L6-E6` Cuando la regla memoriza | `L6-S21`–`L6-S24` | Regularizar sin mirar test | `L6.5 → generalizacion@L6.6` | Ninguno |

## Deltas aprobados

- **`continuityDelta`:** Don Juan exige costos visibles; Paco congela el procedimiento antes de abrir test. Mari y Chava describen operación, nunca métricas.
- **`dataStateDelta`:** `L5.6 → particiones@L6.1 → error_regresion@L6.2 → matriz_confusion@L6.3 → metricas@L6.4 → curvas@L6.5 → generalizacion@L6.6`.
- **`growthDelta`:** ninguno; la capacidad física y plantilla permanecen en `G4-kiosco`.

## Cierre

**“¿Hay patrones que no etiquetamos?”**

## Supuestos y límites

- Las 96 noches son sintéticas: 48 train, 16 validation y 32 test futuras.
- El test permanece sellado hasta congelar modelo, umbral y regularización.
- FN usa pedidos no atendidos × 22 MXN; FP usa merma extra × 110 MXN/kg. Son supuestos narrativos, no contabilidad real.
- No se afirma causalidad ni se expande el puesto.

