# Criterio primero

**Estado:** principio rector del curso, definido por el autor el 19 de octubre de 2026.
Aplica a casos, misiones, cuadernos de Colab y clases en vivo desde esa fecha. Los
laboratorios por concepto ya publicados se revisan contra este documento cuando se
migran o se enlazan desde un caso.

Este documento define qué significa formar criterio en The Agentic Data Scientist y
cómo se comprueba en cada artefacto. `CLAUDE.md`, `AGENTS.md`,
`docs/CURRICULUM_MAP.md`, `docs/CASE_MISSION_MAP.md` y `docs/EVAL_SUITE.md` remiten
aquí; si algo choca con este documento, se corrige el otro.

## Los tres principios

### 1. Formar criterio antes que enseñar herramientas

Saber cuándo **no** usar machine learning puede valer más que entrenar diez modelos.
Una herramienta es la respuesta a una pregunta; el criterio es saber hacer la
pregunta.

Exige:

- Cada caso, misión o clase declara un **hábito de criterio** principal (tabla de
  abajo).
- La herramienta aparece como respuesta a una pregunta que el estudiante ya se hizo.
- Toda solución con modelo se compara con una **línea base simple** con los mismos
  datos fuera de muestra (escalera de complejidad, abajo).
- Cada nivel de modelado (6 a 9) incluye al menos un caso donde lo simple iguala o
  supera a lo complejo (familia «Cuándo no usar ML»).

Señales de incumplimiento: el material abre con el nombre de la herramienta; un
modelo se presenta sin línea base; ninguna actividad admite «no hace falta un modelo»
como respuesta correcta.

### 2. Aprender resolviendo problemas, no acumulando conceptos

Cada fundamento aparece cuando el estudiante tiene una razón para necesitarlo.

Exige:

- El caso va primero y el concepto vive dentro de él (arco de revelación, abajo).
- La herramienta se usa antes de nombrarse: «Lo que acabas de hacer se llama…».
- Las líneas **Giro** y **Herramientas** del temario son guía docente: el estudiante
  ve la decisión, los datos y la pregunta detonadora.
- Los laboratorios por concepto funcionan como práctica y consulta después del
  momento en que el caso los pide, enlazados desde ese momento.

Señales de incumplimiento: una clase empieza con una definición; las herramientas se
anuncian antes del giro; un concepto se enseña sin un caso que lo necesite.

### 3. Preparar para trabajar con IA, no competir contra ella

El estudiante aprende a delegar la ejecución, verificar los resultados y responder
por las decisiones.

Exige:

- Toda actividad en la que una IA ejecuta sigue el protocolo **Delegar · Verificar ·
  Firmar** (abajo).
- La evaluación premia el encargo claro, la verificación y la decisión justificada,
  no escribir código de memoria.
- Ninguna decisión se atribuye a la IA: la firma es siempre de una persona.

Señales de incumplimiento: celdas que el estudiante solo ejecuta sin encargo ni
verificación; resultados de la IA aceptados sin comprobación; frases como «el modelo
decidió».

## Los diez hábitos de criterio

Cada caso tiene uno principal. Los identificadores se usan en el catálogo de casos
(campo `crit`) y en las fichas de misión.

| Id | Pregunta que el estudiante aprende a hacerse | Qué evita | Caso semilla |
| --- | --- | --- | --- |
| `decision` | ¿Qué decisión cambia con esto? | Análisis que nadie usa | 8.5 Obama y los persuadibles |
| `faltan` | ¿Qué falta en mis datos y por qué? | Sesgo de supervivencia, de selección y de no respuesta | 1.1 Wald y los bombarderos |
| `comparar` | ¿Contra qué lo comparo? | Atribuir un efecto sin contrafactual | 4.1 Semmelweis |
| `simple` | ¿Alcanza con algo simple? | Complejidad que no mejora la decisión | COMPAS contra dos variables (Dressel y Farid, 2018) |
| `mide` | ¿Qué mide realmente este número? | Métricas sustitutas y definiciones ambiguas | Puerto Rico: 64 o 2,975 muertes |
| `incertidumbre` | ¿Cuánto me puedo equivocar y cuánto cuesta? | Certeza falsa y costos asimétricos ignorados | Grand Forks 1997 |
| `fuera` | ¿Funciona fuera de mis datos? | Sobreajuste, extrapolación y deriva | 10.3 Google Flu Trends |
| `quien` | ¿Quién paga el error? | Daños desiguales entre grupos | 8.8 Subsidios en Países Bajos |
| `verificar` | ¿Cómo lo verifico? | Confiar en un sistema o en una IA sin revisar | Horizon (Post Office, Reino Unido) |
| `firmar` | ¿Quién firma la decisión? | Delegar la responsabilidad junto con la ejecución | 12.6 Chatbot de Air Canada |

