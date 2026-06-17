# Product Brief

## Nombre

DataClass Forge.

## Resumen ejecutivo

DataClass Forge es una fábrica documental para crear material educativo de ciencia de datos con agentes. Convierte un concepto curricular en tres artefactos relacionados: un módulo para aprender, un ejercicio para practicar y un paquete para enseñar en vivo. El MVP valida calidad pedagógica, precisión técnica y trazabilidad antes de construir una aplicación final.

## Problema

Los docentes y creadores de cursos invierten demasiado tiempo ensamblando explicaciones, visualizaciones, datos, ejercicios y guías. Las salidas generadas sin una arquitectura educativa común suelen ser genéricas, técnicamente frágiles o desconectadas del objetivo de aprendizaje.

## Usuario objetivo

Profesor o creador de cursos que prepara clases introductorias e intermedias de ciencia de datos en español.

El estudiante es beneficiario del material, pero no es el operador principal de la fábrica en el MVP.

## Propuesta de valor

Pasar de un concepto a un paquete educativo coherente y revisable en menos de 20 minutos, con visualización obligatoria, práctica alineada, feedback y guía docente.

## Jobs to Be Done

- Cuando preparo una clase, quiero partir de un objetivo y recibir materiales conectados para no ensamblarlos manualmente.
- Cuando explico un concepto abstracto, quiero una interacción visual que haga observable la idea central.
- Cuando diseño ejercicios, quiero que las preguntas dependan de la evidencia y que el feedback enseñe.
- Cuando uso agentes, quiero contratos y evaluaciones que impidan contenido superficial o técnicamente incorrecto.

## Salidas del producto

1. **Aprender:** objetivo, prerrequisitos, intuición, visualización, explicación progresiva, error común, checkpoint y cierre.
2. **Ejercitar:** historia aplicada distinta de Aprender, protagonista, presión realista, evidencia visual animada, decisión, respuesta esperada, distractores, pistas, feedback y conclusión.
3. **Enseñar en vivo:** contenido docente oculto en la UI estudiantil, guion, snapshot público real, demostración, preguntas socráticas, blueprint de notebook o HTML, evaluación, plan offline y checklist docente.

## MVP recomendado

Una fábrica basada en Markdown, templates, skills y evals que especifica,
valida y publica materiales para un catálogo curricular. La cobertura inicial
aprobada incluye Nivel 1 y Nivel 2 completos.

## Vertical slice publicada

**Usuario:** profesor de introducción a ciencia de datos.

**Entrada:** uno de los 39 conceptos publicados, contexto aplicado y duración de 30 a 90 minutos.

**Flujo principal:**

1. Crear o seleccionar una `ConceptSpec`.
2. Diseñar una explicación visual.
3. Generar módulo, ejercicio y paquete docente.
4. Validar precisión, alineación y dependencia de la evidencia.
5. Entregar artefactos y reporte de calidad.

**Salida:** paquete educativo completo, laboratorio HTML y registro de validación.

**Prueba manual:** un docente recorre los ocho laboratorios, ejecuta la
interacción, resuelve los ejercicios y usa los prompts sin completar secciones.

**Definition of Done:**

- Cada concepto tiene objetivo, prerrequisitos, visual, error común y dataset.
- Los tres modos comparten la misma intención conceptual, pero muestran contenido distinto.
- El ejercicio no puede resolverse correctamente ignorando la visualización.
- Ejercitar cuenta una historia profesional o de negocio y bloquea la respuesta hasta revelar evidencia animada.
- El feedback explica por qué cada opción es correcta o incorrecta.
- El paquete docente incluye snapshot público real, plan offline, criterio de cierre y aviso de que el modo docente oculto no es seguridad real.
- Cada paquete obtiene promedio de 4 o más sin dimensiones en 1.
- La cobertura publicada suma 39 conceptos, 60 ejercicios y 117 prompts.
- Los snapshots públicos registran fuente, licencia, fecha y SHA-256.

**No objetivos de la slice:**

- Construir una app con backend.
- Cubrir todos los niveles curriculares.
- Ejecutar un LLM desde el navegador.
- Gestionar estudiantes o calificaciones.

## Diferenciador

La fábrica no se limita a generar texto. Exige una línea de trazabilidad entre objetivo, visualización, actividad, feedback y evaluación, inspirada en experiencias educativas ricas como los demos de histograma sin convertirlos en una plantilla rígida.

## Supuestos razonables

- El idioma inicial es español.
- Aprender y Ejercitar pueden usar datos didácticos etiquetados cuando convenga; En vivo siempre usa snapshots públicos reales fijos, pequeños y reproducibles.
- El profesor revisa el material antes de usarlo.
- Un concepto puede tener varias experiencias, pero cada entrega persigue un objetivo principal.
- La profundidad pedagógica es más importante que maximizar la cantidad de temas generados.

## No objetivos

- LMS, cuentas, pagos o analítica de estudiantes.
- Personalización adaptativa automática.
- Publicación directa sin revisión.
- Datos sensibles o dependencias externas obligatorias.
- Curso completo generado en una sola solicitud.

## Riesgos

- **Contenido correcto pero superficial:** bloquear módulos sin interacción, error común o checkpoint.
- **Narrativa sin aprendizaje:** exigir protagonista, tensión y decisión, pero bloquear historias que revelan la respuesta sin evidencia.
- **Visualización decorativa:** exigir que una pregunta o experimento dependa de ella.
- **Temario demasiado amplio:** publicar por niveles completos y exigir el mismo
  gate por concepto.
- **Inconsistencia entre modos:** compartir una `ConceptSpec` y validar trazabilidad.
- **Privacidad docente mal entendida:** declarar que `?teacher=1` oculta la UI, pero no protege contenido como autenticación.
- **Errores técnicos:** incluir revisión disciplinar y fuentes o supuestos cuando corresponda.

## Métricas iniciales

- Tiempo mediano para obtener un paquete revisable: 20 minutos o menos.
- Cobertura de contratos en la vertical slice: 100%.
- Promedio de evaluación pedagógica y técnica: 4 o más.
- Paquetes que requieren reescritura estructural tras revisión docente: menos de 1 de cada 3.

## Criterios de salida

- El PRD puede escribirse sin reabrir el objetivo del producto.
- Existe mapa curricular con prerrequisitos y prioridades.
- La vertical slice es manualmente verificable y solo requiere HTML/JavaScript
  estático; no necesita backend ni una aplicación final.
- Los no objetivos impiden que la fábrica se convierta en una plataforma educativa completa.
