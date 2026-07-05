# Reporte de validación curricular y de publicación

**Estado:** listo para publicación de la ruta completa de doce niveles.

## Cobertura verificada

| Estado | Niveles | Conceptos | Ejercicios | Prompts | Bloques |
| --- | --- | ---: | ---: | ---: | ---: |
| Publicado | 1–12 | 212 | 406 | 636 | 57 |
| Pendiente de producción | ninguno | 0 | 0 | 0 | 0 |

La base histórica de diez niveles conserva 172 conceptos, 326 ejercicios, 516
prompts y 43 bloques. Nivel 5 añade 19/38/57/7 y Nivel 11 añade 21/42/63/7;
por tanto, los totales publicados son matemáticamente 212/406/636/57.

## Gates ejecutados

- `python scripts/validate_content.py`: pasa; doce números únicos, manifests
  publicados, enlaces locales, IDs, snapshots, historias y handoffs válidos.
- `python scripts/build_pages.py`: pasa; catálogo de 12 niveles, 212 conceptos
  y 406 ejercicios.
- `python -m unittest scripts.test_vertical_slices`: pasa como regresión de los
  mecanismos que originaron los paquetes completos.
- `python -m unittest discover -s examples/level11_pipeline_slice/tests`: pasa;
  el artifact offline conserva sus seis casos.
- `node --check scripts/assets/educational_svg_registry.js`: pasa con el runtime
  Node incluido en el workspace.
- QA con el navegador integrado: pasa en 1280 px y 390 px para portal, Nivel 5
  y Nivel 11; confirma 12 niveles, 57 bloques, totals 212/406, renderers exactos,
  desbloqueo después de tres estados, modo docente oculto, cero overflow y cero
  errores de consola. El wrapper `scripts/qa_pages.py` queda correcto pero no se
  ejecutó localmente porque el runtime Python no incluye el módulo `playwright`.

## Resultado pedagógico

Las siete dimensiones quedan en 5/5 en los manifests de Niveles 5 y 11: alcance,
currículo, narrativa, pedagogía, precisión técnica, visualización y
reproducibilidad. No hay bloqueos ni dimensiones en 1.

## Riesgos residuales

- Los datasets narrativos de Niveles 5 y 11 son fixtures sintéticas etiquetadas;
  el modo docente usa snapshots públicos reales registrados.
- La implementación de referencia de Nivel 11 es offline y no almacena secretos
  reales ni representa un servicio productivo.
- Nivel 12 conserva el límite: recibe un producto operable y enseña readiness,
  monitoreo, incidentes y retiro; no reconstruye el producto.

## Próxima vertical slice recomendada

Piloto docente del handoff `dataset_confiable@L5.H1 → Nivel 6`, con observación
de comprensión de granularidad, cardinalidad y leakage antes de ajustar textos.
