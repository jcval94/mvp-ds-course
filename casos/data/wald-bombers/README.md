# Datos de la misión m01-wald · sintéticos

**No son datos históricos.** Son aviones simulados para mostrar el mecanismo del sesgo
de supervivencia. Licencia CC0 1.0.

| Archivo | Contenido |
| --- | --- |
| `parametros.json` | Áreas, letalidad por sección, impactos promedio, semilla y reglas del blindaje |
| `generar.py` | Simulación determinista (solo biblioteca estándar de Python) |
| `regresaron.csv` | Lo que se veía en la guerra: impactos por sección de los aviones que regresaron |
| `todos.csv` | La verdad completa, con los derribados (`regreso = no`), para la revelación |

## Modelo

1. Cada avión recibe un número de impactos con distribución de Poisson.
2. Cada impacto cae en una sección con probabilidad igual a su área: impactos
   uniformes, el supuesto que Wallis atribuye a Wald.
3. Cada impacto derriba el avión con la letalidad de su sección. Una sección blindada
   reduce su letalidad según `blindaje.reduccion_letalidad`.

Con la semilla 1943 regresan 706 de 1,000 aviones. En los que regresan, los motores
y la cabina muestran menos impactos por unidad de área que el fuselaje: no porque
reciban menos, sino porque esos impactos derriban.

## Reproducir

```bash
python casos/data/wald-bombers/generar.py
```

Imprime el SHA-256 de cada CSV; `regresaron.csv` debe coincidir con
`dataset.sha256` en `casos/staging/wald-bombers.json`.
