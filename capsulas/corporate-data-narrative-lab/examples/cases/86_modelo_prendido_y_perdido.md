# El modelo prendido y perdido

<!-- story
concept: monitoreo de desempeño y drift
characters: Tania, Eder, Raquel, el gerente de plataforma
situation: un servicio de predicción reporta disponibilidad perfecta mientras sus aciertos caen
bad_logic: confundir que la API responde con que el modelo sigue funcionando bien
escalation: clientes reciben recomendaciones peores durante meses sin activar ninguna alerta
data_turn: Tania junta disponibilidad, cambio de entradas y desempeño con etiquetas tardías
chart: Disponibilidad y precisión después del cambio de catálogo
decision: monitorear servicio, datos y resultado; activar revisión ante drift sostenido
punchline: El modelo nunca se cayó; nomás dejó de saber dónde estaba parado.
rule: monitorea que el sistema responda, que los datos sean comparables y que la decisión siga funcionando
synthetic_data: true
-->

## Cien por ciento disponible

> **el gerente de plataforma:** "La API tuvo 100% de disponibilidad este trimestre."

> **Tania:** "La precisión de recomendaciones cayó de 72% a 49%."

> **Eder:** "Eso no aparece en infraestructura."

> **Raquel:** "Aparece en clientes que ignoran la primera opción."

> **el gerente de plataforma:** "¿Cuándo empezó?"

> **Tania:** "Después de cambiar categorías y retirar 18% del catálogo."

El tablero de plataforma estaba completamente verde. En otro sistema, la tasa de aceptación llevaba doce semanas bajando sin que ambos equipos hubieran colocado las curvas en la misma conversación.

## Recomendaciones viejas

> **Eder:** "Podemos reiniciar el servicio."

> **Tania:** "El servicio responde; no está enfermo de memoria."

> **Raquel:** "Sigue recomendando productos que ya no tienen sustituto."

> **el gerente de plataforma:** "¿No medíamos cambios en las entradas?"

> **Eder:** "Medíamos nulos y latencia, no distribución de categorías."

> **Tania:** "Tampoco esperábamos etiquetas para medir acierto real."

Reiniciar era el remedio habitual para un servicio caído, pero aquí cada solicitud recibía respuesta. El problema estaba en el mundo que la respuesta intentaba representar: el catálogo ya era otro.

## Tres señales

> **Tania:** "Puse juntas disponibilidad, drift de categorías y precisión semanal."

> **Raquel:** "La API permanece arriba mientras la precisión baja 23 puntos."

> **Eder:** "El drift cruza el límite la semana del nuevo catálogo."

> **el gerente de plataforma:** "Esa combinación sí debió abrir una revisión."

> **Tania:** "Podemos reentrenar y evaluar contra una regla de respaldo."

Las tres señales contaron una secuencia coherente. Primero cambió la mezcla de categorías; después bajó la precisión; durante todo el periodo, la disponibilidad siguió perfecta y por eso nunca activó una alerta.

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="Disponibilidad y precisión después del cambio de catálogo">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">Disponibilidad y precisión después del cambio de catálogo</text>
  <line x1="48" y1="250" x2="672" y2="250" stroke="#777" stroke-width="2"/>
  <rect x="60" y="135" width="184" height="115" fill="#286d9b"/>
  <text x="152" y="125" font-size="17" text-anchor="middle">72 %</text>
  <text x="152" y="278" font-size="12" text-anchor="middle">precisión anterior</text>
  <rect x="268" y="172" width="184" height="78" fill="#d58b2f"/>
  <text x="360" y="162" font-size="17" text-anchor="middle">49 %</text>
  <text x="360" y="278" font-size="12" text-anchor="middle">precisión actual</text>
  <rect x="476" y="90" width="184" height="160" fill="#4c8b63"/>
  <text x="568" y="80" font-size="17" text-anchor="middle">100 %</text>
  <text x="568" y="278" font-size="12" text-anchor="middle">disponibilidad</text>
  <text x="36" y="308" font-size="13" fill="#9f3625">Una API disponible puede servir predicciones que ya no funcionan.</text>
</svg>

<!-- learning:pause -->
> **Raquel:** "¿Qué señal muestra que el modelo falla aunque el servicio siga disponible?"

**Lo que muestra:** La disponibilidad solo confirma que la API responde. Después del cambio de catálogo, el drift de categorías aumenta y la precisión cae de 72% a 49%. Monitorear servicio, entradas y resultados permite distinguir una falla técnica de un modelo que envejeció.

## Una alerta que importa

> **el gerente de plataforma:** "Activaremos monitoreo en tres capas."

> **Eder:** "Servicio para latencia y errores; datos para cambios de entrada."

> **Raquel:** "Resultado para aceptación y compra cuando maduren etiquetas."

> **Tania:** "Y una alarma solo cuando exista una acción y un responsable."

> **el gerente de plataforma:** "Mientras reentrenamos, usaremos populares disponibles por categoría."

> **Tania:** "Después de ajustar monitoreo de desempeño y drift, ¿qué podría cambiar la decisión?"

> **Eder:** "Toca monitorear servicio, datos y resultado; activar revisión ante drift sostenido; si cambia el dato, volvemos a decidir."

> **Eder:** "El modelo nunca se cayó; nomás dejó de saber dónde estaba parado."

**Regla:** monitorea que el sistema responda, que los datos sean comparables y que la decisión siga funcionando.
