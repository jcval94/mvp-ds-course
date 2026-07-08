# Level Narrative Arc: Nivel 1

## Identidad

- **ID:** `don-juan-paco-level-1-v1`.
- **Story Bible:** `docs/COURSE_STORY_BIBLE.md`, versión `don-juan-paco-course-v2`.
- **Ledger de entrada:** `L1.0`, sin dataset estructurado ni conceptos adquiridos.
- **Conflicto:** Don Juan necesita recordar qué ocurre en el puesto, pero las
  notas de Paco no permiten saber con precisión qué representa cada dato ni qué tan confiable es.
- **Promesa:** convertir observaciones cotidianas en pedidos trazables que puedan
  revisarse y prepararse antes de analizarlos.
- **Estado del puesto:** 3 × 2 metros, 8 asientos, un trompo, un comal, venta
  directa y 25–40 pedidos habituales por noche.
- **Estado familiar y escolar:** Paco cursa segundo de preparatoria y ayuda tres
  noches; Lupita es su mamá, Beto es su amigo de la escuela, y ninguno forma
  parte de la plantilla del puesto.

## Matriz incremental de dinámica de Nivel 1

| Episodio | Don Juan y Paco | Familia | Escuela | Narrador | Crecimiento |
| --- | --- | --- | --- | --- | --- |
| `L1-E1` | El padre asigna una tarea concreta; el hijo conecta una tarea escolar | Lupita protege el horario; Beto prueba si la explicación es simple sin ser culpable automático | Una consigna breve propone observar qué representa un registro | Introduce unidad, observación, población y muestra | Ninguno |
| `L1-E2` | Don Juan pregunta para qué sirve cada columna; Paco intenta explicar contexto | Solo se menciona la rutina familiar | Una consigna breve pide describir una tabla antes de usar IA | Introduce tipo, esquema y límite de la herramienta | Ninguno |
| `L1-E3` | Don Juan aporta tickets y contexto; Paco aprende a no corregir por intuición | Lupita recuerda que anotar más cosas también implica más responsabilidad | Una pregunta breve detona buscar contraejemplos | Clasifica problemas de calidad y concluye técnicamente | Ninguno |
| `L1-E4` | Paco documenta; Don Juan decide si el procedimiento sirve al puesto | La familia no absorbe trabajo nuevo | Una consigna breve pide entrada, pasos, salida y comprobaciones | Define skill y diferencia operación de decisión | Ninguno |

## Episodios

| ID | Bloque | Objetivo principal | Competencia auxiliar | Dataset entrada → salida | Puente |
| --- | --- | --- | --- | --- | --- |
| `L1-E1` | Alfabetización de datos | Identificar pedido, fila, variable, tabla, población y muestra | Describir el contexto mínimo de una tabla | notas → `pedidos_crudos@L1.1` | “¿Todas las columnas significan lo mismo?” |
| `L1-E2` | Tipos de variables | Clasificar variables por significado y operaciones compatibles | Crear esquema y diccionario de datos | `L1.1` → `esquema@L1.2` | “¿Que exista una columna significa que está bien capturada?” |
| `L1-E3` | Calidad de datos | Detectar faltantes, candidatos a duplicado, rangos inválidos y casos raros válidos | Añadir comprobaciones al procedimiento | `L1.2` → `reporte_calidad@L1.3` | “¿Cómo construimos una vista utilizable sin borrar evidencia?” |
| `L1-E4` | Preparación básica | Diferenciar filtrar, ordenar, agrupar y transformar | Escribir una skill con contrato verificable | `L1.3` → `pedidos_preparados@L1.4` | “Ya están limpios, pero ¿qué nos dicen realmente estos pedidos?” |

## Episodio L1-E1: La libreta y el yogurt

- **Estado previo:** Don Juan recuerda ventas por experiencia del negocio; Paco
  cursa preparatoria, sabe usar una hoja de cálculo y recibió una consigna breve
  de observación, pero no sabe definir unidad de análisis.
