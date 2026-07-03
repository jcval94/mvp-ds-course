#!/usr/bin/env python3
"""Generate Level 7: unsupervised exploration with human review."""

from __future__ import annotations

from datetime import date, timedelta
import math
import random
import statistics

from advanced_level_support import lesson
from narrative_level_factory import generate


SEED = 20270506
FEATURES = ["pedidos_totales", "pedidos_programados", "espera_mediana_min", "merma_kg", "proporcion_para_llevar"]


def dataset() -> list[dict[str, object]]:
    rng = random.Random(SEED)
    dates=[]; current=date(2027,5,6)
    while len(dates)<64:
        if current.weekday() in {3,4,5,6}: dates.append(current)
        current += timedelta(days=1)
    names={3:"jueves",4:"viernes",5:"sábado",6:"domingo"}; rows=[]
    for idx,night in enumerate(dates,1):
        profile=idx%3
        service=int(idx%8 in {2,6})
        programmed=(9+idx%8) if service else (idx%3)
        orders=max(60,min(85,round((64,73,80)[profile]+4*service+rng.gauss(0,2.2))))
        wait=round(max(5,(7.5,10.5,14.0)[profile]+1.5*service+rng.uniform(-1.2,1.2)),1)
        waste=round(max(.2,(.7,1.2,1.8)[profile]+.12*service+rng.uniform(-.25,.25)),2)
        takeaway=round(min(.82,max(.28,(.38,.56,.70)[profile]+rng.uniform(-.06,.06))),3)
        if idx in {19,47}:
            wait=round(wait+8.5,1); waste=round(waste+1.4,2)
        rows.append({"noche_id":f"L7-N{idx:02d}","fecha":night.isoformat(),"dia_semana":names[night.weekday()],"servicio_reunion":service,"pedidos_programados":programmed,"pedidos_totales":orders,"espera_mediana_min":wait,"merma_kg":waste,"proporcion_para_llevar":takeaway,"ayudantes_programados":2,"asientos_disponibles":12})
    assert len(rows)==64 and min(r["pedidos_totales"] for r in rows)>=60 and max(r["pedidos_totales"] for r in rows)<=85
    assert all(sum(r["servicio_reunion"] for r in rows[w:w+4])<=2 for w in range(0,64,4))
    return rows


def standardized(rows: list[dict[str, object]]) -> list[list[float]]:
    means=[statistics.mean(float(r[f]) for r in rows) for f in FEATURES]
    sds=[statistics.stdev(float(r[f]) for r in rows) for f in FEATURES]
    return [[(float(r[f])-m)/s for f,m,s in zip(FEATURES,means,sds)] for r in rows]


def distance(a:list[float],b:list[float])->float:
    return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))


