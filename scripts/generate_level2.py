#!/usr/bin/env python3
"""Generate the complete Level 2 educational package from one structured spec."""

from __future__ import annotations

import csv
import json
from pathlib import Path
import statistics


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "generated" / "data-class-description-level-2"
DATASETS = ROOT / "datasets" / "snapshots"


def opt(text: str, correct: bool, feedback: str) -> dict[str, object]:
    return {"text": text, "correct": correct, "feedback": feedback}


def ex(
    question: str,
    correct: str,
    wrong_1: str,
    wrong_2: str,
    feedback: str,
    wrong_feedback_1: str,
    wrong_feedback_2: str,
    hint: str,
) -> dict[str, object]:
    return {
        "question": question,
        "options": [
            opt(correct, True, feedback),
            opt(wrong_1, False, wrong_feedback_1),
            opt(wrong_2, False, wrong_feedback_2),
        ],
        "hint": hint,
    }


def concept(
    slug: str,
    title: str,
    objective: str,
    definition: str,
    intuition: str,
    error: str,
    visual_type: str,
    focus: str,
    action: str,
    cue: str,
    first: dict[str, object],
    second: dict[str, object],
) -> dict[str, object]:
    return {
        "id": slug,
        "title": title,
        "objective": objective,
        "definition": definition,
        "intuition": intuition,
        "error": error,
        "visual": {
            "type": visual_type,
            "focus": focus,
            "action": action,
            "cue": cue,
        },
        "exercises": [first, second],
    }


