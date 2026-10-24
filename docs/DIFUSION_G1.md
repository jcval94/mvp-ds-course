# Plan de difusión · Generación 1

Meta: llenar los **30 lugares** de la Generación 1 (mínimo 6 para abrir) antes del **viernes 8 de enero de 2027**, día en que cierran las inscripciones. Decisiones del 24 oct 2026 (ver `DECISIONES_GENERACION_1.md`).

## Canales y público

| Canal | Para quién | Qué funciona ahí |
| --- | --- | --- |
| **Facebook Ads** (Facebook e Instagram) | Estudiantes y personas interesadas en IA que todavía no te conocen | Video corto de una intro animada de caso (Semmelweis o Berkeley): el gancho «¿qué decidirías tú?» y la liga a la inscripción |
| **LinkedIn** | Profesionistas que buscan cambiar de carrera hacia datos e IA | Publicaciones tuyas con un caso real y la decisión que enseña; el curso como cierre, no como inicio |
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

Para distinguir anuncios dentro de una campaña, agrega `&utm_content=semmelweis` (o el nombre de la pieza). Para una persona que te recomienda: `?ref=nombre`.

## Calendario (hacia atrás desde el 8 de enero)

| Semanas | Qué pasa |
| --- | --- |
| 27 oct – 2 nov | Conectar Stripe en modo de prueba y hacer una inscripción de punta a punta; abrir la venta en modo real. Preparar 3 piezas: un video de intro de caso, una publicación de LinkedIn y el mensaje de WhatsApp |
| 3 – 30 nov | **Lanzamiento.** WhatsApp a tu red la primera semana; LinkedIn 2–3 veces por semana (un caso por publicación); Facebook Ads de prueba con los 3 públicos para ver cuál inscribe más barato |
| 1 – 20 dic | Subir presupuesto al público y la pieza que mejor convirtieron; recordar «solo 30 lugares» con el número real que muestra la página |
| 21 dic – 8 ene | **Cierre.** «Quedan N lugares», recordatorio a quien está en lista de espera si se libera un lugar, último mensaje el 7 de enero |

Revisión semanal (lunes, 15 minutos): inscripciones por canal en admin.html, lugares ocupados frente al mínimo de 6 y cuánto costó cada inscripción en Facebook Ads.

## Preguntas abiertas para ti

- Presupuesto total de Facebook Ads y cuánto por semana.
- Si quieres una clase abierta gratuita en diciembre (un caso resuelto en vivo) como evento de cierre.
- Si das un código de descuento a quien recomiende a alguien (se crea en Stripe como código de promoción; solo aplica al pago único).
