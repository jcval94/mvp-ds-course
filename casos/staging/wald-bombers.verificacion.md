# Verificación · wald-bombers

Fecha: 2026-10-06 · Estado resultante: `verified` (no `approved`)

Investigación y verificación se hicieron en sesiones separadas: un agente redactó el
candidato y otro, sin acceso a su razonamiento, leyó las tres fuentes y dictaminó
cada afirmación.

| # | Afirmación (resumen) | Dictamen | Evidencia |
| --- | --- | --- | --- |
| 1 | Wald en el SRG de Columbia durante la guerra | Respaldada | AMS y CNA |
| 2 | Memorandos hacia 1943 sobre vulnerabilidad a partir de sobrevivientes | Respaldada; el año solo lo da Casselman | AMS, CNA |
| 3 | Nunca publicados externamente; reimpresión del CNA en julio de 1980 (CRC 432) | Corregida: "nunca", con copias en circulación; Casselman dice 1981 pero cita a DePoy: julio de 1980 | CNA, DTIC, AMS |
| 4 | Metodología usada en Corea y Vietnam | Respaldada | CNA |
| 5 | Método: proporción de aviones que regresan con i impactos; supuestos | Corregida: los supuestos explícitos son independencia de impactos previos y ausencia de error de muestreo | DTIC |
| 6 | Wallis: impactos uniformes y tendencia militar a blindar donde había más impactos | Agregada a partir de la réplica de Wallis citada por Casselman | AMS |

Cambios en incertidumbres y mitos: la incertidumbre sobre Wallis ahora reconoce que su
réplica sí nombra a Wald; el mito de la imagen de puntos rojos ya no afirma que es
"moderna", solo que no muestra datos de Wald.

## Antes de `approved`

1. Leer Mangel y Samaniego (1984, *JASA* 79), la guía técnica de los memorandos.
2. Revisión humana del texto en un PR que agregue el caso a `casos/cases.jsonl`.

## Fuentes

- Bill Casselman, "The Legend of Abraham Wald", AMS Feature Column: https://www.ams.org/samplings/feature-column/fc-2016-06
- Center for Naval Analyses, ficha del reporte: https://cna.org/reports/1980/a-method-of-estimating-plane-vulnerability
- DTIC, reimpresión CRC 432: https://apps.dtic.mil/sti/pdfs/ADA091073.pdf

---

## Contraste con la fuente primaria y con Mangel y Samaniego (13 nov 2026)

**Qué se leyó.** La reimpresión de los memorandos de Wald (CNA, CRC 432, julio de 1980; DTIC ADA091073), en sus primeras
100,000 de 132,674 caracteres: índice de las partes I a VI, el ejemplo de la parte V y los supuestos. El artículo de
Mangel y Samaniego (1984, *JASA* 79(386), 259–267, DOI 10.1080/01621459.1984.10478038) **no se pudo leer completo**: está
tras el muro de pago de la revista y no se usaron copias no autorizadas. De él se tomó solo lo que Casselman (AMS, 2016)
reproduce con precisión: el ejemplo de la parte I (400 aviones, 380 regresan) y su lectura de los supuestos. Por eso el
punto 1 de «Antes de `approved`» queda **sustituido por la lectura de la fuente primaria**, que es lo que Mangel y
Samaniego resumen; si el autor quiere el artículo, lo consigue con su acceso a JSTOR o a la revista.

