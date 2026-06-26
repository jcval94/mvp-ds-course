# Paquete: Potencia

## Supuestos

- Audiencia: estudiantes que completaron Nivel 2.
- Duración: 40 minutos para el concepto dentro de un bloque de 90 minutos.
- Dataset: snapshot público fijo `Bike Sharing Dataset · UCI`.
- Las simulaciones visuales son didácticas, determinísticas y derivadas del snapshot; En vivo usa el snapshot real como fuente principal.
- La IA se usa de forma externa y toda salida requiere verificación humana.

## ConceptSpec

- **ID:** `power`.
- **Bloque:** Pruebas de hipótesis.
- **Nivel:** 3, Probabilidad e inferencia.
- **Prerrequisitos:** hipótesis verbal, muestreo, error estándar, distribuciones y decisiones con umbral, hipótesis nula y alternativa.
- **Concepto anterior:** Error tipo II.
- **Concepto siguiente:** Relaciones entre variables.
- **Objetivo:** Interpretar potencia como probabilidad de detectar un efecto real bajo condiciones dadas.
- **Definición:** La potencia es la probabilidad de rechazar H0 cuando una alternativa específica es verdadera.
- **Intuición:** Es la sensibilidad del detector cuando el problema sí está presente.
- **Error común:** Hablar de potencia sin fijar efecto, variabilidad, alpha y tamaño de muestra.
- **Visual:** Compara potencia al cambiar tamaño de muestra y efecto.
- **Kind visual:** `overlap`.
- **Mecanismo:** área detectada bajo una alternativa.
- **Estados:** Diseño débil → Diseño más sensible.
- **Movimiento:** 600 ms; interpolar posiciones, áreas o geometría para revelar el mecanismo.
- **Movimiento reducido:** cambio inmediato con las mismas marcas, valores y desbloqueo.
- **Interacción:** Aumentar muestra.
- **Unidad de análisis:** una observación es un día del sistema de bicicletas.
- **Variables:** `cnt` y `workingday`, usados para una diferencia de medias descriptiva.
- **Dataset:** Bike Sharing Dataset · UCI, 731 filas, licencia CC BY 4.0.
- **Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Límite:** el material enseña razonamiento probabilístico e inferencial; no afirma causalidad.
- **Criterio de dominio:** justificar una decisión citando denominador, muestra, distribución, intervalo, cola o umbral visible.

## LearningModule

1. Predecir qué cambiará antes de activar la interacción.
2. Nombrar universo, muestra, variable o hipótesis activa.
3. Ejecutar **Aumentar muestra** y describir el cambio visible.
4. Contrastar la evidencia con el error común.
5. Cerrar con una conclusión permitida y una afirmación que no se puede hacer.

## PracticeExercise

**Regla de separación:** Este caso no repite Aprender; usa el concepto para decidir bajo incertidumbre.

**Evidencia narrativa común:** Ejecutar «Aumentar muestra» y citar el cambio visible asociado con potencia.

**Pistas graduadas:**

- Nombra primero la unidad de análisis y el denominador activo.
- Compara el estado antes y después de la animación.
- Evita conclusiones causales o absolutas si el visual solo muestra evidencia descriptiva.

### Ejercicio guiado

**Historia:** Mariana, líder de producto que evalúa un cambio de horario quiere decidir si la diferencia observada merece una prueba más formal. un falso hallazgo puede cambiar turnos y costos; un falso negativo puede ocultar una mejora real. La decisión es interpretar potencia sin convertir evidencia en certeza.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Aumentar muestra» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** La animación aumenta n y muestra mayor área de detección bajo H1.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs power-state-1, power-state-2.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** El caso guiado revela el mecanismo central antes de pedir transferencia.

**Pregunta:** ¿Qué suele aumentar la potencia?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| Mayor tamaño de muestra o mayor efecto, manteniendo lo demás comparable. | Sí | Más datos o un efecto más grande separan mejor las distribuciones. |
| Menos información siempre. | No | Menos información suele reducir sensibilidad. |
| Ignorar alpha. | No | Alpha forma parte del diseño de la prueba. |

**Pista:** Observa cómo se reduce el solapamiento.

### Ejercicio de transferencia

**Historia:** Mariana, líder de producto que evalúa un cambio de horario cambia de contexto para probar si el razonamiento se transfiere. un falso hallazgo puede cambiar turnos y costos; un falso negativo puede ocultar una mejora real. La decisión es interpretar potencia sin convertir evidencia en certeza.

**Escenas animadas:** Escena 1: mirar el estado inicial y escribir una predicción. / Escena 2: ejecutar «Aumentar muestra» para revelar evidencia. / Escena 3: elegir la respuesta citando el cambio visible y una limitación.

**Evidencia requerida:** El visual lista n, efecto y alpha como condiciones de potencia.

**Contrato de evidencia:** pasos 1; desbloqueo en 1; IDs power-state-1, power-state-2.

**Regla de feedback:** El feedback debe mencionar el denominador, muestra, cola, intervalo o umbral visible que sostiene la decisión.

**Transferencia:** La transferencia cambia contexto o parámetro y exige aplicar el mismo criterio con nueva evidencia.

**Pregunta:** ¿Qué debe especificarse al reportar potencia?

| Opción | Correcta | Feedback |
| --- | --- | --- |
| El efecto objetivo, alpha, variabilidad y tamaño de muestra. | Sí | La potencia depende de supuestos de diseño. |
| Solo si el p-value observado fue pequeño. | No | La potencia se planifica antes o se interpreta con supuestos, no solo con p observado. |
| Únicamente el color del gráfico. | No | El color no define sensibilidad estadística. |

**Pista:** Busca los parámetros junto al visual.

## LiveTeachingPack

**Visibilidad:** modo docente oculto por defecto; no es autenticación real.

**Dataset real:** Bike Sharing Dataset · UCI (731 filas, 16 columnas), licencia CC BY 4.0.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Fecha del snapshot:** 2026-06-14

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`

**Objetivo docente:** Interpretar potencia como probabilidad de detectar un efecto real bajo condiciones dadas.

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

**Evaluación rápida:** El estudiante interpreta potencia citando evidencia visible, método y limitación.

**Blueprint de demo:** HTML local con snapshot real, botón «Aumentar muestra», dos estados visuales y aserción de cambio.

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

> Trabaja como programador docente. Usa el snapshot público indicado y verifica una demo local para «Potencia». Objetivo: Interpretar potencia como probabilidad de detectar un efecto real bajo condiciones dadas. Conserva fuente/licencia/SHA-256 visibles, no inventes filas, etiqueta cualquier simulación como didáctica derivada del snapshot y agrega una comprobación automática del cálculo.

**Gemini**

> Facilita una discusión socrática sobre «Potencia». Pide predicción, denominador o hipótesis antes de explicar, cuestiona interpretaciones causales y exige que cada respuesta cite la evidencia visible.

**ChatGPT**

> Actúa como revisor técnico-pedagógico de una clase sobre «Potencia». Detecta conclusiones que excedan el diseño, revisa si el feedback corrige errores plausibles y propone dos preguntas de transferencia con respuesta esperada.

## Validación

- Los dos ejercicios requieren observar el visual.
- Cada opción recibe feedback específico.
- La fuente y licencia son visibles.
- No se afirma causalidad ni certeza injustificada.
- Existe una ruta completa sin IA ni red.
