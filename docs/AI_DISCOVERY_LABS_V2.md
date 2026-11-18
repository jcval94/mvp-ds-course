# AI Discovery Labs · integración V2

La ampliación candidata más reciente y su commit fijo se describen en [AI Discovery Labs V3](AI_DISCOVERY_LABS_V3.md). Este documento conserva la línea base V2 y su alcance original.

Estado: sistema de investigación implementado en DataCollectionMov; integración curricular propuesta, sin publicación ni modificación de las 22 clases. Corte: 16 de noviembre de 2026.

## Propósito y alcance

Prácticas opcionales de aproximadamente 45 minutos para principiantes, con IA como copiloto. El alumno vota entre preguntas disponibles, registra una predicción, define una métrica, critica dos caminos y firma una decisión tras una prueba adversarial. Las descargas y la instalación suceden antes de clase.

El sistema conserva 86 entradas, 516 diseños de pregunta, estados de evidencia y tres pilotos técnicos: retail, NBA y Bob Ross. Nueve preguntas se ejecutaron; 507 siguen como diseños. Ninguna práctica está aprobada para clase porque falta el ensayo humano de duración real y la revisión docente independiente. Metadatos y bibliografía pendientes se distinguen de datos comprobados.

## Frontera entre proyectos

DataCollectionMov conserva los IDs, metadatos, snapshots, hashes, descarga, QA, scripts de investigación y evidencia. Este monorepo consume referencias a un commit completo o release aprobado, como establece la arquitectura existente. No copia históricos pesados ni activa recolección desde el portal.

El alumno recibe únicamente el paquete aprobado y el material de su actividad. El guion docente y las referencias de facilitación pertenecen al build docente local o a una distribución privada autorizada, nunca a `dist/`. No se agregan respuestas, rúbricas, tolerancias, datos de alumnos ni detalles del backend privado.

## Encaje pedagógico propuesto

| Piloto | Hábito principal | Conceptos | Encaje sugerido |
| --- | --- | --- | --- |
| Retail | Preguntar qué mide un importe y qué denominador se eligió | Bruto/neto, duplicados, faltantes, sesgo por exclusión | Después de métricas descriptivas; oportunidad de puente a datos y SQL |
| NBA | Verificar qué sabía el modelo antes del evento | Filas espejo, Brier, calibración, incertidumbre por bloques | Después de evaluación y validación temporal |
| Bob Ross | Buscar contraejemplos y cuestionar la representación | Binarios, distancias, estabilidad de grupos, ID como falsa señal | Después de descripción; ruta de clustering tras no supervisado |

Para niveles 1–2 se propone observar evidencia preparada y tomar decisiones sin escribir código. Desde nivel 3, la IA puede preparar cálculos y el alumno verificarlos. No se construyen cuadernos nuevos de módulos iniciales en este monorepo mientras esa experiencia siga en revisión. El piloto externo es un banco de investigación, no una sustitución de las misiones existentes.

## Contrato de aprobación y consumo

El identificador canónico de fuente es estable; el ID de pregunta combina fuente y perspectiva. La aprobación se aplica a una pregunta y snapshot concretos, no a seis preguntas ni a toda una fuente por transitividad. Una actividad necesita al menos dos preguntas/rutas técnicamente disponibles para que el grupo pueda elegir, más dos caminos de análisis con supuestos explícitos.

La publicación exige: derechos del snapshot y sus campos, hash completo, esquema y QA de alcance suficiente, preguntas medibles, resultados y prueba adversarial reproducidos, materiales de alumno/docente, alternativa offline, revisión y ensayo humano de 45 minutos. Tiempo de CPU no prueba duración de aula. Un resultado inconcluso puede aprobarse por su rigor; un dato inventado no.

El manifiesto de consumo debe fijar `source_id`, IDs de preguntas aprobadas, URL con SHA completo o release, hash del archivo, licencia y atribución, grano, cobertura observada, política de limpieza, versión del código, ejecución comprobada y evidencia anónima del ensayo. No usar `main` como URL de datos en un cuaderno del curso. Un booleano editorial no sustituye evidencia ni permisos.

## Implementación mediante PRs verificables

1. **Catálogo en DataCollectionMov:** conciliación 37/41/8, metadatos, preguntas y antecedentes con estados. Aceptación: 86 IDs únicos, 13 categorías y 516 IDs de pregunta sin perder los 270 originales.
2. **Motor en DataCollectionMov:** tres snapshots y pilotos, dashboard offline y CI. Aceptación: hash/esquema, dos rutas por piloto, repetición sin red y pruebas adversariales. El paquete conserva el ensayo humano como bloqueo.
3. **Este documento:** contrato y propuesta de encaje. Aceptación: no tocar oferta, calendario, estilos, permisos, niveles aprobados o publicación; pasar harness y reportar limitaciones del entorno.
4. **Después del ensayo y decisión del autor:** release pequeño de alumno y entrega docente separada. Entonces crear caso en staging y misión draft con los contratos vigentes, leer los AGENTS de esas carpetas y pasar el harness. No modificar schemas para acomodar un candidato.

No se añade una pestaña al portal, seguimiento, evaluación o API nueva en esta fase. Si se decide hacerlo después, deberán probarse los permisos reales y los estados de carga/error, siguiendo la arquitectura vigente.

## Validación de esta propuesta

La implementación no cambia la plataforma ni publica contenido. Se ejecutaron validate, build y check del harness sobre el repositorio; el smoke de navegador quedó bloqueado por la instalación/disponibilidad de Chromium del entorno. No se relajó ninguna validación ni se declara `harness all` aprobado. La CI del PR deberá confirmar los controles del entorno canónico antes de considerar integración.

Próxima vertical slice: un ensayo real del piloto retail con dos rutas para votar, dos métodos, verificación de dos casos y una decisión firmada; registrar duración e incidentes antes de abrir la puerta de publicación.
