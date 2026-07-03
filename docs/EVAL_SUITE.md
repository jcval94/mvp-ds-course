# Eval Suite

## Propósito

Validar que DataClass Forge produzca material educativo de ciencia de datos preciso, progresivo, visual, practicable y listo para revisión docente.

## Orden de evaluación

1. Verificar alcance y usuario.
2. Revisar posición curricular y prerrequisitos.
3. Verificar que la historia independiente del nivel exista y esté aprobada.
4. Revisar trazabilidad, voz, subtítulos, continuidad, conocimiento y estado de datos.
5. Revisar `ConceptSpec`.
6. Revisar Aprender.
7. Revisar Ejercitar.
8. Revisar Enseñar en vivo.
9. Revisar precisión técnica.
10. Probar visual, subtítulos, animación, evidencia y desbloqueo en navegador.
11. Probar `level-shell-v1` y la correspondencia `VisualizationSpec.kind` → `data-renderer`.
11. Revisar consistencia documental y placeholders.
12. Emitir puntaje y decisión.

## Dimensiones

| Dimensión | Pregunta |
| --- | --- |
| Alcance | ¿El paquete enseña un objetivo principal verificable? |
| Progresión | ¿Respeta nivel y prerrequisitos? |
| Exactitud | ¿Definiciones, datos, métricas y conclusiones son correctos? |
| Visualización | ¿El visual representa el mecanismo y evita engaños? |
| Interacción | ¿Manipular o comparar revela el concepto? |
| Evidencia interactiva | ¿Los `evidenceIds`, pasos y desbloqueo coinciden con lo visible? |
| Práctica | ¿La historia aplicada y la respuesta dependen de evidencia animada? |
| Continuidad narrativa | ¿Voces, cronología, conocimiento, humor y versiones de datos respetan Story Bible y ledger? |
| Pipeline narrativo | ¿El nivel parte del temario y de una `LevelStory` independiente aprobada? |
| Subtítulos del narrador | ¿Toda definición y conclusión técnica del narrador aparece como subtítulo accesible? |
| Crecimiento narrativo | ¿Tamaño, capacidad, plantilla y volumen cambian mediante condiciones y `growthDelta`? |
| Alfabetización de agentes | ¿La competencia auxiliar corresponde al nivel y permanece subordinada al objetivo de datos? |
| Feedback | ¿Corrige el razonamiento de cada respuesta? |
| Enseñanza | ¿El docente puede operar la clase con snapshot real, modo oculto y contingencia? |
| Coherencia | ¿Los tres modos comparten objetivo, términos y datos? |
| Viabilidad | ¿El MVP evita infraestructura y alcance innecesarios? |
| Procedencia | ¿Los datos públicos tienen fuente, licencia, fecha y hash? |
| Publicación | ¿Solo se publican paquetes aprobados y enlaces válidos? |

## Rubrica

- **1:** incorrecto, contradictorio o inutilizable.
- **2:** estructura parcial con fallos sustantivos.
- **3:** usable con correcciones importantes.
- **4:** claro, correcto y listo con ajustes menores.
- **5:** preciso, profundo, transferible y listo para uso supervisado.

## Bloqueos automáticos

