# AI Discovery Labs V3 · contrato de consumo candidato

Complementa [la integración V2](AI_DISCOVERY_LABS_V2.md). No añade contenido al build del alumno ni modifica calendario, precios, misiones o evaluación.

## Referencia fija y alcance comprobado

La implementación candidata de DataCollectionMov queda fijada a `33bf744bdc6c3de3cbf0dd861704c0bffa1a465d`, [PR #3](https://github.com/jcval94/DataCollectionMov/pull/3), apilado sobre el PR #2 de V2. [Informe del Lote 0](https://github.com/jcval94/DataCollectionMov/blob/33bf744bdc6c3de3cbf0dd861704c0bffa1a465d/discovery_labs/docs/V3_BATCH0.md).

| Fuente | Contratos revisados | Rutas ejecutables | Figuras distintas | Clase aprobada |
| --- | ---: | --- | ---: | --- |
| UCI Retail | 6 | D31-A, D31-B, D31-E | 3 | No |
| NBA Elo | 6 | D10-D1, D10-D2, D10-E | 4 | No |
| Bob Ross | 6 | D85-A, D85-B, D85-C, D85-D1, D85-D2, D85-E | 7 | No |

Son 12 rutas de 18 con evidencia V3, 14 figuras en dos tamaños, 12 storyboards de siete actos y tres kits técnicos candidatos. Se conservan las 86 fuentes y 516 diseños originales. Retail y NBA no tienen las seis opciones preparadas: las preguntas que requieren datos ausentes quedan fuera de votación. No se interpreta el porcentaje de ejecución como aprobación pedagógica.

## Qué recibe cada persona

El paquete de alumno es `student-offline.zip`, generado desde una lista explícita de archivos en el commit fijo. Incluye el snapshot público minimizado, su atribución/manifiesto, diccionario, registro de investigación, galería sin red, tablas y código ejecutable. La revelación después de una predicción es una secuencia didáctica; no constituye un control de autorización.

La facilitación y sus referencias se generan por separado para preparación local del docente. La CI externa sube únicamente paquetes de alumno y evidencia visual; no sube la carpeta docente. El curso no debe copiar el árbol de investigación completo ni enlazar referencias docentes desde `dist/`. Esta entrega no añade respuestas de retos, tolerancias, rúbricas de evaluación o detalles del backend al repositorio público.

Para integrar después de la aprobación se necesita un manifiesto con commit completo, ID de fuente/pregunta, SHA256 del ZIP y snapshot, licencia y atribución, alcance temporal y de limpieza, evidencia de ejecución, revisión visual de esos hashes y registro anónimo del ensayo. No consumir `main`, un ZIP sin hash o una aprobación de otra pregunta por transitividad.

## Experiencia candidata de 45 minutos

La apuesta se registra antes de mirar las figuras. El alumno vota entre rutas disponibles, explica métrica y denominador, compara dos caminos sugeridos por IA, comprueba dos filas y un cálculo, ejecuta o usa la contingencia offline, pone a prueba el hallazgo y firma una conclusión con una limitación y una pregunta nueva.

La secuencia conserva Delegar · Verificar · Firmar. Instalación y preparación ocurren antes de clase. El modo screencast de 55 minutos amplía decisiones técnicas y errores realmente observados; no alarga la clase habitual. Se mantienen las restricciones vigentes de los módulos iniciales: no se crean cuadernos nuevos ni se cambia su experiencia aprobada.

## Puertas y ensayo

La fuente externa calcula `DATA_READY`, `RESEARCH_READY`, `VISUAL_READY` y `STORY_READY` por snapshot y pregunta. La revisión visual del asistente no reemplaza al docente. `CLASS_READY` y `PUBLISHED` permanecen cerradas. La publicación necesita ensayo humano observado, revisión docente independiente, correcciones de incidentes, distribución autorizada y revisión de integración al curso.

El primer ensayo recomendado es Bob Ross, que dispone de las seis perspectivas técnicas. El docente prepara los datos, ofrece las seis opciones y observa una sola ruta votada durante aproximadamente 45 minutos. Registrar tiempos reales por segmento, dificultades, accesibilidad, cambios de hipótesis y calidad del argumento final sin publicar datos personales ni respuestas individuales.

Retail y NBA pueden ensayarse con tres opciones si el objetivo del ensayo se delimita expresamente; no presentarlos como clases completas con seis rutas. Los bloqueadores de datos están documentados en el informe externo y no deben resolverse inventando ingresos, costos, identidades o temporadas.

## Validación y siguiente paso

En el checkout del curso pasó `python -m harness all`: validate, build, check y smoke con Chromium y accesibilidad, sin relajar validadores. El build de alumno conservó 453 archivos. En DataCollectionMov pasaron 11 tests, reproducción del ZIP fuera del repositorio y 24 combinaciones ruta/viewport; la CI remota del nuevo commit debe leerse en el PR, distinguiéndola de esas comprobaciones locales.

Supuestos: prácticas opcionales para principiantes, datos históricos públicos, entorno preparado y ninguna evaluación formal nueva. Riesgos: seis preguntas sin datos suficientes, ausencia de ensayo y revisión docente, derechos específicos aún abiertos para candidatos del Lote 1. Próxima slice: ensayo humano de Bob Ross y, sólo después de su aprobación, referencia de distribución y staging del curso bajo las instrucciones de las carpetas correspondientes. Este documento no autoriza despliegue ni fusión automática.
