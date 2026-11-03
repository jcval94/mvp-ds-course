# Guía de casos · The Agentic Data Scientist

**Estado:** decisiones del autor del 1 de noviembre de 2026 (respuestas C1 a C7). Complementa `docs/CRITERIO_PRIMERO.md`
y `docs/ESTRUCTURA_GENERACION_1.md`. El banco de casos y su contrato están en `casos/`.

## Indicadores de cada caso (1 a 5)

Son los seis indicadores del «Tablero de casos · Generación 1» (columnas Pop, Did, Sus, Gan, Dat y Sol). En todos, más
es mejor. La duración va aparte, en minutos.

| Indicador | 1 | 3 | 5 |
| --- | --- | --- | --- |
| **Popularidad (Pop)**: ¿qué tanto lo conoce la gente? | Solo lo conocen especialistas | Aparece en libros de divulgación o en cursos | Lo conoce el público general (película, noticia mundial, meme) |
| **Didáctico (Did)**: ¿qué tan clara llega la lección al resolverlo? | La idea se pierde entre detalles | Enseña una idea clara, pero necesita explicación previa | La idea se descubre sola al resolverlo y se reconstruye con lápiz o datos pequeños |
| **Sustancia (Sus)**: ¿cuánta ciencia de datos cabe en el caso? | Una idea suelta | Un concepto completo con su herramienta | Varios conceptos encadenados que sostienen una clase entera |
| **Gancho (Gan)**: ¿dan ganas de resolverlo? | Se entiende sin misterio | Plantea una pregunta interesante | Un misterio con giro que el alumno quiere resolver ya |
| **Datos para reproducir (Dat)** | No hay datos | Datos parciales o reconstruibles a partir de fuentes | Datos reales y públicos, listos para el cuaderno |
| **Solidez (Sol)**: ¿qué tan verificado está? | Anécdota o mito | Hechos verificados con dos fuentes; quedan dudas declaradas | Fuentes primarias y ningún mito pendiente |

Los niveles 2 y 4 quedan entre los extremos. **Duración**: rango en minutos (por ejemplo, 30–45 min).

Regla práctica: un caso principal pide **Did 4 o más, Sol 3 o más y Dat 3 o más** (datos reales primero). Pop y Gan
ayudan a enganchar, pero un caso poco conocido y sólido vale más que uno famoso y endeble.

## Prueba del caso de ingenio (3 preguntas)

Un caso es «de ingenio», y no solo una historia bonita, si responde que sí a las tres:

1. **¿Hay una respuesta obvia y razonable que está mal?** Va en `naive_answer`. Si nadie se equivocaría, no hay caso.
2. **¿El giro se puede descubrir con las pistas o los datos del caso, sin que el profesor lo revele?** Va en
   `ingenious_move`. Si solo se entiende cuando alguien lo cuenta, es una anécdota.
3. **¿La solución cabe en una frase y cambia una decisión?** Va en `decision_question`. Si no cambia nada, es una
   curiosidad.

## Casos con víctimas: sin morbo

Algunos casos de «el costo del error» tuvieron muertes (Therac-25, Challenger, 737 MAX, Patriot, COVID-19). Se enseñan
así:

- Se cuenta la **decisión y el mecanismo**, no el sufrimiento. La pregunta es qué dato, prueba o proceso habría
  cambiado el resultado y quién decidía.
- Las víctimas se mencionan una vez, con la cifra verificada y sin dramatizar. Sin fotos de víctimas, cuerpos,
  restos ni del momento del accidente; tampoco como gancho de la intro.
- La intro 8 bits no convierte la tragedia en juego: no hay explosiones animadas, puntos ni monedas por el desastre.
- Nombres de víctimas solo si son públicos y necesarios para entender el caso.
- Sin humor ni ironía sobre el desenlace, sobre todo en casos recientes con familias vivas.
- Al inicio del caso se avisa que trata sobre muertes reales.

## Datos reales primero

- Cada ejercicio usa datos reales.
- Los datos simulados o reconstruidos se usan **solo si no hay forma de llegar a los reales**.
- Cuando se usan, se avisa **al inicio del ejercicio** (primera pantalla o primera celda del cuaderno): qué es
  simulado, por qué y qué conserva del caso real. En el banco de casos se declara en `dataset.kind`.

## El caso favorito

El caso favorito del autor es **Wald y los bombarderos**. Por eso abre el curso (clase 1) y es el caso insignia de la
difusión: primer post de LinkedIn y primer anuncio.

## La taquería

La taquería de Don Juan no es el hilo del curso. Vive en dos lugares:

- Como **sección dentro de algunas clases**: un ejercicio corto que traslada la idea del caso a un negocio cotidiano.
- Como **ejercicios aparte en la experiencia en línea** (laboratorios y misiones).

El centro del curso son los casos reales, los ejercicios con datos reales y los ejemplos de trabajo con IA.

## Casos de México y América Latina (candidatos)

Siete candidatos en `casos/staging/`, con afirmaciones verificadas, fuentes e incertidumbres. Ninguno está aprobado
todavía: cada uno anota en `uncertainties` lo que falta verificar. Dos ya estaban en el catálogo del tablero de casos:
Hoy No Circula (E16, costo del error de la clase 8) y Progresa (S06, caso principal de la clase 9). Los otros cinco
entran al catálogo como banco.

| Caso | Tipo | Módulo sugerido | Decisión |
| --- | --- | --- | --- |
| `hoy-no-circula` (E16) | Costo | 4 · clase 8 | ¿Mejoró el aire con la restricción por placa? |
| `progresa-evaluacion` (S06) | Ingenio | 5 · clase 9 | ¿Cómo saber si un programa funciona antes de escalarlo? |
| `argentina-inflacion-precios-en-linea` | Ingenio | 1 · Datos que mienten | ¿Cómo medir la inflación si no confías en la oficial? |
| `impuesto-refrescos-mexico` | Ingenio | 4 o 5 · Comparaciones justas / ¿Funcionó? | ¿Bajó el consumo, comparado con qué? |
| `exceso-mortalidad-covid-mexico` | Costo | 1 · Datos que mienten | ¿Qué cifra usar para decidir? |
| `alerta-sismica-mexico` | Ingenio | 7 · Predecir sin engañarte | ¿Con qué umbral debe sonar la alerta? |
| `transantiago` | Costo | 10 · Firmar la decisión | ¿Se lanza todo de golpe o por etapas? |

`exceso-mortalidad-covid-mexico` y `alerta-sismica-mexico` siguen la guía sin morbo.
