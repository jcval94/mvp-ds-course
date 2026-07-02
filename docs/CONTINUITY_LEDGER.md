# Continuity Ledger: Don Juan y Paco

## Versión

- **Ledger:** `L2.4-v1`.
- **Último episodio aprobado:** `L2-E4`.
- **Story Bible:** `don-juan-paco-course-v2`.
- **Arco:** `don-juan-paco-level-2-v1`.
- **Momento narrativo:** cierre de 16 noches observadas entre el 4 y el 28 de junio de 2026, con resúmenes, distribuciones, comparaciones y auditoría de casos atípicos.

## Hechos canónicos

1. Don Juan es papá de Paco y Beto, esposo de Lupita y dueño del puesto.
2. Paco cursa segundo de preparatoria, estudia datos con la profesora Elena e IA
   con el profesor Iván, y ayuda jueves, viernes y sábado después de hacer la tarea.
3. Don Juan posee únicamente conocimiento del negocio. Nunca introduce ni concluye
   conceptos de ciencia de datos; expresa consecuencias prácticas con lenguaje simple.
4. El narrador introduce todos los términos y formula todas las conclusiones de ciencia de datos.
5. Lupita protege el horario escolar y participa en decisiones familiares; no es
   parte automática de la plantilla. Beto visita el puesto, pero no trabaja en él.
6. El puesto inicia bajo un toldo de 3 × 2 metros, con 8 asientos, un trompo, un
   comal, venta directa y 25–40 pedidos habituales por noche.
7. El puesto no crece durante Nivel 1.
8. El yogurt dañó notas en papel; las páginas rescatadas forman una muestra
   posiblemente sesgada. Los valores dañados no se reconstruyeron.
9. El dataset canónico procede de dos noches nuevas de captura didáctica.
10. La unidad de análisis canónica de Nivel 1 es un pedido.
11. El dataset no contiene nombres, edad, género, dieta, ropa ni atributos inferidos.
12. `P-006` fue confirmado como registro duplicado mediante el ticket 184.
13. `P-007` contiene 30 tacos y fue confirmado como pedido válido del señor Rogelio.
14. `P-005=500` es una captura inválida pendiente de una fuente; no se sustituye por una conjetura.
15. Un archivo digital puede borrarse o dañarse y un agente necesita contexto,
    comprobaciones y límites explícitos.

## Estado incremental de personajes

| Personaje | Rol y relación | Conocimiento disponible al cierre de Nivel 1 | No puede hacer | Cambio aprobado |
| --- | --- | --- | --- | --- |
| Don Juan | Papá de Paco; dueño y experto del negocio | Operación, tickets, capacidad, clientes, insumos y consecuencias | Nombrar, definir o concluir ciencia de datos | Pide que cualquier recomendación termine en una acción concreta del puesto |
| Paco | Hijo mayor; estudiante y ayudante parcial | Conceptos de Nivel 1 introducidos por el narrador; uso básico de hoja e IA | Decidir por el negocio, usar conceptos futuros o aceptar una salida sin comprobar | Conecta tareas escolares con un procedimiento reproducible |
| Narrador | Voz externa al mundo | Autoridad técnica según el currículo | Tomar decisiones familiares o del negocio | Separa evidencia, inferencia y decisión en cada episodio |
| Lupita | Mamá, esposa y trabajadora independiente | Horarios, presupuesto familiar y carga de trabajo | Ser mediadora o empleada automática; introducir datos | Establece que la escuela de Paco y el reparto justo del trabajo son restricciones |
| Beto | Hermano menor; no trabajador | Puede reconocer explicaciones simples | Acceder a datos, dinero o equipo; resolver conceptos | Funciona como prueba de lenguaje claro |
| Profesora Elena | Docente de datos | Contenido curricular y pedagogía | Decidir por el puesto o sustituir al narrador | Asigna observación, contraejemplos y revisión de evidencia |
| Profesor Iván | Docente de IA | Contexto, instrucciones, verificación y privacidad | Dictar conclusiones del negocio o sustituir al narrador | Asigna esquemas y procedimientos comprobables |
| Señor Rogelio | Cliente y encargado de cuadrilla | Sus propios pedidos y necesidades | Enseñar datos o convertirse en etiqueta del dataset | Confirma que un pedido raro puede ser válido |

