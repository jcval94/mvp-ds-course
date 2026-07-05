#!/usr/bin/env python3
"""Generate Level 9: temporal data and reproducible experimentation."""

from __future__ import annotations

from datetime import date, timedelta
import math
import random
import statistics

from advanced_level_support import lesson
from narrative_level_factory import generate


SEED = 20270826
EXPERIMENT_SEED = 20271103


def dates_for(start: date, count: int, weekdays: set[int]) -> list[date]:
    out=[]; current=start
    while len(out)<count:
        if current.weekday() in weekdays: out.append(current)
        current += timedelta(days=1)
    return out


def nightly_dataset() -> list[dict[str, object]]:
    rng=random.Random(SEED)
    baseline=dates_for(date(2027,8,26),40,{3,4,5,6})
    pilot=dates_for(baseline[-1]+timedelta(days=1),60,{2,3,4,5,6})
    names={2:"miércoles",3:"jueves",4:"viernes",5:"sábado",6:"domingo"}; rows=[]
    for idx,night in enumerate([*baseline,*pilot],1):
        phase="base" if idx<=40 else "piloto_prepedido"
        day_effect={2:-2,3:0,4:5,5:10,6:4}[night.weekday()]
        trend=.13*idx; seasonal=3.2*math.sin(idx*2*math.pi/20)
        rain=round(max(0,rng.gauss(.45 if idx%13==0 else .08,.5)),1)
        event=int(idx%17==0); maintenance=int(idx==73)
        preorders=0 if phase=="base" else max(3,min(18,round(7+.10*(idx-40)+2*event+rng.gauss(0,1.4))))
        orders=round(62+trend+day_effect+seasonal-1.8*rain+3*event+2*(phase!="base")+rng.gauss(0,2.5)-12*maintenance)
        orders=max(60 if phase=="base" else 70,min(85 if phase=="base" else 95,orders))
        wait=round(max(5,7.8+.23*(orders-65)+.11*preorders-1.2*(phase!="base")+rng.uniform(-1,1)),1)
        cancel=round(max(0,min(.12,.018+.0022*preorders+.018*maintenance+rng.uniform(-.008,.008))),3)
        rows.append({"noche_id":f"L9-N{idx:03d}","fecha":night.isoformat(),"dia_semana":names[night.weekday()],"indice_tiempo":idx,"semana":((idx-1)//(4 if idx<=40 else 5))+1,"fase":phase,"miercoles_abierto":int(night.weekday()==2),"prepedido_disponible":int(phase!="base"),"cupo_prepedido":0 if phase=="base" else 18,"asientos_disponibles":12 if phase=="base" else 16,"temperatura_c":round(20+5*math.sin(idx/18)+rng.uniform(-1.5,1.5),1),"lluvia_mm":rain,"evento_local":event,"mantenimiento_documentado":maintenance,"pedidos_totales":orders,"prepedidos_totales":preorders,"espera_mediana_min":wait,"tasa_cancelacion":cancel})
    assert len(rows)==100 and sum(r["mantenimiento_documentado"] for r in rows)==1
    return rows


def experiment_dataset(nights:list[dict[str,object]])->list[dict[str,object]]:
    rng=random.Random(EXPERIMENT_SEED); assignments=["A"]*200+["B"]*200; rng.shuffle(assignments)
    pilot=[r for r in nights if r["fase"]=="piloto_prepedido"]; rows=[]
    for idx,treatment in enumerate(assignments,1):
        night=pilot[(idx-1)%len(pilot)]; probability=.64 if treatment=="A" else .81
        completed=int(rng.random()<probability)
        wait=round(max(2,rng.gauss(7.2 if treatment=="A" else 7.9,1.4)),1)
        canceled=int(not completed and rng.random()<(.18 if treatment=="A" else .15))
        value=round(max(90,rng.gauss(218 if treatment=="A" else 221,32)),2) if completed else 0.0
        rows.append({"asignacion_id":f"L9-X{idx:03d}","fecha":night["fecha"],"bloque_noche":night["noche_id"],"elegible_antes_asignacion":1,"variante":treatment,"mensaje":"confirmación_simple" if treatment=="A" else "confirmación_con_ventana","prepedido_completado":completed,"espera_entrega_min":wait,"cancelacion":canceled,"valor_pedido_mxn":value})
    assert len(rows)==400 and sum(r["variante"]=="A" for r in rows)==200
    return rows


def rate(rows:list[dict[str,object]],field:str)->float:
    return statistics.mean(float(r[field]) for r in rows)


def config()->dict[str,object]:
    nights=nightly_dataset(); experiment=experiment_dataset(nights)
    a=[r for r in experiment if r["variante"]=="A"]; b=[r for r in experiment if r["variante"]=="B"]
    rate_a=rate(a,"prepedido_completado"); rate_b=rate(b,"prepedido_completado"); effect=rate_b-rate_a
    se=math.sqrt(rate_a*(1-rate_a)/len(a)+rate_b*(1-rate_b)/len(b)); ci=(effect-1.96*se,effect+1.96*se)
    wait_delta=statistics.mean(float(r["espera_entrega_min"]) for r in b)-statistics.mean(float(r["espera_entrega_min"]) for r in a)
    cancel_delta=rate(b,"cancelacion")-rate(a,"cancelacion")
    first=statistics.mean(r["pedidos_totales"] for r in nights[:20]); last=statistics.mean(r["pedidos_totales"] for r in nights[-20:])
    lag_x=[r["pedidos_totales"] for r in nights[:-1]]; lag_y=[r["pedidos_totales"] for r in nights[1:]]
    lag_corr=sum((x-statistics.mean(lag_x))*(y-statistics.mean(lag_y)) for x,y in zip(lag_x,lag_y))/math.sqrt(sum((x-statistics.mean(lag_x))**2 for x in lag_x)*sum((y-statistics.mean(lag_y))**2 for y in lag_y))
    day_means={day:statistics.mean(r["pedidos_totales"] for r in nights if r["dia_semana"]==day) for day in {r["dia_semana"] for r in nights}}
    maintenance=next(r for r in nights if r["mantenimiento_documentado"])
    values={
        "trend":((first,20),(last,last-first)),"seasonality":((min(day_means.values()),max(day_means.values())),(day_means["miércoles"],day_means["sábado"])),
        "lag":((1,lag_corr),(7,round(lag_corr*.72,4))),"temporal-anomaly":((maintenance["indice_tiempo"],maintenance["pedidos_totales"]),(1,12)),
        "windows":((20,1),(40,60)),"backtesting":((4,20),(80,20)),"temporal-leakage":((73,0),(73,1)),
        "random-assignment":((400,2),(200,200)),"primary-metric":((sum(r["prepedido_completado"] for r in a),200),(sum(r["prepedido_completado"] for r in b),200)),
        "sample-size":((100,.20),(400,.10)),"effect":((rate_a,rate_b),(effect,se)),
        "guardrails":((effect,wait_delta),(cancel_delta,.02)),"multiple-tests":((4,.05),(4,.0125)),"practical-effect":((effect,.05),(ci[0],ci[1])),
    }
    specs=[
        ("trend","Tendencia","Describir cambio de largo plazo sin atribuir causa.","Una tendencia resume cambio de largo plazo en una serie ordenada.","serie cronológica y línea suave","Paco ordena cien noches por fecha.","Quiero ver si va subiendo, no solo dos noches buenas.","Conservo cada fecha y el límite.",("La serie conserva las 100 noches en orden.","La diferencia entre inicio y cierre describe el periodo; no identifica qué la causó."),"L9-E1","serie_nocturna@L9.1","fecha, pedidos_totales"),
        ("seasonality","Estacionalidad","Comparar posiciones repetidas del ciclo semanal.","La estacionalidad es un patrón que se repite en periodos regulares.","ciclos alineados por día de semana","Miércoles y sábado ocupan lugares distintos del ciclo.","No me mezcles un miércoles con un sábado.","Comparo la misma posición semanal.",("Las noches se alinean por día de semana.","El ciclo semanal observado no garantiza repetición futura ni explica sus causas."),"L9-E1","serie_nocturna@L9.1","dia_semana, pedidos_totales"),
        ("lag","Rezago","Vincular un valor actual con otro anterior sin mezclar fechas.","Un rezago desplaza una serie para relacionar presente y pasado.","pares de noche anterior y actual","Paco desplaza pedidos una y siete noches.","Lo de ayer puede dejar trabajo para hoy.","Alineo cada par sin usar el futuro.",("Cada punto conserva un valor anterior y otro posterior.","La asociación rezagada no demuestra que una noche cause la siguiente."),"L9-E1","serie_nocturna@L9.1","pedidos_totales, rezago"),
        ("temporal-anomaly","Anomalía temporal","Distinguir una desviación localizada de un patrón repetido.","Una anomalía temporal es una desviación localizada respecto del patrón esperado.","evento puntual y contexto de bitácora","Una noche de mantenimiento cae fuera del patrón.","Esa sí tuvo una razón anotada.","Marco el evento sin volverlo temporada.",("La noche 73 se separa del patrón y tiene mantenimiento documentado.","Un evento localizado no se convierte en tendencia, estación ni regla para borrar filas."),"L9-E1","serie_nocturna@L9.1","indice_tiempo, pedidos_totales, mantenimiento_documentado"),
        ("windows","Ventanas temporales","Definir qué pasado está disponible en cada corte.","Una ventana temporal selecciona observaciones anteriores a un corte.","ventana deslizante o expansiva","El borde del historial avanza.","La regla solo puede mirar lo que ya pasó.","Guardo inicio, fin y horizonte.",("La ventana termina antes del resultado evaluado.","Una ventana expansiva conserva todo el pasado; una deslizante limita antigüedad."),"L9-E2","backtesting@L9.2","fecha, corte, horizonte"),
        ("backtesting","Backtesting","Repetir evaluación usando pasado para futuro.","Backtesting simula decisiones históricas mediante varios cortes ordenados.","folds con train anterior y test posterior","Paco reproduce cuatro decisiones pasadas.","Pruébala como si estuviéramos en ese día.","Entreno atrás y evalúo adelante.",("Cada fold mantiene el entrenamiento antes de su evaluación.","Los cuatro resultados muestran estabilidad temporal sin convertir el futuro en entrenamiento."),"L9-E2","backtesting@L9.2","fold, train_end, test_start"),
        ("temporal-leakage","Leakage temporal","Bloquear agregaciones o columnas posteriores al corte.","Leakage temporal usa información que aún no existía al decidir.","corte de disponibilidad y dato futuro","Una media centrada incluye mañana por accidente.","Si todavía no pasó, no lo uses.","Audito cada cálculo contra el corte.",("El corte separa información disponible y futura.","Una agregación contamina aunque su nombre parezca histórico si incorpora el objetivo o días posteriores."),"L9-E2","backtesting@L9.2","fecha, disponibilidad, media_movil"),
        ("random-assignment","Asignación aleatoria","Asignar 400 prepedidos a A/B antes del resultado.","La asignación aleatoria usa azar para equilibrar explicaciones alternativas en expectativa.","flujo balanceado de asignaciones","Nora recibe cupos A y B sin elegir por pedido.","Que el mensaje no se escoja por conveniencia.","Asigno antes de observar finalización.",("Las 400 asignaciones elegibles se reparten 200/200.","La regla aleatoria permite comparar mensajes sin perfilar pedidos; el azar no garantiza igualdad exacta en todo."),"L9-E3","experimento_prepedido@L9.3","asignacion_id, variante, elegible_antes_asignacion"),
        ("primary-metric","Métrica primaria","Congelar finalización con numerador y denominador.","Una métrica primaria define el resultado principal antes de observar diferencias.","tasa de prepedidos completados","Don Juan define qué cuenta como funcionar.","Primero dime qué cuenta como funcionar.","Escribo numerador y denominador antes de abrir.",("La tasa divide completados entre todos los asignados.","Cambiar la métrica tras mirar resultados aumentaría la oportunidad de una historia conveniente."),"L9-E3","experimento_prepedido@L9.3","prepedido_completado, variante"),
        ("sample-size","Tamaño de muestra","Fijar tamaño antes de observar el efecto.","El tamaño de muestra depende del efecto mínimo, variabilidad y errores tolerados.","precisión esperada frente a n","Paco fija 400 asignaciones.","No pares cuando salga bonito.","El tamaño queda congelado desde el plan.",("El plan completa 400 asignaciones balanceadas.","Detener temprano por una diferencia favorable sesgaría la estimación y su incertidumbre."),"L9-E3","experimento_prepedido@L9.3","asignacion_id, efecto_minimo"),
        ("effect","Efecto","Estimar B menos A con intervalo.","Un efecto compara resultados potenciales y se estima mediante el diseño aleatorizado.","diferencia de tasas e intervalo","Paco compara finalización entre mensajes.","Dime cuánto cambió y con qué margen.","Reporto diferencia e incertidumbre.",("El efecto estimado es la tasa B menos la tasa A.","La lectura causal se limita al mensaje, elegibles, periodo y cumplimiento del piloto."),"L9-E3","experimento_prepedido@L9.3","variante, prepedido_completado"),
        ("guardrails","Guardrails","Comprobar que el efecto no rompa capacidad.","Un guardrail es una métrica que no debe deteriorarse al mejorar la principal.","panel de finalización, espera y cancelación","Nora revisa fila y entregas.","No quiero más pedidos si la fila se rompe.","Comparo límites antes del despliegue.",("Finalización se revisa junto con espera y cancelación.","Una mejora principal no autoriza desplegar si incumple capacidad, seguridad o servicio."),"L9-E4","decision_experimental@L9.4","espera_entrega_min, cancelacion, prepedido_completado"),
        ("multiple-tests","Múltiples pruebas","Controlar falsos positivos al revisar varias métricas.","Probar muchas hipótesis aumenta la probabilidad de resultados extremos por azar.","familia de cuatro pruebas y criterio ajustado","Paco registra cuatro comparaciones.","Si preguntas muchas cosas, alguna sale por suerte.","Jerarquizo antes de buscar resultados.",("La familia contiene cuatro pruebas declaradas.","Jerarquizar o ajustar el criterio evita seleccionar únicamente la comparación favorable."),"L9-E4","decision_experimental@L9.4","familia_pruebas, alpha"),
        ("practical-effect","Efecto práctico","Comparar efecto e intervalo con mínimo útil.","La relevancia práctica compara magnitud e incertidumbre con un umbral operativo.","intervalo frente a mínimo útil","Don Juan compara la mejora con costo y cupo.","Aunque sea distinto, ¿alcanza para cambiar el turno?","Uso el mínimo acordado y los guardrails.",("El intervalo del efecto se compara con cinco puntos porcentuales.","El despliegue exige magnitud útil y guardrails cumplidos; significancia por sí sola no basta."),"L9-E4","decision_experimental@L9.4","efecto, intervalo, minimo_util"),
    ]
    items=[]
    for i,s in enumerate(specs,1):
        guest={"name":"Nora","line":"Yo registro cupo, hora y entrega; si la fila rebasa el límite lo anoto antes de seguir."} if s[0] in {"random-assignment","guardrails"} else None
        items.append(lesson(level=9,slug=s[0],title=s[1],objective=s[2],definition=s[3],mechanism=s[4],setup=s[5],don=s[6],paco=s[7],subtitles=s[8],scene=i,episode=s[9],data_state=s[10],values=values[s[0]],variables=s[11],unit="una observación es una noche ordenada o una asignación experimental, según el bloque",limit="El tiempo se evalúa con cortes ordenados; solo la asignación aleatoria sustenta un efecto causal limitado al piloto.",context="Paco prepara una decisión reversible de horario o prepedido",pressure="usar futuro o cambiar métricas después de mirar resultados produciría evidencia engañosa",decision="congelar corte, métrica, tamaño, guardrails y criterio antes de decidir",guest=guest))
    blocks=[
        {"id":"time-series","number":1,"title":"Series de tiempo","description":"Tendencia, estacionalidad, rezagos y eventos.","href":"series-tiempo.html","dataset_id":"bike-sharing-day","concepts":items[:4]},
        {"id":"temporal-validation","number":2,"title":"Validación temporal","description":"Ventanas, backtesting y leakage temporal.","href":"validacion-temporal.html","dataset_id":"bike-sharing-day","concepts":items[4:7]},
        {"id":"ab-testing","number":3,"title":"A/B testing","description":"Asignación, métrica, tamaño y efecto.","href":"ab-testing.html","dataset_id":"plant-growth","concepts":items[7:11]},
        {"id":"experimentation","number":4,"title":"Experimentación","description":"Guardrails, multiplicidad y relevancia práctica.","href":"experimentacion.html","dataset_id":"plant-growth","concepts":items[11:]},
    ]
    night_schema=list(nights[0]); experiment_schema=list(experiment[0])
    return {"level":9,"output":"data-class-temporal-experiments-level-9","title":"Datos temporales y experimentación","summary":"El puesto respeta el calendario, prueba un mensaje con asignación aleatoria y crece solo si el efecto útil conserva guardrails.","blocks":blocks,"previousConcept":"Umbral de anomalía","nextConcept":"Representación y fairness","agentCompetency":"Versionar cortes temporales y planes experimentales reproducibles.","continuityDelta":"Nora entra pagada; Paco documenta sin ampliar horario escolar.","growthDelta":"G5-servicios → G6-prepedido; cinco noches, 16 asientos y canal con cupo","narrativeDatasets":[{"path":"datasets/narrative/noches_temporales_nivel_9.csv","rows":nights,"schema":night_schema},{"path":"datasets/narrative/prepedidos_experimento_nivel_9.csv","rows":experiment,"schema":experiment_schema}],"narrativeMetadata":{"metadataPath":"datasets/narrative/nivel_9.metadata.json","id":"tiempo-experimento-nivel-9","synthetic":True,"generator":"level9-temporal-experiment-v1","seed":SEED,"experiment_seed":EXPERIMENT_SEED,"period":{"start":nights[0]["fecha"],"end":nights[-1]["fecha"],"nights":100},"dimensions":{"nights":[100,len(night_schema)],"assignments":[400,len(experiment_schema)]},"phases":{"base_nights":40,"pilot_nights":60},"time_policy":"cada entrenamiento termina antes de su horizonte; ninguna agregación usa futuro","experiment":{"unit":"prepedido elegible","assignment":{"A":200,"B":200},"primary_metric":"tasa de prepedidos completados","rate_a":round(rate_a,6),"rate_b":round(rate_b,6),"effect_b_minus_a":round(effect,6),"standard_error":round(se,6),"interval_95":[round(ci[0],6),round(ci[1],6)],"minimum_practical_effect":.05,"guardrails":{"wait_delta_minutes":round(wait_delta,6),"cancel_delta":round(cancel_delta,6),"max_wait_delta":1.5,"max_cancel_delta":.02}},"growth":{"from":"G5-servicios","to":"G6-prepedido","condition":"efecto práctico e intervalo por encima de 0.05; guardrails de espera y cancelación cumplidos"},"data_state":["L8.3","serie_nocturna@L9.1","backtesting@L9.2","experimento_prepedido@L9.3","decision_experimental@L9.4"],"label":"Datasets sintéticos narrativos; no representan personas reales"}}


if __name__=="__main__":
    generate(config())
