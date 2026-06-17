# Validation Report

## Alcance evaluado

Revisión de cierre actualizada el 16 de junio de 2026:

- Nivel 1 · Fundamentos;
- Nivel 2 · Descripción y visualización;
- snapshots públicos y metadatos;
- portal estático y pipeline de GitHub Pages;
- documentación, skills, templates y evals dependientes.
- separación real de Aprender, Ejercitar y En vivo.

## Resultado

**Decisión:** listo para publicación supervisada.

**Promedio mínimo entre niveles:** 4.5 de 5.

**Dimensiones en 1:** ninguna.

Los puntajes son una revisión interna respaldada por gates automatizados. No
sustituyen la aprobación disciplinar y pedagógica de un docente.

| Dimensión de Nivel 2 | Puntaje | Evidencia |
| --- | --- | --- |
| Currículo | 5 | 21 conceptos con prerrequisitos, anterior, siguiente y objetivo observable |
| Exactitud técnica | 4 | Cálculos sobre snapshots completos; submuestras visuales etiquetadas |
| Visual e interacción | 4 | Las 21 acciones producen un cambio comprobado en navegador |
| Práctica | 4 | Dos ejercicios por concepto, storytelling aplicado, evidencia declarada y respuesta bloqueada antes de interactuar |
| Feedback | 5 | Cada opción tiene feedback específico |
| Enseñanza en vivo | 5 | Snapshot real, En vivo oculto por modo docente, Codex técnico, Gemini/ChatGPT facilitadores, privacidad y plan offline |

## Validaciones ejecutadas

- `python scripts/prepare_datasets.py`: 344, 731 y 6,497 filas.
- `python scripts/generate_level2.py`: 21 conceptos, 42 ejercicios y 63 prompts.
- `python scripts/validate_content.py`: 39 conceptos, 60 ejercicios, 117 prompts y 3 datasets.
- `python scripts/build_pages.py`: `_site/` construido desde dos manifests aprobados.
- `python scripts/qa_pages.py`: 18 conceptos de Nivel 1, 21 conceptos y 42
  ejercicios de Nivel 2, historias, modo docente oculto, interacciones,
  prompts y vistas responsive aprobados.
- Los hashes de los tres snapshots coinciden con `registry.lock.json`.
- Cada paquete de Nivel 2 registra unidad de análisis, variables, fuente,
  licencia, fecha, SHA-256, prerrequisitos y dos evidencias.
- Densidad usa KDE normalizada; boxplot usa bigotes de 1.5 IQR; leverage usa
  ajustes calculados con y sin el punto extremo.
- Los HTML no llaman APIs ni requieren credenciales.
- GitHub Pages publica únicamente manifests aprobados.

## Correcciones de esta auditoría

- Se reemplazaron interacciones que no modificaban el visual.
- Se eliminaron submuestras silenciosas de los cálculos.
- Las muestras usadas solo para dibujar se etiquetan con su tamaño.
- Los ejercicios quedan deshabilitados hasta ejecutar la interacción.
- Ejercitar ahora muestra una historia aplicada distinta de Aprender.
- En vivo queda oculto por defecto y se activa con modo docente; el HTML aclara
  que no es autenticación real.
- En vivo usa snapshots públicos reales como fuente principal también en Nivel 1.
- El validador comprueba evidencia, procedencia y coherencia de puntajes.
- El validador bloquea práctica sin storytelling/animación y En vivo con datos
  sintéticos como fuente principal.
- El reporte dejó de presentar el puntaje interno como validación independiente.

## Supuestos

- Aprender y Ejercitar pueden usar datos didácticos etiquetados cuando ayudan al mecanismo.
- En vivo usa snapshots públicos fijos descargados el 14 de junio de 2026.
- El modo docente oculto en frontend no equivale a autenticación real.
- Gemini y ChatGPT son alternativas para facilitación y revisión.
- Una renovación de datos exige actualizar el lock y repetir todos los gates.

## Riesgos restantes

- Los ejercicios de transferencia requieren revisión con docentes reales para
  confirmar dificultad y utilidad fuera del laboratorio.
- Los snapshots envejecen y no representan actualizaciones posteriores.
- Una salida externa de IA puede ser incorrecta aunque el prompt esté acotado.
- GitHub Pages puede requerir seleccionar una vez `GitHub Actions` como fuente.

## Próxima vertical slice

Muestreo e incertidumbre: variabilidad muestral, sesgo de selección, ley de
grandes números, error estándar, intervalo de confianza y bootstrap.
