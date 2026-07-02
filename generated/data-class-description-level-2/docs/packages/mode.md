# Paquete: Moda

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Palmer Penguins` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `mode`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas.
- **Concepto anterior:** Mediana.
- **Concepto siguiente:** Rango.
- **Objetivo:** Identificar el valor o categoría con mayor frecuencia.
- **Definición:** La moda es el valor o categoría que aparece más veces.
- **Intuición:** Es la opción que acumula más marcas en un conteo.
- **Error común:** Afirmar que todo conjunto tiene una única moda informativa.
- **Visual:** Cuenta cada tamaño de pedido y localiza el que más se repite.
- **Kind visual:** `histogram`.
- **Mecanismo:** máximo de frecuencia del tamaño de pedido.
- **Estados:** Frecuencias → Máximo destacado.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Destacar la frecuencia máxima.
- **Unidad de análisis:** una observación es un pedido del puesto.
- **Variables:** `num_tacos`, numérica discreta en tacos por pedido.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S03`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.1`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Paco cuenta tamaños exactos de pedido.

**Don Juan:** Quiero saber cuál se repite más, no cuál queda bonito.

**Paco:** Voy a contar cada tamaño, apá.

**Subtítulos:** La moda es el valor con mayor frecuencia y puede no ser única. / La frecuencia más alta identifica el tamaño más común de esta entrada.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Destacar la frecuencia máxima** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Destacar la frecuencia máxima» y citar el cambio visible asociado con moda en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; faltan bolsas y Don Juan pregunta qué tamaño se repitió más, en un incidente posterior a L2-S03. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de moda que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Destacar la frecuencia máxima» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Moda: recorrer todos los estados y citar la marca visible de máximo de frecuencia del tamaño de pedido. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Moda: recorrer todos los estados y citar la marca visible de máximo de frecuencia del tamaño de pedido.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs mode-state-1, mode-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** Al destacar la frecuencia máxima, ¿qué tamaño queda marcado?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| 3 tacos por pedido. | Sí | La evidencia visible sostiene «3 tacos por pedido.» dentro de máximo de frecuencia del tamaño de pedido. |
| 12 tacos por pedido. | No | El estado recorrido contradice «12 tacos por pedido.»; compara las marcas y etiquetas. |
| 36 tacos por pedido. | No | El estado recorrido contradice «36 tacos por pedido.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de moda y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de moda que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Destacar la frecuencia máxima» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Moda: recorrer todos los estados y citar la marca visible de máximo de frecuencia del tamaño de pedido. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Moda: recorrer todos los estados y citar la marca visible de máximo de frecuencia del tamaño de pedido.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs mode-state-1, mode-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué barra sostiene la preparación de más bolsas?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La barra de 3 tacos, porque es la más alta. | Sí | La evidencia visible sostiene «La barra de 3 tacos, porque es la más alta.» dentro de máximo de frecuencia del tamaño de pedido. |
| La barra de 36 tacos, porque está más a la derecha. | No | El estado recorrido contradice «La barra de 36 tacos, porque está más a la derecha.»; compara las marcas y etiquetas. |
| La barra de 1 taco, porque inicia el eje. | No | El estado recorrido contradice «La barra de 1 taco, porque inicia el eje.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de moda y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Identificar el valor o categoría con mayor frecuencia.

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

**Evaluación rápida:** El estudiante interpreta moda con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Destacar la frecuencia máxima», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Moda». Objetivo: Identificar el valor o categoría con mayor frecuencia. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Moda». Objetivo: Identificar el valor o categoría con mayor frecuencia. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Moda». Objetivo: Identificar el valor o categoría con mayor frecuencia. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
