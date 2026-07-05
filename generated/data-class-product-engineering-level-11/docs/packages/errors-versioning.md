# Paquete: Errores y versionado

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S11`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, APIs y contratos de servicio.
- **Objetivo:** Aplicar errores y versionado y justificar una decisión con evidencia verificable.
- **Definición:** Los status codes clasifican resultados; versionar protege contratos cuando cambia la interfaz.
- **Intuición:** El visual separa los estados de rutas separadas 2xx, 4xx, 5xx y versiones para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido errores y versionado sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** rutas separadas 2xx, 4xx, 5xx y versiones.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** version, status, causa, response.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Distinguir 2xx, 4xx y 5xx controlado
2. Ejecutar **Recorrer y verificar errores y versionado**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa rutas por status y versión y cita una marca visible. ¿Qué decisión sobre errores y versionado está respaldada por las tres etapas?
- **Transferencia:** Observa rutas por status y versión y cita una marca visible. ¿Qué debe volver a comprobarse al transferir errores y versionado a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Errores y versionado con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Errores y versionado; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Errores y versionado; detecta conclusiones que excedan el diseño.
