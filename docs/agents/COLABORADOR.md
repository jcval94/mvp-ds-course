# Contexto para agentes colaboradores

Léelo completo antes de cada tarea en este repo. Resume lo que no está escrito en
otros archivos o lo que es fácil malinterpretar. Si algo aquí contradice una
instrucción de la tarea, la tarea manda; si contradice otro documento del repo,
pregunta.

Última revisión: 25 oct 2026.

## 1. Qué es esto

**The Agentic Data Scientist**, curso de ciencia de datos de Augmented Learning
Labs para adultos que **no saben programar** y apenas entran al mundo de los
datos. Se enseña con casos históricos reales donde hay que tomar una decisión
(Wald y los bombarderos, Semmelweis, Berkeley 1973).

- **Generación 1 en vivo:** del 8 de enero al 20 de marzo de 2027, por Google Meet.
  Un grupo, un docente. Es el producto principal.
- **Sitio oficial:** https://learninglabs.pages.dev (Cloudflare Pages). GitHub Pages
  solo redirige.
- **Modelo:** niveles 1 y 2 gratis; del 3 en adelante con plan de pago o inscripción.

## 2. Repos

| Repo | Visibilidad | Qué contiene |
| --- | --- | --- |
| `jcval94/mvp-ds-course` (este) | **Público** | Sitio, fábrica de niveles, harness, CI, misiones, kits |
| `jcval94/agentic-ds-backen` | **Privado** | Esquema de Supabase, instalador, casos de Colab con sus retos y rúbricas, Edge Function, pruebas del backend |
| `jcval94/agentic-ds-taqueria` | Público | Paquete que importan los cuadernos de los alumnos |
| `DataCollectionMov` | Público | Robot de datos; no se toca desde aquí |

## 3. Lo que nunca va en un repo público

Esto incluye archivos, commits, ramas, descripciones de PR y comentarios. GitHub
conserva los commits de un PR aunque se cierre y se borre la rama, así que un
error aquí no se deshace.

- Respuestas, opciones correctas o tolerancias de los retos.
- Rúbricas y criterios de calificación.
- Código, rutas internas o detalles de funcionamiento de `agentic-ds-backen`.
- Datos de alumnos: nombres, correos, alias, avances, calificaciones.
- Claves, tokens o cadenas de conexión. Única excepción: la clave publicable de
  Supabase que ya aparece en el sitio.

Si una tarea en el repo público parece necesitar algo de esto, detente y pregunta.
Los reportes que lo necesiten van como PR en `agentic-ds-backen`.

## 4. Qué puedes tocar

| Carpeta | Regla |
| --- | --- |
| `harness/`, `schemas/`, `.github/workflows/` | Sí, con pruebas. No relajes un validador para que algo pase |
| `scripts/` | Solo si la tarea lo pide; los cambios deben conservar la QA existente |
| `site/` | Lógica y estructura sí; textos visibles, precios y fechas no |
| `deploy/cloudflare/` | Solo con indicación explícita: protege los niveles de pago |
| `design/` | No. Colores, fuentes y estilo 8 bits los decide el autor |
| `generated/` | No. Es contenido aprobado y congelado; si una página necesita algo, se inyecta en el build |
| `casos/`, `missions/`, `kits/`, `capsulas/` | No, salvo que la tarea lo diga |
| `docs/` | Solo los documentos de tu tarea |

`AGENTS.md` raíz indica qué flujo aplica según la tarea. El flujo largo de la fábrica
(Product Brief → PRD → … → evals) solo aplica a crear o modificar niveles de la
biblioteca, no a tareas de portal, harness o CI.

## 5. Cómo verificar

```sh
python -m harness all           # validate + build + check + smoke
python -m pytest -q harness/tests
python scripts/qa_pages.py      # después de python scripts/build_pages.py
python scripts/qa_student_experience.py
actionlint
```

Versiones fijadas en `harness/requirements.txt`. Las capturas de QA van a
`output/qa/` (ignorado por Git).

## 6. Cómo entregar

- Una rama y un PR hacia `main` por tarea. **Nunca fusiones**: fusionar a `main`
  despliega el sitio en producción.
- No reescribas historial ni borres ramas ajenas.
- En el PR: qué cambió, cómo verificarlo, qué no pudiste comprobar y cualquier
  decisión que dejaste al autor.
- Cambios mínimos. Si ves algo fuera del alcance, anótalo en el PR en lugar de
  arreglarlo.

## 7. Decisiones que no son tuyas

Marca, textos de venta, precios, fechas, qué es gratis o de pago, contenido y
pedagogía de los casos, estilo visual, esquema de la base y cobros. Si una tarea
te obliga a decidir algo de esto, déjalo planteado en el PR con opciones.

## 8. Datos útiles

- Los niveles gratis están en `course.yaml → access.free_lab_levels`; una prueba
  exige que coincida con el middleware de Cloudflare. `site/app.js` tiene una
  tercera copia (`FREE_LEVELS`) aún sin prueba.
- `dist/` debe ser reproducible y agnóstico del hosting: rutas relativas y la URL
  base solo en canonical y sitemap.
- `site/` es el portal actual; `portal/` tiene plantillas nuevas (misiones, 404).
- Las misiones en `draft` o `premium` nunca llegan a `dist/`.
- Idioma de todo lo visible y de la documentación: español.
