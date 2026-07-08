const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();
const outDir = path.join(root, "docs", "placement");
const visualDir = path.join(outDir, "assets", "diagnostic-visuals");
fs.mkdirSync(visualDir, { recursive: true });

const csvEscape = (value) => {
  const text = value === undefined || value === null ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const spanishReplacements = [
  ["Proposito", "Propósito"],
  ["nivelacion", "nivelación"],
  ["academica", "académica"],
  ["dominante esta en", "dominante está en"],
  ["vacia esta", "vacía está"],
  ["vacía esta", "vacía está"],
  ["es valida", "es válida"],
  ["caso raro valido", "caso raro válido"],
  ["que priorizas", "¿qué priorizas"],
  ["Diagnostico", "Diagnóstico"],
  ["diagnostico", "diagnóstico"],
  ["Despues", "Después"],
  ["graficos", "gráficos"],
  ["grafico", "gráfico"],
  ["metrica", "métrica"],
  ["metricas", "métricas"],
  ["precision", "precisión"],
  ["linea", "línea"],
  ["senal", "señal"],
  ["revision", "revisión"],
  ["pequeno", "pequeño"],
  ["pequena", "pequeña"],
  ["pequenas", "pequeñas"],
  ["afirmacion", "afirmación"],
  ["conversacion", "conversación"],
  ["por si solo", "por sí solo"],
  ["aun", "aún"],
  ["dano", "daño"],
  ["limites", "límites"],
  ["limite", "límite"],
  ["mas", "más"],
  ["numero", "número"],
  ["ningun", "ningún"],
  ["hipotesis", "hipótesis"],
  ["informacion", "información"],
  ["interpretacion", "interpretación"],
  ["evaluacion", "evaluación"],
  ["validacion", "validación"],
  ["preparacion", "preparación"],
  ["visualizacion", "visualización"],
  ["generalizacion", "generalización"],
  ["diagnosticas", "diagnósticas"],
  ["decision", "decisión"],
  ["accion", "acción"],
  ["conclusion", "conclusión"],
  ["analisis", "análisis"],
  ["automatica", "automática"],
  ["automatico", "automático"],
  ["autonomia", "autonomía"],
  ["definicion", "definición"],
  ["distribucion", "distribución"],
  ["variacion", "variación"],
  ["estimacion", "estimación"],
  ["tamano", "tamaño"],
  ["patron", "patrón"],
  ["practica", "práctica"],
  ["parametro", "parámetro"],
  ["explosion", "explosión"],
  ["critica", "crítica"],
  ["critico", "crítico"],
  ["criticos", "críticos"],
  ["region", "región"],
  ["proposito", "propósito"],
  ["auditoria", "auditoría"],
  ["minimo", "mínimo"],
  ["minima", "mínima"],
  ["minimizacion", "minimización"],
  ["atomica", "atómica"],
  ["sinonimos", "sinónimos"],
  ["piramide", "pirámide"],
  ["dimension", "dimensión"],
  ["exencion", "exención"],
  ["Operacion", "Operación"],
  ["operacion", "operación"],
  ["estan", "están"],
  ["codigo", "código"],
  ["modulos", "módulos"],
  ["produccion", "producción"],
  ["valido", "válido"],
  ["validas", "válidas"],
  ["invalidas", "inválidas"],
  ["verificacion", "verificación"],
  ["aprobacion", "aprobación"],
  ["comprension", "comprensión"],
  ["descripcion", "descripción"],
  ["comunicacion", "comunicación"],
  ["anomalias", "anomalías"],
  ["experimentacion", "experimentación"],
  ["sesion", "sesión"],
  ["maximo", "máximo"],
  ["items", "ítems"],
  ["rotacion", "rotación"],
  ["seccion", "sección"],
  ["secciones", "secciones"],
  ["llego", "llegó"],
  ["lanzar automaticamente", "lanzar automáticamente"],
  ["automaticamente", "automáticamente"],
  ["representacion", "representación"],
  ["unicos", "únicos"],
  ["unicas", "únicas"],
  ["vacia", "vacía"],
  ["numerica", "numérica"],
  ["numerico", "numérico"],
  ["prediccion", "predicción"],
  ["distincion", "distinción"],
  ["guia", "guía"],
  ["ultimo", "último"],
  ["exito", "éxito"],
  ["raiz", "raíz"],
  ["Redisenar", "Rediseñar"],
  ["redisenar", "rediseñar"],
  ["categorias", "categorías"],
  ["caida", "caída"],
  ["despues", "después"],
];

const polishSpanish = (value) => {
  if (typeof value !== "string") return value;
  const replaced = spanishReplacements.reduce(
    (text, [from, to]) => text.replace(new RegExp(`\\b${from}\\b`, "g"), to),
    value,
  );
  return replaced
    .replace(/(^|[.]\s+)Que ([^?]+\?)/g, "$1¿Qué $2")
    .replace(/(^|[.]\s+)Como ([^?]+\?)/g, "$1¿Cómo $2")
    .replace(/(^|[.]\s+)(Qué|Cómo|Cuál) ([^?]+\?)/g, "$1¿$2 $3");
};

const rotateOptions = (correct, wrongOptions, seed) => {
  const letters = ["A", "B", "C", "D"];
  const correctIndex = seed % letters.length;
  const options = [...wrongOptions];
  options.splice(correctIndex, 0, correct);
  return {
    option_a: options[0],
    option_b: options[1],
    option_c: options[2],
    option_d: options[3],
    correct_option: letters[correctIndex],
  };
};

const writeCsv = (file, columns, rows) => {
  const lines = [columns.join(",")];
  for (const row of rows) {
    lines.push(columns.map((col) => csvEscape(row[col])).join(","));
  }
  fs.writeFileSync(path.join(outDir, file), `${lines.join("\n")}\n`, "utf8");
};

const readLevels = () => {
  const generated = path.join(root, "generated");
  const dirs = fs
    .readdirSync(generated)
    .filter((dir) => fs.existsSync(path.join(generated, dir, "manifest.json")));

  return dirs
    .map((dir) => {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(generated, dir, "manifest.json"), "utf8"),
      );
      const code = fs.readFileSync(
        path.join(generated, dir, "assets", "curriculum.js"),
        "utf8",
      );
      const sandbox = { window: {}, console: { log() {}, warn() {}, error() {} } };
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox, { timeout: 5000 });

      const levelObject =
        sandbox.window.DCF_LEVEL ||
        sandbox.window.DCF_LEVEL2 ||
        { modules: sandbox.window.DCF_MODULES };
      const modules = levelObject.modules || {};
      const concepts = [];

      for (const mod of Object.values(modules)) {
        (mod.lessons || []).forEach((lesson, index) => {
          concepts.push({
            level: manifest.level,
            level_title: manifest.title,
            status: manifest.status || "published",
            block_id: mod.id,
            block_title: mod.title,
            concept_id: lesson.id,
            concept_title: lesson.title,
            objective: lesson.objective || "",
            previous: lesson.previous || "",
            next: lesson.next || "",
            visual_kind:
              (lesson.visual && (lesson.visual.kind || lesson.visual.type)) ||
              (lesson.visualizationSpec && lesson.visualizationSpec.kind) ||
              "",
            dataset_id:
              mod.dataset_id ||
              (lesson.liveTeachingPack &&
                lesson.liveTeachingPack.dataset &&
                lesson.liveTeachingPack.dataset.id) ||
              "",
            source: lesson.curriculumSource || `generated/${dir}/assets/curriculum.js`,
            error: lesson.error || "",
            block_number: mod.number || 0,
            order_in_block: index + 1,
          });
        });
      }

      return { manifest, concepts };
    })
    .sort((a, b) => a.manifest.level - b.manifest.level);
};

