---
name: practice-exercise-designer
description: Crea ejercicios narrativos de ciencia de datos que requieren observar o manipular evidencia visual, con continuidad desde una LevelStory aprobada, distractores plausibles, pistas y feedback específico. Usar para modo Ejercitar, quizzes aplicados o decisiones basadas en datos.
---

# Practice Exercise Designer

1. Tomar objetivo, visual y errores comunes de la `ConceptSpec`.
2. Si hay continuidad, cargar Story Bible, `LevelStory` aprobada, escena, arco y ledger después de Aprender.
3. Usar el incidente de práctica definido en la historia: mismo mundo, evidencia
   y decisión nuevas. No improvisar el caso desde el HTML.
4. Desde Nivel 2, producir un ejercicio guiado y otro de transferencia.
5. Definir historia, evidencia y secuencia animada de uno a tres pasos.
6. Declarar `evidenceContract` con `requiredSteps`, `requiredEvidenceIds` y `unlockAtStep`.
7. Crear una respuesta defendible y convertir errores comunes en distractores.
8. Escribir feedback específico, pistas graduadas y cierre transferible.
9. Mostrar cualquier definición o conclusión del narrador como subtítulo
   accesible; no usarla para revelar la respuesta antes de la evidencia.
10. Registrar `continuityDelta` y `dataStateDelta` sin resolver el próximo episodio.

La historia debe sonar real, respetar las fichas y perder sentido si se oculta
la evidencia. No reutilizar el incidente, pregunta o resolución de Aprender.

Rechazar si falta historia aprobada; la historia revela la respuesta; rompe una
voz; adelanta conocimiento; cambia datos sin delta; el narrador aparece como
personaje; la animación solo cambia estilo; la UI desbloquea antes de tiempo o
el feedback solo evalúa.
