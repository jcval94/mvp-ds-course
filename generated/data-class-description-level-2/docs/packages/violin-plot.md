# Paquete: Violin plot

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `violin-plot`.
- **Bloque:** Comparación visual.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** variables numéricas y categóricas, agrupación y resúmenes de centro, densidad y boxplot.
- **Concepto anterior:** Boxplot.
- **Concepto siguiente:** ECDF.
- **Objetivo:** Comparar forma y densidad de varios grupos en un espacio compacto.
- **Definición:** Un violin plot refleja una estimación de densidad alrededor de un eje central.
- **Intuición:** El ancho muestra dónde se concentran más observaciones.
- **Error común:** Leer el ancho como conteo directo sin conocer la normalización.
- **Visual:** Ajusta el ancho de banda y compara la forma por especie.
- **Interacción:** Cambiar suavizado.
- **Unidad de análisis:** una observación es un pingüino.
- **Variables:** `species`, categórica; `body_mass_g`, numérica continua en gramos.
- **Dataset:** Palmer Penguins, 344 filas, licencia CC0-1.0.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Cambiar suavizado** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

### Ejercicio guiado

**Evidencia requerida:** Cambia el suavizado y observa dónde aumenta o disminuye el ancho de cada violín.

**Pregunta:** ¿Qué indica una zona más ancha del violín?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Mayor densidad relativa de observaciones en ese rango. | Sí | El ancho codifica concentración estimada. |
| Valores individuales más grandes. | No | La magnitud de la variable se lee en el eje vertical. |
| Mayor tamaño de pantalla. | No | El diseño responsive no representa datos. |

**Pista:** Separa posición vertical de ancho.

### Ejercicio de transferencia

**Evidencia requerida:** Compara la silueta con el tamaño de muestra visible de cada especie.

**Pregunta:** ¿Por qué conviene mostrar puntos o tamaño de muestra junto al violín?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| La suavización puede ocultar cuántas observaciones sustentan la forma. | Sí | El contexto de n evita sobreinterpretar una silueta suave. |
| Para convertirlo en gráfico de barras. | No | Las barras comparan otra codificación. |
| Porque la densidad no usa datos. | No | La densidad sí se estima desde observaciones. |

**Pista:** Pregunta cuánta evidencia hay detrás de la curva.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Violin plot». Objetivo: Comparar forma y densidad de varios grupos en un espacio compacto. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Violin plot». Objetivo: Comparar forma y densidad de varios grupos en un espacio compacto. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Violin plot». Objetivo: Comparar forma y densidad de varios grupos en un espacio compacto. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
