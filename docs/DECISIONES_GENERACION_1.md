# Decisiones confirmadas · Generación 1

Registro de lo que José Carlos confirmó para la oferta publicada en learninglabs.pages.dev (inicio, planes y términos). Si algo cambia, se actualiza aquí y en el sitio a la vez.

| Tema | Decisión | Confirmado | Dónde se publica |
| --- | --- | --- | --- |
| Fechas | Del viernes 8 de enero al sábado 20 de marzo de 2027 | 12 oct 2026 | Inicio, términos |
| Horario | Viernes 18:00–21:00 y sábados 8:00–11:00, hora de la Ciudad de México | 12 oct 2026 | Inicio, términos |
| Duración | 11 semanas · 22 clases de 3 horas · **66 horas** en vivo · **2 clases y 6 horas por semana** | 17 oct 2026 | Inicio (fechas, horario, plan), términos |
| Modalidad | En línea por Google Meet (reunión recurrente) | 17 oct 2026 | Inicio, términos, aviso de privacidad |
| Requisitos | Laptop con Windows o macOS (Mac con chip Apple M1 o posterior; Intel o Chromebook se revisan antes de pagar), permiso para instalar programas, internet estable, cuentas gratuitas de Google (Gmail personal), GitHub y ChatGPT, y GitHub Desktop y Codex instalados. Sin tableta ni celular. Sesión 0 grabada antes del 8 de enero | 25 oct 2026 | Inicio, términos, inscripción, `instalacion.html` |
| Grabaciones | Cada clase se graba y se guarda en Drive (Google Workspace); el alumno la ve 12 meses a partir de la fecha de esa clase | 17 oct 2026 | Inicio, términos, Mi avance (`mis_clases()`) |
| Precio | $9,900 MXN con IVA (precio Generación 1) · regular $14,900 | 12 oct 2026 | Inicio, términos |
| Pagos (todas las generaciones) | **Pago único con 10 % de descuento** (G1: $8,910), que es la opción que se promueve; o **3 pagos iguales**: el 1.º en la fecha de inicio, el 2.º un mes después y el 3.º dos meses después (G1: $3,300 el 8 ene, 8 feb y 8 mar 2027). Un pago atrasado puede suspender el acceso | 17 oct 2026 | Inicio (calculado por `site/cursos.js` con la generación más próxima), términos |
| Studio → curso | Lo pagado de Augmented Studio **en los 12 meses anteriores a la inscripción** se descuenta del precio del curso en vivo | 17 oct 2026 | Inicio (plan Studio y precio), términos |
| Acceso incluido | 12 meses de Augmented Studio con el curso (niveles 3+ hasta 12 meses después del fin del grupo) | 17 oct 2026 | Inicio, `tengo_acceso_pago()` |
| Docentes y grupos | Un solo grupo y un solo docente (José Carlos) | 17 oct 2026 | — |
| Procesador de pagos | **Stripe**, conectado a Supabase: el pago (o la tarjeta guardada de los 3 pagos) da de alta al alumno en su grupo, le manda la bienvenida con su TDD_ID y el tutorial de Colab, y todo queda en la base (inscripciones, pagos y eventos de Stripe) y en admin.html → Inscripciones. La alta manual desde admin.html sigue disponible | 24 oct 2026 | Inicio, inscripción, términos, aviso de privacidad |
| Formas de pago | Todas las que ofrece Stripe en México para el pago único (tarjeta, OXXO, transferencia SPEI). Los 3 pagos se cobran solos a la tarjeta registrada | 24 oct 2026 | Inscripción, términos |
| Descuento de contado | El 10 % aplica siempre, pero **si y solo si** se paga todo de contado | 24 oct 2026 | Inicio, inscripción, términos |
| Cobro fallido | Aviso al alumno (correo y Mi avance) y a administración. **Plazo de gracia de 1 semana** que vence el primer viernes a las 17:00 (Ciudad de México) que esté al menos 7 días después del fallo. Vencido sin pagar, se pausan Meet, grabaciones y niveles de pago hasta que pague | 24 oct 2026 | Términos, Mi avance |
| Grupo mínimo y máximo | **Mínimo 6**, máximo 30. Si no se llega al mínimo, el grupo no abre y se reembolsa el 100 % | 24 oct 2026 | Inicio, inscripción, términos |
| Lista de espera | Sí: con el grupo lleno o cerrado, la página de inscripción ofrece la lista de espera | 24 oct 2026 | Inscripción |
| Cierre de inscripciones | El día de inicio (8 ene 2027, al empezar la primera clase a las 18:00). Puede cambiar: se ajusta en admin.html → Inscripciones → Venta del grupo | 24 oct 2026 | Inscripción, términos |
| Precio de fundador | Solo para la Generación 1 | 24 oct 2026 | Inicio, inscripción, términos |
| Difusión | Facebook Ads, LinkedIn, WhatsApp y, más adelante, YouTube. Público: estudiantes, profesionistas que buscan cambiar de carrera y gente interesada en IA. Plan en `docs/DIFUSION_G1.md` | 24 oct 2026 | — |
| Código de recomendación | «Que les den 10 % a ambas personas, con un límite de no más de 30 % del curso». La persona recomendada paga 10 % menos sobre el precio de lista de su generación; quien recomienda recibe 10 % del precio de lista por cada recomendado que pague, hasta 30 % del precio de su curso (G1: máx. 3 recompensas = $2,970). Cada alumno inscrito y al corriente tiene su código en Mi avance con la liga `inscripcion.html?ref=CODIGO`. Un código por inscripción, no aplica al propio Gmail ni a pagos ya hechos. El precio lo decide la base | 30 oct 2026 | Inscripción, Mi avance, términos, aviso de privacidad, admin.html → Inscripciones |
| ⚙ Recomendación + pago único | **Supuesto por confirmar:** se acumula con el 10 % del pago único, ambos sobre precio de lista (G1: $9,900 − $990 − $990 = **$7,920**); en 3 pagos cada cuota baja 10 % (G1: $2,970). Se cambia en admin.html → Inscripciones → Configurar recomendación | 30 oct 2026 (⚙) | Inscripción, términos |
| ⚙ Cuándo se libera la recompensa | **Supuesto por confirmar:** queda «disponible» al terminar la 2.ª clase del grupo del recomendado (fin del reembolso total) y se cancela sola si se reembolsa antes | 30 oct 2026 (⚙) | Términos, admin.html |
| ⚙ Cómo se entrega la recompensa | **Supuesto por confirmar:** si quien recomienda paga en cuotas y le faltan, se descuenta de las siguientes (saldo a favor en Stripe); si ya pagó, reembolso parcial en Stripe. El dinero nunca se mueve solo: el docente pulsa «Entregar» en admin.html → Inscripciones → Recompensas por entregar | 30 oct 2026 (⚙) | Términos, admin.html |
| Presupuesto de Facebook Ads | **50 USD** por ahora, repartidos por semana hasta el cierre del 8 ene (plan en `docs/DIFUSION_G1.md`) | 30 oct 2026 | — |
| Clase abierta gratuita | **No habrá** por ahora | 30 oct 2026 | — |

