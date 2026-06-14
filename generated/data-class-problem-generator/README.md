# DataClass Forge

**Tagline:** Aprende, practica y enseña ciencia de datos con experiencias visuales.

DataClass Forge es una aplicación web autocontenida para generar experiencias educativas visuales de ciencia de datos. El MVP funciona sin backend, sin API keys y sin conectar OpenAI, Gemini ni Claude. Todo se genera localmente con plantillas, catálogos de conceptos, datos sintéticos y visualizaciones reutilizables.

## Qué genera

1. **Aprender:** módulo explicativo visual para entender la intuición de un concepto.
2. **Ejercitar:** caso interactivo con historia, evidencia visual, pregunta, opciones y feedback.
3. **Enseñar en vivo:** paquete para profesor con guion, dataset, prompts para Codex/Gemini, blueprint de notebook y plan offline.

## Cómo abrir la app

Abre directamente:

```text
generated/data-class-problem-generator/app/index.html
```

La app usa HTML, CSS, JavaScript, Tailwind vía CDN, Chart.js vía CDN y SVG/HTML/CSS para visualizaciones que Chart.js no resuelve bien.

## Conceptos soportados

- Histograma.
- Correlación.
- Regresión lineal.
- Clasificación.
- Clustering.
- Árbol de decisión.
- Matriz de confusión.
- Outliers.
- Series de tiempo.
- A/B testing.

Cada concepto tiene visualización obligatoria y soporta los tres modos.

## Qué no hace el MVP

- No ejecuta IA dentro del navegador.
- No conecta APIs externas.
- No guarda datos en servidor.
- No usa React, Vite, Next ni build tools.
- No crea notebooks reales por defecto, pero permite descargar un blueprint `.ipynb` generado en navegador.

## Referencias históricas

La primera idea tomó inspiración de demos de histogramas y DataCase Lab, pero este proyecto ya no depende de archivos externos de referencia. Si aparecen demos históricos en `reference/demos`, son solo material contextual no bloqueante.

