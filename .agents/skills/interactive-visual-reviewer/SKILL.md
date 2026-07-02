---
name: interactive-visual-reviewer
description: Prueba visualizaciones educativas renderizadas para verificar mecanismo, datos, animación, evidencia semántica, desbloqueo, responsive y movimiento reducido. Usar después de revisión técnica y antes de evaluación pedagógica.
---

# Interactive Visual Reviewer

1. Leer la `ConceptSpec`, el `PracticeExercise` y su `evidenceContract`.
2. Abrir la experiencia renderizada en navegador.
3. Leer `VisualizationSpec` y confirmar que `visual.kind` representa el mecanismo declarado.
4. Comparar `data-renderer` y las marcas del DOM con el renderer registrado; no aceptar fallback.
5. Verificar cada estado, marca y `evidenceId` contra los datos.
6. Ejecutar la secuencia completa y comprobar `Paso X de N`.
7. Confirmar que la respuesta permanece bloqueada hasta `unlockAtStep`.
8. Revisar fluidez, etiquetas, escalas, solapamientos y responsive.
9. Repetir con `prefers-reduced-motion` y exigir evidencia equivalente.
10. Registrar severidad, concepto, estado, evidencia, impacto y corrección.

Rechazar si el renderer declarado no es el renderizado, si existe fallback o si el renderer es genérico para un mecanismo distinto, si una pregunta
cita evidencia ausente, si la respuesta se habilita antes de tiempo, si la
animación solo cambia estilo, si los números no coinciden con el snapshot o si
el modo de movimiento reducido pierde información.

No aprobar por mera diferencia de HTML, presencia de SVG o ausencia de errores
de consola.
