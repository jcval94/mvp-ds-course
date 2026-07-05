# Level Narrative Arc: Nivel 6

## Identidad

- **ID:** `don-juan-paco-level-6-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 6.
- **Historia canónica:** `docs/stories/LEVEL_6.md`.
- **Ledger de entrada requerido:** `dataset_confiable@L5.H1`; el snapshot conserva procedencia histórica desde `L4.4` dentro del handoff ya producido por Nivel 5.
- **Conflicto:** el puesto necesita anticipar insumos y alta demanda sin presentar un ajuste descriptivo como garantía futura.
- **Promesa:** construir regresiones, scores y reglas interpretables solo con información disponible antes del turno.
- **Competencia auxiliar:** diseñar un pipeline reproducible y prevenir leakage.
- **Estado del puesto:** `G4-kiosco`; kiosco 4 × 3, segundo comal, doce asientos, Mari y Chava pagados.

## Matriz incremental

| Episodio | Escenas | Dinámica | Ayudantes | Datos | Crecimiento |
| --- | --- | --- | --- | --- | --- |
| `L6-E1` Una raya para anticipar insumos | `L6-S01`–`L6-S05` | Don Juan pregunta cuánto comprar; Paco ajusta y conserva residuales | Mari confirma límites de preparación | `dataset_confiable@L5.H1 → L6.1 → L6.2` | Kiosco 4 × 3 y segundo comal |
| `L6-E2` Varias señales a la vez | `L6-S06`–`L6-S08` | Don Juan pide lenguaje simple; Paco compara entradas previas al turno | Chava se integra pagado para segundo comal y servicio | `L6.2 → L6.3` | Doce asientos |
| `L6-E3` Alta demanda no es decisión | `L6-S09`–`L6-S12` | Don Juan define el costo operativo de una alerta; Paco separa clase, score, umbral y probabilidad | Mari y Chava describen consecuencias, no métricas | `L6.3 → L6.4` | Se mantiene `G4-kiosco` |
| `L6-E4` Reglas que se pueden seguir | `L6-S13`–`L6-S15` | Don Juan exige reglas comprensibles; Paco comprueba rutas | Chava aporta checklists, no autoridad de modelado | `L6.4 → L6.5` | Ninguno |
| `L6-E5` Lo que se sabe antes del turno | `L6-S16`–`L6-S18` | Paco revela que solicitó una beca; Don Juan respalda el plan sin cargarle el negocio | La plantilla mantiene límites y pago | `L6.5 → L6.6` | Ninguno |

## Deltas aprobados

- **`continuityDelta`:** Paco revela su solicitud de beca; Chava entra con autoridad operativa y una afinidad por checklists, sin revelar todavía su taller de radio.
- **`dataStateDelta`:** `dataset_confiable@L5.H1 → noches_modelado@L6.1 → regresion_simple@L6.2 → regresion_multiple@L6.3 → clasificacion@L6.4 → arbol_reglas@L6.5 → matriz_modelado_sin_leakage@L6.6`.
- **`growthDelta`:** `G3-espera → G4-kiosco`; la inversión es una decisión de Don Juan con ahorro y capacidad revisada, no el resultado automático de un modelo.

## Cierre

El subtítulo final pregunta: **“¿Cómo sabemos si sirve?”**, puente a Nivel 7.

## Supuestos y límites

- Las 64 noches son sintéticas, del 19 de noviembre de 2026 al 7 de marzo de 2027, con 55–75 pedidos por noche.
- Los ajustes son descriptivos dentro de estas 64 filas; evaluación, train/test y generalización pertenecen a Nivel 7.
- `tacos_vendidos`, `espera_mediana_min` y `merma_kg` son resultados posteriores y se bloquean como predictores.
- En vivo usa Bike Sharing para regresión y Wine Quality para clasificación, árboles y preparación.
