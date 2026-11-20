/* Caso 2.2 · «1,174 de cada 1,000» (Florence Nightingale en Crimea, 1854-1856) — intro de 5 escenas (formato completo).
   Solo la intro: gancho público. La apuesta, la tabla, la rosa y la revelación viven en caso.html.
   Hechos verificados (casos/staging/nightingale-crimea-1854.json): Nightingale llega a Scutari el 5 de noviembre de 1854 con
   38 enfermeras; en enero de 1855 mueren 3,168 soldados del ejército en Oriente y su tabla da 1,174 por cada 1,000 al año
   (Cohen, 1984); la Comisión Real se forma en mayo de 1857 y William Farr la guía con los datos.
   Prueba de spoiler: la intro no dice de qué murieron (enfermedad contra heridas), no muestra la rosa, no explica qué mide
   el 1,174 ni nombra herramientas. Caso con muertes reales: sin heridos ni enfermos a la vista, sin sonido ni destello en
   las cifras de muertes. Dirección de arte: cielo tramado, capas con parallax, enfermera de 6 cuadros con sombra y reposo,
   la lámpara como única fuente de luz con penumbra, marcos de HUD para las cifras y golpes con anticipación. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  /* tramado ordenado 4 x 4 entre dos tonos: un <pattern> por nivel, un nodo por franja */
  function tramado(id, a, b, nivel) {
    var s = '<pattern id="' + id + '" width="4" height="4" patternUnits="userSpaceOnUse">' + R(0, 0, 4, 4, a);
    for (var k = 0; k < 16; k++) if (BAYER[k] / 16 < nivel) s += R(k % 4, Math.floor(k / 4), 1, 1, b);
    return s + '</pattern>';
  }
  function cielo(pre, y0, y1, a, b) {
    var s = '<defs>', n = 5, h = (y1 - y0) / n;
    for (var i = 0; i < n; i++) s += tramado(pre + i, a, b, (i + 0.5) / n);
    s += '</defs>';
    for (i = 0; i < n; i++) s += R(-40, y0 + Math.round(i * h), 240, Math.ceil(h) + 1, 'url(#' + pre + i + ')');
    return s;
  }
  /* marco de HUD con bisel (luz arriba a la izquierda), remaches y cartucho */
  function marco(x, y, w, h, cartucho) {
    var s = R(x, y, w, h, 'var(--tq-panel)') + R(x, y, w, 1, 'var(--tq-piedra)') + R(x, y, 1, h, 'var(--tq-piedra)') +
      R(x, y + h - 1, w, 1, 'var(--tq-sombra)') + R(x + w - 1, y, 1, h, 'var(--tq-sombra)');
    [[x + 2, y + 2], [x + w - 3, y + 2], [x + 2, y + h - 3], [x + w - 3, y + h - 3]].forEach(function (p) { s += R(p[0], p[1], 1, 1, 'var(--tq-oro)'); });
    for (var yy = y + 3; yy < y + h - 2; yy += 2) s += R(x + 2, yy, w - 4, 1, 'var(--tq-tinta)', 'opacity=".5"');
    if (cartucho) s += R(x + 3, y - 4, cartucho.length * 3 + 6, 5, 'var(--tq-comal)') + T(x + 6, y - 0.6, cartucho, 3.6, 'var(--tq-comal-texto)', 'start');
    return s;
  }

  /* ---------- la enfermera: 16 x 28, por piezas, 6 cuadros de caminar ---------- */
  var PIE = [3, 4, 6, 8, 7, 5], PIE2 = [8, 7, 5, 3, 4, 6], BRAZO = [0, 1, 1, 0, -1, -1], BRAZOY = [0, 0, -1, 0, 0, -1], SUBE = [0, -1, 0, 0, -1, 0], VUELO = [0, 1, 0, 0, -1, 0];
  function cuadro(k) {
    var b = SUBE[k], s = '';
    s += R(PIE[k], 26, 3, 2, 'var(--tq-negro)') + R(PIE2[k], 26, 3, 2, 'var(--tq-cafe-oscuro)');           // pies
    s += R(2 + VUELO[k], 21 + b, 12, 5, 'var(--tq-traje)') + R(3, 17 + b, 10, 5, 'var(--tq-traje)');      // falda
    s += R(6, 11 + b, 4, 14, 'var(--tq-papel)') + R(6, 24 + b, 4, 1, 'var(--tq-papel-sombra)');            // delantal
    s += R(4, 9 + b, 8, 9, 'var(--tq-traje)') + R(4, 9 + b, 1, 8, 'var(--tq-gris)');                       // torso con luz a la izquierda
    s += R(3, 10 + b, 1, 7, 'var(--tq-gris)');                                                           // brazo de atrás
    s += R(7, 8 + b, 2, 1, 'var(--tq-piel)') + R(5, 3 + b, 6, 5, 'var(--tq-piel)') + R(10, 4 + b, 1, 4, 'var(--tq-rosa-oscuro)', 'opacity=".35"');
    s += R(4, 3 + b, 1, 3, 'var(--tq-cafe-oscuro)') + R(11, 3 + b, 1, 2, 'var(--tq-cafe-oscuro)');        // pelo
    s += R(5, 0 + b, 6, 2, 'var(--tq-papel)') + R(4, 2 + b, 8, 1, 'var(--tq-papel)');                     // cofia
    s += '<g data-ojos="1">' + R(7, 5 + b, 1, 1, 'var(--tq-tinta)') + R(9, 5 + b, 1, 1, 'var(--tq-tinta)') + '</g>';
    var lx = 12 + BRAZO[k], ly = 14 + BRAZOY[k] + b;
    s += R(11, 10 + b, 1, 5, 'var(--tq-traje)') + R(lx, ly - 1, 1, 1, 'var(--tq-oro)');                  // brazo con la lámpara
    s += R(lx - 1, ly, 3, 3, 'var(--tq-oro)') + R(lx, ly + 1, 1, 1, 'var(--tq-luz)');                     // lámpara
    return '<g data-f="' + k + '"' + (k ? ' visibility="hidden"' : '') + '>' + s + '</g>';
  }
  function enfermera(id, x, y) {
    var s = R(3, 28, 10, 1, 'var(--tq-sombra)', 'opacity=".55"') + R(5, 29, 6, 1, 'var(--tq-sombra)', 'opacity=".35"');
    for (var k = 0; k < 6; k++) s += cuadro(k);
    s += '<g data-id="' + id + '-exc" opacity="0">' + R(7, -9, 2, 5, 'var(--tq-comal)') + R(7, -3, 2, 2, 'var(--tq-comal)') + '</g>';
    return P.g(id, x, y, s);
  }
  function verCuadro(el, k) { [].forEach.call(el.querySelectorAll('[data-f]'), function (f) { f.setAttribute('visibility', +f.getAttribute('data-f') === k ? 'visible' : 'hidden'); }); }
  /* camina hasta x2 a 3 unidades por cuadro (los pies no patinan), frena y queda en reposo: respira y parpadea */
  function caminar(g, el, x2, fin) {
    var x = el._x, y = el._y, k = 0;
    if (g.reducir) { g.pos(el, x2, y); verCuadro(el, 0); if (fin) fin(); return; }
    var id = g.cada(110, function () {
      x += 3; k = (k + 1) % 6;
      if (x >= x2) { clearInterval(id); g.pos(el, x2, y); verCuadro(el, 3); g.espera(140, function () { verCuadro(el, 0); reposo(g, el); if (fin) fin(); }); return; }
      g.pos(el, x, y); verCuadro(el, k);
    });
  }
  function reposo(g, el) {
    if (g.reducir) return;
    var n = 0;
    g.cada(1000, function () {
      n++;
      verCuadro(el, n % 2 ? 1 : 0);                                       // respira: el cuerpo sube 1 unidad cada 2 s
      if (n % 4 === 3) {                                                  // parpadea cada 4 s
        [].forEach.call(el.querySelectorAll('[data-ojos]'), function (o) { o.setAttribute('opacity', 0); });
        g.espera(130, function () { [].forEach.call(el.querySelectorAll('[data-ojos]'), function (o) { o.setAttribute('opacity', 1); }); });
      }
    });
  }
  /* golpe sin destello ni sonido (cifras de un caso con muertes): anticipación, caída, aplastar, polvo y rebote */
  function golpe(g, el, fin) {
    var bb = el.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height, base = el.getAttribute('transform') || '';
    var tr = function (dy, sx, sy) { el.setAttribute('transform', base + ' translate(' + cx + ' ' + (cy + dy) + ') scale(' + sx.toFixed(3) + ' ' + sy.toFixed(3) + ') translate(' + (-cx) + ' ' + (-cy) + ')'); };
    var listo = function () { if (base) el.setAttribute('transform', base); else el.removeAttribute('transform'); el.setAttribute('opacity', 1); if (fin) fin(); };
    if (g.reducir) { listo(); return; }
    el.setAttribute('opacity', 1);
    g.anim(90, function (t) { tr(-3 * t, 1 - 0.12 * t, 1 - 0.12 * t); }, g.E.sal, function () {
      g.anim(120, function (t) { tr(-14 + 14 * t, 0.88 + 0.12 * t, 0.88 + 0.12 * t); }, g.E.ent, function () {
        g.chispas(cx, cy, { n: 10, color: 'var(--tq-papel-sombra)', v: 16, g: 6, vida: 420, ang: Math.PI, abre: Math.PI });
        g.sacudir();
        g.anim(160, function (t) { var k = Math.sin(t * Math.PI) * Math.pow(1 - t, 2); tr(0, 1 + 0.18 * k, 1 - 0.18 * k); }, g.E.lin, listo);
      });
    });
  }
  /* luz de la lámpara: velo de penumbra con un hueco escalonado que sigue a la lámpara y parpadea a pasos */
  function velo(pre) {
    var hueco = P.disco(0, 0, 34, 'var(--tq-gris)') + P.disco(0, 0, 25, 'var(--tq-pared)') + P.disco(0, 0, 17, 'var(--tq-negro)');
    return '<defs><mask id="' + pre + '" maskUnits="userSpaceOnUse" x="-60" y="-40" width="280" height="170">' +
      R(-60, -40, 280, 170, 'var(--tq-blanco)') + P.g(pre + '-hueco', 0, 0, '<g data-id="' + pre + '-esc">' + hueco + '</g>') + '</mask></defs>' +
      R(-60, -40, 280, 170, 'var(--tq-noche)', 'opacity=".7" mask="url(#' + pre + ')" style="mix-blend-mode:multiply" pointer-events="none"');
  }
  function parpadeo(g, esc) {
    if (g.reducir) return;
    var niv = [1, 1, 0.96, 1, 1, 0.92, 1, 0.98, 1, 1, 0.9, 1];
    g.cada(110, function (n) { if (Math.random() < 0.7) return; esc.setAttribute('transform', 'scale(' + niv[n % niv.length] + ')'); });
  }

  /* ---------- escena 1: Scutari de noche ---------- */
  function scutari() {
    var s = P.capa(0.25, cielo('c22-e1-c', -10, 50, 'var(--tq-noche)', 'var(--tq-ventana-noche)') +
      P.estrellas([[8, 6], [26, 12], [44, 4], [70, 9], [96, 5], [150, 11], [176, 6], [-12, 10]]) + P.luna(132, 12));
    var sil = '';                                                         // Constantinopla, lejana y en un solo tono
    [[6, 6], [24, 8], [44, 7], [66, 5]].forEach(function (d) {
      var x = d[0], r = d[1];
      sil += R(x - r, 44, 2 * r, 6, 'var(--tq-morado)') + R(x - r + 1, 42, 2 * r - 2, 2, 'var(--tq-morado)') + R(x - r + 3, 40, 2 * r - 6, 2, 'var(--tq-morado)') + R(x - 1, 38, 2, 2, 'var(--tq-morado)');
    });
    [-2, 16, 34, 56, 76].forEach(function (x) { sil += R(x, 30, 2, 20, 'var(--tq-morado)') + R(x - 1, 34, 4, 1, 'var(--tq-morado)') + R(x, 28, 2, 2, 'var(--tq-morado)'); });
    s += P.capa(0.5, sil + R(-30, 48, 140, 2, 'var(--tq-morado)'));
    var agua = R(-40, 50, 260, 14, 'var(--tq-ventana-noche)');
    for (var i = 0; i < 3; i++) agua += P.g('ola' + i, 0, 0, R(10 + i * 37, 53 + i * 3, 9, 1, 'var(--tq-vidrio)', 'opacity=".55"') + R(60 + i * 31, 55 + (i % 2) * 4, 6, 1, 'var(--tq-vidrio)', 'opacity=".4"') + R(-20 + i * 53, 58, 7, 1, 'var(--tq-vidrio)', 'opacity=".35"'));
    agua += P.g('barco', -30, 0, R(0, 52, 16, 3, 'var(--tq-cafe-oscuro)') + R(2, 55, 12, 1, 'var(--tq-cafe-oscuro)') + R(7, 40, 1, 12, 'var(--tq-papel-sombra)') + R(8, 41, 6, 8, 'var(--tq-papel-sombra)') + R(2, 43, 5, 6, 'var(--tq-papel-sombra)'));
    s += P.capa(0.8, agua);
    // el cuartel: tres pisos de ventanas, torres en las esquinas, luz arriba a la izquierda
    var h = R(-30, 64, 240, 30, 'var(--tq-suelo)') + R(-30, 64, 240, 1, 'var(--tq-piedra-oscura)', 'opacity=".6"');
    h += R(60, 30, 92, 36, 'var(--tq-piedra-oscura)') + R(60, 30, 92, 2, 'var(--tq-piedra)') + R(60, 30, 2, 36, 'var(--tq-piedra)') + R(150, 30, 2, 36, 'var(--tq-papel-sombra)');
    [[56, 20], [144, 20]].forEach(function (t) { h += R(t[0], t[1], 12, 46, 'var(--tq-piedra-oscura)') + R(t[0], t[1], 12, 2, 'var(--tq-piedra)') + R(t[0], t[1], 2, 46, 'var(--tq-piedra)') + R(t[0] + 1, t[1] - 4, 10, 4, 'var(--tq-gris)') + R(t[0] + 4, t[1] - 7, 4, 3, 'var(--tq-gris)'); });
    for (var f = 0; f < 3; f++) for (var c = 0; c < 10; c++) {
      var wx = 71 + c * 7.6, wy = 35 + f * 9;
      if (f === 2 && (c === 4 || c === 5)) continue;
      h += R(Math.round(wx), wy, 3, 4, 'var(--tq-ventana-noche)', 'data-v="' + (f * 10 + c) + '"');
    }
    h += P.hot('puerta', 'Tocar la puerta del hospital', 99, 52, 14, 15, R(101, 55, 10, 11, 'var(--tq-cafe-oscuro)') + R(101, 55, 10, 1, 'var(--tq-madera)') +
      P.g('luzpuerta', 0, 0, R(102, 56, 8, 10, 'var(--tq-luz)') + R(98, 66, 16, 2, 'var(--tq-luz)', 'opacity=".5"'), 'opacity="0"'));
    h += P.flecha(106, 49);
    s += P.capa(1, h);
    var cipres = function (x) { return R(x + 2, 26, 4, 64, 'var(--tq-anil-gris)') + R(x, 36, 8, 54, 'var(--tq-anil-gris)') + R(x + 1, 30, 6, 6, 'var(--tq-anil-gris)') + R(x, 36, 2, 54, 'var(--tq-gris)', 'opacity=".5"'); };
    s += P.capa(1.35, cipres(-6) + cipres(160));
    return s;
  }

  /* ---------- escena 2: la sala de noche ---------- */
  function sala() {
    var s = P.capa(0.5, R(-40, 0, 260, 66, 'var(--tq-morado)') + (function () {
      var a = ''; for (var x = -30; x < 200; x += 22) a += R(x, 14, 3, 52, 'var(--tq-pared)') + R(x, 12, 22, 3, 'var(--tq-pared)'); return a;
    })());
    var m = R(-40, 0, 260, 8, 'var(--tq-pared)');
    for (var x = -24; x < 200; x += 30) {
      m += R(x, 8, 6, 58, 'var(--tq-piedra-oscura)') + R(x, 8, 1, 58, 'var(--tq-piedra)') + R(x + 6, 8, 24, 4, 'var(--tq-piedra-oscura)');
      m += R(x + 12, 16, 8, 12, 'var(--tq-ventana-noche)') + R(x + 15, 16, 1, 12, 'var(--tq-pared)') + R(x + 13, 17, 2, 3, 'var(--tq-vidrio)', 'opacity=".5"');
    }
    s += P.capa(0.8, m);
    var piso = R(-40, 66, 260, 30, 'var(--tq-madera)') + R(-40, 66, 260, 1, 'var(--tq-madera-clara)');
    for (var y = 70; y < 92; y += 5) piso += R(-40, y, 260, 1, 'var(--tq-cafe)', 'opacity=".6"');
    for (x = -20; x < 190; x += 26) piso += R(x, 58, 18, 3, 'var(--tq-papel-sombra)') + R(x, 61, 1, 6, 'var(--tq-cafe-oscuro)') + R(x + 17, 61, 1, 6, 'var(--tq-cafe-oscuro)') + R(x, 57, 5, 2, 'var(--tq-papel)');
    s += P.capa(1, piso + enfermera('enf', -20, 37) + velo('c22-e2-m') +
      P.hot('lampara', 'Tocar la lámpara para alumbrar la sala', 60, 42, 24, 22, R(66, 49, 1, 1, 'var(--tq-oro)', 'opacity="0"')));
    s += P.capa(1.3, R(150, 0, 14, 90, 'var(--tq-pared)') + R(150, 0, 2, 90, 'var(--tq-piedra-oscura)'));
    return s;
  }

  /* ---------- escena 3: el registro ---------- */
  function registro() {
    var s = P.capa(0.6, R(-40, 0, 260, 62, 'var(--tq-pared)') + R(108, 8, 34, 26, 'var(--tq-noche)') + R(110, 10, 30, 22, 'var(--tq-ventana-noche)') + R(124, 10, 2, 22, 'var(--tq-noche)') + P.luna(132, 18));
    var mesa = R(-40, 60, 260, 32, 'var(--tq-madera)') + R(-40, 60, 260, 2, 'var(--tq-madera-clara)');
    for (var x = -30; x < 200; x += 18) mesa += R(x, 64, 1, 28, 'var(--tq-cafe)', 'opacity=".5"');
    mesa += R(32, 50, 2, 12, 'var(--tq-cafe-oscuro)') + R(26, 46, 14, 4, 'var(--tq-oro)') + R(28, 50, 10, 1, 'var(--tq-luz)');
    var libro = R(44, 46, 76, 18, 'var(--tq-cafe-oscuro)') + R(46, 44, 35, 18, 'var(--tq-papel)') + R(83, 44, 35, 18, 'var(--tq-papel)') + R(81, 44, 2, 18, 'var(--tq-papel-sombra)');
    for (var l = 0; l < 5; l++) libro += R(49, 47 + l * 3, 29, 1, 'var(--tq-papel-sombra)') + R(86, 47 + l * 3, 29, 1, 'var(--tq-papel-sombra)');
    libro += P.g('rayas', 0, 0, '');
    libro += P.g('hoja', 0, 0, R(83, 44, 35, 18, 'var(--tq-papel-pliegue)'), 'opacity="0"');
    mesa += P.hot('libro', 'Tocar el libro para abrirlo en enero de 1855', 42, 40, 80, 26, libro);
    mesa += P.flecha(82, 36);
    s += P.capa(1, mesa + velo('c22-e3-m'));
    s += P.g('hud', 0, 0, marco(104, 40, 44, 18, 'MES') + T(126, 49.5, 'OCT 1854', 3.8, 'var(--tq-crema)', 'middle', 'data-id="mes"') + T(126, 55.5, '', 4.2, 'var(--tq-comal)', 'middle', 'data-id="cuenta"'));
    return s;
  }

  /* ---------- escena 4: el número que no cabe ---------- */
  function cuenta() {
    var s = P.capa(0.6, R(-40, 0, 260, 64, 'var(--tq-pared)') + R(-40, 52, 260, 12, 'var(--tq-morado)', 'opacity=".5"'));
    var hoja = R(46, 14, 96, 50, 'var(--tq-papel)') + R(46, 62, 96, 2, 'var(--tq-papel-sombra)') + T(94, 22, 'ENERO DE 1855', 4, 'var(--tq-comal-texto)');
    [['TROPA', '32,393'], ['MUERTES', '3,168']].forEach(function (f, i) { hoja += T(54, 32 + i * 8, f[0], 3.6, 'var(--tq-comal-texto)', 'start') + T(104, 32 + i * 8, f[1], 3.6, 'var(--tq-comal-texto)', 'end'); });
    hoja += T(54, 50, 'POR CADA 1,000', 3.6, 'var(--tq-comal-texto)', 'start');
    hoja += P.hot('columna', 'Tocar la última columna de la tabla', 108, 26, 32, 30, R(110, 28, 28, 26, 'var(--tq-papel-pliegue)', 'data-id="fondo-col"') + T(124, 44, '?', 9, 'var(--tq-suadero)', 'middle', 'data-id="incognita"'));
    hoja += P.g('cifra', 0, 0, marco(108, 40, 32, 14, 'AL ANO') + T(124, 50, '1,174', 5.4, 'var(--tq-comal)'), 'opacity="0"');
    var piso = R(-40, 64, 260, 30, 'var(--tq-madera)') + R(-40, 64, 260, 1, 'var(--tq-madera-clara)');
    s += P.capa(1, piso + hoja + enfermera('fn', 26, 35) + P.flecha(124, 22));
    s += P.capa(1.3, R(-12, 0, 10, 90, 'var(--tq-pared)') + R(-4, 0, 2, 90, 'var(--tq-piedra-oscura)'));
    return s;
  }

  window.CASO = {
    id: '2.2',
    transiciones: { 1: 'puerta', 2: 'mosaico', 3: 'barrido', 4: 'titulo' }, /* cómo se entra a cada escena (motor.js, TRANS) */
    titulo: '1,174 DE CADA 1,000',
    volver: '../../index.html',
    resolver: 'caso.html',
    duracionIntro: '~1 min',
    duracionCaso: '~40 min',
    medios: 'medios.json',
    herramientasOcultas: 3,
    aviso: 'El caso trata sobre muertes reales de soldados en la guerra de Crimea. No mostramos heridos ni enfermos.',
    despues: ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de abrir la tabla.', 'Firmas tu decisión antes de saber qué pasó.'],
    fuentes: [
      { t: 'Cohen, I. B. (1984). Florence Nightingale. Scientific American 250(3)', u: 'https://www.nielsen.sites.oasis.unc.edu/soci708/cdocs/cohen.html',
        n: 'La llegada a Scutari con 38 enfermeras, las 3,168 muertes de enero de 1855 y la tasa de 1,174 por cada 1,000 al año.' },
      { t: 'Nightingale, F. (1858). Notes on Matters Affecting the Health… of the British Army (Wellcome Collection)', u: 'https://wellcomecollection.org/works/jxwtskzc',
        n: 'La tabla mensual del ejército en Oriente, de abril de 1854 a marzo de 1856.' }
    ],
    escenas: [
      { alt: 'De noche, al otro lado del agua, las cúpulas y minaretes de Constantinopla. En la orilla, un cuartel enorme con torres en las esquinas y tres pisos de ventanas. Al tocar la puerta, se abre con luz.',
        interactiva: true,
        camara: { x: 0, y: 0, w: 160 },
        arte: scutari,
        montar: function (g) {
          var visto = false, barco = g.q('barco');
          g.mover(barco, 150, 0, g.reducir ? 0 : 16000, g.E.lin);
          var olas = [0, 1, 2].map(function (i) { return g.q('ola' + i); });
          g.cada(600, function (n) { olas.forEach(function (o, i) { g.op(o, (n + i) % 3 ? 1 : 0.3); }); });
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.aparecer(g.q('luzpuerta'), 400);
            g.decir('La puerta se abre. Adentro, las salas siguen de noche.');
            g.listo();
          });
        },
        lineas: [
          { t: 'Scutari, frente a Constantinopla, noviembre de 1854.', al: function (g) { g.portada('1854', 'SCUTARI', function () { g.archivo('hospital-scutari', { lado: 'izq', ms: 4200 }); }); } },
          { t: 'Un cuartel enorme es ahora el hospital del ejército británico.', al: function (g) {
            g.camara(40, 14, 112, 2600, g.E.sua);
            var vs = g.qa('[data-v]');
            vs.forEach(function (v, i) { g.espera(500 + i * 70, function () { v.setAttribute('fill', 'var(--tq-ventana)'); }); });
          } },
          { t: 'Toca la puerta del hospital.', al: function (g) { g.sfx('pop'); } }
        ] },
      { alt: 'Una sala larga del hospital, de noche, con camas vacías junto a la pared. Una enfermera con cofia y delantal entra caminando con una lámpara; al tocar la lámpara, su luz alumbra la sala.',
        interactiva: true,
        camara: { x: 16, y: 18, w: 96 },
        arte: sala,
        montar: function (g) {
          var enf = g.q('enf'), hueco = g.q('c22-e2-m-hueco'), esc = g.q('c22-e2-m-esc'), visto = false;
          g.pos(hueco, 2, 51);
          parpadeo(g, esc);
          g.cada(60, function () { g.pos(hueco, enf._x + 13, enf._y + 15); });
          caminar(g, enf, 52, function () { g.pos(hueco, 65, 52); });
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.anim(900, function (t) { esc.setAttribute('transform', 'scale(' + (1 + 1.6 * t).toFixed(3) + ')'); }, g.E.sal);
            g.camara(0, 0, 160, 1400, g.E.sua);
            g.decir('La luz no alcanza el fondo: la sala sigue y sigue.');
            g.listo();
          });
        },
        lineas: [
          { t: 'El 5 de noviembre llegan Florence Nightingale y 38 enfermeras.', al: function () {} },
          { t: 'Toca la lámpara para alumbrar la sala.', al: function (g) { g.sfx('pop'); } }
        ] },
      { alt: 'Un escritorio de noche con un libro de registro abierto y una lámpara. Al tocar el libro, sus hojas pasan hasta enero de 1855 y un marcador cuenta 3,168 muertes.',
        interactiva: true,
        camara: { x: 20, y: 20, w: 128 },
        arte: registro,
        montar: function (g) {
          var hueco = g.q('c22-e3-m-hueco'), esc = g.q('c22-e3-m-esc'), mes = g.q('mes'), cuentaEl = g.q('cuenta'), hoja = g.q('hoja'), rayas = g.q('rayas'), visto = false;
          g.pos(hueco, 33, 49); esc.setAttribute('transform', 'scale(2.6)');
          parpadeo(g, esc);
          function pasar(fin) { g.op(hoja, 1); g.anim(260, function (t) { hoja.setAttribute('transform', 'translate(' + (83 * t * 0.6).toFixed(1) + ' 0) scale(' + (1 - 0.6 * t).toFixed(3) + ' 1)'); }, g.E.ent, function () { g.op(hoja, 0); hoja.removeAttribute('transform'); if (fin) fin(); }); }
          var meses = ['OCT 1854', 'NOV 1854', 'DIC 1854'], i = 0, ns = 'http://www.w3.org/2000/svg';
          g.cada(900, function () {
            if (visto || i >= meses.length) return;
            mes.textContent = meses[i++]; pasar();
            for (var r = 0; r < 6; r++) { var e = document.createElementNS(ns, 'rect'); e.setAttribute('x', 49 + ((i * 6 + r) % 28)); e.setAttribute('y', 47 + 3 * ((i + r) % 5)); e.setAttribute('width', 1); e.setAttribute('height', 2); e.setAttribute('fill', 'var(--tq-tinta)'); rayas.appendChild(e); }
          });
          g.enTocar(function () {
            if (visto) return; visto = true;
            pasar(function () {
              mes.textContent = 'ENE 1855';
              g.contar(cuentaEl, 0, 3168, g.reducir ? 0 : 1600, function (v) { return v.toLocaleString('en-US'); }, g.E.sal);
            });
            g.decir('Enero de 1855: mueren 3,168 soldados en todo el ejército en Oriente.');
            g.listo();
          });
        },
        lineas: [
          { t: 'Ese invierno, el registro del ejército se llena mes tras mes.', al: function () {} },
          { t: 'Toca el libro para abrirlo en enero de 1855.', al: function (g) { g.sfx('pop'); } }
        ] },
      { alt: 'Después de la guerra, Florence Nightingale junto a una hoja grande con la tabla de enero de 1855: tropa 32,393 y muertes 3,168. Al tocar la última columna aparece 1,174 por cada 1,000, al año.',
        interactiva: true,
        camara: { x: 0, y: 6, w: 144 },
        arte: cuenta,
        montar: function (g) {
          var visto = false, fn = g.q('fn'), cifra = g.q('cifra'), inc = g.q('incognita'), exc = g.q('fn-exc');
          reposo(g, fn);
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.op(inc, 0); g.op(g.q('fondo-col'), 0);
            golpe(g, cifra, function () {
              g.op(exc, 1); g.pop(exc, 300);
              g.decir('1,174 muertes por cada 1,000 soldados, al año. ¿Más de las que caben en el ejército?');
              g.listo();
            });
          });
        },
        lineas: [
          { t: 'Después de la guerra, Nightingale saca la cuenta de enero.', al: function (g) { g.camara(16, 4, 128, 2400, g.E.sua); } },
          { t: 'Toca la última columna de su tabla.', al: function (g) { g.sfx('pop'); } }
        ] },
      C.final({
        codigo: '2.2',
        lineas: ['1857: una comisión investiga por qué murieron tantos.', 'Nightingale y William Farr ordenan los números.', '¿Qué mide en realidad ese 1,174?']
      })
    ]
  };
})();
