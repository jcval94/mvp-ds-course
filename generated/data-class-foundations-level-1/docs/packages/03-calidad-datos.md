# Paquete: Calidad de datos

## Trazabilidad

- **Currículo:** `docs/CURRICULUM_MAP.md`, Nivel 1.
- **Historia aprobada:** `docs/stories/LEVEL_1.md`, escenas `L1-S11` a `L1-S14`.
- **Estado narrativo:** `esquema@L1.2` → `reporte_de_calidad@L1.3`.
- **Crecimiento del puesto:** ninguno.

## ConceptSpec

- **Objetivo:** detectar problemas antes de analizar sin corregir por intuición.
- **Prerrequisitos:** observación, variable y tipo.
- **Conceptos en orden:** faltantes, duplicados, rangos inválidos y sesgo de medición.
- **Evidencia canónica:** P-003 faltante; P-006 duplicado confirmado con ticket;
  P-005 mezcla el total diario; P-007 conserva 30 tacos confirmados.
- **VisualSpec:** escaneo de la tabla, contraste con ticket y brecha de cobertura después de las 22:00.
- **Error central:** considerar que raro significa falso.
- **Criterio de dominio:** elegir entre conservar, marcar, contrastar o consolidar según evidencia.

## LearningModule

Don Juan aporta tickets y memoria operativa. El narrador clasifica técnicamente:

1. P-003 queda vacío; no se convierte en cero ni `-`.
2. P-006 solo se consolida después de encontrar un único ticket 184.
3. P-005 se marca inválido sin corregir 500 a 50; P-007=30 se conserva.
4. El horario de Paco revela una posible omisión sistemática del cierre.

No se añaden edad, género, ropa ni nombres. Tampoco se registra la dieta de
Rogelio: su pedido no permite inferirla y no ayuda a la pregunta.

## PracticeExercise

**Regla de separación:** las prácticas presentan tickets borrosos, capturas
parecidas con IDs distintos, comparación entre P-005 y Rogelio, y cobertura de
un primer turno; no repiten la resolución de Aprender.

**Presión:** borrar para terminar rápido puede destruir evidencia válida.

**Evidencia:** cada animación muestra ausencia, identidad, regla de unidad o
periodo no observado antes de habilitar respuestas.

**Decisión:** documentar la primera acción conservadora y su fuente.

**Feedback:** explica por qué cero no es ausencia, igualdad no prueba duplicado,
un valor grande necesita contexto y más filas no corrigen una omisión sistemática.

## LiveTeachingPack

- **Visibilidad:** visible temporalmente en Nivel 1 para revisión docente.
- **Duración:** 70 minutos.
- **Dataset real:** Wine Quality · UCI, 6,497 filas y 13 columnas.
- **Fuente:** https://archive.ics.uci.edu/dataset/186/wine+quality
- **Licencia:** CC BY 4.0.
- **Fecha del snapshot:** 2026-06-14.
- **SHA-256:** `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Evaluación rápida:** clasificar un hallazgo y proponer una acción conservadora.
- **Plan offline:** tabla impresa, tickets de contraste y reglas visibles.

## Supuestos y límites

- El reporte conserva 10 filas crudas, 9 IDs únicos, un faltante, un inválido,
  un duplicado confirmado y un caso raro válido.
- La cobertura didáctica no autoriza conclusiones sobre demanda habitual.
