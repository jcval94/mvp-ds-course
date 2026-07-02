# Paquete: Alfabetización de datos

## Trazabilidad

- **Currículo:** `docs/CURRICULUM_MAP.md`, Nivel 1.
- **Historia aprobada:** `docs/stories/LEVEL_1.md`, escenas `L1-S01` a `L1-S05`.
- **Estado narrativo:** notas de papel → `pedidos_crudos@L1.1`.
- **Crecimiento del puesto:** ninguno.

## ConceptSpec

- **Objetivo:** identificar qué representan filas, columnas y celdas, y
  distinguir población de muestra.
- **Prerrequisitos:** lectura básica de una cuadrícula.
- **Conceptos en orden:** observación, variable, tabla, población y muestra.
- **Unidad de análisis:** un pedido.
- **Variables visibles:** `pedido_id`, `fecha_hora`, `tipo_taco`, `num_tacos` y `para_llevar`.
- **VisualSpec:** iluminar pedido completo; recorrer columnas; conectar celda con
  fila y encabezado; encerrar la población definida; atenuar páginas dañadas.
- **Error central:** confundir lo disponible con el conjunto completo de interés.
- **Criterio de dominio:** delimitar unidad, variable, población y muestra en un incidente nuevo.

## LearningModule

Aprender sigue la libreta del puesto:

1. Don Juan pide un renglón por ticket; el narrador introduce **observación**.
2. Don Juan diferencia lo que necesita para tortillas y carne; el narrador introduce **variable**.
3. Una cantidad aislada se conecta con fila y encabezado; el narrador define **tabla**.
4. La pregunta de dos noches delimita la **población**.
5. El yogurt daña sobre todo las últimas páginas; el narrador define **muestra** y su posible sesgo.

Las definiciones y conclusiones se muestran en la banda de subtítulos. Don Juan
solo expresa necesidades del puesto y Paco responde como hijo y estudiante.

## PracticeExercise

**Regla de separación:** no se repite el yogurt. Paco recibe una foto con tickets
del primer turno y debe decidir si permite hablar de toda la noche.

**Protagonista:** Paco, hijo de Don Juan y estudiante de preparatoria.

**Presión:** si mezcla tickets o generaliza desde el primer turno, Don Juan puede
preparar insumos para una parte distinta del negocio.

**Evidencia:** la animación revela fila completa, columna, contexto de celda,
conjunto objetivo y tickets ausentes del cierre.

**Decisión:** explicar qué representa una fila y qué población no está cubierta.

**Feedback:** cada distractor corrige una confusión entre celda, observación,
variable, población y muestra; no se acepta una respuesta sin señalar el visual.

## LiveTeachingPack

- **Visibilidad:** visible temporalmente en Nivel 1 para revisión docente; no es autenticación.
- **Duración:** 75 minutos.
- **Dataset real:** Palmer Penguins, 344 filas y 8 columnas.
- **Fuente:** https://allisonhorst.github.io/palmerpenguins/
- **Licencia:** CC0-1.0.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Evaluación rápida:** identificar unidad, variable, población y muestra sin afirmar más de lo observado.
- **Plan offline:** usar cinco filas impresas y fichas para representar población y muestra.

## Supuestos y límites

- Los pedidos narrativos son sintéticos y no contienen atributos personales.
- Las diez filas posteriores son una captura didáctica finita, no toda la operación habitual.
- Guardar una hoja digital facilita copias y versiones, pero no garantiza integridad ni respaldo.
