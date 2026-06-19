# Paquete: Intervalo de confianza

## Supuestos

- Audiencia: estudiantes que completaron Nivel 2.
- Duración: 40 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Palmer Penguins`.
- Las simulaciones visuales son didácticas, determinísticas y derivadas del snapshot; En vivo usa el snapshot real como fuente principal.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `confidence-interval`.
- **Bloque:** Incertidumbre.
- **Nivel:** 3, Probabilidad e inferencia.
- **Prerrequisitos:** media, desviación estándar, percentiles y muestreo, error estándar.
- **Concepto anterior:** Error estándar.
- **Concepto siguiente:** Bootstrap.
- **Objetivo:** Comunicar una estimación con un rango de incertidumbre bajo un método.
- **Definición:** Un intervalo de confianza es un rango construido por un procedimiento que captura el parámetro en cierta proporción de repeticiones.
- **Intuición:** Es una red lanzada por un método; no una promesa sobre una red específica.
- **Error común:** Decir que hay 95% de probabilidad de que el parámetro fijo esté dentro del intervalo observado.
- **Visual:** Muestra cómo cambia el ancho del intervalo con n y nivel de confianza.
- **Interacción:** Abrir intervalo.
- **Unidad de análisis:** una observación es un pingüino con masa corporal registrada.
- **Variables:** `body_mass_g`, numérica continua.
- **Dataset:** Palmer Penguins, 344 filas, licencia CC0-1.0.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Límite:** el material enseña razonamiento probabilístico e inferencial; no afirma causalidad.
- **Criterio de dominio:** justificar una decisión citando denominador, muestra, distribución, intervalo, cola o umbral visible.

## LearningModule

1. Predecir qué cambiará antes de activar la interacción.
2. Nombrar universo, muestra, variable o hipótesis activa.
3. Ejecutar **Abrir intervalo** y describir el cambio visible.
4. Contrastar la evidencia con el error común.
5. Cerrar con una conclusión permitida y una afirmación que no se puede hacer.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para decidir bajo incertidumbre.

**Evidencia narrativa común:** Ejecutar «Abrir intervalo» y citar el cambio visible asociado con intervalo de confianza.

**Pistas graduadas:**

- Nombra primero la unidad de análisis y el denominador activo.
- Compara el estado antes y después de la animación.
- Evita conclusiones causales o absolutas si el visual solo muestra evidencia descriptiva.

### Ejercicio guiado

**Historia:** Lucía, consultora que presenta estimaciones a dirección debe comunicar números con incertidumbre sin sonar más segura de lo que los datos permiten. un rango mal explicado puede convertirse en promesa operativa. La decisión es reportar intervalo de confianza con el método y sus límites.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Abrir intervalo» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** La animación muestra intervalos que cubren o no la media del snapshot.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir transferencia.

**Pregunta:** ¿Qué interpretación es correcta para un intervalo del 95%?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El método captura el parámetro en cerca de 95% de repeticiones comparables. | Sí | La confianza describe el procedimiento en repeticiones. |
| Hay 95% de probabilidad de que esta media muestral sea verdadera. | No | La media muestral ya es conocida; no es el parámetro fijo. |
| El intervalo prueba causalidad. | No | Un intervalo no identifica causa. |

**Pista:** Observa la simulación de muchos intervalos.

### Ejercicio de transferencia

**Historia:** Lucía, consultora que presenta estimaciones a dirección cambia de contexto para probar si el razonamiento se transfiere. un rango mal explicado puede convertirse en promesa operativa. La decisión es reportar intervalo de confianza con el método y sus límites.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Abrir intervalo» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** El visual muestra el intervalo 90% frente a 95%.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** La transferencia cambia contexto o parámetro y exige aplicar el mismo criterio con nueva evidencia.

**Pregunta:** ¿Qué hace un nivel de confianza más alto si n se mantiene?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Ensanchan el intervalo. | Sí | Para capturar más a menudo, el rango debe ser más amplio. |
| Siempre lo hace más estrecho. | No | Eso contradice la comparación visual. |
| Elimina la incertidumbre. | No | La incertidumbre se comunica, no desaparece. |

**Pista:** Compara los extremos del intervalo antes y después.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Palmer Penguins (344 filas, 8 columnas), licencia CC0-1.0.

**Fuente:** https://allisonhorst.github.io/palmerpenguins/

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`

**Objetivo docente:** Comunicar una estimación con un rango de incertidumbre bajo un método.

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

**Evaluación rápida:** El estudiante interpreta intervalo de confianza citando evidencia visible, método y limitación.

**Blueprint de demo:** HTML local con snapshot real, botón «Abrir intervalo», dos estados visuales y aserción de cambio.

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

> Trabaja como programador docente. Usa el snapshot público indicado y verifica una demo local para «Intervalo de confianza». Objetivo: Comunicar una estimación con un rango de incertidumbre bajo un método. Conserva fuente/licencia/SHA-256 visibles, no inventes filas, etiqueta cualquier simulación como didáctica derivada del snapshot y agrega una comprobación automática del cálculo.

**Gemini**

> Facilita una discusión socrática sobre «Intervalo de confianza». Pide predicción, denominador o hipótesis antes de explicar, cuestiona interpretaciones causales y exige que cada respuesta cite la evidencia visible.

**ChatGPT**

> Actúa como revisor técnico-pedagógico de una clase sobre «Intervalo de confianza». Detecta conclusiones que excedan el diseño, revisa si el feedback corrige errores plausibles y propone dos preguntas de transferencia con respuesta esperada.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad ni certeza injustificada.
- Existe una ruta completa sin IA ni red.
