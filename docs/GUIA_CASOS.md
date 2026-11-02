# Guía de casos · The Agentic Data Scientist

**Estado:** decisiones del autor del 1 de noviembre de 2026 (respuestas C1 a C7). Complementa `docs/CRITERIO_PRIMERO.md`
y `docs/ESTRUCTURA_GENERACION_1.md`. El banco de casos y su contrato están en `casos/`.

## Escalas de cada caso (1 a 5)

Cada caso lleva cuatro puntajes. Los tres primeros miden calidad: más es mejor. La duración solo describe cuánto ocupa.

| Escala | 1 | 3 | 5 |
| --- | --- | --- | --- |
| **Popularidad**: ¿qué tanto lo conoce la gente? | Solo lo conocen especialistas | Aparece en libros de divulgación o en cursos | Lo conoce el público general (película, noticia mundial, meme) |
| **Didáctico**: ¿qué tan clara llega la lección al resolverlo? | La idea se pierde entre detalles | Enseña una idea clara, pero necesita explicación previa | La idea se descubre sola al resolverlo y se reconstruye con lápiz o datos pequeños |
| **Sustancia**: ¿qué tan sólido es el caso? | Anécdota sin datos verificables | Hechos verificados con dos fuentes; datos parciales o reconstruidos | Fuentes primarias, datos reales accesibles y una decisión con consecuencias documentadas |
| **Duración en clase** | 15 minutos o menos (calentamiento) | De 30 a 60 minutos | Más de 90 minutos (la clase completa o tarea) |

Los niveles 2 y 4 quedan entre los extremos. Para la duración: 2 = de 15 a 30 minutos y 4 = de 60 a 90 minutos.

Regla práctica: un caso principal pide **didáctico 4 o más y sustancia 3 o más**. La popularidad ayuda a enganchar,
pero un caso poco conocido con buena sustancia vale más que uno famoso y endeble.

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
todavía: cada uno anota en `uncertainties` lo que falta verificar.

| Caso | Tipo | Módulo sugerido | Decisión |
| --- | --- | --- | --- |
| `hoy-no-circula` | Costo | 4 o 5 · Comparaciones justas / ¿Funcionó? | ¿Mejoró el aire con la restricción por placa? |
| `progresa-evaluacion` | Ingenio | 5 · ¿Funcionó? | ¿Cómo saber si un programa funciona antes de escalarlo? |
| `argentina-inflacion-precios-en-linea` | Ingenio | 1 · Datos que mienten | ¿Cómo medir la inflación si no confías en la oficial? |
| `impuesto-refrescos-mexico` | Ingenio | 4 o 5 · Comparaciones justas / ¿Funcionó? | ¿Bajó el consumo, comparado con qué? |
| `exceso-mortalidad-covid-mexico` | Costo | 1 · Datos que mienten | ¿Qué cifra usar para decidir? |
| `alerta-sismica-mexico` | Ingenio | 7 · Predecir sin engañarte | ¿Con qué umbral debe sonar la alerta? |
| `transantiago` | Costo | 10 · Firmar la decisión | ¿Se lanza todo de golpe o por etapas? |

`exceso-mortalidad-covid-mexico` y `alerta-sismica-mexico` siguen la guía sin morbo.
