# Validation Report

## Alcance evaluado

Revisión de cierre actualizada el 28 de junio de 2026:

- Nivel 1 · Fundamentos.
- Nivel 2 · Descripción y visualización.
- Nivel 3 · Probabilidad e inferencia.
- 58 conceptos, 98 ejercicios y 174 prompts publicados.
- Tres snapshots públicos con fuente, licencia, fecha y SHA-256.
- Portal estático y pipeline de GitHub Pages.
- Documentación, skills, templates y evals dependientes.
- Separación real de Aprender, Ejercitar y En vivo.
- Contratos visuales con `visual.kind`, mecanismo, estados, marcas semánticas, `evidenceId`, movimiento y alternativa para movimiento reducido.
- Continuidad narrativa completa de Niveles 1 y 2, con 39 escenas y estado de datos `L1.0 → L2.4`.

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

## Addendum: pipeline narrativo y reformulación de Nivel 1

**Decisión:** listo para publicación supervisada y piloto docente.

**Promedio de la vertical slice:** 4.9 de 5.

**Dimensiones en 1:** ninguna.

| Dimensión | Puntaje | Evidencia |
| --- | --- | --- |
| Progresión curricular | 5 | Cuatro episodios siguen los bloques de Nivel 1 y terminan en la pregunta de Nivel 2 |
| Exactitud técnica | 5 | Unidad pedido, tipos corregidos, faltantes no imputados, duplicado confirmado y caso raro conservado |
| Diseño conceptual | 5 | Story Bible, fichas, arco, ledger, deltas y límites explícitos |
| Pipeline narrativo | 5 | Temario → historia independiente aprobada → nivel → evals y publicación |
| Calidad visual e interacción | 5 | 18 escenas renderizadas, dos subtítulos por concepto, evidencia y desbloqueo comprobados en navegador |
| Práctica y feedback | 5 | Incidente distinto de Aprender, desbloqueo en paso 4 y feedback por distractor |
| Continuidad narrativa | 5 | Voces, conocimiento, cronología, versiones y puentes trazables |
| Alfabetización de agentes | 5 | Esquema y skill con entrada, pasos, salida, comprobaciones y límites |
| Coherencia del crecimiento | 5 | Tamaño, plantilla, volumen, condiciones y `growthDelta` definidos para nueve niveles |

Validaciones específicas:

- `python scripts/validate_content.py` verifica artefactos narrativos, hashes,
  dimensiones, IDs, estados de calidad, trazabilidad, skills y contratos de subtítulos/evidencia.
- `quick_validate.py` aprobó las seis skills modificadas y las skills narrativas.
- `git diff --check` no encontró errores de whitespace.
- `pedidos_crudos_nivel_1.csv` conserva 10 filas, 7 columnas y 9 IDs únicos.
- `pedidos_preparados_nivel_1.csv` conserva 9 pedidos: 7 válidos, 1 faltante y 1 inválido.
- Los CSV no contienen nombres familiares, identidad de Rogelio ni su característica oculta.
- La Story Bible v2 fija preparatoria, dos clases, cinco personajes recurrentes,
  secretos con ventana y matrices incrementales de relación y crecimiento.
- `docs/pipeline/README.md` y `evals/story_pipeline_checklist.md` bloquean un nivel
  continuo sin `docs/stories/LEVEL_<N>.md` aprobada.
- Nivel 1 implementa 18 escenas `L1-S01` a `L1-S18`, dos subtítulos por escena,
  diálogos atribuibles y dataset continuo del puesto.
- La prueba manual confirmó que el subtítulo cambia de planteamiento a conclusión,
  la práctica sigue bloqueada durante la animación y se habilita al terminar.
- `python scripts/qa_pages.py` aprobó las 18 lecciones de Nivel 1, todos los
  ejercicios de Niveles 2 y 3, responsive, navegación y ausencia de errores.

## Addendum: reformulación narrativa de Nivel 2

**Decisión:** listo para publicación supervisada y piloto docente.

**Promedio:** 4.56 de 5. **Dimensiones en 1:** ninguna.

