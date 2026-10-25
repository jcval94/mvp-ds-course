# IDEA.md

## Nombre

**The Agentic Data Scientist**, de Augmented Learning Labs. La fábrica interna que
produce la biblioteca de laboratorios se llamó al inicio «DataClass Forge»; ese
nombre sobrevive en paquetes históricos de `generated/` y no se usa en páginas
nuevas.

## Idea en una frase

Un curso de ciencia de datos e IA para adultos que empiezan desde cero, en el que
cada clase gira alrededor de una decisión real y la herramienta llega solo cuando
el caso la pide.

## Problema que resuelve

Los cursos introductorios suelen enseñar herramientas antes que criterio: el
alumno aprende a calcular y graficar, pero no a desconfiar de los datos, elegir
la comparación correcta ni firmar una decisión. Con agentes de IA que ya escriben
el código, lo escaso es ese criterio.

## Usuarios

- **Alumno (principal):** adulto hispanohablante sin experiencia en programación
  ni en datos; estudiantes, profesionistas que cambian de carrera y gente
  interesada en IA. Nunca escribe código: trabaja con formularios en Colab.
- **Docente:** imparte las clases en vivo y revisa el avance (hoy, un solo docente).
- **Autor:** produce casos, cuadernos y niveles con ayuda de agentes.

## Producto

- **Curso en vivo:** 22 clases de 3 horas por Google Meet, organizadas en 10
  módulos (`docs/ESTRUCTURA_GENERACION_1.md`). Cada clase tiene un caso principal
  y un caso de «el costo del error», con intro animada en la página y misión en
  Colab. Se califica lo que pasa en Colab.
- **Biblioteca de laboratorios:** 13 niveles publicados que son práctica opcional
  de cada módulo; niveles 1 y 2 gratis, el resto con inscripción o plan.
- **Plataforma:** portal estático en Cloudflare Pages, inicio de sesión, Mi
  avance, inscripción con Stripe y backend en Supabase (repositorio privado).
- Oferta y condiciones de la Generación 1: `docs/DECISIONES_GENERACION_1.md`.

## Principios

- Criterio primero (`docs/CRITERIO_PRIMERO.md`): hábito de criterio, apuesta del
  alumno antes de la herramienta, arco de revelación y Delegar · Verificar · Firmar.
- Casos reales con fuentes; los mitos populares se corrigen, no se repiten.
- Los datos simulados se etiquetan siempre.
- El alumno no escribe código.
- Nada que permita resolver un reto sin pensarlo llega a una página o un
  repositorio público.

## Señales de éxito

- La Generación 1 abre con al menos 6 alumnos y termina sus 22 clases.
- Cada alumno puede explicar por qué una decisión de un caso era correcta o no,
  con evidencia, y firmarla.
- Cada caso publicado tiene intro, cuaderno, fuentes verificadas y revisión
  humana.

## Restricciones

- No se ejecutan modelos de IA desde el portal ni los laboratorios; la
  retroalimentación con LLM queda para una fase posterior.
- Precisión técnica e histórica y claridad pedagógica son bloqueantes.
- Material docente, respuestas y rúbricas no se publican en el build del alumno
  ni en repositorios públicos.
- El curso se monta de la forma más económica posible: hosting estático y
  servicios con plan gratuito mientras alcance.

## Fábrica de niveles

La biblioteca se produce con una fábrica documental asistida por agentes: a
partir de un concepto genera `ConceptSpec`, Aprender, Ejercitar y Enseñar en vivo,
con snapshots públicos con licencia y hash, evaluación pedagógica y técnica, y
una historia continua. El flujo completo está en `AGENTS.md` (sección «Fábrica de
niveles») y en `docs/pipeline/README.md`.

`concepro_histograma.html` y `ejercicios_histograma.html` muestran el nivel de
profundidad esperado: construcción visual paso a paso, comparación, narrativa al
servicio de una decisión, preguntas que requieren observar la visualización y
feedback por error plausible. Son inspiración, no plantillas.

## Sistema narrativo

La línea narrativa canónica usa a Don Juan y Paco como núcleo recurrente y
añade invitados cuando un dominio necesita experiencia que ellos no poseen. La
narrativa se especifica mediante una `CourseStoryBible`, fichas de personaje,
arcos de nivel y un `ContinuityLedger`; no se acepta como simple decoración.

- Don Juan aporta exclusivamente experiencia del negocio y mantiene lenguaje
  simple durante todo el curso; nunca introduce ni concluye ciencia de datos.
- Paco es su hijo, cursa preparatoria, ayuda tres noches sin sustituir un empleo
  y conecta una clase de datos con otra de IA.
- El narrador introduce todos los conceptos, nombres, conclusiones técnicas,
  supuestos y límites.
- La Story Bible fija una matriz incremental de relaciones, secretos con ventana
  de revelación y crecimiento cuantificado del puesto.
- Aprender y Ejercitar pueden compartir mundo, pero deben usar episodios,
  evidencia y decisiones diferentes.
- Cada episodio mantiene un objetivo principal de ciencia de datos y, como
  máximo, una competencia auxiliar de trabajo con agentes.

## Preguntas abiertas

- Cuándo pasan las intros de 4.1 y 4.2 a usar material real («listo»).
- Cómo recalibrar las duraciones estimadas con los tiempos reales de los alumnos.
- Qué revisión humana se exige antes de publicar un caso nuevo.