const levels = readLevels();
const inventory = levels.flatMap((level) => level.concepts);

if (inventory.length !== 236 || new Set(inventory.map((row) => row.level)).size !== 13) {
  throw new Error(
    `Inventario inesperado: ${inventory.length} conceptos, ${
      new Set(inventory.map((row) => row.level)).size
    } niveles`,
  );
}

writeCsv(
  "curriculum_inventory.csv",
  [
    "level",
    "level_title",
    "status",
    "block_id",
    "block_title",
    "concept_id",
    "concept_title",
    "objective",
    "previous",
    "next",
    "visual_kind",
    "dataset_id",
    "source",
  ],
  inventory,
);

const visualSpecs = [
  ["A01", "confusion-matrix", "Matriz con FP y FN visibles", "Comparar consecuencias de errores"],
  ["A02", "fairness-bars", "Tasas por grupo con brecha visible", "Distinguir metrica de justicia total"],
  ["A03", "uncertainty-interval", "Intervalos solapados", "Comunicar incertidumbre"],
  ["A04", "harness-map", "Modelo rodeado por contexto, permisos y traza", "Separar modelo y sistema"],
  ["A05", "cluster-scatter", "Tres grupos y un punto fronterizo", "Tratar clusters como hipotesis"],
  ["A06", "schema-join", "Dos tablas con llave y cardinalidad", "Reconciliar granularidad"],
  ["A07", "data-table", "Filas, columnas, faltantes e ID", "Identificar unidad y variable"],
  ["A08", "drift-line", "Metrica base y alerta por cambio sostenido", "Evitar alertar por variacion aislada"],
  ["A09", "api-contract", "Request, schema, test y response", "Validar frontera de producto"],
  ["A10", "time-series", "Tendencia, estacionalidad y rezago", "Respetar orden temporal"],
  ["A11", "regression-residuals", "Recta con residuales grandes", "Separar ajuste de error"],
  ["A12", "threshold-curve", "Umbral cambia precision y recall", "Elegir metrica por costo"],
  ["A13", "correlation-scatter", "Asociacion con confusor visible", "Evitar causalidad automatica"],
  ["A14", "histogram-shape", "Distribucion sesgada con bins", "Leer forma y sensibilidad"],
  ["A15", "join-explosion", "JOIN uno-a-muchos duplica filas", "Anticipar explosion"],
  ["A16", "hypothesis-curve", "Region critica, alpha y beta", "Interpretar prueba sin certeza"],
  ["A17", "privacy-flow", "Datos, proposito, acceso y auditoria", "Minimizar y registrar uso"],
  ["A18", "tool-skill-loop", "Tool atomica y skill procedural", "Distinguir capacidad y procedimiento"],
  ["A19", "rollback-timeline", "Readiness, canary, rollback y postmortem", "Operar con reversibilidad"],
  ["A20", "test-pyramid", "Unit, integration, golden y failure cases", "Probar comportamiento"],
  ["A21", "pca-plane", "Componentes y varianza explicada", "No confundir componente con variable"],
  ["A22", "ab-test", "Tratamiento, control y guardrail", "Separar efecto de ruido"],
  ["A23", "leakage-cutoff", "Features antes y despues del corte", "Evitar informacion futura"],
  ["A24", "boxplot-outlier", "Atipico confirmado y error de captura", "Investigar antes de borrar"],
  ["A25", "unit-variable", "Pedido, columnas y celda resaltada", "Conservar unidad de analisis"],
  ["A26", "system-blueprint", "Blueprint con loop, parada y traza", "Cerrar sistema trazable"],
];

