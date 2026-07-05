# Paquete: Esquema y claves

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_5.md`; escena `L5-S02`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 5, Arquitectura invisible de los datos.
- **Objetivo:** Aplicar esquema y claves y justificar una decisión con evidencia verificable.
- **Definición:** Un esquema define campos y tipos; las llaves identifican y relacionan entidades o eventos.
- **Intuición:** El visual separa los estados de campos tipados y enlaces PK/FK para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido esquema y claves sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** campos tipados y enlaces PK/FK.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** una unidad analítica declarada antes de transformar.
- **Variables:** campo, tipo, pk, fk.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Marcar tipos, llave primaria, foránea y relaciones
2. Ejecutar **Recorrer y verificar esquema y claves**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa campos tipados y enlaces PK/FK y cita una marca visible. ¿Qué decisión sobre esquema y claves está respaldada por las tres etapas?
- **Transferencia:** Observa campos tipados y enlaces PK/FK y cita una marca visible. ¿Qué debe volver a comprobarse al transferir esquema y claves a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Esquema y claves con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Esquema y claves; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Esquema y claves; detecta conclusiones que excedan el diseño.
