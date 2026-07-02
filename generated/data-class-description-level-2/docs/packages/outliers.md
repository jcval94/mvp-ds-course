# Paquete: Outliers

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Wine Quality · UCI` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `outliers`.
- **Bloque:** Valores atípicos.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** distribuciones, cuartiles, scatterplots y validación de dominio.
- **Concepto anterior:** ECDF.
- **Concepto siguiente:** Leverage.
- **Objetivo:** Detectar observaciones alejadas y formular preguntas antes de excluirlas.
- **Definición:** Un outlier es una observación inusualmente alejada según una regla y un contexto.
- **Intuición:** Es una señal para investigar, no una etiqueta automática de error.
- **Error común:** Eliminar todo valor exterior a 1.5 IQR sin revisar dominio ni impacto.
- **Visual:** Marca pedidos candidatos sin convertir la regla en un veredicto.
- **Kind visual:** `iqr-review`.
- **Mecanismo:** detección por cercas sin veredicto automático.
- **Estados:** Regla IQR → Fila en revisión.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Aplicar regla IQR.
- **Unidad de análisis:** una observación es un pedido; la auditoría conserva casos separados.
- **Variables:** `num_tacos` y `minuto_turno`, numéricas; `estado_calidad`, categórica.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S18`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.4`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Un pedido grande cruza la cerca IQR.

**Don Juan:** Raro sí está; borrarlo nomás porque sí, no.

**Paco:** Lo marco y busco el ticket.

**Subtítulos:** Un outlier es una señal estadística para investigar, no un veredicto. / La regla IQR detecta candidatos; el contexto determina la acción.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Aplicar regla IQR** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Aplicar regla IQR» y citar el cambio visible asociado con outliers en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; un pedido grande cruza la cerca y queda pendiente de ticket, en un incidente posterior a L2-S18. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de outliers que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Aplicar regla IQR» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Outliers: recorrer todos los estados y citar la marca visible de detección por cercas sin veredicto automático. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Outliers: recorrer todos los estados y citar la marca visible de detección por cercas sin veredicto automático.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs outliers-state-1, outliers-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué valor queda marcado más allá de la cerca superior?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| 36 tacos. | Sí | La evidencia visible sostiene «36 tacos.» dentro de detección por cercas sin veredicto automático. |
| 5 tacos. | No | El estado recorrido contradice «5 tacos.»; compara las marcas y etiquetas. |
| 1 taco. | No | El estado recorrido contradice «1 taco.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de outliers y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de outliers que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Aplicar regla IQR» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Outliers: recorrer todos los estados y citar la marca visible de detección por cercas sin veredicto automático. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Outliers: recorrer todos los estados y citar la marca visible de detección por cercas sin veredicto automático.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs outliers-state-1, outliers-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué acción acompaña al máximo en el estado final?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Revisar el ticket, sin veredicto automático. | Sí | La evidencia visible sostiene «Revisar el ticket, sin veredicto automático.» dentro de detección por cercas sin veredicto automático. |
| Borrarlo por cruzar la cerca. | No | El estado recorrido contradice «Borrarlo por cruzar la cerca.»; compara las marcas y etiquetas. |
| Cambiarlo a 6 tacos por intuición. | No | El estado recorrido contradice «Cambiarlo a 6 tacos por intuición.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de outliers y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Wine Quality · UCI (6497 filas, 13 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`

**Objetivo docente:** Detectar observaciones alejadas y formular preguntas antes de excluirlas.

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

**Evaluación rápida:** El estudiante interpreta outliers con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Aplicar regla IQR», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Outliers». Objetivo: Detectar observaciones alejadas y formular preguntas antes de excluirlas. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Outliers». Objetivo: Detectar observaciones alejadas y formular preguntas antes de excluirlas. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Outliers». Objetivo: Detectar observaciones alejadas y formular preguntas antes de excluirlas. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