const visualPath = (id) => {
  const spec = visualSpecs.find((item) => item[0] === id);
  return spec ? `docs/placement/assets/diagnostic-visuals/${spec[0]}-${spec[1]}.svg` : "";
};

const svgFor = (id, type, title, subtitle) => {
  const accent = ["#087f73", "#2f5d8c", "#8c4a2f", "#6f5f2a", "#604c8d", "#345f4f"][
    Number(id.slice(1)) % 6
  ];
  const visualTitle = polishSpanish(title);
  const visualSubtitle = polishSpanish(subtitle);
  const common = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">${visualTitle}</title><desc id="d">${visualSubtitle}</desc><rect width="640" height="360" fill="#f7faf9"/><text x="32" y="38" font-family="Arial" font-size="22" font-weight="700" fill="#17312d">${visualTitle}</text><text x="32" y="66" font-family="Arial" font-size="14" fill="#3d5550">${visualSubtitle}</text>`;
  const axis = `<line x1="70" y1="300" x2="570" y2="300" stroke="#8aa19b"/><line x1="70" y1="90" x2="70" y2="300" stroke="#8aa19b"/>`;
  let body = "";

  if (
    [
      "confusion-matrix",
      "data-table",
      "schema-join",
      "api-contract",
      "join-explosion",
      "test-pyramid",
      "unit-variable",
    ].includes(type)
  ) {
    body = `<g transform="translate(70 100)"><rect width="500" height="190" rx="8" fill="#fff" stroke="#9fb3ae"/><line x1="0" y1="63" x2="500" y2="63" stroke="#c6d3d0"/><line x1="0" y1="126" x2="500" y2="126" stroke="#c6d3d0"/><line x1="166" y1="0" x2="166" y2="190" stroke="#c6d3d0"/><line x1="333" y1="0" x2="333" y2="190" stroke="#c6d3d0"/><rect x="333" y="63" width="167" height="63" fill="#ffe9df"/><rect x="166" y="126" width="167" height="64" fill="#fff3c4"/><text x="24" y="40" font-family="Arial" font-size="16" fill="#17312d">unidad</text><text x="190" y="40" font-family="Arial" font-size="16" fill="#17312d">contrato</text><text x="355" y="40" font-family="Arial" font-size="16" fill="#17312d">evidencia</text><text x="355" y="102" font-family="Arial" font-size="15" fill="#8a351b">revisar</text><text x="190" y="164" font-family="Arial" font-size="15" fill="#6b5600">no mezclar</text></g>`;
  } else if (
    [
      "time-series",
      "drift-line",
      "rollback-timeline",
      "ab-test",
      "leakage-cutoff",
      "threshold-curve",
      "hypothesis-curve",
      "uncertainty-interval",
    ].includes(type)
  ) {
    body = `${axis}<polyline points="80,260 130,242 180,248 230,210 280,222 330,172 380,185 430,138 480,130 540,105" fill="none" stroke="${accent}" stroke-width="5"/><line x1="395" y1="95" x2="395" y2="300" stroke="#b24b2a" stroke-dasharray="8 8"/><rect x="408" y="118" width="120" height="34" rx="6" fill="#fff3c4" stroke="#d8bd55"/><text x="420" y="140" font-family="Arial" font-size="14" fill="#4f4300">corte/alerta</text>`;
  } else if (
    ["cluster-scatter", "correlation-scatter", "regression-residuals", "pca-plane"].includes(type)
  ) {
    body =
      axis +
      Array.from({ length: 22 }, (_, i) => {
        const x = 90 + (i % 8) * 55 + (i % 3) * 8;
        const y = 260 - Math.floor(i / 3) * 22 + ((i * 17) % 19);
        const color = i < 8 ? "#087f73" : i < 16 ? "#2f5d8c" : "#b24b2a";
        return `<circle cx="${x}" cy="${y}" r="7" fill="${color}" opacity="0.88"/>`;
      }).join("") +
      `<path d="M90 270 C210 240 340 185 540 120" fill="none" stroke="#303b45" stroke-width="3" stroke-dasharray="7 7"/>`;
  } else if (["histogram-shape", "boxplot-outlier", "fairness-bars"].includes(type)) {
    const heights = [80, 125, 170, 150, 96, 55, 30];
    body =
      axis +
      [70, 120, 190, 250, 320, 385, 450]
        .map(
          (x, i) =>
            `<rect x="${x}" y="${280 - heights[i]}" width="48" height="${heights[i]}" fill="${
              i === 6 ? "#b24b2a" : accent
            }" opacity="0.85"/>`,
        )
        .join("") +
      `<circle cx="545" cy="108" r="9" fill="#b24b2a"/><text x="508" y="88" font-family="Arial" font-size="13" fill="#6a2a18">caso extremo</text>`;
  } else {
    body = `<g transform="translate(70 105)"><rect x="0" y="70" width="120" height="58" rx="8" fill="#fff" stroke="#9fb3ae"/><rect x="190" y="18" width="130" height="58" rx="8" fill="#fff" stroke="#9fb3ae"/><rect x="190" y="122" width="130" height="58" rx="8" fill="#fff" stroke="#9fb3ae"/><rect x="390" y="70" width="120" height="58" rx="8" fill="#fff3c4" stroke="#d8bd55"/><path d="M120 99 L188 50 M120 99 L188 150 M320 50 L390 99 M320 150 L390 99" fill="none" stroke="${accent}" stroke-width="4" marker-end="url(#arrow)"/><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="${accent}"/></marker></defs><text x="26" y="104" font-family="Arial" font-size="14" fill="#17312d">entrada</text><text x="218" y="53" font-family="Arial" font-size="14" fill="#17312d">contexto</text><text x="224" y="157" font-family="Arial" font-size="14" fill="#17312d">tool/skill</text><text x="424" y="104" font-family="Arial" font-size="14" fill="#17312d">traza</text></g>`;
  }

  return `${common}${body}<text x="32" y="332" font-family="Arial" font-size="13" fill="#5b706b">Usar la evidencia visible antes de responder.</text></svg>\n`;
};

