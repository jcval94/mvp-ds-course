# Level Narrative Arc: Nivel 9

## Identidad

- **ID:** `don-juan-paco-level-9-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 9.
- **Historia canónica:** `docs/stories/LEVEL_9.md`.
- **Entrada/salida:** `L8.3 / G5-servicios → L9.4 / G6-prepedido`.
- **Conflicto:** el puesto observa cambios en el tiempo y prueba un canal de prepedido, pero ni una tendencia ni una comparación antes/después identifican por sí solas un efecto.
- **Promesa:** respetar el orden temporal y separar patrones históricos de evidencia experimental aleatorizada.
- **Competencia auxiliar:** versionado temporal y planes experimentales reproducibles.

## Episodios

| Episodio | Escenas | Decisión | Datos | Crecimiento |
| --- | --- | --- | --- | --- |
| `L9-E1` El orden sí importa | `L9-S01`–`L9-S04` | Describir tendencia, ciclo, rezago y evento sin causalidad | `L8.3 → serie_nocturna@L9.1` | Ninguno |
| `L9-E2` Probar desde el pasado | `L9-S05`–`L9-S07` | Fijar ventanas, backtesting y corte de disponibilidad | `L9.1 → backtesting@L9.2` | Ninguno |
| `L9-E3` Dos mensajes, una asignación | `L9-S08`–`L9-S11` | Aleatorizar 400 prepedidos y congelar métrica, tamaño y efecto | `L9.2 → experimento_prepedido@L9.3` | Nora entra pagada para coordinar entregas |
| `L9-E4` Ganar sin romper otra cosa | `L9-S12`–`L9-S14` | Revisar guardrails, multiplicidad y efecto práctico | `L9.3 → decision_experimental@L9.4` | `G5-servicios → G6-prepedido` |

## Deltas aprobados

- **`continuityDelta`:** Nora Salas entra como tercera ayudante pagada con autoridad sobre fila y entrega, no sobre estadística. Paco permanece asesor parcial y conserva escuela y beca como prioridad.
- **`dataStateDelta`:** `L8.3 → serie_nocturna@L9.1 → backtesting@L9.2 → experimento_prepedido@L9.3 → decision_experimental@L9.4`.
- **`growthDelta`:** `G5-servicios → G6-prepedido`; cinco noches, 16 asientos y prepedido con cupo solo después de cumplir guardrails y capacidad.

## Cierre

**“¿Quién podría resultar afectado?”**

## Supuestos y límites

- La serie contiene 40 noches base y 60 noches de piloto en orden cronológico.
- El experimento contiene 400 asignaciones sintéticas balanceadas; la unidad es un prepedido elegible, no una persona perfilada.
- La aleatorización permite interpretar causalmente el mensaje dentro del piloto y sus supuestos, no atribuir al canal todos los cambios del negocio.
- En vivo usa Bike Sharing para tiempo y PlantGrowth como experimento público real.

