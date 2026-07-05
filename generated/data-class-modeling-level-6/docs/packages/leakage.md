# Paquete: Leakage

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S18`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Preparación de variables.
- **Objetivo:** Excluir información posterior al momento de decisión.
- **Definición:** Leakage usa información que no existiría cuando debe producirse la decisión.
- **Intuición:** El visual revela auditoría temporal de columnas y conserva cada noche observada.
- **Error plausible:** Presentar ajuste en muestra como desempeño futuro, causalidad o decisión automática.
- **Mecanismo visual:** auditoría temporal de columnas.
- **Estados:** Entrada documentada → Resultado reproducible.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** entradas previas; resultados posteriores bloqueados.
- **Límite:** Ajuste descriptivo dentro de 64 noches; train/test, métricas y generalización pertenecen a Nivel 7.

## LearningModule

1. Se intentan usar espera y merma posteriores.
2. Ejecutar **Revelar leakage**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa corte temporal y disponibilidad y cita una marca visible. ¿Qué conclusión guiada sobre leakage respeta el momento de decisión?
- **Transferencia:** Observa corte temporal y disponibilidad y cita una marca visible. ¿Qué debe cambiar al transferir leakage a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Leakage con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Leakage; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Leakage; detecta conclusiones que excedan el diseño.