for (const spec of visualSpecs) {
  fs.writeFileSync(path.join(visualDir, `${spec[0]}-${spec[1]}.svg`), svgFor(...spec), "utf8");
}

const anchors = [
  ["A01", 7, "confusion-matrix", ["confusion-matrix", "false-negative"], "La matriz muestra muchos falsos negativos en un caso donde no detectar el riesgo cuesta mas que revisar de mas. Que decision es mas defendible?", "Bajar el umbral o priorizar recall, documentando el aumento de falsos positivos.", "Mantener accuracy porque resume todos los aciertos.", "Elegir el modelo con menor numero de filas revisadas.", "Ignorar la matriz y usar el score promedio.", "A", "Correcto: el costo dominante esta en FN, por eso recall y umbral importan.", "La respuesta debe citar la celda FN y el costo del error, no una metrica agregada.", "L7:confusion-matrix;L7:recall"],
  ["A02", 10, "fairness-bars", ["fairness", "representation"], "El grafico compara tasas por grupo y una brecha aparece en un grupo poco representado. Que conclusion es responsable?", "Hay una senal de revision por grupo, pero la metrica no prueba justicia total.", "La metrica elimina todo sesgo si el promedio global mejora.", "El grupo pequeno debe excluirse para estabilizar la tasa.", "La brecha prueba causalidad del modelo.", "A", "Correcto: se revisa representacion, dano y limites de la metrica.", "No basta el promedio; hay que mirar grupo, incertidumbre y dano potencial.", "L10:fairness;L10:representation"],
  ["A03", 3, "uncertainty-interval", ["confidence-interval", "bootstrap"], "Dos intervalos se solapan y ambos provienen de muestras pequenas. Que afirmacion conserva incertidumbre?", "La diferencia aun es incierta y requiere comunicar rango y supuesto.", "El promedio mayor gana con certeza.", "El solapamiento prueba que no hay ningun efecto posible.", "La muestra pequena se arregla redondeando.", "A", "Correcto: comunica incertidumbre sin convertir una estimacion en certeza.", "La respuesta debe preservar intervalo, tamano de muestra y limites.", "L3:confidence-interval;L3:bootstrap"],
  ["A04", 12, "harness-map", ["model-boundary", "harness-engineering"], "El diagrama separa modelo, contexto, permisos y traza. Que pieza decide si una accion puede ejecutarse?", "El harness con permisos, verificacion y criterios de parada.", "El modelo por si solo porque produjo texto correcto.", "La ventana de chat porque contiene la conversacion.", "El usuario sin registrar el evento.", "A", "Correcto: el sistema alrededor del modelo gobierna accion y trazabilidad.", "Confundir salida del modelo con autorizacion rompe el objetivo de L12.", "L12:harness-engineering;L12:model-boundary"],
  ["A05", 8, "cluster-scatter", ["k-means", "anomaly-threshold"], "El scatter muestra tres grupos y un punto fronterizo. Como debe usarse ese resultado?", "Como hipotesis exploratoria que requiere revision humana y escala declarada.", "Como etiqueta definitiva de clientes sin revisar.", "Como prueba de causalidad entre variables.", "Como prediccion supervisada con recall calculado.", "A", "Correcto: clustering sugiere estructura, no dicta decisiones finales.", "La respuesta debe mencionar escala, distancia y revision.", "L8:k-means;L8:distance"],
  ["A06", 5, "schema-join", ["schema-keys", "join-cardinality"], "El esquema muestra una llave primaria y una tabla de detalles uno-a-muchos. Que revision va antes de sumar ventas?", "Reconciliar cardinalidad y conteos antes/despues del JOIN.", "Usar INNER JOIN siempre porque es mas limpio.", "Sumar despues del JOIN sin revisar duplicados.", "Quitar la llave primaria para evitar sesgo.", "A", "Correcto: granularidad y cardinalidad protegen la unidad de analisis.", "Un JOIN puede duplicar o perder unidades si no se reconcilia.", "L5:join-cardinality;L5:grain"],
  ["A07", 1, "data-table", ["observation", "variable"], "La tabla resalta una fila de pedido, una columna de cantidad y un valor faltante. Que identifica correctamente la unidad?", "La fila representa un pedido y la columna una variable.", "La celda faltante representa toda la poblacion.", "El ID se puede promediar como cantidad.", "Cada columna es una muestra distinta.", "A", "Correcto: fila, columna y celda tienen roles distintos.", "La base de L1 es conservar unidad y significado antes de analizar.", "L1:observation;L1:variable"],
  ["A08", 13, "drift-line", ["data-drift", "alert-threshold"], "La linea cruza el umbral una vez y luego vuelve al baseline. Que decision evita sobrerreaccionar?", "Esperar criterio sostenido o evidencia adicional antes de declarar incidente.", "Abrir incidente critico por cualquier punto fuera del promedio.", "Cambiar el modelo sin registrar baseline.", "Borrar el punto que molesta.", "A", "Correcto: monitoreo separa variacion aislada de cambio sostenido.", "Nivel 13 pide alerta con regla, baseline y revision humana.", "L13:data-drift;L13:alert-threshold"],
  ["A09", 11, "api-contract", ["request-response", "schema-tests"], "El contrato muestra request, schema y response con error 4xx controlado. Que valida el producto?", "Que entradas invalidas fallen de forma esperada y versionada.", "Que todo error devuelva 200 para no romper clientes.", "Que los secretos viajen en el request.", "Que no hacen falta tests si el endpoint responde.", "A", "Correcto: una API operable tiene fronteras y errores controlados.", "El producto de datos requiere contrato y pruebas, no solo correr.", "L11:request-response;L11:schema-tests"],
  ["A10", 9, "time-series", ["temporal-validation", "lag-features"], "La serie muestra un corte temporal y features posteriores al corte. Que se debe hacer?", "Excluir informacion posterior y validar con ventanas temporales.", "Mezclar filas futuras para mejorar accuracy.", "Ordenar al azar porque aumenta diversidad.", "Usar el ultimo valor del target como feature.", "A", "Correcto: el orden temporal gobierna features y evaluacion.", "Usar futuro produce leakage temporal.", "L9:temporal-validation;L9:lag-features"],
  ["A11", 6, "regression-residuals", ["residuals", "assumptions"], "La recta ajusta tendencia, pero los residuales forman patron. Que lectura es correcta?", "El ajuste existe, pero los supuestos y el error limitan la interpretacion.", "La pendiente prueba causalidad.", "Los residuales se ignoran si R2 es alto.", "El intercepto arregla el patron residual.", "A", "Correcto: modelar incluye revisar error y supuestos.", "La respuesta debe separar ajuste, error y causalidad.", "L6:residuals;L6:assumptions"],
  ["A12", 7, "threshold-curve", ["precision", "recall"], "Al mover el umbral sube recall y baja precision. Si el falso negativo cuesta mas, que priorizas?", "Un umbral con mayor recall y costo de FP documentado.", "El umbral que maximiza accuracy siempre.", "El modelo con menos positivos sin mirar FN.", "El score calibrado como si fuera decision automatica.", "A", "Correcto: decision y metrica siguen el costo del error.", "No hay metrica universal; el dominio define tradeoff.", "L7:recall;L7:threshold"],
  ["A13", 4, "correlation-scatter", ["correlation", "confounders"], "El scatter muestra asociacion, pero el color revela grupos distintos. Que conclusion evita causalidad falsa?", "Hay asociacion; se deben revisar confusores antes de explicar causa.", "La correlacion prueba que X causa Y.", "Los grupos coloreados no importan si Pearson es alto.", "Eliminar los grupos que cambian la pendiente.", "A", "Correcto: asociacion no basta para causalidad.", "Nivel 4 exige mirar forma, grupos y alternativas.", "L4:correlation;L4:confounders"],
  ["A14", 2, "histogram-shape", ["histogram", "bins"], "El histograma cambia de forma al modificar bins. Que practica es adecuada?", "Comparar forma con bins razonables y explicar sensibilidad.", "Elegir los bins que hacen ver la historia deseada.", "Ignorar multimodalidad porque la media resume todo.", "Convertir toda distribucion a una sola barra.", "A", "Correcto: los bins son parametro visible que afecta lectura.", "Responder sin mirar forma y bins pierde el mecanismo de L2.", "L2:histogram;L2:bins"],
  ["A15", 5, "join-explosion", ["join-cardinality", "row-explosion"], "El JOIN duplica pedidos al cruzar con detalles. Que senal debe detener la interpretacion?", "El conteo de filas aumenta sin reconciliar unidades unicas.", "El archivo tiene mas filas, por tanto mas evidencia.", "LEFT JOIN siempre evita duplicados.", "La suma mayor implica crecimiento real.", "A", "Correcto: la explosion de filas cambia el denominador.", "No se interpreta una suma hasta reconciliar la unidad.", "L5:join-cardinality;L5:row-explosion"],
  ["A16", 3, "hypothesis-curve", ["p-value", "type-i-error"], "La curva marca region critica y alpha. Que interpretacion es valida?", "El p-value mide compatibilidad con H0, no probabilidad de que H0 sea cierta.", "p=0.03 significa 97% de probabilidad de exito.", "Alpha desaparece cuando el resultado es significativo.", "Un p-value pequeno prueba efecto grande.", "A", "Correcto: inferencia comunica evidencia bajo supuestos.", "Evita convertir p-value en certeza o tamano de efecto.", "L3:p-value;L3:type-i-error"],
  ["A17", 10, "privacy-flow", ["privacy", "auditability"], "El flujo muestra proposito, acceso minimo y auditoria. Que requisito falta si se comparte el dataset?", "Registrar proposito, minimizacion y trazabilidad de acceso.", "Compartir todo porque el analisis es educativo.", "Quitar nombres pero conservar secretos unicos.", "Evitar documentar para no atraer revisiones.", "A", "Correcto: privacidad exige proposito y auditoria, no solo anonimizar.", "Nivel 10 no permite datos sensibles sin salvaguardas.", "L10:privacy;L10:auditability"],
  ["A18", 12, "tool-skill-loop", ["tool-contract", "skill-procedure"], "El diagrama muestra una tool atomica y una skill con pasos reutilizables. Que distincion es correcta?", "La tool ejecuta una capacidad acotada; la skill guia un procedimiento verificable.", "Tool y skill son sinonimos si ambas aparecen en el prompt.", "La skill puede saltarse permisos por ser reusable.", "La tool debe cargar todo el curso en contexto.", "A", "Correcto: capacidades y procedimientos tienen contratos distintos.", "Confundir tool/skill rompe progressive disclosure y permisos.", "L12:tool-contract;L12:skill-procedure"],
  ["A19", 13, "rollback-timeline", ["operational-rollback", "postmortem"], "La linea muestra deploy, alerta sostenida, rollback y postmortem. Que accion conserva responsabilidad?", "Revertir con evidencia, preservar logs y documentar causa raiz.", "Culpar al operador y borrar la traza.", "Esperar a que el sistema se arregle solo.", "Redisenar el harness durante el incidente.", "A", "Correcto: incident response contiene dano y preserva evidencia.", "Nivel 13 opera y aprende sin borrar trazabilidad.", "L13:rollback;L13:postmortem"],
  ["A20", 11, "test-pyramid", ["unit-tests", "failure-cases"], "La piramide incluye unit, integration, golden y failure cases. Que prueba protege comportamiento?", "Un failure case que representa una entrada limite esperada.", "Un print manual que se ve bien una vez.", "Un test que solo verifica que existe el archivo.", "Ignorar fixtures porque son lentos.", "A", "Correcto: los tests vinculan contrato con comportamiento.", "L11 separa correr de conservar comportamiento correcto.", "L11:failure-cases;L11:fixtures"],
  ["A21", 8, "pca-plane", ["pca-components", "explained-variance"], "El plano PCA muestra componentes y varianza explicada. Que advertencia es correcta?", "Los componentes resumen combinaciones de variables, no son variables originales.", "PC1 siempre es la causa principal del resultado.", "PCA confirma clases supervisadas.", "La varianza explicada elimina necesidad de revisar escala.", "A", "Correcto: PCA reduce dimension con limites interpretativos.", "No confundir ejes latentes con variables originales.", "L8:pca-components;L8:explained-variance"],
  ["A22", 9, "ab-test", ["randomization", "guardrails"], "El A/B test muestra mejora en metrica principal y caida en guardrail. Que decision es prudente?", "No lanzar automaticamente; revisar efecto, intervalo y guardrail.", "Lanzar porque una metrica subio.", "Ignorar el grupo control si tratamiento gano.", "Cambiar hipotesis despues de mirar resultados.", "A", "Correcto: experimentacion balancea efecto, incertidumbre y guardrails.", "Una mejora aislada no basta para decidir.", "L9:ab-testing;L9:guardrails"],
  ["A23", 6, "leakage-cutoff", ["leakage", "feature-preparation"], "El diagrama marca una feature calculada despues del target. Que problema hay?", "Leakage: usa informacion no disponible al momento de decision.", "Mejor feature porque conoce el futuro.", "Error solo de estilo de codigo.", "No importa si mejora validation.", "A", "Correcto: la preparacion debe respetar momento de decision.", "Un modelo con futuro filtrado falla fuera del laboratorio.", "L6:leakage;L6:feature-preparation"],
  ["A24", 2, "boxplot-outlier", ["outliers", "valid-rare-case"], "El boxplot marca un extremo y una nota de captura. Que hacer antes de eliminarlo?", "Investigar si es error, faltante codificado o caso raro valido.", "Eliminar todo punto fuera del bigote.", "Reemplazarlo por la media sin documentar.", "Declarar fraude automaticamente.", "A", "Correcto: un outlier se investiga antes de modificarlo.", "Nivel 2 distingue error de caso raro valido.", "L2:outliers;L2:valid-rare-case"],
  ["A25", 1, "unit-variable", ["table", "missing"], "La celda vacia esta en una columna numerica de una fila de pedido. Que accion inicial conserva trazabilidad?", "Mantener el faltante y documentar su efecto.", "Cambiarlo a cero para poder sumar.", "Convertir toda la columna a texto.", "Borrar la fila sin revisar unidad.", "A", "Correcto: ausencia no es cero y debe documentarse.", "La limpieza empieza conservando significado.", "L1:missing;L1:table"],
  ["A26", 12, "system-blueprint", ["system-blueprint", "trace-reconstruction"], "El blueprint final muestra objetivo, loop, permisos, parada y traza. Que habilita el handoff a operacion?", "Una trayectoria reconstruible con criterios de parada y aprobacion definidos.", "Una respuesta convincente sin logs.", "Un chatbot con mas autonomia y sin limites.", "Un backend real aunque el laboratorio no lo necesite.", "A", "Correcto: L12 entrega sistema trazable listo para readiness de L13.", "Sin parada, permisos y traza no hay operacion responsable.", "L12:system-blueprint;L12:trace-reconstruction"],
];

