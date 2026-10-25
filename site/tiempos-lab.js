// Aviso de tiempo estimado en cada bloque de un nivel (lo agrega scripts/build_pages.py).
// Lee catalog.json; si algo falla no muestra nada ni toca la página.
(function () {
  const m = location.pathname.match(/labs\/level-(\d+)\//);
  const bloque = document.body && document.body.dataset.module;
  if (!m || !bloque) return;
  const dur = (min) => { min = Math.round(min / 5) * 5; return min < 60 ? `${min} min` : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} min` : ""}`; };
  fetch("../../catalog.json").then((r) => (r.ok ? r.json() : null)).then((c) => {
    if (!c || !c.timing) return;
    const nivel = c.levels.find((l) => String(l.level) === m[1]);
    const b = nivel && nivel.blocks.find((x) => x.id === bloque);
    if (!b || !b.minutes) return;
    const p = c.timing.per_concept, conTransfer = Number(m[1]) >= c.timing.transfer_from_level;
    const chip = document.createElement("aside");
    chip.setAttribute("aria-label", "Tiempo estimado");
    chip.style.cssText = "display:block;width:fit-content;max-width:calc(100% - 24px);margin:12px;padding:8px 12px;border-radius:var(--r-control,12px);font:600 12px/1.45 var(--font,system-ui,sans-serif);background:var(--text,#0e0a07);color:var(--surface,#fff);box-shadow:0 4px 18px rgba(0,0,0,.25)";
    chip.textContent = `Este bloque ≈ ${dur(b.minutes)} · por concepto: lección ${p.aprender} min, ejercicio guiado ${p.ejercicio_guiado} min${conTransfer ? `, transferencia ${p.transferencia} min` : ""}`;
    const cerrar = document.createElement("button");
    cerrar.type = "button"; cerrar.textContent = "×"; cerrar.setAttribute("aria-label", "Ocultar tiempo estimado");
    cerrar.style.cssText = "margin-left:8px;border:0;background:none;color:inherit;font:inherit;cursor:pointer";
    cerrar.addEventListener("click", () => chip.remove());
    chip.append(cerrar);
    // Va dentro del contenido, arriba: un aviso fijo taparía controles al hacer scroll.
    const destino = document.querySelector("main") || document.body;
    destino.prepend(chip);
  }).catch(() => {});
})();
