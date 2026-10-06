# F1 · Diseño — landing de The Agentic D. Scientist

Fecha: 2026-10-05 · Rama: `f1-continuum` (encima de `f0-consolidar`)

## Contexto

La primera versión de F1 (ramas `f1-diseno` y `portal-shell`, PRs #6 y #7) se
basó en una réplica de AI News Daily que no era la página del curso. Esos PRs
se cerraron sin fusionar y sus ramas quedan como respaldo. La referencia
correcta es el proyecto "Remix of Continuum 1" (Lovable): la landing de
**The Agentic D. Scientist**. Ver `design/REFERENCE.md`.

Decisiones del autor (2026-10-05):

| Tema | Decisión |
| --- | --- |
| F0 | Se conserva; sus tokens pasan a Continuum |
| Enfoque | Estático primero: diseño y landing de Continuum sobre el sitio actual; sin login ni pagos |
| 8 bits | Solo dentro de misiones y ejercicios |
| Testimonios | Fuera hasta tener reales con permiso |

## Cambios

| Área | Cambio |
| --- | --- |
| `design/` | Tokens Continuum (F0) y Plus Jakarta Sans auto-hospedada en `design/fonts/` (OFL 1.1) |
| Portada `site/index.html` | Landing: hero oscuro con la tarjeta "Qué hacer ahora", indicadores, Qué aprenderás, Cómo aprenderás, Currículum, Planes, fuentes y validación, CTA final |
| Currículum | Los 13 niveles reales de `catalog.json`, plegables; 1 y 2 "Gratis", 3+ "Plan pagado" |
| Planes | Los cuatro planes de Continuum con sus precios; los de pago abren un correo a `hola@agenticds.com` |
| Diagnóstico y metodología | Mismo encabezado, tokens y fuente; la retroalimentación ya no usa verde |
| Harness | `design/` completo se publica con el portal; `validate` rechaza colores literales en `site/` y `portal/` |
| QA | `qa_pages.py` y `qa_student_experience.py` esperan los nuevos títulos, marca y encabezado |

### Copia adaptada respecto a Continuum

- Título de "Qué aprenderás": "De los fundamentos de datos a desplegar sistemas de IA" (el original hablaba de "alfabetización en IA", que no es un nivel del curso).
- Plan Free: nombres reales de los niveles 1 y 2.
- Currículum: 13 niveles reales en lugar de los 6 de ejemplo.
- CTA final: "Empezar gratis" en lugar de "Crear mi cuenta" (no hay cuentas).

## Pruebas

| Prueba | Resultado |
| --- | --- |
| `validate_content.py` · `test_vertical_slices.py` | ✔ |
| `qa_pages.py` | ✔ portal, 13 niveles, 197 escenas, 394 ejercicios, móvil y consola |
| `qa_student_experience.py` | ✔ escritorio, tableta, teléfono, continuidad y 19 code labs |
| `harness all` | ✔ 614 archivos, 8.99 MB; smoke en `/` y `/mvp-ds-course/` |
| `harness/tests` | ✔ 13/13 |
| `actionlint` | ✔ |
| Fuente | Carga local en todas las páginas, sin errores de consola |

## Pendiente

1. **Acceso real por plan.** Los niveles 3+ dicen "Plan pagado" pero siguen abiertos por URL. Cerrarlos requiere un build premium separado (la frontera `access` de `course.yaml` ya existe) y, más adelante, login.
2. **Correo de contacto.** `hola@agenticds.com` viene del proyecto de Lovable; confirmar que el dominio es tuyo.
3. **Imagen del hero.** Hoy es un degradado con malla de puntos; la foto de la plantilla no se usa.
4. **Niveles.** Los laboratorios siguen con su tema claro y acentos verdes: conectar `scripts/assets/level_shell_v1.css` a los tokens, empezando por el Nivel 1.
5. **Inglés.** Continuum es bilingüe; aquí solo hay español porque los laboratorios están en español.
6. **Capturas aprobadas.** `reference/design/github-pages-*-approved.png` siguen mostrando el portal anterior.
