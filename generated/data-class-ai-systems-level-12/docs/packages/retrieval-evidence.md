# Paquete: Retrieval, reranking y abstención

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S08`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Bike Sharing Dataset · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Contexto y conocimiento.
- **Objetivo:** Aplicar retrieval, reranking y abstención y justificar una decisión con evidencia verificable.
- **Definición:** Retrieval encuentra candidatos; reranking prioriza evidencia y la abstención evita inventar respaldo.
- **Intuición:** El visual separa los estados de búsqueda que separa encontrar evidencia de usarla correctamente para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** búsqueda que separa encontrar evidencia de usarla correctamente.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** consulta, ranking, evidencia, cita, abstención.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. La búsqueda trae tres fragmentos, pero ninguno sostiene la decisión riesgosa
2. Ejecutar **Recorrer y verificar retrieval, reranking y abstención**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa consulta, ranking, evidencia, cita y abstención y cita una marca visible. ¿Qué decisión sobre retrieval, reranking y abstención está respaldada por las tres etapas?
- **Transferencia:** Observa consulta, ranking, evidencia, cita y abstención y cita una marca visible. ¿Qué debe volver a comprobarse al transferir retrieval, reranking y abstención a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `537e98e2c8b8f53e3094d953f847788b1dc224764a4a1e538b3e1ec4e30dac8a`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Retrieval, reranking y abstención con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Retrieval, reranking y abstención; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Retrieval, reranking y abstención; detecta conclusiones que excedan el diseño.
