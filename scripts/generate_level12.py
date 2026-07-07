#!/usr/bin/env python3
"""Generate Level 12: AI systems engineering."""

from __future__ import annotations

from full_level_support import concept_lesson
from narrative_level_factory import generate


SPECS = [
    ("model-boundary", "Modelo e inferencia", "modelo, contexto, aplicación, entorno, harness", "modelo como pieza dentro de un sistema con fronteras visibles"),
    ("context-window-budget", "Ventana y presupuesto de contexto", "tokens, selección, descarte, compaction", "presupuesto de contexto que obliga a seleccionar y compactar"),
    ("system-boundaries", "App, workflow, agente y sistema", "modelo, aplicación, workflow, agente, sistema", "componentes con responsabilidades distintas"),
    ("agent-vs-workflow", "Agente frente a workflow", "pasos fijos, observación, decisión, acción", "diferencia entre ruta fija y decisión iterativa"),
    ("context-assembly", "Context assembly y compaction", "contexto disponible, selección, ensamblaje, memoria", "ensamblaje de contexto relevante y reducción de ruido"),
    ("structured-output-contract", "Output estructurado y schema", "schema, validación, parsing, reparación", "salida libre que pasa a contrato validable"),
    ("knowledge-corpus", "Corpus, chunks y metadata", "documento, chunk, metadata, procedencia", "conocimiento externo organizado para recuperación"),
    ("retrieval-evidence", "Retrieval, reranking y abstención", "consulta, ranking, evidencia, cita, abstención", "búsqueda que separa encontrar evidencia de usarla correctamente"),
    ("tool-contract", "Contrato de tool", "nombre, input_schema, output_schema, permiso", "capacidad atómica expuesta por el sistema"),
    ("tool-execution-errors", "Ejecución, error y retry de tool", "argumentos, ejecución, resultado, error, retry", "acción ejecutada con resultado verificable y manejo de fallo"),
    ("skill-procedure", "Skill como procedimiento reutilizable", "instrucciones, scripts, referencias, validaciones", "procedimiento portable que coordina tools y criterios"),
    ("progressive-disclosure", "Progressive disclosure", "descubrir, activar, ejecutar, recursos", "capacidad disponible sin cargar todo el procedimiento en contexto"),
    ("agent-loop", "Agent loop", "objetivo, observar, decidir, actuar, terminar", "loop que permite continuar trabajando bajo observación"),
    ("loop-families", "Familia de loops", "execution, tool-use, retrieval, verification, approval, recovery", "familias de loop agrupadas por problema y criterio de parada"),
    ("state-history-memory", "Contexto, historial, estado y memoria", "contexto, historial, estado, memoria", "distinción entre lo que se usa ahora, lo ocurrido y lo que persiste"),
    ("stop-budgets", "Criterios de parada y budgets", "max_turns, max_cost, max_time, max_tools, max_retries", "límites que hacen controlable la autonomía"),
    ("harness-engineering", "Harness engineering", "instrucciones, contexto, tools, skills, loops, verificación", "sistema alrededor del modelo que controla trabajo repetible"),
    ("environment-engineering", "Environment engineering", "filesystem, terminal, sql, browser, git", "entorno como parte de la capacidad real del agente"),
    ("hooks-checkpoints", "Hooks, checkpoints y resumibilidad", "pre_hook, post_hook, checkpoint, recuperación", "controles alrededor de acciones y puntos de reanudación"),
    ("trace-reconstruction", "Reconstrucción de trayectoria", "evento, tool_call, output, check, decisión", "traza que permite explicar qué hizo el sistema"),
    ("mcp-interoperability", "MCP e interoperabilidad", "cliente, servidor, tools, resources, permisos", "contrato interoperable para capacidades y recursos externos"),
    ("delegation-handoff", "Delegación y handoffs", "supervisor, especialista, contexto, responsabilidad", "traspaso controlado sin perder contexto ni responsabilidad"),
    ("multiagent-limits", "Límites multiagente", "costo, duplicación, pérdida_contexto, control", "varios agentes como tradeoff, no mejora automática"),
    ("system-blueprint", "Blueprint de sistema de IA trazable", "usuario, objetivo, harness, loop, verificación, traza", "blueprint integrador del sistema completo"),
]

