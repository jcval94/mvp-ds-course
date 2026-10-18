// Sesión compartida del sitio (Mi avance y Panel docente): Supabase Auth con Google (flujo implícito) y llamadas con fetch.
// La sesión vive en localStorage del mismo origen, así que entrar en una página sirve para la otra.
// Sin librerías externas. La seguridad la pone la base (RLS y funciones que comprueban es_docente()), no esta página.
(function () {
  // Proyecto Supabase "Continuum". La clave publicable es pública por diseño (equivale a la clave anon).
  let URL_BASE = "https://tvxhocccdetkukonhhnh.supabase.co";
  let KEY = "sb_publishable_onOiYrRQNSdZ7xdenhsLSw_HPavGYC8";
  // Solo en local (pruebas): permite apuntar a un Supabase falso. En el sitio publicado no hace nada.
  if (/^(127\.0\.0\.1|localhost)$/.test(location.hostname)) {
    try { const o = JSON.parse(localStorage.getItem("tdd-local") || "null"); if (o && o.url) { URL_BASE = o.url; KEY = o.key || KEY; } } catch (_) {}
  }
  const STORE = "tdd-sesion";
  const PAGINA = 1000; // Supabase devuelve como máximo 1000 filas por consulta: se pide por páginas.

  const leer = () => { try { return JSON.parse(localStorage.getItem(STORE) || "null"); } catch (_) { return null; } };
  // Copia del token en una cookie solo para /labs: Cloudflare la lee para entregar (o no) los niveles de pago.
  // Vence junto con el token; la base valida la firma en cada consulta, así que copiarla no da acceso a nadie más.
  function galleta(s) {
    const seg = s ? Math.floor((s.expires_at - Date.now()) / 1000) : 0;
    const extra = `; Path=/labs; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    try { document.cookie = seg > 30 ? `tdd_acceso=${encodeURIComponent(s.access_token)}; Max-Age=${seg}${extra}` : `tdd_acceso=; Max-Age=0${extra}`; } catch (_) {}
  }
  const guardar = (s) => { try { s ? localStorage.setItem(STORE, JSON.stringify(s)) : localStorage.removeItem(STORE); } catch (_) {} galleta(s); };
  let sesion = null, renovando = null;

  function tomarRetorno() {
    // Supabase regresa con #access_token=… (o ?error=… / #error=…).
    const h = new URLSearchParams(location.hash.slice(1));
    const q = new URLSearchParams(location.search);
    const limpiar = () => history.replaceState(null, "", location.pathname);
    const error = h.get("error_description") || q.get("error_description") || h.get("error") || q.get("error");
    if (error) { limpiar(); return { error }; }
    if (h.get("access_token")) {
      guardar({ access_token: h.get("access_token"), refresh_token: h.get("refresh_token"), expires_at: Date.now() + Number(h.get("expires_in") || 3600) * 1000 });
      limpiar();
    }
    return {};
  }

  // Una sola renovación a la vez; si otra pestaña ya renovó, se usa su sesión (reusar un token de renovación revoca la sesión).
  function refrescar() {
    if (renovando) return renovando;
    renovando = (async () => {
      const otra = leer();
      if (otra && sesion && otra.access_token !== sesion.access_token && otra.expires_at - Date.now() > 60000) { sesion = otra; return sesion; }
      const r = await fetch(`${URL_BASE}/auth/v1/token?grant_type=refresh_token`, {
        method: "POST", headers: { apikey: KEY, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: sesion.refresh_token }),
      });
      if (!r.ok) throw new Error("sesion");
      const d = await r.json();
      sesion = { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: Date.now() + (d.expires_in || 3600) * 1000 };
      guardar(sesion); return sesion;
    })().finally(() => { renovando = null; });
    return renovando;
  }

  function errorDe(r, d, ruta) {
    const texto = (d && (d.message || d.error_description || d.error || d.msg)) || `HTTP ${r.status} en ${String(ruta).split("?")[0]}`;
    const e = new Error(texto); e.status = r.status; e.code = d && d.code; return e;
  }

  async function llamar(url, opciones, ruta, reintento) {
    if (!sesion) { const e = new Error("sesion"); e.status = 401; throw e; }
    if (sesion.expires_at - Date.now() < 60000) await refrescar();
    const r = await fetch(url, { ...opciones, headers: { apikey: KEY, Authorization: `Bearer ${sesion.access_token}`, "Content-Type": "application/json", ...(opciones.headers || {}) } });
    if (r.status === 401 && reintento) { await refrescar(); return llamar(url, opciones, ruta, false); }
    const texto = r.status === 204 ? "" : await r.text();
    let d = null; try { d = texto ? JSON.parse(texto) : null; } catch (_) { d = null; }
    if (!r.ok) throw errorDe(r, d, ruta);
    return d;
  }

  const api = (ruta, opciones = {}) => llamar(`${URL_BASE}${ruta}`, opciones, ruta, true);
  const rpc = (nombre, args = {}) => api(`/rest/v1/rpc/${nombre}`, { method: "POST", body: JSON.stringify(args) });
  // Todas las filas de una consulta GET, página por página.
  async function todo(ruta) {
    const filas = [], sep = ruta.includes("?") ? "&" : "?";
    for (let n = 0; n < 200; n++) {
      const pagina = await api(`${ruta}${sep}limit=${PAGINA}&offset=${n * PAGINA}`);
      filas.push(...(pagina || []));
      if (!pagina || pagina.length < PAGINA) break;
    }
    return filas;
  }
  // Edge Functions de Supabase (por ejemplo tdd-docente).
  const funcion = (nombre, cuerpo) => llamar(`${URL_BASE}/functions/v1/${nombre}`, { method: "POST", body: JSON.stringify(cuerpo || {}) }, `función ${nombre}`, true);

  function entrar() {
    const vuelta = location.origin + location.pathname;
    location.href = `${URL_BASE}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(vuelta)}`;
  }
  // scope "local": solo este navegador; "global": todas las sesiones de la cuenta.
  async function cerrar(scope = "local") {
    try { if (sesion) await fetch(`${URL_BASE}/auth/v1/logout?scope=${scope}`, { method: "POST", headers: { apikey: KEY, Authorization: `Bearer ${sesion.access_token}` } }); } catch (_) {}
    sesion = null; guardar(null);
  }

  window.TDD = {
    activo: !!KEY,
    tomarRetorno, entrar, cerrar, api, rpc, todo, funcion,
    iniciar() { sesion = KEY ? leer() : null; galleta(sesion); return !!sesion; },
    olvidar() { sesion = null; guardar(null); },
  };
})();
