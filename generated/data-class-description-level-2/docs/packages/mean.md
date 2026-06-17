# Paquete: Media

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `mean`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas.
- **Concepto anterior:** Tipos de variables y calidad de datos.
- **Concepto siguiente:** Mediana.
- **Objetivo:** Calcular e interpretar la media como punto de equilibrio.
- **Definición:** La media suma los valores y divide entre el número de observaciones.
- **Intuición:** Es el punto donde una regla con pesos iguales quedaría equilibrada.
- **Error común:** Tratar la media como un valor típico aunque existan extremos o asimetría.
- **Visual:** Compara la media antes y después de desplazar una observación extrema.
- **Interacción:** Mover un extremo.
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
3. Ejecutar **Mover un extremo** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para tomar una decisión.

### Ejercicio guiado

**Historia:** Lucía, analista de operaciones de una clínica debe resumir mediciones de pacientes antes de una junta de 15 minutos. si elige un resumen equivocado, el director comprará equipo para el problema incorrecto. La decisión es decidir qué lectura de media sostiene una recomendación prudente.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Mover un extremo» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Compara los marcadores de media y mediana antes y después de desplazar el extremo.

**Pregunta:** Al mover el punto extremo hacia la derecha, ¿qué marcador cambia más?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La media. | Sí | La media usa la magnitud de todos los valores y se desplaza hacia el extremo. |
| La mediana. | No | La mediana depende del orden central y suele moverse menos. |
| El número de observaciones. | No | Mover un valor no agrega ni elimina observaciones. |

**Pista:** Observa qué marcador se desplaza en la recta.

### Ejercicio de transferencia

**Historia:** Lucía, analista de operaciones de una clínica cambia de contexto para probar si el razonamiento se transfiere. si elige un resumen equivocado, el director comprará equipo para el problema incorrecto. La decisión es decidir qué lectura de media sostiene una recomendación prudente.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Mover un extremo» para revelar evidencia. / Escena 3: elegir la respuesta citando el rasgo visible que cambió.

**Evidencia requerida:** Usa la separación visible entre centro, puntos e IQR para identificar qué información falta.

**Pregunta:** Dos especies tienen la misma media de masa. ¿Qué debes revisar antes de llamarlas similares?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La dispersión y la forma de cada grupo. | Sí | La misma media puede ocultar distribuciones muy diferentes. |
| Solo el nombre de la especie. | No | La etiqueta no describe cómo se distribuyen las masas. |
| Que ambas tengan exactamente 100 filas. | No | El tamaño ayuda a evaluar estabilidad, pero no garantiza similitud. |

**Pista:** Una medida de centro no resume toda la distribución.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Media». Objetivo: Calcular e interpretar la media como punto de equilibrio. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Media». Objetivo: Calcular e interpretar la media como punto de equilibrio. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Media». Objetivo: Calcular e interpretar la media como punto de equilibrio. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
