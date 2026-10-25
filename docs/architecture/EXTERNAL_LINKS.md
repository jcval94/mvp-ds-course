# Revisión independiente de enlaces externos

Usuario: quien mantiene el curso. Entrada: el build público de `dist/`.
Salida: URL, página de origen, código HTTP, diagnóstico y excepciones visibles.
El auditor no edita contenido ni participa en `check`, `all` o deployment.

## Uso local

```sh
python -m harness links
python -m harness links --rebuild --timeout 10 --retries 2 --pause 0.5 --workers 4 \
  --report /tmp/learninglabs-links.json --markdown /tmp/learninglabs-links.md
python -m pytest harness/tests/test_links.py -q
node --test harness/tests/links_issue.test.cjs
```

Sin `--rebuild`, reutiliza `dist/` si contiene `index.html`; si falta, lo construye.
Para revisar el código actual y evitar un build antiguo, usa `--rebuild`.
Los informes son regenerables: se guardan fuera del árbol versionado y de `dist/`.
Código de salida: 0 si no hay fallos de comprobación, 1 si los hay o existe un
error del comando. JSON separa `ok`, `failed`, `ignored` y `skipped`.

## Alcance y supuestos

- Extrae atributos `href`, `src`, `srcset`, `poster` y `data` de HTML/SVG,
  URLs literales HTTP(S) de JS/JSON (también scripts inline) y recursos CSS.
  Incluye Colab, Drive, fuentes y servicios; descarta fragmentos al deduplicar.
  Incluye todos los archivos emitidos, aunque no sean indexables en sitemap.
- Conserva todas las apariciones. Las referencias locales de HTML a JS/JSON
  permiten indicar la página que consume una fuente y su archivo/línea original.
  Si esa asociación no puede resolverse estáticamente, muestra el archivo/línea.
- No ejecuta JavaScript ni comprueba contenido después de iniciar sesión.
  URLs calculadas en runtime no pueden enumerarse de forma completa; los
  placeholders/literales dinámicos que detecta se muestran como `skipped`.
  No trata namespaces SVG ni canonical como enlaces externos. Cuando existe
  `build.base_url` en `course.yaml`, reconoce ese mismo host como interno.
- HEAD primero; ante un fallo hace GET con `Range: bytes=0-0`. Cierra la respuesta
  al recibir cabeceras incluso si el servidor ignora Range; no descarga archivos.
  Sigue un máximo de ocho saltos de redirección, sin cookies ni autenticación.
- Timeout por petición: 10 segundos. Máximo dos reintentos adicionales de la
  comprobación HEAD/GET, únicamente ante errores de transporte, 408, 425, 429
  o 5xx transitorios. Un 404 definitivo recibe fallback GET, no otros reintentos.
  Hasta cuatro trabajadores; las peticiones de un mismo dominio se serializan
  y se separan por al menos 0.5 segundos entre sus inicios. Esto también se
  aplica a fallback, reintentos y cada dominio de una redirección.
- User-Agent: `LearningLabs-LinkChecker/1.0` con el repositorio como contacto.
  Solo usa HEAD/GET. No envía formularios ni procesa sus respuestas: omite
  destinos `action`/`formaction` conocidos, proveedores de formularios, rutas de
  formulario/acción y queries de operación. Repite esta revisión en cada salto.
  No pulsa botones ni envía POST. Un formulario con ruta opaca, enlazado solo
  desde otro sitio y sin señales estáticas, no siempre puede identificarse.
- Un código 401/403 puede ser autorización/antirobot, no desaparición. Una raíz
  de API que devuelve 404 no demuestra que el servicio esté caído; se reporta
  la respuesta de esa URL concreta. Un 200 de Colab/Drive tampoco garantiza que
  el cuaderno exista o que los alumnos tengan permisos: requiere revisión humana.

## Excepciones revisables

`harness/links_ignore.txt` admite un dominio exacto por línea, seguido de `#`
y un motivo obligatorio. Sin comodines ni exclusiones por sufijo: exceptuar
`example.org` no exceptúa `sub.example.org` ni `evil-example.org`.
Las excepciones también se aplican al destino de redirecciones y aparecen en
el informe; no cuentan como comprobaciones exitosas. No se usan para ocultar 404.

La excepción inicial `www.science.org` se verificó el 24 de octubre de 2026:
HTTP 403 y página «Just a moment...» de Cloudflare al resolver el DOI de Berkeley.

## Workflow e issue único

`external-links.yml` corre los lunes a las 14:00 UTC (08:00 CDMX) y admite
`workflow_dispatch`. Construye el build actual antes de auditar. Es independiente
de `ci.yml`, de los reusable workflows y del deployment: un enlace externo
caído no bloquea la publicación del curso.

Solo usa `GITHUB_TOKEN`, con `contents: read` e `issues: write`. No guarda
credenciales de checkout ni requiere secretos. Una concurrencia global evita
dos actualizaciones simultáneas. `harness/links_issue.cjs` crea la etiqueta
`enlaces-rotos` si falta y mantiene un issue persistente con el marcador
`<!-- harness-external-links -->`: actualiza/reabre el mismo issue ante fallos,
lo cierra si el siguiente informe está limpio y no crea uno durante una primera
corrida sana. Si ya existe un issue con la etiqueta, lo reutiliza. Solo consolida
duplicados que contienen su propio marcador; no cierra issues humanos ajenos.

El informe del issue incluye URL, página/archivo y línea, código y diagnóstico.
Si excede el tamaño de GitHub, remite al informe completo del artefacto
`external-links-report` (JSON/Markdown, retención 14 días, también ante fallos).
Un error de build o un informe ausente/incompleto falla el workflow y nunca se
interpreta como una corrida sana que cierre el issue. No se añaden comentarios
repetidos ni se abren issues por URL.

## Validación y siguiente paso

Las pruebas usan exclusivamente un servidor HTTP de loopback: HEAD sano,
fallback GET, 404, redirección, bucle, timeout, reintentos, pausa, excepciones y
bloqueo de formularios antes de redirigir. Un cliente GitHub simulado verifica
la creación única, actualización, cierre y reapertura, sin llamadas reales.

Definition of Done: pruebas offline y `harness all` pasan; actionlint sin
diagnósticos; corrida real adjunta al PR; ninguna modificación de enlaces.
Siguiente vertical slice recomendada: revisar manualmente los destinos
detectados y los permisos de Colab/Drive antes de decidir cambios de contenido.
