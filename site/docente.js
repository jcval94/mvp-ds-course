// Panel docente: solo para la cuenta docente.
// Lee con la seguridad por fila de Supabase (la base decide qué ve cada cuenta) y cambia datos únicamente con
// las funciones docente_* (que comprueban es_docente() y anotan en la bitácora) y con la Edge Function tdd-docente
// (altas y claves de Colab; la única pieza con la clave secreta). Nada aquí borra registros.
(function () {
  const { api, rpc, todo, funcion } = TDD;
  const TZ = "America/Mexico_City";
  const DOMINIO_INTERNO = "@alumnos.taqueriadedatos.mx";
  const URL_ALUMNO = new URL("alumno.html", location.href).href; // sin dominio fijo: el sitio funciona en cualquier hosting
  const MIN = 60000, DIA = 86400000;
  const SECCIONES = {
    preparacion: "Preparación", hipotesis: "Hipótesis", clinicas: "Clínicas", azar: "Azar", sospechosos: "Sospechosos",
    explicacion: "Explicación", pista: "Pista", revelacion: "Revelación", laboratorio: "Laboratorio", cierre: "Cierre",
    total: "Total", departamentos: "Departamentos",
  };
  // Etiquetas de las respuestas abiertas (mismas que ETIQUETAS en casos/caso_X_Y.py del backend).
  const PREGUNTAS = {
    "4.1": { explicacion: "¿Qué hacían los médicos que no hacían las parteras?" },
    "4.2": { explicacion: "Explicación antes de la pista" },
    "*": { hipotesis_razon: "Razón de la hipótesis", explicacion: "Explicación", ejemplo: "Ejemplo para su trabajo" },
  };
  const MOTIVOS = {
    sin_secretos: "Sin secretos en Colab", sin_permiso: "Sin acceso a secretos",
    secreto_vacio: "Secreto vacío", clave_incorrecta: "Clave o ID incorrectos", sin_conexion: "Sin conexión",
    fuera_de_colab: "Fuera de Colab", otro: "Otro motivo",
  };
  const ACCIONES = {
    instalacion: "Instalación", borrado: "Borrado", vaciado: "Vaciado", respaldo: "Respaldo", docente_alta: "Alta",
    docente_edita: "Edición", docente_clave: "Clave nueva", docente_fecha: "Fecha límite", docente_reto: "Reto", docente_califica: "Calificación",
  };
  const TIPOS = { abrio: "Abrió el cuaderno", seccion: "Resolvió", hipotesis: "Hipótesis", respuesta: "Respondió", pista: "Pidió pista", control: "Control", completo: "Entregó el caso" };
  const PARTES = [["secciones", "Secciones"], ["hipotesis", "Hipótesis"], ["retos", "Retos"], ["casos", "Casos completos"], ["puntualidad", "A tiempo"], ["respuestas", "Respuestas"]];

  // ---------- Utilidades ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function boton(texto, cls, alClic) { const b = el("button", cls, texto); b.type = "button"; if (alClic) b.addEventListener("click", alClic); return b; }
  const secc = (s) => SECCIONES[s] || (String(s).charAt(0).toUpperCase() + String(s).slice(1)).replace(/_/g, " ");
  const pregunta = (caso, p) => (PREGUNTAS[caso] || {})[p] || PREGUNTAS["*"][p] || secc(p);
  const hora = (iso) => new Date(iso).toLocaleString("es-MX", { timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });
  const fecha = (iso) => new Date(iso).toLocaleString("es-MX", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const dia = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ }); // AAAA-MM-DD en CDMX
  const rtf = new Intl.RelativeTimeFormat("es-MX", { numeric: "auto" });
  function relativo(iso) {
    if (!iso) return "—";
    const s = (new Date(iso) - Date.now()) / 1000, a = Math.abs(s);
    const [v, u] = a < 3600 ? [s / 60, "minute"] : a < 86400 ? [s / 3600, "hour"] : a < 86400 * 45 ? [s / 86400, "day"] : [s / 86400 / 30, "month"];
    return rtf.format(Math.round(v), u);
  }
  const pct = (x) => (x == null || isNaN(x) ? "—" : `${Math.round(x * 100)} %`);
  const iniciales = (n) => String(n || "").trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();
  const tddId = (a) => (!a.correo || a.correo.endsWith(DOMINIO_INTERNO) ? a.alumno_id : a.correo);
  const marca = () => new Date().toLocaleString("sv-SE", { timeZone: TZ }).slice(0, 16).replace(/[-:]/g, "").replace(" ", "_");
  function avatar(nombre) { return el("span", "av", iniciales(nombre)); }
  function pill(texto, cls) { return el("span", `pill${cls ? ` ${cls}` : ""}`, texto); }

  function descargar(nombre, texto, tipo) {
    const url = URL.createObjectURL(new Blob([texto], { type: tipo }));
    const a = el("a"); a.href = url; a.download = nombre; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function csv(filas) {
    const c = (v) => { const s = v == null ? "" : String(v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    return "﻿" + filas.map((f) => f.map(c).join(",")).join("\r\n") + "\r\n"; // con BOM para que Excel lea acentos
  }
  async function copiar(texto) {
    try { await navigator.clipboard.writeText(texto); }
    catch (_) { const t = el("textarea"); t.value = texto; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
    toast("Copiado");
  }
  let tToast = null;
  function toast(texto) {
    let t = $(".toast"); if (!t) { t = el("div", "toast"); t.setAttribute("role", "status"); document.body.append(t); }
    t.textContent = texto; t.hidden = false; clearTimeout(tToast); tToast = setTimeout(() => { t.hidden = true; }, 2600);
  }
  function aviso(texto, error, enlace) {
    const n = $("#notice"); n.replaceChildren(); n.hidden = !texto; if (!texto) return;
    n.classList.toggle("is-error", !!error); n.append(document.createTextNode(texto));
    if (enlace) { const a = el("a", null, enlace.texto); a.href = enlace.href; n.append(" ", a, "."); }
  }
  // Mensajes de error claros para la Edge Function.
  function errorFuncion(e) {
    if (e instanceof TypeError || e.status === 404) return "No encontré la función tdd-docente. Despliégala en Supabase (Edge Functions → Via Editor, nombre tdd-docente).";
    if (e.status === 401 && /jwt/i.test(e.message)) return `${e.message}. Si persiste, desactiva «Verify JWT» en los detalles de la función: ella misma verifica tu sesión.`;
    return e.message || "La función tdd-docente no respondió.";
  }
  function confirmar(titulo, texto, si = "Confirmar") {
    const d = $("#dlgConfirmar"); $("#confTitle").textContent = titulo; $("#confTexto").textContent = texto; $("#confSi").textContent = si;
    d.returnValue = ""; d.showModal();
    return new Promise((ok) => d.addEventListener("close", () => ok(d.returnValue === "si"), { once: true }));
  }

  // ---------- Estado ----------
  const S = { usuario: null, alumnos: [], porUid: new Map(), casos: [], avance: [], eventos: [], respuestas: [], retos: [], material: [],
    invitados: [], bitacora: [], esquema: true, fn: null, cargado: null, mostrarClaves: new Set(), ordenAlumnos: { k: "id", dir: "asc" } };
  const total = (c) => (Array.isArray(c.secciones) ? c.secciones.length : 0);

  function armar(r) {
    const val = (i, d) => (r[i].status === "fulfilled" ? r[i].value : d);
    if (r[3].status === "rejected") throw r[3].reason; // sin casos no hay panel
    S.esquema = r[0].status === "fulfilled";
    S.casos = val(3, []);
    S.retos = val(2, []);
    S.material = val(7, []);
    S.invitados = val(8, []);
    S.bitacora = val(9, []);
    S.fn = r[10].status === "fulfilled" ? { ok: true, version: r[10].value && r[10].value.version } : { ok: false, error: errorFuncion(r[10].reason || {}) };
    const base = S.esquema ? val(0, []) : val(11, []).map((p) => ({ ...p, correo: null, ultimo_acceso: null, con_google: null }));
    const bits = new Map(val(1, []).map((b) => [b.alumno_id, b]));
    S.alumnos = base.filter((a) => a.alumno_id !== "DOCENTE").map((a) => {
      const b = bits.get(a.alumno_id) || {};
      return { ...a, bits: b.bits || 0, posicion: b.posicion || null, desglose: b.desglose || {}, avance: new Map(), vistas: new Map(),
        hipotesis: new Map(), eventos: [], respuestas: [], ultima: null, ultimoEvento: null };
    });
    S.porUid = new Map(S.alumnos.map((a) => [a.id, a]));
    const seccionesDe = new Map(S.casos.map((c) => [c.id, new Set(c.secciones || [])]));
    S.eventos = val(5, []);
    S.eventos.forEach((e) => {
      const a = S.porUid.get(e.usuario); if (!a) return; // eventos de la cuenta docente o de cuentas sin perfil
      a.eventos.push(e);
      if (!a.ultima || e.creado > a.ultima) { a.ultima = e.creado; a.ultimoEvento = e; }
      if (e.tipo === "seccion" && e.seccion && (seccionesDe.get(e.caso) || new Set()).has(e.seccion)) {
        if (!a.vistas.has(e.caso)) a.vistas.set(e.caso, new Set()); a.vistas.get(e.caso).add(e.seccion);
      }
      if (e.tipo === "hipotesis" && e.valor && e.valor.opcion) a.hipotesis.set(e.caso, String(e.valor.opcion));
    });
    S.avance = val(4, []);
    S.avance.forEach((f) => { const a = S.porUid.get(f.usuario); if (a) a.avance.set(f.caso, f); });
    S.alumnos.forEach((a) => a.eventos.sort((x, y) => (x.creado < y.creado ? -1 : x.creado > y.creado ? 1 : x.id - y.id)));
    S.respuestas = val(6, []).filter((x) => S.porUid.has(x.usuario));
    const ultimas = new Map();
    S.respuestas.forEach((x) => { ultimas.set(`${x.usuario}|${x.caso}|${x.pregunta}`, x.id); });
    S.respuestas.forEach((x) => { x.ultima = ultimas.get(`${x.usuario}|${x.caso}|${x.pregunta}`) === x.id; S.porUid.get(x.usuario).respuestas.push(x); });
    S.cargado = new Date();
  }

  const pendientes = () => S.respuestas.filter((x) => x.ultima && !x.modelo);
  const activo = (a, ms) => a.ultima && Date.now() - new Date(a.ultima) < ms;
  function estadoEntrega(a, c) {
    const f = a.avance.get(c.id);
    if (f && f.completo) {
      const tarde = c.entrega_limite && f.entregado && new Date(f.entregado) > new Date(c.entrega_limite);
      return tarde ? ["Entregado tarde", "crit", "tarde"] : ["Entregado", "ok", "a tiempo"];
    }
    if (c.entrega_limite && new Date(c.entrega_limite) < new Date()) return ["Vencido", "crit", "sin entregar"];
    return (a.vistas.get(c.id) || new Set()).size ? ["En curso", "", "sin entregar"] : ["Sin empezar", "", "sin entregar"];
  }

  // ---------- Carga ----------
  async function cargar(silencioso) {
    if (!silencioso) soloVista("#cargando");
    const usuario = await api("/auth/v1/user");
    S.usuario = usuario; $("#session").hidden = false; pintarPerfil(usuario);
    const docente = await rpc("es_docente").catch(() => false);
    if (docente !== true) {
      soloVista(null);
      aviso(`Entraste como ${usuario.email}. Este panel es solo para la cuenta docente; tu avance está en`, true, { texto: "Mi avance", href: "alumno.html" });
      return;
    }
    const r = await Promise.allSettled([
      rpc("docente_alumnos"),
      rpc("bits_grupo"),
      rpc("docente_retos"),
      api("/rest/v1/casos?select=id,modulo,titulo,secciones,entrega_limite&order=modulo.asc,id.asc"),
      todo("/rest/v1/vista_avance?select=usuario,caso,secciones_vistas,completo,primer_evento,ultimo_evento,entregado&order=usuario.asc,caso.asc"),
      todo("/rest/v1/eventos?select=id,usuario,caso,seccion,tipo,valor,creado&order=id.asc"),
      todo("/rest/v1/respuestas?select=id,usuario,caso,pregunta,texto,etapa,nivel,retro,modelo,creado&order=id.asc"),
      api("/rest/v1/material_docente?select=caso,clave,orden,titulo,contenido&order=caso.asc,orden.asc"),
      api("/rest/v1/vista_invitados?select=caso,motivo,sesiones,completaron,secciones_abiertas,ultimo_evento"),
      api("/rest/v1/bitacora?select=id,creado,accion,tabla,filas,detalle&order=id.desc&limit=300"),
      funcion("tdd-docente", { accion: "estado" }),
      api("/rest/v1/perfiles?select=id,alumno_id,nombre,grupo,alias,creado&order=alumno_id.asc"),
    ]);
    armar(r);
    aviso(null);
    soloVista("#panel");
    pintarTodo();
  }

  function pintarTodo() {
    $("#actualizado").textContent = `${S.alumnos.length} alumnos · ${S.casos.length} casos · actualizado ${S.cargado.toLocaleTimeString("es-MX", { timeZone: TZ, hour: "2-digit", minute: "2-digit" })}`;
    $("#cntAlumnos").textContent = S.alumnos.length || "";
    $("#cntRespuestas").textContent = pendientes().length || "";
    pintarBanners(); pintarResumen(); llenarFiltros(); pintarAlumnos(); pintarCasos(); pintarRespuestas(); pintarDatos();
  }

  // ---------- Vistas generales ----------
  function soloVista(id) { ["#vistaEntrar", "#cargando", "#panel"].forEach((s) => { $(s).hidden = s !== id; }); }
  function mostrarEntrar() { soloVista("#vistaEntrar"); $("#session").hidden = true; }

  function pintarBanners() {
    const b = $("#banners"); b.replaceChildren();
    const banner = (texto, error, enlace) => {
      const d = el("div", `banner${error ? " is-error" : ""}`); const p = el("div"); p.append(document.createTextNode(texto));
      if (enlace) { const a = el("a", null, enlace[0]); a.href = enlace[1]; a.target = "_blank"; a.rel = "noopener"; p.append(" ", a); }
      d.append(p); b.append(d);
    };
    if (!S.esquema) banner("Falta el esquema 0.6.0 en la base: el panel puede leer, pero no editar ni calificar. Ejecuta los pasos 1 a 3 del instalador.", true, ["Abrir instalador", "https://colab.research.google.com/github/jcval94/agentic-ds-backen/blob/main/instalador.ipynb"]);
    if (S.fn && !S.fn.ok) banner(`Altas y claves no disponibles: ${S.fn.error}`, true, ["Abrir Edge Functions", "https://supabase.com/dashboard/project/tvxhocccdetkukonhhnh/functions"]);
  }

  // ---------- Perfil ----------
  function pintarPerfil(usuario) {
    const nombre = usuario.user_metadata?.full_name || usuario.email;
    $("#pmNombre").textContent = nombre; $("#who").textContent = usuario.email;
    const ini = iniciales(nombre), foto = usuario.user_metadata?.avatar_url || usuario.user_metadata?.picture;
    [["#avatar", "#iniciales"], ["#avatarMenu", "#inicialesMenu"]].forEach(([img, txt]) => {
      if (foto) { $(img).src = foto; $(img).hidden = false; $(txt).textContent = ""; $(img).onerror = () => { $(img).hidden = true; $(txt).textContent = ini; }; }
      else { $(img).hidden = true; $(txt).textContent = ini; }
    });
    const chips = $("#pmChips"); chips.replaceChildren(); const c = el("span"); c.append(el("b", null, "Docente")); chips.append(c);
  }
  function abrirMenu(abrir) { $("#perfilMenu").hidden = !abrir; $("#perfilBtn").setAttribute("aria-expanded", String(abrir)); }
  $("#perfilBtn").addEventListener("click", (e) => { e.stopPropagation(); abrirMenu($("#perfilMenu").hidden); });
  document.addEventListener("click", (e) => { if (!e.target.closest("#session")) abrirMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#perfilMenu").hidden) { abrirMenu(false); $("#perfilBtn").focus(); } });
  async function salir(scope) { abrirMenu(false); await TDD.cerrar(scope); mostrarEntrar(); aviso(scope === "global" ? "Cerraste sesión en todos tus dispositivos." : "Cerraste sesión.", false); }

  // ---------- Pestañas ----------
  const TABS = ["resumen", "alumnos", "casos", "respuestas", "datos"];
  function irA(tab) {
    TABS.forEach((t) => { $(`#tab-${t}`).setAttribute("aria-selected", String(t === tab)); $(`#v-${t}`).hidden = t !== tab; });
    try { localStorage.setItem("tdd-panel-tab", tab); } catch (_) {}
  }
  TABS.forEach((t) => $(`#tab-${t}`).addEventListener("click", () => irA(t)));
  const pestana = () => TABS.find((t) => $(`#tab-${t}`).getAttribute("aria-selected") === "true");

  // ---------- Resumen ----------
  function kpi(titulo, valor, nota, opciones = {}) {
    const k = el(opciones.ir ? "button" : "div", `kpi${opciones.hot ? " hot" : ""}`);
    if (opciones.ir) { k.type = "button"; k.addEventListener("click", opciones.ir); }
    const v = el("b", null, valor); if (opciones.live) { const d = el("span", `live${opciones.hot ? "" : " off"}`); v.prepend(d, " "); }
    k.append(el("span", null, titulo), v, el("small", null, nota)); return k;
  }

  function pintarResumen() {
    const A = S.alumnos, n = A.length, C = S.casos;
    const ahora = A.filter((a) => activo(a, 15 * MIN)), hoy = A.filter((a) => a.ultima && dia(a.ultima) === dia(Date.now())), semana = A.filter((a) => activo(a, 7 * DIA));
    const totalSec = C.reduce((s, c) => s + total(c), 0);
    const promedio = n && totalSec ? A.reduce((s, a) => s + C.reduce((t, c) => t + (a.vistas.get(c.id) || new Set()).size, 0) / totalSec, 0) / n : null;
    let entregas = 0, aTiempo = 0, tarde = 0;
    A.forEach((a) => C.forEach((c) => { const e = estadoEntrega(a, c); if (e[2] !== "sin entregar") { entregas++; e[2] === "tarde" ? tarde++ : aTiempo++; } }));
    const conGoogle = A.filter((a) => a.con_google).length, nunca = A.filter((a) => S.esquema ? !a.ultimo_acceso : !a.ultima).length;
    const pend = pendientes().length;
    const k = $("#kpis"); k.replaceChildren(
      kpi("Alumnos inscritos", String(n), S.esquema ? `${conGoogle} con Google · ${nunca} sin entrar nunca` : `${nunca} sin actividad`, { ir: () => irA("alumnos") }),
      kpi("Activos ahora", String(ahora.length), `Hoy ${hoy.length} · últimos 7 días ${semana.length}`, { hot: ahora.length > 0, live: true }),
      kpi("Avance del grupo", promedio == null ? "—" : pct(promedio), "secciones resueltas, en promedio"),
      kpi("Entregas", `${entregas}/${n * C.length}`, `${aTiempo} a tiempo · ${tarde} tarde`, { ir: () => irA("casos") }),
      kpi("Por calificar", String(pend), "respuestas abiertas", { hot: pend > 0, ir: () => { $("#rEstado").value = "pendientes"; pintarRespuestas(); irA("respuestas"); } }),
    );

    // Actividad: alumnos distintos por día (últimos 14 días, hora de CDMX)
    const dias = []; for (let i = 13; i >= 0; i--) dias.push(dia(Date.now() - i * DIA));
    const porDia = new Map(dias.map((d) => [d, { alumnos: new Set(), eventos: 0 }]));
    S.eventos.forEach((e) => { if (!S.porUid.has(e.usuario)) return; const d = porDia.get(dia(e.creado)); if (d) { d.alumnos.add(e.usuario); d.eventos++; } });
    const max = Math.max(1, ...[...porDia.values()].map((d) => d.alumnos.size));
    const ch = $("#actividad"); ch.replaceChildren();
    const resumenDias = [];
    dias.forEach((d, i) => {
      const v = porDia.get(d), col = el("div", "col"), bar = el("div", `bar${i === 13 ? " today" : ""}${v.alumnos.size ? "" : " zero"}`);
      bar.style.height = `${Math.max(3, (v.alumnos.size / max) * 100)}%`; bar.style.animationDelay = `${i * 30}ms`;
      const f = new Date(`${d}T12:00:00`);
      const etq = i === 13 ? "hoy" : f.toLocaleDateString("es-MX", { weekday: "narrow", day: "numeric" });
      bar.title = `${f.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "short" })}: ${v.alumnos.size} alumnos · ${v.eventos} eventos`;
      bar.append(el("b", null, String(v.alumnos.size))); col.append(bar, el("small", null, etq)); ch.append(col);
      resumenDias.push(`${etq} ${v.alumnos.size}`);
    });
    ch.setAttribute("aria-label", `Alumnos activos por día: ${resumenDias.join(", ")}`);

    // Activos ahora
    const act = $("#activos"); act.replaceChildren();
    $("#liveDot").className = `live${ahora.length ? "" : " off"}`;
    ahora.sort((x, y) => (y.ultima > x.ultima ? 1 : -1)).forEach((a) => {
      const e = a.ultimoEvento, p = boton("", "person", () => abrirFicha(a.id));
      p.append(avatar(a.nombre), el("span", null, a.nombre), el("small", null, e ? `Caso ${e.caso}${e.seccion ? ` · ${secc(e.seccion)}` : ""}` : ""));
      act.append(p);
    });
    if (!ahora.length) act.append(el("p", "empty", hoy.length ? `Nadie en este momento. Hoy avanzaron ${hoy.length}.` : "Nadie en este momento."));

    // Top 5
    const top = $("#top5"); top.replaceChildren();
    [...A].filter((a) => a.bits > 0).sort((x, y) => y.bits - x.bits).slice(0, 5).forEach((a) => {
      const li = el("li"); const w = el("span", "who"); w.append(document.createTextNode(a.nombre), el("small", null, a.alias ? ` · «${a.alias}»` : " · sin alias"));
      li.append(el("span", "pos", String(a.posicion || "")), w, el("b", "num", `${a.bits} bits`)); li.style.cursor = "pointer"; li.addEventListener("click", () => abrirFicha(a.id)); top.append(li);
    });
    if (!top.children.length) top.append(el("li", "empty", "Aún nadie suma bits."));

    pintarAlertas();
  }

  function pintarAlertas() {
    const ul = $("#alertas"); ul.replaceChildren();
    const alerta = (texto, nota, crit, accion) => {
      const li = el("li", crit ? "crit" : ""); const d = el("div");
      d.append(document.createTextNode(texto)); if (nota) d.append(el("small", null, nota));
      if (accion) { const b = boton(accion[0], null, accion[1]); d.append(b); }
      li.append(el("i", null, crit ? "!" : "i"), d); ul.append(li);
    };
    const A = S.alumnos, n = A.length;
    const verAlumnos = (estado) => () => { $("#filtroEstado").value = estado; pintarAlumnos(); irA("alumnos"); };
    if (S.esquema) {
      const nunca = A.filter((a) => !a.ultimo_acceso);
      if (nunca.length) alerta(`${nunca.length} ${nunca.length === 1 ? "alumno nunca ha entrado" : "alumnos nunca han entrado"}`, "Ni a Colab ni a Mi avance: revisa que tengan sus secretos.", nunca.length > n / 3, ["Ver quiénes", verAlumnos("sin_entrar")]);
    }
    const inactivos = A.filter((a) => a.ultima && !activo(a, 7 * DIA));
    if (inactivos.length) alerta(`${inactivos.length} sin actividad en 7 días`, inactivos.slice(0, 3).map((a) => a.nombre).join(", ") + (inactivos.length > 3 ? "…" : ""), false, ["Ver lista", verAlumnos("inactivos")]);
    S.casos.forEach((c) => {
      if (!c.entrega_limite || !n) return;
      const limite = new Date(c.entrega_limite), faltan = A.filter((a) => !(a.avance.get(c.id) || {}).completo).length;
      if (!faltan) return;
      if (limite > new Date() && limite - Date.now() < 7 * DIA) alerta(`Caso ${c.id} vence ${relativo(c.entrega_limite)}`, `Faltan ${faltan} de ${n} por entregar.`, limite - Date.now() < 2 * DIA, ["Ver caso", () => irA("casos")]);
      else if (limite < new Date() && Date.now() - limite < 7 * DIA) alerta(`Caso ${c.id} venció ${relativo(c.entrega_limite)}`, `${faltan} de ${n} no lo entregaron.`, true, ["Exportar CSV", () => { $("#csvCaso").value = c.id; irA("datos"); }]);
      // ¿Dónde se detiene el grupo?
      const conteos = (c.secciones || []).map((s) => A.filter((a) => (a.vistas.get(c.id) || new Set()).has(s)).length);
      let peor = null;
      conteos.forEach((v, i) => { if (i && conteos[i - 1] >= 3) { const caida = (conteos[i - 1] - v) / conteos[i - 1]; if (caida >= 0.3 && (!peor || caida > peor.caida)) peor = { i, caida, n: conteos[i - 1] - v }; } });
      if (peor) alerta(`Caso ${c.id}: ${peor.n} ${peor.n === 1 ? "se detiene" : "se detienen"} en «${secc(c.secciones[peor.i])}»`, `Llegaron a «${secc(c.secciones[peor.i - 1])}» pero no avanzaron.`, false, ["Ver avance", () => irA("casos")]);
    });
    S.retos.filter((x) => x.alumnos >= 3 && x.acierto_primer != null && Number(x.acierto_primer) < 0.35).forEach((x) =>
      alerta(`Reto «${x.reto}» (caso ${x.caso}): ${pct(Number(x.acierto_primer))} acierta al primer intento`, "Puede ser difícil de más o estar mal planteado; revisa el enunciado y la tolerancia.", false, ["Ver reto", () => irA("casos")]));
    const pend = pendientes().length;
    if (pend) alerta(`${pend} ${pend === 1 ? "respuesta por calificar" : "respuestas por calificar"}`, "Cada nivel vale 5 bits para el alumno.", false, ["Calificar", () => { $("#rEstado").value = "pendientes"; pintarRespuestas(); irA("respuestas"); }]);
    const respaldo = S.bitacora.find((b) => b.accion === "respaldo");
    if (!respaldo) alerta("No hay respaldo registrado", "Ejecuta el paso 10 del instalador cada semana: el plan gratuito de Supabase no respalda.", true);
    else if (Date.now() - new Date(respaldo.creado) > 7 * DIA) alerta(`Último respaldo ${relativo(respaldo.creado)}`, "Ejecuta el paso 10 del instalador.", Date.now() - new Date(respaldo.creado) > 14 * DIA);
    $("#alertasNota").textContent = ul.children.length ? `${ul.children.length} ${ul.children.length === 1 ? "punto" : "puntos"}` : "";
    if (!ul.children.length) alerta("Todo en orden", "Sin pendientes por ahora.", false);
  }

  // ---------- Alumnos ----------
  function llenarFiltros() {
    const grupos = [...new Set(S.alumnos.map((a) => a.grupo).filter(Boolean))].sort();
    const fg = $("#filtroGrupo"), previo = fg.value; fg.replaceChildren(new Option("Todos los grupos", ""));
    grupos.forEach((g) => fg.append(new Option(`Grupo ${g}`, g))); if (grupos.includes(previo)) fg.value = previo;
    fg.hidden = grupos.length < 2;
    $("#grupos").replaceChildren(...grupos.map((g) => new Option(g)));
    const rc = $("#rCaso"), pc = rc.value; rc.replaceChildren(new Option("Todos los casos", ""), ...S.casos.map((c) => new Option(`Caso ${c.id}`, c.id))); rc.value = pc;
    const preguntas = [...new Set(S.respuestas.map((x) => x.pregunta))].sort();
    const rp = $("#rPregunta"), pp = rp.value; rp.replaceChildren(new Option("Todas las preguntas", ""), ...preguntas.map((p) => new Option(pregunta("*", p), p))); rp.value = pp;
    const cc = $("#csvCaso"), pv = cc.value; cc.replaceChildren(...S.casos.map((c) => new Option(`Caso ${c.id} · ${c.titulo}`, c.id))); if (pv) cc.value = pv;
  }

  function filtrados() {
    const q = $("#buscar").value.trim().toLowerCase(), g = $("#filtroGrupo").value, est = $("#filtroEstado").value;
    return S.alumnos.filter((a) => {
      if (g && a.grupo !== g) return false;
      if (q && ![a.nombre, a.alumno_id, a.correo, a.alias].some((v) => String(v || "").toLowerCase().includes(q))) return false;
      if (est === "activos" && !(a.ultima && dia(a.ultima) === dia(Date.now()))) return false;
      if (est === "inactivos" && activo(a, 7 * DIA)) return false;
      if (est === "sin_entrar" && (S.esquema ? a.ultimo_acceso : a.ultima)) return false;
      if (est === "sin_google" && a.con_google) return false;
      return true;
    });
  }

  function miniCaso(a, c) {
    const vistas = a.vistas.get(c.id) || new Set(), [estado, cls] = estadoEntrega(a, c), done = cls === "ok";
    const m = el("div", `mini${done ? " done" : ""}`), t = el("div", "trk");
    (c.secciones || []).forEach((s) => t.append(el("i", vistas.has(s) ? "on" : "")));
    m.append(t, el("small", null, done || estado === "Entregado tarde" || estado === "Vencido" ? estado : `${vistas.size}/${total(c)}`));
    m.title = `Caso ${c.id}: ${vistas.size} de ${total(c)} secciones · ${estado}`; return m;
  }

  function pintarAlumnos() {
    const t = $("#tablaAlumnos"); t.replaceChildren();
    const o = S.ordenAlumnos;
    const cols = [["Alumno", "id"], ["Grupo", "grupo"], ["Correo", null], ...S.casos.map((c) => [`Caso ${c.id}`, null]), ["Bits", "bits", "r"], ["Última actividad", "ultima"], ["Último acceso", "acceso"]];
    const tr = el("tr");
    cols.forEach(([nombre, k, cls]) => {
      const th = el("th", cls || null);
      if (k) {
        const b = boton(nombre, null, () => {
          const dir = o.k === k ? (o.dir === "asc" ? "desc" : "asc") : ["bits", "ultima", "acceso"].includes(k) ? "desc" : "asc";
          S.ordenAlumnos = { k, dir }; pintarAlumnos();
        });
        if (o.k === k) b.dataset.dir = o.dir; th.append(b);
      }
      else th.textContent = nombre;
      tr.append(th);
    });
    const thead = el("thead"); thead.append(tr); t.append(thead);
    const clave = { id: (a) => a.alumno_id, grupo: (a) => `${a.grupo || "~"} ${a.alumno_id}`, bits: (a) => a.bits, ultima: (a) => a.ultima || "", acceso: (a) => a.ultimo_acceso || "" }[o.k];
    const lista = filtrados().sort((x, y) => { const a = clave(x), b = clave(y); const r = a < b ? -1 : a > b ? 1 : 0; return o.dir === "asc" ? r : -r; });
    const tb = el("tbody");
    lista.forEach((a) => {
      const fila = el("tr", "click"); fila.tabIndex = 0; fila.setAttribute("aria-label", `Ver ficha de ${a.nombre}`);
      const quien = el("td"), w = el("div", "who-cell"), d = el("div");
      d.append(el("b", null, a.nombre), el("small", null, `${a.alumno_id}${a.alias ? ` · «${a.alias}»` : ""}`)); w.append(avatar(a.nombre), d); quien.append(w);
      const correo = el("td"); if (a.correo) { correo.append(document.createTextNode(a.correo.endsWith(DOMINIO_INTERNO) ? "Correo interno " : `${a.correo} `)); correo.append(a.con_google ? pill("Google", "ok") : pill("sin Google")); } else correo.textContent = "—";
      const ult = el("td"); if (activo(a, 15 * MIN)) ult.append(el("span", "live"), " "); ult.append(document.createTextNode(a.ultima ? relativo(a.ultima) : "Sin actividad"));
      fila.append(quien, el("td", null, a.grupo || "—"), correo);
      S.casos.forEach((c) => { const td = el("td"); td.append(miniCaso(a, c)); fila.append(td); });
      const bits = el("td", "r"); bits.append(el("b", null, String(a.bits))); if (a.posicion) bits.append(el("small", "muted", ` #${a.posicion}`));
      fila.append(bits, ult, el("td", null, S.esquema ? (a.ultimo_acceso ? relativo(a.ultimo_acceso) : "Nunca") : "—"));
      fila.addEventListener("click", () => abrirFicha(a.id));
      fila.addEventListener("keydown", (e) => { if (e.key === "Enter") abrirFicha(a.id); });
      tb.append(fila);
    });
    if (!lista.length) {
      const f = el("tr"), td = el("td"); td.colSpan = cols.length;
      if (S.alumnos.length) td.textContent = "Ningún alumno coincide con el filtro.";
      else { td.append(document.createTextNode("Aún no hay alumnos inscritos. ")); td.append(boton("Dar de alta al primero", "btn btn-accent btn-sm", abrirAlta)); }
      f.append(td); tb.append(f);
    }
    t.append(tb);
  }
  ["#buscar", "#filtroGrupo", "#filtroEstado"].forEach((s) => $(s).addEventListener("input", pintarAlumnos));

  $("#exportAlumnos").addEventListener("click", () => {
    const cab = ["id", "nombre", "grupo", "correo", "tdd_id", "alias", "google", "ultimo_acceso", "ultima_actividad", "bits", "lugar",
      ...S.casos.flatMap((c) => [`caso_${c.id}_secciones`, `caso_${c.id}_estado`])];
    const filas = filtrados().map((a) => [a.alumno_id, a.nombre, a.grupo || "", a.correo || "", tddId(a), a.alias || "", a.con_google ? "sí" : "no",
      a.ultimo_acceso ? fecha(a.ultimo_acceso) : "", a.ultima ? fecha(a.ultima) : "", a.bits, a.posicion || "",
      ...S.casos.flatMap((c) => [`${(a.vistas.get(c.id) || new Set()).size}/${total(c)}`, estadoEntrega(a, c)[0]])]);
    descargar(`alumnos_${marca()}.csv`, csv([cab, ...filas]), "text/csv;charset=utf-8");
  });

  // ---------- Ficha ----------
  function caja(titulo) { const b = el("section", "box"); b.append(el("h3", null, titulo)); return b; }
  function abrirFicha(uid) {
    const a = S.porUid.get(uid); if (!a) return;
    const d = $("#dlgFicha");
    const top = $("#fichaTop"); top.replaceChildren();
    const info = el("div"), h = el("h2", null, a.nombre); h.id = "fichaNombre";
    const badges = el("div", "badges");
    if (activo(a, 15 * MIN)) badges.append(pill("Activo ahora", "dark"));
    if (S.esquema) badges.append(a.con_google ? pill("Google ligado", "ok") : pill("Sin Google"));
    badges.append(pill(a.alias ? `Alias «${a.alias}»` : "Sin alias"));
    info.append(h, el("p", null, [a.alumno_id, a.grupo ? `Grupo ${a.grupo}` : null, a.correo].filter(Boolean).join(" · ")), badges);
    const av = avatar(a.nombre); top.append(av, info);

    const cuerpo = $("#fichaCuerpo"); cuerpo.replaceChildren();
    // Números
    const vistasTot = S.casos.reduce((s, c) => s + (a.vistas.get(c.id) || new Set()).size, 0), totSec = S.casos.reduce((s, c) => s + total(c), 0);
    const entregados = S.casos.filter((c) => estadoEntrega(a, c)[2] !== "sin entregar").length;
    const dl = el("dl", "stat-row");
    const st = (t, v, n) => { const w = el("div"), dd = el("dd", null, v); if (n) dd.append(el("small", null, n)); w.append(el("dt", null, t), dd); dl.append(w); };
    st("Bits", String(a.bits), a.posicion ? `lugar ${a.posicion} de ${S.alumnos.length}` : "sin bits aún");
    st("Avance", totSec ? pct(vistasTot / totSec) : "—", `${vistasTot} de ${totSec} secciones`);
    st("Casos entregados", `${entregados} de ${S.casos.length}`);
    st("Última actividad", a.ultima ? relativo(a.ultima) : "Nunca", S.esquema ? `Último acceso: ${a.ultimo_acceso ? relativo(a.ultimo_acceso) : "nunca"}` : "");
    cuerpo.append(dl);

    // Bits
    const bx = caja("De dónde vienen sus bits"), dsg = a.desglose || {}, suma = PARTES.reduce((s, [k]) => s + (dsg[k] || 0), 0);
    const mix = el("div", "mix"); mix.setAttribute("role", "img"); mix.setAttribute("aria-label", PARTES.map(([k, n]) => `${n}: ${dsg[k] || 0}`).join(", "));
    const ley = el("ul", "mix-legend");
    PARTES.forEach(([k, n]) => { const v = dsg[k] || 0; if (suma && v) { const i = el("i", `k-${k}`); i.style.width = `${(v / suma) * 100}%`; mix.append(i); } const li = el("li"); li.append(el("i", `k-${k}`), document.createTextNode(`${n} `), el("b", null, String(v))); ley.append(li); });
    bx.append(mix, ley);
    if (dsg.retos_intentados) bx.append(el("p", "legend-note", `Retos: ${dsg.retos_acertados || 0} acertados de ${dsg.retos_intentados} intentados · ${dsg.primer_intento || 0} al primer intento.`));
    cuerpo.append(bx);

    // Casos
    const bc = caja("Casos");
    S.casos.forEach((c) => {
      const fila = el("div", "row"); fila.style.alignItems = "center"; fila.style.justifyContent = "space-between";
      const izq = el("div"); izq.style.minWidth = "0"; izq.append(el("b", null, `Caso ${c.id} · ${c.titulo}`));
      const hip = a.hipotesis.get(c.id); if (hip) izq.append(el("small", "muted", ` · hipótesis: ${hip}`));
      const [estado, cls] = estadoEntrega(a, c), m = miniCaso(a, c); m.style.width = "160px";
      const der = el("div", "row"); der.style.alignItems = "center"; der.append(m, pill(estado, cls));
      fila.append(izq, der); bc.append(fila);
    });
    cuerpo.append(bc);

    // Respuestas
    const br = caja(`Respuestas abiertas · ${a.respuestas.length}`);
    const ultimas = a.respuestas.filter((x) => x.ultima).sort((x, y) => (x.creado < y.creado ? 1 : -1));
    ultimas.forEach((x) => {
      const w = el("div"); const cab = el("div", "row"); cab.style.justifyContent = "space-between"; cab.style.alignItems = "center";
      cab.append(el("b", null, `Caso ${x.caso} · ${pregunta(x.caso, x.pregunta)}`), x.modelo ? pill(x.nivel != null ? `Nivel ${x.nivel} · ${5 * x.nivel} bits` : "Con comentario", "ok") : pill("Por calificar"));
      const txt = el("p", "legend-note", x.texto.length > 260 ? `${x.texto.slice(0, 260)}…` : x.texto); txt.style.whiteSpace = "pre-line";
      w.append(cab, txt); br.append(w);
    });
    if (ultimas.length) br.append(boton("Calificar sus respuestas", "btn btn-line btn-sm", async () => { await cerrarDialogo(d); if (d.open) return; $("#rEstado").value = "todas"; $("#rCaso").value = ""; $("#rPregunta").value = ""; $("#rBuscar").value = a.alumno_id; pintarRespuestas(); irA("respuestas"); }));
    else br.append(el("p", "empty", "Aún no responde preguntas abiertas."));
    cuerpo.append(br);

    // Línea de tiempo
    const bt = caja("Línea de tiempo (lo más reciente primero)"), ol = el("ol", "timeline");
    a.eventos.slice(-40).reverse().forEach((e) => {
      const li = el("li", `t-${e.tipo}`), t = el("time", null, hora(e.creado)); t.dateTime = e.creado; t.title = fecha(e.creado);
      const txt = el("span"); txt.append(document.createTextNode(`${TIPOS[e.tipo] || e.tipo} · Caso ${e.caso}${e.seccion ? ` · ${secc(e.seccion)}` : ""}`));
      const v = e.valor || {};
      if (e.tipo === "hipotesis" && v.opcion) txt.append(el("small", null, ` · «${v.opcion}»${v.tiene_razon ? " con razón" : ""}`));
      if (e.tipo === "control" && "respuesta" in v) txt.append(el("small", null, ` · respondió ${JSON.stringify(v.respuesta)}`));
      li.append(t, el("i"), txt); ol.append(li);
    });
    if (!a.eventos.length) ol.append(el("li", "empty", "Sin actividad registrada en Colab."));
    bt.append(ol); cuerpo.append(bt);

    // Editar
    const be = caja("Editar datos");
    const f = el("form", "form-grid");
    f.innerHTML = '<label class="field"><span>Nombre</span><input name="nombre" required maxlength="80"></label><label class="field"><span>Grupo</span><input name="grupo" maxlength="30" list="grupos"></label>';
    f.nombre.value = a.nombre; f.grupo.value = a.grupo || "";
    if (a.alias) { const l = el("label", "wide"); l.style.cssText = "display:flex;gap:8px;align-items:center;font-size:14px"; const c = el("input"); c.type = "checkbox"; c.name = "quitar"; l.append(c, document.createTextNode(`Quitar su alias «${a.alias}» (si es inapropiado; aparecerá como «Participante»)`)); f.append(l); }
    const msg = el("p", "form-msg wide"); msg.setAttribute("role", "status");
    const pie = el("div", "dlg-foot wide"); const g = el("button", "btn btn-accent btn-sm", "Guardar cambios"); g.type = "submit"; pie.append(g); f.append(msg, pie);
    f.addEventListener("submit", async (ev) => {
      ev.preventDefault(); g.disabled = true; msg.className = "form-msg wide"; msg.textContent = "Guardando…";
      try {
        await rpc("docente_actualizar_alumno", { p_id: a.id, p_nombre: f.nombre.value, p_grupo: f.grupo.value, p_quitar_alias: !!(f.quitar && f.quitar.checked) });
        toast("Datos guardados"); await cargar(true); abrirFicha(a.id);
      } catch (e) { msg.className = "form-msg wide err"; msg.textContent = e.message; g.disabled = false; }
    });
    be.append(f); cuerpo.append(be);

    // Acceso a Colab
    const bk = caja("Acceso a Colab");
    const p = el("p", "legend-note"); p.append(document.createTextNode("TDD_ID: "), el("b", "mono", tddId(a)), document.createTextNode(". Supabase solo guarda una huella de la clave: si la perdió, genera una nueva; la anterior deja de servir."));
    const res = el("div"); const kb = boton("Generar clave nueva", "btn btn-danger btn-sm", async () => {
      if (!(await confirmar(`¿Clave nueva para ${a.nombre}?`, "La clave actual deja de servir en Colab en cuanto confirmes. Tendrás que enviarle la nueva.", "Generar clave"))) return;
      kb.disabled = true;
      try {
        const r = await funcion("tdd-docente", { accion: "regenerar_clave", ids: [a.id] }); const x = (r.resultados || [])[0] || {};
        if (!x.ok) throw new Error(x.error || "No se pudo generar la clave");
        res.replaceChildren(bloqueClaves([{ ...x, nombre: a.nombre, id: a.alumno_id, cuenta: "clave nueva" }]));
        cargar(true);
      } catch (e) { res.replaceChildren(el("p", "form-msg err", errorFuncion(e))); }
      finally { kb.disabled = false; }
    });
    kb.disabled = !(S.fn && S.fn.ok); if (kb.disabled) kb.title = "La función tdd-docente no está disponible";
    bk.append(p, kb, res); cuerpo.append(bk);
    cuerpo.append(el("p", "legend-note", "Para dar de baja a un alumno usa la sección de borrado del instalador: borra su cuenta y su registro y lo deja en la bitácora."));
    if (!d.open) d.showModal();
    d.scrollTop = 0;
  }

  // ---------- Claves (alta y clave nueva) ----------
  let clavesSinGuardar = false;
  function mensaje(x) {
    return `Hola ${String(x.nombre).split(" ")[0]}: ya tienes acceso a The Agentic Data Scientist.\n` +
      `1) En Colab abre Secretos (el icono de llave) y agrega estos dos, con acceso para el cuaderno activado:\n` +
      `   TDD_ID = ${x.TDD_ID}\n   TDD_CLAVE = ${x.TDD_CLAVE || "(la que ya tienes)"}\n` +
      `2) Mira tu avance en ${URL_ALUMNO} entrando con ${String(x.TDD_ID).includes("@") ? "ese mismo Gmail" : "tu Gmail inscrito"}.`;
  }
  function bloqueClaves(lista) {
    const conClave = lista.filter((x) => x.TDD_CLAVE);
    const box = el("div", "keys");
    box.append(el("p", null, conClave.length ? `${conClave.length === 1 ? "Guarda esta clave" : `Guarda estas ${conClave.length} claves`} ahora: no se pueden volver a ver (Supabase solo guarda una huella).` : "No hubo claves nuevas: esas cuentas ya existían y conservan su clave."));
    const wrap = el("div", "table-wrap"), t = el("table", "tbl"), hr = el("tr");
    ["ID", "Nombre", "Cuenta", "TDD_ID", "TDD_CLAVE", ""].forEach((h) => hr.append(el("th", null, h)));
    const th = el("thead"); th.append(hr); t.append(th); const tb = el("tbody");
    lista.forEach((x) => {
      const tr = el("tr"); tr.append(el("td", "mono", x.id), el("td", null, x.nombre || ""), el("td", null, x.cuenta || ""), el("td", "mono", x.TDD_ID), el("td", "mono secret", x.TDD_CLAVE || "(sin cambio)"));
      const td = el("td"); td.append(boton("Copiar mensaje", "btn btn-line btn-sm", () => { copiar(mensaje(x)); clavesSinGuardar = false; })); tr.append(td); tb.append(tr);
    });
    t.append(tb); wrap.append(t); box.append(wrap);
    const acc = el("div", "row");
    acc.append(boton("Descargar CSV de claves", "btn btn-accent btn-sm", () => {
      descargar(`claves_alumnos_${marca()}.csv`, csv([["id", "nombre", "TDD_ID", "TDD_CLAVE"], ...lista.map((x) => [x.id, x.nombre || "", x.TDD_ID, x.TDD_CLAVE || ""])]), "text/csv;charset=utf-8");
      clavesSinGuardar = false;
    }), boton("Copiar todos los mensajes", "btn btn-line btn-sm", () => { copiar(lista.map(mensaje).join("\n\n———\n\n")); clavesSinGuardar = false; }));
    box.append(acc);
    clavesSinGuardar = conClave.length > 0;
    return box;
  }

  // ---------- Alta ----------
  function siguienteId() {
    let pref = "TDD-", max = 0, ancho = 3;
    S.alumnos.forEach((a) => { const m = /^([A-Z_-]*?)(\d+)$/.exec(a.alumno_id); if (m && Number(m[2]) >= max) { max = Number(m[2]); pref = m[1]; ancho = m[2].length; } });
    return `${pref}${String(max + 1).padStart(ancho, "0")}`;
  }
  function modoAlta(modo) {
    $$("#dlgAlta [data-modo]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.modo === modo)));
    $("#formUno").hidden = modo !== "uno"; $("#formLista").hidden = modo !== "lista";
  }
  function abrirAlta() {
    const d = $("#dlgAlta"); $("#altaResultado").hidden = true; $("#altaResultado").replaceChildren(); $("#altaMsg").textContent = "";
    $("#formUno").reset(); $("#formUno").aid.value = siguienteId(); $("#lista").value = ""; $("#listaPrevia").replaceChildren();
    $("#altaEnviar").disabled = !(S.fn && S.fn.ok);
    if (S.fn && !S.fn.ok) { $("#altaMsg").className = "form-msg err"; $("#altaMsg").textContent = S.fn.error; }
    modoAlta("uno"); d.showModal(); $("#formUno").nombre.focus();
  }
  $$("[data-alta]").forEach((b) => b.addEventListener("click", abrirAlta));
  $$("#dlgAlta [data-modo]").forEach((b) => b.addEventListener("click", () => modoAlta(b.dataset.modo)));

  // Lee la lista pegada (CSV o tabulada desde Sheets) y la valida antes de enviar.
  function leerLista(texto) {
    const lineas = texto.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith("#"));
    if (!lineas.length) return [];
    const sep = lineas[0].includes("\t") ? "\t" : lineas[0].includes(";") && !lineas[0].includes(",") ? ";" : ",";
    const partir = (l) => { const out = []; let cur = "", q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === sep && !q) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()); };
    let filas = lineas.map(partir), cols = ["id", "nombre", "grupo", "correo"];
    if (filas[0].map((x) => x.toLowerCase()).includes("id") && filas[0].map((x) => x.toLowerCase()).includes("nombre")) { cols = filas[0].map((x) => x.toLowerCase()); filas = filas.slice(1); }
    const vistos = new Set(), existentes = new Map(S.alumnos.map((a) => [a.alumno_id, a]));
    return filas.map((f, i) => {
      const o = {}; cols.forEach((c, j) => { o[c] = f[j] || ""; });
      const x = { id: o.id.toUpperCase(), nombre: o.nombre, grupo: o.grupo, correo: o.correo.toLowerCase(), fila: i + 1 };
      if (!/^[A-Z0-9_-]{2,30}$/.test(x.id) || x.id === "DOCENTE") x.error = "ID inválido (letras, números, guion o guion bajo)";
      else if (!x.nombre) x.error = "falta el nombre";
      else if (x.correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x.correo)) x.error = "correo inválido";
      else if (vistos.has(x.id)) x.error = "ID repetido en la lista";
      else if (existentes.has(x.id)) {
        // Mismo ID: solo se permite si es la misma cuenta (mismo correo, o el interno si no se da correo).
        const ya = existentes.get(x.id), correo = x.correo || `${x.id.toLowerCase()}${DOMINIO_INTERNO}`;
        if ((ya.correo || "").toLowerCase() !== correo) x.error = `el ID ya es de ${ya.nombre}; para cambiar sus datos usa su ficha`;
        else x.aviso = "ya inscrito: se actualizan nombre y grupo";
      }
      vistos.add(x.id); return x;
    });
  }
  $("#lista").addEventListener("input", () => {
    const filas = leerLista($("#lista").value), ul = $("#listaPrevia"); ul.replaceChildren();
    const ok = filas.filter((x) => !x.error).length;
    if (filas.length) ul.append(el("li", null, `${ok} ${ok === 1 ? "alumno listo" : "alumnos listos"}${filas.length - ok ? ` · ${filas.length - ok} con error` : ""}${ok > 60 ? " · se envían los primeros 60" : ""}`));
    filas.forEach((x) => ul.append(el("li", x.error ? "err" : null, x.error ? `✗ Fila ${x.fila}: ${x.error}` : `✓ ${x.id} · ${x.nombre}${x.grupo ? ` (${x.grupo})` : ""}${x.correo ? ` · ${x.correo}` : " · sin correo (entra con su ID)"}${x.aviso ? ` · ${x.aviso}` : ""}`)));
  });

  $("#altaEnviar").addEventListener("click", async () => {
    const msg = $("#altaMsg"), btn = $("#altaEnviar"); msg.className = "form-msg"; msg.textContent = "";
    let alumnos;
    if (!$("#formUno").hidden) {
      const f = $("#formUno"); if (!f.reportValidity()) return;
      const x = leerLista(`id,nombre,grupo,correo\n"${f.aid.value}","${f.nombre.value.replace(/"/g, "")}","${f.grupo.value.replace(/"/g, "")}","${f.correo.value}"`)[0];
      if (x.error) { msg.className = "form-msg err"; msg.textContent = `No se puede: ${x.error}.`; return; }
      alumnos = [x];
    } else {
      const filas = leerLista($("#lista").value), malas = filas.filter((x) => x.error);
      if (!filas.length) { msg.className = "form-msg err"; msg.textContent = "Pega al menos una fila."; return; }
      if (malas.length) { msg.className = "form-msg err"; msg.textContent = `Corrige ${malas.length} ${malas.length === 1 ? "fila" : "filas"} marcadas con ✗ antes de enviar.`; return; }
      alumnos = filas.slice(0, 60);
    }
    btn.disabled = true; msg.textContent = `Dando de alta ${alumnos.length} ${alumnos.length === 1 ? "alumno" : "alumnos"}…`;
    try {
      const r = await funcion("tdd-docente", { accion: "alta", alumnos: alumnos.map(({ id, nombre, grupo, correo }) => ({ id, nombre, grupo, correo })) });
      const res = r.resultados || [], ok = res.filter((x) => x.ok), mal = res.filter((x) => !x.ok);
      msg.className = `form-msg ${mal.length ? "err" : "ok"}`;
      const nc = ok.filter((x) => x.estado === "creado").length, na = ok.filter((x) => x.estado === "actualizado").length;
      msg.textContent = [nc && `${nc} ${nc === 1 ? "inscrito" : "inscritos"}`, na && `${na} ${na === 1 ? "actualizado" : "actualizados"}`, mal.length && `${mal.length} con error`].filter(Boolean).join(" · ") + ".";
      const cont = $("#altaResultado"); cont.replaceChildren(); cont.hidden = false;
      if (ok.length) cont.append(bloqueClaves(ok));
      if (mal.length) { const ul = el("ul", "preview-list"); mal.forEach((x) => ul.append(el("li", "err", `✗ ${x.id}: ${x.error}`))); cont.append(ul); }
      $("#formUno").reset(); $("#lista").value = ""; $("#listaPrevia").replaceChildren();
      cont.scrollIntoView({ behavior: "smooth", block: "nearest" });
      await cargar(true); $("#formUno").aid.value = siguienteId();
    } catch (e) { msg.className = "form-msg err"; msg.textContent = errorFuncion(e); }
    finally { btn.disabled = false; }
  });

  // Cerrar diálogos (con aviso si hay claves sin guardar)
  async function cerrarDialogo(d) {
    if (clavesSinGuardar && (d.id === "dlgAlta" || d.id === "dlgFicha")) {
      const salir = await confirmar("¿Cerrar sin guardar las claves?", "No se pueden volver a ver. Si cierras, tendrás que generar claves nuevas para esos alumnos.", "Cerrar de todos modos");
      if (!salir) return;
      clavesSinGuardar = false;
    }
    d.close();
  }
  $$("dialog.dlg").forEach((d) => {
    $$("[data-cerrar]", d).forEach((b) => b.addEventListener("click", () => cerrarDialogo(d)));
    d.addEventListener("cancel", (e) => { if (d.id !== "dlgConfirmar") { e.preventDefault(); cerrarDialogo(d); } });
  });

  // ---------- Casos y retos ----------
  function hbars(items, total, opciones = {}) {
    const ul = el("ol", "hbars");
    items.forEach((it) => {
      const li = el("li", it.cls || opciones.cls || ""), rail = el("span", "rail"), i = el("i");
      i.style.width = `${total ? (it.n / total) * 100 : 0}%`; rail.append(i);
      li.append(el("span", null, it.label), rail, el("b", null, opciones.fmt ? opciones.fmt(it.n) : `${it.n}/${total}`)); li.title = it.title || `${it.label}: ${it.n} de ${total}`;
      ul.append(li);
    });
    return ul;
  }
  const fechaInput = (iso) => (iso ? dia(iso) : "");

  function pintarCasos() {
    const cont = $("#casosLista"); cont.replaceChildren();
    const A = S.alumnos, n = A.length;
    S.casos.forEach((c) => {
      const card = el("article", "card caso-card");
      // Encabezado y fecha límite
      const top = el("div", "caso-top"), t = el("div");
      t.append(el("span", "case-id", `Caso ${c.id}${c.modulo != null ? ` · Módulo ${c.modulo}` : ""}`), el("h2", null, c.titulo));
      const nota = el("p", "due-note");
      if (c.entrega_limite) { nota.append(document.createTextNode("Vence "), el("b", null, fecha(c.entrega_limite)), document.createTextNode(` (hora del centro de México) · ${relativo(c.entrega_limite)}`)); }
      else nota.textContent = "Sin fecha límite: todas las entregas cuentan como a tiempo.";
      t.append(nota);
      const fForm = el("form", "due-form"), campo = el("label", "field"), inp = el("input"); inp.type = "date"; inp.required = true; inp.value = fechaInput(c.entrega_limite);
      campo.append(el("span", null, "Fecha límite (23:59)"), inp);
      const gb = el("button", "btn btn-line btn-sm", c.entrega_limite ? "Cambiar" : "Poner fecha"); gb.type = "submit"; gb.disabled = !S.esquema;
      fForm.append(campo, gb);
      if (c.entrega_limite) fForm.append(boton("Quitar", "btn btn-line btn-sm", async () => {
        if (!(await confirmar(`¿Quitar la fecha límite del caso ${c.id}?`, "Todas las entregas contarán como a tiempo (y sumarán los 5 bits de puntualidad)."))) return;
        try { await rpc("docente_fecha_entrega", { p_caso: c.id, p_limite: null }); toast("Fecha quitada"); cargar(true); } catch (e) { toast(e.message); }
      }));
      fForm.addEventListener("submit", async (ev) => {
        ev.preventDefault(); gb.disabled = true;
        try { await rpc("docente_fecha_entrega", { p_caso: c.id, p_limite: `${inp.value}T23:59:59-06:00` }); toast(`Caso ${c.id}: vence el ${inp.value} a las 23:59`); cargar(true); }
        catch (e) { toast(e.message); gb.disabled = false; }
      });
      top.append(t, fForm); card.append(top);

      // Números del caso
      const empezaron = A.filter((a) => (a.vistas.get(c.id) || new Set()).size || a.avance.has(c.id)).length;
      let aTiempo = 0, tarde = 0; A.forEach((a) => { const e = estadoEntrega(a, c)[2]; if (e === "a tiempo") aTiempo++; if (e === "tarde") tarde++; });
      const avg = n && total(c) ? A.reduce((s, a) => s + (a.vistas.get(c.id) || new Set()).size, 0) / (n * total(c)) : null;
      const hips = A.filter((a) => a.hipotesis.has(c.id));
      const dl = el("dl", "caso-stats");
      const st = (tt, v, nn) => { const w = el("div"), dd = el("dd", null, v); if (nn) dd.append(el("small", null, ` ${nn}`)); w.append(el("dt", null, tt), dd); dl.append(w); };
      st("Empezaron", `${empezaron}`, `de ${n}`); st("Entregaron", `${aTiempo + tarde}`, tarde ? `· ${tarde} tarde` : `de ${n}`); st("Avance promedio", pct(avg)); st("Hipótesis registradas", `${hips.length}`, `de ${n}`);
      card.append(dl);

      // Embudo por sección e hipótesis
      const cols = el("div", "cols"), izq = el("div"), der = el("div");
      const conteos = (c.secciones || []).map((s) => A.filter((a) => (a.vistas.get(c.id) || new Set()).has(s)).length);
      izq.append(el("h3", null, "Avance por sección"));
      izq.append(hbars((c.secciones || []).map((s, i) => ({ label: secc(s), n: conteos[i], cls: i && conteos[i - 1] >= 3 && (conteos[i - 1] - conteos[i]) / conteos[i - 1] >= 0.3 ? "drop" : "" })), n));
      izq.append(el("p", "legend-note", "Cada barra es la parte del grupo que ya resolvió esa sección. En rojo, donde se detiene un 30 % o más de quienes llegaron a la anterior."));
      der.append(el("h3", null, "Hipótesis del grupo"));
      const opciones = new Map(); hips.forEach((a) => { const o = a.hipotesis.get(c.id); opciones.set(o, (opciones.get(o) || 0) + 1); });
      if (opciones.size) {
        der.append(hbars([...opciones].sort((x, y) => y[1] - x[1]).map(([o, k]) => ({ label: o, n: k })), hips.length, { cls: "alt", fmt: (k) => pct(k / hips.length) }));
        der.append(el("p", "legend-note", "La última hipótesis de cada alumno. Proyéctala antes de la revelación: el contraste con el final es la lección."));
      } else der.append(el("p", "empty", "Aún nadie registra su hipótesis."));
      cols.append(izq, der); card.append(cols);

      // Retos
      const retos = S.retos.filter((x) => x.caso === c.id), rh = el("div", "card-head");
      rh.append(el("h3", null, `Retos calificados · ${retos.length}`));
      const nuevo = boton("+ Nuevo reto", "btn btn-line btn-sm", () => abrirReto(c)); nuevo.disabled = !S.esquema; rh.append(nuevo);
      const rw = el("div"); rw.append(rh);
      if (retos.length) {
        const wrap = el("div", "table-wrap"), tb = el("table", "tbl"), hr = el("tr");
        ["Reto", "Dificultad", "Tipo", "Respuesta", "Alumnos", "Acertaron", "1.er intento", ""].forEach((h) => hr.append(el("th", null, h)));
        const thd = el("thead"); thd.append(hr); tb.append(thd); const body = el("tbody");
        retos.forEach((x) => {
          const k = `${x.caso}|${x.reto}`, visible = S.mostrarClaves.has(k), tr = el("tr");
          const resp = el("td"); resp.append(visible ? el("span", "secret", `${x.respuesta}${x.tipo === "numero" && Number(x.tolerancia) ? ` ± ${x.tolerancia}` : ""}`) : el("span", "dots", "••••••"), " ",
            boton(visible ? "Ocultar" : "Mostrar", "icon-btn", () => { visible ? S.mostrarClaves.delete(k) : S.mostrarClaves.add(k); pintarCasos(); }));
          const acc = el("td"); acc.style.whiteSpace = "nowrap";
          acc.append(boton("Editar", "icon-btn", () => abrirReto(c, x)), boton("Borrar", "icon-btn", async () => {
            if (!(await confirmar(`¿Borrar el reto «${x.reto}»?`, "Sus intentos se conservan en el registro, pero dejan de dar bits; los bits de todos se recalculan.", "Borrar reto"))) return;
            try { await rpc("docente_borrar_reto", { p_caso: x.caso, p_reto: x.reto }); toast("Reto borrado"); cargar(true); } catch (e) { toast(e.message); }
          }));
          const tasa = x.acierto_primer == null ? null : Number(x.acierto_primer);
          tr.append(el("td", "mono", x.reto), el("td", null, `${"●".repeat(x.dificultad)}${"○".repeat(3 - x.dificultad)} · ${8 * x.dificultad} bits`), el("td", null, x.tipo === "numero" ? "Número" : "Opción"), resp,
            el("td", "r", String(x.alumnos)), el("td", "r", x.alumnos ? `${x.acertaron} (${pct(x.acertaron / x.alumnos)})` : "—"));
          const tt = el("td", "r"); tt.append(tasa == null ? document.createTextNode("—") : pill(pct(tasa), x.alumnos >= 3 && tasa < 0.35 ? "crit" : "ok")); tr.append(tt, acc);
          body.append(tr);
        });
        tb.append(body); wrap.append(tb); rw.append(wrap);
      } else rw.append(el("p", "empty", "Sin retos. Un reto acertado da de 8 a 24 bits y se califica en la base: la respuesta nunca llega al cuaderno."));
      card.append(rw);

      // Material docente
      const mat = S.material.filter((m) => m.caso === c.id);
      if (mat.length) {
        const md = el("details", "material"), items = el("div", "items"); md.append(el("summary", null, `Notas y rúbricas · ${mat.length}`));
        mat.forEach((m) => { const d = el("details"); d.append(el("summary", null, m.titulo), el("p", null, m.contenido.trim())); items.append(d); });
        md.append(items); card.append(md);
      }
      cont.append(card);
    });
    if (!S.casos.length) cont.append(el("p", "notice", "No hay casos en la base. Se dan de alta con el instalador (pasos 1 a 3)."));
  }

  // Reto: alta y edición
  let retoActual = null;
  function abrirReto(c, x) {
    retoActual = { caso: c.id, existente: !!x };
    const f = $("#formReto"); f.reset();
    $("#retoCaso").textContent = `Caso ${c.id}`; $("#retoTitle").textContent = x ? `Editar «${x.reto}»` : "Nuevo reto";
    f.reto.readOnly = !!x;
    if (x) { f.reto.value = x.reto; f.tipo.value = x.tipo; f.respuesta.value = x.respuesta; f.tolerancia.value = x.tolerancia; $$("input[name=dificultad]", f).forEach((r) => { r.checked = Number(r.value) === Number(x.dificultad); }); }
    $("#retoMsg").textContent = ""; actualizarReto(); $("#dlgReto").showModal(); (x ? f.respuesta : f.reto).focus();
  }
  function actualizarReto() {
    const f = $("#formReto"); $("#campoTol").hidden = f.tipo.value !== "numero";
    const ej = f.tipo.value === "numero" ? "valor" : '"opción"';
    $("#retoCodigo").textContent = `tdd.registrar("${f.reto.value || "reto_tasa"}", "control", {"respuesta": ${ej}})`;
  }
  $("#formReto").addEventListener("input", actualizarReto);
  $("#formReto").addEventListener("submit", async (ev) => {
    ev.preventDefault(); const f = ev.target, msg = $("#retoMsg"), b = $("#retoGuardar"); b.disabled = true; msg.className = "form-msg"; msg.textContent = "Guardando…";
    try {
      await rpc("docente_guardar_reto", { p_caso: retoActual.caso, p_reto: f.reto.value.trim(), p_dificultad: Number($("input[name=dificultad]:checked", f).value),
        p_tipo: f.tipo.value, p_respuesta: f.respuesta.value, p_tolerancia: f.tipo.value === "numero" ? Number(f.tolerancia.value || 0) : 0 });
      $("#dlgReto").close(); toast(retoActual.existente ? "Reto actualizado: los bits se recalculan solos" : "Reto creado"); cargar(true);
    } catch (e) { msg.className = "form-msg err"; msg.textContent = e.message; }
    finally { b.disabled = false; }
  });

  // ---------- Respuestas ----------
  function rubrica(caso, p) { return S.material.filter((m) => m.caso === caso && (m.clave === p || p.startsWith(`${m.clave}_`))); }
  function pintarRespuestas() {
    const est = $("#rEstado").value, caso = $("#rCaso").value, pr = $("#rPregunta").value, q = $("#rBuscar").value.trim().toLowerCase();
    const lista = S.respuestas.filter((x) => {
      if (est === "pendientes" && !(x.ultima && !x.modelo)) return false;
      if (est === "calificadas" && !x.modelo) return false;
      if (caso && x.caso !== caso) return false;
      if (pr && x.pregunta !== pr) return false;
      const a = S.porUid.get(x.usuario);
      if (q && ![a.nombre, a.alumno_id, a.grupo].some((v) => String(v || "").toLowerCase().includes(q))) return false;
      return true;
    }).sort((x, y) => (est === "pendientes" ? (x.creado < y.creado ? -1 : 1) : (x.creado < y.creado ? 1 : -1))); // pendientes: la más antigua primero
    const cont = $("#listaRespuestas"); cont.replaceChildren();
    lista.slice(0, 80).forEach((x) => cont.append(tarjetaRespuesta(x)));
    if (lista.length > 80) cont.append(el("p", "legend-note", `Mostrando 80 de ${lista.length}. Usa los filtros para ver el resto.`));
    if (!lista.length) cont.append(el("p", "notice", est === "pendientes" ? (S.respuestas.length ? "No hay respuestas por calificar. ¡Al día!" : "Aún no hay respuestas abiertas de tus alumnos.") : "Ninguna respuesta coincide con el filtro."));
  }
  ["#rEstado", "#rCaso", "#rPregunta", "#rBuscar"].forEach((s) => $(s).addEventListener("input", pintarRespuestas));

  function tarjetaRespuesta(x) {
    const a = S.porUid.get(x.usuario), card = el("article", `card resp${x.modelo ? " graded" : ""}${x.ultima ? "" : " old"}`);
    const head = el("div", "resp-head"), w = el("div", "who-cell"), d = el("div");
    d.append(el("b", null, a.nombre), el("small", null, `${a.alumno_id}${a.grupo ? ` · Grupo ${a.grupo}` : ""}`)); w.append(avatar(a.nombre), d);
    w.style.cursor = "pointer"; w.addEventListener("click", () => abrirFicha(a.id));
    const meta = el("div", "resp-meta"); meta.append(pill(`Caso ${x.caso}`), pill(relativo(x.creado)));
    if (!x.ultima) meta.append(pill("Versión anterior"));
    if (x.modelo) meta.append(pill(x.modelo === "docente" ? "Calificada por ti" : `Evaluada · ${x.modelo}`, "ok"));
    head.append(w, meta);
    card.append(head, el("p", "resp-q", pregunta(x.caso, x.pregunta)));
    if (x.pregunta === "hipotesis_razon" && a.hipotesis.has(x.caso)) card.append(el("p", "resp-ctx", `Su hipótesis: «${a.hipotesis.get(x.caso)}»`));
    card.append(el("p", "resp-text", x.texto));
    const rb = rubrica(x.caso, x.pregunta);
    if (rb.length) { const det = el("details", "rubric"); det.append(el("summary", null, "Rúbrica y respuesta esperada")); rb.forEach((m) => { det.append(el("p", null, `${m.titulo}\n${m.contenido.trim()}`)); }); card.append(det); }
    const f = el("form", "grade"), seg = el("div", "seg"); seg.setAttribute("role", "radiogroup"); seg.setAttribute("aria-label", "Nivel");
    [0, 1, 2, 3].forEach((v) => { const l = el("label"), r = el("input"); r.type = "radio"; r.name = `nivel-${x.id}`; r.value = v; r.checked = x.nivel === v; l.title = ["Sin evidencia", "En camino", "Sólida", "Excelente"][v]; l.append(r, el("span", null, String(v))); seg.append(l); });
    const fl = el("label", "field"), ta = el("textarea"); ta.placeholder = "Comentario para el alumno (opcional; lo ve en Mi avance)"; ta.maxLength = 2000; ta.value = x.retro || ""; fl.append(ta);
    const acc = el("div", "grade-actions"), g = el("button", "btn btn-accent btn-sm", "Guardar"); g.type = "submit"; const st = el("span", "saved"); st.setAttribute("role", "status");
    acc.append(g); if (x.modelo) acc.append(boton("Quitar", "btn btn-line btn-sm", () => guardar(null, ""))); acc.append(st);
    g.disabled = !S.esquema;
    f.append(seg, fl, acc); card.append(f);
    async function guardar(nivel, retro) {
      g.disabled = true; st.className = "saved"; st.textContent = "Guardando…";
      try {
        await rpc("docente_calificar_respuesta", { p_id: x.id, p_nivel: nivel, p_retro: retro });
        x.nivel = nivel; x.retro = retro.trim() || null; x.modelo = nivel == null && !x.retro ? null : "docente";
        st.textContent = nivel == null && !x.retro ? "Calificación quitada" : `Guardada ✓${nivel != null ? ` · ${5 * nivel} bits` : ""}`;
        card.classList.toggle("graded", !!x.modelo);
        $("#cntRespuestas").textContent = pendientes().length || "";
        if ($("#rEstado").value === "pendientes" && x.modelo) setTimeout(() => { card.remove(); if (!$("#listaRespuestas .resp")) pintarRespuestas(); }, 900);
      } catch (e) { st.className = "saved err"; st.textContent = e.message; }
      finally { g.disabled = false; }
    }
    f.addEventListener("submit", (ev) => {
      ev.preventDefault(); const r = $(`input[name="nivel-${x.id}"]:checked`, f);
      if (!r && !ta.value.trim()) { st.className = "saved err"; st.textContent = "Elige un nivel o escribe un comentario."; return; }
      guardar(r ? Number(r.value) : null, ta.value);
    });
    return card;
  }

  // ---------- Datos ----------
  function pintarDatos() {
    // Estado del sistema
    const ul = $("#estadoSistema"); ul.replaceChildren();
    const check = (ok, texto, nota) => { const li = el("li", ok ? "" : "bad"); const d = el("div"); d.append(document.createTextNode(texto)); if (nota) d.append(el("small", null, nota)); li.append(el("b", null, ok ? "✓" : "!"), d); ul.append(li); };
    check(true, `Sesión docente: ${S.usuario.email}`);
    const inst = S.bitacora.find((b) => b.accion === "instalacion");
    check(S.esquema, S.esquema ? "Esquema 0.6 o posterior: edición y calificación activas" : "Esquema anterior a 0.6", inst ? `Última instalación ${relativo(inst.creado)} · ${inst.detalle || ""}` : "Instalador, pasos 1 a 3");
    check(S.fn && S.fn.ok, S.fn && S.fn.ok ? `Función tdd-docente desplegada (${S.fn.version || "?"})` : "Función tdd-docente no disponible", S.fn && S.fn.ok ? "Altas y claves nuevas activas" : S.fn && S.fn.error);
    const respaldo = S.bitacora.find((b) => b.accion === "respaldo");
    check(respaldo && Date.now() - new Date(respaldo.creado) < 7 * DIA, respaldo ? `Último respaldo ${relativo(respaldo.creado)}` : "Sin respaldo registrado", "Paso 10 del instalador, cada semana");
    $("#ultimoRespaldo").textContent = respaldo ? `Último respaldo completo: ${fecha(respaldo.creado)}` : "";
    const casosConRetos = new Set(S.retos.map((x) => x.caso)).size;
    check(S.retos.length > 0, S.retos.length ? `${S.retos.length} retos en ${casosConRetos} ${casosConRetos === 1 ? "caso" : "casos"}` : "Sin retos calificados", S.retos.length ? "" : "Sin retos, los bits solo vienen de participación y respuestas");

    // Modo invitado
    const inv = $("#invitados"); inv.replaceChildren();
    const porMotivo = new Map();
    S.invitados.forEach((r) => { const m = porMotivo.get(r.motivo) || { sesiones: 0, completaron: 0, ultimo: null }; m.sesiones += Number(r.sesiones) || 0; m.completaron += Number(r.completaron) || 0; if (!m.ultimo || r.ultimo_evento > m.ultimo) m.ultimo = r.ultimo_evento; porMotivo.set(r.motivo, m); });
    if (porMotivo.size) {
      const totalSes = [...porMotivo.values()].reduce((s, m) => s + m.sesiones, 0);
      inv.append(hbars([...porMotivo].sort((x, y) => y[1].sesiones - x[1].sesiones).map(([k, m]) => ({ label: MOTIVOS[k] || k, n: m.sesiones, cls: k === "clave_incorrecta" || k === "sin_secretos" || k === "sin_permiso" ? "drop" : "alt", title: `${m.sesiones} ejecuciones · ${m.completaron} completaron · última ${m.ultimo ? relativo(m.ultimo) : "—"}` })), totalSes, { fmt: (k) => String(k) }));
      const malConfig = ["clave_incorrecta", "sin_secretos", "sin_permiso", "secreto_vacio"].reduce((s, k) => s + ((porMotivo.get(k) || {}).sesiones || 0), 0);
      inv.append(el("p", "legend-note", malConfig ? `${malConfig} ejecuciones parecen de alumnos con secretos mal configurados: su avance no se guarda a su nombre. Revisa la columna «Último acceso» en Alumnos.` : "Son ejecuciones anónimas (sin nombre ni correo)."));
    } else inv.append(el("p", "empty", "Sin ejecuciones en modo invitado."));

    // Bitácora
    const t = $("#bitacora"); t.replaceChildren(); const hr = el("tr");
    ["Fecha", "Acción", "Detalle", "Filas"].forEach((h) => hr.append(el("th", null, h)));
    const th = el("thead"); th.append(hr); t.append(th); const tb = el("tbody");
    S.bitacora.slice(0, 60).forEach((b) => {
      const tr = el("tr"), ac = el("td"); ac.append(pill(ACCIONES[b.accion] || b.accion, b.accion.startsWith("docente") ? "ok" : b.accion === "borrado" || b.accion === "vaciado" ? "crit" : ""));
      const det = el("td", null, b.detalle || b.tabla || ""); det.style.whiteSpace = "normal";
      tr.append(el("td", null, fecha(b.creado)), ac, det, el("td", "r", b.filas != null ? String(b.filas) : "")); tb.append(tr);
    });
    if (!S.bitacora.length) { const tr = el("tr"), td = el("td", null, "Sin movimientos."); td.colSpan = 4; tr.append(td); tb.append(tr); }
    t.append(tb);
  }

  // CSV para calificar (mismo formato que el paso 8 del instalador)
  $("#csvDescargar").addEventListener("click", () => {
    const c = S.casos.find((x) => x.id === $("#csvCaso").value); if (!c) return;
    const tot = total(c) || 1, f16 = (iso) => (iso ? new Date(iso).toLocaleString("sv-SE", { timeZone: TZ }).slice(0, 16) : "");
    const filas = [...S.alumnos].sort((x, y) => `${x.grupo || "~"}|${x.alumno_id}`.localeCompare(`${y.grupo || "~"}|${y.alumno_id}`)).map((a) => {
      const v = a.avance.get(c.id) || {}, vistas = Math.min(Number(v.secciones_vistas) || 0, tot), [, , estado] = estadoEntrega(a, c);
      const resp = a.respuestas.filter((x) => x.caso === c.id).length;
      return [a.alumno_id, a.nombre, a.grupo || "", a.correo || "", vistas, tot, Math.round((100 * vistas) / tot), v.completo ? "sí" : "no", v.completo ? f16(v.entregado) : "", resp,
        v.completo ? estado : "sin entregar", f16(c.entrega_limite)];
    });
    const cab = ["id", "nombre", "grupo", "correo", "secciones_vistas", "secciones_totales", "porcentaje_avance", "completo", "entregado", "respuestas", "estado_entrega", "fecha_limite"];
    descargar(`avance_caso_${c.id.replace(/\./g, "_")}_${marca()}.csv`, csv([cab, ...filas]), "text/csv;charset=utf-8");
  });

  $("#jsonDescargar").addEventListener("click", () => {
    const limpio = S.alumnos.map(({ avance, vistas, hipotesis, eventos, respuestas, ultimoEvento, ...a }) => a);
    const datos = { generado: new Date().toISOString(), por: S.usuario.email, perfiles: limpio, casos: S.casos, retos: S.retos, eventos: S.eventos,
      respuestas: S.respuestas.map(({ ultima, ...x }) => x), material_docente: S.material, bitacora: S.bitacora, invitados: S.invitados };
    descargar(`copia_panel_${marca()}.json`, JSON.stringify(datos, null, 2), "application/json");
  });

  // ---------- Arranque ----------
  $("#entrar").addEventListener("click", TDD.entrar);
  $("#salir").addEventListener("click", () => salir("local"));
  $("#salirTodo").addEventListener("click", () => salir("global"));
  $("#recargar").addEventListener("click", async () => { const b = $("#recargar"); b.disabled = true; try { await cargar(true); toast("Actualizado"); } catch (e) { toast(e.message); } finally { b.disabled = false; } });
  try { const t = localStorage.getItem("tdd-panel-tab"); if (TABS.includes(t)) irA(t); } catch (_) {}

  const retorno = TDD.tomarRetorno();
  mostrarEntrar();
  if (retorno.error) aviso("No pudimos completar el inicio de sesión. Intenta de nuevo.", true);
  function fallo(e) {
    if (e.message === "sesion") { TDD.olvidar(); mostrarEntrar(); aviso("Tu sesión expiró. Vuelve a entrar con Google.", false); return; }
    soloVista(null); $("#session").hidden = false;
    aviso(`No pudimos cargar el panel (${e.message}). Revisa tu conexión y recarga la página.`, true);
  }
  if (TDD.iniciar()) cargar().catch(fallo);
  // Refresco suave del resumen cada 2 minutos mientras está a la vista (sin tocar formularios abiertos).
  setInterval(() => {
    if (document.visibilityState !== "visible" || $("#panel").hidden || pestana() !== "resumen" || $$("dialog[open]").length) return;
    cargar(true).catch(() => {});
  }, 120000);
})();
