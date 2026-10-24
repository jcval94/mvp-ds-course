# Revisión de principiante · 24 de octubre de 2026

**Dictamen:** los tres cuadernos tienen obstáculos para un adulto que empieza con datos y nunca debe escribir Python. Wald ejecuta correctamente con sus archivos locales; eso no resuelve la ambigüedad de dónde responder. En 4.1 y 4.2, la recuperación de fallos, el modo invitado y algunos controles necesitan instrucciones más precisas antes de recomendar trabajo autónomo.

Esta es una inspección simulando esa perspectiva, **no una prueba con participantes reales**. Las dificultades y tiempos son estimaciones razonadas. No se propone cambiar la estética, las animaciones ni la historia.

## Alcance, versiones y límites

| Material | Versión inspeccionada | Método |
| --- | --- | --- |
| `kits/m01-wald/m01_wald.ipynb` | `mvp-ds-course` commit `322dccbd52ec7539efa13863e051e263272ee994`; 14 celdas | Lectura completa y ejecución de las 6 celdas de código en orden, con acceso de red bloqueado y datos locales. |
| `cuadernos/caso_4_1_semmelweis.ipynb` | `agentic-ds-backen` commit `842dc37baab18a789948ddf8c5757ff968e5e50a`; versión 1.3; 27 celdas | Solo lectura del JSON, fuentes del caso, ensamblado del generador y mensajes del paquete. |
| `cuadernos/caso_4_2_berkeley.ipynb` | Mismo commit del backend; versión 2.6; 29 celdas | Solo lectura, con el mismo procedimiento. |

