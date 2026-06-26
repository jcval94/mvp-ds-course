(function () {
  const source = window.DCF_LEVEL3;
  const modules = source.modules;
  const moduleId = document.body.dataset.module;
  const currentModule = modules[moduleId];
  const params = new URLSearchParams(location.search);
  let lessonIndex = Math.max(0, currentModule.lessons.findIndex((lesson) => lesson.id === params.get("concept")));
  let exerciseIndex = 0;
  let teacherEnabled = params.get("teacher") === "1";
  let teacherMode = "learn";
  let visualStep = 0;
  let visitedEvidence = new Set();
  let isAnimating = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const homeHref = () =>
    location.pathname.includes("/labs/level-") ? "../../index.html" : "../../site/index.html";
  const icon = (path) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  const icons = {
    back: "m15 18-6-6 6-6",
    next: "m9 18 6-6-6-6",
    play: "m8 5 11 7-11 7Z",
    reset: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
    copy: "M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2ZM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  };

  function shell() {
    $("#app").innerHTML = `
      <header class="header">
        <a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><strong>DataClass Forge</strong><span>Nivel 3</span></a>
        <div class="header-actions">
          <a class="header-link home-link" data-home-link href="${homeHref()}">HOME</a>
          <a class="header-link" href="../../datasets/README.md">Fuentes y licencias</a>
        </div>
      </header>
      <div class="layout">
        <nav class="module-nav" aria-label="Bloques del Nivel 3">
          <p>Probabilidad e inferencia</p>
          ${Object.values(modules).map((module) => `
            <a class="${module.id === moduleId ? "active" : ""}" href="${module.href}">
              <b>${module.number}</b><span>${module.title}</span>
            </a>`).join("")}
          <a class="portal-link" href="index.html">Volver al nivel</a>
          <a class="portal-link home-portal-link" data-home-link href="${homeHref()}">HOME</a>
        </nav>
        <main>
          <div class="lesson-nav">
            <span id="lessonCount"></span>
            <div class="lesson-actions">
              <button id="previous" aria-label="Concepto anterior">${icon(icons.back)}</button>
              <button id="next">Siguiente ${icon(icons.next)}</button>
            </div>
          </div>
          <section class="intro">
            <p id="blockName"></p>
            <h1 id="lessonTitle"></h1>
            <p id="lessonObjective"></p>
          </section>
          <section class="lab">
            <div class="lab-toolbar">
              <div><strong id="datasetName"></strong><span id="datasetMeta"></span></div>
              <span id="visualProgress" class="visual-progress"></span>
              <button id="resetVisual" class="secondary">${icon(icons.reset)} Reiniciar</button>
              <button id="runVisual" class="primary">${icon(icons.play)} <span></span></button>
            </div>
            <div id="visual" class="visual"></div>
            <div class="exercise">
              <div class="exercise-main">
                <div class="exercise-tabs">
                  <button data-exercise="0" class="active">Ejercicio guiado</button>
                  <button data-exercise="1">Transferencia</button>
                </div>
                <div id="practiceStory" class="practice-story"></div>
                <p id="exerciseEvidence" class="exercise-evidence"></p>
                <h2 id="question"></h2>
                <div id="options"></div>
                <button id="hint" class="hint">Mostrar pista</button>
                <p id="hintText" hidden></p>
              </div>
              <div id="feedback" class="feedback">
                <strong>Retroalimentación</strong>
                <p>Selecciona una respuesta y justifícala con la evidencia visual.</p>
              </div>
            </div>
          </section>
        </main>
        <aside class="teacher">
          <div class="teacher-tabs">
            <button data-mode="learn">Aprender</button>
            <button data-mode="practice">Ejercitar</button>
            <button data-mode="live" ${teacherEnabled ? "" : "hidden"}>En vivo</button>
          </div>
          <div id="teacherContent"></div>
        </aside>
      </div>`;
  }

  function renderLesson() {
    visualStep = 0;
    exerciseIndex = 0;
    visitedEvidence = new Set();
    isAnimating = false;
    const lesson = currentModule.lessons[lessonIndex];
    const dataset = source.datasets[currentModule.dataset_id];
    document.title = `${lesson.title} | DataClass Forge`;
    const nextParams = new URLSearchParams();
    nextParams.set("concept", lesson.id);
    if (teacherEnabled) nextParams.set("teacher", "1");
    history.replaceState(null, "", `?${nextParams.toString()}`);
    $("#lessonCount").textContent = `Bloque ${currentModule.number} de 5 · Concepto ${lessonIndex + 1} de ${currentModule.lessons.length}`;
    $("#blockName").textContent = currentModule.title;
    $("#lessonTitle").textContent = lesson.title;
    $("#lessonObjective").textContent = lesson.objective;
    $("#datasetName").textContent = currentModule.dataset_name;
    $("#datasetMeta").textContent = `${dataset.rows.toLocaleString("es-MX")} filas · ${dataset.license}`;
    $("#previous").disabled = lessonIndex === 0;
    $("#next").innerHTML = lessonIndex === currentModule.lessons.length - 1 ? `Volver al nivel ${icon(icons.next)}` : `Siguiente ${icon(icons.next)}`;
    renderVisual();
    renderExercise();
    renderTeacher();
  }

  function colorFor(name) {
    return { teal: "#087f7b", blue: "#285fb8", coral: "#d35a4a", muted: "#8a98a8" }[name] || "#087f7b";
  }

  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
  const gaussian = (value, center = 0, spread = 1) =>
    Math.exp(-0.5 * ((value - center) / spread) ** 2);
  const number = (value, digits = 0) =>
    new Intl.NumberFormat("es-MX", { maximumFractionDigits: digits }).format(value);

  function evidenceReady(exercise) {
    const contract = exercise.evidenceContract;
    return (
      visualStep >= contract.unlockAtStep &&
      contract.requiredEvidenceIds.every((evidenceId) => visitedEvidence.has(evidenceId))
    );
  }

  function registerEvidence(state) {
    state.marks.forEach((mark) => visitedEvidence.add(mark.evidenceId));
  }

  function updateProgress(lesson) {
    const total = lesson.visual.states.length;
    const atEnd = visualStep >= total - 1;
    $("#visualProgress").textContent = `Paso ${visualStep + 1} de ${total}`;
    $("#runVisual span").textContent = atEnd ? "Evidencia completa" : lesson.visual.action;
    $("#runVisual").disabled = isAnimating || atEnd;
  }

  function svg(content, label, semantic = "") {
    return `<svg class="chart visual-chart" viewBox="0 0 760 320" role="img" aria-label="${label}" data-semantic="${semantic}">
      ${content}
    </svg>`;
  }

  function linePath(points) {
    return points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  }

  function histogram(values, binCount = 9) {
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const width = (maximum - minimum || 1) / binCount;
    const counts = Array.from({ length: binCount }, () => 0);
    values.forEach((value) => {
      const index = Math.min(binCount - 1, Math.floor((value - minimum) / width));
      counts[index] += 1;
    });
    return { minimum, maximum, width, counts, maxCount: Math.max(...counts, 1) };
  }

  function renderSetVisual(lesson, state, previous) {
    if (lesson.visual.kind === "nested-set") {
      const numerator = state.bars[0];
      const denominator = state.bars[1];
      const ratio = clamp(numerator.value / Math.max(denominator.value, 1), 0, 1);
      const previousRatio = previous
        ? clamp(previous.bars[0].value / Math.max(previous.bars[1].value, 1), 0, 1)
        : ratio;
      return svg(`
        <rect x="90" y="72" width="580" height="150" rx="20" class="set-universe"/>
        <text x="110" y="104" class="label-strong">${denominator.label}: ${denominator.display}</text>
        <rect x="110" y="126" width="${540 * ratio}" height="70" rx="14" class="set-active" data-semantic="active-denominator">
          <animate attributeName="width" from="${540 * previousRatio}" to="${540 * ratio}" dur=".6s" fill="freeze"/>
        </rect>
        <text x="130" y="168" class="label-inverse">${numerator.label}: ${numerator.display}</text>
        <text x="380" y="258" text-anchor="middle">El marco exterior es el denominador activo</text>
      `, state.label, "nested-denominator");
    }
    const total = state.bars.reduce((sum, item) => sum + Math.max(item.value, 0), 0) || 1;
    let offset = 85;
    const segments = state.bars.map((item, index) => {
      const width = 590 * item.value / total;
      const segment = `<g>
        <rect x="${offset}" y="110" width="${width}" height="82" fill="${colorFor(item.color)}" class="set-segment" rx="${index === 0 || index === state.bars.length - 1 ? 10 : 0}"/>
        <text x="${offset + width / 2}" y="148" text-anchor="middle" class="label-inverse">${item.display}</text>
        <text x="${offset + width / 2}" y="218" text-anchor="middle">${item.label}</text>
      </g>`;
      offset += width;
      return segment;
    }).join("");
    return svg(`
      <rect x="75" y="86" width="610" height="132" rx="18" class="set-universe"/>
      ${segments}
      <text x="380" y="270" text-anchor="middle">Una sola partición del mismo universo</text>
    `, state.label, lesson.visual.kind);
  }

  function renderTrialsVisual(lesson, state) {
    const rows = state.bars.map((item, rowIndex) => {
      const tokenCount = 18;
      const max = Math.max(...state.bars.map((entry) => Math.abs(entry.value)), 1);
      const active = Math.round(tokenCount * Math.abs(item.value) / max);
      const tokens = Array.from({ length: tokenCount }, (_, index) => {
        const x = 180 + (index % 9) * 42;
        const y = 82 + rowIndex * 96 + Math.floor(index / 9) * 33;
        return `<circle cx="${x}" cy="${y}" r="11" class="trial-token ${index < active ? "active" : ""}" style="--delay:${index * 18}ms"/>`;
      }).join("");
      return `${tokens}
        <text x="76" y="${100 + rowIndex * 96}" class="label-strong">${item.label}</text>
        <text x="650" y="${100 + rowIndex * 96}" text-anchor="end">${item.display}</text>`;
    }).join("");
    return svg(`${rows}`, state.label, lesson.visual.kind);
  }

  function renderDistributionVisual(lesson, state) {
    const values = state.series || state.bars.map((item) => Number(item.value));
    const result = histogram(values, 9);
    const barWidth = 590 / result.counts.length;
    const bars = result.counts.map((count, index) => {
      const height = 170 * count / result.maxCount;
      return `<rect x="${85 + index * barWidth}" y="${248 - height}" width="${barWidth - 3}" height="${height}" class="distribution-bin" style="--delay:${index * 28}ms"/>`;
    }).join("");
    const center = values.reduce((sum, value) => sum + value, 0) / values.length;
    const spread = Math.sqrt(values.reduce((sum, value) => sum + (value - center) ** 2, 0) / values.length) || 1;
    const curvePoints = Array.from({ length: 80 }, (_, index) => {
      const value = result.minimum + (index / 79) * (result.maximum - result.minimum || 1);
      const x = 85 + (index / 79) * 590;
      const y = 248 - gaussian(value, center, spread) * 170;
      return [x, y];
    });
    const interval = state.interval
      ? `<line x1="${85 + ((state.interval[0] - result.minimum) / (result.maximum - result.minimum || 1)) * 590}" y1="278"
          x2="${85 + ((state.interval[2] - result.minimum) / (result.maximum - result.minimum || 1)) * 590}" y2="278"
          class="interval-line" data-semantic="bootstrap-interval"/>
         <circle cx="${85 + ((state.interval[1] - result.minimum) / (result.maximum - result.minimum || 1)) * 590}" cy="278" r="6" class="estimate-point"/>`
      : "";
    return svg(`
      <line x1="75" y1="248" x2="695" y2="248" class="axis"/>
      ${bars}
      <path d="${linePath(curvePoints)}" class="motion-line normal-curve" data-semantic="normal-curve"/>
      ${interval}
      <text x="85" y="296">${number(result.minimum)}</text>
      <text x="675" y="296" text-anchor="end">${number(result.maximum)}</text>
    `, state.label, lesson.visual.kind);
  }

  function renderTimelineVisual(lesson, state) {
    const cells = state.bars.map((item, index) => {
      const x = 72 + (index % 6) * 108;
      const y = 68 + Math.floor(index / 6) * 108;
      return `<g class="timeline-cell" style="--delay:${index * 32}ms">
        <rect x="${x}" y="${y}" width="88" height="68" rx="10" class="month-window"/>
        <text x="${x + 44}" y="${y + 27}" text-anchor="middle">${item.label}</text>
        <text x="${x + 44}" y="${y + 51}" text-anchor="middle" class="label-strong">${item.display}</text>
      </g>`;
    }).join("");
    return svg(cells, state.label, "event-windows");
  }

  function renderDotplotVisual(lesson, state) {
    if (lesson.visual.kind === "selection-frame") {
      const cards = state.bars.map((item, index) => `
        <g class="selection-card">
          <rect x="${105 + index * 300}" y="82" width="250" height="135" rx="16" class="${index ? "selection-active" : "selection-base"}"/>
          <text x="${230 + index * 300}" y="126" text-anchor="middle">${item.label}</text>
          <text x="${230 + index * 300}" y="174" text-anchor="middle" class="value-large">${item.display}</text>
        </g>`).join("");
      return svg(`${cards}<text x="380" y="265" text-anchor="middle">La regla de selección cambia qué observaciones representan la estimación</text>`, state.label, "selection-frame");
    }
    const values = state.bars.map((item) => Number(item.value));
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const x = (value) => 100 + ((value - minimum) / (maximum - minimum || 1)) * 560;
    const dots = values.map((value, index) =>
      `<circle cx="${x(value)}" cy="${125 + (index % 3) * 35}" r="10" class="estimate-dot" style="--delay:${index * 55}ms"/>
       <text x="${x(value)}" y="235" text-anchor="middle">${state.bars[index].label}</text>`
    ).join("");
    return svg(`<line x1="90" y1="190" x2="670" y2="190" class="axis"/>${dots}`, state.label, "sampling-dotplot");
  }

  function renderRunningMeanVisual(state) {
    const values = state.series;
    const minimum = Math.min(...values, state.reference);
    const maximum = Math.max(...values, state.reference);
    const x = (index) => 75 + (index / Math.max(1, values.length - 1)) * 620;
    const y = (value) => 255 - ((value - minimum) / (maximum - minimum || 1)) * 185;
    const points = values.map((value, index) => [x(index), y(value)]);
    return svg(`
      <line x1="65" y1="${y(state.reference)}" x2="705" y2="${y(state.reference)}" class="reference-line"/>
      <path d="${linePath(points)}" class="motion-line running-mean" data-semantic="running-mean"/>
      <text x="690" y="${y(state.reference) - 8}" text-anchor="end">Media del snapshot ${number(state.reference)}</text>
      <text x="75" y="292">1</text><text x="690" y="292" text-anchor="end">n=${values.length}</text>
    `, state.label, "running-mean-chart");
  }

  function renderIntervalVisual(lesson, state) {
    if (state.interval) {
      const all = lesson.visual.states.flatMap((item) => item.interval || []);
      const minimum = Math.min(...all);
      const maximum = Math.max(...all);
      const x = (value) => 105 + ((value - minimum) / (maximum - minimum || 1)) * 550;
      return svg(`
        <line x1="90" y1="180" x2="670" y2="180" class="axis"/>
        <line x1="${x(state.interval[0])}" y1="180" x2="${x(state.interval[2])}" y2="180"
          class="interval-line" data-semantic="confidence-interval"/>
        <line x1="${x(state.interval[0])}" y1="160" x2="${x(state.interval[0])}" y2="200" class="interval-cap"/>
        <line x1="${x(state.interval[2])}" y1="160" x2="${x(state.interval[2])}" y2="200" class="interval-cap"/>
        <circle cx="${x(state.interval[1])}" cy="180" r="8" class="estimate-point"/>
        <text x="${x(state.interval[0])}" y="225" text-anchor="middle">${number(state.interval[0])}</text>
        <text x="${x(state.interval[1])}" y="145" text-anchor="middle">Media ${number(state.interval[1])}</text>
        <text x="${x(state.interval[2])}" y="225" text-anchor="middle">${number(state.interval[2])}</text>
      `, state.label, "interval-scale");
    }
    const maximum = Math.max(...state.bars.map((item) => item.value));
    const whiskers = state.bars.map((item, index) => {
      const half = 240 * item.value / maximum;
      const y = 120 + index * 90;
      return `<line x1="${380 - half}" y1="${y}" x2="${380 + half}" y2="${y}" class="interval-line"/>
        <line x1="${380 - half}" y1="${y - 12}" x2="${380 - half}" y2="${y + 12}" class="interval-cap"/>
        <line x1="${380 + half}" y1="${y - 12}" x2="${380 + half}" y2="${y + 12}" class="interval-cap"/>
        <circle cx="380" cy="${y}" r="6" class="estimate-point"/>
        <text x="90" y="${y + 5}">${item.label}</text><text x="670" y="${y + 5}" text-anchor="end">${item.display}</text>`;
    }).join("");
    return svg(whiskers, state.label, "standard-error");
  }

  function normalCurve(center, spread, xScale, yScale) {
    return Array.from({ length: 100 }, (_, index) => {
      const value = -4 + (index / 99) * 8;
      return [xScale(value), yScale(gaussian(value, center, spread))];
    });
  }

  function areaPath(center, spread, start, end, xScale, yScale) {
    const values = Array.from({ length: 70 }, (_, index) => start + (index / 69) * (end - start));
    const top = values.map((value) => [xScale(value), yScale(gaussian(value, center, spread))]);
    return `M${xScale(start)},255 ${top.map(([x, y]) => `L${x},${y}`).join(" ")} L${xScale(end)},255 Z`;
  }

  function renderHypothesisVisual(lesson, state) {
    const x = (value) => 70 + ((value + 4) / 8) * 620;
    const y = (value) => 255 - value * 190;
    const nullPath = linePath(normalCurve(0, 1, x, y));
    let content = `<line x1="60" y1="255" x2="700" y2="255" class="axis"/>
      <path d="${nullPath}" class="motion-line null-curve" data-semantic="null-curve"/>`;
    if (lesson.id === "hypothesis") {
      const threshold = clamp((state.observed || 1) / 500, .8, 2.6);
      content += `<line x1="${x(threshold)}" y1="68" x2="${x(threshold)}" y2="255" class="observed-line"/>
        <text x="${x(threshold)}" y="54" text-anchor="middle">Observado</text>`;
    } else if (lesson.id === "p-value") {
      const sd = Math.sqrt(state.series.reduce((sum, value) => sum + value ** 2, 0) / state.series.length) || 1;
      const threshold = clamp(state.observed / sd, .7, 3.2);
      if (visualStep > 0) {
        content += `<path d="${areaPath(0, 1, threshold, 4, x, y)}" class="tail-area" data-semantic="tail-area"/>
          <path d="${areaPath(0, 1, -4, -threshold, x, y)}" class="tail-area" data-semantic="tail-area"/>`;
      }
      content += `<line x1="${x(threshold)}" y1="85" x2="${x(threshold)}" y2="255" class="observed-line"/>
        <line x1="${x(-threshold)}" y1="85" x2="${x(-threshold)}" y2="255" class="observed-line"/>
        <text x="${x(threshold)}" y="72" text-anchor="middle">|observado|</text>`;
    } else if (lesson.id === "type-i-error") {
      const alpha = state.bars[0].value;
      const threshold = alpha <= .011 ? 2.326 : 1.282;
      content += `<path d="${areaPath(0, 1, threshold, 4, x, y)}" class="tail-area" data-semantic="rejection-area"/>
        <line x1="${x(threshold)}" y1="92" x2="${x(threshold)}" y2="255" class="observed-line"/>
        <text x="${x(threshold)}" y="78" text-anchor="middle">α=${state.bars[0].display}</text>`;
    } else {
      const alternativeCenter = visualStep ? 1.8 : 1.05;
      const alternativePath = linePath(normalCurve(alternativeCenter, 1, x, y));
      const threshold = .85;
      const showPower = lesson.id === "power";
      content += `<path d="${alternativePath}" class="motion-line alternative-curve" data-semantic="alternative-curve"/>
        <path d="${areaPath(alternativeCenter, 1, showPower ? threshold : -4, showPower ? 4 : threshold, x, y)}"
          class="${showPower ? "power-area" : "beta-area"}" data-semantic="${showPower ? "power-area" : "beta-area"}"/>
        <line x1="${x(threshold)}" y1="78" x2="${x(threshold)}" y2="255" class="decision-line"/>
        <text x="${x(threshold)}" y="64" text-anchor="middle">umbral</text>`;
    }
    return svg(content, state.label, lesson.visual.kind);
  }

  function renderVisual() {
    const lesson = currentModule.lessons[lessonIndex];
    const states = lesson.visual.states;
    const state = states[visualStep];
    const previous = visualStep ? states[visualStep - 1] : state;
    let chart = "";
    if (["set", "set-rate", "nested-set"].includes(lesson.visual.kind)) chart = renderSetVisual(lesson, state, previous);
    else if (["trials", "trials-count"].includes(lesson.visual.kind)) chart = renderTrialsVisual(lesson, state);
    else if (["distribution-curve", "resample-distribution"].includes(lesson.visual.kind)) chart = renderDistributionVisual(lesson, state);
    else if (lesson.visual.kind === "event-timeline") chart = renderTimelineVisual(lesson, state);
    else if (["dotplot", "selection-frame"].includes(lesson.visual.kind)) chart = renderDotplotVisual(lesson, state);
    else if (lesson.visual.kind === "running-mean") chart = renderRunningMeanVisual(state);
    else if (lesson.visual.kind === "interval") chart = renderIntervalVisual(lesson, state);
    else chart = renderHypothesisVisual(lesson, state);
    registerEvidence(state);
    const evidence = state.marks.map((mark) =>
      `<span data-evidence-id="${mark.evidenceId}"><b>${mark.label}</b>${mark.value ? ` · ${mark.value}` : ""}</span>`
    ).join("");
    $("#visual").innerHTML = `
      <p class="visual-cue">${lesson.visual.cue}</p>
      <div class="state-title"><strong>${state.label}</strong><span>${state.summary}</span></div>
      <div class="visual-stage" data-kind="${lesson.visual.kind}">${chart}</div>
      <div class="markers">${state.markers.map((marker) => `<span>${marker}</span>`).join("")}</div>
      <div class="evidence-strip" aria-label="Evidencia visible">${evidence}</div>
      <p class="sample-note">${state.note}</p>`;
    updateProgress(lesson);
  }

  function renderExercise() {
    const lesson = currentModule.lessons[lessonIndex];
    const exercise = lesson.exercises[exerciseIndex];
    const story = lesson.practiceStory.cases[exerciseIndex];
    const ready = evidenceReady(exercise);
    $$(".exercise-tabs button").forEach((button) => button.classList.toggle("active", +button.dataset.exercise === exerciseIndex));
    $("#practiceStory").innerHTML = `
      <p class="story-kicker">${story.storyTitle}</p>
      <h3>${story.protagonist}</h3>
      <p>${story.context}. ${story.problem} ${story.pressure}.</p>
      <p><strong>Decisión:</strong> ${story.decision}.</p>
      <p><strong>Evidencia narrativa:</strong> ${story.evidence || lesson.practiceStory.evidence}</p>
      <ol>${story.scenes.map((scene) => `<li>${scene}</li>`).join("")}</ol>
      <details class="practice-hints"><summary>Pistas graduadas</summary><ul>${lesson.practiceStory.hints.map((hint) => `<li>${hint}</li>`).join("")}</ul></details>
      <p><strong>Regla de feedback:</strong> ${story.feedbackRule}</p>
      <p><strong>Transferencia:</strong> ${story.transfer}</p>
      <p class="story-close">${ready ? story.closing : `Completa ${exercise.evidenceContract.requiredSteps} paso(s) y revela todas las marcas requeridas antes de responder.`}</p>`;
    $("#exerciseEvidence").textContent = `Evidencia: ${exercise.evidence}`;
    $("#question").textContent = exercise.question;
    const offset = (lessonIndex + exerciseIndex) % exercise.options.length;
    const options = [...exercise.options.slice(offset), ...exercise.options.slice(0, offset)];
    $("#options").innerHTML = options.map((option, index) => `
      <button class="option" data-correct="${option.correct}" data-feedback="${encodeURIComponent(option.feedback)}" ${ready ? "" : "disabled"}>
        <span>${String.fromCharCode(65 + index)}</span>${option.text}
      </button>`).join("");
    $("#hintText").hidden = true;
    $("#hintText").textContent = exercise.hint;
    $("#hint").textContent = "Mostrar pista";
    $("#feedback").className = "feedback";
    $("#feedback p").textContent = ready
      ? "Selecciona una respuesta y justifícala con la evidencia visual."
      : `Avanza hasta ${$("#visualProgress").textContent.replace(String(visualStep + 1), String(exercise.evidenceContract.unlockAtStep + 1))} para completar la evidencia.`;
    bindExercise();
  }

  function renderTeacher() {
    const lesson = currentModule.lessons[lessonIndex];
    if (!teacherEnabled && teacherMode === "live") teacherMode = "learn";
    $$(".teacher-tabs button").forEach((button) => {
      if (button.dataset.mode === "live") button.hidden = !teacherEnabled;
      button.classList.toggle("active", button.dataset.mode === teacherMode);
    });
    if (teacherMode === "learn") {
      $("#teacherContent").innerHTML = `
        <p class="teacher-lead">Fuente conceptual</p>
        <section><h2>Definición</h2><p>${lesson.definition}</p></section>
        <section><h2>Intuición</h2><p>${lesson.intuition}</p></section>
        <section><h2>Error común</h2><p>${lesson.error}</p></section>
        <section><h2>Límite</h2><p>El laboratorio enseña razonamiento inferencial; no convierte evidencia observacional en causalidad.</p></section>`;
      return;
    }
    if (teacherMode === "practice") {
      const story = lesson.practiceStory.cases[exerciseIndex];
      $("#teacherContent").innerHTML = `
        <p class="teacher-lead">Storytelling de práctica</p>
        <section><h2>Protagonista</h2><p>${story.protagonist}</p></section>
        <section><h2>Presión realista</h2><p>${story.pressure}</p></section>
        <section><h2>Decisión</h2><p>${story.decision}</p></section>
        <section><h2>Evidencia y pistas</h2><p>${story.evidence}</p><ul>${lesson.practiceStory.hints.map((hint) => `<li>${hint}</li>`).join("")}</ul></section>
        <section><h2>Feedback</h2><p>${story.feedbackRule}</p><p>${story.transfer}</p></section>`;
      return;
    }
    const live = lesson.liveTeachingPack;
    const tools = [
      ["Codex", lesson.prompts.codex, "Verifica código reproducible y cálculos."],
      ["Gemini", lesson.prompts.gemini, "Facilita preguntas y límites."],
      ["ChatGPT", lesson.prompts.chatgpt, "Revisa técnica y transferencia."]
    ];
    $("#teacherContent").innerHTML = `
      <p class="teacher-lead">Modo docente oculto. ${live.visibilityNotice}</p>
      <section><h2>Snapshot real</h2><p>${live.dataset.name}: ${live.dataset.rows.toLocaleString("es-MX")} filas, ${live.dataset.columns} columnas, licencia ${live.dataset.license}.</p><p>Fuente: ${live.dataset.source_page}</p><p>SHA-256: ${live.dataset.sha256}</p></section>
      <section><h2>Guion</h2><ol>${live.teacherScript.map((step) => `<li>${step}</li>`).join("")}</ol></section>
      <section><h2>Preguntas y evaluación</h2><ul>${live.socraticQuestions.map((question) => `<li>${question}</li>`).join("")}</ul><p><strong>Evaluación rápida:</strong> ${live.quickAssessment}</p></section>
      <section><h2>Checklist docente</h2><p><strong>Antes:</strong></p><ul>${live.beforeClassChecklist.map((item) => `<li>${item}</li>`).join("")}</ul><p><strong>Durante:</strong></p><ul>${live.duringClassChecklist.map((item) => `<li>${item}</li>`).join("")}</ul></section>
      <section><h2>Blueprint de demo</h2><p>${live.demoBlueprint}</p><p>${live.privacyProtocol}</p></section>
      ${tools.map(([name, prompt, role]) => `<section class="tool"><div><h2>${name}</h2><button class="copy" data-copy="${encodeURIComponent(prompt)}">${icon(icons.copy)} Copiar</button></div><p>${role}</p><pre>${prompt}</pre></section>`).join("")}
      <section class="offline"><h2>Plan offline</h2><p>${live.offlinePlan}</p><p>${live.humanCheck}</p></section>`;
    bindCopy();
  }

  function bindExercise() {
    $$(".option").forEach((button) => button.addEventListener("click", () => {
      $$(".option").forEach((item) => item.classList.remove("correct", "wrong"));
      const correct = button.dataset.correct === "true";
      button.classList.add(correct ? "correct" : "wrong");
      $("#feedback").className = `feedback ${correct ? "success" : "error"}`;
      $("#feedback p").textContent = decodeURIComponent(button.dataset.feedback);
    }));
  }

  function bindCopy() {
    $$(".copy").forEach((button) => button.addEventListener("click", async () => {
      const text = decodeURIComponent(button.dataset.copy);
      try { await navigator.clipboard.writeText(text); }
      catch {
        const area = document.createElement("textarea");
        area.value = text;
        document.body.append(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      button.textContent = "Copiado";
      setTimeout(() => (button.innerHTML = `${icon(icons.copy)} Copiar`), 1200);
    }));
  }

  function bindGlobal() {
    $("#runVisual").addEventListener("click", () => {
      const lesson = currentModule.lessons[lessonIndex];
      if (isAnimating || visualStep >= lesson.visual.states.length - 1) return;
      isAnimating = true;
      visualStep += 1;
      renderVisual();
      updateProgress(lesson);
      window.setTimeout(() => {
        isAnimating = false;
        renderExercise();
        updateProgress(lesson);
      }, reducedMotion ? 0 : lesson.visual.motion.durationMs);
    });
    $("#resetVisual").addEventListener("click", () => {
      visualStep = 0;
      visitedEvidence = new Set();
      isAnimating = false;
      renderVisual();
      renderExercise();
    });
    $("#previous").addEventListener("click", () => {
      lessonIndex = Math.max(0, lessonIndex - 1);
      renderLesson();
    });
    $("#next").addEventListener("click", () => {
      if (lessonIndex === currentModule.lessons.length - 1) location.href = "index.html";
      else { lessonIndex += 1; renderLesson(); }
    });
    $$(".exercise-tabs button").forEach((button) => button.addEventListener("click", () => {
        exerciseIndex = +button.dataset.exercise;
        visualStep = 0;
        visitedEvidence = new Set();
        isAnimating = false;
        renderVisual();
        renderExercise();
    }));
    $("#hint").addEventListener("click", () => {
      const hidden = $("#hintText").hidden;
      $("#hintText").hidden = !hidden;
      $("#hint").textContent = hidden ? "Ocultar pista" : "Mostrar pista";
    });
    $$(".teacher-tabs button").forEach((button) => button.addEventListener("click", () => {
      teacherMode = button.dataset.mode;
      renderTeacher();
    }));
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "t") {
        teacherEnabled = true;
        teacherMode = "live";
        renderTeacher();
      }
    });
  }

  if (!currentModule) throw new Error(`Bloque desconocido: ${moduleId}`);
  shell();
  bindGlobal();
  renderLesson();
})();