BLOCKS = [
    ("model-systems", "Del modelo al sistema", "Modelo, contexto, app, workflow, agente y frontera del sistema.", "modelo-sistema.html", "plant-growth", 0, 4, "arquitectura_sistema_ia@L12.1"),
    ("context-knowledge", "Contexto y conocimiento", "Context assembly, output estructurado, corpus, retrieval y abstención.", "contexto-conocimiento.html", "bike-sharing-day", 4, 8, "conocimiento_contextual@L12.2"),
    ("tools-skills-disclosure", "Tools, skills y disclosure", "Tools con contrato, errores, skills y progressive disclosure.", "tools-skills.html", "wine-quality", 8, 12, "capacidades_procedimentales@L12.3"),
    ("loops-state-stop", "Loops, estado y parada", "Agent loop, familias de loops, memoria, estado y budgets.", "loops-estado.html", "palmer-penguins", 12, 16, "loop_verificable@L12.4"),
    ("harness-environment", "Harness y entorno", "Harness, entorno, hooks, checkpoints y reconstrucción de trayectoria.", "harness-entorno.html", "wine-quality", 16, 20, "harness_recuperable@L12.5"),
    ("interop-delegation", "Interoperabilidad y delegación", "MCP, handoffs, límites multiagente y blueprint completo.", "interoperabilidad-delegacion.html", "plant-growth", 20, 24, "sistema_ia_trazable@L12.H1"),
]


def component_rows() -> list[dict[str, object]]:
    components = [
        ("L12-S01", "model-boundary", "modelo", "prompt y contexto", "inferencia", "harness", "arquitectura"),
        ("L12-S02", "context-window-budget", "presupuesto_contexto", "evidencia candidata", "contexto compacto", "límite_tokens", "arquitectura"),
        ("L12-S03", "system-boundaries", "mapa_sistema", "componentes", "responsabilidades", "fronteras", "arquitectura"),
        ("L12-S04", "agent-vs-workflow", "selector_ruta", "tarea", "workflow_o_agente", "criterio_decisión", "arquitectura"),
        ("L12-S05", "context-assembly", "ensamblador", "fuentes priorizadas", "paquete_contexto", "citas", "contexto"),
        ("L12-S06", "structured-output-contract", "schema_salida", "texto_modelo", "json_validado", "validación_schema", "contexto"),
        ("L12-S07", "knowledge-corpus", "corpus", "documentos", "chunks_metadata", "procedencia", "contexto"),
        ("L12-S08", "retrieval-evidence", "retriever", "consulta", "evidencia_citada", "abstención", "contexto"),
        ("L12-S09", "tool-contract", "tool", "argumentos_schema", "resultado_schema", "permiso", "capacidad"),
        ("L12-S10", "tool-execution-errors", "ejecutor_tool", "llamada", "resultado_o_error", "retry_limitado", "capacidad"),
        ("L12-S11", "skill-procedure", "skill", "objetivo_revisión", "procedimiento", "checklist", "capacidad"),
        ("L12-S12", "progressive-disclosure", "disclosure", "capacidad_descubierta", "recurso_activado", "lectura_selectiva", "capacidad"),
        ("L12-S13", "agent-loop", "loop", "observación", "acción_verificada", "stop_reason", "loop"),
        ("L12-S14", "loop-families", "router_loop", "problema", "familia_loop", "salida_esperada", "loop"),
        ("L12-S15", "state-history-memory", "estado", "historial", "memoria_persistente", "minimización", "loop"),
        ("L12-S16", "stop-budgets", "budget_gate", "turnos_tools_tiempo", "parar_o_continuar", "presupuesto", "loop"),
        ("L12-S17", "harness-engineering", "harness", "instrucciones_contexto_tools", "ejecución_controlada", "checks", "harness"),
        ("L12-S18", "environment-engineering", "entorno", "recursos_disponibles", "acción_permitida", "permisos", "harness"),
        ("L12-S19", "hooks-checkpoints", "checkpoint", "acción_riesgosa", "estado_recuperable", "hooks", "harness"),
        ("L12-S20", "trace-reconstruction", "traza", "eventos", "trayectoria_reconstruible", "integridad", "harness"),
        ("L12-S21", "mcp-interoperability", "mcp", "cliente_servidor", "tools_resources", "aprobación", "interoperabilidad"),
        ("L12-S22", "delegation-handoff", "handoff", "contexto_mínimo", "respuesta_especialista", "criterio_aceptación", "interoperabilidad"),
        ("L12-S23", "multiagent-limits", "coordinación", "tareas_paralelas", "tradeoff", "control", "interoperabilidad"),
        ("L12-S24", "system-blueprint", "blueprint", "producto_operable", "sistema_ia_trazable", "traza_y_parada", "integrador"),
    ]
    return [
        {
            "escena": scene,
            "concepto": concept,
            "componente": component,
            "entrada": source,
            "salida": output,
            "control": control,
            "estado": state,
        }
        for scene, concept, component, source, output, control, state in components
    ]


