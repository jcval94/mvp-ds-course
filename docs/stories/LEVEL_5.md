# Historia Nivel 5: Anticipar sin adivinar

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-5-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 5.
- **Arco:** `docs/LEVEL_5_NARRATIVE_ARC.md`.
- **Entrada/salida:** `L4.4 / G3-espera → L5.6 / G4-kiosco`.

Historia aprobada antes del generador. Los modelos son ajustes descriptivos dentro de 64 noches. El narrador, como subtítulo, introduce términos y conclusiones; Don Juan habla de compras, capacidad y costo; Paco prueba procedimientos de sus clases.

## Temario y matriz de escenas

| Escena | Concepto | Aprender | Don Juan | Paco | Subtítulo inicial | Subtítulo final | Transferencia distinta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L5-S01` | ajuste | Una recta resume inventario y pedidos | “Que la raya no tape las noches.” | “Dejo puntos y errores visibles.” | Ajustar estima parámetros que acercan predicciones a resultados observados. | Es un ajuste descriptivo dentro de estas 64 noches, no desempeño futuro. | Temperatura y pedidos. |
| `L5-S02` | pendiente | Se mueve inventario una unidad | “Si sube uno, ¿cuánto cambia la raya?” | “Leo el cambio con sus unidades.” | La pendiente es el cambio ajustado en la salida por unidad de entrada. | Describe asociación lineal, no efecto causal. | Otra variable previa al turno. |
| `L5-S03` | intercepto | Se prolonga la recta a entrada cero | “¿Cero tiene sentido aquí?” | “Solo lo interpreto si cae en un contexto válido.” | El intercepto es la salida ajustada cuando todas las entradas valen cero. | Puede ser necesario para el ajuste y carecer de interpretación práctica. | Se centra la entrada. |
| `L5-S04` | residuales | Se dibujan distancias verticales | “Estas noches quedaron arriba o abajo.” | “Resultado menos ajuste, una por una.” | Un residual es valor observado menos valor ajustado. | Los residuales suman aproximadamente cero con intercepto y revelan errores del ajuste. | Otro ajuste deja patrón curvo. |
| `L5-S05` | supuestos | Se revisan linealidad, dispersión e independencia | “La raya no arregla todo.” | “Compruebo qué patrón quedó.” | La regresión lineal depende de supuestos sobre forma, errores y dependencia. | Un patrón residual visible limita la lectura; no se oculta con un coeficiente. | Se compara dispersión creciente. |
| `L5-S06` | variables explicativas | Se agregan lluvia, partido y quincena | “Antes del turno sí lo sabemos.” | “Solo uso señales disponibles a tiempo.” | Una variable explicativa aporta información para ajustar la salida. | Su coeficiente es condicional a las demás entradas, no una causa. | Se cambia una entrada previa. |
| `L5-S07` | interacción | Partido modifica la pendiente de temperatura | “La regla cambia según la noche.” | “Incluyo el término conjunto.” | Una interacción permite que la asociación de una entrada dependa de otra. | Interpretar solo coeficientes principales ignoraría ese cambio. | Lluvia por día. |
| `L5-S08` | colinealidad | Dos entradas casi duplicadas vuelven inestables los coeficientes | “Dos señales dicen casi lo mismo.” | “Comparo estabilidad, no solo ajuste.” | La colinealidad dificulta separar contribuciones de variables relacionadas. | El ajuste global puede verse estable mientras coeficientes individuales cambian. | Inventario y una copia transformada. |
| `L5-S09` | clase | Alta demanda se define como etiqueta | “Primero dime qué cuenta como noche alta.” | “La etiqueta sale de una regla documentada.” | Una clase es una categoría objetivo definida antes de decidir. | Cambiar la definición cambia la tarea; no cambia el pasado. | Se usa agotado como clase. |
| `L5-S10` | score | Cada noche recibe un valor ordenable | “Ese número todavía no es un sí.” | “Sirve para ordenar; falta la regla.” | Un score resume evidencia para ordenar casos. | Score, clase y decisión son objetos distintos. | Otro conjunto de señales. |
| `L5-S11` | umbral | Se mueve el corte de alerta | “Si bajo el corte, aviso más veces.” | “Y también cambian los errores.” | Un umbral convierte scores en decisiones. | Moverlo cambia alertas y costos; no mejora el modelo por sí solo. | Se prioriza evitar faltantes. |
| `L5-S12` | probabilidad | Scores se transforman a escala 0–1 | “Que diga ochenta no es garantía.” | “Es una probabilidad ajustada, no un destino.” | Una probabilidad de clase expresa incertidumbre condicionada al modelo y entradas. | Solo se interpreta dentro del ajuste; calibración y generalización quedan para Nivel 6. | Se comparan dos noches. |
| `L5-S13` | árbol de decisión | Se recorren divisiones binarias | “Pregunta una cosa y luego otra.” | “Cada ruta termina en una hoja.” | Un árbol divide el espacio mediante reglas sucesivas. | La ruta es reproducible sobre estas filas; no prueba que la regla sea universal. | Otro árbol pequeño. |
| `L5-S14` | reglas | Las rutas se escriben como si/entonces | “Eso sí lo puede seguir el turno.” | “Incluyo excepciones y alcance.” | Una regla traduce una ruta en condiciones explícitas. | Comprensible no significa correcta fuera de los datos observados. | Se evalúa una noche fronteriza. |
| `L5-S15` | importancia | Se compara reducción descriptiva de error | “Que salga primero no la vuelve causa.” | “Solo resume uso dentro del árbol.” | La importancia resume cuánto usa el modelo una variable para reducir su criterio. | No es causalidad y puede repartir crédito entre entradas relacionadas. | Se duplican señales. |
| `L5-S16` | encoding | Día y banderas se convierten en columnas | “Los nombres necesitan una forma de entrar.” | “No les invento un orden.” | Encoding representa categorías numéricamente sin cambiar su significado. | One-hot evita imponer una distancia falsa entre días nominales. | Se codifica etapa. |
| `L5-S17` | scaling | Entradas se centran y escalan | “Cambió la regla, no las noches.” | “Guardo parámetros y unidades.” | Scaling transforma magnitud usando parámetros documentados. | No agrega información y debe aplicarse con el mismo contrato. | Se compara estandarización y rango. |
| `L5-S18` | leakage | Se intentan usar espera y merma posteriores | “Eso lo sabemos cuando ya terminó.” | “Entonces queda fuera de la entrada.” | Leakage ocurre cuando una entrada usa información no disponible al momento de decidir. | `tacos_vendidos`, espera y merma se rechazan; la matriz conserva solo señales previas. | Se audita otra columna posterior. |

## Crecimiento y relaciones

Don Juan invierte parte de sus ahorros en un kiosco 4 × 3, segundo comal y doce asientos después de revisar capacidad y límites. Mari continúa pagada. Chava Ríos entra pagado para segundo comal, servicio y checklists; no interpreta modelos. Toma un taller de radio, dato oculto hasta Nivel 9 y ausente del CSV. Paco revela que solicitó una beca; Don Juan lo respalda como padre y no lo convierte en responsable permanente del puesto.

## Separación y límites

Aprender, guiado y transferencia usan evidencia diferente. Ninguna respuesta se habilita antes de recorrer estados. No hay train/test, métricas de generalización ni promesas futuras. En vivo usa Bike Sharing y Wine Quality. Cierre: **“¿Cómo sabemos si sirve?”**
