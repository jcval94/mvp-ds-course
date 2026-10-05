# Skill Registry

Toda creación o revisión de casos empieza por `create-narrative-case`, la skill
compuesta y obligatoria. Las skills numeradas son módulos de apoyo: se consultan
desde ese flujo cuando aportan una decisión o control concreto.

| Orden | Skill | Responsabilidad |
| ---: | --- | --- |
| 0 | `00_curriculum_mapper` | Elegir concepto y tecnica minima. |
| 1 | `01_case_thesis_builder` | Completar el story spine corto. |
| 2 | `02_corporate_conflict_builder` | Crear presion, mala logica y escalada creibles. |
| 3 | `03_data_signal_designer` | Definir el dato que rompe la conclusion. |
| 4 | `04_synthetic_evidence_generator` | Crear evidencia consistente. |
| 5 | `05_simple_visual_builder` | Construir una sola grafica SVG. |
| 6 | `06_narrative_case_writer` | Escribir una historia hablada de 3-5 minutos. |
| 7 | `07_tragicomic_editor` | Maximizar humor sin perder naturalidad. |
| 8 | `08_learning_designer` | Integrar una pausa educativa natural. |
| 9-12 | Skills analiticas | Proteger decision, piloto, riesgo y rigor. |
| 13 | `13_html_story_renderer` | Renderizar el Markdown sin inventar contenido. |
| 14 | `14_quality_gatekeeper` | Auditar naturalidad, humor, datos y variedad. |
| 15 | `15_pages_site_publisher` | Regenerar el sitio publico de GitHub Pages desde la coleccion canonica. |

## Ruta obligatoria

`create-narrative-case` coordina currículo, tesis, evidencia, escritura,
auditoría de lenguaje, revisión técnica, render y publicación. `09`, `10` y
`11` son condicionales: usarlas solo cuando el caso requiera decisión de negocio,
piloto o revisión ética. Separarlas del flujo principal evita formularios y
jerga que terminan filtrándose al diálogo.
