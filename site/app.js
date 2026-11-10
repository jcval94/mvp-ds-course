(async function () {
  const response = await fetch("catalog.json");
  if (!response.ok) throw new Error("No se pudo cargar catalog.json");
  const catalog = await response.json();
  const $ = (selector) => document.querySelector(selector);
  const create = (tag, attributes = {}, text = "") => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "class") element.className = value;
      else element.setAttribute(key, value);
    });
    if (text) element.textContent = text;
    return element;
  };

  // Niveles abiertos sin plan de pago (igual que FREE_LEVELS en la app de The Agentic D. Scientist).
  const FREE_LEVELS = [1, 2];
  const icon = (name) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `#i-${name}`);
    svg.append(use);
    return svg;
  };

  const readJson = (key) => {
    try { return JSON.parse(localStorage.getItem(key) || "null"); }
    catch (_) { return null; }
  };
  const writeJson = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) {}
  };

  // Tiempos estimados: "2 h 20 min" / "45 min". Vienen de site/tiempos.json vía catalog.json.
  const dur = (m) => { m = Math.round(m / 5) * 5; return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}`; };
  const caseStatus = { construido: "Disponible", en_preparacion: "En preparación", planeado: "Próximamente", por_verificar: "En revisión" };

  // Cuatro cifras que le sirven a quien decide inscribirse; el resto vive en Metodología.
  const live = catalog.timing || {};
  const summary = [
    ["Clases en vivo", live.live_class && live.live_class.sesiones ? live.live_class.sesiones : "—"],
    ["Horas en vivo", live.live_total ? `${Math.round(live.live_total / 60)} h` : "—"],
    ["Conceptos", catalog.totals.concepts],
    ["Ejercicios", catalog.totals.exercises],
  ];
  summary.forEach(([label, value]) => {
    const wrapper = create("div");
    wrapper.append(create("dt", {}, label), create("dd", {}, String(value)));
    $("#summaryRail").append(wrapper);
  });

  const saveLastMission = (mission) => writeJson("dcf-last-mission", mission);
  const readLastMission = () => readJson("dcf-last-mission");
  const placementResult = readJson("dcf-placement-result");

  catalog.levels.forEach((level) => {
    const free = FREE_LEVELS.includes(Number(level.level));
    // Cada nivel es plegable para que el currículum se lea como la lista de niveles de la landing.
    const group = create("details", { class: free ? "level-group free" : "level-group", "data-level": String(level.level) });
    // En pantallas anchas el Nivel 1 llega abierto; en el celular todo llega plegado para no alargar la página.
    if (Number(level.level) === 1 && matchMedia("(min-width: 801px)").matches) group.open = true;
    const head = create("summary", { class: "level-head" });
    const title = create("div", { class: "level-title" });
    const heading = create("h3", {}, `Nivel ${level.level} · ${level.title}`);
    const badge = create("span", { class: "plan-badge" });
    // Los niveles de pago solo llevan el candado: repetir "Plan pagado" once veces era ruido.
    if (free) badge.textContent = "Gratis";
    else badge.append(icon("lock"), create("span", { class: "sr-only" }, "Incluido en el curso en vivo y en Augmented Studio"));
    heading.append(badge);
    const tiempo = level.minutes ? ` · ≈ ${dur(level.minutes.total)}` : "";
    title.append(heading, create("span", {}, `${level.concept_count} conceptos · ${level.exercise_count} ejercicios${tiempo}`));
    head.append(create("span", { class: "level-number", "aria-hidden": "true" }, String(level.level)), title, create("span", { class: "level-toggle", "aria-hidden": "true" }));
    group.append(head);
    if (level.case) {
      const c = level.case, note = create("div", { class: "catalog-case" });
      const named = c.status !== "por_verificar" && c.title;
      note.append(create("b", {}, named ? `Caso real del módulo: ${c.title}` : "Caso real del módulo: en revisión"),
        create("span", { class: "case-state" }, caseStatus[c.status] || ""),
        create("span", {}, `Misión ≈ ${dur(c.minutes)}`));
      if (c.bank && c.bank.length) note.append(create("span", { class: "case-bank" }, `También en clase: ${c.bank.join(" · ")}`));
      group.append(note);
    }
    level.blocks.forEach((block) => {
      const row = create("div", { class: "catalog-row", "data-search": `${block.title} ${level.title}`.toLowerCase() });
      row.append(create("strong", {}, block.title), create("span", {}, `${block.concept_count} conceptos${block.minutes ? ` · ≈ ${dur(block.minutes)}` : ""}`));
      const link = create("a", { href: block.href }, "Abrir");
      link.addEventListener("click", () => saveLastMission({ href: block.href, title: block.title, level: level.level, levelTitle: level.title }));
      row.append(link); group.append(row);
    });
    $("#catalog").append(group);
  });

  const missionFromLevel = (levelNumber) => {
    const level = catalog.levels.find((item) => Number(item.level) === Number(levelNumber));
    const block = level && level.blocks ? level.blocks[0] : null;
    return block ? { href: block.href, title: block.title, level: level.level, levelTitle: level.title } : null;
  };

  const firstLevel = catalog.levels[0];
  const fallbackMission = firstLevel && firstLevel.blocks && firstLevel.blocks[0]
    ? { href: firstLevel.blocks[0].href, title: firstLevel.blocks[0].title, level: firstLevel.level, levelTitle: firstLevel.title }
    : null;
  // Botones "Empezar gratis": siempre al primer bloque del Nivel 1.
  if (fallbackMission) {
    document.querySelectorAll("[data-start-free]").forEach((link) => {
      link.href = fallbackMission.href;
      link.addEventListener("click", () => saveLastMission(fallbackMission));
    });
  }
  const storedMission = readLastMission();
  const placementMission = placementResult && placementResult.startLevel ? missionFromLevel(placementResult.startLevel) : null;
  const mission = storedMission || placementMission || fallbackMission;

  if (mission) {
    const source = storedMission ? "stored" : placementMission ? "placement" : "first";
    if (source === "stored") {
      $("#continueKicker").textContent = `Continúa · Nivel ${mission.level}`;
      $("#continueMeta").textContent = `${mission.levelTitle}. Tu última misión queda guardada solo en este dispositivo.`;
      $("#missionLink").textContent = "Continuar misión";
      $("#continueLink").textContent = "Continuar aprendiendo";
    } else if (source === "placement") {
      $("#continueKicker").textContent = `Tu ruta recomendada · Nivel ${mission.level}`;
      const review = Array.isArray(placementResult.review) && placementResult.review.length
        ? ` Antes de avanzar, el diagnóstico marcó repaso en ${placementResult.review.map((level) => `Nivel ${level}`).join(", ")}.`
        : " El diagnóstico no marcó un repaso obligatorio antes de comenzar.";
      $("#continueMeta").textContent = `${mission.levelTitle}.${review}`;
      $("#missionLink").textContent = "Empezar ruta recomendada";
      $("#continueLink").textContent = "Empezar mi ruta";
    }
    // Quien llega por primera vez ve solo el hero (el botón secundario lleva al primer caso).
    // La tarjeta "continúa" aparece cuando hay algo que continuar: una misión abierta o un diagnóstico hecho.
    if (source !== "first") {
      $("#continueTitle").textContent = mission.title;
      $("#missionLink").href = mission.href; $("#continueLink").href = mission.href;
      [$("#missionLink"), $("#continueLink")].forEach((link) => link.addEventListener("click", () => saveLastMission(mission)));
      $("#progressCard").hidden = false;
    }
  }

  const tableHeader = create("div", { class: "data-row header", role: "row" });
  ["Dataset", "Snapshot", "Licencia", "Uso didáctico"].forEach((label) => tableHeader.append(create("span", { role: "columnheader" }, label)));
  $("#datasetTable").append(tableHeader);
  catalog.datasets.forEach((dataset) => {
    const row = create("div", { class: "data-row", role: "row" });
    const link = create("a", { href: dataset.source_page, role: "cell" }, dataset.name);
    row.append(link, create("span", { role: "cell" }, dataset.snapshot_label), create("a", { href: dataset.license_url, role: "cell" }, dataset.license_display), create("span", { role: "cell" }, dataset.portal_use));
    $("#datasetTable").append(row);
  });

  [["Currículo", `${catalog.totals.concepts} conceptos trazables`],["Práctica", `${catalog.totals.exercises} ejercicios basados en evidencia`],["En vivo", "Codex + Gemini/ChatGPT + plan offline"],["Calidad", "Promedio ≥ 4 y ninguna dimensión en 1"]].forEach(([term, description]) => {
    const wrapper = create("div"); wrapper.append(create("dt", {}, term), create("dd", {}, description)); $("#validationList").append(wrapper);
  });

  // El temario muestra los primeros niveles; el resto se despliega con un botón (o al buscar).
  const FIRST_LEVELS = 5;
  let showAll = catalog.levels.length <= FIRST_LEVELS;
  const more = $("#catalogMore");
  if (more) {
    more.textContent = `Ver los ${catalog.levels.length} niveles`;
    more.addEventListener("click", () => { showAll = true; applyFilters(); });
  }
  function applyFilters() {
    const query = $("#search").value.trim().toLowerCase(); let visibleRows = 0;
    if (more) more.hidden = showAll || Boolean(query);
    document.querySelectorAll(".level-group").forEach((group, index) => {
      let groupVisible = false;
      group.querySelectorAll(".catalog-row").forEach((row) => {
        const searchAllowed = !query || row.dataset.search.includes(query); row.hidden = !searchAllowed;
        if (!row.hidden) { groupVisible = true; visibleRows += 1; }
      });
      group.hidden = !groupVisible || (!query && !showAll && index >= FIRST_LEVELS);
      if (query && groupVisible) group.open = true;
    });
    let empty = $("#catalog .empty");
    if (!visibleRows && !empty) { empty = create("p", { class: "empty" }, "No hay bloques que coincidan con la búsqueda."); $("#catalog").append(empty); }
    if (visibleRows && empty) empty.remove();
  }
  $("#search").addEventListener("input", applyFilters);
  applyFilters();
})();