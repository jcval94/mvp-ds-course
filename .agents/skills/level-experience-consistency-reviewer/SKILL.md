---
name: level-experience-consistency-reviewer
description: Valida que niveles educativos renderizados compartan el contrato level-shell-v1 con bloques a la izquierda, conceptos nombrados arriba, contenido central, panel docente, navegación, accesibilidad y responsive. Usar al crear, regenerar o revisar cualquier nivel antes de la revisión visual interactiva.
---

# Revisor de consistencia entre niveles

1. Leer manifest, temario y `references/level-shell-v1.md`.
2. Enumerar todos los bloques y conceptos en orden canónico.
3. Abrir una ruta por bloque y confirmar que el lateral contiene bloques, nunca conceptos.
4. Confirmar que la franja superior contiene los conceptos nombrados del bloque activo.
5. Verificar estado activo, `?concept=`, anterior/siguiente, HOME y foco de teclado.
6. Comprobar que `En vivo` no existe en la superficie estudiantil salvo con `?teacher=1`.
7. Repetir en 1440 px y 390 px; en móvil exigir dos franjas horizontales sin desbordar la página.
8. Registrar nivel, ruta, incumplimiento, evidencia y corrección.

Rechazar si falta un bloque o concepto, si un concepto aparece en el lateral, si la
estructura cambia entre niveles, si el estado activo no coincide con la URL, si
hay desbordamiento de página o si el modo docente es visible por defecto.

No aprobar por mera presencia de clases CSS: comprobar el DOM y la experiencia
renderizada. Ejecutar antes de `interactive-visual-reviewer`.
