# Decisiones confirmadas · Generación 1

Registro de lo que José Carlos confirmó para la oferta publicada en learninglabs.pages.dev (inicio, planes y términos). Si algo cambia, se actualiza aquí y en el sitio a la vez.

| Tema | Decisión | Confirmado | Dónde se publica |
| --- | --- | --- | --- |
| Fechas | Del viernes 8 de enero al sábado 20 de marzo de 2027 | 12 oct 2026 | Inicio, términos |
| Horario | Viernes 18:00–21:00 y sábados 8:00–11:00, hora de la Ciudad de México | 12 oct 2026 | Inicio, términos |
| Duración | 11 semanas · 22 clases de 3 horas · **66 horas** en vivo · **2 clases y 6 horas por semana** | 17 oct 2026 | Inicio (fechas, horario, plan), términos |
| Modalidad | En línea por Google Meet (reunión recurrente) | 17 oct 2026 | Inicio, términos, aviso de privacidad |
| Grabaciones | Cada clase se graba y se guarda en Drive (Google Workspace); el alumno la ve 12 meses a partir de la fecha de esa clase | 17 oct 2026 | Inicio, términos, Mi avance (`mis_clases()`) |
| Precio | $9,900 MXN con IVA (precio Generación 1) · regular $14,900 | 12 oct 2026 | Inicio, términos |
| Pagos (todas las generaciones) | **Pago único con 10 % de descuento** (G1: $8,910), que es la opción que se promueve; o **3 pagos iguales**: el 1.º en la fecha de inicio, el 2.º un mes después y el 3.º dos meses después (G1: $3,300 el 8 ene, 8 feb y 8 mar 2027). Un pago atrasado puede suspender el acceso | 17 oct 2026 | Inicio (calculado por `site/cursos.js` con la generación más próxima), términos |
| Studio → curso | Lo pagado de Augmented Studio **en los 12 meses anteriores a la inscripción** se descuenta del precio del curso en vivo | 17 oct 2026 | Inicio (plan Studio y precio), términos |
| Acceso incluido | 12 meses de Augmented Studio con el curso (niveles 3+ hasta 12 meses después del fin del grupo) | 17 oct 2026 | Inicio, `tengo_acceso_pago()` |
| Docentes y grupos | Un solo grupo y un solo docente (José Carlos) | 17 oct 2026 | — |

## Cómo se calculan precio y fechas en el sitio

`site/cursos.js` guarda la lista de generaciones (inicio, fin, precio y precio regular) y muestra la más próxima: la primera cuyo inicio no ha pasado; si todas pasaron, la última. De ahí calcula el pago único (precio − 10 %), la cuota (precio ÷ 3) y las 3 fechas (inicio, +1 mes, +2 meses; si el día no existe en ese mes, el último día del mes). Para abrir una generación nueva basta agregarla a la lista.

## Pendientes de definir

- Procesador de pagos y facturación (tablero p02 y p04).
