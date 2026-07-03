# DataClass Forge

DataClass Forge es una fábrica documental asistida por agentes para crear material educativo de ciencia de datos.

No es un LMS. Define currículo, conceptos, experiencias, evaluaciones y prompts,
y publica los resultados validados como laboratorios estáticos.

## Qué genera

Para un concepto de ciencia de datos produce:

1. **ConceptSpec:** objetivo, prerrequisitos, intuición, errores, visual y dataset.
2. **Aprender:** módulo explicativo visual y progresivo.
3. **Ejercitar:** caso con evidencia, interacción y feedback.
4. **Enseñar en vivo:** guion, datos, demo, preguntas, evaluación y plan offline.

## Usuario inicial

Profesor o creador de cursos introductorios e intermedios de ciencia de datos en español.

## Pipeline obligatorio

Cada nivel se produce en tres capas separadas y en este orden:

```text
1. TEMARIO PREDETERMINADO
   docs/CURRICULUM_MAP.md
   -> conceptos, orden, prerrequisitos y resultado

2. HISTORIA INDEPENDIENTE
   docs/stories/LEVEL_<N>.md
   -> escenas, voces, subtítulos, evidencia y continuidad

3. NIVEL EDUCATIVO
   ConceptSpec -> Aprender / Ejercitar / En vivo
   -> generated/<paquete>/ -> evals -> publicación
```

No se escribe la historia dentro del HTML y no se implementa un nivel cuya
historia siga en borrador. Las fallas se corrigen en la fuente más temprana y se
propagan hacia adelante.

Consulta el orden completo, las puertas de calidad y los comandos de validación
en [docs/pipeline/README.md](docs/pipeline/README.md).

## Temario

El mapa curricular incluye:

- fundamentos y calidad de datos;
- estadística descriptiva y visualización;
- probabilidad, muestreo e inferencia;
- relaciones y correlación;
- regresión y clasificación;
- evaluación de modelos;
- clustering y anomalías;
- series de tiempo;
- A/B testing;
- ética, comunicación y reproducibilidad;
- mini-proyectos.

Consulta [docs/CURRICULUM_MAP.md](docs/CURRICULUM_MAP.md).

## Cobertura publicada

- **Nivel 1 · Fundamentos:** 18 conceptos y 18 ejercicios.
- **Nivel 2 · Descripción y visualización:** 21 conceptos y 42 ejercicios.
- **Nivel 3 · Probabilidad e inferencia:** 19 conceptos y 38 ejercicios.
- **Nivel 4 · Relaciones y contexto:** 15 conceptos y 30 ejercicios.
- **Nivel 5 · Modelado descriptivo:** 18 conceptos y 36 ejercicios.
- **Nivel 6 · Evaluación de modelos:** 24 conceptos y 48 ejercicios.
- **Nivel 7 · Aprendizaje no supervisado:** 10 conceptos y 20 ejercicios.
- **Nivel 8 · Datos temporales y experimentación:** 14 conceptos y 28 ejercicios.
- **Total:** 139 conceptos, 260 ejercicios y 417 prompts para Codex, Gemini y ChatGPT.

Los ocho niveles forman una continuidad aprobada de Don Juan y Paco. Aprender y
Ejercitar usan pedidos ficticios versionados del puesto; En vivo conserva
snapshots públicos reales con procedencia, licencia y SHA-256.

Cada concepto conserva Aprender, Ejercitar y Enseñar en vivo, además de revisión
técnica y pedagógica.

## Inspiraciones

`concepro_histograma.html` y `ejercicios_histograma.html` muestran el nivel de profundidad esperado: construcción visual, comparación, narrativa, interacción y feedback. Son referencias de inspiración, no plantillas ni dependencias.

## Estructura

- `IDEA.md`: misión y decisiones iniciales.
- `docs/`: brief, PRD, currículo, specs, plan, prompts, Story Bible, arcos y ledger.
- `docs/stories/`: una historia canónica y aprobable por nivel.
- `docs/pipeline/`: orden de producción, puertas y Definition of Done.
- `.agents/skills/`: skills ejecutables.
- `scripts/assets/`: shell común y registro SVG cerrado para niveles publicados.
- `evals/`: rubricas, checklists y regresiones.
- `templates/`: estructuras reutilizables.
- `examples/`: casos de entrada y salidas esperadas.
- `generated/`: prototipos y proyectos derivados históricos.
- `datasets/`: snapshots públicos, metadatos, licencias y hashes.
- `site/`: portal minimalista de resultados.
- `.github/workflows/pages.yml`: validación, build y publicación automática.
- `reference/`: referencias no bloqueantes.
- `scripts/`: utilidades de la fábrica.

## Uso con Codex

```text
Lee AGENTS.md, IDEA.md y docs/CURRICULUM_MAP.md. Congela primero el temario del
nivel; crea y aprueba después `docs/stories/LEVEL_<N>.md`; solo entonces usa
.agents/skills para producir ConceptSpecs, Aprender, Ejercitar y En vivo.
Prefiere un snapshot público con licencia, genera ejercicios dependientes de
evidencia y valida con `evals/`.
```

## Definition of Ready

Un paquete está listo cuando:

- tiene objetivo, nivel y prerrequisitos;
- los tres modos comparten una `ConceptSpec`;
- el visual representa el mecanismo;
- el manifest declara `level-shell-v1` y el renderer coincide con el `VisualizationSpec`;
- el ejercicio depende de evidencia;
- cada distractor tiene feedback;
- el paquete docente tiene plan offline;
- la revisión técnica no detecta errores;
- el promedio es 4 o más sin dimensiones en 1;
- no hay placeholders fuera de templates.

## No objetivos

- LMS.
- Cuentas o calificaciones.
- Backend o base de datos.
- Ejecución de LLMs desde los laboratorios.
- Publicación de material que no haya pasado los evals.
- Curso completo en una sola ejecución.

## Crear un proyecto derivado

```powershell
python scripts/scaffold_mvp.py mi-material-ds
```

El script crea una base documental. La carpeta `app/` queda reservada hasta aprobar la vertical slice.
