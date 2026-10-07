# Absurd Office Comedy Data Standard

Este es el unico estandar narrativo del repositorio. Su prioridad es simple:

1. que la gente hable como gente;
2. que la mala logica corporativa produzca la risa;
3. que una grafica cambie lo que entendemos;
4. que el concepto de datos quede claro.

## Regla central

Cada linea debe poder existir en una oficina real. El absurdo no sale de una
metafora bonita ni de una frase de catalogo. Sale de una persona defendiendo
una decision razonable que, al seguirla dos pasos mas, se vuelve ridicula.

Ejemplo:

> **Jimenez:** "Entonces hubiera bajado incluso si no hubieramos hecho nada."
>
> **Rodriguez:** "Si, asi mero."
>
> **Jimenez:** "Y cuanto nos costo hacer el analisis."
>
> **Rodriguez:** "Pues lo que le pagan a Monica en el mes."
>
> **El jefe:** "Bueno, menos mal. Pero de todos modos tenemos que hacer algo."

## Sonido

- Espanol cotidiano de Mexico y Latinoamerica.
- Frases cortas, interrupciones y respuestas directas.
- Se permiten `no manches`, `nmms`, `que pedo`, `alv` y groseria leve cuando
  pertenecen al personaje y a la escena.
- Se usa `presentacion`, no `slide` ni `deck`.
- Se pregunta `que paso otros anos`, `con quien estamos comparando` o
  `y como se ve la historia`, no `trae comparables`.
- La jerga tecnica aparece solo despues de explicarla en palabras normales.

## Estructura publicada

Cada historia dura de tres a cinco minutos y tiene aproximadamente 450 a 700
palabras, tres a cinco escenas y mas dialogo que narracion.

1. Una conversacion cotidiana da contexto.
2. Alguien propone o defiende una solucion practica.
3. Otra persona detecta una contradiccion.
4. La defensa empeora y el absurdo escala.
5. Una grafica entra porque alguien necesita comprobar algo.
6. Una pregunta natural obliga a mirar el dato.
7. La escena explica la lectura en lenguaje humano.
8. Se toma una decision y aparece un remate propio del caso.
9. Una regla corta permite transferir el aprendizaje.

## Contrato interno

Antes de escribir, completa solamente:

- `concept`
- `characters`
- `situation`
- `bad_logic`
- `escalation`
- `data_turn`
- `chart`
- `decision`
- `punchline`
- `rule`
- `synthetic_data: true`

El contrato organiza; no debe verse como formulario en la historia.

## Humor

El humor aprueba cuando:

- cada respuesta nace de la linea anterior;
- la persona seria se hunde con su propia logica;
- hay detalles concretos: sueldo, hora, folio, correo, bono, permiso;
- el remate no podria pegarse en otro caso;
- la critica apunta a incentivos, burocracia, autoridad o metricas;
- el trabajador bajo presion conserva dignidad.

`Ah.` puede cerrar una escena, pero no cuenta como chiste principal.

Falla cuando:

- repite `Bueno, tecnicamente`, `Eso explica mucho y arregla poco` o cualquier
  muletilla para cumplir una cuota;
- usa objetos, meses, formulas o graficas como personas;
- explica el chiste;
- usa confusion imposible;
- hace que Data hable como manual;
- convierte la historia en examen.

## Grafica

Cada caso contiene exactamente una grafica SVG autocontenida. Aparece despues
de que la mala logica ya produjo una consecuencia. Debe mostrar:

- que se midio;
- que dato faltaba o que comparacion era injusta;
- que conclusion comoda deja de sostenerse;
- que decision cambia.

La grafica no habla. Una persona la abre, la comparte o la imprime.

## Pausa educativa

Cada historia contiene una sola pausa marcada con `<!-- learning:pause -->`.
Es una pregunta que alguien podria hacer en esa junta. No usa opciones A/B/C.
La respuesta ocupa un parrafo breve y vuelve de inmediato a la escena.

## HTML

Markdown es la fuente canonica. El HTML es una lectura lineal del mismo
contenido: titulo, escenas, dialogo, grafica, pausa, explicacion, cierre y
regla. No usa JavaScript, dependencias externas, dashboards, tarjetas,
navegacion ni layouts alternativos.

## Quality gate

PASS solo si:

- el primer contenido de la historia es dialogo con contexto;
- cada intervencion identifica a quien habla;
- hay de tres a cinco escenas;
- la historia tiene ritmo al leerla en voz alta;
- el absurdo escala antes de la grafica;
- existe una sola pausa educativa;
- la grafica permite entender el error;
- el remate principal es unico en la coleccion;
- la regla final es concreta;
- alguien puede pensar: "no manches, esto si pudo pasar".
