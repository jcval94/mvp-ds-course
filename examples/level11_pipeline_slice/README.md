# Artifact de código · Nivel 11

Vertical slice offline para demostrar el paso de una sesión frágil a un pipeline
verificable. No es un backend ni un servicio desplegado.

## Contrato

- Entrada: objeto con `inventory_units`, `temperature_c` y `is_weekend`.
- Validación: tipos y rangos explícitos; campos faltantes producen `ContractError`.
- Transformación: normalización determinística sin estado global.
- Inferencia didáctica: regla versionada, no un modelo entrenado.
- Salida: `risk_band`, `artifact_version` y `request_id`.
- Seguridad: configuración separada; no hay credenciales ni red.

## Ejecutar

```powershell
python -m unittest discover -s examples/level11_pipeline_slice/tests -v
python examples/level11_pipeline_slice/run_demo.py
```

Los tests cubren caso válido, reproducibilidad, campo faltante, rango inválido,
configuración y ausencia del secreto ficticio en logs. Un test verde solo cuenta
como evidencia para el criterio que declara.
