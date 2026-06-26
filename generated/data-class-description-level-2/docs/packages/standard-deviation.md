# Paquete: Desviación estándar

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `standard-deviation`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas, media y varianza.
- **Concepto anterior:** Varianza.
- **Concepto siguiente:** Percentiles.
- **Objetivo:** Interpretar una distancia típica respecto de la media en unidades originales.
- **Definición:** La desviación estándar es la raíz cuadrada de la varianza.
- **Intuición:** Devuelve la dispersión a la misma unidad de la variable.
- **Error común:** Usar la regla 68-95 sin comprobar una forma aproximadamente normal.
- **Visual:** Muestra bandas de una desviación estándar alrededor de la media.
- **Kind visual:** `spread-band`.
- **Mecanismo:** dispersión en la unidad original.
- **Estados:** Base → Banda comparada.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Comparar bandas.
- **Unidad de análisis:** una observación es un pingüino con masa corporal registrada.
- **Variables:** `body_mass_g`, numérica continua en gramos.
- **Dataset:** Palmer Penguins, 344 filas, licencia CC0-1.0.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Comparar bandas** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

**Evidencia narrativa común:** Ejecutar «Comparar bandas» y citar el cambio visible asociado con desviación estándar.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Lucía, analista de operaciones de una clínica debe resumir mediciones de pacientes antes de una junta de 15 minutos. si elige un resumen equivocado, el director comprará equipo para el problema incorrecto. La decisión es decidir qué lectura de desviación estándar sostiene una recomendación prudente.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar bandas» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Lee la banda de ±1 DE y su unidad antes y después de desplazar el extremo.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs standard-deviation-state-1, standard-deviation-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué ventaja tiene frente a la varianza para comunicar masa corporal?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Se expresa nuevamente en gramos. | Sí | La raíz recupera la unidad original. |
| Siempre vale menos de uno. | No | Su tamaño depende de la escala de los datos. |
| No cambia cuando hay extremos. | No | También es sensible a observaciones lejanas. |

**Pista:** Revisa la unidad mostrada junto al marcador.

### Ejercicio de transferencia

**Historia:** Lucía, analista de operaciones de una clínica cambia de contexto para probar si el razonamiento se transfiere. si elige un resumen equivocado, el director comprará equipo para el problema incorrecto. La decisión es decidir qué lectura de desviación estándar sostiene una recomendación prudente.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar bandas» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Usa la escala en gramos del visual para razonar cómo cambia al convertir unidades.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs standard-deviation-state-1, standard-deviation-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** Si todas las masas se convierten de gramos a kilogramos, ¿qué ocurre con la desviación estándar?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Se divide entre 1,000. | Sí | La desviación estándar cambia con la misma escala lineal que los datos. |
| Permanece numéricamente igual. | No | La unidad y el valor numérico cambian juntos. |
| Se eleva al cuadrado. | No | Elevar al cuadrado corresponde a la varianza. |

**Pista:** Aplica la misma conversión a las distancias.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Interpretar una distancia típica respecto de la media en unidades originales.

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

**Evaluación rápida:** El estudiante interpreta desviación estándar con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Comparar bandas», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Desviación estándar». Objetivo: Interpretar una distancia típica respecto de la media en unidades originales. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Desviación estándar». Objetivo: Interpretar una distancia típica respecto de la media en unidades originales. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Desviación estándar». Objetivo: Interpretar una distancia típica respecto de la media en unidades originales. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
