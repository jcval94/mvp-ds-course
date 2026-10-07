# Examples

## Ejemplo bueno

Tema: KPI de atención mejora al excluir casos complejos.

Salida:

- Nivel: 2 o 23.
- Técnica principal: ratio comparable con versionado de definición.
- Técnica mínima suficiente: línea antes/después con denominador anterior y nuevo.
- Sobreingeniería: modelo predictivo de atención.
- Subingeniería: aceptar el KPI nuevo sin auditar exclusiones.
- Visual: línea temporal con anotación de cambio de definición.

## Ejemplo malo

Tema: cancelaciones aparecen después de seis meses.

Salida incorrecta:

- Nivel: 12.
- Técnica: random forest.
- Problema: el caso no necesita predecir cancelación; necesita preservar ventana temporal.

