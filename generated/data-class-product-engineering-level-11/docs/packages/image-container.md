# Paquete: Imagen y contenedor

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S14`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Empaquetado y entornos.
- **Objetivo:** Aplicar imagen y contenedor y justificar una decisión con evidencia verificable.
- **Definición:** Un Dockerfile describe una imagen; un contenedor es una ejecución aislada de esa imagen.
- **Intuición:** El visual separa los estados de ciclo Dockerfile, imagen y ejecución de contenedor para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido imagen y contenedor sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** ciclo Dockerfile, imagen y ejecución de contenedor.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** dockerfile, image, container, estado.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Seguir Dockerfile → imagen → contenedor
2. Ejecutar **Recorrer y verificar imagen y contenedor**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa Dockerfile, imagen y contenedor y cita una marca visible. ¿Qué decisión sobre imagen y contenedor está respaldada por las tres etapas?
- **Transferencia:** Observa Dockerfile, imagen y contenedor y cita una marca visible. ¿Qué debe volver a comprobarse al transferir imagen y contenedor a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Imagen y contenedor con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Imagen y contenedor; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Imagen y contenedor; detecta conclusiones que excedan el diseño.
