# Datos del caso 2.4 · Shipman y el gráfico que nadie hizo (Hyde, 1977-1998) · reales

**Son cifras publicadas por la auditoría oficial, no simulaciones.** Vienen de Baker, R. (2001). *Harold Shipman's
Clinical Practice 1974-1998: A Clinical Audit Commissioned by the Chief Medical Officer*. Londres: The Stationery Office
(ISBN 011322527X), Tabla 8.1 (p. 62) y Tablas 2.1 y 3.1. La compilación (estos CSV) se publica como CC0 1.0; el informe
es de derechos de la Corona y aquí solo se transcriben cifras.

Caso con homicidios reales: se usan conteos de certificados, sin nombres de víctimas ni detalles de las muertes
(`docs/GUIA_CASOS.md`).

| Archivo | Contenido |
| --- | --- |
| `certificados.csv` | Por año de 1977 a 1998 (Hyde): certificados de defunción que firmó Shipman, sus pacientes registrados, los certificados y pacientes de los médicos de comparación, y lo esperado y la diferencia que imprimió la auditoría. 1977 y 1998 son años incompletos |
| `cifras.csv` | Cifras sueltas con fuente por fila: los totales de la auditoría, el exceso ajustado por edad y sexo, la hora de las muertes, la condena, las conclusiones de la investigación pública y el estudio de monitoreo |

## Procedencia y qué tan firme es cada cifra

| Cifra | Fuente | Qué tan firme |
| --- | --- | --- |
| Tabla 8.1 (filas de 1977 a 1998) | Baker (2001), p. 62. Copia leída del informe completo: <https://serialkillersinfo.com/blog/wp-content/uploads/2018/02/shipman-clinical-practice.pdf> (no es el sitio oficial; el del Departamento de Salud, `doh.gov.uk/hshipmanpractice`, ya no existe). Resumen oficial: <https://gosportpanel.independent.gov.uk/media/panel_documents/IMI000470.pdf> | Publicada. Comprobado: los certificados de Shipman suman 499 (como la Tabla 2.1 y el resumen); con 1974-1975 suman 521; lo esperado suma 245.7 y la diferencia 275.3, como el renglón de totales. **Dos detalles de la tabla impresa:** en 1978, 4.9 × 2.853 da 14.0 y la tabla dice 13.8; en 1986, 15 entre 2,853 da 5.3 por cada 1,000 y la tabla dice 5.6. Se guardan las cifras impresas |
| Cómo se calcula lo esperado | Baker (2001), p. 61: certificados de los médicos de comparación por cada 1,000 pacientes, multiplicado por los pacientes de Shipman («5.0 × 2853/1000 = 14.3» en 1979) | Publicada. Solo ajusta por el tamaño de la lista; el exceso de 297 del resumen sí ajusta por edad y sexo |
| Pacientes antes de 1987 | Baker (2001), nota de la Tabla 8.1: «List sizes prior to 1987 are estimates» | Estimada por la auditoría |
| Hora de las muertes, presencia del médico | Baker (2001), p. 40 y Tabla 5.9 | Publicada |
| Condena, víctimas | The National Archives, catálogo JA 10 (<https://discovery.nationalarchives.gov.uk/details/r/C16350>); noticia del BMJ sobre el primer informe (<https://pmc.ncbi.nlm.nih.gov/articles/PMC1123718>) | Fuente oficial y revista médica |
| Monitoreo | Spiegelhalter, D. y Best, N. (2004). «Shipman's statistical legacy». *Significance* 1(1): 10-12. Copia leída: <https://tommasorigon.github.io/StatI/approfondimenti/Spiegelhalter2004.pdf>; Baker, R., Jones, D. R. y Goldblatt, P. (2003). *BMJ* 326: 274-276 | Publicada |

## Lo que no se usa

- Las filas de Todmorden (1974-1975) y los años sin Shipman en la comparación: el caso trabaja solo con Hyde.
- Las tablas por edad y sexo (8.5 a 8.26): el caso nombra el ajuste, no lo calcula.
- Falta cotejar la Tabla 8.1 con un ejemplar del informe impreso o una copia oficial antes de aprobar.

El SHA-256 de `certificados.csv` está en `dataset.sha256` de `casos/staging/shipman-hyde-1977.json`.
