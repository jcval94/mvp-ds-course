# AGENTS.md · portal/

- Engine público: aquí no va contenido de misiones, solo plantillas que leen `dist/missions.json`.
- Solo rutas relativas; nada de `/ruta-absoluta`, `github.io`, `pages.dev` ni archivos de configuración de hosting.
- Usa los tokens de `design/tokens/tokens.css`.
- Cualquier cambio debe pasar `python -m harness build` y `python -m harness smoke`.
