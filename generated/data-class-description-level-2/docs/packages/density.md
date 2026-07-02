# Paquete: Densidad

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Bike Sharing Dataset · UCI` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `density`.
- **Bloque:** Distribuciones.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, frecuencia, rango y lectura de ejes, histograma y área.
- **Concepto anterior:** Histograma.
- **Concepto siguiente:** Forma.
- **Objetivo:** Interpretar una curva suavizada cuya área total representa uno.
- **Definición:** La densidad describe concentración relativa mediante una curva con área total igual a uno.
- **Intuición:** Es una silueta suave de la distribución, no un conteo de filas.
- **Error común:** Leer la altura de densidad como probabilidad exacta de un valor puntual.
- **Visual:** Cambia el ancho de banda y conserva visibles las marcas de los pedidos.
- **Kind visual:** `density-rug`.
- **Mecanismo:** suavizado de observaciones manteniendo área unitaria.
- **Estados:** Banda 0.4 → Banda 1 → Banda 2.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Ajustar el suavizado.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `num_tacos`, cantidad discreta; `minuto_turno`, minuto desde las 18:00.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S09`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.2`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Una curva suaviza las marcas de cada pedido.

**Don Juan:** La curva se ve pareja, pero no quiero que desaparezcan los pedidos.

**Paco:** Dejo las marquitas abajo para comprobarlos.

**Subtítulos:** Una densidad suaviza observaciones y conserva un área total unitaria. / Estado «Banda 1»: cambia el parámetro o el corte; la entrada sigue documentada. / El ancho de banda puede ocultar o exagerar picos aparentes.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Ajustar el suavizado** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Ajustar el suavizado» y citar el cambio visible asociado con densidad en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; un suavizado excesivo oculta una concentración visible en las marcas, en un incidente posterior a L2-S09. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de densidad que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Ajustar el suavizado» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Densidad: recorrer todos los estados y citar la marca visible de suavizado de observaciones manteniendo área unitaria. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Densidad: recorrer todos los estados y citar la marca visible de suavizado de observaciones manteniendo área unitaria.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs density-state-1, density-state-2, density-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué curva conserva más ondulaciones?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La de banda 0.4. | Sí | La evidencia visible sostiene «La de banda 0.4.» dentro de suavizado de observaciones manteniendo área unitaria. |
| La de banda 2. | No | El estado recorrido contradice «La de banda 2.»; compara las marcas y etiquetas. |
| Las tres son idénticas. | No | El estado recorrido contradice «Las tres son idénticas.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de densidad y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de densidad que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Ajustar el suavizado» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Densidad: recorrer todos los estados y citar la marca visible de suavizado de observaciones manteniendo área unitaria. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Densidad: recorrer todos los estados y citar la marca visible de suavizado de observaciones manteniendo área unitaria.

**Contrato de evidencia:** pasos 2; desbloqueo en 2; IDs density-state-1, density-state-2, density-state-3.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué pasa al aumentar la banda hasta 2?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La curva se suaviza mientras las marcas permanecen. | Sí | La evidencia visible sostiene «La curva se suaviza mientras las marcas permanecen.» dentro de suavizado de observaciones manteniendo área unitaria. |
| La curva se vuelve un gráfico de barras. | No | El estado recorrido contradice «La curva se vuelve un gráfico de barras.»; compara las marcas y etiquetas. |
| Se eliminan los pedidos grandes del archivo. | No | El estado recorrido contradice «Se eliminan los pedidos grandes del archivo.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de densidad y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Interpretar una curva suavizada cuya área total representa uno.

**Audiencia:** Docente de Nivel 2 con grupo que completó Fundamentos.

**Duración:** 35 minutos por concepto o 90 minutos por bloque.

| Minutos | Actividad |
| --- | --- |
| 0-5 | presentar fuente, licencia, unidad de análisis y pregunta. |
| 5-12 | pedir predicción y ejecutar la interacción local. |
| 12-20 | pedir a Codex verificar o modificar código reproducible sin cambiar el snapshot. |
| 20-27 | usar Gemini o ChatGPT para cuestionar interpretación y límites. |
| 27-35 | resolver práctica con evidencia y cerrar con una afirmación permitida. |

### Preguntas, evaluación y errores

**Preguntas socráticas:**

- ¿Qué predijiste antes de activar la animación y qué cambió?
- ¿Qué evidencia visible sostiene la decisión?
- ¿Qué conclusión sería tentadora pero excede el snapshot?
- ¿Qué pasaría si cambiamos de grupo, bins, umbral o caso extremo?

**Errores anticipados:**

- Confundir una representación visual con una prueba causal.
- Responder por definición sin citar evidencia animada.
- Ignorar unidad de análisis, escala o tamaño de grupo.

**Evaluación rápida:** El estudiante interpreta densidad con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Ajustar el suavizado», estado inicial, estado animado y aserción que verifica que el visual cambia.

**Checklist antes de clase:**

- Abrir el laboratorio con y sin ?teacher=1 para revisar visibilidad docente.
- Verificar fuente, licencia, fecha, dimensiones y SHA-256 del snapshot.
- Preparar una predicción y una pregunta de transferencia.

**Checklist durante clase:**

- Bloquear respuestas hasta ejecutar la animación.
- Pedir que cada respuesta cite una marca, barra, curva, punto o umbral.
- Separar descripción, decisión y límite de conclusión.

### Roles de IA

- **Codex:** ejecuta o modifica código reproducible sin cambiar el snapshot.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar cálculos, fuente, supuestos y conclusión antes de proyectar.
- **Privacidad:** No pegar datos sensibles, credenciales ni archivos privados en herramientas externas; el modo docente oculto no reemplaza autenticación.
- **Plan offline:** Usar HTML local, CSV snapshot y pizarra. No pegar datos sensibles ni credenciales en herramientas externas.

### Prompts

**Codex**

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Densidad». Objetivo: Interpretar una curva suavizada cuya área total representa uno. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Densidad». Objetivo: Interpretar una curva suavizada cuya área total representa uno. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Densidad». Objetivo: Interpretar una curva suavizada cuya área total representa uno. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