def trace_rows() -> list[dict[str, object]]:
    rows = [
        ("TR-001", "preparar_decisión_turno", "search_corpus", "technical-review", "sin_contexto", "evidencia_citada", "continue", "read"),
        ("TR-002", "validar_salida", "validate_schema", "technical-review", "respuesta_libre", "json_validado", "continue", "read"),
        ("TR-003", "consultar_datos", "query_sales", "data-quality-review", "tool_ready", "resultado_sql", "continue", "read"),
        ("TR-004", "reintentar_tool", "query_sales", "data-quality-review", "timeout", "retry_agotado", "max_retries", "read"),
        ("TR-005", "pedir_aprobación", "request_approval", "risk-review", "acción_riesgosa", "humano_requerido", "approval_needed", "write"),
        ("TR-006", "compactar_contexto", "compress_context", "context-review", "contexto_largo", "contexto_compacto", "continue", "read"),
        ("TR-007", "recuperar_checkpoint", "load_checkpoint", "recovery-review", "sesión_interrumpida", "estado_recuperado", "continue", "read"),
        ("TR-008", "delegar_revisión", "handoff_specialist", "pedagogy-review", "duda_pedagógica", "respuesta_citada", "continue", "read"),
        ("TR-009", "comparar_agentes", "parallel_review", "coordination-review", "doble_respuesta", "conflicto_detectado", "human_review", "read"),
        ("TR-010", "abstenerse", "search_corpus", "evidence-review", "sin_fuente", "respuesta_bloqueada", "insufficient_evidence", "read"),
        ("TR-011", "registrar_traza", "append_trace", "trace-review", "decisión_lista", "log_inmutable", "complete", "write"),
        ("TR-012", "cerrar_blueprint", "export_blueprint", "final-review", "checks_completos", "sistema_ia_trazable", "complete", "write"),
    ]
    return [
        {
            "traza_id": trace_id,
            "objetivo": objective,
            "tool": tool,
            "skill": skill,
            "estado_antes": before,
            "estado_despues": after,
            "stop_reason": stop,
            "permiso": permission,
        }
        for trace_id, objective, tool, skill, before, after, stop, permission in rows
    ]