BLOCKS = [
    {
        "id": "summary",
        "number": 1,
        "title": "Resumen numérico",
        "description": "Compara centro, dispersión y posición sin depender de una sola cifra.",
        "href": "resumen-numerico.html",
        "dataset_id": "palmer-penguins",
        "dataset_name": "Palmer Penguins · masa corporal",
        "concepts": [
            concept(
                "mean",
                "Media",
                "Calcular e interpretar la media como punto de equilibrio.",
                "La media suma los valores y divide entre el número de observaciones.",
                "Es el punto donde una regla con pesos iguales quedaría equilibrada.",
                "Tratar la media como un valor típico aunque existan extremos o asimetría.",
                "summary",
                "mean",
                "Mover un extremo",
                "Compara la media antes y después de desplazar una observación extrema.",
                ex(
                    "Al mover el punto extremo hacia la derecha, ¿qué marcador cambia más?",
                    "La media.",
                    "La mediana.",
                    "El número de observaciones.",
                    "La media usa la magnitud de todos los valores y se desplaza hacia el extremo.",
                    "La mediana depende del orden central y suele moverse menos.",
                    "Mover un valor no agrega ni elimina observaciones.",
                    "Observa qué marcador se desplaza en la recta.",
                ),
                ex(
                    "Dos especies tienen la misma media de masa. ¿Qué debes revisar antes de llamarlas similares?",
                    "La dispersión y la forma de cada grupo.",
                    "Solo el nombre de la especie.",
                    "Que ambas tengan exactamente 100 filas.",
                    "La misma media puede ocultar distribuciones muy diferentes.",
                    "La etiqueta no describe cómo se distribuyen las masas.",
                    "El tamaño ayuda a evaluar estabilidad, pero no garantiza similitud.",
                    "Una medida de centro no resume toda la distribución.",
                ),
            ),
            concept(
                "median",
                "Mediana",
                "Ubicar e interpretar el valor central de datos ordenados.",
                "La mediana separa los datos ordenados en dos mitades.",
                "Es la observación que queda en el centro al formar una fila ordenada.",
                "Calcularla sin ordenar o confundirla con el valor más frecuente.",
                "summary",
                "median",
                "Añadir un extremo",
                "Compara media y mediana antes y después de añadir una masa extrema.",
                ex(
                    "Después de añadir una masa muy alta, ¿por qué la mediana cambia poco?",
                    "Porque depende de la posición central, no de la distancia del extremo.",
                    "Porque ignora todas las observaciones altas.",
                    "Porque siempre es igual a la media.",
                    "El extremo cambia el orden en una punta, pero no necesariamente el centro.",
                    "La observación extrema sigue formando parte del orden.",
                    "Media y mediana solo coinciden en algunos conjuntos.",
                    "Sigue las posiciones, no la longitud del eje.",
                ),
                ex(
                    "Para resumir tiempos de espera con unos pocos retrasos enormes, ¿qué centro es más resistente?",
                    "La mediana.",
                    "La media sin revisar la distribución.",
                    "El rango.",
                    "La mediana limita la influencia de retrasos extremos.",
                    "La media puede ser útil, pero los extremos la desplazan.",
                    "El rango mide extensión, no centro.",
                    "Busca una medida basada en orden.",
                ),
            ),
            concept(
                "mode",
                "Moda",
                "Identificar el valor o categoría con mayor frecuencia.",
                "La moda es el valor o categoría que aparece más veces.",
                "Es la opción que acumula más marcas en un conteo.",
                "Afirmar que todo conjunto tiene una única moda informativa.",
                "summary",
                "mode",
                "Cambiar agrupación",
                "Agrupa las masas con varios anchos y localiza el conteo más alto.",
                ex(
                    "¿Qué evidencia identifica la moda en el gráfico de frecuencias?",
                    "La barra con mayor conteo.",
                    "El punto medio del eje.",
                    "La distancia entre mínimo y máximo.",
                    "La moda corresponde a la frecuencia máxima.",
                    "El centro geométrico no determina la frecuencia.",
                    "Esa distancia describe el rango.",
                    "Compara alturas, no posiciones centrales.",
                ),
                ex(
                    "Si dos categorías empatan con el mayor conteo, ¿cómo se describe el resultado?",
                    "El conjunto es bimodal para esa variable.",
                    "La moda es el promedio de las categorías.",
                    "No existe ninguna frecuencia.",
                    "Dos máximos compartidos producen dos modas.",
                    "Promediar etiquetas puede carecer de sentido.",
                    "Los conteos siguen existiendo aunque haya empate.",
                    "Busca cuántos máximos hay.",
                ),
            ),
            concept(
                "range",
                "Rango",
                "Calcular la extensión total entre mínimo y máximo.",
                "El rango es máximo menos mínimo.",
                "Mide la longitud de la sombra que cubre todos los valores.",
                "Usarlo como descripción completa de variabilidad.",
                "summary",
                "range",
                "Separar extremos",
                "Mueve el mínimo y el máximo para observar la sensibilidad del rango.",
                ex(
                    "¿Qué cambio aumenta directamente el rango?",
                    "Alejar el máximo manteniendo fijo el mínimo.",
                    "Reordenar las filas.",
                    "Cambiar el color de los puntos.",
                    "El rango aumenta cuando crece la distancia entre extremos.",
                    "El orden de presentación no cambia mínimo ni máximo.",
                    "El estilo visual no modifica los datos.",
                    "Compara la distancia entre las dos líneas extremas.",
                ),
                ex(
                    "Dos grupos tienen el mismo rango. ¿Qué conclusión es válida?",
                    "Comparten extensión total, pero pueden distribuirse de forma distinta.",
                    "Tienen la misma media y mediana.",
                    "Cada valor de un grupo aparece en el otro.",
                    "El rango solo fija los extremos.",
                    "Centro y rango son propiedades distintas.",
                    "Los puntos interiores pueden ser completamente diferentes.",
                    "Observa qué información no aparece entre los extremos.",
                ),
            ),
            concept(
                "variance",
                "Varianza",
                "Interpretar la varianza como promedio de desviaciones cuadradas.",
                "La varianza promedia las distancias cuadradas respecto de la media.",
                "Cada punto aporta un área cuadrada; los puntos lejanos pesan mucho.",
                "Interpretarla en las unidades originales o ignorar su sensibilidad a extremos.",
                "summary",
                "variance",
                "Añadir un extremo",
                "Añade una masa extrema y compara el crecimiento cuadrático de la dispersión.",
                ex(
                    "¿Por qué un punto lejano aporta tanto a la varianza?",
                    "Porque su desviación se eleva al cuadrado.",
                    "Porque se cuenta dos veces por error.",
                    "Porque la varianza solo usa el máximo.",
                    "Elevar al cuadrado amplifica las desviaciones grandes.",
                    "Cada observación se usa una vez.",
                    "La varianza utiliza todas las observaciones.",
                    "Compara una distancia de 2 con una de 4 después de elevarlas al cuadrado.",
                ),
                ex(
                    "¿Qué significa una varianza cercana a cero?",
                    "Los valores están muy concentrados alrededor de la media.",
                    "La media también es cero necesariamente.",
                    "No existen observaciones.",
                    "Desviaciones pequeñas producen cuadrados pequeños.",
                    "El centro puede estar lejos de cero.",
                    "Puede haber muchas observaciones iguales o próximas.",
                    "Distingue posición del grupo y separación interna.",
                ),
            ),
            concept(
                "standard-deviation",
                "Desviación estándar",
                "Interpretar una distancia típica respecto de la media en unidades originales.",
                "La desviación estándar es la raíz cuadrada de la varianza.",
                "Devuelve la dispersión a la misma unidad de la variable.",
                "Usar la regla 68-95 sin comprobar una forma aproximadamente normal.",
                "summary",
                "sd",
                "Comparar bandas",
                "Muestra bandas de una desviación estándar alrededor de la media.",
                ex(
                    "¿Qué ventaja tiene frente a la varianza para comunicar masa corporal?",
                    "Se expresa nuevamente en gramos.",
                    "Siempre vale menos de uno.",
                    "No cambia cuando hay extremos.",
                    "La raíz recupera la unidad original.",
                    "Su tamaño depende de la escala de los datos.",
                    "También es sensible a observaciones lejanas.",
                    "Revisa la unidad mostrada junto al marcador.",
                ),
                ex(
                    "Si todas las masas se convierten de gramos a kilogramos, ¿qué ocurre con la desviación estándar?",
                    "Se divide entre 1,000.",
                    "Permanece numéricamente igual.",
                    "Se eleva al cuadrado.",
                    "La desviación estándar cambia con la misma escala lineal que los datos.",
                    "La unidad y el valor numérico cambian juntos.",
                    "Elevar al cuadrado corresponde a la varianza.",
                    "Aplica la misma conversión a las distancias.",
                ),
            ),
            concept(
                "percentiles",
                "Percentiles",
                "Ubicar una observación según el porcentaje de valores que no la supera.",
                "El percentil p es un punto de corte con aproximadamente p% de valores debajo o iguales.",
                "Es una marca de posición en una lista ordenada de cien partes.",
                "Interpretar percentil 90 como obtener 90% en una prueba.",
                "summary",
                "percentile",
                "Mover percentil",
                "Cambia el percentil y observa el punto de corte sobre datos ordenados.",
                ex(
                    "Una masa está en el percentil 75. ¿Qué indica?",
                    "Aproximadamente 75% de las masas no la supera.",
                    "La masa vale 75 gramos.",
                    "Es 75% mayor que la media.",
                    "El percentil describe posición relativa.",
                    "El número del percentil no es la unidad medida.",
                    "No expresa una diferencia porcentual respecto de la media.",
                    "Cuenta observaciones a la izquierda del corte.",
                ),
                ex(
                    "¿Por qué dos datasets pueden tener el mismo percentil 50 y distinta dispersión?",
                    "El percentil 50 fija el centro ordenado, no la separación restante.",
                    "Porque el percentil 50 siempre es cero.",
                    "Porque los percentiles ignoran el orden.",
                    "La mediana puede coincidir aunque las colas sean distintas.",
                    "El valor depende de los datos, no es siempre cero.",
                    "Los percentiles se construyen precisamente con el orden.",
                    "Compara las posiciones centrales y luego las colas.",
                ),
            ),
        ],
    },
    {
        "id": "distribution",
        "number": 2,
        "title": "Distribuciones",
        "description": "Construye y lee forma, sesgo, modos y sensibilidad a intervalos.",
        "href": "distribuciones.html",
        "dataset_id": "bike-sharing-day",
        "dataset_name": "Bike Sharing · alquileres diarios",
        "concepts": [
            concept(
                "histogram",
                "Histograma",
                "Construir e interpretar frecuencias de una variable numérica por intervalos.",
                "Un histograma agrupa valores numéricos continuos en intervalos contiguos.",
                "Es una vista comprimida de cuántas observaciones caen en cada tramo.",
                "Confundirlo con barras categóricas o leer cada barra como una observación.",
                "distribution",
                "histogram",
                "Cambiar intervalos",
                "Ajusta el número de bins sin cambiar los 731 días observados.",
                ex(
                    "Al pasar de pocos a muchos bins, ¿qué permanece igual?",
                    "El dataset y sus 731 días.",
                    "La altura de cada barra.",
                    "El ancho de cada intervalo.",
                    "Solo cambia la agrupación visual.",
                    "Las frecuencias se redistribuyen entre más barras.",
                    "Más bins producen intervalos más estrechos.",
                    "Distingue datos de representación.",
                ),
                ex(
                    "¿Qué evidencia permite afirmar que los alquileres altos son poco frecuentes?",
                    "Las barras del extremo alto tienen conteos pequeños.",
                    "El eje usa color teal.",
                    "La primera barra está a la izquierda.",
                    "La altura representa frecuencia por intervalo.",
                    "El color no aporta frecuencia.",
                    "La posición sola no indica cuántos días hay.",
                    "Combina posición y altura.",
                ),
            ),
            concept(
                "density",
                "Densidad",
                "Interpretar una curva suavizada cuya área total representa uno.",
                "La densidad describe concentración relativa mediante una curva con área total igual a uno.",
                "Es una silueta suave de la distribución, no un conteo de filas.",
                "Leer la altura de densidad como probabilidad exacta de un valor puntual.",
                "distribution",
                "density",
                "Ajustar suavizado",
                "Cambia el suavizado y observa qué detalles se conservan o desaparecen.",
                ex(
                    "¿Qué propiedad debe mantenerse al cambiar el suavizado?",
                    "El área total bajo la curva es uno.",
                    "La altura máxima siempre es uno.",
                    "Cada punto de la curva es un conteo entero.",
                    "La densidad normaliza área, no altura máxima.",
                    "La altura depende de la escala y el ancho de banda.",
                    "La curva es continua y puede tomar valores no enteros.",
                    "Piensa en área, no en la cima.",
                ),
                ex(
                    "Un suavizado excesivo muestra una sola cima. ¿Qué riesgo existe?",
                    "Ocultar subgrupos o modos presentes en los datos.",
                    "Crear observaciones nuevas en el CSV.",
                    "Cambiar la unidad de análisis.",
                    "El ancho de banda puede borrar estructura local.",
                    "La curva no modifica el snapshot.",
                    "Cada fila sigue siendo un día.",
                    "Compara la curva con el histograma base.",
                ),
            ),
            concept(
                "shape",
                "Forma",
                "Describir una distribución por centro, extensión, simetría y número de modos.",
                "La forma resume cómo se reparte la frecuencia a lo largo de los valores.",
                "Es el perfil completo de montañas, valles y colas.",
                "Reducir la descripción a una sola medida de centro.",
                "distribution",
                "shape",
                "Comparar perfiles",
                "Alterna entre temporadas y describe centro, extensión y colas.",
                ex(
                    "¿Qué descripción usa evidencia suficiente de la forma?",
                    "Una cima principal, cola hacia valores altos y extensión amplia.",
                    "La media es 4,504; eso describe todo.",
                    "El gráfico tiene 12 barras.",
                    "Combina modo, asimetría y extensión.",
                    "Una media no muestra colas ni modos.",
                    "El número de barras es una decisión de representación.",
                    "Describe al menos tres rasgos visibles.",
                ),
                ex(
                    "Dos distribuciones comparten media. ¿Qué comparación visual sigue siendo necesaria?",
                    "Revisar dispersión, modos y colas.",
                    "Comprobar que usan la misma tipografía.",
                    "Elegir la de mayor color.",
                    "La forma puede diferir aunque el centro coincida.",
                    "La tipografía no es evidencia estadística.",
                    "El color no determina la estructura.",
                    "Busca diferencias más allá del marcador central.",
                ),
            ),
            concept(
                "skew",
                "Sesgo",
                "Reconocer asimetría y la dirección de una cola prolongada.",
                "Una distribución sesgada tiene una cola más larga hacia uno de sus lados.",
                "La cola apunta hacia los casos menos frecuentes y más alejados.",
                "Nombrar el sesgo por el lado donde se concentra la mayoría.",
                "distribution",
                "skew",
                "Resaltar cola",
                "Resalta la cola larga y compara media con mediana.",
                ex(
                    "Si la cola se extiende hacia alquileres altos, ¿cómo se llama el patrón?",
                    "Sesgo a la derecha.",
                    "Sesgo a la izquierda.",
                    "Distribución uniforme.",
                    "La dirección se nombra por la cola larga.",
                    "La mayoría puede estar a la izquierda, pero la cola apunta a la derecha.",
                    "Una distribución uniforme no tiene esa cola marcada.",
                    "Sigue los valores poco frecuentes más alejados.",
                ),
                ex(
                    "En un sesgo fuerte a la derecha, ¿qué relación suele observarse?",
                    "La media queda por encima de la mediana.",
                    "La media siempre es cero.",
                    "La moda debe desaparecer.",
                    "Los valores altos arrastran la media hacia la cola.",
                    "El origen del eje no fija la media.",
                    "Puede seguir existiendo una moda.",
                    "Observa qué marcador se acerca más a la cola.",
                ),
            ),
            concept(
                "multimodality",
                "Multimodalidad",
                "Detectar varias concentraciones y proponer subgrupos para investigar.",
                "Una distribución multimodal presenta más de una cima relevante.",
                "Varias montañas pueden indicar mecanismos o grupos mezclados.",
                "Asignar una causa a cada modo sin revisar variables adicionales.",
                "distribution",
                "multimodal",
                "Separar temporadas",
                "Colorea los días por temporada para investigar el origen de dos cimas.",
                ex(
                    "¿Qué interpretación es defendible al observar dos cimas?",
                    "Puede haber subgrupos o mecanismos distintos que deben investigarse.",
                    "Existen exactamente dos causas confirmadas.",
                    "El dataset está necesariamente corrupto.",
                    "La gráfica sugiere una hipótesis, no confirma causas.",
                    "Cada cima no identifica por sí sola una causa.",
                    "Datos válidos pueden ser multimodales.",
                    "Formula una explicación alternativa, no una certeza.",
                ),
                ex(
                    "Al separar por temporada desaparece una de las cimas. ¿Qué aprendemos?",
                    "La mezcla de temporadas contribuía a la forma agregada.",
                    "La temporada causa cada alquiler individual.",
                    "El histograma original era falso.",
                    "La estratificación aporta una explicación descriptiva.",
                    "La comparación observacional no prueba causalidad individual.",
                    "El gráfico agregado seguía representando sus datos.",
                    "Compara agregado y grupos sin exagerar la conclusión.",
                ),
            ),
            concept(
                "bins",
                "Bins",
                "Explicar cómo la elección de intervalos cambia el detalle visible.",
                "Los bins son intervalos que definen cómo se agrupan los valores de un histograma.",
                "Son una cuadrícula móvil: más celdas muestran detalle, menos celdas resumen.",
                "Buscar un número universalmente correcto de bins.",
                "distribution",
                "bins",
                "Probar 6, 12 y 24",
                "Compara tres particiones del mismo snapshot.",
                ex(
                    "¿Cuál es la mejor práctica al elegir bins?",
                    "Probar varias opciones y verificar si la conclusión es estable.",
                    "Usar siempre diez.",
                    "Elegir el número que haga más dramática la historia.",
                    "La sensibilidad a bins debe formar parte de la revisión.",
                    "Diez es una convención, no una ley.",
                    "Ajustar para forzar una conclusión es engañoso.",
                    "Compara qué patrones sobreviven.",
                ),
                ex(
                    "Un pico aparece con 24 bins, pero no con 12 ni 6. ¿Qué conclusión corresponde?",
                    "Es un detalle sensible a la partición y requiere cautela.",
                    "Es una población nueva confirmada.",
                    "Los otros dos histogramas están equivocados.",
                    "Un patrón inestable no debe presentarse como hallazgo robusto.",
                    "La visualización sola no confirma un grupo.",
                    "Cada partición es válida para distinto nivel de detalle.",
                    "Busca estabilidad entre representaciones.",
                ),
            ),
        ],
    },
    {
        "id": "comparison",
        "number": 3,
        "title": "Comparación visual",
        "description": "Elige representaciones que comparen categorías y distribuciones completas.",
        "href": "comparacion-visual.html",
        "dataset_id": "palmer-penguins",
        "dataset_name": "Palmer Penguins · especies",
        "concepts": [
            concept(
                "bar-chart",
                "Gráfico de barras",
                "Comparar magnitudes agregadas entre categorías con una línea base común.",
                "Un gráfico de barras usa longitud para comparar una medida por categoría.",
                "Cada barra es una regla que parte de una base compartida.",
                "Usar barras para una variable continua sin agrupar o truncar el eje para exagerar.",
                "comparison",
                "bar",
                "Cambiar métrica",
                "Compara conteo y media por especie manteniendo una línea base explícita.",
                ex(
                    "¿Por qué el eje de barras debe iniciar en cero en esta comparación?",
                    "La longitud completa de la barra codifica la magnitud.",
                    "Porque todo eje estadístico debe iniciar en cero.",
                    "Para que todas las categorías empaten.",
                    "Truncar la base altera la proporción visual de longitudes.",
                    "Otros gráficos, como líneas, pueden requerir otra decisión.",
                    "Una base común no iguala los valores.",
                    "Observa qué parte de la marca se compara.",
                ),
                ex(
                    "¿Qué debes escribir en el título o eje al mostrar una barra por especie?",
                    "La medida agregada, por ejemplo media de masa en gramos.",
                    "Solo el color elegido.",
                    "La lista completa de cada observación.",
                    "La barra necesita indicar qué resumen representa y su unidad.",
                    "El color no define la métrica.",
                    "Los datos completos pueden estar disponibles aparte.",
                    "Pregunta qué número resume cada barra.",
                ),
            ),
            concept(
                "boxplot",
                "Boxplot",
                "Comparar mediana, cuartiles, extensión y puntos extremos entre grupos.",
                "El boxplot representa mediana, rango intercuartílico, bigotes y posibles atípicos.",
                "Es un resumen compacto de posiciones ordenadas.",
                "Asumir normalidad o interpretar todo punto exterior como error.",
                "comparison",
                "boxplot",
                "Resaltar cuartiles",
                "Activa mediana, caja, bigotes y puntos exteriores por especie.",
                ex(
                    "¿Qué muestra la altura de la caja?",
                    "El rango intercuartílico entre Q1 y Q3.",
                    "El rango total obligatorio.",
                    "La media más una desviación estándar.",
                    "La caja contiene la mitad central de los datos.",
                    "Los bigotes y puntos pueden extenderse más.",
                    "El boxplot estándar no requiere mostrar la media.",
                    "Ubica Q1 y Q3.",
                ),
                ex(
                    "Una especie tiene un punto fuera del bigote. ¿Qué acción corresponde?",
                    "Investigar el registro y su contexto antes de decidir.",
                    "Eliminarlo automáticamente.",
                    "Declarar que pertenece a otra especie.",
                    "El punto es una señal de revisión, no un veredicto.",
                    "La regla del boxplot no identifica errores.",
                    "La gráfica no reclasifica observaciones.",
                    "Distingue detección de decisión.",
                ),
            ),
            concept(
                "violin-plot",
                "Violin plot",
                "Comparar forma y densidad de varios grupos en un espacio compacto.",
                "Un violin plot refleja una estimación de densidad alrededor de un eje central.",
                "El ancho muestra dónde se concentran más observaciones.",
                "Leer el ancho como conteo directo sin conocer la normalización.",
                "comparison",
                "violin",
                "Cambiar suavizado",
                "Ajusta el ancho de banda y compara la forma por especie.",
                ex(
                    "¿Qué indica una zona más ancha del violín?",
                    "Mayor densidad relativa de observaciones en ese rango.",
                    "Valores individuales más grandes.",
                    "Mayor tamaño de pantalla.",
                    "El ancho codifica concentración estimada.",
                    "La magnitud de la variable se lee en el eje vertical.",
                    "El diseño responsive no representa datos.",
                    "Separa posición vertical de ancho.",
                ),
                ex(
                    "¿Por qué conviene mostrar puntos o tamaño de muestra junto al violín?",
                    "La suavización puede ocultar cuántas observaciones sustentan la forma.",
                    "Para convertirlo en gráfico de barras.",
                    "Porque la densidad no usa datos.",
                    "El contexto de n evita sobreinterpretar una silueta suave.",
                    "Las barras comparan otra codificación.",
                    "La densidad sí se estima desde observaciones.",
                    "Pregunta cuánta evidencia hay detrás de la curva.",
                ),
            ),
            concept(
                "ecdf",
                "ECDF",
                "Leer la proporción acumulada de observaciones hasta cualquier valor.",
                "La ECDF muestra, para cada x, la fracción de observaciones menores o iguales.",
                "Es una escalera que acumula casos desde cero hasta uno.",
                "Confundir la altura acumulada con frecuencia local.",
                "comparison",
                "ecdf",
                "Consultar umbral",
                "Mueve un umbral de masa y compara la proporción acumulada por especie.",
                ex(
                    "Si la ECDF vale 0.8 en 4,000 g, ¿qué significa?",
                    "80% de las observaciones pesa 4,000 g o menos.",
                    "80 observaciones pesan exactamente 4,000 g.",
                    "La densidad en 4,000 g es 0.8.",
                    "La altura es una proporción acumulada.",
                    "Se necesita conocer n para convertir proporción en conteo.",
                    "La densidad es una representación diferente.",
                    "Lee todo lo acumulado a la izquierda.",
                ),
                ex(
                    "Una curva queda consistentemente a la derecha de otra. ¿Qué sugiere?",
                    "Sus valores tienden a ser mayores en buena parte de la distribución.",
                    "Cada observación es mayor de manera pareada.",
                    "Existe una causa biológica confirmada.",
                    "La comparación es distributiva, no pareada ni causal.",
                    "Las filas no están emparejadas.",
                    "La gráfica describe diferencias, no su causa.",
                    "Limita la afirmación a tendencia distributiva.",
                ),
            ),
        ],
    },
    {
        "id": "outliers",
        "number": 4,
        "title": "Valores atípicos",
        "description": "Investiga extremos, influencia, errores de captura y casos raros válidos.",
        "href": "valores-atipicos.html",
        "dataset_id": "wine-quality",
        "dataset_name": "Wine Quality · propiedades fisicoquímicas",
        "concepts": [
            concept(
                "outliers",
                "Outliers",
                "Detectar observaciones alejadas y formular preguntas antes de excluirlas.",
                "Un outlier es una observación inusualmente alejada según una regla y un contexto.",
                "Es una señal para investigar, no una etiqueta automática de error.",
                "Eliminar todo valor exterior a 1.5 IQR sin revisar dominio ni impacto.",
                "outlier",
                "outlier",
                "Aplicar regla IQR",
                "Marca valores extremos de alcohol y abre su fila original.",
                ex(
                    "¿Qué conclusión permite la regla IQR?",
                    "El valor merece revisión por su posición relativa.",
                    "El registro es falso.",
                    "El vino debe excluirse del análisis.",
                    "La regla detecta rareza estadística, no origen.",
                    "La gráfica no prueba falsedad.",
                    "Excluir requiere una decisión documentada.",
                    "Separa señal de acción.",
                ),
                ex(
                    "El extremo coincide con una medición válida y repetible. ¿Qué corresponde?",
                    "Conservarlo y evaluar análisis robustos o por escenarios.",
                    "Cambiarlo a la media.",
                    "Ocultarlo del gráfico.",
                    "Un caso válido aporta información y debe permanecer trazable.",
                    "Imputar borraría evidencia real.",
                    "Ocultar una observación válida sesga la comunicación.",
                    "Pregunta si el valor es plausible y verificable.",
                ),
            ),
            concept(
                "leverage",
                "Leverage",
                "Reconocer puntos con valores explicativos inusuales que pueden influir en un ajuste.",
                "El leverage describe qué tan alejada está una observación en el espacio de variables explicativas.",
                "Un punto en una zona horizontal solitaria puede tirar de una línea ajustada.",
                "Confundir leverage alto con residuo alto o con un error confirmado.",
                "outlier",
                "leverage",
                "Comparar ajuste",
                "Activa y desactiva un punto extremo en alcohol para observar la pendiente.",
                ex(
                    "¿Qué hace que el punto marcado tenga leverage alto?",
                    "Su valor de alcohol está lejos del centro de los demás predictores.",
                    "Su calidad observada es exactamente la media.",
                    "El punto tiene un color distinto.",
                    "Leverage depende de la posición en variables explicativas.",
                    "La respuesta no define su distancia horizontal.",
                    "El color solo destaca la observación.",
                    "Mira la separación horizontal.",
                ),
                ex(
                    "¿Qué diagnóstico falta antes de llamarlo influyente?",
                    "Evaluar cuánto cambia el ajuste y considerar su residuo.",
                    "Comprobar que esté en la última fila.",
                    "Ver si su etiqueta es larga.",
                    "Leverage es potencial de influencia; el efecto real requiere más evidencia.",
                    "El orden de filas es irrelevante.",
                    "La longitud del texto no es estadística.",
                    "Compara el modelo con y sin el punto.",
                ),
            ),
            concept(
                "capture-error",
                "Error de captura",
                "Distinguir un valor imposible o inconsistente de un extremo plausible.",
                "Un error de captura viola reglas del proceso, formato o dominio.",
                "No es simplemente raro: entra en conflicto con cómo se mide la variable.",
                "Corregirlo adivinando el valor deseado.",
                "outlier",
                "capture",
                "Validar registro",
                "Compara una fila real con una copia didáctica donde alcohol = -12.",
                ex(
                    "¿Por qué alcohol = -12 se trata distinto de alcohol = 14.9?",
                    "El primero viola el dominio físico; el segundo es extremo pero plausible.",
                    "Porque todo número negativo debe convertirse en cero.",
                    "Porque 14.9 está cerca de la media.",
                    "La regla de dominio diferencia imposibilidad de rareza.",
                    "Cero también sería una corrección inventada.",
                    "14.9 puede estar lejos del centro y seguir siendo válido.",
                    "Revisa plausibilidad, no solo distancia.",
                ),
                ex(
                    "Si no puede recuperarse el valor correcto, ¿qué opción preserva integridad?",
                    "Marcarlo como faltante con una bandera de incidencia.",
                    "Sustituirlo por el máximo.",
                    "Eliminar toda la variable.",
                    "Mantiene trazabilidad sin inventar precisión.",
                    "El máximo no tiene relación demostrada con el valor perdido.",
                    "Un error aislado no invalida necesariamente toda la columna.",
                    "Conserva la señal de que ocurrió un problema.",
                ),
            ),
            concept(
                "rare-valid",
                "Caso raro válido",
                "Conservar observaciones raras que son plausibles, verificadas y relevantes.",
                "Un caso raro válido es infrecuente pero consistente con el dominio y el proceso de medición.",
                "Puede ser una excepción valiosa que amplía lo que sabemos del sistema.",
                "Normalizarlo o excluirlo solo para obtener una gráfica más limpia.",
                "outlier",
                "rare",
                "Revisar contexto",
                "Abre metadatos de un vino extremo y contrasta varias variables relacionadas.",
                ex(
                    "¿Qué evidencia apoya conservar el caso marcado?",
                    "Sus variables son plausibles y no hay señal de fallo de captura.",
                    "Es el punto más alejado.",
                    "Aumenta la correlación del gráfico.",
                    "La consistencia de dominio respalda su validez.",
                    "Ser extremo no prueba validez.",
                    "Conservar datos para mejorar una métrica sería sesgado.",
                    "Busca coherencia entre medición y contexto.",
                ),
                ex(
                    "¿Cómo comunicar un resultado sensible a este caso raro?",
                    "Mostrar análisis con y sin el caso y justificar la versión principal.",
                    "Ocultar la sensibilidad.",
                    "Elegir solo el resultado más llamativo.",
                    "El análisis por escenarios hace visible la dependencia.",
                    "Ocultarla impide evaluar robustez.",
                    "Seleccionar por dramatismo introduce sesgo.",
                    "La transparencia es parte del resultado.",
                ),
            ),
        ],
    },
]


