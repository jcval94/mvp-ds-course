# Historia Nivel {{level}}: {{title}}

## Control del documento

- **Estado:** borrador
- **Fuente curricular:** `docs/CURRICULUM_MAP.md`, Nivel {{level}}
- **Story Bible:** `docs/COURSE_STORY_BIBLE.md`
- **Ledger de entrada:** `docs/CONTINUITY_LEDGER.md`
- **Audiencia:** {{audience}}
- **Duración:** {{duration}}
- **Supuestos:** {{assumptions}}

## 1. Temario predeterminado

| Orden | Bloque | Concepto | Resultado curricular | Prerrequisitos |
| ---: | --- | --- | --- | --- |
| 1 | {{block}} | {{concept}} | {{outcome}} | {{prerequisites}} |

## 2. Estado narrativo de entrada

- **Personajes disponibles:** {{characters}}
- **Conocimientos permitidos:** {{knowledge_state}}
- **Estado del negocio:** {{business_state}}
- **Estado del dataset:** {{dataset_state}}
- **Asuntos abiertos:** {{open_threads}}

## 3. Mapa de episodios y escenas

| Escena | Concepto principal | Conflicto | Evidencia | Competencia auxiliar de agentes | Incidente de Ejercitar | Cambio de continuidad |
| --- | --- | --- | --- | --- | --- | --- |
| {{scene_id}} | {{concept}} | {{conflict}} | {{evidence}} | {{agent_competency_or_none}} | {{practice_incident}} | {{continuity_delta}} |

## 4. Historia

### Episodio {{episode_id}}: {{episode_title}}

#### Escena {{scene_id}}: {{scene_title}}

**Situación:** {{setup}}

> **Subtítulo del narrador · inicio:** {{narrator_intro}}

**{{character}}:** —{{dialogue}}

> **Subtítulo del narrador · evidencia:** {{narrator_conclusion}}

**Evidencia visible:** {{visible_evidence}}

**Salida de la escena:** {{scene_output}}

**Continuity delta:** {{continuity_delta}}

## 5. Contrato de voz y subtítulos

- El narrador introduce términos y conclusiones de ciencia de datos.
- Todo texto del narrador se renderiza como subtítulo, nunca como diálogo.
- Don Juan aporta experiencia del negocio en lenguaje cotidiano.
- Paco habla como hijo, ayudante y estudiante; no adelanta conocimiento.
- Los invitados solo conocen lo compatible con su profesión y momento.

## 6. Estado narrativo de salida

- **Conocimientos adquiridos:** {{knowledge_delta}}
- **Estado del negocio:** {{business_delta}}
- **Estado del dataset:** {{dataset_delta}}
- **Asuntos que pasan al siguiente nivel:** {{next_threads}}

## 7. Validación

- [ ] Todos los conceptos curriculares aparecen una vez como objetivo principal.
- [ ] La historia pasó revisión técnica, pedagógica y de continuidad.
- [ ] Los subtítulos contienen los nombres y conclusiones técnicas.
- [ ] Aprender y Ejercitar usan incidentes y evidencia distintos.
- [ ] No hay información personal innecesaria.
- [ ] El ledger puede actualizarse sin contradicciones.

## No objetivos

- {{non_goals}}
