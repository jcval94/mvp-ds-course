# Level Narrative Arc: Nivel 7

## Identidad

- **ID:** `don-juan-paco-level-7-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 7.
- **Historia canónica:** `docs/stories/LEVEL_7.md`.
- **Entrada/salida:** `L6.6 / G4-kiosco → L7.6 / G4-kiosco`.
- **Conflicto:** los modelos ajustan las noches conocidas, pero merma y faltantes tienen costos distintos y el test no puede convertirse en herramienta de afinación.
- **Promesa:** evaluar regresión y clasificación con particiones, métricas y costos reproducibles.
- **Competencia auxiliar:** evals, casos de prueba y costos de error.

## Episodios

| Episodio | Escenas | Decisión | Datos | Crecimiento |
| --- | --- | --- | --- | --- |
| `L7-E1` El sobre cerrado | `L7-S01`–`L7-S04` | Congelar train, validation, test y folds | `L6.6 → particiones@L7.1` | Ninguno |
| `L7-E2` Cuánto se desvía | `L7-S05`–`L7-S08` | Comparar errores de pedidos con línea base | `L7.1 → error_regresion@L7.2` | Ninguno |
| `L7-E3` Cada error cuesta distinto | `L7-S09`–`L7-S12` | Traducir celdas a merma o faltantes | `L7.2 → matriz_confusion@L7.3` | Ninguno |
| `L7-E4` La pregunta elige la métrica | `L7-S13`–`L7-S16` | Conservar denominadores y costos | `L7.3 → metricas@L7.4` | Ninguno |
| `L7-E5` Congelar el corte | `L7-S17`–`L7-S20` | Elegir umbral en validation y abrir test una vez | `L7.4 → curvas@L7.5` | Ninguno |
| `L7-E6` Cuando la regla memoriza | `L7-S21`–`L7-S24` | Regularizar sin mirar test | `L7.5 → generalizacion@L7.6` | Ninguno |

## Deltas aprobados

- **`continuityDelta`:** Don Juan exige costos visibles; Paco congela el procedimiento antes de abrir test. Mari y Chava describen operación, nunca métricas.
- **`dataStateDelta`:** `L6.6 → particiones@L7.1 → error_regresion@L7.2 → matriz_confusion@L7.3 → metricas@L7.4 → curvas@L7.5 → generalizacion@L7.6`.
- **`growthDelta`:** ninguno; la capacidad física y plantilla permanecen en `G4-kiosco`.

## Cierre

**“¿Hay patrones que no etiquetamos?”**

## Supuestos y límites

- Las 96 noches son sintéticas: 48 train, 16 validation y 32 test futuras.
- El test permanece sellado hasta congelar modelo, umbral y regularización.
- FN usa pedidos no atendidos × 22 MXN; FP usa merma extra × 110 MXN/kg. Son supuestos narrativos, no contabilidad real.
- No se afirma causalidad ni se expande el puesto.

