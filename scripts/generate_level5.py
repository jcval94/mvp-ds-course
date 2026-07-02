#!/usr/bin/env python3
"""Generate Level 5: descriptive modeling without leakage or generalization claims."""

from __future__ import annotations

from datetime import date, timedelta
import math
import random
import statistics

from narrative_level_factory import generate


def solve(matrix: list[list[float]], vector: list[float]) -> list[float]:
    augmented = [row[:] + [value] for row, value in zip(matrix, vector)]
    n = len(vector)
    for col in range(n):
        pivot = max(range(col, n), key=lambda row: abs(augmented[row][col]))
        augmented[col], augmented[pivot] = augmented[pivot], augmented[col]
        divisor = augmented[col][col]
        if abs(divisor) < 1e-10:
            raise ValueError("Matriz singular")
        augmented[col] = [value / divisor for value in augmented[col]]
        for row in range(n):
            if row == col:
                continue
            factor = augmented[row][col]
            augmented[row] = [value - factor * base for value, base in zip(augmented[row], augmented[col])]
    return [row[-1] for row in augmented]


def ols(features: list[list[float]], target: list[float]) -> list[float]:
    p = len(features[0])
    xtx = [[sum(row[i] * row[j] for row in features) for j in range(p)] for i in range(p)]
    xty = [sum(row[i] * y for row, y in zip(features, target)) for i in range(p)]
    return solve(xtx, xty)


def dot(left: list[float], right: list[float]) -> float:
    return sum(a * b for a, b in zip(left, right))


def dataset() -> list[dict[str, object]]:
    rng = random.Random(20261119)
    dates: list[date] = []
    current = date(2026, 11, 19)
    while current <= date(2027, 3, 7):
        if current.weekday() in {3, 4, 5, 6}:
            dates.append(current)
        current += timedelta(days=1)
    names = {3: "jueves", 4: "viernes", 5: "sábado", 6: "domingo"}
    rows = []
    for idx, night in enumerate(dates, start=1):
        seasonal = 16 + 6 * math.sin((idx - 10) / 12)
        temperature = round(seasonal + rng.uniform(-2.1, 2.1), 1)
        rain = round(max(0, rng.gauss(0.8 if idx % 9 == 0 else 0.15, 0.65)), 1)
        game = int(idx % 8 in {0, 1}); payday = int(night.day in {14, 15, 16, 29, 30, 31})
        planned = int(idx % 8 == 3); helpers = 2 if night.weekday() in {4, 5} else 1
        inventory = round(18.5 + 0.18 * idx + 1.6 * game + 1.8 * planned + rng.uniform(-1.0, 1.0), 1)
        latent = 57 + 0.36 * temperature - 0.65 * rain + 4.4 * game + 2.8 * payday + 4.8 * planned + 1.8 * helpers + 0.24 * inventory
        orders = max(55, min(75, round(latent + rng.gauss(0, 2.4))))
        tacos = round(orders * (4.1 + 0.16 * planned) + rng.gauss(0, 7))
        wait = round(max(5, 8.5 + 0.42 * (orders - 60) - 1.4 * helpers + rng.uniform(-0.8, 0.8)), 1)
        waste = round(max(0.25, 1.8 + 0.11 * (inventory - 22) - 0.025 * orders + rng.uniform(-0.2, 0.2)), 2)
        rows.append({
            "noche_id": f"L5-N{idx:02d}", "fecha": night.isoformat(), "dia_semana": names[night.weekday()],
            "temperatura_c": temperature, "lluvia_mm": rain, "partido_cerca": game, "quincena": payday,
            "encargo_programado": planned, "inventario_carne_kg": inventory, "ayudantes_programados": helpers,
            "asientos_disponibles": 12, "pedidos_totales": orders, "alta_demanda": int(orders >= 66),
            "tacos_vendidos": tacos, "espera_mediana_min": wait, "merma_kg": waste,
        })
    assert len(rows) == 64 and min(r["pedidos_totales"] for r in rows) >= 55 and max(r["pedidos_totales"] for r in rows) <= 75
    return rows


