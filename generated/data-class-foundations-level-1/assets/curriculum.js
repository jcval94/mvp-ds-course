(function () {
  const option = (text, correct, feedback) => ({ text, correct, feedback });

  const SOURCES = {
    curriculum: "docs/CURRICULUM_MAP.md#nivel-1-fundamentos",
    story: "docs/stories/LEVEL_1.md",
    storyStatus: "approved"
  };

  const liveDatasets = {
    "palmer-penguins": {
      id: "palmer-penguins", name: "Palmer Penguins", rows: 344, columns: 8,
      source_page: "https://allisonhorst.github.io/palmerpenguins/", license: "CC0-1.0",
      snapshot_date: "2026-06-14", sha256: "f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93"
    },
    "bike-sharing-day": {
      id: "bike-sharing-day", name: "Bike Sharing Dataset · UCI", rows: 731, columns: 16,
      source_page: "https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset", license: "CC BY 4.0",
      snapshot_date: "2026-06-14", sha256: "537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a"
    },
    "wine-quality": {
      id: "wine-quality", name: "Wine Quality · UCI", rows: 6497, columns: 13,
      source_page: "https://archive.ics.uci.edu/dataset/186/wine+quality", license: "CC BY 4.0",
      snapshot_date: "2026-06-14", sha256: "7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d"
    }
  };

  const datasetIdFor = (visual) => {
    if (visual.type === "quality") return "wine-quality";
    if (visual.type === "prepare" || visual.type === "timeline") return "bike-sharing-day";
    return "palmer-penguins";
  };

  const narrative = {
    observation: {
      scene: "L1-S01", episode: "La libreta, los pedidos y el yogurt",
      setup: "Paco empieza a registrar un pedido por renglón durante su turno con su papá.",
      donJuan: "Hijo, todo ese renglón es un pedido. Si lo parte, luego ni quién sepa qué tacos iban juntos.",
      paco: "Va, Pa. Empiezo uno nuevo cuando cierro el ticket.",
      subtitles: [
        "Antes de analizar, hay que decidir qué representa cada registro.",
        "Una observación es el registro de una unidad definida. Aquí, la unidad de análisis es un pedido."
      ],
      practice: ["Una foto muestra cuatro tickets, pero cada renglón mezcla productos.", "decidir qué debe representar una fila antes de capturar", "si mezcla tickets, ya no podrá comprobar qué tacos pertenecían al mismo pedido"]
    },
    variable: {
      scene: "L1-S02", episode: "La libreta, los pedidos y el yogurt",
      setup: "Don Juan revisa para qué servirá cada columna al preparar insumos.",
      donJuan: "Esta columna me dice cuántos fueron. La otra, cuáles. No las revuelva.",
      paco: "Una pregunta por columna, Pa.",
      subtitles: [
        "Cada columna debe registrar la misma característica para todos los pedidos.",
        "Una variable es una característica que puede tomar valores diferentes entre observaciones."
      ],
      practice: ["Antes del turno, faltan tortillas y Paco debe elegir qué columna consultar.", "elegir la variable útil sin confundirla con el ID", "si usa el número de ticket como cantidad, comprará con una medida sin sentido"]
    },
    table: {
      scene: "L1-S03", episode: "La libreta, los pedidos y el yogurt",
      setup: "El número 3 aparece aislado y Don Juan pregunta qué significa.",
      donJuan: "Ese tres solito no me dice nada. Puede ser ticket, tacos o mesa.",
      paco: "Con su renglón y encabezado sabemos que son tres tacos del P-002.",
      subtitles: [
        "Un dato aislado pierde el significado que le dan su fila y su encabezado.",
        "Una tabla organiza observaciones en filas y variables en columnas; no toda tabla es una base de datos."
      ],
      practice: ["Una captura recortada perdió sus encabezados.", "reconstruir qué contexto falta para interpretar una celda", "un valor sin fila y columna puede provocar una compra equivocada"]
    },
    population: {
      scene: "L1-S04", episode: "La libreta, los pedidos y el yogurt",
      setup: "Don Juan pregunta si el registro cubre las dos noches completas que le interesan.",
      donJuan: "Yo pregunté por las dos noches completas, no nomás por la hora en que había lugar para escribir.",
      paco: "Entonces cuentan todos los pedidos de esas dos noches.",
      subtitles: [
        "La pregunta define cuál es el conjunto completo de interés.",
        "La población objetivo son todos los pedidos incluidos en las dos noches definidas."
      ],
      practice: ["Paco recibe una foto de tickets del viernes y el sábado.", "delimitar la población del fin de semana", "si cambia las noches incluidas, también cambia la pregunta que puede responder"]
    },
    sample: {
      scene: "L1-S05", episode: "La libreta, los pedidos y el yogurt",
      setup: "Un yogurt mancha las últimas páginas de la libreta y solo quedan algunos pedidos legibles.",
      donJuan: "Ya aprendimos que la mochila no es archivero y el yogurt no es respaldo.",
      paco: "No voy a inventar lo que ya no se ve, Pa.",
      subtitles: [
        "Las páginas legibles contienen solo una parte de la población original.",
        "Esa parte es una muestra; si faltan sobre todo pedidos del cierre, puede representar mal a la población."
      ],
      practice: ["Una foto conserva solo los tickets del primer turno.", "decidir si puede representar toda la noche", "el cierre podría tener pedidos distintos y cambiar la conclusión"]
    },
    numeric: {
      scene: "L1-S06", episode: "Un esquema para no hacer adivinanzas",
      setup: "Paco compara `num_tacos` con `pedido_id`, aunque ambos contienen dígitos.",
      donJuan: "Los tacos sí los sumo. Los números de ticket solo sirven para encontrar el papel.",
      paco: "Entonces no se usan igual, aunque los dos tengan números.",
      subtitles: [
        "Que un valor use dígitos no basta para tratarlo como cantidad.",
        "`num_tacos` es numérica discreta; `pedido_id` es un identificador y promediarlo no resulta útil."
      ],
      practice: ["El proveedor entrega códigos de producto y cantidades en cajas.", "elegir qué variable admite una diferencia interpretable", "promediar códigos no ayuda a calcular insumos"]
    },
    categorical: {
      scene: "L1-S07", episode: "Un esquema para no hacer adivinanzas",
      setup: "Paco revisa los nombres de los tacos y las operaciones que permiten.",
      donJuan: "Pastor y bistec dicen qué preparo. No existe pastor menos bistec.",
      paco: "Sí puedo contar pedidos de cada tipo.",
      subtitles: [
        "Algunas variables separan observaciones mediante nombres o etiquetas.",
        "`tipo_taco` es categórica: permite agrupar y contar, pero no restar etiquetas."
      ],
      practice: ["El catálogo del proveedor contiene Pastor, pastor y PASTOR.", "reconocer una categoría y proponer una forma canónica", "si trata cada escritura como producto distinto, separará el mismo insumo"]
    },
    ordinal: {
      scene: "L1-S08", episode: "Un esquema para no hacer adivinanzas",
      setup: "Don Juan ordena Sin salsa, Poca, Media y Mucha sin asignar distancias.",
      donJuan: "Mucha va después de media, pero no diga que pica exactamente el doble.",
      paco: "Puedo ordenarlas sin inventar la distancia.",
      subtitles: [
        "Algunas categorías tienen un orden natural sin medir una distancia exacta.",
        "`nivel_salsa` es ordinal: conserva el orden, pero no garantiza intervalos iguales entre niveles."
      ],
      practice: ["Beto ordena cuatro etiquetas de intensidad para un letrero.", "ordenar los niveles sin convertirlos en proporciones", "afirmar el doble de picante excedería lo que dicen las etiquetas"]
    },
    date: {
      scene: "L1-S09", episode: "Un esquema para no hacer adivinanzas",
      setup: "Paco había escrito Lunes donde Don Juan necesitaba una fecha y hora.",
      donJuan: "Lunes hay cada semana. Yo necesito saber cuál y a qué hora fue.",
      paco: "Guardo el momento completo, Pa.",
      subtitles: [
        "Una etiqueta como “Lunes” no identifica por sí sola un momento.",
        "`fecha_hora` puede ordenarse cronológicamente; “Lunes” es una categoría derivada, no una fecha completa."
      ],
      practice: ["Tres tickets usan formatos distintos de fecha.", "ordenarlos solo después de normalizar el formato", "un formato ambiguo puede invertir el orden de los pedidos"]
    },
    text: {
      scene: "L1-S10", episode: "Un esquema para no hacer adivinanzas",
      setup: "Las notas Mesa 2 y No se anotó la cantidad no siguen un catálogo común.",
      donJuan: "La nota ayuda a recordar, pero cada quien la escribe distinto.",
      paco: "La conservo original y no la vuelvo categoría sin una regla.",
      subtitles: [
        "El texto libre conserva detalles que todavía no siguen un catálogo común.",
        "Para resumir o transformar `comentario` hacen falta contexto, una regla explícita y revisión."
      ],
      practice: ["Paco recibe notas Para llevar, para llevar y Entregar.", "distinguir texto libre de una categoría ya normalizada", "contar cada frase como categoría limpia fragmentaría el mismo significado"]
    },
    missing: {
      scene: "L1-S11", episode: "Lo raro no siempre está mal",
      setup: "El pedido P-003 no tiene registrada la cantidad.",
      donJuan: "El guion tampoco me dice cuántos fueron, hijo.",
      paco: "Lo dejo vacío y anoto que no sirve para sumar tacos.",
      subtitles: [
        "En P-003, la cantidad no fue registrada.",
        "Un faltante no equivale a cero, a un guion ni a un valor elegido para completar la tabla."
      ],
      practice: ["Un ticket borroso oculta la cantidad, pero conserva el resto del pedido.", "conservar el faltante y documentar su efecto", "inventar una cantidad alteraría cualquier suma posterior"]
    },
    duplicates: {
      scene: "L1-S12", episode: "Lo raro no siempre está mal",
      setup: "P-006 aparece dos veces con los mismos valores.",
      donJuan: "Busque el ticket 184. Si hay uno, lo copiamos dos veces; si hay dos, fueron dos pedidos.",
      paco: "Hay un solo ticket. Ahora sí podemos comprobarlo.",
      subtitles: [
        "Filas iguales requieren revisión, no borrado automático.",
        "La identidad del pedido y el ticket confirman que P-006 fue capturado dos veces."
      ],
      practice: ["Dos capturas tienen la misma hora y cantidad, pero IDs distintos.", "comparar identidad y comprobante antes de consolidar", "eliminar por parecido podría borrar dos eventos reales"]
    },
    invalid: {
      scene: "L1-S13", episode: "Lo raro no siempre está mal",
      setup: "P-005 contiene 500 por mezclar el total del día, mientras P-007 registra 30 tacos confirmados.",
      donJuan: "El de treinta fue Rogelio para su cuadrilla. Grande, sí; inventado, no.",
      paco: "El de quinientos queda marcado hasta revisar la fuente.",
      subtitles: [
        "Parecer grande no basta para decidir si un valor es erróneo.",
        "P-005 incumple la unidad del registro; P-007 es raro, pero el ticket confirma que es válido."
      ],
      practice: ["Paco debe comparar P-005 con el ticket confirmado de Rogelio.", "marcar, contrastar o conservar según la evidencia", "corregir 500 a 50 o borrar 30 sería adivinar"]
    },
    "measurement-bias": {
      scene: "L1-S14", episode: "Lo raro no siempre está mal",
      setup: "Paco solo ayuda hasta las diez y podría dejar fuera los pedidos del cierre.",
      donJuan: "Si nomás anota cuando está aquí, se nos queda fuera el cierre.",
      paco: "Y esa hora podría tener pedidos distintos.",
      subtitles: [
        "Una tabla puede estar limpia y aun describir de manera incompleta el negocio.",
        "Si el proceso omite sistemáticamente el cierre, lo registrado puede desplazar la conclusión."
      ],
      practice: ["La captura del sábado incluye solo el primer turno.", "evaluar si responde una pregunta sobre toda la noche", "más filas del mismo turno no recuperan lo que nunca se midió"]
    },
    filter: {
      scene: "L1-S15", episode: "La primera skill del puesto",
      setup: "Paco crea una vista de pedidos válidos completos sin modificar el archivo crudo.",
      donJuan: "Si va a contar para la compra, dígame cuáles dejó afuera y por qué.",
      paco: "Conservo el original y muestro la condición del filtro.",
      subtitles: [
        "Filtrar selecciona filas que cumplen una condición.",
        "Filtrar cambia qué conjunto sostiene la respuesta; la condición y los conteos deben quedar visibles."
      ],
      practice: ["Antes del turno, Don Juan necesita una vista para compras.", "elegir un filtro y declarar las filas excluidas", "borrar el original impediría revisar la decisión"]
    },
    sort: {
      scene: "L1-S16", episode: "La primera skill del puesto",
      setup: "Paco acomoda los pedidos por cantidad de mayor a menor.",
      donJuan: "Que el de treinta quede arriba no quiere decir que llegó primero.",
      paco: "Solo está primero porque lo ordené por cantidad.",
      subtitles: [
        "Ordenar cambia la posición de las filas según una variable.",
        "Ordenar no altera valores ni el momento en que ocurrieron; solo modifica su posición en la vista."
      ],
      practice: ["Rogelio aparece en la primera fila después del ordenamiento.", "distinguir mayor cantidad de primer pedido temporal", "confundir los órdenes cambia la historia del turno"]
    },
    group: {
      scene: "L1-S17", episode: "La primera skill del puesto",
      setup: "Paco reúne pedidos por tipo de taco para preparar insumos.",
      donJuan: "Para la carne necesito tacos, no nomás cuántos tickets dicen pastor.",
      paco: "Agrupo por tipo y sumo cantidades; contar pedidos respondería otra cosa.",
      subtitles: [
        "Agrupar reúne filas que comparten una categoría y exige declarar el cálculo.",
        "La suma de tacos por tipo y el número de pedidos por tipo son resultados distintos."
      ],
      practice: ["Dos resúmenes de pastor muestran números diferentes.", "identificar cuál suma tacos y cuál cuenta pedidos", "usar un resumen sin nombrar la operación puede cambiar la compra"]
    },
    transform: {
      scene: "L1-S18", episode: "La primera skill del puesto",
      setup: "Paco crea `es_pedido_grande` mediante la regla `num_tacos >= 10`.",
      donJuan: "Ponga la regla por escrito. Si mañana ocho cuenta como grande, quiero saber que cambió.",
      paco: "La cantidad se queda; la columna nueva solo aplica la regla.",
      subtitles: [
        "Transformar crea o modifica una representación mediante una regla explícita.",
        "La transformación debe conservar regla, versión y dato de origen para poder comprobarse."
      ],
      practice: ["Paco entrega la skill preparar_pedidos_n1 antes de abrir.", "verificar entrada, pasos, salida, comprobaciones y límites", "una receta sin comprobaciones no permite detectar cambios silenciosos"]
    }
  };

  const storyFor = (id, title, visual) => {
    const scene = narrative[id];
    return {
      mode: "Ejercitar",
      source: SOURCES.story,
      sceneId: scene.scene,
      animationRequired: true,
      evidence: `Ejecuta «${visual.action}» y cita el cambio visible; la historia por sí sola no basta.`,
      hints: [
        "Nombra primero la unidad o variable que observas.",
        "Compara el estado antes y después de revelar la evidencia.",
        "Descarta cualquier opción que corrija, elimine o concluya sin una fuente visible."
      ],
      cases: [{
        storyTitle: `Otro turno · ${title}`,
        protagonist: "Paco, hijo de Don Juan y estudiante de preparatoria",
        context: scene.practice[0],
        problem: `Debe aplicar ${title.toLowerCase()} sin repetir el incidente de Aprender.`,
        pressure: scene.practice[2],
        decision: scene.practice[1],
        evidence: `La evidencia aparece al ejecutar «${visual.action}»: ${visual.cue}`,
        scenes: [
          "Escena 1: Paco escucha la necesidad concreta de su papá y predice qué debería verse.",
          `Escena 2: ejecuta «${visual.action}» y revisa la evidencia nueva.`,
          "Escena 3: recomienda una acción; Don Juan decide qué hacer en el puesto."
        ],
        feedbackRule: "Cada respuesta explica qué parte del visual sostiene o contradice la decisión.",
        transfer: "Aplicar el mismo mecanismo a otro turno sin cambiar la definición ni inventar datos.",
        closing: "Don Juan cierra la consecuencia del negocio; el subtítulo del narrador limita la conclusión técnica."
      }]
    };
  };

  const livePackFor = (title, objective, visual) => {
    const dataset = liveDatasets[datasetIdFor(visual)];
    return {
      mode: "En vivo", visibility: "visible-temporal-level-1",
      visibilityNotice: "Modo En vivo visible temporalmente en Nivel 1 para revisión docente; no es autenticación ni protección real.",
      dataset, objective, duration: "35 minutos por concepto o 70-90 minutos por bloque",
      teacherScript: [
        "0-5: presentar fuente, licencia, unidad de análisis y pregunta.",
        `5-12: ejecutar «${visual.action}» y pedir predicciones.`,
        "12-20: usar Codex para verificar una demo reproducible con el snapshot.",
        "20-30: usar Gemini o ChatGPT para cuestionar límites y errores comunes.",
        "30-35: cerrar con una decisión permitida y una afirmación que no se puede hacer."
      ],
      socraticQuestions: ["¿Qué cambió?", "¿Qué conclusión permite la evidencia?", "¿Qué falta para afirmar más?", "¿Qué error sería tentador?"],
      quickAssessment: `El estudiante explica ${title.toLowerCase()} con evidencia visible y una limitación.`,
      beforeClassChecklist: ["Verificar la animación.", "Mostrar fuente, licencia y SHA-256.", "Preparar una predicción."],
      duringClassChecklist: ["No aceptar respuestas sin evidencia.", "Separar definición, decisión y límite.", "Registrar dudas."],
      offlinePlan: "Usar el HTML local, el CSV snapshot y pizarra; no pegar datos sensibles ni credenciales.",
      humanCheck: "Verificar fuente, licencia, hash, cálculos y límites antes de proyectar."
    };
  };

  const lesson = (id, title, objective, definition, intuition, error, visual, question, options, dataState) => {
    const scene = narrative[id];
    const states = ["Estado inicial", "Evidencia revelada"].map((label, index) => ({
      id: `state-${index + 1}`, label,
      marks: [{ evidenceId: `${id}-state-${index + 1}`, label: `${title}: ${label}` }]
    }));
    const visualSpec = {
      ...visual, kind: visual.type, mechanism: visual.cue, states,
      sequence: states.map(state => state.id),
      motion: { durationMs: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", intent: "revelar evidencia", reducedMotion: "cambio inmediato con la misma evidencia" }
    };
    return {
      id, title, objective, definition, intuition, error, visual: visualSpec,
      curriculumSource: SOURCES.curriculum, storySource: SOURCES.story, storyStatus: SOURCES.storyStatus,
      narrative: { ...scene, dataState },
      learningModule: {
        mode: "Aprender", sourceScene: scene.scene,
        activation: scene.setup,
        transition: "Ejercitar continúa en el mismo puesto con evidencia e incidente nuevos."
      },
      practiceStory: storyFor(id, title, visualSpec),
      liveTeachingPack: livePackFor(title, objective, visualSpec),
      practice: {
        question, options,
        evidenceContract: { requiredSteps: 1, requiredEvidenceIds: states.flatMap(state => state.marks.map(mark => mark.evidenceId)), unlockAtStep: 1 }
      },
      prompts: {
        codex: `Crea una demo reproducible para "${title}". Objetivo: ${objective} Conserva fuente, licencia y SHA-256; no inventes filas y valida el mecanismo.`,
        gemini: `Facilita una clase principiante sobre "${title}". Formula preguntas basadas en evidencia sin adelantar la respuesta.`,
        chatgpt: `Crea una transferencia para "${title}" con evidencia, feedback y límite de conclusión.`
      }
    };
  };

  window.DCF_MODULES = {
    literacy: {
      id: "literacy", number: 1, title: "Alfabetización de datos",
      description: "Paco convierte los tickets del puesto en observaciones, variables y una tabla con límites claros.",
      href: "alfabetizacion.html", accent: "teal", icon: "table", datasetName: "Pedidos del puesto de Don Juan",
      lessons: [
        lesson("observation", "Observación", "Identificar qué unidad representa cada fila.", "Una observación es el registro de una unidad definida.", "Cada renglón debe conservar unido un pedido.", "Confundir una celda con una observación completa.", { type: "table", focus: "rows", action: "Iluminar pedidos", cue: "Cada fila reúne los datos de un pedido." }, "¿Qué representa la fila P-002?", [option("Un pedido completo.", true, "Correcto: la unidad definida es un pedido."), option("Una variable llamada P-002.", false, "P-002 identifica la observación; las variables están en columnas."), option("Todos los pedidos de la noche.", false, "Una fila no representa la población completa.")], "notas → pedidos_crudos@L1.1"),
        lesson("variable", "Variable", "Reconocer qué característica representa cada columna.", "Una variable registra una característica que puede cambiar entre pedidos.", "Cada columna repite la misma pregunta para todos los tickets.", "Promediar un identificador solo porque contiene dígitos.", { type: "table", focus: "columns", action: "Recorrer columnas", cue: "Cada columna conserva un significado." }, "¿Qué variable ayuda a calcular cuántos tacos preparar?", [option("num_tacos.", true, "Es la cantidad registrada por pedido."), option("pedido_id.", false, "El ID permite localizar un pedido, no medir tacos."), option("P-007.", false, "P-007 es un valor de una observación.")], "pedidos_crudos@L1.1"),
        lesson("table", "Tabla", "Explicar cómo filas, columnas y celdas organizan pedidos.", "Una tabla cruza observaciones en filas con variables en columnas.", "Una celda cobra sentido por su pedido y su encabezado.", "Suponer que cualquier cuadrícula ya es una base de datos.", { type: "table", focus: "grid", action: "Construir tabla", cue: "La cantidad se conecta con pedido_id y num_tacos." }, "¿Qué vuelve interpretable el valor 3 de P-002?", [option("Su cruce con P-002 y num_tacos.", true, "Fila y encabezado indican que son tres tacos del pedido."), option("Que es menor que 5.", false, "La magnitud no define su significado."), option("Que está dentro de una celda.", false, "Sin contexto, una celda sigue siendo ambigua.")], "pedidos_crudos@L1.1"),
        lesson("population", "Población", "Delimitar el conjunto completo definido por la pregunta.", "La población es el conjunto completo de unidades sobre el que queremos aprender.", "Primero se fijan noches, horario y tipo de unidad.", "Llamar población a las filas que casualmente están disponibles.", { type: "population", focus: "all", action: "Mostrar dos noches", cue: "Todos los tickets de las noches definidas quedan dentro del marco." }, "Si la pregunta cubre dos noches completas, ¿cuál es la población?", [option("Todos los pedidos de esas dos noches.", true, "Coincide con la unidad y periodo definidos."), option("Solo las diez filas didácticas.", false, "Esas filas pertenecen a una captura posterior y controlada."), option("Solo los pedidos grandes.", false, "Eso sería un subconjunto filtrado.")], "población objetivo definida"),
        lesson("sample", "Muestra", "Reconocer una parte observada y sus límites de representación.", "Una muestra es un subconjunto observado de la población.", "Cómo se obtuvo importa tanto como cuántas filas contiene.", "Creer que digitalizar elimina el sesgo de selección.", { type: "population", focus: "sample", action: "Rescatar páginas", cue: "Las páginas del cierre quedan fuera por el yogurt." }, "¿Qué limita a las páginas legibles?", [option("Pueden omitir más pedidos del cierre.", true, "La pérdida concentrada puede sesgar la muestra."), option("La mancha convierte vacíos en cero.", false, "El accidente no recupera valores."), option("Al ser varias páginas ya representan todo.", false, "El tamaño no corrige por sí solo cómo se seleccionaron.")], "muestra dañada → captura controlada@L1.1")
      ]
    },
    types: {
      id: "types", number: 2, title: "Tipos de variables",
      description: "Paco crea un esquema para que personas y agentes no tengan que adivinar qué significa cada columna.",
      href: "tipos-variables.html", accent: "blue", icon: "shapes", datasetName: "Pedidos del puesto de Don Juan",
      lessons: [
        lesson("numeric", "Numérica", "Identificar cantidades y operaciones aritméticas con sentido.", "Una variable numérica representa cantidades para las que las operaciones aritméticas son interpretables.", "Prueba si una diferencia responde una pregunta del puesto.", "Tratar cualquier dígito como cantidad, incluidos IDs.", { type: "sorter", focus: "numeric", action: "Clasificar variables", cue: "num_tacos admite suma; pedido_id no." }, "¿Qué variable permite calcular una diferencia útil?", [option("num_tacos.", true, "La diferencia expresa tacos entre pedidos."), option("pedido_id.", false, "La diferencia entre IDs no mide el negocio."), option("fecha_hora escrita como texto.", false, "Primero necesita un tipo temporal consistente.")], "pedidos_crudos@L1.1 → esquema@L1.2"),
        lesson("categorical", "Categórica", "Reconocer etiquetas sin orden inherente.", "Una variable categórica asigna observaciones a etiquetas o clases.", "Sirve para separar pastor, bistec y suadero.", "Tratar códigos de categorías como cantidades.", { type: "sorter", focus: "categorical", action: "Agrupar etiquetas", cue: "Pastor, pastor y PASTOR apuntan a la misma categoría canónica." }, "¿Qué operación es compatible con tipo_taco?", [option("Contar pedidos por categoría.", true, "Las categorías permiten agrupar y contar."), option("Restar pastor menos bistec.", false, "Las etiquetas no son cantidades."), option("Promediar los nombres.", false, "Un promedio no aplica a etiquetas.")], "esquema@L1.2"),
        lesson("ordinal", "Ordinal", "Detectar categorías ordenadas sin distancias exactas.", "Una variable ordinal tiene categorías ordenadas, pero no garantiza intervalos iguales.", "Es posible ordenar la salsa sin medir cuánto separa cada nivel.", "Afirmar que Mucha es el doble de Media.", { type: "sorter", focus: "ordinal", action: "Ordenar salsas", cue: "Sin salsa, Poca, Media y Mucha conservan orden." }, "¿Qué afirmación respeta el tipo ordinal?", [option("Mucha va después de Media, sin afirmar el doble.", true, "El orden sí está definido; la distancia no."), option("Mucha equivale a cuatro veces Poca.", false, "Las etiquetas no garantizan proporciones."), option("Los niveles no tienen orden.", false, "El orden es precisamente su característica.")], "esquema@L1.2"),
        lesson("date", "Fecha", "Reconocer momentos y operaciones temporales compatibles.", "Una fecha y hora ubica un pedido en el tiempo.", "Permite ordenar y calcular duraciones cuando el formato es consistente.", "Usar Lunes como si identificara un momento completo.", { type: "timeline", focus: "date", action: "Ordenar tickets", cue: "La fecha y hora completa fija la secuencia." }, "¿Qué valor identifica un momento completo?", [option("2026-06-01 19:05.", true, "Incluye fecha y hora sin depender solo del nombre del día."), option("Lunes.", false, "Se repite cada semana y no identifica el momento."), option("Primer turno.", false, "Es una etiqueta operativa, no una fecha.")], "esquema@L1.2"),
        lesson("text", "Texto", "Distinguir texto libre de categorías normalizadas.", "Una variable de texto contiene lenguaje abierto que necesita contexto antes de resumirse.", "Conserva la nota original y documenta cualquier transformación.", "Contar cada frase completa como una categoría limpia.", { type: "text", focus: "tokens", action: "Comparar notas", cue: "Las notas libres se conservan antes de normalizar." }, "¿Qué práctica conserva trazabilidad en comentario?", [option("Guardar el texto original y aplicar una regla documentada.", true, "Permite revisar qué cambió."), option("Reemplazar cada frase por un número aleatorio.", false, "El número no representa el significado."), option("Promediar la longitud y concluir satisfacción.", false, "La longitud no equivale al contenido.")], "esquema@L1.2")
      ]
    },
    quality: {
      id: "quality", number: 3, title: "Calidad de datos",
      description: "Don Juan aporta tickets y contexto; Paco aprende a revisar antes de corregir por intuición.",
      href: "calidad-datos.html", accent: "coral", icon: "database", datasetName: "Pedidos del puesto de Don Juan",
      lessons: [
        lesson("missing", "Faltantes", "Distinguir ausencia de cero o de un valor inventado.", "Un faltante indica que no se observó un valor para una variable de un pedido.", "El vacío tiene una consecuencia: P-003 no puede sumarse.", "Convertir el faltante en 0 o '-'.", { type: "quality", focus: "missing", action: "Escanear faltantes", cue: "P-003 conserva num_tacos vacío." }, "¿Qué debe hacerse inicialmente con num_tacos de P-003?", [option("Conservarlo faltante y documentar su efecto.", true, "No existe fuente para completar la cantidad."), option("Cambiarlo a cero.", false, "Cero sería un valor observado distinto de ausencia."), option("Escribir un guion.", false, "El guion oculta el tipo de ausencia y puede tratarse como texto.")], "esquema@L1.2 → reporte_de_calidad@L1.3"),
        lesson("duplicates", "Duplicados", "Usar identidad y evidencia para confirmar una repetición.", "Un duplicado repite la misma unidad y evento según una clave y contexto definidos.", "Las filas iguales son candidatas hasta contrastarlas con el ticket.", "Eliminar toda fila parecida automáticamente.", { type: "quality", focus: "duplicates", action: "Contrastar ticket", cue: "Un solo ticket 184 confirma la doble captura de P-006." }, "¿Qué confirma que P-006 es duplicado?", [option("Existe un solo ticket 184 para ambas filas.", true, "La fuente externa confirma una sola unidad y evento."), option("Las dos cantidades valen 4.", false, "Pedidos distintos pueden tener la misma cantidad."), option("El pedido es de pastor.", false, "Compartir categoría no prueba duplicación.")], "reporte_de_calidad@L1.3"),
        lesson("invalid", "Rangos inválidos", "Marcar valores incompatibles sin inventar una corrección.", "Un valor inválido viola una regla de la variable o mezcla otra unidad.", "Lo raro se investiga con contexto y fuente.", "Cambiar 500 a 50 o borrar 30 porque parecen grandes.", { type: "quality", focus: "invalid", action: "Comparar con tickets", cue: "P-005 mezcla el total diario; P-007=30 está confirmado." }, "¿Cuál tratamiento está respaldado?", [option("Marcar P-005 inválido y conservar P-007 confirmado.", true, "Distingue unidad mezclada de caso raro válido."), option("Cambiar 500 a 50.", false, "No hay fuente para elegir 50."), option("Eliminar ambos por ser grandes.", false, "P-007 tiene evidencia válida y no debe borrarse.")], "reporte_de_calidad@L1.3"),
        lesson("measurement-bias", "Sesgo de medición", "Reconocer omisiones sistemáticas del proceso de captura.", "El sesgo de medición aparece cuando el proceso registra de forma sistemáticamente distinta una parte de la realidad.", "Más filas no recuperan lo que nunca se midió.", "Creer que una tabla limpia representa automáticamente toda la noche.", { type: "quality", focus: "bias", action: "Comparar turnos", cue: "Los pedidos posteriores a las 22:00 quedan fuera cuando Paco ya no está." }, "¿Qué evidencia sugiere sesgo de medición?", [option("La captura omite sistemáticamente el cierre.", true, "La ausencia sigue el horario del proceso de registro."), option("P-007 es un pedido grande.", false, "Un valor raro no demuestra un sesgo del proceso."), option("El archivo tiene diez filas.", false, "El número de filas no revela por sí solo qué quedó fuera.")], "reporte_de_calidad@L1.3")
      ]
    },
    preparation: {
      id: "preparation", number: 4, title: "Preparación básica",
      description: "Paco documenta una skill reproducible; Don Juan conserva las decisiones del puesto.",
      href: "preparacion-basica.html", accent: "gold", icon: "wrench", datasetName: "Pedidos del puesto de Don Juan",
      lessons: [
        lesson("filter", "Filtrar", "Aplicar una condición y explicar qué filas quedan fuera.", "Filtrar conserva filas que cumplen una condición explícita.", "Es una vista; el original y el conteo anterior siguen disponibles.", "Olvidar que la respuesta solo describe el subconjunto.", { type: "prepare", focus: "filter", action: "Filtrar válidos", cue: "Quedan 7 pedidos válidos completos de 9 pedidos únicos." }, "¿Qué cambia después del filtro?", [option("El conjunto descrito por la vista.", true, "La vista ya no incluye faltante ni inválido."), option("Las cantidades originales.", false, "Filtrar no modifica valores."), option("El archivo crudo.", false, "Se conserva como fuente y se trabaja sobre una vista.")], "reporte_de_calidad@L1.3 → pedidos_preparados@L1.4"),
        lesson("sort", "Ordenar", "Cambiar la posición de filas sin alterar sus valores.", "Ordenar reorganiza observaciones según una o más variables.", "El primer renglón depende de la regla de orden.", "Interpretar el primer registro ordenado como el primero temporal.", { type: "prepare", focus: "sort", action: "Ordenar por cantidad", cue: "P-007 sube por tener 30 tacos, no por haber ocurrido primero." }, "¿Qué afirma correctamente la vista ordenada?", [option("La primera fila tiene la mayor cantidad.", true, "El orden aplicado es num_tacos descendente."), option("La primera fila ocurrió antes.", false, "Para eso habría que ordenar por fecha_hora."), option("Los pedidos aumentaron.", false, "Ningún valor fue modificado.")], "pedidos_preparados@L1.4"),
        lesson("group", "Agrupar", "Combinar pedidos por tipo y declarar el resumen.", "Agrupar reúne filas que comparten una clave para calcular un resumen explícito.", "La clave forma grupos y la función responde la pregunta.", "Agrupar sin decir si se suman tacos o se cuentan pedidos.", { type: "prepare", focus: "group", action: "Sumar por tipo", cue: "Las filas colapsan en suma de num_tacos por tipo_taco." }, "¿Qué debe acompañar a 'agrupar por tipo_taco'?", [option("La operación: por ejemplo, sumar num_tacos.", true, "Sin operación no sabemos qué representa el resultado."), option("Borrar las cantidades.", false, "Las cantidades alimentan la suma."), option("Ordenar alfabéticamente.", false, "El orden es independiente del agrupamiento.")], "pedidos_preparados@L1.4"),
        lesson("transform", "Transformar", "Crear una variable derivada con una regla reproducible.", "Transformar crea o modifica una representación mediante una regla explícita.", "Conservar el dato original permite revisar la transformación.", "Sobrescribir num_tacos o cambiar la regla sin versión.", { type: "prepare", focus: "transform", action: "Crear es_pedido_grande", cue: "La nueva columna aplica num_tacos >= 10 y conserva num_tacos." }, "¿Qué vuelve verificable la transformación?", [option("Conservar num_tacos y documentar la regla >= 10.", true, "La entrada y la regla permiten reproducir el resultado."), option("Cambiar el encabezado sin calcular valores.", false, "La etiqueta no ejecuta la transformación."), option("Ocultar el umbral para simplificar.", false, "Sin umbral no puede comprobarse la clasificación.")], "pedidos_preparados@L1.4")
      ]
    }
  };
})();
