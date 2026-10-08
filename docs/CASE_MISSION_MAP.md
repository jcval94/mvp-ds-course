# Mapa de misiones por caso

**Estado:** estructura aprobada en octubre de 2026. Ninguna misión nueva está
construida todavía; este mapa dice qué caso cierra cada nivel y cuáles lo
acompañan. La numeración de casos (1.1, 4.2…) es la del temario de casos reales
(78 casos en 15 módulos).

## Reglas

- **Ancla:** un caso por nivel, convertido en misión `mNN-slug` (NN = nivel). Es
  la misión que cierra el nivel. Wald (Nivel 1) y Snow (Nivel 2) son gratuitas,
  como sus niveles.
- **Banco:** casos que el nivel puede usar en clase en vivo o como alternativa.
  No se construyen como misión salvo decisión explícita.
- **Regreso:** un caso que ya apareció vuelve en un nivel posterior con una
  herramienta nueva, en una misión corta.
- **Misión de la taquería:** bloques de pura herramienta (entorno, SQL, APIs,
  loops) se enseñan con el mundo de la taquería, sin forzar un caso real.
- **Optativa:** casos sin nivel, reservados para una temporada extra.
- El id de la misión será también el id del caso en la base de datos del
  cuaderno (hoy los casos construidos usan 4.1 y 4.2; se migrarán al construir
  la misión correspondiente).
- Una misión se registra en `course.yaml` cuando su caso entra a
  `casos/staging/`, como `m01-wald`. Antes de eso solo vive en este mapa.
- Todo caso, nuevo o del banco, se verifica con fuentes antes de construirse.

## Anclas y banco por nivel

| Nivel | Misión ancla | Caso ancla | Banco |
| ---: | --- | --- | --- |
| 1 | `m01-wald` | 1.1 Wald y los bombarderos | 1.2 Literary Digest; 13.7 Genes convertidos en fechas |
| 2 | `m02-snow` | 2.1 John Snow y el cólera | 2.2 Nightingale en Crimea |
| 3 | `m03-semmelweis` | 4.1 Semmelweis (construido) | 3.1 Sally Clark y 3.3 Air France 447 (bloque Bayes); 3.2 Tanques alemanes; 3.4 Ulam y Monte Carlo; 4.3 Escuelas pequeñas; 4.5 Wansink (movido desde Nivel 9) |
| 4 | `m04-berkeley` | 4.2 Berkeley (construido) | 4.4 Instructores de Israel (bloque regresión a la media); 2.3 Challenger; 6.1 Doll y Hill; 6.2 Terapia hormonal |
| 5 | `m05-covid-excel` | 13.3 COVID perdidos en Excel | 13.1 Mars Climate Orbiter |
| 6 | `m06-dolor-pecho` | 8.1 Árbol del dolor de pecho | 8.4 Netflix Prize y 12.8 AlexNet (bloque ensambles y redes); 7.1 Moneyball; 8.2 Framingham; 8.3 Target; 12.5 El modelo que reconocía el hospital |
| 7 | `m07-subsidios-paises-bajos` | 8.8 Subsidios en Países Bajos | 10.2 Pronóstico del Día D y 12.3 Plan contra el spam (bloque decidir con costos); 8.6 Mantequilla de Bangladesh; 8.7 El sesgo húmedo |
| 8 | `m08-tesco` | 9.1 Tesco Clubcard | 12.1 El Federalista, 12.2 Rowling y Galbraith y 12.4 Sesgo en vectores de palabras (bloque texto como datos); 9.2 Madoff; 9.3 Benford y Grecia; 9.4 Los "me gusta" |
| 9 | `m09-google-azules` | 5.2 Google y los tonos de azul | 5.1 Lind y el escorbuto; 5.4 Anuncios de Bing; 5.6 Optimizely; 10.1 Walmart y los huracanes; 10.3 Google Flu Trends |
| 10 | `m10-salario-minimo` | 6.3 Salario mínimo en Nueva Jersey | 6.4 Lotería de Vietnam; 6.5 Regla de Maimónides; 7.2 Facebook y los 7 amigos; 7.3 Wells Fargo; 7.4 Ratas de Hanói (por verificar) |
| 11 | `m11-compas` | 14.1 COMPAS | 14.5 Apple Card y 14.6 Italia suspende ChatGPT (bloque regulación y explicabilidad); 14.2 Amazon; 14.3 Calificaciones de Inglaterra 2020; 14.4 AOL y el Censo 2020; 10.5 FiveThirtyEight 2016; 13.2 Reinhart y Rogoff |
| 12 | `m12-knight-capital` | 13.4 Knight Capital | Casos nuevos por verificar (ver abajo) |
| 13 | `m13-air-canada` | 12.6 Chatbot de Air Canada | 15.3 Chevy Tahoe de un dólar (bloque seguridad y evaluación); 12.7 Avianca; 15.1 Morgan Stanley; 15.2 BloombergGPT |
| 14 | `m14-replit` | 15.4 Agente de Replit (por verificar; si no se sostiene, 13.6 Zillow) | 13.5 Retinopatía en Tailandia; 13.6 Zillow Offers; 15.5 Klarna (por verificar) |

