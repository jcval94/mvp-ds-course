(function () {
  "use strict";
  const data = window.DCF_LEVEL;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const modules = Object.values(data.modules);
  let block = data.modules[document.body.dataset.module] || modules[0];
  const requested = params.get("concept");
  const requestedBlock = modules.find((candidate) => candidate.lessons.some((item) => item.id === requested));
  if (requestedBlock) block = requestedBlock;
  let lesson = block.lessons.find((item) => item.id === requested) || block.lessons[0];
  let step = 0, exerciseIndex = 0, teacher = params.get("teacher") === "1";
  let visitedEvidence = new Set();
  const esc = (text) => String(text).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const homeHref = () => location.pathname.includes("/labs/level-") ? "../../index.html" : "../../site/index.html";
  const lessonHref = (candidateBlock, candidate) => `${candidateBlock.href}?concept=${encodeURIComponent(candidate.id)}${teacher ? "&teacher=1" : ""}`;

  function shell() {
    document.body.dataset.experienceContract = "level-shell-v1";
    document.body.innerHTML = `<header class="app-header"><a href="index.html" class="brand">DataClass Forge</a><div>Nivel ${data.level} · ${esc(data.title)}</div><a href="${homeHref()}">HOME</a></header>
      <div class="level-shell">
        <nav class="block-nav" data-level-blocks aria-label="Temas del Nivel ${data.level}">
          <p>Temas del nivel</p>${modules.map((item) => `<a href="${lessonHref(item,item.lessons[0])}" data-block-id="${item.id}"><b>${item.number}</b><span>${esc(item.title)}</span></a>`).join("")}
          <a class="portal-link" href="index.html">Volver al nivel</a>
        </nav>
        <main class="lesson" data-level-content>
          <nav class="concept-strip" data-level-concepts aria-label="Conceptos del tema"></nav>
          <div class="lesson-controls"><button id="previous" class="secondary" aria-label="Concepto anterior">← Anterior</button><span id="lessonCount"></span><button id="next" class="secondary">Siguiente →</button></div>
          <section class="scene-card"><span id="sceneId"></span><strong id="sceneSetup"></strong><div class="dialogues"><p><b>Don Juan</b><span id="donJuan"></span></p><p><b>Paco</b><span id="paco"></span></p><p id="guestLine" hidden><b id="guestName"></b><span id="guestText"></span></p></div></section>
          <div class="subtitle" role="status" aria-live="polite"><span>Narrador · subtítulo</span><p id="subtitle"></p></div>
          <div class="title"><p id="episode"></p><h1 id="title"></h1><p id="objective"></p></div>
          <div class="workspace"><section class="visual"><div class="visual-head"><div><small id="stateLabel"></small><h2 id="stateSummary"></h2></div><span id="progress"></span></div><div id="visualStage" class="visual-stage"></div><div id="markers" class="markers"></div><p id="note" class="note"></p><button id="advance" class="primary"></button></section>
          <section class="practice"><div class="tabs"><button data-ex="0">Guiado</button><button data-ex="1">Transferencia</button></div><h2 id="storyTitle"></h2><p id="storyContext"></p><p id="decision"></p><p id="evidence"></p><h3 id="question"></h3><div id="options"></div><button id="check" class="primary" disabled>Comprobar</button><p id="feedback" role="status"></p></section></div>
        </main>
        <aside class="teacher" data-level-teacher><div class="tabs"><button data-mode="learn">Aprender</button><button data-mode="practice">Ejercitar</button><button data-mode="live" ${teacher ? "" : "hidden"}>En vivo</button></div><div id="teacherContent"></div></aside>
      </div>`;
    $("#advance").onclick = advance;
    $("#check").onclick = check;
    $("#previous").onclick = () => move(-1);
    $("#next").onclick = () => move(1);
    $$('[data-ex]').forEach((button) => button.onclick = () => { exerciseIndex = Number(button.dataset.ex); resetEvidence(); renderVisual(); renderPractice(); });
    $$('[data-mode]').forEach((button) => button.onclick = () => renderTeacher(button.dataset.mode));
    document.addEventListener("keydown", (event) => { if (event.altKey && event.key === "ArrowLeft") move(-1); if (event.altKey && event.key === "ArrowRight") move(1); });
    render();
  }
  function ordered() { return modules.flatMap((item) => item.lessons.map((candidate) => ({block:item, lesson:candidate}))); }
  function move(delta) { const all=ordered(), index=all.findIndex((item)=>item.lesson.id===lesson.id), target=all[index+delta]; if (target) location.href=lessonHref(target.block,target.lesson); else if (delta>0) location.href="index.html"; }
  function selectLesson(id) { lesson=block.lessons.find((item)=>item.id===id); resetEvidence(); exerciseIndex=0; const q=new URLSearchParams(); q.set("concept",id); if(teacher)q.set("teacher","1"); history.replaceState(null,"",`?${q}`); render(); }
  function resetEvidence() { step=0; visitedEvidence=new Set(); }
  function renderConcepts() { const nav=$("[data-level-concepts]"); nav.innerHTML=block.lessons.map((item)=>`<button data-id="${item.id}" ${item.id===lesson.id?'class="active" aria-current="page"':''}>${esc(item.title)}</button>`).join(""); nav.querySelectorAll("button").forEach((button)=>button.onclick=()=>selectLesson(button.dataset.id)); }
  function render() {
    renderConcepts();
    $$('[data-block-id]').forEach((link)=>{const active=link.dataset.blockId===block.id; link.classList.toggle("active",active); if(active)link.setAttribute("aria-current","page"); else link.removeAttribute("aria-current");});
    const all=ordered(), position=all.findIndex((item)=>item.lesson.id===lesson.id);
    $("#lessonCount").textContent=`Tema ${block.number} de ${modules.length} · Concepto ${block.lessons.indexOf(lesson)+1} de ${block.lessons.length}`;
    $("#previous").disabled=position===0; $("#next").textContent=position===all.length-1?"Volver al nivel →":"Siguiente →";
    $("#sceneId").textContent=lesson.narrative.scene; $("#sceneSetup").textContent=lesson.narrative.setup;
    $("#donJuan").textContent=lesson.narrative.donJuan; $("#paco").textContent=lesson.narrative.paco;
    const guest=lesson.narrative.guest; $("#guestLine").hidden=!guest; if(guest){$("#guestName").textContent=guest.name;$("#guestText").textContent=guest.line;}
    $("#episode").textContent=lesson.narrative.episode; $("#title").textContent=lesson.title; $("#objective").textContent=lesson.objective; document.title=`${lesson.title} | DataClass Forge`;
    renderVisual(); renderPractice(); renderTeacher("learn");
  }
  function renderVisual() {
    const state=lesson.visual.states[step]; (state.marks||[]).forEach((mark)=>visitedEvidence.add(mark.evidenceId));
    $("#stateLabel").textContent=state.label; $("#stateSummary").textContent=state.summary; $("#progress").textContent=`Paso ${step+1} de ${lesson.visual.states.length}`;
    $("#subtitle").textContent=lesson.narrative.subtitles[Math.min(step,lesson.narrative.subtitles.length-1)];
    $("#visualStage").innerHTML=window.DCF_RENDER(lesson,state);
    $("#markers").innerHTML=state.marks.map((mark)=>`<span data-evidence-id="${mark.evidenceId}">${esc(mark.label)} · ${esc(mark.value)}</span>`).join("");
    $("#note").textContent=state.note; $("#advance").textContent=step<lesson.visual.states.length-1?lesson.visual.action:"Reiniciar evidencia";
  }
  function advance(){ if(step<lesson.visual.states.length-1)step++; else resetEvidence(); renderVisual(); renderPractice(); }
  function evidenceReady(ex){ return ex.evidenceContract.requiredEvidenceIds.every((id)=>visitedEvidence.has(id)); }
  function renderPractice() {
    const ex=lesson.exercises[exerciseIndex], story=lesson.practiceStory.cases[exerciseIndex], ready=evidenceReady(ex);
    $$('[data-ex]').forEach((button)=>button.classList.toggle("active",Number(button.dataset.ex)===exerciseIndex));
    $("#storyTitle").textContent=story.storyTitle; $("#storyContext").textContent=`${story.context}. ${story.pressure}`; $("#decision").innerHTML=`<b>Decisión:</b> ${esc(story.decision)}`; $("#evidence").innerHTML=`<b>Evidencia:</b> ${esc(ex.evidence)}`; $("#question").textContent=ex.question;
    $("#options").innerHTML=ex.options.map((option,index)=>`<label><input type="radio" name="answer" value="${index}" ${ready?"":"disabled"}> ${esc(option.text)}</label>`).join("");
    $("#check").disabled=!ready; $("#feedback").className=""; $("#feedback").textContent=ready?"La evidencia está completa: elige una opción.":`Recorre ${ex.evidenceContract.requiredSteps} cambio(s) y visita todas las marcas antes de responder.`;
  }
  function check(){const chosen=$("input[name=answer]:checked");if(!chosen){$("#feedback").textContent="Elige una opción.";return;}const option=lesson.exercises[exerciseIndex].options[Number(chosen.value)];$("#feedback").textContent=option.feedback;$("#feedback").className=option.correct?"ok":"bad";}
  function renderTeacher(mode){if(mode==="live"&&!teacher)mode="learn";$$('[data-mode]').forEach((button)=>button.classList.toggle("active",button.dataset.mode===mode));if(mode==="live"){const live=lesson.liveTeachingPack;$("#teacherContent").innerHTML=`<p class="eyebrow">Modo docente oculto</p><h2>${esc(live.dataset.name)}</h2><p>${esc(live.visibilityNotice)}</p><p>${live.dataset.rows} filas · ${esc(live.dataset.license)} · ${esc(live.dataset.snapshot_date)}</p><ol>${live.teacherScript.map((item)=>`<li>${esc(item)}</li>`).join("")}</ol>`;}else if(mode==="practice")$("#teacherContent").innerHTML=`<p class="eyebrow">Contrato de práctica</p><h2>Evidencia obligatoria</h2><p>${esc(lesson.practiceStory.separationRule)}</p><ul>${lesson.practiceStory.hints.map((item)=>`<li>${esc(item)}</li>`).join("")}</ul>`;else $("#teacherContent").innerHTML=`<p class="eyebrow">Fuente conceptual</p><h2>${esc(lesson.definition)}</h2><p>${esc(lesson.intuition)}</p><p><b>Error plausible:</b> ${esc(lesson.error)}</p><p><b>Renderer:</b> ${esc(lesson.visualizationSpec.kind)}</p><p><b>Estado:</b> ${esc(lesson.narrative.dataState)}</p>`;}
  shell();
})();
