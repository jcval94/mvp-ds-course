/* Intro del curso: «Alguien tuvo que decidir».
   Una sola toma. Hay cinco niveles anidados (1943, 1936, 1983, 2017 y hoy): cada uno es una hoja dentro del siguiente,
   a un cuarto de su tamaño. La cámara empieza dentro del más pequeño y se aleja. Todo lo que se ve es función del
   tiempo t (en segundos): por eso pausar, saltar y repetir no dejan estados a medias.
   Sin dependencias y sin colores literales: las tintas son clases .k-* de intro.css (tokens --tq-*). */
(function () {
  'use strict';
  var W = 120, H = 90, ESC = 0.25, FIN = 40;
  /* Dónde vive, dentro de cada nivel, la hoja del nivel anterior. */
  var HUECO = [null, { x: 82, y: 10 }, { x: 8, y: 58 }, { x: 80, y: 56 }, { x: 10, y: 40 }];

  var mundo = document.getElementById('mundo');
  if (!mundo) return;
  var $ = function (id) { return document.getElementById(id); };
  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- dibujo ---------- */
  function R(x, y, w, h, k, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" class="k-' + k + '"' + (extra ? ' ' + extra : '') + '/>'; }
  function T(x, y, tam, k, texto, extra) { return '<text x="' + x + '" y="' + y + '" font-size="' + tam + '" class="k-' + k + '"' + (extra ? ' ' + extra : '') + '>' + texto + '</text>'; }
  function G(id, contenido, extra) { return '<g id="' + id + '"' + (extra ? ' ' + extra : '') + '>' + contenido + '</g>'; }
  /* La hoja del nivel anterior, sujeta con un clip. */
  function hoja(n, dentro) {
    var h = HUECO[n];
    return R(h.x - 1, h.y - 1, W * ESC + 2, H * ESC + 2, 'papel-sombra') +
      '<g transform="translate(' + h.x + ',' + h.y + ') scale(' + ESC + ')" clip-path="url(#marco)">' + dentro + '</g>' +
      R(h.x + 4, h.y - 3.4, 0.7, 3, 'gris') + R(h.x + 5.5, h.y - 3.4, 0.7, 3, 'gris') + R(h.x + 4, h.y - 3.4, 2.2, 0.7, 'gris');
  }
  function papel(fondo) { return R(0, 0, W, H, fondo) + R(8, 6, 108, 82, 'sombra', 'opacity=".35"') + R(6, 4, 108, 82, 'papel'); }

  /* 1943 · el bombardero visto desde arriba */
  var AGUJEROS = [[26, 40], [31, 43], [38, 41], [47, 44], [52, 39], [69, 43], [77, 40], [84, 44], [91, 41], [95, 43],
    [58, 48], [61, 53], [58, 58], [61, 63], [50, 69], [57, 70], [64, 69], [70, 70], [59, 30], [34, 38], [88, 38]];
  function nivel0() {
    var s = R(0, 0, W, H, 'cielo') + R(0, 60, W, 30, 'cielo-bajo');
    var nubes = '';
    [[10, 12, 16], [92, 30, 20], [24, 70, 14], [70, 80, 18], [100, 62, 12], [44, 22, 10]].forEach(function (n) { nubes += R(n[0], n[1], n[2], 2, 'vacio') + R(n[0] + 2, n[1] - 1, n[2] - 5, 1, 'vacio'); });
    s += G('n0nubes', nubes + '<g transform="translate(0,-90)">' + nubes + '</g>');
    var av = R(57, 18, 6, 56, 'piedra') + R(58, 16, 4, 2, 'piedra') + R(58, 20, 4, 4, 'vidrio') +
      R(30, 36, 60, 2, 'piedra-oscura') + R(22, 38, 76, 8, 'piedra') + R(22, 45, 76, 1, 'piedra-oscura') +
      R(46, 68, 28, 4, 'piedra') + R(46, 71, 28, 1, 'piedra-oscura') + R(59, 66, 2, 9, 'piedra-oscura');
    [36, 45, 71, 80].forEach(function (x) { av += R(x, 31, 4, 7, 'piedra-oscura') + R(x - 1, 30, 6, 1, 'crema', 'opacity=".5"'); });
    var ag = '';
    AGUJEROS.forEach(function (a, i) { ag += R(a[0], a[1], 2, 2, 'salsa', 'id="ag' + i + '"'); });
    s += G('n0avion', av + ag);
    s += G('n0ano', T(60, 12, 8, 'crema', '1943', 'text-anchor="middle"'));
    return s;
  }
  /* 1936 · las boletas */
  function nivel1(dentro) {
    var s = papel('madera') + T(13, 19, 8, 'comal-texto', '1936') + T(13, 26, 2.6, 'papel-sombra', 'BOLETAS DEVUELTAS');
    s += T(13, 37, 2.6, 'comal-texto', 'LANDON') + R(13, 39, 60, 6, 'papel-pliegue') + R(13, 39, 0, 6, 'salsa', 'id="n1a"');
    s += T(13, 51, 2.6, 'comal-texto', 'ROOSEVELT') + R(13, 53, 60, 6, 'papel-pliegue') + R(13, 53, 0, 6, 'anil', 'id="n1b"');
    var b = '';
    for (var i = 0; i < 12; i++) {
      var x = 14 + (i * 17) % 52, y = 78 - (i % 4) * 2.5;
      b += '<g id="bo' + i + '" data-x="' + x + '" data-y="' + y + '">' + R(0, 0, 9, 5, 'papel-sombra') + R(0.5, 0.5, 8, 4, 'crema') + R(2, 2, 5, 0.6, 'papel-sombra') + '</g>';
    }
    return s + hoja(1, dentro) + b;
  }
  /* 1983 · la hoja de carga */
  function nivel2(dentro) {
    var s = papel('tinta') + T(13, 19, 8, 'comal-texto', '1983') + T(13, 26, 2.6, 'papel-sombra', 'HOJA DE CARGA');
    s += R(74, 13, 30, 5, 'piedra-oscura') + R(104, 14, 3, 3, 'piedra-oscura') + R(72, 8, 4, 6, 'piedra-oscura') + R(84, 18, 12, 2, 'papel-sombra') + R(100, 14, 3, 2, 'vidrio');
    [0, 1, 2].forEach(function (i) {
      var y = 33 + i * 8;
      s += R(13, y, 34 + i * 6, 2, 'papel-sombra') + R(13, y + 3, 20 + i * 4, 1, 'papel-pliegue') + R(84, y - 1, 20, 5, 'papel-pliegue') +
        G('ok' + i, R(106, y - 1, 5, 5, 'anil') + R(107, y + 1, 1, 2, 'crema') + R(108, y + 2, 1, 1, 'crema') + R(109, y, 1, 2, 'crema'));
    });
    s += T(46, 63, 2.6, 'comal-texto', 'COMBUSTIBLE') + R(46, 65, 64, 10, 'gris') + R(47, 66, 62, 8, 'papel-pliegue') + R(47, 66, 0, 8, 'comal', 'id="n2c"');
    return s + hoja(2, dentro);
  }
  /* 2017 · el registro */
  function nivel3(dentro) {
    var s = papel('cafe-oscuro') + T(13, 19, 8, 'comal-texto', '2017') + T(13, 26, 2.6, 'papel-sombra', 'REGISTRO');
    for (var i = 0; i < 12; i++) s += G('mes' + i, R(13 + (i % 4) * 13, 31 + Math.floor(i / 4) * 8, 11, 6, 'papel-pliegue') + R(14 + (i % 4) * 13, 35, 9 - (i % 3) * 2, 1, 'papel-sombra', 'transform="translate(0,' + Math.floor(i / 4) * 8 + ')"'));
    s += G('n3nota', R(71, 13, 38, 30, 'papel-sombra') + R(70, 12, 38, 30, 'manila-clara') + T(89, 20, 2.4, 'comal-texto', 'CIFRA OFICIAL', 'text-anchor="middle"') + T(89, 37, 13, 'comal-texto', '64', 'text-anchor="middle"'));
    return s + hoja(3, dentro);
  }
  /* Hoy · el escritorio y el asistente */
  function nivel4(dentro) {
    var s = R(0, 0, W, H, 'noche');
    [[8, 8], [20, 20], [34, 6], [108, 10], [112, 30], [4, 30]].forEach(function (e) { s += R(e[0], e[1], 1, 1, 'gris'); });
    s += R(0, 66, W, 24, 'madera') + R(0, 66, W, 1.5, 'cafe');
    s += R(70, 58, 8, 8, 'gris') + R(60, 65, 28, 3, 'gris') + R(46, 10, 56, 48, 'traje') + R(49, 13, 50, 42, 'sombra') + R(49, 13, 50, 42, 'ventana-noche', 'id="n4luz" opacity="0"');
    var lineas = '';
    [30, 34, 26, 32, 20].forEach(function (w, i) { lineas += R(57, 26 + i * 4.4, 0, 1.6, 'papel-sombra', 'id="tx' + i + '" data-w="' + w + '"'); });
    s += G('n4tarjeta', R(54, 17, 40, 34, 'papel') + T(57, 23, 2.6, 'comal-texto', 'RESUMEN') + lineas, 'opacity="0"');
    s += G('n4borrador', '<g transform="rotate(-8)">' + R(-15, -4, 30, 8, 'salsa') + R(-14, -3, 28, 6, 'papel') + T(0, 1.4, 3, 'salsa', 'BORRADOR', 'text-anchor="middle"') + '</g>');
    s += R(6, 37, 38, 30, 'cafe-oscuro', 'opacity=".5"') + R(5, 36, 38, 30, 'manila') + R(5, 34, 14, 3, 'manila');
    s += hoja(4, dentro);
    s += G('n4sello', '<g transform="rotate(-10)">' + R(-17, -4.5, 34, 9, 'salsa') + R(-16, -3.5, 32, 7, 'manila-clara') + T(0, 1.2, 2.5, 'salsa', 'SIN RESOLVER', 'text-anchor="middle"') + '</g>');
    return s;
  }
  /* Cada hoja recorta lo que dibuja: nubes y boletas que entran desde fuera no se salen de su marco. */
  mundo.insertAdjacentHTML('beforeend', '<defs><clipPath id="marco"><rect x="0" y="0" width="' + W + '" height="' + H + '"/></clipPath></defs>' + nivel4(nivel3(nivel2(nivel1(nivel0())))));

  /* ---------- cámara ---------- */
  var caja = [];                                   /* rectángulo de cada nivel en coordenadas del mundo (nivel 4) */
  caja[4] = { x: 0, y: 0, w: W };
  for (var n = 3; n >= 0; n--) { var e = caja[n + 1].w / W; caja[n] = { x: caja[n + 1].x + HUECO[n + 1].x * e, y: caja[n + 1].y + HUECO[n + 1].y * e, w: caja[n + 1].w * ESC }; }
  function vista(nivel, f) { var c = caja[nivel], w = c.w * f, h = w * H / W; return { cx: c.x + c.w / 2, cy: c.y + c.w * H / W / 2, w: w, h: h }; }
  var CLAVES = [[0, 0, 1], [4.4, 0, 0.82], [5.4, 0, 0.82], [7.0, 1, 0.9], [11.6, 1, 1], [13.0, 2, 0.9], [17.6, 2, 1], [19.0, 3, 0.9], [23.6, 3, 1], [25.8, 4, 0.9], [36, 4, 1], [FIN, 4, 1]];
  function sua(u) { return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
  function camara(t) {
    var i = 0; while (i < CLAVES.length - 2 && t >= CLAVES[i + 1][0]) i++;
    var a = CLAVES[i], b = CLAVES[i + 1], u = Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0])));
    var va = vista(a[1], a[2]), vb = vista(b[1], b[2]);
    u = a[1] === b[1] ? u * (2 - u) : sua(u);
    var w = va.w * Math.pow(vb.w / va.w, u);        /* el zoom avanza en proporción, no en unidades: se siente parejo */
    var k = Math.abs(vb.w - va.w) < 1e-9 ? u : (w - va.w) / (vb.w - va.w);
    var cx = va.cx + (vb.cx - va.cx) * k, cy = va.cy + (vb.cy - va.cy) * k, h = w * H / W;
    /* el golpe del sello sacude un instante */
    var g = golpe(t, 31) + golpe(t, 36.4);
    cx += Math.sin(t * 90) * g * w * 0.012; cy += Math.cos(t * 70) * g * w * 0.012;
    mundo.setAttribute('viewBox', (cx - w / 2) + ' ' + (cy - h / 2) + ' ' + w + ' ' + h);
  }
  function golpe(t, t0) { return t >= t0 && t < t0 + 0.35 ? 1 - (t - t0) / 0.35 : 0; }

  /* ---------- lo que pasa en cada nivel, como función de t ---------- */
  function p(t, a, b) { return Math.max(0, Math.min(1, (t - a) / (b - a))); }
  function rebote(u) { return u <= 0 ? 0 : u >= 1 ? 1 : 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2); }
  function salto(el, cx, cy, s) { el.setAttribute('transform', 'translate(' + cx + ',' + cy + ') scale(' + s + ') translate(' + (-cx) + ',' + (-cy) + ')'); el.setAttribute('opacity', s > 0.01 ? 1 : 0); }
  var q = {};
  ['n0nubes', 'n0avion', 'n0ano', 'n1a', 'n1b', 'n2c', 'n3nota', 'n4luz', 'n4tarjeta', 'n4borrador', 'n4sello'].forEach(function (id) { q[id] = $(id); });
  var ag = AGUJEROS.map(function (_, i) { return $('ag' + i); });
  var bo = []; for (var i = 0; i < 12; i++) bo.push($('bo' + i));
  var ok = [0, 1, 2].map(function (i) { return $('ok' + i); });
  var mes = []; for (i = 0; i < 12; i++) mes.push($('mes' + i));
  var tx = [0, 1, 2, 3, 4].map(function (i) { return $('tx' + i); });

  function pintar(t) {
    camara(t);
    $('velo').style.opacity = 1 - p(t, 0, 0.7);
    /* 1943 */
    q.n0nubes.setAttribute('transform', 'translate(0,' + ((t * 9) % 90) + ')');
    q.n0avion.setAttribute('transform', 'translate(0,' + (Math.sin(t * 1.6) * 0.8).toFixed(2) + ')');
    salto(q.n0ano, 60, 9, rebote(p(t, 0.5, 1.0))); if (t > 1) q.n0ano.setAttribute('opacity', 1 - p(t, 2.6, 3.2));
    ag.forEach(function (el, i) { var a = AGUJEROS[i]; salto(el, a[0] + 1, a[1] + 1, rebote(p(t, 1.2 + i * 0.17, 1.45 + i * 0.17))); });
    /* 1936 */
    q.n1a.setAttribute('width', 57 * 0.6 * sua(p(t, 8.2, 9.6)) * (60 / 36));
    q.n1b.setAttribute('width', 43 * 0.6 * sua(p(t, 8.5, 9.9)) * (60 / 36));
    bo.forEach(function (el, i) {
      var u = p(t, 7.3 + i * 0.22, 7.9 + i * 0.22), x = +el.dataset.x, y = +el.dataset.y;
      el.setAttribute('transform', 'translate(' + x + ',' + (y - (1 - u * u) * 95) + ') rotate(' + ((i % 3) - 1) * 6 * (1 - u) + ')');
    });
    /* 1983 */
    ok.forEach(function (el, i) { salto(el, 108.5, 34.5 + i * 8, rebote(p(t, 13.9 + i * 0.55, 14.2 + i * 0.55))); });
    q.n2c.setAttribute('width', 62 * sua(p(t, 14.4, 16.6)));
    /* 2017 */
    mes.forEach(function (el, i) { el.setAttribute('opacity', p(t, 19.6 + i * 0.12, 19.8 + i * 0.12)); });
    salto(q.n3nota, 89, 27, rebote(p(t, 21.2, 21.6)));
    /* hoy */
    q.n4luz.setAttribute('opacity', p(t, 26.4, 26.9) * (0.85 + 0.15 * Math.sin(t * 5)));
    q.n4tarjeta.setAttribute('opacity', p(t, 27.0, 27.4));
    tx.forEach(function (el, i) { el.setAttribute('width', +el.dataset.w * p(t, 27.5 + i * 0.5, 27.9 + i * 0.5)); });
    var s = p(t, 30.8, 31), z = 1 + (1 - s) * 2.2;
    q.n4borrador.setAttribute('transform', 'translate(78,42) scale(' + z + ')'); q.n4borrador.setAttribute('opacity', s);
    s = p(t, 36.2, 36.4); z = 1 + (1 - s) * 2.2;
    q.n4sello.setAttribute('transform', 'translate(25,52) scale(' + z + ')'); q.n4sello.setAttribute('opacity', s);
    $('avance').style.width = (100 * Math.min(1, t / FIN)) + '%';
  }

  /* ---------- narración ---------- */
  var LINEAS = [
    [0.5, '1943', 'Los aviones vuelven con agujeros.'],
    [3.0, '1943', 'Hay blindaje para pocas zonas. <b>¿Dónde lo pones?</b>'],
    [7.2, '1936', 'Más de dos millones de boletas dan un ganador.'],
    [9.9, '1936', 'Más de dos millones de boletas dan un ganador. <b>¿Les crees?</b>'],
    [13.2, '1983', 'Las cuentas de la hoja de carga cuadran.'],
    [16.0, '1983', 'Las cuentas de la hoja de carga cuadran. <b>¿Con eso despegas?</b>'],
    [19.2, '2017', 'Tras el huracán María, la cifra oficial de muertes es 64.'],
    [21.9, '2017', 'Tras el huracán María, la cifra oficial de muertes es 64. <b>¿Te alcanza ese número?</b>'],
    [26.4, 'HOY', 'La respuesta te llega en segundos.'],
    [31.2, 'HOY', 'La respuesta te llega en segundos. <b>¿Quién la revisa?</b>'],
    [36.4, 'HOY', 'Alguien tiene que decidir. <b>Falta tu firma.</b>']];
  var lineaActual = -2;
  function narrar(t) {
    var i = -1; LINEAS.forEach(function (l, k) { if (t >= l[0]) i = k; });
    if (i === lineaActual) return;
    lineaActual = i;
    $('linea').innerHTML = i < 0 ? '' : '<span class="ano">' + LINEAS[i][1] + '</span>' + LINEAS[i][2];
  }

  /* ---------- sonido (apagado hasta que la persona lo pide) ---------- */
  var audio = null, conSonido = false;
  var NOTAS = [[1.2, 520, 0.05], [5.6, 110, 0.9, 220], [11.6, 123, 0.9, 247], [17.6, 139, 0.9, 277], [23.6, 156, 1.4, 311], [31, 70, 0.25], [36.4, 60, 0.3], [38, 392, 0.5]];
  function tono(f, d, hasta) {
    if (!conSonido || !audio) return;
    var o = audio.createOscillator(), g = audio.createGain(), a = audio.currentTime;
    o.type = 'square'; o.frequency.setValueAtTime(f, a); if (hasta) o.frequency.exponentialRampToValueAtTime(hasta, a + d);
    g.gain.setValueAtTime(0.05, a); g.gain.exponentialRampToValueAtTime(0.001, a + d);
    o.connect(g); g.connect(audio.destination); o.start(a); o.stop(a + d);
  }

  /* ---------- reloj y controles ---------- */
  var t = 0, antes = 0, corriendo = false, cuadro = 0;
  function mostrarCierre(si) { $('cierre').hidden = !si; $('pausa').disabled = si; $('saltar').disabled = si; }
  function paso(ahora) {
    cuadro = 0;
    if (!corriendo) return;
    var dt = Math.min(0.1, (ahora - antes) / 1000), previo = t; antes = ahora; t = Math.min(FIN, t + dt);
    NOTAS.forEach(function (nt) { if (previo < nt[0] && t >= nt[0]) tono(nt[1], nt[2], nt[3]); });
    pintar(t); narrar(t);
    if (t >= 38.6 && $('cierre').hidden) mostrarCierre(true);
    if (t >= FIN) { corriendo = false; return; }
    cuadro = requestAnimationFrame(paso);
  }
  function correr() { if (corriendo) return; corriendo = true; antes = performance.now(); if (!cuadro) cuadro = requestAnimationFrame(paso); }
  function ir(a) { t = a; pintar(t); narrar(t); mostrarCierre(t >= 38.6); }

  $('pausa').addEventListener('click', function () {
    var pausar = corriendo; corriendo = !pausar; this.textContent = pausar ? 'Seguir' : 'Pausa'; this.setAttribute('aria-pressed', pausar ? 'true' : 'false');
    if (!pausar) { corriendo = false; correr(); }
  });
  $('sonido').addEventListener('click', function () {
    conSonido = !conSonido; this.textContent = 'Sonido: ' + (conSonido ? 'sí' : 'no'); this.setAttribute('aria-pressed', conSonido ? 'true' : 'false');
    if (conSonido && !audio) { var A = window.AudioContext || window.webkitAudioContext; if (A) audio = new A(); }
    if (audio && audio.state === 'suspended') audio.resume();
  });
  $('saltar').addEventListener('click', function () { corriendo = false; ir(FIN); $('cierre').querySelector('a').focus(); });
  $('repetir').addEventListener('click', function () {
    $('pausa').textContent = 'Pausa'; $('pausa').setAttribute('aria-pressed', 'false'); corriendo = false; ir(0); correr();
  });

  /* Para pruebas: llevar la intro a un segundo exacto. */
  window.__introCurso = { ir: function (a) { corriendo = false; ir(a); }, fin: FIN, t: function () { return t; } };

  if (reducir) {                                   /* sin movimiento: el cuadro final y el guion completo a la vista */
    ir(FIN); $('guion').hidden = false; $('linea').hidden = true; $('repetir').hidden = true;
    $('pausa').hidden = true; $('saltar').hidden = true; $('sonido').hidden = true;
  } else { ir(0); correr(); }
})();
