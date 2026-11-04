# Casos resueltos en la página · patrón y caso 1.1 Wald

**Estado:** diseño del 4 nov 2026 (tablero u06, fase 1). Decisión del autor (u01): las clases 1 a 4 se resuelven en la página,
sin Colab; Colab entra al inicio de la clase 5 y desde ahí cada caso va donde más valga (`docs/PAGINA_O_COLAB.md`, u10).
Este documento es la fuente para construir el reproductor (E-10) y el modelo para 1.2, 1.4, 13.11, 2.1, 2.2 y sus casos de
error. Lo privado (claves de los retos, rúbricas, notas docentes y cambios de la base) vive en
`docs/CASO_1_1_PAGINA.md` de `agentic-ds-backen`.

## 1. Por qué y qué cambia

- Los alumnos resintieron el salto de la intro a Colab: otra herramienta, copia en Drive, dos secretos, celdas que fallan si
  la sesión se cae. En la página el caso sigue en el mismo lugar, con el mismo estilo y con la sesión de Google que ya usa
  Mi avance.
- **La intro no cambia de papel:** sigue siendo el gancho público, no guarda nada y no pide la apuesta.
- **El caso pasa de Colab a la página**, con el mismo arco (apuesta → mirar → fricción → herramienta → verificar → firmar →
  revelación → transferir), los mismos ids de secciones y de retos y las mismas reglas de bits. Para la base, el panel
  docente y Mi avance, un caso resuelto en la página es igual que uno resuelto en Colab.
- La sesión perdida deja de ser un problema: al volver, la página recupera lo que el alumno ya hizo desde la base.

## 2. Dónde vive

| Pieza | Ruta | Guarda algo |
| --- | --- | --- |
| Intro (sin cambios de papel) | `site/casos/1-1/index.html` + `escenas.js` | No |
| Caso | `site/casos/1-1/caso.html` + `caso-escenas.js` | Sí, con sesión |
| Motor del caso (compartido) | `site/casos/caso.js` + `caso.css` | — |
| Registro (compartido) | usa `site/sesion.js` | — |
| Datos del caso | `casos/data/wald-bombers/` (CC0), copiados al build | — |

Página aparte y no la misma página de la intro: la intro queda ligera, pública y sin `sesion.js`; el caso carga la sesión
solo cuando hace falta. La continuidad visual la da la estafeta (sección 4), no la URL.

## 3. Reglas del patrón

1. **Un caso, un lugar.** Si un caso se resuelve en la página, no tiene cuaderno de Colab ni botón a Colab en ningún lado.
2. **No repetir con la intro.** Ninguna línea de narración de `escenas.js` aparece en el caso (lo comprueba el harness,
   como hoy `PAGINA["frases"]` en el backend) y ninguna pieza que la intro animó se vuelve a animar (en 1.1, el mapa de
   agujeros sobre el avión). Las cifras sí se repiten cuando el caso las necesita para trabajar, ampliadas.
3. **Arco de criterio completo** (`docs/CRITERIO_PRIMERO.md`): la apuesta antes de cualquier dato nuevo; la herramienta se usa
   antes de nombrarse; dos verificaciones registradas; la firma antes de la revelación; transferencia a la taquería y a
   Mi decisión.
4. **El alumno hace las operaciones.** Lo que en Colab era «ejecuta la celda», aquí es una acción visible: dividir entre el
   área, contar filas, comparar contra lo esperado. Nunca un botón que calcula la respuesta del reto por él.
5. **Nada de respuestas en este repo.** La página manda lo que el alumno elige o escribe y muestra lo que la base contesta
   (acierto, bits y explicación). Las opciones de cada reto sí están en la página; cuál es la correcta, no.
6. **8 bits dentro del caso** con la paleta `--tq-*` (sin verde: el «sí» es anil); el resto del sitio sigue sobrio.
7. **Accesible y móvil primero:** todo control con teclado, texto real en el DOM, `aria-live` para la retroalimentación,
   sin animación con `prefers-reduced-motion`, nada que se mueva más de 5 s sin pausa, objetivos táctiles de 44 px.

## 4. La estafeta: intro → caso → Mi avance

