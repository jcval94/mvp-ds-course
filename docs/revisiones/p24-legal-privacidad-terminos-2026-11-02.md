# [p24] Revisión preliminar de aviso de privacidad y términos — Generación 1

**Fecha de corte:** 2 de noviembre de 2026  
**Estado:** revisión documental terminada; **no aprobado para publicación como dictamen legal**.  
**Responsable de decisiones comerciales y validación final:** autor del curso.  
**Alcance:** sitio público (`site/aviso-privacidad.html` y `site/terminos.html`), formulario de inscripción, decisiones G1 y PR #25, #59 y #60. No se inspeccionó el payload real ni la configuración privada de Stripe, Supabase, Google u OpenAI. No se pudo confirmar que la versión desplegada en Cloudflare sea idéntica al commit analizado.

> Este documento es una auditoría documental y guía de corrección, no asesoría ni certificación jurídica. Requiere revisión de un abogado mexicano antes de autorizar cobros e inscripción pública. No se modifican textos contractuales ni se aprueban supuestos del autor en este PR.

## 1. Fuentes y trazabilidad

- Aviso: https://github.com/jcval94/mvp-ds-course/blob/main/site/aviso-privacidad.html
- Términos: https://github.com/jcval94/mvp-ds-course/blob/main/site/terminos.html
- Inscripción: https://github.com/jcval94/mvp-ds-course/blob/main/site/inscripcion.html
- Decisiones: https://github.com/jcval94/mvp-ds-course/blob/main/docs/DECISIONES_GENERACION_1.md
- PR #25 (mensajes y ayuda de IA): https://github.com/jcval94/mvp-ds-course/pull/25
- PR #59 (MSI, recomendaciones y reglas de grupo): https://github.com/jcval94/mvp-ds-course/pull/59
- PR #60 (calificación solo con bits): https://github.com/jcval94/mvp-ds-course/pull/60
- LFPDPPP, texto vigente, reformada DOF 14-11-2025: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf (arts. 14-15, 22-34).
- LFPC, texto vigente, reformada DOF 12-12-2025: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPC.pdf (arts. 1, 76 Bis, 85 y 90).

## 2. Hallazgos priorizados

