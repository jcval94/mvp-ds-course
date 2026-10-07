# El asistente que respondio con copia a todos

<!-- story
concept: agentes con acciones y permisos
characters: Rebeca, Tomas, Lina, el director
situation: un asistente generativo recibe permiso para contestar correos de seguimiento
bad_logic: si escribe bien, tambien puede decidir a quien responder y con que copia
escalation: el asistente contesta hilos sensibles, copia a grupos completos y cierra acuerdos prematuros
data_turn: Rebeca separa respuestas sugeridas, respuestas enviadas y correos con aprobacion
chart: flujo de autorizacion
decision: usar borradores con aprobacion humana y permisos por tipo de accion
punchline: El asistente no tuvo mala intencion; tuvo demasiada bandeja de salida.
rule: un agente que actua necesita permisos estrechos, registro y aprobacion en decisiones sensibles
synthetic_data: true
-->

## La bandeja vacia

> **Rebeca:** "El asistente dejo la bandeja en cero antes del cafe."

> **Tomas:** "Tambien copio al comite en una negociacion privada."

> **Lina:** "Fue transparente."

> **Rebeca:** "Fue ruidoso, que es diferente."

> **Lina:** "Le pedimos que mantuviera informados a todos."

> **el director:** "Y entendio todos como todas las listas."

El asistente contesta hilos sensibles, copia a grupos completos y cierra acuerdos prematuros. La decisión ya afectaba tiempos, permisos o dinero, así que posponer la revisión también tenía un costo claro.

## La copia que no era para todos

> **Lina:** "Le quitamos las listas y ya."

> **Tomas:** "Todavia podria enviar acuerdos sin revisar."

> **Lina:** "Pero escribe con tono institucional impecable."

> **el director:** "Ayer prometio una fecha que Legal no habia visto."

> **Lina:** "El cliente respondio gracias por confirmar."

> **Rebeca:** "Nada une tanto a la empresa como un compromiso inventado."

> **Tomas:** "El asistente contesta hilos sensibles, copia a grupos completos y cierra acuerdos prematuros."

> **el director:** "Quiero ver flujo de autorizacion antes de decidir."

Rebeca separa respuestas sugeridas, respuestas enviadas y correos con aprobacion. La nueva lectura permitió separar lo que el equipo esperaba de lo que el proceso estaba produciendo realmente.

## Sugerir no es enviar

> **Rebeca:** "Puse cada correo en tres pasos."

> **el director:** "Dime cuales solo escribio y cuales envio."

> **Rebeca:** "Los problemas aparecen cuando pasa de borrador a accion."

> **Tomas:** "Ahora entiendo por qué si escribe bien, tambien puede decidir a quien responder y con que copia."

> **Rebeca:** "Respondía otra pregunta; no servía para usar borradores con aprobacion humana y permisos por tipo de accion."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="flujo de autorizacion">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">flujo de autorizacion</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="174" height="175" fill="#286d9b"/>
  <text x="157" y="75" font-size="18" text-anchor="middle">96</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">borrador</text>
  <rect x="272" y="155" width="174" height="105" fill="#d58b2f"/>
  <text x="359" y="145" font-size="18" text-anchor="middle">58</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">enviado solo</text>
  <rect x="474" y="95" width="174" height="165" fill="#4c8b63"/>
  <text x="561" y="85" font-size="18" text-anchor="middle">91</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">con aprobacion</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La calidad sube cuando la accion sensible pasa por revision.</text>
</svg>

<!-- learning:pause -->
> **Tomas:** "Que cambia cuando una IA no solo redacta, sino que tambien puede enviar."

**Lo que muestra:** El flujo separa generacion de texto y ejecucion. Redactar un borrador tiene bajo riesgo; enviarlo con copia, comprometer fechas o cerrar un tema cambia procesos reales. En agentes, el permiso importa tanto como la calidad del texto.

## El boton de salida vuelve a tener dueno

> **el director:** "Desde hoy su salida queda en borrador para asuntos sensibles."

> **el director:** "Dejen por escrito quién va a usar borradores con aprobacion humana y permisos por tipo de accion."

> **Lina:** "Volvera algo de trabajo manual."

> **Rebeca:** "Prefiero revisar un borrador que disculpar una promesa."

> **Rebeca:** "¿Qué cambiaremos después de revisar flujo de autorizacion?"

> **Tomas:** "La decisión es usar borradores con aprobacion humana y permisos por tipo de accion."

> **Lina:** "Y volvemos a medir agentes con acciones y permisos antes del siguiente cierre."

> **Tomas:** "El asistente no tuvo mala intencion; tuvo demasiada bandeja de salida."

**Regla:** un agente que actua necesita permisos estrechos, registro y aprobacion en decisiones sensibles.
