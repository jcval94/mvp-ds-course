# F2 · Piloto Wald — avance

Fecha: 2026-10-06 · Rama: `f2-wald` (encima de `f1-niveles`) · Misión: `m01-wald` (draft)

Criterio de salida de F2 (plan maestro): misión 01 completa, todos los arneses en
verde y prueba con 2–3 alumnos.

## Hecho

| Pieza | Estado | Dónde |
| --- | --- | --- |
| Caso | `verified`: 6 afirmaciones con fuente, 5 incertidumbres, 4 mitos. Verificación independiente con dictamen por afirmación | `casos/staging/wald-bombers.json`, `wald-bombers.verificacion.md` |
| Datos | Sintéticos (CC0), deterministas, con SHA-256 validado por el harness. El avión en píxeles vive en `parametros.json` y define las áreas | `casos/data/wald-bombers/` |
| Página jugable | 5 pasos con capa 8 bits: evidencia, elección de 2 placas, 1,000 aviones, revelación de los derribados, transferencia e historia con fuentes | `missions/m01-wald/app/` |
| Simulador web | Reproduce `generar.py` byte a byte (Mersenne Twister de Python) | `app/sim.js`, `harness/tests/test_m01_wald.py` |
| Kit de Colab | Sin escribir código: formulario para elegir el blindaje; mismo modelo; corre en ~2 s | `kits/m01-wald/m01_wald.ipynb` |
| Engine | `harness build` publica la página y los datos solo de misiones públicas `ready`/`published`; guardia de colores en `missions/`; Press Start 2P auto-hospedada | `harness/build.py`, `harness/validate.py`, `design/fonts/` |

Resultados con la semilla del caso: sin blindaje regresan 736 de 1,000; fuselaje +
alas, 748 (+12); motores + cabina, 898 (+162).

## Pruebas

`harness all` ✔ (621 archivos, 9.01 MB; smoke en `/` y `/mvp-ds-course/`) ·
`harness/tests` 18/18 ✔ · `qa_pages.py` ✔ · `qa_student_experience.py` ✔ ·
`actionlint` ✔ · recorrido completo de la misión en escritorio y móvil sin errores de
consola ni desbordamiento · kit ejecutado de principio a fin.

La misión sigue en `draft`: `dist/` no la incluye (verificado).

## Para pasar a `ready`

1. Leer Mangel y Samaniego (1984, *JASA* 79) y aprobar el caso por PR en
   `casos/cases.jsonl` (revisión humana).
2. Probar con 2–3 alumnos y ajustar textos.
3. El enlace "Abrir en Colab" apunta a `main`: funciona en cuanto la rama se fusione.
4. Pendiente opcional: video de intro (Remotion en `studio/`) y cápsula lateral.

## Decisiones

- El 8 bits vive dentro de la misión (decisión del autor, 2026-10-05).
- No se citan diálogos de personas reales: el narrador es un "centro de mando"
  genérico y la historia de Wald aparece solo con lo verificado.
- Los datos son sintéticos y se dice en la página, en el kit y en el caso.
