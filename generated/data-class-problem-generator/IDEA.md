# IDEA.md

## Nombre

DataClass Forge

## Idea en una frase

Una app web autocontenida que genera módulos explicativos, ejercicios interactivos y paquetes de enseñanza en vivo para conceptos de ciencia de datos.

## Cambio conceptual

Antes: generador de problemas visuales.

Ahora: generador de experiencias educativas visuales con tres salidas:

1. Aprender.
2. Ejercitar.
3. Enseñar en vivo.

## Problema que resuelve

Profesores, creadores de cursos y estudiantes necesitan explicar, practicar y enseñar conceptos de ciencia de datos con visualizaciones claras, pero crear materiales pedagógicos completos toma demasiado tiempo.

## Usuario objetivo

- Profesor de ciencia de datos.
- Creador de cursos.
- Estudiante que quiere practicar.
- Instructor que enseña en vivo usando Codex, Gemini, notebooks o prompts.

## Resultado esperado

El usuario puede seleccionar un concepto y generar:

- Un módulo explicativo visual.
- Un ejercicio interactivo.
- Un paquete de clase en vivo con prompts y blueprint.

## Restricciones

- Sin backend.
- Sin API keys.
- Sin conexión directa a OpenAI, Gemini o Claude.
- Sin React, Next, Vite ni build tools.
- Un solo `app/index.html`.
- Visualización obligatoria por concepto.

## Supuestos

- Las variaciones locales por plantilla son suficientes para demostrar valor.
- Los prompts para Codex/Gemini se copian y ejecutan fuera de la app.
- La IA entra en post-MVP como generador de variaciones, no como requisito de funcionamiento.