const polishQuestion = (row) => {
  const polished = { ...row };
  for (const key of [
    "stem",
    "option_a",
    "option_b",
    "option_c",
    "option_d",
    "feedback_correct",
    "feedback_wrong",
  ]) {
    polished[key] = polishSpanish(polished[key]);
  }
  return polished;
};

const questions = anchors.map((anchor) => {
  const rotated = rotateOptions(
    anchor[5],
    [anchor[6], anchor[7], anchor[8]],
    Number(anchor[0].slice(1)) - 1,
  );
  return polishQuestion({
    question_id: anchor[0],
    level: anchor[1],
    block_id: anchor[2],
    concept_ids: anchor[3].join("|"),
    difficulty: anchor[1],
    stem: `Observa ${visualPath(anchor[0])}. ${anchor[4]}`,
    visual_asset: visualPath(anchor[0]),
    ...rotated,
    feedback_correct: anchor[10],
    feedback_wrong: anchor[11],
    repasar_tags: anchor[12],
  });
});

for (const level of levels) {
  for (let i = 0; i < 6; i += 1) {
    const lesson = level.concepts[Math.floor((i * level.concepts.length) / 6)];
    const objective = (lesson.objective || "").replace(/\.\s*$/, "");
    const qid = `L${String(level.manifest.level).padStart(2, "0")}Q${String(i + 1).padStart(2, "0")}`;
    const rotated = rotateOptions(
      `Usar ${lesson.concept_title.toLowerCase()} para resolver la consigna, citando unidad, evidencia visible y límite de conclusión.`,
      [
        lesson.error ||
          `Usar ${lesson.concept_title.toLowerCase()} como definición de memoria sin revisar evidencia.`,
        "Cambiar la unidad de análisis para que la respuesta parezca más clara.",
        "Aceptar una conclusión automática aunque exceda los datos disponibles.",
      ],
      level.manifest.level * 6 + i,
    );
    questions.push(polishQuestion({
      question_id: qid,
      level: lesson.level,
      block_id: lesson.block_id,
      concept_ids: lesson.concept_id,
      difficulty: lesson.level,
      stem: `Diagnóstico de Nivel ${lesson.level} (${lesson.block_title}). El objetivo es "${objective}". ¿Cuál respuesta demostraría dominio de ${lesson.concept_title}?`,
      visual_asset: "",
      ...rotated,
      feedback_correct: `Correcto: conecta ${lesson.concept_title} con una acción observable y evidencia verificable.`,
      feedback_wrong: `Repasa ${lesson.block_title}: la respuesta debe conservar unidad, evidencia, límite y el error común del concepto.`,
      repasar_tags: `L${lesson.level}:${lesson.block_id};${lesson.concept_id}`,
    }));
  }
}

