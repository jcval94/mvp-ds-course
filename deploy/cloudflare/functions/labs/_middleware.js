// Cloudflare Pages Function: puerta de los niveles de pago (niveles 3 en adelante).
// Corre antes de entregar cualquier archivo bajo /labs/. Los niveles gratis (1 y 2) pasan directo.
// Para los demás lee la cookie tdd_acceso (el token de Supabase que pone sesion.js) y le pregunta a la base
// con ese mismo token: tengo_acceso_pago() valida la firma y decide (administración, docentes, alumnos
// inscritos y suscriptores de Augmented Studio). Sin acceso, o si no se puede comprobar, manda a /acceso.
// Capa de deployment: el workflow la copia junto a dist/ al desplegar; nunca vive en dist/.

const SUPABASE = "https://tvxhocccdetkukonhhnh.supabase.co";
// Clave publicable: pública por diseño (la misma que usa el sitio).
const PUBLICA = "sb_publishable_onOiYrRQNSdZ7xdenhsLSw_HPavGYC8";
// Igual que FREE_LEVELS en site/app.js.
const GRATIS = new Set([1, 2]);
const VIGENCIA_MS = 5 * 60 * 1000;
const MAX_CACHE = 500;
const cache = new Map(); // token → { acceso, motivo, vence }

function leerCookie(cabecera, nombre) {
  for (const parte of (cabecera || "").split(";")) {
    const i = parte.indexOf("=");
    if (i > 0 && parte.slice(0, i).trim() === nombre) {
      try { return decodeURIComponent(parte.slice(i + 1).trim()); } catch (_) { return null; }
    }
  }
  return null;
}

function aLaPuerta(url, motivo) {
  const destino = `${url.origin}/acceso?volver=${encodeURIComponent(url.pathname + url.search)}&motivo=${motivo}`;
  return new Response(null, { status: 302, headers: { Location: destino, "Cache-Control": "no-store" } });
}

async function consultar(token, env) {
  const guardado = cache.get(token);
  if (guardado && guardado.vence > Date.now()) return guardado;
  const base = (env && env.TDD_SUPABASE_URL) || SUPABASE;
  const clave = (env && env.TDD_SUPABASE_PUBLICA) || PUBLICA;
  let r;
  try {
    r = await fetch(`${base}/rest/v1/rpc/tengo_acceso_pago`, {
      method: "POST",
      headers: { apikey: clave, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: "{}",
    });
  } catch (_) {
    return { acceso: false, motivo: "error" };
  }
  // Token vencido o inválido: la página de acceso renueva la sesión y regresa.
  if (r.status === 401 || r.status === 403) return { acceso: false, motivo: "sesion" };
  if (!r.ok) return { acceso: false, motivo: "error" };
  let d = null;
  try { d = await r.json(); } catch (_) { d = null; }
  const res = { acceso: !!(d && d.acceso === true), motivo: (d && d.motivo) || "sin_plan", vence: Date.now() + VIGENCIA_MS };
  if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value);
  cache.set(token, res);
  return res;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const m = url.pathname.match(/^\/labs\/level-(\d+)(?:[-/]|$)/);
  if (!m || GRATIS.has(Number(m[1]))) return context.next();

  const token = leerCookie(context.request.headers.get("Cookie"), "tdd_acceso");
  if (!token) return aLaPuerta(url, "sin_sesion");
  const r = await consultar(token, context.env);
  if (!r.acceso) return aLaPuerta(url, r.motivo);

  const res = await context.next();
  const salida = new Response(res.body, res);
  salida.headers.set("Cache-Control", "private, no-store");
  salida.headers.set("X-Robots-Tag", "noindex");
  return salida;
}
