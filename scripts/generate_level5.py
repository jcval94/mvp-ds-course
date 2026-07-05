#!/usr/bin/env python3
"""Generate the complete published Level 5 curriculum."""

from full_level_support import concept_lesson
from narrative_level_factory import generate


SPECS = [
    ("grain", "Unidad y granularidad", "grain-level-shift", "tabla, entidad, fecha, unidad", "filas que cambian de noche a noche-persona"),
    ("schema-keys", "Esquema y claves", "schema-key-map", "campo, tipo, pk, fk", "campos tipados y enlaces PK/FK"),
    ("question-query", "Consulta orientada a pregunta", "query-operation-flow", "pregunta, filtro, campo, resultado", "pregunta, operaciones SQL y tabla resultante"),
    ("aggregation-groups", "Agregación y grupos", "groupby-grain-change", "grupo, numerador, denominador, total", "filas que se agrupan conservando denominadores"),
    ("join-semantics", "Semántica de JOIN y anti-join", "join-survival-map", "llave, matched, left_only, right_only", "unidades que sobreviven a cada tipo de JOIN"),
    ("join-cardinality", "Cardinalidad de JOIN", "join-cardinality-map", "llave, lado_izquierdo, lado_derecho, pares", "enlaces uno-a-uno, uno-a-muchos y muchos-a-muchos"),
    ("join-row-explosion", "Explosión de filas en un JOIN", "join-row-explosion", "fecha, ventas_mxn, turno_id, evento_id", "combinaciones many-to-many y reconciliación de filas, unidades y sumas"),
    ("traceable-cte", "CTE trazable", "cte-count-lineage", "etapa, filas_entrada, filas_salida, regla", "etapas SQL nombradas con conteos reconciliables"),
    ("window-functions", "Funciones de ventana", "window-partition-order", "particion, orden, fila, rango", "particiones que conservan filas y añaden orden"),
    ("lag-cutoff", "Rezagos y fecha de corte", "sql-lag-cutoff", "fecha, lag, lead, corte", "rezagos permitidos y futuro bloqueado por el corte"),
    ("population-windows", "Población y ventanas", "abt-population-windows", "unidad, observacion, feature_start, target_end", "intervalos separados de población, observación, features y target"),
    ("temporal-abt", "ABT temporal", "abt-builder", "unidad, fecha_corte, feature, target", "fuentes que terminan en una fila trazable por unidad y corte"),
    ("entity-deduplication", "Deduplicación por entidad", "dedup-last-valid", "entidad, version, vigencia, regla", "versiones ordenadas y selección de la última observación válida"),
    ("csv-parquet", "CSV frente a Parquet", "row-columnar-read", "formato, filas, columnas, bytes", "lectura completa por filas frente a selección columnar"),
    ("paginated-api", "API paginada", "api-pagination-flow", "cursor, pagina, intento, id", "páginas, cursores, retries acotados y deduplicación"),
    ("duckdb-polars", "DuckDB y Polars", "local-engine-choice", "operacion, interfaz, entrada, salida", "la misma transformación mediante SQL local o expresión columnar"),
    ("data-contract", "Contrato y esquema", "data-contract-gate", "campo, tipo, nullabilidad, version", "cambios compatibles e incompatibles atravesando un gate"),
    ("data-integrity", "Integridad de datos", "data-integrity-checks", "check, campo, fila, resultado", "unicidad, rango, nulos e integridad referencial por fila"),
    ("dataset-lineage", "Linaje y snapshot", "dataset-lineage-map", "fuente, transformacion, version, sha256", "DAG de procedencia desde fuentes hasta snapshot versionado"),
]


BLOCKS = [
    ("architecture", "Arquitectura invisible de los datos", "Entidad, evento, esquema y llaves.", "arquitectura-datos.html", 0, 2),
    ("sql-questions", "SQL para hacer preguntas", "Selección, filtros y agregaciones.", "sql-preguntas.html", 2, 4),
    ("joins", "Relaciones y JOINs", "Semántica, cardinalidad y reconciliación.", "relaciones-joins.html", 4, 7),
    ("analytic-sql", "SQL analítico y tiempo", "CTEs, ventanas y cortes temporales.", "sql-analitico.html", 7, 10),
    ("abt", "Construcción de la tabla analítica", "Población, ventanas y deduplicación.", "tabla-analitica.html", 10, 13),
    ("modern-sources", "Fuentes y formatos modernos", "Formatos, APIs y motores locales.", "fuentes-modernas.html", 13, 16),
    ("quality-lineage", "Calidad, contratos y procedencia", "Contratos, checks y linaje.", "calidad-procedencia.html", 16, 19),
]


def config() -> dict[str, object]:
    lessons = [concept_lesson(level=5, scene_number=i, slug=s[0], title=s[1], mechanism=s[4], variables=s[3], unit="una unidad analítica declarada antes de transformar", data_state=f"dataset_confiable@L5.{i}", episode=f"L5-E{next(j for j,b in enumerate(BLOCKS,1) if b[4] < i <= b[5])}") for i, s in enumerate(SPECS, 1)]
    rows = [{"escena":f"L5-S{i:02d}","concepto":s[0],"unidad":"noche","llave":f"K{i:02d}","filas_entrada":i+5,"filas_salida":i+4,"check":"pass"} for i,s in enumerate(SPECS,1)]
    blocks = [{"id":b[0],"number":i,"title":b[1],"description":b[2],"href":b[3],"dataset_id":"bike-sharing-day","concepts":lessons[b[4]:b[5]]} for i,b in enumerate(BLOCKS,1)]
    return {
        "level":5,"output":"data-class-sql-level-5","title":"Sistemas de Datos Modernos y SQL",
        "summary":"Construye datasets confiables con SQL, granularidad, contratos y procedencia antes de modelar.",
        "blocks":blocks,"previousConcept":"Odds","nextConcept":"Ajuste",
        "agentCompetency":"Inspeccionar esquemas y relaciones; validar SQL generado, JOINs, granularidad y procedencia sin sustituir la decisión analítica.",
        "continuityDelta":"Paco transforma una consulta fallida en un procedimiento verificable; Don Juan exige que cada cifra vuelva a una noche real.",
        "growthDelta":"ninguno; G3-espera permanece","updatedAt":"2026-07-04",
        "narrativeDatasets":[{"path":"datasets/narrative/controles_dataset_nivel_5.csv","rows":rows,"schema":list(rows[0])}],
        "narrativeMetadata":{"metadataPath":"datasets/narrative/nivel_5.metadata.json","id":"dataset-confiable-nivel-5-v1","synthetic":True,"generator":"level5-full-v1","period":{"observed_end":"2026-11-15","audit_start":"2026-11-16","audit_end":"2026-11-18"},"dimensions":[19,7],"unit":"un control curricular sobre una unidad analítica","join_key":"llave documentada por fuente","privacy":{"personal_identifiers":False,"synthetic":True},"growth":{"from":"G3-espera","to":"G3-espera"},"data_state":["L4.4","dataset_confiable@L5.H1"],"label":"Fixture sintética de controles; los demos en vivo usan snapshots públicos registrados"},
    }


if __name__ == "__main__":
    generate(config())
