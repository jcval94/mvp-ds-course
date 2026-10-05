# 15 Pages Site Publisher

## Cuándo usarla

Úsala cuando se agregue, quite, renombre o modifique cualquier caso publicado,
o cuando el usuario pida preparar, regenerar, revisar o publicar el sitio de
GitHub Pages.

## Qué hace

Construye la capa pública en `/docs` desde los casos canónicos del laboratorio.
Descubre la colección completa, arma `catalog.json`, asigna tema de ciencia de
datos, genera el índice navegable y crea páginas públicas para cada historia.

## Qué no hace

No edita manualmente `/docs`, no cambia la historia canónica, no reemplaza el
HTML lineal de `examples/html` y no inventa temas si el generador no puede
inferirlos.

## Conexión con las demás skills

Debe ejecutarse después de `13_html_story_renderer` y `14_quality_gatekeeper`.
La skill 13 mantiene el HTML lineal sin navegación. Esta skill crea la
experiencia pública navegable a partir de esa salida validada.

## Cuándo detenerse y pedir revisión

Detente si `tools/build_pages_site.py` falla por tema ambiguo o desconocido,
si falta un archivo hermano en `cases`, `data_specs`, `visual_specs` o `html`,
o si el sitio generado necesita una decisión editorial nueva.

## Entradas necesarias

- Casos en `examples/cases/NN_slug.md`.
- Specs hermanas con el mismo stem en `examples/data_specs`, `examples/visual_specs` y `examples/html`.
- Tema inferible por `TOPIC_RULES` o `TOPIC_OVERRIDES` en `tools/build_pages_site.py`.

## Salida esperada

```markdown
## Sitio regenerado
[/docs/index.html]

## Catálogo
[N] casos, [N] temas

## Validación
- build_pages_site: PASS
- validate_case_structure: PASS
- validate_html_story: PASS
- pytest: PASS
```

## Procedimiento

1. Renderiza el HTML canónico si cambió algún Markdown.
2. Ejecuta `python tools/build_pages_site.py`.
3. Revisa que `/docs/catalog.json` incluya todos los casos esperados.
4. Valida que los filtros y enlaces del índice apunten a páginas existentes.
5. Ejecuta los validadores de casos, HTML y la suite de pruebas.
6. Si un caso futuro no recibe tema, agrega una regla mantenible u override explícito.

## Errores a evitar

- Hardcodear la colección actual de 48 casos.
- Editar tarjetas o páginas de `/docs` a mano.
- Publicar un caso sin `data_spec`, `visual_spec` o HTML canónico.
- Resolver un tema ambiguo cambiando el nombre visible del caso.
- Agregar recursos externos a la página pública.

## Criterios de aceptación

- `/docs` se regenera completo desde fuentes canónicas.
- Cada caso publicado tiene tema, pregunta, lectura correcta y decisión.
- El sitio no depende de internet ni de recursos externos.
- Un caso nuevo aparece en el índice sin tocar HTML a mano.
- Las pruebas de publicación cubren catálogo, enlaces y fallos de sincronía.
