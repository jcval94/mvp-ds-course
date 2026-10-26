# Arquitectura del curso · v2.1

Estado: vigente desde F0 (2026-10-05). Reemplaza al plan de 8 repos.

## Repos

| Repo | Rol |
| --- | --- |
| `mvp-ds-course` (este) | Monorepo del curso: fábrica, contenido, engine del portal, harness y CI |
| `DataCollectionMov` | Robot de datos CDMX, separado. El curso solo referencia sus Releases |
| `narrative`, `tacos-don-juan-remotion` | Importados aquí con historial. Se archivan solo tras paridad en producción |

## Mapa del monorepo

```text
course.yaml          Manifiesto global: componentes, acceso, presupuestos, lista de misiones
schemas/             JSON Schemas: course, mission, case
missions/<id>/       mission.yaml por misión (contenido)
casos/               Banco de casos: cases.jsonl, staging/, data/ (contenido)
kits/                Notebooks de Colab (contenido)
capsulas/            Cápsulas de oficina (contenido + su propio generador)
design/              Tokens visuales y capa 8 bits (engine)
portal/              Plantillas nuevas del portal: misiones, 404 (engine)
site/                Portal actual de la fábrica (engine, sin cambios)
harness/             Validación, build de dist/, checks y smoke tests (engine)
studio/              Proyecto Remotion; render local, sin MP4 en Git
docs/ scripts/ generated/ datasets/ evals/ templates/ .agents/   Fábrica existente, intacta
.github/workflows/   ci.yml + reusable workflows por dominio + capas de deployment
```

## Engine público y contenido

Desde F0 la frontera es explícita. El inicio de sesión y la puerta de los niveles de pago
(ver [DEPLOYMENT.md](DEPLOYMENT.md)) no cambian esta separación:

| Engine (público siempre) | Contenido (puede volverse premium) |
| --- | --- |
| `harness/`, `schemas/`, `design/`, `portal/`, `site/`, `scripts/`, `.github/` | `missions/`, `casos/`, `kits/`, `capsulas/`, `generated/` |

- Cada misión y cada caso declaran `access: public | premium`.
- `course.yaml → access.public_build_includes` define qué entra al build público
  (hoy solo `public`). Una misión `premium` nunca llega a `dist/` aunque esté
  publicada; lo verifica `harness/tests`.
- El engine no contiene contenido ni asume dónde vivirá el contenido premium.
  Cuando exista, bastará con otro build (privado) que incluya `premium` y otro
  destino de deployment, sin tocar el engine.

## Flujo de build

```text
python -m harness validate   schemas + referencias + tokens + higiene del repo
python -m harness build      scripts/build_pages.py (sin cambios) → _site/
                             _site/ + portal/ + design/tokens + capsulas → dist/
                             + missions.json + build-info.json
python -m harness check      enlaces internos, SEO técnico, portabilidad, presupuestos
python -m harness smoke      Playwright en "/" y en "/mvp-ds-course/"
python -m harness links      auditoría externa HEAD/GET (independiente de all y CI)
```

`dist/` es estático, reproducible (mismo commit → mismo `content_sha256`) y
agnóstico del hosting: enlaces y recursos con rutas relativas; la única URL base
(`course.yaml → build.base_url`) aparece exclusivamente en canonical y sitemap
(ver [SEO.md](SEO.md)). Sin `.nojekyll`, `CNAME`,
`_headers` ni `_redirects`, con `404.html` propio en la raíz.

## CI

`ci.yml` llama a `factory.yml`, `capsulas.yml` y `portal.yml`; si todo pasa y la
rama es `main`, llama a la capa de deployment. Ver [DEPLOYMENT.md](DEPLOYMENT.md).

`external-links.yml` revisa semanalmente los enlaces externos y mantiene un
issue único; no participa en CI ni deployment. Ver [EXTERNAL_LINKS.md](EXTERNAL_LINKS.md).

## Reglas que no cambian

- Los agentes proponen; el harness y la CI deciden qué se publica.
- Nada de MP4, datos pesados ni artefactos regenerables en Git.
- `generated/` sigue versionado: es contenido aprobado y sus generadores ya no lo
  reproducen byte a byte (ver deuda en F0_CONSOLIDACION.md).
