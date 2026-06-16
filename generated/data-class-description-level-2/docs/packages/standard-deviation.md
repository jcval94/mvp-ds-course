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

### Ejercicio guiado

**Evidencia requerida:** Lee la banda de ±1 DE y su unidad antes y después de desplazar el extremo.

**Pregunta:** ¿Qué ventaja tiene frente a la varianza para comunicar masa corporal?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Se expresa nuevamente en gramos. | Sí | La raíz recupera la unidad original. |
| Siempre vale menos de uno. | No | Su tamaño depende de la escala de los datos. |
| No cambia cuando hay extremos. | No | También es sensible a observaciones lejanas. |

**Pista:** Revisa la unidad mostrada junto al marcador.

### Ejercicio de transferencia

**Evidencia requerida:** Usa la escala en gramos del visual para razonar cómo cambia al convertir unidades.

**Pregunta:** Si todas las masas se convierten de gramos a kilogramos, ¿qué ocurre con la desviación estándar?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Se divide entre 1,000. | Sí | La desviación estándar cambia con la misma escala lineal que los datos. |
| Permanece numéricamente igual. | No | La unidad y el valor numérico cambian juntos. |
| Se eleva al cuadrado. | No | Elevar al cuadrado corresponde a la varianza. |

**Pista:** Aplica la misma conversión a las distancias.

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
