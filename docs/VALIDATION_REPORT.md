# Reporte de validación curricular y de publicación

**Estado:** listo para publicación de la ruta completa de trece niveles.

## Cobertura verificada

| Estado | Niveles | Conceptos | Ejercicios | Prompts | Bloques |
| --- | --- | ---: | ---: | ---: | ---: |
| Publicado | 1-13 | 236 | 454 | 708 | 63 |
| Pendiente de producción | ninguno | 0 | 0 | 0 | 0 |

El inventario vigente publicado cubre 13 niveles. Los manifiestos y
`docs/placement/curriculum_inventory.csv` declaran 236 conceptos, 454 ejercicios,
708 prompts y 63 bloques; Nivel 12 cubre Ingeniería de Sistemas de IA y Nivel 13
conserva operación, monitoreo, incidentes, handoff y retiro.

## Gates ejecutados

- `python scripts/validate_content.py`: pasa; confirma trece números únicos,
  manifests publicados, enlaces locales, IDs, snapshots, historias y handoffs válidos.
- `python scripts/build_pages.py`: pasa; construye catálogo de 13 niveles, 236
  conceptos y 454 ejercicios.
- `python scripts/qa_pages.py`: pasa; cubre portal, 13 niveles, 197 escenas
  continuas, 394 ejercicios, modo docente, movimiento reducido y mobile.
- `python scripts/test_vertical_slices.py`: pasa; confirma que Nivel 12 produce
  `sistema_ia_trazable@L12.H1` y Nivel 13 conserva readiness operativo.

## Resultado pedagógico

Los manifests publicados declaran promedio de rúbrica de 5/5, sin bloqueos ni
dimensiones en 1. El nuevo Nivel 12 mantiene el contrato level-shell-v1,
ejercicios dependientes de evidencia y visuales centrados en fronteras, loops,
permisos, checkpoints y trazas.

## Riesgos residuales

- Nivel 12 usa datasets narrativos sintéticos etiquetados para arquitectura y
  trazas; el modo En vivo conserva snapshots públicos reales registrados.
- Nivel 12 no ejecuta IA real, backend, API de proveedor ni servidor MCP real.
- Nivel 13 recibe un sistema trazable ya diseñado y no reconstruye producto.

## Próxima vertical slice recomendada

Piloto docente del handoff `producto_operable@L11.H1 → sistema_ia_trazable@L12.H1
→ readiness@L13.1`, con prueba manual de reconstrucción de traza y decisión de
parada antes de operar.
