# Página de referencia

- Archivo: `Remix of Continuum 1.zip` (proyecto de Lovable del autor, recibido el 2026-10-05).
- Contenido: app React + TanStack Start + Supabase de **The Agentic D. Scientist**:
  landing bilingüe, login, portal del alumno por plan y admin.
- No se versiona aquí. Del proyecto solo se adopta el sistema visual y la
  estructura de la landing; el login, Supabase y el admin quedan fuera hasta que
  el curso necesite backend.
- Sustituye a la referencia anterior (`Pagina_Curso_Completa_2026-10-05`, réplica
  de AI News Daily), que no correspondía al curso.

## Qué se toma

| Elemento | Origen | Valor |
| --- | --- | --- |
| Acento | `#FDAA3E` en la landing | `--accent`, `--accent-hover` (`#fdb95e`), `--on-accent` (`#1a1a1a`) |
| Hero y CTA final | `background: #050d0a` | `--hero` |
| Secciones | blanco y `#fafaf7` alternados | `--surface`, `--surface-alt` |
| Texto, bordes, marrón | `src/styles.css` (`oklch`) convertidos a hex | `--text`, `--muted`, `--line`, `--primary`, `--surface-soft`, `--critical` |
| Tipografía | Plus Jakarta Sans 400–700 | `--font` |
| Radios | `--radius: .75rem` (botón `rounded-xl`, tarjeta `rounded-2xl`) | `--r-control: 16px`, `--r-card: 20px` |
| Regla de marca | `.lovable/memory`: "NEVER use green" | Sin verdes en tokens ni componentes |

## Ajuste de accesibilidad

La landing usa `#a86a14` para texto ámbar sobre blanco (contraste 4.4:1). Aquí
se usa `--accent-text: #94600f` (5.3:1) para cumplir AA en texto pequeño. El
ámbar `#fdaa3e` se reserva para rellenos, íconos y texto sobre `--hero`.

## Qué no se toma

- Testimonios: nombres y fotos de plantilla. No se publican hasta tener reales.
- `hero-bg.jpg`: foto heredada de la plantilla original (rastreador de hábitos).
- Formulario de pago de demostración: los planes de pago llevan a un correo.
