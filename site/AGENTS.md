# AGENTS.md · site/

Páginas que ve la gente: portada, inscripción, área del alumno (`alumno.*`), paneles docente y de administración, casos
(`casos/`) y práctica (`practica/`). Todo lo de esta carpeta se publica tal cual.

- **Textos visibles, precios, fechas, acceso gratis o de pago y estilo los decide el autor.** Propón en el PR; no fijes.
- **Repositorio público:** nada de respuestas de retos, rúbricas, datos de alumnos ni llaves secretas. En `sesion.js`
  solo va la clave publicable de Supabase; la seguridad vive en la base (RLS y funciones).
- **Colores:** solo variables de `design/tokens/tokens.css`; el harness rechaza colores literales. Nunca verde
  (`design/AGENTS.md`). La capa 8 bits vive en `casos/` y `practica/`, no en la portada ni en textos largos.
- **Casos:** lee `casos/README.md` y las skills `tads-*`. Un caso de la página no lleva enlace de Colab; uno de Colab
  lleva el mismo enlace en `escenas.js`, en el `noscript` de su `index.html` y en `CUADERNOS` de `alumno.js` (lo revisa
  el harness).
- **Celular primero:** revisa a 390 px y a 1440 px; botones de al menos 44 px; respeta `prefers-reduced-motion`.
- **Calificación:** son los bits de los casos, en la página o en Colab. No agregues otra forma de calificar sin decisión
  del autor (`docs/DECISIONES_GENERACION_1.md`).
- Antes de cerrar: `python -m harness all` y `python -m pytest -q harness/tests`.
