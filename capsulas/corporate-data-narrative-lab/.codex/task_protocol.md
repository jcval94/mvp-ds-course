# Task Protocol

## Crear

Usar siempre `create-narrative-case` como orquestador. Las skills numeradas son
apoyo especializado y no una lista de pasos que deba invocarse completa.

1. Elegir concepto y decision.
2. Completar diez campos del story spine.
3. Escribir la conversacion antes de la explicacion.
4. Escalar la mala logica con hechos concretos.
5. Insertar una grafica SVG cuando la escena la necesite.
6. Integrar una pregunta natural y una explicacion corta.
7. Cerrar con decision, remate unico y regla.
8. Generar HTML lineal.
9. Validar archivos y coleccion.
10. Regenerar `/docs` con `tools/build_pages_site.py`.

## Mejorar

1. Borrar frases de plantilla y jerga.
2. Dar contexto a cada numero.
3. Asegurar que cada linea responda a la anterior.
4. Cambiar explicacion por accion o dialogo.
5. Rehacer cualquier remate repetido.
6. Acortar hasta 450-700 palabras.
7. Ejecutar `tools/audit_story_language.py --collection` y eliminar cualquier
   texto de plantilla detectado.

## Revisar

Lee los dialogos en voz alta. Pregunta: `¿alguien diria esto?`, `¿por que
contesto eso?`, `¿donde empeoro la logica?` y `¿que cambio al ver la grafica?`.
