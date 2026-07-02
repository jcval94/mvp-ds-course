# Paquete: Caso raro válido

## Supuestos

- Audiencia: estudiantes que completaron Nivel 1; los prerrequisitos adicionales se introducen antes de la actividad.
- Duración: 35 minutos para el concepto dentro de un bloque de 90 minutos.
- Aprender y Ejercitar: dataset sintético narrativo fijo de 600 pedidos, etiquetado y versionado.
- En vivo: snapshot público fijo `Wine Quality · UCI` con procedencia, licencia y hash.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `rare-valid`.
- **Bloque:** Valores atípicos.
- **Nivel:** 2, Descripción y visualización.
- **Prerrequisitos:** distribuciones, cuartiles, scatterplots y validación de dominio.
- **Concepto anterior:** Error de captura.
- **Concepto siguiente:** Probabilidad, muestreo e incertidumbre.
- **Objetivo:** Conservar observaciones raras que son plausibles, verificadas y relevantes.
- **Definición:** Un caso raro válido es infrecuente pero consistente con el dominio y el proceso de medición.
- **Intuición:** Puede ser una excepción valiosa que amplía lo que sabemos del sistema.
- **Error común:** Normalizarlo o excluirlo solo para obtener una gráfica más limpia.
- **Visual:** Contrasta la rareza con tickets y estado de calidad trazable.
- **Kind visual:** `scatter-detail`.
- **Mecanismo:** rareza estadística frente a plausibilidad contextual.
- **Estados:** Caso marcado → Detalle trazable.
- **Movimiento:** 600 ms; interpolar geometría para comparar estados, sin movimiento decorativo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas y valores.
- **Interacción:** Abrir comprobantes.
- **Unidad de análisis:** una observación es un pedido; la auditoría conserva casos separados.
- **Variables:** `num_tacos` y `minuto_turno`, numéricas; `estado_calidad`, categórica.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md#nivel-2-descripción-y-visualización`.
- **Fuente narrativa:** `docs/stories/LEVEL_2.md` (approved).
- **Escena:** `L2-S21`.
- **Dataset estudiantil:** `datasets/narrative/pedidos_4_semanas_nivel_2.csv`, sintético, 600 × 10.
- **SHA-256 estudiantil:** `16fa3335fc95e622e4221a261afbe3f300159738344355333a94dfacabf454db`.
- **Estado de datos:** `L2.4`.
- **Competencia auxiliar:** Declarar entrada, parámetro u operación, salida, comprobaciones y límites.
- **Límite:** la visualización describe el snapshot; no identifica causas.
- **Criterio de dominio:** justificar una interpretación nueva citando al menos dos rasgos visibles.

## LearningModule

**Situación:** Los tickets confirman dos pedidos grandes.

**Don Juan:** Fue grande, pero sí salió de esta plancha.

**Paco:** Entonces se queda, con la comprobación anotada.

**Subtítulos:** Un caso raro válido es extremo y auténtico. / La rareza es estadística; la validez se confirma con contexto trazable.

1. Predecir el resultado antes de activar la interacción.
2. Observar el estado inicial y nombrar la unidad de análisis.
3. Ejecutar **Abrir comprobantes** y describir qué cambió.
4. Contrastar la observación con el error común.
5. Explicar qué conclusión sí permite el snapshot y cuál no.

## PracticeExercise

**Regla de separación:** Aprender revela el mecanismo; estos casos usan noches, preguntas y decisiones nuevas.

**Evidencia narrativa común:** Ejecutar «Abrir comprobantes» y citar el cambio visible asociado con caso raro válido en un incidente distinto al de Aprender.

**Pistas graduadas:**

- Haz una predicción antes de activar la animación.
- Nombra la unidad de análisis y la variable que cambia en el visual.
- Descarta opciones que no puedan señalarse en la evidencia animada.

### Ejercicio guiado

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria ayuda en el puesto después de clases; L2-A001 confirma 36 tacos mediante ticket, en un incidente posterior a L2-S21. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de caso raro válido que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente guiado y predecir. / Escena 2: ejecutar «Abrir comprobantes» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 1 de Caso raro válido: recorrer todos los estados y citar la marca visible de rareza estadística frente a plausibilidad contextual. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 1 de Caso raro válido: recorrer todos los estados y citar la marca visible de rareza estadística frente a plausibilidad contextual.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs rare-valid-state-1, rare-valid-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir una transferencia.

