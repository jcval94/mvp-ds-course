---
name: live-teaching-pack-builder
description: Prepara paquetes reproducibles para enseñar conceptos de ciencia de datos en vivo, con guion, dataset, demo, preguntas, evaluación, notebook o HTML, prompts, checklists y plan offline. Usar para clases, talleres, demos docentes o modo Enseñar en vivo.
---

# Live Teaching Pack Builder

Usar `ConceptSpec`, `LearningModule` y `PracticeExercise`.

Producir:

- objetivo, audiencia, duración y prerrequisitos;
- guion minuto a minuto;
- snapshot público real local con esquema, procedencia, licencia, fecha,
  dimensiones y SHA-256;
- demostración visual y experimento;
- preguntas socráticas y errores anticipados;
- evaluación rápida y cierre;
- blueprint de notebook o demo HTML;
- prompt para Codex que modifique o verifique código reproducible;
- prompts para Gemini y ChatGPT que faciliten, critiquen e interpreten;
- protocolo de verificación humana y privacidad;
- checklist antes y durante la clase;
- plan offline sin IA ni red.

El paquete En vivo es contenido del docente. En sitios estáticos puede ocultarse
con un modo docente (`?teacher=1`, atajo o archivo separado), pero debe aclarar
que eso no es seguridad real. No debe mostrarse como pestaña estudiantil visible.

El dataset principal de En vivo no puede ser sintético. Los datos sintéticos solo
pueden aparecer como plan B etiquetado, nunca como fuente de la clase.

El paquete debe ser impartible por otro docente con ajustes menores.

Rechazar si el HTML depende de servicios externos, si Codex y Gemini/ChatGPT
tienen roles indistinguibles, si carece de contingencia, si usa datos sintéticos
como fuente principal o si deja datos, feedback o cierre para completar después.