Un nivel no debería cerrar sin haber practicado al menos tres hábitos distintos, y el
curso completo practica los diez varias veces en contextos distintos.

## La escalera de complejidad

Antes de cualquier modelo se sube esta escalera, un peldaño a la vez:

1. **Pregunta y decisión.** Qué se decide, quién decide y qué cambiaría.
2. **Mirar los datos.** Conteos, una tabla, una gráfica.
3. **Una regla simple.** Lo que haría una persona experta con lápiz: una heurística,
   un umbral, una lista de verificación.
4. **Una comparación justa.** Línea base, grupo de control o contrafactual.
5. **Un modelo simple e interpretable.**
6. **Un modelo complejo.**

Reglas:

- Se sube un peldaño solo cuando el anterior no alcanza para la decisión, y se dice
  por qué.
- Cada peldaño se compara contra el anterior con los mismos datos y fuera de muestra.
- Quedarse en los peldaños 2 a 4 es una respuesta válida y a veces la mejor.

## El arco de revelación

Así se reparte un caso para que la herramienta llegue cuando hace falta. Las
proporciones son orientativas para un caso de 45 a 60 minutos.

| Momento | Qué hace el estudiante | Qué no se hace | Tiempo |
| --- | --- | --- | --- |
| 1. Gancho | Conoce la situación, quién decide y qué está en juego (intro de la página) | Nombrar herramientas | ~5% |
| 2. Apuesta | Decide con lo que sabe y registra su razón | Corregir todavía | ~5% |
| 3. Mirar | Ve los datos mínimos: un conteo, una tabla, una gráfica | Modelar | 10–15% |
| 4. Fricción | Descubre que su primera lectura falla o no alcanza | Dar la respuesta | ~15% |
| 5. Herramienta | Usa la herramienta mínima que resuelve la fricción y después la nombra | Más de una herramienta nueva por caso | ~20% |
| 6. Verificar | Comprueba el resultado: a mano, con un caso conocido, con otra fuente o revisando lo que hizo la IA | Aceptar sin comprobar | 10–15% |
| 7. Decidir y firmar | Escribe qué decide, con qué certeza, qué no sabe y qué lo haría cambiar | Dejar la decisión implícita | ~10% |
| 8. Revelación | Conoce qué pasó de verdad y cuánto costó o ganó | Contarla antes de la firma | ~5% |
| 9. Transferir | Aplica el mismo hábito a un caso de su trabajo o a otro contexto | Repetir el mismo caso con otros números | ~15% |

Para que el criterio se retenga:

- **La apuesta vuelve al cierre.** El estudiante compara lo que creía con lo que
  encontró.
- **Recuperación espaciada.** Cada clase abre con una apuesta rápida sobre un caso de
  una clase anterior, sin notas.
- **Intercalar hábitos.** Dos casos seguidos no entrenan el mismo hábito principal.
- **El criterio en una frase.** Cada caso termina con una tarjeta de una línea: la
  pregunta del hábito y cuándo hacérsela.

El cuaderno 4.1 (Semmelweis) ya sigue casi todo el arco: apuesta (`hipotesis`), mirar
(`clinicas`), fricción y herramienta (`azar`, con la simulación de 1,000 mundos antes
de nombrar la prueba), explicación calificada antes de la revelación y laboratorio de
transferencia. Le faltan la verificación de un resultado producido por IA y la firma
explícita.

## Protocolo Delegar · Verificar · Firmar

Es la forma de trabajar con IA en todo el curso. Permite a quien no sabe Python
resolver con código desde el primer nivel: escribe el encargo en español, la IA
escribe el código y la persona verifica con comprobaciones que sí entiende.

### Delegar

El encargo tiene cuatro partes:

1. **Qué quiero:** la pregunta y el resultado esperado (una tabla, una gráfica, un
   número).
