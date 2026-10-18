# Deployment

El portal se construye una sola vez como `dist/` y la capa de deployment solo lo
sube. Ningún archivo del portal ni del contenido conoce al proveedor.

## Sitio oficial: Cloudflare Pages

- URL: `https://learninglabs.pages.dev/` (raíz).
- Job `deploy-cloudflare` de `.github/workflows/ci.yml` → `deploy-cloudflare-pages.yml`
  con `project-name: learninglabs`.
- Publica el mismo artefacto `dist` que GitHub Pages. Si el proyecto no existe, lo crea
  con `--production-branch=main`; después verifica que
  `https://learninglabs.pages.dev/build-info.json` sirva el commit desplegado. Si
  Cloudflare asignó otro subdominio (nombre ocupado), el job falla.
- Secrets de GitHub (*Settings → Secrets and variables → Actions*):
  - `CLOUDFLARE_API_TOKEN`: token de cuenta con permiso *Account · Cloudflare Pages · Edit*.
  - `CLOUDFLARE_ACCOUNT_ID`: ID de la cuenta.
  Sin ellos el job emite un aviso y termina sin fallar, así que `main` no se pone en rojo.

## Niveles de pago: Pages Function (desde el 17 oct 2026)

- `deploy/cloudflare/functions/labs/_middleware.js` corre antes de entregar cualquier archivo
  bajo `/labs/`. Los niveles 1 y 2 pasan directo (igual que `FREE_LEVELS` en `site/app.js`).
- Para los niveles 3+ lee la cookie `tdd_acceso` (el token de Supabase que `site/sesion.js`
  copia con `Path=/labs` y vence con el token) y llama a `tengo_acceso_pago()` con ese token.
  La base valida la firma y decide: administración, docentes activos, alumnos inscritos (hasta
  12 meses después del fin de su grupo) y suscriptores vigentes de Augmented Studio
  (`accesos_studio`, se dan de alta en admin.html → Studio). El resultado se guarda 5 minutos.
- Sin cookie, con token vencido, sin plan o si la base no responde: 302 a `/acceso?volver=…`.
  `site/acceso.html` renueva la sesión, pone la cookie y regresa al nivel (solo rutas
  `/labs/level-N…`), o explica cómo inscribirse.
- El workflow copia `deploy/cloudflare/functions` a `functions/` junto a `dist/` antes de
  `wrangler pages deploy` y al final comprueba que `/labs/level-3/` sin sesión responda 302.
- Prueba local de punta a punta: `python pruebas/prueba_puerta.py` en el backend
  (`wrangler pages dev` + Supabase falso + Chromium).
- Límite conocido: el repositorio es público, así que el código fuente de los niveles sigue
  visible en GitHub. La puerta protege el sitio, no el repositorio.

## GitHub Pages: solo redirección (desde el 17 oct 2026)

- Job `deploy` → `deploy-github-pages.yml`, URL `https://jcval94.github.io/mvp-ds-course/`.
- Ya no publica el portal. `scripts/redireccion_pages.py` toma la lista de páginas de
  `dist/` y genera, fuera de `dist/`, una página por ruta que lleva a la misma ruta en
  `learninglabs.pages.dev` conservando `?consulta` y `#ancla` (con `noindex` y `canonical`).
  Cualquier otra ruta cae en `404.html`, que redirige quitando el prefijo `/mvp-ds-course`.
- Para volver a publicar el portal en GitHub Pages: en el workflow, sube `dist` en lugar
  de `redirect`.

## Login (cuando se conecte Supabase)

- Supabase → *Auth → URL Configuration*: `Site URL = https://learninglabs.pages.dev`
  y `https://learninglabs.pages.dev/**` en *Redirect URLs*.
- Google Cloud → pantalla de consentimiento de OAuth: página de inicio y aviso de
  privacidad bajo `learninglabs.pages.dev`.
- `dist/` sigue sin URLs absolutas del hosting (`harness check` lo exige); la URL del
  sitio vive en la configuración de Supabase y Google, no en el contenido.

## Dominio propio (futuro)

Se conecta como *custom domain* del mismo proyecto de Pages. `learninglabs.pages.dev`
sigue respondiendo y puede redirigir al dominio nuevo. Hay que actualizar Supabase y
Google, no el contenido.

## Por qué funciona en ambos

| Diferencia entre hostings | Cómo la absorbe `dist/` |
| --- | --- |
| GitHub sirve bajo `/mvp-ds-course/`; Cloudflare en `/` | Solo rutas relativas; el smoke test prueba ambas |
| Cloudflare sin `404.html` trata el sitio como SPA | `dist/404.html` siempre existe |
| Cloudflare quita `.html` de las URLs (redirección) | Los enlaces relativos resuelven igual desde `/x` y `/x.html` |
| Límites: 1 GB (GitHub), 20,000 archivos y 25 MiB por archivo (Cloudflare) | Presupuestos en `course.yaml`: 800 MB, 15,000 archivos, 20 MB |
| Archivos de configuración propios (`.nojekyll`, `_headers`, `_redirects`) | Prohibidos en `dist/`; si hacen falta, los agrega el workflow de deployment |

## Volver atrás

El deployment es un artefacto inmutable por commit. Revertir el commit en `main`
vuelve a desplegar la versión anterior.