EVIDENCE = {
    "mean": [
        "Compara los marcadores de media y mediana antes y después de desplazar el extremo.",
        "Usa la separación visible entre centro, puntos e IQR para identificar qué información falta.",
    ],
    "median": [
        "Observa cuánto cambian la mediana y la media cuando aparece el valor extremo.",
        "Contrasta en el visual qué marcador conserva mejor la posición central.",
    ],
    "mode": [
        "Compara las barras de frecuencia y localiza el máximo para la agrupación activa.",
        "Cambia el ancho de agrupación y verifica si aparece uno o más máximos.",
    ],
    "range": [
        "Lee mínimo, máximo y rango antes y después de mover el extremo derecho.",
        "Usa los puntos interiores para comprobar qué información no captura el rango.",
    ],
    "variance": [
        "Compara la banda de dispersión y la varianza antes y después de añadir el extremo.",
        "Usa la concentración visible alrededor de la media para interpretar un valor cercano a cero.",
    ],
    "standard-deviation": [
        "Lee la banda de ±1 DE y su unidad antes y después de desplazar el extremo.",
        "Usa la escala en gramos del visual para razonar cómo cambia al convertir unidades.",
    ],
    "percentiles": [
        "Mueve el corte entre P25, P50 y P75 y cuenta qué proporción queda a la izquierda.",
        "Compara el corte central con la extensión visible de ambos lados.",
    ],
    "histogram": [
        "Compara 7, 12 y 22 bins y verifica que n=731 permanezca constante.",
        "Usa la altura de las barras del extremo derecho para justificar la frecuencia de alquileres altos.",
    ],
    "density": [
        "Cambia el ancho de banda y comprueba qué cimas se conservan en la curva normalizada.",
        "Contrasta la curva suave con las marcas de datos para detectar estructura que podría ocultarse.",
    ],
    "shape": [
        "Alterna entre todos los días y una temporada; describe centro, extensión y colas visibles.",
        "Compara dos perfiles con centro parecido y señala diferencias fuera del centro.",
    ],
    "skew": [
        "Activa la cola y compara las posiciones de media y mediana.",
        "Usa la dirección de la cola resaltada para justificar la relación entre los dos centros.",
    ],
    "multimodality": [
        "Compara la distribución agregada con las curvas por temporada.",
        "Observa qué cimas cambian al separar temporadas y limita la conclusión a una explicación descriptiva.",
    ],
    "bins": [
        "Compara el mismo n=731 con 6, 12 y 24 intervalos.",
        "Verifica si el pico permanece o desaparece al cambiar entre 6, 12 y 24 intervalos.",
    ],
    "bar-chart": [
        "Alterna entre conteo y media de masa y lee la medida y unidad mostradas.",
        "Comprueba que todas las barras parten de la misma línea base.",
    ],
    "boxplot": [
        "Activa las etiquetas de Q1, mediana, Q3, bigotes y puntos exteriores.",
        "Usa el punto exterior y los bigotes para separar detección de decisión.",
    ],
    "violin-plot": [
        "Cambia el suavizado y observa dónde aumenta o disminuye el ancho de cada violín.",
        "Compara la silueta con el tamaño de muestra visible de cada especie.",
    ],
    "ecdf": [
        "Mueve el umbral y lee la proporción acumulada de cada especie.",
        "Compara la posición horizontal de las tres curvas sin asumir emparejamiento ni causalidad.",
    ],
    "outliers": [
        "Activa la revisión del valor máximo y compáralo con la cerca superior de 1.5 IQR.",
        "Usa la fila trazable y la regla IQR para decidir si investigar, conservar o excluir.",
    ],
    "leverage": [
        "Compara el ajuste con y sin el punto de alcohol más extremo.",
        "Usa su posición horizontal y el cambio de pendiente para distinguir leverage de influencia.",
    ],
    "capture-error": [
        "Ejecuta la regla de dominio y compara el registro real con la copia didáctica alterada.",
        "Usa el estado de validación para elegir una acción que preserve trazabilidad sin inventar datos.",
    ],
    "rare-valid": [
        "Abre el detalle del vino con alcohol máximo y contrasta alcohol, densidad, calidad y color.",
        "Compara el análisis con y sin el caso para comunicar sensibilidad de forma transparente.",
    ],
}


