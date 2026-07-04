# Regression Cases

## Casos bloqueantes de Niveles 3–10

- Debe fallar si Nivel 3 conserva el denominador general después de condicionar, interpreta un intervalo como probabilidad del parámetro o un p-value como probabilidad del nulo.
- Debe fallar si Nivel 4 llama causa a una correlación, pierde la reversión agregada al regenerar u oculta denominadores en riesgo relativo u odds.
- Debe fallar si Nivel 5 afirma desempeño futuro, introduce train/test antes de Nivel 6 o usa `tacos_vendidos`, `espera_mediana_min` o `merma_kg` como predictor.
- Debe fallar si Nivel 6 usa test para elegir umbral o regularización, mezcla test en cross-validation, intercambia denominadores o desconecta FP/FN de sus costos.
- Debe fallar si Nivel 7 presenta clusters como tipos reales, llama fraude a una anomalía, borra casos antes de revisión o excede dos servicios semanales.
- Debe fallar si Nivel 8 desordena fechas, usa futuro en ventanas o backtesting, interpreta antes/después como causal, cambia métrica o tamaño tras mirar resultados, o despliega pese a incumplir guardrails.
- Debe fallar si Nivel 9 infiere el secreto de Rogelio o Chava, incluye registros personales, usa celdas menores a 25, oculta denominadores o presenta una métrica de fairness como justicia total.
- Debe fallar si Nivel 10 confunde data drift con fallo, inventa etiquetas retrasadas, alerta por una variación aislada, automatiza una sanción, revierte sin comprobar, culpa a una persona o impide retirar el procedimiento.
- Debe fallar si Mari o Chava introducen ciencia de datos, trabajan sin pago o aparecen identificados en CSV.
- Debe fallar si Paco revela la beca antes de Nivel 5, si la meta de Mari aparece antes de `L7-S04` o se infiere desde datos, o si el secreto de Chava aparece antes de Nivel 9.

## Caso 1: Histograma

**Solicitud:** enseñar histogramas a principiantes.

**Debe producir:** construcción de bins, forma de distribución, comparación de escenarios, error histograma vs. barras, ejercicio dependiente del visual y feedback.

**Debe fallar si:** copia el demo de referencia, solo define el concepto o afirma que existe un número universal de bins.

## Caso 2: Correlación

**Solicitud:** explicar correlación con un caso aplicado.

**Debe producir:** scatterplot, dirección y fuerza, efecto de outlier, diferencia con causalidad y práctica de interpretación.

**Debe fallar si:** afirma causalidad, usa solo un coeficiente sin visual o ignora relaciones no lineales.

## Caso 3: Matriz de confusión

**Solicitud:** preparar una clase de métricas de clasificación.

**Debe producir:** TP, TN, FP y FN conectados al dominio, cambio de umbral y costo de errores.

**Debe fallar si:** presenta accuracy como métrica universal o intercambia precision y recall.

## Caso 4: Clustering

**Solicitud:** crear ejercicio de segmentación.

**Debe producir:** escala o distancia, elección de grupos, incertidumbre y clusters como hipótesis.

**Debe fallar si:** llama clases verdaderas a los clusters o asigna significado causal.

## Caso 5: A/B testing

**Solicitud:** explicar si B ganó.

**Debe producir:** tamaños de muestra, efecto, incertidumbre, guardrails y relevancia práctica.

**Debe fallar si:** declara ganador solo porque una barra es más alta.

## Caso 6: Tema demasiado amplio

**Solicitud:** enseñar machine learning completo en una clase.

**Debe producir:** reducción a un objetivo inicial, prerrequisitos y ruta posterior.

**Debe fallar si:** genera un curso superficial o mezcla regresión, clasificación y clustering sin progresión.

## Caso 7: Narrativa sin aprendizaje

**Solicitud:** crear un caso emocionante de fraude.

**Debe producir:** protagonista, presión realista, evidencia animada suficiente, decisión limitada y advertencia de que anomalía no prueba fraude.

**Debe fallar si:** la historia permite adivinar la respuesta, la respuesta se habilita antes de revelar evidencia o acusa a una persona sin evidencia.

## Uso

1. Ejecutar el flujo documental con la solicitud.
2. Revisar condiciones de éxito y fallo.
3. Puntuar con `rubric.md`.
4. Agregar un caso cuando una salida mala pase inadvertida.

## Caso 8: Dataset público sin procedencia

**Solicitud:** usar un CSV encontrado en internet.

**Debe producir:** fuente oficial, licencia, cita, fecha, dimensiones, snapshot y SHA-256.

**Debe fallar si:** enlaza un recurso cambiante durante clase, omite licencia o
modifica filas sin documentarlo.

## Caso 9: Roles de IA indistinguibles

**Solicitud:** usar Codex y Gemini o ChatGPT durante una clase.

**Debe producir:** Codex para ejecutar o modificar código; Gemini/ChatGPT para
facilitar, cuestionar o revisar; verificación humana y plan offline.

**Debe fallar si:** ambos reciben el mismo prompt genérico o la clase depende de
que un modelo responda.

## Caso 11: En vivo como pestaña estudiantil

**Solicitud:** publicar un laboratorio con Aprender, Ejercitar y En vivo.

**Debe producir:** Aprender y Ejercitar visibles para estudiantes; En vivo oculto
por defecto y activable solo con modo docente, con aviso de que no es seguridad real.

**Debe fallar si:** En vivo aparece como pestaña estudiantil normal o se presenta
el ocultamiento frontend como autenticación.

## Caso 12: En vivo con datos sintéticos

**Solicitud:** preparar la clase en vivo para cualquier concepto publicado.

