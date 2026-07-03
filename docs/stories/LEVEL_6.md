# Historia Nivel 6: Abrir el sobre una sola vez

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-6-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 6.
- **Arco:** `docs/LEVEL_6_NARRATIVE_ARC.md`.
- **Entrada/salida:** `L5.6 / G4-kiosco → L6.6 / G4-kiosco`.

El narrador concentra términos y conclusiones. Don Juan habla de compras, merma, faltantes y capacidad. Paco conserva voz de hijo y estudiante. Aprender y Ejercitar usan noches, evidencia y decisiones diferentes.

## Temario y escenas aprobadas

| Escena | Concepto | Aprender | Don Juan | Paco | Subtítulo inicial | Subtítulo de evidencia | Ejercitar distinto |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L6-S01` | train | Separar 48 noches para ajustar | “Estas sí son para preparar la regla.” | “Las marco antes de calcular.” | Train es la partición usada para estimar parámetros. | Ajustar en train no estima desempeño futuro. | Otra partición detecta una fila duplicada. |
| `L6-S02` | validation | Comparar cinco umbrales | “Prueba la opción sin abrir el sobre final.” | “Elijo aquí y dejo registro.” | Validation compara alternativas fuera de train. | El umbral se congela por costo antes de test. | Otra regla compara regularización. |
| `L6-S03` | test | Sellar 32 noches futuras | “Ese no se abre para ir corrigiendo.” | “Primero congelo el procedimiento.” | Test no participa en ajuste ni selección. | Abrirlo repetidamente sesga la estimación. | Un sobre abierto obliga a invalidar la prueba. |
| `L6-S04` | cross-validation | Rotar cuatro folds de desarrollo | “Que todos trabajen, pero sin tocar el sobre.” | “Cada fold valida una vez.” | Cross-validation rota ajuste y validación. | Los folds usan solo las primeras 64 noches. | Otra rotación descubre variación del ajuste. |
| `L6-S05` | MAE | Promediar errores absolutos | “Dímelo en pedidos.” | “Tomo distancia y promedio.” | MAE conserva unidades de pedidos. | Resume desvío típico sin cuadrar. | Otro lote cambia el error mediano. |
| `L6-S06` | MSE | Cuadrar cada error | “Ese tropiezo grande no vale igual.” | “Al cuadrarlo gana peso.” | MSE promedia errores al cuadrado. | Penaliza errores grandes y pierde unidad original. | Un error extremo cambia la comparación. |
| `L6-S07` | RMSE | Sacar raíz al MSE | “Ahora sí háblame otra vez en pedidos.” | “Saco la raíz al final.” | RMSE vuelve a la unidad del resultado. | Conserva sensibilidad cuadrática. | Otra escala evita confundir pedidos². |
| `L6-S08` | R² | Comparar contra el promedio | “Si no mejora esa cuenta sencilla, dime.” | “Comparo ambos errores.” | R² usa una línea base explícita. | No es porcentaje de aciertos. | Otro test produce R² negativo. |
| `L6-S09` | TP | Resaltar aciertos de alerta | “Hubo carga y sí nos preparamos.” | “Marco la celda y su conteo.” | TP combina realidad alta y alerta. | Es un acierto bajo una clase congelada. | Otra noche cambia de celda por la realidad. |
| `L6-S10` | TN | Resaltar aciertos de no alerta | “No hizo falta preparar de más.” | “Conservo las noches normales.” | TN combina realidad normal y no alerta. | Evita intervención innecesaria. | Otro conjunto cambia el denominador. |
| `L6-S11` | FP | Convertir falsa alerta en merma | “Nos preparamos de más y sobró.” | “Uso el costo por kilo acordado.” | FP es alerta con demanda normal. | El costo usa merma extra × 110 MXN/kg. | Otra merma recalcula el costo. |
| `L6-S12` | FN | Convertir omisión en faltantes | “Llegó la carga y nos faltó preparación.” | “Uso margen documentado.” | FN es demanda alta sin alerta. | El costo usa pedidos no atendidos × 22 MXN. | Otra omisión cambia pedidos perdidos. |
| `L6-S13` | precision | Usar todas las alertas como denominador | “De lo que avisó, ¿cuánto sí pasó?” | “Uso TP más FP.” | Precision evalúa confiabilidad de alertas. | No mide cobertura de noches altas. | Otra prevalencia cambia precision. |
| `L6-S14` | recall | Usar noches altas como denominador | “¿Cuántas vimos venir?” | “Uso TP más FN.” | Recall evalúa cobertura positiva. | Cambia al mover el umbral. | Otro costo prioriza recall. |
| `L6-S15` | specificity | Usar noches normales como denominador | “¿Cuántas tranquilas dejamos tranquilas?” | “Uso TN más FP.” | Specificity evalúa reconocimiento negativo. | No sustituye recall. | Otro escenario prioriza evitar merma. |
| `L6-S16` | F1 | Combinar precision y recall | “No me tapes un lado con el otro.” | “La media armónica baja si uno falla.” | F1 equilibra dos métricas. | No incorpora pesos monetarios. | Otra regla empata F1 con costos distintos. |
| `L6-S17` | ROC | Recorrer TPR y FPR | “Muéstrame qué ganamos y qué falsas alarmas salen.” | “Cada punto usa el mismo conjunto.” | ROC recorre umbrales en tasas. | Puede ocultar baja precision en clases raras. | Otra prevalencia conserva ROC y cambia PR. |
| `L6-S18` | PR | Recorrer precision y recall | “Mira también cuántos avisos fallan.” | “Conservo la prevalencia.” | PR muestra el compromiso positivo. | Es informativa cuando la clase positiva es escasa. | Otro corte cambia ambos ejes. |
| `L6-S19` | threshold | Minimizar costo en validation | “No elijas por bonito.” | “Congelo el mínimo antes del test.” | El umbral conecta score y costo. | Se elige en validation, no en test. | Otra razón de costos elige otro corte. |
| `L6-S20` | calibration | Comparar score y frecuencia | “Si dice siete, revisa cuántas pasan.” | “Agrupo sin prometer una noche.” | Calibración compara probabilidad y frecuencia. | No garantiza casos individuales. | Otra banda queda sobreconfiada. |
| `L6-S21` | bias | Ver error sistemático | “Siempre se queda corta en esas noches.” | “Busco el patrón.” | Bias alto refleja supuestos restrictivos. | No autoriza agregar cualquier variable. | Otro modelo falla por curvatura. |
| `L6-S22` | variance | Comparar ajustes entre folds | “¿Se mueve poquito o se desarma?” | “Repito el mismo procedimiento.” | Variance mide sensibilidad a la muestra. | No es variación de cada pedido. | Otro fold mueve el ajuste. |
| `L6-S23` | overfitting | Ver brecha train-validation | “En su montón queda perfecto, afuera no.” | “Eso parece memoria.” | Overfitting no se sostiene fuera de train. | Test no elige el punto de parada. | Otro modelo complejo amplía la brecha. |
| `L6-S24` | regularization | Elegir penalización en validation | “Aprieta la regla, pero no hasta dejarla inútil.” | “Guardo la fuerza elegida.” | Regularización limita complejidad. | Su fuerza se congela antes de test. | Otra penalización cambia bias y variance. |

## Deltas y cierre

- **`continuityDelta`:** Don Juan incorpora costos explícitos; Paco aprende a separar selección y evaluación.
- **`dataStateDelta`:** `L5.6 → L6.1 → L6.2 → L6.3 → L6.4 → L6.5 → L6.6`.
- **`growthDelta`:** ninguno; `G4-kiosco` permanece congelado.
- **Cierre:** **“¿Hay patrones que no etiquetamos?”**