## Estado de secretos narrativos

Este bloque es solo para autoría. Ningún secreto puede inferirse de datos ni
aparecer antes de su ventana de revelación.

| Personaje | Característica oculta | Estado al cierre de Nivel 1 | Ventana mínima | Uso permitido |
| --- | --- | --- | --- | --- |
| Don Juan | Ahorra una moneda de cada semana buena para comprar otro comal | No revelada | Nivel 4 | Financiar crecimiento sin deuda mágica |
| Paco | Quiere usar el proyecto para solicitar una beca | No revelada | Nivel 5 | Tensión entre proyecto escolar, familia y futuro |
| Lupita | Diseña un menú de postres dominicales | No revelada | Nivel 3 | Mostrar que una expansión también cambia la carga de trabajo |
| Beto | Crea stop-motion de tacos con plastilina | Revelada en `L2-E2`; no pública ni laboral | Nivel 2 | Probar comunicación visual con supervisión |
| Profesora Elena | Creció ayudando en un puesto de frutas del tianguis | No revelada | Nivel 3 | Explicar su sensibilidad hacia pequeños negocios |
| Profesor Iván | Inserta errores plausibles en demos para enseñar verificación | No revelada | Nivel 3 | Convertir desconfianza puntual en método de evaluación |
| Señor Rogelio | Está a dieta, ama los tacos y no quiere ser reconocido al comprar para sí mismo | No revelada | Nivel 9 | Privacidad; nunca burla, diagnóstico ni atributo del dataset |

## Estado del crecimiento

| Campo | Estado `G1` al cierre de Nivel 1 |
| --- | --- |
| Formato | Toldo semifijo de 3 × 2 metros |
| Equipo | Un trompo, un comal, mesa, hielera y tickets de papel |
| Asientos | 8 |
| Horario | Jueves a domingo, 18:00–23:00 |
| Plantilla | Don Juan tiempo completo; Paco parcial tres noches; nadie más |
| Demanda habitual | 25–40 pedidos por noche; picos de 50 |
| Canales | Venta directa |
| Inversión autorizada | Ninguna durante Nivel 1 |
| Condición para siguiente cambio | Resumir demanda y merma sin afectar escuela ni cargar trabajo no acordado a la familia |

## Estado de datos

| Versión | Unidad | Dimensiones | Estado | Transformación | Artefacto y SHA-256 |
| --- | --- | --- | --- | --- | --- |
| `L1.0-notas` | pedido pretendido | parcial | hojas en papel, algunas dañadas | ninguna | artefacto narrativo no publicable |
| `L1.1-pedidos_crudos` | pedido | 10 × 7 | sintético, crudo, con errores didácticos | captura nueva sin corregir | `datasets/narrative/pedidos_crudos_nivel_1.csv` · `beb9df84625b6defc1f4d7dda3dbbc96cae0c7be5a54225ce051d33628689718` |
| `L1.2-esquema` | pedido | 7 variables documentadas | tipos y reglas definidos | documentación, no modifica filas | esquema canónico de este ledger |
| `L1.3-reporte_calidad` | pedido | 10 filas; 9 IDs | 1 faltante, 1 inválido, 1 duplicado confirmado, 1 raro válido | clasificación de hallazgos | `docs/LEVEL_1_NARRATIVE_ARC.md` |
| `L1.4-pedidos_preparados` | pedido | 9 × 9 | 7 válidos completos, 1 faltante, 1 inválido | normalización, consolidación y variable derivada | `datasets/narrative/pedidos_preparados_nivel_1.csv` · `b38fffd6b3fedb3f99ca329ac7168698c08898d3b4ff77fa961fb69eb45ae675` |

## Esquema canónico L1.2

