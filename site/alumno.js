// Área del alumno: login con Google y lectura del avance que registran los cuadernos.
// La sesión y las llamadas a Supabase viven en sesion.js (compartido con el panel docente).
// La seguridad la pone la base: cada alumno solo ve lo suyo.
(function () {
  const api = TDD.api;
  const CONTACTO = "augmentedlearninglabs@gmail.com";
  // Cuadernos de cada caso en Drive. Desde el esquema 0.8 el enlace viene de la base (casos.cuaderno_url);
  // estos quedan como respaldo para bases anteriores.
  const CUADERNOS = {
    "4.1": "https://colab.research.google.com/drive/1iRAmuvmj08aLXNr3IOjPPeESn4s1MjWI",
    "4.2": "https://colab.research.google.com/drive/1_21Ve2MyBAKgoRu_5ipeng5gLk3yAzkZ",
  };
  const ETIQUETAS = {
    preparacion: "Preparación", hipotesis: "Hipótesis", clinicas: "Clínicas", azar: "Azar", sospechosos: "Sospechosos",
    explicacion: "Explicación", pista: "Pista", revelacion: "Revelación", laboratorio: "Laboratorio", cierre: "Cierre",
    total: "Total", departamentos: "Departamentos",
  };
  // Nombre de cada respuesta abierta para el alumno (las etiquetas del docente están en el panel).
  const PREGUNTAS = { hipotesis_razon: "La razón de tu hipótesis", explicacion: "Tu explicación", ejemplo: "Tu ejemplo para tu trabajo" };
  const TZ = "America/Mexico_City";

  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const etiqueta = (s) => ETIQUETAS[s] || (s.charAt(0).toUpperCase() + s.slice(1)).replace(/_/g, " ");
  const fecha = (iso) => new Date(iso).toLocaleString("es-MX", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const rtf = new Intl.RelativeTimeFormat("es-MX", { numeric: "auto" });
  function relativo(iso) {
    const s = (new Date(iso) - Date.now()) / 1000, a = Math.abs(s);
    const [v, u] = a < 3600 ? [s / 60, "minute"] : a < 86400 ? [s / 3600, "hour"] : [s / 86400, "day"];
    return rtf.format(Math.round(v), u);
  }

  // scope "local": solo este navegador; "global": todas las sesiones de la cuenta.
  async function salir(scope = "local") {
    cerrarMenu();
    await TDD.cerrar(scope); mostrarEntrar();
    aviso(scope === "global" ? "Cerraste sesión en todos tus dispositivos." : "Cerraste sesión.", false);
  }

  // ---------- Menú Profile ----------
  const iniciales = (n) => String(n || "").trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();
  function abrirMenu(abrir) {
    $("#perfilMenu").hidden = !abrir; $("#perfilBtn").setAttribute("aria-expanded", String(abrir));
    if (abrir) { const f = $("#perfilMenu [role=menuitem]"); if (f) f.focus(); }
  }
  function cerrarMenu() { if (!$("#perfilMenu").hidden) abrirMenu(false); }
  function pintarPerfil(usuario, perfil, docente) {
    const nombre = (perfil && perfil.nombre) || usuario.user_metadata?.full_name || usuario.email;
    $("#pmNombre").textContent = nombre; $("#who").textContent = usuario.email;
    const ini = iniciales(nombre);
    const foto = usuario.user_metadata?.avatar_url || usuario.user_metadata?.picture;
    [["#avatar", "#iniciales"], ["#avatarMenu", "#inicialesMenu"]].forEach(([img, txt]) => {
      if (foto) { $(img).src = foto; $(img).hidden = false; $(txt).textContent = ""; $(img).onerror = () => { $(img).hidden = true; $(txt).textContent = ini; }; }
      else { $(img).hidden = true; $(txt).textContent = ini; }
    });
    const chips = $("#pmChips"); chips.replaceChildren();
    const chip = (a, b) => { const c = el("span"); c.append(document.createTextNode(a), el("b", null, b)); chips.append(c); };
    if (perfil) { chip("ID ", perfil.alumno_id); if (perfil.grupo) chip("Grupo ", perfil.grupo); }
    // docente: el objeto de mi_rol (0.7) o true en bases anteriores (la cuenta docente histórica = administración).
    const esAdmin = docente === true || !!(docente && docente.admin), esDocente = !!(docente && docente.docente);
    if (esAdmin) chip("", "Administración"); else if (esDocente) chip("", "Docente");
    // Acceso a los paneles: administración → admin.html; docente → docente.html.
    const destino = esAdmin ? ["admin.html", "Panel de administración"] : esDocente ? ["docente.html", "Panel docente"] : null;
    $("#pmPanel").hidden = !destino;
    if (destino) { $("#pmPanel").href = destino[0]; $("#pmPanel").textContent = destino[1]; $("#panelLink").href = destino[0]; $("#panelLink").textContent = `Abrir ${destino[1].charAt(0).toLowerCase()}${destino[1].slice(1)}`; }
  }
  $("#perfilBtn").addEventListener("click", (e) => { e.stopPropagation(); abrirMenu($("#perfilMenu").hidden); });
  document.addEventListener("click", (e) => { if (!e.target.closest("#session")) cerrarMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#perfilMenu").hidden) { abrirMenu(false); $("#perfilBtn").focus(); } });
  $("#pmMensajes").addEventListener("click", () => { cerrarMenu(); abrirMensajes(); });

  // ---------- Vistas ----------
  function aviso(texto, error, enlace) {
    const n = $("#notice"); n.replaceChildren(); n.hidden = !texto; if (!texto) return;
    n.classList.toggle("is-error", !!error); n.append(document.createTextNode(texto));
    if (enlace) { const a = el("a", null, enlace); a.href = `mailto:${enlace}`; n.append(" ", a, "."); }
  }
  function soloVista(id) {
    ["#vistaEntrar", "#vistaAvance", "#vistaDocente", "#ayuda", "#cargando", "#tabs", "#vistaCV"].forEach((s) => { $(s).hidden = s !== id; });
  }
  function mostrarEntrar() {
    soloVista("#vistaEntrar"); $("#session").hidden = true;
    if (!TDD.activo) {
      $("#entrar").disabled = true;
      $("#entrarNota").textContent = "El acceso se activa antes del inicio de la Generación 1. Mientras tanto, tu avance se sigue guardando desde Colab.";
    }
  }

  function estadoCaso(caso, fila, vistas) {
    const limite = caso.entrega_limite ? new Date(caso.entrega_limite) : null;
    if (fila && fila.completo) {
      const tarde = limite && fila.entregado && new Date(fila.entregado) > limite;
      return tarde ? ["Entregado tarde", "s-late"] : ["Entregado", "s-done"];
    }
    if (limite && limite < new Date()) return ["Vencido", "s-late"];
    return vistas > 0 ? ["En curso", "s-progress"] : ["Sin empezar", ""];
  }

  // Tus respuestas del caso (la más reciente de cada pregunta) junto a la retroalimentación del profesor.
  // «respuestas» viene ordenada de la más reciente a la más antigua; calificada = tiene modelo (nivel o comentario).
  function comentarios(respuestas) {
    const porPregunta = new Map();
    (respuestas || []).forEach((r) => {
      const p = porPregunta.get(r.pregunta) || { ultima: r, calificada: null };
      if (!p.calificada && r.modelo) p.calificada = r;
      porPregunta.set(r.pregunta, p);
    });
    if (!porPregunta.size) return null;
    const conComentario = [...porPregunta.values()].filter((p) => p.calificada).length;
    const d = el("details", "feedback"); d.open = conComentario > 0;
    d.append(el("summary", null, `Tus respuestas · ${porPregunta.size}${conComentario ? ` · ${conComentario} con comentarios de tu profesor` : ""}`));
    const ul = el("ul");
    porPregunta.forEach(({ ultima, calificada }, pregunta) => {
      const li = el("li"); const fila = el("div");
      const nivel = (r) => (r.nivel != null ? `Nivel ${r.nivel} de 3 · ${5 * r.nivel} bits` : "Con comentario");
      fila.append(el("b", null, PREGUNTAS[pregunta] || etiqueta(pregunta)),
        el("span", calificada ? "lvl" : "lvl pending", !calificada ? "Sin revisar aún" : calificada === ultima ? nivel(calificada) : `${nivel(calificada)} (respuesta anterior)`));
      li.append(fila);
      if (ultima.texto) {
        const q = el("blockquote", "mine"); q.append(el("span", "mine-label", `Tu respuesta · ${fecha(ultima.creado)}`), el("span", null, ultima.texto)); li.append(q);
      }
      if (calificada && calificada.retro) {
        const p = el("p", "retro");
        if (calificada !== ultima) p.append(el("span", "mine-label", `Sobre tu respuesta del ${fecha(calificada.creado)}`));
        p.append(el("span", null, calificada.retro)); li.append(p);
      }
      ul.append(li);
    });
    d.append(ul); return d;
  }

  function tarjetaCaso(caso, fila, vistasSet, retros) {
    const secciones = Array.isArray(caso.secciones) ? caso.secciones : [];
    const vistas = secciones.filter((s) => vistasSet.has(s)).length;
    const [estado, clase] = estadoCaso(caso, fila, vistas);
    const done = fila && fila.completo;
    const card = el("article", `case${done ? " done" : ""}`);

    const top = el("div", "case-top");
    const t = el("div"); t.append(el("span", "case-id", `Caso ${caso.id}${caso.modulo != null ? ` · Módulo ${caso.modulo}` : ""}`), el("h3", null, caso.titulo));
    const suClase = claseDeCaso(caso.id);
    if (suClase) t.append(el("span", "case-class", `Clase ${suClase.numero} · ${diaCorto(suClase.inicio)}`));
    top.append(t, el("span", `status ${clase}`, estado));

    const track = el("div", "track"); track.setAttribute("role", "img"); track.setAttribute("aria-label", `${vistas} de ${secciones.length} secciones resueltas`);
    let k = 0;
    secciones.forEach((s) => { const i = el("i", vistasSet.has(s) ? "on" : ""); i.title = etiqueta(s); if (vistasSet.has(s)) i.style.setProperty("--k", k++); track.append(i); });

    const siguiente = secciones.find((s) => !vistasSet.has(s));
    const meta = el("div", "track-meta");
    const izq = el("span"); izq.append(el("b", null, `${vistas} de ${secciones.length}`), document.createTextNode(" secciones"));
    const minCaso = T.data && T.data.casos && T.data.casos[caso.id] && T.data.casos[caso.id].min;
    if (minCaso && secciones.length && !done) izq.append(document.createTextNode(` · ≈ ${dur(minCaso * (1 - vistas / secciones.length))} por hacer`));
    else if (minCaso && done) izq.append(document.createTextNode(` · tiempo estimado ${dur(minCaso)}`));
    meta.append(izq, el("span", null, done ? "Caso completo" : siguiente ? `Sigue: ${etiqueta(siguiente)}` : "Falta marcar el cierre"));

    const lista = el("ul", "sections");
    secciones.forEach((s) => lista.append(el("li", vistasSet.has(s) ? "on" : s === siguiente && !done ? "next" : "", etiqueta(s))));

    const foot = el("div", "case-foot");
    const due = el("span", "due");
    if (caso.entrega_limite) {
      const vencido = new Date(caso.entrega_limite) < new Date() && !done;
      due.classList.toggle("late", vencido);
      due.append(document.createTextNode("Entrega: "), el("b", null, fecha(caso.entrega_limite)), document.createTextNode(` · ${relativo(caso.entrega_limite)}`));
    } else due.textContent = "Sin fecha de entrega";
    if (done && fila.entregado) due.textContent = `Entregado ${fecha(fila.entregado)}`;
    foot.append(due);
    const acciones = el("div", "case-actions");
    if (M.on) { const q = el("button", "case-ask", "Preguntar a mi profesor"); q.type = "button"; q.addEventListener("click", () => abrirMensajes(caso.id)); acciones.append(q); }
    const enlace = caso.cuaderno_url || CUADERNOS[caso.id];
    if (enlace) {
      const a = el("a", "btn btn-line", done ? "Repasar en Colab" : vistas ? "Continuar en Colab" : "Abrir en Colab");
      a.href = enlace; a.target = "_blank"; a.rel = "noopener"; acciones.append(a);
    } else acciones.append(el("span", "muted", "Tu profesor te comparte el cuaderno"));
    foot.append(acciones);

    card.append(top, track, meta, lista);
    const c = comentarios(retros); if (c) card.append(c);
    card.append(foot);
    return card;
  }

  function anillo(pct) {
    const c = 2 * Math.PI * 52, fg = $("#ringFg");
    fg.style.strokeDasharray = c; fg.style.strokeDashoffset = c;
    requestAnimationFrame(() => requestAnimationFrame(() => { fg.style.strokeDashoffset = c * (1 - pct); }));
    $("#ringVal").textContent = `${Math.round(pct * 100)}%`;
  }

  function stat(dl, titulo, valor, nota) {
    const d = el("div"); const dd = el("dd", null, valor); if (nota) dd.append(el("small", null, nota));
    d.append(el("dt", null, titulo), dd); dl.append(d);
  }

  function pintarAvance({ usuario, perfil, casos, filas, eventos, retros }) {
    const nombre = (perfil && perfil.nombre) || usuario.user_metadata?.full_name || usuario.email;
    $("#holaTitle").textContent = `Hola, ${String(nombre).split(" ")[0]}`;
    const chips = $("#chips"); chips.replaceChildren();
    const chip = (a, b) => { const c = el("span", "chip"); c.append(document.createTextNode(a), el("b", null, b)); chips.append(c); };
    if (perfil) { chip("ID ", perfil.alumno_id); if (perfil.grupo) chip("Grupo ", perfil.grupo); }
    chip("", usuario.email);

    const propias = filas.filter((f) => f.usuario === usuario.id);
    const porCaso = new Map(propias.map((f) => [f.caso, f]));
    const vistas = new Map();
    eventos.forEach((e) => { if (e.tipo === "seccion" && e.seccion) { if (!vistas.has(e.caso)) vistas.set(e.caso, new Set()); vistas.get(e.caso).add(e.seccion); } });

    let total = 0, hechas = 0;
    casos.forEach((c) => { const s = c.secciones || []; total += s.length; hechas += s.filter((x) => (vistas.get(c.id) || new Set()).has(x)).length; });
    anillo(total ? hechas / total : 0);

    const dl = $("#stats"); dl.replaceChildren();
    const entregados = casos.filter((c) => porCaso.get(c.id)?.completo).length;
    stat(dl, "Casos entregados", `${entregados} de ${casos.length}`);
    const proxima = casos.filter((c) => c.entrega_limite && new Date(c.entrega_limite) > new Date() && !porCaso.get(c.id)?.completo)
      .sort((a, b) => new Date(a.entrega_limite) - new Date(b.entrega_limite))[0];
    stat(dl, "Próxima entrega", proxima ? `Caso ${proxima.id}` : "Nada pendiente", proxima ? `${fecha(proxima.entrega_limite)} · ${relativo(proxima.entrega_limite)}` : "");
    const ultimo = propias.map((f) => f.ultimo_evento).filter(Boolean).sort().pop();
    stat(dl, "Última actividad", ultimo ? relativo(ultimo) : "Aún no hay registros", ultimo ? fecha(ultimo) : "Abre un caso en Colab para empezar");

    Object.assign(V, { casos, porCaso, vistas, retros: retros || [] });
    llenarFiltros(); pintarCasos();
  }

  // ---------- Clases en vivo (Google Meet) y grabaciones (esquema 0.10) ----------
  // Tiempos estimados (site/tiempos.json): si no cargan, simplemente no se muestran.
  const T = { data: null };
  const tiemposListos = fetch("tiempos.json", { cache: "no-cache" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const dur = (m) => { m = Math.round(m); return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}`; };
  const MIN = 60000, AVISO_MIN = 15; // la liga de Meet se resalta 15 minutos antes de empezar
  const C = { lista: [], timer: null };
  const diaCorto = (iso) => new Date(iso).toLocaleDateString("es-MX", { timeZone: TZ, weekday: "short", day: "numeric", month: "short" });
  const diaLargo = (iso, tz = TZ) => new Date(iso).toLocaleString("es-MX", { timeZone: tz, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false });
  const soloFecha = (iso) => new Date(iso).toLocaleDateString("es-MX", { timeZone: TZ, day: "numeric", month: "short", year: "numeric" });
  const claseDeCaso = (id) => C.lista.find((k) => k.caso === id) || null;
  const inicioClase = (c) => { const k = claseDeCaso(c.id); return k ? new Date(k.inicio).getTime() : Infinity; };

  function pintarClases(lista) {
    C.lista = Array.isArray(lista) ? lista : [];
    clearInterval(C.timer);
    $("#clases").hidden = !C.lista.length;
    if (!C.lista.length) return;
    pintarProxima();
    C.timer = setInterval(pintarProxima, 30 * 1000);
    const ul = $("#grabaciones"); ul.replaceChildren();
    const pasadas = C.lista.filter((k) => new Date(k.fin) < new Date()).reverse();
    pasadas.forEach((k) => {
      const li = el("li"), info = el("div");
      info.append(el("b", null, `Clase ${k.numero} · ${k.tema}`), el("small", null, `${diaCorto(k.inicio)}${k.caso ? ` · Caso ${k.caso}` : ""}`));
      li.append(info);
      if (k.grabacion_url) {
        const a = el("a", null, "Ver grabación"); a.href = k.grabacion_url; a.target = "_blank"; a.rel = "noopener";
        a.title = `Disponible hasta el ${soloFecha(k.grabacion_hasta)}`; li.append(a);
      } else li.append(el("span", "pend", new Date(k.grabacion_hasta) < new Date() ? "Ya no disponible" : "Grabación en proceso"));
      ul.append(li);
    });
    if (!pasadas.length) ul.append(el("li", "vacio", "Después de cada clase, aquí aparece su grabación."));
  }

  function pintarProxima() {
    const ahora = Date.now(), box = $("#claseProxima");
    const actual = C.lista.find((k) => new Date(k.inicio) - AVISO_MIN * MIN <= ahora && ahora < new Date(k.fin));
    const prox = actual || C.lista.find((k) => new Date(k.inicio) > ahora);
    const cuenta = $("#cuentaRegresiva"), meet = $("#claseMeet"); cuenta.replaceChildren();
    box.classList.toggle("live", !!actual);
    $("#claseIcs").hidden = !C.lista.some((k) => new Date(k.inicio) > ahora);
    if (!prox) {
      $("#claseKicker").textContent = "Clases en vivo";
      $("#claseTitulo").textContent = "Terminaron las clases de tu generación";
      $("#claseCuando").textContent = `Fueron ${C.lista.length} clases. Sus grabaciones siguen disponibles 12 meses.`;
      meet.hidden = true; $("#claseNota").textContent = ""; return;
    }
    const empezo = new Date(prox.inicio) <= ahora, horas = (new Date(prox.fin) - new Date(prox.inicio)) / 3600000;
    $("#claseKicker").textContent = actual ? (empezo ? "En vivo ahora" : "Empieza en unos minutos") : "Próxima clase en vivo";
    $("#claseTitulo").textContent = `Clase ${prox.numero} · ${prox.tema}`;
    const cuando = $("#claseCuando"); cuando.replaceChildren(el("b", null, diaLargo(prox.inicio)),
      document.createTextNode(` (hora del centro de México) · ${horas % 1 ? horas.toFixed(1) : horas} h${prox.caso ? ` · Caso ${prox.caso}` : ""}`));
    const miZona = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (miZona && miZona !== TZ && new Date(prox.inicio).toLocaleString("en-US", { timeZone: miZona }) !== new Date(prox.inicio).toLocaleString("en-US", { timeZone: TZ }))
      cuando.append(document.createTextNode(`. En tu zona: ${diaLargo(prox.inicio, miZona)}.`));
    if (!actual) {
      const falta = Math.max(0, new Date(prox.inicio) - ahora), d = Math.floor(falta / 86400000), h = Math.floor(falta / 3600000) % 24, m = Math.floor(falta / MIN) % 60;
      [[d, d === 1 ? "día" : "días"], [h, h === 1 ? "hora" : "horas"], [m, "min"]].forEach(([v, t]) => { const c = el("div"); c.append(el("b", null, String(v)), el("span", null, t)); cuenta.append(c); });
    }
    meet.hidden = !prox.meet_url;
    if (prox.meet_url) { meet.href = prox.meet_url; meet.className = actual ? "btn btn-accent" : "btn btn-line"; meet.textContent = actual ? "Entrar a Google Meet" : "Liga de Google Meet"; }
    pintarAgenda();
    $("#claseNota").textContent = prox.meet_url ? "Entra con tu cuenta de Google unos minutos antes. La clase se graba y la grabación aparece aquí." : "Tu profesor publicará aquí la liga de Google Meet.";
  }

  // Cómo se reparte una clase de 3 horas, con minutos por parte (se pinta una sola vez).
  function pintarAgenda() {
    const cont = $("#claseAgenda");
    if (!cont || cont.dataset.listo || !T.data || !T.data.clase_en_vivo) return;
    const k = T.data.clase_en_vivo; cont.dataset.listo = "1";
    cont.querySelector("summary").textContent = `Cómo se reparte la clase (${dur(k.duracion_min)})`;
    const ul = cont.querySelector("ul"); ul.replaceChildren();
    k.partes.forEach((p) => { const li = el("li"); li.append(el("span", null, p.titulo), el("b", null, `${p.min} min`)); ul.append(li); });
    cont.hidden = false;
  }

  // Archivo .ics con las clases que faltan: se abre en Google Calendar, Outlook o el calendario del teléfono.
  function calendario() {
    const z = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const esc = (t) => String(t || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const ev = C.lista.filter((k) => new Date(k.fin) > new Date()).map((k) => [
      "BEGIN:VEVENT", `UID:clase-${k.id}@${location.hostname || "agentic-data-scientist"}`, `DTSTAMP:${z(new Date().toISOString())}`, `DTSTART:${z(k.inicio)}`, `DTEND:${z(k.fin)}`,
      `SUMMARY:${esc(`Clase ${k.numero} · ${k.tema} · The Agentic Data Scientist`)}`,
      k.meet_url ? `LOCATION:${esc(k.meet_url)}` : "", `DESCRIPTION:${esc(`${k.caso ? `Caso ${k.caso}. ` : ""}${k.meet_url ? `Google Meet: ${k.meet_url}` : "La liga está en Mi avance."}`)}`,
      "END:VEVENT"].filter(Boolean).join("\r\n"));
    const texto = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Augmented Learning Labs//Clases//ES", "CALSCALE:GREGORIAN", ...ev, "END:VCALENDAR"].join("\r\n") + "\r\n";
    const url = URL.createObjectURL(new Blob([texto], { type: "text/calendar" }));
    const a = el("a"); a.href = url; a.download = "clases-agentic-data-scientist.ics"; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  $("#claseIcs").addEventListener("click", calendario);

  // ---------- Filtros y orden de los casos ----------
  const V = { casos: [], porCaso: new Map(), vistas: new Map(), retros: [] };
  const LLAVE_FILTROS = "tdd-alumno-filtros";
  const numCaso = (id) => String(id).split(".").map((n) => Number(n) || 0);
  const porId = (a, b) => { const x = numCaso(a.id), y = numCaso(b.id); return (x[0] - y[0]) || ((x[1] || 0) - (y[1] || 0)); };
  function infoCaso(c) {
    const s = Array.isArray(c.secciones) ? c.secciones : [], vis = V.vistas.get(c.id) || new Set();
    const vistas = s.filter((x) => vis.has(x)).length, done = !!(V.porCaso.get(c.id) || {}).completo;
    const lim = c.entrega_limite ? new Date(c.entrega_limite).getTime() : null;
    return { vistas, total: s.length, done, lim, avance: s.length ? vistas / s.length : 0 };
  }
  function llenarFiltros() {
    const cont = $("#casosFiltros"); cont.hidden = V.casos.length < 2;
    let guardado = {}; try { guardado = JSON.parse(localStorage.getItem(LLAVE_FILTROS) || "{}"); } catch (_) {}
    const mods = [...new Set(V.casos.map((c) => c.modulo))].sort((a, b) => (a ?? 999) - (b ?? 999));
    const fm = $("#fModulo"); fm.replaceChildren(new Option("Todos", ""), ...mods.map((m) => new Option(m != null ? `Módulo ${m}` : "Sin módulo", String(m))));
    fm.value = mods.map(String).includes(guardado.modulo) ? guardado.modulo : "";
    if (guardado.estado != null) $("#fEstado").value = guardado.estado;
    if (guardado.orden) $("#fOrden").value = guardado.orden;
    if (!$("#fEstado").value && guardado.estado == null) $("#fEstado").value = "";
  }
  function pintarCasos() {
    const fm = $("#fModulo").value, fe = $("#fEstado").value, fo = $("#fOrden").value || "sugerido", q = $("#fBuscar").value.trim().toLowerCase();
    try { localStorage.setItem(LLAVE_FILTROS, JSON.stringify({ modulo: fm, estado: fe, orden: fo })); } catch (_) {}
    let lista = V.casos.map((c) => ({ c, i: infoCaso(c) })).filter(({ c, i }) => {
      if (fm && String(c.modulo) !== fm) return false;
      if (fe === "pendientes" && i.done) return false;
      if (fe === "curso" && (i.done || !i.vistas)) return false;
      if (fe === "nuevos" && (i.done || i.vistas)) return false;
      if (fe === "entregados" && !i.done) return false;
      if (q && !`caso ${c.id} ${c.titulo}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const fecha_ = (x) => (x.i.lim == null ? Infinity : x.i.lim);
    const grupo = (x) => (x.i.done ? 3 : x.i.vistas ? 0 : x.i.lim != null ? 1 : 2); // en curso, con fecha, sin fecha, entregados
    const orden = {
      sugerido: (a, b) => grupo(a) - grupo(b) || fecha_(a) - fecha_(b) || porId(a.c, b.c),
      fecha: (a, b) => fecha_(a) - fecha_(b) || porId(a.c, b.c),
      modulo: (a, b) => porId(a.c, b.c),
      avance: (a, b) => b.i.avance - a.i.avance || porId(a.c, b.c),
      clase: (a, b) => inicioClase(a.c) - inicioClase(b.c) || porId(a.c, b.c),
    }[fo] || ((a, b) => porId(a.c, b.c));
    lista.sort(orden);
    const cont = $("#casos"); cont.replaceChildren();
    let modulo = Symbol("ninguno");
    lista.forEach(({ c }) => {
      if (fo === "modulo" && !fm && c.modulo !== modulo) { modulo = c.modulo; cont.append(el("h3", "module-head", c.modulo != null ? `Módulo ${c.modulo}` : "Sin módulo")); }
      cont.append(tarjetaCaso(c, V.porCaso.get(c.id), V.vistas.get(c.id) || new Set(), V.retros.filter((r) => r.caso === c.id)));
    });
    $("#casosConteo").textContent = lista.length === V.casos.length ? `${V.casos.length} casos` : `${lista.length} de ${V.casos.length} casos`;
    if (!V.casos.length) cont.append(el("p", "notice", "Todavía no hay casos publicados para tu generación."));
    else if (!lista.length) cont.append(el("p", "notice", "Ningún caso coincide con el filtro."));
  }
  ["#fModulo", "#fEstado", "#fOrden", "#fBuscar"].forEach((s) => $(s).addEventListener("input", pintarCasos));

  // ---------- Mensajes con el profesor (esquema 0.8) ----------
  const M = { on: false, lista: [] };
  async function cargarMensajes() {
    try { M.lista = await api("/rest/v1/mensajes_curso?select=id,autor_nombre,de_alumno,tipo,caso,texto,creado,leido&order=id.asc&limit=1000"); M.on = true; }
    catch (_) { M.on = false; M.lista = []; }
  }
  const sinLeer = () => M.lista.filter((m) => !m.de_alumno && !m.leido);
  function pintarBuzon() {
    $("#buzonBtn").hidden = !M.on; $("#pmMensajes").hidden = !M.on;
    const n = sinLeer().length, c = $("#buzonCount");
    c.hidden = !n; c.textContent = String(n); $("#buzonBtn").classList.toggle("has-new", !!n);
    $("#buzonBtn").setAttribute("aria-label", n ? `Mensajes: ${n} sin leer` : "Mensajes con tu profesor");
    const tira = $("#avisoMensajes"); tira.hidden = !n || $("#vistaAvance").hidden; tira.replaceChildren();
    if (n) {
      const fb = sinLeer().filter((m) => m.tipo === "feedback").length;
      const t = el("span"); t.append(el("b", null, n === 1 ? "Tienes 1 mensaje nuevo" : `Tienes ${n} mensajes nuevos`),
        document.createTextNode(fb ? ` de tu profesor${fb === n ? " con comentarios sobre tus respuestas" : ", algunos sobre tus respuestas"}.` : " de tu profesor."));
      tira.append(t, el("span", null, "Leer →"));
    }
  }
  const temaDe = (caso) => { const c = V.casos.find((x) => x.id === caso); return c ? `Caso ${c.id}` : "General"; };
  function abrirMensajes(caso) {
    const sel = $("#mensajeTema"); sel.replaceChildren(new Option("Duda general del curso", ""));
    [...new Set(V.casos.map((c) => c.modulo))].sort((a, b) => (a ?? 999) - (b ?? 999)).forEach((m) => {
      const g = document.createElement("optgroup"); g.label = m != null ? `Módulo ${m}` : "Sin módulo";
      V.casos.filter((c) => c.modulo === m).sort(porId).forEach((c) => g.append(new Option(`Caso ${c.id} · ${c.titulo}`, c.id))); sel.append(g);
    });
    sel.value = caso || "";
    const nuevos = new Set(sinLeer().map((m) => m.id));
    pintarHilo(nuevos);
    const nota = $("#mensajeNota"); nota.className = "fine"; nota.textContent = "Lo leen tus profesores del curso. Te responden aquí mismo.";
    const d = $("#dlgMensajes"); if (!d.open) d.showModal();
    const lista = $("#mensajesLista"); lista.scrollTop = lista.scrollHeight;
    if (caso) $("#mensajeTexto").focus();
    if (nuevos.size) api("/rest/v1/rpc/marcar_mensajes_leidos", { method: "POST", body: "{}" })
      .then(() => { const t = new Date().toISOString(); M.lista.forEach((m) => { if (nuevos.has(m.id)) m.leido = t; }); pintarBuzon(); }).catch(() => {});
  }
  function pintarHilo(nuevos = new Set()) {
    const ol = $("#mensajesLista"); ol.replaceChildren();
    M.lista.forEach((m) => {
      const li = el("li", `msg ${m.de_alumno ? "mine" : "theirs"}${m.tipo === "feedback" ? " fb" : ""}${nuevos.has(m.id) ? " nuevo" : ""}`), meta = el("div", "meta");
      meta.append(el("b", null, m.de_alumno ? "Tú" : m.autor_nombre), document.createTextNode(` · ${temaDe(m.caso)}${m.tipo === "feedback" ? " · comentario a tu respuesta" : ""} · ${fecha(m.creado)}`));
      li.append(meta, el("p", null, m.texto)); ol.append(li);
    });
    if (!M.lista.length) ol.append(el("li", "empty", "Aquí aparecen los comentarios de tu profesor sobre tus respuestas y sus respuestas a tus dudas. ¿Te atoraste en un caso? Escríbele abajo."));
  }
  $("#buzonBtn").addEventListener("click", () => abrirMensajes());
  $("#avisoMensajes").addEventListener("click", () => abrirMensajes());
  $("#mensajesCerrar").addEventListener("click", () => $("#dlgMensajes").close());
  $("#dlgMensajes").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });
  $("#mensajeForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const b = $("#mensajeEnviar"), nota = $("#mensajeNota"), texto = $("#mensajeTexto").value.trim(); if (!texto) return;
    b.disabled = true; nota.className = "fine"; nota.textContent = "Enviando…";
    try {
      await api("/rest/v1/rpc/alumno_enviar_mensaje", { method: "POST", body: JSON.stringify({ p_texto: texto, p_caso: $("#mensajeTema").value || null }) });
      $("#mensajeTexto").value = ""; await cargarMensajes(); pintarHilo(); pintarBuzon();
      const lista = $("#mensajesLista"); lista.scrollTop = lista.scrollHeight;
      nota.className = "fine"; nota.textContent = "Enviado. Te avisamos aquí cuando te respondan.";
    } catch (e) {
      nota.className = "fine is-error"; nota.textContent = e.message && !/^HTTP/.test(e.message) ? e.message : "No se pudo enviar. Intenta de nuevo.";
    } finally { b.disabled = false; }
  });

  const BANDAS = { top5: "Top 5", top20: "Top 20 %", top50: "Top 50 %", en_camino: "En camino" };
  const ORDEN = ["en_camino", "top50", "top20", "top5"];
  const PARTES = [["secciones", "Secciones"], ["hipotesis", "Hipótesis"], ["retos", "Retos"], ["casos", "Casos completos"], ["puntualidad", "A tiempo"], ["respuestas", "Respuestas"]];
  const pct = (x) => (x == null ? "—" : `${Math.round(x * 100)} %`);

  function pintarMarcador(m) {
    const sec = $("#marcador");
    if (!m || !m.inscrito) { sec.hidden = true; return; }
    sec.hidden = false;
    $("#aliasInput").value = m.alias || "";
    // Top 5
    const top = $("#top5"); top.replaceChildren();
    (m.top5 || []).forEach((t) => {
      const li = el("li", t.soy_yo ? "me" : ""); const pts = el("span", "pts", String(t.bits)); pts.append(el("small", null, " bits"));
      li.append(el("span", "pos", String(t.posicion)), el("span", "who", t.alias), pts); top.append(li);
    });
    if (!(m.top5 || []).length) top.append(el("li", "empty", "Aún nadie suma bits. El primer reto acertado abre la tabla."));
    const main = $("#marcador .board-main");
    sec.classList.toggle("solo", !m.participa);
    $("#marcador .board-side h3").textContent = m.participa ? "Top 5" : "Top 5 · así lo ve tu grupo";
    if (!m.participa) {  // cuenta docente: solo el Top 5
      main.hidden = true; $("#aliasForm").hidden = true; return;
    }
    main.hidden = false; $("#aliasForm").hidden = false;
    $("#bitsVal").textContent = String(m.bits);
    const badge = $("#bandaBadge"); badge.className = `band-badge b-${m.banda}`;
    badge.textContent = `${BANDAS[m.banda]} · lugar ${m.posicion} de ${m.participantes}`;
    const sig = $("#siguiente"); sig.replaceChildren();
    if (!m.siguiente) sig.textContent = "Vas en primer lugar. Cada reto que aciertes amplía tu ventaja.";
    else if (m.siguiente.meta === "subir") sig.append(document.createTextNode("Te faltan "), el("b", null, `${m.siguiente.bits_faltantes} bits`), document.createTextNode(" para subir un lugar."));
    else sig.append(document.createTextNode("Te faltan "), el("b", null, `${m.siguiente.bits_faltantes} bits`), document.createTextNode(` para entrar al ${BANDAS[m.siguiente.meta]}.`));
    const nivel = ORDEN.indexOf(m.banda);
    document.querySelectorAll("#escalera li").forEach((li) => { const i = ORDEN.indexOf(li.dataset.b); li.className = i === nivel ? "here" : i < nivel ? "done" : ""; });
    // Mezcla de bits
    const d = m.desglose || {}; const total = PARTES.reduce((s, [k]) => s + (d[k] || 0), 0);
    const mix = $("#mezcla"), ley = $("#leyenda"); mix.replaceChildren(); ley.replaceChildren();
    mix.setAttribute("aria-label", PARTES.map(([k, n]) => `${n}: ${d[k] || 0}`).join(", "));
    PARTES.forEach(([k, n]) => {
      const v = d[k] || 0; if (total && v) { const i = el("i", `k-${k}`); i.style.width = `${(v / total) * 100}%`; mix.append(i); }
      const li = el("li"); li.append(el("i", `k-${k}`), document.createTextNode(`${n} `), el("b", null, String(v))); ley.append(li);
    });
    // Comparación con el grupo
    const g = m.grupo || {}; const cmp = $("#comparar"); cmp.replaceChildren();
    const tuTasa = d.retos_intentados ? d.primer_intento / d.retos_intentados : null;
    const fila = (t, v, nota) => { const w = el("div"); const dd = el("dd", null, v); if (nota) dd.append(el("small", null, ` ${nota}`)); w.append(el("dt", null, t), dd); cmp.append(w); };
    fila("Mediana del grupo", `${Math.round(g.mediana_bits || 0)} bits`, `· tú ${m.bits}`);
    fila("Aciertos al primer intento", pct(tuTasa), `· grupo ${pct(g.tasa_primer_intento)}`);
  }

  // Vacío = otra ciudad al azar (la base la elige sin repetir).
  $("#aliasOtra").addEventListener("click", () => { $("#aliasInput").value = ""; $("#aliasForm").requestSubmit(); });
  $("#aliasForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const nota = $("#aliasNota"), btn = $("#aliasGuardar"); btn.disabled = true;
    try {
      const nuevo = await api("/rest/v1/rpc/poner_alias", { method: "POST", body: JSON.stringify({ nuevo: $("#aliasInput").value }) });
      nota.className = "fine is-ok"; nota.textContent = `Listo: en el Top 5 apareces como «${nuevo || "Participante"}».`;
      if (nuevo) $("#aliasInput").value = nuevo;
      const m = await api("/rest/v1/rpc/mi_marcador", { method: "POST", body: "{}" }).catch(() => null);
      if (m) pintarMarcador(m);
    } catch (e) {
      nota.className = "fine is-error"; nota.textContent = e.message && !/^HTTP/.test(e.message) ? e.message : "No pudimos guardar tu alias. Intenta de nuevo.";
    } finally { btn.disabled = false; }
  });

  async function cargar() {
    soloVista("#cargando");
    const usuario = await api("/auth/v1/user");
    T.data = await tiemposListos;
    $("#session").hidden = false; pintarPerfil(usuario, null, false);
    const uid = encodeURIComponent(usuario.id);
    const [perfiles, casos, filas, eventos, rolBase, marcador, retros, entregas, clases] = await Promise.all([
      api(`/rest/v1/perfiles?select=alumno_id,nombre,grupo&id=eq.${uid}`),
      // cuaderno_url existe desde el esquema 0.8; en bases anteriores se piden sin él.
      api("/rest/v1/casos?select=id,modulo,titulo,secciones,entrega_limite,cuaderno_url&order=modulo.asc,id.asc")
        .catch(() => api("/rest/v1/casos?select=id,modulo,titulo,secciones,entrega_limite&order=modulo.asc,id.asc")),
      api("/rest/v1/vista_avance?select=usuario,alumno_id,nombre,grupo,caso,secciones_vistas,completo,ultimo_evento,entregado"),
      api(`/rest/v1/eventos?select=caso,seccion,tipo&usuario=eq.${uid}&tipo=eq.seccion&limit=5000`),
      // Rol: mi_rol (0.7) o, en bases anteriores, es_docente.
      api("/rest/v1/rpc/mi_rol", { method: "POST", body: "{}" }).catch(() => api("/rest/v1/rpc/es_docente", { method: "POST", body: "{}" }).catch(() => false)),
      // Si la base aún no tiene el esquema 0.5, el marcador simplemente no aparece.
      api("/rest/v1/rpc/mi_marcador", { method: "POST", body: "{}" }).catch(() => null),
      // Sus respuestas con su calificación (si ya la tiene), la más reciente primero.
      api(`/rest/v1/respuestas?select=caso,pregunta,texto,nivel,retro,modelo,creado&usuario=eq.${uid}&order=creado.desc&limit=500`).catch(() => []),
      // Fechas límite por grupo (0.7); si su grupo no tiene, cuenta la general del caso.
      api("/rest/v1/entregas_grupo?select=grupo,caso,limite").catch(() => []),
      // Clases en vivo y grabaciones de su grupo (0.10); en bases anteriores la sección no aparece.
      api("/rest/v1/rpc/mis_clases", { method: "POST", body: "{}" }).catch(() => []),
    ]);
    const docente = rolBase && typeof rolBase === "object" ? (rolBase.admin || rolBase.docente ? rolBase : false) : rolBase === true;
    const perfil = perfiles[0] || null;
    if (perfil && perfil.grupo) {
      const propias = new Map(entregas.filter((e) => e.grupo === perfil.grupo).map((e) => [e.caso, e.limite]));
      casos.forEach((c) => { if (propias.has(c.id)) c.entrega_limite = propias.get(c.id); });
    }
    pintarPerfil(usuario, perfil, docente);
    if (!perfil && !docente) {
      soloVista(null);
      aviso(`Entraste como ${usuario.email}, pero ese correo no está inscrito en una generación. Si ya te inscribiste con otro Gmail, sal y entra con ese. Si crees que es un error, escríbenos a`, true, CONTACTO);
      return;
    }
    soloVista("#vistaAvance"); $("#ayuda").hidden = false;
    // Mensajes: solo para alumnos inscritos (las cuentas del equipo responden desde su panel).
    if (perfil && !docente) await cargarMensajes(); else M.on = false;
    pintarClases(clases);
    pintarAvance({ usuario, perfil, casos, filas, eventos, retros });
    pintarBuzon();
    pintarMarcador(marcador);
    // La pestaña «Mi CV» (alumno-cv.js) se arma con los mismos datos.
    if (perfil) document.dispatchEvent(new CustomEvent("tdd:datos", { detail: { usuario, perfil, casos, filas, marcador } }));
    // La cuenta docente tiene su propio panel (docente.html); aquí solo el acceso.
    $("#vistaDocente").hidden = !docente;
  }

  function ejemplo() {
    const caso = { id: "4.1", modulo: 4, titulo: "Semmelweis y la fiebre puerperal", secciones: ["preparacion", "hipotesis", "clinicas", "azar", "sospechosos", "explicacion", "pista", "revelacion", "laboratorio", "cierre"], entrega_limite: null };
    const card = tarjetaCaso(caso, null, new Set(caso.secciones.slice(0, 6)));
    card.querySelector(".case-foot").replaceChildren(el("span", "due", "Entrega: la fija tu profesor"), el("span", "btn btn-line", "Continuar en Colab"));
    $("#ejemplo").append(card);
  }

  // ---------- Arranque ----------
  $("#entrar").addEventListener("click", TDD.entrar);
  $("#salir").addEventListener("click", () => salir("local"));
  $("#salirTodo").addEventListener("click", () => salir("global"));
  ejemplo();
  const retorno = TDD.tomarRetorno();
  mostrarEntrar();
  if (retorno.error) {
    const sinRegistro = /sign ?ups? not allowed|signup/i.test(retorno.error);
    aviso(sinRegistro ? "Ese correo de Google no está inscrito en una generación. Entra con el Gmail que diste al inscribirte o escríbenos a" : "No pudimos completar el inicio de sesión. Intenta de nuevo; si el problema sigue, escríbenos a", true, CONTACTO);
  }
  if (TDD.iniciar()) {
    cargar().catch((e) => {
      if (e.message === "sesion") { TDD.olvidar(); mostrarEntrar(); aviso("Tu sesión expiró. Vuelve a entrar con Google.", false); return; }
      soloVista(null); $("#session").hidden = false;
      aviso("No pudimos cargar tu avance. Revisa tu conexión y recarga la página. Si sigue fallando, escríbenos a", true, CONTACTO);
    });
  }
})();
