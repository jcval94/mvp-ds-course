# Misión 01 · ¿Dónde blindar los aviones?

Estado: `draft`. No se publica hasta que el caso esté `approved` y se pruebe con
2–3 alumnos.

| Pieza | Ruta |
| --- | --- |
| Manifiesto | `mission.yaml` |
| Caso verificado | `casos/staging/wald-bombers.json` (+ `wald-bombers.verificacion.md`) |
| Datos sintéticos | `casos/data/wald-bombers/` (`parametros.json` define también el avión en píxeles) |
| Página jugable (capa 8 bits) | `app/index.html`, `app/app.js`, `app/sim.js` |
| Kit de Colab | `kits/m01-wald/m01_wald.ipynb` |

## Recorrido

1. **Centro de mando:** 1,000 aviones por noche, 2 placas de blindaje.
2. **Evidencia:** impactos de los aviones que regresaron, por cada 1% de superficie. El
   alumno elige 2 partes (botones o tocando el avión).
3. **Resultado:** se envían 1,000 aviones con su blindaje. Con la semilla del caso:
   sin blindaje regresan 736; fuselaje + alas, 748; motores + cabina, 898.
4. **Lo oculto:** impactos de los derribados frente a los que regresaron; sesgo de
   supervivencia. Puede intentar de nuevo.
5. **Transferencia:** una encuesta a usuarios que se quedaron en una app, y lo que sí
   y no está documentado de la historia de Wald, con fuentes.

`app/sim.js` reproduce exactamente `generar.py` (mismo Mersenne Twister que Python):
`harness/tests/test_m01_wald.py` lo comprueba contra `todos.csv`.

## Verla en local

```bash
python -m harness build
mkdir -p dist/missions/m01-wald/data
cp missions/m01-wald/app/* dist/missions/m01-wald/
cp casos/data/wald-bombers/*.csv casos/data/wald-bombers/*.json dist/missions/m01-wald/data/
python -m http.server 8000 -d dist
```

Abre `http://localhost:8000/missions/m01-wald/`. Cuando la misión pase a `ready`,
`harness build` hace esta copia solo.
