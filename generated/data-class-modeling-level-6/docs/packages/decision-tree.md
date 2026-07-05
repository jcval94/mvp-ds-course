# Paquete: Árbol de decisión

## Supuestos

- Audiencia adulta principiante; español mexicano cálido.
- Historia aprobada: `docs/stories/LEVEL_6.md`; escena `L6-S13`.
- Aprender y Ejercitar usan datos sintéticos narrativos; En vivo usa `Wine Quality · UCI`.
- El narrador se renderiza como subtítulo y Don Juan conserva la decisión del negocio.

## ConceptSpec

- **Nivel/bloque:** 6, Modelos interpretables.
- **Objetivo:** Recorrer divisiones binarias reproducibles.
- **Definición:** Un árbol divide el espacio mediante preguntas sucesivas.
- **Intuición:** El visual revela rutas binarias hasta hojas y conserva cada noche observada.
- **Error plausible:** Presentar ajuste en muestra como desempeño futuro, causalidad o decisión automática.
- **Mecanismo visual:** rutas binarias hasta hojas.
- **Estados:** Entrada documentada → Resultado reproducible.
- **Unidad:** una observación es una noche del puesto.
- **Variables:** encargo, partido e inventario.
- **Límite:** Ajuste descriptivo dentro de 64 noches; train/test, métricas y generalización pertenecen a Nivel 7.

## LearningModule

1. Se recorren preguntas sobre encargo y partido.
2. Ejecutar **Revelar árbol de decisión**.
3. Cita una marca visible, responde la pregunta de Don Juan y nombra un límite.

## PracticeExercise

- **Guiado:** Observa nodos y hojas y cita una marca visible. ¿Qué conclusión guiada sobre árbol de decisión respeta el momento de decisión?
- **Transferencia:** Observa nodos y hojas y cita una marca visible. ¿Qué debe cambiar al transferir árbol de decisión a otra decisión?
- **Bloqueo:** 1 cambios y todas las marcas requeridas.
- **Separación:** Aprender revela el mecanismo; los dos ejercicios usan incidentes y evidencia nuevos.

## LiveTeachingPack

- **Visibilidad:** `teacher-only-static`.
- **Fuente/licencia:** https://archive.ics.uci.edu/dataset/186/wine+quality · CC BY 4.0.
- **Fecha/hash:** 2026-06-14 · `7493fdea860730843deab246f51e180382fd7d26a24614ef5e63e39e3a26fe3d`.
- **Plan offline:** Usar HTML, snapshot y tarjetas impresas; no requiere red ni IA.

## Prompts

- **Codex:** Verifica una demo reproducible de Árbol de decisión con el snapshot público, cálculo y aserciones; no inventes filas ni causalidad.
- **Gemini:** Facilita preguntas socráticas sobre Árbol de decisión; exige predicción, evidencia y límite.
- **ChatGPT:** Revisa precisión y pedagogía de Árbol de decisión; detecta conclusiones que excedan el diseño.