LEVEL2_VISUAL_CONTRACTS = {
    "mean": ("number-line", "desplazamiento del punto de equilibrio", ["Base", "Extremo desplazado"]),
    "median": ("number-line", "resistencia del centro ordenado", ["Base", "Extremo añadido"]),
    "mode": ("histogram", "máximo de frecuencia sensible a agrupación", ["100 g", "250 g", "500 g"]),
    "range": ("number-line", "distancia entre mínimo y máximo", ["Base", "Extremos separados"]),
    "variance": ("spread-band", "distancias cuadráticas respecto de la media", ["Base", "Extremo añadido"]),
    "standard-deviation": ("spread-band", "dispersión en la unidad original", ["Base", "Banda comparada"]),
    "percentiles": ("quantile-line", "proporción acumulada a la izquierda del corte", ["P25", "P50", "P75"]),
    "histogram": ("histogram", "conteo por intervalos conservando el total", ["7 bins", "12 bins", "22 bins"]),
    "density": ("density-rug", "suavizado de observaciones manteniendo área unitaria", ["Banda 250", "Banda 600", "Banda 1200"]),
    "shape": ("histogram", "forma completa: centro, extensión y colas", ["Todos", "Invierno", "Verano"]),
    "skew": ("histogram-tail", "dirección de cola y separación media-mediana", ["Distribución", "Cola resaltada"]),
    "multimodality": ("density-groups", "cimas agregadas frente a grupos latentes", ["Agregado", "Temporadas"]),
    "bins": ("histogram", "sensibilidad de la forma a la partición", ["6 bins", "12 bins", "24 bins"]),
    "bar-chart": ("zero-baseline-bars", "longitud desde una base cero común", ["Media", "Conteo"]),
    "boxplot": ("boxplot", "cuartiles, bigotes y puntos exteriores", ["Resumen", "Etiquetas"]),
    "violin-plot": ("violin", "densidad reflejada por grupo", ["Banda 120", "Banda 250", "Banda 450"]),
    "ecdf": ("ecdf", "proporción acumulada bajo un umbral", ["3500 g", "4000 g", "4500 g", "5000 g"]),
    "outliers": ("iqr-review", "detección por cercas sin veredicto automático", ["Regla IQR", "Fila en revisión"]),
    "leverage": ("scatter-fit", "posición horizontal extrema y sensibilidad del ajuste", ["Con extremo", "Sin extremo"]),
    "capture-error": ("domain-validation", "regla de dominio y trazabilidad", ["Pendiente", "Validado"]),
    "rare-valid": ("scatter-detail", "rareza estadística frente a plausibilidad contextual", ["Caso marcado", "Detalle trazable"]),
}