**Debe producir:** snapshot público real con fuente, licencia, fecha, dimensiones
y SHA-256, aunque Aprender o Ejercitar usen datos didácticos.

**Debe fallar si:** el dataset principal de En vivo es sintético o no tiene hash.

## Caso 10: Publicación de borradores

**Solicitud:** mostrar resultados en GitHub Pages.

**Debe producir:** build desde manifests, validación aprobada, enlaces y hashes.

**Debe fallar si:** un paquete con `status != published`, promedio menor a 4 o
una dimensión en 1 aparece en `_site/`.

## Caso 13: Cambio visual semánticamente incorrecto

**Solicitud:** animar p-value, intervalo de confianza o distribución normal.

**Debe producir:** cola sombreada sobre la distribución nula, intervalo sobre
una escala común y campana superpuesta a la distribución observada.

**Debe fallar si:** reemplaza el mecanismo por barras genéricas, habilita la
respuesta sin las marcas requeridas o aprueba solo porque cambió el HTML.

## Caso 14: Movimiento reducido

**Solicitud:** usar el laboratorio con `prefers-reduced-motion`.

**Debe producir:** los mismos estados, números, `evidenceIds` y desbloqueo sin
movimiento gradual.

**Debe fallar si:** elimina evidencia, deja el control bloqueado o cambia la
respuesta correcta.

## Caso 15: Don Juan habla como analista

**Solicitud:** continuar la historia del puesto para explicar un concepto.

**Debe producir:** Don Juan expresa una necesidad del negocio; Paco ensaya una
idea compatible con lo aprendido; el narrador nombra y limita el concepto.

**Debe fallar si:** Don Juan usa cualquier término o conclusión formal de datos,
aunque ya haya aparecido en el curso, o si los diálogos son intercambiables.

## Caso 16: Conocimiento prematuro y dataset mutante

**Solicitud:** escribir el episodio siguiente de una ruta continua.

**Debe producir:** lectura del ledger, uso exclusivo de conocimiento adquirido y
un `dataStateDelta` con versión, columnas y conteos.

**Debe fallar si:** Paco usa un concepto futuro, reaparecen columnas eliminadas o
el número de filas cambia sin transformación documentada.

## Caso 17: Misma historia en Aprender y Ejercitar

**Solicitud:** generar ambos modos dentro del mundo de Don Juan y Paco.

**Debe producir:** un episodio de explicación y un incidente posterior con otra
evidencia y decisión.

**Debe fallar si:** Ejercitar repite el problema, la tabla o la resolución de Aprender.

## Caso 18: Skill como receta vacía

**Solicitud:** introducir una skill durante Nivel 1.

**Debe producir:** nombre, entrada, pasos, salida, comprobaciones y límites
conectados con el objetivo de datos.

**Debe fallar si:** solo dice que una skill es una receta o que el agente resolverá todo.

## Caso 19: Secreto convertido en dato

**Solicitud:** usar la dieta del señor Rogelio para enriquecer el ejercicio.

**Debe producir:** el secreto permanece en el canon de autoría hasta su ventana y
solo sirve para discutir privacidad; no se registra ni se infiere desde compras.

**Debe fallar si:** dieta, identidad o intención aparecen como columna, etiqueta,
segmento o conclusión sobre Rogelio.

## Caso 20: Crecimiento mágico y trabajo familiar

**Solicitud:** hacer crecer el puesto después de una lección exitosa.

**Debe producir:** estado anterior, condición de negocio, inversión, capacidad,
plantilla pagada, límite familiar y `growthDelta`; Nivel 1 debe conservar `G1`.

**Debe fallar si:** la IA recomienda crecer y el puesto adquiere equipo, horario,
asientos o trabajo de Lupita/Beto sin decisión, costo y condición explícitos.

## Caso 21: Nivel implementado antes de escribir la historia

**Solicitud:** crear un nivel perteneciente a una ruta continua.

**Debe producir:** temario congelado, `docs/stories/LEVEL_<N>.md` independiente y
aprobada, y solo después ConceptSpecs, modos e implementación trazables.

**Debe fallar si:** reconstruye la historia desde JavaScript, escribe la historia
dentro del HTML o implementa mientras la historia sigue en borrador.

## Caso 22: Narrador representado como personaje

**Solicitud:** mostrar una definición o conclusión técnica del narrador.

**Debe producir:** una banda de subtítulos accesible, después de la evidencia
cuando se trate de una conclusión.

**Debe fallar si:** usa un globo, tarjeta o diálogo del narrador, o hace que Don
Juan o Paco pronuncien la definición para evitar el subtítulo.

## Caso 23: Nivel 2 reinicia el mundo o cambia de dataset

**Solicitud:** enseñar las 21 lecciones de descripción y visualización.

**Debe producir:** 600 pedidos sintéticos versionados como entrada de Aprender y
Ejercitar, 16 noches de 30 a 45 pedidos y continuidad `L1.4 → L2.4`. Penguins,
Bike Sharing y Wine Quality permanecen como fuentes públicas de En vivo.

**Debe fallar si:** una lección estudiantil vuelve a pingüinos, bicicletas o vino;
el puesto crece; cambia la unidad de pedido; o se atribuye causalmente el volumen.

## Caso 24: Valor extremo borrado sin auditoría

**Solicitud:** resolver outliers, leverage, error de captura y caso raro válido.

**Debe producir:** `P-005=500`, `P-007=30`, `L2-X001=360` y `L2-A001=36` en una
auditoría separada, con fuente, estado y acción; la tabla canónica conserva trazabilidad.

**Debe fallar si:** corrige 500 o 360 por intuición, elimina 30 o 36 por rareza,
confunde leverage con error o infiere información personal del cliente.
