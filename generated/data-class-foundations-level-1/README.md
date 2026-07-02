# DataClass Forge: Nivel 1

Material interactivo de Fundamentos de ciencia de datos.

El nivel fue reformulado desde la historia canónica de Don Juan y su hijo Paco.
La implementación no es la fuente narrativa: parte del temario y de una historia
aprobada en este orden:

```text
docs/CURRICULUM_MAP.md
-> docs/stories/LEVEL_1.md
-> ConceptSpec / Aprender / Ejercitar / En vivo
-> este paquete estático
```

## Abrir

Abre `index.html` directamente o inicia un servidor local:

```powershell
python -m http.server 4173
```

Luego visita `http://localhost:4173/generated/data-class-foundations-level-1/`.

## Laboratorios

| Bloque | Conceptos | Archivo |
| --- | --- | --- |
| Alfabetización de datos | observación, variable, tabla, población, muestra | `alfabetizacion.html` |
| Tipos de variables | numérica, categórica, ordinal, fecha, texto | `tipos-variables.html` |
| Calidad de datos | faltantes, duplicados, rangos inválidos, sesgo de medición | `calidad-datos.html` |
| Preparación básica | filtrar, ordenar, agrupar, transformar | `preparacion-basica.html` |

## Modos

- **Aprender:** definición, intuición y error común.
- **Ejercitar:** caso narrativo profesional, animación obligatoria, pistas graduadas, decisión basada en evidencia y feedback específico.
- **En vivo:** visible temporalmente en Nivel 1 para revisión docente. Usa snapshots públicos reales con fuente, licencia, fecha y SHA-256; no es autenticación ni protección real en el sitio estático.

## Narrativa en pantalla

- Don Juan aporta únicamente experiencia y consecuencias del negocio, en lenguaje simple.
- Paco habla como hijo, ayudante parcial y estudiante de preparatoria.
- El narrador introduce términos y conclusiones técnicas.
- Toda intervención del narrador se muestra en una banda de subtítulos accesible;
  al revelar la evidencia, el subtítulo cambia de planteamiento a conclusión.
- Aprender y Ejercitar ocurren en el mismo puesto, pero usan incidentes y evidencia distintos.

## Estado de datos

```text
pedidos_crudos@L1.1
-> esquema@L1.2
-> reporte_de_calidad@L1.3
-> pedidos_preparados@L1.4
```

La captura narrativa es sintética, no contiene atributos personales y conserva
un faltante, un inválido, un duplicado confirmado y un caso raro válido.

## Uso docente sugerido

1. Pide una predicción antes de ejecutar la animación.
2. Ejecuta o repite la interacción.
3. Solicita una explicación basada en la tabla o transformación.
4. Resuelve la pregunta y revisa el feedback.
5. Usa una herramienta de IA de forma externa para extender la práctica.
6. Si no hay conexión, continúa con el plan B local.

Los HTML no transmiten datos, no llaman APIs y no requieren credenciales.

## Referencias visuales

- `assets/design/level-1-literacy-approved.png`
- `assets/design/level-1-quality-approved.png`

## Supuestos

- Audiencia principiante.
- Sesiones de 60 a 90 minutos por bloque.
- Paco cursa segundo de preparatoria y ayuda a su papá tres noches después de la tarea.
- El puesto no crece durante Nivel 1: 3 × 2 metros, ocho asientos, un trompo y un comal.
- Las visualizaciones de Aprender y Ejercitar pueden usar datos didácticos pequeños; En vivo usa snapshots públicos reales como fuente principal.
- En vivo queda visible temporalmente solo en Nivel 1 mientras se revisa el material docente.
- Revisión humana de cualquier salida producida por IA.
