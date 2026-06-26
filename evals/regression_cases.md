# Regression Cases

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
