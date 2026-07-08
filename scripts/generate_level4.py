#!/usr/bin/env python3
"""Generate Level 4: relationships, correlation, confounding, and cross-tabs."""

from __future__ import annotations

from datetime import date, timedelta
import math
import random
import statistics

from narrative_level_factory import generate


def pearson(xs: list[float], ys: list[float]) -> float:
    mx, my = statistics.mean(xs), statistics.mean(ys)
    numerator = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    denominator = math.sqrt(sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys))
    return numerator / denominator


def ranks(values: list[float]) -> list[float]:
    ordered = sorted(enumerate(values), key=lambda pair: pair[1])
    result = [0.0] * len(values)
    start = 0
    while start < len(ordered):
        end = start
        while end + 1 < len(ordered) and ordered[end + 1][1] == ordered[start][1]:
            end += 1
        rank = (start + end + 2) / 2
        for pos in range(start, end + 1):
            result[ordered[pos][0]] = rank
        start = end + 1
    return result


def make_dataset() -> list[dict[str, object]]:
    rng = random.Random(20260827)
    dates: list[date] = []
    current = date(2026, 8, 27)
    while current <= date(2026, 11, 15):
        if current.weekday() in {3, 4, 5, 6}:
            dates.append(current)
        current += timedelta(days=1)
    names = {3: "jueves", 4: "viernes", 5: "sábado", 6: "domingo"}
    rows: list[dict[str, object]] = []
    for idx, night in enumerate(dates, start=1):
        post = idx > 24
        within = (idx - 1) % 24
        temperature = (21 - within * 0.28 if post else 31 - within * 0.28) + rng.uniform(-0.35, 0.35)
        wait = (18.8 if not post else 9.2) - 0.28 * (temperature - (27 if not post else 17)) + rng.uniform(-0.18, 0.18)
        rain = round(max(0, rng.gauss(2.2 if idx % 5 == 0 else 0.3, 1.1)), 1)
        game = int(idx % 7 in {0, 1})
        payday = int(night.day in {14, 15, 16, 29, 30, 31})
        helper = int(post and night.weekday() in {4, 5})
        orders = max(40, min(60, round(47 + 0.45 * (temperature - 20) + 4 * game + 2 * payday - 0.5 * rain + rng.gauss(0, 2.2))))
        tacos = round(orders * (4.15 + 0.15 * game) + rng.gauss(0, 8))
        waste = round(max(0.4, 4.2 - 0.035 * orders - 0.4 * helper + rng.uniform(-0.25, 0.25)), 2)
        rows.append({
            "noche_id": f"L4-N{idx:02d}", "fecha": night.isoformat(), "dia_semana": names[night.weekday()],
            "etapa_operativa": "espera_marcada" if post else "piloto",
            "temperatura_c": round(temperature, 1), "lluvia_mm": rain, "partido_cerca": game, "quincena": payday,
            "ayudante_programado": helper, "asientos_disponibles": 10 if post else 8,
            "pedidos_totales": orders, "tacos_vendidos": tacos, "espera_mediana_min": round(wait, 1),
            "merma_kg": waste, "agotado_pastor": int(orders >= 56 and not helper), "alta_demanda": int(orders >= 53),
        })
    assert len(rows) == 48 and min(r["pedidos_totales"] for r in rows) >= 40 and max(r["pedidos_totales"] for r in rows) <= 60
    xs = [float(r["temperatura_c"]) for r in rows]; ys = [float(r["espera_mediana_min"]) for r in rows]
    assert pearson(xs, ys) > 0.5
    for stage in {"piloto", "espera_marcada"}:
        group = [r for r in rows if r["etapa_operativa"] == stage]
        assert pearson([float(r["temperatura_c"]) for r in group], [float(r["espera_mediana_min"]) for r in group]) < -0.2
    return rows


