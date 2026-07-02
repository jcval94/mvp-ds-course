(function () {
  const data = window.DCF_LEVEL;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  let block = data.modules[document.body.dataset.module] || Object.values(data.modules)[0];
  let lesson = block.lessons.find(x => x.id === params.get("concept")) || block.lessons[0];
  let step = 0, exerciseIndex = 0, teacher = params.get("teacher") === "1";

  function shell() {
    document.body.innerHTML = `<header><a href="index.html" class="brand">DataClass Forge</a><div>Nivel ${data.level} · ${data.title}</div><a href="../../index.html">Portal</a></header>
      <main><aside class="nav"><h2>${block.title}</h2>${block.lessons.map(x => `<button data-id="${x.id}">${x.title}<small>${x.narrative.scene}</small></button>`).join("")}</aside>
      <section class="lesson"><div class="scene-card"><span id="sceneId"></span><strong id="sceneSetup"></strong><div class="dialogues"><p><b>Don Juan</b><span id="donJuan"></span></p><p><b>Paco</b><span id="paco"></span></p><p id="guestLine" hidden><b id="guestName"></b><span id="guestText"></span></p></div></div>
      <div class="subtitle" role="status" aria-live="polite"><span>Narrador · subtítulo</span><p id="subtitle"></p></div>
      <div class="title"><p id="episode"></p><h1 id="title"></h1><p id="objective"></p></div>
      <div class="workspace"><section class="visual"><div class="visual-head"><div><small id="stateLabel"></small><h2 id="stateSummary"></h2></div><span id="progress"></span></div><div id="bars" class="bars"></div><div id="markers" class="markers"></div><p id="note" class="note"></p><button id="advance" class="primary"></button></section>
      <section class="practice"><div class="tabs"><button data-ex="0">Guiado</button><button data-ex="1">Transferencia</button></div><h2 id="storyTitle"></h2><p id="storyContext"></p><p id="decision"></p><p id="evidence"></p><h3 id="question"></h3><div id="options"></div><button id="check" class="primary" disabled>Comprobar</button><p id="feedback" role="status"></p></section></div></section>
      <aside class="teacher"><div class="tabs"><button data-mode="learn">Aprender</button><button data-mode="practice">Ejercitar</button><button data-mode="live" ${teacher ? "" : "hidden"}>En vivo</button></div><div id="teacherContent"></div></aside></main>`;
    $$(".nav button").forEach(b => b.onclick = () => selectLesson(b.dataset.id));
    $$("[data-ex]").forEach(b => b.onclick = () => { exerciseIndex = Number(b.dataset.ex); step = 0; renderVisual(); renderPractice(); });
    $("#advance").onclick = () => { if (step < lesson.visual.states.length - 1) step++; else step = 0; renderVisual(); renderPractice(); };
    $("#check").onclick = check;
    $$('[data-mode]').forEach(b => b.onclick = () => renderTeacher(b.dataset.mode));
    render();
  }

  function selectLesson(id) {
    lesson = block.lessons.find(x => x.id === id); step = 0; exerciseIndex = 0;
    const q = new URLSearchParams(location.search); q.set("concept", id); if (teacher) q.set("teacher", "1"); history.replaceState(null, "", `?${q}`); render();
  }
  function render() {
    $$(".nav button").forEach(b => b.classList.toggle("active", b.dataset.id === lesson.id));
    $("#sceneId").textContent = lesson.narrative.scene; $("#sceneSetup").textContent = lesson.narrative.setup;
    $("#donJuan").textContent = lesson.narrative.donJuan; $("#paco").textContent = lesson.narrative.paco;
    const guest = lesson.narrative.guest; $("#guestLine").hidden = !guest; if (guest) { $("#guestName").textContent = guest.name; $("#guestText").textContent = guest.line; }
    $("#episode").textContent = lesson.narrative.episode; $("#title").textContent = lesson.title; $("#objective").textContent = lesson.objective;
    renderVisual(); renderPractice(); renderTeacher("learn");
  }
  function renderVisual() {
    const state = lesson.visual.states[step];
    $("#stateLabel").textContent = state.label; $("#stateSummary").textContent = state.summary; $("#progress").textContent = `${step + 1} / ${lesson.visual.states.length}`;
    $("#subtitle").textContent = lesson.narrative.subtitles[Math.min(step, lesson.narrative.subtitles.length - 1)];
    const max = Math.max(...state.bars.map(x => Math.abs(Number(x.value))), 1);
    $("#bars").innerHTML = state.bars.map(x => `<div class="bar-row"><span>${x.label}</span><i style="--w:${Math.max(4, Math.abs(Number(x.value)) / max * 100)}%"></i><b>${x.display}</b></div>`).join("");
    $("#markers").innerHTML = state.markers.map(x => `<span>${x}</span>`).join(""); $("#note").textContent = state.note;
    $("#advance").textContent = step < lesson.visual.states.length - 1 ? lesson.visual.action : "Reiniciar evidencia";
  }
  function renderPractice() {
    const ex = lesson.exercises[exerciseIndex], story = lesson.practiceStory.cases[exerciseIndex], ready = step >= ex.evidenceContract.unlockAtStep;
    $$('[data-ex]').forEach(b => b.classList.toggle("active", Number(b.dataset.ex) === exerciseIndex));
    $("#storyTitle").textContent = story.storyTitle; $("#storyContext").textContent = `${story.context}. ${story.pressure}`; $("#decision").innerHTML = `<b>Decisión:</b> ${story.decision}`; $("#evidence").innerHTML = `<b>Evidencia:</b> ${ex.evidence}`; $("#question").textContent = ex.question;
    $("#options").innerHTML = ex.options.map((o,i) => `<label><input type="radio" name="answer" value="${i}"> ${o.text}</label>`).join("");
    $("#check").disabled = !ready; $("#feedback").textContent = ready ? "La evidencia está completa: elige una opción." : `Recorre ${ex.evidenceContract.requiredSteps} cambio(s) antes de responder.`;
  }
  function check() { const chosen = $('input[name="answer"]:checked'); if (!chosen) { $("#feedback").textContent = "Elige una opción."; return; } const o = lesson.exercises[exerciseIndex].options[Number(chosen.value)]; $("#feedback").textContent = o.feedback; $("#feedback").className = o.correct ? "ok" : "bad"; }
  function renderTeacher(mode) {
    if (mode === "live" && !teacher) mode = "learn";
    $$('[data-mode]').forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
    if (mode === "live") { const live = lesson.liveTeachingPack; $("#teacherContent").innerHTML = `<p class="eyebrow">Modo docente oculto</p><h2>${live.dataset.name}</h2><p>${live.visibilityNotice}</p><p>${live.dataset.rows} filas · ${live.dataset.license} · ${live.dataset.snapshot_date}</p><ol>${live.teacherScript.map(x=>`<li>${x}</li>`).join("")}</ol>`; }
    else if (mode === "practice") $("#teacherContent").innerHTML = `<p class="eyebrow">Contrato de práctica</p><h2>Evidencia obligatoria</h2><p>${lesson.practiceStory.separationRule}</p><ul>${lesson.practiceStory.hints.map(x=>`<li>${x}</li>`).join("")}</ul>`;
    else $("#teacherContent").innerHTML = `<p class="eyebrow">Fuente conceptual</p><h2>${lesson.definition}</h2><p>${lesson.intuition}</p><p><b>Error plausible:</b> ${lesson.error}</p><p><b>Estado:</b> ${lesson.narrative.dataState}</p>`;
  }
  shell();
})();