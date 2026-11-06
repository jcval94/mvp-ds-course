/* Caso 2.1 · ¿El agua o el aire? (Londres, 1854) — se resuelve en la página (docs/casos-pagina/2-1-john-snow.md).
   Caso principal de la clase 3, formato completo (~40 min). DATOS REALES (datos.js = casos/data/john-snow-colera-1854):
   Tabla IX de Snow 1855 (p. 86), fila de totales de la Tabla V de Snow 1856 y Tabla I de Snow 1855. La gráfica del
   asistente es una reconstrucción con esas cifras y un error plantado. Las claves de los retos viven solo en la base.
   Regla: la herramienta se nombra en «El sur de Londres», después del reto 3. Caso con muertes reales: sin nombres,
   sin dramatizar, sin sonido ni destello en las cifras. */
(function () {
  'use strict';
  var D = window.DatosSnow, CI = D.cifras;
  var fila = function (id) { return D.companias.filter(function (x) { return x.id === id; })[0]; };
  var T9 = [fila('t9_sv'), fila('t9_lambeth'), fila('t9_resto')], T5SV = fila('t5_sv'), T5L = fila('t5_lambeth');
  var NOMBRE = { t9_sv: 'Southwark & Vauxhall', t9_lambeth: 'Lambeth', t9_resto: 'Resto de Londres', t5_sv: 'Southwark & Vauxhall', t5_lambeth: 'Lambeth' };
  var CASAS_TODAS = T9.reduce(function (s, x) { return s + x.casas; }, 0);
  var fmt = function (n, d) { return Number(n).toLocaleString('es-MX', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  var num = function (t) { var x = parseFloat(String(t || '').replace(/,(?=\d{3}\b)/g, '').replace(',', '.')); return isFinite(x) ? x : null; };

  function tabla(ctx, cabeza, filas, etiqueta) {
    var caja = ctx.el('div', 'tabla-caja'); caja.tabIndex = 0; caja.setAttribute('role', 'region'); caja.setAttribute('aria-label', etiqueta + ', desplazable');
    var t = ctx.el('table', 'tabla');
    t.innerHTML = '<thead><tr>' + cabeza.map(function (c) { return '<th scope="col">' + c + '</th>'; }).join('') + '</tr></thead>';
    var tb = document.createElement('tbody');
    filas.forEach(function (f) { var tr = document.createElement('tr'); f.forEach(function (c) { var td = document.createElement('td'); if (c && c.nodeType) td.appendChild(c); else td.textContent = c; tr.appendChild(td); }); tb.appendChild(tr); });
    t.appendChild(tb); caja.appendChild(t); return caja;
  }
  function libreta(ctx, dentro, notas) {
    var lib = ctx.el('div', 'libreta'); lib.appendChild(ctx.el('h3', null, 'TU LIBRETA')); var ul = ctx.el('ul'); lib.appendChild(ul);
    function pintar() { ul.innerHTML = ''; notas.forEach(function (t) { ul.appendChild(ctx.el('li', null, t)); }); if (!notas.length) ul.appendChild(ctx.el('li', 'vacia', 'Todavía no anotas nada.')); }
    dentro.appendChild(lib); pintar();
    return { anotar: function (t) { if (notas.indexOf(t) < 0) notas.push(t); pintar(); ctx.anunciar(t); } };
  }
  /* Barras verticales en SVG con eje que puede no empezar en cero (gráfica del asistente y laboratorio). */
  function grafica(ctx, o) {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'), W = 320, H = 190, x0 = 40, y0 = 160, alto = 130;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', o.alt);
    svg.style.width = '100%'; svg.style.maxWidth = '560px'; svg.style.display = 'block';
    var min = o.min || 0, max = o.max, y = function (v) { return y0 - alto * (Math.max(v, min) - min) / ((max - min) || 1); };
    var s = '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="var(--tq-papel)"/>';
    s += '<text x="' + (W / 2) + '" y="16" font-size="10" text-anchor="middle" fill="var(--tq-comal-texto)" font-weight="700">' + o.titulo + '</text>';
    [0, 0.5, 1].forEach(function (k) { var v = min + k * (max - min), yy = y(v);
      s += '<line x1="' + x0 + '" y1="' + yy + '" x2="' + (W - 10) + '" y2="' + yy + '" stroke="var(--tq-papel-sombra)"/>';
      s += '<text x="' + (x0 - 4) + '" y="' + (yy + 3) + '" font-size="8" text-anchor="end" fill="var(--tq-comal-texto)">' + fmt(v, max < 10 ? 1 : 0) + '</text>'; });
    var ancho = (W - x0 - 20) / o.barras.length;
    o.barras.forEach(function (b, i) {
      var x = x0 + 10 + i * ancho, h = y0 - y(b.v);
      s += '<rect x="' + x + '" y="' + y(b.v) + '" width="' + (ancho - 20) + '" height="' + Math.max(h, 0) + '" fill="var(--tq-anil-gris)"/>';
      s += '<text x="' + (x + (ancho - 20) / 2) + '" y="' + (y(b.v) - 4) + '" font-size="9" text-anchor="middle" fill="var(--tq-comal-texto)">' + fmt(b.v, o.decimales == null ? 1 : o.decimales) + '</text>';
      s += '<text x="' + (x + (ancho - 20) / 2) + '" y="' + (y0 + 12) + '" font-size="8" text-anchor="middle" fill="var(--tq-comal-texto)">' + b.n + '</text>';
    });
    s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + (W - 10) + '" y2="' + y0 + '" stroke="var(--tq-comal-texto)" stroke-width="1.5"/>';
    if (o.pie) s += '<text x="' + x0 + '" y="' + (H - 6) + '" font-size="7.5" fill="var(--tq-comal-texto)">' + o.pie + '</text>';
    svg.innerHTML = s; return svg;
  }
  /* Plano esquemático de Soho (no a escala): bombas, el asilo y la cervecería. El mapa original de Snow se muestra
     en su lugar cuando su archivo está en medios/ (medios.json, «mapa-snow»). */
  function plano(ctx) {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 320 200'); svg.setAttribute('role', 'img'); svg.style.width = '100%'; svg.style.maxWidth = '560px'; svg.style.display = 'block';
    svg.setAttribute('aria-label', 'Plano esquemático de Soho, no a escala: la bomba de Broad Street al centro, otras cuatro bombas alrededor, el asilo de Poland Street al norte y la cervecería en Broad Street.');
    var s = '<rect width="320" height="200" fill="var(--tq-papel)"/>';
    [[0, 70, 320, 8], [0, 140, 320, 8], [60, 0, 8, 200], [150, 0, 8, 200], [240, 0, 8, 200]].forEach(function (r) { s += '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" fill="var(--tq-manila)"/>'; });
    s += '<text x="200" y="68" font-size="8" fill="var(--tq-comal-texto)">BROAD STREET</text>';
    s += '<rect x="96" y="12" width="44" height="40" fill="var(--tq-papel-sombra)"/><text x="118" y="30" font-size="7" text-anchor="middle" fill="var(--tq-comal-texto)">ASILO</text><text x="118" y="40" font-size="7" text-anchor="middle" fill="var(--tq-comal-texto)">(pozo propio)</text>';
    s += '<rect x="176" y="84" width="48" height="34" fill="var(--tq-papel-sombra)"/><text x="200" y="104" font-size="7" text-anchor="middle" fill="var(--tq-comal-texto)">CERVECERÍA</text>';
    [['Broad St.', 162, 64], ['Rupert St.', 290, 166], ['Bridle Ln.', 260, 30], ['Marlborough Mews', 30, 30], ['Warwick St.', 40, 170]].forEach(function (b, i) {
      s += '<rect x="' + (b[1] - 5) + '" y="' + (b[2] - 5) + '" width="10" height="10" fill="var(--tq-anil)"/>';
      s += '<text x="' + b[1] + '" y="' + (b[2] + (i === 0 ? -8 : 16)) + '" font-size="7" text-anchor="middle" fill="var(--tq-comal-texto)">' + b[0] + '</text>';
    });
    s += '<text x="314" y="196" font-size="6.5" text-anchor="end" fill="var(--tq-comal-texto)">Plano esquemático, no a escala</text>';
    svg.innerHTML = s; return svg;
  }

  window.CASO_PAGINA = {
    id: '2.1', version: 'pagina-1.0', titulo: '¿EL AGUA O EL AIRE?', intro: './', minutos: 40,
    secciones: [

      /* 1 · el expediente */
      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx, cuerpo) {
        var av = ctx.el('div', 'aviso'); av.innerHTML = '<b>Aviso de contenido.</b> Este caso trata sobre muertes reales por cólera en Londres en 1854. Trabajamos con conteos, no con historias personales.';
        cuerpo.appendChild(av);
        ctx.p('Sobre la mesa de la parroquia de St James cae un expediente. Lo armó John Snow en el otoño de 1854.');
        var exp = ctx.el('div', 'expediente'); cuerpo.appendChild(exp);
        function abrir() {
          exp.innerHTML = '';
          [['EL PLANO DE SOHO', 'Las calles del brote, con sus bombas de agua. Doblado.', ''],
           ['LA LIBRETA DE SNOW', 'Las muertes que anotó casa por casa, cerca de cada bomba.', ''],
           ['LA TABLA DEL SUR DE LONDRES', 'Casas y muertes del otro lado del río. Cerrada con cinta.', ''],
           ['LA GRAFICA DEL ASISTENTE', 'Una gráfica hecha con esa tabla. Todavía no la abres.', 'borrador']].forEach(function (p, i) {
            var d = ctx.el('div', 'pieza' + (p[2] ? ' borrador' : '')); d.style.setProperty('--i', i);
            d.appendChild(ctx.el('b', null, p[0])); d.appendChild(ctx.el('p', null, p[1])); if (p[2]) d.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
            exp.appendChild(d);
          });
          ctx.datos.abierto = true; ctx.guardar(); ctx.listo();
        }
        if (ctx.datos.abierto) abrir(); else { var b = ctx.boton('ABRIR EL EXPEDIENTE', function () { b.remove(); abrir(); }); }
        var r = ctx.el('div', 'aviso'); r.innerHTML = '<b>Datos reales.</b> Las cifras son las que John Snow publicó en 1855 y 1856. Las fuentes están al final del caso.';
        cuerpo.appendChild(r);
      } },

      /* 2 · la apuesta, sobre una calle limpia (no es el mapa real) */
      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx, cuerpo) {
        var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 160 60'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Una calle con casas y una bomba de agua en medio, sin datos.');
        svg.style.width = '100%'; svg.style.maxWidth = '480px'; svg.setAttribute('shape-rendering', 'crispEdges');
        var s = '<rect width="160" height="60" fill="var(--tq-cielo)"/><rect y="44" width="160" height="16" fill="var(--tq-piedra)"/>';
        [6, 30, 54, 96, 120].forEach(function (x) { s += '<rect x="' + x + '" y="18" width="20" height="26" fill="var(--tq-ladrillo)"/><rect x="' + (x + 4) + '" y="24" width="4" height="5" fill="var(--tq-ventana)"/><rect x="' + (x + 12) + '" y="24" width="4" height="5" fill="var(--tq-ventana)"/>'; });
        s += '<rect x="80" y="30" width="4" height="14" fill="var(--tq-anil)"/><rect x="78" y="30" width="8" height="3" fill="var(--tq-anil)"/>';
        svg.innerHTML = s; cuerpo.appendChild(svg);
        ctx.p('<b>Si pones un punto por cada muerte y casi todos caen alrededor de esta bomba, ¿eso prueba que la culpa es del agua?</b>');
        var OPC = ['Sí, eso lo prueba', 'Es una pista fuerte, pero falta comparar', 'No: alrededor de la bomba también vive más gente', 'No: el aire malo del barrio está en el mismo lugar'];
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

      /* 3 · la calle: el plano, la libreta de Snow y dos islas que no cuadran */
      { id: 'calle', titulo: 'LA CALLE', render: function (ctx, cuerpo) {
        ctx.p('Se despliega el plano. Snow marcó cada muerte en su casa; las bombas de agua van en azul.');
        cuerpo.appendChild(plano(ctx));
        ctx.p('El mapa original de Snow (1855) se puede ver completo en <a href="https://commons.wikimedia.org/wiki/File:Snow-cholera-map-1.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.', 'nota');
        ctx.h3('LA LIBRETA DE SNOW');
        ctx.p('De ' + CI.bs_registradas + ' muertes registradas en los últimos tres días de la semana que terminó el 2 de septiembre, ' + CI.bs_cerca_otra_bomba +
          ' fueron en casas más cerca de <b>otra</b> bomba. Snow fue a preguntar en cada una. Voltea las diez tarjetas.');
        var TARJETAS = [];
        for (var k = 0; k < CI.bs_10_familias; k++) TARJETAS.push('La familia mandaba por agua a Broad Street: la prefería.');
        for (k = 0; k < CI.bs_10_escuela; k++) TARJETAS.push('Un niño que iba a la escuela junto a la bomba de Broad Street.');
        for (k = 0; k < CI.bs_10_antes; k++) TARJETAS.push('Como las muertes de cólera que ya había antes del brote.');
        var vistas = ctx.controles('tarjeta').map(function (x) { return x.n; });
        var rej = ctx.el('div', 'acciones'); cuerpo.appendChild(rej);
        var lista = ctx.el('ol', 'linea-tiempo'); cuerpo.appendChild(lista);
        function pintarLista() { lista.innerHTML = ''; vistas.slice().sort(function (a, b) { return a - b; }).forEach(function (n) { lista.appendChild(ctx.el('li', null, 'Tarjeta ' + (n + 1) + ': ' + TARJETAS[n])); }); }
        TARJETAS.forEach(function (_, n) {
          var b = ctx.el('button', 'btn sec', String(n + 1)); b.type = 'button'; b.setAttribute('aria-label', 'Voltear la tarjeta ' + (n + 1));
          if (vistas.indexOf(n) >= 0) { b.disabled = true; }
          b.addEventListener('click', function () { b.disabled = true; vistas.push(n); ctx.registrar('tarjeta', { n: n }); pintarLista(); ctx.anunciar('Tarjeta ' + (n + 1) + ': ' + TARJETAS[n]); });
          rej.appendChild(b);
        });
        pintarLista();

        ctx.h3('DOS ISLAS EN EL PLANO');
        ctx.p('El <b>asilo de Poland Street</b> está rodeado de casas con muertes. Tenía ' + fmt(CI.asilo_internos) + ' internos y su propio pozo, y murieron ' + CI.asilo_muertes + '. La <b>cervecería</b> de Broad Street tenía más de ' + CI.cerveceria_obreros + ' obreros que tomaban cerveza, no agua, y ninguno murió.');
        ctx.p('<b>¿Pocas muertes porque ahí vivía poca gente, o por otra cosa?</b>');
        var notas = ctx.controles('cuenta').filter(function (x) { return x.que === 'asilo'; }).map(function (x) { return x.texto; });
        var lib = libreta(ctx, cuerpo, notas);
        ctx.calculadora();
        var inp = ctx.campo({ id: 'asilo', etiqueta: 'Con la calculadora: muertes por cada 1,000 internos del asilo', renglones: 1, max: 12 });
        inp.inputMode = 'decimal';
        ctx.boton('ANOTAR EN LA LIBRETA', function () {
          var x = num(ctx.datos.asilo); if (x == null) return;
          var t = 'Asilo de Poland Street: ' + fmt(x, 1) + ' muertes por cada 1,000 internos.';
          ctx.registrar('cuenta', { que: 'asilo', valor: x, texto: t }); lib.anotar(t);
        }, 'sec');
        ctx.reto({ id: 'reto_mapa_deja_fuera', titulo: '★ RETO 1', dificultad: 1, tipo: 'opcion',
          pregunta: 'El mapa pone una barra por cada muerte en su casa. ¿Qué no te dice?',
          opciones: ['Cuántas personas vivían en cada casa y de qué agua tomaban', 'Dónde estaban las bombas', 'En qué casas hubo muertes', 'Qué calles tuvieron más muertes'],
          pista: 'Piensa en el asilo: tiene pocas barras. ¿Es porque vivía poca gente ahí?',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_mapa_deja_fuera || (ctx.S.datos._luego || {}).reto_mapa_deja_fuera) ctx.listo();
      } },

      /* 4 · el sur de Londres: la tabla, la columna que llena el alumno y la herramienta, nombrada después del reto 3 */
      { id: 'sur', titulo: 'EL SUR DE LONDRES', render: function (ctx, cuerpo) {
        var t = ctx.el('div', 'tarjeta'); t.appendChild(ctx.el('h3', null, 'SE CORTA LA CINTA'));
        var tp = ctx.el('p'); tp.innerHTML = 'Al sur del Támesis, <b>dos compañías</b> llevan agua por las mismas calles. <b>Lambeth</b> movió su toma río arriba en ' + CI.lambeth_mueve +
          '; <b>Southwark & Vauxhall</b> sigue sacando el agua en Battersea, donde el río ya recibió los drenajes de la ciudad. Snow revisó casa por casa de qué compañía era el agua: con los recibos y, si no los había, con una prueba de sal.';
        t.appendChild(tp); cuerpo.appendChild(t);
        ctx.p('Primeras siete semanas de la epidemia de 1854, hasta el 26 de agosto:');
        var celdas = {}, entradas = {};
        var guardadas = {}; ctx.controles('tasa_fila').forEach(function (x) { guardadas[x.fila] = x.valor; });
        T9.forEach(function (f) {
          var i = ctx.el('input'); i.type = 'text'; i.inputMode = 'decimal'; i.size = 6; i.style.width = '5.5em'; i.style.maxWidth = '100%'; i.setAttribute('aria-label', 'Muertes por cada 10,000 casas de ' + NOMBRE[f.id]);
          if (guardadas[f.id] != null) i.value = fmt(guardadas[f.id], 1);
          entradas[f.id] = i; celdas[f.id] = i;
        });
        cuerpo.appendChild(tabla(ctx, ['GRUPO', 'CASAS', 'MUERTES', 'POR 10,000 CASAS'], T9.map(function (f) { return [NOMBRE[f.id], fmt(f.casas), fmt(f.muertes), celdas[f.id]]; }), 'Casas y muertes por compañía'));
        var graf = ctx.el('div'); cuerpo.appendChild(graf);
        var nota = ctx.el('p', 'nota'); nota.setAttribute('role', 'status'); cuerpo.appendChild(nota);
        function pintar() {
          graf.innerHTML = '';
          var todas = T9.every(function (f) { return guardadas[f.id] != null; });
          if (todas) {
            ctx.barras({ categorias: T9.map(function (f) { return NOMBRE[f.id]; }), decimales: 1,
              series: [{ nombre: 'Por cada 10,000 casas', color: 'var(--anil)', valores: T9.map(function (f) { return guardadas[f.id]; }) }],
              pie: 'Tu columna: muertes por cada 10,000 casas.' }, graf);
            nota.textContent = 'Con las tres filas llenas, las barras ya no cuentan muertes: cuentan muertes por casa.';
          } else {
            ctx.barras({ categorias: T9.map(function (f) { return NOMBRE[f.id]; }),
              series: [{ nombre: 'Muertes', color: 'var(--comal)', valores: T9.map(function (f) { return f.muertes; }) }],
              pie: 'Muertes en las primeras siete semanas.' }, graf);
            nota.textContent = 'Por muertes, el resto de Londres va primero. Llena la columna con la calculadora: muertes entre casas, por 10,000.';
          }
        }
        T9.forEach(function (f) {
          entradas[f.id].addEventListener('change', function () {
            var x = num(entradas[f.id].value);
            if (x == null || x < 0 || x > 10000) { nota.textContent = 'Escribe un número entre 0 y 10,000 para ' + NOMBRE[f.id] + '.'; return; }
            guardadas[f.id] = x; ctx.registrar('tasa_fila', { fila: f.id, valor: x }); pintar();
          });
        });
        pintar();
        ctx.calculadora();
        ctx.reto({ id: 'reto_tasa_sv', titulo: '★★ RETO 2', dificultad: 2, tipo: 'numero', etiqueta: 'Tu respuesta (por cada 10,000 casas)',
          pregunta: '¿Cuántas muertes hubo por cada 10,000 casas de Southwark & Vauxhall?', pista: 'Muertes entre casas, por 10,000.',
          alResponder: function () {}, alSaltar: function () {} });
        var nom = ctx.el('div');
        ctx.reto({ id: 'reto_cuantas_veces', titulo: '★★★ RETO 3', dificultad: 3, tipo: 'numero', etiqueta: 'Tu respuesta (veces)',
          pregunta: '¿Cuántas veces más muertes por casa tuvieron las casas de Southwark & Vauxhall que las de Lambeth?',
          pista: 'Saca la de Lambeth igual y divide una entre otra.',
          alResponder: function () { nombrar(); ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        cuerpo.appendChild(nom);
        function nombrar() {
          if (nom.childNodes.length) return;
          var c = ctx.el('div', 'tarjeta nombre'); c.appendChild(ctx.el('h3', null, 'LO QUE ACABAS DE USAR TIENE NOMBRE'));
          var a = ctx.el('p'); a.innerHTML = 'Dividir las muertes de cada grupo entre cuántos estaban expuestos (casas o personas) es una <b>tasa por población expuesta</b>. Dividir una tasa entre otra es una <b>razón de tasas</b>, también llamada riesgo relativo.';
          var b = ctx.el('p'); b.innerHTML = 'Y cuando la vida reparte a la gente en dos grupos que nadie eligió para un estudio, pero que están mezclados en todo lo demás, se llama <b>experimento natural</b>. Un mapa o una barra de conteos no te dicen contra qué comparar: el <b>grupo de comparación</b> lo eliges tú.';
          var l = ctx.el('p', 'nota'); l.innerHTML = 'Para practicar lo que acabas de usar: <a href="../../labs/level-2/comparacion-visual.html">Laboratorio: comparación visual</a>. Es opcional y no cuenta para la calificación.';
          c.appendChild(a); c.appendChild(b); c.appendChild(l); nom.appendChild(c);
        }
        if (ctx.S.retos.reto_cuantas_veces) nombrar();
        if (ctx.S.retos.reto_cuantas_veces || (ctx.S.datos._luego || {}).reto_cuantas_veces) ctx.listo();
      } },

      /* 5 · la gráfica del asistente: un denominador equivocado (error plantado) */
      { id: 'asistente', titulo: 'LA GRAFICA DEL ASISTENTE', render: function (ctx, cuerpo) {
        ctx.p('Le pediste al asistente: <i>«Haz una gráfica que compare la tasa de muertes por cada 10,000 casas de las dos compañías y del resto de Londres, primeras siete semanas.»</i> Esto entregó. <b>Puede tener un error.</b> Revisa antes de usarla.');
        var pz = ctx.el('div', 'pieza borrador'); pz.appendChild(ctx.el('b', null, 'GRAFICA DEL ASISTENTE')); pz.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        var malas = T9.map(function (f) { return { n: NOMBRE[f.id].replace('Southwark & Vauxhall', 'S&V'), v: Math.round(10000 * f.muertes / CASAS_TODAS * 10) / 10 }; });
        pz.appendChild(grafica(ctx, { titulo: 'Muertes por cada 10,000 casas, julio y agosto de 1854', barras: malas, max: 50, min: 0,
          pie: 'Fuente: Snow (1855), Tabla IX. ' + fmt(CASAS_TODAS) + ' casas.',
          alt: 'Gráfica del asistente: Southwark & Vauxhall ' + fmt(malas[0].v, 1) + ', Lambeth ' + fmt(malas[1].v, 1) + ', resto de Londres ' + fmt(malas[2].v, 1) + '. Eje desde cero. Nota al pie: ' + fmt(CASAS_TODAS) + ' casas.' }));
        pz.appendChild(ctx.el('p', null, '«Conclusión: el resto de Londres tiene la tasa más alta. La diferencia entre las dos compañías no alcanza para culpar al agua.»'));
        cuerpo.appendChild(pz);
        ctx.h3('TU MESA DE VERIFICACION');
        var notas = ctx.controles('comprobacion').map(function (x) { return x.texto; }).filter(Boolean);
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        var lib = libreta(ctx, cuerpo, notas);
        function anotar(a, t) { if (notas.indexOf(t) < 0) ctx.registrar('comprobacion', { accion: a, texto: t }); lib.anotar(t); }
        ctx.boton('MIRAR DONDE EMPIEZA EL EJE', function () { anotar('eje', 'Eje: empieza en 0.'); }, 'sec', acc);
        ctx.boton('CONTAR LAS FILAS', function () { anotar('filas', 'Filas: la gráfica tiene 3 barras y la tabla 3 filas.'); }, 'sec', acc);
        ctx.boton('LEER EL TITULO Y LA NOTA', function () { anotar('nota', 'Título: «por cada 10,000 casas». Nota al pie: ' + fmt(CASAS_TODAS) + ' casas.'); }, 'sec', acc);
        var rc = ctx.el('div', 'tarjeta'); rc.appendChild(ctx.el('h3', null, 'RECALCULAR UNA BARRA'));
        rc.appendChild(ctx.el('p', null, 'Elige una barra, recalcúlala con la calculadora y compárala con la gráfica y con tu columna.'));
        ctx.calculadora(rc);
        var eleg = ctx.opciones({ lista: T9.map(function (f) { return [f.id, NOMBRE[f.id]]; }), clave: 'barra', etiqueta: 'Barra a recalcular', dentro: rc, clase: 'zonas' });
        var ri = ctx.campo({ id: 'recalculo', etiqueta: 'Tu cuenta para esa barra', renglones: 1, max: 12, dentro: rc }); ri.inputMode = 'decimal';
        ctx.boton('ANOTAR MI CUENTA', function () {
          var f = eleg.valor()[0], x = num(ctx.datos.recalculo); if (!f || x == null) return;
          var m = malas[T9.map(function (y) { return y.id; }).indexOf(f)];
          anotar('recalcular', 'Recalculé ' + NOMBRE[f] + ': me da ' + fmt(x, 1) + '; la gráfica dice ' + fmt(m.v, 1) + '.');
        }, 'sec', rc);
        cuerpo.appendChild(rc);
        ctx.reto({ id: 'reto_error_grafica', titulo: '★★ RETO 4', dificultad: 2, tipo: 'opcion',
          pregunta: 'Compara la gráfica con la tabla. ¿Dónde está el error?',
          opciones: ['Divide las muertes de cada fila entre las casas de todo Londres, no entre las casas de esa fila', 'El eje vertical no empieza en cero y exagera la diferencia', 'Le falta la fila de Lambeth', 'No tiene ningún error'],
          pista: 'Recalcula una barra con la calculadora y compárala con tu columna.',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_error_grafica || (ctx.S.datos._luego || {}).reto_error_grafica) ctx.listo();
      } },

      /* 6 · la segunda prueba: otra unidad (personas), otro periodo (toda la epidemia) y el peor caso */
      { id: 'segunda_prueba', titulo: 'LA SEGUNDA PRUEBA', render: function (ctx, cuerpo) {
        ctx.p('Una comparación que solo se sostiene de una manera no es firme. En 1856 Snow publicó la epidemia completa en los distritos del sur, ahora <b>por personas</b>:');
        var peor = (ctx.controles('peor_caso').slice(-1)[0] || {}).grupo || null;
        var caja = ctx.el('div'); cuerpo.appendChild(caja);
        function pintarTabla() {
          caja.innerHTML = '';
          var filas = [[NOMBRE.t5_sv, fmt(T5SV.personas), fmt(T5SV.muertes + (peor === 't5_sv' ? fila('t5_sin_averiguar').muertes : 0))],
                       [NOMBRE.t5_lambeth, fmt(T5L.personas), fmt(T5L.muertes + (peor === 't5_lambeth' ? fila('t5_sin_averiguar').muertes : 0))],
                       ['Bombas de calle y otras fuentes', '—', fmt(fila('t5_pozos').muertes)],
                       ['Sin averiguar', '—', peor ? '0 (sumadas a ' + NOMBRE[peor] + ')' : fmt(fila('t5_sin_averiguar').muertes)]];
          caja.appendChild(tabla(ctx, ['GRUPO', 'PERSONAS', 'MUERTES'], filas, 'Epidemia completa por personas'));
        }
        pintarTabla();
        var m = ctx.el('div', 'tarjeta'); m.appendChild(ctx.el('h3', null, '¿ESTABAN MEZCLADOS?'));
        m.appendChild(ctx.el('p', null, 'Snow escribió que las tuberías de las dos compañías pasaban por todas las calles, y que cada una abastecía a ricos y pobres, casas grandes y chicas. Nadie eligió su compañía por estar sano o enfermo.'));
        cuerpo.appendChild(m);
        ctx.h3('¿Y SI LAS ' + fila('t5_sin_averiguar').muertes + ' FUERAN TODAS DE UN GRUPO?');
        ctx.p('Elige a qué grupo mandarlas. La tabla suma la fila; las cuentas las haces tú.', 'nota');
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        [['t5_sv', 'A SOUTHWARK & VAUXHALL'], ['t5_lambeth', 'A LAMBETH'], [null, 'A NINGUNO']].forEach(function (op) {
          ctx.boton(op[1], function () { peor = op[0]; ctx.registrar('peor_caso', { grupo: op[0] }); pintarTabla(); ctx.anunciar(op[0] ? 'Sumadas a ' + NOMBRE[op[0]] + '.' : 'Sin asignar.'); }, 'sec', acc);
        });
        var notas = ctx.controles('cuenta').filter(function (x) { return x.que === 'personas'; }).map(function (x) { return x.texto; });
        var lib = libreta(ctx, cuerpo, notas);
        ctx.calculadora();
        var i1 = ctx.campo({ id: 'sv', etiqueta: 'Southwark & Vauxhall: muertes por cada 10,000 personas', renglones: 1, max: 12 }); i1.inputMode = 'decimal';
        var i2 = ctx.campo({ id: 'lam', etiqueta: 'Lambeth: muertes por cada 10,000 personas', renglones: 1, max: 12 }); i2.inputMode = 'decimal';
        ctx.boton('ANOTAR EN LA LIBRETA', function () {
          var a = num(ctx.datos.sv), b = num(ctx.datos.lam); if (a == null || b == null) return;
          var t = 'Por personas' + (peor ? ' (las ' + fila('t5_sin_averiguar').muertes + ' sumadas a ' + NOMBRE[peor] + ')' : '') + ': Southwark & Vauxhall ' + fmt(a, 1) + ' y Lambeth ' + fmt(b, 1) + ' por cada 10,000.';
          ctx.registrar('cuenta', { que: 'personas', sv: a, lambeth: b, peor: peor, texto: t }); lib.anotar(t);
        }, 'sec');
        ctx.reto({ id: 'reto_peor_caso', titulo: '★★★ RETO 5', dificultad: 3, tipo: 'numero', etiqueta: 'Tu respuesta (veces)',
          pregunta: 'Supón que las ' + fila('t5_sin_averiguar').muertes + ' muertes sin averiguar fueran todas de clientes de Lambeth. ¿Cuántas veces más muertes por persona tendría todavía Southwark & Vauxhall?',
          pista: 'Suma las ' + fila('t5_sin_averiguar').muertes + ' a Lambeth, saca las dos tasas por personas y divide.',
          alResponder: function () {}, alSaltar: function () {} });
        ctx.h3('VERIFICA');
        ctx.p('Escribe qué revisaste para confiar en la comparación y qué encontraste. Busca dos comprobaciones que no salgan de la misma cuenta.');
        ctx.campo({ id: 'c1', etiqueta: 'Comprobación 1: qué revisé y qué encontré', renglones: 3, max: 900, inicial: ctx.S.respuestas.verificacion || '' });
        ctx.campo({ id: 'c2', etiqueta: 'Comprobación 2: qué revisé y qué encontré', renglones: 3, max: 900 });
        var g;
        ctx.boton('ANOTAR MI VERIFICACION', function () {
          var t1 = (ctx.datos.c1 || '').trim(), t2 = (ctx.datos.c2 || '').trim();
          if (!t1 && !t2) { g.className = 'guardado mal'; g.textContent = 'Escribe al menos una comprobación.'; return; }
          ctx.marcarGuardado(g, ctx.responder('verificacion', t2 ? '1) ' + t1 + ' 2) ' + t2 : t1, 'verificar')); ctx.listo();
        });
        g = ctx.guardado();
        if (ctx.S.respuestas.verificacion) ctx.listo();
      } },

      /* 7 · la firma */
      { id: 'firma', titulo: 'FIRMA TU DECISION', render: function (ctx, cuerpo) {
        ctx.p('Imagina que es noviembre de 1854 (la segunda prueba la publicó Snow en 1856: aquí la tienes de adelanto). La ley de 1852 obliga a las compañías a sacar el agua de más arriba del río, pero el plazo vence hasta el 31 de agosto de ' + CI.ley_1852 + '. La autoridad sanitaria te pide una recomendación sobre el agua del sur de Londres. Lo que pasó de verdad viene después.');
        var OPC = ['Esperar al plazo de la ley: el cólera viene del aire y mover las tomas antes no cambia nada',
          'Pedir que Southwark & Vauxhall adelante el cambio de su toma y avisar ya a sus clientes',
          'Avisar a los clientes de Southwark & Vauxhall y seguir midiendo hasta el plazo',
          'No recomendar nada todavía: la comparación no alcanza'];
        var sel = ctx.opciones({ lista: OPC.map(function (o) { return [o, o]; }), clave: 'decision', etiqueta: 'Tu recomendación' });
        ctx.campo({ id: 'frase', etiqueta: 'Qué le dirías a la autoridad, en una frase', renglones: 2, max: 400 });
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de decisión', renglones: 2, max: 400 });
        ctx.campo({ id: 'algo', etiqueta: '¿Necesitas algo más que contar y comparar? ¿Qué?', renglones: 2, max: 400 });
        var res = ctx.el('div'), g;
        ctx.boton('FIRMAR MI DECISION', function () {
          var d = ctx.datos, o = sel.valor()[0];
          if (!o || !(d.frase || '').trim()) { g.className = 'guardado mal'; g.textContent = 'Elige una recomendación y escribe tu frase. Nadie firma por ti.'; return; }
          var texto = 'Le recomiendo a la autoridad: ' + o + '. En una frase: ' + d.frase.trim().replace(/\.+$/, '') + '. Certeza: ' + (d.certeza || 'Media') +
            '. Lo que no sé: ' + (d.nose || '') + '. Me haría cambiar: ' + (d.cambiar || '') + '. ¿Algo más que contar y comparar?: ' + (d.algo || '');
          var ok = ctx.responder('firma', texto, 'firma');
          res.innerHTML = ''; ctx.sello('DECISION FIRMADA', 'Con certeza ' + (d.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('DECISION FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      /* 8 · la revelación */
      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        ctx.h3('EL MANGO DE LA BOMBA');
        var con = D.cronologia.filter(function (x) { return /^\d{4}-/.test(x.fecha); }), sin = D.cronologia.filter(function (x) { return !/^\d{4}-/.test(x.fecha); });
        var max = Math.max.apply(null, con.map(function (x) { return x.ataques; }));
        var col = ctx.el('div', 'columnas'); col.setAttribute('role', 'img');
        col.setAttribute('aria-label', 'Ataques mortales por día en el brote de Broad Street, del 19 de agosto al 30 de septiembre de 1854. Suben de golpe el 31 de agosto, llegan al máximo el 1 de septiembre y ya van muy abajo el 8 de septiembre, marcado, cuando se quitó el mango.');
        con.forEach(function (x) { var i = ctx.el('i', x.fecha === '1854-09-08' ? 'marca' : ''); i.style.height = (100 * x.ataques / max) + '%'; i.title = x.fecha + ': ' + x.ataques; col.appendChild(i); });
        cuerpo.appendChild(col);
        var ej = ctx.el('div', 'ejes'); ['19 ago', '8 sep (mango)', '30 sep'].forEach(function (a) { ej.appendChild(ctx.el('span', null, a)); }); cuerpo.appendChild(ej);
        var pico = con.reduce(function (a, b) { return b.ataques > a.ataques ? b : a; }), dia8 = con.filter(function (x) { return x.fecha === '1854-09-08'; })[0];
        ctx.p('Snow habló con la junta de la parroquia la tarde del 7 de septiembre y pidió quitar el mango de la bomba de Broad Street; se quitó al día siguiente. Pero el máximo fue el ' + Number(pico.fecha.slice(8)) + ' de septiembre (' + pico.ataques + ' ataques mortales) y el día ' + CI.mango + ' ya eran ' + dia8.ataques +
          '. Snow mismo escribió que para entonces el brote había bajado tanto que no se podía saber si el pozo seguía contaminado. Su tabla suma ' + CI.bs_total_tabla1 + ' ataques mortales; de ' + sin[0].ataques + ' no se sabe la fecha.');
        var t = ctx.el('div', 'tarjeta verificado'); t.appendChild(ctx.el('h3', null, 'JOHN SNOW · VERIFICADO'));
        var dl = ctx.el('dl');
        [['LO QUE SÍ PASÓ', 'La comparación del sur de Londres fue la prueba fuerte: dos compañías, las mismas calles y una diferencia enorme por casa. Southwark & Vauxhall mudó su toma a Hampton en agosto de ' + CI.sv_mueve + ', al vencer el plazo de la ley.'],
         ['NO CONVENCIÓ A TODOS', 'La autoridad sanitaria siguió con la explicación del aire. Del libro de Snow se vendieron 56 de 300 ejemplares. El reverendo Henry Whitehead, que creía en el miasma, investigó con él y en 1855 encontró el primer caso del brote junto al pozo.'],
         ['LA TABLA FAMOSA TAMBIÉN SE REVISA', 'Para el resto de Londres Snow imprimió 59 muertes por cada 10,000 casas; con sus mismas cifras salen 55.5. La comparación no cambia, pero hasta una tabla célebre se recalcula.'],
         ['LO QUE NO SE SABE', 'Cuántas personas vivían en cada casa por compañía (por eso la segunda prueba), cómo se eligió la compañía de cada casa y la cifra total del brote, que cambia según el área que se cuente.'],
         ['MITOS', 'Quitar el mango acabó con la epidemia (ya venía bajando) · Snow lo descubrió mirando el mapa (su idea del agua es anterior; el mapa la mostró) · El mapa convenció a todos (no) · Snow descubrió la bacteria (la describió Pacini en 1854 y la aisló Koch en 1883).']
        ].forEach(function (f) { var a = document.createElement('div'); a.appendChild(ctx.el('dt', 'px', f[0])); a.appendChild(ctx.el('dd', null, f[1])); dl.appendChild(a); });
        t.appendChild(dl); cuerpo.appendChild(t);
        var m = /^Le recomiendo a la autoridad: (.+?)\. En una frase/.exec(ctx.S.respuestas.firma || '');
        var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA Y TU FIRMA'));
        tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu firma: ' + (m ? m[1] : '(todavía no firmas)') + '.'));
        tu.appendChild(ctx.el('p', null, 'Un mapa de puntos dice dónde pasó algo. Para saber si el agua pesaba, hubo que dividir entre cuántos la tomaban.'));
        cuerpo.appendChild(tu);
        ctx.listo();
      } },

      /* 9 · laboratorio: el armador de gráficas */
      { id: 'laboratorio', titulo: 'LABORATORIO', render: function (ctx, cuerpo) {
        ctx.p('El armador de gráficas: los mismos datos reales, cuatro perillas. Prueba combinaciones y mira cuáles cambian la historia.');
        var d = ctx.datos; d.div = d.div || 'fila'; d.eje = d.eje || '0'; d.filas = d.filas || 'tres'; d.periodo = d.periodo || 'casas';
        var zona = ctx.el('div'), frase = ctx.el('p', 'frase'); frase.setAttribute('role', 'status');
        var ultimo = null, temp = null;
        function pintar() {
          var base = d.periodo === 'casas' ? T9.map(function (f) { return { id: f.id, n: NOMBRE[f.id], expuestos: f.casas, muertes: f.muertes }; })
            : [T5SV, T5L].map(function (f) { return { id: f.id.replace('t5', 't9'), n: NOMBRE[f.id], expuestos: f.personas, muertes: f.muertes }; });
          var filas = base.filter(function (f) { return !(d.filas === 'sin_resto' && f.id === 't9_resto') && !(d.filas === 'sin_lambeth' && f.id === 't9_lambeth'); });
          var total = base.reduce(function (s, f) { return s + f.expuestos; }, 0);
          var barras = filas.map(function (f) { return { n: f.n.replace('Southwark & Vauxhall', 'S&V'), v: d.div === 'nada' ? f.muertes : 10000 * f.muertes / (d.div === 'todo' ? total : f.expuestos) }; });
          var max = Math.max.apply(null, barras.map(function (b) { return b.v; })) * 1.15;
          var min = d.eje === '30' ? Math.min(30, max / 2) : 0;
          var unidad = d.periodo === 'casas' ? 'casas' : 'personas';
          zona.innerHTML = '';
          zona.appendChild(grafica(ctx, { titulo: d.div === 'nada' ? 'Muertes' : 'Muertes por cada 10,000 ' + unidad, barras: barras, max: max, min: min, decimales: d.div === 'nada' ? 0 : 1,
            pie: (d.periodo === 'casas' ? 'Snow 1855, Tabla IX: primeras siete semanas.' : 'Snow 1856, Tabla V: epidemia completa.') + (min ? ' Eje desde ' + fmt(min) + '.' : ''),
            alt: barras.map(function (b) { return b.n + ' ' + fmt(b.v, 1); }).join(', ') + (min ? '. El eje empieza en ' + fmt(min) : '') }));
          var t = d.div === 'nada' ? 'Cuenta muertes: gana el grupo con más ' + unidad + ', no el de más riesgo.'
            : d.div === 'todo' ? 'Divide todo entre el mismo número: tiene la forma de los conteos aunque el título diga tasa.'
            : 'Cada grupo entre sus propios ' + unidad + ': esta sí compara riesgos.';
          if (min) t += ' Con el eje desde ' + fmt(min) + ', las diferencias se ven más grandes de lo que son.';
          if (d.filas !== 'tres') t += ' Quitar una fila cambia contra qué comparas.';
          frase.textContent = t;
          var clave = [d.div, d.eje, d.filas, d.periodo].join('·');
          if (clave !== ultimo) { ultimo = clave; clearTimeout(temp); temp = setTimeout(function () { ctx.registrar('laboratorio', { div: d.div, eje: d.eje, filas: d.filas, periodo: d.periodo }); }, 10000); }
        }
        [['div', 'Qué dividir', [['nada', 'Nada'], ['fila', 'Casas o personas de cada fila'], ['todo', 'Las de todos juntos']]],
         ['eje', 'Dónde empieza el eje', [['0', 'En 0'], ['30', 'En 30']]],
         ['filas', 'Qué filas entran', [['tres', 'Todas'], ['sin_resto', 'Sin el resto de Londres'], ['sin_lambeth', 'Sin Lambeth']]],
         ['periodo', 'Qué datos', [['casas', 'Siete semanas, por casas'], ['personas', 'Epidemia completa, por personas']]]].forEach(function (p) {
          ctx.h3(p[1].toUpperCase());
          var perilla = ctx.opciones({ lista: p[2], clave: p[0], clase: 'zonas', etiqueta: p[1], alCambiar: function (x) { if (!x[0]) { ctx.datos[p[0]] = p[2][0][0]; ctx.guardar(); perilla.poner([p[2][0][0]]); } pintar(); } });
        });
        cuerpo.appendChild(zona); cuerpo.appendChild(frase);
        ctx.p('Con datos por personas no hay fila del resto de Londres: Snow no la calculó así.', 'nota');
        pintar(); ctx.listo();
      } },

      /* 10 · transferir */
      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        cuerpo.appendChild(tabla(ctx, ['EN LA TAQUERÍA', 'EN 1854'], [
          ['La sucursal del centro tiene más quejas que la del norte', 'El resto de Londres tiene más muertes que cualquier compañía'],
          ['Pero el centro vende seis veces más tacos', 'Pero tiene seis veces más casas que Southwark & Vauxhall'],
          ['Quejas por cada mil pedidos, en cada sucursal', 'Muertes por cada 10,000 casas, en cada compañía']], 'La misma idea en la taquería'));
        ctx.reto({ id: 'reto_taqueria_expuestos', titulo: '★ RETO 6', dificultad: 1, tipo: 'opcion',
          pregunta: 'Don Juan estrenó una salsa. Esta semana, 6 clientes que la probaron y 4 que no se quejaron del estómago. ¿Qué necesita antes de culpar a la salsa?',
          opciones: ['Cuántos clientes probaron la salsa y cuántos no', 'Nada: 6 es más que 4', 'A qué hora llegaron los que se quejaron', 'Cuánto cuesta la salsa'],
          pista: '¿Contra cuántos estaban expuestos en cada grupo?', alResponder: function () {}, alSaltar: function () {} });
        ctx.h3('MI DECISION');
        ctx.p('En tu decisión, <b>¿qué dos grupos comparas? ¿Cuántos estaban expuestos en cada uno?</b>');
        ctx.campo({ id: 'mi', etiqueta: 'Mi decisión: qué dos grupos comparo y cuántos estaban expuestos en cada uno', renglones: 4, max: 1500, inicial: ctx.S.respuestas.mi_decision || '' });
        var fin = ctx.el('div'), g;
        ctx.boton('ENTREGAR Y CERRAR EL CASO', function () {
          var texto = (ctx.datos.mi || '').trim();
          if (!texto) { g.className = 'guardado mal'; g.textContent = 'Escribe tu pieza de Mi decisión para cerrar el caso.'; return; }
          var ok = ctx.responder('mi_decision', texto, 'cierre'); ctx.completar(); ctx.marcarGuardado(g, ok); cerrar();
        });
        g = ctx.guardado(); cuerpo.appendChild(fin);
        function cerrar() {
          fin.innerHTML = ''; ctx.sello('CASO 2.1 RESUELTO', null, 'comal', fin);
          var bits = Object.keys(ctx.S.retos).reduce(function (s, k) { return s + (ctx.S.retos[k].bits || 0); }, 0);
          if (ctx.M.modo === 'alumno') fin.appendChild(ctx.el('p', null, 'Bits de este caso: ' + bits + '. Tu marcador completo está en Mi avance.'));
          var f = ctx.el('p', 'frase'); f.innerHTML = '<b>El criterio en una frase:</b> ¿Contra qué lo comparo? Antes de comparar conteos, divide entre cuántos estaban expuestos en cada grupo.'; fin.appendChild(f);
          var s = ctx.el('p'); s.innerHTML = 'Siguiente caso de la clase: <a href="../2-3/">¿Lanzarías mañana?</a>'; fin.appendChild(s);
          ctx.listo();
        }
        if (ctx.S.completo) cerrar();
        var fu = document.createElement('details'); fu.className = 'mas';
        fu.innerHTML = '<summary>Fuentes</summary><ul>' + [
          ['https://www.gutenberg.org/ebooks/72894', 'Snow, J. (1855). On the Mode of Communication of Cholera, 2.ª ed.: Tablas I y IX, la libreta de Broad Street, el asilo y la cervecería.'],
          ['https://www.gutenberg.org/ebooks/66507', 'Snow, J. (1856). Cholera and the Water Supply in the South Districts of London in 1854: Tabla V.'],
          ['https://epi-snow.ph.ucla.edu/Stream3_GrandExperiment_d.html', 'Frerichs, R. R. John Snow (UCLA): las tomas de las compañías y el libro.'],
          ['https://doi.org/10.1016/S0140-6736(00)02442-9', 'Brody, H. y otros (2000). Map-making and myth-making in Broad Street. The Lancet 356: 64–68.'],
          ['https://data8.datascience.uchicago.edu/chapters/02/2/snow-s-grand-experiment', 'Data 8: Snow’s «Grand Experiment» (transcripción de la Tabla IX).']
        ].map(function (f) { return '<li><a href="' + f[0] + '" target="_blank" rel="noopener noreferrer">' + f[1] + '</a></li>'; }).join('') + '</ul>';
        cuerpo.appendChild(fu);
      } }
    ]
  };
})();
