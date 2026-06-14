# Product Brief

## Nombre provisional

Histohistorias

## Resumen ejecutivo

Histohistorias es una futura web app educativa, estatica y autocontenida para enseñar histogramas a estudiantes principiantes. El MVP se enfoca en una sola leccion interactiva: visualizar un histograma con datos ficticios, cambiar la cantidad de bins y leer una explicacion narrativa breve.

No busca ser una plataforma educativa completa. Busca validar si una experiencia visual y guiada ayuda a entender distribuciones de forma mas clara que una explicacion estatica.

## Problema

Estudiantes principiantes suelen confundir histogramas con graficas de barras y no entienden como la eleccion de bins afecta la interpretacion de una distribucion.

## Maximo de 3 problemas educativos

1. Diferenciar un histograma de una grafica de barras.
2. Entender que cambiar bins modifica la lectura visual de una distribucion.
3. Describir forma, centro y dispersion con lenguaje simple.

## Usuario objetivo

Usuario principal: docente introductorio de ciencia de datos que necesita una demostracion visual y breve para clase.

Usuario secundario: estudiante principiante que repasa de forma autonoma.

## Propuesta de valor

Una leccion interactiva y sin friccion que permite aprender histogramas cambiando un parametro visual y conectando la grafica con una explicacion narrativa.

## Jobs to be Done

- Cuando doy una clase introductoria, quiero mostrar un histograma interactivo para que estudiantes vean como cambia la distribucion.
- Cuando estudio por mi cuenta, quiero manipular bins y recibir una explicacion simple para comprobar mi intuicion.
- Cuando preparo material didactico, quiero una herramienta autocontenida que no requiera cuentas ni instalacion.

## Resultado esperado para el usuario

El usuario puede explicar que representa un histograma, como cambian los bins y que informacion basica comunica la distribucion.

## MVP recomendado

Una pagina HTML estatica con:

- Dataset ficticio incluido.
- Histograma renderizado.
- Control para cambiar bins.
- Narrativa breve que cambia con la configuracion.
- Pregunta de reflexion.

## Primera vertical slice

**Usuario:** docente introductorio o estudiante principiante.

**Entrada:** dataset ficticio de 30 calificaciones.

**Flujo principal:** abrir pagina, observar histograma, cambiar bins entre 4 y 12, leer explicacion, responder mentalmente una pregunta de reflexion.

**Salida:** comprension basica de forma, centro, dispersion y efecto de bins.

**Prueba manual:** pedir a un estudiante que cambie bins y explique por que la grafica se ve diferente sin decir que los datos cambiaron.

## Diferenciador

Combina una grafica manipulable con storytelling pedagogico en una experiencia de una sola pantalla.

## Supuestos razonables

- El primer dataset puede ser ficticio.
- La primera version no necesita guardar progreso.
- El valor principal se valida con observacion cualitativa y una pregunta de reflexion.
- Una pagina estatica basta para probar el aprendizaje inicial.

## No objetivos

- No login.
- No LMS.
- No curso completo.
- No multiusuario.
- No IA generativa.
- No carga de datos propios.
- No analitica de estudiantes.

## Riesgos

- La explicacion puede ser demasiado simple para docentes avanzados.
- El control de bins puede distraer si no hay guia narrativa.
- Un solo dataset puede limitar la generalizacion del aprendizaje.

## Proximos pasos

1. Validar este paquete documental contra la rubrica.
2. Construir solo la vertical slice estatica.
3. Probar con 3 a 5 usuarios principiantes.
4. Decidir si agregar segundo dataset o modo docente en post-MVP.