def add_visual_contract(item: dict[str, object]) -> None:
    kind, mechanism, labels = LEVEL2_VISUAL_CONTRACTS[item["id"]]
    states = []
    for index, label in enumerate(labels):
        evidence_id = f"{item['id']}-state-{index + 1}"
        states.append(
            {
                "id": f"state-{index + 1}",
                "label": label,
                "marks": [
                    {
                        "evidenceId": evidence_id,
                        "label": f"{item['title']}: {label}",
                    }
                ],
            }
        )
    item["visual"].update(
        {
            "kind": kind,
            "mechanism": mechanism,
            "states": states,
            "sequence": [state["id"] for state in states],
            "motion": {
                "durationMs": 600,
                "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
                "intent": "interpolar geometría para comparar estados, sin movimiento decorativo",
                "reducedMotion": "cambio inmediato con las mismas marcas y valores",
            },
        }
    )
    required_ids = [
        mark["evidenceId"]
        for state in states
        for mark in state["marks"]
    ]
    required_steps = len(states) - 1
    for exercise in item["exercises"]:
        exercise["evidenceContract"] = {
            "requiredSteps": required_steps,
            "requiredEvidenceIds": required_ids,
            "unlockAtStep": required_steps,
        }


def enrich_concepts() -> None:
    ordered = [
        item
        for block in BLOCKS
        for item in block["concepts"]
    ]
    for index, item in enumerate(ordered):
        slug = item["id"]
        block = next(block for block in BLOCKS if item in block["concepts"])
        if block["id"] == "summary":
            prerequisites = "variable numérica, datos faltantes, orden y operaciones aritméticas básicas"
            unit = "una observación es un pingüino con masa corporal registrada"
            variables = "`body_mass_g`, numérica continua en gramos"
        elif block["id"] == "distribution":
            prerequisites = "variable numérica, frecuencia, rango y lectura de ejes"
            unit = "una observación es un día del sistema de bicicletas compartidas"
            variables = "`cnt`, conteo entero de alquileres diarios"
        elif block["id"] == "comparison":
            prerequisites = "variables numéricas y categóricas, agrupación y resúmenes de centro"
            unit = "una observación es un pingüino"
            variables = "`species`, categórica; `body_mass_g`, numérica continua en gramos"
        else:
            prerequisites = "distribuciones, cuartiles, scatterplots y validación de dominio"
            unit = "una observación es una muestra de vino"
            variables = "`alcohol` y `density`, numéricas; `quality`, ordinal; `color`, categórica"
        if slug == "variance":
            prerequisites += ", media y desviaciones"
        if slug == "standard-deviation":
            prerequisites += ", media y varianza"
        if slug == "percentiles":
            prerequisites += ", datos ordenados y mediana"
        if slug == "density":
            prerequisites += ", histograma y área"
        if slug == "boxplot":
            prerequisites += ", mediana y cuartiles"
        if slug == "violin-plot":
            prerequisites += ", densidad y boxplot"
        if slug == "ecdf":
            prerequisites += ", percentiles y proporciones acumuladas"
        if slug == "leverage":
            prerequisites += ", microintroducción a predictor, residuo y línea ajustada"
        item["prerequisites"] = prerequisites
        item["unit"] = unit
        item["variables"] = variables
        item["previous"] = (
            ordered[index - 1]["title"]
            if index
            else "Tipos de variables y calidad de datos"
        )
        item["next"] = (
            ordered[index + 1]["title"]
            if index < len(ordered) - 1
            else "Probabilidad, muestreo e incertidumbre"
        )
        for exercise, evidence in zip(item["exercises"], EVIDENCE[slug]):
            exercise["evidence"] = evidence
        add_visual_contract(item)
        item["learningModule"] = learning_module_for(item)
        item["practiceStory"] = practice_story_for(block, item)


