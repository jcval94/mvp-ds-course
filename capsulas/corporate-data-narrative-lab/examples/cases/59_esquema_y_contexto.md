# El esquema que nadie le conto al analista

<!-- story
concept: esquema y contexto de datos
characters: Nadia, Hector, Sol, el jefe
situation: SQL y Datos se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: los nombres de columnas explican todo el negocio
escalation: el analisis confunde estados tecnicos con estados comerciales
data_turn: una persona compara el atajo contra una version verificable
chart: columnas con y sin definicion de negocio
decision: documentar tablas, llaves, definiciones y duenos de datos
punchline: La columna se llamaba status, que es como llamar cosa a una cosa importante.
rule: un esquema util combina estructura tecnica con significado de negocio
synthetic_data: true
-->

## La columna obvia

> **Nadia:** "Use la columna status para saber que clientes estaban activos."

> **Hector:** "Status ahi significa estado del tramite."

> **Sol:** "Pero dice status."

> **Nadia:** "Tambien dice id y no sabemos de que."

> **Sol:** "Los nombres deberian ser intuitivos."

> **el jefe:** "Intuitivo no es gobernanza."

El analisis confunde estados tecnicos con estados comerciales. La dificultad surgió al reutilizar el ejercicio: el atajo guardaba supuestos que solo conocía quien había escrito la primera versión.

## Status no era estado

> **Sol:** "Renombramos columnas en el reporte."

> **Hector:** "Primero entendamos que representan."

> **Sol:** "Podemos poner status bueno y status malo."

> **el jefe:** "Eso solo cambia la confusion de idioma."

> **Sol:** "El query corrio sin errores."

> **Nadia:** "SQL no sabe si entendiste el negocio."

> **Hector:** "El analisis confunde estados tecnicos con estados comerciales."

> **el jefe:** "Enséñame columnas con y sin definicion de negocio antes de cerrar."

El grupo puso columnas con y sin definicion de negocio junto al resultado anterior. La nueva comparación hizo visibles entradas, transformaciones y salida, justo lo necesario para detectar el punto de ruptura.

## Diccionario antes de conclusion

> **Nadia:** "Compare columnas con definicion y sin definicion."

> **el jefe:** "Donde nacieron las conclusiones equivocadas."

> **Nadia:** "En campos tecnicos usados como conceptos de negocio."

> **Hector:** "Entonces debemos documentar tablas, llaves, definiciones y duenos de datos."

> **Nadia:** "Un esquema util combina estructura tecnica con significado de negocio."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="columnas con y sin definicion de negocio">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">columnas con y sin definicion de negocio</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="193" width="174" height="67" fill="#286d9b"/>
  <text x="157" y="183" font-size="18" text-anchor="middle">36</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">solo nombre</text>
  <rect x="272" y="140" width="174" height="120" fill="#d58b2f"/>
  <text x="359" y="130" font-size="18" text-anchor="middle">64</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">con llave</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">93</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">con definicion</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">El contexto convierte columnas en significado.</text>
</svg>

<!-- learning:pause -->
> **Hector:** "Que contexto debe acompanar a un esquema para analizar datos con confianza."

**Lo que muestra:** La evidencia muestra que el esquema tecnico no basta. Hay que conocer llaves, granularidad, definiciones, valores permitidos, dueno y uso de negocio. Sin contexto, una consulta correcta puede responder la pregunta equivocada.

## El esquema habla negocio

> **el jefe:** "Crearemos diccionario de datos antes del siguiente analisis."

> **Sol:** "No es tan emocionante como graficar."

> **Nadia:** "Pero evita graficar mal con mucha seguridad."

> **Nadia:** "¿Qué cambiaremos después de revisar columnas con y sin definicion de negocio?"

> **Hector:** "La decisión es documentar tablas, llaves, definiciones y duenos de datos."

> **Sol:** "Y volvemos a medir esquema y contexto de datos antes del siguiente cierre."

> **Sol:** "El diccionario quedará junto a la consulta para que monto no vuelva a significar dos cosas."

> **el jefe:** "También anotaremos quién mantiene cada definición cuando cambie el proceso."

> **Hector:** "La columna se llamaba status, que es como llamar cosa a una cosa importante."

**Regla:** un esquema util combina estructura tecnica con significado de negocio.
