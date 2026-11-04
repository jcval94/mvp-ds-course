# Datos del caso 13.11 · El planeador de Gimli (vuelo 143 de Air Canada, 1983)

**Cifras reales, transcritas de fuentes publicadas.** No es el documento original de carga de combustible: la hoja que ve el
alumno en la página es una reconstrucción visual hecha con estas cifras, y se avisa al abrir el expediente. Licencia de este
archivo: CC0 1.0 (son hechos; las fuentes se citan abajo).

| Archivo | Contenido |
| --- | --- |
| `cifras.csv` | Las entradas del cálculo: lo que pide el plan, las lecturas de la varilla, los factores que se usaron y los de referencia, con unidad y fuente por fila |

SHA-256 de `cifras.csv`: `d7fb6150394e3cc339d80b972d7db6c8c60dd962d855b547c7dfd4b0f891924b` (igual a `dataset.sha256` en
`casos/staging/gimli-glider-1983.json`).

## Qué no trae a propósito

Ningún resultado derivado (kilos de verdad a bordo, litros que faltaban, porcentaje del plan). Esas operaciones las hace el
alumno en la página con la calculadora; las cifras resueltas viven solo en el backend.

## Fuentes (columna `fuente`)

| Clave | Fuente | Qué respalda |
| --- | --- | --- |
| `lockwood1985` | G. H. Lockwood, *Final Report of the Board of Inquiry investigating the circumstances of an accident involving the Air Canada Boeing 767 aircraft C-GAUN that effected an emergency landing at Gimli, Manitoba on the 23rd day of July, 1983*, abril de 1985. Copia del FAA: https://www.faa.gov/sites/faa.gov/files/2024-12/AirCanada143_C-GAUN.pdf | Que 1.77 convierte litros en libras y no en kilos; que el valor métrico ronda 0.8; que el manual dice kilos = libras / 2.2 |
| `williams2003` | Merran Williams, «The 156-tonne Gimli Glider», *Flight Safety Australia*, jul–ago 2003, pp. 22–27. Copia: https://www.bu.edu/gk12/kai/Lesson%201/Gimli_Glider.pdf | 22,300 kg requeridos, 7,682 L en los tanques, 4,916 L cargados |
| `wikipedia` | «Gimli Glider», Wikipedia en inglés: https://en.wikipedia.org/wiki/Gimli_Glider (consultada el 4 nov 2026) | 22,300 kg, 7,682 L, 1.77 lb/L, 0.803 kg/L, 4,917 L, y las cifras de Ottawa (11,430 L, 1.78, 20,400) |
| `exxonmobil` | Hoja de producto ExxonMobil Jet Fuel: https://www.exxonmobil.com/en-ng/commercial-fuel/pds/gl-xx-jetfuel-series | Densidad de Jet A y Jet A-1 a 15 °C entre 775 y 840 kg/m³ (ASTM D1655, CGSB 3.23, DEF STAN 91-091) |
| `referencia_fisica` | Un litro de agua pesa cerca de 1 kg | Referencia para la regla de rango |

## Discrepancias entre fuentes

- **Litros cargados:** 4,917 (Wikipedia) o 4,916 (Williams). La cuenta de la hoja da 4,916.9: una fuente redondea y la otra
  trunca. Los retos aceptan las dos.
- **Densidad:** 0.803 kg/L (Wikipedia) o «alrededor de 0.8» (Lockwood, Williams). 1.77 / 2.2046 = 0.803: son coherentes.
- **Ottawa:** Wikipedia usa 1.78 y Lockwood solo habla de 1.77. 11,430 × 1.78 = 20,345, no 20,400 exactos.
- Las cifras línea por línea (7,682 L; 22,300 kg; 4,916 o 4,917 L) **no se encontraron en el texto del informe Lockwood que
  se pudo leer** (la extracción del PDF del FAA llega a la parte III): vienen de Williams y de Wikipedia. Falta ubicarlas en
  el informe (parte III, «Human Factors and Errors», pp. 38–58, o los apéndices).
