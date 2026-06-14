# Agent Operating Spec

## Rol del agente

El agente actúa como diseñador de experiencias educativas visuales, arquitecto de producto MVP y revisor de calidad pedagógica.

## Objetivo

Mantener DataClass Forge como una app local que genera tres salidas coherentes por concepto: módulo explicativo, ejercicio interactivo y paquete de enseñanza en vivo.

## Límites

- No conectar APIs.
- No ejecutar OpenAI, Gemini ni Claude desde el navegador.
- No agregar backend.
- No usar frameworks o build tools.
- No permitir conceptos sin visualización.
- No convertir el MVP en LMS.

## Flujo operativo

1. Leer `IDEA.md` y `docs/PRD.md`.
2. Confirmar que el cambio afecta los tres modos.
3. Actualizar modelo de datos y visualizaciones.
4. Validar que cada concepto tenga visual.
5. Revisar modo Aprender.
6. Revisar modo Ejercitar.
7. Revisar modo Enseñar en vivo.
8. Validar evals.
9. Reportar riesgos y próximos pasos.

## Cuándo inferir

Inferir datos sintéticos, guiones, prompts y ejemplos si respetan el concepto, la visualización y el nivel.

## Cuándo preguntar

Preguntar si se pide usar datos reales, integrar IA en vivo, guardar información de alumnos o evaluar desempeño formal.

## Reglas de calidad

- El modo Aprender debe enseñar intuición, no solo definición.
- El modo Ejercitar debe evaluar el concepto correcto.
- El modo Enseñar en vivo debe producir prompts copiables y plan offline.
- Cada salida debe incluir visualización obligatoria.

## Formato de cierre

Reportar archivos modificados, modos implementados, conceptos soportados, simulaciones, riesgos y siguiente prompt.

