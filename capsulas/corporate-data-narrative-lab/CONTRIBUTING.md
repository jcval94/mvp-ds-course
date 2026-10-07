# Contributing

Lee primero:

- [ABSURD_OFFICE_COMEDY_DATA_STANDARD.md](ABSURD_OFFICE_COMEDY_DATA_STANDARD.md)
- [HUMOR_GUIDE.md](HUMOR_GUIDE.md)
- [DATA_VISUAL_EVIDENCE_GUIDE.md](DATA_VISUAL_EVIDENCE_GUIDE.md)
- [CASE_RUBRIC.md](CASE_RUBRIC.md)
- [CODEX_WORKFLOW.md](CODEX_WORKFLOW.md)

## Reglas

- Completa el story spine corto.
- Abre con diálogo contextualizado.
- Usa `> **Personaje:** "Línea."` en cada intervención.
- Escribe 3-5 escenas y 400-750 palabras.
- Asegura que cada respuesta conteste la anterior.
- Escala la mala lógica antes de mostrar datos.
- Integra exactamente un SVG y una pausa `<!-- learning:pause -->`.
- Explica primero en lenguaje humano.
- Usa un remate principal único en la colección.
- Mantén datos y visual specs con la misma numeración.
- Genera HTML desde Markdown; no lo edites como una historia distinta.

## Validación

```powershell
$cases = Get-ChildItem examples/cases/*.md | ForEach-Object FullName
$html = Get-ChildItem examples/html/*.html | ForEach-Object FullName
python tools/validate_case_structure.py --collection $cases
python tools/validate_html_story.py --collection $html
python -m pytest
```
