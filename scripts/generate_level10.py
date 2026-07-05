#!/usr/bin/env python3
"""Generate Level 10: responsible analysis, communication and reproducibility."""

from __future__ import annotations

from datetime import date, timedelta
import random

from advanced_level_support import lesson
from narrative_level_factory import generate


SEED = 20270923


def audit_dataset() -> list[dict[str, object]]:
    """Aggregate, consented audit cells; never individual people or inferred traits."""
    rng = random.Random(SEED)
    groups = [
        ("canal_digital", "digital"),
        ("mostrador", "presencial"),
        ("apoyo_accesible_solicitado", "mixto"),
        ("sin_apoyo_reportado", "mixto"),
    ]
    rows: list[dict[str, object]] = []
    start = date(2027, 11, 1)
    for week in range(12):
        for group_index, (group, channel) in enumerate(groups):
            eligible = 28 + group_index * 4 + rng.randint(0, 8)
            offer_rate = [0.90, 0.69, 0.61, 0.84][group_index] + week * 0.006
            offered = min(eligible, round(eligible * offer_rate))
            completed = max(0, offered - rng.randint(1, 4))
            wait = round([7.1, 10.8, 12.4, 8.0][group_index] - week * 0.06 + rng.uniform(-0.7, 0.7), 1)
            complaints = max(0, round((eligible - completed) * 0.18 + rng.uniform(-0.5, 0.8)))
            rows.append({
                "periodo_semana": (start + timedelta(days=7 * week)).isoformat(),
                "grupo_auditoria_agregado": group,
                "canal": channel,
                "elegibles": eligible,
                "ofrecidos": offered,
                "completados": completed,
                "espera_mediana_min": wait,
                "quejas_agregadas": complaints,
                "retencion_dias": 30,
                "consentimiento_agregado": 1,
            })
    assert len(rows) == 48
    assert all(row["elegibles"] >= 25 for row in rows)
    assert all(row["ofrecidos"] <= row["elegibles"] for row in rows)
    assert all(row["completados"] <= row["ofrecidos"] for row in rows)
    return rows


