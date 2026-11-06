/* Caso 13.11 · ¿Cuánto combustible lleva el avión? (vuelo 143, 1983) — se resuelve en la página (docs/casos-pagina/13-11-gimli.md).
   Caso de «el costo del error», formato corto (~30 min). CIFRAS REALES (datos.js = casos/data/gimli-glider-1983/cifras.csv,
   informe Lockwood 1985, pp. 41-43). La hoja de carga es una reconstrucción con esas cifras. Las claves de los retos viven
   solo en la base. Regla: la herramienta se nombra en «Lo que pesa de verdad», después del reto 3. */
(function () {
  'use strict';
  var D = window.CifrasGimli;
  var v = function (id) { return D[id].valor; };
  var fmt = function (n, d) { return Number(n).toLocaleString('es-MX', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  var VARILLA = v('varilla_montreal'), PLAN = v('requerido'), F = v('factor_hoja'), CARGA = v('litros_cargados');
  var EN_TANQUE = Math.round(VARILLA * F), FALTAN = PLAN - EN_TANQUE;   // 13,597 y 8,703: las cuentas de la hoja, como se hicieron
  var HOJA = [
    ['Lectura de la varilla, convertida con la tabla', fmt(VARILLA)],
    ['«Densidad»', fmt(F, 2)],
    ['En los tanques', fmt(VARILLA) + ' × ' + fmt(F, 2) + ' = ' + fmt(EN_TANQUE)],
    ['Pide el plan', fmt(PLAN) + ' kg'],
    ['Faltan', fmt(PLAN) + ' − ' + fmt(EN_TANQUE) + ' = ' + fmt(FALTAN)],
    ['Litros a cargar', fmt(FALTAN) + ' ÷ ' + fmt(F, 2) + ' = ' + fmt(CARGA)]];

  function tabla(cabeza, filas, cls) {
    var t = document.createElement('table'); t.className = cls || 'tabla-t';
    t.innerHTML = '<thead><tr>' + cabeza.map(function (c) { return '<th scope="col">' + c + '</th>'; }).join('') + '</tr></thead>';
    var tb = document.createElement('tbody');
    filas.forEach(function (f) { var tr = document.createElement('tr'); f.forEach(function (c) { var td = document.createElement('td'); if (c && c.nodeType) td.appendChild(c); else td.textContent = c; tr.appendChild(td); }); tb.appendChild(tr); });
    t.appendChild(tb); return t;
  }
  function hoja(ctx, filas) {
    var pz = ctx.el('div', 'pieza'); pz.appendChild(ctx.el('b', null, 'HOJA DE CARGA · MONTREAL · VUELO 143'));
    pz.appendChild(tabla(['Línea', 'Cuenta'], filas)); return pz;
  }
  /* Tanque en pixeles (decorativo): se llena hasta la marca de la hoja. */
  function tanque(ctx, rotulo) {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 160 50'); svg.setAttribute('aria-hidden', 'true'); svg.style.width = '100%'; svg.style.maxWidth = '420px';
    svg.innerHTML = '<rect x="10" y="10" width="140" height="30" fill="var(--tq-negro)"/><rect class="nivel" x="10" y="10" width="0" height="30" fill="var(--tq-oro)"/>' +
      '<rect x="138" y="6" width="2" height="38" fill="var(--tq-crema)"/><text x="139" y="5" font-size="4" text-anchor="middle" fill="var(--tq-crema)">' + rotulo + '</text>';
    var n = svg.querySelector('.nivel');
    if (ctx.reducir) n.setAttribute('width', 129);
    else { var t0 = performance.now(); (function paso(t) { var k = Math.min(1, (t - t0) / 1600); n.setAttribute('width', Math.round(129 * k)); if (k < 1) requestAnimationFrame(paso); })(t0); }
    return svg;
  }
  /* Recta de 0 a 2 kg: rango de la ficha sombreado, agua en 1.0 y el valor que calculó el alumno. */
  function regla(ctx, valor) {
    var caja = ctx.el('div', 'regla-caja');
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'), X = function (k) { return 12 + k / 2 * 296; };
    svg.setAttribute('viewBox', '0 0 320 64'); svg.setAttribute('aria-hidden', 'true'); svg.style.width = '100%'; svg.style.maxWidth = '560px';
    var s = '<rect x="' + X(v('densidad_min')) + '" y="18" width="' + (X(v('densidad_max')) - X(v('densidad_min'))) + '" height="20" fill="var(--tq-suelo)"/>' +
      '<line x1="12" y1="38" x2="308" y2="38" stroke="var(--tinta-suave)" stroke-width="1.5"/>';
    [0, 0.5, 1, 1.5, 2].forEach(function (k) { s += '<text x="' + X(k) + '" y="50" font-size="8" text-anchor="middle" fill="var(--tinta-suave)">' + k + ' kg</text>'; });
    s += '<text x="' + X((v('densidad_min') + v('densidad_max')) / 2) + '" y="14" font-size="7" text-anchor="middle" fill="var(--tinta-suave)">combustible</text>';
    s += '<line x1="' + X(v('agua')) + '" y1="22" x2="' + X(v('agua')) + '" y2="38" stroke="var(--tq-vidrio)" stroke-width="2"/><text x="' + X(v('agua')) + '" y="62" font-size="7" text-anchor="middle" fill="var(--tq-vidrio)">agua</text>';
    if (valor != null && isFinite(valor)) {
      var x = X(Math.max(0, Math.min(2, valor)));
      s += '<rect x="' + (x - 4) + '" y="24" width="8" height="8" fill="var(--comal)"/><text x="' + x + '" y="20" font-size="8" text-anchor="middle" fill="var(--comal)">tú</text>';
    }
    svg.innerHTML = s; caja.appendChild(svg);
    caja.appendChild(ctx.el('p', 'nota', (valor != null && isFinite(valor) ? 'Tu valor: ' + fmt(valor, 3) + ' kg por litro. ' : 'Todavía no pones tu valor. ') +
      'Ficha: de ' + fmt(v('densidad_min'), 3) + ' a ' + fmt(v('densidad_max'), 3) + ' kg por litro. Agua: cerca de ' + fmt(v('agua'), 1) + ' kg por litro.'));
    return caja;
  }

  window.CASO_PAGINA = {
    id: '13.11', version: 'pagina-1.0', titulo: '¿CUANTO COMBUSTIBLE LLEVA EL AVION?', intro: './', minutos: 30,
    secciones: [

      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx, cuerpo) {
        ctx.p('Estás en la plataforma de Montreal, antes de la salida del vuelo 143 a Ottawa y a Edmonton. Llegó el expediente.');
        var exp = ctx.el('div', 'expediente'); cuerpo.appendChild(exp);
        function abrir() {
          exp.innerHTML = '';
          [['EL PLAN DE VUELO', 'Montreal-Ottawa-Edmonton. Pide un mínimo de ' + fmt(PLAN) + ' kg de combustible.', ''],
           ['LA NOTA DE MANTENIMIENTO', 'Los indicadores de combustible de la cabina están en blanco: se mide a mano, con una varilla.', ''],
           ['LA HOJA DE CARGA', 'Las cuentas de cuánto cargar. Cerrada.', ''],
           ['EL VISTO BUENO DEL ASISTENTE', 'Una revisión de la hoja. Todavía no la abres.', 'borrador']].forEach(function (p, i) {
            var d = ctx.el('div', 'pieza' + (p[2] ? ' borrador' : '')); d.style.setProperty('--i', i);
            d.appendChild(ctx.el('b', null, p[0])); d.appendChild(ctx.el('p', null, p[1])); if (p[2]) d.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
            exp.appendChild(d);
          });
          ctx.datos.abierto = true; ctx.guardar(); ctx.listo();
        }
        if (ctx.datos.abierto) abrir(); else { var b = ctx.boton('ABRIR EL EXPEDIENTE', function () { b.remove(); abrir(); }); }
        var r = ctx.el('div', 'aviso'); r.innerHTML = '<b>Cifras reales.</b> Vienen del informe de la investigación (Lockwood, 1985). La hoja de carga es una reconstrucción con esas cifras.';
        cuerpo.appendChild(r);
      } },

      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx, cuerpo) {
        ctx.p('Se abre la hoja de carga tal como se llenó. Como en la original, las cuentas no llevan unidades.');
        cuerpo.appendChild(hoja(ctx, HOJA));
        ctx.p('<b>¿Cargarías el avión con este cálculo?</b>');
        var OPC = ['Sí, lo cargaría', 'No lo cargaría', 'Lo cargaría después de revisar algo', 'No sé'];
        var sel = ctx.opciones({ lista: OPC.map(function (o) { return [o, o]; }), clave: 'opcion', etiqueta: 'Tu apuesta', alCambiar: function (x) { anotar.disabled = !x[0]; } });
        if (ctx.S.hip && !ctx.datos.opcion) sel.poner([ctx.S.hip]);
        ctx.campo({ id: 'razon', etiqueta: '¿Por qué? Una o dos frases.', renglones: 3, max: 600, inicial: ctx.S.respuestas.hipotesis_razon || '' });
        var res = ctx.el('div'), g;
        var anotar = ctx.boton('ANOTAR MI APUESTA', function () {
          var o = sel.valor()[0]; if (!o) return;
          var ok = ctx.hipotesis(o, ctx.datos.razon || '');
          res.innerHTML = ''; ctx.sello('APUESTA ANOTADA', 'Tu apuesta: ' + o.toLowerCase() + '.', 'comal', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        anotar.disabled = !sel.valor()[0];
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.hip) { ctx.sello('APUESTA ANOTADA', 'Tu apuesta: ' + ctx.S.hip.toLowerCase() + '.', 'comal', res); ctx.listo(); }
      } },

      { id: 'cuentas', titulo: 'LAS CUENTAS', render: function (ctx, cuerpo) {
        ctx.p('Repite cada cuenta de la hoja en la calculadora. Cuando la tengas, márcala.');
        var hechas = ctx.controles('repetir_cuenta').map(function (x) { return x.linea; });
        var filas = [[2, 'En los tanques'], [4, 'Faltan'], [5, 'Litros a cargar']].map(function (p) {
          var celda = ctx.el('span');
          function sello() { celda.innerHTML = ''; celda.appendChild(ctx.el('span', 'sello-mini cuadra', 'CUADRA')); }
          if (hechas.indexOf(p[1]) >= 0) sello();
          else {
            var b = ctx.el('button', 'btn sec', 'LA REPETI'); b.type = 'button'; b.setAttribute('aria-label', 'Repetí la cuenta: ' + p[1]);
            b.addEventListener('click', function () { ctx.registrar('repetir_cuenta', { linea: p[1] }); sello(); ctx.anunciar(p[1] + ': cuadra.'); });
            celda.appendChild(b);
          }
          return [HOJA[p[0]][0], HOJA[p[0]][1], celda];
        });
        var pz = ctx.el('div', 'pieza'); pz.appendChild(ctx.el('b', null, 'LA HOJA, LINEA POR LINEA'));
        pz.appendChild(tabla(['Línea', 'Cuenta', '¿Cuadra?'], filas)); cuerpo.appendChild(pz);
        ctx.calculadora();
        ctx.p('El camión cisterna carga los litros de la hoja. El tanque llega a la marca.', 'nota');
        cuerpo.appendChild(tanque(ctx, 'LA HOJA'));
        ctx.reto({ id: 'reto_litros_total', titulo: '★ RETO 1', dificultad: 1, tipo: 'numero',
          pregunta: 'Con la calculadora: ¿cuántos litros hay en los tanques después de cargar?', etiqueta: 'Tu respuesta (litros)',
          pista: 'Suma lo que había antes de cargar y lo que dice la última línea de la hoja.',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_litros_total || (ctx.S.datos._luego || {}).reto_litros_total) ctx.listo();
      } },

      { id: 'asistente', titulo: 'EL VISTO BUENO DEL ASISTENTE', render: function (ctx, cuerpo) {
        ctx.p('El asistente revisó la hoja. <b>Puede tener un error.</b> Revisa antes de usarlo.');
        var pz = ctx.el('div', 'pieza borrador'); pz.appendChild(ctx.el('b', null, 'VISTO BUENO DEL ASISTENTE')); pz.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        var total = VARILLA + CARGA;
        pz.appendChild(ctx.el('p', null, '«Revisé la hoja de carga. En los tanques quedan ' + fmt(VARILLA) + ' L y se cargan ' + fmt(CARGA) + ' L: ' + fmt(total) + ' L en total. ' +
          fmt(total) + ' × ' + fmt(F, 2) + ' = ' + fmt(Math.round(total * F)) + ' kg, justo lo que pide el plan de vuelo. Las cuentas cuadran: el avión va lleno y puede despegar.»'));
        cuerpo.appendChild(pz);

        ctx.h3('TU MESA DE VERIFICACION');
        var lib = ctx.el('div', 'libreta'); lib.appendChild(ctx.el('h3', null, 'TU LIBRETA')); var ul = ctx.el('ul'); lib.appendChild(ul);
        var notas = ctx.controles('comprobacion').map(function (x) { return x.texto; }).filter(Boolean);
        function pintarLib() { ul.innerHTML = ''; notas.forEach(function (t) { ul.appendChild(ctx.el('li', null, t)); }); if (!notas.length) ul.appendChild(ctx.el('li', 'vacia', 'Todavía no compruebas nada.')); }
        function anotar(a, t) { if (notas.indexOf(t) < 0) { notas.push(t); ctx.registrar('comprobacion', { accion: a, texto: t }); } pintarLib(); ctx.anunciar(t); }

        /* 1 · etiquetas: una unidad para cada número (no califica) */
        var et = ctx.el('div', 'tarjeta'); et.appendChild(ctx.el('h3', null, 'ETIQUETAS'));
        et.appendChild(ctx.el('p', null, 'Ponle su unidad a cada número de la hoja y del visto bueno.'));
        var UNI = ['L', 'kg', 'lb', 'kg/L', 'lb/L', 'sin unidad'];
        var puestas = {}; ctx.controles('etiqueta').forEach(function (x) { puestas[x.numero] = x.unidad; });
        [fmt(VARILLA), fmt(F, 2), fmt(EN_TANQUE), fmt(PLAN), fmt(CARGA), fmt(Math.round(total * F))].forEach(function (n) {
          var fila = ctx.el('div', 'etiqueta-fila'); fila.appendChild(ctx.el('b', null, n));
          ctx.datos['u_' + n] = ctx.datos['u_' + n] || puestas[n] || null;
          ctx.opciones({ lista: UNI.map(function (u) { return [u, u]; }), clave: 'u_' + n, etiqueta: 'Unidad de ' + n, dentro: fila, clase: 'zonas unidades',
            alCambiar: function (x) { if (x[0]) { ctx.registrar('etiqueta', { numero: n, unidad: x[0] }); anotar('etiquetas', 'Al ' + n + ' le puse ' + x[0] + '.'); } } });
          et.appendChild(fila);
        });
        cuerpo.appendChild(et);

        /* 2 · ficha · 3 · manual */
        var f = ctx.el('div', 'acciones'); cuerpo.appendChild(f);
        var info = ctx.el('div'); cuerpo.appendChild(info);
        ctx.boton('ABRIR LA FICHA DEL COMBUSTIBLE', function () {
          anotar('ficha', 'Ficha: un litro de combustible de avión pesa entre ' + fmt(v('densidad_min'), 3) + ' y ' + fmt(v('densidad_max'), 3) + ' kg. Uno de agua, cerca de ' + fmt(v('agua'), 1) + ' kg.');
        }, 'sec', f);
        ctx.boton('ABRIR EL MANUAL DE OPERACIONES', function () {
          anotar('manual', 'Manual: kilos = libras ÷ ' + fmt(v('libras_por_kilo'), 1) + '. Para el Jet A, ' + fmt(v('densidad_fuentes'), 2) + ' kg por litro.');
        }, 'sec', f);

        /* 4 · báscula de un litro: el alumno calcula; la página solo coloca su número */
        var ba = ctx.el('div', 'tarjeta'); ba.appendChild(ctx.el('h3', null, 'LA BASCULA DE UN LITRO'));
        ba.appendChild(ctx.el('p', null, 'Según el visto bueno, ¿cuántos kilos pesa un litro? Calcúlalo con la calculadora y ponlo en la báscula.'));
        ctx.calculadora(ba);
        var inp = ctx.campo({ id: 'bascula', etiqueta: 'Kilos por litro según el visto bueno', renglones: 1, max: 12, dentro: ba });
        inp.inputMode = 'decimal';
        var rg = ctx.el('div'); ba.appendChild(rg);
        function pintarRegla() { var x = parseFloat(String(ctx.datos.bascula || '').replace(',', '.')); rg.innerHTML = ''; rg.appendChild(regla(ctx, isFinite(x) ? x : null)); return x; }
        pintarRegla();
        ctx.boton('PONER EN LA BASCULA', function () {
          var x = pintarRegla(); if (!isFinite(x)) return;
          anotar('bascula', 'Báscula: según el visto bueno, un litro pesaría ' + fmt(x, 3) + ' kg.');
        }, 'sec', ba);
        cuerpo.appendChild(ba);
        cuerpo.appendChild(lib); pintarLib();

        ctx.reto({ id: 'reto_error_factor', titulo: '★★ RETO 2', dificultad: 2, tipo: 'opcion',
          pregunta: '¿Dónde está el error del visto bueno?',
          opciones: ['Multiplica los litros por 1.77, que convierte litros en libras, y escribe el resultado como kilos',
            'Suma mal los litros que había y los que se cargaron', 'Usa una lectura de la varilla distinta de la de la hoja', 'No tiene ningún error'],
          pista: 'Compara lo que pesaría un litro según el visto bueno con la ficha y con un litro de agua.',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_error_factor || (ctx.S.datos._luego || {}).reto_error_factor) ctx.listo();
      } },

      { id: 'kilos', titulo: 'LO QUE PESA DE VERDAD', render: function (ctx, cuerpo) {
        ctx.p('El tanque se vacía y se vuelve a llenar, ahora junto a la báscula. ¿Cuánto pesa de verdad lo que lleva?');
        var graf = ctx.el('div'); cuerpo.appendChild(graf);
        function barras(tuyo) {
          graf.innerHTML = '';
          ctx.barras({ categorias: ['Pide el plan', 'Lleva el avión'], series: [{ nombre: 'kg', color: 'var(--comal)', valores: [PLAN, tuyo],
            etiquetas: [fmt(PLAN) + ' kg', tuyo == null ? '?' : fmt(tuyo) + ' kg (tu cifra)'] }], max: PLAN }, graf);
        }
        barras(ctx.datos.tuyo != null ? ctx.datos.tuyo : null);
        ctx.calculadora();
        var nom = ctx.el('div');
        var caja = ctx.reto({ id: 'reto_kilos_reales', titulo: '★★★ RETO 3', dificultad: 3, tipo: 'numero', etiqueta: 'Tu respuesta (kilos)',
          pregunta: 'Con la calculadora: ¿cuántos kilos de combustible llevaba el avión al despegar de Montreal?',
          pista: 'Usa los litros totales del reto 1 y lo que pesa de verdad un litro de combustible (la ficha o el manual).',
          alResponder: function () {
            var i = caja && caja.querySelector('input'), x = i ? parseFloat(i.value.replace(/,/g, '')) : NaN;
            if (isFinite(x) && x > 0) { ctx.datos.tuyo = x; ctx.guardar(); barras(x); }
            nombrar(); ctx.listo();
          },
          alSaltar: function () { ctx.listo(); } });
        cuerpo.appendChild(nom);
        function nombrar() {
          if (nom.childNodes.length) return;
          var t = ctx.el('div', 'tarjeta nombre'); t.appendChild(ctx.el('h3', null, 'LO QUE ACABAS DE USAR TIENE NOMBRE'));
          var p1 = ctx.el('p'); p1.innerHTML = 'Le pusiste su unidad a cada número y descubriste que el 1.77 convierte litros en <b>libras</b>, no en kilos: son las <b>unidades y el factor de conversión</b>. Un factor solo convierte la unidad que dice.';
          var p2 = ctx.el('p'); p2.innerHTML = 'Y comparaste lo que pesaría un litro con lo que es posible: eso es <b>validar rangos</b>. Antes de creer un resultado, compáralo con lo que puede pasar en el mundo.';
          var p3 = ctx.el('p', 'nota'); p3.innerHTML = 'Para practicar lo que acabas de usar: <a href="../../labs/level-1/tipos-variables.html">Laboratorio: tipos de variables</a>. Es opcional y no cuenta para la calificación.';
          t.appendChild(p1); t.appendChild(p2); t.appendChild(p3); nom.appendChild(t);
          var vf = ctx.el('div'); nom.appendChild(vf);
          vf.appendChild(ctx.el('h3', null, 'VERIFICA'));
          vf.appendChild(ctx.el('p', null, 'Escribe qué revisaste para confiar en tu cifra y qué encontraste. Busca dos comprobaciones que no salgan de la misma hoja.'));
          ctx.campo({ id: 'c1', etiqueta: 'Comprobación 1: qué revisé y qué encontré', renglones: 3, max: 900, inicial: ctx.S.respuestas.verificacion || '', dentro: vf });
          ctx.campo({ id: 'c2', etiqueta: 'Comprobación 2: qué revisé y qué encontré', renglones: 3, max: 900, dentro: vf });
          var g;
          ctx.boton('ANOTAR MI VERIFICACION', function () {
            var t1 = (ctx.datos.c1 || '').trim(), t2 = (ctx.datos.c2 || '').trim();
            if (!t1 && !t2) { g.className = 'guardado mal'; g.textContent = 'Escribe al menos una comprobación.'; return; }
            ctx.marcarGuardado(g, ctx.responder('verificacion', t2 ? '1) ' + t1 + ' 2) ' + t2 : t1, 'verificar')); ctx.listo();
          }, '', vf);
          g = ctx.guardado(vf);
        }
        if (ctx.S.retos.reto_kilos_reales) nombrar();
        if (ctx.S.retos.reto_kilos_reales || (ctx.S.datos._luego || {}).reto_kilos_reales || ctx.S.respuestas.verificacion) ctx.listo();
      } },

      { id: 'firma', titulo: 'ANTES DE DESPEGAR', render: function (ctx, cuerpo) {
        ctx.p('El avión está cargado y la escalera puesta. Decide y firma: <b>qué revisas antes de despegar, quién firma cada revisión y quién responde por el despegue</b>. Lo que pasó de verdad viene después.');
        var OPC = ['Despego', 'No despego', 'Despego después de revisar'];
        var sel = ctx.opciones({ lista: OPC.map(function (o) { return [o, o]; }), clave: 'decision', etiqueta: '¿Despegas?' });
        ctx.campo({ id: 'revisiones', etiqueta: 'Las revisiones que harías antes de despegar, en orden (hasta tres renglones)', renglones: 3, max: 600 });
        ctx.h3('¿QUIEN FIRMA EL DESPEGUE?');
        var QUIEN = ['La persona que carga el combustible', 'El técnico de mantenimiento', 'El copiloto', 'El capitán', 'El despachador', 'El asistente', 'Otra'];
        var quien = ctx.opciones({ lista: QUIEN.map(function (o) { return [o, o === 'Otra' ? 'Otra (la escribo abajo)' : o]; }), clave: 'quien', etiqueta: 'Quién firma el despegue' });
        ctx.campo({ id: 'porque', etiqueta: 'Quién firma cada revisión, y por qué esa persona firma el despegue', renglones: 2, max: 400 });
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de decisión', renglones: 2, max: 400 });
        ctx.campo({ id: 'algo', etiqueta: '¿Necesitas algo más que contar y comparar? ¿Qué?', renglones: 2, max: 400 });
        var res = ctx.el('div'), g;
        ctx.boton('FIRMAR MI DECISION', function () {
          var d = ctx.datos, o = sel.valor()[0], q = quien.valor()[0];
          if (!o || !(d.revisiones || '').trim() || !q) { g.className = 'guardado mal'; g.textContent = 'Elige una decisión, escribe al menos una revisión y di quién firma el despegue. Nadie firma por ti.'; return; }
          var texto = 'Decido: ' + o + '. Revisiones: ' + d.revisiones.trim().replace(/\.+$/, '') + '. Firma el despegue: ' + q + '. Quién firma y por qué: ' + (d.porque || '') +
            '. Certeza: ' + (d.certeza || 'Media') + '. Lo que no sé: ' + (d.nose || '') + '. Me haría cambiar: ' + (d.cambiar || '') + '. ¿Algo más que contar y comparar?: ' + (d.algo || '');
          var ok = ctx.responder('firma', texto, 'firma');
          res.innerHTML = '';
          ctx.sello('DECISION FIRMADA', o + ', con certeza ' + (d.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          if (q === 'El asistente') res.appendChild(ctx.el('p', 'nota', 'Ojo: elegiste al asistente. Un asistente no responde por un despegue; piénsalo en la revelación.'));
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('DECISION FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        ctx.h3('EL VUELO 143');
        var ol = document.createElement('ol'); ol.className = 'linea-tiempo';
        ['Montreal: con la hoja de carga, el avión sale con la mitad del combustible que la tripulación creía tener.',
         'Ottawa: se vuelve a medir con la varilla (' + fmt(v('varilla_ottawa')) + ' litros). Le dan ' + fmt(v('factor_ottawa'), 2) + ' y el capitán calcula «más de 20,000», sin decir la unidad.',
         'Poco después de las 20:00, a 41,000 pies, aparecen los avisos de baja presión de combustible. Se apagan los dos motores.',
         'Sin motores, a 35,000 pies, el avión planea hacia Gimli, Manitoba: una base militar en desuso, con una parte de la pista usada para carreras. Según reportes publicados, el planeo duró unos 17 minutos; el informe no da la duración.',
         'Aterriza. Iban 69 personas a bordo y no murió nadie. Hubo lesiones menores en la evacuación por los toboganes.'
        ].forEach(function (t) { ol.appendChild(ctx.el('li', null, t)); });
        cuerpo.appendChild(ol);
        var t = ctx.el('div', 'tarjeta verificado'); t.appendChild(ctx.el('h3', null, 'VUELO 143 · VERIFICADO'));
        var dl = ctx.el('dl');
        [['LO QUE SI PASO', 'El 1.77 convierte litros en libras y se usó como si diera kilos. El capitán declaró que repasó las cuentas y eran «matemáticamente correctas». Según el informe, había que cargar unos 20,000 litros, no ' + fmt(CARGA) + '.'],
         ['LA CADENA', 'El informe reparte las causas: indicadores en blanco contra la lista de equipo mínimo, mantenimiento, la carga, la tripulación y los procedimientos de la empresa. No fue el error de una sola persona.'],
         ['LO QUE NO SE SABE', 'Cuántos litros se bombearon de verdad (se pidieron 5,000), la duración exacta del planeo y la altitud exacta al apagarse cada motor: las fuentes no coinciden.'],
         ['MITOS', 'Los pilotos no sabían multiplicar (las cuentas estaban bien) · hubo una fuga (no) · aterrizó en un aeropuerto (era una base en desuso) · hubo muertos (no).']
        ].forEach(function (f) { var a = document.createElement('div'); a.appendChild(ctx.el('dt', 'px', f[0])); a.appendChild(ctx.el('dd', null, f[1])); dl.appendChild(a); });
        t.appendChild(dl); cuerpo.appendChild(t);
        var m = /^Decido: (.+?)\. Revisiones/.exec(ctx.S.respuestas.firma || '');
        var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA, TU CIFRA Y TU FIRMA'));
        var dato = (ctx.S.datos.kilos || {}).tuyo;
        tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu cifra del reto 3: ' + (dato != null ? fmt(dato) + ' kg' : '(no la escribiste)') +
          '. Tu firma: ' + (m ? m[1] : '(todavía no firmas)') + '.'));
        tu.appendChild(ctx.el('p', null, 'Las cuentas cuadraban, la unidad no. Un visto bueno que repite la misma cuenta no verifica nada.'));
        cuerpo.appendChild(tu);
        ctx.listo();
      } },

      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        var tb = tabla(['En la taquería', 'En 1983'], [
          ['El proveedor manda la carne en libras y la receta de Don Juan está en kilos', 'La hoja daba libras y el plan pedía kilos'],
          ['La cuenta del pedido está bien hecha', 'Las cuentas de la hoja estaban bien hechas'],
          ['Y aun así llega menos de la mitad de la carne', 'Y el avión salió con menos de la mitad del combustible']]);
        cuerpo.appendChild(tb);
        ctx.h3('MI DECISION');
        ctx.p('Piensa en una decisión real tuya. ¿Qué dato te llega <b>en otra unidad o en otro formato</b>? ¿Con qué lo comprobarías que no salga de la misma cuenta?');
        ctx.campo({ id: 'mi', etiqueta: 'Mi decisión: qué dato viene en otra unidad o formato y cómo lo revisaría', renglones: 4, max: 1500, inicial: ctx.S.respuestas.mi_decision || '' });
        var fin = ctx.el('div'), g;
        ctx.boton('ENTREGAR Y CERRAR EL CASO', function () {
          var texto = (ctx.datos.mi || '').trim();
          if (!texto) { g.className = 'guardado mal'; g.textContent = 'Escribe tu pieza de Mi decisión para cerrar el caso.'; return; }
          var ok = ctx.responder('mi_decision', texto, 'cierre'); ctx.completar(); ctx.marcarGuardado(g, ok); cerrar();
        });
        g = ctx.guardado(); cuerpo.appendChild(fin);
        function cerrar() {
          fin.innerHTML = ''; ctx.sello('CASO 13.11 RESUELTO', null, 'comal', fin);
          var bits = Object.keys(ctx.S.retos).reduce(function (s, k) { return s + (ctx.S.retos[k].bits || 0); }, 0);
          if (ctx.M.modo === 'alumno') fin.appendChild(ctx.el('p', null, 'Bits de este caso: ' + bits + '. Tu marcador completo está en Mi avance.'));
          var f = ctx.el('p', 'frase'); f.innerHTML = '<b>El criterio en una frase:</b> ¿Cómo lo verifico? Un número sin su unidad no es un dato.'; fin.appendChild(f);
          ctx.listo();
        }
        if (ctx.S.completo) cerrar();
        var fu = document.createElement('details'); fu.className = 'mas';
        fu.innerHTML = '<summary>Fuentes</summary><ul>' + [
          ['https://archive.org/details/31761116358912', 'Lockwood, G. H. (1985). Final Report of the Board of Inquiry into Air Canada Boeing 767 C-GAUN, pp. 28-29 y 41-43.'],
          ['https://www.faa.gov/sites/faa.gov/files/2024-12/AirCanada143_C-GAUN.pdf', 'El mismo informe, copia de la FAA (texto hasta la p. 42).'],
          ['https://en.wikipedia.org/wiki/Gimli_Glider', 'Wikipedia, «Gimli Glider» (duración del planeo, según reportes publicados).']
        ].map(function (f) { return '<li><a href="' + f[0] + '" target="_blank" rel="noopener noreferrer">' + f[1] + '</a></li>'; }).join('') + '</ul>';
        cuerpo.appendChild(fu);
      } }
    ]
  };
})();