- Objetivo no observable o más de un objetivo principal sin prioridad.
- Prerrequisito crítico omitido.
- Afirmación técnica falsa o causalidad injustificada.
- Concepto visualizable sin `visualSpec`.
- Renderer fallback, `kind` no registrado o barras no justificadas.
- Temas ausentes del lateral o conceptos ausentes de la franja superior.
- Visualización engañosa o decorativa.
- Renderer reciclado que no representa el mecanismo del concepto.
- `evidenceId` requerido ausente o no visible.
- Respuesta habilitada antes de completar el contrato de evidencia.
- Animación sin alternativa equivalente para movimiento reducido.
- Ejercicio respondible sin observar la evidencia.
- Ejercitar reutiliza la explicación de Aprender en vez de contar un caso aplicado.
- Ejercitar carece de protagonista, presión realista, decisión o animación de evidencia.
- Ausencia de feedback específico.
- Datos inconsistentes entre artefactos.
- Personaje fuera de voz, conocimiento prematuro o invitado con autoridad no presentada.
- Dataset narrativo que cambia sin `dataStateDelta` o contradice el ledger.
- Aprender y Ejercitar que reutilizan incidente, evidencia o resolución.
- Competencia auxiliar de agentes que introduce un segundo objetivo principal.
- Don Juan que introduce o concluye ciencia de datos, o Paco que deja de sonar como hijo/estudiante.
- Nivel continuo sin historia independiente aprobada o con historia escrita dentro del HTML.
- Intervención del narrador renderizada como diálogo, personaje o cuerpo doctrinal en lugar de subtítulo.
- Secreto de personaje inferido desde datos o revelado antes de su ventana.
- Crecimiento, trabajo familiar o inversión sin condición y `growthDelta`.
- Snapshot público sin licencia, procedencia o hash válido.
- LiveTeachingPack con dataset sintético como fuente principal.
- Modo En vivo visible como pestaña estudiantil sin activación docente.
- Paquete docente sin plan offline.
- Prompts sin restricciones o criterios de aceptación.
- Codex y Gemini/ChatGPT con roles indistinguibles o sin verificación humana.
- Alguna dimensión en 1.
- Promedio menor a 4.
- Placeholder fuera de `/templates`.
- Código de producto incluido sin autorización posterior a la fase documental.

## Casos felices

- Histograma con construcción de bins, comparación de formas y práctica de interpretación.
- Correlación con scatterplot manipulable, outlier y advertencia causal.
- Matriz de confusión conectada con costos diferentes de falsos positivos y falsos negativos.

## Casos límite

- Tema avanzado solicitado para principiantes: reducir objetivo y declarar prerrequisitos.
- Concepto con poca interacción natural: usar comparación, anotación o predicción antes de revelar.
- Datos reales no disponibles o sin licencia clara para Aprender/Ejercitar: crear dataset sintético y etiquetarlo.
- Datos reales no disponibles o sin licencia clara para En vivo: bloquear y buscar otro snapshot público.
- Clase sin internet: usar plan offline y activos locales.

## Casos de fallo

- Definición larga seguida de quiz de memoria.
- Historia atractiva cuya pregunta no depende de la gráfica.
- Historia que revela la respuesta sin ejecutar la animación.
- Don Juan define terminología estadística que no aprendió o Paco anticipa el nivel siguiente.
- Narrador que convierte una simplificación o broma en afirmación técnica.
- Skill presentada como receta sin entrada, pasos, salida, comprobaciones y límites.
- En vivo presentado como contenido para estudiantes o como seguridad real en frontend.
- Visual que cambia colores, pero no una variable conceptual.
- QA que solo verifica que el HTML cambió.
- A/B testing que declara ganador solo por una barra más alta.
- Clustering que presenta grupos como clases verdaderas.
- Outlier eliminado automáticamente.
- Matriz de confusión sin explicar consecuencias del dominio.

## Evidencia requerida

Cada puntaje debe citar:

- archivo o artefacto;
- sección;
- observación;
- impacto;
- corrección requerida si el puntaje es menor a 4.

## Decisión

- `Listo`: promedio 4 o más, sin bloqueos.
- `Listo con ajustes menores`: promedio 4 o más y solo cambios editoriales o de precisión menor.
- `No listo`: cualquier bloqueo o promedio menor a 4.

## Prueba manual de la cobertura publicada

1. Confirmar 125 conceptos, 232 ejercicios y 375 prompts.
2. Recorrer los 31 laboratorios en desktop y móvil.
3. Resolver cada ejercicio usando el visual.
4. Simular el guion docente y el plan offline.
5. Verificar hashes, licencias, datos y conclusiones.
6. Probar búsqueda, filtros y enlaces del portal.
7. Corregir hasta alcanzar el criterio de paso.
