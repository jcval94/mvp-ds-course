(function () {
  const modules = window.DCF_MODULES;
  const moduleId = document.body.dataset.module;
  const currentModule = modules[moduleId];
  let lessonIndex = 0;
  let teacherEnabled = true;
  let teacherMode = "live";
  let animationStep = 0;
  let hasInteracted = false;
  let visitedEvidence = new Set();
  let isAnimating = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const people = [
    ["101", "28", "Femenino", "42,500", "Bogotá"],
    ["102", "35", "Masculino", "55,000", "Medellín"],
    ["103", "22", "Femenino", "31,200", "Cali"],
    ["104", "42", "Masculino", "—", "Barranquilla"],
    ["105", "29", "Femenino", "47,800", "Bucaramanga"]
  ];
  const qualityRows = [
    ["1001", "25", "Femenino", "Bogotá", "4", "18"],
    ["1002", "34", "Masculino", "Medellín", "5", "12"],
    ["1003", "—", "Femenino", "Cali", "3", "25"],
    ["1004", "29", "Masculino", "Bogotá", "—", "30"],
    ["1002", "34", "Masculino", "Medellín", "5", "12"],
    ["1005", "-5", "Femenino", "Barranquilla", "2", "40"],
    ["1006", "41", "Masculino", "Cali", "4", "45"],
    ["1007", "120", "Femenino", "Bogotá", "3", "60"]
  ];
  const orders = [
    ["P-01", "Café", "2", "90"],
    ["P-02", "Té", "1", "55"],
    ["P-03", "Café", "4", "180"],
    ["P-04", "Pan", "3", "105"],
    ["P-05", "Té", "3", "165"],
    ["P-06", "Pan", "1", "35"]
  ];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const homeHref = () =>
    location.pathname.includes("/labs/level-") ? "../../index.html" : "../../site/index.html";
  const displayOptions = (options) => {
    const indexed = options.map((item, sourceIndex) => ({ item, sourceIndex }));
    const offset = (lessonIndex + currentModule.number - 1) % indexed.length;
    return [...indexed.slice(offset), ...indexed.slice(0, offset)];
  };
  const icon = (name) => {
    const paths = {
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
      help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.8 2.8 0 1 1 4.8 2c-1.2 1-2.3 1.5-2.3 3"/><path d="M12 18h.01"/>',
      chevronLeft: '<path d="m15 18-6-6 6-6"/>',
      chevronRight: '<path d="m9 18 6-6-6-6"/>',
      play: '<path d="m8 5 11 7-11 7Z"/>',
      rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
      copy: '<rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
      check: '<path d="m20 6-11 11-5-5"/>',
      table: '<path d="M3 3h18v18H3z"/><path d="M3 9h18M3 15h18M9 3v18"/>',
      shapes: '<circle cx="6" cy="6" r="3"/><path d="M14 3h7v7h-7zM4 15l4 6H0zM15 15l6 6M21 15l-6 6"/>',
      database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
      wrench: '<path d="M14.7 6.3a4 4 0 0 0-5-5l2.2 2.2-2.8 2.8-2.2-2.2a4 4 0 0 0 5 5l7.4 7.4a2 2 0 0 1-2.8 2.8l-7.4-7.4"/>'
    };
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.help}</svg>`;
  };

  function renderShell() {
    $("#app").innerHTML = `
      <header class="app-header">
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
          <strong>DataClass Forge</strong><span class="level-name">Nivel 1: Fundamentos</span>
        </a>
        <div class="header-actions">
          <a class="utility-btn home-btn" data-home-link href="${homeHref()}">HOME</a>
          <a class="utility-btn" href="README.md">${icon("book")}<span>Guía</span></a>
          <button class="utility-btn" id="helpButton">${icon("help")}<span>Ayuda</span></button>
        </div>
      </header>
      <div class="app-layout">
        <aside class="sidebar">
          <p class="sidebar-title">Módulos</p>
          ${Object.values(modules).map(module => `
            <a class="module-link ${module.id === moduleId ? "active" : ""}" href="${module.href}">
              <span class="module-number">${module.number}</span>
              <span class="module-label">${module.title}</span>
            </a>`).join("")}
          <div class="sidebar-footer">
            <a class="module-link" href="index.html">${icon("book")}<span class="module-label">Volver al nivel</span></a>
            <a class="module-link home-sidebar-link" data-home-link href="${homeHref()}"><span class="module-number">H</span><span class="module-label">HOME</span></a>
          </div>
        </aside>
        <main class="main-stage">
          <div class="lesson-toolbar">
            <span class="lesson-count"></span>
            <div class="stepper"></div>
            <div class="toolbar-nav">
              <button class="icon-btn" id="prevLesson" title="Lección anterior" aria-label="Lección anterior">${icon("chevronLeft")}</button>
              <button class="secondary-btn" id="nextLesson">Siguiente ${icon("chevronRight")}</button>
            </div>
          </div>
          <section class="lesson-intro"><h1></h1><p></p></section>
          <section class="visual-shell">
            <div class="visual-toolbar">
              <span class="visual-title"></span>
              <span id="visualProgress" class="visual-progress"></span>
              <button class="secondary-btn" id="resetVisual">${icon("rotate")} Reiniciar</button>
              <button class="primary-btn" id="animateVisual">${icon("play")} <span></span></button>
            </div>
            <div class="visual-area" id="visualArea"></div>
            <div class="practice-panel">
              <div class="question"><h2>Decisión basada en evidencia</h2><div class="practice-story"></div><p></p><div class="options"></div></div>
              <div class="feedback"><h2>Retroalimentación</h2><p>Selecciona una respuesta y revisa la evidencia visual.</p></div>
            </div>
          </section>
        </main>
        <aside class="teacher-panel">
          <div class="teacher-tabs">
            <button class="teacher-tab" data-mode="learn">Aprender</button>
            <button class="teacher-tab" data-mode="practice">Ejercitar</button>
            <button class="teacher-tab active" data-mode="live">En vivo</button>
          </div>
          <div class="teacher-content"></div>
        </aside>
      </div>`;
  }

  function renderLesson() {
    animationStep = 0;
    hasInteracted = false;
    visitedEvidence = new Set();
    isAnimating = false;
    const lesson = currentModule.lessons[lessonIndex];
    document.title = `${lesson.title} | DataClass Forge`;
    $(".lesson-count").textContent = `Módulo ${currentModule.number} de 4 · Lección ${lessonIndex + 1} de ${currentModule.lessons.length}`;
    $(".stepper").innerHTML = currentModule.lessons.map((item, index) => `
      <span class="step ${index === lessonIndex ? "active" : ""} ${index < lessonIndex ? "done" : ""}">
        <button data-lesson="${index}" title="${item.title}">${index + 1}</button>
      </span>`).join("");
    $(".lesson-intro h1").textContent = lesson.title;
    $(".lesson-intro p").textContent = lesson.objective;
    $(".visual-title").textContent = currentModule.datasetName;
    $("#prevLesson").disabled = lessonIndex === 0;
    $("#nextLesson").innerHTML = lessonIndex === currentModule.lessons.length - 1 ? `Volver al portal ${icon("chevronRight")}` : `Siguiente ${icon("chevronRight")}`;
    renderVisual(lesson);
    renderPractice(lesson);
    renderTeacher(lesson);
    bindLessonEvents();
  }

  function renderPractice(lesson) {
    const story = lesson.practiceStory.cases[0];
    const ready = evidenceReady(lesson.practice);
    $(".practice-story").innerHTML = `<p class="story-kicker">${story.storyTitle}</p>
      <strong>${story.protagonist}</strong>
      <p>${story.context}. ${story.problem} ${story.pressure}.</p>
      <p><b>Decisión:</b> ${story.decision}.</p>
      <p><b>Evidencia:</b> ${story.evidence || lesson.practiceStory.evidence}</p>
      <ol>${story.scenes.map(scene => `<li>${scene}</li>`).join("")}</ol>
      <details class="practice-hints"><summary>Pistas graduadas</summary><ul>${lesson.practiceStory.hints.map(hint => `<li>${hint}</li>`).join("")}</ul></details>
      <p class="story-close">${ready ? story.closing : "Primero completa el contrato de evidencia; las respuestas están bloqueadas hasta ver ambos estados."}</p>`;
    $(".question > p").textContent = lesson.practice.question;
    $(".options").innerHTML = displayOptions(lesson.practice.options).map(({ item, sourceIndex }, displayIndex) => `
      <button class="option" data-option="${sourceIndex}" ${ready ? "" : "disabled"}><span class="option-dot"></span><span>${String.fromCharCode(65 + displayIndex)}. ${item.text}</span></button>`).join("");
    $(".feedback").className = "feedback";
    $(".feedback h2").textContent = "Retroalimentación";
    $(".feedback p").textContent = ready ? "Selecciona una respuesta y revisa la evidencia visual." : `Avanza al paso ${lesson.practice.evidenceContract.unlockAtStep + 1} antes de responder.`;
    bindOptionEvents();
  }

  function tableMarkup(rows, headers, className = "") {
    return `<table class="data-table ${className}"><thead><tr><th>Observación</th>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row, r) => `<tr data-row="${r}"><td>Persona ${r + 1}</td>${row.map((cell, c) => `<td style="--i:${r * row.length + c}" data-col="${c}">${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function renderVisual(lesson) {
    const area = $("#visualArea");
    const visual = lesson.visual;
    if (visual.type === "table") {
      area.innerHTML = `<p class="cue">${visual.cue}</p>${tableMarkup(people, ["ID", "Edad", "Género", "Ingresos", "Ciudad"], visual.focus === "grid" ? "grid-active" : "")}<div id="calloutLayer"></div>`;
    } else if (visual.type === "population") {
      area.innerHTML = `<p class="cue">${visual.cue}</p><div class="population-grid">${Array.from({length: 40}, (_, i) => `<span class="person-dot" data-person="${i}"></span>`).join("")}</div><p class="cue" style="text-align:center">40 personas representan la población del campus. Usa el control para observar el subconjunto.</p>`;
      applyPopulationState(lesson);
    } else if (visual.type === "sorter") {
      const tokens = ["ID 104", "28 páginas", "Ficción", "Alto", "2026-06-14", "Reseña abierta", "Código 55021"];
      area.innerHTML = `<p class="cue">${visual.cue}</p><div class="sorter"><div><strong>Variables disponibles</strong><div class="token-bank">${tokens.map((t, i) => `<button class="data-token" data-token="${i}">${t}</button>`).join("")}</div></div><div class="drop-zones"><div class="drop-zone"><strong>Numérica</strong></div><div class="drop-zone"><strong>Categórica</strong></div><div class="drop-zone"><strong>Ordinal</strong></div><div class="drop-zone"><strong>Fecha</strong></div><div class="drop-zone"><strong>Texto</strong></div></div></div>`;
    } else if (visual.type === "timeline") {
      area.innerHTML = `<p class="cue">${visual.cue}</p><div class="timeline"><span class="timeline-event" style="left:72%"><span>2026-05-20</span></span><span class="timeline-event" style="left:22%"><span>2026-03-02</span></span><span class="timeline-event" style="left:48%"><span>2026-04-11</span></span></div><p class="cue" style="text-align:center">Las fechas están desordenadas. Inicia la animación para ubicarlas cronológicamente.</p>`;
    } else if (visual.type === "text") {
      area.innerHTML = `<p class="cue">${visual.cue}</p><div class="text-lab"><div class="review-box"><strong>Reseña original</strong><p>“La atención fue RÁPIDA, amable y muy clara. Volvería mañana.”</p></div><div class="review-box word-cloud"><span class="word">atención</span><span class="word">rápida</span><span class="word">amable</span><span class="word">clara</span><span class="word">volvería</span></div></div>`;
    } else if (visual.type === "quality") {
      area.innerHTML = `<p class="cue">${visual.cue}</p>${qualityTable(lesson.visual.focus)}<div class="quality-status"><span>Faltantes: 2</span><span>Duplicados: 1 par</span><span>Rangos inválidos: 2</span><span>Posible sesgo: 1</span></div><span class="scan-line" aria-hidden="true"></span>`;
    } else if (visual.type === "prepare") {
      area.innerHTML = `<p class="cue">${visual.cue}</p>${prepareTable(orders)}<div id="prepareSummary" class="quality-status"></div>`;
    }
    registerEvidence(lesson, 0);
    renderEvidenceStrip(lesson, 0);
    updateProgress(lesson);
  }

  function evidenceReady(practice) {
    const contract = practice.evidenceContract;
    return animationStep >= contract.unlockAtStep &&
      contract.requiredEvidenceIds.every(evidenceId => visitedEvidence.has(evidenceId));
  }

  function registerEvidence(lesson, step) {
    lesson.visual.states[step].marks.forEach(mark => visitedEvidence.add(mark.evidenceId));
  }

  function renderEvidenceStrip(lesson, step) {
    const existing = $("#visualEvidence");
    if (existing) existing.remove();
    const state = lesson.visual.states[step];
    $("#visualArea").insertAdjacentHTML("beforeend",
      `<div id="visualEvidence" class="evidence-strip">${state.marks.map(mark =>
        `<span data-evidence-id="${mark.evidenceId}"><b>${mark.label}</b></span>`
      ).join("")}</div>`);
  }

  function updateProgress(lesson) {
    const total = lesson.visual.states.length;
    const atEnd = animationStep >= total - 1;
    $("#visualProgress").textContent = `Paso ${animationStep + 1} de ${total}`;
    $("#animateVisual span").textContent = atEnd ? "Evidencia completa" : lesson.visual.action;
    $("#animateVisual").disabled = isAnimating || atEnd;
  }

  function qualityTable(focus) {
    const headers = ["ID", "Edad", "Género", "Ciudad", "Satisfacción", "Espera"];
    return `<table class="data-table"><thead><tr><th>#</th>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>
      ${qualityRows.map((row, r) => {
        const duplicate = r === 4 ? "issue-duplicate" : "";
        return `<tr class="${focus === "duplicates" ? duplicate : ""}">${[`<td>${r + 1}</td>`].concat(row.map((cell, c) => {
          let cls = "";
          if (focus === "missing" && cell === "—") cls = "issue-missing";
          if (focus === "invalid" && c === 1 && (cell === "-5" || cell === "120")) cls = "issue-invalid";
          if (focus === "bias" && c === 5) cls = "issue-bias";
          return `<td class="${cls}">${cell}</td>`;
        })).join("")}</tr>`;
      }).join("")}
    </tbody></table>`;
  }

  function prepareTable(rows) {
    return `<table class="data-table"><thead><tr><th>Pedido</th><th>Producto</th><th>Cantidad</th><th>Total (MXN)</th></tr></thead><tbody>
      ${rows.map((row, r) => `<tr class="prepare-row" data-total="${row[3]}" data-product="${row[1]}">${row.map((cell, c) => `<td class="${c === 3 ? "transform-value" : ""}">${cell}</td>`).join("")}</tr>`).join("")}
    </tbody></table>`;
  }

  function applyPopulationState(lesson) {
    const dots = $$(".person-dot");
    dots.forEach((dot, index) => {
      dot.className = "person-dot";
      if (lesson.visual.focus === "sample") {
        if ([1, 6, 9, 13, 18, 22, 27, 31, 35, 38].includes(index)) dot.classList.add("active");
        else dot.classList.add("dim");
      }
    });
  }

  function animateVisual() {
    const lesson = currentModule.lessons[lessonIndex];
    if (isAnimating || animationStep >= lesson.visual.states.length - 1) return;
    isAnimating = true;
    const area = $("#visualArea");
    animationStep += 1;
    if (lesson.visual.type === "table") {
      const rows = $$(".data-table tbody tr");
      const cells = $$(".data-table td, .data-table th");
      rows.forEach(row => row.classList.remove("highlight-row"));
      cells.forEach(cell => cell.classList.remove("highlight-col"));
      $("#calloutLayer").innerHTML = "";
      if (lesson.visual.focus === "rows") {
        rows[(animationStep - 1) % rows.length].classList.add("highlight-row");
        $("#calloutLayer").innerHTML = '<span class="callout" style="left:5px;top:120px">observación → fila completa</span>';
      } else if (lesson.visual.focus === "columns") {
        const col = (animationStep - 1) % 5;
        $$(`[data-col="${col}"]`).forEach(cell => cell.classList.add("highlight-col"));
        $("#calloutLayer").innerHTML = '<span class="callout" style="right:12px;top:18px">variable → columna</span>';
      } else {
        $(".data-table").classList.remove("grid-active");
        void $(".data-table").offsetWidth;
        $(".data-table").classList.add("grid-active");
      }
    } else if (lesson.visual.type === "population") {
      const dots = $$(".person-dot");
      dots.forEach((dot, index) => {
        dot.className = "person-dot";
        if (lesson.visual.focus === "sample") {
          if ([1, 6, 9, 13, 18, 22, 27, 31, 35, 38].includes(index)) dot.classList.add("active");
          else dot.classList.add("dim");
        } else if (index <= (animationStep * 8 - 1) % 40) dot.classList.add("active");
      });
    } else if (lesson.visual.type === "sorter") {
      const tokens = $$(".data-token");
      const targetMap = { numeric: 1, categorical: 2, ordinal: 3 };
      const matchedIndex = targetMap[lesson.visual.focus] ?? 0;
      tokens.forEach((token, index) => {
        token.className = "data-token";
        if (index === matchedIndex) token.classList.add("moving", "matched");
      });
    } else if (lesson.visual.type === "timeline") {
      const positions = ["15%", "50%", "84%"];
      $$(".timeline-event").forEach((event, index) => event.style.left = positions[index]);
    } else if (lesson.visual.type === "text") {
      $$(".word").forEach((word, index) => setTimeout(() => word.classList.toggle("pop"), index * 90));
    } else if (lesson.visual.type === "quality") {
      const line = $(".scan-line");
      if (line) {
        line.style.animation = "none";
        void line.offsetWidth;
        line.style.animation = "";
      }
      if (lesson.visual.focus === "duplicates") {
        const duplicate = $(".issue-duplicate");
        if (duplicate) duplicate.style.transform = animationStep % 2 ? "translateY(-5px)" : "";
      }
    } else if (lesson.visual.type === "prepare") {
      animatePreparation(lesson.visual.focus);
    }
    registerEvidence(lesson, animationStep);
    renderEvidenceStrip(lesson, animationStep);
    updateProgress(lesson);
    window.setTimeout(() => {
      isAnimating = false;
      hasInteracted = evidenceReady(lesson.practice);
      renderPractice(lesson);
      updateProgress(lesson);
    }, reducedMotion ? 0 : lesson.visual.motion.durationMs);
  }

  function animatePreparation(focus) {
    const rows = $$(".prepare-row");
    const summary = $("#prepareSummary");
    rows.forEach(row => {
      row.className = "prepare-row";
      row.style.transform = "";
      row.querySelectorAll(".transform-value").forEach(cell => cell.className = "transform-value");
    });
    summary.innerHTML = "";
    if (focus === "filter") {
      rows.forEach(row => { if (+row.dataset.total < 100) row.classList.add("filtered"); });
      summary.textContent = "Resultado: 4 de 6 pedidos cumplen Total ≥ 100.";
    } else if (focus === "sort") {
      [...rows].sort((a, b) => +b.dataset.total - +a.dataset.total).forEach((row, index) => {
        row.style.transform = `translateY(${(index - rows.indexOf(row)) * 43}px)`;
      });
      summary.textContent = "El contenido no cambia; solo cambia la posición visible.";
    } else if (focus === "group") {
      rows.forEach(row => row.classList.add("grouped"));
      summary.innerHTML = "<strong>Resumen:</strong> Café 6 unidades · Té 4 · Pan 4.";
    } else {
      rows.forEach(row => {
        const cell = row.querySelector(".transform-value");
        cell.textContent = (+row.dataset.total / 1000).toFixed(3);
        cell.classList.add("changed");
      });
      summary.textContent = "Nueva variable: Total_miles = Total / 1000. El original se conserva en el dataset.";
    }
  }

  function renderTeacher(lesson) {
    $$(".teacher-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.mode === teacherMode);
    });
    const content = $(".teacher-content");
    if (teacherMode === "learn") {
      content.innerHTML = `<p class="teacher-intro"><strong>Definición.</strong> ${lesson.definition}</p>
        <div class="tool-section"><div class="tool-head"><span class="tool-logo">I</span><strong>Intuición</strong></div><p class="teacher-cue">${lesson.intuition}</p></div>
        <div class="tool-section"><div class="tool-head"><span class="tool-logo">!</span><strong>Error común</strong></div><p class="teacher-cue">${lesson.error}</p></div>
        <div class="offline"><strong>Cierre docente:</strong> pide al estudiante explicar qué cambió en la evidencia y qué permaneció igual.</div>`;
      return;
    }
    if (teacherMode === "practice") {
      const story = lesson.practiceStory.cases[0];
      content.innerHTML = `<p class="teacher-intro">La práctica cuenta un caso distinto y debe resolverse observando la evidencia, no por memoria.</p>
        <div class="tool-section"><div class="tool-head"><span class="tool-logo">1</span><strong>Protagonista</strong></div><p class="teacher-cue">${story.protagonist}</p></div>
        <div class="tool-section"><div class="tool-head"><span class="tool-logo">2</span><strong>Presión</strong></div><p class="teacher-cue">${story.pressure}</p></div>
        <div class="tool-section"><div class="tool-head"><span class="tool-logo">3</span><strong>Escenas</strong></div><p class="teacher-cue">${story.scenes.join(" ")}</p></div>`;
      return;
    }
    const live = lesson.liveTeachingPack;
    const tools = [
      ["Codex", lesson.prompts.codex, "Genera una demo o script reproducible y verifica sus criterios."],
      ["Gemini", lesson.prompts.gemini, "Facilita preguntas socráticas sin sustituir el razonamiento del grupo."],
      ["ChatGPT", lesson.prompts.chatgpt, "Crea variaciones y preguntas; revisa exactitud antes de usarlas."]
    ];
    content.innerHTML = `<p class="teacher-intro">Modo En vivo visible temporalmente. ${live.visibilityNotice}</p>
      <section class="tool-section"><div class="tool-head"><span class="tool-logo">D</span><strong>Snapshot real</strong></div><p class="teacher-cue">${live.dataset.name}: ${live.dataset.rows.toLocaleString("es-MX")} filas, ${live.dataset.columns} columnas, licencia ${live.dataset.license}. Fuente: ${live.dataset.source_page}. SHA-256: ${live.dataset.sha256}</p></section>
      <section class="tool-section"><div class="tool-head"><span class="tool-logo">G</span><strong>Guion</strong></div><p class="teacher-cue">${live.teacherScript.join(" ")}</p></section>
      <section class="tool-section"><div class="tool-head"><span class="tool-logo">?</span><strong>Preguntas y evaluación</strong></div><p class="teacher-cue">${live.socraticQuestions.join(" ")}</p><p class="teacher-cue"><strong>Evaluación rápida:</strong> ${live.quickAssessment}</p></section>
      <section class="tool-section"><div class="tool-head"><span class="tool-logo">✓</span><strong>Checklist docente</strong></div><p class="teacher-cue"><strong>Antes:</strong> ${live.beforeClassChecklist.join(" ")}</p><p class="teacher-cue"><strong>Durante:</strong> ${live.duringClassChecklist.join(" ")}</p></section>
      ${tools.map(([name, prompt, cue], index) => `<section class="tool-section">
        <div class="tool-head"><span class="tool-logo">${index === 0 ? "&gt;_" : index === 1 ? "G" : "AI"}</span><strong>${name}</strong>
        <button class="copy-btn" data-copy="${encodeURIComponent(prompt)}">${icon("copy")} Copiar</button></div>
        <div class="prompt-box">${prompt}</div><p class="teacher-cue"><strong>Pista docente:</strong> ${cue}</p>
      </section>`).join("")}
      <div class="offline"><strong>Sin conexión: plan B.</strong> ${live.offlinePlan} ${live.humanCheck}</div>`;
    bindCopyButtons();
  }

  function bindOptionEvents() {
    $$(".option").forEach(button => button.addEventListener("click", () => {
      const lesson = currentModule.lessons[lessonIndex];
      const selected = lesson.practice.options[+button.dataset.option];
      $$(".option").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected", selected.correct ? "correct" : "wrong");
      const feedback = $(".feedback");
      feedback.className = `feedback ${selected.correct ? "success" : "error"}`;
      feedback.querySelector("h2").textContent = selected.correct ? "Correcto" : "Revisa la evidencia";
      feedback.querySelector("p").textContent = selected.feedback;
    }));
  }

  function bindLessonEvents() {
    $$(".step button").forEach(button => button.addEventListener("click", () => {
      lessonIndex = +button.dataset.lesson;
      renderLesson();
    }));
  }

  function bindCopyButtons() {
    $$(".copy-btn").forEach(button => button.addEventListener("click", async () => {
      const value = decodeURIComponent(button.dataset.copy);
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const input = document.createElement("textarea");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      button.innerHTML = `${icon("check")} Copiado`;
      setTimeout(() => button.innerHTML = `${icon("copy")} Copiar`, 1400);
    }));
  }

  function bindGlobalEvents() {
    $("#animateVisual").addEventListener("click", animateVisual);
    $("#resetVisual").addEventListener("click", () => renderLesson());
    $("#prevLesson").addEventListener("click", () => {
      lessonIndex = Math.max(0, lessonIndex - 1);
      renderLesson();
    });
    $("#nextLesson").addEventListener("click", () => {
      if (lessonIndex >= currentModule.lessons.length - 1) location.href = "index.html";
      else { lessonIndex += 1; renderLesson(); }
    });
    $$(".teacher-tab").forEach(tab => tab.addEventListener("click", () => {
      teacherMode = tab.dataset.mode;
      renderTeacher(currentModule.lessons[lessonIndex]);
    }));
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "t") {
        teacherMode = "live";
        renderTeacher(currentModule.lessons[lessonIndex]);
      }
    });
    $("#helpButton").addEventListener("click", () => {
      alert("Elige una lección, ejecuta la animación, responde con evidencia y usa el modo docente solo para preparar la clase en vivo.");
    });
  }

  if (!currentModule) throw new Error(`Módulo desconocido: ${moduleId}`);
  renderShell();
  bindGlobalEvents();
  renderLesson();
})();