| Variable | Significado | Tipo | Vacío | Regla principal |
| --- | --- | --- | --- | --- |
| `pedido_id` | identificador del ticket | identificador categórico | no | único después de contrastar duplicados |
| `fecha_hora` | momento de captura del pedido | fecha y hora | no | formato ISO local `AAAA-MM-DD HH:MM` |
| `tipo_taco` | producto principal del pedido didáctico | categórica | no | catálogo normalizado en minúsculas |
| `num_tacos` | cantidad de tacos del pedido | numérica discreta | sí | entero positivo; valores altos requieren fuente |
| `nivel_salsa` | intensidad solicitada | ordinal | sí | `sin_salsa`, `poca`, `media`, `mucha` |
| `para_llevar` | modalidad del pedido | booleana | no | `si` o `no` |
| `comentario` | nota operativa libre | texto | sí | no se convierte en perfil personal |

## Estado de Nivel 2

| Campo | Estado canónico `L2.4` |
| --- | --- |
| Periodo | 2026-06-04 a 2026-06-28, 16 noches jueves a domingo |
| Unidad | un pedido |
| Dimensiones | 600 filas × 10 columnas |
| Volumen observado | 30–45 pedidos por noche, cada conteo usado una vez |
| Estado del puesto | `G1`, sin cambio físico, de plantilla, horario ni canal |
| Competencia de agentes | entrada, parámetro, operación, salida, comprobaciones y límites |
| Casos de auditoría | `P-005=500`, `P-007=30`, `L2-X001=360`, `L2-A001=36` |
| Revelación | stop-motion de Beto, bajo supervisión, sin acceso a datos ni trabajo |

## Estado incremental de datos de Nivel 2

| Versión | Unidad | Dimensiones | Transformación | Artefacto |
| --- | --- | --- | --- | --- |
| `pedidos_4_semanas@L2.1` | pedido | 600 × 10 | generación determinística, sin atributos personales | `datasets/narrative/pedidos_4_semanas_nivel_2.csv` |
| `resumen@L2.2` | pedido | 600 × 10 + resúmenes derivados | centro, dispersión y percentiles; no modifica filas | metadata y `curriculum.js` |
| `distribuciones@L2.3` | pedido | 600 × 10 + estados visuales | histogramas, densidad y parámetros versionados | `curriculum.js` |
| `comparaciones_atipicos@L2.4` | pedido | 600 × 10 + auditoría 4 × 7 | comparaciones y revisión trazable | CSV canónico, auditoría y metadata |

Los SHA-256 y la semilla se leen de `datasets/narrative/pedidos_nivel_2.metadata.json`; el generador es la fuente de verdad para evitar divergencia entre documentación y archivos.

## Hilos abiertos

- Comparar cantidades y patrones sin depender de una impresión: abre Nivel 2.
- Investigar una fuente correcta para `P-005` sin inventar un valor.
- Revisar si dos noches representan otros días: se retoma en muestreo.
- Mantener la escuela de Paco y el reparto familiar como restricciones de cualquier crecimiento.
- Conservar sin revelar todos los secretos excepto el stop-motion de Beto, abierto en Nivel 2.
- Comprobar en Nivel 3 si los patrones observados se repiten o fueron casuales.

## Deltas aprobados

- **`continuityDelta`:** Paco aplica lo aprendido en preparatoria; Don Juan acepta
  el procedimiento únicamente como apoyo a decisiones del puesto; Lupita fija el
  límite escolar y Beto queda fuera de responsabilidades laborales.
- **`dataStateDelta`:** `L1.3` pasa a `L1.4`; se consolida un duplicado confirmado,
  se normalizan categorías y fecha, se conserva el faltante, se marca el inválido
  y se crea `es_pedido_grande`.
- **`growthDelta`:** ninguno; el estado sigue en `G1`.
- **Revisión:** aprobada documentalmente; requiere revisión humana antes de publicación externa.

## Deltas aprobados de Nivel 2

- **`continuityDelta`:** Don Juan pide evidencia antes de cambiar compras y conserva lenguaje simple; Paco documenta parámetros y límites; Beto revela su stop-motion únicamente como apoyo visual.
- **`dataStateDelta`:** `L1.4 → L2.1 → L2.2 → L2.3 → L2.4`; 600 pedidos canónicos y cuatro filas de auditoría separadas.
- **`growthDelta`:** ninguno; el puesto sigue en `G1` y no se atribuye causalmente el volumen observado.
- **Revisión:** historia y arco de Nivel 2 aprobados antes de la implementación.
