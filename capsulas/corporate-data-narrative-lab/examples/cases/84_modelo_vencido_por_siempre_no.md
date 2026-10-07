# El modelo vencido por siempre no

<!-- story
concept: líneas base y valor incremental del modelo
characters: Berenice, Raúl, Gaby, el director de calidad
situation: un equipo celebra un modelo complejo sin compararlo con una regla sencilla
bad_logic: suponer que cualquier métrica positiva supera el proceso actual
escalation: se cotiza infraestructura para un modelo que apenas mejora la decisión trivial
data_turn: Berenice compara modelo, regla actual y predicción mayoritaria con costo operativo
chart: Errores evitados frente a líneas base
decision: probar primero una regla interpretable y exigir valor adicional al modelo complejo
punchline: El modelo llegó con servidor propio y perdió contra decir todavía no.
rule: todo modelo debe superar una línea base relevante en la métrica que importa
synthetic_data: true
-->

## Un F1 elegante

> **Raúl:** "El modelo obtiene F1 de 0.71 y necesita una instancia con GPU."

> **Berenice:** "¿Cuánto obtiene la regla actual?"

> **Gaby:** "No la medimos porque no es modelo."

> **el director de calidad:** "Pero es lo que usamos todos los días."

> **Raúl:** "La red encuentra patrones más complejos."

> **Berenice:** "Primero debe encontrar más valor que dos condiciones escritas."

La conversación había empezado por arquitectura, memoria y tiempo de inferencia. Nadie había puesto en la mesa el procedimiento actual, aunque ese procedimiento era el verdadero competidor del nuevo sistema.

## La regla de dos campos

> **Gaby:** "La regla rechaza si faltan documento y firma."

> **Raúl:** "Eso es demasiado simple."

> **Berenice:** "También evita 83 de cada cien errores costosos."

> **el director de calidad:** "¿Y el modelo?"

> **Gaby:** "Evita 85, pero manda el doble de casos a revisión."

> **Raúl:** "La diferencia podría crecer con más datos."

La regla sencilla no resolvía todos los casos, pero tenía dos ventajas concretas: ya existía en el momento de decisión y sus errores podían explicarse sin abrir un entorno de cómputo.

## Competir contra algo

> **Berenice:** "Comparé errores evitados, revisiones y costo mensual."

> **Gaby:** "La regla queda casi igual y cuesta una décima parte."

> **Raúl:** "La red gana dos casos, pero genera 600 revisiones extra."

> **el director de calidad:** "Eso no paga la infraestructura."

> **Berenice:** "Podemos usar la regla como base y probar mejoras focalizadas."

Al sumar revisiones e infraestructura, los dos errores adicionales evitados dejaron de parecer una victoria. La línea base convirtió entusiasmo técnico en una comparación de valor operativo.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Errores evitados frente a líneas base">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Errores evitados frente a líneas base</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="152" width="184" height="98" fill="#286d9b"/>
  <text x="152" y="142" font-size="17" text-anchor="middle">52 errores evitados</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">siempre no</text>
  <rect x="268" y="94" width="184" height="156" fill="#d58b2f"/>
  <text x="360" y="84" font-size="17" text-anchor="middle">83 errores evitados</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">regla simple</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">85 errores evitados</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">modelo complejo</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Dos aciertos extra no compensan costo y carga adicionales.</text>
</svg>

<!-- learning:pause -->
> **Gaby:** "¿Qué alternativa evita más costo total cuando incluimos revisiones e infraestructura?"

**Lo que muestra:** El modelo complejo evita 85 de cada cien errores costosos frente a 83 de la regla, pero duplica revisiones y cuesta diez veces más. La mejora técnica no compensa el costo operativo. Una línea base relevante establece el mínimo que la complejidad debe superar.

## Ganar el derecho a complicar

> **el director de calidad:** "Implementamos la regla documentada este mes."

> **Raúl:** "Mantendré el modelo como experimento, sin producción."

> **Gaby:** "La siguiente versión competirá contra costo total."

> **Berenice:** "Y contra una base simple calculada con el mismo periodo."

> **el director de calidad:** "La complejidad tendrá que ganar su presupuesto."

> **Berenice:** "Sobre líneas base y valor incremental del modelo, ¿qué dato revisamos en el siguiente corte?"

> **Raúl:** "Primero vamos a probar primero una regla interpretable y exigir valor adicional al modelo complejo; luego comparamos el resultado."

> **Raúl:** "El modelo llegó con servidor propio y perdió contra decir todavía no."

**Regla:** todo modelo debe superar una línea base relevante en la métrica que importa.
