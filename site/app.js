(async function () {
  const response = await fetch("catalog.json");
  if (!response.ok) throw new Error("No se pudo cargar catalog.json");
  const catalog = await response.json();
  let activeLevel = "all";

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

  const readJson = (key) => {
    try { return JSON.parse(localStorage.getItem(key) || "null"); }
    catch (_) { return null; }
  };
  const writeJson = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) {}
  };

  const summary = [
    ["Conceptos verificados", catalog.totals.concepts],
    ["Ejercicios", catalog.totals.exercises],
    ["Niveles", catalog.levels.length],
    ["Actualizado", catalog.updated_at],
  ];
  summary.forEach(([label, value]) => {
    const wrapper = create("div");
    wrapper.append(create("dt", {}, label), create("dd", {}, String(value)));
    $("#summaryRail").append(wrapper);
  });

  const filters = [["all", "Todos"], ...catalog.levels.map((level) => [String(level.level), `Nivel ${level.level}`])];
  filters.forEach(([value, label]) => {
    const button = create("button", { type: "button", "data-level": value }, label);
    if (value === "all") button.classList.add("active");
    button.addEventListener("click", () => {
      activeLevel = value;
      document.querySelectorAll("#levelFilters button").forEach((item) => item.classList.toggle("active", item === button));
      applyFilters();
    });
    $("#levelFilters").append(button);
  });

  const saveLastMission = (mission) => writeJson("dcf-last-mission", mission);
  const readLastMission = () => readJson("dcf-last-mission");
  const placementResult = readJson("dcf-placement-result");

  catalog.levels.forEach((level) => {
    const group = create("section", { class: "level-group", "data-level": String(level.level) });
    const head = create("div", { class: "level-head" });
    head.append(create("h3", {}, `Nivel ${level.level} · ${level.title}`), create("span", {}, `${level.concept_count} conceptos · ${level.exercise_count} ejercicios`));
    group.append(head);
    level.blocks.forEach((block) => {
      const row = create("div", { class: "catalog-row", "data-search": `${block.title} ${level.title}`.toLowerCase() });
      row.append(create("strong", {}, block.title), create("span", {}, `${block.concept_count} conceptos`));
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
    } else {
      $("#continueKicker").textContent = `Empieza · Nivel ${mission.level}`;
      $("#continueMeta").textContent = `${mission.levelTitle}. Este es el primer bloque publicado de la ruta.`;
      $("#missionLink").textContent = "Abrir primera misión";
      $("#continueLink").textContent = "Comenzar ruta";
    }
    $("#continueTitle").textContent = mission.title;
    $("#missionLink").href = mission.href; $("#continueLink").href = mission.href;
    [$("#missionLink"), $("#continueLink")].forEach((link) => link.addEventListener("click", () => saveLastMission(mission)));
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

  function applyFilters() {
    const query = $("#search").value.trim().toLowerCase(); let visibleRows = 0;
    document.querySelectorAll(".level-group").forEach((group) => {
      const levelAllowed = activeLevel === "all" || group.dataset.level === activeLevel; let groupVisible = false;
      group.querySelectorAll(".catalog-row").forEach((row) => {
        const searchAllowed = !query || row.dataset.search.includes(query); row.hidden = !(levelAllowed && searchAllowed);
        if (!row.hidden) { groupVisible = true; visibleRows += 1; }
      });
      group.hidden = !groupVisible;
    });
    let empty = $("#catalog .empty");
    if (!visibleRows && !empty) { empty = create("p", { class: "empty" }, "No hay bloques que coincidan con la búsqueda."); $("#catalog").append(empty); }
    if (visibleRows && empty) empty.remove();
  }
  $("#search").addEventListener("input", applyFilters);
})();