# Product Brief

## Nombre

DataClass Forge.

## Resumen ejecutivo

DataClass Forge es una fábrica documental para crear material educativo de ciencia de datos con agentes. Convierte un concepto curricular en tres artefactos relacionados: un módulo para aprender, un ejercicio para practicar y un paquete para enseñar en vivo. El MVP valida calidad pedagógica, precisión técnica y trazabilidad antes de construir una aplicación final.

Cuando una ruta usa narrativa continua, la fábrica conserva además mundo,
personajes, cronología, conocimientos adquiridos y estado del dataset. Don Juan
y Paco forman el núcleo canónico; los invitados se incorporan solo cuando el
dominio requiere experiencia adicional.

El canon establece a Paco como estudiante de preparatoria e hijo de Don Juan.
Don Juan conserva autoridad exclusiva sobre el negocio y lenguaje cotidiano; el
narrador conserva autoridad exclusiva para introducir y concluir ciencia de datos.
Las relaciones, secretos y crecimiento del puesto evolucionan mediante matrices versionadas.

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
- Cuando construyo una ruta narrativa, quiero mantener voz, continuidad y
  evolución de los datos para que cada nivel parezca parte del mismo curso.

## Salidas del producto

1. **Aprender:** objetivo, prerrequisitos, intuición, visualización, explicación progresiva, error común, checkpoint y cierre.
2. **Ejercitar:** historia aplicada distinta de Aprender, protagonista, presión realista, evidencia visual animada, decisión, respuesta esperada, distractores, pistas, feedback y conclusión.
3. **Enseñar en vivo:** contenido docente oculto en la UI estudiantil, guion, snapshot público real, demostración, preguntas socráticas, blueprint de notebook o HTML, evaluación, plan offline y checklist docente.

Las rutas narrativas añaden cuatro interfaces documentales: `CourseStoryBible`,
`CharacterCard`, `LevelNarrativeArc` y `ContinuityLedger`. Estas interfaces
alimentan los tres modos, pero no sustituyen la `ConceptSpec`.

## MVP recomendado

Una fábrica basada en Markdown, templates, skills y evals que especifica,
valida y publica materiales para un catálogo curricular. La cobertura inicial
aprobada incluye Nivel 1, Nivel 2 y Nivel 3 completos.

## Vertical slice publicada

**Usuario:** profesor de introducción a ciencia de datos.

**Entrada:** uno de los 139 conceptos publicados, contexto aplicado y duración de 30 a 90 minutos.

**Flujo principal:**

1. Crear o seleccionar una `ConceptSpec`.
2. Diseñar una explicación visual.
3. Generar módulo, ejercicio y paquete docente.
4. Validar precisión, alineación y dependencia de la evidencia.
5. Entregar artefactos y reporte de calidad.

**Salida:** paquete educativo completo, laboratorio HTML y registro de validación.

**Prueba manual:** un docente recorre los 35 laboratorios, ejecuta la
interacción, resuelve los ejercicios y usa los prompts sin completar secciones.

**Definition of Done:**

- Cada concepto tiene objetivo, prerrequisitos, visual, error común y dataset.
- Cada episodio narrativo referencia su arco, respeta las fichas de personaje y
  registra cambios de continuidad, estado del dataset y crecimiento del puesto.
- Los tres modos comparten la misma intención conceptual, pero muestran contenido distinto.
- Aprender y Ejercitar pueden compartir mundo y personajes, pero no reutilizan
  el mismo incidente, evidencia ni resolución.
- El ejercicio no puede resolverse correctamente ignorando la visualización.
- Ejercitar cuenta una historia profesional o de negocio y bloquea la respuesta hasta revelar evidencia animada.
- Cada visual declara su mecanismo, estados, marcas semánticas y alternativa con movimiento reducido.
- Las respuestas solo se habilitan cuando se visitaron los estados y evidencias exigidos por el ejercicio.
- El feedback explica por qué cada opción es correcta o incorrecta.
- El paquete docente incluye snapshot público real, plan offline, criterio de cierre y aviso de que el modo docente oculto no es seguridad real.
- Cada paquete obtiene promedio de 4 o más sin dimensiones en 1.
- La cobertura publicada suma 139 conceptos, 260 ejercicios y 417 prompts.
- Los snapshots públicos registran fuente, licencia, fecha y SHA-256.

**No objetivos de la slice:**

- Construir una app con backend.
- Cubrir todos los niveles curriculares.
- Ejecutar un LLM desde el navegador.
- Gestionar estudiantes o calificaciones.

## Diferenciador

La fábrica no se limita a generar texto. Exige una línea de trazabilidad entre objetivo, visualización, actividad, feedback y evaluación, inspirada en experiencias educativas ricas como los demos de histograma sin convertirlos en una plantilla rígida.

Su segundo diferenciador es enseñar a trabajar con agentes de forma acumulativa:
esquemas y skills verificables en fundamentos; parámetros, incertidumbre,
pipelines, evals, revisión humana, versionado y auditoría en niveles posteriores.
Esta competencia siempre es auxiliar al objetivo principal de ciencia de datos.

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
- **Pérdida de voz o continuidad:** validar lo que cada personaje puede saber,
  cómo habla, qué ocurrió antes y qué datos existen en ese momento.
- **Metáfora forzada:** incorporar invitados o cambiar de contexto cuando la
  taquería no pueda sostener el concepto con credibilidad.
- **Agentes como distracción:** limitar cada episodio a una competencia auxiliar
  y exigir que no desplace el objetivo de ciencia de datos.
- **Visualización decorativa:** exigir que una pregunta o experimento dependa de ella.
- **Visualización genérica reciclada:** bloquear representaciones que no hagan visible el mecanismo específico del concepto.
- **Experiencia inconsistente entre niveles:** exigir `level-shell-v1` y validar
  temas laterales, conceptos superiores, responsive y modo docente.
- **Cambio visual sin evidencia:** validar identificadores semánticos, secuencia y desbloqueo; no basta comparar HTML antes y después.
- **Temario demasiado amplio:** publicar por niveles completos y exigir el mismo
  gate por concepto.
- **Inconsistencia entre modos:** compartir una `ConceptSpec` y validar trazabilidad.
- **Privacidad docente mal entendida:** declarar que `?teacher=1` oculta la UI, pero no protege contenido como autenticación.
- **Errores técnicos:** incluir revisión disciplinar y fuentes o supuestos cuando corresponda.

## Métricas iniciales

- Tiempo mediano para obtener un paquete revisable: 20 minutos o menos.
- Cobertura de contratos en la vertical slice: 100%.
- Cobertura `VisualizationSpec`→renderer y `level-shell-v1`: 100%.
- Promedio de evaluación pedagógica y técnica: 4 o más.
- Paquetes que requieren reescritura estructural tras revisión docente: menos de 1 de cada 3.

## Criterios de salida

- El PRD puede escribirse sin reabrir el objetivo del producto.
- Existe mapa curricular con prerrequisitos y prioridades.
- La vertical slice es manualmente verificable y solo requiere HTML/JavaScript
  estático; no necesita backend ni una aplicación final.
- Los no objetivos impiden que la fábrica se convierta en una plataforma educativa completa.
