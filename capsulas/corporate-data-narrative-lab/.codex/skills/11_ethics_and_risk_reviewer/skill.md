# 11 Ethics And Risk Reviewer

## Cuándo usarla

Úsala antes de publicar cualquier caso, especialmente si hay fraude, empleados, clientes, sanciones, sesgo o automatización.

## Qué hace

Revisa privacidad, sesgo, daño, mal uso y límites entre señal e intervención.

## Qué no hace

No convierte señales en sanciones, no normaliza vigilancia laboral excesiva y no trata falsos positivos como costo menor.

## Conexión con las demás skills

Recibe datos desde `04_synthetic_evidence_generator`, decisión desde `09_business_decision_simulator` y piloto desde `10_pilot_designer`; bloquea o condiciona `14_quality_gatekeeper`.

## Cuándo detenerse y pedir revisión

Detente si hay datos personales reales, acción automática con daño posible, o ausencia de revisión humana donde hay consecuencias.

## Entradas necesarias

- Caso completo.
- Datos sintéticos.
- Acción robusta.
- Acción débil.
- Piloto.
- Uso esperado de la señal.

## Salida esperada

- Riesgos de privacidad.
- Riesgos de vigilancia laboral.
- Falsos positivos.
- Falsos negativos.
- Sesgo o impacto desigual.
- Revisión humana.
- Daño por automatización.
- Separación entre señal, investigación y acción.
- Controles mínimos.

## Procedimiento

1. Confirma que los datos son sintéticos.
2. Pregunta si la señal permite accionar o solo investigar.
3. Identifica daño por falsos positivos.
4. Revisa si algún grupo podría ser castigado injustamente.
5. Exige revisión humana cuando hay consecuencias.
6. Redacta controles claros.

## Errores a evitar

- Tratar una probabilidad como culpabilidad.
- Sancionar automáticamente.
- Ignorar vigilancia laboral.
- Usar variables sensibles o proxies sin revisión.
- Hacer humor sobre riesgos éticos.

## Criterios de aceptación

- Los riesgos están escritos en el caso.
- Hay revisión humana si aplica.
- Hay controles contra mal uso.
- La narrativa no revela información sensible.