**Pregunta:** ¿Qué casos muestran los comprobantes como raros válidos?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| P-007=30 y L2-A001=36. | Sí | La evidencia visible sostiene «P-007=30 y L2-A001=36.» dentro de rareza estadística frente a plausibilidad contextual. |
| P-005=500 y L2-X001=360. | No | El estado recorrido contradice «P-005=500 y L2-X001=360.»; compara las marcas y etiquetas. |
| Solo los pedidos de 1 taco. | No | El estado recorrido contradice «Solo los pedidos de 1 taco.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de caso raro válido y cita una marca o etiqueta exacta.

### Ejercicio de transferencia

**Historia:** Paco, hijo de Don Juan y estudiante de preparatoria cambia de contexto para probar si el razonamiento se transfiere. Don Juan necesita una decisión reversible antes de comprar o reorganizar el turno, sin ampliar el puesto ni cargar trabajo a la familia. La decisión es documentar una lectura de caso raro válido que Don Juan pueda traducir a una acción del negocio.

**Escenas animadas:** Escena 1: revisar la entrada del incidente de transferencia y predecir. / Escena 2: ejecutar «Abrir comprobantes» hasta completar todos los estados. / Escena 3: citar la evidencia Incidente 2 de Caso raro válido: recorrer todos los estados y citar la marca visible de rareza estadística frente a plausibilidad contextual. y dejar la decisión final a Don Juan.

**Evidencia requerida:** Incidente 2 de Caso raro válido: recorrer todos los estados y citar la marca visible de rareza estadística frente a plausibilidad contextual.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs rare-valid-state-1, rare-valid-state-2.

**Regla de feedback:** El feedback debe nombrar el rasgo visible que sostiene o contradice la opción elegida.

**Transferencia:** El segundo caso cambia el contexto de la pregunta: exige aplicar el mismo criterio sin depender de las palabras exactas del ejercicio guiado.

**Pregunta:** ¿Qué acción visible corresponde a esos dos casos?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Conservarlos con trazabilidad. | Sí | La evidencia visible sostiene «Conservarlos con trazabilidad.» dentro de rareza estadística frente a plausibilidad contextual. |
| Sustituirlos por la mediana. | No | El estado recorrido contradice «Sustituirlos por la mediana.»; compara las marcas y etiquetas. |
| Moverlos a error confirmado. | No | El estado recorrido contradice «Moverlos a error confirmado.»; conserva la unidad y el límite. |

**Pista:** Recorre todos los estados de caso raro válido y cita una marca o etiqueta exacta.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Wine Quality · UCI (6497 filas, 13 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`

**Objetivo docente:** Conservar observaciones raras que son plausibles, verificadas y relevantes.

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

**Evaluación rápida:** El estudiante interpreta caso raro válido con una evidencia visible, una decisión prudente y una limitación explícita.

**Blueprint de demo:** HTML local con snapshot fijo, botón «Abrir comprobantes», estado inicial, estado animado y aserción que verifica que el visual cambia.

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

> Trabaja como programador en vivo. Usa el snapshot público indicado y crea una demo local reproducible para «Caso raro válido». Objetivo: Conservar observaciones raras que son plausibles, verificadas y relevantes. Muestra primero una predicción, luego modifica un único parámetro, conserva la fuente y licencia visibles y añade una comprobación automática. No uses APIs ni inventes filas. Termina enumerando archivos, supuestos y criterios de aceptación.

**Gemini**

> Facilita una discusión socrática sobre «Caso raro válido». Objetivo: Conservar observaciones raras que son plausibles, verificadas y relevantes. Usa únicamente la evidencia visible del snapshot. Formula cuatro preguntas progresivas, espera una predicción antes de explicar, detecta dos errores plausibles y pide contrastar la salida de Codex. No afirmes causalidad.

**ChatGPT**

> Actúa como revisor pedagógico durante una clase sobre «Caso raro válido». Objetivo: Conservar observaciones raras que son plausibles, verificadas y relevantes. Revisa la explicación y la demo producida por Codex, señala cualquier conclusión que exceda los datos y propone dos preguntas de transferencia con respuesta esperada y feedback. No sustituyas la decisión del grupo.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad.
- Existe una ruta completa sin IA ni red.
- Las voces, subtítulos y deltas proceden de la historia aprobada, no del HTML.
