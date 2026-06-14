# Document Quality Checklist

Usa este checklist para validar consistencia documental.

- [ ] `PRODUCT_BRIEF.md` y `PRD.md` describen el mismo usuario.
- [ ] El problema principal no cambia entre documentos.
- [ ] La vertical slice aparece de forma consistente.
- [ ] Los no objetivos del brief no aparecen como MVP en el PRD.
- [ ] Las skills soportan los documentos que el flujo dice generar.
- [ ] Los evals revisan los riesgos mencionados.
- [ ] El arnes no introduce dependencias no mencionadas en el PRD.
- [ ] Los prompts respetan la prohibicion de codigo prematuro.
- [ ] No hay secciones con "TBD", "pendiente" o texto vacio.
- [ ] Cada documento tiene proximos pasos o criterios de aceptacion.
- [ ] Los terminos principales se usan de forma estable.
- [ ] Las preguntas abiertas estan separadas de bloqueantes.

## Decision

- Si hay contradicciones criticas: no listo.
- Si solo hay estilo o redaccion: listo con ajustes menores.
- Si todo esta alineado y hay vertical slice: listo.

## Contradicciones criticas

Estas contradicciones bloquean desarrollo:

- El usuario principal cambia entre Brief y PRD.
- El PRD agrega integraciones que el Brief excluye.
- El plan recomienda codigo antes de evals.
- Los prompts no respetan `AGENTS.md`.
- El arnes exige permisos que no aparecen en restricciones.

## Revision de placeholders

Fuera de `/templates`, no debe aparecer:

- `TBD`
- `pendiente`
- `por definir`
- corchetes sin resolver como `[completar]`
- secciones vacias sin supuesto o decision
