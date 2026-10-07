/* Misión m01-wald: interfaz. Datos en data/ (copiados desde casos/data/wald-bombers/). */
(async function () {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const SVG = "http://www.w3.org/2000/svg";
  const SAMPLE = 150;
  const TOTAL_STEPS = 5;

  async function loadJson(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
    return response.json();
  }
  async function loadCsv(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
    const [header, ...lines] = (await response.text()).trim().split("\n");
    const keys = header.split(",");
    return lines.map((line) => Object.fromEntries(line.split(",").map((value, index) => [keys[index], value])));
  }

  const [params, returned, everyone] = await Promise.all([
    loadJson("data/parametros.json"),
    loadCsv("data/regresaron.csv"),
    loadCsv("data/todos.csv"),
  ]);
  const sections = params.secciones;
  const byLetter = Object.fromEntries(sections.map((section) => [section.pixel, section]));
  const plates = params.blindaje.placas;
  const downed = everyone.filter((row) => row.regreso === "no");
  $("#returnedCount").textContent = `${returned.length.toLocaleString("es-MX")}`;

  /* ---------- Avión en píxeles ---------- */
  const rows = params.avion.filas;
  const width = rows[0].length, height = rows.length;
  const plane = $("#plane");
  plane.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const cellsBySection = {};
  rows.forEach((row, y) => [...row].forEach((letter, x) => {
    const section = byLetter[letter];
    if (!section) return;
    const cell = document.createElementNS(SVG, "rect");
    cell.setAttribute("x", x); cell.setAttribute("y", y); cell.setAttribute("width", 1); cell.setAttribute("height", 1);
    cell.setAttribute("class", `cell s-${section.id}`);
    cell.dataset.section = section.id;
    plane.append(cell);
    (cellsBySection[section.id] = cellsBySection[section.id] || []).push([x, y]);
  }));
  const hitLayer = document.createElementNS(SVG, "g");
  plane.append(hitLayer);

  // Posiciones de impactos reproducibles: mismo generador que la simulación.
  function drawHits(planes) {
    hitLayer.replaceChildren();
    const rng = WaldSim.MersenneTwister(7);
    planes.slice(0, SAMPLE).forEach((row) => sections.forEach((section) => {
      for (let i = 0; i < Number(row[section.id]); i++) {
        const cells = cellsBySection[section.id];
        const [x, y] = cells[Math.floor(rng.random() * cells.length)];
        const dot = document.createElementNS(SVG, "rect");
        const ox = Math.floor(rng.random() * 3) / 3, oy = Math.floor(rng.random() * 3) / 3;
        dot.setAttribute("x", x + ox + .04); dot.setAttribute("y", y + oy + .04);
        dot.setAttribute("width", .26); dot.setAttribute("height", .26);
        dot.setAttribute("class", "hit");
        hitLayer.append(dot);
      }
    }));
  }

  /* ---------- Evidencia ---------- */
  function density(planes) {
    const totals = Object.fromEntries(sections.map((section) => [section.id, 0]));
    planes.forEach((row) => sections.forEach((section) => { totals[section.id] += Number(row[section.id]); }));
    return sections.map((section) => ({
      section,
      hits: totals[section.id],
      per100: totals[section.id] / (section.area * 100), // impactos por cada 1 % de superficie
    }));
  }
  const seen = density(returned);
  const hidden = density(downed);
  const maxSeen = Math.max(...seen.map((item) => item.per100));
  $("#evidenceTable").innerHTML =
    "<thead><tr><th>Parte</th><th>Impactos</th><th>Por cada 1% de superficie</th></tr></thead><tbody>" +
    seen.map((item) => `<tr><td>${item.section.nombre}</td><td>${item.hits}</td><td><span class="bar" style="width:${Math.round(60 * item.per100 / maxSeen)}px"></span>${item.per100.toFixed(1)}</td></tr>`).join("") +
    "</tbody>";
  const perPlane = (items, count) => items.map((item) => (item.per100 * 10) / count); // por avión y por cada 10 % de superficie
  const seenRate = perPlane(seen, returned.length), hiddenRate = perPlane(hidden, downed.length);
  const maxRate = Math.max(...seenRate, ...hiddenRate);
  $("#compareTable").innerHTML =
    "<thead><tr><th>Parte</th><th>Regresaron</th><th>Derribados</th></tr></thead><tbody>" +
    sections.map((section, i) => `<tr><td>${section.nombre}</td><td><span class="bar" style="width:${Math.round(50 * seenRate[i] / maxRate)}px"></span>${seenRate[i].toFixed(2)}</td><td><span class="bar alt" style="width:${Math.round(50 * hiddenRate[i] / maxRate)}px"></span>${hiddenRate[i].toFixed(2)}</td></tr>`).join("") +
    "</tbody><caption class=\"note\" style=\"caption-side:bottom;text-align:left;padding-top:6px\">Impactos por avión por cada 10% de superficie.</caption>";

  /* ---------- Blindaje ---------- */
  const chosen = new Set();
  const buttons = {};
  sections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "section-btn"; button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span>${section.nombre}</span><small>${Math.round(section.area * 100)}% sup.</small>`;
    button.addEventListener("click", () => toggle(section.id));
    $("#sectionButtons").append(button);
    buttons[section.id] = button;
  });
  function toggle(id) {
    if (currentStep !== 2) return;
    if (chosen.has(id)) chosen.delete(id);
    else if (chosen.size < plates) chosen.add(id);
    else return;
    paintArmor();
  }
  function paintArmor() {
    sections.forEach((section) => buttons[section.id].setAttribute("aria-pressed", String(chosen.has(section.id))));
    plane.querySelectorAll(".cell").forEach((cell) => cell.classList.toggle("armored", chosen.has(cell.dataset.section)));
    $("#launch").disabled = chosen.size !== plates;
  }
  plane.addEventListener("click", (event) => { const id = event.target.dataset && event.target.dataset.section; if (id) toggle(id); });
  plane.addEventListener("mouseover", (event) => {
    const id = event.target.dataset && event.target.dataset.section;
    plane.querySelectorAll(".cell").forEach((cell) => cell.classList.toggle("hover", currentStep === 2 && cell.dataset.section === id && !chosen.has(id)));
  });
  plane.addEventListener("mouseleave", () => plane.querySelectorAll(".cell.hover").forEach((cell) => cell.classList.remove("hover")));

  /* ---------- Simulación ---------- */
  const baseline = WaldSim.simulate(params, []).filter((item) => item.returned).length;
  const attempts = [];
  $("#launch").addEventListener("click", () => {
    const armor = [...chosen];
    const planes = WaldSim.simulate(params, armor);
    const back = planes.filter((item) => item.returned).length;
    attempts.push({ armor, back });
    const names = armor.map((id) => sections.find((section) => section.id === id).nombre).join(" + ");
    const gain = back - baseline;
    $("#baseCount").textContent = baseline;
    $("#armorCount").textContent = back;
    $("#diffCount").textContent = (gain >= 0 ? "+" : "") + gain;
    const tally = $("#tally"); tally.replaceChildren();
    planes.forEach((item) => { const pixel = document.createElement("i"); pixel.className = item.returned ? "back" : "lost"; tally.append(pixel); });
    const helped = gain >= 80;
    $("#resultTitle").textContent = helped ? "¡Regresaron muchos más!" : "Casi no cambió.";
    $("#resultText").innerHTML = helped
      ? `Blindar <strong>${names}</strong> salvó ${gain} aviones de cada 1,000. ¿Por qué funcionó, si en los aviones que regresan esas partes casi no tienen agujeros?`
      : `Blindar <strong>${names}</strong> salvó solo ${gain} aviones de cada 1,000. Reforzaste donde había más agujeros… ¿qué te faltó ver?`;
    $("#attempts").innerHTML = attempts.map((item, i) => `<li>Intento ${i + 1}: ${item.armor.map((id) => sections.find((section) => section.id === id).nombre).join(" + ")} → ${item.back} regresaron</li>`).join("");
    go(3);
  });

  /* ---------- Transferencia ---------- */
  const choices = [
    { text: "A 9 de cada 10 personas que descargan la app les encanta.", right: false, why: "Solo preguntaste a quienes se quedaron. Quienes la abandonaron, probablemente insatisfechos, no aparecen en la encuesta." },
    { text: "Solo sabes lo que opinan quienes siguen usándola; faltan quienes la dejaron.", right: true, why: "Exacto: como con los aviones, la muestra pasó un filtro. Para concluir sobre todos necesitas datos de quienes no 'regresaron'." },
    { text: "La app es mejor que las de la competencia.", right: false, why: "La encuesta no compara con otras apps, y además solo incluye a quienes se quedaron." },
    { text: "Hay que encuestar a menos personas para ahorrar tiempo.", right: false, why: "El problema no es el tamaño de la muestra sino quién queda fuera de ella." },
  ];
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "choice"; button.textContent = choice.text;
    button.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach((item) => item.classList.remove("right", "wrong"));
      button.classList.add(choice.right ? "right" : "wrong");
      $("#choiceFeedback").textContent = choice.why;
    });
    $("#choices").append(button);
  });

  /* ---------- Pasos ---------- */
  let currentStep = 1;
  function go(step) {
    currentStep = step;
    document.querySelectorAll("[data-step]").forEach((element) => { element.hidden = Number(element.dataset.step) !== step; });
    $("#xpFill").style.width = `${Math.round((step / TOTAL_STEPS) * 100)}%`;
    $("#xp").setAttribute("aria-valuenow", String(step));
    $("#xpLabel").textContent = `${step}/${TOTAL_STEPS}`;
    const showDowned = step >= 4;
    plane.classList.toggle("show-downed", showDowned);
    drawHits(showDowned ? downed : returned);
    $("#skyTitle").textContent = showDowned ? "Radar · aviones derribados" : "Radar · aviones que regresaron";
    $("#skyNote").textContent = `Muestra de ${SAMPLE} aviones`;
    $("#legendDowned").hidden = !showDowned;
    if (step === 2) { chosen.clear(); }
    paintArmor();
    if (step >= 3 && attempts.length) attempts[attempts.length - 1].armor.forEach((id) => plane.querySelectorAll(`.cell[data-section="${id}"]`).forEach((cell) => cell.classList.add("armored")));
    const first = document.querySelector(`[data-step="${step}"] h2`);
    if (first && step > 1) first.setAttribute("tabindex", "-1"), first.focus({ preventScroll: false });
  }
  document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => go(Number(button.dataset.go))));
  go(1);
})().catch((error) => {
  const panel = document.querySelector(".panel");
  if (panel) panel.insertAdjacentHTML("afterbegin", `<p class="note">No se pudo cargar la misión: ${error.message}</p>`);
});
