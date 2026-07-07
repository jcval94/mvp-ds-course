# Paquete: Environment engineering

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_12.md`; escena `L12-S18`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 12, Harness y entorno.
- **Objetivo:** Aplicar environment engineering y justificar una decisión con evidencia verificable.
- **Definición:** Environment engineering declara recursos, permisos y límites del entorno de ejecución.
- **Intuición:** El visual separa los estados de entorno como parte de la capacidad real del agente para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Llamar agente a cualquier chatbot o asumir que más autonomía produce un sistema mejor.
- **Mecanismo visual:** entorno como parte de la capacidad real del agente.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un componente, capacidad, estado o evento de traza del sistema de IA educativo.
- **Variables:** filesystem, terminal, sql, browser, git.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. La capacidad real depende de filesystem, terminal, SQL, browser y git disponibles
2. Ejecutar **Recorrer y verificar environment engineering**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa filesystem, terminal, Python, SQL, browser, git y APIs y cita una marca visible. ¿Qué decisión sobre environment engineering está respaldada por las tres etapas?
- **Transferencia:** Observa filesystem, terminal, Python, SQL, browser, git y APIs y cita una marca visible. ¿Qué debe volver a comprobarse al transferir environment engineering a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Environment engineering con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Environment engineering; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Environment engineering; detecta conclusiones que excedan el diseño.
