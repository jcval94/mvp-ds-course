# Product Brief

## Nombre

DataClass Forge

## Tagline

Aprende, practica y enseña ciencia de datos con experiencias visuales.

## Resumen ejecutivo

DataClass Forge convierte conceptos de ciencia de datos en experiencias educativas visuales. El MVP genera tres tipos de salida: un módulo explicativo para aprender, un ejercicio interactivo para practicar y un paquete para enseñar en vivo con prompts y blueprint de notebook.

La app funciona localmente en un único HTML. No usa backend, API keys ni IA generativa conectada.

## Problema

Crear materiales de ciencia de datos requiere coordinar explicación conceptual, visualización, datos, preguntas, feedback y guía docente. Las herramientas de IA pueden ayudar después, pero primero se necesita una estructura pedagógica confiable y visualmente obligatoria.

## Usuario objetivo

- Profesor que prepara una clase.
- Creador de cursos que necesita experiencias reutilizables.
- Estudiante que quiere practicar con feedback.
- Instructor que quiere usar Codex/Gemini en vivo sin improvisar prompts.

## Propuesta de valor

Generar experiencias educativas completas en segundos, garantizando visualización, estructura pedagógica y salida portable.

## Tres salidas del producto

1. **Módulo explicativo:** intuición, visual principal, secciones, error común, mini-checkpoint y resumen.
2. **Ejercicio interactivo:** historia, rol, evidencia visual, pregunta, opciones, pistas, feedback y conclusión.
3. **Clase en vivo:** guion minuto a minuto, dataset, prompts para Codex/Gemini, notebook blueprint, prompt HTML, assessment y plan offline.

## MVP recomendado

Un único `app/index.html` con catálogo de 10 conceptos, generadores locales, visualizaciones obligatorias, modos `Aprender`, `Ejercitar`, `Enseñar en vivo`, copia de JSON/prompts y descarga de paquete.

## No objetivos

- No ejecutar IA dentro del navegador.
- No conectar APIs.
- No persistir usuarios o clases.
- No crear LMS.
- No cubrir todos los conceptos de ciencia de datos.

## Riesgos

- Las plantillas locales pueden repetirse.
- Chart.js y Tailwind por CDN requieren conexión para cargar librerías.
- Un único HTML puede crecer si se agregan más conceptos.
- Los prompts generados deben revisarse antes de usarse en clase real.

## Criterios de éxito

- Los 10 conceptos generan los tres modos.
- Cada concepto tiene visualización.
- La app abre sin backend.
- Se pueden copiar prompts y JSON.
- La documentación refleja la arquitectura de experiencias educativas.

