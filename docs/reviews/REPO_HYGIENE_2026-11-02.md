# Auditoría de higiene del repositorio — 2 nov 2026

## Alcance y resultado

- Repositorio revisado: `jcval94/mvp-ds-course`.
- Los siete archivos rastreados de la raíz (`.gitignore`, `AGENTS.md`, `CLAUDE.md`, `IDEA.md`, `README.md`, `concepro_histograma.html` y `ejercicios_histograma.html`) son archivos fuente o documentación; no se encontró basura rastreada que retirar.
- Permanecen intactos los directorios locales ignorados `_site/`, `datasets/_downloads/` y `scripts/__pycache__/`; son salidas/cachés y no forman parte de Git.
- Se eliminaron de GitHub exactamente las 44 ramas enumeradas abajo. Antes del cambio se confirmó que cada nombre existía y tenía un PR fusionado asociado. Tras la eliminación, la API de GitHub y `git fetch --prune` confirmaron que ya no existen.

## Ramas retiradas

`acceso-pago`, `activar-login`, `admin-docentes`, `area-alumno-login`, `audit/a11y-axe-keyboard-20261024`, `audit/estado-repo-2026-10-24`, `aviso-privacidad-terminos`, `chore/qa-screenshot-artifacts`, `ci-node24-keepalive`, `clases-alias-hero`, `cloudflare-diagnostico`, `cloudflare-learninglabs`, `codex/curriculum-12-levels`, `criterio-primero`, `cuadernos-retos`, `curriculo-14-niveles`, `docs/colaborador-contexto-20261025`, `docs/documentos-rectores`, `f0-consolidar`, `f1-continuum`, `f1-niveles`, `f2-wald`, `feat/build-technical-seo`, `feat/duraciones-visibles`, `feat/external-links-watch`, `feat/level-1-v2-story-experience`, `feat/wald-cuaderno-enlace`, `ficha-claves`, `fix/kit-wald-datos-fijos`, `fix/student-only-level-build-20261024`, `inscripcion-stripe`, `intros-casos-8bits`, `intros-material-real`, `landing-generacion-1`, `mensajes-filtros-ia`, `menu-perfil`, `mi-cv`, `pagos-curso`, `panel-docente`, `pendientes-menores`, `requisitos-instalacion`, `rescue/wald-intro-1-1-20261024`, `supuestos-confirmados`, `wald-1-1`.

## Ramas conservadas

No se tocaron las ramas en espera `f1-diseno`, `portal-shell`, `f1-hero-foto` y `codex/add-home-navigation`; tampoco `codex/separar-modos-educativos`, `tiempos-casos` ni `review/independent-historical-verification-2026-10-24` y `revision/principiante-2026-10-24`, que requieren revisión/decisión aparte.

## Validación

Los resultados detallados de las validaciones del repo están en la descripción del PR asociado a esta auditoría.

