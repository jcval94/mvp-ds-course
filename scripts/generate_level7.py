#!/usr/bin/env python3
"""Generate Level 7: model evaluation without test contamination."""

from __future__ import annotations

from datetime import date, timedelta
import math
import random
import statistics

from advanced_level_support import lesson
from generate_level6 import dataset as level6_dataset
from narrative_level_factory import generate


SEED = 20270311
MARGIN_PER_ORDER_MXN = 22
COST_PER_WASTE_KG_MXN = 110


def sigmoid(value: float) -> float:
    return 1 / (1 + math.exp(-value))


def dataset() -> list[dict[str, object]]:
    rng = random.Random(SEED)
    base = level6_dataset()
    dates: list[date] = []
    current = date(2027, 3, 11)
    while len(dates) < 32:
        if current.weekday() in {3, 4, 5, 6}:
            dates.append(current)
        current += timedelta(days=1)
    names = {3: "jueves", 4: "viernes", 5: "sábado", 6: "domingo"}
    rows = []
    sources: list[dict[str, object]] = [dict(row) for row in base]
    for future_idx, night in enumerate(dates, start=65):
        temperature = round(18 + 5 * math.sin(future_idx / 10) + rng.uniform(-2, 2), 1)
        rain = round(max(0, rng.gauss(0.55 if future_idx % 10 == 0 else 0.12, 0.55)), 1)
        game = int(future_idx % 9 in {0, 1}); planned = int(future_idx % 8 == 3)
        inventory = round(24 + 2.3 * game + 1.8 * planned + rng.uniform(-1.6, 1.6), 1)
        latent = 59 + .30 * temperature - .70 * rain + 4.8 * game + 4.1 * planned + .18 * inventory
        sources.append({"fecha": night.isoformat(), "dia_semana": names[night.weekday()], "temperatura_c": temperature, "lluvia_mm": rain, "partido_cerca": game, "encargo_programado": planned, "inventario_carne_kg": inventory, "pedidos_totales": max(55, min(75, round(latent + rng.gauss(0, 3.2))))})
    for idx, source in enumerate(sources, start=1):
        temperature = float(source["temperatura_c"]); rain = float(source["lluvia_mm"])
        game = int(source["partido_cerca"]); planned = int(source["encargo_programado"])
        inventory = float(source["inventario_carne_kg"]); orders = int(source["pedidos_totales"])
        score = sigmoid(-0.5 + .22 * (temperature - 16) - .18 * rain + .9 * game + .7 * planned + .35 * (inventory - 23))
        actual = int(orders >= 66)
        predicted_orders = round(59 + .27 * temperature - .55 * rain + 3.9 * game + 3.5 * planned + .15 * inventory, 2)
        alert = int(score >= .55)
        unserved = max(0, orders - 65) if actual and not alert else 0
        extra_waste = round(max(0, (65 - orders) * .075), 2) if alert and not actual else 0.0
        split = "train" if idx <= 48 else "validation" if idx <= 64 else "test"
        rows.append({
            "noche_id": f"L7-N{idx:02d}", "fecha": source["fecha"], "dia_semana": source["dia_semana"],
            "split": split, "fold_desarrollo": ((idx - 1) % 4) + 1 if idx <= 64 else "",
            "temperatura_c": temperature, "lluvia_mm": rain, "partido_cerca": game,
            "encargo_programado": planned, "inventario_carne_kg": inventory,
            "pedidos_totales": orders, "prediccion_pedidos": predicted_orders,
            "alta_demanda": actual, "probabilidad_alta": round(score, 6), "alerta_umbral_055": alert,
            "pedidos_no_atendidos_estimados": unserved, "merma_extra_estimada_kg": extra_waste,
            "costo_fn_mxn": unserved * MARGIN_PER_ORDER_MXN,
            "costo_fp_mxn": round(extra_waste * COST_PER_WASTE_KG_MXN, 2),
        })
    assert len(rows) == 96
    assert [sum(row["split"] == split for row in rows) for split in ("train", "validation", "test")] == [48, 16, 32]
    return rows


