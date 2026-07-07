# Technical Content Checklist

- [ ] La unidad de análisis está definida.
- [ ] Variables y tipos son coherentes.
- [ ] Los datos sintéticos y filas didácticas alteradas están etiquetados.
- [ ] Los snapshots públicos tienen fuente, licencia, fecha, dimensiones y SHA-256.
- [ ] El dataset principal de En vivo es un snapshot público real.
- [ ] El hash coincide con el archivo publicado.
- [ ] Totales, porcentajes y escalas cuadran.
- [ ] Ejes, leyendas y unidades son claros.
- [ ] El visual corresponde a los datos.
- [ ] Cada `evidenceId` visible corresponde a una marca y valor reales.
- [ ] El tipo de visual representa el mecanismo, no una codificación genérica engañosa.
- [ ] Las métricas están bien definidas.
- [ ] Los supuestos relevantes están explícitos.
- [ ] Correlación no se presenta como causalidad.
- [ ] No hay data leakage.
- [ ] El orden temporal se respeta cuando aplica.
- [ ] La conclusión está respaldada por la evidencia.
- [ ] Las afirmaciones técnicas del narrador son correctas y distinguen simplificación de definición.
- [ ] La versión, unidad de análisis, columnas y conteos del dataset narrativo coinciden con el ledger.
- [ ] No se infieren atributos sensibles por apariencia salvo objetivo explícito, necesidad y salvaguardas.
- [ ] Ninguna característica oculta de personaje aparece como atributo observado o inferido.
- [ ] Capacidad, asientos, horario, plantilla y rangos de pedidos son coherentes entre niveles.
- [ ] En Nivel 5 se declaran granularidad, llaves, cardinalidad y conteos antes/después; una suma posterior al JOIN se reconcilia con unidades únicas.
- [ ] En Nivel 11 cada test se vincula con un criterio; rutas locales y secretos reales quedan fuera del artifact y logs.
- [ ] Nivel 12 recibe un artifact existente y diseña un sistema de IA trazable sin duplicar construcción, empaquetado, CI/CD o deploy básico.
- [ ] Nivel 13 recibe un sistema de IA trazable y no duplica diseño de contexto, tools, skills, loops ni harness.

## Fallar si

- Hay una afirmación falsa o numéricamente imposible.
- Una escala visual induce una conclusión equivocada.
- Un intervalo, cola, distribución o conjunto se sustituye por barras sin justificación.
- Se elimina un outlier sin investigación.
- Se declara un modelo superior sin evaluación compatible.
