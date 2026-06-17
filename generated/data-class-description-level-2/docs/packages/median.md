# Paquete: Mediana

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `median`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas.
- **Concepto anterior:** Media.
- **Concepto siguiente:** Moda.
- **Objetivo:** Ubicar e interpretar el valor central de datos ordenados.
- **Definición:** La mediana separa los datos ordenados en dos mitades.
- **Intuición:** Es la observación que queda en el centro al formar una fila ordenada.
- **Error común:** Calcularla sin ordenar o confundirla con el valor más frecuente.
- **Visual:** Compara media y mediana antes y después de añadir una masa extrema.
- **Interacción:** Añadir un extremo.
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
3. Ejecutar **Añadir un extremo** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

### Ejercicio guiado

**Historia:** Lucía, analista de operaciones de una clínica debe resumir mediciones de pacientes antes de una junta de 15 minutos. si elige un resumen equivocado, el director comprará equipo para el problema incorrecto. La decisión es decidir qué lectura de mediana sostiene una recomendación prudente.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Añadir un extremo» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Observa cuánto cambian la mediana y la media cuando aparece el valor extremo.

**Pregunta:** Después de añadir una masa muy alta, ¿por qué la mediana cambia poco?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Porque depende de la posición central, no de la distancia del extremo. | Sí | El extremo cambia el orden en una punta, pero no necesariamente el centro. |
| Porque ignora todas las observaciones altas. | No | La observación extrema sigue formando parte del orden. |
| Porque siempre es igual a la media. | No | Media y mediana solo coinciden en algunos conjuntos. |

**Pista:** Sigue las posiciones, no la longitud del eje.

### Ejercicio de transferencia

**Historia:** Lucía, analista de operaciones de una clínica cambia de contexto para probar si el razonamiento se transfiere. si elige un resumen equivocado, el director comprará equipo para el problema incorrecto. La decisión es decidir qué lectura de mediana sostiene una recomendación prudente.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Añadir un extremo» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Contrasta en el visual qué marcador conserva mejor la posición central.

**Pregunta:** Para resumir tiempos de espera con unos pocos retrasos enormes, ¿qué centro es más resistente?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La mediana. | Sí | La mediana limita la influencia de retrasos extremos. |
| La media sin revisar la distribución. | No | La media puede ser útil, pero los extremos la desplazan. |
| El rango. | No | El rango mide extensión, no centro. |

**Pista:** Busca una medida basada en orden.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

| Minutos | Actividad |
| --- | --- |
| 0-5 | presentar fuente, licencia, unidad de análisis y pregunta. |
| 5-12 | pedir predicción y ejecutar la interacción local. |
| 12-20 | pedir a Codex verificar o modificar código reproducible sin cambiar el snapshot. |
| 20-27 | usar Gemini o ChatGPT para cuestionar interpretación y límites. |
| 27-35 | resolver práctica con evidencia y cerrar con una afirmación permitida. |

### Roles de IA

- **Codex:** ejecuta o modifica código reproducible sin cambiar el snapshot.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar cálculos, fuente, supuestos y conclusión antes de proyectar.
- **Privacidad:** no pegar datos sensibles ni credenciales.
- **Privacidad:** no pegar datos sensibles ni credenciales; el modo docente oculto no protege como login.
- **Plan offline:** Usar HTML local, CSV snapshot y pizarra. No pegar datos sensibles ni credenciales en herramientas externas.

### Prompts

**Codex**

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Mediana». Objetivo: Ubicar e interpretar el valor central de datos ordenados. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Mediana». Objetivo: Ubicar e interpretar el valor central de datos ordenados. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Mediana». Objetivo: Ubicar e interpretar el valor central de datos ordenados. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
