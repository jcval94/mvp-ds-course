# Módulo 1 · Qué se hace en clase, de tarea y como extra

**Estado:** propuesta del 2 nov 2026 para el autor. Parte de `docs/MODULO_1_DISENO.md` (diseño aprobado) y de dos decisiones
del 1 nov: la tarea es **como máximo 1 hora por semana** y la **calificación son los bits**. Esa regla de 1 hora reemplaza la
propuesta de unas 4.7 horas semanales de `docs/DURACIONES.md`.

## Qué existe hoy (actualizado el 6 nov 2026)

Decisión del 4 nov: las clases 1 a 4 se resuelven en el sitio, sin Colab; Colab entra al inicio de la clase 5.

| Pieza | Clase | Estado | Qué falta |
| --- | --- | --- | --- |
| Calentamiento: los gatos que caen | 1 | **Listo** como micro-caso `n01-gatos` en la ronda en vivo (`practica/vivo.html`, botón «Calentamiento de la clase 1») | — (texto revisado el 7 nov contra Whitney y Mehlhaff, 1987, y Vnuk et al., 2004) |
| 1.1 Wald: intro y caso en la página | 1 | **Listo** (`casos/1-1/`) | — |
| 1.4 Puerto Rico: intro corta y caso en la página | 1 | **Listo** (`casos/1-4/`) | 3 medios candidatos |
| Reto de la taquería | 1 → 5 | Pasa a la clase 5 como primer cuaderno de Colab (B-03 y B-06) | — |
| 1.2 Literary Digest: intro y caso en la página | 2 | **Listo** (`casos/1-2/`) | — |
| 13.11 Gimli: intro corta y caso en la página | 2 | **Listo** (`casos/13-11/`, PR #85) | Foto del avión |
| Laboratorios del Nivel 1 (alfabetización, calidad, tipos, preparación) | 1 y 2 | Listos en el sitio | — |
| Micro-casos (práctica tipo Duolingo) | Entre clases y al inicio de cada clase | **Listos**: `practica/` (alumno) y `practica/vivo.html` (docente), banco de los módulos 1 y 2 en el backend | Probar con 2 o 3 personas del piloto |
| Extras: 13.7 Genes y 13.9 Ariane 5 | Opcional | Lectura en Expedientes | Nada antes del 8 ene |

## Revisión para alumnos (lo que se corrigió)

- La introducción de todos los cuadernos decía «Tu profesor te dio un ID y una clave». Ahora explica el flujo real: el TDD_ID
  es el Gmail de la inscripción y la TDD_CLAVE se genera en Mi avance, con enlace al tutorial de Colab.
- En Wald, el pie de una gráfica daba la respuesta del primer reto antes de que el alumno contestara. Se cambió por una
  invitación a comparar.
- Los cuadernos ahora dicen que los bits son la calificación.
- Las intros de 4.1 y 4.2 ya muestran su material real (grabado del hospital y campanario de Berkeley).

## Cómo se reparte el trabajo

### En clase (180 minutos cada una; obligatorio y con bits)

| Clase | Ejercicio | Min | Formato |
| --- | --- | ---: | --- |
| 1 · vie 8 ene | Bienvenida, Mi avance y elegir la decisión de «Mi decisión» | 20 | Guiado por el docente |
| 1 | Calentamiento: los gatos que caen | 5 | Ronda en vivo (celular o mano alzada) |
| 1 | **1.1 Wald**, en la página (apuesta, registro, error del asistente, lo que no llegó, verificación, firma, revelación) | 45 | Sitio, individual |
| 1 | **1.4 Puerto Rico**, en la página | 25 | Sitio, individual |
| 1 | Laboratorio de calidad de datos | 15 | Sitio, en parejas |
| 1 | Transferir: taquería y piezas 1 y 2 de «Mi decisión» | 15 | Discusión y sitio |
| 1 | Primera práctica en vivo: 5 micro-casos de la clase (el reto de la taquería pasa a la clase 5) | 15 | Ronda en vivo |
| 1 | Cierre: las frases del día | 10 | En vivo |
| 2 · sáb 9 ene | **Micro-casos en vivo** (recuperación sin notas) | 10 | Ronda en vivo: «5 de lo que ya vio el grupo» |
| 2 | **1.2 Literary Digest**, en la página | 42 | Sitio, individual |
| 2 | Encuesta sesgada en vivo y laboratorio de alfabetización | 15 | En vivo y sitio |
| 2 | **13.11 Vuelo 143 (Gimli)**, en la página | 30 | Sitio, individual |
| 2 | Laboratorio de tipos de variables | 15 | Sitio, en parejas |
| 2 | Transferir: piezas 3 y 4 de «Mi decisión» | 20 | Sitio |
| 2 | Cierre del módulo | 30 | En vivo |

(Los minutos no suman los descansos de 10 minutos de cada clase.)

### De tarea (obligatoria, como máximo 60 minutos por semana)

Entre la clase 1 (viernes 21:00) y la 2 (sábado 8:00) no hay tarea obligatoria: solo hay una noche. La tarea de la semana va
del sábado 9 al viernes 15 de enero:

| Tarea | Min | Por qué es obligatoria |
| --- | ---: | --- |
| 3 sesiones de práctica en `practica/` (5 micro-casos cada una) | 30 | Repaso espaciado de los tres hábitos del módulo |
| Terminar lo que no cupo en clase (el caso de costo o una pieza de «Mi decisión») | hasta 25 | El mínimo de cada clase es su caso principal; lo demás se termina aquí |
| Revisar el correo de retroalimentación y responder si algo no quedó claro | 5 | Cierra el ciclo con el docente |

Si un alumno terminó todo en clase, su tarea son solo los micro-casos.

### Adicionales (opcionales)

Para quien va adelantado o quiere más. Proponemos que **no den bits de calificación** para que la regla de una hora sea
justa; sí aparecen en Mi avance como «Expediente extra».

| Extra | Dónde |
| --- | --- |
| Wald sección 8: el laboratorio de placas (si no se hizo en clase) | Cuaderno 1.1 |
| Laboratorio de preparación básica | Sitio, Nivel 1 |
| Lecturas de Expedientes del módulo: Ariane 5, genes de Excel, Vasa, Bolsa de Vancouver | Expedientes sin resolver |
| Micro-casos de nivel 3 | `practica/` (suben solos de nivel con tres aciertos seguidos) |

## Micro-casos tipo Duolingo

### Qué son

Una situación real en 2 o 3 líneas, una pregunta y 3 opciones. Al contestar, el alumno ve la respuesta y una frase que
explica por qué. Duran de 1 a 3 minutos y se contestan desde el celular. No piden código. Cada uno entrena un hábito del
módulo (`faltan`, `mide`, `verificar`) y lleva nivel 1, 2 o 3. El banco del Módulo 1 (14 micro-casos con respuestas) vive en
el backend privado; aquí solo se describe el formato.

### Dónde encajan

| Momento | Cómo se usan | Por qué ahí |
| --- | --- | --- |
| Inicio de la clase 2 (y de cada clase después) | 5 micro-casos en pantalla, votación del grupo en 10 minutos | Recuperar sin notas lo de la clase anterior; reemplaza la «apuesta rápida» del diseño |
| Tarea de la semana | 3 sesiones de 5 | Repaso espaciado: lo que se falló vuelve en la sesión siguiente y a los 7 días |
| Alumnos adelantados | Suben de nivel solos | Tres aciertos seguidos suben un nivel y dos errores lo bajan |
| Sesión de dudas | El docente ve qué micro-caso falló el grupo | Nivelar sin repetir la clase completa |

**Lo que no son:** no reemplazan a los casos. El caso enseña el hábito con datos; el micro-caso lo practica en otro contexto
para que no se olvide.

### Cómo quedó construido (6 nov 2026)

- **Alumno:** `practica/` (learninglabs.pages.dev/practica). Sesiones de 5, seis tipos de ejercicio (elegir, verdadero o
  falso, calcular con la calculadora 8 bits, ordenar pasos, encontrar el error en un borrador del asistente y emparejar),
  respuesta y explicación al momento, nivel por hábito, repaso espaciado y racha de días. Mi avance muestra la tarjeta de
  práctica y los bits de práctica en el desglose.
- **Docente:** `practica/vivo.html`. Abre una ronda para su grupo (calentamiento de la clase 1, «5 de lo que ya vio el
  grupo» o elegidos a mano), proyecta, ve cuántos contestaron, revela con la distribución de respuestas y pasa a la
  siguiente. Abajo, qué micro-casos le cuestan más al grupo y cuánto practica cada alumno.
- **Base (backend, esquema 0.15):** el banco y sus claves viven solo en la base; la página nunca las ve antes de contestar.
- **Decisiones que se tomaron por omisión** (las propuestas de este documento): 1 bit por acierto al primer intento con tope
  de 15 por semana; la página `practica/`; un micro-caso se abre cuando termina su clase en el calendario del grupo.

### Decisiones del autor (propuestas originales; se aplicaron las tres primeras)

1. **Bits de los micro-casos.** Propuesta: 1 bit por acierto al primer intento, con tope de 15 por semana, para que cuenten
   en la calificación sin que convenga repetir sesiones.
2. **Plataforma.** Propuesta: una página `practica.html` en el sitio, para el celular, que registra cada respuesta en la base.
   Hasta que exista, la clase 2 usa los micro-casos en pantalla con votación a mano alzada o con un formulario.
3. **Cuándo.** Propuesta: la versión en pantalla para la clase 2 (no requiere nada nuevo) y la página para la semana 2. Así no
   se pospone el curso.
4. **Extras sin bits de calificación** (arriba).
