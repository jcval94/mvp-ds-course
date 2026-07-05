#!/usr/bin/env python3
"""Generate Level 12: responsible operation, monitoring and retirement."""

from __future__ import annotations

from datetime import date, timedelta
import math
import random

from advanced_level_support import lesson
from narrative_level_factory import generate


SEED = 20280115


def monitoring_dataset() -> list[dict[str, object]]:
    rng = random.Random(SEED)
    rows: list[dict[str, object]] = []
    start = date(2028, 1, 22)
    for i in range(96):
        phase = "referencia" if i < 48 else "monitoreo"
        shift = 0 if i < 60 else min(1, (i - 59) / 24)
        orders = round(78 + 5 * math.sin(i * 2 * math.pi / 7) + 8 * shift + rng.gauss(0, 2.2))
        score_mean = round(.64 + .03 * math.sin(i / 8) + .08 * shift + rng.uniform(-.015, .015), 3)
        actual_rate = round(.63 + .02 * math.sin(i / 8) - .07 * shift + rng.uniform(-.02, .02), 3)
        mae = round(5.3 + .7 * math.sin(i / 10) + 3.2 * shift + rng.uniform(-.4, .4), 2)
        calibration_gap = round(abs(score_mean - actual_rate), 3)
        persistent = int(i >= 72 and calibration_gap > .08)
        rows.append({
            "snapshot_id": f"L12-M{i+1:03d}", "fecha": (start + timedelta(days=i)).isoformat(), "fase": phase,
            "pedidos_totales": orders, "score_medio": score_mean, "frecuencia_observada": actual_rate,
            "mae_confirmado": mae if i <= 88 else "", "retraso_etiqueta_dias": 7,
            "brecha_calibracion": calibration_gap, "alerta_persistente": persistent,
            "procedimiento_activo": int(i < 82), "aprobacion_humana": int(i < 82),
            "version_datos": "v1" if i < 48 else "v2", "version_regla": "r3",
        })
    assert len(rows) == 96
    assert all(row["mae_confirmado"] == "" for row in rows[-7:])
    assert any(row["alerta_persistente"] for row in rows)
    assert all(not row["procedimiento_activo"] for row in rows[82:])
    return rows


def incident_dataset() -> list[dict[str, object]]:
    rows = [
        ("INC-01","media","calibracion","pedidos digitales","8 días","ajustar alerta","verificado"),
        ("INC-02","alta","privacidad","comentarios libres","2 horas","detener captura","verificado"),
        ("INC-03","baja","disponibilidad","tablero docente","35 minutos","usar snapshot offline","verificado"),
        ("INC-04","alta","desempeno","turno sábado","3 días","rollback a regla r2","verificado"),
        ("INC-05","media","datos","conteo duplicado","1 día","restaurar datos v1","verificado"),
        ("INC-06","media","operacion","alertas repetidas","5 días","exigir persistencia","verificado"),
        ("INC-07","alta","equidad","solicitudes de apoyo","4 días","detener y revisar","verificado"),
        ("INC-08","baja","retiro","archivo dependiente","1 día","archivar y notificar","verificado"),
    ]
    return [{"incidente_id":a,"severidad":b,"tipo":c,"alcance":d,"duracion":e,"accion":f,"comprobacion":g,
             "culpa_individual":0,"revision_humana":1} for a,b,c,d,e,f,g in rows]


