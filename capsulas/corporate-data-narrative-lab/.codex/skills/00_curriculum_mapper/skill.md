# 00 Curriculum Mapper

## Cuándo usarla

Úsala al iniciar cualquier caso nuevo o cuando un caso existente parece usar una técnica demasiado compleja o demasiado débil.

Debe ser la primera skill del flujo. Ninguna narrativa, dataset, visualización o HTML debe construirse antes de declarar nivel analítico y técnica mínima suficiente.

## Qué hace

Mapea el problema de negocio al nivel analítico adecuado y limita la complejidad técnica.

## Qué no hace

No escribe el caso completo, no diseña dashboards, no elige modelos por prestigio y no reemplaza la revisión senior.

## Conexión con las demás skills

Entrega el nivel, técnica mínima suficiente y visual mínima a `01_case_thesis_builder`, `03_data_signal_designer` y `05_simple_visual_builder`.

## Cuándo detenerse y pedir revisión

Detente si hay más de un nivel posible con consecuencias de negocio distintas, si el usuario pide ML pero el caso parece resolverse con una métrica simple, o si una técnica simple no resiste adaptación del comportamiento.

## Entradas necesarias

- Tema o problema de negocio.
- Señal de datos disponible o deseada.
- Audiencia del caso.
- Nivel sugerido, si existe.

## Salida esperada

```markdown
## Nivel analítico sugerido
[0-24]

## Técnica principal
[...]

## Técnica mínima suficiente
[...]

## Por qué esta técnica basta
[...]

## Qué sería sobreingeniería
[...]

## Qué sería una solución demasiado simple
[...]

## Visualización mínima recomendada
[...]

## Habilidad que practicará el alumno
[...]
```

## Procedimiento

1. Lee `DATA_SCIENCE_CURRICULUM.md`.
2. Identifica si el problema es de definición, ventana, distribución, causalidad, clasificación, monitoreo, gobernanza o ética.
3. Elige el nivel más bajo que todavía permita resolver el problema con rigor.
4. Declara por qué no hace falta una técnica más compleja.
5. Declara qué se perdería con una técnica más simple.
6. Recomienda una sola visualización central.

## Errores a evitar

- Usar modelos cuando basta una regla de 3.
- Usar dashboards cuando basta una gráfica.
- Usar SHAP cuando basta una barra.
- Usar una regla fija cuando el comportamiento se adapta.
- Convertir todo en clasificación supervisada.
- Ignorar tasas, denominadores, ventanas temporales o definiciones.
- Proponer dashboards.

## Criterios de aceptación

- El nivel está justificado.
- La técnica mínima suficiente es explícita.
- Hay una advertencia clara de sobreingeniería.
- Hay una advertencia clara de subingeniería.
- La visualización recomendada es simple.
