# Paquete: Evento

## Supuestos

- Audiencia: estudiantes que completaron Nivel 2.
- Duración: 40 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- Las simulaciones visuales son didácticas, determinísticas y derivadas del snapshot; En vivo usa el snapshot real como fuente principal.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `event`.
- **Bloque:** Probabilidad básica.
- **Nivel:** 3, Probabilidad e inferencia.
- **Prerrequisitos:** observación, variable categórica, proporción, tabla y filtro.
- **Concepto anterior:** Distribuciones y comparación visual.
- **Concepto siguiente:** Complemento.
- **Objetivo:** Identificar un evento como subconjunto de resultados posibles.
- **Definición:** Un evento es una condición que puede ocurrir o no para cada observación.
- **Intuición:** Es una etiqueta que ilumina solo las filas que cumplen una regla.
- **Error común:** Confundir el evento con una fila individual o con toda la tabla.
- **Visual:** Resalta el subconjunto de pingüinos que cumple la regla.
- **Interacción:** Marcar evento.
- **Unidad de análisis:** una observación es un pingüino.
- **Variables:** `species` e `island`, categóricas.
- **Dataset:** Palmer Penguins, 344 filas, licencia CC0-1.0.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Límite:** el material enseña razonamiento probabilístico e inferencial; no afirma causalidad.
- **Criterio de dominio:** justificar una decisión citando denominador, muestra, distribución, intervalo, cola o umbral visible.

## LearningModule

1. Predecir qué cambiará antes de activar la interacción.
2. Nombrar universo, muestra, variable o hipótesis activa.
3. Ejecutar **Marcar evento** y describir el cambio visible.
4. Contrastar la evidencia con el error común.
5. Cerrar con una conclusión permitida y una afirmación que no se puede hacer.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para decidir bajo incertidumbre.

**Evidencia narrativa común:** Ejecutar «Marcar evento» y citar el cambio visible asociado con evento.

**Pistas graduadas:**

- Nombra primero la unidad de análisis y el denominador activo.
- Compara el estado antes y después de la animación.
- Evita conclusiones causales o absolutas si el visual solo muestra evidencia descriptiva.

### Ejercicio guiado

**Historia:** Ana, coordinadora de admisiones de un acuario debe explicar probabilidades de especies e islas sin confundir subconjuntos. si usa el denominador incorrecto, el reporte público dará una proporción engañosa. La decisión es elegir la lectura de evento que conserva el universo correcto.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Marcar evento» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** Observa cuántos pingüinos quedan dentro del subconjunto Adelie.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir transferencia.

**Pregunta:** ¿Qué convierte a 'especie Adelie' en un evento?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Que cada pingüino puede cumplir o no esa condición. | Sí | El evento separa observaciones que cumplen la regla de las que no. |
| Que Adelie es el primer valor de la tabla. | No | El orden de aparición no define un evento. |
| Que todos los pingüinos son Adelie. | No | El complemento visible muestra que no todos cumplen la condición. |

**Pista:** Busca qué filas quedan iluminadas por la regla.

### Ejercicio de transferencia

**Historia:** Ana, coordinadora de admisiones de un acuario cambia de contexto para probar si el razonamiento se transfiere. si usa el denominador incorrecto, el reporte público dará una proporción engañosa. La decisión es elegir la lectura de evento que conserva el universo correcto.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Marcar evento» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** La animación cambia de 'Adelie' a otro subconjunto y actualiza la proporción.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** La transferencia cambia contexto o parámetro y exige aplicar el mismo criterio con nueva evidencia.

**Pregunta:** Si cambias la regla del evento, ¿qué debe cambiar en la evidencia?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El subconjunto marcado y su proporción. | Sí | Cambiar la condición cambia qué filas pertenecen al evento. |
| La fuente del dataset. | No | La fuente sigue siendo el mismo snapshot. |
| La unidad de análisis. | No | La unidad sigue siendo un pingüino. |

**Pista:** Compara qué barras o fichas entran al evento.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Identificar un evento como subconjunto de resultados posibles.

**Audiencia:** Docente de Nivel 3 con estudiantes que completaron descripción y visualización.

**Duración:** 40 minutos por concepto o 90 minutos por bloque.

| Minutos | Actividad |
| --- | --- |
| 0-5 | presentar fuente, licencia, unidad de análisis y pregunta inferencial. |
| 5-12 | pedir predicción y ejecutar la animación local. |
| 12-22 | discutir denominador, muestra, distribución o hipótesis según el concepto. |
| 22-32 | usar Codex para verificar cálculo reproducible sin cambiar el snapshot. |
| 32-40 | usar Gemini o ChatGPT para cuestionar interpretación y cerrar límites. |

### Preguntas, evaluación y errores

**Preguntas socráticas:**

- ¿Qué universo, muestra o hipótesis está activa después de la animación?
- ¿Qué evidencia visible sostiene la decisión?
- ¿Qué afirmación sería demasiado fuerte para este diseño?
- ¿Qué cambiaría si modificamos n, alpha, condición, umbral o método?

**Errores anticipados:**

- Confundir probabilidad condicional con causalidad.
- Interpretar p-value o intervalo como certeza.
- Usar una simulación didáctica como si fuera nuevo dato real.

**Evaluación rápida:** El estudiante interpreta evento citando evidencia visible, método y limitación.

**Blueprint de demo:** HTML local con snapshot real, botón «Marcar evento», dos estados visuales y aserción de cambio.

**Checklist antes de clase:**

- Abrir el laboratorio con y sin ?teacher=1.
- Verificar fuente, licencia, fecha, dimensiones y SHA-256 del snapshot.
- Preparar una predicción y una pregunta de transferencia.

**Checklist durante clase:**

- Bloquear respuestas hasta ejecutar la animación.
- Pedir denominador, muestra, distribución o hipótesis explícita.
- Separar evidencia, decisión y límite de conclusión.

### Roles de IA

- **Codex:** verifica cálculos, simulación determinística y criterios de aceptación.
- **Gemini o ChatGPT:** facilita, critica e interpreta la evidencia; no ejecuta la decisión.
- **Verificación humana:** revisar fórmulas, fuente, supuestos y límites antes de proyectar.
- **Privacidad:** No pegar datos sensibles, credenciales ni archivos privados en herramientas externas; el modo docente oculto no reemplaza autenticación.
- **Plan offline:** Usar HTML local, CSV snapshot, tarjetas de resultados y pizarra. No se requiere red ni IA.

### Prompts

**Codex**

> Trabaja como programador docente. Usa el snapshot público indicado y verifica una demo local para «Evento». Objetivo: Identificar un evento como subconjunto de resultados posibles. Conserva fuente/licencia/SHA-256 visibles, no inventes filas, etiqueta cualquier simulación como didáctica derivada del snapshot y agrega una comprobación automática del cálculo.

**Gemini**

> Facilita una discusión socrática sobre «Evento». Pide predicción, denominador o hipótesis antes de explicar, cuestiona interpretaciones causales y exige que cada respuesta cite la evidencia visible.

**ChatGPT**

> Actúa como revisor técnico-pedagógico de una clase sobre «Evento». Detecta conclusiones que excedan el diseño, revisa si el feedback corrige errores plausibles y propone dos preguntas de transferencia con respuesta esperada.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad ni certeza injustificada.
- Existe una ruta completa sin IA ni red.
