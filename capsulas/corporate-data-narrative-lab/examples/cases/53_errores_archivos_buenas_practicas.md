# El archivo que desaparecia sin avisar

<!-- story
concept: manejo de errores, archivos y buenas practicas
characters: Dana, Ruben, Silvia, la jefa
situation: Programacion en Python se enseña mediante una decision practica que necesita codigo o datos bien definidos
bad_logic: si el archivo existe hoy, el codigo no necesita manejar fallas
escalation: el proceso falla en silencio cuando cambia la ruta o falta una columna
data_turn: una persona compara el atajo contra una version verificable
chart: corridas con errores visibles y silenciosos
decision: validar rutas, manejar excepciones y registrar mensajes utiles
punchline: El script no fallo misteriosamente; fallo con mucha discrecion.
rule: un buen script espera fallas comunes y las explica con mensajes utiles
synthetic_data: true
-->

## Ayer corria

> **Dana:** "El script dejo de generar el reporte."

> **Ruben:** "No dejo mensaje de error."

> **Silvia:** "Entonces tal vez si corrio."

> **Dana:** "Si corrio, donde esta el archivo."

> **Silvia:** "Ayer estaba en la misma carpeta."

> **la jefa:** "Hoy la carpeta cambio y el script no aviso."

El proceso falla en silencio cuando cambia la ruta o falta una columna. El grupo avanzó hasta que un cambio mínimo produjo un número distinto y no quedó claro si era error, excepción o regla.

## El silencio tambien es error

> **Silvia:** "Le decimos al equipo que no mueva nada."

> **Ruben:** "Esa no es buena practica, es deseo."

> **Silvia:** "Podemos poner un letrero de no tocar."

> **la jefa:** "El sistema no lee letreros pegados al monitor."

> **Silvia:** "Al menos fallo rapido."

> **Dana:** "Fallo rapido y sin explicar."

> **Ruben:** "El proceso falla en silencio cuando cambia la ruta o falta una columna."

> **la jefa:** "Enséñame corridas con errores visibles y silenciosos antes de cerrar."

El grupo puso corridas con errores visibles y silenciosos junto al resultado anterior. La evidencia separó cada etapa del procedimiento y permitió corregir una sola parte sin rehacer todo el ejercicio.

## Preguntar antes de caer

> **Dana:** "Revise corridas con validacion de ruta y columnas."

> **la jefa:** "Que cambio cuando capturamos errores."

> **Dana:** "Los fallos dejaron de ser adivinanzas."

> **Ruben:** "Entonces debemos validar rutas, manejar excepciones y registrar mensajes utiles."

> **Dana:** "Un buen script espera fallas comunes y las explica con mensajes utiles."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="corridas con errores visibles y silenciosos">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">corridas con errores visibles y silenciosos</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="209" width="174" height="51" fill="#286d9b"/>
  <text x="157" y="199" font-size="18" text-anchor="middle">28</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">silencioso</text>
  <rect x="272" y="120" width="174" height="140" fill="#d58b2f"/>
  <text x="359" y="110" font-size="18" text-anchor="middle">76</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">mensaje</text>
  <rect x="474" y="85" width="174" height="175" fill="#4c8b63"/>
  <text x="561" y="75" font-size="18" text-anchor="middle">95</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">validacion</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">Los errores utiles reducen tiempo de diagnostico.</text>
</svg>

<!-- learning:pause -->
> **Ruben:** "Que tipo de errores conviene anticipar al leer y escribir archivos."

**Lo que muestra:** La evidencia compara fallas silenciosas con fallas explicadas. Validar rutas, columnas y permisos permite detener el proceso con un mensaje util. Manejar errores no oculta problemas; los vuelve accionables.

## Fallar con instrucciones

> **la jefa:** "El script validara entrada y escribira mensajes claros."

> **Silvia:** "Habra mas lineas que no calculan nada."

> **Dana:** "Pero diran que hacer cuando algo falte."

> **Dana:** "¿Qué cambiaremos después de revisar corridas con errores visibles y silenciosos?"

> **Ruben:** "La decisión es validar rutas, manejar excepciones y registrar mensajes utiles."

> **Silvia:** "Y volvemos a medir manejo de errores, archivos y buenas practicas antes del siguiente cierre."

> **Silvia:** "También registraremos el archivo fallido sin esconder la causa del error."

> **la jefa:** "Un mensaje claro dirá qué archivo faltó y qué puede hacer la persona."

> **Ruben:** "El script no fallo misteriosamente; fallo con mucha discrecion."

**Regla:** un buen script espera fallas comunes y las explica con mensajes utiles.
