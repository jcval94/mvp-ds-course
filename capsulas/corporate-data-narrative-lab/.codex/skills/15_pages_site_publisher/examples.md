# Example

Cuando se agrega `examples/cases/49_nuevo_caso.md`, primero genera su HTML
canónico:

```powershell
python tools/render_case_html.py examples/cases/49_nuevo_caso.md examples/html/49_nuevo_caso.html
```

Después regenera el sitio:

```powershell
python tools/build_pages_site.py
python -m pytest
```

Resultado esperado: `/docs/index.html` muestra el caso 49, `/docs/cases/49_nuevo_caso.html`
existe y `catalog.json` incluye su tema. Si el tema no puede inferirse, agrega
una regla a `TOPIC_RULES` o un override a `TOPIC_OVERRIDES`.
