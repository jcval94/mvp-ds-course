# The Agentic Data Scientist

Curso de ciencia de datos e IA de **Augmented Learning Labs** para adultos que
empiezan desde cero. Se aprende resolviendo decisiones de casos reales (Wald y
los bombarderos, Semmelweis, Berkeley 1973…): primero el criterio, después la
herramienta. Sitio oficial: <https://learninglabs.pages.dev>.

Este repositorio es el **monorepo público del curso**. Contiene el portal, los
laboratorios por nivel, las intros de los casos, las misiones y el harness que
construye y valida el sitio. También contiene la **fábrica de niveles**, la
herramienta interna con la que se producen los laboratorios.

## El producto

- **Curso en vivo (producto principal).** Generación 1 del 8 de enero al 20 de
  marzo de 2027: 22 clases de 3 horas por Google Meet, 10 módulos, un caso real
  por clase y misiones en Colab que se califican. Fechas, precios y condiciones:
  [docs/DECISIONES_GENERACION_1.md](docs/DECISIONES_GENERACION_1.md). Qué caso va
  en cada clase: [docs/ESTRUCTURA_GENERACION_1.md](docs/ESTRUCTURA_GENERACION_1.md).
  Ensayo en seco y piloto previos: [docs/PILOTO_G1.md](docs/PILOTO_G1.md).
- **Biblioteca de laboratorios.** 13 niveles publicados (236 conceptos, 454
  ejercicios). Los niveles 1 y 2 son gratis; del 3 en adelante requieren
  inscripción o plan de pago. Son práctica opcional de cada módulo y no se
  califican.
- **Área del alumno y administración.** Inicio de sesión, Mi avance, inscripción
  con Stripe y paneles de docente y administración. El backend (Supabase, retos,
  rúbricas y calificación) vive en un repositorio privado; aquí solo está el
  cliente.

## Cómo se construye

```powershell
python -m pip install -r harness/requirements.txt
python -m playwright install chromium
python -m harness all        # validate → build → check → smoke
```

`dist/` es el sitio publicable: estático, reproducible y sin datos de alumnos.
Al fusionar en `main`, la CI lo publica en Cloudflare Pages; la URL anterior de
GitHub Pages solo redirige. Los niveles de pago los protege una Pages Function.
Detalles: [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)
y [docs/architecture/DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md).

`python -m harness build --docente` genera en local `dist-docente/` con el
material para el docente (guiones, checklists, modo En vivo). Ese build nunca se
publica.

## Dónde está cada cosa

| Carpeta | Qué contiene |
| --- | --- |
| `site/` | Portal: portada, inscripción, Mi avance, paneles, términos y aviso de privacidad |
| `site/casos/` | Intros animadas de los casos (motor 8 bits y una carpeta por caso) |
| `generated/` | Paquetes aprobados de los niveles; los produce la fábrica y no se editan a mano |
| `missions/`, `kits/` | Misiones web y cuadernos de Colab por caso |
| `clases/` | Mapa de conceptos por clase y etapa de la Generación 1 |
| `casos/` | Catálogo de casos y datos de cada caso, con procedencia y hash |
| `capsulas/` | Cápsulas narrativas cortas |
| `design/` | Sistema visual: tokens, componentes y temas |
| `harness/`, `schemas/` | Build, validaciones y pruebas |
| `deploy/` | Capa de deployment (Cloudflare) |
| `docs/` | Decisiones, arquitectura, currículo, historias, revisiones |
| `.agents/skills/`, `evals/`, `templates/` | Herramientas de la fábrica de niveles |
| `studio/` | Videos con Remotion |

## La fábrica de niveles

Cada nivel de la biblioteca se produce en tres capas, en este orden: temario
([docs/CURRICULUM_MAP.md](docs/CURRICULUM_MAP.md)), historia aprobada
(`docs/stories/LEVEL_<N>.md`, con Don Juan y Paco) y paquete educativo
(ConceptSpec → Aprender / Ejercitar / Enseñar en vivo → `generated/` → evals).
El orden completo y sus puertas de calidad están en
[docs/pipeline/README.md](docs/pipeline/README.md) y en la sección «Fábrica de
niveles» de [AGENTS.md](AGENTS.md).

Ese flujo aplica solo a crear o modificar niveles. Los casos, misiones y
cuadernos siguen [docs/CRITERIO_PRIMERO.md](docs/CRITERIO_PRIMERO.md), y los
cambios de portal, harness o CI siguen [AGENTS.md](AGENTS.md).

## Agentes

Antes de trabajar aquí, lee [AGENTS.md](AGENTS.md). Si eres un agente
colaborador, lee primero [docs/agents/COLABORADOR.md](docs/agents/COLABORADOR.md).

## No objetivos

- Ejecutar modelos de IA desde los laboratorios o el portal.
- Guardar en este repositorio público respuestas de retos, rúbricas, datos de
  alumnos o credenciales.
- Publicar material que no pasó las validaciones del harness o los evals.
- Mezclar el material docente con el build del alumno.
