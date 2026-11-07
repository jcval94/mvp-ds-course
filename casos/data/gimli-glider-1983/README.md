# Datos del caso 13.11 · El planeador de Gimli (vuelo 143 de Air Canada, 1983)

**Cifras reales, transcritas de fuentes publicadas.** No es el documento original de carga de combustible: la hoja que ve el
alumno en la página es una reconstrucción visual hecha con estas cifras, y se avisa al abrir el expediente. Licencia de este
archivo: CC0 1.0 (son hechos; las fuentes se citan abajo).

| Archivo | Contenido |
| --- | --- |
| `cifras.csv` | Las entradas del cálculo: lo que pide el plan, las lecturas de la varilla, los factores que se usaron y los de referencia, con unidad y fuente por fila |

SHA-256 de `cifras.csv`: `3908e702150619d952313d7e79989d7fc0cfe48324433288611fef88d7b87daa` (igual a `dataset.sha256` en
`casos/staging/gimli-glider-1983.json`).

## Qué no trae a propósito

Ningún resultado derivado (kilos de verdad a bordo, litros que faltaban, porcentaje del plan). Esas operaciones las hace el
alumno en la página con la calculadora; las cifras resueltas viven solo en el backend.

## Fuentes (columna `fuente`)

| Clave | Fuente | Qué respalda |
| --- | --- | --- |
| `lockwood1985` | G. H. Lockwood, *Final Report of the Board of Inquiry investigating the circumstances of an accident involving the Air Canada Boeing 767 aircraft C-GAUN that effected an emergency landing at Gimli, Manitoba on the 23rd day of July, 1983*, abril de 1985. Copia completa en Internet Archive (214 hojas, con OCR): https://archive.org/details/31761116358912. Copia del FAA (su texto se corta en la p. 42): https://www.faa.gov/sites/faa.gov/files/2024-12/AirCanada143_C-GAUN.pdf | Varillas de 64 y 62 cm = 3,924 + 3,758 = 7,682 L; 22,300 kg mínimos; 13,597, 8,703 y 4,916 L de la hoja; 5,000 L pedidos (pp. 41-42); 1.77 convierte litros en libras y el valor métrico ronda .8 (p. 28); .80 para el Jet A en el manual y kilos = libras ÷ 2.2 (p. 41); Ottawa: 11,430 L, 1.78 y «más de 20,000» (p. 43). Páginas impresas; en el visor de Internet Archive, hoja = página + 8 |
| `williams2003` | Merran Williams, «The 156-tonne Gimli Glider», *Flight Safety Australia*, jul–ago 2003, pp. 22–27. Copia: https://www.bu.edu/gk12/kai/Lesson%201/Gimli_Glider.pdf | 22,300 kg requeridos, 7,682 L en los tanques, 4,916 L cargados (coincide con Lockwood) |
| `wikipedia` | «Gimli Glider», Wikipedia en inglés: https://en.wikipedia.org/wiki/Gimli_Glider (consultada el 4 nov 2026) | 22,300 kg, 7,682 L, 1.77 lb/L, 11,430 L y 1.78 (coinciden con Lockwood); 0.803 kg/L, 4,917 L y 20,400 no están en el informe |
| `exxonmobil` | Hoja de producto ExxonMobil Jet Fuel: https://www.exxonmobil.com/en-ng/commercial-fuel/pds/gl-xx-jetfuel-series | Densidad de Jet A y Jet A-1 a 15 °C entre 775 y 840 kg/m³ (ASTM D1655, CGSB 3.23, DEF STAN 91-091) |
| `referencia_fisica` | Un litro de agua pesa cerca de 1 kg | Referencia para la regla de rango |

## Discrepancias entre fuentes (resueltas con el informe, 4 nov 2026)

- **Litros cargados:** el informe da 4,916 por cargar según la hoja y 5,000 pedidos al cargador, que sugirió redondear (p. 41);
  no dice cuánto se bombeó. Wikipedia da 4,917 (4,916.9 redondeado). `cifras.csv` usa 4,916 y trae los 5,000 aparte.
- **Densidad:** el informe dice .80 para el Jet A en el manual (p. 41) y «alrededor de .8» (p. 28). El 0.803 de Wikipedia es
  1.77 ÷ 2.2046. `cifras.csv` usa 0.80.
- **Ottawa:** el informe confirma 11,430 L y el 1.78 (p. 43; también p. 80), pero la cifra del capitán es «más de 20,000», sin
  unidad. Los 20,400 de Wikipedia no están en el informe; `cifras.csv` trae 20,000 como cota inferior.
- **Altitud:** el informe da 35,000 pies con los dos motores ya apagados (p. 29); Williams, 28,500 al apagarse el derecho.
- **17 minutos de planeo:** solo Williams y Wikipedia; el informe no da la duración.
