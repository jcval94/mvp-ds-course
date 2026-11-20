# Caso 2.2 en la página · «Florence Nightingale en Crimea» (1854-1856)

**Estado:** construido el 20 nov 2026 como propuesta para el autor (sitio: `site/casos/2-2/`). Sigue el patrón de
`docs/CASO_EN_PAGINA.md` en formato completo, como `docs/casos-pagina/2-1-john-snow.md`. Lo privado (claves de los retos,
rúbricas, plan docente y el bloque de `casos/caso_2_2.py`) vive en `docs/casos-pagina/2-2-nightingale-privado.md` de
`agentic-ds-backen`. Aquí no hay respuestas ni rúbricas.

- **Ficha:** `casos/staging/nightingale-crimea-1854.json` (estado `candidate`: cifras verificadas en la sesión, falta la
  revisión independiente para pasarla a `verified`).
- **Datos reales:** `casos/data/nightingale-crimea-1854/meses.csv`, la tabla mensual del ejército en Oriente de abril de
  1854 a marzo de 1856 (tropa promedio y muertes por enfermedades zimóticas, heridas y otras causas), de Nightingale
  (1858) en la transcripción de Pearson y Short (HistData); `cifras.csv` con las cifras sueltas y su fuente. Procedencia,
  hash y licencia en su `README.md`. No hay datos simulados.
- **Clase:** 4 (Módulo 2 «Ver para decidir»), caso principal junto a E29 Shipman (2.4).
- **Hábito:** `mide` (¿qué mide realmente este número?). **Nivel:** 2. **Peldaño:** 4, una comparación justa (misma base:
  por cada 1,000 soldados y por año).
- **Tipo:** ingenio · formato completo: intro de 5 escenas (~1 min) y caso en la página (~40 min).
- **Prerrequisitos:** sacar una tasa por cada 1,000 con la calculadora 8 bits (2.1); leer una gráfica de barras.
- **Objetivo observable:** ante una tasa que «no cabe» (más de 1,000 por cada 1,000), el alumno descubre que es mensual
  llevada a ritmo anual, compara meses con tropas distintas en la misma base, encuentra el error de una rosa que dibuja el
  radio en lugar del área, dibuja la honesta y firma qué le recomienda a la comisión.
- **Herramienta (se usa antes de nombrarse):** la tasa anualizada y estandarizar (misma base: por cada cuántos y en
  cuánto tiempo). Se nombra en la sección `anual`, después del reto 2.
- **Supuestos:** el motor `site/casos/caso.js` gana la tecla √ en la calculadora (la usa el reto 5); la rosa es SVG del
  caso (`rosa()` en `caso-escenas.js`), sin dependencias.

## 1. Cuidado con el tema

Muertes reales de soldados. Aviso de contenido en la intro y al abrir el expediente; sin heridos ni enfermos a la vista;
las cifras de muertes caen sin sonido ni destello; ninguna opción con humor (regla de `docs/GUIA_CASOS.md`).

## 2. Recorrido · «¿De qué mueren los soldados?»

| # | Sección (id) | Qué pasa en pantalla | Qué hace el alumno |
| --- | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | Londres, 1857: la Comisión Real recibe tres piezas (la tabla del ejército, la columna que no cabe y la rosa del asistente con sello BORRADOR) | Abrir el expediente |
| 2 | TU APUESTA (`apuesta`) | Diciembre de 1854: se puede mandar una sola cosa a Oriente | Elegir qué salva más vidas y por qué |
| 3 | LA TABLA (`tabla`) | Los 24 meses con tropa y muertes por causa, y barras de los totales | **Reto 1** (★): cuántas veces más murieron por enfermedad que por heridas. Dos julios: sacar la tasa por cada 1,000 de cada uno |
| 4 | EL NUMERO QUE NO CABE (`anual`) | La columna impresa de enero de 1855: más de 1,000 por cada 1,000 | Su cuenta de enero; **reto 2** (★★): por qué número se multiplica. Tarjeta que nombra la herramienta. **Reto 3** (★★): la tasa anual de marzo |
| 5 | LA ROSA DEL ASISTENTE (`asistente`) | Rosa con sello BORRADOR y su conclusión; mesa de verificación (medir radios y áreas, leer la leyenda de 1858) | Comparar las tasas; **reto 4** (★★, error plantado) |
| 6 | LA ROSA HONESTA (`honesta`) | Calculadora con √ | **Reto 5** (★★★): el radio honesto de marzo; ver las dos rosas; verificación con dos comprobaciones |
| 7 | FIRMA TU DECISION (`firma`) | La recomendación a la comisión | Recomendación, gráfica en una frase, certeza, lo que no sé, qué me haría cambiar |
| 8 | LA REVELACION (`revelacion`) | Puerta: se abre con la firma. Lo que sí pasó, el error de la rosa original, para qué sirvió, lo que no se sabe y mitos | Comparar su apuesta y su firma |
| 9 | LABORATORIO (`laboratorio`) | El armador de rosas: los mismos datos con cuatro perillas (tasa o conteo, área o radio, causa, año) | Probar qué combinaciones cambian la historia |
| 10 | TU PROPIA DECISION (`cierre`) | La taquería: el 720 de Don Juan; **reto 6** (★) | Mi decisión: qué número usa, por cada cuántos y en cuánto tiempo |

**Criterio en una frase** (propuesta): «¿Qué mide realmente este número? Antes de compararlo, pregunta por cada cuántos y
en cuánto tiempo, y dibújalo del tamaño que es.»

**Biblioteca:** `labs/level-2/comparacion-visual.html` (opcional, no cuenta). **Siguiente caso:** 2.4.

## 3. Intro (5 escenas, ~1 min)

Scutari de noche (tocar la puerta) · la sala con la enfermera y la lámpara (tocar la lámpara) · el registro (tocar el
libro: 3,168 muertes en enero de 1855) · la tabla de Nightingale (tocar la última columna: 1,174 de cada 1,000, al año) ·
expediente «SIN RESOLVER»: «¿Qué mide en realidad ese 1,174?». Prueba de spoiler: no dice de qué murieron, no muestra la
rosa ni nombra herramientas (`herramientasOcultas: 3`). Material real: grabado del cuartel de Scutari (Wellcome
Collection), `candidato` hasta confirmar licencia y bajarlo (k02).

## 4. Pendiente para el autor

- Aprobar los textos visibles (aviso, opciones de la apuesta y de la firma, criterio en una frase).
- Generar la voz de la intro: `python scripts/tts_intros 2-2` (necesita `OPENAI_API_KEY`; sin ella el harness falla).
- Revisión independiente (fase 3) para pasar la ficha a `verified`.
