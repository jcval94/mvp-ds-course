# Paquete: Poisson

## Supuestos

- Audiencia: estudiantes que completaron Nivel 2.
- Duración: 40 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- Las simulaciones visuales son didácticas, determinísticas y derivadas del snapshot; En vivo usa el snapshot real como fuente principal.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `poisson`.
- **Bloque:** Variables aleatorias.
- **Nivel:** 3, Probabilidad e inferencia.
- **Prerrequisitos:** evento, proporción, conteos y lectura de distribuciones.
- **Concepto anterior:** Normal.
- **Concepto siguiente:** Variabilidad muestral.
- **Objetivo:** Usar Poisson para conteos de eventos raros en una ventana fija.
- **Definición:** Una Poisson modela cuántos eventos ocurren en una unidad de tiempo o espacio.
- **Intuición:** Es contar llegadas raras por mes cuando la ventana se mantiene igual.
- **Error común:** Usarla para proporciones, valores continuos o ventanas comparadas injustamente.
- **Visual:** Cuenta meses con muchos días de demanda extrema.
- **Kind visual:** `event-timeline`.
- **Mecanismo:** conteo de eventos raros en ventanas comparables.
- **Estados:** Eventos raros por mes → Tasa mensual.
- **Movimiento:** 600 ms; interpolar posiciones, áreas o geometría para revelar el mecanismo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas, valores y desbloqueo.
- **Interacción:** Contar eventos raros.
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
3. Ejecutar **Contar eventos raros** y describir el cambio visible.
4. Contrastar la evidencia con el error común.
5. Cerrar con una conclusión permitida y una afirmación que no se puede hacer.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para decidir bajo incertidumbre.

**Evidencia narrativa común:** Ejecutar «Contar eventos raros» y citar el cambio visible asociado con poisson.

**Pistas graduadas:**

- Nombra primero la unidad de análisis y el denominador activo.
- Compara el estado antes y después de la animación.
- Evita conclusiones causales o absolutas si el visual solo muestra evidencia descriptiva.

### Ejercicio guiado

**Historia:** Mateo, gerente de operaciones de bicicletas compartidas convierte cientos de días reales en variables aleatorias para planear personal. si modela mal el mecanismo, abrirá estaciones con personal insuficiente. La decisión es usar poisson solo cuando el mecanismo de conteo o medición lo permite.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Contar eventos raros» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** La animación muestra conteos de días extremos por mes.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs poisson-state-1, poisson-state-2.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir transferencia.

**Pregunta:** ¿Qué condición hace razonable pensar en Poisson?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Se cuentan eventos en ventanas comparables. | Sí | Poisson describe conteos por ventana fija. |
| Se mide una masa corporal continua. | No | Una variable continua requiere otro modelo. |
| Se comparan categorías sin orden. | No | Categorías sin conteo por ventana no son Poisson por sí solas. |

**Pista:** Mira si cada barra representa la misma ventana temporal.

### Ejercicio de transferencia

**Historia:** Mateo, gerente de operaciones de bicicletas compartidas cambia de contexto para probar si el razonamiento se transfiere. si modela mal el mecanismo, abrirá estaciones con personal insuficiente. La decisión es usar poisson solo cuando el mecanismo de conteo o medición lo permite.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Contar eventos raros» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** El visual contrasta meses completos contra una ventana mal recortada.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs poisson-state-1, poisson-state-2.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** La transferencia cambia contexto o parámetro y exige aplicar el mismo criterio con nueva evidencia.

**Pregunta:** ¿Qué sería una mala comparación para Poisson?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Comparar conteos de meses completos con conteos de semanas sin ajustar ventana. | Sí | Cambiar la ventana rompe la comparabilidad del conteo. |
| Reportar el promedio de eventos por mes. | No | La tasa promedio es parte central del modelo. |
| Contar cuántos meses tuvieron cero eventos. | No | Los ceros también son resultados informativos. |

**Pista:** Revisa si la unidad de exposición se conserva.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Usar Poisson para conteos de eventos raros en una ventana fija.

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

**Evaluación rápida:** El estudiante interpreta poisson citando evidencia visible, método y limitación.

**Blueprint de demo:** HTML local con snapshot real, botón «Contar eventos raros», dos estados visuales y aserción de cambio.

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

> Trabaja como programador docente. Usa el snapshot público indicado y verifica una demo local para «Poisson». Objetivo: Usar Poisson para conteos de eventos raros en una ventana fija. Conserva fuente/licencia/SHA-256 visibles, no inventes filas, etiqueta cualquier simulación como didáctica derivada del snapshot y agrega una comprobación automática del cálculo.

**Gemini**

> Facilita una discusión socrática sobre «Poisson». Pide predicción, denominador o hipótesis antes de explicar, cuestiona interpretaciones causales y exige que cada respuesta cite la evidencia visible.

**ChatGPT**

> Actúa como revisor técnico-pedagógico de una clase sobre «Poisson». Detecta conclusiones que excedan el diseño, revisa si el feedback corrige errores plausibles y propone dos preguntas de transferencia con respuesta esperada.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad ni certeza injustificada.
- Existe una ruta completa sin IA ni red.
