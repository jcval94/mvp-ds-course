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
| Portada · barra de cifras | Tiempo total estimado del curso |
| Portada · catálogo | Por nivel: tiempo total, caso real del módulo (con su estado), misión, tiempo por concepto y casos de banco que se usan en clase. Por bloque: conceptos y tiempo |
| Cada página de bloque | Aviso flotante: tiempo del bloque y minutos por lección, ejercicio guiado y transferencia (`site/tiempos-lab.js`) |
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
(1.1 Wald), *Próximamente* y *Por definir* (15.4 Replit, hasta verificar fuentes).
Los casos nuevos sin verificar del mapa no se muestran a estudiantes.

## Lo que sale de los números

| Concepto | Horas |
| --- | ---: |
| Contenido autoguiado (13 niveles publicados) | ≈ 208 |
| Clases en vivo (22 sesiones de 3 h en 11 semanas, del 8 de enero al 20 de marzo de 2027) | 66 |

Aunque las clases en vivo cubrieran todo el tiempo, quedarían unas 142 h de trabajo
fuera de clase, **unas 13 h por semana** durante las 11 semanas. No cabe en un curso
de ~2.5 meses para principiantes. Decisión pendiente del docente: elegir qué
bloques son obligatorios (por ejemplo, el caso ancla y un bloque núcleo por nivel) y
marcar el resto como opcional, o alargar la generación.

## Cómo calibrar

Los cuadernos de Colab registran `abrio`, `seccion` y `completo` con hora del
servidor. La mediana entre `abrio` y `completo` por caso y alumno da el tiempo real de
una misión. Cuando haya datos de la Generación 1, reemplazar `min` en `tiempos.json`
por esas medianas. Las misiones y ejercicios del sitio todavía no registran tiempos
en la nube (ver el reporte de auditoría de la base).
