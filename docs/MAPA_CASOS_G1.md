# Mapa de casos de la Generación 1 (r07)

**Fecha:** 13 de noviembre de 2026 · **Tablero:** r07 (encargo E-05) · **Tabla mantenida a mano.** Se armó cruzando
`docs/ESTRUCTURA_GENERACION_1.md` (qué caso va en cada clase), `docs/PAGINA_O_COLAB.md` (dónde se resuelve, aprobado el
13 nov), `docs/CASE_MISSION_MAP.md` (misión ancla), las carpetas de `site/casos/` (intro, `medios.json` y `caso.html`) y
`casos/staging/` (verificación). Actualízala cuando un caso cambie de estado.

**Cómo leerla.** «Se resuelve en»: página, Colab o mixto (página más un tramo corto de Colab). «Medios listos»: piezas de
material real con estado `listo` frente a las declaradas en `medios.json`. «Ficha»: estado en `casos/staging/`; «sin
ficha» quiere decir que el caso aún no tiene ficha en este repo, no que esté mal. Las versiones de cuaderno solo se
anotan cuando el repo público las documenta; los enlaces de Drive no van aquí.

| Clase | Caso | Papel | Misión ancla | Se resuelve en | Cuaderno | Versión | Intro | Caso en la página | Ficha | Qué falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1.1 Abraham Wald y los bombarderos | principal | m01-wald (registrada) | página | — | — | sí (0/1 medios listos) | sí | verified | medios reales (k02) |
| 1 | E64 (1.4) Puerto Rico: 64 o 2,975 | costo | — | página | — | — | sí (0/3 medios listos) | sí | verified | medios reales (k02) |
| 2 | 1.2 La encuesta del Literary Digest | principal | — | página | — | — | sí (0/2 medios listos) | sí | verified | medios reales (k02) |
| 2 | E48 (13.11) El planeador de Gimli | costo | — | página | — | — | sí (0/1 medios listos) | sí | verified | medios reales (k02) |
| 3 | 2.1 John Snow y el cólera | principal | m02-snow (prevista) | página | — | — | sí (0/2 medios listos) | sí | verified | medios reales (k02) |
| 3 | 2.3 El transbordador Challenger | costo | — | página | — | — | sí (0/1 medios listos) | sí | verified | medios reales (k02) |
| 4 | 2.2 Florence Nightingale en Crimea | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 4 | E29 Shipman y el gráfico que nadie hizo | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 5 | 4.1 Semmelweis y el lavado de manos | principal | m03-semmelweis (prevista) | colab | Caso (completo) | v1.4 en Drive; v1.5 en backend #42 | sí (1/1 medios listos) | — (Colab) | verificado en el backend | nada |
| 5 | 3.1 El caso Sally Clark | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 6 | 3.3 La búsqueda del vuelo 447 de Air France | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 6 | E09 Fukushima y el tsunami «imposible» | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 7 | 4.2 Admisiones de posgrado en Berkeley | principal | m04-berkeley (prevista) | colab | Caso (completo) | v2.6 en Drive; v2.7 en backend #42 | sí (1/2 medios listos) | — (Colab) | verificado en el backend | medios reales (k02) |
| 7 | 6.2 La terapia hormonal en la menopausia | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 8 | 6.3 El salario mínimo en Nueva Jersey | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 8 | E16 Hoy No Circula | costo | — | página | — | — | no | no | candidate | intro, caso en la página, ficha verificada |
| 9 | S06 Progresa: quién entra primero, al azar | principal | — | página | — | — | no | no | candidate | intro, caso en la página, ficha verificada |
| 9 | E15 «Scared Straight» | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 10 | S09 Las cartas del fisco británico | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 10 | 5.6 Optimizely y el problema de espiar las pruebas | costo | — | mixto | Caso (corto; datos simulados, se avisa) | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 11 | 7.1 Moneyball y los Oakland Athletics | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 11 | E19 Volkswagen y el software que sabía cuándo lo medían | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 12 | S18 ¿Sigue siendo cliente? La regla del hiato | principal | — | mixto | Taquería (pedidos de Tacos Don Juan), salvo que haya datos reales | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 12 | 13.3 Los casos de COVID perdidos en Excel | costo | m05-covid-excel (prevista) | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 13 | 13.8 Google y MapReduce | principal | — | mixto | Taquería (pedidos a escala; reutiliza el reto del cruce que duplica, que salió de la clase 1) | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 13 | E56 Horizon: cuando el sistema acusó a cientos | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 14 | 8.1 El árbol del dolor de pecho | principal | m06-dolor-pecho (prevista) | mixto | Por decidir: caso o taquería | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 14 | E23 El algoritmo que confundía gasto con necesidad | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 15 | 8.4 El Netflix Prize | principal | — | mixto | Por decidir: caso o taquería | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 15 | 8.6 La mantequilla de Bangladesh y la bolsa | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 16 | D04 La cuarta oportunidad en el futbol americano | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 16 | 8.8 Los subsidios en Países Bajos | costo | m07-subsidios-paises-bajos (prevista) | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 17 | 9.1 Tesco Clubcard | principal | — | mixto | Taquería (clientes de Tacos Don Juan): los datos de la tarjeta son privados | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 17 | 9.2 Markopolos y Madoff | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 18 | D08 Cerrar la ciudad con pocos datos: influenza 2009 | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 18 | 10.3 Google Flu Trends | costo | — | mixto | Caso (corto) | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 19 | S20 La frontera irregular de la IA | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 19 | 12.7 Los precedentes inventados del caso Avianca | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 20 | S21 Más lentos con IA, y convencidos de ir más rápido | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 20 | 15.4 El agente de Replit que borró una base | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 21 | 14.1 COMPAS y el riesgo de reincidencia | principal | — | mixto | Caso (corto) | — | no | no | sin ficha | intro, caso en la página, cuaderno, ficha verificada |
| 21 | E66 Sweeney y el expediente del gobernador | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 22 | S01 El bombardero que nadie podía volar de memoria | principal | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |
| 22 | E61 Boeing 737 MAX: un solo sensor | costo | — | página | — | — | no | no | sin ficha | intro, caso en la página, ficha verificada |

