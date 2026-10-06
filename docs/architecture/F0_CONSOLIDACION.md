# F0 · Consolidar — reporte

Fecha: 2026-10-05 · Rama: `f0-consolidar` (base: `main` @ `be1617d`) · Arquitectura: [ARCHITECTURE.md](ARCHITECTURE.md)

## 1. Auditoría

| Área | Hallazgo | Consecuencia |
| --- | --- | --- |
| Repo | 46 commits, pack de 18 MiB, mayor blob 1.3 MB (PNG aprobado). Historial sano | Sin saneamiento |
| Workflow | Un solo `pages.yml`: valida, construye `_site/`, `qa_pages`, `qa_student_experience` y despliega | Se modulariza sin perder pasos (corrección: la primera versión omitía `qa_student_experience`; ver §6.1) |
| Pages | Deploy por artefacto (sin Jekyll). Sin rutas absolutas ni dominios propios en el sitio | `dist/` puede ser agnóstico sin tocar la fábrica |
| `generated/` | 452 archivos, 8.4 MB. Al correr `generate_level2..13.py` cambian 42 archivos | No es regenerable byte a byte: es contenido aprobado y sigue en Git |
| `datasets/` | 832 KB, con registro, licencias y hashes | Sin cambios |
| `output/playwright/` | 38 capturas versionadas que `qa_pages.py` reescribe en cada corrida | Se conservan (la documentación las cita); deuda abajo |
| Skills / evals | 12 skills en `.agents/skills`, 11 checklists en `evals/` | Intactos |
| Dependencias | Fábrica: biblioteca estándar + Playwright (sin versión fijada) | Versiones fijadas en `harness/requirements.txt` |
| Línea base | `validate_content` ✔ · `test_vertical_slices` 7/7 ✔ · `qa_pages` ✔ (3 min 22 s) · `qa_student_experience` ✘ (falla en `main` y **sí está en CI**: por eso Pages no despliega desde `0acb694`, 2026-09-06) | Paridad medida contra esta base |
| `narrative` | `main` local = GitHub `904d027`. 15 commits, pack 1.1 MiB, mayor blob 271 KB. `docs/` se regenera idéntico; 19 pruebas ✔ | Importado completo; `docs/` deja de versionarse |
| `tacos-don-juan-remotion` | Sin remoto. 1 commit con el andamio; el trabajo real (Composition, lockfile) estaba sin versionar. MP4 (860 KB) y PNG sin versionar | Commit de snapshot sin MP4/PNG/node_modules y luego importado |
| Estado local | En tu laptop, `mvp-ds-course` está en la rama `codex/add-home-navigation` (sin fusionar) y existe `backup/autostash-2026-07-07` solo local | La entrega no toca tu árbol de trabajo |

## 2. Cambios

1. `.gitignore`: `dist/`, sitio generado de cápsulas, `node_modules`/`out` del estudio y medios pesados.
2. `course.yaml` (manifiesto global), `schemas/` (course, mission, case), `missions/m01-wald/mission.yaml` (draft), `casos/` con el candidato `wald-bombers`, `design/` (tokens), `kits/`, `portal/` (misiones y 404), `AGENTS.md` por carpeta.
3. `git subtree` de `narrative` → `capsulas/` y de `tacos-don-juan-remotion` → `studio/`, con historial.
4. `harness/`: `validate`, `build`, `check`, `smoke`, `all` + 11 pruebas.
5. CI: `ci.yml` + `factory.yml`, `capsulas.yml`, `portal.yml`, `deploy-github-pages.yml` (activo) y `deploy-cloudflare-pages.yml` (listo). Se elimina `pages.yml`.
6. Documentación: `ARCHITECTURE.md`, `DEPLOYMENT.md`, este reporte y secciones nuevas en `README.md`, `AGENTS.md` y `CLAUDE.md`.

Ningún archivo de `scripts/`, `generated/`, `site/`, `datasets/`, `evals/`, `templates/`, `examples/`, `reference/` ni `.agents/` cambió.

## 3. Pruebas y resultados

Ejecutadas en un clon limpio de la rama con Python 3.12 (como la CI) y repetidas con Python 3.13.

| Prueba | Resultado |
| --- | --- |
| `scripts/validate_content.py` | ✔ 236 conceptos, 454 ejercicios, 708 prompts, 4 datasets |
| `scripts/test_vertical_slices.py` | ✔ 7/7 |
| `scripts/qa_pages.py` | ✔ portal, 13 niveles, 197 escenas, 394 ejercicios, móvil y consola |
| Cápsulas: `pytest` + 3 validadores | ✔ 19/19 · PASS · PASS · PASS |
| `harness validate` | ✔ 18.6 MB versionados; mayor archivo 1.26 MB |
| `harness/tests` | ✔ 11/11 (incluye casos negativos) |
| `harness build` | ✔ `dist/` con 607 archivos, 8.88 MB |
| Paridad fábrica | ✔ los 510 archivos de `_site/` están en `dist/` byte a byte (solo se omite `.nojekyll`) |
| Paridad cápsulas | ✔ `dist/capsulas/` idéntico al sitio publicado de `narrative` (solo se omite `.nojekyll`) |
| Reproducibilidad | ✔ mismo `content_sha256` (`306db7b3…`) en clon limpio/3.12 y árbol de trabajo/3.13 |
| `harness check` | ✔ 1,076 enlaces internos en 169 páginas, 0 rotos; sin rutas absolutas ni archivos de hosting |
| `harness smoke` | ✔ 21 páginas en `/` y 21 en `/mvp-ds-course/`, 404 propio, sin desbordamiento móvil |
| `actionlint` 1.7.12 | ✔ los 6 workflows |

