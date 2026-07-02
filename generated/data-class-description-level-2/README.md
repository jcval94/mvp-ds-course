# DataClass Forge: Nivel 2

Material interactivo de Descripción y visualización.

## Cobertura

- 21 conceptos.
- 42 ejercicios dependientes de evidencia, con caso guiado y transferencia.
- 63 prompts: Codex, Gemini y ChatGPT por concepto.
- 4 laboratorios.
- 21 escenas continuas de Don Juan y Paco, con subtítulos accesibles del narrador.
- 600 pedidos sintéticos determinísticos para Aprender y Ejercitar.
- 3 snapshots de datasets públicos con fuente, licencia y SHA-256.

## Modos

- **Aprender:** episodio del puesto, explicación progresiva y subtítulos del narrador.
- **Ejercitar:** incidente nuevo del mismo mundo, animación obligatoria, pistas, evidencia y feedback específico.
- **En vivo:** modo docente oculto por defecto con `?teacher=1`; incluye snapshot real, guion, preguntas, evaluación, checklists, blueprint y plan offline. El ocultamiento en sitio estático no es autenticación real.

## Trazabilidad

```text
docs/CURRICULUM_MAP.md
→ docs/stories/LEVEL_2.md
→ docs/LEVEL_2_NARRATIVE_ARC.md
→ scripts/generate_level2.py
→ assets/curriculum.js + paquetes + manifest
```

El dataset estudiantil evoluciona como `L1.4 → L2.1 → L2.2 → L2.3 → L2.4`.
Los snapshots públicos se reservan como fuente principal de En vivo.

## Uso en vivo

Codex modifica o verifica la demo reproducible. Gemini o ChatGPT facilita,
cuestiona e interpreta la evidencia. El docente revisa toda salida antes de
usarla y mantiene disponible el plan offline.

Los HTML no llaman APIs ni transmiten datos.
