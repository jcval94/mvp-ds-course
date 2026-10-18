// Paneles del curso, en dos páginas con el mismo motor:
//   admin.html   (data-panel="admin")   → administración: grupos, docentes, alumnos, claves, fechas, retos, calificación y datos.
//   docente.html (data-panel="docente") → cada docente: ve y califica solo a los alumnos de sus grupos.
// La seguridad no depende de esta página: la base decide qué ve cada cuenta (seguridad por fila, es_admin(),
// tdd_mis_alumnos()) y solo cambia datos con funciones que comprueban el rol y anotan en la bitácora.
// Las altas y claves pasan por la Edge Function tdd-docente, la única pieza con la clave secreta. Nada aquí borra registros.
(function () {
  const { api, rpc, todo, funcion } = TDD;
  const ADMIN = document.body.dataset.panel === "admin";
  const TZ = "America/Mexico_City";
  const DOMINIO_INTERNO = "@alumnos.taqueriadedatos.mx";
  const CONTACTO = "augmentedlearninglabs@gmail.com";
  const URL_ALUMNO = new URL("alumno.html", location.href).href; // sin dominio fijo: el sitio funciona en cualquier hosting
  const URL_DOCENTE = new URL("docente.html", location.href).href;
  const URL_TUTORIAL = new URL("colab.html", location.href).href;
  const INSTALADOR = "https://colab.research.google.com/github/jcval94/agentic-ds-backen/blob/main/instalador.ipynb";
  const MSG_URL = "/rest/v1/mensajes_curso?select=id,alumno,autor_nombre,de_alumno,tipo,caso,respuesta,texto,creado,leido&order=id.asc";
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
    instalacion: "Instalación", borrado: "Borrado", vaciado: "Vaciado", respaldo: "Respaldo", docente_alta: "Alta de alumno",
    docente_edita: "Edición", docente_clave: "Clave nueva", docente_fecha: "Fecha límite", docente_reto: "Reto", docente_califica: "Calificación",
    admin_grupo: "Grupo", admin_clase: "Clase", admin_acceso: "Acceso Studio", admin_docente: "Docente", admin_asigna: "Asignación", docente_ia: "Sugerencia de IA", admin_caso: "Cuaderno",
  };
  const TIPOS = { abrio: "Abrió el cuaderno", seccion: "Resolvió", hipotesis: "Hipótesis", respuesta: "Respondió", pista: "Pidió pista", control: "Control", completo: "Entregó el caso" };
  const PARTES = [["secciones", "Secciones"], ["hipotesis", "Hipótesis"], ["retos", "Retos"], ["casos", "Casos completos"], ["puntualidad", "A tiempo"], ["respuestas", "Respuestas"]];
  const LLAVE_GRUPO = `tdd-panel-grupo-${ADMIN ? "admin" : "docente"}`, LLAVE_TAB = `tdd-panel-tab-${ADMIN ? "admin" : "docente"}`;

  // ---------- Utilidades ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const on = (s, ev, fn) => { const e = $(s); if (e) e.addEventListener(ev, fn); };
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function boton(texto, cls, alClic) { const b = el("button", cls, texto); b.type = "button"; if (alClic) b.addEventListener("click", alClic); return b; }
  const secc = (s) => SECCIONES[s] || (String(s).charAt(0).toUpperCase() + String(s).slice(1)).replace(/_/g, " ");
  const pregunta = (caso, p) => (PREGUNTAS[caso] || {})[p] || PREGUNTAS["*"][p] || secc(p);
  const hora = (iso) => new Date(iso).toLocaleString("es-MX", { timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });
  const fecha = (iso) => new Date(iso).toLocaleString("es-MX", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const fechaCorta = (d) => (d ? new Date(`${d}T12:00:00`).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }) : "");
  const dia = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ }); // AAAA-MM-DD en CDMX
  const rtf = new Intl.RelativeTimeFormat("es-MX", { numeric: "auto" });
  function relativo(iso) {
    if (!iso) return "—";
    const s = (new Date(iso) - Date.now()) / 1000, a = Math.abs(s);
    const [v, u] = a < 3600 ? [s / 60, "minute"] : a < 86400 ? [s / 3600, "hour"] : a < 86400 * 45 ? [s / 86400, "day"] : [s / 86400 / 30, "month"];
    return rtf.format(Math.round(v), u);
  }
  const pct = (x) => (x == null || isNaN(x) ? "—" : `${Math.round(x * 100)} %`);
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const iniciales = (n) => String(n || "").trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();
  const tddId = (a) => (!a.correo || a.correo.endsWith(DOMINIO_INTERNO) ? a.alumno_id : a.correo);
  const marca = () => new Date().toLocaleString("sv-SE", { timeZone: TZ }).slice(0, 16).replace(/[-:]/g, "").replace(" ", "_");
  const hasta2359 = (d) => `${d}T23:59:59-06:00`; // CDMX no tiene horario de verano desde 2022
  function avatar(nombre) { return el("span", "av", iniciales(nombre)); }
  function pill(texto, cls) { return el("span", `pill${cls ? ` ${cls}` : ""}`, texto); }
  const guardarLocal = (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} };
  const leerLocal = (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } };

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
    if (e.status === 401 && /jwt/i.test(e.message)) return `${e.message}. Apaga «Verify JWT with legacy secret» en la configuración de la función: ella misma verifica tu sesión.`;
    return e.message || "La función tdd-docente no respondió.";
  }
  function confirmar(titulo, texto, si = "Confirmar") {
    const d = $("#dlgConfirmar"); $("#confTitle").textContent = titulo; $("#confTexto").textContent = texto; $("#confSi").textContent = si;
    d.returnValue = ""; d.showModal();
    return new Promise((ok) => d.addEventListener("close", () => ok(d.returnValue === "si"), { once: true }));
  }

  // ---------- Estado ----------
  const S = { usuario: null, rol: null, alumnos: [], porUid: new Map(), casos: [], avance: [], eventos: [], respuestas: [], retos: [], material: [],
    invitados: [], bitacora: [], grupos: [], docentes: [], admins: [], entregas: new Map(), esquema: true, fn: null, cargado: null, mensajes: [], v08: false, clases: [], v10: false,
    grupoSel: leerLocal(LLAVE_GRUPO) || "", mostrarClaves: new Set(), ordenAlumnos: { k: "id", dir: "asc" } };
  const total = (c) => (Array.isArray(c.secciones) ? c.secciones.length : 0);
  const nombreGrupo = (id) => { const g = S.grupos.find((x) => x.id === id); return g ? g.nombre : id; };
  const visibles = () => (S.grupoSel === "__sin__" ? S.alumnos.filter((a) => !a.grupo) : S.grupoSel ? S.alumnos.filter((a) => a.grupo === S.grupoSel) : S.alumnos);
  // Fecha límite que le toca a un grupo en un caso: la del grupo o, si no tiene, la general del caso.
  const limiteGrupo = (g, c) => (g && S.entregas.get(`${g}|${c.id}`)) || c.entrega_limite || null;
  const limite = (a, c) => limiteGrupo(a.grupo, c);

  function armar(R) {
    const val = (k, d) => (R[k] && R[k].status === "fulfilled" ? R[k].value : d);
    if (R.casos.status === "rejected") throw R.casos.reason; // sin casos no hay panel
    S.casos = val("casos", []);
    S.retos = val("retos", []);
    S.material = val("material", []);
    S.invitados = val("invitados", []);
    S.bitacora = val("bitacora", []);
    S.entregas = new Map(val("entregas", []).map((e) => [`${e.grupo}|${e.caso}`, e.limite]));
    S.grupos = ADMIN ? val("adminGrupos", null) || val("gruposTabla", []).map((g) => ({ ...g, alumnos: 0, docentes: [] })) : val("gruposTabla", []);
    S.docentes = val("docentes", []);
    S.admins = val("admins", []);
    if (ADMIN) S.fn = R.fn.status === "fulfilled" ? { ok: true, version: R.fn.value && R.fn.value.version, ia: R.fn.value && R.fn.value.ia } : { ok: false, error: errorFuncion(R.fn.reason || {}) };
    const conAlumnos = R.alumnos.status === "fulfilled";
    let base = conAlumnos ? val("alumnos", []) : val("perfiles", []).map((p) => ({ ...p, correo: null, ultimo_acceso: null, con_google: null }));
    if (!ADMIN) { const mios = new Set((S.rol.grupos || []).map((g) => g.id)); base = base.filter((a) => mios.has(a.grupo)); }
    const bits = new Map(val("bits", []).map((b) => [b.alumno_id, b]));
    S.alumnos = base.filter((a) => a.alumno_id !== "DOCENTE").map((a) => {
      const b = bits.get(a.alumno_id) || {};
      return { ...a, bits: b.bits || 0, posicion: b.posicion || null, desglose: b.desglose || {}, avance: new Map(), vistas: new Map(),
        hipotesis: new Map(), eventos: [], respuestas: [], ultima: null, ultimoEvento: null };
    });
    S.porUid = new Map(S.alumnos.map((a) => [a.id, a]));
    const seccionesDe = new Map(S.casos.map((c) => [c.id, new Set(c.secciones || [])]));
    S.eventos = val("eventos", []).filter((e) => S.porUid.has(e.usuario)); // sin eventos de administración, docentes ni cuentas sin perfil
    S.eventos.forEach((e) => {
      const a = S.porUid.get(e.usuario);
      a.eventos.push(e);
      if (!a.ultima || e.creado > a.ultima) { a.ultima = e.creado; a.ultimoEvento = e; }
      if (e.tipo === "seccion" && e.seccion && (seccionesDe.get(e.caso) || new Set()).has(e.seccion)) {
        if (!a.vistas.has(e.caso)) a.vistas.set(e.caso, new Set()); a.vistas.get(e.caso).add(e.seccion);
      }
      if (e.tipo === "hipotesis" && e.valor && e.valor.opcion) a.hipotesis.set(e.caso, String(e.valor.opcion));
    });
    S.avance = val("avance", []);
    S.avance.forEach((f) => { const a = S.porUid.get(f.usuario); if (a) a.avance.set(f.caso, f); });
    S.alumnos.forEach((a) => a.eventos.sort((x, y) => (x.creado < y.creado ? -1 : x.creado > y.creado ? 1 : x.id - y.id)));
    S.respuestas = val("respuestas", []).filter((x) => S.porUid.has(x.usuario));
    const ultimas = new Map();
    S.respuestas.forEach((x) => { ultimas.set(`${x.usuario}|${x.caso}|${x.pregunta}`, x.id); });
    S.respuestas.forEach((x) => { x.ultima = ultimas.get(`${x.usuario}|${x.caso}|${x.pregunta}`) === x.id; S.porUid.get(x.usuario).respuestas.push(x); });
    // Mensajes (0.8): si la base aún no los tiene, la pestaña lo explica.
    S.v08 = R.mensajes.status === "fulfilled";
    S.mensajes = val("mensajes", []).filter((m) => S.porUid.has(m.alumno));
    S.v10 = R.clases.status === "fulfilled";
    S.clases = val("clases", []);
    S.v11 = ADMIN && R.studio && R.studio.status === "fulfilled";
    S.studio = val("studio", []) || [];
    const opciones = gruposDelFiltro().map((g) => g.id);
    if (S.grupoSel && !opciones.includes(S.grupoSel)) S.grupoSel = "";
    S.cargado = new Date();
  }

  const pendientes = () => { const v = new Set(visibles().map((a) => a.id)); return S.respuestas.filter((x) => x.ultima && !x.modelo && v.has(x.usuario)); };
  const activo = (a, ms) => a.ultima && Date.now() - new Date(a.ultima) < ms;
  function estadoEntrega(a, c) {
    const f = a.avance.get(c.id), lim = limite(a, c);
    if (f && f.completo) {
      const tarde = lim && f.entregado && new Date(f.entregado) > new Date(lim);
      return tarde ? ["Entregado tarde", "crit", "tarde"] : ["Entregado", "ok", "a tiempo"];
    }
    if (lim && new Date(lim) < new Date()) return ["Vencido", "crit", "sin entregar"];
    return (a.vistas.get(c.id) || new Set()).size ? ["En curso", "", "sin entregar"] : ["Sin empezar", "", "sin entregar"];
  }
  // Grupos que se pueden elegir en el filtro: todos (administración) o los del docente.
  function gruposDelFiltro() {
    if (ADMIN) return S.grupos;
    const mios = new Set((S.rol && S.rol.grupos || []).map((g) => g.id));
    return S.grupos.filter((g) => mios.has(g.id)).concat((S.rol && S.rol.grupos || []).filter((g) => !S.grupos.some((x) => x.id === g.id)));
  }

  // ---------- Carga ----------
  async function cargar(silencioso) {
    if (!silencioso) soloVista("#cargando");
    const usuario = await api("/auth/v1/user");
    S.usuario = usuario; $("#session").hidden = false; pintarPerfil(usuario, null);
    let rol = await rpc("mi_rol").catch(() => null);
    S.esquema = !!rol;
    if (!rol) { // base anterior a 0.7: solo la cuenta docente histórica entra, y solo a administración
      const legado = await rpc("es_docente").catch(() => false);
      rol = { admin: ADMIN && legado === true, docente: false, nombre: null, grupos: [] };
    }
    S.rol = rol; pintarPerfil(usuario, rol);
    if (ADMIN && !rol.admin) {
      soloVista(null);
      if (rol.docente) aviso("Este panel es solo para administración. Tus grupos están en tu", false, { texto: "panel docente", href: "docente.html" });
      else aviso(`Entraste como ${usuario.email}. Este panel es solo para administración; tu avance está en`, true, { texto: "Mi avance", href: "alumno.html" });
      return;
    }
    if (!ADMIN && !rol.docente) {
      soloVista(null);
      if (rol.admin) aviso("Tu cuenta es de administración y no está dada de alta como docente de ningún grupo. Puedes asignarte grupos en", false, { texto: "el panel de administración", href: "admin.html" });
      else aviso(`Entraste como ${usuario.email}, que no está registrado como docente. Si eres alumno, tu avance está en`, true, { texto: "Mi avance", href: "alumno.html" });
      return;
    }
    const pedidos = {
      alumnos: rpc("docente_alumnos"),
      bits: rpc("bits_grupo"),
      retos: rpc("docente_retos", S.esquema && S.grupoSel ? { p_grupo: S.grupoSel } : {}),
      // cuaderno_url existe desde 0.8; en bases anteriores se piden los casos sin él.
      casos: api("/rest/v1/casos?select=id,modulo,titulo,secciones,entrega_limite,cuaderno_url&order=modulo.asc,id.asc")
        .catch(() => api("/rest/v1/casos?select=id,modulo,titulo,secciones,entrega_limite&order=modulo.asc,id.asc")),
      mensajes: todo(MSG_URL),
      avance: todo("/rest/v1/vista_avance?select=usuario,caso,secciones_vistas,completo,primer_evento,ultimo_evento,entregado&order=usuario.asc,caso.asc"),
      eventos: todo("/rest/v1/eventos?select=id,usuario,caso,seccion,tipo,valor,creado&order=id.asc"),
      respuestas: todo("/rest/v1/respuestas?select=id,usuario,caso,pregunta,texto,etapa,nivel,retro,modelo,creado&order=id.asc"),
      material: api("/rest/v1/material_docente?select=caso,clave,orden,titulo,contenido&order=caso.asc,orden.asc"),
      entregas: S.esquema ? api("/rest/v1/entregas_grupo?select=grupo,caso,limite") : Promise.resolve([]),
      // Clases en vivo (0.10): en bases anteriores la pestaña lo explica.
      clases: api("/rest/v1/clases?select=id,grupo,inicio,duracion_min,tema,caso,meet_url,grabacion_url&order=inicio.asc"),
      gruposTabla: S.esquema ? api("/rest/v1/grupos?select=id,nombre,horario,inicio,fin,cupo,activo&order=id.asc") : Promise.resolve([]),
    };
    if (ADMIN) Object.assign(pedidos, {
      invitados: api("/rest/v1/vista_invitados?select=caso,motivo,sesiones,completaron,secciones_abiertas,ultimo_evento"),
      bitacora: api("/rest/v1/bitacora?select=id,creado,accion,tabla,filas,detalle&order=id.desc&limit=300"),
      fn: funcion("tdd-docente", { accion: "estado" }),
      perfiles: api("/rest/v1/perfiles?select=id,alumno_id,nombre,grupo,alias,creado&order=alumno_id.asc"),
      adminGrupos: S.esquema ? rpc("admin_grupos") : Promise.resolve(null),
      docentes: S.esquema ? rpc("admin_docentes") : Promise.resolve([]),
      admins: S.esquema ? rpc("admin_administradores") : Promise.resolve([]),
      // Suscripciones de Augmented Studio (0.11): en bases anteriores la pestaña lo explica.
      studio: rpc("admin_accesos"),
    });
    const claves = Object.keys(pedidos), r = await Promise.allSettled(Object.values(pedidos)), R = {};
    claves.forEach((k, i) => { R[k] = r[i]; });
    armar(R);
    aviso(null);
    soloVista("#panel");
    pintarTodo();
  }

  function pintarTodo() {
    const n = visibles().length, horaCarga = S.cargado.toLocaleTimeString("es-MX", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
    if (ADMIN) {
      $("#actualizado").textContent = `${plural(S.alumnos.length, "alumno", "alumnos")} · ${plural(S.grupos.length, "grupo", "grupos")} · ${plural(S.docentes.length, "docente", "docentes")} · actualizado ${horaCarga}`;
    } else {
      const nombre = (S.rol.nombre || S.usuario.user_metadata?.full_name || "").split(" ")[0];
      $("#panelTitle").textContent = nombre ? `Hola, ${nombre}` : "Tus grupos";
      $("#actualizado").textContent = `${gruposDelFiltro().map((g) => g.nombre).join(" · ") || "Sin grupos"} · ${plural(S.alumnos.length, "alumno", "alumnos")} · actualizado ${horaCarga}`;
    }
    $("#cntAlumnos").textContent = n || "";
    $("#cntRespuestas").textContent = pendientes().length || "";
    actualizarContadorMensajes();
    if ($("#cntGrupos")) $("#cntGrupos").textContent = S.grupos.length || "";
    if ($("#cntDocentes")) $("#cntDocentes").textContent = S.docentes.length || "";
    llenarFiltros(); pintarBanners(); pintarResumen(); pintarAlumnos(); pintarCasos(); pintarClases(); pintarRespuestas(); pintarMensajes(); pintarDatos();
    if (ADMIN) { pintarGrupos(); pintarDocentes(); pintarStudio(); }
  }

  // ---------- Vistas generales ----------
  function soloVista(id) { ["#vistaEntrar", "#cargando", "#panel"].forEach((s) => { $(s).hidden = s !== id; }); }
  function mostrarEntrar() { soloVista("#vistaEntrar"); $("#session").hidden = true; }

  function pintarBanners() {
    const b = $("#banners"); if (!b) return; b.replaceChildren();
    const banner = (texto, error, enlace) => {
      const d = el("div", `banner${error ? " is-error" : ""}`); const p = el("div"); p.append(document.createTextNode(texto));
      if (enlace) { const a = el("a", null, enlace[0]); a.href = enlace[1]; a.target = "_blank"; a.rel = "noopener"; p.append(" ", a); }
      d.append(p); b.append(d);
    };
    if (!ADMIN) return;
    if (!S.esquema) banner("Falta el esquema 0.7 en la base: el panel puede leer, pero no crear grupos, docentes ni alumnos. Corre los pasos 1 a 3 del instalador.", true, ["Abrir instalador", INSTALADOR]);
    if (S.fn && !S.fn.ok) banner(`Altas y claves no disponibles: ${S.fn.error}`, true, ["Abrir Edge Functions", "https://supabase.com/dashboard/project/tvxhocccdetkukonhhnh/functions"]);
    if (S.v10 && !S.v11) banner("Falta el esquema 0.11: sin él, nadie (ni administración) puede abrir los niveles 3 en adelante del sitio. Corre los pasos 1 a 3 del instalador.", true, ["Abrir instalador", INSTALADOR]);
    if (S.v11 && S.fn && S.fn.ok && S.fn.version === "0.8.0") banner("Despliega la función tdd-docente 0.9.0 para dar acceso a suscriptores de Augmented Studio.", false, ["Abrir Edge Functions", "https://supabase.com/dashboard/project/tvxhocccdetkukonhhnh/functions"]);
    if (S.esquema && S.v08 && !S.v10) banner("Falta el esquema 0.10: las clases en vivo, sus grabaciones y los alias de ciudad se activan al correr los pasos 1 a 3 del instalador.", false, ["Abrir instalador", INSTALADOR]);
    if (S.esquema && !S.v08) banner("Falta el esquema 0.8: mensajes, avisos al alumno y enlaces de cuadernos se activan al correr los pasos 1 a 3 del instalador.", false, ["Abrir instalador", INSTALADOR]);
  }

  // ---------- Perfil ----------
  function pintarPerfil(usuario, rol) {
    const nombre = (rol && rol.nombre) || usuario.user_metadata?.full_name || usuario.email;
    $("#pmNombre").textContent = nombre; $("#who").textContent = usuario.email;
    const ini = iniciales(nombre), foto = usuario.user_metadata?.avatar_url || usuario.user_metadata?.picture;
    [["#avatar", "#iniciales"], ["#avatarMenu", "#inicialesMenu"]].forEach(([img, txt]) => {
      if (foto) { $(img).src = foto; $(img).hidden = false; $(txt).textContent = ""; $(img).onerror = () => { $(img).hidden = true; $(txt).textContent = ini; }; }
      else { $(img).hidden = true; $(txt).textContent = ini; }
    });
    const chips = $("#pmChips"); chips.replaceChildren();
    const chip = (t) => { const c = el("span"); c.append(el("b", null, t)); chips.append(c); };
    if (rol && rol.admin) chip("Administración");
    if (rol && rol.docente) chip(`Docente · ${plural((rol.grupos || []).length, "grupo", "grupos")}`);
    const otro = $("#pmOtroPanel");
    if (otro) otro.hidden = ADMIN ? !(rol && rol.docente) : !(rol && rol.admin);
  }
  function abrirMenu(abrir) { $("#perfilMenu").hidden = !abrir; $("#perfilBtn").setAttribute("aria-expanded", String(abrir)); }
  on("#perfilBtn", "click", (e) => { e.stopPropagation(); abrirMenu($("#perfilMenu").hidden); });
  document.addEventListener("click", (e) => { if (!e.target.closest("#session")) abrirMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#perfilMenu").hidden) { abrirMenu(false); $("#perfilBtn").focus(); } });
  async function salir(scope) { abrirMenu(false); await TDD.cerrar(scope); mostrarEntrar(); aviso(scope === "global" ? "Cerraste sesión en todos tus dispositivos." : "Cerraste sesión.", false); }

  // ---------- Pestañas y filtro de grupo ----------
  const TABS = $$("#tabs [role=tab]").map((b) => b.id.replace("tab-", ""));
  function irA(tab) {
    if (!TABS.includes(tab)) return;
    TABS.forEach((t) => { $(`#tab-${t}`).setAttribute("aria-selected", String(t === tab)); $(`#v-${t}`).hidden = t !== tab; });
    guardarLocal(LLAVE_TAB, tab);
  }
  TABS.forEach((t) => on(`#tab-${t}`, "click", () => irA(t)));
  const pestana = () => TABS.find((t) => $(`#tab-${t}`).getAttribute("aria-selected") === "true");

  function llenarFiltros() {
    const opciones = gruposDelFiltro();
    const fg = $("#fGrupo"), caja = $("#filtroGrupoCaja");
    fg.replaceChildren(new Option(ADMIN ? "Todos los grupos" : "Todos mis grupos", ""), ...opciones.map((g) => new Option(`${g.nombre} (${g.id})`, g.id)));
    if (ADMIN && S.alumnos.some((a) => !a.grupo)) fg.append(new Option("Sin grupo", "__sin__"));
    fg.value = S.grupoSel;
    caja.hidden = opciones.length < 2 && !(ADMIN && S.alumnos.some((a) => !a.grupo));
    const rc = $("#rCaso"), pc = rc.value; rc.replaceChildren(new Option("Todos los casos", ""), ...S.casos.map((c) => new Option(`Caso ${c.id}`, c.id))); rc.value = pc;
    const preguntas = [...new Set(S.respuestas.map((x) => x.pregunta))].sort();
    const rp = $("#rPregunta"), pp = rp.value; rp.replaceChildren(new Option("Todas las preguntas", ""), ...preguntas.map((p) => new Option(pregunta("*", p), p))); rp.value = pp;
    const cm = $("#cModulo");
    if (cm) { const pm = cm.value, mods = [...new Set(S.casos.map((c) => c.modulo))].sort((x, y) => (x ?? 999) - (y ?? 999));
      cm.replaceChildren(new Option("Todos los módulos", ""), ...mods.map((m) => new Option(m != null ? `Módulo ${m}` : "Sin módulo", String(m))));
      cm.value = mods.map(String).includes(pm) ? pm : ""; }
    const cc = $("#csvCaso"), pv = cc.value; cc.replaceChildren(...S.casos.map((c) => new Option(`Caso ${c.id} · ${c.titulo}`, c.id))); if (pv) cc.value = pv;
  }
  on("#fGrupo", "change", async (ev) => {
    S.grupoSel = ev.target.value; guardarLocal(LLAVE_GRUPO, S.grupoSel);
    if (S.esquema && S.grupoSel !== "__sin__") { try { S.retos = await rpc("docente_retos", S.grupoSel ? { p_grupo: S.grupoSel } : {}); } catch (_) {} }
    pintarTodo();
  });

  // ---------- Resumen ----------
  function kpi(titulo, valor, nota, opciones = {}) {
    const k = el(opciones.ir ? "button" : "div", `kpi${opciones.hot ? " hot" : ""}`);
    if (opciones.ir) { k.type = "button"; k.addEventListener("click", opciones.ir); }
    const v = el("b", null, valor); if (opciones.live) { const d = el("span", `live${opciones.hot ? "" : " off"}`); v.prepend(d, " "); }
    k.append(el("span", null, titulo), v, el("small", null, nota)); return k;
  }
  const irRespuestas = () => { $("#rEstado").value = "pendientes"; pintarRespuestas(); irA("respuestas"); };

  function pintarResumen() {
    const A = visibles(), n = A.length, C = S.casos, V = new Set(A.map((a) => a.id));
    const ahora = A.filter((a) => activo(a, 15 * MIN)), hoy = A.filter((a) => a.ultima && dia(a.ultima) === dia(Date.now())), semana = A.filter((a) => activo(a, 7 * DIA));
    const totalSec = C.reduce((s, c) => s + total(c), 0);
    const promedio = n && totalSec ? A.reduce((s, a) => s + C.reduce((t, c) => t + (a.vistas.get(c.id) || new Set()).size, 0) / totalSec, 0) / n : null;
    let entregas = 0, aTiempo = 0, tarde = 0;
    A.forEach((a) => C.forEach((c) => { const e = estadoEntrega(a, c); if (e[2] !== "sin entregar") { entregas++; e[2] === "tarde" ? tarde++ : aTiempo++; } }));
    const conGoogle = A.filter((a) => a.con_google).length, nunca = A.filter((a) => (S.esquema ? !a.ultimo_acceso : !a.ultima)).length;
    const pend = pendientes().length;
    $("#kpis").replaceChildren(
      kpi("Alumnos", String(n), `${conGoogle} con Google · ${nunca} sin entrar nunca`, { ir: () => irA("alumnos") }),
      kpi("Activos ahora", String(ahora.length), `Hoy ${hoy.length} · últimos 7 días ${semana.length}`, { hot: ahora.length > 0, live: true }),
      kpi("Avance del grupo", promedio == null ? "—" : pct(promedio), "secciones resueltas, en promedio"),
      kpi("Entregas", `${entregas}/${n * C.length}`, `${aTiempo} a tiempo · ${tarde} tarde`, { ir: () => irA("casos") }),
      kpi("Por calificar", String(pend), "respuestas abiertas", { hot: pend > 0, ir: irRespuestas }),
    );

    // Actividad: alumnos distintos por día (últimos 14 días, hora de CDMX)
    const dias = []; for (let i = 13; i >= 0; i--) dias.push(dia(Date.now() - i * DIA));
    const porDia = new Map(dias.map((d) => [d, { alumnos: new Set(), eventos: 0 }]));
    S.eventos.forEach((e) => { if (!V.has(e.usuario)) return; const d = porDia.get(dia(e.creado)); if (d) { d.alumnos.add(e.usuario); d.eventos++; } });
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
    [...A].filter((a) => a.bits > 0).sort((x, y) => y.bits - x.bits).slice(0, 5).forEach((a, i) => {
      const li = el("li"); const w = el("span", "who");
      w.append(document.createTextNode(a.nombre), el("small", null, `${a.alias ? ` · «${a.alias}»` : " · sin alias"}${!S.grupoSel && gruposDelFiltro().length > 1 && a.grupo ? ` · ${a.grupo}` : ""}`));
      li.append(el("span", "pos", String(i + 1)), w, el("b", "num", `${a.bits} bits`)); li.style.cursor = "pointer"; li.addEventListener("click", () => abrirFicha(a.id)); top.append(li);
    });
    if (!top.children.length) top.append(el("li", "empty", "Aún nadie suma bits."));

    pintarAlertas();
  }

  function pintarAlertas() {
    const ul = $("#alertas"); ul.replaceChildren();
    const alerta = (texto, nota, crit, accion) => {
      const li = el("li", crit ? "crit" : ""); const d = el("div");
      d.append(document.createTextNode(texto)); if (nota) d.append(el("small", null, nota));
      if (accion) d.append(boton(accion[0], null, accion[1]));
      li.append(el("i", null, crit ? "!" : "i"), d); ul.append(li);
    };
    const A = visibles(), n = A.length;
    const verAlumnos = (estado) => () => { $("#filtroEstado").value = estado; pintarAlumnos(); irA("alumnos"); };
    if (ADMIN && S.esquema) {
      const sinGrupo = S.alumnos.filter((a) => !a.grupo);
      if (sinGrupo.length && S.grupos.length) alerta(`${plural(sinGrupo.length, "alumno sin grupo", "alumnos sin grupo")}`, "Ningún docente los ve. Asígnales grupo en su ficha.", true, ["Ver quiénes", () => { S.grupoSel = "__sin__"; pintarTodo(); irA("alumnos"); }]);
      const sinDocente = S.grupos.filter((g) => g.activo && !(g.docentes || []).length);
      if (sinDocente.length) alerta(`${plural(sinDocente.length, "grupo activo sin docente", "grupos activos sin docente")}`, sinDocente.map((g) => g.id).join(", "), false, ["Asignar", () => irA("grupos")]);
      if (!S.grupos.length) alerta("Aún no hay grupos", "Crea el primero (por ejemplo G1-A) y da de alta a tus alumnos en él.", false, ["Crear grupo", () => { irA("grupos"); abrirGrupo(); }]);
    }
    if (S.esquema) {
      const nunca = A.filter((a) => !a.ultimo_acceso);
      if (nunca.length) alerta(`${plural(nunca.length, "alumno nunca ha entrado", "alumnos nunca han entrado")}`, "Ni a Colab ni a Mi avance: revisa que tengan sus secretos.", nunca.length > n / 3, ["Ver quiénes", verAlumnos("sin_entrar")]);
    }
    const inactivos = A.filter((a) => a.ultima && !activo(a, 7 * DIA));
    if (inactivos.length) alerta(`${inactivos.length} sin actividad en 7 días`, inactivos.slice(0, 3).map((a) => a.nombre).join(", ") + (inactivos.length > 3 ? "…" : ""), false, ["Ver lista", verAlumnos("inactivos")]);
    // Entregas por caso y grupo (cada grupo puede tener su fecha)
    const porGrupo = new Map(); A.forEach((a) => { const k = a.grupo || ""; if (!porGrupo.has(k)) porGrupo.set(k, []); porGrupo.get(k).push(a); });
    const variosGrupos = porGrupo.size > 1;
    S.casos.forEach((c) => {
      porGrupo.forEach((lista, g) => {
        const lim = limiteGrupo(g, c); if (!lim) return;
        const fecha_ = new Date(lim), faltan = lista.filter((a) => !(a.avance.get(c.id) || {}).completo).length;
        if (!faltan) return;
        const quien = variosGrupos && g ? ` · ${g}` : "";
        if (fecha_ > new Date() && fecha_ - Date.now() < 7 * DIA) alerta(`Caso ${c.id}${quien} vence ${relativo(lim)}`, `Faltan ${faltan} de ${lista.length} por entregar.`, fecha_ - Date.now() < 2 * DIA, ["Ver caso", () => irA("casos")]);
        else if (fecha_ < new Date() && Date.now() - fecha_ < 7 * DIA) alerta(`Caso ${c.id}${quien} venció ${relativo(lim)}`, `${faltan} de ${lista.length} no lo entregaron.`, true, ["Exportar CSV", () => { $("#csvCaso").value = c.id; irA(ADMIN ? "datos" : "exportar"); }]);
      });
      // ¿Dónde se detiene el grupo?
      const conteos = (c.secciones || []).map((s) => A.filter((a) => (a.vistas.get(c.id) || new Set()).has(s)).length);
      let peor = null;
      conteos.forEach((v, i) => { if (i && conteos[i - 1] >= 3) { const caida = (conteos[i - 1] - v) / conteos[i - 1]; if (caida >= 0.3 && (!peor || caida > peor.caida)) peor = { i, caida, n: conteos[i - 1] - v }; } });
      if (peor) alerta(`Caso ${c.id}: ${peor.n} ${peor.n === 1 ? "se detiene" : "se detienen"} en «${secc(c.secciones[peor.i])}»`, `Llegaron a «${secc(c.secciones[peor.i - 1])}» pero no avanzaron.`, false, ["Ver avance", () => irA("casos")]);
    });
    S.retos.filter((x) => x.alumnos >= 3 && x.acierto_primer != null && Number(x.acierto_primer) < 0.35).forEach((x) =>
      alerta(`Reto «${x.reto}» (caso ${x.caso}): ${pct(Number(x.acierto_primer))} acierta al primer intento`, "Puede ser difícil de más o estar mal planteado; revisa el enunciado y la tolerancia.", false, ["Ver reto", () => irA("casos")]));
    const pend = pendientes().length;
    if (pend) alerta(`${plural(pend, "respuesta por calificar", "respuestas por calificar")}`, "Cada nivel vale 5 bits para el alumno.", false, ["Calificar", irRespuestas]);
    if (ADMIN) {
      const respaldo = S.bitacora.find((b) => b.accion === "respaldo");
      if (!respaldo) alerta("No hay respaldo registrado", "Corre el paso 10 del instalador cada semana: el plan gratuito de Supabase no respalda.", true);
      else if (Date.now() - new Date(respaldo.creado) > 7 * DIA) alerta(`Último respaldo ${relativo(respaldo.creado)}`, "Corre el paso 10 del instalador.", Date.now() - new Date(respaldo.creado) > 14 * DIA);
    }
    $("#alertasNota").textContent = ul.children.length ? plural(ul.children.length, "punto", "puntos") : "";
    if (!ul.children.length) alerta("Todo en orden", "Sin pendientes por ahora.", false);
  }

  // ---------- Alumnos ----------
  function filtrados() {
    const q = $("#buscar").value.trim().toLowerCase(), est = $("#filtroEstado").value;
    return visibles().filter((a) => {
      if (q && ![a.nombre, a.alumno_id, a.correo, a.alias, a.grupo].some((v) => String(v || "").toLowerCase().includes(q))) return false;
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
      } else th.textContent = nombre;
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
      const gr = el("td"); gr.append(a.grupo ? pill(a.grupo) : pill("Sin grupo", "crit")); if (a.grupo) gr.title = nombreGrupo(a.grupo);
      fila.append(quien, gr, correo);
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
      else if (ADMIN) { td.append(document.createTextNode("Aún no hay alumnos inscritos. ")); td.append(boton("Dar de alta al primero", "btn btn-accent btn-sm", abrirAlta)); }
      else td.textContent = "Tus grupos todavía no tienen alumnos.";
      f.append(td); tb.append(f);
    }
    t.append(tb);
  }
  ["#buscar", "#filtroEstado"].forEach((s) => on(s, "input", pintarAlumnos));

  on("#exportAlumnos", "click", () => {
    const cab = ["id", "nombre", "grupo", "correo", "tdd_id", "alias", "google", "ultimo_acceso", "ultima_actividad", "bits", "lugar_en_su_grupo",
      ...S.casos.flatMap((c) => [`caso_${c.id}_secciones`, `caso_${c.id}_estado`])];
    const filas = filtrados().map((a) => [a.alumno_id, a.nombre, a.grupo || "", a.correo || "", tddId(a), a.alias || "", a.con_google ? "sí" : "no",
      a.ultimo_acceso ? fecha(a.ultimo_acceso) : "", a.ultima ? fecha(a.ultima) : "", a.bits, a.posicion || "",
      ...S.casos.flatMap((c) => [`${(a.vistas.get(c.id) || new Set()).size}/${total(c)}`, estadoEntrega(a, c)[0]])]);
    descargar(`alumnos${S.grupoSel && S.grupoSel !== "__sin__" ? `_${S.grupoSel}` : ""}_${marca()}.csv`, csv([cab, ...filas]), "text/csv;charset=utf-8");
  });

  // ---------- Ficha ----------
  function caja(titulo) { const b = el("section", "box"); b.append(el("h3", null, titulo)); return b; }
  function opcionesGrupo(select, actual, conVacio = true) {
    select.replaceChildren(...(conVacio ? [new Option("Sin grupo", "")] : []), ...S.grupos.filter((g) => g.activo || g.id === actual).map((g) => new Option(`${g.nombre} (${g.id})`, g.id)));
    select.value = actual || "";
  }
  function abrirFicha(uid) {
    const a = S.porUid.get(uid); if (!a) return;
    const d = $("#dlgFicha");
    const top = $("#fichaTop"); top.replaceChildren();
    const info = el("div"), h = el("h2", null, a.nombre); h.id = "fichaNombre";
    const badges = el("div", "badges");
    if (activo(a, 15 * MIN)) badges.append(pill("Activo ahora", "dark"));
    if (S.esquema) badges.append(a.con_google ? pill("Google ligado", "ok") : pill("Sin Google"));
    badges.append(pill(a.alias ? `Alias «${a.alias}»` : "Sin alias"));
    info.append(h, el("p", null, [a.alumno_id, a.grupo ? nombreGrupo(a.grupo) : "Sin grupo", a.correo].filter(Boolean).join(" · ")), badges);
    top.append(avatar(a.nombre), info);

    const cuerpo = $("#fichaCuerpo"); cuerpo.replaceChildren();
    const vistasTot = S.casos.reduce((s, c) => s + (a.vistas.get(c.id) || new Set()).size, 0), totSec = S.casos.reduce((s, c) => s + total(c), 0);
    const entregados = S.casos.filter((c) => estadoEntrega(a, c)[2] !== "sin entregar").length;
    const dl = el("dl", "stat-row");
    const st = (t, v, n) => { const w = el("div"), dd = el("dd", null, v); if (n) dd.append(el("small", null, n)); w.append(el("dt", null, t), dd); dl.append(w); };
    st("Bits", String(a.bits), a.posicion ? `lugar ${a.posicion} en su grupo` : "sin bits aún");
    st("Avance", totSec ? pct(vistasTot / totSec) : "—", `${vistasTot} de ${totSec} secciones`);
    st("Casos entregados", `${entregados} de ${S.casos.length}`);
    st("Última actividad", a.ultima ? relativo(a.ultima) : "Nunca", S.esquema ? `Último acceso: ${a.ultimo_acceso ? relativo(a.ultimo_acceso) : "nunca"}` : "");
    cuerpo.append(dl);
    if (S.v08) {
      const n = S.mensajes.filter((m) => m.alumno === a.id && m.de_alumno && !m.leido).length;
      const fila = el("div", "row"); fila.append(boton(n ? `Mensajes · ${n} sin leer` : "Escribirle un mensaje", n ? "btn btn-accent btn-sm" : "btn btn-line btn-sm", async () => {
        await cerrarDialogo(d); if (d.open) return; escribirA(a.id);
      })); cuerpo.append(fila);
    }
    if (ADMIN) cuerpo.append(cajaColab(a));

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
      const lim = limite(a, c); if (lim) izq.append(el("small", "muted", ` · vence ${fecha(lim)}`));
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
    if (ultimas.length) br.append(boton("Calificar sus respuestas", "btn btn-line btn-sm", async () => {
      await cerrarDialogo(d); if (d.open) return;
      $("#rEstado").value = "todas"; $("#rCaso").value = ""; $("#rPregunta").value = ""; $("#rBuscar").value = a.alumno_id; pintarRespuestas(); irA("respuestas");
    }));
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

    if (ADMIN) {
      // Editar
      const be = caja("Editar datos");
      const f = el("form", "form-grid");
      f.innerHTML = '<label class="field"><span>Nombre</span><input name="nombre" required maxlength="80"></label><label class="field"><span>Grupo</span><select name="grupo"></select></label>';
      f.nombre.value = a.nombre; opcionesGrupo(f.grupo, a.grupo);
      if (a.alias) { const l = el("label", "wide check-inline"); const c = el("input"); c.type = "checkbox"; c.name = "quitar"; l.append(c, document.createTextNode(`Quitar su alias «${a.alias}» (si es inapropiado; aparecerá como «Participante»)`)); f.append(l); }
      const msg = el("p", "form-msg wide"); msg.setAttribute("role", "status");
      const pie = el("div", "dlg-foot wide"); const g = el("button", "btn btn-accent btn-sm", "Guardar cambios"); g.type = "submit"; g.disabled = !S.esquema; pie.append(g); f.append(msg, pie);
      f.addEventListener("submit", async (ev) => {
        ev.preventDefault(); g.disabled = true; msg.className = "form-msg wide"; msg.textContent = "Guardando…";
        try {
          await rpc("docente_actualizar_alumno", { p_id: a.id, p_nombre: f.nombre.value, p_grupo: f.grupo.value, p_quitar_alias: !!(f.quitar && f.quitar.checked) });
          toast("Datos guardados"); await cargar(true); abrirFicha(a.id);
        } catch (e) { msg.className = "form-msg wide err"; msg.textContent = e.message; g.disabled = false; }
      });
      be.append(f); cuerpo.append(be);
      cuerpo.append(el("p", "legend-note", "Para dar de baja a un alumno usa la sección de borrado del instalador: borra su cuenta y su registro y lo deja en la bitácora."));
    } else {
      cuerpo.append(el("p", "legend-note", `¿Hay que corregir sus datos, moverlo de grupo o darle una clave nueva? Escribe a administración: ${CONTACTO}.`));
    }
    if (!d.open) d.showModal();
    d.scrollTop = 0;
  }

  async function claveNuevaDe(uid, nombre, etiqueta, destino, btn, plantilla, alTerminar) {
    if (!(await confirmar(`¿Clave nueva para ${nombre}?`, "La clave actual deja de servir en Colab en cuanto confirmes. Tendrás que enviarle la nueva.", "Generar clave"))) return;
    btn.disabled = true;
    try {
      const r = await funcion("tdd-docente", { accion: "regenerar_clave", ids: [uid] }); const x = (r.resultados || [])[0] || {};
      if (!x.ok) throw new Error(x.error || "No se pudo generar la clave");
      if (x.TDD_CLAVE) clavesRecientes.set(etiqueta, x.TDD_CLAVE);
      if (alTerminar) { clavesSinGuardar = !!x.TDD_CLAVE; alTerminar(x); }
      else destino.replaceChildren(bloqueClaves([{ ...x, nombre, id: etiqueta, cuenta: "clave nueva" }], plantilla));
      cargar(true);
    } catch (e) { destino.replaceChildren(el("p", "form-msg err", errorFuncion(e))); }
    finally { btn.disabled = false; }
  }

  // Claves generadas en esta pestaña (solo en memoria: se pierden al recargar). Supabase guarda solo una huella,
  // así que es la única forma de volver a copiarlas mientras se envían al alumno.
  const clavesRecientes = new Map();
  function campoCopiable(nombre, valor, sinValor, alCopiar) {
    const fila = el("div", "cred");
    fila.append(el("span", "cred-k", nombre), el("code", `cred-v${sinValor ? " is-empty" : ""}`, valor));
    if (!sinValor) fila.append(boton("Copiar", "btn btn-line btn-sm", () => { copiar(valor); if (alCopiar) alCopiar(); }));
    return fila;
  }
  function cajaColab(a) {
    const bk = caja("Acceso a Colab (Secretos del alumno)");
    const id = tddId(a), clave = clavesRecientes.get(a.alumno_id);
    const creds = el("div", "creds");
    const listo = () => { clavesSinGuardar = false; };
    creds.append(campoCopiable("TDD_ID", id), clave ? campoCopiable("TDD_CLAVE", clave, false, listo) : campoCopiable("TDD_CLAVE", "Oculta: no se puede volver a ver", true));
    const res = el("div"), acc = el("div", "row");
    if (clave) acc.append(boton("Copiar mensaje para el alumno", "btn btn-accent btn-sm", () => { copiar(mensaje({ nombre: a.nombre, TDD_ID: id, TDD_CLAVE: clave })); listo(); }));
    const kb = boton(clave ? "Generar otra clave" : "Generar clave nueva", clave ? "btn btn-line btn-sm" : "btn btn-danger btn-sm",
      () => claveNuevaDe(a.id, a.nombre, a.alumno_id, res, kb, mensaje, () => abrirFicha(a.id)));
    kb.disabled = !(S.fn && S.fn.ok); if (kb.disabled) kb.title = "La función tdd-docente no está disponible";
    acc.append(kb);
    const nota = clave
      ? "Esta clave se ve solo en esta pestaña hasta que recargues la página: envíasela ahora. Si después la pierde, genera otra (la anterior deja de servir)."
      : "Supabase guarda solo una huella de la clave, así que nadie puede volver a verla. Si el alumno no la tiene, genera una nueva: la anterior deja de servir y aquí aparece la nueva para copiarla.";
    bk.append(creds, acc, el("p", "legend-note", nota), res);
    return bk;
  }

  // ---------- Claves (alta y clave nueva) ----------
  let clavesSinGuardar = false;
  function mensaje(x) {
    return `Hola ${String(x.nombre).split(" ")[0]}: ya tienes acceso a The Agentic Data Scientist.\n` +
      `1) En Colab abre Secretos (el icono de llave) y agrega estos dos, con acceso para el cuaderno activado:\n` +
      `   TDD_ID = ${x.TDD_ID}\n   TDD_CLAVE = ${x.TDD_CLAVE || "(la que ya tienes)"}\n` +
      `2) Mira tu avance en ${URL_ALUMNO} entrando con ${String(x.TDD_ID).includes("@") ? "ese mismo Gmail" : "tu Gmail inscrito"}.\n` +
      `Paso a paso con imágenes: ${URL_TUTORIAL}`;
  }
  function mensajeDocente(x) {
    return `Hola ${String(x.nombre).split(" ")[0]}: ya tienes acceso como docente de The Agentic Data Scientist${x.grupos && x.grupos.length ? ` (grupos ${x.grupos.join(", ")})` : ""}.\n` +
      `1) Entra a tu panel en ${URL_DOCENTE} con Google, usando ${x.TDD_ID}.\n` +
      `2) Para el modo docente de los cuadernos en Colab, agrega en Secretos: TDD_ID = ${x.TDD_ID} y TDD_CLAVE = ${x.TDD_CLAVE || "(la que ya tienes)"}.`;
  }
  function bloqueClaves(lista, plantilla) {
    const conClave = lista.filter((x) => x.TDD_CLAVE);
    const box = el("div", "keys");
    box.append(el("p", null, conClave.length ? `${conClave.length === 1 ? "Guarda esta clave" : `Guarda estas ${conClave.length} claves`} ahora: no se pueden volver a ver (Supabase solo guarda una huella).` : "No hubo claves nuevas: esas cuentas ya existían y conservan su clave."));
    const wrap = el("div", "table-wrap"), t = el("table", "tbl"), hr = el("tr");
    ["ID", "Nombre", "Cuenta", "TDD_ID", "TDD_CLAVE", ""].forEach((h) => hr.append(el("th", null, h)));
    const th = el("thead"); th.append(hr); t.append(th); const tb = el("tbody");
    lista.forEach((x) => {
      if (x.TDD_CLAVE && x.id) clavesRecientes.set(x.id, x.TDD_CLAVE);
      const celda = (cls, v) => { const td = el("td", cls); td.append(el("span", null, v)); if (v && !v.startsWith("(")) { const b = boton("Copiar", "btn-copy", () => copiar(v)); b.setAttribute("aria-label", `Copiar ${v}`); td.append(b); } return td; };
      const tr = el("tr"); tr.append(el("td", "mono", x.id), el("td", null, x.nombre || ""), el("td", null, x.cuenta || ""), celda("mono", x.TDD_ID), celda("mono secret", x.TDD_CLAVE || "(sin cambio)"));
      const td = el("td"); td.append(boton("Copiar mensaje", "btn btn-line btn-sm", () => { copiar(plantilla(x)); clavesSinGuardar = false; })); tr.append(td); tb.append(tr);
    });
    t.append(tb); wrap.append(t); box.append(wrap);
    const acc = el("div", "row");
    acc.append(boton("Descargar CSV de claves", "btn btn-accent btn-sm", () => {
      descargar(`claves_${marca()}.csv`, csv([["id", "nombre", "TDD_ID", "TDD_CLAVE"], ...lista.map((x) => [x.id, x.nombre || "", x.TDD_ID, x.TDD_CLAVE || ""])]), "text/csv;charset=utf-8");
      clavesSinGuardar = false;
    }), boton("Copiar todos los mensajes", "btn btn-line btn-sm", () => { copiar(lista.map(plantilla).join("\n\n———\n\n")); clavesSinGuardar = false; }));
    box.append(acc);
    clavesSinGuardar = conClave.length > 0;
    return box;
  }

  // ---------- Alta de alumnos (administración) ----------
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
    const d = $("#dlgAlta"); if (!d) return;
    $("#altaResultado").hidden = true; $("#altaResultado").replaceChildren(); $("#altaMsg").textContent = ""; $("#altaMsg").className = "form-msg";
    const f = $("#formUno"); f.reset(); f.aid.value = siguienteId(); $("#lista").value = ""; $("#listaPrevia").replaceChildren();
    const porOmision = S.grupoSel && S.grupoSel !== "__sin__" ? S.grupoSel : (S.grupos.find((g) => g.activo) || {}).id || "";
    opcionesGrupo(f.grupo, porOmision); opcionesGrupo($("#listaGrupo"), porOmision);
    $("#altaSinGrupos").hidden = !!S.grupos.length;
    const listo = S.fn && S.fn.ok && S.esquema;
    $("#altaEnviar").disabled = !listo;
    if (!listo) { $("#altaMsg").className = "form-msg err"; $("#altaMsg").textContent = !S.esquema ? "Primero aplica el esquema 0.7 (instalador, pasos 1 a 3)." : S.fn.error; }
    modoAlta("uno"); d.showModal(); f.nombre.focus();
  }
  $$("[data-alta]").forEach((b) => b.addEventListener("click", abrirAlta));
  $$("#dlgAlta [data-modo]").forEach((b) => b.addEventListener("click", () => modoAlta(b.dataset.modo)));

  // Lee la lista pegada (CSV o tabulada desde Sheets) y la valida antes de enviar.
  function leerLista(texto, grupoPorOmision) {
    const lineas = texto.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith("#"));
    if (!lineas.length) return [];
    const sep = lineas[0].includes("\t") ? "\t" : lineas[0].includes(";") && !lineas[0].includes(",") ? ";" : ",";
    const partir = (l) => { const out = []; let cur = "", q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === sep && !q) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()); };
    let filas = lineas.map(partir), cols = ["id", "nombre", "grupo", "correo"];
    if (filas[0].map((x) => x.toLowerCase()).includes("id") && filas[0].map((x) => x.toLowerCase()).includes("nombre")) { cols = filas[0].map((x) => x.toLowerCase()); filas = filas.slice(1); }
    const vistos = new Set(), existentes = new Map(S.alumnos.map((a) => [a.alumno_id, a])), grupos = new Set(S.grupos.map((g) => g.id));
    const correosDocentes = new Set(S.docentes.map((d) => (d.correo || "").toLowerCase()).concat(S.admins.map((x) => x.correo)));
    return filas.map((f, i) => {
      const o = {}; cols.forEach((c, j) => { o[c] = f[j] || ""; });
      const x = { id: o.id.toUpperCase(), nombre: o.nombre, grupo: (o.grupo || grupoPorOmision || "").trim(), correo: o.correo.toLowerCase(), fila: i + 1 };
      if (!/^[A-Z0-9_-]{2,30}$/.test(x.id) || x.id === "DOCENTE") x.error = "ID inválido (letras, números, guion o guion bajo)";
      else if (!x.nombre) x.error = "falta el nombre";
      else if (x.correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x.correo)) x.error = "correo inválido";
      else if (x.correo && correosDocentes.has(x.correo)) x.error = "ese correo es de un docente o de administración";
      else if (x.grupo && !grupos.has(x.grupo)) x.error = `no existe el grupo ${x.grupo} (créalo en Grupos)`;
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
  function previaLista() {
    const filas = leerLista($("#lista").value, $("#listaGrupo").value), ul = $("#listaPrevia"); ul.replaceChildren();
    const ok = filas.filter((x) => !x.error).length;
    if (filas.length) ul.append(el("li", null, `${plural(ok, "alumno listo", "alumnos listos")}${filas.length - ok ? ` · ${filas.length - ok} con error` : ""}${ok > 60 ? " · se envían los primeros 60" : ""}`));
    filas.forEach((x) => ul.append(el("li", x.error ? "err" : null, x.error ? `✗ Fila ${x.fila}: ${x.error}` : `✓ ${x.id} · ${x.nombre}${x.grupo ? ` (${x.grupo})` : " (sin grupo)"}${x.correo ? ` · ${x.correo}` : " · sin correo (entra con su ID)"}${x.aviso ? ` · ${x.aviso}` : ""}`)));
  }
  on("#lista", "input", previaLista);
  on("#listaGrupo", "change", previaLista);

  on("#altaEnviar", "click", async () => {
    const msg = $("#altaMsg"), btn = $("#altaEnviar"); msg.className = "form-msg"; msg.textContent = "";
    let alumnos;
    if (!$("#formUno").hidden) {
      const f = $("#formUno"); if (!f.reportValidity()) return;
      const x = leerLista(`id,nombre,grupo,correo\n"${f.aid.value}","${f.nombre.value.replace(/"/g, "")}","${f.grupo.value}","${f.correo.value}"`, "")[0];
      if (x.error) { msg.className = "form-msg err"; msg.textContent = `No se puede: ${x.error}.`; return; }
      alumnos = [x];
    } else {
      const filas = leerLista($("#lista").value, $("#listaGrupo").value), malas = filas.filter((x) => x.error);
      if (!filas.length) { msg.className = "form-msg err"; msg.textContent = "Pega al menos una fila."; return; }
      if (malas.length) { msg.className = "form-msg err"; msg.textContent = `Corrige ${plural(malas.length, "fila marcada", "filas marcadas")} con ✗ antes de enviar.`; return; }
      alumnos = filas.slice(0, 60);
    }
    btn.disabled = true; msg.textContent = `Dando de alta ${plural(alumnos.length, "alumno", "alumnos")}…`;
    try {
      const r = await funcion("tdd-docente", { accion: "alta", alumnos: alumnos.map(({ id, nombre, grupo, correo }) => ({ id, nombre, grupo, correo })) });
      const res = r.resultados || [], ok = res.filter((x) => x.ok), mal = res.filter((x) => !x.ok);
      msg.className = `form-msg ${mal.length ? "err" : "ok"}`;
      const nc = ok.filter((x) => x.estado === "creado").length, na = ok.filter((x) => x.estado === "actualizado").length;
      msg.textContent = [nc && plural(nc, "inscrito", "inscritos"), na && plural(na, "actualizado", "actualizados"), mal.length && `${mal.length} con error`].filter(Boolean).join(" · ") + ".";
      const cont = $("#altaResultado"); cont.replaceChildren(); cont.hidden = false;
      if (ok.length) cont.append(bloqueClaves(ok, mensaje));
      if (mal.length) { const ul = el("ul", "preview-list"); mal.forEach((x) => ul.append(el("li", "err", `✗ ${x.id}: ${x.error}`))); cont.append(ul); }
      $("#formUno").reset(); $("#lista").value = ""; $("#listaPrevia").replaceChildren();
      cont.scrollIntoView({ behavior: "smooth", block: "nearest" });
      await cargar(true); $("#formUno").aid.value = siguienteId(); opcionesGrupo($("#formUno").grupo, $("#listaGrupo").value);
    } catch (e) { msg.className = "form-msg err"; msg.textContent = errorFuncion(e); }
    finally { btn.disabled = false; }
  });

  // Cerrar diálogos (con aviso si hay claves sin guardar)
  async function cerrarDialogo(d) {
    if (clavesSinGuardar && ["dlgAlta", "dlgFicha", "dlgDocente"].includes(d.id)) {
      const salir_ = await confirmar("¿Cerrar sin guardar las claves?", "No se pueden volver a ver. Si cierras, tendrás que generar claves nuevas.", "Cerrar de todos modos");
      if (!salir_) return;
      clavesSinGuardar = false;
    }
    d.close();
  }
  $$("dialog.dlg").forEach((d) => {
    $$("[data-cerrar]", d).forEach((b) => b.addEventListener("click", () => cerrarDialogo(d)));
    d.addEventListener("cancel", (e) => { if (d.id !== "dlgConfirmar") { e.preventDefault(); cerrarDialogo(d); } });
  });

  // ---------- Clases en vivo (0.10) ----------
  const DIAS = [["", "—"], ["1", "Lunes"], ["2", "Martes"], ["3", "Miércoles"], ["4", "Jueves"], ["5", "Viernes"], ["6", "Sábado"], ["7", "Domingo"]];
  const DOCE_MESES = 365 * DIA;
  const clasesVisibles = () => {
    const mios = ADMIN ? null : new Set(gruposDelFiltro().map((g) => g.id));
    return S.clases.filter((k) => (!S.grupoSel || S.grupoSel === "__sin__" ? true : k.grupo === S.grupoSel) && (!mios || mios.has(k.grupo)));
  };
  const finClase = (k) => new Date(new Date(k.inicio).getTime() + (k.duracion_min || 180) * MIN);
  const ligaCorta = (u) => { try { const x = new URL(u); return x.hostname.replace(/^www\./, "") + (x.pathname.length > 1 ? x.pathname.slice(0, 18) + (x.pathname.length > 18 ? "…" : "") : ""); } catch (_) { return u; } };
  function enlace(u, texto) { const a = el("a", null, texto || ligaCorta(u)); a.href = u; a.target = "_blank"; a.rel = "noopener"; return a; }

  function pintarClases() {
    const tb = $("#tablaClases"); if (!tb) return; tb.replaceChildren();
    const lista = clasesVisibles(), ahora = new Date();
    const futuras = lista.filter((k) => finClase(k) > ahora);
    $("#cntClases").textContent = futuras.length || "";
    ["#nuevaClase", "#generarClases"].forEach((b) => { if ($(b)) $(b).disabled = !S.v10 || !S.grupos.length; });
    if (!S.v10) { const tr = el("tr"), td = el("td", null, "Las clases llegan con el esquema 0.10: corre los pasos 1 a 3 del instalador."); tr.append(td); tb.append(tr); return; }
    if (!lista.length) {
      const tr = el("tr"), td = el("td", null, ADMIN ? "Aún no hay clases. Con «Generar calendario» creas todas las de la generación en un paso (por ejemplo, viernes 18:00 y sábados 8:00)." : "Administración todavía no publica el calendario de clases.");
      tr.append(td); tb.append(tr); return;
    }
    const head = el("tr"); ["#", "Fecha (CDMX)", "Tema", "Caso", "Google Meet", "Grabación", ...(ADMIN ? [""] : [])].forEach((h) => head.append(el("th", null, h)));
    const thead = el("thead"); thead.append(head); const body = el("tbody");
    const numero = new Map(); const porGrupo = new Map();
    S.clases.forEach((k) => { const n = (porGrupo.get(k.grupo) || 0) + 1; porGrupo.set(k.grupo, n); numero.set(k.id, n); });
    const proxima = futuras[0];
    lista.forEach((k) => {
      const tr = el("tr"), pasada = finClase(k) < ahora, vence = new Date(new Date(k.inicio).getTime() + DOCE_MESES);
      if (pasada) tr.className = "muted-row";
      const tdN = el("td", null, String(numero.get(k.id)));
      const tdF = el("td"); tdF.append(document.createTextNode(fecha(k.inicio)));
      if (k === proxima) tdF.append(" ", pill(new Date(k.inicio) <= ahora ? "En vivo" : "Próxima", "ok"));
      if (gruposDelFiltro().length > 1) tdF.append(el("small", "muted", ` · ${k.grupo}`));
      const tdT = el("td", null, k.tema), tdC = el("td", null, k.caso ? `Caso ${k.caso}` : "—");
      const tdM = el("td"); tdM.append(k.meet_url ? enlace(k.meet_url) : document.createTextNode("—"));
      const tdG = el("td");
      if (k.grabacion_url) { tdG.append(enlace(k.grabacion_url, "Ver"), el("small", "muted", ` · ${vence < ahora ? "ya no la ven los alumnos" : `hasta ${vence.toLocaleDateString("es-MX", { timeZone: TZ, day: "numeric", month: "short", year: "numeric" })}`}`)); }
      else if (ADMIN && pasada) {
        const f = el("form", "inline-form"), i = el("input", "inp"); i.type = "url"; i.required = true; i.placeholder = "Pega el enlace de Drive"; i.setAttribute("aria-label", `Grabación de la clase ${numero.get(k.id)}`);
        const b = el("button", "btn btn-line btn-sm", "Guardar"); b.type = "submit"; f.append(i, b);
        f.addEventListener("submit", async (ev) => {
          ev.preventDefault(); b.disabled = true;
          try { await guardarClase(k, { p_grabacion: i.value.trim() }); toast("Grabación publicada en Mi avance"); cargar(true); }
          catch (e) { toast(e.message); b.disabled = false; }
        });
        tdG.append(f);
      } else tdG.append(document.createTextNode(pasada ? "Pendiente" : "—"));
      tr.append(tdN, tdF, tdT, tdC, tdM, tdG);
      if (ADMIN) {
        const acc = el("td", "row-actions");
        acc.append(boton("Editar", "btn btn-line btn-sm", () => abrirClase(k)), boton("Borrar", "btn btn-danger btn-sm", async () => {
          if (!(await confirmar(`¿Borrar la clase ${numero.get(k.id)}?`, `${fecha(k.inicio)} · ${k.tema}. Desaparece del calendario de los alumnos.`, "Borrar clase"))) return;
          try { await rpc("admin_borrar_clase", { p_id: k.id }); toast("Clase borrada"); cargar(true); } catch (e) { toast(e.message); }
        }));
        tr.append(acc);
      }
      body.append(tr);
    });
    tb.append(thead, body);
  }

  // Guarda una clase con sus datos actuales y los cambios indicados (la función siempre recibe la clase completa).
  function guardarClase(k, cambios) {
    return rpc("admin_guardar_clase", Object.assign({ p_id: k.id, p_grupo: k.grupo, p_inicio: k.inicio, p_duracion: k.duracion_min, p_tema: k.tema,
      p_caso: k.caso, p_meet: k.meet_url, p_grabacion: k.grabacion_url }, cambios));
  }
  const gruposEnSelect = (sel, valor) => { sel.replaceChildren(...S.grupos.map((g) => new Option(`${g.nombre} (${g.id})`, g.id))); sel.value = valor || S.grupoSel && S.grupoSel !== "__sin__" && S.grupoSel || (S.grupos.find((g) => g.activo) || S.grupos[0] || {}).id || ""; };
  let claseActual = null;
  function abrirClase(k) {
    claseActual = k || null;
    const f = $("#formClase"); f.reset();
    $("#claseTitle").textContent = k ? "Editar clase" : "Nueva clase";
    gruposEnSelect(f.grupo, k && k.grupo);
    f.caso.replaceChildren(new Option("Sin caso", ""), ...S.casos.map((c) => new Option(`Caso ${c.id} · ${c.titulo}`, c.id)));
    if (k) {
      const local = new Date(k.inicio).toLocaleString("sv-SE", { timeZone: TZ });
      f.fecha.value = local.slice(0, 10); f.hora.value = local.slice(11, 16); f.duracion.value = k.duracion_min; f.tema.value = k.tema;
      f.caso.value = k.caso || ""; f.meet.value = k.meet_url || ""; f.grabacion.value = k.grabacion_url || "";
    } else {
      const ultima = S.clases.filter((x) => x.meet_url).pop(); if (ultima) f.meet.value = ultima.meet_url;
    }
    $("#claseMsg").textContent = ""; $("#dlgClase").showModal(); f.fecha.focus();
  }
  on("#nuevaClase", "click", () => abrirClase());
  on("#formClase", "submit", async (ev) => {
    ev.preventDefault(); const f = ev.target, msg = $("#claseMsg"), b = $("#claseGuardar"); b.disabled = true; msg.className = "form-msg"; msg.textContent = "Guardando…";
    try {
      await rpc("admin_guardar_clase", { p_id: claseActual ? claseActual.id : null, p_grupo: f.grupo.value, p_inicio: `${f.fecha.value}T${f.hora.value}:00-06:00`,
        p_duracion: Number(f.duracion.value), p_tema: f.tema.value.trim() || null, p_caso: f.caso.value || null, p_meet: f.meet.value.trim() || null, p_grabacion: f.grabacion.value.trim() || null });
      $("#dlgClase").close(); toast(claseActual ? "Clase actualizada" : "Clase creada"); cargar(true);
    } catch (e) { msg.className = "form-msg err"; msg.textContent = e.message; }
    finally { b.disabled = false; }
  });
  function abrirCalendario() {
    const f = $("#formCalendario"); f.reset();
    gruposEnSelect(f.grupo);
    [1, 2, 3].forEach((i) => { f[`dia${i}`].replaceChildren(...DIAS.map(([v, t]) => new Option(t, v))); });
    f.dia1.value = "5"; f.dia2.value = "6"; f.dia3.value = "";
    const llenar = () => { const g = S.grupos.find((x) => x.id === f.grupo.value) || {}; f.desde.value = g.inicio || ""; f.hasta.value = g.fin || ""; };
    llenar(); f.grupo.onchange = llenar;
    const ultima = S.clases.filter((x) => x.meet_url).pop(); if (ultima) f.meet.value = ultima.meet_url;
    $("#calMsg").textContent = ""; $("#dlgCalendario").showModal(); f.desde.focus();
  }
  on("#generarClases", "click", abrirCalendario);
  on("#formCalendario", "submit", async (ev) => {
    ev.preventDefault(); const f = ev.target, msg = $("#calMsg"), b = $("#calGuardar");
    const horarios = [1, 2, 3].filter((i) => f[`dia${i}`].value && f[`hora${i}`].value)
      .map((i) => ({ dia: Number(f[`dia${i}`].value), hora: f[`hora${i}`].value, duracion: Number(f[`dur${i}`].value) || 180 }));
    if (!horarios.length) { msg.className = "form-msg err"; msg.textContent = "Elige al menos un día y una hora."; return; }
    b.disabled = true; msg.className = "form-msg"; msg.textContent = "Creando clases…";
    try {
      const n = await rpc("admin_generar_clases", { p_grupo: f.grupo.value, p_desde: f.desde.value, p_hasta: f.hasta.value, p_horarios: horarios, p_meet: f.meet.value.trim() || null });
      $("#dlgCalendario").close(); toast(n ? `${plural(n, "clase creada", "clases creadas")}` : "No había clases nuevas que crear"); cargar(true);
    } catch (e) { msg.className = "form-msg err"; msg.textContent = e.message; }
    finally { b.disabled = false; }
  });

  // ---------- Augmented Studio: acceso a los niveles de pago (0.11) ----------
  const hoyCdmx = () => new Date().toLocaleDateString("sv-SE", { timeZone: TZ });
  const sumarMeses = (iso, m) => { const d = new Date(`${iso}T12:00:00`); d.setMonth(d.getMonth() + m); return d.toISOString().slice(0, 10); };
  const fechaLarga = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
  function pintarStudio() {
    const tb = $("#tablaStudio"); if (!tb) return; tb.replaceChildren();
    const vigentes = S.studio.filter((x) => x.vigente);
    $("#cntStudio").textContent = vigentes.length || "";
    if ($("#nuevoAcceso")) $("#nuevoAcceso").disabled = !S.v11;
    if (!S.v11) { const tr = el("tr"), td = el("td", null, "Los accesos de Studio llegan con el esquema 0.11: corre los pasos 1 a 3 del instalador."); tr.append(td); tb.append(tr); return; }
    if (!S.studio.length) { const tr = el("tr"), td = el("td", null, "Aún no hay suscriptores. Con «+ Acceso» activas a quien te pagó Augmented Studio: entra con su Gmail y ve los niveles 3 en adelante hasta la fecha que pongas."); tr.append(td); tb.append(tr); return; }
    const head = el("tr"); ["Gmail", "Vence", "Estado", "Cuenta", "Nota", ""].forEach((h) => head.append(el("th", null, h)));
    const thead = el("thead"); thead.append(head); const body = el("tbody");
    S.studio.forEach((x) => {
      const tr = el("tr"); if (!x.vigente) tr.className = "muted-row";
      const tdC = el("td"); tdC.append(el("b", null, x.correo)); if (x.alumno_id) tdC.append(el("small", "muted", ` · alumno ${x.alumno_id}`));
      const tdE = el("td"); tdE.append(x.vigente ? pill("Vigente", "ok") : pill("Vencido", "crit"));
      const tdK = el("td", null, x.ultimo_acceso ? `Entró ${relativo(x.ultimo_acceso)}${x.con_google ? " con Google" : ""}` : x.cuenta ? "Aún no entra" : "Sin cuenta");
      const acc = el("td", "row-actions");
      acc.append(boton("Renovar", "btn btn-line btn-sm", () => abrirAcceso(x)), boton("Quitar", "btn btn-danger btn-sm", async () => {
        if (!(await confirmar(`¿Quitar el acceso de ${x.correo}?`, "Deja de ver los niveles 3 en adelante en su siguiente visita (a más tardar en 5 minutos). Su cuenta y su avance no se borran.", "Quitar acceso"))) return;
        try { await rpc("admin_quitar_acceso", { p_correo: x.correo }); toast("Acceso quitado"); cargar(true); } catch (e) { toast(e.message); }
      }));
      tr.append(tdC, el("td", null, fechaLarga(x.hasta)), tdE, tdK, el("td", null, x.nota || "—"), acc);
      body.append(tr);
    });
    tb.append(thead, body);
  }
  function abrirAcceso(x) {
    const f = $("#formAcceso"); f.reset();
    $("#accesoTitle").textContent = x ? "Renovar acceso" : "Nuevo acceso";
    f.correo.value = x ? x.correo : ""; f.correo.readOnly = !!x; f.nota.value = x && x.nota || "";
    const base = x && x.vigente ? x.hasta : hoyCdmx();
    f.hasta.value = sumarMeses(base, 1); f.hasta.min = hoyCdmx();
    f.querySelectorAll("[data-meses]").forEach((b) => { b.onclick = () => { f.hasta.value = sumarMeses(base, Number(b.dataset.meses)); }; });
    $("#accesoMsg").textContent = ""; $("#dlgAcceso").showModal(); (x ? f.hasta : f.correo).focus();
  }
  on("#nuevoAcceso", "click", () => abrirAcceso());
  on("#formAcceso", "submit", async (ev) => {
    ev.preventDefault(); const f = ev.target, msg = $("#accesoMsg"), b = $("#accesoGuardar"); b.disabled = true; msg.className = "form-msg"; msg.textContent = "Guardando…";
    try {
      const r = await funcion("tdd-docente", { accion: "acceso_studio", correo: f.correo.value.trim(), hasta: f.hasta.value, nota: f.nota.value.trim() });
      if (!r || !r.ok) throw new Error((r && r.error) || "No se pudo guardar");
      $("#dlgAcceso").close();
      toast(r.cuenta === "nueva" ? `Acceso activo hasta el ${fechaLarga(r.hasta)}. Su cuenta se creó: que entre con Google con ${r.correo}.` : `Acceso activo hasta el ${fechaLarga(r.hasta)}`);
      cargar(true);
    } catch (e) {
      msg.className = "form-msg err";
      msg.textContent = /desconocida/i.test(e.message) ? "La función tdd-docente es anterior a 0.9: despliégala de nuevo y vuelve a intentar." : e.message;
    } finally { b.disabled = false; }
  });

  // ---------- Grupos (administración) ----------
  function pintarGrupos() {
    const cont = $("#listaGrupos"); if (!cont) return; cont.replaceChildren();
    const nuevo = $("#nuevoGrupo"); if (nuevo) nuevo.disabled = !S.esquema;
    S.grupos.forEach((g) => {
      const card = el("article", `card grupo-card${g.activo ? "" : " off"}`);
      const top = el("div", "grupo-top"), t = el("div");
      t.append(el("span", "gid", g.id), el("h3", null, g.nombre));
      top.append(t, g.activo ? pill("Activo", "ok") : pill("Inactivo"));
      const meta = el("dl", "grupo-meta");
      const linea = (k, v) => { if (!v) return; const w = el("div"); w.append(el("dt", null, k), el("dd", null, v)); meta.append(w); };
      linea("Horario", g.horario); linea("Fechas", g.inicio || g.fin ? `${fechaCorta(g.inicio) || "?"} – ${fechaCorta(g.fin) || "?"}` : "");
      const alumnosG = S.alumnos.filter((a) => a.grupo === g.id), n = alumnosG.length;
      const cupo = el("div", "cupo"), rail = el("div", "rail"), barra = el("i");
      barra.style.width = `${g.cupo ? Math.min(100, (n / g.cupo) * 100) : n ? 100 : 0}%`; rail.append(barra);
      cupo.append(el("span", null, g.cupo ? `${n} de ${g.cupo} lugares` : plural(n, "alumno", "alumnos")), rail);
      const avg = n ? alumnosG.reduce((s, a) => s + S.casos.reduce((t2, c) => t2 + (a.vistas.get(c.id) || new Set()).size, 0), 0) / (n * Math.max(1, S.casos.reduce((s, c) => s + total(c), 0))) : null;
      if (avg != null) cupo.append(el("span", null, `Avance promedio ${pct(avg)}`));
      const docs = el("div", "chips-row");
      (g.docentes || []).forEach((d) => docs.append(pill(d.nombre, d.activo ? "ok" : "")));
      if (!(g.docentes || []).length) docs.append(pill("Sin docente", g.activo ? "crit" : ""));
      const acc = el("div", "grupo-acc");
      acc.append(boton("Editar", "btn btn-line btn-sm", () => abrirGrupo(g)), boton("Ver alumnos", "btn btn-line btn-sm", () => { S.grupoSel = g.id; guardarLocal(LLAVE_GRUPO, g.id); pintarTodo(); irA("alumnos"); }));
      if (!n) acc.append(boton("Borrar", "btn btn-danger btn-sm", async () => {
        if (!(await confirmar(`¿Borrar el grupo ${g.id}?`, "No tiene alumnos. Se quitan también sus docentes asignados y sus fechas de entrega.", "Borrar grupo"))) return;
        try { await rpc("admin_borrar_grupo", { p_id: g.id }); toast("Grupo borrado"); cargar(true); } catch (e) { toast(e.message); }
      }));
      card.append(top, meta, cupo, el("h4", "mini-h", "Docentes"), docs, acc); cont.append(card);
    });
    if (!S.grupos.length) cont.append(el("p", "notice", S.esquema ? "Aún no hay grupos. Crea el primero, por ejemplo «G1-A · Generación 1, viernes y sábados»." : "Los grupos llegan con el esquema 0.7 (instalador, pasos 1 a 3)."));
  }

  let grupoActual = null;
  function abrirGrupo(g) {
    grupoActual = g || null;
    const f = $("#formGrupo"); f.reset();
    $("#grupoTitle").textContent = g ? `Editar ${g.id}` : "Nuevo grupo";
    f.gid.readOnly = !!g;
    if (g) { f.gid.value = g.id; f.nombre.value = g.nombre; f.horario.value = g.horario || ""; f.inicio.value = g.inicio || ""; f.fin.value = g.fin || ""; f.cupo.value = g.cupo || ""; f.activo.checked = g.activo; }
    else f.activo.checked = true;
    const lista = $("#grupoDocentes"); lista.replaceChildren();
    const asignados = new Set((g && g.docentes || []).map((d) => d.id));
    S.docentes.filter((d) => d.activo || asignados.has(d.id)).forEach((d) => {
      const li = el("li"), l = el("label"), c = el("input"); c.type = "checkbox"; c.value = d.id; c.checked = asignados.has(d.id);
      l.append(c, el("span", null, `${d.nombre} · ${d.correo}`)); li.append(l); lista.append(li);
    });
    if (!S.docentes.length) lista.append(el("li", "empty", "Aún no hay docentes. Dalos de alta en la pestaña Docentes."));
    $("#grupoMsg").textContent = ""; $("#dlgGrupo").showModal(); (g ? f.nombre : f.gid).focus();
  }
  on("#nuevoGrupo", "click", () => abrirGrupo());
  on("#formGrupo", "submit", async (ev) => {
    ev.preventDefault(); const f = ev.target, msg = $("#grupoMsg"), b = $("#grupoGuardar"); b.disabled = true; msg.className = "form-msg"; msg.textContent = "Guardando…";
    try {
      const id = f.gid.value.trim().toUpperCase();
      await rpc("admin_guardar_grupo", { p_id: grupoActual ? grupoActual.id : id, p_nombre: f.nombre.value, p_horario: f.horario.value || null, p_inicio: f.inicio.value || null,
        p_fin: f.fin.value || null, p_cupo: f.cupo.value ? Number(f.cupo.value) : null, p_activo: f.activo.checked });
      const docentes = $$("#grupoDocentes input:checked").map((c) => c.value);
      const antes = (grupoActual && grupoActual.docentes || []).map((d) => d.id).sort().join(",");
      if (docentes.slice().sort().join(",") !== antes) await rpc("admin_asignar_docentes", { p_grupo: grupoActual ? grupoActual.id : id, p_docentes: docentes });
      $("#dlgGrupo").close(); toast(grupoActual ? "Grupo actualizado" : `Grupo ${id} creado`); cargar(true);
    } catch (e) { msg.className = "form-msg err"; msg.textContent = e.message; }
    finally { b.disabled = false; }
  });

  // ---------- Docentes (administración) ----------
  function pintarDocentes() {
    const t = $("#tablaDocentes"); if (!t) return; t.replaceChildren();
    const nuevo = $("#nuevoDocente"); if (nuevo) { nuevo.disabled = !(S.esquema && S.fn && S.fn.ok); nuevo.title = nuevo.disabled ? "Requiere el esquema 0.7 y la función tdd-docente" : ""; }
    // Administración (solo lectura)
    const ad = $("#admins"); ad.replaceChildren();
    S.admins.forEach((x) => {
      const li = el("li"); const w = el("div", "who-cell"), d = el("div");
      d.append(el("b", null, x.correo), el("small", null, x.cuenta ? (x.ultimo_acceso ? `Último acceso ${relativo(x.ultimo_acceso)}` : "Nunca ha entrado") : "Sin cuenta: corre el paso 4 del instalador"));
      w.append(avatar(x.correo), d); li.append(w, x.cuenta ? (x.con_google ? pill("Google", "ok") : pill("sin Google")) : pill("Sin cuenta", "crit")); ad.append(li);
    });
    if (!S.admins.length) ad.append(el("li", "empty", S.esquema ? "—" : "Llega con el esquema 0.7."));
    const hr = el("tr"); ["Docente", "Grupos", "Alumnos", "Estado", "Google", "Último acceso"].forEach((h) => hr.append(el("th", h === "Alumnos" ? "r" : null, h)));
    const thead = el("thead"); thead.append(hr); t.append(thead); const tb = el("tbody");
    S.docentes.forEach((d) => {
      const tr = el("tr", "click"); tr.tabIndex = 0;
      const quien = el("td"), w = el("div", "who-cell"), dv = el("div"); dv.append(el("b", null, d.nombre), el("small", null, d.correo)); w.append(avatar(d.nombre), dv); quien.append(w);
      const gs = el("td"); const chips = el("div", "chips-row"); (d.grupos || []).forEach((g) => chips.append(pill(g))); if (!(d.grupos || []).length) chips.append(pill("Sin grupo")); gs.append(chips);
      const nAl = S.alumnos.filter((a) => (d.grupos || []).includes(a.grupo)).length;
      const est = el("td"); est.append(d.activo ? pill("Activo", "ok") : pill("Inactivo")); if (d.es_admin) est.append(" ", pill("Administración", "dark"));
      tr.append(quien, gs, el("td", "r", String(nAl)), est, el("td", null, d.con_google ? "Sí" : "No"), el("td", null, d.ultimo_acceso ? relativo(d.ultimo_acceso) : "Nunca"));
      tr.addEventListener("click", () => abrirDocente(d)); tr.addEventListener("keydown", (e) => { if (e.key === "Enter") abrirDocente(d); });
      tb.append(tr);
    });
    if (!S.docentes.length) { const tr = el("tr"), td = el("td", null, S.esquema ? "Aún no hay docentes. Dalos de alta con su Gmail: entran a docente.html con Google." : "Los docentes llegan con el esquema 0.7."); td.colSpan = 6; tr.append(td); tb.append(tr); }
    t.append(tb);
  }

  let docenteActual = null;
  function abrirDocente(d) {
    docenteActual = d || null;
    const f = $("#formDocente"); f.reset();
    $("#docenteTitle").textContent = d ? d.nombre : "Dar de alta docente";
    f.correo.readOnly = !!d; f.correo.required = !d;
    if (d) { f.correo.value = d.correo; f.nombre.value = d.nombre; f.activo.checked = d.activo; }
    $("#docenteActivoCaja").hidden = !d;
    const lista = $("#docenteGrupos"); lista.replaceChildren();
    const suyos = new Set(d ? d.grupos || [] : S.grupoSel && S.grupoSel !== "__sin__" ? [S.grupoSel] : []);
    S.grupos.filter((g) => g.activo || suyos.has(g.id)).forEach((g) => {
      const li = el("li"), l = el("label"), c = el("input"); c.type = "checkbox"; c.value = g.id; c.checked = suyos.has(g.id);
      l.append(c, el("span", null, `${g.nombre} (${g.id})`)); li.append(l); lista.append(li);
    });
    if (!S.grupos.length) lista.append(el("li", "empty", "Aún no hay grupos: créalos en la pestaña Grupos."));
    $("#docenteMsg").textContent = ""; $("#docenteMsg").className = "form-msg";
    const res = $("#docenteResultado"); res.replaceChildren();
    const kb = $("#docenteClave"); kb.hidden = !d; kb.disabled = !(S.fn && S.fn.ok);
    $("#docenteGuardar").textContent = d ? "Guardar cambios" : "Dar de alta";
    $("#dlgDocente").showModal(); (d ? f.nombre : f.correo).focus();
  }
  on("#nuevoDocente", "click", () => abrirDocente());
  on("#docenteClave", "click", () => { const d = docenteActual; if (d) claveNuevaDe(d.id, d.nombre, d.correo, $("#docenteResultado"), $("#docenteClave"), (x) => mensajeDocente({ ...x, grupos: d.grupos })); });
  on("#formDocente", "submit", async (ev) => {
    ev.preventDefault(); const f = ev.target, msg = $("#docenteMsg"), b = $("#docenteGuardar"); b.disabled = true; msg.className = "form-msg"; msg.textContent = "Guardando…";
    const grupos = $$("#docenteGrupos input:checked").map((c) => c.value);
    try {
      if (docenteActual) {
        await rpc("admin_actualizar_docente", { p_id: docenteActual.id, p_nombre: f.nombre.value, p_activo: f.activo.checked, p_grupos: grupos });
        $("#dlgDocente").close(); toast("Docente actualizado"); cargar(true);
      } else {
        const r = await funcion("tdd-docente", { accion: "alta_docente", docentes: [{ correo: f.correo.value, nombre: f.nombre.value, grupos }] });
        const x = (r.resultados || [])[0] || {};
        if (!x.ok) throw new Error(x.error || "No se pudo dar de alta");
        msg.className = "form-msg ok"; msg.textContent = x.estado === "creado" ? "Docente dado de alta." : "Docente actualizado.";
        $("#docenteResultado").replaceChildren(bloqueClaves([{ ...x, id: x.correo }], mensajeDocente));
        await cargar(true);
        docenteActual = S.docentes.find((d) => d.correo === x.correo) || null;
        $("#docenteGuardar").textContent = "Guardar cambios"; f.correo.readOnly = true; $("#docenteActivoCaja").hidden = !docenteActual;
        if (docenteActual) { f.activo.checked = docenteActual.activo; $("#docenteClave").hidden = false; }
      }
    } catch (e) { msg.className = "form-msg err"; msg.textContent = e.status ? errorFuncion(e) : e.message; }
    finally { b.disabled = false; }
  });

  // ---------- Casos y retos ----------
  function hbars(items, totalN, opciones = {}) {
    const ul = el("ol", "hbars");
    items.forEach((it) => {
      const li = el("li", it.cls || opciones.cls || ""), rail = el("span", "rail"), i = el("i");
      i.style.width = `${totalN ? (it.n / totalN) * 100 : 0}%`; rail.append(i);
      li.append(el("span", null, it.label), rail, el("b", null, opciones.fmt ? opciones.fmt(it.n) : `${it.n}/${totalN}`)); li.title = it.title || `${it.label}: ${it.n} de ${totalN}`;
      ul.append(li);
    });
    return ul;
  }
  const fechaInput = (iso) => (iso ? dia(iso) : "");

  function formFecha(valor, etiqueta, guardar, quitar) {
    const fForm = el("form", "due-form"), campo = el("label", "field"), inp = el("input"); inp.type = "date"; inp.required = true; inp.value = fechaInput(valor);
    campo.append(el("span", null, etiqueta), inp);
    const gb = el("button", "btn btn-line btn-sm", valor ? "Cambiar" : "Poner fecha"); gb.type = "submit"; gb.disabled = !S.esquema;
    fForm.append(campo, gb);
    if (quitar) fForm.append(boton(quitar[0], "btn btn-line btn-sm", quitar[1]));
    fForm.addEventListener("submit", async (ev) => { ev.preventDefault(); gb.disabled = true; try { await guardar(inp.value); } catch (e) { toast(e.message); gb.disabled = false; } });
    return fForm;
  }

  function bloqueFechas(c) {
    const box = el("div", "due-box");
    const gruposVista = (S.grupoSel && S.grupoSel !== "__sin__" ? [S.grupoSel] : gruposDelFiltro().map((g) => g.id));
    if (!ADMIN) {
      const ul = el("ul", "due-list");
      gruposVista.forEach((g) => { const lim = limiteGrupo(g, c); const li = el("li"); li.append(el("b", null, g), document.createTextNode(lim ? ` · vence ${fecha(lim)} (${relativo(lim)})` : " · sin fecha límite")); ul.append(li); });
      if (!gruposVista.length) { const lim = c.entrega_limite; ul.append(el("li", null, lim ? `Vence ${fecha(lim)}` : "Sin fecha límite")); }
      box.append(ul); return box;
    }
    const nota = el("p", "due-note");
    if (c.entrega_limite) nota.append(document.createTextNode("General: vence "), el("b", null, fecha(c.entrega_limite)), document.createTextNode(` (hora del centro de México) · ${relativo(c.entrega_limite)}`));
    else nota.textContent = "Sin fecha general: los grupos sin fecha propia cuentan todas las entregas como a tiempo.";
    box.append(formFecha(c.entrega_limite, "Fecha general (23:59)", async (d) => {
      await rpc("docente_fecha_entrega", { p_caso: c.id, p_limite: hasta2359(d) }); toast(`Caso ${c.id}: fecha general ${d} a las 23:59`); cargar(true);
    }, c.entrega_limite && ["Quitar", async () => {
      if (!(await confirmar(`¿Quitar la fecha general del caso ${c.id}?`, "Los grupos sin fecha propia contarán todas las entregas como a tiempo."))) return;
      try { await rpc("docente_fecha_entrega", { p_caso: c.id, p_limite: null }); toast("Fecha quitada"); cargar(true); } catch (e) { toast(e.message); }
    }]), nota);
    if (S.esquema && S.grupos.length) {
      const det = el("details", "due-groups"); det.open = gruposVista.some((g) => S.entregas.has(`${g}|${c.id}`));
      det.append(el("summary", null, `Fechas por grupo · ${gruposVista.filter((g) => S.entregas.has(`${g}|${c.id}`)).length} propia(s)`));
      gruposVista.forEach((g) => {
        const propia = S.entregas.get(`${g}|${c.id}`), fila = el("div", "due-row");
        const etq = el("div"); etq.append(el("b", null, g), el("small", null, propia ? ` · vence ${fecha(propia)}` : c.entrega_limite ? " · usa la general" : " · sin fecha"));
        fila.append(etq, formFecha(propia, "Fecha del grupo", async (d) => {
          await rpc("admin_fecha_grupo", { p_grupo: g, p_caso: c.id, p_limite: hasta2359(d) }); toast(`Caso ${c.id}, grupo ${g}: vence el ${d}`); cargar(true);
        }, propia && ["Usar la general", async () => {
          try { await rpc("admin_fecha_grupo", { p_grupo: g, p_caso: c.id, p_limite: null }); toast(`Grupo ${g}: usa la fecha general`); cargar(true); } catch (e) { toast(e.message); }
        }]));
        det.append(fila);
      });
      box.append(det);
    }
    return box;
  }

  function pintarCasos() {
    const cont = $("#casosLista"); cont.replaceChildren();
    const A = visibles(), n = A.length;
    const fm = $("#cModulo") ? $("#cModulo").value : "", fq = $("#cBuscar") ? $("#cBuscar").value.trim().toLowerCase() : "";
    const casos = S.casos.filter((c) => (!fm || String(c.modulo) === fm) && (!fq || `${c.id} ${c.titulo}`.toLowerCase().includes(fq)));
    if ($("#cConteo")) $("#cConteo").textContent = casos.length === S.casos.length ? plural(S.casos.length, "caso", "casos") : `${casos.length} de ${S.casos.length} casos`;
    casos.forEach((c) => {
      const card = el("article", "card caso-card");
      const top = el("div", "caso-top"), t = el("div");
      t.append(el("span", "case-id", `Caso ${c.id}${c.modulo != null ? ` · Módulo ${c.modulo}` : ""}`), el("h2", null, c.titulo));
      top.append(t, bloqueFechas(c)); card.append(top);
      card.append(lineaCuaderno(c));

      const empezaron = A.filter((a) => (a.vistas.get(c.id) || new Set()).size || a.avance.has(c.id)).length;
      let aTiempo = 0, tarde = 0; A.forEach((a) => { const e = estadoEntrega(a, c)[2]; if (e === "a tiempo") aTiempo++; if (e === "tarde") tarde++; });
      const avg = n && total(c) ? A.reduce((s, a) => s + (a.vistas.get(c.id) || new Set()).size, 0) / (n * total(c)) : null;
      const hips = A.filter((a) => a.hipotesis.has(c.id));
      const dl = el("dl", "caso-stats");
      const st = (tt, v, nn) => { const w = el("div"), dd = el("dd", null, v); if (nn) dd.append(el("small", null, ` ${nn}`)); w.append(el("dt", null, tt), dd); dl.append(w); };
      st("Empezaron", `${empezaron}`, `de ${n}`); st("Entregaron", `${aTiempo + tarde}`, tarde ? `· ${tarde} tarde` : `de ${n}`); st("Avance promedio", pct(avg)); st("Hipótesis registradas", `${hips.length}`, `de ${n}`);
      card.append(dl);

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
      rh.append(el("h3", null, `Retos calificados · ${retos.length}${S.grupoSel && S.grupoSel !== "__sin__" ? ` · datos de ${S.grupoSel}` : ""}`));
      if (ADMIN) { const nuevo = boton("+ Nuevo reto", "btn btn-line btn-sm", () => abrirReto(c)); nuevo.disabled = !S.esquema; rh.append(nuevo); }
      const rw = el("div"); rw.append(rh);
      if (retos.length) {
        const wrap = el("div", "table-wrap"), tb = el("table", "tbl"), hr = el("tr");
        ["Reto", "Dificultad", "Tipo", "Respuesta", "Alumnos", "Acertaron", "1.er intento", ...(ADMIN ? [""] : [])].forEach((h) => hr.append(el("th", null, h)));
        const thd = el("thead"); thd.append(hr); tb.append(thd); const body = el("tbody");
        retos.forEach((x) => {
          const k = `${x.caso}|${x.reto}`, visible = S.mostrarClaves.has(k), tr = el("tr");
          const resp = el("td"); resp.append(visible ? el("span", "secret", `${x.respuesta}${x.tipo === "numero" && Number(x.tolerancia) ? ` ± ${x.tolerancia}` : ""}`) : el("span", "dots", "••••••"), " ",
            boton(visible ? "Ocultar" : "Mostrar", "icon-btn", () => { visible ? S.mostrarClaves.delete(k) : S.mostrarClaves.add(k); pintarCasos(); }));
          const tasa = x.acierto_primer == null ? null : Number(x.acierto_primer);
          tr.append(el("td", "mono", x.reto), el("td", null, `${"●".repeat(x.dificultad)}${"○".repeat(3 - x.dificultad)} · ${8 * x.dificultad} bits`), el("td", null, x.tipo === "numero" ? "Número" : "Opción"), resp,
            el("td", "r", String(x.alumnos)), el("td", "r", x.alumnos ? `${x.acertaron} (${pct(x.acertaron / x.alumnos)})` : "—"));
          const tt = el("td", "r"); tt.append(tasa == null ? document.createTextNode("—") : pill(pct(tasa), x.alumnos >= 3 && tasa < 0.35 ? "crit" : "ok")); tr.append(tt);
          if (ADMIN) {
            const acc = el("td"); acc.style.whiteSpace = "nowrap";
            acc.append(boton("Editar", "icon-btn", () => abrirReto(c, x)), boton("Borrar", "icon-btn", async () => {
              if (!(await confirmar(`¿Borrar el reto «${x.reto}»?`, "Sus intentos se conservan en el registro, pero dejan de dar bits; los bits de todos se recalculan.", "Borrar reto"))) return;
              try { await rpc("docente_borrar_reto", { p_caso: x.caso, p_reto: x.reto }); toast("Reto borrado"); cargar(true); } catch (e) { toast(e.message); }
            }));
            tr.append(acc);
          }
          body.append(tr);
        });
        tb.append(body); wrap.append(tb); rw.append(wrap);
      } else rw.append(el("p", "empty", ADMIN ? "Sin retos. Un reto acertado da de 8 a 24 bits y se califica en la base: la respuesta nunca llega al cuaderno." : "Este caso aún no tiene retos calificados."));
      card.append(rw);

      const mat = S.material.filter((m) => m.caso === c.id);
      if (mat.length) {
        const md = el("details", "material"), items = el("div", "items"); md.append(el("summary", null, `Notas y rúbricas · ${mat.length}`));
        mat.forEach((m) => { const d = el("details"); d.append(el("summary", null, m.titulo), el("p", null, m.contenido.trim())); items.append(d); });
        md.append(items); card.append(md);
      }
      cont.append(card);
    });
    if (!S.casos.length) cont.append(el("p", "notice", "No hay casos en la base. Se dan de alta con el instalador (pasos 1 a 3)."));
    else if (!casos.length) cont.append(el("p", "notice", "Ningún caso coincide con el filtro."));
  }
  ["#cModulo", "#cBuscar"].forEach((sel) => on(sel, "input", pintarCasos));

  // Enlace del cuaderno de Colab del caso (lo que abre el alumno desde Mi avance).
  function lineaCuaderno(c) {
    const fila = el("div", "nb-line");
    fila.append(el("span", "muted", "Cuaderno: "));
    if (c.cuaderno_url) { const a = el("a", null, "Abrir en Colab"); a.href = c.cuaderno_url; a.target = "_blank"; a.rel = "noopener"; fila.append(a); }
    else fila.append(el("span", null, "sin enlace"));
    if (ADMIN && S.v08) {
      const f = el("form", "nb-form"); f.hidden = true;
      const i = el("input"); i.type = "url"; i.placeholder = "https://colab.research.google.com/drive/…"; i.value = c.cuaderno_url || ""; i.setAttribute("aria-label", `Enlace del cuaderno del caso ${c.id}`);
      const g = el("button", "btn btn-accent btn-sm", "Guardar"); g.type = "submit"; const msg = el("span", "saved"); f.append(i, g, msg);
      f.addEventListener("submit", async (ev) => {
        ev.preventDefault(); g.disabled = true;
        try { await rpc("admin_caso_cuaderno", { p_caso: c.id, p_url: i.value.trim() || null }); toast("Enlace guardado: los alumnos lo ven en Mi avance"); cargar(true); }
        catch (e) { msg.className = "saved err"; msg.textContent = e.message; g.disabled = false; }
      });
      fila.append(" ", boton(c.cuaderno_url ? "Cambiar" : "Agregar enlace", "icon-btn", () => { f.hidden = !f.hidden; if (!f.hidden) i.focus(); }), f);
    }
    return fila;
  }

  // Reto: alta y edición (administración)
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
    const f = $("#formReto"); if (!f) return; $("#campoTol").hidden = f.tipo.value !== "numero";
    const ej = f.tipo.value === "numero" ? "valor" : '"opción"';
    $("#retoCodigo").textContent = `tdd.registrar("${f.reto.value || "reto_tasa"}", "control", {"respuesta": ${ej}})`;
  }
  on("#formReto", "input", actualizarReto);
  on("#formReto", "submit", async (ev) => {
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
    const V = new Set(visibles().map((a) => a.id));
    const lista = S.respuestas.filter((x) => {
      if (!V.has(x.usuario)) return false;
      if (est === "pendientes" && !(x.ultima && !x.modelo)) return false;
      if (est === "calificadas" && !x.modelo) return false;
      if (caso && x.caso !== caso) return false;
      if (pr && x.pregunta !== pr) return false;
      const a = S.porUid.get(x.usuario);
      if (q && ![a.nombre, a.alumno_id, a.grupo].some((v) => String(v || "").toLowerCase().includes(q))) return false;
      return true;
    }).sort((x, y) => (est === "pendientes" ? (x.creado < y.creado ? -1 : 1) : (x.creado < y.creado ? 1 : -1))); // pendientes: la más antigua primero
    const cont = $("#listaRespuestas"); cont.replaceChildren(); UI_RESP.clear();
    lista.slice(0, 80).forEach((x) => cont.append(tarjetaRespuesta(x)));
    if (lista.length > 80) cont.append(el("p", "legend-note", `Mostrando 80 de ${lista.length}. Usa los filtros para ver el resto.`));
    if (!lista.length) cont.append(el("p", "notice", est === "pendientes" ? (S.respuestas.length ? "No hay respuestas por calificar. ¡Al día!" : "Aún no hay respuestas abiertas de tus alumnos.") : "Ninguna respuesta coincide con el filtro."));
  }
  ["#rEstado", "#rCaso", "#rPregunta", "#rBuscar"].forEach((s) => on(s, "input", pintarRespuestas));

  // IA: sugiere nivel y comentario con la rúbrica (Edge Function tdd-docente, acción evaluar_ia). Nunca guarda: tú revisas.
  const UI_RESP = new Map();
  async function sugerirIA(ids, boton_) {
    ids = ids.filter((id) => UI_RESP.has(id)).slice(0, 10); if (!ids.length) { toast("No hay respuestas por calificar a la vista"); return; }
    if (boton_) boton_.disabled = true;
    ids.forEach((id) => UI_RESP.get(id).esperando());
    try {
      const r = await funcion("tdd-docente", { accion: "evaluar_ia", ids });
      (r.resultados || []).forEach((x) => { const ui = UI_RESP.get(x.id); if (ui) x.ok ? ui.aplicar(x) : ui.error(x.error); });
      const ok = (r.resultados || []).filter((x) => x.ok).length;
      toast(ok ? `${plural(ok, "sugerencia lista", "sugerencias listas")}: revísalas y guarda` : "La IA no pudo sugerir; revisa los mensajes");
    } catch (e) { ids.forEach((id) => UI_RESP.get(id) && UI_RESP.get(id).error(errorFuncion(e))); }
    finally { if (boton_) boton_.disabled = false; }
  }
  on("#rIA", "click", (ev) => sugerirIA([...UI_RESP.keys()].filter((id) => { const x = S.respuestas.find((r) => r.id === id); return x && !x.modelo; }), ev.currentTarget));

  function tarjetaRespuesta(x) {
    const a = S.porUid.get(x.usuario), card = el("article", `card resp${x.modelo ? " graded" : ""}${x.ultima ? "" : " old"}`);
    const head = el("div", "resp-head"), w = el("div", "who-cell"), d = el("div");
    d.append(el("b", null, a.nombre), el("small", null, `${a.alumno_id}${a.grupo ? ` · ${a.grupo}` : ""}`)); w.append(avatar(a.nombre), d);
    w.style.cursor = "pointer"; w.addEventListener("click", () => abrirFicha(a.id));
    const meta = el("div", "resp-meta"); meta.append(pill(`Caso ${x.caso}`), pill(relativo(x.creado)));
    if (!x.ultima) meta.append(pill("Versión anterior"));
    if (x.modelo) meta.append(pill(x.modelo === "docente" ? "Calificada" : x.modelo === "docente+ia" ? "Calificada · con IA" : `Evaluada · ${x.modelo}`, "ok"));
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
    let origen = "docente";
    const iaBtn = boton("Sugerir con IA", "btn btn-line btn-sm", () => sugerirIA([x.id], iaBtn));
    const avisar = el("input"); avisar.type = "checkbox"; avisar.checked = true;
    const avisarL = el("label", "check-inline"); avisarL.append(avisar, document.createTextNode(" Avisar al alumno")); avisarL.title = "Le llega como aviso en Mi avance, con tu comentario";
    acc.append(g); if (x.modelo) acc.append(boton("Quitar", "btn btn-line btn-sm", () => guardar(null, "")));
    if (x.ultima) acc.append(iaBtn);
    if (S.v08) acc.append(avisarL);
    acc.append(st);
    const nota = el("p", "ia-note"); nota.hidden = true;
    g.disabled = !S.esquema && !ADMIN;
    f.append(seg, fl, nota, acc); card.append(f);
    UI_RESP.set(x.id, {
      esperando() { nota.hidden = false; nota.className = "ia-note"; nota.textContent = "La IA está leyendo la respuesta y la rúbrica…"; },
      aplicar(r) {
        const radio = $(`input[name="nivel-${x.id}"][value="${r.nivel}"]`, f); if (radio) radio.checked = true;
        ta.value = r.retro; origen = "ia";
        nota.hidden = false; nota.className = "ia-note ok";
        nota.textContent = `Sugerencia de la IA: nivel ${r.nivel}${r.con_rubrica ? " según la rúbrica" : " (sin rúbrica específica)"}. Revísala, ajústala si hace falta y guarda.`;
      },
      error(m) { nota.hidden = false; nota.className = "ia-note err"; nota.textContent = m || "La IA no respondió"; },
    });
    async function guardar(nivel, retro) {
      g.disabled = true; st.className = "saved"; st.textContent = "Guardando…";
      try {
        const args = { p_id: x.id, p_nivel: nivel, p_retro: retro };
        if (S.v08) Object.assign(args, { p_origen: origen, p_avisar: avisar.checked });
        await rpc("docente_calificar_respuesta", args);
        x.nivel = nivel; x.retro = retro.trim() || null; x.modelo = nivel == null && !x.retro ? null : origen === "ia" ? "docente+ia" : "docente";
        nota.hidden = true;
        if (S.v08 && avisar.checked && x.modelo) recargarMensajes();
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

  // ---------- Mensajes (0.8) ----------
  // Cada alumno escribe a sus profesores desde Mi avance; aquí se leen y se responden. Las calificaciones con
  // «Avisar al alumno» también aparecen en su conversación.
  let convSel = null;
  const sinLeer = () => { const v = new Set(visibles().map((a) => a.id)); return S.mensajes.filter((m) => m.de_alumno && !m.leido && v.has(m.alumno)); };
  const temaDe = (caso) => { const c = S.casos.find((x) => x.id === caso); return c ? `Caso ${c.id}${c.modulo != null ? ` · Módulo ${c.modulo}` : ""}` : "General"; };
  function actualizarContadorMensajes() { const c = $("#cntMensajes"); if (c) c.textContent = S.v08 ? (sinLeer().length || "") : ""; }
  function opcionesTema(select) {
    select.replaceChildren(new Option("Tema: general", ""));
    [...new Set(S.casos.map((c) => c.modulo))].forEach((m) => {
      const g = document.createElement("optgroup"); g.label = m != null ? `Módulo ${m}` : "Sin módulo";
      S.casos.filter((c) => c.modulo === m).forEach((c) => g.append(new Option(`Caso ${c.id} · ${c.titulo}`, c.id))); select.append(g);
    });
  }
  function pintarMensajes() {
    const lista = $("#mConvs"), hilo = $("#mHilo"); if (!lista) return;
    if (!S.v08) {
      lista.replaceChildren();
      hilo.replaceChildren(el("p", "notice", ADMIN ? "Los mensajes necesitan el esquema 0.8: corre los pasos 1 a 3 del instalador." : "Los mensajes se activan cuando administración actualice la base."));
      return;
    }
    const q = $("#mBuscar").value.trim().toLowerCase(), todos = $("#mTodos").checked;
    const porAlumno = new Map(); S.mensajes.forEach((m) => { if (!porAlumno.has(m.alumno)) porAlumno.set(m.alumno, []); porAlumno.get(m.alumno).push(m); });
    const convs = visibles().filter((a) => todos || porAlumno.has(a.id) || a.id === convSel).map((a) => {
      const ms = porAlumno.get(a.id) || [];
      return { a, ms, ultimo: ms.length ? ms[ms.length - 1] : null, nuevos: ms.filter((m) => m.de_alumno && !m.leido).length };
    }).filter((c) => !q || [c.a.nombre, c.a.alumno_id, c.a.grupo].some((v) => String(v || "").toLowerCase().includes(q)))
      .sort((x, y) => (y.nuevos > 0) - (x.nuevos > 0) || String(y.ultimo ? y.ultimo.creado : "").localeCompare(String(x.ultimo ? x.ultimo.creado : "")) || x.a.nombre.localeCompare(y.a.nombre));
    lista.replaceChildren();
    convs.forEach((c) => {
      const li = el("li"), b = boton("", `conv${c.a.id === convSel ? " on" : ""}${c.nuevos ? " new" : ""}`, () => abrirConversacion(c.a.id));
      const d = el("div"); d.append(el("b", null, c.a.nombre), el("small", null, c.ultimo ? `${c.ultimo.de_alumno ? "" : `${c.ultimo.autor_nombre}: `}${c.ultimo.texto.slice(0, 80)}` : "Sin mensajes · escríbele"));
      b.append(avatar(c.a.nombre), d); if (c.nuevos) b.append(el("span", "badge", String(c.nuevos)));
      li.append(b); lista.append(li);
    });
    if (!convs.length) lista.append(el("li", "empty", q ? "Nadie coincide." : "Aún no hay mensajes. Marca «Todos» para escribirle a un alumno."));
    pintarHilo();
  }
  function burbuja(m) {
    const li = el("li", `msg ${m.de_alumno ? "in" : "out"}${m.tipo === "feedback" ? " fb" : ""}`), cab = el("div", "msg-meta");
    cab.append(el("b", null, m.de_alumno ? (S.porUid.get(m.alumno) || {}).nombre || "Alumno" : m.autor_nombre),
      el("span", null, ` · ${temaDe(m.caso)}${m.tipo === "feedback" ? " · calificación" : ""} · ${hora(m.creado)}`));
    li.append(cab, el("p", null, m.texto));
    if (!m.de_alumno) li.append(el("small", "muted", m.leido ? "Leído" : "Sin leer"));
    return li;
  }
  function pintarHilo() {
    const hilo = $("#mHilo"); hilo.replaceChildren();
    const a = convSel && S.porUid.get(convSel);
    if (!a) { hilo.append(el("p", "empty", "Elige una conversación. Los mensajes nuevos de tus alumnos aparecen primero.")); return; }
    const head = el("div", "msg-head"), w = el("div", "who-cell"), d = el("div");
    d.append(el("b", null, a.nombre), el("small", null, `${a.alumno_id}${a.grupo ? ` · ${nombreGrupo(a.grupo)}` : ""}`)); w.append(avatar(a.nombre), d);
    head.append(w, boton("Ver ficha", "btn btn-line btn-sm", () => abrirFicha(a.id))); hilo.append(head);
    const ol = el("ol", "msgs"); S.mensajes.filter((m) => m.alumno === a.id).forEach((m) => ol.append(burbuja(m)));
    if (!ol.children.length) ol.append(el("li", "empty", "Sin mensajes todavía."));
    hilo.append(ol);
    const f = el("form", "msg-form"), ta = el("textarea"), sel = el("select");
    ta.maxLength = 2000; ta.rows = 3; ta.required = true; ta.placeholder = `Escribe a ${a.nombre.split(" ")[0]}…`; ta.setAttribute("aria-label", "Mensaje");
    sel.setAttribute("aria-label", "Tema del mensaje"); opcionesTema(sel);
    const conCaso = S.mensajes.filter((m) => m.alumno === a.id && m.caso).pop(); if (conCaso) sel.value = conCaso.caso;
    const env = el("button", "btn btn-accent btn-sm", "Enviar"); env.type = "submit"; const st = el("span", "saved"); st.setAttribute("role", "status");
    const pie = el("div", "msg-actions"); pie.append(sel, env, st); f.append(ta, pie);
    f.addEventListener("submit", async (ev) => {
      ev.preventDefault(); env.disabled = true; st.className = "saved"; st.textContent = "Enviando…";
      try { await rpc("docente_enviar_mensaje", { p_alumno: a.id, p_texto: ta.value, p_caso: sel.value || null }); toast("Enviado: lo verá como aviso en Mi avance"); await recargarMensajes(); }
      catch (e) { st.className = "saved err"; st.textContent = e.message; env.disabled = false; }
    });
    hilo.append(f);
    ol.scrollTop = ol.scrollHeight;
  }
  async function abrirConversacion(uid) {
    convSel = uid; pintarMensajes();
    const nuevos = S.mensajes.filter((m) => m.alumno === uid && m.de_alumno && !m.leido);
    if (!nuevos.length) return;
    try { await rpc("marcar_mensajes_leidos", { p_alumno: uid }); const t = new Date().toISOString(); nuevos.forEach((m) => { m.leido = t; }); actualizarContadorMensajes(); pintarMensajes(); }
    catch (_) { /* se reintenta al volver a abrir */ }
  }
  async function recargarMensajes() {
    try { S.mensajes = (await todo(MSG_URL)).filter((m) => S.porUid.has(m.alumno)); } catch (_) { return; }
    actualizarContadorMensajes(); pintarMensajes();
  }
  function escribirA(uid) { convSel = uid; $("#mTodos").checked = false; irA("mensajes"); pintarMensajes(); const t = $("#mHilo textarea"); if (t) t.focus(); }
  ["#mBuscar", "#mTodos"].forEach((sel) => on(sel, "input", pintarMensajes));

  // ---------- Datos ----------
  function pintarDatos() {
    const ul = $("#estadoSistema");
    if (ul) {
      ul.replaceChildren();
      const check = (ok, texto, nota) => { const li = el("li", ok ? "" : "bad"); const d = el("div"); d.append(document.createTextNode(texto)); if (nota) d.append(el("small", null, nota)); li.append(el("b", null, ok ? "✓" : "!"), d); ul.append(li); };
      check(true, `Sesión de administración: ${S.usuario.email}`);
      const inst = S.bitacora.find((b) => b.accion === "instalacion");
      check(S.esquema && S.v08 && S.v10 && S.v11, S.v11 ? "Esquema 0.11: niveles de pago protegidos, clases en vivo, mensajes y retos activos" : S.v10 ? "Falta el esquema 0.11: los niveles 3+ no abren para nadie" : S.v08 ? "Falta el esquema 0.10 para clases en vivo y alias de ciudad" : S.esquema ? "Esquema 0.7: falta 0.8 para mensajes y avisos" : "Esquema anterior a 0.7", inst ? `Última instalación ${relativo(inst.creado)} · ${inst.detalle || ""}` : "Instalador, pasos 1 a 3");
      if (S.v10) { const fut = S.clases.filter((k) => finClase(k) > new Date()), sinGrab = S.clases.filter((k) => finClase(k) < new Date() && !k.grabacion_url);
        check(S.clases.length > 0 && !sinGrab.length, S.clases.length ? `${plural(S.clases.length, "clase", "clases")} · ${fut.length} por venir` : "Sin calendario de clases", S.clases.length ? (sinGrab.length ? `${plural(sinGrab.length, "clase pasada sin grabación", "clases pasadas sin grabación")}: pégala en la pestaña Clases` : "Todas las clases pasadas tienen grabación") : "Pestaña Clases → Generar calendario"); }
      const fnNueva = S.fn && S.fn.ok && S.fn.version === "0.9.0", fnIA = S.fn && S.fn.ok && ["0.8.0", "0.9.0"].includes(S.fn.version);
      check(fnNueva, S.fn && S.fn.ok ? `Función tdd-docente desplegada (${S.fn.version || "?"})` : "Función tdd-docente no disponible", S.fn && S.fn.ok ? (fnNueva ? "Altas, claves nuevas, sugerencias de IA y accesos de Studio activos" : "Vuelve a desplegarla con el código 0.9 para los accesos de Augmented Studio") : S.fn && S.fn.error);
      if (S.v11) { const vig = S.studio.filter((x) => x.vigente).length; check(true, `Niveles 3+ protegidos · ${plural(vig, "suscripción de Studio vigente", "suscripciones de Studio vigentes")}`, "Alumnos inscritos: hasta 12 meses después del fin de su grupo"); }
      if (fnIA) check(!!S.fn.ia, S.fn.ia ? `IA para sugerir calificaciones: ${S.fn.ia === "openai" ? "OpenAI" : "Anthropic"}` : "IA para sugerir calificaciones sin configurar", S.fn.ia ? "Solo recibe la pregunta, la rúbrica y el texto de la respuesta" : "Agrega OPENAI_API_KEY en Edge Functions → Secrets");
      const respaldo = S.bitacora.find((b) => b.accion === "respaldo");
      check(respaldo && Date.now() - new Date(respaldo.creado) < 7 * DIA, respaldo ? `Último respaldo ${relativo(respaldo.creado)}` : "Sin respaldo registrado", "Paso 10 del instalador, cada semana");
      $("#ultimoRespaldo").textContent = respaldo ? `Último respaldo completo: ${fecha(respaldo.creado)}` : "";
      const casosConRetos = new Set(S.retos.map((x) => x.caso)).size;
      check(S.retos.length > 0, S.retos.length ? `${S.retos.length} retos en ${plural(casosConRetos, "caso", "casos")}` : "Sin retos calificados", S.retos.length ? "" : "Sin retos, los bits solo vienen de participación y respuestas");
    }
    const inv = $("#invitados");
    if (inv) {
      inv.replaceChildren();
      const porMotivo = new Map();
      S.invitados.forEach((r) => { const m = porMotivo.get(r.motivo) || { sesiones: 0, completaron: 0, ultimo: null }; m.sesiones += Number(r.sesiones) || 0; m.completaron += Number(r.completaron) || 0; if (!m.ultimo || r.ultimo_evento > m.ultimo) m.ultimo = r.ultimo_evento; porMotivo.set(r.motivo, m); });
      if (porMotivo.size) {
        const totalSes = [...porMotivo.values()].reduce((s, m) => s + m.sesiones, 0);
        inv.append(hbars([...porMotivo].sort((x, y) => y[1].sesiones - x[1].sesiones).map(([k, m]) => ({ label: MOTIVOS[k] || k, n: m.sesiones, cls: ["clave_incorrecta", "sin_secretos", "sin_permiso"].includes(k) ? "drop" : "alt", title: `${m.sesiones} ejecuciones · ${m.completaron} completaron · última ${m.ultimo ? relativo(m.ultimo) : "—"}` })), totalSes, { fmt: (k) => String(k) }));
        const malConfig = ["clave_incorrecta", "sin_secretos", "sin_permiso", "secreto_vacio"].reduce((s, k) => s + ((porMotivo.get(k) || {}).sesiones || 0), 0);
        inv.append(el("p", "legend-note", malConfig ? `${malConfig} ejecuciones parecen de alumnos con secretos mal configurados: su avance no se guarda a su nombre. Revisa la columna «Último acceso» en Alumnos.` : "Son ejecuciones anónimas (sin nombre ni correo)."));
      } else inv.append(el("p", "empty", "Sin ejecuciones en modo invitado."));
    }
    const t = $("#bitacora");
    if (t) {
      t.replaceChildren(); const hr = el("tr");
      ["Fecha", "Acción", "Detalle", "Filas"].forEach((h) => hr.append(el("th", null, h)));
      const th = el("thead"); th.append(hr); t.append(th); const tb = el("tbody");
      S.bitacora.slice(0, 60).forEach((b) => {
        const tr = el("tr"), ac = el("td"); ac.append(pill(ACCIONES[b.accion] || b.accion, /^(docente|admin)_/.test(b.accion) ? "ok" : b.accion === "borrado" || b.accion === "vaciado" ? "crit" : ""));
        const det = el("td", null, b.detalle || b.tabla || ""); det.style.whiteSpace = "normal";
        tr.append(el("td", null, fecha(b.creado)), ac, det, el("td", "r", b.filas != null ? String(b.filas) : "")); tb.append(tr);
      });
      if (!S.bitacora.length) { const tr = el("tr"), td = el("td", null, "Sin movimientos."); td.colSpan = 4; tr.append(td); tb.append(tr); }
      t.append(tb);
    }
  }

  // CSV para calificar (mismo formato que el paso 8 del instalador; la fecha es la del grupo de cada alumno)
  on("#csvDescargar", "click", () => {
    const c = S.casos.find((x) => x.id === $("#csvCaso").value); if (!c) return;
    const tot = total(c) || 1, f16 = (iso) => (iso ? new Date(iso).toLocaleString("sv-SE", { timeZone: TZ }).slice(0, 16) : "");
    const filas = [...visibles()].sort((x, y) => `${x.grupo || "~"}|${x.alumno_id}`.localeCompare(`${y.grupo || "~"}|${y.alumno_id}`)).map((a) => {
      const v = a.avance.get(c.id) || {}, vistas = Math.min(Number(v.secciones_vistas) || 0, tot), [, , estado] = estadoEntrega(a, c);
      const resp = a.respuestas.filter((x) => x.caso === c.id).length;
      return [a.alumno_id, a.nombre, a.grupo || "", a.correo || "", vistas, tot, Math.round((100 * vistas) / tot), v.completo ? "sí" : "no", v.completo ? f16(v.entregado) : "", resp,
        v.completo ? estado : "sin entregar", f16(limite(a, c))];
    });
    const cab = ["id", "nombre", "grupo", "correo", "secciones_vistas", "secciones_totales", "porcentaje_avance", "completo", "entregado", "respuestas", "estado_entrega", "fecha_limite"];
    descargar(`avance_caso_${c.id.replace(/\./g, "_")}${S.grupoSel && S.grupoSel !== "__sin__" ? `_${S.grupoSel}` : ""}_${marca()}.csv`, csv([cab, ...filas]), "text/csv;charset=utf-8");
  });

  on("#jsonDescargar", "click", () => {
    const limpio = S.alumnos.map(({ avance, vistas, hipotesis, eventos, respuestas, ultimoEvento, ...a }) => a);
    const datos = { generado: new Date().toISOString(), por: S.usuario.email, grupos: S.grupos, docentes: S.docentes, entregas_grupo: [...S.entregas].map(([k, limite_]) => ({ grupo: k.split("|")[0], caso: k.split("|")[1], limite: limite_ })),
      perfiles: limpio, casos: S.casos, retos: S.retos, eventos: S.eventos, respuestas: S.respuestas.map(({ ultima, ...x }) => x), material_docente: S.material, bitacora: S.bitacora, invitados: S.invitados };
    descargar(`copia_panel_${marca()}.json`, JSON.stringify(datos, null, 2), "application/json");
  });

  // ---------- Arranque ----------
  on("#entrar", "click", TDD.entrar);
  on("#salir", "click", () => salir("local"));
  on("#salirTodo", "click", () => salir("global"));
  on("#recargar", "click", async () => { const b = $("#recargar"); b.disabled = true; try { await cargar(true); toast("Actualizado"); } catch (e) { toast(e.message); } finally { b.disabled = false; } });
  const tabGuardada = leerLocal(LLAVE_TAB); if (TABS.includes(tabGuardada)) irA(tabGuardada);

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
    if (document.visibilityState !== "visible" || $("#panel").hidden || $$("dialog[open]").length) return;
    if (pestana() === "mensajes" && S.v08 && !($("#mHilo textarea") || {}).value) { recargarMensajes(); return; }
    if (pestana() !== "resumen") return;
    cargar(true).catch(() => {});
  }, 120000);
})();