## 4. Decisiones

| Decisión | Motivo |
| --- | --- |
| `mvp-ds-course` es el monorepo | Ya tiene fábrica, skills, evals y Pages funcionando |
| `site/` se queda donde está; `portal/` agrega lo nuevo | Mover `site/` rompería enlaces fuente de `generated/` (`../../site/index.html`) |
| La fábrica se construye con su script intacto y `dist/` la envuelve | Paridad demostrable archivo por archivo |
| `generated/` sigue versionado | Sus generadores ya no lo reproducen |
| Cápsulas sin `docs/` versionado y sin aplanar la carpeta | Su generador reproduce el sitio; aplanar haría que su ruta por defecto apunte al `docs/` de la fábrica |
| `dist/` sin `.nojekyll` ni archivos de hosting | Con deploy por artefacto Jekyll no corre; cada capa de deployment agrega lo suyo |
| Presupuestos por debajo de ambos hostings | Cambiar de proveedor no debe exigir recortar contenido |
| `access: public \| premium` en misiones y casos | Frontera engine/contenido desde hoy, sin auth ni backend |
| Entrega como rama + PR | La CI real corre en el PR antes de tocar `main`; revertir es un solo revert |

## 5. Deployment

No se ha desplegado nada todavía. El primer deployment con la nueva CI ocurre al
fusionar el PR en `main`; la CI del PR corre fábrica, cápsulas y portal sin desplegar.

## 6. Riesgos y deuda

| # | Tema | Acción propuesta |
| --- | --- | --- |
| 1 | ~~`qa_student_experience.py` falla en `main`~~ | Resuelto en esta rama (§6.1) |
| 2 | Generadores desalineados con `generated/` (42 archivos) | Decidir si se regeneran y se reaprueban, o se congelan |
| 3 | `qa_pages.py` reescribe capturas versionadas | Mover la evidencia a artefactos de CI y dejar solo las aprobadas en `reference/` |
| 4 | Dos fuentes de portal (`site/` y `portal/`) | Unificar en F3 con el shell de la página de referencia |
| 5 | `codex/add-home-navigation` sin fusionar (y checkout local); `codex/corporate-data-narrative-lab` en `narrative` sin fusionar | Decidir antes de seguir; pueden chocar con `README.md`/`AGENTS.md` |
| 6 | `studio/pnpm-workspace.yaml` trae `allowBuilds: esbuild: set this to true or false` | Fijar `true` o `false` antes del primer `pnpm install` |
| 7 | Estudio fuera de CI y sin tokens conectados | F1 |
| 8 | Cloudflare Pages sin prueba real (sin cuenta) | Probar con un proyecto de vista previa antes de monetizar |
| 9 | `narrative` y `tacos-don-juan-remotion` siguen activos | Archivar tras 1–2 semanas de paridad en producción |
| 10 | Carpetas locales `ds-course-hub`, `ds-course-design`, `ds-case-vault`, `ds-colab-kits` ya integradas | Borrarlas después de fusionar |
| 11 | `harness smoke` bloquea recursos externos | Si se agregan fuentes externas, añadir verificación propia |

### 6.1 Corrección posterior: `qa_student_experience` vuelve a la CI

La auditoría inicial afirmaba que `qa_student_experience.py` no estaba en la CI.
Era falso: `pages.yml` lo corre después de `qa_pages.py`, y la primera versión de
`factory.yml` lo omitió. Se detectó al revisar las ejecuciones de Actions antes de
abrir el PR. Cambios:

| Commit | Cambio |
| --- | --- |
| `fix(site)` | Los filtros de nivel pasan a varias filas entre 801 y 900 px; la portada se desbordaba 14 px a 820 px |
| `fix(qa)` | El texto de "Continúa · Nivel N" se compara con `text_content()` (el CSS lo pone en mayúsculas); en teléfono se vuelve a abrir la lección antes de medir `#advance` |
| `ci(factory)` | `factory.yml` corre `qa_student_experience.py` otra vez, igual que `pages.yml` |

Con esto el script pasa en escritorio, tableta y teléfono. Es la causa de que
`main` no despliegue desde `0acb694` (2026-09-06): el sitio público no muestra
los 17 commits posteriores (Nivel 3 con *code labs*, diagnóstico, navegación)
hasta que se fusione una rama con estas correcciones.

## 7. Siguiente paso exacto (F1 · Diseño)

En una rama `f1-diseno`: conectar `site/styles.css` a `design/tokens/tokens.css`
reemplazando sus colores literales por variables, agregar a `harness validate`
la regla "sin hexadecimales fuera de `design/tokens/`" para `site/` y `portal/`,
y aprobar con `qa_pages.py`, `harness all` y una comparación de capturas antes y
después.

## 8. Cómo fusionar y cómo revertir

```powershell
cd C:\Users\ASUS\Documents\GitHub\mvp-ds-course
git fetch ..\_handoff\mvp-ds-course-f0-consolidar.bundle f0-consolidar:f0-consolidar
git push -u origin f0-consolidar
# Abre el PR f0-consolidar → main, espera la CI en verde y fusiona.
```

Revertir: `git revert -m 1 <commit de merge>` en `main` (o "Revert" en el PR). La
CI vuelve a desplegar la versión anterior.
