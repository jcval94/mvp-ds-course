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

## Flujo

```text
1. Define el concepto o solicitud en IDEA.md
2. Ubícalo en docs/CURRICULUM_MAP.md
3. Ejecuta las skills de .agents/skills
4. Genera los artefactos educativos
5. Valida con evals/
6. Corrige hasta obtener promedio 4+
7. Construye código solo con aprobación explícita
```

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
- **Total:** 58 conceptos, 98 ejercicios y 174 prompts para Codex, Gemini y ChatGPT.

Cada concepto conserva Aprender, Ejercitar y Enseñar en vivo, además de revisión
técnica y pedagógica.

## Inspiraciones

`concepro_histograma.html` y `ejercicios_histograma.html` muestran el nivel de profundidad esperado: construcción visual, comparación, narrativa, interacción y feedback. Son referencias de inspiración, no plantillas ni dependencias.

## Estructura

- `IDEA.md`: misión y decisiones iniciales.
- `docs/`: brief, PRD, currículo, specs, plan y prompts.
- `.agents/skills/`: skills ejecutables.
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
Lee AGENTS.md, IDEA.md y docs/CURRICULUM_MAP.md. Usa .agents/skills para crear
un paquete educativo del concepto solicitado. Prefiere un snapshot público con
licencia, genera dos ejercicios dependientes de evidencia y prepara roles
complementarios para Codex y Gemini/ChatGPT. Valida con evals/.
```

## Definition of Ready

Un paquete está listo cuando:

- tiene objetivo, nivel y prerrequisitos;
- los tres modos comparten una `ConceptSpec`;
- el visual representa el mecanismo;
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
