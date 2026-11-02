# Duraciones estimadas y casos reales por módulo

**Estado:** propuesta implementada el 17 de octubre de 2026. Todos los tiempos son
estimaciones para un alumno principiante y se recalibran con tiempos reales (ver
«Cómo calibrar»).

Fuente única: `site/tiempos.json`. `scripts/build_pages.py` calcula minutos por
bloque, nivel y curso y los publica en `catalog.json` (`timing`, `levels[].minutes`,
`levels[].blocks[].minutes`, `levels[].case`). Para cambiar un tiempo se edita solo ese
archivo y se vuelve a construir.

## Qué ve el estudiante

| Dónde | Qué muestra |
| --- | --- |
| Portada · barra de cifras | Horas del curso en vivo (`clase_en_vivo.sesiones` × `duracion_min`) y horas estimadas del material total (los 13 niveles) |
| Portada · catálogo | Por nivel: tiempo total, caso real del módulo (con su estado), misión, tiempo por concepto y casos de banco que se usan en clase. Por bloque: conceptos y tiempo |
| Cada página de bloque | Aviso al inicio del contenido (no flota, para no tapar controles): tiempo del bloque y minutos por lección, ejercicio guiado y transferencia (`site/tiempos-lab.js`) |
| Mi avance · próxima clase | «Cómo se reparte la clase» con minutos por parte |
| Mi avance · tarjeta de cada caso | Minutos que faltan para terminar el caso |

## Modelo (minutos por concepto)

| Pieza | Min | Notas |
| --- | ---: | --- |
| Lección interactiva (Aprender) | 20 | Visual + intuición |
| Ejercicio guiado | 10 | En todos los niveles |
| Ejercicio de transferencia | 15 | Desde el Nivel 2 (regla de `CLAUDE.md`) |
| Repaso con retroalimentación | 5 | |
| **Concepto, Nivel 1** | **35** | Coincide con los «35 minutos por concepto» ya declarados |
| **Concepto, Nivel 2 en adelante** | **50** | |
| Misión del caso ancla | 75 | 80 min el 4.1 y 70 min el 4.2 (cuadernos ya hechos: unos 8 min por sección) |

## Clase en vivo (180 min, viernes 18–21 y sábado 8–11)

| Parte | Min |
| --- | ---: |
| Apertura y repaso de la tarea | 10 |
| Caso real: la decisión y las primeras hipótesis | 25 |
| Herramienta guiada en vivo | 50 |
| Misión en Colab, en parejas | 35 |
| Transferencia y discusión | 25 |
| Revelación del caso, qué enseña y bits | 20 |
| Descanso | 15 |

El caso entra en dos momentos de la clase: abre (la decisión) y cierra (la revelación).
La tabla `clases` ya guarda el caso de cada sesión (`clases.caso`).

## Casos reales en los módulos

Cada nivel (módulo) tiene **un caso ancla** que cierra el nivel y un **banco** de
casos para usar en clase en vivo (`docs/CASE_MISSION_MAP.md`). El catálogo muestra el
ancla y el banco. Estados visibles: *Disponible en Colab* (4.1 y 4.2), *En preparación*
(1.1 Wald), *Próximamente* y *En revisión* (15.4 Replit, hasta verificar fuentes).
Los casos nuevos sin verificar del mapa no se muestran a estudiantes.

## Lo que sale de los números

| Concepto | Horas |
| --- | ---: |
| Contenido autoguiado (13 niveles publicados) | ≈ 208 |
| Clases en vivo (22 sesiones de 3 h en 11 semanas, del 8 de enero al 20 de marzo de 2027) | 66 |

Aunque las clases en vivo cubrieran todo el tiempo, quedarían unas 142 h de trabajo
fuera de clase, **unas 13 h por semana** durante las 11 semanas. No cabe en un curso
de ~2.5 meses para principiantes. Decisión pendiente del docente: elegir qué
bloques son obligatorios y marcar el resto como opcional, o alargar la generación.
Abajo hay una propuesta.

## Propuesta: bloques obligatorios (25 de octubre de 2026, pendiente del autor)

No hace falta inventar un «bloque núcleo» por nivel: `clases/mapa_conceptos.yaml` ya
asigna cada concepto a una clase y una etapa. La propuesta usa esas etapas para decidir
qué es obligatorio fuera de clase:

| Qué | Obligatorio fuera de clase | Conceptos | Horas |
| --- | --- | ---: | ---: |
| Etapa `antes` (prerrequisitos de la clase) | Lección, ejercicio guiado y repaso (35 min). La transferencia queda opcional | 31 | 18.1 |
| Etapas `caso` y `error` (se revelan en clase) | Solo el ejercicio guiado (10 min), para fijar lo que se vio | 116 | 19.3 |
| Misión del caso | Terminar lo que no cupo en los 35 min de clase (supuesto: 40 min) | 22 clases | 14.7 |
| **Total** | | | **≈ 52 h** |

Eso da **≈ 4.7 h por semana** en promedio, en lugar de ~13 h. Todo lo demás
(transferencias, etapas `taller`, `decision`, `despues` y `autoestudio`, y el resto de
la biblioteca) queda como práctica opcional; sigue contando en «Material total».

Carga por semana (dos clases por semana; lo de `antes` se hace la semana de su clase):

| Semana | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Horas | 6.8 | 9.8 | 4.0 | 2.3 | 2.5 | 6.8 | 5.2 | 5.3 | 4.5 | 2.3 | 2.5 |

**Pico en la semana 2.** La clase 4 (Nightingale) tiene 7 conceptos `antes` del Nivel 2
(media, mediana, moda, rango, percentiles, sesgo, caja). Si media, mediana y moda se
adelantan a la semana 1, las dos primeras semanas quedan en 8.6 y 8.0 h. Como son
prerrequisitos, adelantarlos no rompe la regla de no usar un concepto antes de su
clase.

Para probar otras combinaciones: `python scripts/carga_semanal.py` (las reglas están en
`REGLAS` y `MISION_FUERA_DE_CLASE`).

**Lo que decide el autor:**

1. Si acepta las tres partes obligatorias o cambia alguna (por ejemplo, exigir también
   la transferencia de `antes`: +5 h en total).
2. Si los 40 min de misión fuera de clase son realistas; se recalibran con los eventos
   de los cuadernos.
3. Si adelanta media, mediana y moda a la semana 1.
4. Cómo se muestra: marcar «obligatorio» en Mi avance y en el catálogo requiere cambiar
   `site/tiempos.json`, `scripts/build_pages.py` y la interfaz; no se hace hasta que el
   autor lo apruebe.

## Cómo calibrar

Los cuadernos de Colab registran `abrio`, `seccion` y `completo` con hora del
servidor. La mediana entre `abrio` y `completo` por caso y alumno da el tiempo real de
una misión. Cuando haya datos de la Generación 1, reemplazar `min` en `tiempos.json`
por esas medianas. Las misiones y ejercicios del sitio todavía no registran tiempos
en la nube (ver el reporte de auditoría de la base).