def confusion(rows: list[dict[str, object]], threshold: float) -> dict[str, int]:
    out = {"tp": 0, "tn": 0, "fp": 0, "fn": 0}
    for row in rows:
        pred = float(row["probabilidad_alta"]) >= threshold
        actual = bool(row["alta_demanda"])
        out["tp" if pred and actual else "fp" if pred else "fn" if actual else "tn"] += 1
    return out


def config() -> dict[str, object]:
    rows = dataset()
    train = rows[:48]; validation = rows[48:64]; test = rows[64:]
    thresholds = [.35, .45, .55, .65, .75]
    def validation_cost(t: float) -> float:
        return sum((max(0, int(r["pedidos_totales"]) - 65) * MARGIN_PER_ORDER_MXN if float(r["probabilidad_alta"]) < t and r["alta_demanda"] else max(0, 65 - int(r["pedidos_totales"])) * .075 * COST_PER_WASTE_KG_MXN if float(r["probabilidad_alta"]) >= t and not r["alta_demanda"] else 0) for r in validation)
    chosen = min(thresholds, key=validation_cost)
    cm = confusion(test, chosen)
    errors = [float(r["pedidos_totales"]) - float(r["prediccion_pedidos"]) for r in test]
    mae = statistics.mean(abs(x) for x in errors); mse = statistics.mean(x*x for x in errors); rmse = math.sqrt(mse)
    y = [float(r["pedidos_totales"]) for r in test]; baseline = statistics.mean(y)
    r2 = 1 - sum(x*x for x in errors) / sum((x-baseline)**2 for x in y)
    precision = cm["tp"] / max(1, cm["tp"] + cm["fp"]); recall = cm["tp"] / max(1, cm["tp"] + cm["fn"])
    specificity = cm["tn"] / max(1, cm["tn"] + cm["fp"]); f1 = 2*precision*recall/max(.0001, precision+recall)
    values = {
        "train": ((96, 48), (48, 0)), "validation": ((48, 16), (len(thresholds), chosen)), "test": ((64, 32), (32, chosen)),
        "cross-validation": ((64, 4), (48, 16)), "mae": ((len(test), max(abs(x) for x in errors)), (mae, 1)),
        "mse": ((mae, max(abs(x) for x in errors)), (mse, 2)), "rmse": ((mse, 2), (rmse, 1)), "r2": ((baseline, statistics.mean((x-baseline)**2 for x in y)), (r2, rmse)),
        "true-positive": ((cm["tp"], len(test)), (cm["tp"], 0)), "true-negative": ((cm["tn"], len(test)), (cm["tn"], 0)),
        "false-positive": ((cm["fp"], len(test)), (cm["fp"], COST_PER_WASTE_KG_MXN)), "false-negative": ((cm["fn"], len(test)), (cm["fn"], MARGIN_PER_ORDER_MXN)),
        "precision": ((cm["tp"], cm["tp"]+cm["fp"]), (precision, chosen)), "recall": ((cm["tp"], cm["tp"]+cm["fn"]), (recall, chosen)),
        "specificity": ((cm["tn"], cm["tn"]+cm["fp"]), (specificity, chosen)), "f1": ((precision, recall), (f1, chosen)),
        "roc": ((0, 0), (1, 1)), "pr": ((recall, precision), (cm["tp"], cm["fp"])),
        "threshold-cost": ((.35, validation_cost(.35)), (chosen, validation_cost(chosen))), "calibration": ((.25, .22), (.75, .69)),
        "bias": ((6.5, 1), (3.2, 2)), "variance": ((1.2, 5.8), (2.7, 3.1)),
        "overfitting": ((1.8, 6.1), (3.0, 3.7)), "regularization": ((0, 5.9), (.4, 3.4)),
    }
    concepts = [
        ("train","Train","Asignar datos al ajuste sin mezclarlos con evaluación.","Train es la partición usada para estimar parámetros.","asignación exclusiva de filas","Paco separa las primeras noches para ajustar.","Estas sí son para preparar la regla.","Las marco antes de calcular.",("Train contiene 48 noches y no recibe filas del futuro.","La partición de entrenamiento ajusta; no estima por sí sola desempeño futuro."),"L7-E1","particiones@L7.1","split, noche_id"),
        ("validation","Validation","Elegir alternativas usando solo validación.","Validation compara decisiones sin tocar el test.","comparación de umbrales fuera de train","Don Juan compara compras posibles.","Prueba la opción sin abrir el sobre final.","Elijo aquí y dejo registro.",("Validation recibe 16 noches separadas.","El umbral se elige por costo en validation; test sigue sellado."),"L7-E1","particiones@L7.1","split, probabilidad_alta"),
        ("test","Test","Usar test una sola vez tras congelar decisiones.","Test estima desempeño final sobre datos no usados para ajustar ni elegir.","apertura única de evidencia futura","El sobre con 32 noches queda cerrado.","Ese no se abre para ir corrigiendo.","Primero congelo el procedimiento.",("Test contiene 32 noches posteriores y permanece sellado.","Abrir test repetidamente lo convierte en otra validación y sesga la estimación."),"L7-E1","particiones@L7.1","split, fecha"),
        ("cross-validation","Cross-validation","Rotar folds dentro del desarrollo.","Cross-validation rota subconjuntos de ajuste y validación para medir estabilidad.","rotación de cuatro folds sin test","Paco rota cuatro montones de desarrollo.","Que todos trabajen, pero sin tocar el sobre.","Cada fold valida una vez.",("Los cuatro folds pertenecen a las primeras 64 noches.","La rotación resume variación del desarrollo; las 32 noches test nunca entran."),"L7-E1","particiones@L7.1","fold_desarrollo, split"),
        ("mae","MAE","Interpretar el error absoluto medio en pedidos.","MAE promedia magnitudes absolutas de error.","distancias absolutas observado-predicho","Don Juan cuenta cuántos pedidos se desvió.","Dímelo en pedidos, sin esconder el signo.","Tomo distancia y promedio.",("Cada error se mide en pedidos.","MAE resume el desvío típico sin elevar errores grandes al cuadrado."),"L7-E2","error_regresion@L7.2","pedidos_totales, prediccion_pedidos"),
        ("mse","MSE","Reconocer la penalización cuadrática.","MSE promedia errores elevados al cuadrado.","áreas cuadráticas que amplifican errores","Una noche muy desviada pesa más.","Ese tropiezo grande no vale igual.","Al cuadrarlo gana peso.",("MSE usa pedidos al cuadrado.","MSE penaliza con fuerza errores grandes, pero pierde la unidad original."),"L7-E2","error_regresion@L7.2","pedidos_totales, prediccion_pedidos"),
        ("rmse","RMSE","Volver el error cuadrático a pedidos.","RMSE es la raíz cuadrada del MSE.","raíz de la penalización cuadrática","Don Juan pide recuperar unidades.","Ahora sí háblame otra vez en pedidos.","Saco la raíz al final.",("MSE está en pedidos².","RMSE conserva la sensibilidad a errores grandes y vuelve a unidades de pedidos."),"L7-E2","error_regresion@L7.2","pedidos_totales, prediccion_pedidos"),
        ("r2","R²","Comparar contra predecir el promedio.","R² compara error del modelo con error de una línea base promedio.","reducción relativa de error frente a baseline","Paco pone el promedio como rival.","Si no mejora esa cuenta sencilla, dime.","Comparo ambos errores.",("La línea base predice el promedio del test.","R² resume mejora relativa en este test; no es porcentaje de predicciones correctas."),"L7-E2","error_regresion@L7.2","pedidos_totales, prediccion_pedidos"),
        ("true-positive","TP","Traducir un acierto de alerta al turno.","TP es una noche alta correctamente alertada.","celda real alta y predicción alta","Hubo carga y sí nos preparamos.","Esa coincidencia sí ayudó.","Marco la celda y su conteo.",("TP combina realidad alta y alerta.","Un TP es un acierto bajo la definición congelada de alta demanda."),"L7-E3","matriz_confusion@L7.3","alta_demanda, probabilidad_alta"),
        ("true-negative","TN","Traducir un acierto de no alerta.","TN es una noche normal correctamente no alertada.","celda real normal y predicción normal","No hizo falta preparar de más.","Y la regla tampoco gritó.","Conservo el denominador de noches normales.",("TN combina realidad normal y ausencia de alerta.","Los TN muestran cuándo el sistema evita intervención innecesaria."),"L7-E3","matriz_confusion@L7.3","alta_demanda, probabilidad_alta"),
        ("false-positive","FP","Conectar falsa alerta con merma.","FP es una alerta en una noche que no fue alta.","celda de falsa alerta y costo de merma","Nos preparamos de más y sobró.","Ese error cuesta merma.","Lo multiplico por el costo documentado.",("FP combina alerta y demanda normal.","Su costo se calcula con merma extra por 110 MXN/kg, no con una etiqueta moral."),"L7-E3","matriz_confusion@L7.3","merma_extra_estimada_kg, costo_fp_mxn"),
        ("false-negative","FN","Conectar alerta omitida con pedidos no atendidos.","FN es una noche alta sin alerta.","celda de omisión y costo de faltante","Llegó la carga y nos faltó preparación.","Ese error deja pedidos sin atender.","Uso margen documentado, no una cifra inventada después.",("FN combina demanda alta y ausencia de alerta.","Su costo usa pedidos no atendidos por 22 MXN de margen; sigue siendo una estimación sintética."),"L7-E3","matriz_confusion@L7.3","pedidos_no_atendidos_estimados, costo_fn_mxn"),
        ("precision","Precision","Medir qué fracción de alertas acertó.","Precision divide TP entre TP más FP.","denominador formado por todas las alertas","Don Juan pregunta cuántos avisos sirvieron.","De todo lo que avisó, ¿cuánto sí pasó?","Uso solo la columna de alertas.",("El denominador contiene TP+FP.","Precision responde por confiabilidad de alertas, no por cobertura de noches altas."),"L7-E4","metricas@L7.4","tp, fp"),
        ("recall","Recall","Medir qué fracción de noches altas se detectó.","Recall divide TP entre TP más FN.","denominador formado por noches realmente altas","Don Juan pregunta cuántas cargas no se escaparon.","De las noches pesadas, ¿cuántas vimos venir?","Uso la fila de realidad alta.",("El denominador contiene TP+FN.","Recall mide cobertura de noches altas y cambia al mover el umbral."),"L7-E4","metricas@L7.4","tp, fn"),
        ("specificity","Specificity","Medir qué fracción de noches normales se dejó en paz.","Specificity divide TN entre TN más FP.","denominador formado por noches realmente normales","Don Juan no quiere preparar de más siempre.","¿Cuántas noches tranquilas dejamos tranquilas?","Miro TN entre todas las normales.",("El denominador contiene TN+FP.","Specificity mide reconocimiento de noches normales; no sustituye recall."),"L7-E4","metricas@L7.4","tn, fp"),
        ("f1","F1","Combinar precision y recall armónicamente.","F1 es la media armónica de precision y recall.","equilibrio que penaliza un valor muy bajo","Paco compara dos reglas con compromisos distintos.","No me tapes un lado con el otro.","La media armónica baja si uno falla.",("Precision y recall conservan denominadores distintos.","F1 ayuda a comparar equilibrio, pero no incorpora por sí sola costos en pesos."),"L7-E4","metricas@L7.4","precision, recall"),
        ("roc","ROC","Comparar TPR y FPR a través de umbrales.","ROC traza tasa de verdaderos positivos contra tasa de falsos positivos.","recorrido de umbrales en tasas","Paco mueve el corte y registra dos tasas.","Enséñame qué ganamos y qué falsas alarmas aparecen.","Cada punto usa el mismo test congelado.",("Cada umbral produce TPR y FPR.","ROC muestra discriminación; en clases raras puede ocultar baja precision."),"L7-E5","curvas@L7.5","probabilidad_alta, alta_demanda"),
        ("pr","PR","Comparar precision y recall a través de umbrales.","PR traza precision frente a recall.","compromiso bajo prevalencia observada","Las noches altas no son mayoría.","Entonces mira también cuántos avisos fallan.","La curva conserva la prevalencia.",("Cada umbral produce precision y recall.","PR hace visible el costo de falsas alertas cuando la clase positiva es menos frecuente."),"L7-E5","curvas@L7.5","probabilidad_alta, alta_demanda"),
        ("threshold-cost","Umbral y costo","Elegir umbral con costo validado.","El umbral convierte scores en alertas y modifica FP, FN y costo.","curva de costo operativo en validation","Don Juan compara merma contra faltantes.","No elijas por bonito; elige con el costo acordado.","Congelo el mínimo validado antes del test.",("Los costos se calculan solo en validation.","El umbral elegido minimiza el costo documentado en validation y luego se evalúa una vez en test."),"L7-E5","curvas@L7.5","probabilidad_alta, costo_fp_mxn, costo_fn_mxn"),
        ("calibration","Calibración","Comparar probabilidades con frecuencias observadas.","Calibración contrasta scores pronosticados con proporciones observadas.","diagrama de confiabilidad por bandas","Un setenta debería parecerse a siete de diez.","Si dice siete, revisa cuántas pasan de verdad.","Agrupo sin prometer certeza individual.",("Las probabilidades se agrupan por bandas.","Buena calibración es correspondencia promedio; no garantiza el resultado de una noche."),"L7-E5","curvas@L7.5","probabilidad_alta, alta_demanda"),
        ("bias","Bias","Reconocer error sistemático por modelo demasiado simple.","Bias es error sistemático producido por supuestos restrictivos.","patrón residual persistente","La regla sencilla falla del mismo lado.","Siempre se queda corta en esas noches.","Busco patrón, no una excusa.",("El error conserva dirección en varios grupos.","Bias alto sugiere que el modelo no captura estructura disponible; no autoriza agregar cualquier variable."),"L7-E6","generalizacion@L7.6","prediccion_pedidos, pedidos_totales"),
        ("variance","Variance","Reconocer inestabilidad entre muestras.","Variance describe cuánto cambia un ajuste al cambiar los datos de entrenamiento.","ajustes distintos entre folds","Cada montón deja una regla algo distinta.","¿Se mueve poquito o se desarma?","Comparo folds con el mismo procedimiento.",("Los folds producen resultados comparables.","Variance alta indica sensibilidad a la muestra, no variación natural de cada pedido."),"L7-E6","generalizacion@L7.6","fold_desarrollo, prediccion_pedidos"),
        ("overfitting","Overfitting","Detectar brecha entre train y validation.","Overfitting ocurre cuando el modelo aprende detalles de train que no se sostienen fuera.","curvas de error que se separan","En su montón queda perfecto, afuera no.","Eso parece memoria, no ayuda nueva.","Comparo la brecha antes de celebrar.",("El error de train sigue bajando mientras validation empeora.","La brecha evidencia sobreajuste; test no se usa para escoger el punto de parada."),"L7-E6","generalizacion@L7.6","split, error"),
        ("regularization","Regularización","Elegir penalización usando validation.","Regularización limita complejidad mediante una penalización ajustada fuera de train.","trayectoria de complejidad y error validado","Aprieta la regla, pero no hasta dejarla inútil.","Busco el mínimo en validation.","Guardo la fuerza elegida antes de abrir test.",("La penalización cambia complejidad y error.","Se elige en validation; test solo estima el procedimiento ya congelado."),"L7-E6","generalizacion@L7.6","penalizacion, error_validation"),
    ]
    items=[]
    for i,s in enumerate(concepts,1):
        items.append(lesson(level=7,slug=s[0],title=s[1],objective=s[2],definition=s[3],mechanism=s[4],setup=s[5],don=s[6],paco=s[7],subtitles=s[8],scene=i,episode=s[9],data_state=s[10],values=values[s[0]],variables=s[11],unit="una observación es una noche del puesto",limit="El test se usa una sola vez; las métricas describen este procedimiento y no prueban causalidad.",context="Paco evalúa una decisión reversible de preparación",pressure="merma y faltantes tienen costos distintos y el test no puede usarse para afinar",decision="documentar partición, métrica, costo y límite antes de actuar"))
    blocks=[
        {"id":"data-partition","number":1,"title":"Partición de datos","description":"Train, validation, test y cross-validation.","href":"particion-datos.html","dataset_id":"bike-sharing-day","concepts":items[:4]},
        {"id":"regression-error","number":2,"title":"Error de regresión","description":"MAE, MSE, RMSE y R².","href":"error-regresion.html","dataset_id":"bike-sharing-day","concepts":items[4:8]},
        {"id":"confusion-matrix","number":3,"title":"Matriz de confusión","description":"Consecuencias de TP, TN, FP y FN.","href":"matriz-confusion.html","dataset_id":"wine-quality","concepts":items[8:12]},
        {"id":"classification-metrics","number":4,"title":"Métricas de clasificación","description":"Precision, recall, specificity y F1.","href":"metricas-clasificacion.html","dataset_id":"wine-quality","concepts":items[12:16]},
        {"id":"curves-calibration","number":5,"title":"Curvas y calibración","description":"ROC, PR, costo de umbral y confiabilidad.","href":"curvas-calibracion.html","dataset_id":"wine-quality","concepts":items[16:20]},
        {"id":"generalization","number":6,"title":"Generalización","description":"Bias, variance, overfitting y regularización.","href":"generalizacion.html","dataset_id":"bike-sharing-day","concepts":items[20:]},
    ]
    schema=list(rows[0])
    return {"level":7,"output":"data-class-evaluation-level-7","title":"Evaluación de modelos","summary":"El kiosco congela decisiones, abre el test una sola vez y conecta errores con merma o faltantes.","blocks":blocks,"previousConcept":"Leakage","nextConcept":"Distancia","agentCompetency":"Definir evals, casos de prueba y costos de error.","continuityDelta":"Don Juan exige costos visibles; Paco congela el procedimiento antes del test.","growthDelta":"ninguno; G4-kiosco permanece sin expansión","narrativeDatasets":[{"path":"datasets/narrative/noches_evaluacion_nivel_7.csv","rows":rows,"schema":schema}],"narrativeMetadata":{"metadataPath":"datasets/narrative/noches_nivel_7.metadata.json","id":"evaluacion-modelos-nivel-7","synthetic":True,"generator":"level7-evaluation-v1","seed":SEED,"period":{"start":rows[0]["fecha"],"end":rows[-1]["fecha"],"nights":96},"dimensions":{"nights":[96,len(schema)]},"development_source":"datasets/narrative/noches_modelado_nivel_6.csv; primeras 64 noches conservadas","partitions":{"train":48,"validation":16,"test":32,"development_folds":4},"test_policy":"sellado hasta congelar modelo, umbral y regularización","costs":{"false_negative":f"pedidos_no_atendidos_estimados × {MARGIN_PER_ORDER_MXN} MXN","false_positive":f"merma_extra_estimada_kg × {COST_PER_WASTE_KG_MXN} MXN"},"chosen_threshold":chosen,"test_confusion":cm,"regression_metrics":{"mae":round(mae,6),"mse":round(mse,6),"rmse":round(rmse,6),"r2":round(r2,6)},"classification_metrics":{"precision":round(precision,6),"recall":round(recall,6),"specificity":round(specificity,6),"f1":round(f1,6)},"data_state":["L6.6","particiones@L7.1","error_regresion@L7.2","matriz_confusion@L7.3","metricas@L7.4","curvas@L7.5","generalizacion@L7.6"],"label":"Dataset sintético narrativo; no representa personas reales"}}


if __name__ == "__main__":
    generate(config())
