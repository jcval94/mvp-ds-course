# Datos del caso 1.2 · La encuesta del Literary Digest (1936) · reales

**Son cifras históricas publicadas, no simulaciones.** Cada fila trae su fuente en la columna `referencia`. La compilación
(estos CSV) se publica como CC0 1.0. Las cifras son hechos: las elecciones son registros públicos y los conteos del Digest y
de Gallup se publicaron en 1936. Al usarlas, cita las fuentes de cada fila.

| Archivo | Contenido |
| --- | --- |
| `cifras.csv` | Cifras nacionales: boletas enviadas y devueltas del Digest, su conteo final, su pronóstico de votos electorales, la última encuesta de Gallup, el resultado de 1936 y el de 1932 |
| `encuesta_1937.csv` | Encuesta de Gallup (AIPO) de mayo de 1937: entre quienes dijeron haber recibido la boleta del Digest, por quién votaron según si la devolvieron o no (Lusinchi 2012, tabla 2) |

## Procedencia

| Cifra | Fuente | Qué tan firme |
| --- | --- | --- |
| Boletas enviadas: «unos diez millones» | Lohr y Brick (2017), p. 65; Lusinchi (2012), p. 26 | Aproximada: la revista hablaba de diez millones. Se usa 10,000,000 como redondeo |
| Boletas devueltas: 2,376,523 | Lohr y Brick (2017), que cita un editorial del Digest de 1936 | Publicada |
| Landon 1,293,669 y Roosevelt 972,897 | Titular del Digest del 31 de octubre de 1936 (vol. 122, pp. 5–6), transcrito por History Matters (George Mason University) y citado por Lohr y Brick (2017) | Publicada |
| Otros: 109,957 | Diferencia entre las devueltas y la suma de Landon y Roosevelt | **Derivada**: no se leyó el desglose por candidato menor |
| Votos electorales del pronóstico: Landon 370, Roosevelt 161 | History Matters (370); Lohr y Brick (2017): sin ponderar, Roosevelt gana 16 estados y 161 de 531 | Publicada |
| Tasa de respuesta de 1932: 15% | Lusinchi (2012), nota 32 | Publicada en un artículo con revisión de pares |
| Gallup, 1 de noviembre de 1936: Roosevelt 53.8%, Landon 42.8% | *The Gallup Poll: Public Opinion, 1935–1971*, vol. I, vía Wikipedia | Secundaria. Coincide con la cifra que Lusinchi (2012, p. 44) da para Gallup entre los dos grandes |
| Resultado de 1936 por votos populares | The American Presidency Project (UC Santa Barbara) | Publicada. Wikipedia da cifras que difieren por unos miles de votos |
| Votos electorales de 1936: 523 y 8 | National Archives (Electoral College, 1936) | Fuente oficial |
| Resultado de 1932: Roosevelt 57.4%, Hoover 39.6% | Wikipedia (1932 United States presidential election) | Secundaria |
| Encuesta de 1937 (764 personas que recibieron la boleta) | Lusinchi (2012), tabla 2, p. 37 | Publicada. «No la devolvió» incluye a 31 que no recordaban. Los porcentajes ponderados son del autor; los conteos son sin ponderar |

Fuentes completas:

- Lohr, S. L. y Brick, J. M. (2017). «Roosevelt Predicted to Win: Revisiting the 1936 Literary Digest Poll». *Statistics,
  Politics and Policy* 8(1): 65–84. https://doi.org/10.1515/spp-2016-0006
- Lusinchi, D. (2012). «"President" Landon and the 1936 Literary Digest Poll: Were Automobile and Telephone Owners to
  Blame?». *Social Science History* 36(1): 23–54. https://doi.org/10.1017/S014555320001035X
- History Matters, «Landon, 1,293,669; Roosevelt, 972,897» (fuente: *Literary Digest*, 31 de octubre de 1936).
  https://historymatters.gmu.edu/d/5168
- The American Presidency Project, «1936 Presidential Election». https://www.presidency.ucsb.edu/statistics/elections/1936
- National Archives, «1936 Electoral College Results». https://www.archives.gov/electoral-college/1936

## Lo que no se pudo obtener

- **La tabla por estado del Digest** (31 de octubre de 1936, pp. 5–6). No se consiguió un escaneo verificable. La
  transcripción de randomservices.org (Siegrist) **no se usa**: repite la fila de Arkansas en el Roosevelt de California y
  la de Luisiana en Maine, suma 550 votos electorales (en 1936 eran 531) y sus totales (1,280,041 y 869,825) no coinciden
  con el titular. Si el autor quiere la comparación por estado, hay que transcribirla del escaneo original y revisarla dos
  veces. The Online Books Page no encontró renovaciones de derechos de los números de la revista
  (https://onlinebooks.library.upenn.edu/webbin/cinfo/literarydigest), así que el número de 1936 probablemente es de dominio
  público en EE. UU.; se confirma al tener el escaneo.
- **Los microdatos de la encuesta de 1937** (Roper Center) no tienen licencia abierta. Solo se usan las cifras publicadas
  por Lusinchi.

## Reproducir

No hay simulación. La única cifra derivada es `digest_otros` = 2,376,523 − 1,293,669 − 972,897. Los demás cálculos los
hace el alumno en el caso.

El SHA-256 de `cifras.csv` está en `dataset.sha256` de `casos/staging/literary-digest-1936.json`.
