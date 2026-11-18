# Inventario: lo que supone Colab en los Módulos 1 y 2 (u07)

**Fecha:** 13 de noviembre de 2026 · **Tablero:** u07 (encargo E-11) · **Decisión de base:** clases 1 a 4 sin Colab;
Colab entra al inicio de la clase 5 con 4.1 Semmelweis (u01, 4 nov) y, después, solo donde el caso necesita código
(`docs/PAGINA_O_COLAB.md`, aprobado el 13 nov).

Se buscaron «colab», «cuaderno», «TDD_ID», «TDD_CLAVE» y «secretos» en los documentos de operación y en las páginas que ve
el alumno. Como la decisión ya está tomada, la documentación interna se corrigió en este mismo PR; el texto visible
para alumnos queda como propuesta.

## 1. Corregido en este PR (documentación interna)

| Archivo | Línea | Decía | Ahora dice |
| --- | --- | --- | --- |
| `docs/MODULO_1_DISENO.md` | 9 | Usan Colab por primera vez | El Módulo 1 se resuelve en la página; Colab entra en la clase 5 |
| `docs/MODULO_1_DISENO.md` | 42 | La apuesta vive en Colab | La apuesta se registra en `caso.html` |
| `docs/MODULO_1_DISENO.md` | 172 | Bienvenida y Colab (secretos) | Bienvenida y entrada con Google a Mi avance |
| `docs/MODULO_1_DISENO.md` | 175, 181, 190 | Caso 1.1, reto de la taquería y caso 1.2 «en Colab» | «En la página» |
| `docs/MODULO_1_DISENO.md` | 199 | El caso de costo pasa a tarea porque su cuaderno registra solo | La página registra el avance con la sesión del alumno |
| `docs/MODULO_1_DISENO.md` | 209 | El simulador de m01-wald pasa al cuaderno de Colab | Pasa al laboratorio de `casos/1-1/caso.html` |
| `docs/OPERACION_G1.md` | 16 | Cuadernos de Colab listos para 1.1, 4.1 y 4.2; faltan los de la clase 2 | Seis casos en la página y dos en Colab; faltan las clases 3 en adelante |
| `docs/DURACIONES.md` | 41 | Misión en Colab, en parejas | Caso en la página o en Colab, según el reparto |
| `docs/DURACIONES.md` | 53 | Estados: *Disponible en Colab* (4.1 y 4.2), *En preparación* (1.1) | Agrega *Disponible en la página* con los seis casos |

Ya estaban corregidos antes de este inventario: `docs/ESTRUCTURA_GENERACION_1.md` (calificación, 13 nov),
`docs/CASO_EN_PAGINA.md`, `docs/CRITERIO_PRIMERO.md`, `docs/agents/COLABORADOR.md` (sitio #94) y el orden de Mi avance
en `docs/OPERACION_G1.md` D2 (sitio #97).

## 2. Texto visible para alumnos o público (lo decides tú)

| Prioridad | Archivo | Línea | Dice | Por qué queda mal | Propuesta |
| --- | --- | --- | --- | --- | --- |
| Media | `site/terminos.html` | 43 | Requisito: internet estable para Meet «y el trabajo en Colab» | No es falso (Colab entra en la clase 5), pero sugiere que se usa desde el día 1 | «…para la clase en Google Meet y para resolver los casos en la página y, desde la clase 5, en Colab.» |
| Baja | `site/aviso-privacidad.html` | 30 | «…cuando usas la plataforma, los cuadernos de Colab o tomas el curso» | Correcto: Colab sigue existiendo | Sin cambio |
| Baja | `site/aviso-privacidad.html` | 83 | Google: «…Colab, Meet…» | Correcto | Sin cambio |
| — | `site/alumno.html` y `site/alumno.js` | varias | Acceso a Colab, botones «Abrir en Colab» | Ya resuelto: Acceso a Colab solo aparece la semana de la clase 5 y los casos de la página no muestran botón de Colab (sitio #79 y #97) | Sin cambio |
| — | `site/colab.html` | varias | Tutorial de Colab | Es el tutorial; su revisión con ojos de principiante es u08 (`docs/revisiones/TUTORIAL_COLAB.md`) | — |

Sin menciones de Colab: `site/index.html`, `site/inscripcion.html`, `site/inscripcion-lista.html`, `site/instalacion.html`,
`site/acceso.html`, `site/methodology.html`, `docs/GUION_CLASES_1_2.md` y `docs/DIFUSION_G1.md`.

## 3. Lo que está bien y no se toca

- `docs/PILOTO_G1.md`: el piloto prueba a propósito la entrada a Colab con 4.2 (pasos 4 a 12 y criterios). Sigue
  vigente, porque 4.2 se queda en Colab. **Sugerencia:** agregar al piloto un recorrido de 1.1 en la página, que es lo
  que vivirá un alumno en la clase 1 (pasos ya descritos en `docs/GUION_CLASES_1_2.md`, «Antes de la clase 1»).
- Las menciones a Colab en los Módulos 3 en adelante siguen el reparto de `docs/PAGINA_O_COLAB.md`.

## 4. Resumen

- 11 menciones internas corregidas en 3 archivos.
- 1 texto visible con propuesta (requisitos de los términos), de prioridad media.
- 0 páginas que un alumno de la clase 1 vea con Colab por delante.
