# 04 Synthetic Evidence Generator

## Cuándo usarla

Úsala después de diseñar la señal visual y antes de construir HTML o caso final.

## Qué hace

Especifica o genera datos sintéticos mínimos para sostener la evidencia narrativa.

## Qué no hace

No crea datasets gigantes, no simula datos personales reales, no agrega columnas exploratorias y no convierte el caso en laboratorio genérico de modelado.

## Conexión con las demás skills

Recibe patrón desde `03_data_signal_designer`; entrega columnas y distribuciones a `05_simple_visual_builder`, `06_narrative_case_writer` y `11_ethics_and_risk_reviewer`.

## Cuándo detenerse y pedir revisión

Detente si una columna no tiene función narrativa, si el patrón solo aparece con datos perfectos, o si la especificación necesita datos sensibles.

## Entradas necesarias

- Tesis.
- Patrón visual esperado.
- Tipo de gráfica.
- Variables necesarias.
- Segmentos y ventana temporal.

## Salida esperada

- Especificación de columnas.
- Distribuciones.
- Segmentos.
- Ruido realista.
- Casos borde.
- Patrón intencional.

## Regla

Si una columna no ayuda a contar la historia, no existe.

## Procedimiento

1. Lista solo columnas necesarias.
2. Define rangos y proporciones.
3. Agrega ruido para evitar perfección artificial.
4. Incluye casos borde que rompan la solución débil.
5. Especifica datos suficientes para renderizar la visualización.

## Errores a evitar

- Usar datos personales reales.
- Crear muchas columnas "por si acaso".
- Hacer patrones perfectos e inverosímiles.
- Generar datos que no sostienen la gráfica.

## Criterios de aceptación

- Todas las columnas tienen función narrativa.
- El patrón aparece con ruido realista.
- Los datos pueden reproducirse.
- No hay información sensible.
