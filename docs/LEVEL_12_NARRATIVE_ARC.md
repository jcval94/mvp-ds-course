# Level Narrative Arc: Nivel 12

## Identidad

- **ID:** `don-juan-paco-level-12-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 12.
- **Historia canónica:** `docs/stories/LEVEL_12.md`.
- **Ledger de entrada:** `L11.4 / G7-local`.
- **Conflicto:** una demo funciona en la sesión de Paco, pero falla desde cero y nadie más puede ejecutarla con seguridad.
- **Promesa:** convertir un prototipo reproducible en un producto versionado, testeable, configurable, empaquetado y entregable.
- **Competencia auxiliar:** dirigir y auditar un agente de código mediante especificación, criterios, diff, tests y revisión humana.
- **Estado del puesto:** `G7-local`; un solo local, 18 asientos y cuatro puestos pagados, sin crecimiento.
- **Periodo narrativo:** 18–21 de enero de 2028, fuera del horario escolar de Paco.

## Episodios

| Episodio | Escenas | Objetivo principal | Estado | Puente |
| --- | --- | --- | --- | --- |
| `L12-E1` Solo funciona aquí | `L12-S01`–`L12-S03` | Detectar estado oculto y estructurar un proyecto reproducible | `L11.4 → proyecto_reproducible@L12.1` | ¿Qué contrato debe cumplir cada pieza? |
| `L12-E2` Piezas con frontera | `L12-S04`–`L12-S06` | Modularizar y separar configuración/secretos | `L12.1 → contrato_codigo@L12.2` | ¿Cómo probamos comportamiento, no solo ejecución? |
| `L12-E3` Verde no siempre significa correcto | `L12-S07`–`L12-S09` | Diseñar tests unitarios, integración, regresión y schema | `L12.2 → suite_verificable@L12.3` | ¿Cómo lo ejecuta otra aplicación? |
| `L12-E4` Una puerta con reglas | `L12-S10`–`L12-S12` | Definir API, errores, versionado y health check | `L12.3 → servicio_contrato@L12.4` | ¿Cómo viajan código y entorno juntos? |
| `L12-E5` La caja no es el local | `L12-S13`–`L12-S15` | Fijar dependencias, imagen, contenedor y runtime | `L12.4 → artefacto_versionado@L12.5` | ¿Quién impide integrar una versión rota? |
| `L12-E6` La banda de revisión | `L12-S16`–`L12-S18` | Construir CI con test/build gate y separar CD | `L12.5 → entrega_candidata@L12.6` | ¿Qué necesita el siguiente equipo para operarlo? |
| `L12-E7` Entregar lo ejecutable | `L12-S19`–`L12-S21` | Desplegar de referencia y entregar logs, health y versión | `L12.6 → producto_operable@L12.H1` | ¿Cómo sabremos que sigue funcionando y qué haremos si deja de hacerlo? |

## Deltas aprobados

- **`continuityDelta`:** Paco deja de presentar una demo como producto; Don Juan exige que otra persona pueda ejecutar y detener lo entregado. El equipo conserva roles pagados y Paco continúa como estudiante.
- **`dataStateDelta`:** `L11.4 → proyecto_reproducible@L12.1 → contrato_codigo@L12.2 → suite_verificable@L12.3 → servicio_contrato@L12.4 → artefacto_versionado@L12.5 → entrega_candidata@L12.6 → producto_operable@L12.H1`.
- **`growthDelta`:** ninguno; `G7-local` permanece.
- **Secretos:** ninguno nuevo; las revelaciones previas no se convierten en datos ni configuración.

## Aprobación narrativa

- Don Juan habla de una demo, una entrega y quién puede usarla; no usa jerga de software.
- Paco propone y comprueba como estudiante, no se vuelve equipo permanente de plataforma.
- El narrador introduce contratos, tests, API, contenedor, CI/CD y despliegue.
- Aprender parte de una sesión contaminada; Ejercitar revisa un diff elegante con tests insuficientes.
- Nivel 12 produce el objeto operable; no enseña drift, alertas, triage, postmortem ni retiro.

## Cierre

La salida `producto_operable@L12.H1` exige artefacto versionado, contrato,
health check, logs, tests y candidato de rollback. La pregunta puente es:
**“¿Cómo sabremos que sigue funcionando y qué haremos cuando deje de hacerlo?”**

## Supuestos y límites

- FastAPI, Docker, GitHub Actions y Cloud Run son implementaciones de referencia, no objetivos independientes.
- La vertical slice usa Python estándar para que los tests corran offline; el concepto no depende de un framework.
- No hay credenciales reales, llamadas externas, backend productivo ni despliegue real.
- La historia completa queda aprobada y sus 21 escenas están implementadas en el nivel publicado.