| Momento | Qué ve el alumno |
| --- | --- |
| Final de la intro | Títulos de «qué sigue» (E-08), por ejemplo: «1 · Abres el expediente aquí mismo», «2 · Apuestas antes de ver los datos», «3 · Firmas tu decisión antes de saber qué pasó». Botón **RESOLVER EL CASO** a `caso.html` (misma pestaña). La ficha dice «CASO ~45 min» en lugar de «CUADERNO». Textos visibles: los aprueba el autor |
| Entrada al caso | Sin sesión: «Entra con Google para que tu avance cuente» y «Probar sin guardar». Con sesión: el expediente cae sobre la mesa y se abre. Si ya había avance, «Continúas donde te quedaste: Firma tu decisión» |
| Durante | Franja «NIVEL n/10» por sección; un indicador discreto de guardado (guardado · pendiente · sin guardar) |
| Al terminar | Sello «CASO 1.1 RESUELTO», el criterio en una frase, los bits del caso y dos botones: **Mi avance** y **Siguiente caso** (intro de 1.4) |
| Mi avance | La tarjeta del caso muestra **Ver la intro** y **Resolver el caso** (sin avance) o **Continuar el caso** (con avance), en ese orden. Nunca Colab |

## 5. Sesión, registro y reanudación

- **Con sesión de Google y perfil inscrito:** modo alumno. Registra en las mismas tablas y con la misma función de retos que
  hoy usan los cuadernos; el área del alumno ya lee esas tablas. Detalle del contrato en la sección 9.
- **Con sesión pero sin perfil** (alguien que no se inscribió): puede jugar todo; los retos dicen «sin comprobar» y nada se
  califica. Un aviso explica cómo inscribirse.
- **Sin sesión:** «Probar sin guardar». Mismo recorrido, nada se envía, retos sin comprobar. Decisión del autor si además se
  cuenta de forma anónima qué secciones abren los invitados, como en Colab (sección 10).
- **Cola local:** cada envío lleva un id de cliente; si falla, queda en una cola en `localStorage` (con try/catch) y se
  reintenta al recuperar conexión o al volver. La base ignora duplicados, así que reintentar es seguro. La verdad vive en la
  base; la cola es solo un respaldo.
- **Reanudar:** al abrir el caso con sesión, se leen los eventos y respuestas propios del caso y se reconstruye el estado:
  secciones vistas, apuesta, verificación, firma y retos ya intentados (con una función nueva del backend que devuelve el
  estado de los retos propios sin la clave; B-07). Las respuestas abiertas reaparecen en sus campos.
- **Versión:** cada envío lleva `version = "pagina-1.0"` para distinguirlo de los intentos hechos en Colab.

## 6. Recorrido del caso 1.1 · «¿Dónde conviene blindar los aviones?»

Hábito `faltan` · Nivel 1 · peldaños 2 a 3 (mirar y preguntar por lo que falta) · ~45 min · datos **simulados** (se avisa al
abrir el expediente, como en el cuaderno). Mismas secciones y retos que el cuaderno v1.1 del backend.

