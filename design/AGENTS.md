# AGENTS.md · design/

- `tokens/tokens.css` y `tokens/tokens.json` deben tener los mismos colores. Si cambias uno, cambia el otro; `python -m harness validate` lo comprueba.
- `tokens/tokens.css` solo contiene variables; los componentes van en `components/components.css`.
- La capa base reproduce la página de referencia. No cambies su carácter.
- La capa 8 bits es acento: nunca en párrafos, tablas ni gráficas.
- Nada de rutas absolutas (`/algo`) ni URLs de un hosting concreto.
- Engine público: este directorio nunca contiene contenido premium.
