# MVP Quality Checklist

## Usuario y problema

- [ ] El usuario inicial es profesor o creador de cursos de ciencia de datos.
- [ ] El problema describe tiempo, fragmentación y calidad pedagógica.
- [ ] El resultado es un paquete educativo revisable.
- [ ] Hay una métrica de uso y una de calidad.

## Alcance

- [ ] La funcionalidad principal es transformar un concepto en material educativo.
- [ ] Aprender, Ejercitar y Enseñar en vivo están definidos y separados por contenido.
- [ ] La cobertura publicada contiene exactamente trece niveles; Niveles 5, 11, 12 y 13 aparecen una sola vez y sus cifras derivan de manifests aprobados.
- [ ] LMS, cuentas, seguimiento e integraciones están fuera.
- [ ] No se construye app antes de validar documentos.

## Vertical slice

- [ ] Usuario: profesor de introducción a ciencia de datos.
- [ ] Entrada: concepto, nivel, contexto y duración.
- [ ] Flujo: ConceptSpec -> tres modos -> evals.
- [ ] Salida: 236 conceptos, 454 ejercicios, 708 prompts y 63 bloques.
- [ ] Prueba manual definida.
- [ ] Definition of Done verificable.
- [ ] No objetivos específicos de la slice.

## Viabilidad

- [ ] Usa snapshots públicos no sensibles con licencia; En vivo siempre usa snapshot real como fuente principal.
- [ ] Ejercitar usa storytelling aplicado y evidencia animada antes de responder.
- [ ] La continuidad narrativa puede validarse con archivos y revisión manual, sin backend.
- [ ] La publicación automática incluye únicamente paquetes aprobados.
- [ ] Puede ejecutarse con Markdown y revisión manual.
- [ ] No requiere backend, login, pagos o APIs.
- [ ] La revisión humana está indicada.

## Fallar si

- Se propone plataforma educativa completa.
- Se promete generar un curso entero con calidad uniforme.
- Se agregan conceptos sin dos ejercicios, feedback y validación individual.
- Se exige código para demostrar el valor documental.
