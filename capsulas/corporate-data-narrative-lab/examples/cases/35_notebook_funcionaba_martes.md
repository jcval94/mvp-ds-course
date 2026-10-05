# La libreta que funcionaba el martes

<!-- story
concept: setup reproducible en Google Colab
characters: Lau, Oscar, Mina, la profe
situation: un notebook de Colab depende de instalaciones y archivos temporales no documentados
bad_logic: si corrio una vez, el entorno ya esta listo
escalation: la clase no puede reproducir resultados porque faltan paquetes, rutas y versiones
data_turn: Lau compara ejecuciones con y sin celda de setup
chart: dependencias y versiones
decision: agregar celda inicial de instalacion, versionado, carga de datos y verificacion
punchline: El notebook no estaba roto; estaba viviendo en el martes de Oscar.
rule: un notebook compartido debe construir su entorno antes de contar su historia
synthetic_data: true
-->

## Corria en mi compu

> **Lau:** "En mi Colab corre perfecto."

> **Oscar:** "En el de la mitad del grupo no abre datos."

> **Mina:** "Seguro no ejecutaron en orden."

> **Lau:** "O el orden no instala lo que necesita."

> **Mina:** "Yo lo probe antes de clase."

> **la profe:** "Con tus archivos montados y tus paquetes vivos."

La clase no puede reproducir resultados porque faltan paquetes, rutas y versiones. El atajo dejó de parecer pequeño cuando otra área tuvo que absorber su consecuencia durante el mismo turno.

## El martes como dependencia

> **Mina:** "Les digo que reinicien el entorno."

> **Oscar:** "Reiniciar borra justo lo que lo hacia funcionar."

> **Mina:** "Entonces que nadie cierre la pestana."

> **la profe:** "La materia no puede depender de una pestana heroica."

> **Mina:** "Podemos mandar capturas del resultado."

> **Lau:** "Eso ensena a mirar, no a reproducir."

> **Oscar:** "La clase no puede reproducir resultados porque faltan paquetes, rutas y versiones."

> **la profe:** "Quiero ver dependencias y versiones antes de decidir."

Lau compara ejecuciones con y sin celda de setup. Con ambos resultados a la vista, la discusión pasó de opiniones generales a una diferencia que podía señalarse.

## Setup primero, magia despues

> **Lau:** "Probe la libreta desde entorno limpio."

> **la profe:** "Que falla antes del analisis."

> **Lau:** "Faltan paquetes, ruta de datos y version de libreria."

> **Oscar:** "Ahora entiendo por qué si corrio una vez, el entorno ya esta listo."

> **Lau:** "Respondía otra pregunta; no servía para agregar celda inicial de instalacion, versionado, carga de datos y verificacion."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="dependencias y versiones">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">dependencias y versiones</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="191" width="124" height="69" fill="#286d9b"/>
  <text x="132" y="181" font-size="18" text-anchor="middle">38</text>
  <text x="132" y="286" font-size="13" text-anchor="middle">sin setup</text>
  <rect x="222" y="147" width="124" height="113" fill="#d58b2f"/>
  <text x="284" y="137" font-size="18" text-anchor="middle">62</text>
  <text x="284" y="286" font-size="13" text-anchor="middle">con paquetes</text>
  <rect x="374" y="118" width="124" height="142" fill="#4c8b63"/>
  <text x="436" y="108" font-size="18" text-anchor="middle">78</text>
  <text x="436" y="286" font-size="13" text-anchor="middle">con datos</text>
  <rect x="526" y="85" width="124" height="175" fill="#c64e36"/>
  <text x="588" y="75" font-size="18" text-anchor="middle">96</text>
  <text x="588" y="286" font-size="13" text-anchor="middle">verificado</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">El entorno limpio revela dependencias invisibles.</text>
</svg>

<!-- learning:pause -->
> **Oscar:** "Que debe incluir la primera celda de Colab para que otra persona pueda correr el ejemplo."

**Lo que muestra:** La evidencia compara ejecuciones con entorno heredado y limpio. Un setup reproducible instala dependencias, fija versiones clave, descarga o monta datos y verifica rutas. En Colab, el entorno es parte del ejemplo.

## La libreta aprende a presentarse

> **la profe:** "La primera celda prepara todo y falla con mensaje claro."

> **la profe:** "Dejen por escrito quién va a agregar celda inicial de instalacion, versionado, carga de datos y verificacion."

> **Mina:** "La libreta tarda un minuto mas en arrancar."

> **Lau:** "Y deja de necesitar el martes de Oscar."

> **Lau:** "¿Qué cambiaremos después de revisar dependencias y versiones?"

> **Oscar:** "La decisión es agregar celda inicial de instalacion, versionado, carga de datos y verificacion."

> **Mina:** "Y volvemos a medir setup reproducible en Google Colab antes del siguiente cierre."

> **Oscar:** "El notebook no estaba roto; estaba viviendo en el martes de Oscar."

**Regla:** un notebook compartido debe construir su entorno antes de contar su historia.