def lesson(slug: str, title: str, objective: str, definition: str, mechanism: str, setup: str, don: str, paco: str, subtitles: tuple[str, str], scene: int, episode: str, data_state: str, values: tuple[tuple[float, float], tuple[float, float]], kind: str = "scatter") -> dict[str, object]:
    def state(label: str, pair: tuple[float, float], note: str) -> dict[str, object]:
        return {"label": label, "summary": note, "bars": [
            {"label": "Medida A", "value": pair[0], "display": f"{pair[0]:.3f}"},
            {"label": "Medida B", "value": pair[1], "display": f"{pair[1]:.3f}"},
        ], "markers": [slug, "48 noches"], "note": note}
    return {
        "id": slug, "title": title, "objective": objective, "definition": definition,
        "intuition": f"La visualización hace visible {mechanism} antes de resumirlo.",
        "error": "Convertir asociación en causa o ignorar grupos, extremos y denominadores.",
        "scene": f"L4-S{scene:02d}", "episode": episode, "setup": setup, "donJuan": don, "paco": paco,
        "subtitles": subtitles, "visualKind": kind, "mechanism": mechanism,
        "action": f"Revelar {title.lower()}", "cue": f"Compara el estado inicial y final de {title.lower()}.",
        "states": [state("Vista inicial", values[0], subtitles[0]), state("Comparación completa", values[1], subtitles[1])],
        "dataState": data_state, "unit": "una observación es una noche del puesto",
        "variables": "temperatura_c, espera_mediana_min, pedidos_totales, etapa_operativa y banderas de contexto",
        "limit": "Las asociaciones describen 48 noches sintéticas y no identifican efectos causales.",
        "practiceCases": [
            {"question": f"¿Qué lectura de {title.lower()} está respaldada por el incidente guiado?", "correct": subtitles[1], "wrong1": "La primera variable causa necesariamente la segunda.", "wrong2": "Se puede decidir sin mirar los estados.", "feedback": subtitles[1], "hint": "Cita valores, grupo o denominador del estado final.", "evidence": f"Otra pareja de variables revela {mechanism}.", "context": f"otra noche compara {title.lower()} con variables operativas distintas", "pressure": "una compra o ajuste de fila depende de no exagerar la asociación", "decision": "describir la relación y dejar explícito el límite causal"},
            {"question": f"Al transferir {title.lower()} a otro grupo, ¿qué debe conservarse?", "correct": "La unidad, los denominadores y la comparación visible antes de concluir.", "wrong1": "El mismo coeficiente aunque cambien los datos.", "wrong2": "Una explicación causal automática.", "feedback": "La unidad, los denominadores y la comparación visible deben permanecer trazables.", "hint": "La transferencia cambia datos, no el contrato de evidencia.", "evidence": f"Un segundo incidente cambia grupo o variable para {title.lower()}.", "context": "Paco recibe otra tabla de noches y no puede reutilizar la primera respuesta", "pressure": "Don Juan necesita saber si el patrón se sostiene en el nuevo contexto", "decision": "recorrer la evidencia nueva y comunicar una conclusión prudente"},
        ],
    }


