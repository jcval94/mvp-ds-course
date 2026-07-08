# Historia Nivel 4: Lo que se mueve junto

## Control

- **Estado:** aprobada para implementación.
- **ID:** `don-juan-paco-level-4-v1`.
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel 4.
- **Arco:** `docs/LEVEL_4_NARRATIVE_ARC.md`.
- **Entrada/salida:** `L3.5 / G2-piloto → L4.4 / G3-espera`.

Historia aprobada antes del generador. El narrador es siempre subtítulo. Mari habla de preparación, inocuidad, fila y capacidad; nunca introduce ni concluye ciencia de datos.

## Temario y matriz de escenas

| Escena | Concepto | Aprender | Don Juan | Paco | Subtítulo inicial | Subtítulo final | Transferencia distinta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `L4-S01` | scatterplot | Cada noche ubica pedidos y espera | “Pon cada noche donde le toca.” | “Un punto por noche, Pa.” | Un scatterplot coloca dos variables numéricas de la misma unidad de análisis. | La nube permite ver relación, grupos y extremos; no demuestra causa. | Temperatura frente a pedidos. |
| `L4-S02` | tendencia | Se añade una línea descriptiva | “¿Para dónde va el montón?” | “Resumo la dirección sin borrar los puntos.” | Una tendencia resume el patrón central de una relación. | La línea describe estas noches y puede ocultar curvatura o grupos. | Merma frente a tacos vendidos. |
| `L4-S03` | forma de relación | Se comparan forma lineal, curva y sin patrón | “No todas las rayas cuentan lo mismo.” | “Reviso la forma antes de resumir.” | La forma puede ser lineal, curva, escalonada o inexistente. | Una correlación única puede perder una relación no lineal. | Se contrasta espera y volumen. |
| `L4-S04` | grupos | Se colorea por etapa operativa | “Ah, aquí hay dos montones.” | “Los separo sin inventar una causa.” | Los grupos pueden revelar patrones ocultos en el agregado. | Comparar estratos evita atribuir al conjunto lo que cambia por contexto. | Se agrupa por día. |
| `L4-S05` | dirección | Pendientes positiva, negativa y nula | “Una sube con la otra; esta otra baja.” | “Eso es dirección, no fuerza.” | La dirección indica si dos variables tienden a aumentar juntas o en sentidos opuestos. | Dirección no mide precisión ni causalidad. | Lluvia frente a pedidos. |
| `L4-S06` | fuerza | Nubes con distinta dispersión | “Esta nube está más apretada.” | “La cercanía al patrón cambia.” | La fuerza describe qué tan estrechamente siguen las observaciones un patrón. | Una relación fuerte puede seguir siendo espuria. | Temperatura frente a espera. |
| `L4-S07` | Pearson | Se calcula el movimiento lineal estandarizado | “Dame el resumen, pero deja la nube.” | “Lo acompaño con puntos y unidades.” | Pearson resume asociación lineal entre −1 y 1. | El valor coincide con el CSV y es sensible a extremos y grupos. | Otra pareja de variables. |
| `L4-S08` | Spearman | Valores se convierten a rangos | “Aunque no vaya derechito, sí lleva orden.” | “Comparo lugares, no distancias.” | Spearman calcula asociación monótona usando rangos. | Captura orden monótono y también requiere revisar empates y forma. | Se usa espera y volumen. |
| `L4-S09` | correlación y extremos | Se agrega y retira una noche extrema | “Ese punto está jalando el número.” | “Reporto ambos cálculos.” | Un extremo puede cambiar de forma sustancial una correlación. | Sensibilidad no prueba error; exige contexto y trazabilidad. | Otro extremo validado. |
| `L4-S10` | causalidad | Se muestran explicaciones alternativas | “Que anden juntas no dice quién empuja.” | “Dejo abiertas las otras rutas.” | Asociación no implica causalidad; identificar efecto exige diseño y supuestos. | El gráfico permite preguntas, no una atribución causal. | Se evalúa lluvia y ventas. |
| `L4-S11` | confusores | Temperatura se estratifica | “Había una tercera cosa metida.” | “La comparo dentro de grupos.” | Un confusor se relaciona con exposición y resultado y puede distorsionar su asociación. | Estratificar cambia la lectura; no garantiza eliminar toda confusión. | Se estratifica por partido. |
| `L4-S12` | sesgo de agregación | La tendencia agregada revierte las tendencias de grupos | “Juntas cuentan una cosa; separadas, otra.” | “No escondo los grupos.” | La agregación puede invertir una asociación presente dentro de estratos. | La reversión está verificada en el CSV y obliga a reportar contexto. | Se cambia el agrupador. |
| `L4-S13` | proporciones | Tabla de alta demanda por etapa | “Dime de cuántas noches hablas.” | “Muestro numerador y denominador.” | Una proporción divide casos con evento entre el total del grupo. | Comparar conteos sin denominadores confunde tamaños de grupo. | Tabla por ayudante programado. |
| `L4-S14` | riesgo relativo | Se dividen dos proporciones | “¿Cuántas veces tan frecuente, con qué base?” | “Anoto ambos riesgos antes de dividir.” | El riesgo relativo compara dos probabilidades del evento. | RR describe asociación del periodo; no prueba que la exposición cause el evento. | Agotado de pastor por quincena. |
| `L4-S15` | odds | Se comparan evento/no evento | “¿Cuántas con alta por cada una sin alta?” | “No lo llamo probabilidad.” | Los odds son eventos divididos entre no eventos. | Odds y probabilidad no son intercambiables; la tabla muestra ambos denominadores. | Otra tabla 2×2. |

## Crecimiento y personajes

Don Juan abre una lata de monedas y explica que cualquier cambio sale de sus ahorros. Decide diez asientos y un área de espera tras revisar capacidad, seguridad y varias noches; no porque una correlación “lo ordene”. Mari Vega entra como ayudante pagada viernes y sábado. Su autoridad es operación y preparación; ahorra para recuperar el puesto familiar de aguas frescas, secreto reservado hasta Nivel 8 y ausente de datos. Evaristo aparece de forma selectiva: su “¿de cuántos?” obliga a revisar denominadores, pero la evidencia sigue en la tabla y el narrador cierra técnicamente.

## Separación y límites

Aprender y Ejercitar usan noches, variables y decisiones diferentes. Cada respuesta requiere recorrer estados. No se afirma causalidad. En vivo conserva Bike Sharing, Penguins y Wine Quality. Cierre: **“¿Cómo juntamos las fuentes sin contar una noche dos veces?”**
