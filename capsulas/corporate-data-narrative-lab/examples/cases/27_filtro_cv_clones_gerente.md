# El filtro que contrataba clones del gerente

<!-- story
concept: sesgo en datos historicos y decisiones automatizadas
characters: Ana, Pablo, Lorena, el gerente
situation: un filtro de CV aprende del historial de contrataciones de un area poco diversa
bad_logic: si los mejores empleados historicos se parecen, el modelo debe buscar perfiles parecidos
escalation: candidatos capaces quedan abajo por no parecerse al patron anterior
data_turn: Ana compara seleccion por experiencia real y por parecido historico
chart: seleccion por grupo
decision: auditar sesgos, quitar proxies y mantener revision humana
punchline: El modelo no buscaba talento; buscaba al gerente con otro correo.
rule: un modelo entrenado con historia injusta puede repetirla con mejor velocidad
synthetic_data: true
-->

## La terna perfecta

> **Ana:** "El filtro ya nos deja ternas muy parecidas al equipo actual."

> **Pablo:** "Esa frase no suena tan bien como crees."

> **Lorena:** "El equipo actual funciona."

> **Ana:** "Tambien es resultado de decisiones viejas."

> **Lorena:** "El modelo aprendio de los mejores."

> **el gerente:** "Aprendio de quienes tuvieron oportunidad."

Candidatos capaces quedan abajo por no parecerse al patron anterior. La solución rápida había cumplido una parte del encargo y había complicado otra que no aparecía en el primer reporte.

## Parecido no era desempeno

> **Lorena:** "Podemos subir el corte para asegurar calidad."

> **Pablo:** "Eso haria mas fuerte el mismo sesgo."

> **Lorena:** "Pero la terna tendria mucha afinidad cultural."

> **el gerente:** "Afinidad se parece demasiado a estudiaste donde yo."

> **Lorena:** "No descarta por grupo, descarta por senales."

> **Ana:** "Algunas senales son el grupo con bigote falso."

> **Pablo:** "Candidatos capaces quedan abajo por no parecerse al patron anterior."

> **el gerente:** "Quiero ver seleccion por grupo antes de decidir."

Ana compara seleccion por experiencia real y por parecido historico. La lectura completa devolvió el contexto omitido y dejó una acción concreta en lugar de una conclusión tranquilizadora.

## El historial tenia memoria selectiva

> **Ana:** "Revise seleccion controlando experiencia y prueba tecnica."

> **el gerente:** "Quien baja aunque tenga buen resultado."

> **Ana:** "Los perfiles no historicos caen mas aun con desempeno similar."

> **Pablo:** "Ahora entiendo por qué si los mejores empleados historicos se parecen, el modelo debe buscar perfiles parecidos."

> **Ana:** "Respondía otra pregunta; no servía para auditar sesgos, quitar proxies y mantener revision humana."

<svg data-chart="central" viewBox="0 0 720 320" role="img" aria-label="seleccion por grupo">
  <rect width="720" height="320" fill="#fff"/>
  <text x="36" y="32" font-size="18" font-weight="bold">seleccion por grupo</text>
  <line x1="58" y1="260" x2="662" y2="260" stroke="#777" stroke-width="2"/>
  <rect x="70" y="85" width="174" height="175" fill="#286d9b"/>
  <text x="157" y="75" font-size="18" text-anchor="middle">76</text>
  <text x="157" y="286" font-size="13" text-anchor="middle">historico</text>
  <rect x="272" y="187" width="174" height="73" fill="#d58b2f"/>
  <text x="359" y="177" font-size="18" text-anchor="middle">32</text>
  <text x="359" y="286" font-size="13" text-anchor="middle">no historico</text>
  <rect x="474" y="120" width="174" height="140" fill="#4c8b63"/>
  <text x="561" y="110" font-size="18" text-anchor="middle">61</text>
  <text x="561" y="286" font-size="13" text-anchor="middle">con revision</text>
  <text x="36" y="306" font-size="13" fill="#9f3625">La revision reduce el castigo a perfiles distintos.</text>
</svg>

<!-- learning:pause -->
> **Pablo:** "Por que una variable aparentemente neutral puede copiar una exclusion pasada."

**Lo que muestra:** La grafica muestra seleccion desigual entre perfiles con resultados comparables. El modelo no necesita usar una categoria sensible para sesgar; puede usar escuela, colonia, trayectoria o huecos como proxies. Por eso hace falta auditoria y revision humana.

## Revisar antes de descartar

> **el gerente:** "El filtro deja de descartar solo y pasa a priorizar revision."

> **el gerente:** "Dejen por escrito quién va a auditar sesgos, quitar proxies y mantener revision humana."

> **Lorena:** "RH leera mas candidatos."

> **Ana:** "Y menos copias del mismo pasado."

> **Ana:** "¿Qué cambiaremos después de revisar seleccion por grupo?"

> **Pablo:** "La decisión es auditar sesgos, quitar proxies y mantener revision humana."

> **Lorena:** "Y volvemos a medir sesgo en datos historicos y decisiones automatizadas antes del siguiente cierre."

> **Pablo:** "El modelo no buscaba talento; buscaba al gerente con otro correo."

**Regla:** un modelo entrenado con historia injusta puede repetirla con mejor velocidad.
