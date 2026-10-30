# Plan de difusión · Generación 1

Meta: llenar los **30 lugares** de la Generación 1 (mínimo 6 para abrir) antes del **viernes 8 de enero de 2027**, día en que cierran las inscripciones. Decisiones del 24 y del 30 oct 2026 (ver `DECISIONES_GENERACION_1.md`): presupuesto de Facebook Ads de **50 USD**, **sin clase abierta gratuita** y el **código de recomendación** como canal principal de boca en boca.

## Canales y público

| Canal | Para quién | Qué funciona ahí |
| --- | --- | --- |
| **Facebook Ads** (Facebook e Instagram) | Estudiantes y personas interesadas en IA que todavía no te conocen | Video corto de una intro animada de caso (Semmelweis o Berkeley): el gancho «¿qué decidirías tú?» y la liga a la inscripción |
| **LinkedIn** | Profesionistas que buscan cambiar de carrera hacia datos e IA | Publicaciones tuyas con un caso real y la decisión que enseña; el curso como cierre, no como inicio |
| **Código de recomendación** (canal principal de boca en boca) | La red de cada alumno inscrito: quien ya pagó convence mejor que cualquier anuncio | Cada alumno comparte su liga `inscripcion.html?ref=CODIGO` (está en Mi avance con botón Copiar): la otra persona paga 10 % menos y quien recomienda recibe 10 %, hasta 30 % |
| **WhatsApp** | Tu red directa: excompañeros, alumnos, grupos de carrera | Mensaje personal con la liga y una razón concreta para esa persona; reenvíos |
| **YouTube** (más adelante) | Quien quiere ver cómo enseñas antes de pagar | Un caso resuelto completo (10–15 min); ideal para la Generación 2 y para la recta final de la 1 |

Mensaje central, el mismo en todos los canales: **aprende ciencia de datos e IA desde cero resolviendo casos reales donde una decisión importa** (Wald y los bombarderos, Semmelweis, Berkeley), en vivo, con grupo pequeño, y aprendiendo a trabajar con IA en lugar de competir con ella.

Variantes por público:

- **Estudiantes:** «Lo que la escuela no te enseña: decidir con datos. 11 semanas, en vivo, desde cero.»
- **Cambio de carrera:** «Sin saber programar: Python, datos e IA con casos reales, viernes y sábados para que no choque con tu trabajo.»
- **Interesados en IA:** «Usa la IA como tu asistente de datos sin firmar a ciegas lo que te dice: delega, verifica y decide tú.»

Argumentos que siempre van: precio de fundador ($8,910 de contado o 3 pagos de $3,300) **solo para la Generación 1**; 30 lugares; grabación de cada clase; reembolso total si lo pides antes de que termine la segunda clase.

## Ligas con etiqueta (UTM)

Cada canal usa su propia liga. La página guarda la etiqueta y la inscripción la registra, así que en admin.html → Inscripciones ves de dónde llegó cada persona (columna «Origen») y lo puedes exportar en CSV.

| Canal | Liga |
| --- | --- |
| Facebook Ads | `https://learninglabs.pages.dev/inscripcion.html?utm_source=facebook&utm_medium=ads&utm_campaign=g1` |
| Instagram (mismos anuncios) | `https://learninglabs.pages.dev/inscripcion.html?utm_source=instagram&utm_medium=ads&utm_campaign=g1` |
| LinkedIn (publicaciones) | `https://learninglabs.pages.dev/?utm_source=linkedin&utm_medium=post&utm_campaign=g1` |
| WhatsApp | `https://learninglabs.pages.dev/?utm_source=whatsapp&utm_medium=mensaje&utm_campaign=g1` |
| YouTube | `https://learninglabs.pages.dev/?utm_source=youtube&utm_medium=video&utm_campaign=g1` |

Para distinguir anuncios dentro de una campaña, agrega `&utm_content=semmelweis` (o el nombre de la pieza). Las recomendaciones usan la liga con el código de cada alumno (`inscripcion.html?ref=ANA-7K3P`): la página precarga el código, aplica el 10 % y la columna «Código usado / recomendado por» de admin.html dice quién trajo a quién. Un `?ref=` que no tiene forma de código (por ejemplo `?ref=juan`) solo se guarda como origen, sin descuento.

## Código de recomendación: el canal principal de boca en boca

Cada inscrito recibe su código en el correo de bienvenida y en Mi avance. Pídeselo a cada persona que se inscribe, en la llamada o mensaje de bienvenida: es la forma más barata de llenar el grupo (no cuesta nada hasta que alguien paga, y la recompensa solo se libera tras la 2.ª clase).

Mensaje sugerido para que el alumno lo reenvíe por WhatsApp (cópialo en tu bienvenida):

> Me inscribí a **The Agentic Data Scientist**, un curso en vivo de ciencia de datos e IA desde cero con casos reales (Wald y los bombarderos, Semmelweis, Berkeley). Empieza el viernes 8 de enero, viernes y sábados, 11 semanas por Meet y con grabación. Con mi código **ANA-7K3P** pagas 10 % menos: $7,920 de contado o 3 pagos de $2,970 (precio de fundador, solo esta generación).
> Aquí te inscribes con el código ya puesto: https://learninglabs.pages.dev/inscripcion.html?ref=ANA-7K3P

(Cada alumno cambia `ANA-7K3P` por su código; el botón Copiar de Mi avance copia la liga completa.)

