# Validation Report

## Alcance evaluado

Revisión de cierre actualizada el 26 de junio de 2026:

- Nivel 1 · Fundamentos.
- Nivel 2 · Descripción y visualización.
- Nivel 3 · Probabilidad e inferencia.
- 58 conceptos, 98 ejercicios y 174 prompts publicados.
- Tres snapshots públicos con fuente, licencia, fecha y SHA-256.
- Portal estático y pipeline de GitHub Pages.
- Documentación, skills, templates y evals dependientes.
- Separación real de Aprender, Ejercitar y En vivo.
- Contratos visuales con `visual.kind`, mecanismo, estados, marcas semánticas, `evidenceId`, movimiento y alternativa para movimiento reducido.

## Resultado

**Decisión:** listo para publicación supervisada.

**Promedio mínimo entre niveles:** 4.5 de 5.

**Dimensiones en 1:** ninguna.

Los puntajes son una revisión interna respaldada por gates automatizados. No sustituyen la aprobación disciplinar y pedagógica de un docente.

| Dimensión de niveles publicados | Puntaje | Evidencia |
| --- | --- | --- |
| Currículo | 5 | 58 conceptos con prerrequisitos, anterior, siguiente y objetivo observable |
| Exactitud técnica | 4 | Cálculos sobre snapshots completos; submuestras visuales etiquetadas |
| Visual e interacción | 4 | Las acciones de Nivel 2 y Nivel 3 declaran mecanismo, marcas semánticas, estados requeridos y evidencia comprobada en navegador |
| Práctica | 4 | Dos ejercicios por concepto desde Nivel 2, storytelling aplicado, evidencia declarada y respuesta bloqueada antes de interactuar |
| Feedback | 5 | Cada opción tiene feedback específico |
| Enseñanza en vivo | 5 | Snapshot real, En vivo oculto por modo docente, Codex técnico, Gemini/ChatGPT facilitadores, privacidad y plan offline |

## Validaciones ejecutadas

- `python scripts/generate_level2.py`: 21 conceptos, 42 ejercicios y 63 prompts.
- `python scripts/generate_level3.py`: 19 conceptos, 38 ejercicios y 57 prompts.
- `python scripts/validate_content.py`: 58 conceptos, 98 ejercicios, 174 prompts y 3 datasets.
- `python scripts/build_pages.py`: `_site/` construido desde tres manifests aprobados.
- `python scripts/qa_pages.py`: portal, filtros, 18 conceptos de Nivel 1, 21 conceptos y 42 ejercicios de Nivel 2, 19 conceptos y 38 ejercicios de Nivel 3, historias, modo docente oculto, interacciones, prompts, responsive y movimiento reducido aprobados.
- Los hashes de los tres snapshots coinciden con `registry.lock.json`.
- Cada paquete de Nivel 2 y Nivel 3 registra unidad de análisis, variables, fuente, licencia, fecha, SHA-256, prerrequisitos y dos evidencias.
- Densidad usa KDE normalizada con marcas de datos visibles; boxplot usa bigotes de 1.5 IQR; leverage usa ajustes calculados con y sin el punto extremo.
- Nivel 3 usa renderers por mecanismo: conjuntos y denominadores, ensayos binarios, histogramas con curva, dotplots, media acumulada, intervalos, bootstrap y distribuciones nula/alternativa con áreas sombreadas.
- La QA semántica comprueba p-value con cola sombreada, intervalo de confianza como rango horizontal, normal con campana visible, ley de grandes números, errores I/II y potencia.
- Los HTML no llaman APIs ni requieren credenciales.
- GitHub Pages publica únicamente manifests aprobados y ejecuta QA semántica antes de subir el artefacto.

## Correcciones de esta auditoría

- `ConceptSpec.visualSpec` incorpora `kind`, mecanismo, estados, marcas con `evidenceId`, secuencia, intención de movimiento y alternativa reducida.
- Cada ejercicio de Nivel 2 y Nivel 3 declara `evidenceContract` con pasos, `evidenceIds` requeridos y punto exacto de desbloqueo.
- Se incorporó `interactive-visual-reviewer` después de revisión técnica y antes de evaluación pedagógica.
- Se reemplazaron interacciones que no modificaban el visual.
- Se eliminaron submuestras silenciosas de los cálculos.
- Las muestras usadas solo para dibujar se etiquetan con su tamaño.
- Los ejercicios quedan deshabilitados hasta ejecutar la interacción y visitar la evidencia requerida.
- Ejercitar muestra una historia aplicada distinta de Aprender.
- En vivo queda oculto por defecto y se activa con modo docente; el HTML aclara que no es autenticación real.
- En vivo usa snapshots públicos reales como fuente principal también en Nivel 1.
- El validador comprueba evidencia, procedencia y coherencia de puntajes.
- El validador bloquea práctica sin storytelling/animación y En vivo con datos sintéticos como fuente principal.
- Se corrigieron los casos confirmados: p-value sombrea colas de la nula, intervalo de confianza se muestra como intervalo, normal incluye curva de campana y densidad renderiza marcas de datos comparables.
- Se eliminaron duplicados semánticos de `confidence-interval` y `running-mean` para que el QA distinga contenedor de evidencia visible.

## Supuestos

- Aprender y Ejercitar pueden usar datos didácticos etiquetados cuando ayudan al mecanismo.
- En vivo usa snapshots públicos fijos descargados el 14 de junio de 2026.
- El modo docente oculto en frontend no equivale a autenticación real.
- Gemini y ChatGPT son alternativas para facilitación y revisión.
- Una renovación de datos exige actualizar el lock y repetir todos los gates.

## Riesgos restantes

- Los ejercicios de transferencia requieren revisión con docentes reales para confirmar dificultad y utilidad fuera del laboratorio.
- Los snapshots envejecen y no representan actualizaciones posteriores.
- Una salida externa de IA puede ser incorrecta aunque el prompt esté acotado.
- GitHub Pages puede requerir seleccionar una vez `GitHub Actions` como fuente.

## Próxima vertical slice

Relaciones entre variables: scatterplot, tendencia, forma, grupos, correlación, sensibilidad a outliers y variables de confusión, reutilizando solo gramáticas visuales cuyo mecanismo coincida con el concepto.