def kmeans(points:list[list[float]],k:int,iterations:int=12)->tuple[list[int],list[list[float]],float]:
    centers=[points[i*len(points)//k][:] for i in range(k)]
    labels=[0]*len(points)
    for _ in range(iterations):
        labels=[min(range(k),key=lambda j:distance(p,centers[j])) for p in points]
        updated=[]
        for j in range(k):
            members=[p for p,l in zip(points,labels) if l==j]
            updated.append([statistics.mean(v) for v in zip(*members)] if members else centers[j])
        centers=updated
    inertia=sum(distance(p,centers[l])**2 for p,l in zip(points,labels))
    return labels,centers,inertia


def power_component(points:list[list[float]],orthogonal:list[float]|None=None)->tuple[list[float],float]:
    p=len(points[0]); cov=[[sum(row[i]*row[j] for row in points)/(len(points)-1) for j in range(p)] for i in range(p)]
    v=[1/math.sqrt(p)]*p
    for _ in range(30):
        nxt=[sum(cov[i][j]*v[j] for j in range(p)) for i in range(p)]
        if orthogonal:
            projection=sum(a*b for a,b in zip(nxt,orthogonal)); nxt=[a-projection*b for a,b in zip(nxt,orthogonal)]
        norm=math.sqrt(sum(x*x for x in nxt)); v=[x/norm for x in nxt]
    eigen=sum(v[i]*sum(cov[i][j]*v[j] for j in range(p)) for i in range(p))
    return v,eigen


def config()->dict[str,object]:
    rows=dataset(); points=standardized(rows)
    labels,centers,inertia=kmeans(points,3)
    inertias={k:round(kmeans(points,k)[2],6) for k in range(2,6)}
    pc1,e1=power_component(points); pc2,e2=power_component(points,pc1); total=len(FEATURES)
    scores=[distance(p,centers[l]) for p,l in zip(points,labels)]
    threshold=sorted(scores)[-4]; review=[i+1 for i,s in enumerate(scores) if s>=threshold]
    counts=[labels.count(i) for i in range(3)]
    values={
        "distance":((1,1),(distance(points[0],points[1]),len(FEATURES))),"k-means":((3,0),(3,inertia)),
        "centroids":((0,distance(centers[0],points[0])),(12,distance(centers[0],points[0])/3)),
        "cluster-count":((2,inertias[2]),(3,inertias[3])),"pca":((len(FEATURES),64),(e1,e2)),
        "components":((max(pc1),min(pc1)),(max(pc2),min(pc2))),"explained-variance":((e1/total,e2/total),((e1+e2)/total,2)),
        "rarity":((statistics.mean(scores),max(scores)),(threshold,len(review))),"isolation":((12,6),(4,max(scores))),
        "anomaly-threshold":((threshold,len(review)),(max(scores),64)),
    }
    concepts=[
        ("distance","Distancia","Comparar cercanía solo después de fijar escala.","Una distancia resume separación entre observaciones según variables y escala elegidas.","geometría de noches estandarizadas","Paco compara noches que parecían distintas.","Si una cuenta está en kilos y otra en minutos, no las revuelvas así nomás.","Primero estandarizo y documento las columnas.",("La distancia usa cinco variables operativas estandarizadas.","Cambiar variables o escala cambia qué noches quedan cerca; no descubre tipos naturales."),"L7-E1","segmentos@L7.1","pedidos_totales, pedidos_programados, espera_mediana_min, merma_kg, proporcion_para_llevar"),
        ("k-means","K-means","Recorrer asignación y actualización de centros.","K-means alterna asignar cada observación al centro cercano y recalcular centros.","iteración asignar-recalcular","Tres centros empiezan en noches documentadas.","A ver cómo se van acomodando esos montones.","Repito la misma regla hasta estabilizar.",("Cada iteración alterna asignación y actualización.","K-means minimiza distancia interna bajo su escala; los grupos siguen siendo hipótesis exploratorias."),"L7-E1","segmentos@L7.1","variables_estandarizadas, cluster"),
        ("centroids","Centroides","Interpretar centros como promedios del grupo.","Un centroide es el vector promedio de las observaciones asignadas.","movimiento del promedio multivariable","Los centros se mueven al cambiar sus miembros.","Ese centro no es una noche de verdad, ¿cierto?","Es un promedio de varias columnas.",("El centroide combina promedios estandarizados.","Puede no corresponder a una noche real y no representa una persona típica."),"L7-E1","segmentos@L7.1","cluster, variables_estandarizadas"),
        ("cluster-count","Número de grupos","Comparar k sin declarar una verdad única.","El número de grupos es una decisión exploratoria apoyada por ajuste, estabilidad y utilidad.","comparación de inercia y revisión operativa","Dos y tres montones cuentan historias distintas.","No quiero veinte nombres nomás porque caben.","Comparo mejora y si el turno puede revisarlos.",("La inercia baja al aumentar k.","Se conserva k=3 como hipótesis revisable; la curva sola no prueba tres tipos reales."),"L7-E1","segmentos@L7.1","k, inercia"),
        ("pca","PCA","Proyectar estructura en menos dimensiones.","PCA crea componentes ortogonales que capturan varianza sucesiva.","proyección de cinco variables a dos ejes","Paco necesita mostrar cinco cuentas sin cinco pantallas.","Hazlo más corto, pero no digas que quedó todo.","Anoto cuánta información visual se conserva.",("PCA combina cinco variables estandarizadas.","La proyección facilita explorar estructura y necesariamente pierde parte de la variación."),"L7-E2","componentes@L7.2","variables_estandarizadas, pc1, pc2"),
        ("components","Componentes","Leer componentes mediante sus cargas.","Una componente es una combinación lineal de variables originales.","vectores de carga sobre ejes nuevos","El primer eje mezcla volumen, espera y merma.","Entonces no le pongas un nombre que no se ganó.","Leo dirección y magnitud de cada carga.",("Las cargas muestran contribución y signo.","Una componente no es una variable original ni una causa oculta."),"L7-E2","componentes@L7.2","cargas_pc1, cargas_pc2"),
        ("explained-variance","Varianza explicada","Decidir cuántas componentes conservar.","La varianza explicada cuantifica la proporción de dispersión capturada por cada componente.","scree plot y acumulado","Paco compara uno, dos y más ejes.","Dime cuánto dejas fuera cuando cortas.","Sumo proporciones sin llamarlas exactitud.",("Cada barra aporta una fracción de varianza.","La varianza explicada no mide utilidad de negocio ni calidad de clusters."),"L7-E2","componentes@L7.2","eigenvalues, varianza_explicada"),
        ("rarity","Rareza","Medir separación respecto de una vecindad.","Rareza describe cuán poco común es una observación bajo variables y referencia definidas.","distancia a centro y vecinos","Dos noches quedan lejos del resto.","Lejos no quiere decir malo.","Las mando a revisar con contexto.",("El score depende de variables, escala y periodo.","Rareza prioriza revisión; no declara error, fraude ni intención."),"L7-E3","anomalias@L7.3","distancia_centro, variables_estandarizadas"),
        ("isolation","Aislamiento","Relacionar pocos cortes con aislamiento.","Un método de aislamiento separa observaciones mediante particiones; rutas cortas sugieren rareza.","longitud de ruta de particiones","Una noche se separa con pocas preguntas.","Revísala, pero no la acuses.","Guardo la ruta que produjo el score.",("Las rutas cortas elevan el score de aislamiento.","El score es una prioridad técnica y requiere revisar captura y operación."),"L7-E3","anomalias@L7.3","ruta_aislamiento, score"),
        ("anomaly-threshold","Umbral de anomalía","Crear una cola acotada para revisión humana.","Un umbral de anomalía convierte scores en una lista priorizada, no en un veredicto.","corte sobre scores y capacidad de revisión","El turno solo puede revisar cuatro casos esta semana.","Pon primero los más raros y luego vemos qué pasó.","El corte responde a capacidad y conserva todos los registros.",("El umbral selecciona cuatro noches para revisión.","Ninguna fila se borra ni se etiqueta como fraude; la revisión humana documenta error o contexto válido."),"L7-E3","anomalias@L7.3","score_anomalia, umbral_revision"),
    ]
    items=[]
    for i,s in enumerate(concepts,1):
        guest={"name":"Mari","line":"Yo quiero recuperar el puesto de aguas frescas de mi familia; este piloto me sirve si seguimos cuidando tiempos y carga."} if s[0]=="cluster-count" else None
        items.append(lesson(level=7,slug=s[0],title=s[1],objective=s[2],definition=s[3],mechanism=s[4],setup=s[5],don=s[6],paco=s[7],subtitles=s[8],scene=i,episode=s[9],data_state=s[10],values=values[s[0]],variables=s[11],unit="una observación es una noche operativa, nunca una persona",limit="Clusters y anomalías son hipótesis para revisión humana; no prueban tipos naturales, fraude ni causalidad.",context="Paco organiza una revisión de noches y servicios sin etiquetar personas",pressure="el piloto acepta máximo dos reuniones por semana y el turno solo puede revisar cuatro casos raros",decision="usar la salida para priorizar preguntas y documentar la revisión humana",guest=guest))
    blocks=[
        {"id":"clustering","number":1,"title":"Clustering","description":"Distancia, k-means, centroides y número de grupos.","href":"clustering.html","dataset_id":"palmer-penguins","concepts":items[:4]},
        {"id":"dimensionality-reduction","number":2,"title":"Reducción dimensional","description":"PCA, componentes y varianza explicada.","href":"reduccion-dimensional.html","dataset_id":"palmer-penguins","concepts":items[4:7]},
        {"id":"anomaly-detection","number":3,"title":"Detección de anomalías","description":"Rareza, aislamiento y umbral revisable.","href":"deteccion-anomalias.html","dataset_id":"wine-quality","concepts":items[7:]},
    ]
    schema=list(rows[0])
    return {"level":7,"output":"data-class-unsupervised-level-7","title":"Aprendizaje no supervisado","summary":"El puesto explora patrones no etiquetados y convierte salidas en preguntas para revisión humana.","blocks":blocks,"previousConcept":"Regularización","nextConcept":"Tendencia temporal","agentCompetency":"Revisar humanamente segmentos y anomalías antes de actuar.","continuityDelta":"Mari revela por decisión propia su meta del puesto de aguas frescas; Paco documenta sin inferirla desde datos.","growthDelta":"G4-kiosco → G5-servicios; piloto reversible de máximo dos reuniones por semana","narrativeDatasets":[{"path":"datasets/narrative/noches_segmentos_nivel_7.csv","rows":rows,"schema":schema}],"narrativeMetadata":{"metadataPath":"datasets/narrative/noches_nivel_7.metadata.json","id":"segmentos-operativos-nivel-7","synthetic":True,"generator":"level7-unsupervised-v1","seed":SEED,"period":{"start":rows[0]["fecha"],"end":rows[-1]["fecha"],"nights":64},"dimensions":{"nights":[64,len(schema)]},"features":FEATURES,"standardization":"z-score con media y desviación de las 64 noches","kmeans":{"k":3,"iterations":12,"cluster_sizes":counts,"inertia_by_k":inertias},"pca":{"pc1_loadings":[round(x,6) for x in pc1],"pc2_loadings":[round(x,6) for x in pc2],"explained_variance_ratio":[round(e1/total,6),round(e2/total,6)]},"anomaly_review":{"score":"distancia al centro asignado","threshold":round(threshold,6),"review_night_indices":review,"policy":"prioridad para revisión humana; no fraude ni borrado"},"service_policy":"máximo dos servicios de reunión por semana","data_state":["L6.6","segmentos@L7.1","componentes@L7.2","anomalias@L7.3"],"label":"Dataset sintético narrativo; no representa personas reales"}}


if __name__=="__main__":
    generate(config())
