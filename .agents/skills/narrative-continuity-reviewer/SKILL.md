---
name: narrative-continuity-reviewer
description: Revisa historias educativas continuas para detectar deriva de voz, relación familiar inconsistente, cronología rota, conocimiento prematuro, subtítulos incorrectos, invitados sin autoridad, secretos revelados, crecimiento mágico, inconsistencias del dataset y repetición entre Aprender y Ejercitar. Usar antes de aprobar cualquier historia, episodio, nivel o revisión con Story Bible y ContinuityLedger.
---

# Narrative Continuity Reviewer

1. Leer currículo, Story Bible, fichas, matrices de relación y crecimiento,
   arco, `LevelStory`, ledger, `ConceptSpec` y episodios.
2. Verificar el orden `temario -> historia independiente -> nivel` y bloquear si
   la historia falta, sigue en borrador o fue reconstruida desde la implementación.
3. Construir una tabla de control con personaje, relación, conocimiento, voz,
   autoridad, secreto, versión del dataset y estado del puesto.
4. Aplicar la prueba de voz ciega y una prueba específica: ninguna intervención
   de Don Juan puede introducir o concluir ciencia de datos.
5. Verificar que Paco conserve voz de hijo y estudiante, horario escolar y
   conocimiento limitado a lo ya presentado por el narrador.
6. Confirmar que cada definición y conclusión técnica pertenece al narrador y
   está especificada como subtítulo inicial o de evidencia, no como diálogo.
7. Confirmar que Lupita y Beto no se conviertan en mediadora o mano de obra por defecto.
8. Verificar que cada invitado actúe dentro de su profesión y que ningún secreto
   se revele antes de su ventana ni se infiera desde datos.
9. Contrastar cronología, conteos, columnas y transformaciones contra el ledger.
10. Contrastar formato, asientos, equipo, horario, plantilla y volumen contra la
    matriz de crecimiento; exigir una condición de negocio para cada cambio.
11. Confirmar que Aprender y Ejercitar compartan mundo, pero no incidente,
    evidencia, pregunta ni resolución.
12. Reportar severidad, evidencia, regla rota, impacto y corrección raíz.
13. Aprobar la `LevelStory` y los tres deltas solo cuando no haya bloqueos.

Bloquear si se rompe el pipeline, una relación, voz o horario; Don Juan habla
como analista; Paco anticipa conceptos; el narrador no es subtítulo; un invitado
excede autoridad; un secreto aparece en el dataset; el puesto crece mágicamente;
falta un delta o los modos repiten el caso.