- **Necesidad:** registrar qué se pidió y cuándo sin observar atributos personales sensibles.
- **Tensión:** una parte de la libreta se mancha con yogurt y solo sobreviven algunas páginas.
- **Aprender:** cada fila se define como un pedido; las columnas describen ese
  pedido. El narrador distingue dato, variable, tabla, población objetivo y muestra.
- **Evidencia:** una tabla se construye por celdas; después se iluminan fila,
  columna, todos los pedidos de dos noches y las páginas recuperadas.
- **Ejercitar:** Don Juan recibe una fotografía con pedidos del primer turno y
  debe decidir si representa todas las ventas del fin de semana. Es un incidente
  nuevo y no vuelve a resolver la libreta manchada.
- **Decisión:** nombrar unidad de análisis, población y limitación de la muestra.
- **`continuityDelta`:** Paco aprende observación, variable, tabla, población y
  muestra; reconoce que digitalizar no elimina el sesgo de selección. Don Juan
  conserva lenguaje de negocio y solo exige que cada renglón se relacione con un ticket.
- **`dataStateDelta`:** sin reconstruir las páginas dañadas, se crea una captura
  sintética controlada de dos noches nuevas: `pedidos_crudos@L1.1`, 10 filas y 7 columnas.
- **Puente:** las columnas existen, pero Paco aún no sabe qué operaciones admite cada una.
- **`growthDelta`:** ninguno; el puesto conserva capacidad, horario y plantilla.

## Episodio L1-E2: El esquema que evita adivinanzas

- **Estado previo:** existe una tabla cruda; Don Juan reconoce que cada ticket
  corresponde a un pedido, sin usar terminología de datos.
- **Necesidad:** cumplir una consigna breve de IA: explicar la tabla a una
  herramienta y a otra persona sin depender de la memoria de Paco.
- **Tensión:** `Lunes` se había tratado como fecha y algunos valores numéricos podían ser identificadores.
- **Aprender:** `fecha_hora` es temporal; `num_tacos` es numérica;
  `tipo_taco` es categórica; `nivel_salsa` es ordinal; `para_llevar` es booleana;
  `comentario` es texto; `pedido_id` es identificador, no una cantidad.
- **Evidencia:** tarjetas de columnas se conectan con operaciones permitidas y prohibidas.
- **Ejercitar:** un invitado proveedor entrega un catálogo con códigos numéricos;
  Paco debe evitar promediarlos y completar el esquema antes de pedir ayuda a un agente.
- **Competencia auxiliar:** un esquema registra nombre, significado, tipo, valores
  permitidos, posibilidad de vacío y regla de validación.
- **`continuityDelta`:** Paco deja de creer que apariencia y significado son equivalentes.
- **`dataStateDelta`:** se documenta `esquema@L1.2`; no cambian las 10 filas.
- **Puente:** conocer el tipo no garantiza que los valores respeten el esquema.
- **`growthDelta`:** ninguno.

## Episodio L1-E3: Lo raro no siempre está mal

- **Estado previo:** el esquema permite revisar la tabla sin adivinar significados.
- **Necesidad:** saber qué pedidos pueden usarse para responder preguntas de operación.
- **Tensión:** aparece una cantidad faltante, un pedido de 500 tacos, dos filas con
  el mismo ID y un pedido confirmado de 30 tacos.
- **Aprender:** un vacío se conserva como faltante; 500 incumple una regla y se
  marca para verificar; las filas de `P-006` son candidatas a duplicado hasta
  consultar el ticket; 30 es raro, pero el pedido de Rogelio confirma que es válido.
- **Evidencia:** un escáner separa ausencia, inconsistencia, candidato a duplicado,
  valor inválido y caso raro válido.
- **Ejercitar:** el señor Rogelio pide revisar un encargo de su cuadrilla y Paco
  debe elegir entre corregir, marcar, contrastar con ticket o conservar; la
  respuesta depende del reporte visible y no revela la vida personal del cliente.
