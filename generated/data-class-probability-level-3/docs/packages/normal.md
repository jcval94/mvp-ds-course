# Paquete: Normal

## Supuestos

- Audiencia: estudiantes que completaron Nivel 2.
- Duración: 40 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- Las simulaciones visuales son didácticas, determinísticas y derivadas del snapshot; En vivo usa el snapshot real como fuente principal.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `normal`.
- **Bloque:** Variables aleatorias.
- **Nivel:** 3, Probabilidad e inferencia.
- **Prerrequisitos:** evento, proporción, conteos y lectura de distribuciones.
- **Concepto anterior:** Binomial.
- **Concepto siguiente:** Poisson.
- **Objetivo:** Reconocer una distribución continua simétrica como aproximación útil bajo supuestos.
- **Definición:** La normal es una curva continua definida por media y desviación estándar.
- **Intuición:** Es una campana que resume variación alrededor de un centro.
- **Error común:** Usar la normal sin revisar forma, escala o si la variable es continua.
- **Visual:** Compara medias muestrales con una curva normal aproximada.
- **Kind visual:** `distribution-curve`.
- **Mecanismo:** forma continua y concentración alrededor del centro.
- **Estados:** Medias de n=5 → Medias de n=35.
- **Movimiento:** 600 ms; interpolar posiciones, áreas o geometría para revelar el mecanismo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas, valores y desbloqueo.
- **Interacción:** Comparar campana.
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
3. Ejecutar **Comparar campana** y describir el cambio visible.
4. Contrastar la evidencia con el error común.
5. Cerrar con una conclusión permitida y una afirmación que no se puede hacer.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para decidir bajo incertidumbre.

**Evidencia narrativa común:** Ejecutar «Comparar campana» y citar el cambio visible asociado con normal.

**Pistas graduadas:**

- Nombra primero la unidad de análisis y el denominador activo.
- Compara el estado antes y después de la animación.
- Evita conclusiones causales o absolutas si el visual solo muestra evidencia descriptiva.

### Ejercicio guiado

**Historia:** Mateo, gerente de operaciones de bicicletas compartidas convierte cientos de días reales en variables aleatorias para planear personal. si modela mal el mecanismo, abrirá estaciones con personal insuficiente. La decisión es usar normal solo cuando el mecanismo de conteo o medición lo permite.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar campana» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** La animación compara una nube de medias con una campana de referencia.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs normal-state-1, normal-state-2.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir transferencia.

**Pregunta:** ¿Qué rasgo visual sugiere una aproximación normal razonable?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Una forma unimodal y aproximadamente simétrica alrededor del centro. | Sí | La normal presupone continuidad y simetría aproximada. |
| Cualquier histograma con color azul. | No | El color no tiene significado estadístico. |
| Una variable categórica con tres etiquetas. | No | Una etiqueta categórica no se modela con una curva continua. |

**Pista:** Observa centro, colas y simetría.

### Ejercicio de transferencia

**Historia:** Mateo, gerente de operaciones de bicicletas compartidas cambia de contexto para probar si el razonamiento se transfiere. si modela mal el mecanismo, abrirá estaciones con personal insuficiente. La decisión es usar normal solo cuando el mecanismo de conteo o medición lo permite.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Comparar campana» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** El visual muestra ajuste aproximado y puntos reales al mismo tiempo.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs normal-state-1, normal-state-2.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** La transferencia cambia contexto o parámetro y exige aplicar el mismo criterio con nueva evidencia.

**Pregunta:** ¿Cuál es el límite correcto al usar la normal aquí?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Es una aproximación descriptiva, no una garantía de que los datos sean normales. | Sí | La curva ayuda a razonar, pero los datos deben revisarse. |
| Prueba causalidad entre variables. | No | La normal no establece mecanismos causales. |
| Elimina la necesidad de mirar outliers. | No | Los extremos pueden hacer mala la aproximación. |

**Pista:** Busca qué parte de la evidencia queda fuera de la campana.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Reconocer una distribución continua simétrica como aproximación útil bajo supuestos.

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

**Evaluación rápida:** El estudiante interpreta normal citando evidencia visible, método y limitación.

**Blueprint de demo:** HTML local con snapshot real, botón «Comparar campana», dos estados visuales y aserción de cambio.

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

> Trabaja como programador docente. Usa el snapshot público indicado y verifica una demo local para «Normal». Objetivo: Reconocer una distribución continua simétrica como aproximación útil bajo supuestos. Conserva fuente/licencia/SHA-256 visibles, no inventes filas, etiqueta cualquier simulación como didáctica derivada del snapshot y agrega una comprobación automática del cálculo.

**Gemini**

> Facilita una discusión socrática sobre «Normal». Pide predicción, denominador o hipótesis antes de explicar, cuestiona interpretaciones causales y exige que cada respuesta cite la evidencia visible.

**ChatGPT**

> Actúa como revisor técnico-pedagógico de una clase sobre «Normal». Detecta conclusiones que excedan el diseño, revisa si el feedback corrige errores plausibles y propone dos preguntas de transferencia con respuesta esperada.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad ni certeza injustificada.
- Existe una ruta completa sin IA ni red.
