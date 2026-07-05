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
- PlantGrowth de R: diseño y lectura de experimentos con control y tratamientos.

Los términos de uso y las citas completas están en `metadata/`.

## Datos narrativos sintéticos

`narrative/` contiene filas ficticias para la historia de Don Juan y Paco. No
representan clientes reales, no forman parte del registro de snapshots públicos
y no pueden usarse como fuente principal de Enseñar en vivo.

- `pedidos_crudos_nivel_1.csv`: 10 capturas con problemas didácticos conservados.
- `pedidos_preparados_nivel_1.csv`: 9 pedidos únicos con estado de calidad y
  transformación documentada.
- `pedidos_4_semanas_nivel_2.csv`: 600 pedidos determinísticos de 16 noches;
  una fila representa un pedido y ninguna columna perfila personas.
- `auditoria_atipicos_nivel_2.csv`: cuatro casos separados para distinguir
  errores confirmados de pedidos raros válidos sin contaminar la tabla canónica.
- `pedidos_nivel_2.metadata.json`: semilla, versión del generador, periodo,
  dimensiones, esquema, estados y SHA-256 de los dos CSV de Nivel 2.
- `pedidos_piloto_nivel_3.csv` y `noches_piloto_nivel_3.csv`: 1,360 pedidos y 32 noches del piloto reversible.
- `noches_contexto_nivel_4.csv`: 48 noches con contexto operativo y una reversión agregada validada.
- `noches_modelado_nivel_6.csv`: 64 noches; separa entradas previas de resultados posteriores para prevenir leakage.
- `cierres_nivel_5_slice.csv`, `turnos_nivel_5_slice.csv` y
  `eventos_nivel_5_slice.csv`: slice de JOIN con 6 noches, 8 turnos y 8 etiquetas.
- `casos_pipeline_nivel_11_slice.csv`: seis casos sintéticos de contrato, test y fallo; no contiene secretos reales.
- Los archivos `*.metadata.json` fijan generador, periodo, dimensiones, estado y SHA-256; las slices se distinguen de datasets de niveles completos.

Sus dimensiones, hashes e invariantes se validan en
`scripts/validate_content.py` y se registran en `docs/CONTINUITY_LEDGER.md`.