| # | Sección (id) | Min | Qué pasa en pantalla | Qué hace el alumno | Qué se registra |
| --- | --- | ---: | --- | --- | --- |
| 1 | EL EXPEDIENTE (`preparacion`) | 2 | El expediente cae, se abre y saca tres piezas: el registro avión por avión, la bitácora de la misión y un resumen del asistente (cerrado). Aviso: datos simulados | Abrir el expediente | Sección |
| 2 | TU APUESTA (`apuesta`) | 4 | Un avión limpio, sin agujeros (no es el mapa de la intro), con cinco zonas y dos placas de blindaje | Tocar la zona de la primera placa y escribir su razón; sello «APUESTA ANOTADA» | Hipótesis (zona) y su razón |
| 3 | EL REGISTRO (`registro`) | 8 | La tabla de los aviones que volvieron, paginada y ordenable, con totales por zona y el área de cada zona. Las barras de agujeros por zona crecen | **Fricción:** las alas parecen las más dañadas. **Herramienta sin nombre:** botón «Dividir entre el área» que lo hace el alumno columna por columna; las barras se reordenan. **Reto 1** (★): ¿qué zona tiene menos agujeros por cada 10 % del área? | Sección, cada división (control) y el intento del reto |
| 4 | EL RESUMEN DEL ASISTENTE (`asistente`) | 7 | El resumen cae con sello BORRADOR; al lado, la bitácora. Mesa de verificación con cuatro herramientas: contar filas del registro, sumar agujeros, ver una zona, leer la bitácora | El alumno elige qué comprobar; cada comprobación muestra su resultado y queda en su libreta. **Reto 2** (★★, error plantado): ¿dónde está el error del resumen? | Sección, cada comprobación (control) y el intento |
| 5 | LO QUE NO LLEGO (`faltantes`) | 8 | Contador de los aviones que salieron y no están. Botón «¿Y si los agujeros cayeran parejo según el área?»: aparecen las barras esperadas junto a las registradas | **Reto 3** (★★★, número) con una calculadora 8 bits al lado (sin código). Después del intento aparece la tarjeta que nombra lo que usaron: sesgo de supervivencia y faltantes no aleatorios | Sección y el intento. La herramienta se nombra después del reto, no antes |
| 6 | VERIFICA (`verificacion`) | 4 | La libreta muestra las comprobaciones que el alumno sí hizo en las secciones 3 a 5 | Escribir qué revisó y qué encontró, en dos renglones (comprobación 1 y 2) | Respuesta «verificacion» |
| 7 | FIRMA TU DECISION (`firma`) | 4 | El avión otra vez: dos placas para arrastrar o tocar; certeza; qué no sé; qué me haría cambiar; ¿necesito algo más que contar y comparar? | Firmar. Sin dos zonas distintas no se firma. Sello «DECISION FIRMADA · la firma es tuya, no del asistente» | Respuesta «firma» (mismo formato que el cuaderno) |
| 8 | LA REVELACION (`revelacion`) | 4 | Bloqueada hasta que la firma quedó guardada o en la cola. Se abre el hangar de los que no volvieron: barras de agujeros por avión, volvieron contra no volvieron. Expediente «ABRAHAM WALD · VERIFICADO» con lo documentado y lo que no se sabe. Su apuesta y su firma, lado a lado | Mirar y comparar | Sección |
| 9 | LABORATORIO (`laboratorio`) | 4 | Mil aviones salen en pixeles con las placas que elija; regresan o caen; contador | Probar combinaciones. La simulación es `missions/m01-wald/app/sim.js`, que reproduce exacto `generar.py` | Sección y combinaciones probadas (control, con pausa de 10 s) |
| 10 | TU PROPIA DECISION (`cierre`) | 4 | La tabla «la misma idea en la taquería»; campo de Mi decisión | Escribir qué casos no llegan a los datos con los que decide; al guardar, completo y sello «CASO 1.1 RESUELTO» | Respuesta «mi_decision» y completo |

Transiciones: persiana de pixeles entre secciones; cada sección abre con su franja. Avanzar es manual (botón SEGUIR); un reto
se puede dejar para después con «Lo intento después» (no da bits hasta que se responde). La revelación es la única puerta
cerrada.

### Prueba de no repetición con la intro

- La intro ya mostró: los tres aviones revisados, la oficina de Nueva York, el mapa de 1,481 agujeros sobre el avión y las
  placas yendo a alas y cola. El caso usa un avión limpio para apostar y firmar, barras y tablas para los datos, y otra
  escena (el hangar) para la revelación.
- La intro termina con «¿Te alcanza para decidir?»; el caso no vuelve a preguntarlo: abre con lo que trae el expediente.
- La intro no dice cuántos aviones salieron ni cuántos no volvieron, ni el nombre de Wald: eso aparece aquí, en su sección.

## 7. Componentes del motor del caso (`site/casos/caso.js`)

Reutilizables por los casos de las clases 1 a 4. Cada uno funciona con teclado y en modo reducido.