def config() -> dict[str, object]:
    rows = make_dataset()
    temp = [float(r["temperatura_c"]) for r in rows]; wait = [float(r["espera_mediana_min"]) for r in rows]
    orders = [float(r["pedidos_totales"]) for r in rows]; rain = [float(r["lluvia_mm"]) for r in rows]
    overall = pearson(temp, wait); pre = rows[:24]; post = rows[24:]
    pre_r = pearson([float(r["temperatura_c"]) for r in pre], [float(r["espera_mediana_min"]) for r in pre])
    post_r = pearson([float(r["temperatura_c"]) for r in post], [float(r["espera_mediana_min"]) for r in post])
    p_r = pearson(temp, orders); s_r = pearson(ranks(temp), ranks(orders))
    outlier_temp = temp + [42.0]; outlier_orders = orders + [40.0]
    high_pre = sum(int(r["alta_demanda"]) for r in pre); high_post = sum(int(r["alta_demanda"]) for r in post)
    risk_pre, risk_post = high_pre / 24, high_post / 24
    rr = risk_post / risk_pre if risk_pre else 0
    odds_pre = high_pre / (24 - high_pre) if high_pre < 24 else 99
    odds_post = high_post / (24 - high_post) if high_post < 24 else 99
    specs = [
        ("scatterplot", "Scatterplot", "Construir una nube de puntos para dos variables numéricas.", "Un scatterplot coloca dos variables de la misma observación en ejes perpendiculares.", "posición conjunta punto por punto", "Cada noche ubica pedidos y espera.", "Pon cada noche donde le toca.", "Un punto por noche, Pa.", ("Un scatterplot une dos valores de la misma noche.", "La nube muestra relación, grupos y extremos; no demuestra causa."), (statistics.mean(orders), statistics.mean(wait)), (min(orders), max(wait)), "L4-E1", "relaciones@L4.2"),
        ("trend", "Tendencia", "Resumir la dirección central sin ocultar puntos.", "Una tendencia resume el patrón central de una relación.", "línea descriptiva sobre la nube", "Se añade una línea descriptiva.", "¿Para dónde va el montón?", "Resumo la dirección sin borrar los puntos.", ("La tendencia resume, pero no sustituye las observaciones.", "La línea describe estas noches y puede ocultar curvatura o grupos."), (0, p_r), (p_r, len(rows)), "L4-E1", "relaciones@L4.2"),
        ("relationship-shape", "Forma de relación", "Distinguir patrón lineal, curvo y ausencia de patrón.", "La forma describe cómo cambia una variable a través de otra.", "comparación de geometrías", "Se comparan forma lineal, curva y sin patrón.", "No todas las rayas cuentan lo mismo.", "Reviso la forma antes de resumir.", ("Una relación puede adoptar varias formas.", "Una correlación única puede perder una relación no lineal."), (1, 0), (2, 3), "L4-E1", "relaciones@L4.2"),
        ("groups", "Grupos", "Reconocer patrones separados por contexto.", "Colorear por grupo permite comparar patrones dentro de estratos.", "separación por etapa operativa", "La nube se colorea por etapa.", "Ah, aquí hay dos montones.", "Los separo sin inventar una causa.", ("Los grupos pueden revelar estructura oculta.", "Comparar estratos evita atribuir al conjunto lo que cambia por contexto."), (24, 24), (pre_r, post_r), "L4-E1", "relaciones@L4.2"),
        ("direction", "Dirección", "Distinguir asociación positiva, negativa y nula.", "La dirección indica el sentido en que cambian dos variables.", "signo de la asociación", "Se comparan pendientes positiva, negativa y nula.", "Una sube con la otra; esta otra baja.", "Eso es dirección, no fuerza.", ("Dirección es sentido, no precisión.", "Dirección no mide fuerza ni causalidad."), (-1, 0), (0, 1), "L4-E2", "correlaciones@L4.3"),
        ("strength", "Fuerza", "Comparar qué tan estrecho es un patrón.", "La fuerza describe cercanía de los puntos a un patrón.", "dispersión alrededor del patrón", "Nubes con distinta dispersión quedan lado a lado.", "Esta nube está más apretada.", "La cercanía al patrón cambia.", ("La dispersión altera la fuerza visible.", "Una relación fuerte todavía puede ser espuria."), (0.25, 0.85), (0.85, 1), "L4-E2", "correlaciones@L4.3"),
        ("pearson", "Pearson", "Calcular e interpretar correlación lineal.", "Pearson estandariza el movimiento lineal conjunto entre −1 y 1.", "covarianza estandarizada", "La nube conserva el coeficiente calculado.", "Dame el resumen, pero deja la nube.", "Lo acompaño con puntos y unidades.", ("Pearson resume asociación lineal.", "El coeficiente coincide con el CSV y es sensible a extremos y grupos."), (0, len(rows)), (p_r, overall), "L4-E2", "correlaciones@L4.3"),
        ("spearman", "Spearman", "Calcular asociación monótona con rangos.", "Spearman aplica Pearson a los rangos de los valores.", "orden relativo por rangos", "Los valores se convierten a rangos.", "Aunque no vaya derechito, sí lleva orden.", "Comparo lugares, no distancias.", ("Spearman compara posiciones ordenadas.", "Captura orden monótono y requiere revisar empates y forma."), (p_r, 0), (s_r, len(rows)), "L4-E2", "correlaciones@L4.3"),
        ("correlation-outliers", "Correlación y extremos", "Medir sensibilidad del coeficiente a una noche extrema.", "Un punto extremo puede modificar una correlación y debe investigarse.", "coeficiente con y sin extremo", "Se agrega y retira una noche extrema.", "Ese punto está jalando el número.", "Reporto ambos cálculos.", ("La sensibilidad se evalúa con ambos cálculos.", "Sensibilidad no prueba error; exige contexto y trazabilidad."), (p_r, len(rows)), (pearson(outlier_temp, outlier_orders), len(rows) + 1), "L4-E2", "correlaciones@L4.3"),
        ("causality", "Causalidad", "Separar asociación de atribución causal.", "Causalidad exige un contraste y supuestos capaces de identificar un efecto.", "explicaciones alternativas", "Se muestran rutas alternativas.", "Que anden juntas no dice quién empuja.", "Dejo abiertas las otras rutas.", ("La asociación abre preguntas causales.", "El gráfico permite preguntas, no una atribución causal."), (1, 3), (3, 0), "L4-E3", "estratos_y_tablas@L4.4"),
        ("confounders", "Confusores", "Reconocer una tercera variable que distorsiona asociación.", "Un confusor se relaciona con exposición y resultado.", "estratificación por contexto", "Temperatura se compara dentro de etapas.", "Había una tercera cosa metida.", "La comparo dentro de grupos.", ("Una tercera variable puede cambiar la lectura.", "Estratificar cambia la lectura; no garantiza eliminar toda confusión."), (overall, 1), (pre_r, post_r), "L4-E3", "estratos_y_tablas@L4.4"),
        ("aggregation-bias", "Sesgo de agregación", "Detectar reversión entre agregado y grupos.", "La agregación puede invertir asociaciones dentro de estratos.", "reversión agregada validada", "La tendencia agregada revierte las tendencias de etapa.", "Juntas cuentan una cosa; separadas, otra.", "No escondo los grupos.", ("El agregado muestra una dirección.", "La reversión está verificada en el CSV y obliga a reportar contexto."), (overall, 0), (pre_r, post_r), "L4-E3", "estratos_y_tablas@L4.4"),
        ("proportions", "Proporciones", "Comparar eventos usando denominadores explícitos.", "Una proporción divide casos con evento entre el total del grupo.", "numerador sobre denominador", "Una tabla cruza etapa y alta demanda.", "Dime de cuántas noches hablas.", "Muestro numerador y denominador.", ("Los conteos necesitan denominador.", "Comparar conteos sin denominadores confunde tamaños de grupo."), (high_pre, 24), (high_post, 24), "L4-E4", "estratos_y_tablas@L4.4"),
        ("relative-risk", "Riesgo relativo", "Dividir dos proporciones comparables.", "El riesgo relativo es la probabilidad en un grupo dividida entre la del referente.", "razón de riesgos", "Se dividen proporciones de alta demanda.", "¿Cuántas veces tan frecuente, con qué base?", "Anoto ambos riesgos antes de dividir.", ("Primero se muestran ambos riesgos.", "El RR describe asociación del periodo; no prueba causa."), (risk_pre, risk_post), (rr, 1), "L4-E4", "estratos_y_tablas@L4.4"),
        ("odds", "Odds", "Distinguir odds de probabilidad.", "Los odds dividen eventos entre no eventos.", "evento frente a no evento", "La tabla muestra evento y no evento.", "¿Cuántas con alta por cada una sin alta?", "No lo llamo probabilidad.", ("Odds y probabilidad usan denominadores distintos.", "Odds y probabilidad no son intercambiables; la tabla muestra ambos."), (odds_pre, risk_pre), (odds_post, risk_post), "L4-E4", "estratos_y_tablas@L4.4"),
    ]
    concepts = [lesson(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8], idx + 1, s[11], s[12], (s[9], s[10])) for idx, s in enumerate(specs)]
    blocks = [
        {"id": "visual-relation", "number": 1, "title": "Relación visual", "description": "Puntos, tendencias, formas y grupos.", "href": "relacion-visual.html", "dataset_id": "bike-sharing-day", "concepts": concepts[:4]},
        {"id": "correlation", "number": 2, "title": "Correlación", "description": "Dirección, fuerza y sensibilidad.", "href": "correlacion.html", "dataset_id": "wine-quality", "concepts": concepts[4:9]},
        {"id": "confounding", "number": 3, "title": "Confusión", "description": "Causalidad, confusores y agregación.", "href": "confusion.html", "dataset_id": "bike-sharing-day", "concepts": concepts[9:12]},
        {"id": "cross-tabs", "number": 4, "title": "Tablas cruzadas", "description": "Proporciones, riesgo relativo y odds.", "href": "tablas-cruzadas.html", "dataset_id": "palmer-penguins", "concepts": concepts[12:]},
    ]
    return {
        "level": 4, "output": "data-class-relationships-level-4", "title": "Relaciones y contexto",
        "summary": "El puesto crece con contexto explícito: asociación nunca se presenta como causa.", "blocks": blocks,
        "previousConcept": "Potencia", "nextConcept": "Dataset confiable con SQL", "agentCompetency": "Conservar contexto y distinguir asociación de causalidad.",
        "continuityDelta": "Don Juan revela sus ahorros; Mari entra pagada con autoridad operativa.", "growthDelta": "G2-piloto → G3-espera",
        "narrativeDatasets": [{"path": "datasets/narrative/noches_contexto_nivel_4.csv", "rows": rows, "schema": ["noche_id", "fecha", "dia_semana", "etapa_operativa", "temperatura_c", "lluvia_mm", "partido_cerca", "quincena", "ayudante_programado", "asientos_disponibles", "pedidos_totales", "tacos_vendidos", "espera_mediana_min", "merma_kg", "agotado_pastor", "alta_demanda"]}],
        "narrativeMetadata": {"metadataPath": "datasets/narrative/noches_nivel_4.metadata.json", "id": "relaciones-y-contexto-nivel-4", "synthetic": True, "generator": "level4-context-v1", "seed": 20260827, "period": {"start": "2026-08-27", "end": "2026-11-15", "nights": 48}, "dimensions": {"nights": [48, 16]}, "nightly_order_range": [40, 60], "validated_reversal": {"aggregate": round(overall, 6), "piloto": round(pre_r, 6), "espera_marcada": round(post_r, 6)}, "data_state": ["L3.5", "noches_contexto@L4.1", "relaciones@L4.2", "correlaciones@L4.3", "estratos_y_tablas@L4.4"], "label": "Dataset sintético narrativo; no representa personas reales"},
    }


if __name__ == "__main__":
    generate(config())