## Cómo se calculan precio y fechas en el sitio

`site/cursos.js` guarda la lista de generaciones (inicio, fin, precio y precio regular) y muestra la más próxima: la primera cuyo inicio no ha pasado; si todas pasaron, la última. De ahí calcula el pago único (precio − 10 %), la cuota (precio ÷ 3) y las 3 fechas (inicio, +1 mes, +2 meses; si el día no existe en ese mes, el último día del mes). Para abrir una generación nueva basta agregarla a la lista.

## Cómo funciona la inscripción en línea

`site/inscripcion.html` pide el precio, las fechas y el cupo a la base (`oferta_inscripcion()`), aparta el lugar y abre Stripe Checkout por la Edge Function `tdd-inscripcion` del backend. Al volver, `site/inscripcion-lista.html` confirma el estado. El precio que se cobra lo decide la base (`grupos.precio`, abierto en admin.html → Inscripciones → Venta del grupo), no esta página; `site/cursos.js` solo lo muestra en el inicio, así que si cambias el precio, cámbialo en los dos lugares. Detalle técnico y pasos para conectar Stripe: `docs/PAGOS.md` del backend.

## Código de recomendación

`site/inscripcion.html` acepta un código (campo opcional o `?ref=CODIGO` en la liga) y pide a la base el precio con descuento (`validar_codigo_recomendacion()`); al inscribirse, la Edge Function vuelve a validarlo y Stripe cobra el precio que da la base. Los valores (10 %, 10 %, 30 %, acumulación, clases antes de liberar y forma de entrega) viven en la configuración de la base y se cambian en admin.html → Inscripciones → Configurar recomendación; los marcados ⚙ arriba están por confirmar. Detalle técnico y pasos: `docs/PAGOS.md` del backend.

## Pendientes de definir

- Facturación: CFDI y régimen fiscal (tablero p04).
- Cómo se descuenta lo pagado de Augmented Studio en la inscripción en línea: por ahora, con un código de promoción de Stripe que creas para esa persona (solo en pago único) o con un pago registrado a mano.
