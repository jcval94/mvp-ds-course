# CLAUDE.md

## Misión

Ayudar a operar DataClass Forge: una fábrica documental para crear material educativo visual y evaluable de ciencia de datos.

## Reglas principales

- Lee `AGENTS.md` e `IDEA.md`, y el `AGENTS.md` de la carpeta que vayas a editar.
- Antes de cerrar, ejecuta `python -m harness all`.
- Consulta `docs/CURRICULUM_MAP.md` antes de diseñar contenido.
- Lee `docs/CRITERIO_PRIMERO.md` antes de diseñar un caso, misión, cuaderno o
  clase: criterio antes que herramienta, la herramienta llega cuando el caso la
  pide y todo trabajo con IA sigue Delegar · Verificar · Firmar.
- Usa `.agents/skills` según el artefacto solicitado.
- No programes producto antes de validar la vertical slice documental.
- Mantén outputs en español.
- Declara nivel, prerrequisitos, objetivo y supuestos.
- Prefiere snapshots públicos no sensibles con licencia, fecha y hash; etiqueta
  cualquier dato sintético.
- Exige que la visualización represente el mecanismo.
- Exige que el ejercicio dependa de evidencia.
- Desde Nivel 2 exige ejercicio guiado y ejercicio de transferencia.
- En vivo, Codex trabaja con código y Gemini/ChatGPT facilita o revisa.
- Separa revisión técnica de revisión pedagógica.
- Reduce sobrealcance a un objetivo principal.

## Flujo recomendado

1. Encuadrar usuario, concepto y nivel.
2. Ubicar el concepto en el mapa curricular.
3. Crear o validar `ConceptSpec`.
4. Generar Aprender, Ejercitar y Enseñar en vivo.
5. Revisar datos, métricas y conclusiones.
6. Ejecutar todos los evals.
7. Corregir decisiones raíz.
8. Reportar artefactos, supuestos, riesgos y siguiente slice.

## Criterios de calidad

- Objetivo observable.
- Prerrequisitos explícitos.
- Intuición antes de formalismo para principiantes.
- Hábito de criterio declarado y apuesta del estudiante antes de la herramienta.
- Línea base simple antes de cualquier modelo.
- Interacción significativa.
- Distractores plausibles.
- Feedback específico.
- Guion y plan offline.
- Coherencia entre modos.
- Promedio de 4 o más y ninguna dimensión en 1.

## Bloqueos

- Error técnico.
- Visualización engañosa.
- Causalidad injustificada.
- Ejercicio de memoria desconectado del visual.
- Caso que nombra su herramienta antes de la apuesta del estudiante.
- Modelo predictivo sin línea base simple.
- Decisión atribuida a una IA sin firma de una persona.
- Datos inconsistentes.
- Placeholder fuera de templates.
- Solicitud de app antes de aprobación documental.

## Cierre

Reporta archivos, artefactos, supuestos, validaciones, riesgos y próxima vertical slice.