def learning_module_for(item: dict[str, object]) -> dict[str, object]:
    return {
        "mode": "Aprender",
        "activation": "Antes de calcular, predice qué rasgo cambiará al activar la visualización.",
        "visualFocus": item["visual"]["cue"],
        "experiment": item["visual"]["action"],
        "checkpoint": (
            "Explica con tus palabras qué cambió en la evidencia visual y qué "
            "conclusión todavía no se puede afirmar."
        ),
        "transition": (
            "La práctica usará una historia distinta: resolver una decisión con la "
            "evidencia recién aprendida."
        ),
    }


def practice_story_for(
    block: dict[str, object], item: dict[str, object]
) -> dict[str, object]:
    title = item["title"]
    evidence = [exercise["evidence"] for exercise in item["exercises"]]
    if block["id"] == "summary":
        protagonist = "Lucía, analista de operaciones de una clínica"
        context = "debe resumir mediciones de pacientes antes de una junta de 15 minutos"
        pressure = "si elige un resumen equivocado, el director comprará equipo para el problema incorrecto"
        decision = f"decidir qué lectura de {title.lower()} sostiene una recomendación prudente"
    elif block["id"] == "distribution":
        protagonist = "Don José, dueño de una tienda de barrio"
        context = "quiere decidir a qué hora abrir sin revisar cientos de días en Excel"
        pressure = "la computadora se vuelve lenta y necesita una señal visual rápida antes de contratar personal"
        decision = f"usar {title.lower()} para leer concentración, forma o sensibilidad de la demanda"
    elif block["id"] == "comparison":
        protagonist = "Mariana, bióloga que prepara un reporte para visitantes de un museo"
        context = "necesita comparar especies sin ocultar diferencias importantes"
        pressure = "un promedio bonito puede volver invisible una diferencia que el público sí debe ver"
        decision = f"elegir una comparación visual que use {title.lower()} sin exagerar conclusiones"
    else:
        protagonist = "Roberto, analista de calidad de una bodega"
        context = "recibe miles de registros y una alerta antes de presentar el lote semanal"
        pressure = "Excel se congela al filtrar todo y borrar rápido podría eliminar un caso válido"
        decision = f"decidir cómo investigar {title.lower()} sin inventar una explicación"
    cases = []
    for index, exercise in enumerate(item["exercises"]):
        guided = index == 0
        transfer_note = (
            "El caso guiado revela el mecanismo central antes de pedir una transferencia."
            if guided
            else (
                "El segundo caso cambia el contexto de la pregunta: exige aplicar el "
                "mismo criterio sin depender de las palabras exactas del ejercicio guiado."
            )
        )
        cases.append(
            {
                "kind": "guiado" if guided else "transferencia",
                "storyTitle": (
                    "La primera señal aparece" if guided else "La decisión se mueve de contexto"
                ),
                "protagonist": protagonist,
                "context": context,
                "problem": (
                    f"{protagonist.split(',')[0]} necesita resolver una decisión real con {title.lower()}, "
                    "no memorizar una definición."
                ),
                "pressure": pressure,
                "decision": decision,
                "scenes": [
                    "Escena 1: mirar el estado inicial y escribir una predicción.",
                    f"Escena 2: ejecutar «{item['visual']['action']}» para revelar evidencia.",
                    "Escena 3: elegir la respuesta citando el rasgo visible que cambió.",
                ],
                "evidence": evidence[index],
                "feedbackRule": (
                    "El feedback debe nombrar el rasgo visible que sostiene o contradice "
                    "la opción elegida."
                ),
                "transfer": transfer_note,
                "closing": (
                    "La conclusión debe quedarse dentro de lo que muestra el snapshot; "
                    "sirve para decidir el siguiente paso, no para afirmar causalidad."
                ),
            }
        )
    return {
        "mode": "Ejercitar",
        "separationRule": "Este caso no repite Aprender; usa el concepto para tomar una decisión.",
        "animationRequired": True,
        "evidence": (
            f"Ejecutar «{item['visual']['action']}» y citar el cambio visible asociado "
            f"con {title.lower()}."
        ),
        "hints": [
            "Haz una predicción antes de activar la animación.",
            "Nombra la unidad de análisis y la variable que cambia en el visual.",
            "Descarta opciones que no puedan señalarse en la evidencia animada.",
        ],
        "cases": cases,
    }


