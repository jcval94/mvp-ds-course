# p10 · Comprobación de producción del 3 de noviembre de 2026

## Resultado

La protección anónima sigue activa en producción. No se puede cerrar p10 con
esta evidencia: falta observar que una cuenta autorizada abre el nivel 3 y que
una ventana de incógnito muestra la puerta de acceso. No se cambia la
implementación, la clasificación del contenido ni los permisos.

Esta revisión continúa el [PR #72](https://github.com/jcval94/mvp-ds-course/pull/72)
y la [revisión anterior](p10-acceso-pago-2026-11-02.md). Se parte de `main` en
`512042f88c270b23e4ac307e9cad2ca2c530abd8`. El archivo público
`https://learninglabs.pages.dev/build-info.json` identifica ese mismo commit en
producción, con 408 archivos y ninguna misión pública publicada.

## Evidencia HTTP sin sesión

Consultas GET con `curl`, sin cookies y sin seguir redirecciones:

| Ruta | HTTP | Resultado |
| --- | --- | --- |
| `/labs/level-1/` | 200 | Abierto |
| `/labs/level-2/` | 200 | Abierto |
| `/labs/level-3/` | 302 | `/acceso?volver=%2Flabs%2Flevel-3%2F&motivo=sin_sesion` |
| `/labs/level-3/assets/app.js` | 302 | `/acceso`, conservando la ruta solicitada; `motivo=sin_sesion` |
| `/labs/level-14/` | 302 | `/acceso`, conservando la ruta solicitada; `motivo=sin_sesion` |
| `/missions/m01-wald/` | 404 | No publicado en el sitio |
| `/kits/m01-wald/m01_wald.ipynb` | 404 | No publicado en el sitio |

La respuesta del nivel 3 incluye `Cache-Control: no-store`. Ejemplo reproducible:

```sh
curl --silent --show-error --max-time 25 --output /dev/null --write-out '%{http_code} %{redirect_url}\n' https://learninglabs.pages.dev/labs/level-3/
```

En PowerShell, usar `curl.exe` y reemplazar `/dev/null` por `NUL`.

## Intento en el navegador

Se abrió la URL del nivel 3 en una pestaña nueva del perfil habitual de Chrome.
La primera observación mostró `/acceso?volver=%2Flabs%2Flevel-3%2F&motivo=sin_sesion`
con el texto «Comprobando tu acceso…». Esa pantalla es un estado intermedio:
no demuestra que la cuenta tenga acceso, que carezca de él ni que exista un
fallo del sitio.

Las lecturas posteriores de la pestaña agotaron el tiempo de espera. El control
del navegador se detuvo al no poder determinar con confianza la URL activa en
Windows. No se confirmó el resultado final con cuenta y no se llegó a ejecutar
la prueba en incógnito. No se extrajeron cookies, tokens ni datos de la cuenta.

## Comprobación requerida del autor

Pregunta bloqueante, también planteada en el PR de esta revisión: **¿puedes
completar la prueba con una cuenta que ya tenga acceso y confirmar ambos
resultados, o indicar si necesita continuarse en una tarea privada?**

1. En Chrome normal, iniciar sesión con una cuenta que ya tenga acceso y abrir
   `https://learninglabs.pages.dev/labs/level-3/`. Comprobar que se ve el
   laboratorio y se puede usar, sin quedar en `/acceso`.
2. En una ventana nueva de incógnito, sin iniciar sesión, abrir la misma URL.
   Comprobar que termina en `/acceso`, muestra la solicitud de acceso y no
   entrega el laboratorio.
3. Registrar solo el resultado de cada paso. No publicar correos, identificadores
   de cuenta, cookies, tokens ni pantallas con datos personales.

No se necesita conceder permisos nuevos para esta prueba. Si requiere cambios
de cuentas o del entorno privado, deben continuarse allí, fuera de este repo.

## Supuestos, límites y validación

- Se conserva la política autorizada: niveles 1 y 2 gratis; 3+ con acceso.
- Los 404 de misiones y kits verifican su ausencia en el sitio. El contenido
  versionado en este repositorio público sigue siendo descargable.
- Esta comprobación no certifica todos los perfiles ni la vigencia del acceso.
- Las validaciones del repositorio y sus resultados se registran en el PR. Los
  evals de generación de niveles no aplican: no se modifica material educativo.

## Siguiente vertical slice

Usuario: cuenta con acceso existente. Entrada: URL del nivel 3. Flujo: comprobar
la cuenta y repetir en incógnito sin sesión. Salida: laboratorio para la cuenta
autorizada y puerta de acceso para el visitante. Definition of Done: ambos
resultados observados y registrados sin datos personales. Fuera de alcance:
activar cuentas, cambiar planes, contenido o visibilidad del repositorio.
