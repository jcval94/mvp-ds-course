# Level Narrative Arc: Nivel 10

## Identidad

- **ID:** `don-juan-paco-level-10-v1`.
- **Estado:** aprobado para implementación.
- **Fuente:** `docs/CURRICULUM_MAP.md`, Nivel 10.
- **Historia:** `docs/stories/LEVEL_10.md`.
- **Entrada/salida:** `L9.4 / G7-local → L10.4 / G7-local`.
- **Conflicto:** un procedimiento útil puede degradarse, alertar de más o causar daño si nadie sabe detenerlo.
- **Promesa:** operar con gates, monitoreo, rollback, incidentes, handoff y retiro explícitos.
- **Competencia auxiliar:** operación y monitoreo reproducibles con autoridad humana.

## Episodios y deltas

| Episodio | Escenas | Decisión | Estado |
| --- | --- | --- | --- |
| `L10-E1` Antes de encender | `L10-S01`–`L10-S04` | Gate, baseline, rollback y aprobación humana | `readiness@L10.1` |
| `L10-E2` Cuando el mundo cambia | `L10-S05`–`L10-S08` | Monitorear datos, desempeño, calibración y alertas | `monitoring@L10.2` |
| `L10-E3` Contener antes de explicar | `L10-S09`–`L10-S12` | Triage, impacto, rollback y postmortem | `incident@L10.3` |
| `L10-E4` Entregar también el freno | `L10-S13`–`L10-S16` | Model card, runbook, audit log y retiro | `handoff@L10.4` |

- **`continuityDelta`:** Don Juan conserva la decisión final; Paco entrega documentación y sigue sus estudios; el equipo pagado recibe responsabilidades y escalamiento claros.
- **`dataStateDelta`:** `L9.4 → L10.1 → L10.2 → L10.3 → L10.4`.
- **`growthDelta`:** ninguno; `G7-local` permanece como un solo local de barrio.
- **Cierre:** el curso termina con un sistema que puede explicarse, detenerse, auditarse y retirarse.

