# Paquete: Preparación básica

## Trazabilidad

- **Currículo:** `docs/CURRICULUM_MAP.md`, Nivel 1.
- **Historia aprobada:** `docs/stories/LEVEL_1.md`, escenas `L1-S15` a `L1-S18`.
- **Estado narrativo:** `reporte_de_calidad@L1.3` → `pedidos_preparados@L1.4`.
- **Competencia auxiliar:** skill como contrato verificable.

## ConceptSpec

- **Objetivo:** diferenciar filtrar, ordenar, agrupar y transformar, explicando
  qué cambia y qué se conserva.
- **Prerrequisitos:** tabla, observación, variable, tipo y reporte de calidad.
- **Conceptos en orden:** filtrar, ordenar, agrupar y transformar.
- **VisualSpec:** retirar filas de una vista; moverlas por cantidad; colapsarlas
  por `tipo_taco`; crear `es_pedido_grande` sin sobrescribir `num_tacos`.
- **Error central:** confundir selección, posición, resumen y representación.
- **Criterio de dominio:** elegir una operación, anticipar su salida y declarar límites.

## LearningModule

Paco conserva `pedidos_crudos_nivel_1.csv` y trabaja sobre una copia.

1. **Filtrar:** quedan 7 pedidos válidos completos de 9 únicos.
2. **Ordenar:** P-007 sube por cantidad, no porque haya ocurrido primero.
3. **Agrupar:** la suma de tacos por tipo se distingue del conteo de pedidos.
4. **Transformar:** `es_pedido_grande = num_tacos >= 10` conserva cantidad y regla.

Don Juan solo exige que los conteos puedan comprobarse y que el original no se
destruya. El narrador introduce los nombres y conclusiones técnicas en subtítulos.

## PracticeExercise

**Regla de separación:** antes de otro turno, Paco recibe una nueva tarea de
preparación; no vuelve a limpiar el incidente mostrado en Aprender.

**Evidencia:** contador antes/después, desplazamiento de filas, resumen declarado
y columna derivada con regla visible.

**Decisión:** seleccionar la operación correcta y reconocer qué conclusión aún
no está respaldada por dos noches.

**Feedback:** distingue subconjunto, posición, nivel de detalle y variable derivada.

### Skill `preparar_pedidos_n1`

- **Entrada:** copia de pedidos crudos, esquema y reporte de calidad.
- **Pasos:** normalizar, validar, contrastar IDs, conservar faltantes, marcar inválidos y transformar.
- **Salida:** 9 pedidos únicos con estado y `es_pedido_grande`.
- **Comprobaciones:** 7 válidos completos, 1 faltante, 1 inválido; P-007=30 permanece.
- **Límites:** no inventar, borrar sin fuente, registrar atributos innecesarios ni generalizar desde dos noches.

## LiveTeachingPack

- **Visibilidad:** visible temporalmente en Nivel 1 para revisión docente.
- **Duración:** 65 minutos.
- **Dataset real:** Bike Sharing Dataset · UCI, 731 filas y 16 columnas.
- **Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset
- **Licencia:** CC BY 4.0.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Evaluación rápida:** describir una cadena de preparación y una limitación.
- **Plan offline:** reorganizar tarjetas de pedidos y anotar conteos.

## Cierre

El puesto no crece. El nivel termina con datos trazables, no con una conclusión
sobre el negocio: “Ya están limpios, pero ¿qué nos dicen realmente estos pedidos?”.