| Componente | Para qué |
| --- | --- |
| `seccion(id, titulo)` | Franja «NIVEL n/total», registro de la sección y avance |
| `expediente(piezas)` | Carpeta que se abre y reparte piezas (registro, bitácora, resumen) |
| `apuesta({opciones, razon})` | Elegir sobre un dibujo o una lista y escribir la razón |
| `tabla(datos, {paginar, ordenar})` | Tablas largas sin trabar el celular |
| `barras(series)` | Barras animadas, con cifras en texto |
| `accion(etiqueta, efecto)` | Operación que hace el alumno (dividir, contar, comparar) y queda en su libreta |
| `reto({id, tipo, opciones?})` | Opción o número; envía, muestra acierto, bits y explicación que devuelve la base; estados: sin comprobar, en cola, intentos agotados |
| `calculadora()` | Calculadora 8 bits para retos numéricos |
| `pregunta(id, {renglones})` | Respuesta abierta con contador de caracteres y estado de guardado |
| `firma({zonas, campos})` | Firma con certeza, lo que no sé y qué me haría cambiar |
| `puerta(condicion)` | Bloquea la revelación hasta la firma |
| `sello(texto)`, `contador(n)` | Los golpes visuales del cuaderno, en la página |
| `cierre({frase, siguiente})` | Sello final, criterio en una frase, bits del caso y enlaces |

## 8. Lo que cambia en otras piezas

| Pieza | Cambio | Dónde |
| --- | --- | --- |
| `motor.js`, ficha final | `C.resolver` (ruta del caso en la página) además de `C.colab`; con `resolver`, botón «RESOLVER EL CASO» en la misma pestaña y «CASO» en la ficha | E-08 / E-10 |
| `site/alumno.js` | Casos en la página (`EN_PAGINA`) enlazan a `casos/<id>/caso.html`; «Continuar misión» lleva ahí | E-09 |
| `site/tiempos.json` | 1.1 con `min: 45` | E-10 |
| `missions/m01-wald` | Su simulador se reutiliza en el laboratorio; la página jugable de la misión sigue retirada | E-10 |
| Harness | Revisión: ninguna línea de `escenas.js` en `caso-escenas.js`; ningún id de reto sin su sección; casos `EN_PAGINA` sin enlace a Colab | E-10, E-13 |
| `docs/MODULO_1_DISENO.md` | Agenda de la clase 1 sin los 20 min de Colab; el reto de la taquería sale de la clase 1 | r03 |

## 9. Contrato con la base (lo que el sitio llama)

Todo con la sesión de `site/sesion.js` (`TDD.api` y `TDD.rpc`); la seguridad la pone la base: cada alumno solo escribe y lee
lo suyo.

| Qué | Cómo |
| --- | --- |
| Sección vista, hipótesis, control, completo | Insertar en `eventos` (`caso`, `seccion`, `tipo`, `valor`, `version`, `id_cliente`, `sesion`, `creado_cliente`) ignorando duplicados por `usuario, id_cliente` |
| Respuesta abierta | Insertar en `respuestas` (`caso`, `pregunta`, `texto`, `etapa`, mismos campos de trazabilidad) |
| Reto | `rpc("intentar_reto", {p_caso, p_reto, p_respuesta, p_id_cliente, p_sesion, p_version, p_creado_cliente})` |
| Reanudar | Leer `eventos` y `respuestas` propios del caso; estado de retos con la función nueva de B-07 |

Los valores que se mandan son los mismos que hoy manda el cuaderno (por ejemplo, la hipótesis lleva la zona y si trae razón),
para que el panel docente y la calificación no distingan el origen salvo por `version`.

## 10. Decisiones del autor

1. **Textos visibles** del caso, de la ficha y de «qué sigue»: los propone el PR de E-10.
2. **Invitados:** ¿contar de forma anónima qué secciones abren quienes prueban sin sesión (como en Colab), o no registrar nada?
   Propuesta: no registrar nada en la página; basta la analítica de inscripción.
3. **Revelación para quien no firma:** propuesta, sin firma no hay revelación, ni para invitados.
4. **Cuaderno 1.1 en Drive:** marcarlo OBSOLETO cuando el caso en la página esté publicado (c08).

## 11. Construcción y revisión (siguientes fases de u06)

1. **Backend (B-07):** casos en la página en el generador, la función de estado de retos, mensaje de error neutro y pruebas.
2. **Sitio (E-10):** motor del caso, 1.1 completo, cambios de la sección 8, harness y `qa_student_experience.py` en verde,
   capturas a 390 y 1440 px.
3. **Revisión independiente** en otra sesión (Opus 5.5 high) que no vio la construcción: cifras contra el backend, prueba de
   spoiler y de repetición, que no haya claves en el repo, accesibilidad y una pasada completa como alumno de prueba.
