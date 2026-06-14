# Harness Spec

## Responsabilidad

El arnés del MVP vive dentro de `app/index.html`: coordina selección de modo, concepto, generación local, render visual, exportación y copia de prompts.

## Flujo

1. Usuario selecciona modo, concepto, nivel, contexto, intensidad, duración y tipo de datos.
2. La app genera los tres artefactos relacionados: módulo, ejercicio y paquete en vivo.
3. La vista activa muestra el modo solicitado.
4. `renderVisual` garantiza representación visual.
5. El usuario copia JSON, prompts o descarga paquete.

## Guardrails

- Si no hay `visualSpec`, bloquear generación.
- No ejecutar IA.
- No usar backend.
- No guardar datos sensibles.
- No ocultar que los datos son sintéticos o estructura sugerida.

## Logs

En MVP, los logs son estado visible, hints y fallback de copia. No hay telemetría.

## Fuera del MVP

- Servidor.
- Base de datos.
- Autenticación.
- Integración directa con Codex/Gemini.
- LMS.

