# Corporate Data Narrative Lab

Repositorio para crear historias breves de oficina que dan risa porque podrían
haber ocurrido y enseñan un concepto de datos mediante una gráfica.

**No crea dashboards. Crea conversaciones con evidencia.**

## Contrato

Todo caso sigue
[ABSURD_OFFICE_COMEDY_DATA_STANDARD.md](ABSURD_OFFICE_COMEDY_DATA_STANDARD.md).

- Markdown es la fuente canónica.
- Cada historia dura aproximadamente 3-5 minutos.
- Tiene 3-5 escenas y más diálogo que narración.
- Cada intervención identifica al personaje.
- La comedia nace de una mala lógica corporativa que escala.
- Incluye exactamente una gráfica SVG y una pausa educativa natural.
- Termina con decisión, remate propio y regla transferible.
- El HTML canónico es una lectura lineal del Markdown, sin JavaScript ni dependencias.

## Colección

`examples/` contiene la colección canónica de casos. Cada número tiene:

- `cases/NN_*.md`: historia canónica con SVG;
- `data_specs/NN_*.yml`: contrato de datos sintéticos;
- `visual_specs/NN_*.yml`: pregunta y lectura de la gráfica;
- `html/NN_*.html`: vista lineal generada.

El sitio público se genera en `../docs/` desde esos archivos. No edites `../docs/`
a mano: cambia las fuentes canónicas y vuelve a ejecutar el generador.

## Crear, publicar y validar

```powershell
python tools/render_case_html.py examples/cases/01_dashboard_que_bajo_quejas_cerrando_boton.md examples/html/01_dashboard_que_bajo_quejas_cerrando_boton.html
$cases = Get-ChildItem examples/cases/*.md | ForEach-Object FullName
$html = Get-ChildItem examples/html/*.html | ForEach-Object FullName
python tools/validate_case_structure.py --collection $cases
python tools/audit_story_language.py --collection $cases
python tools/validate_html_story.py --collection $html
python tools/build_pages_site.py
python -m pytest
```

Para GitHub Pages, configura la rama principal con carpeta `/docs`.

## Documentos

- `DATA_SCIENCE_CURRICULUM.md`: cobertura analítica.
- `NARRATIVE_PRINCIPLES.md`: construcción de escena.
- `HUMOR_GUIDE.md`: ritmo y lenguaje.
- `DATA_VISUAL_EVIDENCE_GUIDE.md`: gráfica como prueba.
- `CASE_RUBRIC.md`: criterios de aceptación.
- `CODEX_WORKFLOW.md`: proceso de generación.
- `.codex/skills/`: responsabilidades operativas.

La técnica mínima suficiente manda. Si una tasa responde la pregunta, no
construyas un modelo. Si el comportamiento se adapta, no finjas que una tasa
estática basta.