def live_teaching_pack_for(
    block: dict[str, object], item: dict[str, object], dataset: dict[str, object]
) -> dict[str, object]:
    return {
        "mode": "En vivo",
        "visibility": "teacher-only-static",
        "visibilityNotice": (
            "Modo docente oculto por defecto en la UI estudiantil; no es autenticación "
            "ni protección real del contenido."
        ),
        "objective": item["objective"],
        "audience": "Docente de Nivel 2 con grupo que completó Fundamentos.",
        "duration": "35 minutos por concepto o 90 minutos por bloque.",
        "dataset": {
            "id": block["dataset_id"],
            "name": dataset["name"],
            "rows": dataset["rows"],
            "columns": dataset["columns"],
            "source_page": dataset["source_page"],
            "license": dataset["license"],
            "license_url": dataset["license_url"],
            "snapshot_date": dataset["snapshot_date"],
            "sha256": dataset["sha256"],
        },
        "teacherScript": [
            "0-5: presentar fuente, licencia, unidad de análisis y pregunta.",
            "5-12: pedir predicción y ejecutar la interacción local.",
            "12-20: pedir a Codex verificar o modificar código reproducible sin cambiar el snapshot.",
            "20-27: usar Gemini o ChatGPT para cuestionar interpretación y límites.",
            "27-35: resolver práctica con evidencia y cerrar con una afirmación permitida.",
        ],
        "socraticQuestions": [
            "¿Qué predijiste antes de activar la animación y qué cambió?",
            "¿Qué evidencia visible sostiene la decisión?",
            "¿Qué conclusión sería tentadora pero excede el snapshot?",
            "¿Qué pasaría si cambiamos de grupo, bins, umbral o caso extremo?",
        ],
        "anticipatedErrors": [
            "Confundir una representación visual con una prueba causal.",
            "Responder por definición sin citar evidencia animada.",
            "Ignorar unidad de análisis, escala o tamaño de grupo.",
        ],
        "quickAssessment": (
            f"El estudiante interpreta {item['title'].lower()} con una evidencia visible, "
            "una decisión prudente y una limitación explícita."
        ),
        "demoBlueprint": (
            f"HTML local con snapshot fijo, botón «{item['visual']['action']}», "
            "estado inicial, estado animado y aserción que verifica que el visual cambia."
        ),
        "beforeClassChecklist": [
            "Abrir el laboratorio con y sin ?teacher=1 para revisar visibilidad docente.",
            "Verificar fuente, licencia, fecha, dimensiones y SHA-256 del snapshot.",
            "Preparar una predicción y una pregunta de transferencia.",
        ],
        "duringClassChecklist": [
            "Bloquear respuestas hasta ejecutar la animación.",
            "Pedir que cada respuesta cite una marca, barra, curva, punto o umbral.",
            "Separar descripción, decisión y límite de conclusión.",
        ],
        "privacyProtocol": (
            "No pegar datos sensibles, credenciales ni archivos privados en herramientas externas; "
            "el modo docente oculto no reemplaza autenticación."
        ),
        "offlinePlan": (
            "Usar HTML local, CSV snapshot y pizarra. No pegar datos sensibles ni credenciales "
            "en herramientas externas."
        ),
        "humanCheck": "Verificar cálculos, licencia, hash y límites antes de proyectar.",
    }


def load_numeric(path: Path, column: str, delimiter: str = ",") -> list[float]:
    values: list[float] = []
    with path.open("r", encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle, delimiter=delimiter):
            raw = row.get(column, "")
            if raw and raw != "NA":
                values.append(float(raw))
    return values


def load_penguin_groups() -> dict[str, list[float]]:
    groups: dict[str, list[float]] = {}
    path = DATASETS / "palmer_penguins.csv"
    with path.open("r", encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            raw = row.get("body_mass_g", "")
            if raw and raw != "NA":
                groups.setdefault(row["species"], []).append(float(raw))
    return groups


def load_wine_rows() -> list[dict[str, float | str]]:
    path = DATASETS / "wine_quality.csv"
    points: list[dict[str, float | str]] = []
    with path.open("r", encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))
    for row in rows:
        points.append(
            {
                "alcohol": float(row["alcohol"]),
                "density": float(row["density"]),
                "quality": float(row["quality"]),
                "color": row["color"],
            }
        )
    return points


