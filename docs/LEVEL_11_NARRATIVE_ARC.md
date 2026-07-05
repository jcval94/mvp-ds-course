# Level Narrative Arc: Nivel 11

## Identidad

- **ID:** `don-juan-paco-level-11-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 11.
- **Historia canónica:** `docs/stories/LEVEL_11.md`.
- **Ledger de entrada:** `L10.4 / G7-local`.
- **Conflicto:** una demo funciona en la sesión de Paco, pero falla desde cero y nadie más puede ejecutarla con seguridad.
- **Promesa:** convertir un prototipo reproducible en un producto versionado, testeable, configurable, empaquetado y entregable.
- **Competencia auxiliar:** dirigir y auditar un agente de código mediante especificación, criterios, diff, tests y revisión humana.
- **Estado del puesto:** `G7-local`; un solo local, 18 asientos y cuatro puestos pagados, sin crecimiento.
- **Periodo narrativo:** 18–21 de enero de 2028, fuera del horario escolar de Paco.

## Episodios

| Episodio | Escenas | Objetivo principal | Estado | Puente |
| --- | --- | --- | --- | --- |
| `L11-E1` Solo funciona aquí | `L11-S01`–`L11-S03` | Detectar estado oculto y estructurar un proyecto reproducible | `L10.4 → proyecto_reproducible@L11.1` | ¿Qué contrato debe cumplir cada pieza? |
| `L11-E2` Piezas con frontera | `L11-S04`–`L11-S06` | Modularizar y separar configuración/secretos | `L11.1 → contrato_codigo@L11.2` | ¿Cómo probamos comportamiento, no solo ejecución? |
| `L11-E3` Verde no siempre significa correcto | `L11-S07`–`L11-S09` | Diseñar tests unitarios, integración, regresión y schema | `L11.2 → suite_verificable@L11.3` | ¿Cómo lo ejecuta otra aplicación? |
| `L11-E4` Una puerta con reglas | `L11-S10`–`L11-S12` | Definir API, errores, versionado y health check | `L11.3 → servicio_contrato@L11.4` | ¿Cómo viajan código y entorno juntos? |
| `L11-E5` La caja no es el local | `L11-S13`–`L11-S15` | Fijar dependencias, imagen, contenedor y runtime | `L11.4 → artefacto_versionado@L11.5` | ¿Quién impide integrar una versión rota? |
| `L11-E6` La banda de revisión | `L11-S16`–`L11-S18` | Construir CI con test/build gate y separar CD | `L11.5 → entrega_candidata@L11.6` | ¿Qué necesita el siguiente equipo para operarlo? |
| `L11-E7` Entregar lo ejecutable | `L11-S19`–`L11-S21` | Desplegar de referencia y entregar logs, health y versión | `L11.6 → producto_operable@L11.H1` | ¿Cómo sabremos que sigue funcionando y qué haremos si deja de hacerlo? |

## Deltas aprobados

- **`continuityDelta`:** Paco deja de presentar una demo como producto; Don Juan exige que otra persona pueda ejecutar y detener lo entregado. El equipo conserva roles pagados y Paco continúa como estudiante.
- **`dataStateDelta`:** `L10.4 → proyecto_reproducible@L11.1 → contrato_codigo@L11.2 → suite_verificable@L11.3 → servicio_contrato@L11.4 → artefacto_versionado@L11.5 → entrega_candidata@L11.6 → producto_operable@L11.H1`.
- **`growthDelta`:** ninguno; `G7-local` permanece.
- **Secretos:** ninguno nuevo; las revelaciones previas no se convierten en datos ni configuración.

## Aprobación narrativa

- Don Juan habla de una demo, una entrega y quién puede usarla; no usa jerga de software.
- Paco propone y comprueba como estudiante, no se vuelve equipo permanente de plataforma.
- El narrador introduce contratos, tests, API, contenedor, CI/CD y despliegue.
- Aprender parte de una sesión contaminada; Ejercitar revisa un diff elegante con tests insuficientes.
- Nivel 11 produce el objeto operable; no enseña drift, alertas, triage, postmortem ni retiro.

## Cierre

La salida `producto_operable@L11.H1` exige artefacto versionado, contrato,
health check, logs, tests y candidato de rollback. La pregunta puente es:
**“¿Cómo sabremos que sigue funcionando y qué haremos cuando deje de hacerlo?”**

## Supuestos y límites

- FastAPI, Docker, GitHub Actions y Cloud Run son implementaciones de referencia, no objetivos independientes.
- La vertical slice usa Python estándar para que los tests corran offline; el concepto no depende de un framework.
- No hay credenciales reales, llamadas externas, backend productivo ni despliegue real.
- La historia completa queda aprobada y sus 21 escenas están implementadas en el nivel publicado.
