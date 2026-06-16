# Level 2 Quality Checklist

## Cobertura

- [x] Existen cinco HTML.
- [x] Se cubren 21 conceptos de Nivel 2.
- [x] Cada concepto tiene dos ejercicios y tres prompts.
- [x] Los tres datasets son snapshots públicos con licencia y hash.

## Pedagogía

- [x] Cada visual representa el mecanismo central.
- [x] Las 21 interacciones producen un cambio de estado comprobado en navegador.
- [x] Los 42 ejercicios requieren observar la evidencia.
- [x] Las opciones permanecen bloqueadas hasta ejecutar la interacción.
- [x] Cada distractor recibe feedback específico.
- [x] Las conclusiones son descriptivas y no causales.

## Exactitud técnica

- [x] Los cálculos de Penguins y Wine usan todas las filas válidas.
- [x] Las submuestras usadas solo para dibujar están etiquetadas.
- [x] La curva de densidad usa KDE con área total uno.
- [x] El boxplot usa bigotes de 1.5 IQR y muestra puntos exteriores.
- [x] Leverage compara ajustes calculados con y sin el punto extremo.
- [x] Cada paquete declara unidad, variables, fuente, fecha y SHA-256.

## Enseñanza en vivo

- [x] Codex tiene un rol técnico reproducible.
- [x] Gemini y ChatGPT tienen roles de facilitación y revisión.
- [x] Existe verificación humana, regla de privacidad y plan offline.
- [x] Los HTML no llaman APIs.

## Criterio de paso

El build debe confirmar 21 conceptos, 42 ejercicios, 63 prompts, hashes
correctos, coherencia del promedio, promedio de 4 o más y ninguna dimensión en 1.

**Resultado:** aprobado y registrado en `docs/VALIDATION_REPORT.md`.
