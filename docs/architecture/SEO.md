# SEO técnico del build

`course.yaml → build.base_url` es la única fuente de URL del sitio para el
harness. Admite un dominio http(s) y una subruta opcional. Cambiar de hosting no
cambia enlaces ni recursos: el build solo emite esa URL en los canonical del
`head` y en los `loc` de `sitemap.xml`.

## Generación

`python -m harness build` aplica `harness/seo.py` a las copias temporales:

- Cada HTML recibe un canonical propio. `index.html` usa la URL del directorio;
  las otras páginas conservan su nombre `.html`.
- La descripción conserva el `meta name="description"` existente si no está
  vacío. Si falta, toma literalmente el primer `h1` no vacío o el `title`
  estático, normalizando solo espacios. Para shells renderizados con JavaScript
  sin título estático, usa el título exacto del bloque publicado en
  `catalog.json`, emparejando su ruta. No resume ni genera copy comercial.
- Si no hay ninguna de esas fuentes, emite
  `TODO: derivar descripción del contenido de esta página.` y registra la ruta
  en `dist/build-info.json → seo_description_todos`.
- El sitemap enumera los HTML publicados, salvo `404.html`, documentos con
  `noindex`/`none` para robots o Googlebot y redirecciones meta refresh. En
  `missions/<id>/`, exige además un manifiesto registrado, `access: public` y
  `status: ready | published`, incluidos todos sus HTML descendientes. No confía
  en `missions.json` para decidir acceso. No agrega fechas inventadas.
- En `labs/level-N/` (incluidas variantes `level-N-v2` y todos sus HTML
  descendientes), solo enumera los niveles de `course.yaml →
  access.free_lab_levels`, hoy `[1, 2]`. Los niveles de pago conservan canonical
  y description. Esta política es independiente de `public_build_includes`.
  Pages Functions no lee el YAML del repositorio en runtime: el literal
  `GRATIS` de `deploy/cloudflare/functions/labs/_middleware.js` queda ligado a
  esa lista por `harness/tests/test_lab_access.py`, con casos negativos de
  discrepancia. Al cambiar la política se actualizan ambos en el mismo PR.
- `robots.txt` permite el rastreo. Omite la directiva `Sitemap` para cumplir la
  restricción de no emitir la URL base fuera de canonical/sitemap; el sitemap
  se encuentra en la ubicación convencional `sitemap.xml`.

La inyección ocurre después de ejecutar la fábrica sin cambios. Se enriquece
primero `_site/`, que es regenerable, para mantener la prueba existente de
igualdad byte a byte con su copia en `dist/`. Después se aplica al árbol completo
para cubrir portal, misiones y cápsulas. Es idempotente y sucede antes del hash
del inventario. No modifica `site/`, `generated/`, `design/`, el generador legado
ni texto visible. Las descripciones procedentes de títulos pueden ser breves;
una revisión editorial futura puede mejorarlas en su fuente, fuera de esta tarea.

## Puertas y verificación

`python -m harness check` exige un canonical correcto y una descripción no vacía
por HTML, un robots portable y un sitemap XML con exactamente las páginas
indexables esperadas. Rechaza faltantes, duplicados y rutas adicionales.

La revisión de portabilidad conserva la prohibición de archivos de hosting y
URLs de proveedores. Solo exime el tag canonical real en `head` con la URL exacta
esperada y el texto de los `loc` del sitemap; no exime comentarios, scripts,
enlaces, recursos ni otras apariciones del dominio configurado. También examina
XML. La puerta SEO valida por separado la lista del sitemap.

```sh
python -m pytest harness/tests -q
python -m harness all
python scripts/qa_pages.py
python scripts/qa_student_experience.py
actionlint
```

Las pruebas nuevas de `harness/tests/test_seo.py` incluyen la puerta negativa de
`checks.run`, inyección idempotente, marcadores TODO, bases con subruta, metadatos
falsos en comentarios/scripts, exclusión de premium/draft aun si su HTML se filtra
y rechazo del dominio fuera de los dos lugares autorizados.

## TODO de descripciones

Ninguno en el build actual: `seo_description_todos` es `[]`. El caso sin contenido
está cubierto por una prueba con marcador explícito. No se tomaron decisiones
nuevas de marca, precios, textos visibles ni acceso.
