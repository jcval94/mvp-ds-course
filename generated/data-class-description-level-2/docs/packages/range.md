# Paquete: Rango

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `range`.
- **Bloque:** Resumen numérico.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variable numérica, datos faltantes, orden y operaciones aritméticas básicas.
- **Concepto anterior:** Moda.
- **Concepto siguiente:** Varianza.
- **Objetivo:** Calcular la extensión total entre mínimo y máximo.
- **Definición:** El rango es máximo menos mínimo.
- **Intuición:** Mide la longitud de la sombra que cubre todos los valores.
- **Error común:** Usarlo como descripción completa de variabilidad.
- **Visual:** Mueve el mínimo y el máximo para observar la sensibilidad del rango.
- **Interacción:** Separar extremos.
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
3. Ejecutar **Separar extremos** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Lee mínimo, máximo y rango antes y después de mover el extremo derecho.

**Pregunta:** ¿Qué cambio aumenta directamente el rango?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Alejar el máximo manteniendo fijo el mínimo. | Sí | El rango aumenta cuando crece la distancia entre extremos. |
| Reordenar las filas. | No | El orden de presentación no cambia mínimo ni máximo. |
| Cambiar el color de los puntos. | No | El estilo visual no modifica los datos. |

**Pista:** Compara la distancia entre las dos líneas extremas.

### Ejercicio de transferencia

**Evidencia requerida:** Usa los puntos interiores para comprobar qué información no captura el rango.

**Pregunta:** Dos grupos tienen el mismo rango. ¿Qué conclusión es válida?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Comparten extensión total, pero pueden distribuirse de forma distinta. | Sí | El rango solo fija los extremos. |
| Tienen la misma media y mediana. | No | Centro y rango son propiedades distintas. |
| Cada valor de un grupo aparece en el otro. | No | Los puntos interiores pueden ser completamente diferentes. |

**Pista:** Observa qué información no aparece entre los extremos.

## LiveTeachingPack

| Minutos | Actividad |
| --- | --- |
| 0-5 | Presentar fuente, licencia, unidad de análisis y pregunta |
| 5-12 | Pedir predicción y ejecutar la interacción local |
| 12-20 | Usar Codex para modificar o verificar la demo |
| 20-27 | Usar Gemini o ChatGPT para cuestionar la interpretación |
| 27-33 | Resolver los dos ejercicios con evidencia |
| 33-35 | Cierre y límite de la conclusión |

### Roles de IA

- **Codex:** ejecuta o modifica código reproducible sin cambiar el snapshot.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar cálculos, fuente, supuestos y conclusión antes de proyectar.
- **Privacidad:** no pegar datos sensibles ni credenciales.
- **Plan offline:** usar el HTML, el CSV local y las preguntas impresas.

### Prompts

**Codex**

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Rango». Objetivo: Calcular la extensión total entre mínimo y máximo. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Rango». Objetivo: Calcular la extensión total entre mínimo y máximo. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Rango». Objetivo: Calcular la extensión total entre mínimo y máximo. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
