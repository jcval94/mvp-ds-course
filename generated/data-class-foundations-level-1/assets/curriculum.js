(function () {
  const option = (text, correct, feedback) => ({ text, correct, feedback });
  const lesson = (id, title, objective, definition, intuition, error, visual, question, options) => ({
    id, title, objective, definition, intuition, error, visual,
    practice: { question, options },
    prompts: {
      codex: `Crea una demo reproducible en HTML y JavaScript para enseñar "${title}". Objetivo: ${objective} Usa datos sintéticos pequeños, controles visibles y una comprobación automática. Explica qué archivos producirías y define criterios de aceptación.`,
      gemini: `Actúa como facilitador socrático de una clase principiante sobre "${title}". Objetivo: ${objective} Formula 4 preguntas progresivas basadas en la evidencia visual, anticipa dos errores frecuentes y sugiere cómo corregirlos sin revelar la respuesta de inmediato.`,
      chatgpt: `Crea dos ejemplos alternativos y tres preguntas de transferencia para "${title}". Objetivo: ${objective} Cada pregunta debe poder responderse con evidencia de una tabla o transformación, e incluye respuesta esperada y feedback breve.`
    }
  });

  window.DCF_MODULES = {
    literacy: {
      id: "literacy",
      number: 1,
      title: "Alfabetización de datos",
      description: "Aprende a leer la estructura de un conjunto de datos antes de analizarlo.",
      href: "alfabetizacion.html",
      accent: "teal",
      icon: "table",
      datasetName: "Personas y movilidad",
      lessons: [
        lesson(
          "observation", "Observación",
          "Identificar qué entidad o evento representa cada fila.",
          "Una observación es una unidad registrada: una persona, compra, sensor o evento.",
          "Piensa en cada fila como una ficha completa de un caso.",
          "Confundir una celda individual con una observación completa.",
          { type: "table", focus: "rows", action: "Iluminar filas", cue: "Cada fila describe una persona distinta." },
          "¿Qué representa la fila de la Persona 3?",
          [
            option("Una observación completa sobre una persona.", true, "Correcto: la fila reúne todas las variables registradas para esa persona."),
            option("Una sola variable llamada Persona 3.", false, "Una variable ocupa una columna; Persona 3 identifica el caso registrado."),
            option("Toda la población del estudio.", false, "La población contiene muchas unidades; esta fila es solo una observación.")
          ]
        ),
        lesson(
          "variable", "Variable",
          "Reconocer qué característica representa cada columna.",
          "Una variable es una característica que puede tomar valores distintos entre observaciones.",
          "Las columnas son preguntas repetidas para cada caso: edad, ciudad o minutos de traslado.",
          "Tratar el identificador como una medida útil para promediar.",
          { type: "table", focus: "columns", action: "Recorrer columnas", cue: "Cada columna conserva un significado y un tipo." },
          "¿Cuál columna describe una característica medible de las personas?",
          [
            option("Edad.", true, "Edad es una característica numérica que varía entre personas."),
            option("Persona 1.", false, "Persona 1 identifica una observación, no una variable."),
            option("Fila 4.", false, "Una fila es una observación completa.")
          ]
        ),
        lesson(
          "table", "Tabla",
          "Explicar cómo filas y columnas organizan un conjunto de datos.",
          "Una tabla cruza observaciones en filas con variables en columnas.",
          "Es una cuadrícula: cada celda responde una pregunta sobre un caso.",
          "Asumir que cualquier cuadrícula ya está lista para analizar.",
          { type: "table", focus: "grid", action: "Construir tabla", cue: "Las celdas adquieren sentido por su fila y columna." },
          "¿Qué hace interpretable el valor 42 dentro de la tabla?",
          [
            option("Su cruce con la fila Persona 4 y la columna Edad.", true, "El contexto de fila y columna convierte 42 en la edad de una persona concreta."),
            option("Que es el número más grande visible.", false, "La magnitud no explica qué representa el valor."),
            option("Que aparece dentro de una celda.", false, "Una celda sin encabezados ni unidad sigue siendo ambigua.")
          ]
        ),
        lesson(
          "population", "Población",
          "Distinguir el conjunto total de interés de los datos disponibles.",
          "La población es el conjunto completo sobre el que queremos aprender.",
          "Es el universo de casos relevantes, aunque no podamos observarlos todos.",
          "Llamar población a las pocas filas que están en el archivo.",
          { type: "population", focus: "all", action: "Expandir población", cue: "Las filas visibles son solo parte del universo de interés." },
          "Si estudiamos el traslado de todo el campus, ¿cuál es la población?",
          [
            option("Todas las personas del campus.", true, "La pregunta busca aprender sobre todas las personas del campus."),
            option("Las cinco personas de la tabla.", false, "Esas personas son datos observados, no necesariamente toda la población."),
            option("Solo quienes tardan más de 40 minutos.", false, "Eso sería un subgrupo definido por una condición.")
          ]
        ),
        lesson(
          "sample", "Muestra",
          "Reconocer una muestra y explicar por qué debe representar a la población.",
          "Una muestra es el subconjunto observado que usamos para aprender sobre la población.",
          "Es una selección del universo: su calidad depende de cómo fue elegida.",
          "Creer que una muestra grande siempre elimina el sesgo de selección.",
          { type: "population", focus: "sample", action: "Tomar muestra", cue: "Una selección equilibrada evita representar solo a un subgrupo." },
          "¿Qué muestra permite comparar mejor los traslados del campus?",
          [
            option("Personas seleccionadas de distintos horarios y áreas.", true, "La diversidad de horarios y áreas reduce un sesgo obvio de selección."),
            option("Las primeras veinte personas que llegan en automóvil.", false, "Ese método excluye otros medios y horarios."),
            option("Solo quienes respondieron una encuesta nocturna.", false, "La hora de respuesta puede dejar fuera grupos importantes.")
          ]
        )
      ]
    },
    types: {
      id: "types",
      number: 2,
      title: "Tipos de variables",
      description: "Clasifica variables para elegir operaciones y representaciones compatibles.",
      href: "tipos-variables.html",
      accent: "blue",
      icon: "shapes",
      datasetName: "Catálogo de una biblioteca",
      lessons: [
        lesson(
          "numeric", "Numérica",
          "Identificar variables numéricas y operaciones con sentido.",
          "Una variable numérica representa cantidades para las que las operaciones aritméticas tienen significado.",
          "Sus valores viven en una escala: sumar, restar o comparar distancias puede tener sentido.",
          "Clasificar como numérico cualquier valor escrito con dígitos, incluidos IDs.",
          { type: "sorter", focus: "numeric", action: "Clasificar tarjetas", cue: "Prueba si calcular una diferencia responde una pregunta útil." },
          "¿Cuál variable permite calcular una diferencia interpretable?",
          [
            option("Días de préstamo.", true, "La diferencia entre 14 y 7 días tiene una interpretación directa."),
            option("Código postal.", false, "Aunque usa dígitos, funciona como etiqueta geográfica."),
            option("ID de libro.", false, "Un ID identifica; promediarlo no describe los libros.")
          ]
        ),
        lesson(
          "categorical", "Categórica",
          "Reconocer etiquetas que dividen observaciones en grupos sin orden inherente.",
          "Una variable categórica asigna cada observación a una clase o etiqueta.",
          "Funciona como cajas con nombres: ficción, ensayo o ciencia.",
          "Asignar números a categorías y tratarlos automáticamente como cantidades.",
          { type: "sorter", focus: "categorical", action: "Agrupar etiquetas", cue: "Las categorías separan grupos; su distancia no se calcula." },
          "¿Cuál variable es categórica sin orden natural?",
          [
            option("Género literario.", true, "Los géneros son etiquetas y no tienen un orden universal."),
            option("Número de páginas.", false, "Es una cantidad numérica."),
            option("Nivel de satisfacción.", false, "Sus categorías suelen tener un orden, por lo que es ordinal.")
          ]
        ),
        lesson(
          "ordinal", "Ordinal",
          "Detectar categorías con orden, pero sin distancias numéricas garantizadas.",
          "Una variable ordinal tiene categorías ordenadas, aunque los saltos entre ellas no sean iguales.",
          "Es una escalera: sabemos qué nivel va antes, no cuánto mide cada escalón.",
          "Promediar códigos ordinales como si fueran una escala exacta.",
          { type: "sorter", focus: "ordinal", action: "Ordenar niveles", cue: "Ordena bajo, medio y alto sin inventar distancias." },
          "¿Qué afirmación es válida para Bajo, Medio y Alto?",
          [
            option("Alto está por encima de Medio, pero no sabemos si la distancia es el doble.", true, "El orden está definido; la distancia cuantitativa no."),
            option("Alto vale exactamente tres veces Bajo.", false, "Los códigos no garantizan proporciones."),
            option("Las tres categorías no tienen ningún orden.", false, "Precisamente su característica es el orden.")
          ]
        ),
        lesson(
          "date", "Fecha",
          "Reconocer fechas y elegir operaciones temporales compatibles.",
          "Una fecha ubica una observación en el tiempo y permite calcular orden, duración y periodicidad.",
          "Una fecha es una coordenada temporal, no solo una cadena con guiones.",
          "Ordenar fechas como texto con formatos inconsistentes.",
          { type: "timeline", focus: "date", action: "Ordenar eventos", cue: "La posición temporal permite calcular días entre eventos." },
          "¿Qué operación responde una pregunta temporal válida?",
          [
            option("Calcular días entre préstamo y devolución.", true, "La resta entre fechas produce una duración interpretable."),
            option("Promediar el número de mes con el ID del libro.", false, "Combina magnitudes sin significado común."),
            option("Ordenar 12/01 antes de 03/11 sin conocer el formato.", false, "El formato ambiguo puede invertir el orden.")
          ]
        ),
        lesson(
          "text", "Texto",
          "Distinguir texto libre de categorías y reconocer su preparación inicial.",
          "Una variable de texto contiene lenguaje abierto cuya estructura debe extraerse antes de analizar.",
          "Es una bolsa de expresiones: palabras, frases y contexto, no una lista fija de etiquetas.",
          "Tratar cada frase completa como categoría y contarla sin normalización.",
          { type: "text", focus: "tokens", action: "Separar palabras", cue: "Normalizar y tokenizar revela unidades comparables." },
          "¿Cuál es un primer paso razonable para analizar reseñas abiertas?",
          [
            option("Normalizar mayúsculas y separar palabras conservando el texto original.", true, "Permite comparar términos sin perder trazabilidad."),
            option("Asignar un número aleatorio a cada frase.", false, "Los números aleatorios no representan contenido."),
            option("Promediar la longitud de todas las palabras y concluir satisfacción.", false, "La longitud no equivale al significado de la reseña.")
          ]
        )
      ]
    },
    quality: {
      id: "quality",
      number: 3,
      title: "Calidad de datos",
      description: "Detecta problemas que pueden distorsionar cualquier conclusión posterior.",
      href: "calidad-datos.html",
      accent: "coral",
      icon: "database",
      datasetName: "Encuesta de satisfacción",
      lessons: [
        lesson(
          "missing", "Faltantes",
          "Identificar valores ausentes y analizar su patrón antes de tratarlos.",
          "Un dato faltante indica que una variable no tiene valor observado para un caso.",
          "Es un hueco con historia: puede faltar al azar o por el proceso de medición.",
          "Reemplazar todos los faltantes con cero.",
          { type: "quality", focus: "missing", action: "Escanear faltantes", cue: "Los huecos aparecen en variables y grupos concretos." },
          "¿Qué debes revisar antes de imputar una satisfacción faltante?",
          [
            option("Si los faltantes se concentran en un grupo o momento.", true, "El patrón ayuda a entender la causa y el riesgo de sesgo."),
            option("Qué valor hace subir más el promedio.", false, "Elegir por el resultado deseado introduce sesgo."),
            option("Si cero cabe visualmente en la celda.", false, "Cero puede ser un valor real y no significa ausencia.")
          ]
        ),
        lesson(
          "duplicates", "Duplicados",
          "Detectar registros repetidos y decidir si representan error o eventos reales.",
          "Un duplicado es un registro repetido según una clave y un contexto definidos.",
          "Dos filas iguales pueden ser una copia accidental o dos eventos legítimos.",
          "Eliminar filas iguales sin definir la unidad de análisis.",
          { type: "quality", focus: "duplicates", action: "Separar duplicados", cue: "La clave ID revela una repetición exacta." },
          "¿Cuándo es razonable eliminar una fila duplicada?",
          [
            option("Cuando repite la misma unidad y el mismo evento por un error de carga.", true, "La decisión usa unidad de análisis y contexto."),
            option("Siempre que dos edades coincidan.", false, "Personas distintas pueden tener la misma edad."),
            option("Cuando la fila reduce la variación del conjunto.", false, "La conveniencia estadística no define un duplicado.")
          ]
        ),
        lesson(
          "invalid", "Rangos inválidos",
          "Detectar valores fuera de reglas plausibles sin inventar una corrección.",
          "Un rango inválido viola una regla de dominio o una restricción de captura.",
          "Las reglas funcionan como barreras: señalan valores que requieren investigación.",
          "Forzar el valor al límite más cercano sin conocer su origen.",
          { type: "quality", focus: "invalid", action: "Validar rangos", cue: "Edad -5 y 120 activan reglas distintas de revisión." },
          "¿Cómo tratar inicialmente Edad = -5?",
          [
            option("Marcarlo como faltante y revisar la causa.", true, "No hay evidencia para sustituirlo; conservar la señal de problema protege la integridad."),
            option("Cambiarlo a 0.", false, "Cero sería una corrección inventada."),
            option("Eliminar toda la columna Edad.", false, "Un error localizado no invalida automáticamente toda la variable.")
          ]
        ),
        lesson(
          "measurement-bias", "Sesgo de medición",
          "Reconocer cuando el proceso de medición desplaza sistemáticamente los valores.",
          "El sesgo de medición ocurre cuando el instrumento o proceso produce errores sistemáticos.",
          "Una báscula descalibrada mueve todas las mediciones en la misma dirección.",
          "Creer que más observaciones corrigen automáticamente un instrumento sesgado.",
          { type: "quality", focus: "bias", action: "Comparar instrumentos", cue: "La medición defectuosa desplaza todo el conjunto." },
          "¿Qué evidencia sugiere sesgo de medición?",
          [
            option("Un sensor registra siempre 3 unidades más que el patrón.", true, "La desviación sistemática apunta al proceso de medición."),
            option("Algunos valores varían alrededor del patrón.", false, "La variación aleatoria no implica por sí sola un sesgo sistemático."),
            option("El archivo contiene muchas filas.", false, "El tamaño no diagnostica la calibración.")
          ]
        )
      ]
    },
    preparation: {
      id: "preparation",
      number: 4,
      title: "Preparación básica",
      description: "Transforma datos de forma explícita y observa cómo cambia su interpretación.",
      href: "preparacion-basica.html",
      accent: "gold",
      icon: "wrench",
      datasetName: "Pedidos de una cafetería",
      lessons: [
        lesson(
          "filter", "Filtrar",
          "Aplicar una condición y explicar qué observaciones quedan fuera.",
          "Filtrar conserva las filas que cumplen una condición explícita.",
          "Es una puerta: deja pasar ciertos casos sin modificar sus valores.",
          "Olvidar que el resultado solo describe el subconjunto filtrado.",
          { type: "prepare", focus: "filter", action: "Aplicar filtro", cue: "Solo permanecen pedidos con total mayor o igual a 100." },
          "Después de filtrar Total ≥ 100, ¿qué cambia?",
          [
            option("La población descrita por la tabla visible.", true, "Ahora las conclusiones corresponden al subconjunto de pedidos grandes."),
            option("Los totales originales de cada pedido.", false, "Filtrar conserva valores; solo selecciona filas."),
            option("La unidad monetaria.", false, "La condición no transforma pesos en otra unidad.")
          ]
        ),
        lesson(
          "sort", "Ordenar",
          "Cambiar el orden de las filas sin alterar sus valores.",
          "Ordenar reorganiza observaciones según una o más variables.",
          "Es acomodar fichas por una regla, no reescribir su contenido.",
          "Interpretar el primer registro ordenado como el primero que ocurrió.",
          { type: "prepare", focus: "sort", action: "Ordenar por total", cue: "Las filas cambian de posición, pero cada pedido conserva sus datos." },
          "¿Qué afirmación es correcta tras ordenar Total de mayor a menor?",
          [
            option("La primera fila tiene el total más alto, no necesariamente ocurrió primero.", true, "El orden visible responde a Total, no al tiempo."),
            option("Los pedidos aumentaron de precio.", false, "Ningún valor fue modificado."),
            option("Se eliminaron los pedidos pequeños.", false, "Ordenar conserva todas las filas.")
          ]
        ),
        lesson(
          "group", "Agrupar",
          "Combinar observaciones por categoría y calcular un resumen explícito.",
          "Agrupar reúne filas que comparten una clave para calcular conteos, sumas u otros resúmenes.",
          "Es formar equipos y luego responder una pregunta por equipo.",
          "Agrupar sin indicar la función de resumen.",
          { type: "prepare", focus: "group", action: "Agrupar por producto", cue: "Las filas colapsan en conteos y ventas por producto." },
          "¿Qué debe acompañar siempre a 'agrupar por producto'?",
          [
            option("La medida de resumen, por ejemplo suma de ventas.", true, "La clave define grupos y la función define el resultado."),
            option("Un orden alfabético obligatorio.", false, "El orden es independiente del agrupamiento."),
            option("La eliminación de todas las variables numéricas.", false, "Las variables numéricas suelen alimentar los resúmenes.")
          ]
        ),
        lesson(
          "transform", "Transformar",
          "Crear una representación derivada y explicar su efecto sobre la interpretación.",
          "Transformar modifica o crea variables mediante una regla reproducible.",
          "Es cambiar la lente: pesos a miles de pesos, texto a fecha o minutos a horas.",
          "Sobrescribir el dato original sin documentar la regla.",
          { type: "prepare", focus: "transform", action: "Cambiar unidades", cue: "Total cambia de pesos a miles de pesos sin perder la referencia original." },
          "¿Qué práctica mantiene trazabilidad al transformar Total?",
          [
            option("Crear Total_miles y documentar que Total_miles = Total / 1000.", true, "Conserva el original y hace explícita la regla."),
            option("Reemplazar Total con valores redondeados sin explicación.", false, "Se pierde información y no puede reproducirse la operación."),
            option("Cambiar solo el encabezado a miles.", false, "La etiqueta cambiaría, pero los valores seguirían en pesos.")
          ]
        )
      ]
    }
  };
})();
