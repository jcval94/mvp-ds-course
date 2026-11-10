/* Intro del curso: «Alguien tuvo que decidir».
   Miles de puntos de luz (cada punto, un dato) se reorganizan para formar cada decisión: un bombardero con agujeros,
   las barras de una encuesta, un medidor lleno, el número 64, una palomita que se vuelve signo de interrogación y una firma.
   Entre una forma y la siguiente los puntos estallan, giran y vuelven a caer en su lugar.
   Sin dependencias. Los colores se leen de los tokens del sitio (no hay colores escritos aquí). */
(function () {
  'use strict';
  var lienzo = document.getElementById('lienzo');
  if (!lienzo || !lienzo.getContext) return;
  var ctx = lienzo.getContext('2d');
  var $ = function (id) { return document.getElementById(id); };
  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FIN = 35, T_CIERRE = 31.6;

  /* ---------- tintas (desde design/tokens) ---------- */
  var estilo = getComputedStyle(document.documentElement);
  function tinta(nombre) {
    var v = estilo.getPropertyValue(nombre).trim().replace('#', '');
    if (v.length === 3) v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
    var n = parseInt(v, 16);
    return isFinite(n) && v.length === 6 ? [n >> 16 & 255, n >> 8 & 255, n & 255] : [255, 255, 255];
  }
  var COL = { base: tinta('--hero-text'), acento: tinta('--accent'), alerta: tinta('--critical'), frio: tinta('--tq-vidrio'), fondo: tinta('--hero') };
  function rgb(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a + ')'; }

  /* ---------- azar repetible: la intro se ve igual cada vez ---------- */
  var semilla = 20270108;
  function azar() { semilla = (semilla * 1664525 + 1013904223) >>> 0; return semilla / 4294967296; }

  /* ---------- formas: se dibujan en un cuadro de 200 x 200 y se convierten en puntos ---------- */
  var U = 200, taller = document.createElement('canvas'); taller.width = taller.height = U;
  var tc = taller.getContext('2d', { willReadFrequently: true });
  var FUENTE = '800 %px "Plus Jakarta Sans", "Segoe UI", Arial, sans-serif';
  function muestrear(dibujar) {                    /* devuelve los pixeles pintados como lista de [x, y] */
    tc.clearRect(0, 0, U, U); tc.fillStyle = tc.strokeStyle = rgb([255, 255, 255], 1); tc.lineCap = 'round'; tc.lineJoin = 'round';
    dibujar(tc);
    var d = tc.getImageData(0, 0, U, U).data, pts = [];
    for (var y = 0; y < U; y++) for (var x = 0; x < U; x++) if (d[(y * U + x) * 4 + 3] > 120) pts.push([x, y]);
    return pts;
  }
  function avion(c) {
    function r(x, y, w, h) { c.fillRect(100 + (x - 60) * 2.1, 100 + (y - 46) * 2.1, w * 2.1, h * 2.1); }
    r(57, 16, 6, 58); r(22, 37, 76, 9); r(30, 35, 60, 2); r(46, 67, 28, 5); [36, 45, 71, 80].forEach(function (x) { r(x, 30, 4, 7); });
  }
  var AGUJEROS = [[26, 40], [31, 43], [38, 41], [47, 44], [52, 39], [69, 43], [77, 40], [84, 44], [91, 41], [95, 43], [58, 48], [61, 53],
    [58, 58], [61, 63], [50, 69], [57, 70], [64, 69], [70, 70], [59, 28], [34, 38], [88, 38]];
  function agujeros(c) { AGUJEROS.forEach(function (a) { c.beginPath(); c.arc(100 + (a[0] + 1 - 60) * 2.1, 100 + (a[1] + 1 - 46) * 2.1, 3.4, 0, 7); c.fill(); }); }
  function arco(c, r, ancho, hasta) { c.lineWidth = ancho; c.beginPath(); c.arc(100, 112, r, Math.PI * 0.8, Math.PI * (0.8 + 1.4 * hasta)); c.stroke(); }
  function texto(c, t, tam, y) { c.font = FUENTE.replace('%', tam); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, 100, y); }
  var FORMAS = {
    avion: [[avion, 'base', 0.8], [agujeros, 'alerta', 0.2]],
    barras: [[function (c) { c.fillRect(16, 52, 164, 34); }, 'acento', 0.52], [function (c) { c.fillRect(16, 112, 124, 34); }, 'frio', 0.4], [function (c) { c.fillRect(8, 40, 3, 120); }, 'base', 0.08]],
    medidor: [[function (c) { arco(c, 84, 3, 1); }, 'base', 0.2], [function (c) { arco(c, 64, 22, 0.97); }, 'acento', 0.6],
      [function (c) { var a = Math.PI * (0.8 + 1.4 * 0.97); c.lineWidth = 5; c.beginPath(); c.moveTo(100, 112); c.lineTo(100 + Math.cos(a) * 50, 112 + Math.sin(a) * 50); c.stroke(); c.beginPath(); c.arc(100, 112, 8, 0, 7); c.fill(); }, 'base', 0.2]],
    cifra: [[function (c) { texto(c, '64', 150, 104); }, 'base', 1]],
    listo: [[function (c) { c.lineWidth = 8; c.beginPath(); c.arc(100, 100, 82, 0, 7); c.stroke(); }, 'frio', 0.5], [function (c) { c.lineWidth = 20; c.beginPath(); c.moveTo(62, 102); c.lineTo(90, 130); c.lineTo(142, 72); c.stroke(); }, 'base', 0.5]],
    duda: [[function (c) { texto(c, '?', 190, 104); }, 'acento', 1]],
    firma: [[function (c) { c.fillRect(20, 150, 160, 2.5); }, 'base', 0.45],
      [function (c) { c.lineWidth = 3; c.beginPath(); c.moveTo(34, 138); c.bezierCurveTo(50, 96, 62, 96, 60, 136); c.bezierCurveTo(70, 100, 84, 104, 82, 134); c.bezierCurveTo(100, 108, 112, 118, 108, 136); c.bezierCurveTo(126, 120, 150, 122, 170, 128); c.stroke(); }, 'acento', 0.55]]
  };
  var puntosDe = {};
  function prepararFormas() { Object.keys(FORMAS).forEach(function (k) { puntosDe[k] = FORMAS[k].map(function (capa) { return { pts: muestrear(capa[0]), color: COL[capa[1]], parte: capa[2] }; }); }); }

  /* ---------- puntos ---------- */
  var ancho = 0, alto = 0, dpr = 1, P = [], N = 0;
  function medir() {
    dpr = Math.min(2, window.devicePixelRatio || 1); ancho = lienzo.clientWidth; alto = lienzo.clientHeight;
    lienzo.width = Math.round(ancho * dpr); lienzo.height = Math.round(alto * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function crearPuntos() {
    N = Math.max(900, Math.min(2200, Math.round(ancho * alto / 520))); P = [];
    for (var i = 0; i < N; i++) P.push({ x: azar() * ancho, y: azar() * alto, vx: (azar() - 0.5) * 30, vy: (azar() - 0.5) * 30, ux: 0, uy: 0, libre: true,
      k: 38 + azar() * 60, r: 0.8 + azar() * 1.5, fase: azar() * 6.28, espera: 0, c: COL.base.slice(), cd: COL.base });
  }
  /* Dónde y a qué tamaño se arma la forma. La firma del cierre va más abajo y más chica, bajo el título. */
  var centroY = 0.4, zoom = 1;
  function escala() { return zoom * Math.min(ancho * 0.84, alto * 0.5) / U; }
  function cx() { return ancho / 2; } function cy() { return alto * centroY; }

  /* Reparte los puntos en una forma. fuerza: cuánto estallan antes de volver (0 = se acomodan con calma). */
  function formar(nombre, fuerza) {
    var capas = puntosDe[nombre], orden = [], i;
    for (i = 0; i < N; i++) orden.push(i);
    for (i = N - 1; i > 0; i--) { var j = (azar() * (i + 1)) | 0, tmp = orden[i]; orden[i] = orden[j]; orden[j] = tmp; }
    var desde = 0;
    capas.forEach(function (capa, n) {
      var hasta = n === capas.length - 1 ? N : Math.min(N, desde + Math.round(N * capa.parte));
      for (var q = desde; q < hasta; q++) {
        var p = P[orden[q]], pt = capa.pts[(azar() * capa.pts.length) | 0];
        p.ux = pt[0] - U / 2 + azar() - 0.5; p.uy = pt[1] - U / 2 + azar() - 0.5; p.cd = capa.color; p.libre = false; p.espera = azar() * 0.45;
      }
      desde = hasta;
    });
    if (fuerza) estallar(fuerza);
  }
  function estallar(fuerza) {
    for (var i = 0; i < N; i++) {
      var p = P[i], dx = p.x - cx(), dy = p.y - cy(), d = Math.sqrt(dx * dx + dy * dy) || 1, v = fuerza * (220 + azar() * 560);
      p.vx += dx / d * v - dy / d * v * 0.7; p.vy += dy / d * v + dx / d * v * 0.7;
    }
  }
  function soltar() { for (var i = 0; i < N; i++) { P[i].libre = true; P[i].cd = COL.base; } }

  var sacudida = 0;
  function avanzar(dt, t) {
    var s = escala(), ox = cx(), oy = cy();
    for (var i = 0; i < N; i++) {
      var p = P[i];
      if (p.libre) {                                /* a la deriva, con un remolino lento */
        p.vx += (Math.sin(p.fase + t * 0.6 + p.y * 0.01) * 14 - p.vx * 0.6) * dt; p.vy += (Math.cos(p.fase + t * 0.5 + p.x * 0.01) * 14 - p.vy * 0.6) * dt;
      } else if (p.espera > 0) { p.espera -= dt; p.vx *= 1 - 1.6 * dt; p.vy *= 1 - 1.6 * dt; }
      else {                                        /* resorte hacia su lugar, con un temblor mínimo para que la forma respire */
        var tx = ox + p.ux * s + Math.sin(t * 1.7 + p.fase) * 1.2, ty = oy + p.uy * s + Math.cos(t * 1.3 + p.fase) * 1.2;
        p.vx += ((tx - p.x) * p.k - p.vx * 11) * dt; p.vy += ((ty - p.y) * p.k - p.vy * 11) * dt;
      }
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.libre) { if (p.x < -20) p.x = ancho + 20; if (p.x > ancho + 20) p.x = -20; if (p.y < -20) p.y = alto + 20; if (p.y > alto + 20) p.y = -20; }
      var f = Math.min(1, dt * 5); p.c[0] += (p.cd[0] - p.c[0]) * f; p.c[1] += (p.cd[1] - p.c[1]) * f; p.c[2] += (p.cd[2] - p.c[2]) * f;
    }
    sacudida = Math.max(0, sacudida - dt * 3);
  }
  function dibujar(limpio) {
    ctx.globalCompositeOperation = 'source-over';
    if (limpio) ctx.clearRect(0, 0, ancho, alto);
    else { ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = rgb([0, 0, 0], 0.3); ctx.fillRect(0, 0, ancho, alto); ctx.globalCompositeOperation = 'source-over'; }   /* estela */
    var dx = sacudida ? (Math.random() - 0.5) * 14 * sacudida : 0, dy = sacudida ? (Math.random() - 0.5) * 14 * sacudida : 0;
    for (var i = 0; i < N; i++) {
      var p = P[i], v = Math.abs(p.vx) + Math.abs(p.vy);
      ctx.fillStyle = rgb(p.c, p.libre ? 0.55 : 0.95);
      if (v > 260) {                                /* rápido: se estira en la dirección del movimiento */
        ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = p.r * 1.4; ctx.beginPath(); ctx.moveTo(p.x + dx, p.y + dy); ctx.lineTo(p.x + dx - p.vx * 0.022, p.y + dy - p.vy * 0.022); ctx.stroke();
      } else { ctx.beginPath(); ctx.arc(p.x + dx, p.y + dy, p.r, 0, 6.283); ctx.fill(); }
    }
  }

  /* ---------- lo que se lee ---------- */
  function palabras(t, base) { return t.split(' ').map(function (w, i) { return '<span style="animation-delay:' + (base + i * 0.055).toFixed(2) + 's">' + w + '</span>'; }).join(' '); }
  var frase = '';
  function decir(t) { frase = t; $('linea').innerHTML = t ? palabras(t, 0) : ''; }
  function preguntar(q) { $('linea').innerHTML = (frase ? frase + ' ' : '') + '<b class="q">' + palabras(q, 0) + '</b>'; }
  function ano(t) { var e = $('ano'); e.classList.remove('entra'); e.textContent = t; if (t) { void e.offsetWidth; e.classList.add('entra'); } }
  function destello() { if (reducir) return; var e = $('destello'); e.classList.remove('va'); void e.offsetWidth; e.classList.add('va'); }

  /* ---------- guion: qué pasa en cada segundo ---------- */
  function corte(forma, fuerza, etiqueta, texto, nota) { formar(forma, fuerza); ano(etiqueta); decir(texto); if (fuerza >= 1) { destello(); sacudida = 1; } tono(nota, 0.5, nota / 2); }
  var GUION = [
    [0, function () { soltar(); ano(''); decir('Detrás de cada dato,'); }],
    [1.3, function () { preguntar('alguien tuvo que decidir.'); }],
    [3.2, function () { corte('avion', 1, '1943', 'Los aviones vuelven con agujeros.', 110); }],
    [5.5, function () { preguntar('¿Dónde pones el blindaje?'); estallar(0.12); }],
    [8.2, function () { corte('barras', 1, '1936', 'Más de dos millones de boletas dan un ganador.', 123); }],
    [10.6, function () { preguntar('¿Les crees?'); estallar(0.12); }],
    [13.2, function () { corte('medidor', 1, '1983', 'Las cuentas de la hoja de carga cuadran.', 139); }],
    [15.6, function () { preguntar('¿Con eso despegas?'); estallar(0.12); }],
    /* 2017 es un caso con víctimas: los puntos se acomodan con calma, sin estallido ni destello. */
    [18.2, function () { corte('cifra', 0, '2017', 'Tras el huracán María, la cifra oficial de muertes es 64.', 98); }],
    [21.0, function () { preguntar('¿Te alcanza ese número?'); }],
    [23.6, function () { corte('listo', 1.2, 'HOY', 'Hoy la respuesta te llega en segundos.', 196); }],
    [26.8, function () { formar('duda', 1.5); destello(); sacudida = 1.4; preguntar('¿Quién la revisa?'); tono(70, 0.5, 35); }],
    [30.8, function () { centroY = 0.7; zoom = 0.7; formar('firma', 0.6); ano(''); decir(''); tono(392, 0.7); }],
    [T_CIERRE, function () { mostrarCierre(true); }]];
  var hecho = 0;

  /* ---------- sonido (apagado hasta que la persona lo pide) ---------- */
  var audio = null, conSonido = false, callado = false;
  function tono(f, d, hasta) {
    if (!conSonido || !audio || callado) return;
    var o = audio.createOscillator(), g = audio.createGain(), a = audio.currentTime;
    o.type = 'sine'; o.frequency.setValueAtTime(f, a); if (hasta) o.frequency.exponentialRampToValueAtTime(hasta, a + d);
    g.gain.setValueAtTime(0.18, a); g.gain.exponentialRampToValueAtTime(0.001, a + d); o.connect(g); g.connect(audio.destination); o.start(a); o.stop(a + d);
  }

  /* ---------- reloj y controles ---------- */
  var t = 0, antes = 0, corriendo = false, cuadro = 0;
  function mostrarCierre(si) { $('cierre').hidden = !si; $('pausa').disabled = si; $('saltar').disabled = si; if (si) $('linea').innerHTML = ''; }
  function tic(dt) { while (hecho < GUION.length && t + dt >= GUION[hecho][0]) GUION[hecho++][1](); avanzar(dt, t); t = Math.min(FIN, t + dt); }
  function paso(ahora) {
    cuadro = 0; if (!corriendo) return;
    var dt = Math.min(0.05, (ahora - antes) / 1000); antes = ahora;
    tic(dt); dibujar(false); $('avance').style.width = (100 * t / FIN) + '%';
    if (t >= FIN) { corriendo = false; return; }
    cuadro = requestAnimationFrame(paso);
  }
  function correr() { if (corriendo) return; corriendo = true; antes = performance.now(); if (!cuadro) cuadro = requestAnimationFrame(paso); }
  function reiniciar() { semilla = 20270108; centroY = 0.4; zoom = 1; t = 0; hecho = 0; sacudida = 0; frase = ''; mostrarCierre(false); $('linea').innerHTML = ''; crearPuntos(); }
  /* Lleva la intro a un segundo exacto recorriendo el guion sin dibujar (para Saltar y para las pruebas). */
  function ir(a) { corriendo = false; reiniciar(); callado = true; while (t < a - 1e-6) tic(Math.min(1 / 30, a - t)); callado = false; dibujar(true); $('avance').style.width = (100 * t / FIN) + '%'; }

  $('pausa').addEventListener('click', function () {
    var pausar = corriendo; this.textContent = pausar ? 'Seguir' : 'Pausa'; this.setAttribute('aria-pressed', pausar ? 'true' : 'false');
    if (pausar) corriendo = false; else correr();
  });
  $('sonido').addEventListener('click', function () {
    conSonido = !conSonido; this.textContent = 'Sonido: ' + (conSonido ? 'sí' : 'no'); this.setAttribute('aria-pressed', conSonido ? 'true' : 'false');
    try { if (conSonido && !audio) { var A = window.AudioContext || window.webkitAudioContext; if (A) audio = new A(); } if (audio && audio.state === 'suspended') audio.resume(); } catch (e) { conSonido = false; }
  });
  $('saltar').addEventListener('click', function () { ir(FIN); $('cierre').querySelector('a').focus(); });
  $('repetir').addEventListener('click', function () { $('pausa').textContent = 'Pausa'; $('pausa').setAttribute('aria-pressed', 'false'); corriendo = false; reiniciar(); dibujar(true); correr(); });
  window.addEventListener('resize', function () { medir(); if (!corriendo) dibujar(true); });
  window.__introCurso = { ir: ir, fin: FIN, t: function () { return t; }, puntos: function () { return N; } };

  function empezar() {
    medir(); prepararFormas(); reiniciar();
    if (reducir) {                                 /* sin movimiento: la última forma, el cierre y el guion completo a la vista */
      ir(FIN); lienzo.hidden = true; $('guion').hidden = false; ['pausa', 'saltar', 'sonido', 'repetir'].forEach(function (id) { $(id).hidden = true; });
    } else correr();
  }
  /* La cifra y el signo se dibujan con la tipografía del sitio: se espera a que cargue, pero no más de 1.2 s. */
  var listo = false; function unaVez() { if (!listo) { listo = true; empezar(); } }
  if (document.fonts && document.fonts.load) { document.fonts.load(FUENTE.replace('%', 40), '64?').then(unaVez, unaVez); setTimeout(unaVez, 1200); } else unaVez();
})();
