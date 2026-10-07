---
name: create-narrative-case
description: Crea, reescribe o audita historias canónicas de ciencia de datos en examples, incluyendo Markdown, especificaciones YAML, SVG, HTML y publicación en Pages. Usar siempre que se agreguen, modifiquen o revisen casos narrativos del repositorio.
---

# Crear un caso narrativo

Usar este flujo completo como contrato único. Consultar las skills numeradas
solo cuando el paso indique una revisión especializada; no ejecutarlas como una
cadena ceremonial.

## Flujo obligatorio

1. Leer `DATA_SCIENCE_CURRICULUM.md` y elegir la técnica mínima suficiente con
   `00_curriculum_mapper`.
2. Definir tesis, presión real, mala decisión, dato que la contradice, decisión
   corregida y remate. Aplicar `01`, `02` y `03` como una sola fase de diseño.
3. Preparar datos sintéticos mínimos, visual SVG y specs con `04` y `05`.
4. Escribir primero el diálogo. Usar narración solo para acciones, consecuencias
   o saltos de tiempo. Aplicar juntas las reglas de `06`, `07` y `08`.
5. Leer el diálogo en voz alta. Reescribir cualquier frase que parezca manual,
   resumen ejecutivo, metáfora decorativa o texto intercambiable con otro caso.
6. Aplicar `11` cuando haya decisiones sobre personas, fraude, privacidad,
   sanciones o automatización. Aplicar `10` solo si existe un piloto. Aplicar
   `09` solo si la decisión de negocio todavía no resulta creíble.
7. Ejecutar la revisión de rigor de `12` y el gate de `14`.
8. Generar HTML con `13` y el sitio con `15`; nunca editar esas salidas a mano.

## Contrato de salida

- `examples/cases/NN_slug.md`
- `examples/data_specs/NN_slug.yml`
- `examples/visual_specs/NN_slug.yml`
- `examples/html/NN_slug.html`
- `/docs/cases/NN_slug.html`, generado desde la colección

Cada historia debe tener 400-750 palabras, 3-5 escenas, al menos 14
intervenciones, mayoría de diálogo, una pausa educativa, un SVG y una regla.

## Validación obligatoria

```powershell
$cases = Get-ChildItem examples/cases/*.md | ForEach-Object FullName
$html = Get-ChildItem examples/html/*.html | ForEach-Object FullName
python tools/validate_case_structure.py --collection $cases
python tools/audit_story_language.py --collection $cases
python tools/validate_html_story.py --collection $html
python tools/build_pages_site.py
python -m pytest
```

Detener la publicación ante cualquier `NEEDS_REVISION`. La validación
estructural no sustituye la lectura editorial.

## Skills de apoyo

- `09_business_decision_simulator`: solo cuando falta una decisión defendible.
- `10_pilot_designer`: solo en historias que prueban un cambio.
- `11_ethics_and_risk_reviewer`: obligatoria si una persona puede sufrir daño.
- `15_pages_site_publisher`: obligatoria cuando cambia la colección publicada.

No usar las skills de apoyo para agregar secciones visibles ni jerga al caso.
