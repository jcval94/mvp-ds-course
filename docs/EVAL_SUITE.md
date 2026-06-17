# Eval Suite

## Propósito

Validar que DataClass Forge produzca material educativo de ciencia de datos preciso, progresivo, visual, practicable y listo para revisión docente.

## Orden de evaluación

1. Verificar alcance y usuario.
2. Revisar posición curricular y prerrequisitos.
3. Revisar `ConceptSpec`.
4. Revisar Aprender.
5. Revisar Ejercitar.
6. Revisar Enseñar en vivo.
7. Revisar precisión técnica.
8. Revisar consistencia documental y placeholders.
9. Emitir puntaje y decisión.

## Dimensiones

| Dimensión | Pregunta |
| --- | --- |
| Alcance | ¿El paquete enseña un objetivo principal verificable? |
| Progresión | ¿Respeta nivel y prerrequisitos? |
| Exactitud | ¿Definiciones, datos, métricas y conclusiones son correctos? |
| Visualización | ¿El visual representa el mecanismo y evita engaños? |
| Interacción | ¿Manipular o comparar revela el concepto? |
| Práctica | ¿La historia aplicada y la respuesta dependen de evidencia animada? |
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
- Visualización engañosa o decorativa.
- Ejercicio respondible sin observar la evidencia.
- Ejercitar reutiliza la explicación de Aprender en vez de contar un caso aplicado.
- Ejercitar carece de protagonista, presión realista, decisión o animación de evidencia.
- Ausencia de feedback específico.
- Datos inconsistentes entre artefactos.
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
- En vivo presentado como contenido para estudiantes o como seguridad real en frontend.
- Visual que cambia colores, pero no una variable conceptual.
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

1. Confirmar 39 conceptos, 60 ejercicios y 117 prompts.
2. Recorrer los ocho laboratorios en desktop y móvil.
3. Resolver cada ejercicio usando el visual.
4. Simular el guion docente y el plan offline.
5. Verificar hashes, licencias, datos y conclusiones.
6. Probar búsqueda, filtros y enlaces del portal.
7. Corregir hasta alcanzar el criterio de paso.
