# Pipeline documental de DataClass Forge

Este documento define el orden obligatorio para producir o reformular un nivel.
La regla central es:

```text
temario predeterminado -> historia independiente -> nivel educativo -> validación -> publicación
```

La historia no se improvisa dentro del HTML. Se escribe, revisa y aprueba antes
de convertirla en módulos, ejercicios o interfaces.

La ruta actual tiene doce posiciones curriculares, todas con temario canónico,
historia aprobada y nivel educativo publicado. Nivel 5 produce el dataset
confiable antes del modelado; Nivel 11 produce el producto operable antes de
operación y monitoreo. Los doce manifests deben pasar el mismo gate.

## Fuentes de verdad

| Decisión | Fuente canónica | Qué no debe decidirla |
| --- | --- | --- |
| Misión y usuario | `IDEA.md`, `docs/PRODUCT_BRIEF.md` y `docs/PRD.md` | La historia o la interfaz |
| Conceptos, orden y prerrequisitos | `docs/CURRICULUM_MAP.md` | Los chistes, personajes o visuales |
| Mundo, voces y crecimiento | `docs/COURSE_STORY_BIBLE.md` | Cada nivel por separado |
| Historia de un nivel | `docs/stories/LEVEL_<N>.md` | El archivo JavaScript generado |
| Estado acumulado | `docs/CONTINUITY_LEDGER.md` | La memoria del autor |
| Diseño pedagógico | `ConceptSpec`, `LearningModule` y `PracticeExercise` | La estética de la página |
| Implementación estática | `generated/<paquete>/` | El documento curricular |
| Criterio de aceptación | `evals/` y `scripts/validate_content.py` | Una revisión visual aislada |

## Orden de producción

Para cada nivel continuo, el orden bloqueante es:

```text
Curriculum Map → LevelStory aprobada → VisualizationSpec → ConceptSpec
→ LearningModule / PracticeExercise / LiveTeachingPack
→ revisión técnica y narrativa → level-shell-v1
→ revisión visual interactiva → evaluación pedagógica → publicación
```

`VisualizationSpec` debe resolverse antes de escribir Aprender o Ejercitar. Un
`kind` sin renderer, un tema ausente del lateral o un concepto ausente de la
franja superior detienen la generación.

### 0. Preparar el encargo

1. Leer `AGENTS.md` e `IDEA.md`.
2. Identificar usuario, nivel, duración y resultado de aprendizaje.
3. Registrar los supuestos razonables y los no objetivos.
4. Actualizar, si la decisión lo requiere, Product Brief y PRD.

**Salida:** alcance claro. Todavía no se escribe la historia ni el nivel.

### 1. Congelar el temario predeterminado

1. Leer `docs/CURRICULUM_MAP.md`.
2. Copiar al encabezado de la historia los bloques, conceptos, orden,
   prerrequisitos y resultados esperados del nivel.
3. Asignar un objetivo principal de ciencia de datos a cada escena.
4. Asignar como máximo una competencia auxiliar de agentes a cada episodio.

La narrativa puede volver comprensible un concepto, pero no puede sustituirlo,
renombrarlo de manera engañosa ni adelantar uno de otro nivel.

**Puerta curricular:** cada concepto del temario aparece una vez como objetivo
principal y ninguno se añadió por conveniencia narrativa.

### 2. Escribir la historia del nivel por separado

1. Crear `docs/stories/LEVEL_<N>.md` desde
   `templates/level_story.template.md`.
2. Consultar Story Bible, tarjetas de personaje, arco y ledger.
3. Definir episodios y escenas antes de redactar el diálogo.
4. Separar en cada escena:
   - situación del negocio;
   - diálogo de personajes;
   - subtítulo inicial del narrador;
   - subtítulo de conclusión del narrador;
   - evidencia y cambio de continuidad;
   - incidente distinto para Ejercitar.
5. Revisar voz, precisión técnica, privacidad y estado del dataset.

El narrador no es un personaje en cuadro. Todo lo que diga se representa como
subtítulo. Don Juan solo habla desde el negocio y conserva lenguaje cotidiano;
Paco habla como hijo, ayudante y estudiante de preparatoria.

