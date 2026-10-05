# 10 Pilot Designer

## Cuándo usarla

Úsala cuando el caso requiere probar una solución o contener una decisión imperfecta.

## Qué hace

Fuerza medición con éxito, reversa, controles y monitoreo.

## Qué no hace

No diseña pilotos con éxito garantizado, no valida decisiones ya tomadas y no usa volumen como sustituto de efectividad.

## Conexión con las demás skills

Recibe mala decisión desde `09_business_decision_simulator`, acción robusta desde `06_narrative_case_writer` y riesgos desde `11_ethics_and_risk_reviewer`.

## Cuándo detenerse y pedir revisión

Detente si no hay métrica principal, métricas de control, criterio de reversa o plan de comunicación.

## Entradas necesarias

- Acción robusta.
- Acción débil.
- Decisión de negocio.
- Población afectada.
- Métrica principal.
- Riesgos del caso.

## Salida esperada

- Duración.
- Población.
- Grupo control, si aplica.
- Métrica principal.
- Métricas secundarias.
- Métricas de control.
- Métricas de riesgo.
- Criterio de éxito.
- Criterio de reversa.
- Monitoreo.
- Plan de comunicación.

## Procedimiento

1. Define qué decisión se está probando.
2. Define población y exclusiones.
3. Incluye control o comparador cuando sea posible.
4. Declara éxito y reversa antes del piloto.
5. Añade métricas de riesgo para evitar optimizar solo el KPI cómodo.

## Errores a evitar

- Pilotos sin métrica.
- Pilotos con éxito garantizado.
- Pilotos que no pueden revertirse.
- Medir solo actividad y no efectividad.

## Criterios de aceptación

- El piloto puede fallar.
- Hay criterio de reversa.
- Hay monitoreo de efectos secundarios.
- La duración es suficiente para el fenómeno.