| ID | Riesgo | Evidencia | Cambio o verificación recomendada | Quién resuelve |
| --- | --- | --- | --- | --- |
| H01 P1 | **Cobros automáticos y cancelación de Studio** | Términos ofrecen Studio mensual/anual y tres cobros programados; no explicitan mecanismo operativo de cancelación de Studio ni consentimiento desglosado para recurrencia. | Cumplir LFPC 76 Bis VIII-IX: monto, periodicidad, consentimiento expreso e informado, mecanismo de cancelación inmediata cuando corresponda; revisar aviso de renovación. Distinguir suscripción renovable de plan de tres cuotas. | Autor + implementación + abogado |
| H02 P1 | **“No hay reembolsos” de manera absoluta** | Tras segunda clase los términos niegan cualquier reembolso; convivencia también prevé suspensión sin devolución. | Preservar expresamente los derechos irrenunciables del consumidor en casos de incumplimiento imputable al proveedor y demás supuestos legales; regular la suspensión con criterios proporcionales. Revisar LFPC arts. 1, 85, 90 y 92. | Autor + abogado |
| H03 P1 | **Afirmación demasiado categórica sobre OpenAI** | Aviso: el servicio solo recibe pregunta, rúbrica y respuesta, “sin nombre, correo ni ID”, y asegura que los datos personales “así nunca llegan”. | Comprobar el payload real y logs. Aunque se excluyan campos de identificación, el texto libre puede contener datos identificables. Sustituir “nunca” por descripción exacta del filtrado, política de minimización y advertencia; verificar contratos y ajustes reales del proveedor. | Implementación + autor + abogado |
| H04 P1 | **Finalidades secundarias y consentimiento** | Aviso dice “con tu consentimiento” para promociones y análisis agregado; inscripción usa una única casilla obligatoria de aceptación general. | Definir y registrar consentimiento diferenciado para finalidades no necesarias cuando corresponda. No presumir que aceptar los términos equivale a optar por publicidad. Verificar que no se envíen promociones sin autorización aplicable. | Autor + implementación |
| H05 P1 | **Fecha ambigua del grupo reprogramado** | “Un mes después” de 08-01-2027 cae lunes 08-02-2027, no en horario de viernes/sábado. | Elegir y anunciar fecha concreta de la nueva generación o una regla verificable (“primer viernes de...”), con nuevo calendario y plazo de devolución. La reprogramación no sustituye la devolución del grupo que no abrió. | Autor |
| H06 P1 | **Identificación/contacto para comercio electrónico** | Aviso y términos indican domicilio pero sin código postal; términos aportan correo pero no teléfono. | Confirmar domicilio profesional donde pueden recibirse notificaciones, código postal y **número telefónico de atención** antes del pago. LFPC 76 Bis III menciona domicilio físico, números telefónicos y otros medios. LFPDPPP art. 15 I exige identidad y domicilio del responsable; el CP ayuda a que sea inequívoco. | Autor |
| H07 P2 | **Retención de avance indeterminada** | Aviso: “mientras tengas acceso ... y hasta dos años después”. Puede equivaler a tres años o más si el acceso dura un año. | Definir evento de inicio del plazo de dos años, alcance (respuestas, mensajes, calificaciones, bits, respaldos), excepciones fiscales y políticas de borrado/anónimo. Confirmar que la implementación cumpla la promesa. | Autor + implementación |
| H08 P2 | **Reembolso en 15 días hábiles** | Términos prometen devolver al mismo medio de pago en máximo 15 días hábiles. | Decidir si el compromiso es iniciar el trámite o acreditar fondos. No prometer acreditación total si depende de plazos bancarios; conservar derecho a devolución dentro del plazo que corresponda. Verificar procesador y definir acuse y cómputo. | Autor + abogado + Stripe |
| H09 P2 | **Suspensión por mora** | Términos prevén plazo de gracia y bloqueo de clases y grabaciones por impago. | Confirmar que solo aplique a deuda exigible, que haya avisos y reactivación verificable, y que no interfiera con reclamaciones o derechos legales. Probar el cálculo real del viernes 17:00 CDMX. | Autor + implementación |
| H10 P2 | **Grabaciones, acceso de compañeros y consentimiento** | Aviso contempla voz, imagen y chat captados; términos anuncian todas las clases grabadas. | Aclarar quién puede ver las grabaciones, condiciones de privacidad, alternativas para participantes sin cámara/micrófono y procedimiento de atención a incidentes; verificar controles de Drive/Meet. | Autor + implementación |
| H11 P2 | **Referidos y devoluciones** | 10% para recomendado; retorno 10% por referido al recomendador hasta 30%, “precio de su generación”, al medio de pago. | Definir base de cálculo para quien recomienda, momento de pago, cancelaciones/contracargos y si hay reversión de bonificaciones, impuestos y tiempos operativos; revisar claridad de publicidad. | Autor + abogado |
| H12 P2 | **Constancia y repositorio GitHub** | Proyecto individual en GitHub requerido, aunque “publicarlo en línea para CV es opcional”; nota dice solo bits como calificación. | Aclarar que un repositorio **privado** puede servir mediante acceso al docente si esa es la intención; precisar evidencia entregable, quién la ve, duración del acceso, y que la constancia no equivale automáticamente a acreditación oficial. El proyecto no pondera, conforme PR #60. | Autor |
| H13 P2 | **Reposición de clases y calendario** | Añadir semanas “al final, en mismo horario”. | Definir límite o procedimiento de aviso, nueva fecha de fin y remedios si el prestador no cumple el servicio sustancial; no renunciar a derechos del consumidor. | Autor + abogado |
| H14 P2 | **Proveedor, transferencia y seguridad** | Aviso enumera Supabase, Google, Stripe, Cloudflare, OpenAI y ubica ciertos servidores en EE. UU. | Confirmar países, roles responsables/encargados, terceros que reciben mensajes/adjuntos, registro de actividades y tratamiento de datos de estudiantes; no atribuir localización contractual no comprobada. | Implementación + abogado |
| H15 P2 | **Versionado documental y evidencias** | Aviso muestra “24 de octubre”, términos “25 de octubre” pese a cambios fusionados el 1 de noviembre. | Actualizar fechas únicamente al introducir cambios efectivos; conservar versión, evidencia de aceptación, enlace a términos vigentes al comprar y registro del texto mostrado al usuario. | Implementación |
| H16 P2 | **Plataforma de pagos y venta comprobable** | Ofertas de MSI, SPEI, OXXO, Studio y cuotas descritas en términos. | Validar en test mode tarjetas mexicanas elegibles, precios finales/impuestos, límites de promoción, descuento Studio y cargo inicial; evitar ofrecer alternativas aún no operativas. | Autor + implementación |

## 3. Decisiones del autor que bloquean la publicación

Responder por cada código. No hay valores asumidos ni modificación de políticas por esta auditoría.

- **D1 — Plazo de avance:** ¿dos años contados desde la última actividad, desde el último día de acceso, o desde la terminación de la generación? ¿Qué queda bajo obligación legal después?
- **D2 — Datos de contacto:** confirmar identidad comercial, domicilio físico para notificaciones, **código postal**, teléfono de atención y correo de privacidad; usar únicamente los que se autorice publicar.
- **D3 — Reembolso:** confirmar máximo de 15 días hábiles, hito inicial, diferencia entre ordenar y acreditar devolución, y excepciones por incumplimiento/ley.
- **D4 — Reprogramación por mínimo:** fijar fecha exacta o regla compatible con viernes/sábado y el nuevo período de inscripción. Confirmar reintegro 100% aun si se ofrece la nueva generación.
- **D5 — Mora:** confirmar si el acceso a grabaciones y clases se bloquea efectivamente tras gracia y cómo se restablece, con pruebas y notificación.
- **D6 — IA:** aprobar redacción prudente; antes verificar el cuerpo real enviado al proveedor, retención/configuración contractual y manejo de texto libre con PII. Nunca publicar como hecho una garantía no probada.
- **D7 — Marketing y grabaciones:** decidir consentimiento separado para promociones; definir quién recibe las grabaciones y si el alumno puede cursar con cámara y micrófono apagados.
- **D8 — Studio:** confirmar si se vende como suscripción con renovación automática y, de ser así, el mecanismo real e inmediato de cancelación y aceptación específica.
- **D9 — Constancia:** confirmar si proyecto en GitHub privado compartido con el docente cuenta; constancia por entrega vs entrega y validación mínima; aclarar carácter no oficial si aplica.
- **D10 — Referidos:** confirmar base de devolución, pagos de referidos con rembolsos o contracargos, topes y plazo.

