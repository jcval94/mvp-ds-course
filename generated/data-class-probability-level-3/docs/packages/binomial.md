# Paquete: Binomial

## Supuestos

- Audiencia: estudiantes que completaron Nivel 2.
- Duración: 40 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- Las simulaciones visuales son didácticas, determinísticas y derivadas del snapshot; En vivo usa el snapshot real como fuente principal.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `binomial`.
- **Bloque:** Variables aleatorias.
- **Nivel:** 3, Probabilidad e inferencia.
- **Prerrequisitos:** evento, proporción, conteos y lectura de distribuciones.
- **Concepto anterior:** Bernoulli.
- **Concepto siguiente:** Normal.
- **Objetivo:** Interpretar el conteo de éxitos en varios ensayos Bernoulli.
- **Definición:** Una binomial cuenta cuántos éxitos ocurren en n ensayos con la misma probabilidad.
- **Intuición:** Es sumar varias luces de Bernoulli en una sola cuenta.
- **Error común:** Tratar una binomial como si fuera un solo día o ignorar n.
- **Visual:** Agrupa 20 días y cuenta cuántos superan el umbral.
- **Interacción:** Acumular ensayos.
- **Unidad de análisis:** una observación es un día del sistema de bicicletas.
- **Variables:** `cnt`, conteo diario; `season`, `mnth`, `workingday`, categóricas discretas.
- **Dataset:** Bike Sharing Dataset · UCI, 731 filas, licencia CC BY 4.0.
- **Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Límite:** el material enseña razonamiento probabilístico e inferencial; no afirma causalidad.
- **Criterio de dominio:** justificar una decisión citando denominador, muestra, distribución, intervalo, cola o umbral visible.

## LearningModule

1. Predecir qué cambiará antes de activar la interacción.
2. Nombrar universo, muestra, variable o hipótesis activa.
3. Ejecutar **Acumular ensayos** y describir el cambio visible.
4. Contrastar la evidencia con el error común.
5. Cerrar con una conclusión permitida y una afirmación que no se puede hacer.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para decidir bajo incertidumbre.

**Evidencia narrativa común:** Ejecutar «Acumular ensayos» y citar el cambio visible asociado con binomial.

**Pistas graduadas:**

- Nombra primero la unidad de análisis y el denominador activo.
- Compara el estado antes y después de la animación.
- Evita conclusiones causales o absolutas si el visual solo muestra evidencia descriptiva.

### Ejercicio guiado

**Historia:** Mateo, gerente de operaciones de bicicletas compartidas convierte cientos de días reales en variables aleatorias para planear personal. si modela mal el mecanismo, abrirá estaciones con personal insuficiente. La decisión es usar binomial solo cuando el mecanismo de conteo o medición lo permite.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Acumular ensayos» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** La animación acumula varios días y muestra k éxitos de n.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir transferencia.

**Pregunta:** ¿Qué cambia al pasar de Bernoulli a Binomial?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Ahora se cuenta el número de éxitos en varios ensayos. | Sí | La binomial suma resultados 0/1 a través de n ensayos. |
| El éxito deja de ser binario. | No | Cada ensayo sigue siendo binario. |
| La fuente de datos se vuelve sintética. | No | El visual usa días reales del snapshot como base. |

**Pista:** Busca el grupo de ensayos y el contador de éxitos.

### Ejercicio de transferencia

**Historia:** Mateo, gerente de operaciones de bicicletas compartidas cambia de contexto para probar si el razonamiento se transfiere. si modela mal el mecanismo, abrirá estaciones con personal insuficiente. La decisión es usar binomial solo cuando el mecanismo de conteo o medición lo permite.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Acumular ensayos» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** El visual muestra conteos de éxito para varios grupos de tamaño n.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** La transferencia cambia contexto o parámetro y exige aplicar el mismo criterio con nueva evidencia.

**Pregunta:** Si n aumenta y p se mantiene, ¿qué interpretación del conteo es prudente?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El número esperado de éxitos aumenta, pero hay variación entre grupos. | Sí | Más ensayos elevan el conteo esperado, no eliminan azar. |
| Todos los grupos tendrán exactamente el mismo k. | No | La distribución visible muestra grupos con distintos k. |
| p deja de importar. | No | p determina la frecuencia de éxito esperada. |

**Pista:** Compara centro y dispersión de las barras.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Interpretar el conteo de éxitos en varios ensayos Bernoulli.

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

**Evaluación rápida:** El estudiante interpreta binomial citando evidencia visible, método y limitación.

**Blueprint de demo:** HTML local con snapshot real, botón «Acumular ensayos», dos estados visuales y aserción de cambio.

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

> Trabaja como programador docente. Usa el snapshot público indicado y verifica una demo local para «Binomial». Objetivo: Interpretar el conteo de éxitos en varios ensayos Bernoulli. Conserva fuente/licencia/SHA-256 visibles, no inventes filas, etiqueta cualquier simulación como didáctica derivada del snapshot y agrega una comprobación automática del cálculo.

**Gemini**

> Facilita una discusión socrática sobre «Binomial». Pide predicción, denominador o hipótesis antes de explicar, cuestiona interpretaciones causales y exige que cada respuesta cite la evidencia visible.

**ChatGPT**

> Actúa como revisor técnico-pedagógico de una clase sobre «Binomial». Detecta conclusiones que excedan el diseño, revisa si el feedback corrige errores plausibles y propone dos preguntas de transferencia con respuesta esperada.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad ni certeza injustificada.
- Existe una ruta completa sin IA ni red.