2. **Con qué datos:** el archivo, sus columnas y su unidad de análisis.
3. **Cómo sabré que está bien:** las comprobaciones que haré.
4. **Qué no debe hacer:** filtrar, borrar o inventar datos, o cambiar la pregunta.

### Verificar

Al menos dos comprobaciones independientes del resultado, registradas como «qué
revisé y qué encontré». Ejemplos:

- cuántas filas entraron y cuántas salieron;
- un caso calculado a mano;
- rango plausible de cada número;
- comparación con la línea base;
- el mismo resultado por otra ruta o con otra fuente.

### Firmar

La decisión en una frase, con:

- el grado de certeza;
- lo que no se sabe;
- qué evidencia la haría cambiar;
- el alias de quien firma.

La IA no firma.

### Progresión

El protocolo crece con el eje transversal de trabajo con agentes de
`docs/CURRICULUM_MAP.md`:

| Niveles | Qué delega el estudiante | Qué verifica |
| --- | --- | --- |
| 1–2 | Nada todavía: recibe resultados hechos, algunos con un error plantado | Encuentra el error con conteos, rangos y una gráfica |
| 3–5 | Cálculos acotados y consultas (una tabla, una comparación, un SQL) | Totales, granularidad y un caso a mano |
| 6–9 | Pipelines, modelos y experimentos | Fuga de información, línea base y validación fuera de muestra |
| 10–14 | Sistemas y agentes completos | Evals, permisos, trazas y criterios de parada |

**Error plantado:** resultado preparado con un error realista (filas perdidas, un
JOIN que duplica, una unidad cambiada) que el estudiante debe encontrar antes de
firmar. Se anuncia que puede haber un error, nunca dónde está.

## Familias de casos

| Familia | Qué la define | Mínimo |
| --- | --- | --- |
| El costo del error | Un error con datos tuvo un costo medible: vidas, dinero, libertad, confianza | Uno por nivel |
| La solución simple | Lo que resolvió el problema fue una decisión, regla o lista simple | Uno por nivel |
| Cuándo no usar ML | Lo simple igualó o superó a lo complejo, o el modelo complejo no aportaba | Uno por nivel de modelado (6 a 9) |
| Trabajar con IA | Delegar, verificar y responder por el resultado de una IA | Una actividad por nivel |

El catálogo de casos del autor etiqueta cada caso con su familia, su hábito
principal, sus puntajes y sus fuentes. Ningún caso se construye sin verificar sus
cifras en fuentes primarias (`docs/CASE_MISSION_MAP.md`).

## Cómo se aplica en cada artefacto

| Artefacto | Qué cambia |
| --- | --- |
| Temario de casos | Giro y Herramientas son guía docente. El estudiante ve decisión, datos y pregunta detonadora. |
| Intro de la página | Gancho y nada más. La apuesta vive en Colab. |
| Cuaderno de Colab | Sigue el arco. Registra apuesta, encargo, verificación y firma. |
| Laboratorio por concepto | Es práctica y consulta enlazada desde el momento Herramienta del caso, no la puerta de entrada. |
| Clase en vivo | Abre con un caso y su apuesta. El concepto aparece dentro del caso y el laboratorio va después. |
| Evaluación | Califica el encargo, la verificación y la firma, además del resultado. |

El registro en el cuaderno de encargo, verificación y firma es un cambio propuesto al
generador de casos (`agentic-ds-backen`). Hasta que exista, se registran como
respuestas abiertas con `tdd`.

## Cómo se evalúa

Estas dimensiones se suman a `evals/rubric.md` y `docs/EVAL_SUITE.md` para casos,
misiones y clases en vivo.

| Dimensión | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Criterio antes que herramienta | Abre con la herramienta | Hay apuesta, pero la herramienta se anuncia antes de la fricción | La herramienta llega cuando la fricción la pide y se compara con una alternativa simple |
| Escalera de complejidad | Modelo sin línea base | Línea base mencionada sin comparar | Cada peldaño justificado y comparado fuera de muestra |
| Delegar · Verificar · Firmar | El estudiante solo ejecuta | Verifica, pero no registra encargo o firma | Encargo, dos verificaciones y firma registrados |

Bloquean:

- un caso que nombra su herramienta antes de la apuesta;
- un modelo predictivo presentado sin línea base simple;
- una decisión atribuida a la IA sin firma de una persona.
