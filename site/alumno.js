// Área del alumno: login con Google y lectura del avance que registran los cuadernos.
// La sesión y las llamadas a Supabase viven en sesion.js (compartido con el panel docente).
// La seguridad la pone la base: cada alumno solo ve lo suyo.
(function () {
  const api = TDD.api;
  const CONTACTO = "augmentedlearninglabs@gmail.com";
  // Cuadernos de cada caso en Drive (el acceso lo controla Drive).
  const CUADERNOS = {
    "4.1": "https://colab.research.google.com/drive/1E4PWnQdLVix_dXfUtap-kpdaKhzKnXIA",
    "4.2": "https://colab.research.google.com/drive/1SV7ufg8pfS0EfuzRZM3fF0sORgZRDtIS",
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
    if (docente) chip("", "Docente");
    $("#pmAlias").hidden = !perfil;
    $("#pmPanel").hidden = !docente;
  }
  $("#perfilBtn").addEventListener("click", (e) => { e.stopPropagation(); abrirMenu($("#perfilMenu").hidden); });
  document.addEventListener("click", (e) => { if (!e.target.closest("#session")) cerrarMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#perfilMenu").hidden) { abrirMenu(false); $("#perfilBtn").focus(); } });
  document.querySelectorAll("#perfilMenu [data-ir]").forEach((b) => b.addEventListener("click", () => {
    cerrarMenu(); const ir = b.dataset.ir;
    const tab = ir === "cv" ? $("#tabCV") : $("#tabAvance"); if (tab && !$("#tabs").hidden) tab.click();
    if (ir === "alias") { const a = $("#aliasInput"); if (a && !$("#marcador").hidden) { a.scrollIntoView({ behavior: "smooth", block: "center" }); a.focus({ preventScroll: true }); } }
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }));

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

  // Última calificación de cada pregunta del caso, con la retroalimentación del profesor.
  function comentarios(retros) {
    const ultimas = new Map();
    (retros || []).forEach((r) => { if (!ultimas.has(r.pregunta)) ultimas.set(r.pregunta, r); });
    if (!ultimas.size) return null;
    const d = el("details", "feedback"); d.open = true;
    d.append(el("summary", null, `Comentarios de tu profesor · ${ultimas.size}`));
    const ul = el("ul");
    ultimas.forEach((r) => {
      const li = el("li"); const fila = el("div");
      fila.append(el("b", null, PREGUNTAS[r.pregunta] || etiqueta(r.pregunta)), el("span", "lvl", r.nivel != null ? `Nivel ${r.nivel} de 3 · ${5 * r.nivel} bits` : "Con comentario"));
      li.append(fila); if (r.retro) li.append(el("p", null, r.retro)); ul.append(li);
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
    top.append(t, el("span", `status ${clase}`, estado));

    const track = el("div", "track"); track.setAttribute("role", "img"); track.setAttribute("aria-label", `${vistas} de ${secciones.length} secciones resueltas`);
    let k = 0;
    secciones.forEach((s) => { const i = el("i", vistasSet.has(s) ? "on" : ""); i.title = etiqueta(s); if (vistasSet.has(s)) i.style.setProperty("--k", k++); track.append(i); });

    const siguiente = secciones.find((s) => !vistasSet.has(s));
    const meta = el("div", "track-meta");
    const izq = el("span"); izq.append(el("b", null, `${vistas} de ${secciones.length}`), document.createTextNode(" secciones"));
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
    if (CUADERNOS[caso.id]) {
      const a = el("a", "btn btn-line", done ? "Repasar en Colab" : vistas ? "Continuar en Colab" : "Abrir en Colab");
      a.href = CUADERNOS[caso.id]; a.target = "_blank"; a.rel = "noopener"; foot.append(a);
    } else foot.append(el("span", "muted", "Tu profesor te comparte el cuaderno"));

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

    const cont = $("#casos"); cont.replaceChildren();
    casos.forEach((c) => cont.append(tarjetaCaso(c, porCaso.get(c.id), vistas.get(c.id) || new Set(), (retros || []).filter((r) => r.caso === c.id))));
    if (!casos.length) cont.append(el("p", "notice", "Todavía no hay casos publicados para tu generación."));
  }

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

  $("#aliasForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const nota = $("#aliasNota"), btn = $("#aliasGuardar"); btn.disabled = true;
    try {
      const nuevo = await api("/rest/v1/rpc/poner_alias", { method: "POST", body: JSON.stringify({ nuevo: $("#aliasInput").value }) });
      nota.className = "fine is-ok"; nota.textContent = nuevo ? `Listo: en el Top 5 apareces como «${nuevo}».` : "Listo: en el Top 5 apareces como «Participante».";
      const m = await api("/rest/v1/rpc/mi_marcador", { method: "POST", body: "{}" }).catch(() => null);
      if (m) pintarMarcador(m);
    } catch (e) {
      nota.className = "fine is-error"; nota.textContent = e.message && !/^HTTP/.test(e.message) ? e.message : "No pudimos guardar tu alias. Intenta de nuevo.";
    } finally { btn.disabled = false; }
  });

  async function cargar() {
    soloVista("#cargando");
    const usuario = await api("/auth/v1/user");
    $("#session").hidden = false; pintarPerfil(usuario, null, false);
    const uid = encodeURIComponent(usuario.id);
    const [perfiles, casos, filas, eventos, docente, marcador, retros] = await Promise.all([
      api(`/rest/v1/perfiles?select=alumno_id,nombre,grupo&id=eq.${uid}`),
      api("/rest/v1/casos?select=id,modulo,titulo,secciones,entrega_limite&order=modulo.asc,id.asc"),
      api("/rest/v1/vista_avance?select=usuario,alumno_id,nombre,grupo,caso,secciones_vistas,completo,ultimo_evento,entregado"),
      api(`/rest/v1/eventos?select=caso,seccion,tipo&usuario=eq.${uid}&tipo=eq.seccion&limit=5000`),
      api("/rest/v1/rpc/es_docente", { method: "POST", body: "{}" }).catch(() => false),
      // Si la base aún no tiene el esquema 0.5, el marcador simplemente no aparece.
      api("/rest/v1/rpc/mi_marcador", { method: "POST", body: "{}" }).catch(() => null),
      // Solo respuestas ya calificadas (nivel o comentario), la más reciente primero.
      api(`/rest/v1/respuestas?select=caso,pregunta,nivel,retro,creado&usuario=eq.${uid}&modelo=not.is.null&order=creado.desc&limit=500`).catch(() => []),
    ]);
    const perfil = perfiles[0] || null;
    pintarPerfil(usuario, perfil, docente);
    if (!perfil && !docente) {
      soloVista(null);
      aviso(`Entraste como ${usuario.email}, pero ese correo no está inscrito en una generación. Si ya te inscribiste con otro Gmail, sal y entra con ese. Si crees que es un error, escríbenos a`, true, CONTACTO);
      return;
    }
    soloVista("#vistaAvance"); $("#ayuda").hidden = false;
    pintarAvance({ usuario, perfil, casos, filas, eventos, retros });
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
