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
  let hasInteracted = false;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
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
        <a class="header-link" href="../../datasets/README.md">Fuentes y licencias</a>
      </header>
      <div class="layout">
        <nav class="module-nav" aria-label="Bloques del Nivel 3">
          <p>Probabilidad e inferencia</p>
          ${Object.values(modules).map((module) => `
            <a class="${module.id === moduleId ? "active" : ""}" href="${module.href}">
              <b>${module.number}</b><span>${module.title}</span>
            </a>`).join("")}
          <a class="portal-link" href="index.html">Volver al nivel</a>
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
    hasInteracted = false;
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
    $("#runVisual span").textContent = lesson.visual.action;
    $("#previous").disabled = lessonIndex === 0;
    $("#next").innerHTML = lessonIndex === currentModule.lessons.length - 1 ? `Volver al nivel ${icon(icons.next)}` : `Siguiente ${icon(icons.next)}`;
    renderVisual();
    renderExercise();
    renderTeacher();
  }

  function colorFor(name) {
    return { teal: "#087f7b", blue: "#285fb8", coral: "#d35a4a", muted: "#8a98a8" }[name] || "#087f7b";
  }

  function renderVisual() {
    const lesson = currentModule.lessons[lessonIndex];
    const states = lesson.visual.states;
    const state = states[visualStep % states.length];
    const max = Math.max(...state.bars.map((item) => Math.abs(item.value)), 1);
    const bars = state.bars.map((item, index) => {
      const height = Math.max(8, (Math.abs(item.value) / max) * 205);
      const x = 70 + index * (620 / Math.max(1, state.bars.length));
      const width = Math.max(30, 620 / Math.max(1, state.bars.length) - 12);
      return `<g>
        <rect x="${x}" y="${260 - height}" width="${width}" height="${height}" fill="${colorFor(item.color)}" rx="4">
          <animate attributeName="height" from="1" to="${height}" dur=".45s" fill="freeze"/>
          <animate attributeName="y" from="260" to="${260 - height}" dur=".45s" fill="freeze"/>
        </rect>
        <text x="${x + width / 2}" y="${248 - height}" text-anchor="middle">${item.display}</text>
        <text x="${x + width / 2}" y="286" text-anchor="middle">${item.label}</text>
      </g>`;
    }).join("");
    $("#visual").innerHTML = `
      <p class="visual-cue">${lesson.visual.cue}</p>
      <div class="state-title"><strong>${state.label}</strong><span>${state.summary}</span></div>
      <svg class="chart" viewBox="0 0 760 320" role="img" aria-label="${state.label}">
        <line x1="50" y1="260" x2="720" y2="260" class="axis"/>
        ${bars}
      </svg>
      <div class="markers">${state.markers.map((marker) => `<span>${marker}</span>`).join("")}</div>
      <p class="sample-note">${state.note}</p>`;
  }

  function renderExercise() {
    const lesson = currentModule.lessons[lessonIndex];
    const exercise = lesson.exercises[exerciseIndex];
    const story = lesson.practiceStory.cases[exerciseIndex];
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
      <p class="story-close">${hasInteracted ? story.closing : "Primero revela la evidencia; las opciones permanecen bloqueadas hasta entonces."}</p>`;
    $("#exerciseEvidence").textContent = `Evidencia: ${exercise.evidence}`;
    $("#question").textContent = exercise.question;
    const offset = (lessonIndex + exerciseIndex) % exercise.options.length;
    const options = [...exercise.options.slice(offset), ...exercise.options.slice(0, offset)];
    $("#options").innerHTML = options.map((option, index) => `
      <button class="option" data-correct="${option.correct}" data-feedback="${encodeURIComponent(option.feedback)}" ${hasInteracted ? "" : "disabled"}>
        <span>${String.fromCharCode(65 + index)}</span>${option.text}
      </button>`).join("");
    $("#hintText").hidden = true;
    $("#hintText").textContent = exercise.hint;
    $("#hint").textContent = "Mostrar pista";
    $("#feedback").className = "feedback";
    $("#feedback p").textContent = hasInteracted ? "Selecciona una respuesta y justifícala con la evidencia visual." : `Ejecuta «${lesson.visual.action}» antes de responder.`;
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
      visualStep += 1;
      hasInteracted = true;
      renderVisual();
      renderExercise();
    });
    $("#resetVisual").addEventListener("click", () => {
      visualStep = 0;
      hasInteracted = false;
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
      hasInteracted = false;
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