def config() -> dict[str, object]:
    rows = audit_dataset()
    specs = [
        ("representation", "Representación", "Auditar quién aparece y quién falta antes de generalizar.", "Representación describe qué poblaciones aparecen y cuáles quedan fuera.", "cobertura y ausencias por grupo", "Paco compara el canal digital con el mostrador y solicitudes de apoyo.", "Una mesa llena no significa que escuchamos a todos.", "Conservo denominadores y marco ausencias.", (48, 4), "L10-E1", "auditoria_agregada@L10.1", "grupo_auditoria_agregado, elegibles, ofrecidos"),
        ("fairness", "Fairness", "Comparar tasas por grupo sin confundir una métrica con justicia total.", "Fairness exige definir grupo, resultado y daño relevante.", "tasas con denominadores comparables", "Las tasas de oferta difieren entre grupos agregados.", "Enséñame a quién le funciona y a quién le cuesta.", "Comparo tasas y daño; no declaro justicia total.", (.61, .90), "L10-E1", "auditoria_agregada@L10.1", "grupo_auditoria_agregado, elegibles, ofrecidos"),
        ("harm", "Daño", "Trazar consecuencias concentradas que un promedio puede ocultar.", "Un análisis de daño sigue rutas desde una decisión hasta sus consecuencias.", "ruta de decisión a consecuencia", "Una regla de cupo aumenta espera para quien solicita apoyo.", "Si el promedio mejora pero alguien queda afuera, todavía hay problema.", "Registro alcance, severidad y reversibilidad.", (8.0, 12.4), "L10-E1", "mapa_dano@L10.1", "espera_mediana_min, quejas_agregadas"),
        ("privacy", "Privacidad", "Minimizar campos, acceso y retención según propósito.", "Privacidad limita colección, uso, acceso y retención.", "campos, propósito, acceso y retención", "Rogelio explica por voluntad propia qué ajuste necesita y pide no conservar detalles.", "Eso me lo dijo él; no lo adivinó ninguna tabla.", "Guardo solo la solicitud operativa agregada por treinta días.", (90, 30), "L10-E1", "politica_privacidad@L10.1", "retencion_dias, consentimiento_agregado"),
        ("audience", "Audiencia", "Adaptar detalle y lenguaje sin alterar la evidencia.", "La audiencia determina contexto, lenguaje y acción necesaria.", "capas de detalle por audiencia", "El mismo hallazgo debe servir a Don Juan, al turno y a una revisión.", "A mí dime qué hacemos; al archivo déjale cómo lo supimos.", "Cambio la capa, no el resultado ni su certeza.", (1, 3), "L10-E2", "informe_responsable@L10.2", "grupo_auditoria_agregado, espera_mediana_min"),
        ("uncertainty-communication", "Comunicación de incertidumbre", "Presentar estimación, rango y supuestos juntos.", "Comunicar incertidumbre separa estimación, rango y supuestos.", "estimación e intervalo anotado", "Paco prepara una tasa semanal con variación visible.", "No me entregues un decimal como si fuera promesa.", "Muestro rango y periodo junto a la estimación.", (.69, .84), "L10-E2", "informe_responsable@L10.2", "periodo_semana, elegibles, ofrecidos"),
        ("annotation", "Anotación", "Conectar una marca visual con contexto verificable y un límite.", "Una anotación conecta una marca visual con contexto verificable.", "marca, fuente y límite", "Una semana cambia después de una capacitación documentada.", "Señala lo que pasó; no inventes que eso lo causó.", "Anoto evento y fuente sin atribuir causalidad.", (6, 7), "L10-E2", "informe_responsable@L10.2", "periodo_semana, espera_mediana_min"),
        ("data-narrative", "Narrativa de datos", "Encadenar evidencia, interpretación, decisión y revisión.", "Una narrativa de datos conserva la cadena de evidencia.", "evidencia, interpretación y decisión", "Paco ordena el informe para que la recomendación no aparezca antes de la evidencia.", "La historia sirve si también deja ver dónde se puede equivocar.", "Cada afirmación conserva fuente, alcance y siguiente revisión.", (3, 4), "L10-E2", "informe_responsable@L10.2", "ofrecidos, completados, espera_mediana_min"),
        ("seeds", "Semillas", "Repetir aleatoriedad computacional y probar sensibilidad.", "Una semilla fija aleatoriedad computacional reproducible.", "ejecuciones repetidas con semilla", "Paco reproduce el muestreo del reporte.", "Si lo vuelves a correr, quiero saber por qué cambia.", "Registro semilla y repito con otra como sensibilidad.", (2027, 2027), "L10-E3", "reproducibilidad@L10.3", "periodo_semana, grupo_auditoria_agregado"),
        ("versions", "Versiones", "Enlazar datos, código, reglas y salidas.", "Versionar enlaza cada salida con entradas y transformaciones.", "linaje de datos, código y salida", "Una regla de agregación cambia entre dos informes.", "No sobrescribas el camino aunque el total se parezca.", "Cada salida nombra versiones y hash.", (3, 4), "L10-E3", "reproducibilidad@L10.3", "periodo_semana, retencion_dias"),
        ("data-dictionary", "Diccionario de datos", "Definir unidad, tipo, origen, disponibilidad y límites.", "Un diccionario define significado, tipo, origen y límites.", "mapa semántico de campos", "El campo ofrecidos se confunde con completados.", "El nombre cortito no me dice qué contó.", "Documento numerador, unidad y momento de disponibilidad.", (10, 10), "L10-E3", "reproducibilidad@L10.3", "elegibles, ofrecidos, completados"),
        ("clean-notebook", "Notebook limpio", "Ejecutar carga, validación, análisis y salida sin estado oculto.", "Un notebook limpio ejecuta de principio a fin sin estado oculto.", "pipeline ordenado y verificable", "Paco reinicia el análisis y descubre una celda fuera de orden.", "Si depende de un truco de ayer, hoy no está terminado.", "Reinicio, ejecuto todo y valido el hash final.", (7, 4), "L10-E3", "reproducibilidad@L10.3", "periodo_semana, grupo_auditoria_agregado"),
        ("project-question", "Pregunta del proyecto", "Acotar población, resultado, periodo y decisión.", "Una pregunta analítica nombra unidad, resultado y decisión.", "alcance de la pregunta", "El mini-proyecto pregunta si el local puede abrir sin excluir solicitudes de apoyo.", "Quiero una pregunta que sí podamos responder y revisar.", "Congelo unidad, resultado, periodo y decisión.", (5, 3), "L10-E4", "mini_proyecto@L10.4", "periodo_semana, grupo_auditoria_agregado"),
        ("project-data", "Datos del proyecto", "Elegir fuente por cobertura, calidad, permiso y procedencia.", "La elección de datos considera cobertura, calidad y permiso.", "procedencia y permiso de datos", "Paco descarta comentarios libres y conserva agregados consentidos.", "Tener el archivo no significa que debamos usarlo.", "La fuente elegida tiene propósito, retención y hash.", (2, 1), "L10-E4", "mini_proyecto@L10.4", "consentimiento_agregado, retencion_dias"),
        ("project-analysis", "Análisis del proyecto", "Encadenar operaciones compatibles con pregunta y datos.", "El análisis aplica operaciones compatibles con pregunta y datos.", "flujo de análisis trazable", "Paco calcula coberturas, esperas y fallos por grupo agregado.", "Haz solo los pasos que ayuden a decidir.", "Valido denominadores y separo observación de explicación.", (6, 4), "L10-E4", "mini_proyecto@L10.4", "elegibles, ofrecidos, espera_mediana_min"),
        ("project-evaluation", "Evaluación del proyecto", "Contrastar aceptación, fallos, privacidad y subgrupos.", "Evaluar contrasta aceptación y casos de fallo.", "tarjeta de criterios y fallos", "El promedio cumple pero un grupo conserva espera alta.", "No abras por promedio si el daño sigue escondido.", "El gate incluye privacidad, subgrupos y reversibilidad.", (8.2, 12.1), "L10-E4", "mini_proyecto@L10.4", "grupo_auditoria_agregado, espera_mediana_min"),
        ("project-communication", "Comunicación del proyecto", "Entregar acción, evidencia, incertidumbre y siguiente revisión.", "Comunicar cierra con acción, incertidumbre y siguiente revisión.", "brief de decisión responsable", "Paco entrega una apertura limitada de un solo local.", "Dime qué sabemos, qué no y cuándo volvemos a mirar.", "La recomendación es reversible y no promete causalidad.", (1, 4), "L10-E4", "mini_proyecto@L10.4", "periodo_semana, ofrecidos, completados"),
    ]
    items = []
    for i, spec in enumerate(specs, 1):
        slug, title, objective, definition, mechanism, setup, don, paco, pair, episode, data_state, variables = spec
        guest = None
        if slug == "privacy": guest = {"name": "Rogelio", "line": "Yo pedí ese ajuste y autorizo que solo cuenten la solicitud agregada; no guarden el detalle."}
        if slug == "project-communication": guest = {"name": "Chava", "line": "Yo sigo con mi taller de radio; el local no convierte mi historia en una etiqueta de datos."}
        items.append(lesson(level=10, slug=slug, title=title, objective=objective, definition=definition,
            mechanism=mechanism, setup=setup, don=don, paco=paco,
            subtitles=(definition, paco), scene=i, episode=episode, data_state=data_state,
            values=(pair, (pair[1], pair[0])), variables=variables,
            unit="una observación es una celda semanal agregada con al menos 25 elegibles; no hay registros individuales",
            limit="Los grupos son categorías de auditoría consentidas y agregadas; ninguna tabla infiere identidad, intención ni rasgos personales.",
            context="Paco audita otra decisión del local con datos agregados", pressure="la recomendación debe ser útil sin ocultar exclusión, daño o incertidumbre",
            decision="documentar evidencia, permiso, límite y revisión antes de recomendar", guest=guest))
    blocks = [
        {"id":"ethics","number":1,"title":"Ética y sesgo","description":"Representación, fairness, daño y privacidad.","href":"etica-sesgo.html","dataset_id":"palmer-penguins","concepts":items[:4]},
        {"id":"communication","number":2,"title":"Comunicación","description":"Audiencia, incertidumbre, anotación y narrativa.","href":"comunicacion.html","dataset_id":"bike-sharing-day","concepts":items[4:8]},
        {"id":"reproducibility","number":3,"title":"Reproducibilidad","description":"Semillas, versiones, diccionario y notebook limpio.","href":"reproducibilidad.html","dataset_id":"plant-growth","concepts":items[8:12]},
        {"id":"mini-project","number":4,"title":"Mini-proyecto","description":"Pregunta, datos, análisis, evaluación y comunicación.","href":"mini-proyecto.html","dataset_id":"wine-quality","concepts":items[12:]},
    ]
    schema = list(rows[0])
    return {"level":10,"output":"data-class-responsible-level-10","title":"Análisis responsable y reproducible",
        "summary":"Paco audita representación, daño y privacidad antes de entregar un mini-proyecto trazable para un solo local.",
        "blocks":blocks,"previousConcept":"Efecto práctico","nextConcept":"Producto de datos con contrato y tests",
        "agentCompetency":"Auditar datos, argumentos y entregables sin inferir rasgos personales ni ocultar daño.",
        "continuityDelta":"Rogelio y Chava revelan voluntariamente sus necesidades y planes; nunca se infieren desde datos.",
        "growthDelta":"G6-prepedido → G7-local; un local de 5×4 m, 18 asientos y cuatro puestos pagados; no cadena.",
        "narrativeDatasets":[{"path":"datasets/narrative/auditoria_responsable_nivel_10.csv","rows":rows,"schema":schema}],
        "narrativeMetadata":{"metadataPath":"datasets/narrative/nivel_10.metadata.json","id":"auditoria-responsable-nivel-10","synthetic":True,
            "generator":"level10-responsible-v1","seed":SEED,"period":{"start":rows[0]["periodo_semana"],"end":rows[-1]["periodo_semana"],"weeks":12},
            "dimensions":[48,len(schema)],"privacy":{"unit":"celda semanal agregada","minimum_cell":25,"personal_identifiers":False,"free_text":False,"retention_days":30,"consent":"categorías reportadas voluntariamente y agregadas"},
            "formulas":{"offer_rate":"ofrecidos / elegibles","completion_rate":"completados / ofrecidos"},
            "growth":{"from":"G6-prepedido","to":"G7-local","constraint":"un local; 18 asientos; 4 puestos pagados"},
            "data_state":["L9.4","auditoria_agregada@L10.1","informe_responsable@L10.2","reproducibilidad@L10.3","mini_proyecto@L10.4"],
            "label":"Dataset sintético agregado; no representa ni permite identificar personas reales"}}


if __name__ == "__main__":
    generate(config())
