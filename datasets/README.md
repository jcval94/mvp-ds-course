# Datasets públicos

Esta carpeta contiene snapshots fijos utilizados por los materiales de
DataClass Forge. No se descargan durante una clase ni durante el build de
GitHub Pages.

## Política

- Cada snapshot conserva fuente, licencia, cita, fecha y SHA-256.
- `registry.lock.json` fija la versión publicada.
- Un cambio de archivo exige actualizar metadatos, revisar los ejercicios y
  ejecutar `python scripts/validate_content.py`.
- Los snapshots no contienen datos personales sensibles.

## Fuentes

- Palmer Penguins: resumen numérico y comparación visual.
- Bike Sharing Dataset de UCI: distribuciones e histogramas.
- Wine Quality de UCI: variación y valores atípicos.

Los términos de uso y las citas completas están en `metadata/`.
