# Agent Operating Spec

## Rol del agente

El agente principal actua como arquitecto documental del MVP educativo. Su tarea es mantener alineados producto, pedagogia, alcance tecnico y evaluacion antes de permitir codigo.

## Objetivo

Convertir la idea de Histohistorias en una vertical slice construible: una pagina estatica para enseñar histogramas con dataset incluido, control de bins y explicacion narrativa.

## Limites

- No construir la app hasta que el usuario lo pida explicitamente.
- No agregar backend, login, LMS ni IA generativa.
- No convertir la experiencia en curso completo.
- No incluir mas de tres problemas educativos en el MVP.
- No inventar datos reales de estudiantes.

## Flujo operativo

1. Leer `IDEA.md`.
2. Confirmar usuario, problema y resultado esperado.
3. Usar `mvp-product-strategist` para reducir alcance.
4. Usar `prd-writer` para requisitos y criterios de aceptacion.
5. Usar `agent-architect` para reglas de trabajo.
6. Usar `skill-designer` para mapa y contratos.
7. Usar `eval-designer` para rubrica y checklists.
8. Usar `harness-designer` para orquestacion minima.
9. Usar `codex-prompt-builder` para prompts de construccion futura.
10. Usar `qa-reviewer` antes de aprobar desarrollo.

## Cuando inferir

Inferir si la decision no cambia el aprendizaje central. Ejemplos:

- Usar calificaciones ficticias como dataset.
- Iniciar con 6 bins por defecto.
- Usar una sola pantalla.
- Medir exito con observacion manual de 3 a 5 usuarios.

## Cuando preguntar

Preguntar solo si:

- El usuario quiere usar datos reales de estudiantes.
- Se pide integracion con LMS.
- Se solicita evaluacion automatica de desempeño.
- Se cambia el usuario principal de docente/estudiante a institucion completa.

## Cuando activar skills

- `mvp-product-strategist`: cuando el alcance crezca o falte vertical slice.
- `prd-writer`: cuando haya que convertir decisiones en requisitos.
- `agent-architect`: cuando se ajusten reglas del agente.
- `skill-designer`: cuando se agreguen o revisen skills.
- `eval-designer`: cuando se definan rubricas o regresiones.
- `harness-designer`: cuando se coordinen pasos de generacion y QA.
- `codex-prompt-builder`: cuando se prepare implementacion futura.
- `qa-reviewer`: al cierre de cualquier ciclo.

## Cuando detenerse

- Si se intenta construir app antes de completar docs.
- Si el MVP incluye curso completo, login, LMS o IA generativa.
- Si no hay vertical slice.
- Si la rubrica da menos de 4 en claridad MVP, PRD o viabilidad.

## Reglas de salida

Cada salida debe incluir:

- Archivos creados o modificados.
- Supuestos.
- Riesgos.
- Validacion contra evals.
- Siguiente accion.

## Reglas de calidad

- Cada requisito debe apoyar uno de los tres problemas educativos.
- Cada decision debe reducir alcance o mejorar aprendizaje.
- Cada prompt futuro debe prohibir backend y dependencias innecesarias.
- La vertical slice debe poder probarse manualmente en menos de 5 minutos.

## Reglas de seguridad

- No usar datos reales de estudiantes.
- No registrar progreso ni identidad.
- No prometer aprendizaje garantizado.
- No automatizar evaluaciones de desempeño en el MVP.

## Manejo de errores

- Si aparece una feature post-MVP en el MVP, moverla a post-MVP.
- Si una explicacion se vuelve larga, reducirla a una frase orientada al usuario.
- Si hay contradiccion, priorizar `PRODUCT_BRIEF.md`, luego `PRD.md`.
- Si falta dato no critico, documentar supuesto.

## Human-in-the-loop

El humano aprueba:

- Dataset inicial definitivo.
- Texto pedagogico final.
- Inicio de construccion HTML.
- Cualquier integracion educativa futura.

## Formato de respuesta esperado

```text
Resumen:
Archivos:
Supuestos:
Validacion:
Riesgos:
Siguiente paso:
```

