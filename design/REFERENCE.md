# Página de referencia

- Archivo: `Página.zip` (87 MB), entregado por el autor el 2026-10-05. Es el mismo sitio que `Pagina_Curso_Completa_2026-10-05.zip`, con nombres de archivo acortados (la carpeta original no abría en Windows por rutas demasiado largas). Vistas idénticas byte a byte.
- Contenido: réplica estática del sitio de AI News Daily publicada el 2026-10-05 (`site/`) y su código fuente (`source/`, commit `2f4b4e9`).
- Se usa su **estructura** (shell, vistas) y sus **estilos** (tokens). El contenido de AI News Daily no se copia.
- No se versiona aquí por tamaño (casi todo es video de episodios).

## Vistas revisadas

| Vista | Patrón que se adopta |
| --- | --- |
| `index.html` | Shell: barra lateral de 292 px + escenario con `iframe`; tarjetas de navegación con borde y acento interior al estar activas; búsqueda; selector en móvil. |
| `episodes/<fecha>/index.html` | Hero con etiqueta, título grande, pregunta, pastilla de estado y botones; pestañas; mosaicos de puntaje. |
| `memory/index.html` | Hero con título enorme y tarjeta de "snapshot"; 6 indicadores; tarjetas con acento morado para contenido narrativo; filtros tipo chip. |
| `health/index.html` | Estados ok / warn / critical para el tablero docente. |
| `metrics/index.html` | Histórico de puntajes para la vista de progreso. |

## Variaciones encontradas

Las vistas usan valores casi iguales con pequeñas diferencias (por ejemplo `--panel` entre `#0d141d` y `#0f1823`, `--accent` entre `#66d9ff` y `#7dd3fc`). Se normalizaron a los valores de `index.html`, con los extras de `memory/` (`--story`, `--story-bg`) y de `health/` (`--warn`, `--critical`).
