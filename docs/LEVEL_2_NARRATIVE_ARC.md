# Level Narrative Arc: Nivel 2

## Identidad

- **ID:** `don-juan-paco-level-2-v1`.
- **Estado:** aprobado para implementación.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 2.
- **Historia canónica:** `docs/stories/LEVEL_2.md`.
- **Ledger de entrada:** `L1.4-v2`.
- **Conflicto:** Don Juan necesita ajustar compras y turnos sin convertir una sola cifra en toda la historia del puesto.
- **Promesa:** describir 600 pedidos observados durante 16 noches y distinguir centro, forma, comparación y casos que requieren revisión.
- **Competencia auxiliar:** parámetros, entradas, salidas y operaciones compatibles.
- **Estado del puesto:** `G1`; 3 × 2 metros, 8 asientos, un trompo, un comal y la misma plantilla.

## Matriz incremental de dinámica

| Episodio | Don Juan y Paco | Familia e invitados | Narrador | Datos | Crecimiento |
| --- | --- | --- | --- | --- | --- |
| `L2-E1` Resumen | Don Juan pregunta cuánto preparar; Paco propone mirar más de una cifra | Lupita protege el horario escolar | Nombra y limita las medidas de centro, posición y dispersión | `L1.4 → L2.1 → L2.2` | Ninguno |
| `L2-E2` Distribuciones | Don Juan pide ver cuándo se junta el trabajo; Paco prueba parámetros | Beto revela su stop-motion como apoyo visual, bajo supervisión y sin trabajar | Introduce forma, densidad, sesgo, multimodalidad y bins | `L2.2 → L2.3` | Ninguno |
| `L2-E3` Comparaciones | Don Juan contrasta tipos, días y modalidad con lenguaje del puesto | Lupita pregunta quién absorbería cualquier cambio de carga | Distingue qué muestra y qué oculta cada gráfico | `L2.3 → L2.4a` | Ninguno |
| `L2-E4` Casos atípicos | Don Juan aporta tickets; Paco deja de borrar lo raro por reflejo | Rogelio confirma un pedido grande sin exponer su vida privada | Separa señal estadística, influencia, error y rareza válida | `L2.4a → L2.4` | Ninguno |

## Episodios y deltas

### `L2-E1` — Una cifra no alcanza

- **Objetivo:** comparar media, mediana, moda, rango, varianza, desviación estándar y percentiles sobre `num_tacos`.
- **Tensión:** una compra basada solo en el centro puede ignorar pedidos grandes o variación entre pedidos.
- **Decisión:** usar varias medidas compatibles antes de ajustar insumos.
- **`continuityDelta`:** Don Juan empieza a pedir evidencia antes de cambiar compras; Paco aprende a no presentar una cifra aislada.
- **`dataStateDelta`:** se generan `pedidos_4_semanas@L2.1` y `resumen@L2.2` sin alterar las 600 filas.
- **`growthDelta`:** ninguno.

### `L2-E2` — La forma del turno

- **Objetivo:** construir y leer histograma, densidad, forma, sesgo, multimodalidad y sensibilidad a bins.
- **Tensión:** el mismo conjunto parece distinto al cambiar un parámetro; los minutos del turno muestran dos concentraciones de demanda.
- **Decisión:** declarar variable y parámetro antes de interpretar una forma.
- **Revelación:** Beto enseña un stop-motion de plastilina para explicar cómo una imagen cambia por cuadros; el narrador aclara que es una analogía y Beto no accede a datos ni trabaja.
- **`continuityDelta`:** Paco verifica entrada, parámetro y salida; Don Juan traduce la forma a momentos de preparación.
- **`dataStateDelta`:** `resumen@L2.2 → distribuciones@L2.3`.
- **`growthDelta`:** ninguno.

### `L2-E3` — Comparar sin esconder

- **Objetivo:** elegir barras, boxplot, violin plot o ECDF según la pregunta y el tipo de variable.
- **Tensión:** una comparación atractiva puede ocultar conteos, cuartiles, densidades o proporciones acumuladas.
- **Decisión:** elegir la representación cuyo mecanismo responda la pregunta operativa.
- **`continuityDelta`:** Paco justifica la elección visual; Don Juan decide únicamente sobre el puesto.
- **`dataStateDelta`:** `distribuciones@L2.3 → comparaciones_atipicos@L2.4a`.
- **`growthDelta`:** ninguno.

### `L2-E4` — Lo raro pide comprobante

- **Objetivo:** distinguir outlier, leverage, error de captura y caso raro válido.
- **Tensión:** `P-005=500` y `L2-X001=360` mezclan totales con pedidos; `P-007=30` y `L2-A001=36` tienen comprobante operativo.
- **Decisión:** investigar, marcar y conservar trazabilidad; nunca corregir o borrar por apariencia.
- **`continuityDelta`:** Don Juan aporta la fuente del negocio; Paco documenta la revisión sin perfilar al cliente.
- **`dataStateDelta`:** se publica `comparaciones_atipicos@L2.4` y una auditoría separada de cuatro casos.
- **`growthDelta`:** ninguno; observar 30–45 pedidos por noche no prueba que una intervención haya causado el volumen.

## Cierre

Don Juan ajusta una lista de compras de forma reversible, sin ampliar el puesto ni atribuir causas. El narrador cierra: **“¿Esto se repetirá o fue casualidad?”**, pregunta que abre Nivel 3.

## Supuestos

- Los 600 pedidos son sintéticos, determinísticos y no contienen atributos personales.
- Una fila representa un pedido; `minuto_turno` se mide desde las 18:00.
- Aprender y Ejercitar comparten el puesto, pero usan incidentes y evidencia distintos.
- En vivo conserva snapshots públicos reales como fuente principal.