def config() -> dict[str, object]:
    lessons = []
    for index, spec in enumerate(SPECS, start=1):
        slug, title, variables, mechanism = spec
        block = next(block for block in BLOCKS if block[5] < index <= block[6])
        data_state = "sistema_ia_trazable@L12.H1" if slug == "system-blueprint" else block[7]
        item = concept_lesson(
            level=12,
            scene_number=index,
            slug=slug,
            title=title,
            mechanism=mechanism,
            variables=variables,
            unit="un componente, capacidad, estado o evento de traza del sistema de IA educativo",
            data_state=data_state,
            episode=f"L12-E{BLOCKS.index(block) + 1}",
        )
        item["error"] = "Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor."
        item["practiceCases"][0]["wrong1"] = "Aceptar la salida porque parece razonable aunque falte evidencia visual."
        item["practiceCases"][0]["wrong2"] = "Permitir la acción sin contrato, permiso, traza o criterio de parada."
        item["practiceCases"][1]["wrong1"] = "Reutilizar el blueprint anterior aunque cambien contexto, capacidad o riesgo."
        item["practiceCases"][1]["wrong2"] = "Agregar otro agente sin resolver primero la frontera y el control."
        lessons.append(item)

    component_data = component_rows()
    trace_data = trace_rows()
    blocks = [
        {
            "id": block_id,
            "number": number,
            "title": title,
            "description": description,
            "href": href,
            "dataset_id": dataset_id,
            "concepts": lessons[start:end],
        }
        for number, (block_id, title, description, href, dataset_id, start, end, _state) in enumerate(BLOCKS, start=1)
    ]
    return {
        "level": 12,
        "output": "data-class-ai-systems-level-12",
        "title": "Ingeniería de Sistemas de IA",
        "summary": "Diseña un sistema de IA trazable con contexto, conocimiento, tools, skills, loops, permisos, checkpoints y harness explícito.",
        "blocks": blocks,
        "previousConcept": "Producto operable con contrato y handoff",
        "nextConcept": "Readiness operativo",
        "agentCompetency": "Diseñar y auditar un sistema de IA mediante contexto, tools, skills, loops y un harness explícito.",
        "continuityDelta": "Paco convierte el producto operable en un blueprint trazable; Don Juan puede pedir evidencias, permisos y puntos de parada.",
        "growthDelta": "G7-local → G7-local; un solo local, 18 asientos y cuatro puestos pagados; no expansión.",
        "updatedAt": "2026-07-07",
        "narrativeDatasets": [
            {
                "path": "datasets/narrative/componentes_sistema_ia_nivel_12.csv",
                "rows": component_data,
                "schema": list(component_data[0]),
            },
            {
                "path": "datasets/narrative/trazas_sistema_ia_nivel_12.csv",
                "rows": trace_data,
                "schema": list(trace_data[0]),
            },
        ],
        "narrativeMetadata": {
            "metadataPath": "datasets/narrative/nivel_12.metadata.json",
            "id": "sistema-ia-trazable-nivel-12",
            "synthetic": True,
            "generator": "level12-ai-systems-v1",
            "seed": 20280218,
            "period": {"start": "2028-01-22", "end": "2028-02-18", "snapshots": 24},
            "dimensions": {"components": [24, 7], "traces": [12, 8]},
            "source_policy": {
                "mcp_reference": "Model Context Protocol documentation and tools specification 2025-06-18",
                "provider_neutral": True,
                "real_ai_calls": False,
            },
            "control_policy": {
                "human_approval_required_for_write": True,
                "stop_reasons": ["complete", "max_retries", "approval_needed", "human_review", "insufficient_evidence"],
                "automatic_decision": False,
            },
            "privacy": {
                "personal_identifiers": False,
                "unit": "componente de arquitectura o evento de traza educativo",
                "persistent_memory_requires_purpose": True,
            },
            "growth": {"from": "G7-local", "to": "G7-local", "constraint": "sin backend, proveedor ni expansión"},
            "data_state": [
                "producto_operable@L11.H1",
                "arquitectura_sistema_ia@L12.1",
                "conocimiento_contextual@L12.2",
                "capacidades_procedimentales@L12.3",
                "loop_verificable@L12.4",
                "harness_recuperable@L12.5",
                "sistema_ia_trazable@L12.H1",
            ],
            "label": "Datasets sintéticos de arquitectura y trazas; no representan personas, secretos ni un servicio productivo",
        },
    }


if __name__ == "__main__":
    generate(config())