## Resumen

- **44 casos** (22 clases × principal y costo). **Listo de punta a punta: 1** (4.1 Semmelweis).
- **Clases 1 a 3:** los seis casos ya tienen intro, caso en la página y ficha verificada; solo les falta el material real
  (k02, desde tu equipo).
- **Clase 4** (2.2 Nightingale y E29 Shipman): falta todo; es el siguiente bloque (s05).
- **Clases 5 a 8:** 4.1 y 4.2 están construidos (a 4.2 le falta una pieza de material real); los otros seis casos no
  tienen intro ni ficha. Los Módulos 1 a 3 (clases 1 a 6) debían estar listos el 20 de diciembre.
- **Misiones ancla:** solo `m01-wald` está registrada en `course.yaml`; las demás viven en `docs/CASE_MISSION_MAP.md`. Como
  las misiones web no cuentan para la calificación, ninguna bloquea una clase.

## Inconsistencias encontradas

1. **Ids dobles.** La estructura usa `E64` y `E48` para Puerto Rico y Gimli; las carpetas, el SQL y la ficha usan `1.4` y
   `13.11` (`ESTRUCTURA_GENERACION_1.md`, filas de las clases 1 y 2). Propuesta: anotar el alias en la estructura.
2. **`casos/cases.jsonl` está vacío**: ningún caso está `approved`. Wald es el primero en camino (sitio #98).
3. **Versión de los cuadernos:** Drive tiene 4.1 v1.4 y 4.2 v2.6; el backend #42 los sube a v1.5 y v2.7. Al subirlos
   (s11), actualizar esta tabla.
