# AGENTS.md · design/

- `tokens/tokens.css` y `tokens/tokens.json` deben tener los mismos colores. Si cambias uno, cambia el otro; `python -m harness validate` lo comprueba.
- La capa base reproduce The Agentic D. Scientist (ver `REFERENCE.md`). No cambies su carácter.
- Nunca verde. El ámbar `--accent` es relleno; el texto de acento sobre fondo claro usa `--accent-text`.
- La capa 8 bits vive solo en misiones y ejercicios: nunca en la landing, párrafos, tablas ni gráficas.
- Nada de rutas absolutas (`/algo`) ni URLs de un hosting concreto.
- Engine público: este directorio nunca contiene contenido premium.
