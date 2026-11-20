# Caso 2.4 en la página · «Shipman y el gráfico que nadie hizo» (Hyde, 1977-1998)

**Estado:** construido el 20 nov 2026 como propuesta para el autor (sitio: `site/casos/2-4/`). Es el **E29** de
`docs/ESTRUCTURA_GENERACION_1.md`; en el sitio y la base es el caso **2.4**. Sigue `docs/CASO_EN_PAGINA.md` en formato
corto, como `docs/casos-pagina/2-3-challenger.md`. Lo privado (claves de los retos, rúbricas, plan docente y el bloque de
`casos/caso_2_4.py`) vive en `docs/casos-pagina/2-4-shipman-privado.md` de `agentic-ds-backen`. Aquí no hay respuestas
ni rúbricas.

- **Ficha:** `casos/staging/shipman-hyde-1977.json` (estado `candidate`: cifras verificadas en la sesión, falta la
  revisión independiente y cotejar la Tabla 8.1 con una copia oficial).
- **Datos reales:** `casos/data/shipman-hyde-1977/certificados.csv`, la Tabla 8.1 de la auditoría de Baker (2001), filas
  de Hyde de 1977 a 1998: certificados de defunción que firmó el médico, sus pacientes, los de los médicos de comparación
  del pueblo y la diferencia con lo esperado que imprimió la auditoría; `cifras.csv` con las demás cifras y su fuente.
  Procedencia, hash y los dos detalles de la tabla impresa en su `README.md`. No hay datos simulados.
- **Clase:** 4 (Módulo 2 «Ver para decidir»), caso de «el costo del error» junto a 2.2 Nightingale.
- **Hábito:** `comparar` (¿contra qué lo comparo?). **Nivel:** 2. **Peldaño:** 4, una comparación justa (contra lo
  esperado para su lista), sumada en el tiempo.
- **Tipo:** costo del error · formato corto: intro de 3 escenas (~40 s) y caso en la página (~25 min).
- **Prerrequisitos:** sacar una tasa por cada 1,000 (2.1 y 2.2); restar y sumar con la calculadora 8 bits.
- **Objetivo observable:** ante el conteo de un médico, el alumno calcula lo esperado para su lista, ve que un reporte que
  mira cada año por separado no alcanza, lleva la suma de observado menos esperado año con año, decide dónde pondría una
  alarma sabiendo lo que cuesta una alarma falsa y firma qué haría en enero de 1986.
- **Herramienta (se usa antes de nombrarse):** observado menos esperado, la suma acumulada y el gráfico de control con
  línea de alarma (CUSUM, la versión con ajuste por riesgo). Se nombra en la sección `acumulado`, después del reto 3.
- **Supuestos:** lo esperado de la auditoría no viaja escrito en la página (sería la clave del reto 1): `datos.js` trae
  la diferencia impresa y el caso obtiene lo esperado como certificados menos diferencia (la prueba lo compara con el CSV).

## 1. Cuidado con el tema (casos con víctimas)

Homicidios reales. Aviso de contenido en la intro y al abrir el expediente; sin personas en la intro, sin nombres de
víctimas ni detalles de las muertes; el caso trabaja con conteos de certificados. Las víctimas se mencionan una vez, en la
revelación, con las cifras de la investigación pública. Sin sonido ni destello en las cifras y sin opciones con humor. El
nombre del médico aparece solo en la revelación. Matiz que el caso dice en voz alta: una alarma no acusa a nadie, dice
dónde revisar; la mayoría de las señales de un sistema así son de médicos inocentes.

## 2. Recorrido · «¿Cuándo habría sonado la alarma?»

| # | Sección (id) | Qué pasa en pantalla | Qué hace el alumno |
| --- | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | Aviso. Enero de 1986, Hyde: certificados, listas de pacientes y el reporte del asistente (cerrado) | Abrir el expediente |
| 2 | TU APUESTA (`apuesta`) | 1985: sus certificados contra los de todos los médicos de comparación juntos | ¿Abrirías una revisión? Opción y razón |
| 3 | LO ESPERADO (`esperado`) | Tabla de 1977 a 1985 (certificados y pacientes de él y de los demás) y calculadora | **Reto 1** (★★): lo esperado en 1984 para su lista. Después aparecen las columnas de lo esperado y la diferencia de la auditoría |
| 4 | EL REPORTE DEL ASISTENTE (`asistente`) | Barras de la diferencia por año con sello BORRADOR y la conclusión «variación normal»; mesa de verificación (contar años arriba y abajo, el año más alto, leer la nota de la tabla) | **Reto 2** (★★, error plantado) |
| 5 | LO QUE SE ACUMULA (`acumulado`) | Columna «lleva de más» que el alumno llena; su línea se dibuja con sus valores | **Reto 3** (★★★): lo que llevaba al terminar 1985. Tarjeta que nombra la herramienta; deslizador de la línea de alarma sobre la suma de la auditoría; el precio de las alarmas falsas; verificación con dos comprobaciones |
| 6 | FIRMA TU DECISION (`firma`) | Enero de 1986, solo con la suma hasta 1985 | Qué hace, su regla de alarma, quién firma la revisión (una persona), certeza, lo que no sé, qué me haría cambiar |
| 7 | LA REVELACION (`revelacion`) | Puerta: se abre con la firma. La suma de 1977 a 1998; expediente verificado (lo que sí pasó, la investigación, los certificados, el gráfico que nadie hizo, lo que no se sabe, mitos); su apuesta y su firma | Comparar |
| 8 | TU PROPIA DECISION (`cierre`) | La taquería: las quejas de la sucursal contra las esperadas por sus ventas | Mi decisión: contra qué esperado compara y cuándo sonaría su alarma |

**Criterio en una frase** (propuesta): «¿Contra qué lo comparo? Contra lo esperado, y no un año a la vez: suma la
diferencia y decide antes en qué punto revisas.»

**Biblioteca:** `labs/level-2/valores-atipicos.html` (opcional, no cuenta). **Siguiente caso:** 4.1 (clase 5).

## 3. Intro (formato corto, 3 escenas, ~40 s)

1. Hyde al atardecer (cielo tramado, Peninos, casas en hilera con humo, el consultorio y un farol con cono de luz); la
   cámara se acerca al consultorio. Material real: foto de Hyde desde Werneth Low (Commons, CC BY-SA 2.0), `candidato`.
2. El archivo bajo un foco: tocar los dos cajones; los marcadores de HUD caen sin destello ni sonido: 499 certificados
   de este médico y 210 del que más firmó de los demás.
3. Expediente «SIN RESOLVER»: la condena de 2000, que nadie vigilaba las muertes por médico y «¿Cuántas muertes de más
   hacen falta para que alguien lo note?».

Prueba de spoiler: no compara contra lo esperado, no suma nada año con año ni nombra herramientas
(`herramientasOcultas: 2`).

## 4. Pendiente para el autor

- Aprobar los textos visibles (avisos, opciones de la apuesta y de la firma, criterio en una frase).
- Generar la voz de la intro: `python scripts/tts_intros 2-4` (necesita `OPENAI_API_KEY`).
- Confirmar en Commons la licencia de la foto y bajarla (k02).
- Revisión independiente (fase 3) y cotejo de la Tabla 8.1 con una copia oficial antes de `verified`.