- **`continuityDelta`:** Don Juan aporta contexto operativo; Paco aprende a no
  inventar `23` a partir de `230` ni borrar automáticamente un valor extremo.
- **`dataStateDelta`:** `reporte_calidad@L1.3` registra 10 filas crudas, 9 IDs
  únicos, 1 faltante, 1 inválido, 1 duplicado confirmado y 1 caso raro válido.
- **Puente:** detectar problemas no produce todavía una vista lista para decidir.
- **`growthDelta`:** ninguno.

## Episodio L1-E4: La primera skill del puesto

- **Estado previo:** los hallazgos de calidad están documentados y los originales se conservan.
- **Necesidad:** convertir la tarea del profesor Iván en un procedimiento
  repetible para revisar pedidos válidos y resumir tacos.
- **Tensión:** limpiar “a mano” puede ocultar filas o cambiar criterios entre días.
- **Aprender:** filtrar selecciona filas y cambia la población descrita; ordenar
  cambia posición, no valores; agrupar cambia el nivel de detalle y exige una
  función; transformar crea una variable o representación nueva.
- **Evidencia:** la tabla muestra contador de filas antes/después, movimiento de
  orden, colapso por `tipo_taco` con suma declarada y creación de `es_pedido_grande`.
- **Ejercitar:** antes del turno, Paco debe ejecutar una secuencia para preparar
  insumos y detectar qué conclusión todavía no está respaldada.
- **Competencia auxiliar:** `preparar_pedidos_n1` declara entrada, pasos, salida,
  comprobaciones y límites; la skill no decide por Don Juan.
- **`continuityDelta`:** Paco puede documentar una preparación reproducible y
  Don Juan exige que los totales se puedan contrastar con tickets.
- **`dataStateDelta`:** `pedidos_preparados@L1.4` contiene 9 pedidos únicos: 7
  válidos completos, 1 faltante no imputado y 1 inválido pendiente de fuente.
- **Puente:** “Ya están limpios, pero ¿qué nos dicen realmente estos pedidos?”.
- **`growthDelta`:** ninguno; aprender a preparar datos no autoriza expansión.

## Contrato de la skill narrativa `preparar_pedidos_n1`

- **Entrada:** copia de `pedidos_crudos_nivel_1.csv`, esquema `L1.2` y reporte `L1.3`.
- **Pasos:** normalizar categorías y fecha; validar tipos y rangos; contrastar
  IDs repetidos con tickets; conservar faltantes; marcar inválidos; crear
  `es_pedido_grande`; preservar el original.
- **Salida:** `pedidos_preparados_nivel_1.csv` y conteo por estado de calidad.
- **Comprobaciones:** 10 filas de entrada; 9 IDs únicos; 9 filas de salida; 7
  válidas completas; 1 faltante; 1 inválida; `P-007=30` permanece como válido.
- **Límites:** no imputar, corregir ni eliminar sin regla y fuente; no usar
  atributos personales sensibles; no afirmar tendencias con dos noches.

## Cierre del nivel

- **Resolución:** el puesto posee una tabla trazable y una skill repetible, pero
  todavía no un resumen que compare cantidades o distribuciones.
- **Estado del puesto:** sin crecimiento; 3 × 2 metros, 8 asientos y 25–40
  pedidos habituales por noche.
- **Ledger de salida:** `L1.4`.
- **Pregunta a Nivel 2:** “Ya están limpios, pero ¿qué nos dicen realmente estos pedidos?”.

## Supuestos

- Los pedidos y personajes secundarios son ficticios.
- La historia está diseñada para 30 a 45 minutos por bloque, no como una sola sesión.
- Las tablas narrativas son sintéticas; En vivo debe usar un snapshot público real.
- Los profesores solo detonan tareas de forma ocasional; el narrador nombra
  conceptos, límites y conclusiones técnicas.