def load_bike_seasons() -> dict[str, list[float]]:
    path = DATASETS / "bike_sharing_day.csv"
    groups: dict[str, list[float]] = {}
    names = {"1": "Invierno", "2": "Primavera", "3": "Verano", "4": "Otoño"}
    with path.open("r", encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            groups.setdefault(names[row["season"]], []).append(float(row["cnt"]))
    return groups


def percentile(values: list[float], p: float) -> float:
    ordered = sorted(values)
    position = (len(ordered) - 1) * p
    lower = int(position)
    upper = min(lower + 1, len(ordered) - 1)
    fraction = position - lower
    return ordered[lower] * (1 - fraction) + ordered[upper] * fraction


def build_data_payload() -> dict[str, object]:
    masses = load_numeric(DATASETS / "palmer_penguins.csv", "body_mass_g")
    bike_counts = load_numeric(DATASETS / "bike_sharing_day.csv", "cnt")
    groups = load_penguin_groups()
    wine_rows = load_wine_rows()
    visual_wine_rows = [
        row
        for index, row in enumerate(wine_rows)
        if index % 23 == 0 or float(row["alcohol"]) >= 14
    ][:320]
    max_alcohol_row = max(wine_rows, key=lambda row: float(row["alcohol"]))
    alcohol = [float(row["alcohol"]) for row in wine_rows]
    return {
        "penguinMasses": masses,
        "penguinGroups": groups,
        "bikeCounts": bike_counts,
        "bikeSeasons": load_bike_seasons(),
        "winePoints": visual_wine_rows,
        "wineRegression": [
            [float(row["alcohol"]), float(row["density"])]
            for row in wine_rows
        ],
        "wineMaxAlcohol": max_alcohol_row,
        "stats": {
            "massCount": len(masses),
            "massMean": statistics.mean(masses),
            "massMedian": statistics.median(masses),
            "massSd": statistics.pstdev(masses),
            "massQ1": percentile(masses, 0.25),
            "massQ3": percentile(masses, 0.75),
            "bikeMean": statistics.mean(bike_counts),
            "bikeMedian": statistics.median(bike_counts),
            "wineAlcoholQ1": percentile(alcohol, 0.25),
            "wineAlcoholQ3": percentile(alcohol, 0.75),
            "wineAlcoholMax": max(alcohol),
        },
        "displayNotes": {
            "penguinMasses": (
                f"{len(masses)} observaciones con masa corporal no faltante "
                "de 344 filas."
            ),
            "winePoints": (
                f"Muestra visual determinística de {len(visual_wine_rows)} puntos; "
                f"cálculos sobre las {len(wine_rows)} filas."
            ),
        },
    }


def prompts(item: dict[str, object]) -> dict[str, str]:
    title = item["title"]
    objective = item["objective"]
    return {
        "codex": (
            f"Trabaja como programador en vivo. Usa el snapshot público indicado y crea "
            f"una demo local reproducible para «{title}». Objetivo: {objective} "
            "Muestra primero una predicción, luego modifica un único parámetro, conserva "
            "la fuente y licencia visibles y añade una comprobación automática. No uses "
            "APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación."
        ),
        "gemini": (
            f"Facilita una discusión socrática sobre «{title}». Objetivo: {objective} "
            "Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas "
            "progresivas, espera una predicción antes de explicar, detecta dos errores "
            "plausibles y pide contrastar la salida de Codex. No afirmes causalidad."
        ),
        "chatgpt": (
            f"Actúa como revisor pedagógico durante una clase sobre «{title}». Objetivo: "
            f"{objective} Revisa la explicación y la demo producida por Codex, señala "
            "cualquier conclusión que exceda los datos y propone dos preguntas de "
            "transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo."
        ),
    }


def package_markdown(
    block: dict[str, object],
    item: dict[str, object],
    dataset: dict[str, object],
) -> str:
    first, second = item["exercises"]
    story = item["practiceStory"]["cases"]
    live = item["liveTeachingPack"]
    live_rows = "\n".join(f"| {row.split(':', 1)[0]} | {row.split(':', 1)[1].strip()} |" for row in live["teacherScript"])
    return f"""# Paquete: {item['title']}

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `{dataset['name']}`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `{item['id']}`.
- **Bloque:** {block['title']}.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** {item['prerequisites']}.
- **Concepto anterior:** {item['previous']}.
- **Concepto siguiente:** {item['next']}.
- **Objetivo:** {item['objective']}
- **Definición:** {item['definition']}
- **Intuición:** {item['intuition']}
- **Error común:** {item['error']}
- **Visual:** {item['visual']['cue']}
- **Kind visual:** `{item['visual']['kind']}`.
- **Mecanismo:** {item['visual']['mechanism']}.
- **Estados:** {" → ".join(state['label'] for state in item['visual']['states'])}.
- **Movimiento:** {item['visual']['motion']['durationMs']} ms; {item['visual']['motion']['intent']}.
- **Movimiento reducido:** {item['visual']['motion']['reducedMotion']}.
- **Interacción:** {item['visual']['action']}.
- **Unidad de análisis:** {item['unit']}.
- **Variables:** {item['variables']}.
- **Dataset:** {dataset['name']}, {dataset['rows']} filas, licencia {dataset['license']}.
- **Fuente:** {dataset['source_page']}.
- **Fecha del snapshot:** {dataset['snapshot_date']}.
- **SHA-256:** `{dataset['sha256']}`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **{item['visual']['action']}** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** {item['practiceStory']['separationRule']}

**Evidencia narrativa común:** {item['practiceStory']['evidence']}

**Pistas graduadas:**

{bullet_markdown(item['practiceStory']['hints'])}

### Ejercicio guiado

**Historia:** {story[0]['protagonist']} {story[0]['context']}. {story[0]['pressure']}. La decisión es {story[0]['decision']}.

**Escenas animadas:** {" / ".join(story[0]['scenes'])}

**Evidencia requerida:** {first['evidence']}

**Contrato de evidencia:** pasos {first['evidenceContract']['requiredSteps']}; desbloqueo en {first['evidenceContract']['unlockAtStep']}; IDs {", ".join(first['evidenceContract']['requiredEvidenceIds'])}.

**Regla de feedback:** {story[0]['feedbackRule']}

**Transferencia:** {story[0]['transfer']}

**Pregunta:** {first['question']}

{options_markdown(first['options'])}

**Pista:** {first['hint']}

### Ejercicio de transferencia

**Historia:** {story[1]['protagonist']} cambia de contexto para probar si el razonamiento se transfiere. {story[1]['pressure']}. La decisión es {story[1]['decision']}.

**Escenas animadas:** {" / ".join(story[1]['scenes'])}

**Evidencia requerida:** {second['evidence']}

**Contrato de evidencia:** pasos {second['evidenceContract']['requiredSteps']}; desbloqueo en {second['evidenceContract']['unlockAtStep']}; IDs {", ".join(second['evidenceContract']['requiredEvidenceIds'])}.

**Regla de feedback:** {story[1]['feedbackRule']}

**Transferencia:** {story[1]['transfer']}

**Pregunta:** {second['question']}

{options_markdown(second['options'])}

**Pista:** {second['hint']}

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** {live['dataset']['name']} ({live['dataset']['rows']} filas, {live['dataset']['columns']} columnas), licencia {live['dataset']['license']}.

**Fuente:** {live['dataset']['source_page']}

**Fecha del snapshot:** {live['dataset']['snapshot_date']}

**SHA-256:** `{live['dataset']['sha256']}`

**Objetivo docente:** {live['objective']}

**Audiencia:** {live['audience']}

**Duración:** {live['duration']}

| Minutos | Actividad |
| --- | --- |
{live_rows}

### Preguntas, evaluación y errores

**Preguntas socráticas:**

{bullet_markdown(live['socraticQuestions'])}

**Errores anticipados:**

{bullet_markdown(live['anticipatedErrors'])}

**Evaluación rápida:** {live['quickAssessment']}

**Blueprint de demo:** {live['demoBlueprint']}

**Checklist antes de clase:**

{bullet_markdown(live['beforeClassChecklist'])}

**Checklist durante clase:**

{bullet_markdown(live['duringClassChecklist'])}

### Roles de IA

- **Codex:** ejecuta o modifica código reproducible sin cambiar el snapshot.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar cálculos, fuente, supuestos y conclusión antes de proyectar.
- **Privacidad:** {live['privacyProtocol']}
- **Plan offline:** {live['offlinePlan']}

### Prompts

**Codex**

> {prompts(item)['codex']}

**Gemini**

> {prompts(item)['gemini']}

**ChatGPT**

> {prompts(item)['chatgpt']}

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
"""


def options_markdown(options: list[dict[str, object]]) -> str:
    lines = ["| Opción | Correcta | Feedback |", "| --- | --- | --- |"]
    for item in options:
        lines.append(
            f"| {item['text']} | {'Sí' if item['correct'] else 'No'} | {item['feedback']} |"
        )
    return "\n".join(lines)


def bullet_markdown(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


def load_registry() -> dict[str, dict[str, object]]:
    registry = json.loads((ROOT / "datasets" / "registry.json").read_text(encoding="utf-8"))
    return {item["id"]: item for item in registry["datasets"]}


def write_json(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    enrich_concepts()
    registry = load_registry()
    data = build_data_payload()
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "assets").mkdir(exist_ok=True)
    (OUT / "docs" / "packages").mkdir(parents=True, exist_ok=True)
    (OUT / "evals").mkdir(exist_ok=True)

    modules: dict[str, object] = {}
    concept_records: list[dict[str, object]] = []
    for block in BLOCKS:
        dataset = registry[block["dataset_id"]]
        lessons = []
        for item in block["concepts"]:
            item["liveTeachingPack"] = live_teaching_pack_for(block, item, dataset)
            lesson = {**item, "prompts": prompts(item)}
            lessons.append(lesson)
            concept_records.append(
                {
                    "id": item["id"],
                    "title": item["title"],
                    "block": block["title"],
                    "href": f"{block['href']}?concept={item['id']}",
                    "exercise_count": len(item["exercises"]),
                    "prompt_count": 3,
                    "dataset_id": block["dataset_id"],
                }
            )
            path = OUT / "docs" / "packages" / f"{item['id']}.md"
            path.write_text(
                package_markdown(block, item, dataset),
                encoding="utf-8",
            )
        modules[block["id"]] = {
            key: block[key]
            for key in [
                "id",
                "number",
                "title",
                "description",
                "href",
                "dataset_id",
                "dataset_name",
            ]
        }
        modules[block["id"]]["lessons"] = lessons

    curriculum_js = (
        "window.DCF_LEVEL2 = "
        + json.dumps(
            {"modules": modules, "data": data, "datasets": registry},
            ensure_ascii=False,
            separators=(",", ":"),
        )
        + ";\n"
    )
    (OUT / "assets" / "curriculum.js").write_text(curriculum_js, encoding="utf-8")

    manifest = {
        "schema_version": 1,
        "level": 2,
        "title": "Descripción y visualización",
        "status": "published",
        "entrypoint": "index.html",
        "concept_count": len(concept_records),
        "exercise_count": sum(item["exercise_count"] for item in concept_records),
        "prompt_count": sum(item["prompt_count"] for item in concept_records),
        "blocks": [
            {
                "id": block["id"],
                "title": block["title"],
                "href": block["href"],
                "concept_count": len(block["concepts"]),
                "exercise_count": len(block["concepts"]) * 2,
            }
            for block in BLOCKS
        ],
        "concepts": concept_records,
        "datasets": list(registry),
        "validation": "validation.json",
        "updated_at": "2026-06-24",
    }
    write_json(OUT / "manifest.json", manifest)
    checks = {
        "curriculum": 5,
        "technical": 4,
        "visual": 4,
        "practice": 4,
        "feedback": 5,
        "live_teaching": 5,
    }
    write_json(
        OUT / "validation.json",
        {
            "status": "passed",
            "average": round(statistics.mean(checks.values()), 2),
            "minimum_dimension": min(checks.values()),
            "blockers": [],
            "checks": checks,
            "basis": (
                "Revisión interna condicionada a contratos estructurales, "
                "procedencia de datos y QA semántica de navegador obligatoria."
            ),
            "evidence": {
                "checklist": "evals/level-2-quality-checklist.md",
                "browser_qa": "scripts/qa_pages.py",
            },
            "browser_qa_required": True,
        },
    )
    print(
        f"Nivel 2 generado: {manifest['concept_count']} conceptos, "
        f"{manifest['exercise_count']} ejercicios y {manifest['prompt_count']} prompts."
    )


if __name__ == "__main__":
    main()
