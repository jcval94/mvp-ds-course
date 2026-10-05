# Codex Workflow

## Crear o reescribir un caso

Usa siempre `.codex/skills/create-narrative-case/SKILL.md`.

1. Define el concepto de datos y la decision que debe cambiar.
2. Completa el story spine corto.
3. Elige tres o cuatro personajes con posturas distintas.
4. Escribe primero la conversacion completa, sin explicaciones tecnicas.
5. Verifica que cada linea conteste a la anterior.
6. Haz escalar la mala logica mediante consecuencias concretas.
7. Inserta la grafica cuando una persona necesite comprobar algo.
8. Agrega una sola pausa educativa sin opciones.
9. Explica la lectura en palabras normales y nombra la tecnica al final.
10. Cierra con decision, remate unico y regla.
11. Genera el HTML lineal desde Markdown.
12. Valida caso, HTML, YAML y coleccion.
13. Regenera el sitio de GitHub Pages desde la coleccion canonica.

## Comandos

```powershell
python tools/render_case_html.py examples/cases/NN_caso.md examples/html/NN_caso.html
python tools/validate_case_structure.py examples/cases/NN_caso.md
python tools/validate_case_structure.py --collection (Get-ChildItem examples/cases/*.md)
python tools/audit_story_language.py --collection (Get-ChildItem examples/cases/*.md)
python tools/validate_html_story.py examples/html/NN_caso.html
python tools/validate_html_story.py --collection (Get-ChildItem examples/html/*.html)
python tools/build_pages_site.py
python -m pytest
```

## Regla de parada

Reescribe si una linea suena como documento, si el chiste depende de una
muletilla, si la grafica parece tarea escolar o si al terminar nadie recuerda
que decision absurda produjo el dato.
