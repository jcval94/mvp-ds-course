---
name: practice-exercise-designer
description: Crea ejercicios y casos de ciencia de datos que requieren observar o manipular evidencia visual, con distractores plausibles, pistas y feedback específico. Usar para modo Ejercitar, quizzes aplicados, casos narrativos o decisiones basadas en datos.
---

# Practice Exercise Designer

1. Tomar objetivo, visual y errores comunes de la `ConceptSpec`.
2. Elegir un contexto breve con protagonista, presión realista y una decisión auténtica.
3. Desde Nivel 2, producir dos ejercicios: uno guiado y otro de transferencia.
4. Definir rol, historia, evidencia y secuencia animada de uno a tres pasos.
5. Hacer que cada respuesta dependa del visual y de la evidencia revelada por la animación.
6. Declarar `evidenceContract` con `requiredSteps`, `requiredEvidenceIds` y
   `unlockAtStep`.
7. Crear una respuesta correcta defendible.
8. Convertir errores comunes en distractores plausibles.
9. Escribir feedback específico para cada respuesta.
10. Añadir pistas graduadas y una conclusión transferible.

La historia debe sonar como un problema real de profesión o negocio: una hoja de
cálculo que no escala, una tienda que debe elegir horario, un equipo que prioriza
revisiones, un gerente que evita una mala conclusión. El dramatismo sirve a la
decisión; no debe permitir adivinar la respuesta sin mirar datos.

Cada ejercicio debe declarar `practiceStory` con protagonista, contexto,
problema, tensión, decisión, escenas animadas, evidencia requerida y cierre.
La UI debe poder bloquear la respuesta hasta que la evidencia visual se haya
revelado.

No usar distractores absurdos, adivinanzas ni conclusiones más fuertes que la evidencia.

Rechazar si ocultar la visualización no cambia la dificultad de cualquiera de
los dos ejercicios, si la animación solo cambia estilo, si la historia resuelve
la respuesta por pistas narrativas o si el feedback solo dice correcto/incorrecto.
Rechazar también si la UI puede habilitar respuestas antes de completar el
contrato o si un `evidenceId` requerido no corresponde a una marca visible.