if (questions.length !== 104) {
  throw new Error(`Banco inesperado: ${questions.length} preguntas`);
}

writeCsv(
  "diagnostic_question_bank.csv",
  [
    "question_id",
    "level",
    "block_id",
    "concept_ids",
    "difficulty",
    "stem",
    "visual_asset",
    "option_a",
    "option_b",
    "option_c",
    "option_d",
    "correct_option",
    "feedback_correct",
    "feedback_wrong",
    "repasar_tags",
  ],
  questions,
);

const routeMap = {
  A01: ["A02", "A03"],
  A02: ["A04", "A05"],
  A03: ["A06", "A07"],
  A04: ["A08", "A09"],
  A05: ["A10", "A11"],
  A06: ["A12", "A13"],
  A07: ["A14", "A15"],
  A08: ["A16", "A17"],
  A09: ["A18", "A19"],
  A10: ["A20", "A21"],
  A11: ["A22", "A23"],
  A12: ["A24", "A25"],
  A13: ["A24", "A25"],
  A14: ["A24", "A25"],
  A15: ["A24", "A25"],
  A16: ["A26", "A24"],
  A17: ["A26", "A24"],
  A18: ["A26", "A24"],
  A19: ["A26", "A24"],
  A20: ["A26", "A25"],
  A21: ["A26", "A25"],
  A22: ["A26", "A25"],
  A23: ["A26", "A25"],
  A24: ["A26", "END"],
  A25: ["A26", "END"],
  A26: ["END", "END"],
};
const anchorByLevel = {
  1: "A25",
  2: "A24",
  3: "A16",
  4: "A13",
  5: "A15",
  6: "A23",
  7: "A12",
  8: "A21",
  9: "A22",
  10: "A17",
  11: "A20",
  12: "A26",
  13: "A19",
};

