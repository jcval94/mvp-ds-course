# Auditoría editorial de la colección

Fecha: 2026-07-19

## Alcance

Se revisaron los 87 casos canónicos, sus contratos de datos y visualización, el
HTML lineal y la salida pública de GitHub Pages.

La revisión comprobó:

- claridad de situación, conflicto, dato decisivo y acción final;
- lenguaje cotidiano en diálogo y ausencia de jerga sin explicar;
- entre 400 y 750 palabras, 3-5 escenas y mayoría de diálogo;
- una sola pausa educativa, una sola gráfica y una regla transferible;
- contexto para números, tasas, periodos, unidades y tamaños de muestra;
- remates, aperturas, personajes y frases suficientemente variados;
- correspondencia entre Markdown, YAML, HTML y catálogo público.

## Hallazgos corregidos

| Casos | Hallazgo | Corrección |
| --- | --- | --- |
| 01-18 | Sin bloqueos editoriales | Se conservaron como referencia de tono. |
| 19-48 | Repetían dos párrafos y varias líneas de cierre | Se reescribieron consecuencias, comparaciones y cierres según cada escena. |
| 49-62 | Compartían narración y diálogos de plantilla | Se reemplazaron por acciones, comprobaciones y lenguaje propio de cada tema. |
| 63-87 | Casos nuevos | Se validaron desde el diseño con la auditoría reforzada. |

## Protección añadida

`tools/audit_story_language.py` rechaza frases de plantilla, diálogos demasiado
redactados, líneas reutilizadas, párrafos clonados y secuencias de diez palabras
repetidas en tres o más historias.

La skill obligatoria `.codex/skills/create-narrative-case/SKILL.md` concentra el
flujo de creación y exige validación estructural, editorial, HTML, Pages y tests.
Las skills de negocio, piloto y ética quedan como revisiones condicionales para
evitar que una cadena innecesaria de formularios termine filtrando jerga al caso.

## Resultado

- Estructura Markdown: `PASS` en 87 de 87 casos.
- Auditoría de lenguaje y repetición: `PASS` en 87 de 87 casos.
- HTML lineal: `PASS` en 87 de 87 casos.
- Sitio público: catálogo completo de 87 casos.
- Suite automatizada: `18 passed`.
