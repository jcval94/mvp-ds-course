# PRD

## Contexto

Este PRD describe el MVP de la fabrica documental, no una app final generada por la fabrica. El producto inicial es un repositorio versionable que guia a agentes y humanos para transformar ideas vagas en planes de MVP.

## Objetivos

- Estandarizar la captura de ideas en `IDEA.md`.
- Generar documentos de producto y arquitectura en `docs/`.
- Definir skills reutilizables para agentes.
- Validar calidad con evals simples.
- Proponer una vertical slice antes de escribir codigo de producto.

## Usuarios

- Builder individual que usa Codex o Claude Code.
- PM que necesita alinear alcance antes de desarrollo.
- Equipo pequeno que quiere documentacion suficiente sin burocracia.

## Casos de uso

1. Convertir una idea incompleta en un brief accionable.
2. Crear un PRD MVP con requisitos claros.
3. Disenar un agente principal y sus skills.
4. Revisar sobreingenieria antes de implementar.
5. Preparar prompts ejecutables para desarrollo.

## Historias de usuario

- Como founder, quiero escribir una idea incompleta para recibir un alcance MVP razonable.
- Como PM, quiero ver no objetivos para evitar expansion de alcance.
- Como agente, quiero instrucciones ordenadas para saber que documento generar primero.
- Como revisor, quiero evals concretos para detectar contradicciones.

## Funcionalidades MVP

- Plantilla editable de idea.
- Instrucciones para Codex y Claude Code.
- Documentos base en `docs/`.
- Skills con frontmatter y contratos.
- Evals con rubricas y casos de regresion.
- Script simple para iniciar nuevos proyectos.

## Vertical slice MVP

**Usuario:** builder o PM que quiere convertir una idea educativa en un paquete documental inicial.

**Entrada:** `examples/educational_data_app/IDEA.md`.

**Flujo principal:**

1. El agente lee `AGENTS.md` y la idea de ejemplo.
2. Genera Product Brief y PRD alineados.
3. Propone skills y evals necesarios.
4. Valida contra la rubrica y checklists.
5. Reporta una vertical slice de producto educativo.

**Salida:** documentos coherentes que recomiendan una app autocontenida para enseñar histogramas, sin login, LMS ni curso completo.

**Prueba manual:** revisar que el resultado incluya dataset de ejemplo, cambio de bins, explicacion narrativa y no objetivos.

**Definition of Done de la slice:**

- Product Brief y PRD tienen el mismo usuario.
- El MVP no incluye funcionalidades post-MVP.
- La rubrica promedio es 4 o mayor.
- No hay placeholders fuera de plantillas.

## Matriz de trazabilidad

| Decision | Fuente | Documento donde debe aparecer | Validacion |
| --- | --- | --- | --- |
| Usuario inicial | `IDEA.md` | Brief, PRD, Plan | Checklists de MVP y documentos |
| Resultado esperado | `IDEA.md` | Brief, PRD | Metricas y DoD |
| No objetivos | Brief | PRD, Plan, Prompts | Revision de sobreingenieria |
| Vertical slice | Brief y PRD | Plan, Prompts | Rubrica mayor o igual a 4 |
| Skills necesarias | Agent Spec | Skill Map, Contracts | Skill checklist |
| Riesgos | Brief y PRD | Evals, Harness | Casos de fallo |

## Funcionalidades post-MVP

- CLI con validacion automatica de documentos.
- Generacion interactiva de preguntas bloqueantes.
- Reporte de consistencia entre documentos.
- Exportacion a formatos externos.
- Integracion con repositorios remotos.

## Requisitos funcionales

- El repo debe poder usarse solo con Markdown.
- Cada skill debe definir inputs, outputs y limites.
- Los prompts deben ser copiables y ejecutables.
- Los evals deben incluir ejemplos buenos y malos.
- El script debe crear una estructura minima sin dependencias externas.

## Requisitos no funcionales

- Simplicidad por encima de automatizacion completa.
- Compatibilidad con GitHub.
- Textos en español.
- Cero dependencias obligatorias.
- Estructura facil de extender.

## Restricciones

- No crear producto final.
- No agregar frameworks.
- No depender de red.
- No dejar archivos vacios.

## Metricas de exito

- Una idea incompleta produce al menos 8 documentos coherentes.
- El revisor puede identificar vertical slice en menos de 5 minutos.
- La rubrica alcanza promedio 4 o superior antes de iniciar codigo.
- No existen placeholders vacios en documentos finales.

## Definition of Done

- `IDEA.md` tiene suficiente contexto o supuestos documentados.
- Todos los documentos de `docs/` estan completos y consistentes.
- Skills y evals estan alineados con el MVP.
- Existe vertical slice recomendada.
- El plan separa MVP tecnico de post-MVP.
- La matriz de trazabilidad no tiene huecos criticos.

## Riesgos

- Ambiguedad excesiva en ideas iniciales.
- Documentacion larga sin decisiones.
- Prompts que permiten construir demasiado pronto.
- Evals que no detectan contradicciones.

## Preguntas abiertas

- Que formato de reporte automatico conviene para una version futura?
- La fabrica debe copiar skills completas a proyectos generados o solo referencias?
- Conviene mantener ejemplos por industria o por patron de MVP?