def lesson(slug: str, title: str, objective: str, definition: str, mechanism: str, setup: str, don: str, paco: str, subtitles: tuple[str, str], scene: int, episode: str, state_name: str, values: tuple[tuple[float, float], tuple[float, float]], variables: str, kind: str = "model") -> dict[str, object]:
    def visual_state(label: str, pair: tuple[float, float], note: str) -> dict[str, object]:
        return {"label": label, "summary": note, "bars": [
            {"label": "Valor A", "value": pair[0], "display": f"{pair[0]:.3f}"},
            {"label": "Valor B", "value": pair[1], "display": f"{pair[1]:.3f}"},
        ], "markers": [slug, "ajuste en 64 noches"], "note": note}
    return {
        "id": slug, "title": title, "objective": objective, "definition": definition,
        "intuition": f"El visual revela {mechanism} y conserva cada noche observada.",
        "error": "Presentar ajuste en muestra como desempeño futuro, causalidad o decisión automática.",
        "scene": f"L5-S{scene:02d}", "episode": episode, "setup": setup, "donJuan": don, "paco": paco,
        "subtitles": subtitles, "visualKind": kind, "mechanism": mechanism,
        "action": f"Revelar {title.lower()}", "cue": f"Compara los estados de {title.lower()} y conserva unidades.",
        "states": [visual_state("Entrada documentada", values[0], subtitles[0]), visual_state("Resultado reproducible", values[1], subtitles[1])],
        "dataState": state_name, "unit": "una observación es una noche del puesto", "variables": variables,
        "limit": "Ajuste descriptivo dentro de 64 noches; train/test, métricas y generalización pertenecen a Nivel 6.",
        "practiceCases": [
            {"question": f"¿Qué conclusión guiada sobre {title.lower()} respeta el momento de decisión?", "correct": subtitles[1], "wrong1": "El ajuste garantiza pedidos futuros.", "wrong2": "Una variable posterior puede entrar porque mejora el ajuste.", "feedback": subtitles[1], "hint": "Revisa si cada entrada existía antes del turno y cita el estado final.", "evidence": f"Un incidente nuevo recalcula {mechanism} con otra noche o entrada.", "context": f"Paco prueba {title.lower()} para una compra reversible del siguiente turno", "pressure": "usar información posterior produciría una respuesta imposible de aplicar a tiempo", "decision": "conservar solo señales previas y limitar la lectura a las 64 noches"},
            {"question": f"¿Qué debe cambiar al transferir {title.lower()} a otra decisión?", "correct": "Se recorren los nuevos estados y se recalcula; no se reutiliza la respuesta anterior.", "wrong1": "Nada: el primer ajuste es universal.", "wrong2": "Se puede omitir el momento temporal de cada variable.", "feedback": "La transferencia requiere evidencia y cálculo nuevos con el mismo contrato temporal.", "hint": "Distingue procedimiento reproducible de resultado fijo.", "evidence": f"Otra decisión usa valores diferentes para {title.lower()} y mantiene bloqueadas las salidas posteriores.", "context": "Don Juan cambia la pregunta de compras por una de capacidad", "pressure": "la conclusión debe seguir siendo comprensible y auditable por el turno", "decision": "aplicar el procedimiento, documentar el resultado y mantener su límite"},
        ],
    }


