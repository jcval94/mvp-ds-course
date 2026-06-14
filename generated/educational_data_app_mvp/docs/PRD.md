# PRD

## Contexto

Histohistorias busca validar una experiencia educativa minima para enseñar histogramas. El primer desarrollo sera una web app estatica, sin backend ni login, enfocada en una sola interaccion didactica.

## Objetivos

- Enseñar que un histograma agrupa valores numericos en intervalos.
- Mostrar que la cantidad de bins cambia la lectura visual.
- Ayudar al usuario a describir forma, centro y dispersion.
- Validar utilidad educativa con una prueba manual simple.

## Usuarios

- Docente introductorio de ciencia de datos.
- Estudiante principiante que practica de forma autonoma.

## Casos de uso

1. Un docente abre la pagina durante clase y manipula bins para explicar una distribucion.
2. Un estudiante abre la pagina, cambia bins y lee una explicacion guiada.
3. Un revisor del MVP comprueba si la experiencia evita confundir histogramas con barras categoricas.

## Historias de usuario

- Como docente, quiero mostrar un histograma con datos incluidos para explicar distribuciones sin preparar archivos.
- Como estudiante, quiero cambiar el numero de bins para observar como cambia la interpretacion visual.
- Como estudiante, quiero leer una explicacion breve para conectar la grafica con conceptos de forma, centro y dispersion.
- Como docente, quiero una pregunta de reflexion para verificar comprension inicial.

## Funcionalidades MVP

- Mostrar un dataset ficticio de calificaciones.
- Renderizar un histograma.
- Permitir seleccionar cantidad de bins entre 4 y 12.
- Actualizar la grafica cuando cambian los bins.
- Mostrar una narrativa breve basada en la configuracion actual.
- Mostrar una pregunta de reflexion.

## Funcionalidades post-MVP

- Segundo dataset educativo.
- Carga manual de datos.
- Modo presentacion.
- Ejercicios con retroalimentacion.
- Guardar progreso.
- Integracion LMS.

## Requisitos funcionales

- La app debe cargar sin autenticacion.
- La app debe incluir los datos localmente.
- La app debe mostrar un histograma al abrir.
- El usuario debe poder cambiar bins con un control visible.
- La explicacion debe actualizarse o mantenerse coherente con la cantidad de bins.
- La pregunta de reflexion debe estar visible sin navegar a otra pantalla.

## Requisitos no funcionales

- Debe poder abrirse como archivo HTML o con servidor local simple.
- Debe funcionar sin red.
- Debe ser comprensible en una pantalla de laptop.
- Debe evitar jerga estadistica innecesaria.
- Debe usar texto en español claro.

## Restricciones

- No backend.
- No base de datos.
- No dependencias externas obligatorias.
- No cuentas.
- No datos personales.
- No IA generativa.

## Vertical slice MVP

**Usuario:** estudiante principiante guiado por docente.

**Entrada:** 30 calificaciones ficticias incluidas en el codigo.

**Flujo principal:**

1. Abrir la pagina.
2. Ver histograma inicial con 6 bins.
3. Mover control de bins a 4, 8 y 12.
4. Leer explicacion narrativa.
5. Responder la pregunta: "Que cambio en la grafica si los datos son los mismos?"

**Salida:** usuario puede decir que los bins cambian los intervalos de agrupacion y, por eso, la forma visual puede verse diferente.

**Prueba manual:** observar a un usuario durante 5 minutos y pedirle una explicacion verbal despues de cambiar bins.

**No objetivos de la slice:** no guardar respuestas, no evaluar automaticamente, no cargar archivos, no incluir multiples lecciones.

## Metricas de exito

- 3 de 5 usuarios explican correctamente el efecto de cambiar bins.
- 3 de 5 usuarios diferencian histograma de grafica de barras categorica.
- Un docente puede usar la pagina en clase sin configuracion previa.

## Definition of Done

- La pagina muestra un histograma inicial.
- El control de bins cambia la visualizacion.
- La explicacion es visible y coherente.
- La pregunta de reflexion esta incluida.
- La app no requiere login, red ni backend.
- La vertical slice puede probarse en menos de 5 minutos.

## Criterios de aceptacion

- Dado que abro la pagina, cuando carga, entonces veo un histograma con datos de ejemplo.
- Dado que cambio el numero de bins, cuando se actualiza la grafica, entonces los intervalos visuales cambian sin cambiar el dataset.
- Dado que observo la explicacion, cuando leo el texto, entonces entiendo que un histograma agrupa valores numericos.
- Dado que termino la interaccion, cuando respondo la pregunta de reflexion, entonces puedo explicar que cambio y que no cambio.

## Riesgos

- La visualizacion puede parecer una grafica de barras si no se explica la diferencia.
- La narrativa puede quedarse generica si no menciona bins.
- El dataset de calificaciones puede introducir sesgos de interpretacion si no se presenta como ficticio.

## Preguntas abiertas

- Conviene usar calificaciones o tiempos de estudio como dataset inicial?
- El control de bins debe ser slider o botones?
- Debe incluirse una nota visual que diga "los datos no cambian"?