| # | Afirmación del caso | Dónde aparece | Qué dice la fuente | Veredicto | Cambio propuesto |
| --- | --- | --- | --- | --- | --- |
| 7 | Wald, matemático del SRG de Columbia en la guerra | `caso-escenas.js:290`, intro `escenas.js:3` | AMS lo afirma; la reimpresión (truncada) no nombra al SRG ni a Columbia | Confirmado (fuente secundaria fiable) | Ninguno |
| 8 | Hacia 1943 escribió memorandos con un método para estimar la vulnerabilidad de cada parte | `caso-escenas.js:291` | Reimpresión: seis partes (I a VI) sobre probabilidades de derribo y, en la V, por zonas del avión. El año lo da Casselman; la reimpresión visible no lo dice | Confirmado; año «hacia 1943» bien matizado | Ninguno |
| 9 | En sus ejemplos los impactos se reparten según el área de cada parte | `caso-escenas.js:292` | Parte V: la probabilidad de que un impacto caiga en cada parte se toma como su proporción de área (estimada con dispersión de disparos o balas de prueba) | **Confirmado en la fuente primaria** | Ninguno |
| 10 | Reimpresión del CNA en julio de 1980; uso en Corea y Vietnam | `caso-escenas.js:293` | La reimpresión dice «JUL 80». Corea y Vietnam: ficha del CNA (ya revisada el 6 oct) | Confirmado | Ninguno |
| 11 | «Lo que sí escribió: ejemplos hipotéticos con motores, fuselaje y combustible, **y que el método puede guiar dónde va el blindaje**» | `caso-escenas.js:294` | Los ejemplos sí existen (parte V: motores, fuselaje, combustible y otras partes). La reimpresión **no** recomienda dónde blindar ni dice que el método sirva para eso; es Mangel y Samaniego quienes plantean el problema como decisión del comandante | **Matizar** | Texto visible propuesto: «Un ejemplo hipotético con motores, fuselaje y combustible. En él, la zona más vulnerable eran los motores: un impacto ahí era el que más probablemente derribaba al avión. No escribió dónde poner el blindaje.» |
| 12 | El giro del caso: los agujeros que faltan en los motores estaban en los aviones que no volvieron | `caso-escenas.js:222` | Parte V, ejemplo hipotético: 400 aviones, 359 regresan; los motores son 26.9 % del área pero reciben 19.3 % de los impactos de los que regresan; probabilidad de sobrevivir un impacto: motores 0.61, fuselaje 0.95, combustible 0.85, otras partes 0.98. Wald concluye que el motor es la zona más vulnerable | **Confirmado: coincide con el propio ejemplo de Wald** | Opcional: citar este ejemplo en la revelación como «lo que calculó Wald» (cifras hipotéticas de Wald, no de la guerra) |
| 13 | Supuestos del método | ficha, «Lo que no sabemos» | Reimpresión: se ignoran los errores de muestreo (partes I a V) y la probabilidad de derribo no depende de los impactos previos que no derribaron; la parte VI agrega límites de confianza | Confirmado (ya estaba en la ficha) | Ninguno |
| 14 | Intro: «1943… en Nueva York un grupo de matemáticos recibe el registro» y el mapa de agujeros | `escenas.js:211`, `index.html:17` | No hay constancia de un mapa de agujeros entregado al grupo; el registro de la intro sale de la simulación del caso | **Matizar** (no es falso, pero mezcla escena histórica y datos simulados) | Agregar en el mapa de la intro un rótulo pequeño «DATOS SIMULADOS», como ya hace el caso en su primera sección |
| 15 | Ejemplo de la parte I que reproduce Mangel y Samaniego: 400 aviones, 380 regresan, 320 sin impactos | No aparece en el caso | Casselman (AMS) lo toma de Mangel y Samaniego | Confirmado (secundaria) | Ninguno |

### Resumen para aprobar

1. **Sólido:** quién era Wald, dónde trabajaba, qué escribió hacia 1943, el supuesto del área, la reimpresión de 1980 y el
   uso posterior. Nada de lo que el caso afirma resultó falso.
2. **El giro del caso coincide con Wald:** en su propio ejemplo hipotético, los motores son la zona más vulnerable. Es
   un buen dato para la revelación, siempre presentado como ejemplo hipotético de Wald.
3. **Matizar un texto visible** (fila 11): Wald no escribió que su método sirviera para decidir el blindaje.
4. **Matizar la intro** (fila 14): rotular el mapa como datos simulados para no reforzar el mito del avión con puntos.
5. **Sin comprobar:** el texto completo de Mangel y Samaniego (muro de pago) y el último cuarto de la reimpresión.
6. Con los cambios 3 y 4 aprobados, el caso puede pasar a `approved`; eso lo marca el autor en un PR que lo agregue a
   `casos/cases.jsonl`.

### Fuentes de esta revisión

- Wald, A. (1943; reimpresión CNA, julio de 1980). *A Method of Estimating Plane Vulnerability Based on Damage of Survivors*. CRC 432: https://apps.dtic.mil/sti/pdfs/ADA091073.pdf
- Casselman, B. (2016). «The Legend of Abraham Wald». AMS Feature Column: https://www.ams.org/samplings/feature-column/fc-2016-06
- Mangel, M. y Samaniego, F. J. (1984). «Abraham Wald's Work on Aircraft Survivability». *JASA* 79(386), 259–267. https://doi.org/10.1080/01621459.1984.10478038 (no leído completo)