def config() -> dict[str, object]:
    monitoring = monitoring_dataset(); incidents = incident_dataset()
    specs = [
        ("operational-readiness","Readiness operativo","Decidir si un producto ya construido puede entrar en operación bajo límites explícitos.","Readiness operativo contrasta artifact, baseline, privacidad, autoridad y reversibilidad antes de activar.","gate operativo sobre un producto ya construido","El equipo recibe `producto_operable@L11.H1` y revisa si puede encenderlo sin modificar su construcción.","Si falta una condición, sigue apagado.","El gate operativo queda versionado y requiere evidencia actual.",(3,2),"L12-E1","readiness@L12.1","aprobacion_humana, procedimiento_activo"),
        ("baseline","Baseline","Comparar complejidad contra una referencia simple y relevante.","Un baseline establece referencia explícita de desempeño y costo.","referencia simple frente a propuesta","Una regla estable compite con el procedimiento nuevo.","Lo complicado tiene que ganarse su lugar.","Comparo error, estabilidad y costo contra la referencia.",(.72,.79),"L12-E1","readiness@L12.1","mae_confirmado, version_regla"),
        ("rollback","Rollback","Diseñar condición, estado seguro y verificación antes del incidente.","Rollback restaura un procedimiento anterior verificable.","señal, estado seguro y comprobación","El equipo ensaya volver a la regla r2.","Quiero saber cómo regresamos antes de avanzar.","Documento señal, dueño, pasos y verificación.",(3,4),"L12-E1","readiness@L12.1","version_regla, procedimiento_activo"),
        ("human-approval","Aprobación humana","Dar a una persona informada autoridad real para detener.","Aprobación humana requiere rol, información y poder real de detener.","bucle con evidencia, autoridad y motivo","Don Juan recibe evidencia y conserva el interruptor.","Si no puedo detenerlo, mi firma es adorno.","La aprobación deja actor, evidencia y motivo.",(1,1),"L12-E1","readiness@L12.1","aprobacion_humana, procedimiento_activo"),
        ("data-drift","Data drift","Comparar entradas actuales con una referencia versionada.","Data drift es cambio en entradas respecto de referencia.","distribuciones de referencia y periodo actual","Los pedidos suben después de la apertura del local.","Que cambie la fila no prueba que la regla ya falle.","Separo cambio de entrada de desempeño confirmado.",(78,86),"L12-E2","monitoring@L12.2","fase, pedidos_totales"),
        ("performance-drift","Performance drift","Seguir deterioro con resultados confirmados y retraso explícito.","Performance drift es deterioro de resultados medidos.","error confirmado a través del tiempo","El MAE aumenta, pero las últimas etiquetas tardan siete días.","No rellenes lo que todavía no sabemos.","Marco el retraso y no uso proxy como verdad.",(5.3,8.5),"L12-E2","monitoring@L12.2","fecha, mae_confirmado, retraso_etiqueta_dias"),
        ("calibration-drift","Calibration drift","Revisar si scores conservan correspondencia con frecuencias.","Calibration drift rompe correspondencia entre score y frecuencia.","score frente a frecuencia por periodo","Los scores suben mientras la frecuencia observada baja.","Que ordene bien no significa que diga bien la probabilidad.","Comparo curva actual con referencia y límites.",(.03,.15),"L12-E2","monitoring@L12.2","score_medio, frecuencia_observada, brecha_calibracion"),
        ("alert-threshold","Umbral de alerta","Combinar banda, persistencia, dueño y acción.","Una alerta combina umbral, duración y acción.","banda, persistencia y escalamiento","Variaciones aisladas generan ruido hasta exigir tres cortes.","Una campana que nunca calla deja de avisar.","La alerta exige persistencia y revisión humana.",(1,3),"L12-E2","monitoring@L12.2","brecha_calibracion, alerta_persistente"),
        ("triage","Triage","Priorizar por daño, alcance y reversibilidad.","Triage prioriza incidentes por daño, alcance y reversibilidad.","severidad, alcance y reversibilidad","Ocho incidentes compiten por atención.","Primero lo que puede dañar, no lo que haga más ruido.","Clasifico con criterios y escalo privacidad y equidad.",(8,3),"L12-E3","incidents@L12.3","severidad, tipo, alcance"),
        ("impact","Impacto","Registrar afectados, consecuencia, magnitud y duración.","Impacto registra quién, qué, cuánto y durante cuánto tiempo.","mapa de afectados y consecuencias","El error global oculta solicitudes de apoyo afectadas.","El promedio no recibe el daño; la gente sí.","Mapeo alcance y duración sin datos personales.",(1,4),"L12-E3","incidents@L12.3","alcance, duracion, tipo"),
        ("operational-rollback","Rollback operativo","Ejecutar reversión con responsables y comprobación.","Rollback operativo sigue pasos, responsables y verificación.","línea de tiempo de reversión","El incidente INC-04 obliga a volver a r2.","Regresar no basta: comprueba que de verdad regresó.","Detengo, revierto, valido y registro.",(3,4),"L12-E3","incidents@L12.3","incidente_id, accion, comprobacion"),
        ("postmortem","Postmortem","Reconstruir hechos y mejorar controles sin buscar culpable.","Un postmortem reconstruye hechos, controles y acciones.","ciclo de hechos, controles y acciones","El equipo revisa por qué la alerta temprana no escaló.","Arreglemos el sistema, no fabriquemos un culpable.","La acción correctiva tiene dueño y verificación.",(0,4),"L12-E3","incidents@L12.3","culpa_individual, revision_humana, comprobacion"),
        ("model-card","Model card","Documentar propósito, datos, métricas, usos y límites.","Una model card documenta propósito, datos, métricas y límites.","tarjeta de propósito y límites","Paco resume el procedimiento para quien lo reciba.","La ficha debe decir cuándo no usarlo.","Documento no reemplaza seguridad ni aprobación.",(3,4),"L12-E4","handoff@L12.4","version_datos, version_regla"),
        ("runbook","Runbook","Convertir señales en pasos verificables y escalamiento.","Un runbook convierte una condición en pasos verificables.","flujo de señal, acción, detención y ayuda","Nora ensaya la alerta sin depender de Paco.","Si el manual no dice cuándo parar, no está listo.","Cada paso tiene dueño, evidencia y salida segura.",(3,4),"L12-E4","handoff@L12.4","alerta_persistente, procedimiento_activo"),
        ("audit-log","Audit log","Registrar evento, momento, actor, versión y motivo con integridad.","Un audit log registra qué ocurrió, cuándo, quién y por qué.","cadena reconstruible de cambios","El equipo reconstruye la reversión sin sobrescribir entradas.","Quiero el camino, no solo el número final.","Cada cambio conserva versión y motivo.",(4,5),"L12-E4","handoff@L12.4","snapshot_id, fecha, version_datos, version_regla"),
        ("retirement","Retiro","Desactivar uso preservando evidencia, obligaciones y comunicación.","Retirar elimina uso activo preservando evidencia y obligaciones.","desactivar, archivar, comunicar y verificar","El procedimiento deja de aportar y el equipo practica apagarlo.","También termina bien lo que se sabe apagar.","El uso queda desactivado; archivo y dependencias se verifican.",(1,0),"L12-E4","handoff@L12.4","procedimiento_activo, version_regla"),
    ]
    items=[]
    for i,s in enumerate(specs,1):
        slug,title,objective,definition,mechanism,setup,don,paco,pair,episode,data_state,variables=s
        guest={"name":"Nora","line":"Yo puedo seguir el runbook y detener el procedimiento; si no entiendo una señal, escalo."} if slug in {"runbook","operational-rollback"} else None
        items.append(lesson(level=12,slug=slug,title=title,objective=objective,definition=definition,mechanism=mechanism,
            setup=setup,don=don,paco=paco,subtitles=(definition,paco),scene=i,episode=episode,data_state=data_state,
            values=(pair,(pair[1],pair[0])),variables=variables,
            unit="una observación es un snapshot diario agregado o un incidente operativo simulado; nunca una persona",
            limit="Los tableros son estáticos y educativos: toda alerta requiere revisión humana; el producto ya existe y aquí no se construye, empaqueta ni despliega.",
            context="El equipo simula otra condición operativa del único local",pressure="la respuesta debe ser reversible, auditable y proporcional al daño",
            decision="detener cuando corresponda, conservar evidencia, verificar y escalar con autoridad explícita",guest=guest))
    blocks=[
        {"id":"operational-readiness","number":1,"title":"Readiness operativo","description":"Gate operativo, baseline, ensayo de rollback y autoridad humana sobre un artifact existente.","href":"readiness-operativo.html","dataset_id":"plant-growth","concepts":items[:4]},
        {"id":"monitoring","number":2,"title":"Monitoreo","description":"Drift de datos, desempeño, calibración y alertas.","href":"monitoreo.html","dataset_id":"bike-sharing-day","concepts":items[4:8]},
        {"id":"incident-response","number":3,"title":"Respuesta a incidentes","description":"Triage, impacto, rollback operativo y postmortem.","href":"incidentes.html","dataset_id":"wine-quality","concepts":items[8:12]},
        {"id":"responsible-handoff","number":4,"title":"Entrega responsable","description":"Model card, runbook, audit log y retiro.","href":"entrega-responsable.html","dataset_id":"palmer-penguins","concepts":items[12:]},
    ]
    monitoring_schema=list(monitoring[0]); incident_schema=list(incidents[0])
    return {"level":12,"output":"data-class-operations-level-12","title":"Operación y monitoreo responsable",
        "summary":"El equipo opera un producto ya construido: readiness, monitoreo, incidentes, rollback, auditoría y retiro.",
        "blocks":blocks,"previousConcept":"Producto de datos con contrato y tests","nextConcept":"Cierre de la ruta",
        "agentCompetency":"Diseñar operación simulada con autoridad humana, reversibilidad, trazabilidad y retiro.",
        "continuityDelta":"Paco entrega documentación y continúa sus estudios; Nora y Don Juan pueden detener y verificar sin depender de él.",
        "growthDelta":"G7-local → G7-local; un solo local, 18 asientos y cuatro puestos pagados; no expansión.",
        "narrativeDatasets":[
            {"path":"datasets/narrative/monitoreo_operativo_nivel_12.csv","rows":monitoring,"schema":monitoring_schema},
            {"path":"datasets/narrative/incidentes_operativos_nivel_12.csv","rows":incidents,"schema":incident_schema}],
        "narrativeMetadata":{"metadataPath":"datasets/narrative/nivel_12.metadata.json","id":"operacion-responsable-nivel-12","synthetic":True,
            "generator":"level12-operations-v1","seed":SEED,"period":{"start":monitoring[0]["fecha"],"end":monitoring[-1]["fecha"],"snapshots":96},
            "dimensions":{"monitoring":[96,len(monitoring_schema)],"incidents":[8,len(incident_schema)]},
            "reference_policy":{"reference_snapshots":48,"monitoring_snapshots":48,"label_delay_days":7,"latest_unlabeled":7},
            "alert_policy":{"calibration_gap":.08,"persistence_snapshots":3,"action":"human review; stop authority retained","automatic_decision":False},
            "rollback":{"safe_version":"r2","current_version":"r3","verification_required":True},
            "privacy":{"personal_identifiers":False,"unit":"snapshot agregado o incidente simulado"},
            "growth":{"from":"G7-local","to":"G7-local","constraint":"sin crecimiento ni backend"},
            "data_state":["producto_operable@L11.H1","readiness@L12.1","monitoring@L12.2","incidents@L12.3","handoff@L12.4"],
            "label":"Datasets sintéticos operativos; no representan personas, fraude ni un servicio productivo"},
        "updatedAt":"2026-07-04"}


if __name__ == "__main__":
    generate(config())