| Dimensión | Puntaje | Evidencia |
| --- | ---: | --- |
| Currículo | 5 | 21 escenas conservan media → caso raro válido en el orden canónico |
| Exactitud técnica | 4 | Centro, dispersión, percentiles, histogramas, KDE, comparaciones, IQR y leverage calculados desde CSV |
| Visual e interacción | 4 | Cada estado cambia evidencia; subtítulo y desbloqueo avanzan juntos |
| Práctica | 4 | 42 incidentes guiados/transferencia distintos de Aprender y bloqueados por evidencia |
| Feedback | 5 | Cada opción corrige un razonamiento plausible |
| Continuidad narrativa | 5 | Don Juan conserva lenguaje del negocio; Paco suena como hijo/estudiante; narrador en subtítulos |
| Integración de agentes | 5 | Entrada, parámetro, operación, salida, comprobación y límite por escena |
| En vivo | 5 | Penguins, Bike Sharing y Wine Quality permanecen como snapshots públicos docentes |

Evidencia específica:

- `docs/stories/LEVEL_2.md` y `docs/LEVEL_2_NARRATIVE_ARC.md` fueron aprobados antes de generar el nivel.
- `pedidos_4_semanas_nivel_2.csv` conserva 600 filas × 10 columnas, 16 noches y una vez cada conteo entre 30 y 45.
- `auditoria_atipicos_nivel_2.csv` separa `P-005=500`, `P-007=30`, `L2-X001=360` y `L2-A001=36` con fuente y acción.
- La semilla `20260628`, generador `level2-orders-v1`, periodo, esquema y hashes están en metadata y manifest.
- Las 21 lecciones muestran escena, voces y un subtítulo por estado visual; ninguna superficie estudiantil reutiliza evidencia de pingüinos, bicicletas o vino.
- Beto revela su stop-motion únicamente como analogía de comunicación visual; no trabaja ni accede a datos.
- El puesto permanece en `G1`; el volumen observado no recibe una explicación causal.
- `python scripts/validate_content.py`, build y `python scripts/qa_pages.py` pasan con 58 conceptos, 98 ejercicios, móvil, movimiento reducido y consola limpia.
- La revisión visual manual de los screenshots desktop/mobile confirmó jerarquía, contraste y continuidad; el navegador integrado no pudo conservar el servidor local y se usó el harness Playwright autorizado por el plan.

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
- La historia canónica de cada nivel se escribirá y aprobará por separado antes
  de modificar ese nivel; no se extrapola automáticamente la historia de Nivel 1.

## Riesgos restantes

- Los ejercicios de transferencia requieren revisión con docentes reales para confirmar dificultad y utilidad fuera del laboratorio.
- Los snapshots envejecen y no representan actualizaciones posteriores.
- Una salida externa de IA puede ser incorrecta aunque el prompt esté acotado.
- GitHub Pages puede requerir seleccionar una vez `GitHub Actions` como fuente.
- El primer subtítulo y el diálogo son visibles al mismo tiempo; un piloto con
  estudiantes debe confirmar si conviene secuenciarlos con una interacción adicional.

## Próxima vertical slice

**Usuario:** creador de cursos y un docente piloto.

**Entrada:** Nivel 3 canónico, Story Bible, ledger `L2.4` y la pregunta “¿Esto se repetirá o fue casualidad?”.

**Flujo principal:** congelar temario de Nivel 3 → escribir y aprobar su historia independiente y arco → actualizar ledger → crear un par Aprender/Ejercitar para `evento` → validar voz, incertidumbre, subtítulos y evidencia.

**Salida:** historia de Nivel 3 aprobada y una vertical slice trazable.

**Prueba manual:** voz ciega, puente desde Nivel 2, práctica imposible de responder sin evidencia y ninguna afirmación de certeza prematura.

**Definition of Done:** temario intacto, historia aprobada antes del nivel, promedio ≥4, ninguna dimensión en 1 y crecimiento limitado al piloto reversible del canon.

**No objetivos:** reformular las 19 lecciones de Nivel 3, modificar Nivel 4 o ampliar físicamente el puesto.
