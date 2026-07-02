# Historia Nivel 1: Don Juan, Paco y los datos del puesto de tacos

## Control del documento

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-1-v2`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 1: Fundamentos.
- **Story Bible:** `docs/COURSE_STORY_BIBLE.md`, versión `don-juan-paco-course-v2`.
- **Ledger de entrada:** `L1.0`.
- **Arco:** `docs/LEVEL_1_NARRATIVE_ARC.md`.
- **Audiencia:** personas adultas principiantes.
- **Duración:** cuatro episodios de 30 a 45 minutos.
- **Dataset:** sintético y sin atributos personales; una fila representa un pedido.

Esta historia se escribió antes de reformular el nivel interactivo. Es la fuente
canónica de escenas, diálogos y subtítulos; el HTML es una proyección de ella.

## 1. Temario predeterminado

El orden se conserva exactamente como está definido en el mapa curricular.

| Orden | Bloque | Concepto | Resultado curricular |
| ---: | --- | --- | --- |
| 1 | Alfabetización de datos | observación | Reconocer qué representa un registro |
| 2 | Alfabetización de datos | variable | Distinguir la característica registrada |
| 3 | Alfabetización de datos | tabla | Relacionar fila, columna y celda |
| 4 | Alfabetización de datos | población | Delimitar el conjunto completo de interés |
| 5 | Alfabetización de datos | muestra | Reconocer una parte y sus límites de representación |
| 6 | Tipos de variables | numérica | Elegir operaciones cuantitativas compatibles |
| 7 | Tipos de variables | categórica | Agrupar por etiquetas, no operar como cantidades |
| 8 | Tipos de variables | ordinal | Respetar orden sin inventar distancias iguales |
| 9 | Tipos de variables | fecha | Ordenar momentos y distinguirlos de etiquetas |
| 10 | Tipos de variables | texto | Conservar lenguaje libre y su contexto |
| 11 | Calidad de datos | faltantes | Distinguir ausencia de cero o valor inventado |
| 12 | Calidad de datos | duplicados | Exigir identidad y evidencia antes de consolidar |
| 13 | Calidad de datos | rangos inválidos | Contrastar reglas, contexto y fuente |
| 14 | Calidad de datos | sesgo de medición | Reconocer qué quedó fuera o se registró distinto |
| 15 | Preparación básica | filtrar | Seleccionar filas y declarar qué conjunto queda |
| 16 | Preparación básica | ordenar | Cambiar posición sin alterar valores |
| 17 | Preparación básica | agrupar | Cambiar nivel de detalle con una operación explícita |
| 18 | Preparación básica | transformar | Crear una representación nueva sin ocultar el origen |

**Competencia auxiliar del nivel:** documentar esquema, diccionario de datos y
una skill como procedimiento con entrada, pasos, salida, comprobaciones y límites.

## 2. Estado narrativo de entrada

- Don Juan es dueño y taquero. Conoce clientes, insumos, capacidad, dinero y
  tiempos; no conoce ni utiliza ciencia de datos.
- Paco es su hijo, cursa segundo de preparatoria y ayuda jueves, viernes y sábado
  después de terminar la tarea. En una clase aprende datos y en otra IA.
- Lupita protege la escuela y la distribución justa del trabajo familiar.
- Beto es el hermano menor; hace preguntas literales, pero no trabaja en el puesto.
- El puesto mide 3 × 2 metros, tiene un trompo, un comal, ocho asientos y atiende
  normalmente entre 25 y 40 pedidos por noche. No crece durante este nivel.
- Los registros viven en tickets de papel y en la memoria de Don Juan; todavía
  no existe un conjunto estructurado.

## 3. Mapa trazable de escenas

| Escena | Concepto | Situación de Aprender | Subtítulo de conclusión | Incidente distinto de Ejercitar |
| --- | --- | --- | --- | --- |
| `L1-S01` | observación | Paco registra un pedido por renglón | Una observación es el registro de una unidad definida | Elegir qué representa una fila en una foto de tickets |
| `L1-S02` | variable | Don Juan pregunta para qué sirve cada columna | Una variable registra una característica de cada pedido | Elegir la columna útil para preparar tortillas |
| `L1-S03` | tabla | Una cantidad aislada pierde su contexto | La tabla organiza observaciones por filas y variables por columnas | Reconstruir encabezados de una tabla recortada |
| `L1-S04` | población | Don Juan pregunta por todas las ventas de dos noches | La población es el conjunto completo definido por la pregunta | Delimitar todos los pedidos de un fin de semana |
| `L1-S05` | muestra | El yogurt daña las últimas páginas | Una muestra es solo una parte y puede representar mal a la población | Evaluar una foto que solo contiene el primer turno |
| `L1-S06` | numérica | `num_tacos` admite suma y comparación | El significado, no la apariencia, permite operaciones numéricas | Elegir entre cantidad y número de ticket |
| `L1-S07` | categórica | `tipo_taco` separa productos | Una categoría agrupa etiquetas; restarlas no tiene sentido | Normalizar un catálogo de proveedor |
| `L1-S08` | ordinal | `nivel_salsa` tiene orden | Un ordinal tiene orden, pero no distancia numérica garantizada | Ordenar intensidades sin afirmar el doble de picante |
| `L1-S09` | fecha | “Lunes” se compara con fecha y hora | Un día de semana no sustituye un momento completo | Ordenar tres tickets con fecha y hora |
| `L1-S10` | texto | `comentario` conserva una nota libre | El texto requiere contexto o una regla antes de resumirse | Distinguir nota operativa de categoría normalizada |
| `L1-S11` | faltantes | P-003 no tiene cantidad | Vacío no significa cero, guion ni valor adivinado | Decidir qué hacer con un ticket borroso |
| `L1-S12` | duplicados | P-006 aparece dos veces | Filas iguales son candidatas; el ticket confirma el duplicado | Comparar IDs, hora y comprobante de dos capturas |
| `L1-S13` | rangos inválidos | P-005 contiene 500 por mezclar el total diario | Un valor sospechoso se marca y contrasta; no se corrige por intuición | Distinguir P-005 de los 30 tacos confirmados de Rogelio |
| `L1-S14` | sesgo de medición | Se perdieron más notas del cierre | Lo no registrado puede cambiar la conclusión aunque lo visible esté limpio | Comparar primer turno con la pregunta sobre toda la noche |
| `L1-S15` | filtrar | Se seleccionan pedidos válidos completos | Filtrar cambia qué filas sostienen la respuesta | Elegir un filtro para compras sin borrar el original |
| `L1-S16` | ordenar | Los pedidos se acomodan por cantidad | Ordenar cambia posición, no valor ni momento de ocurrencia | Detectar por qué el primer renglón no fue el primer pedido |
| `L1-S17` | agrupar | Se suman tacos por tipo | Agrupar cambia el detalle y exige declarar la operación | Comparar contar pedidos contra sumar tacos |
| `L1-S18` | transformar | Se crea `es_pedido_grande` | Transformar crea una representación y debe conservar la regla | Revisar una skill con entrada, comprobaciones y límites |

## 4. Historia

### Episodio 1: La libreta, los pedidos y el yogurt

El puesto ocupa una esquina bajo un toldo de tres por dos metros. Don Juan puede
oír cuándo el trompo necesita carne y sabe que los viernes se terminan antes las
tortillas. Lo que no puede hacer es recordar cada pedido después de una noche larga.

Paco llega de la preparatoria, termina la tarea en la mesa de la casa y se pone
el mandil para ayudar. La profesora Elena le pidió observar una actividad
cotidiana. Don Juan ve una oportunidad menos escolar:

**Don Juan:** —Mijo, anote los pedidos. Quiero saber qué sale y a qué hora, no
andar comprando cilantro con puro presentimiento.

**Paco:** —Va, apá. Y de paso uso esto para la tarea.

#### Escena L1-S01 · Observación

Paco escribe el ticket `P-001`, la hora, el tipo de taco y la cantidad en un
solo renglón.

> **Subtítulo del narrador · inicio:** Antes de analizar, hay que decidir qué representa cada registro.

**Don Juan:** —Todo ese renglón es un pedido. Si lo parte, luego ni quién sepa
qué tacos iban juntos.

**Paco:** —Entonces empiezo uno nuevo cuando cierro el ticket, apá.

> **Subtítulo del narrador · evidencia:** Una observación es el registro de una unidad definida. Aquí, la unidad de análisis es un pedido.

**Evidencia visible:** se ilumina el renglón completo de `P-001`.

#### Escena L1-S02 · Variable

Paco agrega encabezados: `pedido_id`, `fecha_hora`, `tipo_taco`, `num_tacos` y
`para_llevar`.

> **Subtítulo del narrador · inicio:** Cada columna debe registrar la misma característica para todos los pedidos.

**Don Juan:** —Esta columna me dice cuántos fueron. La otra, cuáles. No las
revuelva porque para comprar tortillas necesito una y para preparar carne, otra.

**Paco:** —Entendido. Una pregunta por columna.

> **Subtítulo del narrador · evidencia:** Una variable es una característica que puede tomar valores diferentes entre observaciones.

**Evidencia visible:** se recorre la columna `num_tacos` y cambian sus valores.

#### Escena L1-S03 · Tabla

Don Juan apunta al número 3 de `P-002`.

> **Subtítulo del narrador · inicio:** Un dato aislado pierde el significado que le dan su fila y su encabezado.

**Don Juan:** —Ese tres solito no me dice nada. Puede ser ticket, tacos o mesa.

**Paco:** —Con el renglón y el título sabemos que son tres tacos del P-002.

> **Subtítulo del narrador · evidencia:** Una tabla organiza observaciones en filas y variables en columnas; no por estar en una tabla se convierte automáticamente en una base de datos.

**Evidencia visible:** la celda 3 se conecta con `P-002` y `num_tacos`.

#### Escena L1-S04 · Población

Al final de la segunda noche, Don Juan pregunta si ya pueden hablar de todas las
ventas que querían registrar.

> **Subtítulo del narrador · inicio:** La pregunta define cuál es el conjunto completo de interés.

**Don Juan:** —Yo pregunté por las dos noches completas. No nomás por la hora en
que todavía había lugar para escribir.

**Paco:** —Entonces cuentan todos los pedidos de esas dos noches.

> **Subtítulo del narrador · evidencia:** La población objetivo es el conjunto completo definido por la pregunta: todos los pedidos de las dos noches observadas.

**Evidencia visible:** todos los tickets de ambas noches quedan dentro de un marco.

#### Escena L1-S05 · Muestra

Paco guarda la libreta junto a un yogurt que había decidido no comerse. El yogurt
decide participar. Varias hojas del final quedan ilegibles.

**Don Juan:** —Ya aprendimos dos cosas: la mochila no es archivero y el yogurt no
es respaldo.

**Lupita:** —Y no vas a inventar lo que ya no se ve. Mañana tienes clase.

**Beto:** —¿La mancha rosa cuenta como pedido nuevo?

> **Subtítulo del narrador · inicio:** Las páginas legibles contienen solo una parte de la población original.

**Paco:** —No, Beto. La mancha no recupera lo que se borró. Solo nos quedaron
algunos pedidos.

> **Subtítulo del narrador · evidencia:** Esa parte es una muestra. Si se perdieron sobre todo las últimas páginas, los pedidos del cierre quedan subrepresentados y la muestra puede estar sesgada.

Paco no reconstruye valores de memoria. Para continuar la clase realiza una
captura controlada en dos noches nuevas: diez filas que forman la población
finita del ejercicio didáctico. La nube facilitará copias y versiones, pero no
garantiza que nada se borre ni que todo esté correcto.

**Salida del episodio:** `pedidos_crudos@L1.1`, 10 filas y 7 columnas.

### Episodio 2: Un esquema para no hacer adivinanzas

En Laboratorio de IA, el profesor Iván pidió describir una tabla antes de usar
una herramienta. Paco abre el archivo frente a su papá.

**Paco:** —Ya quedó digital, apá. Ahora sí la computadora debe entenderlo.

**Don Juan:** —A ver si entiende mejor que yo por qué pusiste “Lunes” donde iba la hora.

#### Escena L1-S06 · Numérica

> **Subtítulo del narrador · inicio:** Que un valor use dígitos no basta para tratarlo como cantidad.

**Don Juan:** —Los tacos sí los sumo. Los números de ticket solo me sirven para
encontrar el papel.

**Paco:** —Entonces `num_tacos` y `pedido_id` no se usan igual, aunque los dos tengan números.

> **Subtítulo del narrador · evidencia:** `num_tacos` es una variable numérica discreta: admite sumas y comparaciones. `pedido_id` es un identificador categórico y promediarlo no produce una cantidad útil.

#### Escena L1-S07 · Categórica

> **Subtítulo del narrador · inicio:** Algunas variables separan observaciones mediante nombres o etiquetas.

**Don Juan:** —Pastor y bistec me dicen qué preparo. No existe eso de pastor
menos bistec.

**Paco:** —Sí puedo contar cuántos pedidos hay de cada uno.

> **Subtítulo del narrador · evidencia:** `tipo_taco` es categórica: permite agrupar y contar por categoría, pero no restar sus etiquetas.

#### Escena L1-S08 · Ordinal

Paco revisa `Sin salsa`, `Poca`, `Media` y `Mucha`.

> **Subtítulo del narrador · inicio:** Algunas categorías tienen un orden natural sin medir una distancia exacta.

**Don Juan:** —Mucha va después de media, pero no me diga que pica exactamente
el doble. Cada salsa sale distinta.

**Paco:** —Puedo ordenarlas sin ponerles una distancia inventada.

> **Subtítulo del narrador · evidencia:** `nivel_salsa` es ordinal: conserva un orden, pero no garantiza intervalos iguales entre niveles.

#### Escena L1-S09 · Fecha

> **Subtítulo del narrador · inicio:** Una etiqueta como “Lunes” no identifica por sí sola un momento.

**Don Juan:** —Lunes hay cada semana. Yo necesito saber cuál y a qué hora fue el pedido.

**Paco:** —Entonces guardo `2026-06-01 19:05`, no solo el nombre del día.

> **Subtítulo del narrador · evidencia:** `fecha_hora` es temporal y puede ordenarse cronológicamente. “Lunes” es una categoría derivada, no una fecha completa.

#### Escena L1-S10 · Texto

Paco encuentra notas como “Mesa 2” y “No se anotó la cantidad”.

> **Subtítulo del narrador · inicio:** El texto libre conserva detalles que todavía no siguen un catálogo común.

**Don Juan:** —La nota ayuda a recordar qué pasó, pero cada quien la escribe distinto.

**Paco:** —La guardo original y no la convierto en una categoría sin una regla.

> **Subtítulo del narrador · evidencia:** `comentario` es texto. Para resumirlo o transformarlo hace falta contexto, una regla explícita y revisión.

Paco arma el esquema: nombre, significado, tipo, valores permitidos, posibilidad
de vacío y regla de validación. El esquema da contexto a otra persona o a un
agente, pero no garantiza que su respuesta sea correcta.

**Salida del episodio:** `esquema@L1.2`; las diez filas originales no cambian.

### Episodio 3: Lo raro no siempre está mal

Don Juan quiere saber cuántos tacos preparar para el siguiente turno. Paco
encuentra un vacío, dos filas iguales, una cantidad de 500 y otra de 30.

#### Escena L1-S11 · Faltantes

> **Subtítulo del narrador · inicio:** En P-003, la cantidad no fue registrada.

**Paco:** —Puedo poner un guion para que no se vea vacío.

**Don Juan:** —El guion tampoco me dice cuántos fueron, mijo.

> **Subtítulo del narrador · evidencia:** Un faltante representa ausencia de información. No equivale a cero, a un guion ni a un valor elegido para completar la tabla.

Paco conserva la celda vacía y documenta que P-003 no puede usarse para sumar tacos.

#### Escena L1-S12 · Duplicados

> **Subtítulo del narrador · inicio:** P-006 aparece dos veces con los mismos valores; eso exige revisión, no borrado automático.

**Don Juan:** —Busque el ticket 184. Si hay uno, lo copiamos dos veces. Si hay
dos, fueron dos pedidos y ya.

**Paco:** —Hay un solo ticket. Ahora sí tenemos cómo comprobarlo.

> **Subtítulo del narrador · evidencia:** Dos filas iguales son candidatas a duplicado. La identidad del pedido y una fuente externa confirman que P-006 fue capturado dos veces.

#### Escena L1-S13 · Rangos inválidos

Paco señala P-005 con 500 tacos y luego P-007 con 30.

> **Subtítulo del narrador · inicio:** Parecer grande no basta para decidir si un valor es erróneo.

**Paco:** —El de treinta también se ve mal. ¿Lo quitamos?

**Don Juan:** —Ese fue Rogelio para su cuadrilla. Grande, sí. Inventado, no. El
de quinientos dice “total del día”; ahí revolvimos cuentas.

> **Subtítulo del narrador · evidencia:** P-005 incumple la unidad del registro y queda inválido hasta consultar la fuente. P-007 es atípico frente a los demás, pero el ticket confirma que es válido.

Rogelio llega por otro encargo. Prefiere que nadie lo reconozca cuando compra
para sí mismo, pero ese secreto no se registra ni se infiere de sus pedidos.

#### Escena L1-S14 · Sesgo de medición

> **Subtítulo del narrador · inicio:** Una tabla puede estar limpia y aun así describir de manera incompleta el negocio.

**Don Juan:** —Si nomás anotamos cuando usted está aquí, se nos queda fuera el cierre.

**Paco:** —Y los pedidos de esa hora pueden ser distintos.

> **Subtítulo del narrador · evidencia:** El sesgo de medición aparece cuando el proceso registra sistemáticamente una parte distinta de la realidad. Perder o no capturar el cierre puede cambiar la conclusión.

El reporte conserva diez filas crudas, nueve IDs únicos, un faltante, un valor
inválido, un duplicado confirmado y un caso grande válido. Tampoco agrega edad,
género, ropa ni nombres: no ayudan a la pregunta y crearían riesgos innecesarios.

**Salida del episodio:** `reporte_de_calidad@L1.3`.

### Episodio 4: La primera skill del puesto

En su clase de IA, Paco recibió una tarea: escribir un procedimiento que otra
persona pueda repetir y comprobar. Abre el archivo original y se dispone a cambiarlo.

**Don Juan:** —Primero haga una copia. En la cocina tampoco arreglamos la salsa
tirando la receta original.

#### Escena L1-S15 · Filtrar

> **Subtítulo del narrador · inicio:** Filtrar selecciona filas que cumplen una condición.

**Don Juan:** —Si va a contar para la compra, dígame cuáles pedidos dejó afuera y por qué.

**Paco:** —Conservo el original y hago una vista de pedidos válidos completos.

> **Subtítulo del narrador · evidencia:** Filtrar cambia el conjunto que sostiene la respuesta. La condición y el número de filas antes y después deben quedar visibles.

#### Escena L1-S16 · Ordenar

> **Subtítulo del narrador · inicio:** Ordenar cambia la posición de las filas según una variable.

**Don Juan:** —Que el pedido de treinta quede arriba no quiere decir que llegó primero.

**Paco:** —Solo está primero porque lo acomodé de mayor a menor.

> **Subtítulo del narrador · evidencia:** Ordenar no altera los valores ni el momento en que ocurrieron; solo modifica su posición en la vista.

#### Escena L1-S17 · Agrupar

> **Subtítulo del narrador · inicio:** Agrupar reúne filas que comparten una categoría y exige declarar qué cálculo se hará.

**Don Juan:** —Para la carne necesito tacos, no nomás saber cuántos tickets dicen pastor.

**Paco:** —Entonces agrupo por tipo y sumo `num_tacos`; contar pedidos respondería otra pregunta.

> **Subtítulo del narrador · evidencia:** Agrupar cambia el nivel de detalle. “Suma de tacos por tipo” y “número de pedidos por tipo” son resultados distintos.

#### Escena L1-S18 · Transformar

Paco crea `es_pedido_grande` con la regla `num_tacos >= 10` y conserva la cantidad original.

> **Subtítulo del narrador · inicio:** Transformar crea o modifica una representación mediante una regla explícita.

**Don Juan:** —Ponga la regla por escrito. Si mañana ocho ya cuenta como grande,
quiero saber que cambiamos la receta.

**Paco:** —La cantidad se queda. La nueva columna solo resume si llega a diez.

> **Subtítulo del narrador · evidencia:** Una transformación debe conservar su regla, versión y dato de origen para que otra persona pueda comprobarla.

Paco documenta la skill `preparar_pedidos_n1`:

- **Entrada:** copia de pedidos crudos, esquema y reporte de calidad.
- **Pasos:** normalizar categorías y fecha; validar; contrastar IDs repetidos;
  conservar faltantes; marcar inválidos; crear `es_pedido_grande`.
- **Salida:** tabla preparada y conteo por estado de calidad.
- **Comprobaciones:** entran 10 filas; existen 9 IDs; salen 9 pedidos únicos;
  hay 7 válidos completos, 1 faltante y 1 inválido; P-007 conserva 30 tacos.
- **Límites:** no inventar valores, no borrar casos posibles sin fuente, no usar
  atributos personales innecesarios y no generalizar desde dos noches.

**Don Juan:** —Ahora sí. No decide por nosotros, pero por lo menos no cambia de
receta cada vez que abrimos la hoja.

**Paco:** —Apá, ya están limpios… ¿pero qué nos dicen realmente estos pedidos?

**Don Juan:** —Eso averígüelo antes de que compre veinte kilos de cilantro por una corazonada.

> **Subtítulo del narrador · cierre:** El Nivel 1 termina con datos trazables y preparados, no con una conclusión sobre el negocio. Describir y visualizar esos pedidos abre el Nivel 2.

**Salida del episodio:** `pedidos_preparados@L1.4`, nueve pedidos únicos.

## 5. Contrato de subtítulos

- El narrador nunca aparece como personaje, bocadillo o diálogo.
- Cada escena tiene al menos un subtítulo inicial y uno de evidencia.
- El subtítulo inicial nombra la pregunta o mecanismo; no revela la respuesta de Ejercitar.
- El subtítulo de evidencia formula la conclusión técnica después de mostrarla.
- En pantalla se usa una banda de alto contraste con la etiqueta `Narrador` y
  una sola idea breve a la vez.
- Lectores de pantalla reciben el mismo texto mediante `aria-live="polite"`.
- Don Juan cierra consecuencias del puesto; el narrador cierra ciencia de datos.

## 6. Estado narrativo de salida

- **Paco:** reconoce los 18 conceptos del Nivel 1 y puede documentar esquema y skill;
  todavía no domina estadística descriptiva.
- **Don Juan:** sabe qué registros puede contrastar con tickets y qué preguntas
  siguen abiertas; continúa sin usar conceptos técnicos.
- **Relación:** padre e hijo pasan de una tarea encargada a un procedimiento
  compartido; Don Juan decide el negocio y Paco documenta y propone comprobaciones.
- **Puesto:** sin crecimiento; conserva 3 × 2 metros, ocho asientos, un trompo,
  un comal y 25–40 pedidos habituales por noche.
- **Dataset:** `pedidos_crudos -> esquema -> reporte_de_calidad -> pedidos_preparados`.
- **Pregunta abierta:** “Ya están limpios, pero ¿qué nos dicen realmente estos pedidos?”.

## 7. Validación narrativa previa a implementación

- Los 18 conceptos curriculares aparecen una vez y en orden.
- Don Juan no introduce ni concluye conceptos de ciencia de datos.
- Paco solo nombra un concepto después del subtítulo que lo presenta.
- El narrador contiene todas las definiciones y conclusiones técnicas.
- Las 18 prácticas usan un incidente o evidencia distintos de Aprender.
- El yogurt produce una muestra posiblemente sesgada; no recupera ni justifica datos.
- `500`, el faltante y el duplicado no se corrigen sin fuente.
- El pedido de 30 se conserva por evidencia contextual.
- No se registran atributos personales ni el secreto de Rogelio.
- El puesto no crece durante Nivel 1.

## Supuestos

- Todos los personajes y pedidos son ficticios.
- La captura de diez pedidos aísla mecanismos pedagógicos y no representa la
  demanda habitual completa.
- Las escenas de En vivo siguen necesitando un snapshot público real; la historia
  sintética no lo reemplaza.

## No objetivos

- enseñar todavía media, mediana, distribución o predicción;
- recomendar compras con solo dos noches;
- hacer que una IA decida por Don Juan;
- convertir a Paco, Lupita o Beto en personal no pagado;
- expandir el puesto antes de contar con evidencia de niveles posteriores.
