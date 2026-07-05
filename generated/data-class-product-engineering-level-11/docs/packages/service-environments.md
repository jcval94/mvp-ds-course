# Paquete: Servicio y configuración por entorno

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S19`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Despliegue y operabilidad mínima.
- **Objetivo:** Aplicar servicio y configuración por entorno y justificar una decisión con evidencia verificable.
- **Definición:** Un servicio ejecuta un artifact con configuración de entorno y una interfaz estable.
- **Intuición:** El visual separa los estados de promoción del mismo artifact entre entornos para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido servicio y configuración por entorno sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** promoción del mismo artifact entre entornos.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** artifact, entorno, config, version.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Promover el mismo artifact con configuración distinta
2. Ejecutar **Recorrer y verificar servicio y configuración por entorno**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa mismo artifact entre entornos y cita una marca visible. ¿Qué decisión sobre servicio y configuración por entorno está respaldada por las tres etapas?
- **Transferencia:** Observa mismo artifact entre entornos y cita una marca visible. ¿Qué debe volver a comprobarse al transferir servicio y configuración por entorno a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Servicio y configuración por entorno con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Servicio y configuración por entorno; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Servicio y configuración por entorno; detecta conclusiones que excedan el diseño.
