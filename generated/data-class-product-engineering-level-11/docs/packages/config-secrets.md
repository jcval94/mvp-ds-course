# Paquete: Configuración y secretos

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S06`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Código modular y contratos.
- **Objetivo:** Aplicar configuración y secretos y justificar una decisión con evidencia verificable.
- **Definición:** Configuración cambia entre entornos; un secreto concede acceso y no debe versionarse en código.
- **Intuición:** El visual separa los estados de configuración inyectada y secretos fuera del código y logs para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido configuración y secretos sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** configuración inyectada y secretos fuera del código y logs.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** valor, origen, entorno, exposicion.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Sacar ruta, umbral y clave de ejemplo del código
2. Ejecutar **Recorrer y verificar configuración y secretos**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa configuración, entorno y secreto redactado y cita una marca visible. ¿Qué decisión sobre configuración y secretos está respaldada por las tres etapas?
- **Transferencia:** Observa configuración, entorno y secreto redactado y cita una marca visible. ¿Qué debe volver a comprobarse al transferir configuración y secretos a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Configuración y secretos con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Configuración y secretos; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Configuración y secretos; detecta conclusiones que excedan el diseño.