Reparto: 14 anclas, 54 casos de banco y 10 optativas (78 en total).

## Regresos

| Caso | Primera vez | Regresa en | Con qué herramienta |
| --- | --- | --- | --- |
| 2.1 Snow | Nivel 2 · comparación visual | Nivel 10 · experimentos naturales | Su comparación entre compañías de agua como experimento natural |
| 2.3 Challenger | Nivel 4 · relación visual | Nivel 11 · comunicación | Comunicar riesgo e incertidumbre |
| 8.3 Target | Nivel 6 · preparación de variables | Nivel 11 · privacidad | Qué se infiere de una persona sin que lo diga |
| 10.3 Google Flu Trends | Nivel 9 · validación temporal | Nivel 14 · monitoreo | Deriva y retiro de un modelo |
| 13.2 Reinhart y Rogoff | Nivel 11 · reproducibilidad | Nivel 12 · del notebook al proyecto | Un error de hoja de cálculo que un proyecto con tests habría detenido |

## Bloques sin caso real

| Nivel | Bloque | Cobertura propuesta |
| ---: | --- | --- |
| 1 | Preparación básica | Misión de la taquería |
| 2 | Resumen numérico | Caso nuevo: Gilbert Daniels y el "piloto promedio" (Fuerza Aérea de EE. UU., 1952) |
| 2 | Distribuciones | Caso nuevo: Quetelet y el pecho de los soldados escoceses (1846) |
| 3 | Variables aleatorias | Caso nuevo: bombas V-1 sobre Londres (Clarke, 1946); alternativa: coces de caballo prusianas (Bortkiewicz, 1898) |
| 4 | Correlación | Caso nuevo: chocolate y premios Nobel (Messerli, 2012) |
| 5 | Arquitectura y granularidad | Caso nuevo: métricas de video de Facebook (2016) |
| 5 | SQL para hacer preguntas | Misión de la taquería |
| 5 | Relaciones y JOINs | Caso nuevo: listas de purga de votantes de Florida (2000); tratarlo con neutralidad política |
| 5 | SQL analítico y tiempo | Misión de la taquería |
| 5 | Construcción de la tabla analítica | Caso nuevo: Gimli Glider (Air Canada 143, 1983) |
| 12 | Código modular y contratos | Caso nuevo: credenciales de Uber en un repositorio (2016) |
| 12 | APIs y contratos de servicio | Misión de la taquería |
| 12 | Empaquetado y entornos | Caso nuevo: left-pad (npm, 2016) |
| 12 | Despliegue (refuerzo de Knight Capital) | Caso nuevo: CrowdStrike (julio de 2024) |
| 13 | Loops, harness e interoperabilidad | Misión de la taquería |

Los diez casos nuevos están sin verificar: no se construyen hasta revisar fuentes
primarias.

## Optativas (temporada extra)

1.3 Encuestas estatales de 2016 (ponderación) · 5.3 Página de Obama (diseño
factorial) · 5.5 Portada de Yahoo! (bandits) · 8.5 Obama y los persuadibles
(uplift) · 9.5 PageRank (grafos) · 10.4 Modelo del IHME (modelos mecanicistas) ·
11.1 American Airlines y 11.2 UPS (optimización) · 11.3 LTCM (riesgo y colas
gruesas) · 13.8 MapReduce (cómputo distribuido).

## Verificaciones pendientes

- 7.4 Ratas de Hanói: usar Vann (2003); el "efecto cobra" de Delhi no está documentado.
- 8.3 Target: la anécdota del padre no tiene confirmación independiente.
- 15.4 Replit y 15.5 Klarna: casos recientes con cifras que cambiaron; solo fuentes primarias.
- Los diez casos nuevos de la tabla anterior.

## Orden de construcción

1. `m02-snow`, para cerrar los niveles gratuitos.
2. Anclas restantes en orden de nivel, empezando por las que ya existen como
   cuaderno (`m03-semmelweis`, `m04-berkeley`), migrando su id en la base.
3. Bloques de ampliación y Nivel 10, cada uno con su caso y su misión de la taquería.
4. Regresos y temporada extra.
