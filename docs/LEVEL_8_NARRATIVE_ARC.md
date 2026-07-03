# Level Narrative Arc: Nivel 8

## Identidad

- **ID:** `don-juan-paco-level-8-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 8.
- **Historia canónica:** `docs/stories/LEVEL_8.md`.
- **Entrada/salida:** `L7.3 / G5-servicios → L8.4 / G6-prepedido`.
- **Conflicto:** el puesto observa cambios en el tiempo y prueba un canal de prepedido, pero ni una tendencia ni una comparación antes/después identifican por sí solas un efecto.
- **Promesa:** respetar el orden temporal y separar patrones históricos de evidencia experimental aleatorizada.
- **Competencia auxiliar:** versionado temporal y planes experimentales reproducibles.

## Episodios

| Episodio | Escenas | Decisión | Datos | Crecimiento |
| --- | --- | --- | --- | --- |
| `L8-E1` El orden sí importa | `L8-S01`–`L8-S04` | Describir tendencia, ciclo, rezago y evento sin causalidad | `L7.3 → serie_nocturna@L8.1` | Ninguno |
| `L8-E2` Probar desde el pasado | `L8-S05`–`L8-S07` | Fijar ventanas, backtesting y corte de disponibilidad | `L8.1 → backtesting@L8.2` | Ninguno |
| `L8-E3` Dos mensajes, una asignación | `L8-S08`–`L8-S11` | Aleatorizar 400 prepedidos y congelar métrica, tamaño y efecto | `L8.2 → experimento_prepedido@L8.3` | Nora entra pagada para coordinar entregas |
| `L8-E4` Ganar sin romper otra cosa | `L8-S12`–`L8-S14` | Revisar guardrails, multiplicidad y efecto práctico | `L8.3 → decision_experimental@L8.4` | `G5-servicios → G6-prepedido` |

## Deltas aprobados

- **`continuityDelta`:** Nora Salas entra como tercera ayudante pagada con autoridad sobre fila y entrega, no sobre estadística. Paco permanece asesor parcial y conserva escuela y beca como prioridad.
- **`dataStateDelta`:** `L7.3 → serie_nocturna@L8.1 → backtesting@L8.2 → experimento_prepedido@L8.3 → decision_experimental@L8.4`.
- **`growthDelta`:** `G5-servicios → G6-prepedido`; cinco noches, 16 asientos y prepedido con cupo solo después de cumplir guardrails y capacidad.

## Cierre

**“¿Quién podría resultar afectado?”**

## Supuestos y límites

- La serie contiene 40 noches base y 60 noches de piloto en orden cronológico.
- El experimento contiene 400 asignaciones sintéticas balanceadas; la unidad es un prepedido elegible, no una persona perfilada.
- La aleatorización permite interpretar causalmente el mensaje dentro del piloto y sus supuestos, no atribuir al canal todos los cambios del negocio.
- En vivo usa Bike Sharing para tiempo y PlantGrowth como experimento público real.

