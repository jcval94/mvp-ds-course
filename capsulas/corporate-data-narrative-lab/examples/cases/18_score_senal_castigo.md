# El score que pasó de alerta a castigo

<!-- story
concept: riesgo de automatización, falsos positivos y revisión humana
characters: Sara, Martín, Paula, el director
situation: un score creado para priorizar revisión termina bloqueando automáticamente a personas
bad_logic: si la señal sirve para investigar también sirve para decidir sin revisión
escalation: se elimina el paso humano, aumentan bloqueos incorrectos y nadie sabe cómo apelar
data_turn: Sara separa riesgo estimado, revisión y resultado final
chart: flujo de decisiones y tasa de errores con y sin revisión
decision: restaurar revisión humana, motivos y apelación
punchline: El score era una alarma; alguien lo contrató de juez.
rule: una señal para investigar no debe convertirse sola en una condena
synthetic_data: true
-->

## El paso que sobraba

> **El director:** "Automatizamos el bloqueo. Ya no necesitamos que una persona revise cada alerta."
>
> **Sara:** "El score se diseñó para priorizar casos."
>
> **Martín:** "Y prioriza muy bien."
>
> **Paula:** "No es lo mismo priorizar que bloquear."
>
> **Martín:** "Pero si el riesgo es alto, la decisión es obvia."
>
> **Sara:** "¿Qué tan alto?"
>
> **Martín:** "Más de ochenta."
>
> **Paula:** "¿Ochenta qué?"
>
> **Martín:** "Puntos de riesgo."
>
> **El director:** "La gente pedía velocidad. Quitamos el paso lento."

La revisión humana tardaba entre dos y cuatro horas. El área tenía presión para
bajar costos y el proveedor describía el score como “listo para decisiones en
tiempo real”. En el contrato, la palabra `apoyo` estaba. Nada más no llegó a la
configuración.

## La llamada de Paula

> **Paula:** "Tengo treinta y siete personas bloqueadas por cambiar de teléfono."
>
> **Martín:** "Cambiar de dispositivo sube el riesgo."
>
> **Paula:** "También mudarse, viajar y comprar una computadora."
>
> **El director:** "¿Cuántos bloqueos son incorrectos?"
>
> **Sara:** "Sin revisión, diecinueve de cada cien."
>
> **Martín:** "Pero detenemos más casos malos."
>
> **Paula:** "Y para apelar les pedimos entrar a la cuenta bloqueada."
>
> **El director:** "Eso no puede ser."
>
> **Paula:** "Está documentado."
>
> **El director:** "Eso lo hace peor, Paula."
>
> **Sara:** "También encontramos personas que llevan tres días esperando respuesta."
>
> **Martín:** "El tiempo de atención sí mejoró."
>
> **Paula:** "Porque el caso se cierra cuando se manda el bloqueo."
>
> **El director:** "Claro. Para nosotros terminó rapidísimo."

La automatización había reducido tiempo y también había eliminado el único
momento donde alguien podía notar que una señal razonable tenía una explicación
normal.

## Señal, revisión y decisión

> **Sara:** "Comparé el flujo automático con el flujo que revisaba contexto."
>
> **El director:** "¿Qué cambia?"
>
> **Sara:** "La revisión baja los bloqueos incorrectos de diecinueve a cinco por ciento."

<svg data-chart="central" viewBox="0 0 720 310" role="img" aria-label="Bloqueos incorrectos con decisión automática y con revisión humana">
  <rect width="720" height="310" fill="#fff"/>
  <text x="35" y="30" font-size="18" font-weight="bold">Bloqueos incorrectos por cada 100 alertas</text>
  <line x1="90" y1="250" x2="650" y2="250" stroke="#777"/>
  <rect x="175" y="70" width="155" height="180" fill="#c64e36"/>
  <rect x="410" y="202" width="155" height="48" fill="#4c8b63"/>
  <text x="225" y="60" font-size="20">19</text>
  <text x="475" y="192" font-size="20">5</text>
  <text x="175" y="278" font-size="14">bloqueo automático</text>
  <text x="415" y="278" font-size="14">con revisión humana</text>
  <text x="355" y="105" font-size="14" fill="#9f3625">La señal necesita contexto.</text>
</svg>

<!-- learning:pause -->
> **Paula:** "Si el score solo estima riesgo, ¿qué debe pasar antes de afectar a una persona?"

**Lo que muestra:** El score ordena dónde revisar, pero no prueba culpabilidad.
La revisión humana reduce falsos positivos y permite explicar casos normales.
También hacen falta motivos visibles y una vía de apelación.

## Volvió el paso que sobraba

> **El director:** "Restauramos revisión para decisiones de alto impacto y abrimos apelación por otro canal."
>
> **Martín:** "Va a ser más lento."
>
> **Sara:** "Sí. También va a dejar de castigar gente por comprarse un teléfono."
>
> **Paula:** "El score era una alarma; alguien lo contrató de juez."

**Regla:** Una señal para investigar no debe convertirse sola en una condena.
