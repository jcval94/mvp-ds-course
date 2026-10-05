# Deployment

El portal se construye una sola vez como `dist/` y la capa de deployment solo lo
sube. Ningún archivo del portal ni del contenido conoce al proveedor.

## Activo hoy: GitHub Pages

- Job `deploy` de `.github/workflows/ci.yml` → `deploy-github-pages.yml`.
- Publica el artefacto `dist` producido y probado por `portal.yml`.
- Requisito en GitHub: *Settings → Pages → Source: GitHub Actions* (ya configurado
  por el workflow anterior).
- URL: `https://jcval94.github.io/mvp-ds-course/` (subruta; por eso todo es relativo).

## Migrar a Cloudflare Pages

1. En Cloudflare, crea un proyecto de Pages con *Direct Upload* (por ejemplo
   `curso-ciencia-datos`).
2. En GitHub, agrega los secrets `CLOUDFLARE_API_TOKEN` (permiso *Cloudflare
   Pages: Edit*) y `CLOUDFLARE_ACCOUNT_ID`.
3. En `ci.yml`, cambia el job `deploy` por el bloque comentado que usa
   `deploy-cloudflare-pages.yml`.

No cambia nada más: ni `harness/`, ni `portal/`, ni `site/`, ni el contenido.

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
