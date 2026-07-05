# Historia Nivel 11: La máquina que solo funcionaba con Paco

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-11-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 11.
- **Arco:** `docs/LEVEL_11_NARRATIVE_ARC.md`.
- **Entrada/salida:** `L10.4 / G7-local → producto_operable@L11.H1 / G7-local`.
- **Periodo:** 18–21 de enero de 2028.
- **Audiencia/duración:** personas adultas principiantes-intermedias; siete sesiones de 35–45 minutos al producir el nivel completo.
- **Supuesto:** las herramientas se enseñan como realizaciones de contratos de producto de datos.

## Temario predeterminado y escenas

| Escena | Concepto | Incidente Aprender | Don Juan | Paco | Subtítulo inicial del narrador | Subtítulo final del narrador | Incidente distinto de Ejercitar |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L11-S01` | notebook frente a producción | La sesión actual funciona; `Run All` falla por variable global y ruta local | “Ayer caminó; hoy ni arranca.” | “En mi sesión ya estaban esas cosas, apá.” | Un notebook exploratorio puede depender de estado oculto; producción exige entradas y orden explícitos. | Si una ejecución limpia falla, la demo no es todavía un producto reproducible. | Un agente entrega un refactor elegante que conserva un secreto y no valida entradas. |
| `L11-S02` | ejecución reproducible | Reiniciar, configurar y ejecutar de principio a fin | “Quiero que Chava lo abra sin adivinar pasos.” | “Dejo un solo comando y verifico la salida.” | Reproducibilidad operativa exige entorno, configuración, entradas y pasos declarados. | Repetir desde cero descubre dependencias que la sesión interactiva ocultaba. | Otra máquina usa un directorio distinto. |
| `L11-S03` | estructura y responsabilidades | Separar carga, validación, transformación, predicción y salida | “Cada cosa en su lugar, para saber dónde falló.” | “No mezclo leer archivo con decidir respuesta.” | Una estructura de proyecto separa responsabilidades para probar y cambiar piezas de forma aislada. | Carpetas por sí solas no crean modularidad; las fronteras deben conservar contratos. | Otro proyecto tiene muchos archivos pero una sola función global. |
| `L11-S04` | funciones y módulos | Extraer transformaciones puras del notebook | “Si cambia la receta, no quiero romper la entrada.” | “La función recibe y devuelve algo explícito.” | Una función modular declara entradas, salida y efectos; un módulo agrupa responsabilidades coherentes. | Extraer código sin contrato solo mueve el estado oculto. | Otra función modifica una variable global. |
| `L11-S05` | contrato de entrada/salida | Definir schema, tipos y respuesta | “Si llega un archivo raro, que lo diga antes de cobrar.” | “Valido antes de transformar.” | Un contrato de código define forma, tipos, invariantes, errores y compatibilidad. | Una salida con el tipo correcto puede incumplir el comportamiento requerido. | Otro caso pasa tipos pero cambia unidades. |
| `L11-S06` | configuración y secretos | Sacar ruta, umbral y clave de ejemplo del código | “Esa llave no va pegada en la libreta.” | “Configuro por entorno y fallo si falta.” | Configuración cambia entre entornos; un secreto concede acceso y no debe versionarse en código. | Variables de entorno separan valores, pero requieren validación y manejo seguro. | Otro diff imprime el secreto en logs. |
| `L11-S07` | unit e integration tests | Probar una transformación sola y luego el flujo con archivo | “Una pieza puede servir y el conjunto atorarse.” | “Pruebo ambos límites.” | Un unit test aísla una unidad; un integration test verifica fronteras entre componentes reales. | Muchos unit tests no sustituyen una integración crítica. | Otro pipeline falla al serializar la respuesta. |
| `L11-S08` | regression, golden y failure cases | Fijar salida esperada y entradas inválidas | “Que mañana no cambie sin avisar.” | “Guardo un caso dorado y uno que debe fallar.” | Un regression test protege comportamiento conocido; golden y failure cases hacen explícitas salidas y errores. | Congelar una salida equivocada también congela el error; el contrato decide qué merece protección. | Otro cambio pasa tests porque el golden omite una regla. |
| `L11-S09` | fixtures y tests de schema | Preparar datos mínimos y validar columnas | “Usa una muestra que enseñe el problema.” | “La fixture incluye borde y falta esperada.” | Una fixture controla entradas repetibles; un schema test verifica estructura antes del cálculo. | Mockear todo puede ocultar incompatibilidades reales. | Otra fixture nunca incluye nulos. |
| `L11-S10` | request y response | Seguir JSON desde cliente a validación y salida | “¿Qué manda el turno y qué recibe de vuelta?” | “La frontera queda escrita.” | Una API define una frontera entre cliente y servidor mediante request, validación y response. | La API no corrige un modelo ni contrato interno defectuoso. | Otra solicitud usa un campo extra incompatible. |
| `L11-S11` | errores y versionado | Distinguir 2xx, 4xx y 5xx controlado | “Si mandamos mal el dato, no lo llames falla del motor.” | “Separo error del cliente y del servicio.” | Los status codes clasifican resultados; versionar protege contratos cuando cambia la interfaz. | Capturar toda excepción como éxito vuelve invisible el fallo. | Otra versión elimina un campo requerido. |
| `L11-S12` | FastAPI y health check | Implementar referencia mínima y `/health` | “Antes de usarlo, dime si está despierto.” | “El health confirma proceso y dependencias mínimas.” | FastAPI implementa el contrato; un health check responde si el servicio puede atender su función mínima. | Estar “healthy” no demuestra calidad del modelo ni ausencia de drift. | Otro health siempre devuelve 200 aunque falte el artefacto. |
| `L11-S13` | dependencias y lockfile | Reconstruir entorno desde versiones fijadas | “En otra computadora no quiero otra receta.” | “Registro versiones y vuelvo a instalar limpio.” | Un entorno aísla dependencias; un lockfile fija una resolución reproducible. | Fijar versiones reduce variación, pero no elimina vulnerabilidades ni incompatibilidades. | Otro build usa una dependencia flotante. |
| `L11-S14` | imagen y contenedor | Seguir Dockerfile → imagen → contenedor | “La caja no es el local funcionando.” | “La imagen se construye; el contenedor la ejecuta.” | Un Dockerfile describe una imagen; un contenedor es una ejecución aislada de esa imagen. | Docker empaqueta; no despliega ni monitorea por sí mismo. | Otro contenedor usa un archivo local ausente. |
| `L11-S15` | runtime y artefacto | Fijar puerto, comando, archivos y versión | “¿Qué necesita para arrancar y qué sale de la construcción?” | “El artefacto queda inmutable y etiquetado.” | Runtime es el entorno de ejecución; un artefacto versionado es la salida promovible del build. | Un volumen o puerto mal declarado puede romper una imagen correcta. | Otro artifact tag sobrescribe la versión anterior. |
| `L11-S16` | pipeline CI | Commit dispara lint y tests | “Que revise antes de mezclarlo con lo bueno.” | “El cambio entra solo si pasa el flujo.” | CI integra cambios frecuentemente mediante jobs automatizados y reproducibles. | Automatizar una comprobación insuficiente acelera una falsa confianza. | Otro trigger omite pull requests. |
| `L11-S17` | test/build gate y secrets | Introducir fallo y detener build antes del artifact | “Si falla la prueba, ahí se queda.” | “El gate no publica y tampoco muestra la clave.” | Un gate bloquea el avance cuando lint, tests, build o política incumplen criterios. | Secrets del pipeline deben limitarse y nunca imprimirse; verde solo significa que pasaron los checks definidos. | Un agente añade tests triviales que pasan pero no cubren el requisito. |
| `L11-S18` | CI frente a CD | Separar artifact verificado de autorización de deploy | “Que esté listo no significa que ya lo prendimos.” | “CI construye; CD entrega con otra decisión.” | CI valida e integra; CD automatiza entrega o despliegue bajo una política explícita. | Un pipeline puede tener CI sin CD y un deploy puede requerir aprobación humana. | Otro flujo despliega desde una rama no protegida. |
| `L11-S19` | servicio y configuración por entorno | Promover el mismo artifact con configuración distinta | “La misma caja, reglas claras para cada lugar.” | “No reconstruyo para cambiar un valor.” | Un servicio ejecuta un artifact con configuración de entorno y una interfaz estable. | Reconstruir código por entorno rompe trazabilidad. | Otro deploy mezcla credenciales de prueba. |
| `L11-S20` | logs y fallos de arranque | Registrar versión, request y error controlado | “Si no arranca, que deje una pista sin enseñar secretos.” | “Log no es monitoreo; es evidencia de ejecución.” | Logging registra eventos estructurados; un startup failure debe ser visible y detener el servicio. | Logs no sustituyen métricas, alertas ni respuesta operativa de Nivel 12. | Otro log conserva datos personales innecesarios. |
| `L11-S21` | handoff versionado | Entregar contrato, artifact, health, logs y candidato de rollback | “Quien lo reciba debe saber usarlo y regresarlo.” | “Versión, pruebas y límites viajan juntos.” | Un handoff operable reúne artifact, interfaz, criterios, configuración, health, logs y versión anterior verificable. | Tener candidato de rollback no equivale a ejecutar ni comprobar un rollback operativo. | Otro handoff omite dueño y versión segura. |

## Historia y tensión

Paco muestra el mini-proyecto de Nivel 10 funcionando en su notebook. Don Juan
cree que ya puede entregarse al turno porque vio una predicción correcta. Al día
siguiente, `Run All` falla: una celda dependía de otra ejecutada antes, una ruta
apuntaba a la computadora de Paco y una clave de demostración estaba escrita en
el archivo. Don Juan no aprende jerga; solo pregunta por qué Chava no puede usar
lo que ayer “ya servía”. El narrador convierte el tropiezo en contratos, tests y
artefactos. Paco usa un agente de código, revisa su diff y rechaza una solución
elegante cuyos tests no prueban el requisito de entradas inválidas.

## Estado de salida

- **Conocimiento:** Paco distingue demo, proyecto, artifact y servicio; Don Juan conserva autoridad de negocio.
- **Negocio:** `G7-local`, sin crecimiento ni plataforma nueva.
- **Producto:** `producto_operable@L11.H1` queda materializado como handoff versionado y verificable; no representa un servicio público real.
- **Continuidad:** escuela, plantilla, privacidad y secretos previos permanecen.
- **Puente:** “¿Cómo sabremos que sigue funcionando y qué haremos cuando deje de hacerlo?”

## Contrato de modos

- Aprender usa la sesión contaminada del notebook de Paco.
- Ejercitar usa un diff propuesto por un agente: modular, legible y con tests verdes, pero sin validar un input requerido.
- Transferencia usa un segundo artifact que expone un secreto en logs.
- Los tres casos requieren observar contratos y resultados de tests; no se responde por estilo del código.

## No objetivos

- Enseñar Kubernetes, Terraform, microservicios, frontend o administración profunda.
- Ejecutar un despliegue o almacenar secretos reales.
- Enseñar drift, alertas, triage, postmortem o retiro.
- Operar el producto, definir alertas o ejecutar respuesta a incidentes de Nivel 12.
