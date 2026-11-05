# Datos del caso 2.3 · El transbordador Challenger (1986) · reales

**Datos reales.** Los 23 vuelos del transbordador anteriores al Challenger (STS 51-L) cuyos cohetes aceleradores se
recuperaron, con la temperatura de la junta al lanzar y cuántas juntas tóricas de las juntas de campo mostraron daño
térmico (erosión, paso de gases o calentamiento). No hay nada simulado ni reconstruido.

| Archivo | Contenido |
| --- | --- |
| `vuelos.csv` | `orden` (orden temporal, 1 a 23), `vuelo`, `fecha` (lanzamiento, AAAA-MM-DD), `temperatura_f` (°F), `temperatura_c` (°C, calculada y redondeada a un decimal), `juntas_con_dano` (juntas tóricas **primarias** de las juntas de campo con daño térmico, de 6 por vuelo; Dalal et al. 1989, tabla 1), `incidentes_rogers` (incidentes en juntas de campo contados como en el informe Rogers, que también cuenta la junta secundaria) |

SHA-256 de `vuelos.csv`: `05889c48d0e0d3d274b3b2c290acd4bf4dc481c23ed5bc3ba6ea0c5e411e1a89`
(debe coincidir con `dataset.sha256` en `casos/staging/challenger-1986.json`).

## Procedencia

- **Fuente primaria:** *Report of the Presidential Commission on the Space Shuttle Challenger Accident* (Comisión Rogers,
  6 jun 1986), vol. I, cap. 6, figura 2 «O-Ring Anomalies Compared with Joint Temperature and Leak Check Pressure»
  (vuelo, fecha, junta, erosión, paso de gases y temperatura de la junta),
  <https://www.nasa.gov/history/rogersrep/v1ch6.htm>.
- **Tabla de análisis:** S. R. Dalal, E. B. Fowlkes y B. Hoadley, «Risk Analysis of the Space Shuttle: Pre-Challenger
  Prediction of Failure», *Journal of the American Statistical Association* 84 (408), 945–957, 1989, tabla 1,
  <https://doi.org/10.1080/01621459.1989.10478858>. No se leyó el PDF (muro de pago); sus cifras se tomaron de dos
  transcripciones que coinciden entre sí:
  - UCI Machine Learning Repository, «Challenger USA Space Shuttle O-Ring» (Draper, 1993), archivo
    `o-ring-erosion-or-blowby.data`, CC BY 4.0, <https://archive.ics.uci.edu/dataset/92/challenger+usa+space+shuttle+o+ring>
    (DOI 10.24432/C5PW2T).
  - Paquete R `vcd`, conjunto `SpaceShuttle` (Friendly, 2000, a partir de Dalal et al.), copia en Rdatasets,
    <https://raw.githubusercontent.com/vincentarelbundock/Rdatasets/master/csv/vcd/SpaceShuttle.csv>.
- **Fechas de lanzamiento:** figura 2 del informe Rogers, corregidas donde la transcripción HTML tiene erratas (STS-3
  aparece como 03/22/81 y STS-9 como 12/28/83; fueron el 22 mar 1982 y el 28 nov 1983).
- **Fecha de consulta:** 4 de noviembre de 2026.
- **Cómo se armó:** temperatura y `juntas_con_dano` de Dalal et al. (vía UCI y `vcd`, que coinciden en los 23 vuelos);
  `incidentes_rogers` contando las filas de juntas de campo («Field») de la figura 2 del informe Rogers. Se excluye
  STS-4 (27 jun 1982): sus cohetes se perdieron en el mar y no hay registro de las juntas.

## Discrepancias entre fuentes (se conservan, no se corrigen)

- **51-C (24 ene 1985, 53 °F):** 2 juntas primarias con daño en Dalal y UCI; 3 incidentes en la figura 2 de Rogers (dos
  primarias y la secundaria de la junta central derecha, con calor). Algunas copias de la tabla de Dalal (Montana State)
  ponen 3. El caso usa `juntas_con_dano`; la columna `incidentes_rogers` existe para explicarlo si alguien pregunta.
- **Temperaturas de STS-3 y 41-G:** la transcripción HTML de la figura 2 en nasa.gov pone 80 °F en STS-3 (el mismo valor
  que STS-4) y 67 °F en 41-G; Dalal, UCI y `vcd` dan 69 °F y 78 °F. El CSV usa 69 y 78. Falta cotejar con el PDF escaneado
  del informe. Ninguno de los dos vuelos tuvo daño, así que no cambia ninguna cifra del caso.
- **Cuántos vuelos se cuentan:** el informe Rogers cuenta 24 vuelos en su figura 7 porque incluye STS-4 (80 °F, sin
  datos de juntas); este CSV tiene los 23 con datos, como Dalal et al. y UCI.
- **Qué temperatura:** la figura 2 da la temperatura calculada de la junta (±5 °F). Robison, Boisjoly et al. (2002)
  advierten que los ingenieros de Thiokol no tenían esa temperatura para la mayoría de los vuelos la víspera, y que la
  gráfica de Tufte (1997) mezcla temperaturas de la junta y del aire.

## La temperatura del 28 de enero de 1986 (no está en el CSV)

| Cifra | Qué es | Fuente |
| --- | --- | --- |
| 26 °F (−3.3 °C) | Pronóstico para la hora prevista del lanzamiento (9:38 a. m.), según lo que se dijo a Thiokol la víspera | Rogers, vol. I, cap. 5 (testimonio de McDonald) |
| 22 °F (−5.6 °C) | Mínima pronosticada para la madrugada | Rogers, vol. I, cap. 5 |
| 28 ± 5 °F | Temperatura local calculada de las juntas al lanzar | Rogers, vol. I, cap. 4 |
| 31 °F (−0.6 °C) | Temperatura de la junta de 51-L en la figura 2; es la que usan Dalal et al. y UCI | Rogers, vol. I, cap. 6; Dalal et al. 1989 |
| 36 °F (2.2 °C) | Temperatura del aire al lanzar (11:38 a. m.), «15 grados más fría que cualquier lanzamiento anterior» | Rogers, vol. I, cap. 3 |

## Licencia

- Los datos del informe de la Comisión Rogers son obra del Gobierno de EE. UU.: **dominio público**.
- Las cifras de Dalal et al. son hechos tomados de ese informe. La transcripción de UCI se publica con
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); crédito sugerido: «Draper, D. (1993). Challenger USA Space
  Shuttle O-Ring [Dataset]. UCI Machine Learning Repository. https://doi.org/10.24432/C5PW2T».
- Crédito del caso: «Comisión Presidencial sobre el Accidente del Transbordador Challenger (1986), vol. I; Dalal, Fowlkes
  y Hoadley (1989); transcripción de UCI (CC BY 4.0)».

## Cuidado al usar estos datos

- Ningún vuelo previo se lanzó por debajo de 53 °F: cualquier cifra para 26–36 °F sale de fuera del rango observado.
- Los conteos son de juntas tóricas, no de vuelos ni de personas. No hay datos de personas.