def config() -> dict[str, object]:
    rows = dataset(); y = [float(r["pedidos_totales"]) for r in rows]
    inventory = [float(r["inventario_carne_kg"]) for r in rows]
    simple_x = [[1.0, x] for x in inventory]; simple_beta = ols(simple_x, y)
    fitted = [dot(row, simple_beta) for row in simple_x]; residuals = [actual - pred for actual, pred in zip(y, fitted)]
    multi_x = [[1.0, float(r["temperatura_c"]), float(r["lluvia_mm"]), float(r["partido_cerca"]), float(r["encargo_programado"]), float(r["ayudantes_programados"])] for r in rows]
    multi_beta = ols(multi_x, y); multi_pred = [dot(row, multi_beta) for row in multi_x]
    scores_raw = [(-0.5 + 0.22 * (float(r["temperatura_c"]) - 16) - 0.18 * float(r["lluvia_mm"]) + 0.9 * float(r["partido_cerca"]) + 0.7 * float(r["encargo_programado"]) + 0.35 * (float(r["inventario_carne_kg"]) - 23)) for r in rows]
    probs = [1 / (1 + math.exp(-value)) for value in scores_raw]
    alerts50 = sum(value >= 0.5 for value in probs); alerts70 = sum(value >= 0.7 for value in probs)
    tree_positive = sum((r["encargo_programado"] == 1 or (r["partido_cerca"] == 1 and r["inventario_carne_kg"] >= 25)) for r in rows)
    mean_inventory, sd_inventory = statistics.mean(inventory), statistics.stdev(inventory)
    collinear = [2 * value + 1 for value in inventory]
    specs = [
        ("fit", "Ajuste", "Ajustar una recta descriptiva conservando puntos y errores.", "Ajustar estima parámetros que acercan predicciones a resultados observados.", "recta estimada sobre observaciones", "Una recta resume inventario y pedidos.", "Que la raya no tape las noches.", "Dejo puntos y errores visibles.", ("El ajuste minimiza errores cuadrados en estas filas.", "Es descriptivo dentro de estas 64 noches, no desempeño futuro."), (statistics.mean(y), statistics.mean(fitted)), (simple_beta[0], simple_beta[1]), "L5-E1", "regresion_simple@L5.2", "inventario_carne_kg → pedidos_totales"),
        ("slope", "Pendiente", "Interpretar cambio ajustado con unidades.", "La pendiente es cambio ajustado en la salida por unidad de entrada.", "cambio vertical por unidad horizontal", "Se mueve inventario una unidad.", "Si sube uno, ¿cuánto cambia la raya?", "Leo el cambio con sus unidades.", ("La pendiente conserva unidades.", "Describe asociación lineal, no efecto causal."), (1, simple_beta[1]), (simple_beta[1], len(rows)), "L5-E1", "regresion_simple@L5.2", "kg de inventario y pedidos"),
        ("intercept", "Intercepto", "Decidir si el valor en entrada cero es interpretable.", "El intercepto es la salida ajustada cuando todas las entradas son cero.", "cruce de la recta con el eje", "La recta se prolonga a inventario cero.", "¿Cero tiene sentido aquí?", "Solo lo interpreto si cae en un contexto válido.", ("El intercepto completa la ecuación.", "Puede ser necesario y carecer de interpretación práctica."), (0, simple_beta[0]), (min(inventory), simple_beta[0]), "L5-E1", "regresion_simple@L5.2", "inventario_carne_kg → pedidos_totales"),
        ("residuals", "Residuales", "Calcular observado menos ajustado.", "Un residual es el valor observado menos el valor ajustado.", "distancia vertical con signo", "Se dibujan distancias de cada noche a la recta.", "Estas noches quedaron arriba o abajo.", "Resultado menos ajuste, una por una.", ("Cada residual conserva signo y unidad.", "Con intercepto, los residuales suman aproximadamente cero y revelan errores."), (min(residuals), max(residuals)), (sum(residuals), statistics.mean(abs(x) for x in residuals)), "L5-E1", "regresion_simple@L5.2", "pedidos observados, ajustados y residuales"),
        ("assumptions", "Supuestos", "Revisar patrones residuales y alcance.", "La regresión lineal requiere revisar forma, dispersión y dependencia.", "diagnóstico de errores", "Se inspecciona lo que la recta dejó sin explicar.", "La raya no arregla todo.", "Compruebo qué patrón quedó.", ("Los supuestos se revisan con evidencia.", "Un patrón residual visible limita la lectura y no se oculta con un coeficiente."), (statistics.mean(residuals), statistics.stdev(residuals)), (min(residuals), max(residuals)), "L5-E1", "regresion_simple@L5.2", "residuales y orden temporal"),
        ("explanatory-variables", "Variables explicativas", "Interpretar coeficientes condicionados a otras entradas.", "Una variable explicativa aporta información al ajuste de una salida.", "varias señales previas simultáneas", "Se agregan lluvia, partido y quincena.", "Antes del turno sí lo sabemos.", "Solo uso señales disponibles a tiempo.", ("Cada entrada debe existir antes de decidir.", "Su coeficiente es condicional a las demás entradas, no una causa."), (simple_beta[1], len(simple_beta)), (multi_beta[1], len(multi_beta)), "L5-E2", "regresion_multiple@L5.3", "temperatura, lluvia, partido, encargo y ayudantes → pedidos"),
        ("interaction", "Interacción", "Representar que una asociación depende de otra entrada.", "Una interacción multiplica entradas para permitir pendientes diferentes.", "pendientes condicionadas", "Partido modifica la pendiente de temperatura.", "La regla cambia según la noche.", "Incluyo el término conjunto.", ("La interacción hace explícita una dependencia.", "Interpretar solo efectos principales ignoraría ese cambio."), (0, multi_beta[1]), (1, multi_beta[3]), "L5-E2", "regresion_multiple@L5.3", "temperatura × partido"),
        ("collinearity", "Colinealidad", "Reconocer coeficientes inestables por entradas redundantes.", "La colinealidad aparece cuando entradas explicativas contienen información muy parecida.", "redundancia entre columnas", "Dos entradas casi duplicadas compiten.", "Dos señales dicen casi lo mismo.", "Comparo estabilidad, no solo ajuste.", ("Entradas redundantes dificultan separar contribuciones.", "El ajuste puede verse estable mientras coeficientes individuales cambian."), (1, pearson_like(inventory, collinear)), (len(inventory), 2), "L5-E2", "regresion_multiple@L5.3", "inventario y copia lineal"),
        ("class", "Clase", "Definir una etiqueta objetivo antes de modelar.", "Una clase es una categoría objetivo documentada.", "etiqueta binaria", "Alta demanda se define antes de mirar el score.", "Primero dime qué cuenta como noche alta.", "La etiqueta sale de una regla documentada.", ("La clase responde una regla explícita.", "Cambiar la definición cambia la tarea; no cambia el pasado."), (sum(r["alta_demanda"] for r in rows), len(rows)), (66, 2), "L5-E3", "clasificacion@L5.4", "alta_demanda = pedidos_totales ≥ 66"),
        ("score", "Score", "Distinguir un valor ordenable de una decisión.", "Un score ordena casos por evidencia del modelo.", "orden continuo antes del corte", "Cada noche recibe un valor.", "Ese número todavía no es un sí.", "Sirve para ordenar; falta la regla.", ("El score aún no es decisión.", "Score, clase y decisión son objetos distintos."), (min(scores_raw), max(scores_raw)), (statistics.mean(scores_raw), len(rows)), "L5-E3", "clasificacion@L5.4", "señales previas → score"),
        ("threshold", "Umbral", "Convertir scores en alertas y observar el cambio.", "Un umbral convierte scores en decisiones binarias.", "corte operativo sobre scores", "Se mueve el corte de alerta.", "Si bajo el corte, aviso más veces.", "Y también cambian los errores.", ("El corte conecta modelo y costo operativo.", "Moverlo cambia alertas y costos; no mejora el modelo por sí solo."), (0.5, alerts50), (0.7, alerts70), "L5-E3", "clasificacion@L5.4", "probabilidad y umbral"),
        ("probability", "Probabilidad", "Interpretar una salida 0–1 sin prometer certeza.", "Una probabilidad de clase expresa incertidumbre condicionada al modelo.", "transformación logística de score", "Scores pasan a escala de probabilidad.", "Que diga ochenta no es garantía.", "Es una probabilidad ajustada, no un destino.", ("La probabilidad se condiciona al modelo y entradas.", "Calibración y generalización quedan para Nivel 6."), (min(probs), max(probs)), (statistics.mean(probs), 1), "L5-E3", "clasificacion@L5.4", "score logístico descriptivo"),
        ("decision-tree", "Árbol de decisión", "Recorrer divisiones binarias reproducibles.", "Un árbol divide el espacio mediante preguntas sucesivas.", "rutas binarias hasta hojas", "Se recorren preguntas sobre encargo y partido.", "Pregunta una cosa y luego otra.", "Cada ruta termina en una hoja.", ("Cada nodo usa una condición explícita.", "La ruta es reproducible en estas filas y no universal."), (2, 4), (tree_positive, len(rows)), "L5-E4", "arbol_reglas@L5.5", "encargo, partido e inventario"),
        ("rules", "Reglas", "Traducir rutas a condiciones si/entonces.", "Una regla expresa una ruta como condiciones y conclusión.", "condiciones auditables", "Las rutas se escriben para el turno.", "Eso sí lo puede seguir el turno.", "Incluyo excepciones y alcance.", ("Una regla debe poder reproducirse.", "Comprensible no significa correcta fuera de las noches observadas."), (2, tree_positive), (3, len(rows) - tree_positive), "L5-E4", "arbol_reglas@L5.5", "reglas previas al turno"),
        ("importance", "Importancia", "Interpretar uso de variables dentro de un árbol.", "La importancia resume reducción del criterio atribuida a divisiones.", "reducción descriptiva de error", "Se compara cuánto usa el árbol cada señal.", "Que salga primero no la vuelve causa.", "Solo resume uso dentro del árbol.", ("Importancia pertenece al modelo ajustado.", "No es causalidad y reparte crédito entre entradas relacionadas."), (0.48, 0.31), (0.15, 0.06), "L5-E4", "arbol_reglas@L5.5", "importancias del árbol"),
        ("encoding", "Encoding", "Representar categorías sin imponer orden falso.", "Encoding transforma categorías a columnas numéricas documentadas.", "columnas indicadoras", "Día y banderas se convierten en columnas.", "Los nombres necesitan una forma de entrar.", "No les invento un orden.", ("Las categorías nominales no tienen distancia natural.", "One-hot evita imponer una distancia falsa entre días."), (4, 1), (4, 4), "L5-E5", "matriz_modelado_sin_leakage@L5.6", "dia_semana y banderas previas"),
        ("scaling", "Scaling", "Centrar y escalar con parámetros guardados.", "Scaling transforma magnitud con parámetros reproducibles.", "centrado y desviación estándar", "Inventario se expresa en desviaciones.", "Cambió la regla, no las noches.", "Guardo parámetros y unidades.", ("Escalar no agrega información.", "Debe aplicarse con el mismo contrato y parámetros documentados."), (mean_inventory, sd_inventory), (statistics.mean([(x - mean_inventory) / sd_inventory for x in inventory]), statistics.stdev([(x - mean_inventory) / sd_inventory for x in inventory])), "L5-E5", "matriz_modelado_sin_leakage@L5.6", "inventario_carne_kg estandarizado"),
        ("leakage", "Leakage", "Excluir información posterior al momento de decisión.", "Leakage usa información que no existiría cuando debe producirse la decisión.", "auditoría temporal de columnas", "Se intentan usar espera y merma posteriores.", "Eso lo sabemos cuando ya terminó.", "Entonces queda fuera de la entrada.", ("Cada columna se etiqueta por momento de disponibilidad.", "Tacos vendidos, espera y merma se rechazan; solo quedan señales previas."), (8, 3), (8, 0), "L5-E5", "matriz_modelado_sin_leakage@L5.6", "entradas previas; resultados posteriores bloqueados"),
    ]
    concepts = [lesson(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8], idx + 1, s[11], s[12], (s[9], s[10]), s[13]) for idx, s in enumerate(specs)]
    blocks = [
        {"id": "linear-regression", "number": 1, "title": "Regresión lineal", "description": "Ajuste, parámetros, residuales y supuestos.", "href": "regresion-lineal.html", "dataset_id": "bike-sharing-day", "concepts": concepts[:5]},
        {"id": "multiple-regression", "number": 2, "title": "Regresión múltiple", "description": "Varias señales, interacción y colinealidad.", "href": "regresion-multiple.html", "dataset_id": "bike-sharing-day", "concepts": concepts[5:8]},
        {"id": "classification", "number": 3, "title": "Clasificación", "description": "Clase, score, umbral y probabilidad.", "href": "clasificacion.html", "dataset_id": "wine-quality", "concepts": concepts[8:12]},
        {"id": "interpretable-models", "number": 4, "title": "Modelos interpretables", "description": "Árbol, reglas e importancia.", "href": "modelos-interpretables.html", "dataset_id": "wine-quality", "concepts": concepts[12:15]},
        {"id": "feature-preparation", "number": 5, "title": "Preparación de variables", "description": "Encoding, scaling y prevención de leakage.", "href": "preparacion-variables.html", "dataset_id": "wine-quality", "concepts": concepts[15:]},
    ]
    return {
        "level": 5, "output": "data-class-modeling-level-5", "title": "Modelado descriptivo",
        "summary": "El kiosco anticipa sin adivinar: cada entrada existe antes del turno y cada ajuste conserva su límite.", "blocks": blocks,
        "previousConcept": "Odds", "nextConcept": "Evaluación de modelos", "agentCompetency": "Construir pipelines reproducibles y prevenir leakage.",
        "continuityDelta": "Chava entra pagado; Paco revela su solicitud de beca.", "growthDelta": "G3-espera → G4-kiosco",
        "narrativeDatasets": [{"path": "datasets/narrative/noches_modelado_nivel_5.csv", "rows": rows, "schema": ["noche_id", "fecha", "dia_semana", "temperatura_c", "lluvia_mm", "partido_cerca", "quincena", "encargo_programado", "inventario_carne_kg", "ayudantes_programados", "asientos_disponibles", "pedidos_totales", "alta_demanda", "tacos_vendidos", "espera_mediana_min", "merma_kg"]}],
        "narrativeMetadata": {"metadataPath": "datasets/narrative/noches_nivel_5.metadata.json", "id": "matriz-modelado-sin-leakage-nivel-5", "synthetic": True, "generator": "level5-modeling-v1", "seed": 20261119, "period": {"start": "2026-11-19", "end": "2027-03-07", "nights": 64}, "dimensions": {"nights": [64, 16]}, "nightly_order_range": [55, 75], "simple_regression": {"intercept": round(simple_beta[0], 8), "slope": round(simple_beta[1], 8), "residual_sum": round(sum(residuals), 10)}, "multiple_coefficients": [round(value, 8) for value in multi_beta], "score_formula": "-0.5 + 0.22*(temperatura-16) - 0.18*lluvia + 0.9*partido + 0.7*encargo + 0.35*(inventario-23)", "allowed_predictors": ["dia_semana", "temperatura_c", "lluvia_mm", "partido_cerca", "quincena", "encargo_programado", "inventario_carne_kg", "ayudantes_programados", "asientos_disponibles"], "blocked_leakage": ["tacos_vendidos", "espera_mediana_min", "merma_kg"], "fit_scope": "descriptivo_en_muestra", "data_state": ["L4.4", "noches_modelado@L5.1", "regresion_simple@L5.2", "regresion_multiple@L5.3", "clasificacion@L5.4", "arbol_reglas@L5.5", "matriz_modelado_sin_leakage@L5.6"], "label": "Dataset sintético narrativo; no representa personas reales"},
    }


def pearson_like(xs: list[float], ys: list[float]) -> float:
    mx, my = statistics.mean(xs), statistics.mean(ys)
    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / math.sqrt(sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys))


if __name__ == "__main__":
    generate(config())
