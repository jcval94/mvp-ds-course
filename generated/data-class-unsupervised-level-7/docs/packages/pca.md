# Paquete: PCA

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_7.md`; escena `L7-S05`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Palmer Penguins`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 7, Reducción dimensional.
- **Objetivo:** Proyectar estructura en menos dimensiones.
- **Definición:** PCA crea componentes ortogonales que capturan varianza sucesiva.
- **Intuición:** El visual hace visible proyección de cinco variables a dos ejes antes de resumirlo.
- **Error plausible:** Convertir una salida exploratoria o una métrica aislada en una decisión automática.
- **Mecanismo visual:** proyección de cinco variables a dos ejes.
- **Estados:** Antes de decidir → Evidencia revisada.
- **Unidad:** una observación es una noche operativa, nunca una persona.
- **Variables:** variables_estandarizadas, pc1, pc2.
- **Límite:** Clusters y anomalías son hipótesis para revisión humana; no prueban tipos naturales, fraude ni causalidad.

## LearningModule

1. Paco necesita mostrar cinco cuentas sin cinco pantallas.
2. Ejecutar **Comparar estados de pca**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa noches proyectadas y cita una marca visible. ¿Qué conclusión guiada sobre pca conserva el alcance?
- **Transferencia:** Observa noches proyectadas y cita una marca visible. ¿Qué exige transferir pca a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://allisonhorst.github.io/palmerpenguins/ · CC0-1.0.
- **Fecha/hash:** 2026-06-14 · `f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de PCA con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre PCA; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de PCA; detecta conclusiones que excedan el diseño.
