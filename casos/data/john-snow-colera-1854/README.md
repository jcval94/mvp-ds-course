# Datos del caso 2.1 · John Snow y el cólera (Londres, 1854) · reales

**Son cifras históricas publicadas, no simulaciones.** Vienen de dos obras de John Snow (muerto en 1858), de dominio
público: *On the Mode of Communication of Cholera*, 2.ª ed. (Londres: John Churchill, 1855; prefacio del 11 dic 1854) y
*Cholera and the Water Supply in the South Districts of London in 1854* (*Journal of Public Health*, oct 1856). La
compilación (estos CSV) se publica como CC0 1.0. Al usarlas, cita la fuente de cada fila.

Caso con muertes reales: se usan conteos, sin nombres ni historias personales (`docs/GUIA_CASOS.md`).

| Archivo | Contenido |
| --- | --- |
| `companias.csv` | El «Grand Experiment»: casas, personas y muertes por compañía de agua. Tabla IX de Snow 1855 (primeras siete semanas, hasta el 26 ago 1854, por **casas**) y fila de totales de la Tabla V de Snow 1856 (epidemia completa en los distritos del sur, por **personas**). Las tasas no se guardan, ni las impresas por Snow ni las recalculadas: las calcula el alumno en el caso (las impresas de la Tabla IX están en la parte privada del backend) |
| `cronologia_broad_street.csv` | Tabla I de Snow 1855: ataques mortales y muertes por día cerca de Golden Square, del 19 ago al 30 sep 1854, más 45 ataques sin fecha. Totales: 616 y 616 |
| `cifras.csv` | Cifras sueltas con fuente por fila: las 83 muertes de los últimos tres días de la semana del 2 sep y cuántas vivían más cerca de otra bomba, el asilo de Poland Street, la cervecería, el día del mango y las fechas de las tomas de agua |

## Procedencia y qué tan firme es cada cifra

| Cifra | Fuente | Qué tan firme |
| --- | --- | --- |
| Tabla IX (casas y muertes: 40,046 / 1,263; 26,107 / 98; 256,423 / 1,422) | Snow 1855, p. 86. Coinciden tres transcripciones independientes: Coleman, `Snow1855_TableIX.csv` en <https://github.com/tscoleman/SnowCholera> (BSD-2-Clause); Data 8 (<https://data8.datascience.uchicago.edu/chapters/02/2/snow-s-grand-experiment>); UCLA (<https://epi-snow.ph.ucla.edu/Stream3_GrandExperiment_d.html>) | Publicada. **Ojo:** la tasa que Snow imprimió para el resto de Londres (**59** por cada 10,000 casas) no sale de sus propias cifras, que dan 55.5 (lo señala Coleman); la de Lambeth está truncada. Las casas y muertes son las impresas |
| Tabla V, fila de totales (S&V 267,625 personas y 3,706 muertes; Lambeth 171,528 y 411; bombas y otras 338; sin averiguar 623; total 5,078; tasas impresas 138 y 23) | Snow 1856, Tabla V, en Project Gutenberg #66507 (<https://www.gutenberg.org/ebooks/66507>); cotejada con `Snow1856_TableV.csv` de Coleman | Publicada. Las casas (39,726 y 24,854) vienen de la transcripción de Coleman. Snow añade debajo una variante con la población del Registrador (266,516 y 173,748) y las 623 repartidas: 160 y 27 por 10,000; no se guarda aquí |
| Tabla I (cronología) | Snow 1855, p. 49, en Project Gutenberg #72894 (<https://www.gutenberg.org/ebooks/72894>) | Publicada. Se comprobó que las filas suman 571 + 45 sin fecha = 616 ataques y 616 muertes |
| 83 muertes, 10 cerca de otra bomba (5, 3 y 2), 61 / 6 / 6 | Snow 1855, sección de Golden Square | Publicada, salvo `bs_cerca_broad` (73), que es **derivada** (83 − 10). Las 61, 6 y 6 se refieren a esas 73 |
| Asilo de Poland Street (535 internos, 5 muertes) y cervecería (más de 70 obreros, ninguna muerte grave) | Snow 1855 | Publicada. «Más de 70» se guarda como 70 (`tipo = minimo`) |
| 616 muertes en total | Snow 1855, Tabla I | Publicada. Wikipedia da «420» con otra fuente y otra área: el caso usa la cifra de Snow y dice de dónde sale |
| Mango quitado el 8 sep, tras la junta del 7 | Snow 1855 («the handle of the pump was removed on the following day»); UCLA | Publicada |
| Lambeth se mudó río arriba (Seething Wells, Thames Ditton) en 1852; Southwark & Vauxhall, a Hampton en agosto de 1855 | UCLA, Grand Experiment | Secundaria académica |
| Metropolis Water Act 1852: desde el 31 ago 1855, prohibido tomar agua para uso doméstico debajo de Teddington Lock | Wikipedia, que cita la ley (15 & 16 Vict. c. 84, s. 1) | Secundaria; falta leer la ley en legislation.gov.uk |

## Lo que no se pudo obtener o no se usa

- **Las coordenadas de cada muerte del mapa.** Hay dos digitalizaciones conocidas: la de Robin Wilson
  (<https://johnsnow.rtwilson.com/download.html>), que **no declara licencia** en su página de descarga, y la de Rusty
  Dodson y Waldo Tobler (NCGIA, 1992) que distribuye el paquete de R `HistData` (`Snow.deaths`, 578 filas), cuya
  documentación tampoco declara la licencia del conjunto. **No se copian aquí.** El caso usa el mapa original (dominio
  público) como imagen y las cifras que Snow escribió en el texto. Si el autor quiere el conteo por bomba con puntos, hay
  que pedir permiso a Wilson o confirmar la licencia de `HistData` y citarla.
- **La tabla de casas por subdistrito** (Tablas VII y VIII de 1855, I y II de 1856) existe en la transcripción de Coleman
  (BSD-2-Clause) y en los libros de dominio público. No se usa: el caso trabaja con los totales.
- No se leyó la Tabla IX directo en un escaneo de la página 86; coinciden tres transcripciones. Falta mirarla en el escaneo
  del Wellcome (<https://archive.org/details/b28985266>) antes de aprobar.

## Reproducir

No hay simulación. Las únicas cifras derivadas son `bs_cerca_broad` = 83 − 10 y la fila «fecha desconocida» de la
cronología (copiada de la tabla). Los cálculos del caso (tasas, cuántas veces, peor caso) los hace el alumno.

El SHA-256 de `companias.csv` está en `dataset.sha256` de `casos/staging/john-snow-colera-1854.json`.