**Puerta narrativa:** la historia está marcada como `aprobada`, cada diálogo es
atribuible sin ver el nombre y el ledger puede actualizarse sin contradicciones.

### 3. Diseñar el nivel educativo

Solo después de aprobar la historia:

1. Crear o actualizar una `ConceptSpec` por concepto.
2. Diseñar Aprender con la escena y evidencia correspondientes.
3. Diseñar Ejercitar dentro del mismo mundo, pero con un incidente y evidencia
   nuevos; no repetir la respuesta de Aprender.
4. Preparar En vivo como material docente, con snapshot público real y
   procedencia cuando aplique.
5. Mantener trazabilidad a `curriculum_source`, `story_source`, episodio y
   versión del dataset.

**Puerta pedagógica:** objetivo, visual, interacción, pregunta, distractores y
feedback apuntan al mismo mecanismo.

### 4. Implementar el nivel

La implementación es una proyección de los documentos aprobados:

1. Construir los archivos estáticos en `generated/<paquete>/`.
2. Renderizar el narrador en una banda de subtítulos; no en globo de diálogo,
   tarjeta de personaje ni párrafo doctrinal.
3. Conservar la progresión `pedidos_crudos -> esquema -> reporte_de_calidad ->
   pedidos_preparados` o el estado canónico definido para el nivel.
4. Registrar las fuentes en el manifest:
   `curriculum_source`, `story_source` y `story_status`.
5. No incorporar llamadas a IA, credenciales o backend en el laboratorio.

**Puerta de implementación:** el contenido renderizado coincide con la historia
aprobada y la interfaz no otorga conocimiento técnico a Don Juan.

### 5. Validar y corregir la raíz

Ejecutar, en este orden:

```powershell
python scripts/validate_content.py
python scripts/build_pages.py
python scripts/qa_pages.py
```

Además, revisar manualmente:

1. Ocultar los nombres del diálogo y reconocer quién habla.
2. Recorrer todas las escenas declaradas por el manifest sin saltos de continuidad.
3. Confirmar que cada intervención del narrador aparece como subtítulo.
4. Comprobar que Ejercitar exige mirar evidencia nueva.
5. Verificar ninguna dimensión en 1 y promedio mínimo de 4 en `evals/rubric.md`.

Si falla una validación, se corrige la fuente más temprana responsable y se
propaga el cambio. Por ejemplo: un concepto adelantado se corrige en la historia,
no se disimula cambiando solamente el HTML.

### 6. Publicar

1. Marcar el manifest como publicable solo después de superar las puertas.
2. Ejecutar el build de `_site`.
3. Verificar rutas, navegación, teclado, movimiento reducido y ausencia de
   errores de consola.
4. Registrar el resultado en `docs/VALIDATION_REPORT.md`.

## Estados permitidos

| Artefacto | Estados | Condición para avanzar |
| --- | --- | --- |
| Temario del nivel | `canónico` | Conceptos y resultados trazables |
| Historia del nivel | `borrador`, `en revisión`, `aprobada` | Solo `aprobada` habilita diseñar el nivel |
| Nivel educativo | `diseño`, `validación`, `publicable` | Solo `publicable` habilita publicación |

## Definition of Done de un nivel

- el temario predeterminado sigue siendo la fuente curricular;
- existe una historia independiente aprobada;
- las escenas cubren todos los conceptos y ninguna enseña demasiado pronto;
- las voces y relaciones cumplen la Story Bible;
- el narrador solo se representa mediante subtítulos;
- Aprender y Ejercitar comparten mundo, pero no evidencia ni respuesta;
- dataset, esquema, reporte y preparación evolucionan sin reinicios;
- el manifest conserva trazabilidad;
- los validadores pasan, el promedio es al menos 4 y no hay dimensiones en 1;
- el reporte incluye supuestos, riesgos y próxima vertical slice.

## No objetivos

- convertir la historia en la fuente del currículo;
- escribir doce niveles en una sola ejecución;
- crear un LMS o backend;
- usar personajes para reemplazar precisión técnica;
- publicar una implementación cuya historia aún esté en borrador.
