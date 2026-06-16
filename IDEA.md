# IDEA.md

## Nombre provisional

DataClass Forge.

## Idea en una frase

Una fábrica documental asistida por agentes que transforma un concepto de ciencia de datos en material educativo visual, ejercicios con feedback y un paquete listo para enseñar.

## Problema que resuelve

Crear una lección de ciencia de datos de buena calidad exige coordinar objetivos, prerrequisitos, explicación conceptual, datos, visualizaciones, interacción, ejercicios, retroalimentación y guía docente. Hoy ese trabajo suele quedar fragmentado, depender demasiado de la improvisación o producir materiales correctos técnicamente pero débiles pedagógicamente.

## Usuario objetivo

Profesor o creador de cursos que prepara material introductorio e intermedio de ciencia de datos en español.

Usuarios secundarios:

- Instructor que imparte talleres en vivo.
- Mentor que diseña prácticas guiadas.
- Estudiante autónomo que usa los materiales ya generados.

## Resultado esperado

El usuario selecciona un concepto, nivel, contexto y tipo de experiencia, y obtiene un paquete coherente con:

- módulo explicativo visual;
- ejercicio interactivo con feedback;
- guía docente o paquete de enseñanza en vivo;
- snapshot público con fuente y licencia, o dataset sintético etiquetado cuando no exista una alternativa adecuada;
- prompts y blueprint de notebook o demo.

## Señal de éxito inicial

- Un docente puede generar y revisar una lección utilizable en menos de 20 minutos.
- Treinta y nueve conceptos y sesenta ejercicios publicados pasan las evaluaciones pedagógicas con promedio de 4 o más.
- Los resultados validados se reconstruyen y publican automáticamente en GitHub Pages al actualizar `main`.
- Un revisor puede rastrear cada actividad hasta un objetivo de aprendizaje y un error común.

## Contexto

El repositorio nació como una fábrica genérica de documentación para MVPs. Se reenfoca como una fábrica especializada en material educativo de ciencia de datos.

Los archivos `concepro_histograma.html` y `ejercicios_histograma.html` son referencias de inspiración para el nivel de profundidad esperado. Sus patrones valiosos son:

- construcción visual paso a paso;
- manipulación de parámetros como bins;
- comparación entre distribuciones;
- narrativa aplicada a un problema;
- preguntas que requieren observar la visualización;
- distractores plausibles y feedback específico;
- progresión desde lectura básica hasta decisión basada en evidencia.

No deben copiarse como plantilla universal ni limitar el producto a histogramas.

## Plataforma deseada

El repositorio mantiene Markdown como fuente documental para operar con agentes y
publica una vista estática de resultados mediante GitHub Pages. Los laboratorios
son HTML autocontenido sin backend ni ejecución de modelos.

## Entrada y salida esperadas

Entrada:

- concepto o bloque curricular;
- nivel: principiante, intermedio o avanzado;
- contexto de aplicación;
- duración objetivo;
- modo: Aprender, Ejercitar o Enseñar en vivo;
- restricciones técnicas o docentes.

Salida:

- `ConceptSpec` validada;
- `LearningModule`;
- `PracticeExercise`;
- `LiveTeachingPack`;
- evidencias de evaluación pedagógica y técnica.

## Restricciones

- Todo contenido debe estar enfocado en ciencia de datos.
- El material debe preferir snapshots públicos no sensibles con fuente, licencia,
  fecha y hash; puede usar datos sintéticos etiquetados cuando aporten claridad o
  no exista una fuente pública adecuada.
- Cada concepto debe tener una representación visual o justificar por qué no aplica.
- No se requieren backend, login, pagos ni LMS para validar el MVP.
- No se ejecutan modelos de IA dentro de una futura app local en la primera versión.
- Los agentes deben documentar supuestos y separar contenido validado de sugerencias.
- La precisión técnica y la claridad pedagógica son bloqueantes.

## Inspiraciones

- `concepro_histograma.html`: progresión visual e interacción con la representación.
- `ejercicios_histograma.html`: casos narrativos, evidencia, decisiones y feedback.
- Notebooks educativos: reproducibilidad y experimentación.
- Guías docentes: objetivos, tiempos, preguntas y errores anticipados.

## Lo que NO debe incluir el MVP

- Un LMS.
- Gestión de usuarios, cursos o calificaciones.
- Generación ilimitada de un curso completo en una sola ejecución.
- Ejecución de OpenAI, Gemini, Claude u otros servicios desde los HTML.
- Entrenamiento de modelos propios.
- Evaluación automatizada de estudiantes con consecuencias académicas.
- Cobertura profunda de todo el temario completo.

## Preguntas abiertas

- Qué formato secundario conviene priorizar después de HTML: notebook o paquete imprimible.
- Qué bloque de Nivel 3 debe convertirse en la siguiente referencia.
- Qué revisión humana debe exigirse antes de publicar material generado.

## Decisiones bloqueantes conocidas

Ninguna. Nivel 1 y Nivel 2 pueden publicarse con español como idioma principal,
revisión humana y snapshots públicos fijos.

## Supuestos permitidos

- Priorizar al profesor o creador de cursos cuando haya conflicto entre usuarios.
- Asumir estudiantes principiantes si el nivel no se especifica.
- Elegir snapshots públicos pequeños y explicables; usar sintéticos solo como
  apoyo explícitamente etiquetado.
- Reducir cada entrega a un objetivo de aprendizaje principal.
- Usar visualizaciones interactivas cuando la interacción ayude a revelar el concepto.
- Mover integraciones, persistencia y personalización adaptativa a post-MVP.

## Nivel de incertidumbre aceptado

Medio: el agente puede inferir contextos, datasets, métricas no críticas y ejemplos, pero no puede inventar precisión técnica ni omitir revisión humana.
