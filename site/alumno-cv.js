// Pestaña «Mi CV»: arma un CV en formato Harvard que se completa solo conforme el alumno termina casos.
// Lo que viene del curso se lee de Supabase (evento "tdd:datos" que emite alumno.js); lo que escribe el alumno
// se guarda solo en este navegador. Máximo 2 páginas tamaño carta; se exporta a PDF con la impresión del navegador.
(function () {
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  // Generación 1: 8 ene – 20 mar 2027.
  const GENERACION = { nombre: "Generación 1", inicio: "Ene 2027", fin: "Mar 2027", termina: new Date("2027-03-20T17:00:00Z"), horas: 66 };
  // Lo que cada caso aporta al CV. Solo describe lo que el alumno hace en el cuaderno.
  const LOGROS = {
    "4.1": {
      proyecto: "Mortalidad materna en el Hospital General de Viena (1841–1849)",
      bullets: [
        "Comparó la mortalidad de dos clínicas con datos históricos de 1841 a 1849 y cuantificó la diferencia entre ambas.",
        "Descartó explicaciones alternativas simulando cuánto podía variar la tasa solo por azar.",
        "Estimó el cambio en la tasa de mortalidad después de introducir el lavado de manos.",
      ],
      tecnicas: ["comparación de tasas", "simulación del azar", "evaluación de hipótesis"],
    },
    "4.2": {
      proyecto: "Admisiones de posgrado en UC Berkeley (1973)",
      bullets: [
        "Analizó las tasas de admisión por sexo de seis departamentos y detectó la paradoja de Simpson.",
        "Mostró con un análisis estratificado por departamento cómo la agregación invertía la conclusión.",
        "Planteó un ejemplo propio de la paradoja aplicado a su campo de trabajo.",
      ],
      tecnicas: ["análisis estratificado", "paradoja de Simpson", "tablas de contingencia"],
    },
  };
  const PAGINA_IN = 11, MARGEN_IN = 0.6, PX_IN = 96;
  const ALTO_UTIL = (PAGINA_IN - 2 * MARGEN_IN) * PX_IN - 4;  // pequeño margen de seguridad

  let ctx = null, clave = null, datos = null, guardarTimer = null;

  // ---------- Datos del alumno (solo en este navegador) ----------
  const vacio = () => ({ nombre: "", ciudad: "", correo: "", telefono: "", linkedin: "", educacion: [], experiencia: [], actividades: [], idiomas: "", herramientas: "", intereses: "", mostrarTop: true });
  function leer() { try { return Object.assign(vacio(), JSON.parse(localStorage.getItem(clave) || "null") || {}); } catch (_) { return vacio(); } }
  function guardar() {
    clearTimeout(guardarTimer);
    guardarTimer = setTimeout(() => { try { localStorage.setItem(clave, JSON.stringify(datos)); $("#cvGuardado").textContent = "Guardado en este navegador"; } catch (_) { $("#cvGuardado").textContent = "No se pudo guardar en este navegador"; } }, 400);
  }

  // ---------- Editor ----------
  function campo(etiqueta, valor, onInput, opts = {}) {
    const id = `cv-${Math.random().toString(36).slice(2, 9)}`;
    const w = el("label", "cv-field" + (opts.ancho ? " wide" : "")); w.htmlFor = id;
    const input = opts.area ? el("textarea") : el("input");
    input.id = id; input.value = valor || ""; if (opts.placeholder) input.placeholder = opts.placeholder;
    if (opts.max) input.maxLength = opts.max; if (opts.area) input.rows = opts.rows || 3;
    input.addEventListener("input", () => { onInput(input.value); render(); guardar(); });
    w.append(el("span", null, etiqueta), input); return w;
  }

  const ESQUEMAS = {
    educacion: { titulo: "Educación", nuevo: "Agregar estudios", campos: [["inst", "Institución", "Universidad Nacional Autónoma de México"], ["lugar", "Lugar", "Ciudad de México"], ["titulo", "Título o programa", "Licenciatura en Economía"], ["fechas", "Fechas", "Ago 2018 – Jun 2022"]], area: ["detalle", "Detalles (uno por línea)", "Tesis, promedio, reconocimientos"] },
    experiencia: { titulo: "Experiencia", nuevo: "Agregar experiencia", campos: [["org", "Organización", "Empresa S.A. de C.V."], ["lugar", "Lugar", "Monterrey, N.L."], ["puesto", "Puesto", "Analista de operaciones"], ["fechas", "Fechas", "Ene 2023 – Actual"]], area: ["logros", "Logros (uno por línea, empieza con un verbo)", "Redujo 15 % el tiempo de cierre mensual automatizando reportes en Excel"] },
    actividades: { titulo: "Actividades y liderazgo", nuevo: "Agregar actividad", campos: [["org", "Organización", "Club de datos universitario"], ["lugar", "Lugar", ""], ["puesto", "Rol", "Coordinadora"], ["fechas", "Fechas", "2021 – 2022"]], area: ["logros", "Logros (uno por línea)", "Organizó 6 talleres de visualización con 120 asistentes"] },
  };

  function listaEditable(tipo) {
    const esq = ESQUEMAS[tipo], cont = el("div", "cv-list");
    datos[tipo].forEach((item, i) => {
      const card = el("div", "cv-item"); const grid = el("div", "cv-grid");
      esq.campos.forEach(([k, t, ph]) => grid.append(campo(t, item[k], (v) => { item[k] = v; }, { placeholder: ph, max: 90 })));
      grid.append(campo(esq.area[1], item[esq.area[0]], (v) => { item[esq.area[0]] = v; }, { area: true, ancho: true, placeholder: esq.area[2], max: 900, rows: 3 }));
      const acciones = el("div", "cv-item-actions");
      const arriba = el("button", "link-btn", "Subir"); arriba.type = "button"; arriba.disabled = i === 0;
      arriba.onclick = () => { [datos[tipo][i - 1], datos[tipo][i]] = [datos[tipo][i], datos[tipo][i - 1]]; pintarEditor(); render(); guardar(); };
      const quitar = el("button", "link-btn", "Quitar"); quitar.type = "button";
      quitar.onclick = () => { datos[tipo].splice(i, 1); pintarEditor(); render(); guardar(); };
      acciones.append(arriba, quitar); card.append(grid, acciones); cont.append(card);
    });
    const add = el("button", "btn btn-line cv-add", `+ ${esq.nuevo}`); add.type = "button";
    add.onclick = () => { datos[tipo].push({}); pintarEditor(); render(); guardar(); };
    cont.append(add); return cont;
  }

  function bloque(titulo, nota, ...hijos) {
    const d = el("details", "cv-block"); d.open = true;
    const s = el("summary"); s.append(el("span", null, titulo)); if (nota) s.append(el("small", null, nota));
    d.append(s, ...hijos); return d;
  }

  function pintarEditor() {
    const ed = $("#cvEditor"); const abiertos = [...ed.querySelectorAll("details")].map((d) => d.open);
    ed.replaceChildren();
    const g1 = el("div", "cv-grid");
    g1.append(
      campo("Nombre completo", datos.nombre, (v) => { datos.nombre = v; }, { max: 60, ancho: true }),
      campo("Ciudad", datos.ciudad, (v) => { datos.ciudad = v; }, { max: 40, placeholder: "Ciudad de México" }),
      campo("Teléfono", datos.telefono, (v) => { datos.telefono = v; }, { max: 25, placeholder: "+52 55 1234 5678" }),
      campo("Correo", datos.correo, (v) => { datos.correo = v; }, { max: 60 }),
      campo("LinkedIn o portafolio", datos.linkedin, (v) => { datos.linkedin = v; }, { max: 80, placeholder: "linkedin.com/in/tu-nombre" }),
    );
    const g2 = el("div", "cv-grid");
    g2.append(
      campo("Idiomas", datos.idiomas, (v) => { datos.idiomas = v; }, { ancho: true, max: 120, placeholder: "Español (nativo), inglés (B2)" }),
      campo("Otras herramientas", datos.herramientas, (v) => { datos.herramientas = v; }, { ancho: true, max: 160, placeholder: "Excel avanzado, Power BI, SQL" }),
      campo("Intereses", datos.intereses, (v) => { datos.intereses = v; }, { ancho: true, max: 160, placeholder: "Ciclismo de ruta, ajedrez, divulgación científica" }),
    );
    const top = el("label", "cv-check"); const cb = el("input"); cb.type = "checkbox"; cb.checked = datos.mostrarTop !== false;
    cb.onchange = () => { datos.mostrarTop = cb.checked; render(); guardar(); };
    top.append(cb, document.createTextNode(" Mencionar si estoy en el Top 5 de mi generación"));
    ed.append(
      bloque("Datos de contacto", "Encabezado del CV", g1),
      bloque("Educación previa", "Va debajo del programa del curso", listaEditable("educacion")),
      bloque("Experiencia", "Lo más reciente primero", listaEditable("experiencia")),
      bloque("Actividades y liderazgo", "Opcional", listaEditable("actividades")),
      bloque("Habilidades e intereses", "Las técnicas del curso se agregan solas", g2, top),
    );
    ed.querySelectorAll("details").forEach((d, i) => { if (abiertos.length) d.open = abiertos[i] ?? true; });
  }

  // ---------- CV (formato Harvard) ----------
  const lineas = (t) => String(t || "").split("\n").map((x) => x.trim().replace(/^[-•·*]\s*/, "")).filter(Boolean);
  function seccion(titulo) { const s = el("section", "cvh-sec"); s.append(el("h2", null, titulo)); return s; }
  function entrada(sec, izq1, der1, izq2, der2, bullets) {
    const e = el("div", "cvh-entry");
    const r1 = el("div", "cvh-row"); r1.append(el("b", null, izq1 || ""), el("span", null, der1 || "")); e.append(r1);
    if (izq2 || der2) { const r2 = el("div", "cvh-row"); r2.append(el("i", null, izq2 || ""), el("span", null, der2 || "")); e.append(r2); }
    if (bullets && bullets.length) { const ul = el("ul"); bullets.forEach((b) => ul.append(el("li", null, b))); e.append(ul); }
    sec.append(e);
  }

  function casosCompletos() {
    const hechos = new Set(ctx.filas.filter((f) => f.usuario === ctx.usuario.id && f.completo).map((f) => f.caso));
    return ctx.casos.filter((c) => hechos.has(c.id));
  }

  function render() {
    if (!ctx) return;
    const papel = $("#cvContenido"); papel.replaceChildren();
    const completos = casosCompletos();
    // Encabezado
    const head = el("header", "cvh-head"); head.append(el("h1", null, datos.nombre || "Tu nombre"));
    const contacto = [datos.ciudad, datos.telefono, datos.correo, datos.linkedin].filter(Boolean).join(" · ");
    if (contacto) head.append(el("p", null, contacto));
    papel.append(head);

    // Educación: el programa primero
    const edu = seccion("Educación");
    const enCurso = new Date() < GENERACION.termina;
    const bEdu = [`Programa en vivo de ${GENERACION.horas} horas de ciencia de datos e IA aplicada a decisiones reales, con casos resueltos en Python (Google Colab).`];
    if (completos.length) bEdu.push(`Casos completados: ${completos.length} de ${ctx.casos.length}.`);
    const m = ctx.marcador;
    if (datos.mostrarTop && m && m.participa && m.banda === "top5") bEdu.push(`Top 5 de su generación en retos de análisis (lugar ${m.posicion} de ${m.participantes}).`);
    entrada(edu, "Augmented Learning Labs", "En línea", `The Agentic Data Scientist · ${GENERACION.nombre}`, `${GENERACION.inicio} – ${enCurso ? "en curso" : GENERACION.fin}`, bEdu);
    datos.educacion.filter((x) => x.inst || x.titulo).forEach((x) => entrada(edu, x.inst, x.lugar, x.titulo, x.fechas, lineas(x.detalle)));
    papel.append(edu);

    // Proyectos que salen del curso
    if (completos.length) {
      const pro = seccion("Proyectos de ciencia de datos");
      completos.forEach((c) => {
        const l = LOGROS[c.id] || { proyecto: c.titulo, bullets: [`Resolvió el caso «${c.titulo}» con datos reales en Python.`] };
        entrada(pro, l.proyecto, `Caso ${c.id}`, null, null, l.bullets);
      });
      papel.append(pro);
    }

    // Experiencia y actividades
    [["experiencia", "Experiencia"], ["actividades", "Actividades y liderazgo"]].forEach(([k, t]) => {
      const items = datos[k].filter((x) => x.org || x.puesto); if (!items.length) return;
      const s = seccion(t); items.forEach((x) => entrada(s, x.org, x.lugar, x.puesto, x.fechas, lineas(x.logros))); papel.append(s);
    });

    // Habilidades e intereses
    const tecnicas = [...new Set(completos.flatMap((c) => (LOGROS[c.id] || {}).tecnicas || []))];
    const herramientas = [completos.length ? "Python en Google Colab" : "", datos.herramientas].filter(Boolean).join(", ");
    const filasHab = [["Análisis de datos", tecnicas.length ? tecnicas.join(", ").replace(/^./, (x) => x.toUpperCase()) : ""], ["Herramientas", herramientas], ["Idiomas", datos.idiomas], ["Intereses", datos.intereses]].filter(([, v]) => v);
    if (filasHab.length) {
      const hab = seccion("Habilidades e intereses"); const ul = el("ul", "cvh-skills");
      filasHab.forEach(([k, v]) => { const li = el("li"); li.append(el("b", null, `${k}: `), document.createTextNode(v)); ul.append(li); });
      hab.append(ul); papel.append(hab);
    }
    medir();
  }

  // Pagina como lo hará el navegador al imprimir: ninguna entrada se corta y cada título va con su primera entrada.
  function medir() {
    const papel = $("#cvContenido"), marcas = $("#cvMarcas"); marcas.replaceChildren();
    $("#cvHoja").style.zoom = "1";  // medir sin escala
    const base = papel.getBoundingClientRect().top;
    const bloques = [];
    [...papel.children].forEach((hijo) => {
      if (!hijo.classList.contains("cvh-sec")) { bloques.push([hijo]); return; }
      const partes = [...hijo.children];
      bloques.push([hijo.querySelector("h2"), partes[1]].filter(Boolean));  // título + primera entrada
      partes.slice(2).forEach((p) => bloques.push([p]));
    });
    let pagina = 1, usado = 0, finAnterior = 0;
    const cortes = [];
    bloques.forEach((grupo) => {
      const top = grupo[0].getBoundingClientRect().top - base;
      const bottom = grupo[grupo.length - 1].getBoundingClientRect().bottom - base;
      const alto = bottom - top, hueco = Math.max(0, top - finAnterior);
      if (usado > 0 && usado + hueco + alto > ALTO_UTIL) { pagina += 1; usado = alto; cortes.push(top); }
      else usado += hueco + alto;
      finAnterior = bottom;
    });
    cortes.forEach((top, k) => { const m = el("div", "cv-break", `Aquí empieza la página ${k + 2}`); m.style.top = `${MARGEN_IN * PX_IN + top - 6}px`; marcas.append(m); });
    const est = $("#cvPaginas"); est.className = `cv-pages ${pagina > 2 ? "is-over" : ""}`;
    est.textContent = pagina > 2 ? `${pagina} páginas: recorta hasta que quepa en 2` : `${pagina} de 2 páginas`;
    $("#cvPdf").disabled = pagina > 2;
    ajustarZoom();
  }

  function ajustarZoom() {
    const marco = $("#cvMarco"), hoja = $("#cvHoja"); if (!marco.clientWidth) return;
    hoja.style.zoom = String(Math.min(1, marco.clientWidth / (8.5 * PX_IN)));
  }

  // ---------- Pestañas ----------
  const PANEL_AVANCE = ["#vistaAvance", "#vistaDocente", "#ayuda"];
  function pestana(cual) {
    const cv = cual === "cv";
    $("#tabAvance").setAttribute("aria-selected", String(!cv)); $("#tabCV").setAttribute("aria-selected", String(cv));
    PANEL_AVANCE.forEach((s) => $(s).classList.toggle("tab-off", cv));
    $("#vistaCV").hidden = !cv;
    try { history.replaceState(null, "", cv ? "#cv" : location.pathname); } catch (_) {}
    if (cv) { render(); requestAnimationFrame(ajustarZoom); }
  }

  document.addEventListener("tdd:datos", (ev) => {
    ctx = ev.detail;
    clave = `tdd-cv:${ctx.usuario.id}`;
    datos = leer();
    if (!datos.nombre) datos.nombre = (ctx.perfil && ctx.perfil.nombre) || ctx.usuario.user_metadata?.full_name || "";
    if (!datos.correo) datos.correo = ctx.usuario.email || "";
    pintarEditor();
    $("#tabs").hidden = false;
    pestana(location.hash === "#cv" ? "cv" : "avance");
  });
  $("#tabAvance").addEventListener("click", () => pestana("avance"));
  $("#tabCV").addEventListener("click", () => pestana("cv"));
  $("#cvPdf").addEventListener("click", () => { document.body.classList.add("imprimiendo-cv"); const z = $("#cvHoja").style.zoom; $("#cvHoja").style.zoom = "1"; window.print(); $("#cvHoja").style.zoom = z; document.body.classList.remove("imprimiendo-cv"); });
  window.addEventListener("resize", () => { if (!$("#vistaCV").hidden) ajustarZoom(); });
})();
