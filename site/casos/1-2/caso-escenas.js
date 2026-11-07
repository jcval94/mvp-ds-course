/* Caso 1.2 · ¿Le crees a 2.4 millones de boletas? — se resuelve en la página (docs/casos-pagina/1-2-literary-digest.md).
   DATOS REALES (datos.js): conteo del Literary Digest del 31 oct 1936, encuesta de Gallup del 1 nov 1936, resultado oficial
   y la encuesta de Gallup de mayo de 1937 sobre quién devolvió la boleta (Lusinchi 2012). Un cálculo es hipotético y lo
   dice. Las claves de los retos viven solo en la base. Regla: la herramienta se nombra en «Los que no contestaron»,
   después del reto 3. La pregunta de 1932 de la boleta va en la revelación para no adelantar la decisión. */
(function () {
  'use strict';
  var K = window.DigestCifras, E = window.DigestEncuesta1937;
  var fmt = function (n, d) { return Number(n).toLocaleString('es-MX', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  var pct = function (a, b) { return fmt(100 * a / b, 1) + '%'; };
  var NO_VOLVIERON = K.digest_enviadas - K.digest_devueltas;
  /* Libreta de comprobaciones: cada nota nueva se registra en el control. */
  function libreta(ctx, control) {
    var lib = ctx.libreta(ctx.controles(control).map(function (v) { return v.texto; }).filter(Boolean), null, 'Todavía no compruebas nada.');
    return function (accion, texto) { if (lib.notas.indexOf(texto) < 0) ctx.registrar(control, { accion: accion, texto: texto }); lib.anotar(texto); };
  }

  window.CASO_PAGINA = {
    id: '1.2', version: 'pagina-1.0', titulo: '¿LE CREES A 2.4 MILLONES DE BOLETAS?', intro: './', minutos: 42,
    secciones: [

      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx, cuerpo) {
        ctx.p('Estás en la redacción de una revista, días antes de la elección de 1936. Llegó el expediente de su encuesta.');
        ctx.expediente([['EL CONTEO FINAL', 'Las boletas que regresaron, por candidato.'], ['LA BITACORA DEL CORREO', 'Cuántas boletas se mandaron.'],
          ['EL RESUMEN', 'Un asistente preparó un resumen. Todavía no lo abres.', true], ['OTRA ENCUESTA', 'Un sobre sellado. Se abre más adelante.']]);
        ctx.aviso('<b>Datos reales.</b> Las cifras se publicaron en 1936; las fuentes están al final. Un cálculo del caso es hipotético y lo dice.');
      } },

      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx, cuerpo) {
        var pz = ctx.el('div', 'pieza'); pz.appendChild(ctx.el('b', null, 'UNA POSTAL')); pz.appendChild(ctx.el('p', null, '¿Por quién vas a votar: Roosevelt o Landon? Devuélvala por correo.')); cuerpo.appendChild(pz);
        ctx.p('Regresaron 2.4 millones de postales como esta. <b>¿Le crees a 2.4 millones de boletas?</b>');
        ctx.apuesta(['Sí, con tantas boletas no se equivoca', 'Sí, pero con dudas', 'Poco', 'No'], '. Al final la vas a comparar con lo que pasó.');
      } },

      { id: 'conteo', titulo: 'EL CONTEO', render: function (ctx, cuerpo) {
        ctx.p('El conteo final que publicó la revista el 31 de octubre de 1936:');
        cuerpo.appendChild(ctx.tabla(['Candidato', 'Boletas'], [['Alf Landon', fmt(K.digest_landon)], ['Franklin D. Roosevelt', fmt(K.digest_roosevelt)], ['Otros', fmt(K.digest_otros)], ['Total devueltas', fmt(K.digest_devueltas)]]));
        ctx.p('Su pronóstico de votos electorales: Landon ' + K.digest_ve_landon + ', Roosevelt ' + K.digest_ve_roosevelt + ', de 531.');
        var barras = ctx.el('div'); cuerpo.appendChild(barras);
        var partes = ctx.controles('sacar_parte').map(function (v) { return v.quien; });
        var QUIEN = [['landon', 'Landon', K.digest_landon], ['roosevelt', 'Roosevelt', K.digest_roosevelt], ['otros', 'Otros', K.digest_otros]];
        function pintar() {
          barras.innerHTML = '';
          ctx.barras({ categorias: QUIEN.map(function (q) { return q[1]; }), series: [{ nombre: 'Boletas', color: 'var(--anil)',
            valores: QUIEN.map(function (q) { return partes.indexOf(q[0]) >= 0 ? 100 * q[2] / K.digest_devueltas : q[2] / 25000; }),
            etiquetas: QUIEN.map(function (q) { return partes.indexOf(q[0]) >= 0 ? pct(q[2], K.digest_devueltas) : fmt(q[2]); }) }],
            pie: 'Las barras con porcentaje son la parte de cada uno en las boletas devueltas.' }, barras);
        }
        pintar();
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        QUIEN.forEach(function (q) {
          var b = ctx.boton('SACAR LA PARTE DE ' + q[1].toUpperCase(), function () {
            if (partes.indexOf(q[0]) < 0) { partes.push(q[0]); ctx.registrar('sacar_parte', { quien: q[0] }); }
            b.classList.add('hecha'); pintar(); ctx.anunciar(q[1] + ': ' + pct(q[2], K.digest_devueltas) + ' de las boletas devueltas.');
          }, partes.indexOf(q[0]) >= 0 ? 'hecha' : '', acc);
        });
        var r = ctx.el('div', 'pieza borrador'); r.appendChild(ctx.el('b', null, 'RESUMEN DEL ASISTENTE')); r.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        ['Revisé las ' + fmt(K.digest_devueltas) + ' boletas.', 'Tasa de respuesta: 100% (' + fmt(K.digest_devueltas) + ' de ' + fmt(K.digest_devueltas) + ').',
         'Landon gana 57 a 43 entre los dos grandes.', 'Con una respuesta tan completa, recomiendo publicar sin advertencias.'].forEach(function (t) { r.appendChild(ctx.el('p', null, t)); });
        cuerpo.appendChild(r);
        ctx.p('El resumen <b>puede tener un error</b>. Comprueba antes de usarlo.');
        var f = ctx.el('div', 'acciones'); cuerpo.appendChild(f);
        var anotar = libreta(ctx, 'comprobacion');
        [['bitacora', 'LEER LA BITACORA DEL CORREO', 'Bitácora: se mandaron unos ' + fmt(K.digest_enviadas) + ' boletas por correo.'],
         ['contar', 'CONTAR LAS BOLETAS DEL CONTEO', 'El conteo suma ' + fmt(K.digest_devueltas) + ' boletas devueltas.'],
         ['landon57', 'REVISAR EL 57% DE LANDON', 'Landon entre los dos grandes: ' + fmt(K.digest_landon) + ' ÷ (' + fmt(K.digest_landon) + ' + ' + fmt(K.digest_roosevelt) + ') = ' + pct(K.digest_landon, K.digest_landon + K.digest_roosevelt) + '.'],
         ['historial', 'BUSCAR COMO LE FUE EN 1932', 'En 1932 la encuesta de la revista acertó al ganador.']].forEach(function (c) {
          ctx.boton(c[1], function () { anotar(c[0], c[2]); }, 'sec', f);
        });
        var r2 = ctx.el('div');
        ctx.reto({ id: 'reto_error_tasa_respuesta', titulo: '★★ RETO 1', dificultad: 2, tipo: 'opcion',
          pregunta: 'Compara el resumen con la bitácora y con el conteo. ¿Dónde está el error?',
          opciones: ['La tasa de respuesta usa las boletas devueltas como denominador', 'El 57% de Landon no sale de las cifras del conteo',
            'El total de boletas no coincide con la suma de Landon y Roosevelt', 'No tiene ningún error'],
          pista: 'Una tasa de respuesta compara las que regresaron con las que salieron. Mira la bitácora.',
          alResponder: paso2, alSaltar: paso2 });
        cuerpo.appendChild(r2);
        function paso2() {
          if (r2.childNodes.length) return;
          ctx.calculadora(r2);
          ctx.reto({ id: 'reto_tasa_real', titulo: '★ RETO 2', dificultad: 1, tipo: 'numero', dentro: r2,
            pregunta: '¿Cuál es la tasa de respuesta, en porcentaje?', etiqueta: 'Tu respuesta (un número con un decimal)',
            pista: 'Boletas que regresaron entre boletas que salieron, por 100.',
            alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        }
        if (ctx.S.retos.reto_error_tasa_respuesta || (ctx.S.datos._luego || {}).reto_error_tasa_respuesta) paso2();
        if (ctx.S.retos.reto_tasa_real || (ctx.S.datos._luego || {}).reto_tasa_real) ctx.listo();
      } },

      { id: 'silencio', titulo: 'LOS QUE NO CONTESTARON', render: function (ctx, cuerpo) {
        ctx.contador(NO_VOLVIERON, 'boletas salieron y no regresaron. Nadie sabe qué pensaban sus dueños.');
        var t = ctx.el('div', 'pieza'); t.appendChild(ctx.el('b', null, 'DE DONDE SALIERON LOS NOMBRES'));
        t.appendChild(ctx.el('p', null, 'Sobre todo de directorios telefónicos y de registros de automóviles; también de listas de clubes y asociaciones, padrones de votantes, registros de ocupaciones y directorios de ciudades. La revista decía que también llegaba a quienes tenían menos.'));
        cuerpo.appendChild(t);
        ctx.h3('¿A QUIEN LE CUESTA MAS APARECER EN ESA LISTA O DEVOLVER LA BOLETA?');
        ctx.p('No se califica: es tu lectura de la lista.', 'nota');
        ctx.opciones({ lista: [['sin', 'A quien no tiene teléfono ni auto'], ['con', 'A quien tiene teléfono y auto'], ['ocupado', 'A quien no tiene tiempo de contestar cartas'], ['nadie', 'A nadie: la lista es pareja']],
          clave: 'lista', etiqueta: 'A quién le cuesta más aparecer', alCambiar: function (v) { if (v[0]) ctx.registrar('lista_falta', { opcion: v[0] }); } });
        var cols = ctx.el('div'); cuerpo.appendChild(cols);
        var r = ctx.el('div'), nom = ctx.el('div');
        function columnas() {
          cols.innerHTML = '';
          cols.appendChild(ctx.tabla(['Dato', 'Regresaron', 'No regresaron'], [['Boletas', fmt(K.digest_devueltas), fmt(NO_VOLVIERON)],
            ['Landon', pct(K.digest_landon, K.digest_devueltas), '?'], ['Roosevelt', pct(K.digest_roosevelt, K.digest_devueltas), '?']]));
          if (!r.childNodes.length) {
            r.appendChild(ctx.el('p', null, 'Cálculo hipotético: supón que toda la lista de unos ' + fmt(K.digest_enviadas) + ' vota y que solo cuentan Landon y Roosevelt.'));
            ctx.calculadora(r);
            ctx.reto({ id: 'reto_silencio', titulo: '★★★ RETO 3', dificultad: 3, tipo: 'numero', dentro: r,
              pregunta: '¿Qué porcentaje de los que no contestaron tendría que preferir a Roosevelt para que él tuviera la mitad de toda la lista?',
              etiqueta: 'Tu respuesta (un número con un decimal)',
              pista: 'La mitad de la lista son 5 millones. Réstale lo que Roosevelt ya tiene en el conteo y divide lo que falta entre los que no contestaron.',
              alResponder: function () { nombrar(); ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
          }
        }
        if (ctx.datos.columnas) columnas();
        else { var b = ctx.boton('¿Y SI LOS QUE CALLARON PENSARAN DISTINTO?', function () { b.remove(); ctx.datos.columnas = true; ctx.guardar(); columnas(); }, 'sec'); }
        cuerpo.appendChild(r); cuerpo.appendChild(nom);
        function nombrar() {
          if (nom.childNodes.length) return;
          ctx.nombre(['Los votantes son la <b>población</b>. La lista de donde salieron los nombres es el <b>marco muestral</b>. Quienes recibieron la boleta son la <b>muestra</b>. Los que no la devolvieron son la <b>no respuesta</b>, y cuando piensan distinto de los que sí contestaron hay <b>sesgo de no respuesta</b>. Más boletas no corrigen quién llega a tu tabla.'],
            ['../../labs/level-1/alfabetizacion.html', 'Laboratorio: alfabetización de datos'], nom);
        }
        if (ctx.S.retos.reto_silencio) { nombrar(); ctx.listo(); } else if ((ctx.S.datos._luego || {}).reto_silencio) ctx.listo();
      } },

      { id: 'comparacion', titulo: 'LA OTRA ENCUESTA', render: function (ctx, cuerpo) {
        var pz = ctx.el('div', 'pieza'); pz.appendChild(ctx.el('b', null, 'EL SOBRE: GALLUP, 1 DE NOVIEMBRE DE 1936'));
        pz.appendChild(ctx.el('p', null, 'American Institute of Public Opinion (George Gallup): Roosevelt ' + fmt(K.gallup_roosevelt, 1) + '%, Landon ' + fmt(K.gallup_landon, 1) + '%, el resto sin decidir u otros.'));
        pz.appendChild(ctx.el('p', null, 'Preguntó a entre unas 50 mil y 125 mil personas (las fuentes no coinciden), elegidas para parecerse a los votantes en lugar de mandar boletas a una lista.'));
        cuerpo.appendChild(pz);
        ctx.p('Al lado, el Digest: Landon con 57% entre los dos grandes. Para comparar, pon las dos encuestas en la misma escala.');
        var anotar = libreta(ctx, 'comprobacion');
        var f = ctx.el('div', 'acciones'); cuerpo.appendChild(f);
        ctx.boton('VER EL TAMAÑO DE CADA ENCUESTA', function () { anotar('tamano', 'Digest: ' + fmt(K.digest_devueltas) + ' boletas contadas. Gallup: entre unas 50 mil y 125 mil personas.'); }, 'sec', f);
        ctx.boton('VER COMO ELIGIO GALLUP', function () { anotar('metodo', 'Gallup eligió a quién preguntar para parecerse a los votantes; el Digest contó lo que regresó de su lista.'); }, 'sec', f);
        ctx.calculadora(cuerpo);
        ctx.reto({ id: 'reto_gallup_dos', titulo: '★★ RETO 4', dificultad: 2, tipo: 'numero',
          pregunta: 'El 57% del Digest cuenta solo a los dos grandes. ¿Qué porcentaje le da Gallup a Roosevelt si cuentas igual, solo a los dos grandes?',
          etiqueta: 'Tu respuesta (un número con un decimal)', pista: 'Divide lo de Roosevelt entre lo de Roosevelt más lo de Landon.',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_gallup_dos || (ctx.S.datos._luego || {}).reto_gallup_dos) ctx.listo();
      } },

      { id: 'verificacion', titulo: 'VERIFICA', render: function (ctx, cuerpo) {
        ctx.p('Antes de decidir, escribe <b>qué revisaste</b> para confiar en lo que encontraste y <b>qué encontraste</b>. Busca dos comprobaciones distintas.');
        var hechas = ctx.controles('comprobacion').map(function (v) { return v.texto; }).filter(Boolean);
        var lib = ctx.el('div', 'libreta'); lib.appendChild(ctx.el('h3', null, 'LO QUE YA HICISTE'));
        lib.appendChild(hechas.length ? ctx.lista(hechas) : ctx.el('p', 'vacia', 'Aún no hay comprobaciones en tu libreta.')); cuerpo.appendChild(lib);
        ctx.verificacion({ sinIntro: true });
      } },

      { id: 'firma', titulo: 'FIRMA TU DECISION', render: function (ctx, cuerpo) {
        ctx.p('Es 31 de octubre de 1936. El editor te pregunta qué hacer con su pronóstico. Una decisión firmada dice <b>qué decides, con qué certeza, qué no sabes y qué te haría cambiar</b>.');
        var OPC = ['Publicar «gana Landon» como viene', 'Publicar «gana Landon» con una advertencia sobre quién respondió',
          'No publicar un ganador: la encuesta no alcanza para decirlo', 'Publicar que la elección puede ganarla Roosevelt'];
        var sel = ctx.opciones({ lista: OPC.map(function (o) { return [o, o]; }), clave: 'decision', etiqueta: 'Tu decisión' });
        ctx.campo({ id: 'frase', etiqueta: 'Qué le dirías al editor, en una frase', renglones: 2, max: 300 });
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de decisión', renglones: 2, max: 400 });
        ctx.campo({ id: 'algo', etiqueta: '¿Necesitas algo más que contar y comparar? ¿Qué?', renglones: 2, max: 400 });
        var res = ctx.el('div'), g;
        ctx.boton('FIRMAR MI DECISION', function () {
          var d = ctx.datos, o = sel.valor()[0];
          if (!o || !(d.frase || '').trim()) { g.className = 'guardado mal'; g.textContent = 'Elige una decisión y escribe la frase para el editor. Nadie firma por ti.'; return; }
          var texto = 'Le digo al editor: ' + o + '. En una frase: ' + d.frase.trim() + '. Certeza: ' + (d.certeza || 'Media') +
            '. Lo que no sé: ' + (d.nose || '') + '. Me haría cambiar: ' + (d.cambiar || '') + '. ¿Algo más que contar y comparar?: ' + (d.algo || '');
          var ok = ctx.responder('firma', texto, 'firma');
          res.innerHTML = ''; ctx.sello('DECISION FIRMADA', o + ', con certeza ' + (d.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('DECISION FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        var R = K.resultado_roosevelt, L = K.resultado_landon, T = K.resultado_total;
        ctx.p('3 de noviembre de 1936. Roosevelt gana con ' + pct(R, T) + ' del voto popular y ' + K.resultado_ve_roosevelt + ' votos electorales contra ' + K.resultado_ve_landon + ': Landon gana solo Maine y Vermont.');
        ctx.h3('MAYO DE 1937: ¿QUIEN DEVOLVIO LA BOLETA?');
        ctx.p('Gallup preguntó a la gente si le había llegado la boleta del Digest y si la devolvió. Entre las ' + E[2].total + ' personas que dijeron haberla recibido:');
        ctx.barras({ categorias: ['La devolvieron', 'No la devolvieron'], series: [
          { nombre: 'Roosevelt', color: 'var(--anil)', valores: [E[0].roosevelt_pct, E[1].roosevelt_pct], etiquetas: [E[0].roosevelt_pct + '%', E[1].roosevelt_pct + '%'] },
          { nombre: 'Landon', color: 'var(--comal)', valores: [E[0].landon_pct, E[1].landon_pct], etiquetas: [E[0].landon_pct + '%', E[1].landon_pct + '%'] }], max: 100,
          pie: 'Quienes devolvieron la boleta se inclinaban por Landon; quienes no la devolvieron, por Roosevelt (Lusinchi 2012, tabla 2).' });
        ctx.verificado('THE LITERARY DIGEST · VERIFICADO', [['LA PREGUNTA DE 1932', 'La boleta también preguntaba por quién votaste en 1932. Entre quienes respondieron, los votantes de Hoover sobraban en 43 de 48 estados, aunque Roosevelt ganó 1932 con ' + fmt(K.resultado_1932_roosevelt, 1) + '%. Era una pista que la revista tenía en la mano.'],
         ['LA DISCUSION', 'Squire (1988): la lista y la respuesta estaban sesgadas; si todos hubieran contestado, el Digest al menos habría dado el ganador. Lusinchi (2012): la mayoría de los dueños de teléfono o auto votó por Roosevelt y pesó más quién contestó. Lohr y Brick (2017): con la pregunta de 1932 se podía corregir el ganador, no el margen.'],
         ['GALLUP', 'Acertó al ganador, pero también se quedó corto con Roosevelt.'],
         ['DESPUES', 'The Literary Digest dejó de publicarse en 1938.'],
         ['LO QUE NO SABEMOS', 'Cuánto pesó cada filtro (la lista o quién contestó), el tamaño exacto de la encuesta de Gallup y el reparto por estado del conteo.'],
         ['MITOS', 'Que solo preguntó a ricos con teléfono, que usó su lista de suscriptores, que Gallup acertó el resultado o que con más boletas habría acertado.']]);
        var m = /^Le digo al editor: (.+?)\. En una frase/.exec(ctx.S.respuestas.firma || '');
        var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA Y TU FIRMA'));
        tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu firma: ' + (m ? m[1] : '(todavía no firmas)') + '.'));
        tu.appendChild(ctx.el('p', null, '2.4 millones de boletas no bastaron: importaba quién podía llegar a la tabla, no cuántos llegaban.'));
        cuerpo.appendChild(tu);
        ctx.listo();
      } },

      { id: 'laboratorio', titulo: 'LABORATORIO', render: function (ctx, cuerpo) {
        ctx.p('La máquina de encuestas: una lista de votantes y quién devuelve la boleta. Mueve los controles y mira qué dice el conteo. Los parámetros son ilustrativos; el preajuste se basa en lo que estima Lusinchi (2012).');
        var d = ctx.datos; if (d.p == null) { d.p = 54; d.rR = 19; d.rL = 29; d.M = 10; }
        var ctrls = ctx.el('div', 'opciones'); cuerpo.appendChild(ctrls);
        function rango(id, etq, min, max) {
          var l = ctx.el('label', 'campo'); var s = ctx.el('span'); l.appendChild(s);
          var i = document.createElement('input'); i.type = 'range'; i.min = min; i.max = max; i.value = d[id];
          var poner = function () { s.textContent = etq + ': ' + d[id] + (id === 'M' ? ' millones' : id === 'p' ? '%' : ' de cada 100'); };
          i.addEventListener('input', function () { d[id] = +i.value; poner(); calcular(); }); poner(); l.appendChild(i); ctrls.appendChild(l);
        }
        rango('p', 'Parte de la lista que prefiere a Roosevelt', 30, 70);
        rango('rR', 'Partidarios de Roosevelt que devuelven la boleta', 5, 60);
        rango('rL', 'Partidarios de Landon que devuelven la boleta', 5, 60);
        rango('M', 'Boletas que se mandan', 1, 20);
        var marc = ctx.el('dl', 'marcador'), hang = ctx.el('div', 'hangar'); hang.setAttribute('aria-hidden', 'true'); cuerpo.appendChild(marc); cuerpo.appendChild(hang);
        var celdas = []; for (var k = 0; k < 1000; k++) { var c = document.createElement('i'); hang.appendChild(c); celdas.push(c); }
        var ultimo = 0, t;
        function calcular() {
          var R = d.p / 100 * d.rR / 100, L = (1 - d.p / 100) * d.rL / 100, sR = R / (R + L);
          var devueltas = d.M * 1e6 * (R + L);
          marc.innerHTML = '<div><dt>PIENSA LA LISTA</dt><dd class="base">Roosevelt ' + d.p + '%</dd></div><div><dt>DICE EL CONTEO</dt><dd>Roosevelt ' + fmt(100 * sR, 1) + '%</dd></div><div><dt>BOLETAS QUE REGRESAN</dt><dd>' + fmt(devueltas) + '</dd></div>';
          var nR = Math.round(d.p * 10);
          celdas.forEach(function (c, i) { var esR = i < nR, devuelve = ((i * 37) % 100) < (esR ? d.rR : d.rL); c.className = devuelve ? (esR ? 'v' : 'c') : ''; });
          clearTimeout(t); t = setTimeout(function () { ctx.guardar(); if (Date.now() - ultimo > 10000) { ultimo = Date.now(); ctx.registrar('laboratorio', { valor: { p: d.p, rR: d.rR, rL: d.rL, M: d.M } }); } ctx.listo(); }, 600);
        }
        calcular();
        ctx.p('Cada cuadro es un votante de la lista: azul, partidario de Roosevelt que devolvió la boleta; rojo, de Landon que la devolvió; vacío, quien no contestó. Prueba a subir las boletas que se mandan sin cambiar quién contesta.', 'nota');
      } },

      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        cuerpo.appendChild(ctx.tabla(['En la taquería', 'En 1936'], [
          ['Don Juan pregunta qué tal la salsa nueva solo a quienes dejan propina', 'El Digest solo contó las boletas que regresaron'],
          ['Quien se fue sin dejar propina no opina, y quizá se fue por la salsa', 'La mayoría de las boletas no regresó'],
          ['Preguntar a uno de cada diez clientes en la caja, deje propina o no', 'Elegir a quién preguntar para parecerse a todos los votantes']]));
        ctx.cierre({ codigo: '1.2', pregunta: '¿Qué es una fila en los datos de tu decisión? <b>¿Quién no aparece?</b>',
          etiqueta: 'Mi decisión: qué es una fila y quién no aparece',
          frase: '¿Qué falta en mis datos? Antes de contar respuestas, pregunta quién no pudo responder.' });
        ctx.desplegable('Fuentes', [
          ['https://historymatters.gmu.edu/d/5168', 'History Matters (GMU): «Landon, 1,293,669; Roosevelt, 972,897», The Literary Digest, 31 oct 1936.'],
          ['https://doi.org/10.1515/spp-2016-0006', 'Lohr y Brick (2017), Statistics, Politics and Policy 8(1).'],
          ['https://doi.org/10.1017/S014555320001035X', 'Lusinchi (2012), Social Science History 36(1).'],
          ['https://doi.org/10.1086/269085', 'Squire (1988), Public Opinion Quarterly 52(1).'],
          ['https://www.archives.gov/electoral-college/1936', 'National Archives: resultados del Colegio Electoral de 1936.'],
          ['https://www.presidency.ucsb.edu/statistics/elections/1936', 'The American Presidency Project: elección de 1936.'],
          ['https://en.wikipedia.org/wiki/Nationwide_opinion_polling_for_the_1936_United_States_presidential_election', 'Encuestas de 1936, incluida la de Gallup del 1 nov.']
        ]);
      } }
    ]
  };
})();
