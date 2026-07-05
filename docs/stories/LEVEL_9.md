# Historia Nivel 9: El calendario y la prueba justa

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-9-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 9.
- **Arco:** `docs/LEVEL_9_NARRATIVE_ARC.md`.
- **Entrada/salida:** `L8.3 / G5-servicios → L9.4 / G6-prepedido`.

El narrador concentra términos y conclusiones. Don Juan habla de horarios, fila, cupo y consecuencias. Paco ejecuta procedimientos como hijo y estudiante. Nora coordina entregas como ayudante pagada. Aprender y Ejercitar usan cortes, noches y decisiones diferentes.

## Temario y escenas aprobadas

| Escena | Concepto | Aprender | Don Juan | Paco | Subtítulo inicial | Subtítulo de evidencia | Ejercitar distinto |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L9-S01` | tendencia | Ordenar 100 noches y suavizar cambios | “Quiero ver si de veras va subiendo, no solo dos noches buenas.” | “Conservo cada fecha y una línea suave.” | Una tendencia resume cambio de largo plazo. | La tendencia describe el periodo y no explica su causa. | Otro corte cambia la pendiente visible. |
| `L9-S02` | estacionalidad | Alinear ciclos por día de semana | “Los miércoles no se parecen a los sábados.” | “Comparo la misma posición del ciclo.” | La estacionalidad es un patrón que se repite en periodos regulares. | Un ciclo observado no garantiza repetición futura. | Otro periodo compara semanas festivas. |
| `L9-S03` | rezago | Relacionar una noche con la anterior | “Lo de ayer puede dejar trabajo para hoy.” | “Desplazo la serie sin mezclar fechas.” | Un rezago vincula un valor con otro anterior. | Asociación con un rezago no demuestra causalidad. | Otro rezago usa siete noches. |
| `L9-S04` | anomalía temporal | Marcar una noche de mantenimiento | “Esa noche tuvo una razón concreta.” | “La anoto; no la convierto en temporada.” | Una anomalía temporal es una desviación localizada respecto del patrón esperado. | Un evento documentado no debe confundirse con tendencia o estacionalidad. | Otra noche rara requiere bitácora. |
| `L9-S05` | ventanas | Mover una ventana de entrenamiento | “La regla solo puede mirar lo que ya pasó.” | “El borde avanza con el calendario.” | Una ventana temporal define qué pasado está disponible en cada corte. | Ventanas deslizantes y expansivas responden preguntas distintas. | Otra amplitud cambia el historial usado. |
| `L9-S06` | backtesting | Simular cuatro decisiones pasadas | “Pruébala como si estuviéramos en ese día.” | “Entreno atrás y evalúo adelante.” | Backtesting repite evaluación respetando el orden temporal. | Cada fold usa pasado para predecir un futuro posterior. | Otro horizonte cambia errores. |
| `L9-S07` | leakage temporal | Bloquear columnas y filas futuras | “Si todavía no había pasado, no lo uses.” | “Marco el corte de disponibilidad.” | Leakage temporal introduce información posterior al momento de decisión. | Una agregación futura contamina aunque la columna parezca histórica. | Otra media móvil incluye por accidente el día objetivo. |
| `L9-S08` | asignación aleatoria | Balancear 400 prepedidos entre A y B | “Que el mensaje no se elija por el tipo de pedido.” | “La asignación sale antes del resultado.” | La asignación aleatoria equilibra explicaciones alternativas en expectativa. | A y B contienen 200 asignaciones y la regla queda registrada. | Otro bloque detecta asignación por conveniencia. |
| `L9-S09` | métrica | Congelar finalización como primaria | “Primero dime qué cuenta como funcionar.” | “Escribo numerador y denominador antes de abrir resultados.” | Una métrica primaria se define antes de observar el efecto. | Cambiarla después aumenta el riesgo de contar una historia conveniente. | Otra métrica mide valor, no finalización. |
| `L9-S10` | tamaño de muestra | Fijar 400 asignaciones y efecto mínimo | “No pares cuando salga bonito.” | “El tamaño se decide antes del resultado.” | El tamaño depende de ruido, efecto mínimo y error tolerado. | Detener temprano por una diferencia favorable sesga la estimación. | Otro efecto mínimo exige más casos. |
| `L9-S11` | efecto | Comparar tasas B menos A con intervalo | “Dime cuánto cambió y con qué margen.” | “Reporto diferencia e incertidumbre.” | El efecto es una comparación entre resultados potenciales estimada por diseño. | La diferencia aleatorizada se limita al mensaje, población y periodo del piloto. | Otro resultado cambia signo. |
| `L9-S12` | guardrails | Revisar espera y cancelaciones | “No quiero más pedidos si la fila se rompe.” | “La métrica principal no borra los daños.” | Un guardrail protege resultados que no deben deteriorarse. | Un efecto favorable no se despliega si incumple capacidad o seguridad. | Otro guardrail detecta sobrecarga. |
| `L9-S13` | múltiples pruebas | Contar comparaciones y ajustar criterio | “Si preguntas veinte cosas, alguna sale por suerte.” | “Registro la familia antes de probar.” | Probar muchas hipótesis aumenta falsos positivos esperados. | Ajustar o jerarquizar pruebas evita seleccionar solo resultados favorables. | Otra familia separa exploratorio y confirmatorio. |
| `L9-S14` | efecto práctico | Comparar efecto con mínimo útil | “Aunque sea distinto, ¿alcanza para cambiar el turno?” | “Lo comparo con el umbral acordado.” | Significancia estadística y relevancia práctica responden preguntas distintas. | El despliegue exige efecto útil y guardrails cumplidos, no solo un p-value. | Otro costo eleva el mínimo útil. |

## Nora, crecimiento y cierre

Nora Salas entra pagada durante `L9-E3` para coordinar cupos, fila y entrega. Habla de operación y nunca interpreta pruebas. Tras 400 asignaciones y guardrails aprobados, Don Juan abre miércoles a domingo, aumenta a 16 asientos y mantiene un cupo explícito de prepedidos. Paco documenta sin ampliar sus horas escolares.

- **`continuityDelta`:** Nora se integra pagada; Paco conserva límites escolares.
- **`dataStateDelta`:** `L8.3 → L9.1 → L9.2 → L9.3 → L9.4`.
- **`growthDelta`:** `G5-servicios → G6-prepedido`, condicionado a capacidad y guardrails.
- **Cierre:** **“¿Quién podría resultar afectado?”**

