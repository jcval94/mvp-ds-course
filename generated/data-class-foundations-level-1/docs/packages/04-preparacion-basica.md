# Paquete: Preparación básica

## ConceptSpec

**Nivel:** 1, Fundamentos.

**Objetivo:** aplicar transformaciones básicas y explicar qué cambia en los datos y en la población descrita.

**Prerrequisitos:** tabla, observación, variable y tipo.

**Conceptos:** filtrar, ordenar, agrupar y transformar.

**VisualSpec:** filas que salen al filtrar, reordenamiento animado, colapso en grupos y cambio explícito de unidades.

**Dataset:** Bike Sharing Dataset, UCI Machine Learning Repository.

**Errores comunes:** generalizar después de filtrar, confundir orden con tiempo, agrupar sin función de resumen y sobrescribir datos originales.

**Criterio de dominio:** el estudiante elige una operación, anticipa el resultado y explica qué información conserva o modifica.

## LearningModule

1. Filtrar pedidos por condición.
2. Ordenar sin cambiar valores.
3. Agrupar por producto y declarar el resumen.
4. Crear una variable en miles conservando el original.

## PracticeExercise

**Historia:** Don José abrió un changarro cerca de oficinas y escuelas. Tiene una tabla diaria de renta de bicicletas de la zona como referencia para estimar movimiento, pero si mira todo junto no sabe si debe abrir antes, preparar más café para días laborales o ajustar el inventario cuando cambia el clima.

**Problema profesional:** convertir una tabla cruda en una vista que responda una decisión operativa sin perder de vista qué filas quedaron fuera, qué orden solo cambió la posición y qué resumen sí modificó el nivel de detalle.

**Tensión:** si filtra demasiado, generaliza con pocos días; si ordena y cree que la primera fila es una tendencia temporal, toma una mala decisión; si agrupa sin declarar la función de resumen, confunde conteos con promedios.

**Decisión:** elegir una cadena de preparación que permita decidir qué días requieren más personal y qué evidencia todavía no alcanza para cambiar el horario.

**Evidencia requerida:** la respuesta se bloquea hasta ejecutar la animación. El estudiante debe comparar el estado inicial con las vistas filtrada, ordenada, agrupada y transformada.

**Escenas animadas:**

1. La tabla inicia con días mezclados, clima, temporada y rentas.
2. El filtro deja solo días laborales con clima despejado y muestra el contador de filas conservadas.
3. El ordenamiento mueve los días con más rentas arriba sin cambiar sus valores.
4. El agrupamiento colapsa filas por temporada y declara si usa promedio o conteo.
5. La transformación crea una variable en miles y conserva la columna original.

**Pistas:**

- Primero identifica si la operación elimina filas, mueve filas, resume filas o cambia la escala de una variable.
- Revisa cuántos días quedaron después del filtro antes de generalizar.
- La primera fila después de ordenar no es "lo que ocurrió primero"; solo es el valor más alto o más bajo según el criterio.

**Feedback esperado:** distingue selección, posición, agregación y transformación. El feedback de error explica qué evidencia visible contradice la respuesta.

**Cierre:** preparar datos no es limpiar por limpiar; es construir una vista trazable para una decisión concreta. Don José puede preparar personal con más confianza si declara la cadena aplicada y sus límites.

## LiveTeachingPack

**Visibilidad:** visible temporalmente en Nivel 1 para revisión docente. Esto no es autenticación ni protección real; solo cambia la interfaz publicada mientras se revisa el material.

**Duración:** 65 minutos.

**Dataset real:** Bike Sharing Dataset · UCI.

**Fuente:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset

**Licencia:** CC BY 4.0.

**Fecha del snapshot:** 2026-06-14.

**Dimensiones:** 731 filas y 16 columnas.

**SHA-256:** `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.

| Minutos | Actividad |
| --- | --- |
| 0-15 | Predicción y filtro |
| 15-30 | Ordenamiento y significado de la primera fila |
| 30-45 | Agrupamiento con suma y conteo |
| 45-55 | Transformación de unidades |
| 55-65 | Cadena de preparación y cierre |

**Codex:** generar operaciones reproducibles y pruebas.

**Gemini:** facilitar comparación antes/después.

**ChatGPT:** crear nuevas reglas de negocio y ejercicios.

**Preguntas socráticas:**

- ¿Qué cambió después del filtro: el valor de las filas o la población descrita?
- ¿Qué operación permite decidir sobre personal por temporada y cuál solo ordena casos extremos?
- ¿Qué conclusión sí permite este snapshot y cuál requeriría datos de ventas reales del changarro?

**Evaluación rápida:** el estudiante describe una cadena de preparación, identifica qué evidencia visual la justifica y nombra una limitación.

**Checklist antes de clase:**

- Abrir el laboratorio y confirmar que las cuatro escenas se animan sin saltos.
- Tener visible fuente, licencia, fecha y SHA-256 del snapshot.
- Preparar una pregunta de transferencia con otro negocio local.

**Checklist durante clase:**

- Pedir predicción antes de cada operación.
- Hacer que un estudiante nombre qué filas o variables cambiaron.
- Separar evidencia del dataset de inferencias sobre el negocio.

**Plan offline:** reorganizar tarjetas de pedidos en una mesa.
