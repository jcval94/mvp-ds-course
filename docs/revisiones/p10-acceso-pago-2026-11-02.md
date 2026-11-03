# p10 · Verificación del acceso de pago

Revisión del 2 de noviembre de 2026 sobre `main` en `12868cd`.

## Resultado y alcance

La puerta de los niveles 3+ ya está implementada. Esta revisión no certifica la
activación de cuentas con derecho de acceso: requiere comprobar el entorno
privado y una sesión real. No se modifican permisos, contenido, textos del sitio,
esquema ni despliegues.

Se añade una prueba de paridad de `site/app.js → FREE_LEVELS` con
`course.yaml → access.free_lab_levels`, incluida la detección de niveles extra,
faltantes, duplicados y declaraciones que la prueba no pueda interpretar. La
prueba existente ya comprueba la misma política en el middleware de Cloudflare.

## Evidencia pública

Consultas HTTP sin cookies a `https://learninglabs.pages.dev`, sin seguir
redirecciones, realizadas con `curl`:

| Ruta | Resultado |
| --- | --- |
| `/labs/level-1/` | 200 |
| `/labs/level-2/` | 200 |
| `/labs/level-3/` | 302 a `/acceso`, con `volver` y `motivo=sin_sesion` |
| `/labs/level-3/assets/app.js` | 302 a `/acceso`, con `volver` y `motivo=sin_sesion` |
| `/labs/level-14/` | 302 a `/acceso`, con `volver` y `motivo=sin_sesion` |
| `/missions/m01-wald/` | 404 |
| `/kits/m01-wald/m01_wald.ipynb` | 404 |

Estas consultas verifican el acceso anónimo por HTTP; no sustituyen una prueba
interactiva en incógnito ni una prueba con cuenta autorizada.

## Misiones y kits

El build público incluye solo misiones `public` en estado `ready` o `published`.
`harness/tests/test_harness.py` comprueba que una misión `premium` publicada no
entre al catálogo público. La misión registrada actualmente es pública y está
en borrador; no se cambia su clasificación.

El build no copia la carpeta `kits/` como componente público. Esto no restringe
la descarga desde GitHub o el uso en Colab: los archivos versionados siguen
disponibles porque el repositorio es público. Una respuesta 404 del sitio no
demuestra que un cuaderno sea privado.

## Preguntas bloqueantes para el autor

1. ¿Se continuará la activación y verificación de cuentas en una tarea del
   repositorio privado, o la realizará el autor? Registrar allí la evidencia del
   entorno y de la cuenta autorizada; no publicar datos de cuentas ni detalles
   privados en este PR.
2. ¿Qué misiones y kits concretos deben ser de pago, y se conserva para ellos la
   distribución pública en GitHub/Colab? La configuración actual se mantiene
   hasta que el autor determine esa clasificación y distribución.

El cierre de p10 requiere resolver esas preguntas y verificar que una cuenta
autorizada abra el nivel 3, mientras un navegador sin sesión solicite acceso.

## Supuestos y riesgos

- Se conserva la política existente: niveles 1 y 2 gratis, 3+ con acceso.
- No se asume que los prerrequisitos del entorno privado estén instalados ni
  que falten: no se inspeccionaron ni ejecutaron desde esta tarea pública.
- La puerta protege las rutas del sitio; no vuelve privado el repositorio.
- No se certifican las reglas de vigencia ni los distintos perfiles de acceso
  sin pruebas del entorno privado.

## Verificación reproducible

Ejecutar las validaciones de `docs/agents/COLABORADOR.md`; sus resultados concretos
se registran en el PR. Las pruebas del catálogo se ejecutan además con:

```sh
python -m pytest -q harness/tests/test_lab_access.py
```

## Siguiente vertical slice

Usuario: cuenta con acceso autorizado por el autor. Entrada: URL del nivel 3.
Flujo: iniciar sesión, abrir el nivel y repetir en una sesión privada sin cuenta.
Salida: contenido para la cuenta autorizada y puerta de acceso para el visitante.
Definition of Done: ambas pruebas con evidencia sin datos personales y las
preguntas anteriores resueltas. No objetivos: cambiar precios, planes, contenido
o visibilidad del repositorio.
