# Matriz visual canónica · Nivel 11

- **Estado:** implementada y validada para los 21 conceptos.
- **Registro:** `educational-svg-v1`.
- **Regla:** cada visual debe hacer visible contrato, frontera, artifact, diff o resultado de test; iconos tecnológicos decorativos no cuentan.

| Escena | Concepto | Mecanismo visible | Familia / kind | Estado de implementación |
| --- | --- | --- | --- | --- |
| L11-S01 | notebook frente a producción | sesión contaminada pasa a ejecución limpia y revela dependencias ocultas | grafo de ejecución / `notebook-pipeline-contract` | Renderer registrado y probado |
| L11-S02 | ejecución reproducible | entrada, entorno, comando y salida se repiten desde cero | replay / `clean-run-replay` | Renderer registrado y probado |
| L11-S03 | estructura y responsabilidades | celdas mezcladas se separan en fronteras | flujo modular / `project-boundary-map` | Renderer registrado y probado |
| L11-S04 | funciones y módulos | input → función pura → output frente a estado global | flujo de contrato / `function-boundary` | Renderer registrado y probado |
| L11-S05 | contrato entrada/salida | casos válidos e inválidos atraviesan schema | gate / `code-contract-gate` | Renderer registrado y probado |
| L11-S06 | configuración y secretos | valores salen del código y se inyectan por entorno | capas / `config-secret-boundary` | Renderer registrado y probado |
| L11-S07 | unit e integration tests | alcance y fronteras cambian por tipo de test | mapa de tests / `test-scope-map` | Renderer registrado y probado |
| L11-S08 | regression/golden/failure | comportamiento esperado y fallos quedan fijados | matriz de casos / `regression-case-matrix` | Renderer registrado y probado |
| L11-S09 | fixtures y schema | fixture mínima cubre campos, nulos y bordes | tabla de cobertura / `fixture-schema-coverage` | Renderer registrado y probado |
| L11-S10 | request/response | request → validate → process → response | simulador API / `api-contract-flow` | Renderer registrado y probado |
| L11-S11 | errores y versionado | 2xx/4xx/5xx y versiones siguen rutas distintas | árbol de respuesta / `api-error-version-map` | Renderer registrado y probado |
| L11-S12 | FastAPI y health | proceso/dependencias mínimas determinan health | gate de servicio / `service-health-check` | Renderer registrado y probado |
| L11-S13 | dependencias y lockfile | resolución flotante se fija y reconstruye | grafo de dependencias / `dependency-lock-graph` | Renderer registrado y probado |
| L11-S14 | imagen y contenedor | Dockerfile → image → container | ciclo de artifact / `container-lifecycle` | Renderer registrado y probado |
| L11-S15 | runtime y artifact | build separa archivos de configuración de ejecución | capas / `runtime-artifact-map` | Renderer registrado y probado |
| L11-S16 | pipeline CI | commit activa jobs y evidencia | pipeline / `ci-job-flow` | Renderer registrado y probado |
| L11-S17 | test/build gate | un fallo detiene artifact y el diff muestra alcance | gate/diff / `ci-acceptance-gate` | Renderer registrado y probado |
| L11-S18 | CI vs CD | artifact verificado espera autorización de entrega | flujo separado / `ci-cd-boundary` | Renderer registrado y probado |
| L11-S19 | servicio y entorno | mismo artifact recibe configuración distinta | promoción / `artifact-promotion` | Renderer registrado y probado |
| L11-S20 | logs y startup | ejecución emite eventos o falla visiblemente | timeline / `startup-log-flow` | Renderer registrado y probado |
| L11-S21 | handoff versionado | contrato, artifact, health, logs y versión segura forman el paquete | contrato de producto / `operable-handoff-map` | Renderer registrado y probado |

## Prueba bloqueante del nivel

`notebook-pipeline-contract` debe comparar sesión contaminada, ejecución limpia
fallida y pipeline explícito; debe mostrar qué criterios y tests pasan o fallan.
El ejercicio permanece bloqueado hasta visitar los tres estados y sus marcas.
