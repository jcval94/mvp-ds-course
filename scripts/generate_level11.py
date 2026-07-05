#!/usr/bin/env python3
"""Generate the complete published Level 11 curriculum."""

from full_level_support import concept_lesson
from narrative_level_factory import generate


SPECS = [
    ("notebook-to-verifiable-pipeline","Notebook frente a producción","notebook-pipeline-contract","caso, dependencia, comando, resultado","dependencias ocultas que se vuelven fronteras y criterios verificables"),
    ("reproducible-execution","Ejecución reproducible","clean-run-replay","entorno, entrada, comando, salida","repetición desde cero con el mismo contrato"),
    ("project-structure","Estructura y responsabilidades","project-boundary-map","componente, responsabilidad, entrada, salida","celdas mezcladas que se separan en fronteras comprobables"),
    ("functions-modules","Funciones y módulos","function-boundary","input, funcion, output, efecto","función pura frente a dependencia de estado global"),
    ("io-contract","Contrato de entrada y salida","code-contract-gate","campo, tipo, invariante, error","entradas válidas e inválidas atravesando un schema"),
    ("config-secrets","Configuración y secretos","config-secret-boundary","valor, origen, entorno, exposicion","configuración inyectada y secretos fuera del código y logs"),
    ("unit-integration-tests","Unit e integration tests","test-scope-map","test, componente, frontera, resultado","alcance aislado y fronteras reales por tipo de test"),
    ("regression-failure-tests","Regression, golden y failure cases","regression-case-matrix","caso, esperado, actual, resultado","matriz de comportamiento esperado, regresiones y fallos"),
    ("fixtures-schema-tests","Fixtures y tests de schema","fixture-schema-coverage","fixture, campo, borde, cobertura","fixture mínima que cubre schema, nulos y bordes"),
    ("request-response","Request y response","api-contract-flow","request, validacion, proceso, response","flujo de request validado hasta response"),
    ("errors-versioning","Errores y versionado","api-error-version-map","version, status, causa, response","rutas separadas 2xx, 4xx, 5xx y versiones"),
    ("fastapi-health","FastAPI y health check","service-health-check","proceso, dependencia, health, status","gate de salud basado en proceso y dependencias mínimas"),
    ("dependencies-lockfile","Dependencias y lockfile","dependency-lock-graph","paquete, version, lock, hash","resolución flotante que se fija y reconstruye"),
    ("image-container","Imagen y contenedor","container-lifecycle","dockerfile, image, container, estado","ciclo Dockerfile, imagen y ejecución de contenedor"),
    ("runtime-artifact","Runtime y artefacto","runtime-artifact-map","archivo, runtime, config, artifact","capas que separan build, configuración y ejecución"),
    ("ci-pipeline","Pipeline CI","ci-job-flow","commit, job, check, evidencia","commit que activa jobs reproducibles y deja evidencia"),
    ("ci-acceptance","Test/build gate y secrets","ci-acceptance-gate","diff, criterio, test, artifact","fallo que detiene el artifact y expone alcance del diff"),
    ("ci-cd","CI frente a CD","ci-cd-boundary","artifact, gate, autorizacion, deploy","artifact verificado que espera autorización de entrega"),
    ("service-environments","Servicio y configuración por entorno","artifact-promotion","artifact, entorno, config, version","promoción del mismo artifact entre entornos"),
    ("startup-logs","Logs y fallos de arranque","startup-log-flow","evento, request_id, version, error","timeline de arranque, eventos estructurados y fallo visible"),
    ("versioned-handoff","Handoff versionado","operable-handoff-map","contrato, artifact, health, logs","paquete con contrato, artifact, health, logs y versión segura"),
]

BLOCKS = [
    ("notebook-project","Del notebook al proyecto","Estado oculto, reproducibilidad y fronteras.","notebook-proyecto.html",0,3),
    ("code-contracts","Código modular y contratos","Funciones, contratos, configuración y secretos.","codigo-contratos.html",3,6),
    ("testing","Testing para datos y ML","Tests, regresiones y fixtures.","testing.html",6,9),
    ("service-contracts","APIs y contratos de servicio","Request, errores, versiones y salud.","apis-servicio.html",9,12),
    ("packaging","Empaquetado y entornos","Dependencias, imágenes y runtime.","empaquetado.html",12,15),
    ("continuous-delivery","Integración y entrega continua","CI, gates y límite con CD.","integracion-entrega.html",15,18),
    ("minimal-operations","Despliegue y operabilidad mínima","Promoción, logs y handoff.","operabilidad-minima.html",18,21),
]


def config() -> dict[str, object]:
    lessons = [concept_lesson(level=11, scene_number=i, slug=s[0], title=s[1], mechanism=s[4], variables=s[3], unit="un caso de aceptación, ejecución o fallo del producto", data_state=f"producto_operable@L11.{i}", episode=f"L11-E{next(j for j,b in enumerate(BLOCKS,1) if b[4] < i <= b[5])}") for i,s in enumerate(SPECS,1)]
    rows = [{"escena":f"L11-S{i:02d}","concepto":s[0],"criterio":f"AC-{i:02d}","test":"pass","artifact":f"product-v1.{i}","secretos_expuestos":0,"handoff":"verified"} for i,s in enumerate(SPECS,1)]
    blocks = [{"id":b[0],"number":i,"title":b[1],"description":b[2],"href":b[3],"dataset_id":"wine-quality","concepts":lessons[b[4]:b[5]]} for i,b in enumerate(BLOCKS,1)]
    return {
        "level":11,"output":"data-class-product-engineering-level-11","title":"Ingeniería de Productos de Datos",
        "summary":"Convierte análisis y modelos en productos versionados, probados y entregables antes de operarlos.",
        "blocks":blocks,"previousConcept":"Comunicación del proyecto","nextConcept":"Readiness operativo",
        "agentCompetency":"Especificar contratos y criterios para agentes de código, revisar diffs, ejecutar tests y rechazar implementaciones que incumplen el contrato.",
        "continuityDelta":"Paco deja de llamar producto a una demo y entrega un artifact comprobable; Don Juan conserva autoridad de negocio.",
        "growthDelta":"ninguno; G7-local permanece","updatedAt":"2026-07-04",
        "narrativeDatasets":[{"path":"datasets/narrative/controles_producto_nivel_11.csv","rows":rows,"schema":list(rows[0])}],
        "narrativeMetadata":{"metadataPath":"datasets/narrative/nivel_11.metadata.json","id":"producto-operable-nivel-11-v1","synthetic":True,"generator":"level11-full-v1","period":{"start":"2028-01-18","end":"2028-01-21"},"dimensions":[21,7],"unit":"un criterio verificable del producto","artifact":"examples/level11_pipeline_slice","privacy":{"personal_identifiers":False,"real_secrets":False},"growth":{"from":"G7-local","to":"G7-local"},"data_state":["L10.4","producto_operable@L11.H1"],"label":"Fixture sintética de aceptación; no contiene secretos ni despliegues reales"},
    }


if __name__ == "__main__":
    generate(config())
