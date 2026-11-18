# Recortes antes del 8 de enero (r08)

**Fecha:** 13 de noviembre de 2026 · **Tablero:** r08 · **Fuente:** «Evaluación UX/UI y SEO de los fronts» (Claude Doc del
17 oct 2026: 22 cambios de front y SEO, u01 a u22, y 12 de skills y puertas de calidad, c01 a c12) y los casos D01 a D08
de `docs/ESTRUCTURA_GENERACION_1.md`.

> Ojo: los ids u01 a u22 de la evaluación **no** son las tareas u01 a u12 del tablero. Aquí se escriben «UX-u01», etc.

**Regla del autor (24 oct):** meter todos los cambios posibles, primero lo que una clase o la inscripción necesita.
**Qué cambió desde la evaluación:** no se compran dominios (p21 descartado); el acceso de pago ya está (p10); los casos se
resuelven en la página y las misiones web no cuentan (u01 y u10 del tablero); Mi avance ya se aligeró (#97); la
inscripción ya cobra con Stripe y tiene lista de espera; los anuncios están en pausa.

Cada fila se contesta con **sí** (acepto la propuesta) o **cambio**. Esfuerzo: S ≤ 1 día, M 2 a 4 días, L más de una semana.

## 1. Entra antes del 8 de enero (propuesta)

| # | Cambio | Estado hoy (comprobado el 13 nov) | Propuesta | Por qué | Esfuerzo | Quién |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | UX-u01 Marca única (parte barata) | «DataClass Forge» sigue en 71 páginas publicadas y «Corporate Data Narrative Lab» en 88 | **Entra solo quitar esas dos marcas del texto visible**; la decisión de nombre de programa y del Nivel 1 V2 espera | Un alumno de la clase 1 ve marcas que no son el curso | S | Claude |
| 2 | UX-u05 Landing v2 (mínimo) | La portada ya pone la Generación 1 al frente con precio | **Entra:** un solo botón principal, fechas y precio en la primera pantalla, preguntas frecuentes y reembolso visibles. **Fuera:** Wald jugable en el hero, temario semana a semana | Es lo que ve quien llega por WhatsApp o LinkedIn antes de inscribirse | M | Claude, textos tuyos |
| 3 | UX-u09 Paneles (mínimo) | admin.html y docente.html dicen «Profile» | **Entra:** «Mi cuenta», estados vacíos que no digan «Todo en orden» y alertas arriba. **Fuera:** dividir panel.js y la entrada única por rol | Lo usas desde la primera clase | S | Claude |
| 4 | UX-u11 Arreglos rápidos de plantilla | Sin revisar en este corte | **Entra:** doble punto, términos en inglés, frases repetidas, metadatos internos plegados, «1 tacos» | Es texto que ven los alumnos en los niveles | M | Claude |
| 5 | UX-u15 + c07 SEO base y su revisión en el build | `robots.txt` y `sitemap.xml` sí; **0 de 13** páginas con `og:image` y canonical | **Entra:** canonical, título y descripción únicos, imagen social 1200×630 y su revisión en el harness | Para que el enlace pegado en WhatsApp se vea bien | M | Claude |
| 6 | UX-u20 Medición sin cookies | No hay analítica | **Entra** junto con la revisión legal (p24): Cloudflare Web Analytics y UTM por canal | Cuando reanudes los anuncios sabrás qué canal convierte | S | Tú lo activas en Cloudflare; Claude el aviso |
| 7 | c09 Documentos rectores | `CLAUDE.md` ya no dice «DataClass Forge»; falta `site/AGENTS.md` | **Entra:** `site/AGENTS.md` corto | Lo piden las reglas del repo para cada carpeta que se edita | S | Claude |

## 2. Ya hecho o resuelto por otro camino

| # | Cambio | Cómo quedó |
| --- | --- | --- |
| 8 | UX-u04 Formulario de interés | La inscripción con Stripe y la lista de espera lo sustituyen. Quedan 3 `mailto:` en la portada solo para Studio y equipos: aceptable |
| 9 | UX-u07 Metodología sin el informe de QA | `methodology.html` ya no menciona QA ni harness |
| 10 | UX-u08 Mi avance v2 | Sitio #97 (u05 del tablero) |
| 11 | UX-u10 Material docente fuera del Nivel 1 | Las páginas publicadas del Nivel 1 ya no contienen guion, checklist ni rúbrica |
| 12 | UX-u13 Wald v1.1 como misión | Wald se resuelve en la página (1.1); la misión web ya no cuenta para la calificación |

## 3. Después del 8 de enero (propuesta)

| # | Cambio | Por qué espera |
| --- | --- | --- |
| 13 | UX-u02 Sistema de diseño 8 bits v1 | Las intros ya usan los tokens `--tq-*`; el resto del sitio puede seguir sobrio |
| 14 | UX-u03 Encabezado y pie compartidos | Mejora general; ningún alumno se atora por esto |
| 15 | UX-u06 Diagnóstico v2 | No lo usa la Generación 1 |
| 16 | UX-u12 Rediseño de visuales de plantilla | Grande (L); los casos son ahora el centro de las clases |
| 17 | UX-u14 Misiones 4.1 y 4.2 | Las misiones no cuentan y 4.1 y 4.2 ya tienen intro y cuaderno |
| 18 | UX-u16 Prerenderizado de lecciones | SEO de largo plazo |
| 19 | UX-u17 Datos estructurados | SEO de largo plazo; barato, puede entrar si sobra tiempo |
| 20 | UX-u18 Casos en el sitio (`/capsulas/`) | Depende de cómo se publiquen los casos fuera del curso |
| 21 | UX-u19 Página pública por caso | Las intros públicas ya cumplen parte de esto |
| 22 | UX-u21 Mapa de palabras clave | Los anuncios están en pausa |
| 23 | UX-u22 Glosario | Grande (L) |
| 24 | c01 a c06, c08, c10 a c12 (skills, contratos, esquemas, puertas de visual, CI, Continuum) | Protegen la fábrica de niveles, que no se toca antes del 8 de enero |

## 4. Casos D01 a D08

Van en su clase, con la regla de producción de siempre (cada clase lista una semana antes); no compiten con lo de arriba.

| Caso | Dónde está | Propuesta |
| --- | --- | --- |
| D04 La cuarta oportunidad | Clase 16, principal | Se produce para su clase |
| D08 Cerrar la ciudad con pocos datos (influenza 2009) | Clase 18 | Se produce para su clase |
| D01, D03, D05, D06 | Opciones secundarias de los Módulos 5 y 7 | Primeros en recortarse si falta tiempo (regla de `ESTRUCTURA_GENERACION_1.md`) |
| D02, D07 | No aparecen en la estructura de la Generación 1 | Fuera de la Generación 1 |

## 5. Cuánto suma

Lo que entra (filas 1 a 7) son unos 9 a 14 días de trabajo de Claude, casi todo sin bloqueos tuyos salvo los textos de la
portada y activar la analítica. Con la regla «primero lo que una clase o la inscripción necesita», el orden sugerido es:
3 (paneles) → 1 (marcas) → 4 (plantilla) → 5 (SEO) → 2 (portada) → 7 → 6.
