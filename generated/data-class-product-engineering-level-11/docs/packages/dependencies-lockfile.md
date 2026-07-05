# Paquete: Dependencias y lockfile

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_11.md`; escena `L11-S13`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 11, Empaquetado y entornos.
- **Objetivo:** Aplicar dependencias y lockfile y justificar una decisión con evidencia verificable.
- **Definición:** Un entorno aísla dependencias; un lockfile fija una resolución reproducible.
- **Intuición:** El visual separa los estados de resolución flotante que se fija y reconstruye para que el cambio pueda auditarse antes de decidir.
- **Error plausible:** Dar por válido dependencias y lockfile sin reconciliar las marcas visibles, la unidad y el límite del procedimiento.
- **Mecanismo visual:** resolución flotante que se fija y reconstruye.
- **Estados:** Entrada y contrato → Mecanismo revelado → Resultado verificado.
- **Unidad:** un caso de aceptación, ejecución o fallo del producto.
- **Variables:** paquete, version, lock, hash.
- **Límite:** La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.

## LearningModule

1. Reconstruir entorno desde versiones fijadas
2. Ejecutar **Recorrer y verificar dependencias y lockfile**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa dependencias, versiones y lock y cita una marca visible. ¿Qué decisión sobre dependencias y lockfile está respaldada por las tres etapas?
- **Transferencia:** Observa dependencias, versiones y lock y cita una marca visible. ¿Qué debe volver a comprobarse al transferir dependencias y lockfile a otro caso?
- **Bloqueo:** 2 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Dependencias y lockfile con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Dependencias y lockfile; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Dependencias y lockfile; detecta conclusiones que excedan el diseño.
