# Datos del caso 1.4 · Puerto Rico, huracán María (2017) · reales

**Datos reales.** Defunciones registradas por mes de ocurrencia en Puerto Rico, enero de 2015 a abril de 2018, del
Registro Demográfico del Departamento de Salud de Puerto Rico. No hay nada simulado ni reconstruido.

| Archivo | Contenido |
| --- | --- |
| `defunciones_mensuales.csv` | `anio`, `mes` (1 a 12), `defunciones` (todas las causas), `estado` (`registrado` o `preliminar`) |

SHA-256 de `defunciones_mensuales.csv`: `0012834fc5e055114cbf32fc43730b46f332cfcd4b27984b9e24bb0223c2bed9`
(debe coincidir con `dataset.sha256` en `casos/staging/puerto-rico-maria-2017.json`).

## Procedencia

- **Documento de origen:** «Departamento de Salud - Registro Demográfico - División de Calidad y Estadísticas Vitales»,
  tablas «Defunciones Ocurridas en <mes> por Día y Año», 2015 a 2018, fechadas el 4 de junio de 2018 (autoría del PDF:
  Maria M. Juiz Gallego). Fuente impresa en cada página: «Registro Demográfico - División de Calidad y Estadísticas
  Vitales».
- **Copia consultada:** `data/RD-Mortality-Report_2015-18-180531.pdf` del repositorio público del estudio de Harvard
  (Kishore et al., NEJM 2018), <https://github.com/c2-d2/pr_mort_official>, rama `master`, commit
  `64d686c2cee04bf98c7129d796bf581d466a614f` (15 jun 2018). SHA-256 del PDF:
  `dd0bc23029cdd67019822733406ef05619756d52917106c84e530aa1450529a8`.
- **Fecha de consulta:** 4 de noviembre de 2026.
- **Cómo se armó el CSV:** se extrajo el texto del PDF (`pdftotext -layout`), se leyeron los conteos diarios de cada
  mes y se comprobó que su suma coincide con la fila `Total` del documento en los 12 meses y los 4 años (coinciden todos).
  El CSV guarda la fila `Total` de cada mes.

## Notas del propio documento (se conservan en `estado`)

- «Año 2017 - Datos preliminares; archivo final en proceso operacional de revisión de calidad y validación.»
- «Año 2018 - Datos preliminares; Certificados de Defunción registrados en sistema hasta 5/31/2018.»
- Se excluye mayo de 2018 en adelante: mayo trae solo los certificados registrados hasta el 31 de mayo (1,892, incompleto)
  y junio a diciembre vienen en cero. Abril de 2018 también puede crecer con registros tardíos.

## Cuidado al usar estos datos

- Son conteos de **todas las causas**. Ninguna fila dice si una muerte fue por el huracán.
- María tocó tierra el 20 de septiembre de 2017 (NHC, `AL152017_Maria.pdf`): septiembre mezcla 19 días antes del
  huracán con 11 después. El PDF de origen trae los conteos diarios si hace falta separar.
- Las cifras de 2017 son preliminares de junio de 2018; versiones posteriores del Registro pueden diferir. El mismo
  repositorio trae otra serie (`official-deaths.csv`, del Instituto de Estadísticas de Puerto Rico) que difiere en
  algunas decenas por mes; este caso usa la del Registro Demográfico porque es la que cubre 2015 a 2018.
- No hay datos de personas: solo totales por mes.

## Licencia

El repositorio de Harvard publica sus datos con [Creative Commons Attribution 3.0 US](https://creativecommons.org/licenses/by/3.0/us/)
y su código con MIT. Los conteos son hechos tomados de un documento público del Gobierno de Puerto Rico. Crédito
sugerido: «Registro Demográfico, Departamento de Salud de Puerto Rico (4 jun 2018), vía c2-d2/pr_mort_official
(Kishore et al., 2018), CC BY 3.0 US». Pendiente de confirmación del autor (ver la ficha del caso).