const routes = questions.map((question) => {
  const pair = routeMap[question.question_id] || [anchorByLevel[question.level] || "END", "END"];
  return {
    question_id: question.question_id,
    next_if_correct: pair[0],
    next_if_wrong: pair[1],
    correct_reason:
      pair[0] === "END"
        ? "La ruta ya tiene evidencia suficiente o llego al limite de 10 preguntas."
        : `La respuesta correcta permite probar una banda posterior o confirmar transferencia hacia ${pair[0]}.`,
    wrong_reason:
      pair[1] === "END"
        ? "La respuesta incorrecta ya identifica una seccion de repaso sin gastar mas preguntas."
        : `La respuesta incorrecta activa una pregunta de prerrequisito o diagnostico fino en ${pair[1]}.`,
    diagnostic_band: question.question_id.startsWith("A")
      ? "ancla-adaptativa"
      : `suplementaria-L${question.level}`,
  };
});

writeCsv(
  "diagnostic_routing.csv",
  [
    "question_id",
    "next_if_correct",
    "next_if_wrong",
    "correct_reason",
    "wrong_reason",
    "diagnostic_band",
  ],
  routes,
);

const scoring = `# Diagnostic Scoring

## Proposito

Este diagnostico orienta nivelacion para DataClass Forge. No es evaluacion academica formal ni seguimiento de estudiantes. Cada sesion responde maximo 10 preguntas, aunque el banco contiene 104 items para rotacion, pilotaje y revision docente.

## Inicio y parada

- La primera pregunta es \`A01\` porque evaluacion de modelos separa comprension descriptiva de juicio sobre modelos.
- Despues de cada respuesta se consulta \`diagnostic_routing.csv\`.
- La sesion termina al llegar a \`END\` o al responder 10 preguntas, lo que ocurra primero.
- Si una pregunta suplementaria \`LNNQMM\` se usa para revision manual, su ruta vuelve a una ancla del mismo nivel o termina.

## Evidencia y graficos

- Las preguntas con \`visual_asset\` requieren mirar el SVG antes de responder.
- La respuesta debe citar una marca visible: celda, umbral, linea, grupo, flujo, corte temporal o etiqueta.
- Si el estudiante responde correctamente sin poder explicar la marca visual, se registra como \`verificar manualmente\`, no como exencion plena.

## Regla conservadora de exencion

- Un nivel queda \`exento\` cuando hay al menos una respuesta correcta directa del nivel o de una ancla equivalente, y no hay fallos en prerrequisitos criticos anteriores.
- Un nivel queda \`repasar\` cuando falla una pregunta directa, falla una ancla de prerrequisito o el feedback apunta a sus \`repasar_tags\`.
- Un nivel queda \`verificar manualmente\` cuando el estudiante acierta una pregunta avanzada pero falla una base necesaria.
- Las exenciones se reportan como tramo contiguo desde Nivel 1 hasta el nivel mas alto sin hueco critico. Aciertos aislados por arriba se reportan como fortalezas, no como exencion automatica.

## Bandas diagnosticas

- L1-L2: lectura, tipos, calidad, descripcion y visualizacion.
- L3-L4: incertidumbre, inferencia, relaciones y causalidad prudente.
- L5: SQL, granularidad, joins, calidad y linaje.
- L6-L7: modelado supervisado, leakage, metricas, umbrales y generalizacion.
- L8-L9: no supervisado, anomalias, tiempo y experimentacion.
- L10: responsabilidad, privacidad, reproducibilidad y comunicacion.
- L11-L13: producto, sistemas de IA trazables, operacion, monitoreo e incidentes.

## Salida recomendada

Para cada estudiante entregar:

1. Niveles exentos.
2. Niveles a repasar.
3. Secciones concretas a repasar desde \`repasar_tags\`.
4. Fortalezas avanzadas detectadas, si no forman tramo contiguo.
5. Confianza: alta si no hay contradicciones; media si hay una contradiccion menor; baja si acerto avanzado pero fallo fundamentos.

## Simulaciones esperadas

- Principiante: falla \`A01\`, \`A03\` y bases; repasa L1-L3.
- Descriptivo: falla modelado pero acierta L1-L2; exento L1-L2 y repasa L3-L7.
- Modelado: acierta L6-L7 pero falla responsabilidad o temporalidad; exento hasta L7 con repaso L9-L10.
- Producto/IA: acierta L11-L12 y falla L13; exento hasta L12, repasa operacion responsable.
- Avanzado con huecos: acierta L12/L13 pero falla L5 o L7; fortalezas avanzadas, pero exencion contigua se detiene antes del hueco.
`;
fs.writeFileSync(path.join(outDir, "diagnostic_scoring.md"), polishSpanish(scoring), "utf8");

const walk = (answerBits) => {
  let current = "A01";
  let count = 0;
  const seen = [];
  for (let i = 0; i < answerBits.length && current !== "END"; i += 1) {
    seen.push(current);
    count += 1;
    const pair = routeMap[current] || ["END", "END"];
    current = answerBits[i] ? pair[0] : pair[1];
    if (count > 10) {
      throw new Error(`Ruta excede 10: ${seen.join(" -> ")}`);
    }
  }
  return count;
};

for (let mask = 0; mask < 1024; mask += 1) {
  const bits = Array.from({ length: 10 }, (_, index) => Boolean(mask & (1 << index)));
  walk(bits);
}

console.log(
  JSON.stringify(
    {
      concepts: inventory.length,
      levels: new Set(inventory.map((row) => row.level)).size,
      questions: questions.length,
      visuals: visualSpecs.length,
      routes: routes.length,
    },
    null,
    2,
  ),
);
