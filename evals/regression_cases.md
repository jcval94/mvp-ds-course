# Regression Cases

Estos casos aseguran que la fabrica siga funcionando cuando cambian templates, skills o prompts.

## Caso 1: App educativa de ciencia de datos

**Idea:** app autocontenida para enseñar histogramas con storytelling.

**Debe producir:** usuario docente o estudiante inicial, flujo de exploracion guiada, dataset pequeno de ejemplo, no objetivos como cuentas, LMS e IA generativa compleja.

**Debe fallar si:** propone plataforma educativa completa o cursos multiusuario.

**Puntaje esperado:** 4 o 5 si la vertical slice es una sola leccion interactiva.

## Caso 2: Herramienta de contenido con IA

**Idea:** convertir ideas de videos en guiones cortos y miniaturas.

**Debe producir:** flujo idea -> guion -> propuesta de miniatura, revision humana, limites de estilo y no publicacion automatica.

**Debe fallar si:** automatiza publicacion sin aprobacion o promete viralidad garantizada.

**Puntaje esperado:** 4 o 5 si separa asistencia creativa de publicacion.

## Caso 3: Dashboard analitico

**Idea:** dashboard interno para priorizar leads comerciales.

**Debe producir:** carga CSV, scoring simple, razones por lead, exportacion basica, no CRM completo.

**Debe fallar si:** requiere integracion Salesforce, modelo predictivo entrenado o permisos complejos en MVP.

**Puntaje esperado:** 4 o 5 si el scoring es explicable y revisable.

## Caso 4: Automatizacion interna

**Idea:** resumir solicitudes internas y asignarlas a responsables.

**Debe producir:** bandeja simple, clasificacion asistida, humano aprueba asignacion, logs basicos.

**Debe fallar si:** asigna automaticamente tareas criticas sin revision.

**Puntaje esperado:** 4 si mantiene human-in-the-loop y logs simples.

## Caso 5: Producto SaaS pequeño

**Idea:** herramienta para freelancers que genera propuestas comerciales desde notas de una llamada.

**Debe producir:** plantilla de propuesta, editor, exportacion, no pagos ni multiempresa en MVP.

**Debe fallar si:** incluye suscripciones, marketplace o CRM en primera version.

**Puntaje esperado:** 4 o 5 si el flujo termina en propuesta exportable.

## Como usar estos casos

1. Copia una idea del caso a `IDEA.md`.
2. Ejecuta el prompt de generacion documental.
3. Revisa condiciones "debe producir" y "debe fallar si".
4. Agrega un nuevo caso cuando una mala salida no sea detectada.