Tu propio mensaje de WhatsApp a tu red (sin código; lleva la etiqueta de WhatsApp): «Abrí la Generación 1 de mi curso en vivo de ciencia de datos e IA desde cero. Casos reales, viernes y sábados desde el 8 de enero, 30 lugares. Si conoces a alguien que quiera cambiarse a datos, pásale esto: https://learninglabs.pages.dev/?utm_source=whatsapp&utm_medium=mensaje&utm_campaign=g1».

## Facebook Ads: 50 USD hasta el 8 de enero

Con 50 USD no hay margen para muchas pruebas: el dinero se usa para **descubrir qué público inscribe** y concentrarlo en el cierre. Todo con la liga de Facebook o Instagram de arriba (`utm_campaign=g1`, `utm_content=` con el nombre de la pieza) y objetivo **Tráfico** hacia `inscripcion.html` (con tan pocas inscripciones, Meta no tiene datos para optimizar por conversiones).

| Semanas | Campaña | Públicos | Presupuesto | Para qué |
| --- | --- | --- | --- | --- |
| 3 – 9 nov | **Prueba** | 3 conjuntos: estudiantes 18–25; profesionistas 25–40 «cambio de carrera»; interesados en IA y ChatGPT 22–45. México, Facebook + Instagram, el mismo video de intro de caso | **15 USD** (1 USD al día por conjunto, 5 días) | Ver qué público da clics baratos y apartados |
| 10 nov – 6 dic | **Ganador** | El conjunto con menor costo por apartado (o por clic, si nadie apartó); prueba 2 piezas dentro de él (Semmelweis y Berkeley) | **20 USD** (≈ 0.75 USD al día) | Conseguir las primeras inscripciones pagadas desde Ads |
| 7 – 25 dic | **Pausa** | — | 0 USD | Diciembre es caro y lento; el boca en boca (código de recomendación) y LinkedIn cargan esta etapa |
| 26 dic – 7 ene | **Cierre** | Público ganador + personas que visitaron `inscripcion.html` (retargeting, si el píxel tiene al menos 100 visitas) con «Quedan N lugares · cierra el 8 de enero» | **15 USD** (≈ 1.15 USD al día) | Convertir a quien ya vio el curso |
| | | | **Total 50 USD** | |

**Métrica que manda: costo por inscripción** = gasto en Ads ÷ inscripciones pagadas con `utm_source` facebook o instagram (admin.html → Inscripciones → Exportar CSV, columna `utm_source`). Mientras no haya inscripciones, usa como señal temprana el **costo por apartado** (inscripciones que llegaron a Stripe, aunque no pagaran: «Mostrar intentos sin pagar»).

Reglas para pausar o subir (revisión de cada lunes):

- **Pausar un conjunto** si gastó 5 USD sin un solo apartado, o si su costo por clic es más del doble que el del mejor conjunto.
- **Pasar su dinero al ganador** (no subir el total): el que tenga el menor costo por apartado.
- **Subir el presupuesto total** solo si el costo por inscripción queda **por debajo de 45 USD** (≈ 10 % de lo que entra por una inscripción de contado) con al menos 2 inscripciones. Subir es decisión tuya: la regla dice cuándo vale la pena pedirlo.
- Si al 6 de diciembre Ads no trajo ninguna inscripción, no gastes los 15 USD del cierre en frío: úsalos solo en retargeting o guárdalos.

## Calendario (hacia atrás desde el 8 de enero)

| Semanas | Qué pasa |
| --- | --- |
| 27 oct – 2 nov | Conectar Stripe en modo de prueba y hacer una inscripción de punta a punta; abrir la venta en modo real. Preparar 3 piezas: un video de intro de caso, una publicación de LinkedIn y el mensaje de WhatsApp |
| 3 – 30 nov | **Lanzamiento.** WhatsApp a tu red la primera semana; LinkedIn 2–3 veces por semana (un caso por publicación); Facebook Ads: prueba de 15 USD con los 3 públicos (3–9 nov) y después el ganador con 20 USD. A cada persona que se inscribe, pídele que comparta su código de recomendación |
| 1 – 25 dic | Ads en pausa desde el 7 dic. Recordatorio a los inscritos de su código de recomendación («tu recompensa se libera tras la 2.ª clase»); LinkedIn con «solo 30 lugares» y el número real que muestra la página |
| 26 dic – 8 ene | **Cierre.** Facebook Ads de cierre (15 USD); «Quedan N lugares», recordatorio a quien está en lista de espera si se libera un lugar, último mensaje el 7 de enero |

Revisión semanal (lunes, 15 minutos): inscripciones por canal en admin.html (incluida la columna «Código usado / recomendado por»), lugares ocupados frente al mínimo de 6, costo por inscripción de Facebook Ads con las reglas de arriba y recompensas por entregar.

## Decidido el 30 oct 2026

- ~~Presupuesto total de Facebook Ads y cuánto por semana~~ → 50 USD con el reparto de arriba.
- ~~Clase abierta gratuita en diciembre~~ → **descartada** por ahora.
- ~~Código de descuento para quien recomiende~~ → código de recomendación propio de cada alumno: 10 % para ambas personas, hasta 30 % (ya no es un código de promoción de Stripe; lo calcula la base y aplica también a los 3 pagos).

## Preguntas abiertas para ti

- Los supuestos ⚙ del código de recomendación (acumulación con el pago único, liberar tras la 2.ª clase y forma de entrega) en `DECISIONES_GENERACION_1.md`.
