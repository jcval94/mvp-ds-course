# Datos del caso 2.2 · Florence Nightingale en Crimea (1854-1856) · reales

**Son cifras históricas publicadas, no simulaciones.** Vienen de la tabla mensual del Ejército británico en Oriente que
Florence Nightingale publicó en *Notes on Matters Affecting the Health, Efficiency, and Hospital Administration of the
British Army* (Londres: Harrison, 1858; dominio público, marca de dominio público en Wellcome Collection) y que acompaña
su «Diagram of the causes of mortality in the army in the East». La compilación (estos CSV) se publica como CC0 1.0.

Caso con muertes reales: se usan conteos, sin nombres ni historias personales (`docs/GUIA_CASOS.md`).

| Archivo | Contenido |
| --- | --- |
| `meses.csv` | 24 meses, de abril de 1854 a marzo de 1856: tropa promedio estimada del mes y muertes por enfermedades zimóticas («prevenibles o mitigables»), por heridas y por otras causas. **Sin las tasas impresas**: las calcula el alumno en el caso |
| `cifras.csv` | Cifras sueltas con fuente por fila: la tasa impresa de enero de 1855 (la única que muestra el caso antes de que el alumno la calcule), el total de enero, la llegada a Scutari, la comisión sanitaria y la Comisión Real |

## Procedencia y qué tan firme es cada cifra

| Cifra | Fuente | Qué tan firme |
| --- | --- | --- |
| Las 24 filas de `meses.csv` | Transcripción de la tabla de Nightingale (1858) por M. Pearson e I. Short, *Understanding Uncertainty: Mathematics of the Coxcomb* (2007), distribuida en el paquete de R `HistData` (M. Friendly), conjunto `Nightingale`. Copia leída: <https://raw.githubusercontent.com/vincentarelbundock/Rdatasets/master/csv/HistData/Nightingale.csv> y su documentación | Publicada. Comprobado: las tasas que trae `HistData` salen todas de 12 × 1,000 × muertes ÷ tropa, redondeadas a un decimal |
| Enero de 1855: 2,761 + 83 + 324 = 3,168 muertes, tropa 32,393, tasa anual de 1,174 por cada 1,000 (1,023 por enfermedad) | Cohen, I. B. (1984). «Florence Nightingale». *Scientific American* 250(3): 128-137. Copia leída: <https://www.nielsen.sites.oasis.unc.edu/soci708/cdocs/cohen.html> | Publicada; coincide con `meses.csv` |
| Totales de los 24 meses: 14,476 por enfermedad, 1,758 por heridas, 1,748 por otras causas | Suma de `meses.csv` | Derivada |
| Comisión sanitaria en marzo de 1855 | Documentación de `HistData`; Rehmeyer, J. (2008), *Science News*; McDonald, L. (2021), *Radical Statistics* 128: 28-48 | Tres fuentes secundarias coinciden |

## Lo que no se usa o no se pudo obtener

- La tabla no se leyó en el escaneo de 1858 (Wellcome, <https://wellcomecollection.org/works/jxwtskzc>): el entorno de
  trabajo no alcanza el sitio. La cifra de enero coincide con Cohen (1984). Falta cotejar el escaneo antes de aprobar.
- La tropa de cada mes es la que estimó Nightingale («estimated average monthly strength»), no un conteo exacto.
- No se separan Scutari y Crimea: la tabla es de todo el ejército en Oriente (campamentos y hospitales).

El SHA-256 de `meses.csv` está en `dataset.sha256` de `casos/staging/nightingale-crimea-1854.json`.