Fuentes reproducibles: [Wald](https://github.com/jcval94/mvp-ds-course/blob/322dccbd52ec7539efa13863e051e263272ee994/kits/m01-wald/m01_wald.ipynb), [generador](https://github.com/jcval94/agentic-ds-backen/blob/842dc37baab18a789948ddf8c5757ff968e5e50a/generador.py), [caso 4.1](https://github.com/jcval94/agentic-ds-backen/blob/842dc37baab18a789948ddf8c5757ff968e5e50a/casos/caso_4_1.py), [caso 4.2](https://github.com/jcval94/agentic-ds-backen/blob/842dc37baab18a789948ddf8c5757ff968e5e50a/casos/caso_4_2.py) y [mensajes del paquete](https://github.com/jcval94/agentic-ds-backen/blob/842dc37baab18a789948ddf8c5757ff968e5e50a/taqueria/__init__.py).

- Se verificó por análisis de literales y reconstrucción textual que las celdas versionadas coinciden con las que ensambla `generador.py`: portada, preparación, panel, cuerpo, estado y glosario. No se ejecutó el generador ni se regeneraron archivos del backend.
- Todas las celdas de código de 4.1 y 4.2 declaran `cellView: form`. No se presupone que el alumno deba leer el código oculto; los problemas de campos y etiquetas se evalúan desde lo que el formulario expone.
- La versión fija del paquete es 0.6.0 y su SHA-256 es `6d2b512aa7e41c88e9c7fb373d0211ebb629897a6885653ccd9adca638e513bb`; se contrastó por lectura con la fuente del paquete público. El canal estable puede servir otra versión: los mensajes descritos corresponden a la fuente inspeccionada, no a una sesión real del servicio.
- **No se ejecutó ninguna celda de 4.1 ni 4.2**, ni se importó `taqueria`, consultó Supabase, inició modo invitado o registró eventos. No se leyó ni creó ningún secreto o credencial; tampoco se corrió el instalador.
- Wald se ejecutó con Python y Matplotlib sin interfaz, mostrando el resultado de la última expresión como lo hace un cuaderno. No había IPython/Colab disponible para probar sus menús o formularios reales. La ejecución valida el cálculo y las dependencias locales, no certifica la interfaz de Colab.
- Supuesto de recorrido: adulto usando Colab en computadora, que puede seleccionar opciones y escribir **texto normal o números en formularios**, pero desconoce celdas, sesiones y programación. No se presume dominio de porcentajes, tasas o gráficas. Las intros enlazadas se consideran material previo externo; no se auditó su contenido ni se comprobaron sus enlaces en navegador.
- Se creó únicamente este informe como cambio versionado. Ningún archivo fuente existente fue modificado.

## Cómo leer los hallazgos

**Bloquea:** impide completar una tarea requerida, recuperarse sin ayuda técnica o asegurar la entrega bajo la condición indicada. **Confunde:** permite seguir, pero puede llevar a una acción o interpretación equivocada. **Menor:** fricción acotada que normalmente no detiene el recorrido.

Identificadores: `W01–W14` para Wald; `S01–S27` para Semmelweis; `B01–B29` para Berkeley. La numeración incluye **todas** las celdas, también las de texto, empezando en 1; no corresponde al número entre corchetes de ejecución. Cada celda aparece una vez en su tabla, ordenada por gravedad y después por posición. “Sin hallazgo” señala revisión satisfactoria, no un defecto inventado.

**Ejecución observada** se reserva a Wald. En los otros dos casos, “mensaje” y “comportamiento” significan ramas confirmadas por lectura; los fallos de red, permisos y controles son escenarios posibles, no incidencias provocadas o verificadas contra el servicio.

## Hallazgos prioritarios, por gravedad

### Bloquea

1. **Respuesta sin destino en Wald — W09 y W14.** “Escribe en una línea” y la pregunta de transferencia no tienen campo ni lugar de entrega. Como alumno: «¿Debo añadir una celda, cambiar el texto o escribir entre las instrucciones de Python?». La actividad queda sin una acción inequívoca compatible con no programar.
2. **Wald sin archivos locales — W03.** El cuaderno funciona offline desde la raíz del repositorio con sus datos, pero no es un archivo autosuficiente: busca `casos/data/wald-bombers/` relativo al directorio de trabajo; si no lo encuentra, usa internet. Copiar únicamente el `.ipynb` a Colab no satisface la condición offline. No se indica cómo reconocer que los datos están disponibles ni a quién recurrir si no cargan. Bloqueo condicional, no fallo observado en la ejecución local.
3. **Recuperación indiscriminada en una actividad calificada — S01/B01.** “Si algo se ve raro… Reiniciar y ejecutar todo” vuelve a recorrer hipótesis, respuestas, retos y cierre con los valores que tengan los formularios. `reto()` crea un identificador de intento nuevo por llamada. No se afirma que cada reejecución quite puntos ni que todas dupliquen registros: sí se confirma que pueden volver a enviar respuestas. Falta distinguir repetir una gráfica, volver a preparar y reenviar un reto; el alumno no sabe qué acción conserva su trabajo y sus oportunidades.
4. **La alternativa al control no permite completar el reto — B23/B24.** Si falla la importación o creación de widgets, B23 llama únicamente a `laboratorio(7)`. B24 exige encontrar el primer porcentaje que cruza las líneas moviendo el control. Una imagen fija no permite explorarlo y no hay instrucción alternativa sin código. Además, un widget que falle después de crearse puede mostrar su propio error sin activar ese `except` externo.
5. **Entrega con conexión interrumpida — S26/B28.** El mensaje invita a cerrar y volver a ejecutar después, pero no distingue conservar el mismo entorno de obtener uno nuevo. La cola vive en un archivo del entorno de ejecución, sin una copia en Drive implementada aquí. No se puede garantizar recuperar esos eventos al perder ese entorno. “Todo guardado” tampoco acredita por sí solo que el ejemplo tenga contenido válido o que los retos se hayan resuelto. Bloquea asegurar la entrega si hay eventos sin sincronizar; no se verificó pérdida real.
6. **Transferencia que depende de un enlace no incluido — B25.** “Tu profesor te compartirá el enlace” es la única forma de abrir la demo de las sucursales desde esa celda. Si no fue compartido, el principiante no puede completar esa extensión autónomamente. No bloquea el cierre técnico B27, pero sí el acceso al material que la sección promete.

### Confunde

1. **“Funciona igual” no significa feedback ni calificación — S01/B01 y todos los retos.** En modo invitado los retos no comprueban aciertos. La fuente muestra “Reto sin comprobar”, explica la limitación y permite seguir: buen mensaje de salida, pero contradice la expectativa de entrada. No hay que probarlo contra la base para ver esa diferencia.
2. **Preparación con campos que parecen tarea — S02/B02.** Se muestran `URL_CURSO`, `CLAVE_PUBLICA` y `AVISO_URL` mientras se dice que la configuración se descarga sola. Un alumno puede confundir la clave pública con su clave personal. Escribir datos técnicos no forma parte de su actividad; falta una instrucción inequívoca sobre qué campos ignorar y dónde reconocer que está listo.
3. **Leer cantidades no es leer tasas — W03–W06, W11–W12, S08–S11 y B08–B19.** Cambian denominadores, escala y significado de “puntos”. Ejemplo crítico: Wald pasa de impactos totales por 1% de superficie a impactos **por avión** por 10%. Sin explicarlo, los números pequeños pueden parecer otra medida del mismo total.
4. **Una afirmación contradice lo que se acaba de ver — B14.** “Departamento por departamento a ellas no les va peor” no describe los seis departamentos: C y E muestran menor tasa femenina; A, B, D y F, mayor. El principiante que detecte las dos excepciones puede creer que leyó mal. La definición de B18 tampoco distingue el ejemplo de inversión estricta en todos los grupos de este caso con cuatro de seis a favor.
5. **Conclusiones más fuertes que la comprobación realizada — S11, S22/S23, B09 y B19/B20/B27.** “No es mala suerte” puede leerse como imposibilidad; “madres salvadas” como conteo observado en vez de escenario hipotético; “no había sesgo” como certeza absoluta en lugar del alcance de una comparación. Se pide aclarar qué permite concluir el cálculo, sin cambiar la historia.
6. **Feedback de guardado confundible con evaluación — S06/S15/S25 y B06/B15/B27.** “Anotada” o “Caso completado” confirma una acción, no la calidad de la explicación. `marca_llm()` solo muestra una marca a la cuenta docente; no implementa tutoría al alumno. Falta indicarle si debe esperar revisión del profesor y con qué criterio autocotejarse.
7. **Reglas de los retos incompletas al primer contacto — S09/B13.** Se usan “bits”, estrellas e intentos sin explicar desde el inicio su relación con la nota. La fuente describe que después de cinco intentos ya no se ganan bits. “Equivocarte no resta” y “al primer intento vale más” necesitan distinguir puntos acumulados de puntos que todavía se pueden ganar, especialmente si se está aprendiendo a usar el formulario.
8. **Redondeo que parece error propio — S23.** Con los números del enunciado, `1,841 × 9.9 ÷ 100 − 56 ≈ 126`, pero la explicación declarada del reto habla de unas 183 muertes y 127 salvadas. La fuente admite tolerancia de 3, por lo que no se declara rechazo del 126; sí falta hacer explícita la aproximación para que la devolución no parezca corregir una cuenta válida. No se consultó la respuesta cargada en la base.

### Menor

- El panel docente intercalado (S03/B03) hace dudar si el alumno debe ejecutar algo destinado al profesor; la respuesta para un alumno autenticado sí le dice que continúe.
- Glosarios útiles colocados al final (S27/B29) no ayudan en el primer encuentro si no se indica que pueden consultarse durante el recorrido.
- Reejecutar la simulación de Wald sin cambiar la selección da el mismo resultado: usa una semilla fija. No está roto, pero falta decir que repetir la misma decisión reproduce la misma simulación.

## Wald: revisión de las 14 celdas

En esta tabla, **E1** significa un `NameError` posible por saltar una celda o perder las variables de la sesión. El mensaje nombra una variable, pero no dice qué celda volver a ejecutar; no es una recuperación comprensible para este perfil. **E2** significa error de lectura/red o archivo de datos no disponible, sin explicación propia del cuaderno.

| Celda y gravedad | Instrucción, conocimiento previo o jerga | Riesgo de escribir código | Error posible y utilidad del mensaje |
| --- | --- | --- | --- |
| W03 · bloquea condicional | Carga datos sin indicar dónde deben estar. La salida enseña `avion`, `motor`, `cabina`, etc., una columna de índice 0–4 y solo cinco filas; no explica que cada fila es un avión ni que es una muestra de la tabla completa. | Al no aparecer los datos, puede intentar cambiar `BASE`, `LOCAL`, nombres o importaciones. | E2: error técnico sin acción estudiantil. Un entorno sin Pandas/Matplotlib daría `ModuleNotFoundError`; no ocurrió aquí y el cuaderno no da una salida sin instalar. |
| W09 · bloquea | “Escribe en una línea” no tiene recuadro ni destino, extensión de entrega o forma de confirmar. “¿Cambió mucho?” carece de referencia para juzgar magnitud. | Alto: añadir una celda o insertar prosa en W08. | Si escribe prosa dentro del código, puede obtener `SyntaxError`; no se le diría dónde debía responder. La ausencia del campo no genera aviso. |
| W14 · bloquea | Pregunta de transferencia sin campo, criterio de suficiencia ni instrucción de entrega. Las fuentes históricas no indican qué parte es lectura opcional. | Alto: repetir el problema de W09 para registrar la respuesta final. | No hay validación ni confirmación de que terminó. Un alumno puede salir sin una evidencia escrita de aprendizaje. |
| W01 · confunde | “Celda gris”, ▶ y `Shift + Enter` suponen reconocer una celda, seleccionarla y saber cuándo acabó. No explica guardar copia, qué esperar de Colab o cómo retomar tras un error. “Sesgo de supervivencia” se explica después, en W13. | El código de Wald no declara ocultamiento como formulario en sus metadatos; falta decir explícitamente que no hay que editarlo. No se comprobó su render real en Colab. | Ningún mensaje inicial cubre errores de orden o sesión; E1 no orienta al alumno. |
| W04 · confunde | “Por cada 1% de la superficie” exige entender área y normalización. Falta un ejemplo de lectura de una fila que distinga cantidad de impactos de densidad. | Bajo, si se aclara que el cálculo ya está hecho. | No ejecuta nada; una interpretación equivocada no se detecta. |
| W05 · confunde | La tabla no explica cuál columna usar para decidir ni qué población suma los impactos. Hay decimales en una medida construida a partir de conteos enteros. | Puede creer que debe completar o recalcular la tabla. | E1 si no ejecutó W03. El mensaje de Python no remite a “Trae los datos”. |
| W06 · confunde | Gráfica de densidad sin pregunta de lectura: la barra más larga es **Cola**, aunque el mayor conteo bruto era **Alas**. El contraste necesita ser explícito para evitar que parezcan salidas inconsistentes. | Puede abrir el código para corregir lo que cree discrepancia. | E1 si falta W05; sin guía. No hubo error en la ejecución. |
| W07 · confunde | “Menú de la derecha” presupone que encuentra el formulario. No distingue seleccionar, ejecutar y leer el resultado, ni indica qué hacer si ve código en lugar del menú. | Puede editar el valor literal de `blindaje` para seguir. | La instrucción no contiene alternativa si no aparece el menú. Ese comportamiento de Colab no se probó. |
| W08 · confunde | `+12` no dice en la propia salida “12 aviones adicionales de los 1,000 enviados”. Mismo resultado al repetir puede parecer falta de respuesta al botón. | Alto si no localiza el selector: código largo sin una instrucción de no modificar. | E1 si falta W03; un nombre de opción editado a mano podría dar `KeyError`, sin ayuda. Ejecutó bien con las cinco selecciones ensayadas en memoria. |
| W10 · confunde | `todos.csv` parece un archivo que el alumno tiene que buscar o subir. No dice explícitamente “la siguiente celda ya lo abre”. | Puede buscar una instrucción para escribir el nombre del archivo. | No ejecuta; el fallo aparecería en W11, con E2 y sin ayuda propia. |
| W11 · confunde | Cambia de total por 1% a **por avión por 10%**. La primera medida suma sobre 736 aviones; la segunda compara promedios entre grupos de distinto tamaño. No se explica la unidad del 0.11 o 0.56. | Puede intentar multiplicar o cambiar la fórmula para reconciliar números. | E1/E2 según lo que falte; ninguno indica cómo retomar. Ejecutó sin errores con 736 regresados y 264 derribados. |
| W12 · confunde | Requiere leer dos barras por parte, leyenda y nueva unidad. Falta pedir una comparación concreta con palabras antes de concluir. | Bajo; sería tentador tocar el cálculo si W11 no se entendió. | E1 si no corrió W11. El cuaderno no identifica la celda faltante. |
| W02 · menor | “Descarga” describe solo la ruta con internet; en la ejecución offline se leen archivos locales. “Impactos por parte” aún no define fila y columna. | Bajo; el alumno podría buscar un botón de descarga inexistente. | Sin ejecución propia; depende de W03. |
| W13 · menor | Explica bien el sesgo y da una acción concreta: regresar, seleccionar “Motores y cabina” y ejecutar. Falta decir qué salida comparar con la primera decisión y dónde registrar el aprendizaje. | No pide código; vuelve al selector. | Si la sesión sigue activa, no se observó fallo. Si se perdieron variables, aparece E1 sin plan de recuperación. |

### Resultado comprobado y tiempo por sección de Wald

Se recorrieron las seis celdas de código en orden: **W03, W05, W06, W08, W11 y W12**, sin modificar el cuaderno. Su SHA-256 antes y después fue `1595c210edae9d7875eb61fcc2be2377473a5e2f0a34d6a6c52d85226933369e`.

- W03: 736 regresaron de 1,000. W05: máximos distintos según medida: 698 impactos en Alas y 17.2 impactos por 1% en Cola.
- W08: sin blindaje 736; Fuselaje y alas 748, diferencia +12. Repitiendo la celda con cambios **solo en memoria del revisor**: Motores y cabina 898 (+162); Alas y cola 753 (+17); Motores y alas 855 (+119); Cabina y cola 792 (+56).
- W11: Motores 0.11 frente a 0.56 y Cabina 0.12 frente a 0.59, en impactos por avión por 10% de superficie. W06 y W12 generaron las gráficas sin error.
- El tiempo de cálculo de las seis celdas fue aproximadamente 1.4 segundos, aparte del arranque del proceso. No equivale al tiempo de lectura o aprendizaje y no incluye los tiempos de Colab.

| Sección | Celdas | Estimación del alumno |
| --- | --- | --- |
| Orientarse y abrir su copia | W01 | 3–5 min |
| 1. Traer los datos | W02–W03 | 3–5 min |
| 2. Leer tabla y gráfica | W04–W06 | 5–8 min |
| 3. Elegir, comparar y explicar | W07–W09 | 5–8 min |
| 4. Comparar con lo que faltaba y repetir decisión | W10–W13, incluyendo volver a W08 | 7–11 min |
| 5. Transferencia y contexto histórico | W14 | 5–8 min |
| **Total sin incidencias** | | **28–45 min** |

Si no tiene los datos o no sabe dónde responder, no hay un tiempo de resolución autónoma estimable con las instrucciones actuales; necesita ayuda externa.

## Caso 4.1: revisión de las 27 celdas

Para 4.1 y 4.2: **E3** = falta de preparación/variables; un `NameError` técnico no remite al botón correcto. **E4** = respuesta de reto vacía o todavía en “Elige…”: `reto()` sí dice “Elige o escribe tu respuesta arriba y vuelve a ejecutar la celda con ▶”. **E5** = invitado, sin conexión o reto no disponible: ver matriz de mensajes más abajo. Se citan estas rutas en cada celda para no repetir todo el texto.

| Celda y gravedad | Instrucción, conocimiento previo o jerga | Riesgo de escribir código | Error posible y utilidad del mensaje |
| --- | --- | --- | --- |
| S01 · bloquea condicional | Repetir todo para cualquier anomalía no distingue preparar, explorar y enviar. “Funciona igual” omite que el invitado no recibe comprobación de retos. “Celda”, ID y acceso del cuaderno no se definen para quien nunca abrió Colab. | No pide Python, pero permite abrirlo por curiosidad sin decir que no hay que editarlo. | Recuperación sugerida demasiado amplia; puede volver a enviar entradas. Los pasos de acceso a secretos se leyeron; no se realizaron. |
| S26 · bloquea condicional | “Avance guardado” no distingue entrega, respuestas, retos y eventos sin enviar. “Eventos pendientes” es jerga del sistema. | Ante avisos repetidos podría intentar reparar algo técnico. | Si hay cola, indica reintentar; no explica preservar el entorno ni cuándo parar y contactar al profesor. No se verificó sincronización real. |
| S02 · confunde | “Prepara” expone configuración técnica que “no necesitas cambiar”. No anticipa espera, señal inequívoca de éxito o si está como alumno/invitado. | Puede confundir la clave pública del formulario con su clave personal o editar parámetros que no le corresponden. | Descarga fallida: mensaje útil, revisar internet, repetir y avisar al profesor. Fallo posterior de importación: no hay recuperación propia en esa celda. |
| S05 · confunde | “Hipótesis” aparece antes del glosario y no se traduce explícitamente como una explicación provisional. “Recuadro” no identifica la etiqueta `mi_razon`. | “Anota” podría interpretarse fuera del formulario; hace falta decir “texto normal”. | Sin error técnico; no indica si la razón es obligatoria para continuar o qué extensión basta. |
| S06 · confunde | La primera hipótesis viene preseleccionada; pulsar ▶ puede registrar “El miedo de las madres” sin una elección deliberada. `respuesta` y `mi_razon` son nombres técnicos. | Medio si confunde recuadro con código; la intención de formulario sí existe. | Si no escribe razón, el mensaje le permite volver y hacerlo: útil. El sello “APUESTA ANOTADA” también aparece con razón vacía; no es una evaluación. E3 si falta S02. |
| S07 · confunde | Presenta partos y muertes, pero no anuncia que la comparación requiere dividir muertes entre partos de cada clínica. | Bajo; no solicita cálculo manual explícito. | Sin ejecución ni autocotejo de la lectura. |
| S08 · confunde | “Tasa”, porcentajes y “2.6 veces” requieren distinguir proporción, diferencia y cociente. La explicación “de cada 100” ayuda en el pie, después de la tabla. | Puede creer que debe calcular las tasas antes de continuar. | E3 si no preparó. No se señala qué fila leer primero ni cómo comprobar una tasa con calculadora. |
| S09 · confunde | Primer contacto con bits, estrellas, puntos porcentuales implícitos y costo de oportunidad de varios intentos. Necesita restar tasas, no muertes. | El campo es una lista; no exige programar, pero falta confirmar que no debe añadir fórmulas. | E4 sí orienta; E5 limita comprobación. El enunciado explica que el primer acierto vale más, sin detallar la regla de cinco intentos. |
| S10 · confunde | “Mismo riesgo” y cada “mundo” se introducen intuitivamente, pero no se explica qué observar al mover el control ni cuándo basta. | Bajo si el control aparece. | Sin ejecución propia; si no hay control, no ofrece ruta alternativa aquí. |
| S11 · confunde | “Puntos porcentuales”, distribución de mundos y diferencia real no tienen ejemplo previo. “El azar no pasa de…” puede entenderse como límite universal, aunque es el máximo de una muestra simulada. | Alto si el control falla y quiere “simular más” cambiando `mundos`. | Si falla la creación del widget, hay gráfica fija sin explicación de la alternativa. Si falla durante su uso, puede haber error del widget. E3 si falta preparación. |
| S12 · confunde | “Revisa a cada sospechoso” no dice cuántos son ni cómo confirmar que ya vio todos. | Bajo; no debería tocar el diccionario de código. | Sin aviso por saltarse sospechosos. |
| S13 · confunde | Se abre una opción del selector, pero nada comprueba que haya leído las otras cuatro. “Hacinamiento” puede ser palabra nueva. | Si no aparece selector puede intentar cambiar la entrada en Python. | El fallback imprime los cinco: conserva el contenido, pero no explica que ya no necesita seleccionarlos. E3 si falta S02. |
| S14 · confunde | “Discute en grupo” no tiene alternativa individual; pide inferir lo que hacían antes los médicos, aunque esa información se revela en S17. | Puede pensar que debe escribir en esta celda, pues la siguiente tiene un formulario con otra pregunta. | No hay feedback inmediato ni aviso de que es válido decir qué dato falta en vez de adivinar. |
| S15 · confunde | “Explicación anotada” confirma texto; no confirma razonamiento. No declara cuándo revisa el profesor. | El formulario acepta texto normal, pero esa distinción no se explicita. | Vacío: sí dice que escriba y repita. Con texto: no hay tutoría al alumno implementada por `marca_llm()`. E3/E5 según sesión y guardado. |
| S16 · confunde | “Autopsia” y “bisturí” se usan sin breve aclaración; no están en el glosario final. | Ninguno: pide ejecutar la celda siguiente. | Sin error técnico; un desconocimiento de vocabulario no se detecta. |
| S18 · confunde | “Solución de cal clorada” presupone entender que es un desinfectante. Falta anticipar que verá datos mensuales y anuales en la misma salida. | Ninguno directo. | Sin ejecución propia. |
| S19 · confunde | Cambia de tasas de seis años a meses de 1847 y luego años completos; el alumno puede comparar períodos como si fueran equivalentes. “Menos de 3%” reaparece en S25, aunque el agregado mostrado de junio a diciembre es cerca de 3.04%. | Puede intentar corregir datos o hacer su propio cálculo sin saber qué período usar. | E3; no hay feedback de interpretación. La tarjeta sí pide considerar otras causas antes del reto: ayuda. |
| S20 · confunde | “Brecha” y grupo de comparación no están explicados como vocabulario. El alumno puede elegir la caída más espectacular en vez de la comparación más informativa. | Bajo: lista de opciones, sin código. | E4 orienta y la pista plantea una comparación concreta. E5 si no puede comprobar el reto. |
| S21 · confunde | “Tasa imaginada” puede confundirse con una predicción verdadera. No explica qué permanece fijo ni que es un escenario supuesto. | Puede pensar que debe inventar una fórmula para “salvadas”. | No hay comprobación de si entendió el supuesto. |
| S22 · confunde | La salida “madres salvadas” no dice en el título que son estimadas bajo una tasa hipotética. El cálculo recorta diferencias negativas a cero, así que una tasa peor puede seguir mostrando “0 salvadas”. | Alto si faltan controles y quiere modificar año o tasa directamente. | Fallback solo muestra año/tasa predeterminados; no explica cómo continuar. E3 si falta S02. La cifra contrafactual no es un conteo observado. |
| S23 · confunde | Requiere porcentaje, resta y redondeo; no autoriza calculadora ni indica cuándo redondear. “127” en la explicación de fuente frente a “126” con el 9.9% presentado puede parecer una corrección injustificada. | Puede creer que debe añadir una celda para la operación; el formulario solo espera un número. | E4 orienta; tolerancia declarada de 3 reduce el riesgo de rechazo por redondeo, pero no explica la discrepancia. E5; base real no consultada. |
| S24 · confunde | Pide ejemplo de transferencia sin estructura mínima: comparar qué grupos, qué práctica y cómo ponerla a prueba. “Con esto el caso queda completo” no distingue completar de aprobar. | “Escribe un ejemplo” debería apuntar expresamente al formulario S25. | No hay criterio de autocorrección aquí. |
| S25 · confunde | Basta texto no vacío para llamar al cierre; el sello puede parecer aprobación académica. La hipótesis inicial se recupera de variables de esta sesión, no de una lectura de la respuesta original guardada. | Bajo si sabe usar `mi_ejemplo`; alto si perdió su trabajo y trata de reconstruir variables. | Vacío: indica escribir y repetir, y no llama a completar. Con desconexión puede mostrar “Aún no se guardó”; la animación de cierre no garantiza entrega. E3 si falta preparación. |
| S03 · menor | “Solo lo ve tu profesor” no aclara “tú puedes pasar a la siguiente celda”. | Ninguno; ejecutar no debería ser una actividad del alumno. | Para alumno, `panel()` sí dice continuar; en invitado puede no mostrar salida. No es un bloqueo confirmado. |
| S04 · sin hallazgo | La fiebre puerperal se explica al introducirla y la decisión es concreta. “Asistente” no es un prerrequisito técnico. | Ninguno. | Texto de contexto; no necesita un mensaje de error. |
| S17 · sin hallazgo | Explica qué hacían médicos y parteras y conecta los pasos de la sospecha; el problema de vocabulario se origina en S16. | No pide modificar entradas. | E3 posible si se saltó preparación; no hay recuperación específica. Sin ejecución autorizada para comprobar salidas reales. |
| S27 · menor | Define términos útiles, pero la primera ayuda para “hipótesis nula” y “comparar proporciones” llega al final. “Distintas de verdad” puede sonar a certeza en vez de evidencia. | Ninguno. | Sin ejecución; conviene indicar antes que es consulta, no requisito de memorización. |

### Tiempo por sección de 4.1

| Sección | Celdas | Estimación del alumno |
| --- | --- | --- |
| Orientación y preparación | S01–S03 | 6–10 min |
| 1–2. Caso e hipótesis | S04–S06 | 4–6 min |
| 3. Las dos clínicas y reto 1 | S07–S09 | 5–7 min |
| 4. Azar y simulación | S10–S11 | 5–8 min |
| 5. Sospechosos, discusión y explicación | S12–S15 | 7–10 min |
| 6. Pista | S16–S17 | 3–4 min |
| 7. Revelación y reto 2 | S18–S20 | 5–7 min |
| 8. Laboratorio y reto 3 | S21–S23 | 6–9 min |
| 9. Transferencia y cierre | S24–S25 | 5–7 min |
| Verificar entrega y consultar glosario | S26–S27 | 3–5 min |
| **Total sin incidencias** | | **49–73 min** |

La intro enlazada suma alrededor de un minuto según la portada; no se cronometró. La fuente docente propone 50 minutos, plausible con acompañamiento y preparación resuelta, pero ajustado para una primera experiencia autónoma. La espera por acceso, red o revisión del profesor queda fuera del total.

## Caso 4.2: revisión de las 29 celdas

| Celda y gravedad | Instrucción, conocimiento previo o jerga | Riesgo de escribir código | Error posible y utilidad del mensaje |
| --- | --- | --- | --- |
| B01 · bloquea condicional | Misma recuperación de “reiniciar y ejecutar todo” y promesa de invitado de S01. La intro es externa; quien no la vio no tiene aquí el total inicial completo. | Puede abrir código sin necesitarlo; falta delimitar entradas de formulario frente a instrucciones. | Puede reenviar respuestas al intentar arreglar una gráfica. No se ejecutó ni configuró acceso. |
| B23 · bloquea condicional | “Mueve la mezcla” requiere un control operativo. No hay forma sin código de cambiar el 7% si se activa la alternativa fija. Dos porcentajes diferentes comparten el gráfico: reparto de solicitudes y tasa de admisión. | Alto: editar `porcentaje_ab` o la llamada a `laboratorio(7)` se vuelve la salida aparente. | `except` muestra un único escenario, sin decir que faltó el control ni cómo resolver B24. Fallos posteriores del widget también pueden dejar error sin recuperación. |
| B24 · bloquea condicional | “Desde qué porcentaje” requiere buscar el primer entero que supera, no un porcentaje cualquiera que ya sea mayor. Depende por completo de B23. | Alto si no hay control: el alumno puede intentar generar valores en código. | Con control operativo, el formato “entero sin %” es claro. E4 orienta; E5 impide comprobar. No tiene alternativa al control fallido. |
| B25 · bloquea condicional | Demo prometida sin enlace; hay que esperar al profesor. La tabla permite leer la analogía, no abrir la actividad. | Bajo; podría buscar el recurso en el repositorio sin saber hacerlo. | No hay aviso o alternativa si el profesor no compartió el enlace. No impide llamar al cierre, pero deja esta actividad inaccesible. |
| B28 · bloquea condicional | Igual que S26: la cola no es una entrega garantizada ni una copia en Drive. | Puede querer reparar el guardado con cambios técnicos. | “Todo guardado” o “eventos pendientes” no cubre perder el entorno; tampoco demuestra aciertos. Se inspeccionó el código, no la base. |
| B02 · confunde | Configuración técnica, nombres de campos y señal de éxito: mismos problemas de S02. “Taquería” es el nombre del paquete, pero no explica qué preparación habilita en este caso. | Riesgo de introducir su clave personal en el campo de clave pública. | El mensaje de descarga sí da pasos; errores de importación posteriores no. No se provocaron ni ejecutaron. |
| B04 · confunde | “Posgrado”, “decano asociado” y “brecha” pueden ser nuevos. Hace referencia a la diferencia vista en la intro; si se saltó, le falta esa referencia. | Ninguno. | No hay aviso si omitió la intro; la decisión sí está expresada. |
| B05 · confunde | “Hipótesis” no se traduce a conjetura provisional. No especifica extensión de razón ni que el recuadro es texto normal. | Medio si no reconoce el formulario siguiente. | No dice si una razón vacía es suficiente ni qué se revisará. |
| B06 · confunde | Viene seleccionado “Necesito más datos”; ejecutar sin elegir puede parecer una respuesta propia. Etiquetas `respuesta` y `mi_razon` en vez de preguntas completas. | Medio si cree que debe modificar la asignación. | Razón vacía: mensaje útil para completar y repetir. El sello aparece aun así. E3 si falta B02; guardado no significa razonamiento aprobado. |
| B07 · confunde | Cambia del total universitario a seis departamentos. Lo anuncia correctamente, pero necesita advertir que por eso cambiarán los porcentajes y que no se está reproduciendo exactamente el mismo universo. | Ninguno. | No hay verificación de que el alumno detectó el cambio de población. |
| B08 · confunde | Tabla con solicitudes, admitidos y tasas sin un ejemplo de “admitidos de cada 100 solicitudes de este grupo”. “Puntos” en el contador puede confundirse con aumento relativo. | Puede intentar recalcular porcentajes para reconciliarlos con la intro. | E3; el mensaje técnico no remite a B02. No hay error de cálculo confirmado por ejecución. |
| B09 · confunde | “No es casualidad” suena demostrado, aunque no se ha mostrado aquí una comprobación de incertidumbre. Puede confundir diferencia descriptiva con discriminación causal. | Ninguno. | No hay respuesta ni autocotejo que haga visible esa confusión. |
| B10 · confunde | “Si hay discriminación, debería verse dentro” puede entenderse como garantía de que separando departamentos ya se descarta cualquier sesgo. | Ninguno; la acción “toca las letras” sí es concreta. | No da criterio de cuántos departamentos revisar o registrar. |
| B11 · confunde | Muestra proporciones dentro de cada departamento, con tamaños distintos; “ganador” describe una tasa observada, no una certeza sobre trato justo. | Si no aparecen botones, puede intentar cambiar `depto` en Python. | El fallback dibuja los seis: preserva la comparación, pero no explica el cambio de modo. E3 si falta preparación. |
| B12 · confunde | Título “En 4 de 6…” describe las observaciones; faltaría pedir que identifique también las dos excepciones antes de B14. Los porcentajes se redondean a enteros. | Bajo; no requiere introducir código. | E3 si no hay datos. Ningún mensaje corrige automáticamente una lectura de “todas”. |
| B13 · confunde | “Ventaja” exige restar tasas, no admitidos absolutos. Bits e intentos tienen los mismos huecos de S09. | Bajo: selección A–F, no código. | E4 sí orienta; la pista explica la resta. E5 si no puede comprobar. |
| B14 · confunde | Dice que departamento por departamento “no les va peor”, aunque C y E contradicen la frase. “Discute en grupo” carece de ruta individual. | Puede escribir directamente en esta celda para objetar los datos. | No hay mensaje para quien encontró correctamente las excepciones; corre riesgo de desconfiar de su lectura. |
| B15 · confunde | No tiene una pregunta o estructura propia más allá de “Escribe tu explicación”. Falta criterio de suficiencia. | Medio: puede no saber si explicar la contradicción del texto o los datos. | Vacío: sí pide escribir y repetir. Texto presente: confirma guardado, sin evaluación socrática al alumno. E3/E5. |
| B16 · confunde | Cada círculo tiene posición y tamaño con significados diferentes. La explicación solo anuncia el tamaño antes de una salida con varias gráficas. | Ninguno directo. | No comprueba que distinga “solicitudes hechas por mujeres” de “mujeres admitidas”. |
| B17 · confunde | El eje vertical es proporción de solicitudes femeninas, no tasa de admisión de mujeres. Después, las barras dividen las solicitudes de **cada grupo** entre A–B y C–F: cambia el denominador. | Puede tratar de reconstruir cuentas porque parece un mismo porcentaje que cambia. | E3. No hay ayuda de lectura paso a paso; la inferencia incorrecta no genera error técnico. |
| B18 · confunde | “Promedio… pesado”, “mezcla” y paradoja de Simpson sin ejemplo de ponderación manual. La definición habla de una tendencia en cada grupo sin aclarar las excepciones de este conjunto. | Puede creer que debe construir el promedio para poder pasar. | Texto sin comprobación; el glosario llega después. |
| B19 · confunde | “Si todos solicitaran…” conserva tasas y cambia pesos, pero puede leerse como un experimento real o como predicción de lo que ocurriría al redistribuir solicitudes. “La brecha… no salía de cómo decidían” afirma más de lo que un ajuste descriptivo garantiza por sí solo. | Alto si quiere reproducir la mezcla sin comprender qué se mantiene fijo. | E3. La salida no exige una comprobación manual sencilla ni explicitar el supuesto de tasas fijas. |
| B20 · confunde | Pasa de “no había evidencia” a situar con certeza dónde estaba la desigualdad y cuál era “la decisión correcta”. El principiante puede convertir ausencia de evidencia en prueba de ausencia. | Ninguno. | Falta decir qué preguntas siguen abiertas con estos datos; no es un error técnico. |
| B21 · confunde | Transferencia a sucursales requiere distinguir número total de clientes de reparto por turno; no se define brevemente “qué parte” como proporción. | Bajo: lista de opciones. | E4 orienta y la pista conecta con el caso. E5 puede impedir saber si trasladó bien la idea. |
| B22 · confunde | “Las tasas… se quedan fijas” ayuda, pero no dice que se mantiene la mezcla interna dentro de A–B y C–F; mover la mezcla no cambia decisiones individuales. | Puede pensar que debe editar tasas en vez de usar el control. | No hay instrucción de cuántos escenarios probar ni de anotar el umbral antes de enviar. |
| B26 · confunde | La pregunta transferible es clara; falta una pauta mínima para el ejemplo: dos grupos, resultado, variable que separa y mezcla que revisaría. | “Escribe” debe remitir al formulario B27 para evitar crear celdas. | No explica cómo distinguir un ejemplo válido de una comparación cualquiera. |
| B27 · confunde | Cierre condicionado solo a texto no vacío; “Caso resuelto” puede interpretarse como aprobación. “No había sesgo” en el resumen es más absoluto que “no había evidencia” de B20. | Bajo con formulario; alto si intenta restaurar la hipótesis tras perder variables. | Vacío: pide ejemplo y no completa. Con fallo de guardado, la confirmación puede avisar aunque también aparezca el cierre animado. E3/E5; no se probó entrega. |
| B03 · menor | Panel destinado al profesor entre celdas estudiantiles. | Ninguno; basta indicar que puede saltarlo. | Para alumno autenticado dice que continúe; invitado puede no ver salida. |
| B29 · menor | “Variable de confusión”, “estratificar” y “tasa ajustada” tienen explicación al final; falta ofrecer la consulta cuando aparece la dificultad. `UCBAdmissions` parece un recurso que quizá deba abrir, aunque es una fuente. | No pide código, pero podría buscar cómo ejecutar R innecesariamente. | Sin error; conviene aclarar que las fuentes no son pasos de ejecución. |

### Tiempo por sección de 4.2

| Sección | Celdas | Estimación del alumno |
| --- | --- | --- |
| Orientación y preparación | B01–B03 | 6–10 min |
| 1–2. Caso e hipótesis | B04–B06 | 4–6 min |
| 3. Total de admisiones | B07–B09 | 4–6 min |
| 4. Departamentos, reto y explicación | B10–B15 | 8–12 min |
| 5. Pista y lectura de porcentajes | B16–B17 | 5–8 min |
| 6. Revelación, ajuste y transferencia | B18–B21 | 7–10 min |
| 7. Laboratorio y umbral | B22–B24 | 6–9 min |
| 8. Demo de las sucursales, si hay enlace | B25 | 3–5 min |
| 9. Ejemplo y cierre | B26–B27 | 4–6 min |
| Verificar entrega y glosario | B28–B29 | 3–5 min |
| **Total sin incidencias** | | **50–77 min** |

La intro externa agrega alrededor de un minuto según la portada. La estimación de B25 es una reserva de exploración, no una medición de esa demo no auditada. Un control que no funciona o un enlace no compartido dejan una espera sin límite definido. Los 50 minutos del plan docente requieren preparación previa, acompañamiento y ritmo de grupo.

## ¿Los mensajes de error dicen qué hacer?

Matriz obtenida **solo leyendo** `generador.py` y los métodos `conectar`, `reto`, `confirmar`, `estado`, `panel` y los fallbacks de controles. No se enviaron respuestas de prueba.

| Situación | Mensaje o comportamiento de fuente | ¿Le permite recuperarse a un principiante? |
| --- | --- | --- |
| Falta descargar el paquete | “No pude descargar el paquete del curso”; revisar conexión, repetir esa celda y avisar al profesor si persiste. | **Sí**, es específico. Falta orientar cuánto esperar antes de repetir. |
| ID o clave no coinciden | Indica revisar los datos en el panel correspondiente, sin comillas; ofrece tutorial en la tarjeta inicial. | **En buena parte sí**. Falta advertir antes que no debe cambiar los campos de configuración pública. Esta ruta no se probó. |
| Cuenta sin confirmar | Pide que el profesor resuelva la confirmación; incluye una referencia al paso del instalador. | **Sí para pedir ayuda**; el alumno no debe intentar ejecutar el instalador. |
| Preparación no ejecutada o sesión sin variables | `NameError` posible en las celdas posteriores. | **No**. Nombrar `tdd`, `ANUAL` o `DATOS` no indica el botón de preparación ni qué respuestas conviene preservar. |
| Reto vacío o lista en “Elige…” | Pide elegir/escribir arriba y ejecutar con ▶. | **Sí**. Evita consumir un intento vacío desde esta función. |
| Reto en invitado | “Reto sin comprobar”; explica que no puede informar acierto, permite seguir y remite al tutorial para contar avances. | **Parcialmente**. Aclara tarde que el modo no funciona igual para feedback. No garantiza recuperar respuestas previas al pasar a alumno. |
| Reto sin conexión o función no disponible | “Respuesta guardada sin comprobar”; distingue registro de cola y propone repetir después para ver acierto. | **Parcialmente**. No explica si repetir envía otro intento; cada nueva llamada construye un identificador nuevo. No se afirma cuál sería el efecto efectivo en la nota. |
| Reto sin respuesta cargada | Explica que la respuesta quedó registrada y el profesor debe cargar el reto. | **Sí para derivar al profesor**, pero no ofrece autocotejo mientras espera. |
| Respuesta abierta vacía | Hipótesis/explicación/cierre incluyen indicaciones para escribir y repetir; completar solo se llama si el ejemplo tiene texto. | **Parcialmente**. Los títulos y sellos pueden sonar a éxito aun con información incompleta. |
| Respuesta abierta incorrecta | Se registra texto no vacío; `marca_llm()` no evalúa para el alumno. | **No como feedback de aprendizaje**. Sí como confirmación de registro; necesita revisión docente o una pauta explícita. |
| Widget no creado | Algunos casos imprimen todos los escenarios; otros solo el predeterminado, sin avisar por qué falta el control. | **No en B23/B24**, donde hace falta explorar; parcial en S11/S22. |
| Eventos sin sincronizar | Indica cantidad, reintento y volver más tarde; si la cola está vacía, dice “Todo guardado”. | **Parcialmente**. La cola vacía no demuestra aprobación; preservar el entorno y resolver descartes no tiene pasos claros. |
| Eventos descartados | `estado()` informa cuántos eventos no válidos se descartaron. | **No**. No identifica qué respuesta afectó ni qué debe recuperar o comunicar al profesor. |

## Verificación del informe y evaluación pedagógica acotada

La rúbrica local usada es [Pedagogy Eval Reviewer](../../.agents/skills/pedagogy-eval-reviewer/SKILL.md), junto con [Eval Suite](../EVAL_SUITE.md), [rúbrica](../../evals/rubric.md) y las listas de progresión, pedagogía, exactitud y consistencia documental. Esta revisión **no aprueba ni reprueba estética, historia o el curso completo**. Tampoco modifica materiales para hacer pasar un validador: el alcance autorizado es documentar obstáculos.

| Dimensión aplicable | Puntaje de revisión | Evidencia y corrección requerida |
| --- | --- | --- |
| Progresión y prerrequisitos operativos | 2/5 | W01/W03, S01/S02 y B01/B02 suponen reconocer celdas, formularios y recuperación. Explicar la primera acción y el estado esperado sin editar Python. |
| Claridad de medidas y conclusiones | 3/5 | W04/W11, S11/S23, B14/B17/B19. Aclarar denominadores, aproximación y límites; reconciliar texto con las excepciones de los datos. |
| Práctica y autonomía | 2/5 | W09/W14 sin destino de respuesta; B23/B24 sin alternativa al control y B25 sin enlace. Indicar dónde responder y una salida practicable sin código. |
| Feedback y cierre | 2/5 | S15/S25/S26 y B15/B27/B28: registrar, comprobar y aprobar no son equivalentes. Nombrar cada estado y la acción siguiente. |
| Viabilidad de la revisión documental | 5/5 | Un solo informe nuevo, 70 celdas cubiertas, fuentes fijadas y backend exclusivamente leído. No exige cambiar infraestructura para revisar. |

Promedio de las cuatro dimensiones del material: **2.25/5**. La quinta evalúa el alcance de este trabajo y no se suma al puntaje pedagógico. **No listo para autonomía plena con este perfil**, por los bloqueos descritos; no implica que el código de Wald falle ni que el material no pueda impartirse con docente. Las demás dimensiones de la rúbrica quedan fuera de alcance, sin nota inventada.

Validación técnica disponible: `python -m harness all` pasó sobre la copia aislada de la base inspeccionada: validación de contratos, construcción de 658 archivos, revisión de enlaces y smoke de 28 páginas por ruta en `/` y `/mvp-ds-course/`. Los artefactos de construcción se generaron solo en directorios temporales de esa copia. Estos checks **no ejecutan ni califican los cuadernos de 4.1/4.2 y no certifican la experiencia de Colab**. Después de añadir el informe, se verifica cobertura de las 70 celdas, Markdown básico, único archivo nuevo y ausencia de cambios en fuentes existentes.

Siguiente vertical slice recomendada: un adulto principiante recibe una copia de Wald con datos ya disponibles; identifica qué ejecutar, lee un porcentaje, selecciona blindaje, registra dos respuestas y explica su decisión. Salida: respuestas en lenguaje común y una ruta de recuperación sin editar código. Prueba manual: que lo termine sin ayuda de programación y sepa dónde quedó su trabajo; criterio de aceptación: ninguna acción ambigua sobre dónde escribir o qué repetir. No objetivos: rediseñar la historia, cambiar estética, introducir servicios o usar la base de calificación para ensayar. Esta slice se recomienda; **no se implementó** en este PR.

## Los 5 cambios que más ayudarían

1. **Explicar el manejo mínimo y el destino de cada respuesta.** Una instrucción común: qué es una celda, qué botón usar, cómo saber que terminó y que solo se escribe texto o números en campos indicados. Para W09/W14, proporcionar un destino inequívoco para las respuestas; señalar cómo confirmar el cierre y qué hacer si no aparece el selector de W08. Sin pedir añadir ni editar código.
2. **Dar una recuperación según el problema y aclarar los estados de entrega.** Sustituir la indicación universal de ejecutar todo por pasos distintos para preparar, repetir una gráfica, reenviar un reto y sincronizar. Explicar desde el inicio invitado/alumno, guardado/comprobado/aprobado, bits e intentos y cuándo pedir ayuda antes de cerrar con eventos sin enviar.
3. **Garantizar una ruta sin código cuando faltan controles o recursos.** Prioridad B23/B24: alternativa que permita explorar el porcentaje y resolver el reto, con aviso de que no cargó el control. Indicar los datos necesarios para Wald offline y dar el enlace de B25 o una alternativa explícita si no está disponible.
4. **Enseñar a leer las medidas justo antes de usarlas.** Un ejemplo corto de “de cada 100”, porcentaje frente a puntos porcentuales, promedio con pesos y denominador de cada gráfica. Explicar el cambio de unidad W05→W11, qué se mantiene fijo en los laboratorios y que se permite calculadora en S23, sin crear una celda de Python.
5. **Hacer coincidir enunciados, datos y feedback de aprendizaje.** Aclarar las dos excepciones C/E de Berkeley, los límites de la simulación y de “no hay evidencia”, y que las vidas estimadas son un escenario. Explicar el redondeo de S23 y ofrecer una pauta breve para hipótesis, explicación y transferencia, distinguiendo esa revisión de la mera confirmación de guardado.
