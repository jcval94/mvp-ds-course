(function () {
  "use strict";
  const params = new URLSearchParams(location.search);
  const teacher = params.get("teacher") === "1";
  const currentModuleId = document.body.dataset.module;
  const level1 = window.DCF_MODULES;
  const level2 = window.DCF_LEVEL2?.modules;
  const modules = level1 || level2;
  if (!modules || !currentModuleId || !modules[currentModuleId]) return;
  document.body.dataset.experienceContract = "level-shell-v1";
  const blockNav = document.querySelector(".sidebar,.module-nav");
  const content = document.querySelector(".main-stage,.layout>main");
  const teacherPanel = document.querySelector(".teacher-panel,.teacher");
  blockNav?.setAttribute("data-level-blocks", "");
  content?.setAttribute("data-level-content", "");
  teacherPanel?.setAttribute("data-level-teacher", "");
  const live = document.querySelector('[data-mode="live"]');
  if (live) live.hidden = !teacher;

  const currentModule = modules[currentModuleId];
  function level1Concepts() {
    const strip = document.querySelector(".stepper");
    if (!strip) return;
    strip.classList.add("shell-concepts"); strip.setAttribute("data-level-concepts", ""); strip.setAttribute("aria-label", "Conceptos del tema");
    [...strip.querySelectorAll("button")].forEach((button,index) => {
      const item=currentModule.lessons[index]; if(!item)return;
      if(button.textContent!==item.title)button.textContent=item.title; button.title=item.title;
      if(button.closest(".step")?.classList.contains("active"))button.setAttribute("aria-current","page");else button.removeAttribute("aria-current");
    });
  }
  function level2Concepts() {
    let strip=document.querySelector(".shell-concepts");
    if(!strip){strip=document.createElement("nav");strip.className="shell-concepts";strip.setAttribute("data-level-concepts","");strip.setAttribute("aria-label","Conceptos del tema");document.querySelector(".lesson-nav")?.after(strip);}
    const active=new URLSearchParams(location.search).get("concept")||currentModule.lessons[0].id;
    strip.innerHTML=currentModule.lessons.map((item)=>`<a href="${currentModule.href}?concept=${encodeURIComponent(item.id)}${teacher?'&teacher=1':''}" ${item.id===active?'class="active" aria-current="page"':''}>${item.title}</a>`).join("");
  }
  if(level1){level1Concepts();const target=document.querySelector(".stepper");if(target)new MutationObserver(level1Concepts).observe(target,{childList:true,subtree:true});}
  else {level2Concepts();const title=document.querySelector("#lessonTitle");if(title)new MutationObserver(level2Concepts).observe(title,{childList:true});}
})();