## 4. Propuestas de redacción condicionadas

**OpenAI (no insertar sin prueba técnica):**  
“Cuando el docente solicita una sugerencia asistida por IA, se envían los campos necesarios para analizar la respuesta. El sistema procura excluir identificadores de cuenta; sin embargo, los textos escritos libremente pueden contener información personal proporcionada por el alumno. No incluyas nombres, datos de contacto ni otros datos personales en respuestas abiertas. Las sugerencias no sustituyen la decisión del profesor. Para conocer los proveedores y ejercer tus derechos, consulta este aviso.”

**Límite de reembolso (sujeto a asesoría):**  
“La devolución voluntaria antes del término de la segunda clase se realiza conforme a las condiciones indicadas. Esta política no limita los derechos irrenunciables de la persona consumidora ni las devoluciones que procedan por incumplimiento imputable al proveedor o por disposición legal.”

**GitHub (si autor confirma repositorios privados):**  
“El proyecto final puede entregarse en un repositorio privado compartido con el docente para su evaluación. Su difusión pública es opcional. La calificación del curso se calcula con bits; el proyecto es requisito separado para obtener constancia.”

**Reposición (sujeto a decisión):**  
“Si una clase no puede impartirse por causas imputables a la organización, informaremos por el medio registrado la fecha de reposición, la nueva fecha de terminación y las opciones disponibles conforme a la legislación aplicable.”

**Retención (plantilla pendiente de D1):**  
“Conservamos el avance y las respuestas durante [plazo y evento de inicio confirmados] y los eliminamos o anonimizamos al concluir ese plazo, salvo que exista una obligación legal de conservación o una solicitud/controversia que requiera bloqueo.”

No insertar textos entre corchetes ni términos condicionales en producción.

## 5. Verificación funcional antes de fusionar cualquier cambio

1. Abrir https://learninglabs.pages.dev/aviso-privacidad.html y https://learninglabs.pages.dev/terminos.html; cotejar secciones y fecha con versión aprobada de GitHub. Esta auditoría no logró leer de forma confiable la URL publicada.
2. Abrir https://learninglabs.pages.dev/inscripcion.html sin completar pagos; verificar que el enlace a ambos documentos sea accesible antes de marcar aceptación y que el consentimiento promocional no esté implícito.
3. En Stripe Dashboard, verificar con pruebas controladas los tres medios de cobro, MSI, 3 cuotas, devoluciones, reintentos, cancelación y suscripciones; registrar evidencia de resultados sin datos de tarjetas ni alumnos.
4. En backend privado, inspeccionar únicamente con acceso autorizado el payload de OpenAI y medidas de minimización; **no** reproducir rúbricas, respuestas reales ni datos de alumnos en un repo público.
5. Probar el flujo de grupo insuficiente, retraso de pagos y permisos de grabaciones; asegurar que el comportamiento coincida con los términos elegidos.
6. Solicitar revisión de un abogado de protección de datos/consumo en México, aplicar correcciones a sitio y lógica en PRs separados, verificar CI y revisar antes del merge.

## 6. Criterios de aceptación

- [x] Revisados el aviso, los términos, el formulario y los PR #25, #59 y #60 a fecha de corte.
- [x] Identificados riesgos documentales y supuestos del autor con base legal.
- [x] Entregadas propuestas no definitivas de texto y lista de verificación.
- [ ] Decisiones D1–D10 aprobadas por el autor.
- [ ] Dirección/CP/teléfono comercial verificados.
- [ ] Redacción y flujos de IA, grabaciones, consentimiento y pagos cotejados contra sistemas reales.
- [ ] Revisión jurídica externa aprobada.
- [ ] Cambios documentales y de código publicados, CI verificada y aviso accesible en producción.
- [ ] Tarea [p24] actualizada en el tablero original; no localizado con certeza desde los conectores consultados.

**Estado sugerido al tablero:** “En revisión / Bloqueado por aprobación legal y decisiones del autor”, no “Terminado”.  
**Advertencia:** el alcance de este PR es **solo este documento**; no contiene ni deberá contener cambios en términos del alumno, cobros, datos reales o backend privado.
