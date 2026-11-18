/* motor.js v2 — cinemática jugable · The Agentic Data Scientist
   Lee window.CASO (definido en casos/<id>/escenas.js) y arma la intro tipo videojuego:
   líneas de narración que avanzan solas, cámara con parallax, transiciones pixel (ligadas a cada caso),
   partículas, sacudidas, contadores, sonido 8 bits (apagado por defecto) e interacciones.
   Sin dependencias, sin cuentas, sin guardar nada: lo que el alumno elige aquí no sale de su navegador.
   La hipótesis que cuenta para calificar se registra en el cuaderno de Colab, no aquí.
   Movimiento reducido (prefers-reduced-motion): sin animación, sin avance automático, estados finales al instante.
   Material real del caso: si CASO.medios apunta a un medios.json, las escenas muestran fotos, recortes, documentos
   y video con g.archivo(id) y g.video(id); la ficha final lista sus créditos (ver casos/README.md). */
(function () {
  'use strict';

  var C = window.CASO;
  var raiz = document.getElementById('juego');
  if (!C || !raiz) return;

  var NS = 'http://www.w3.org/2000/svg';
  var reducir = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var auto = !reducir, sonidoOn = false, audio = null;
  var idx = 0, S = null, token = 0, tweens = [], parts = [], ultimo = 0;
  var MED = {}, MED_LISTA = [];
  var ETIQUETA = { foto: 'FOTO REAL', grabado: 'IMAGEN DE EPOCA', recorte: 'NOTICIA REAL', documento: 'DOCUMENTO REAL', video: 'VIDEO REAL' };
  var CERRAR = '<button type="button" class="archivo-x" aria-label="Cerrar el material de archivo">X</button>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  /* ---------- curvas de movimiento ---------- */
  var E = {
    lin: function (t) { return t; },
    sal: function (t) { return 1 - Math.pow(1 - t, 3); },
    ent: function (t) { return t * t * t; },
    sua: function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    reb: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    muelle: function (t) { return 1 - Math.exp(-6 * t) * Math.cos(14 * t); }
  };

  /* ---------- sonido 8 bits (apagado por defecto) ---------- */
  var SFX = {
    tic: [[880, 0.03, 'square']],
    paso: [[200, 0.04, 'square']],
    pop: [[520, 0.05, 'square'], [780, 0.06, 'square', 0.05]],
    puerta: [[130, 0.14, 'sawtooth'], ['r', 0.18, 0.05, 500, 0.02]],
    ok: [[523, 0.08, 'square'], [784, 0.14, 'square', 0.08]],
    mal: [[196, 0.12, 'square'], [147, 0.2, 'square', 0.1]],
    revela: [[392, 0.1, 'square'], [523, 0.1, 'square', 0.1], [659, 0.18, 'square', 0.2]],
    golpe: [[70, 0.22, 'square'], ['r', 0.25, 0.09, 600]],
    sello: [[60, 0.3, 'square'], ['r', 0.3, 0.12, 900]],
    whoosh: [['r', 0.35, 0.05, 1800]],
    pregunta: [[330, 0.12, 'square'], [392, 0.12, 'square', 0.12], [494, 0.24, 'square', 0.24]],
    moneda: [[988, 0.05, 'square'], [1319, 0.1, 'square', 0.05]]
  };
  var maestro = null;
  function asegurarAudio() {
    if (!audio) {
      audio = new (window.AudioContext || window.webkitAudioContext)();
      maestro = audio.createGain();
      maestro.gain.value = voz.habla ? 0.25 : 1;
      maestro.connect(audio.destination);
    }
    if (audio.state === 'suspended') audio.resume();
  }
  function tono(f, d, tipo, retraso) {
    if (!sonidoOn) return;
    try {
      asegurarAudio();
      var t0 = audio.currentTime + (retraso || 0);
      var o = audio.createOscillator(), g = audio.createGain();
      o.type = tipo || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(0.035, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      o.connect(g); g.connect(maestro);
      o.start(t0); o.stop(t0 + d);
    } catch (e) { /* sin audio: no pasa nada */ }
  }
  function ruido(d, vol, filtro, retraso) {
    try {
      asegurarAudio();
      var sr = audio.sampleRate, buf = audio.createBuffer(1, Math.max(1, Math.floor(sr * d)), sr), ch = buf.getChannelData(0);
      for (var i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length);
      var s = audio.createBufferSource(), g = audio.createGain(), f = audio.createBiquadFilter();
      s.buffer = buf; g.gain.value = vol; f.type = 'lowpass'; f.frequency.value = filtro || 800;
      s.connect(f); f.connect(g); g.connect(maestro);
      s.start(audio.currentTime + (retraso || 0));
    } catch (e) { /* sin audio */ }
  }
  function sfx(n) {
    if (!sonidoOn || !SFX[n]) return;
    SFX[n].forEach(function (p) {
      if (p[0] === 'r') ruido(p[1], p[2], p[3], p[4]); else tono(p[0], p[1], p[2], p[3]);
    });
  }

  /* ---------- voz narrada (apagada por defecto) ----------
     Cada línea tiene su audio en voz/<hash>.mp3, listado en voz/indice.json (lo genera scripts/tts_intros).
     Si falta el audio o no carga, lee la voz es-MX del navegador. Mientras habla, el sonido 8 bits baja
     y el avance automático espera a que termine la línea. */
  var voz = { on: false, habla: false, pista: {}, el: null, n: 0, luego: [] };
  function bajarSonido(si) {
    voz.habla = si;
    if (maestro) maestro.gain.setTargetAtTime(si ? 0.25 : 1, audio.currentTime, 0.08);
  }
  function callar(seguir) {
    voz.n += 1;
    if (voz.el) { voz.el.onended = voz.el.onerror = null; voz.el.pause(); voz.el = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    var pend = voz.luego; voz.luego = [];
    bajarSonido(false);
    if (seguir) pend.forEach(function (f) { f(); });
  }
  function hablar(textos) {
    callar();
    if (!voz.on || !textos.length) return;
    var n = voz.n, cola = textos.slice();
    bajarSonido(true);
    function decirUno() {
      var t = cola.shift(), hecho = false, guardia = 0;
      function acabar() {
        if (hecho || voz.n !== n) return;
        hecho = true; clearTimeout(guardia); voz.el = null;
        if (cola.length) { decirUno(); return; }
        callar(true);
      }
      function navegador() {
        var ss = window.speechSynthesis;
        if (!ss || !window.SpeechSynthesisUtterance) { acabar(); return; }
        var u = new window.SpeechSynthesisUtterance(t), vs = ss.getVoices();
        u.lang = 'es-MX';
        u.voice = vs.filter(function (v) { return v.lang === 'es-MX'; })[0] || vs.filter(function (v) { return /^es/i.test(v.lang); })[0] || null;
        u.onend = u.onerror = acabar;
        ss.speak(u);
      }
      /* si el navegador nunca avisa que terminó, el guion no se queda atorado */
      guardia = setTimeout(acabar, 3000 + t.length * 120);
      var src = voz.pista[t];
      if (!src || !window.Audio) { navegador(); return; }
      var el = voz.el = new window.Audio(src), fallo = false;
      var plan = function () { if (fallo || hecho || voz.n !== n) return; fallo = true; voz.el = null; navegador(); };
      el.onended = acabar; el.onerror = plan;
      var p = el.play(); if (p && p.catch) p.catch(plan);
    }
    decirUno();
  }
  /* corre fn cuando la voz termina la línea (de inmediato si no está hablando) */
  function trasVoz(fn) { if (voz.habla) voz.luego.push(fn); else fn(); }

  /* ---------- armazón ---------- */
  raiz.innerHTML =
    '<div class="sup">' +
      '<a class="mini" id="volver" href="' + esc(C.volver) + '" aria-label="Volver al sitio">&lt; SITIO</a>' +
      '<div class="fila">' +
        '<button class="mini" id="aut" type="button" aria-pressed="false">AUTO: SI</button>' +
        '<button class="mini" id="snd" type="button" aria-pressed="false">SONIDO: NO</button>' +
        '<button class="mini" id="voz" type="button" aria-pressed="false">VOZ: NO</button>' +
      '</div>' +
    '</div>' +
    '<div class="meta">' +
      '<div><h1 class="titulo">' + esc(C.titulo) + '</h1>' +
      '<div class="sub">CASO ' + esc(C.id) + ' &middot; INTRO ' + esc(C.duracionIntro) + '</div></div>' +
      '<div class="pips" id="pips" aria-hidden="true"></div>' +
    '</div>' +
    '<section class="escenario" id="escenario" aria-label="Escena"><div class="lienzo" id="lienzo"></div></section>' +
    '<section class="caja" id="caja" aria-label="Narración">' +
      '<p class="texto" id="texto" aria-hidden="true"><span class="vis"></span><span class="fan"></span></p>' +
      '<p class="sr" id="sr" aria-live="polite"></p>' +
      '<div class="cuenta" id="cuenta" aria-hidden="true"><i></i></div>' +
      '<div class="extra" id="extra"></div>' +
      '<nav class="nav" aria-label="Escenas">' +
        '<button class="btn sec" id="atras" type="button" aria-label="Escena anterior">&lt; ATRAS</button>' +
        '<button class="btn sec" id="saltar" type="button" aria-label="Saltar al final de la intro">SALTAR &gt;&gt;</button>' +
        '<button class="btn" id="sig" type="button" aria-label="Siguiente">SIGUIENTE &gt;</button>' +
      '</nav>' +
    '</section>' +
    '<p class="pie">Augmented Learning Labs &middot; The Agentic Data Scientist</p>';

  var $ = function (id) { return document.getElementById(id); };
  var esce = $('escenario'), lienzo = $('lienzo'), caja = $('caja'), extra = $('extra'), sr = $('sr'), pips = $('pips');
  var cuenta = $('cuenta'), vis = caja.querySelector('.vis'), fan = caja.querySelector('.fan');
  var atras = $('atras'), sig = $('sig'), saltar = $('saltar'), snd = $('snd'), aut = $('aut'), bvoz = $('voz');
  aut.textContent = 'AUTO: ' + (auto ? 'SI' : 'NO');
  aut.setAttribute('aria-pressed', String(auto));
  C.escenas.forEach(function () { pips.appendChild(document.createElement('span')).className = 'pip'; });

  /* ---------- bucle de animación ---------- */
  function bucle(now) {
    requestAnimationFrame(bucle);
    var dt = Math.min(100, now - (ultimo || now)); ultimo = now;
    for (var i = tweens.length - 1; i >= 0; i--) {
      var tw = tweens[i];
      var p = Math.min(1, (now - tw.t0) / tw.dur);
      tw.fn(tw.ease(p), p);
      if (p >= 1) { tweens.splice(i, 1); if (tw.fin) tw.fin(); }
    }
    for (var j = parts.length - 1; j >= 0; j--) {
      var q = parts[j];
      q.t += dt;
      if (q.t >= q.vida) { if (q.el.parentNode) q.el.parentNode.removeChild(q.el); parts.splice(j, 1); continue; }
      q.vy += q.g * dt / 1000;
      q.x += q.vx * dt / 1000; q.y += q.vy * dt / 1000;
      q.el.setAttribute('x', Math.round(q.x)); q.el.setAttribute('y', Math.round(q.y));
      q.el.setAttribute('opacity', (1 - q.t / q.vida).toFixed(2));
    }
  }
  requestAnimationFrame(bucle);

  /* ---------- texto con máquina de escribir ---------- */
  function terminarTecleo() {
    if (!S || !S.tecleo) return;
    clearInterval(S.tecleo); S.tecleo = null; vis.textContent = S.texto;
    var f = S.alTerminar; S.alTerminar = null; if (f) f();
  }
  function escribir(t, alTerminar) {
    if (S.tecleo) { clearInterval(S.tecleo); S.tecleo = null; }
    S.texto = t; S.alTerminar = alTerminar || null;
    vis.textContent = ''; fan.textContent = t; sr.textContent = t;
    if (reducir) { vis.textContent = t; if (alTerminar) alTerminar(); S.alTerminar = null; return; }
    var i = 0, tok = S.tok;
    S.tecleo = setInterval(function () {
      if (!S || S.tok !== tok) return;
      i += 1; vis.textContent = t.slice(0, i);
      if (i % 4 === 0) tono(740, 0.02);
      if (i >= t.length) terminarTecleo();
    }, 17);
  }
  $('texto').addEventListener('click', function () { if (S && S.tecleo) terminarTecleo(); else siguiente(); });

  /* ---------- cámara con parallax ---------- */
  function aplicarCam() {
    var c = S.cam, w = Math.round(c.w), x = Math.round(c.x), y = Math.round(c.y);
    S.svg.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + (w * 9 / 16));
    S.capas.forEach(function (l) {
      l.el.setAttribute('transform', 'translate(' + (x * (1 - l.f)).toFixed(1) + ' ' + (y * (1 - l.f)).toFixed(1) + ')');
    });
  }

  /* ---------- interfaz que reciben las escenas ---------- */
  var g = {
    E: E,
    get reducir() { return reducir; },
    get extra() { return extra; },
    get svg() { return S.svg; },
    q: function (id) {
      var el = S.svg.querySelector('[data-id="' + id + '"]');
      if (el && el._x === undefined) {
        var m = /translate\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)\s*\)/.exec(el.getAttribute('transform') || '');
        el._x = m ? parseFloat(m[1]) : 0; el._y = m ? parseFloat(m[2]) : 0;
      }
      return el;
    },
    qa: function (sel) { return [].slice.call(S.svg.querySelectorAll(sel)); },
    sfx: sfx,
    tono: tono,

    anim: function (ms, fn, ease, fin) {
      if (reducir || ms <= 0) { fn(1, 1); if (fin) fin(); return null; }
      var tok = S.tok;
      var tw = { t0: performance.now(), dur: ms, fn: function (a, b) { if (S && S.tok === tok) fn(a, b); }, ease: ease || E.lin, fin: function () { if (fin && S && S.tok === tok) fin(); } };
      tweens.push(tw);
      return tw;
    },
    espera: function (ms, fn) {
      var tok = S.tok;
      if (reducir) { fn(); return 0; }
      var id = setTimeout(function () { if (S && S.tok === tok) fn(); }, ms);
      S.timers.push(id); return id;
    },
    cada: function (ms, fn) {
      if (reducir) return 0;
      var tok = S.tok, n = 0;
      var id = setInterval(function () { if (S && S.tok === tok) fn(n++); }, ms);
      S.timers.push(id); return id;
    },

    camara: function (x, y, w, ms, ease, fin) {
      var c = S.cam, a = { x: c.x, y: c.y, w: c.w };
      if (S.camTw) { var k = tweens.indexOf(S.camTw); if (k >= 0) tweens.splice(k, 1); S.camTw = null; }
      S.camTw = g.anim(ms, function (t) {
        c.x = a.x + (x - a.x) * t; c.y = a.y + (y - a.y) * t; c.w = a.w + (w - a.w) * t; aplicarCam();
      }, ease || E.sua, fin);
    },
    fijarCamara: function (x, y, w) { S.cam.x = x; S.cam.y = y; S.cam.w = w; aplicarCam(); },

    pos: function (el, x, y) { el._x = x; el._y = y; el.setAttribute('transform', 'translate(' + Math.round(x) + ' ' + Math.round(y) + ')'); },
    mover: function (el, x, y, ms, ease, fin) {
      var x0 = el._x || 0, y0 = el._y || 0;
      g.anim(ms, function (t) { g.pos(el, x0 + (x - x0) * t, y0 + (y - y0) * t); }, ease || E.sal, fin);
    },
    op: function (el, v) { el.setAttribute('opacity', v); },
    aparecer: function (el, ms) { g.anim(ms || 300, function (t) { el.setAttribute('opacity', t); }, E.lin); },
    pop: function (el, ms, fin) {
      var bb = el.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height, base = el.getAttribute('transform') || '';
      el.setAttribute('opacity', 1);
      g.anim(ms || 380, function (t) {
        var s = Math.max(0.01, t);
        el.setAttribute('transform', base + ' translate(' + cx + ' ' + cy + ') scale(' + s.toFixed(3) + ') translate(' + (-cx) + ' ' + (-cy) + ')');
      }, E.reb, function () { if (base) el.setAttribute('transform', base); else el.removeAttribute('transform'); if (fin) fin(); });
      sfx('pop');
    },
    /* sello que cae: empieza grande y transparente y golpea */
    golpear: function (el, ms, fin) {
      var bb = el.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2, base = el.getAttribute('transform') || '';
      el.setAttribute('opacity', 0);
      g.anim(ms || 260, function (t) {
        var s = 3 - 2 * t;
        el.setAttribute('opacity', Math.min(1, t * 2.5));
        el.setAttribute('transform', base + ' translate(' + cx + ' ' + cy + ') scale(' + s.toFixed(3) + ') translate(' + (-cx) + ' ' + (-cy) + ')');
      }, E.ent, function () {
        if (base) el.setAttribute('transform', base); else el.removeAttribute('transform');
        el.setAttribute('opacity', 1);
        g.sacudir(); g.destello('var(--tq-blanco)', 0.5); sfx('sello');
        if (fin) fin();
      });
    },
    vaiven: function (el, dx, periodo, fase) {
      if (reducir) return;
      var t0 = performance.now();
      var base = el._x || 0, by = el._y || 0;
      g.cada(80, function () {
        var s = Math.sin(((performance.now() - t0) / periodo + (fase || 0)) * 6.2832);
        g.pos(el, base + Math.round(s * dx), by);
      });
    },
    sacudir: function () {
      if (reducir) return;
      esce.classList.remove('tiembla'); void esce.offsetWidth; esce.classList.add('tiembla');
    },
    destello: function (color, alfa) {
      if (reducir) return;
      var d = document.createElement('div');
      d.className = 'flash'; d.style.background = color || '#fff'; d.style.opacity = alfa == null ? 0.8 : alfa;
      esce.appendChild(d);
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 420);
    },
    chispas: function (x, y, o) {
      if (reducir || !S.parG) return;
      o = o || {};
      var n = o.n || 8, cols = [].concat(o.color || 'var(--tq-papel)');
      for (var i = 0; i < n && parts.length < 160; i++) {
        var r = document.createElementNS(NS, 'rect'), tam = o.tam || 1;
        r.setAttribute('width', tam); r.setAttribute('height', tam); r.setAttribute('fill', cols[i % cols.length]);
        S.parG.appendChild(r);
        var ang = (o.ang != null ? o.ang : Math.random() * 6.2832) + (o.abre ? (Math.random() - 0.5) * o.abre : 0);
        var v = (o.v || 22) * (0.5 + Math.random());
        parts.push({ el: r, x: x, y: y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, g: o.g == null ? 45 : o.g, vida: (o.vida || 700) * (0.6 + Math.random() * 0.6), t: 0 });
      }
    },
    contar: function (el, de, a, ms, fmt, ease) {
      var ult = null;
      g.anim(ms, function (t) {
        var v = Math.round(de + (a - de) * t);
        if (v !== ult) { ult = v; el.textContent = fmt ? fmt(v) : String(v); }
      }, ease || E.lin);
    },
    portada: function (l1, l2, fin) {
      if (reducir) { if (fin) fin(); return; }
      var p = document.createElement('div');
      p.className = 'portada';
      p.innerHTML = '<b style="--n:' + l1.length + '">' + esc(l1) + '</b><b class="n2" style="--n:' + l2.length + '">' + esc(l2) + '</b>';
      esce.appendChild(p);
      sfx('revela');
      g.espera(1900, function () {
        p.classList.add('sale');
        setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 520);
        if (fin) fin();
      });
    },

    /* texto, controles y flujo */
    decir: function (t) {
      if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; }
      pararCuenta();
      callar();
      escribir(t);
    },
    enTocar: function (fn) { S.alTocar = fn; },
    html: function (h) { var d = document.createElement('div'); d.innerHTML = h; extra.appendChild(d.firstChild); },
    boton: function (txt, fn, cls) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'btn late ' + (cls || ''); b.textContent = txt;
      b.addEventListener('click', function () { b.classList.remove('late'); fn(b); });
      extra.appendChild(b); return b;
    },
    opciones: function (lista, fn) {
      var gr = document.createElement('div');
      gr.className = 'opciones'; gr.setAttribute('role', 'group'); gr.setAttribute('aria-label', 'Elige una opción');
      lista.forEach(function (t, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'opcion'; b.setAttribute('aria-pressed', 'false'); b.textContent = t;
        b.addEventListener('click', function () {
          [].forEach.call(gr.children, function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          sfx('ok');
          fn(i, t);
        });
        gr.appendChild(b);
      });
      extra.appendChild(gr);
    },
    eco: function (txt) {
      var p = extra.querySelector('.eco');
      if (!p) { p = document.createElement('p'); p.className = 'eco'; p.setAttribute('role', 'status'); extra.appendChild(p); }
      p.textContent = txt;
    },
    /* ---------- material real del caso (medios.json) ----------
       Sin el medio (no existe, no está "listo" o no cargó), la escena sigue igual: devuelve null. */
    medio: function (id) { return MED[id] || null; },
    archivo: function (id, o) {
      o = o || {};
      var m = MED[id];
      if (!m || m.tipo === 'video') return null;
      g.quitarArchivo(true);
      var f = document.createElement('figure');
      f.className = 'archivo ' + (o.lado || 'der') + ' t-' + m.tipo + (reducir ? ' quieto' : '');
      f.innerHTML = '<span class="archivo-tag">' + ETIQUETA[m.tipo] + '</span>' + CERRAR +
        '<div class="archivo-marco"><img src="' + esc(m.archivo) + '" alt="' + esc(m.alt) + '" decoding="async"></div>' +
        '<figcaption>' + (m.pie ? '<b>' + esc(m.pie) + '</b>' : '') + '<small>' + esc(m.credito) + ' &middot; ' + esc(m.licencia) + '</small></figcaption>';
      if (o.ancho) f.style.setProperty('--ancho', o.ancho);
      f.querySelector('.archivo-x').addEventListener('click', function () { g.quitarArchivo(); });
      esce.appendChild(f);
      sfx('pop');
      /* con movimiento reducido se queda hasta que la persona la cierra o cambia la escena */
      if (o.ms && !reducir) g.espera(o.ms, function () { g.quitarArchivo(); });
      return f;
    },
    /* video: fachada con póster local; YouTube (modo de privacidad mejorada) solo se carga si la persona lo pide */
    video: function (id, o) {
      o = o || {};
      var m = MED[id];
      if (!m || m.tipo !== 'video') return null;
      g.quitarArchivo(true);
      var f = document.createElement('figure');
      f.className = 'archivo video ' + (o.lado || 'centro') + (reducir ? ' quieto' : '');
      f.innerHTML = '<span class="archivo-tag">' + ETIQUETA.video + '</span>' + CERRAR +
        '<div class="archivo-marco"><button type="button" class="archivo-play" aria-label="Reproducir el video: ' + esc(m.alt) + '">' +
          '<img src="' + esc(m.poster) + '" alt="" decoding="async"><span aria-hidden="true">&#9654;</span></button></div>' +
        '<figcaption>' + (m.pie ? '<b>' + esc(m.pie) + '</b>' : '') + '<small>' + esc(m.credito) + ' &middot; ' + esc(m.licencia) +
          ' &middot; al reproducir se carga YouTube</small></figcaption>';
      if (o.ancho) f.style.setProperty('--ancho', o.ancho);
      f.querySelector('.archivo-x').addEventListener('click', function () { g.quitarArchivo(); });
      f.querySelector('.archivo-play').addEventListener('click', function () {
        /* quien pone el video decide cuándo seguir: la escena deja de avanzar sola */
        if (S) { S.tocado = true; if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; } pararCuenta(); }
        var fr = document.createElement('iframe');
        fr.src = m.video + (m.video.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';
        fr.title = m.alt; fr.allow = 'autoplay; encrypted-media; picture-in-picture'; fr.allowFullscreen = true;
        fr.referrerPolicy = 'strict-origin-when-cross-origin';
        this.parentNode.replaceChild(fr, this);
        sig.classList.add('late');
      });
      esce.appendChild(f);
      sfx('pop');
      return f;
    },
    quitarArchivo: function (ya) {
      [].forEach.call(esce.querySelectorAll('.archivo'), function (a) {
        if (ya || reducir) { a.parentNode.removeChild(a); return; }
        a.classList.add('sale');
        setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 420);
      });
    },

    /* la escena interactiva terminó: ya se puede seguir (el alumno decide cuándo) */
    listo: function (sinAuto) {
      S.listo = true;
      if (S.e.final) return;
      sig.classList.remove('sec');
      sig.classList.add('late');
      if (auto && !sinAuto) preparaAvance();
    }
  };

  /* ---------- narración por líneas ---------- */
  function dwell(t) { return 1000 + t.length * 38; }

  /* pausa de lectura tras escribir la línea i; con VOZ espera además a que la voz la termine */
  function esperarLectura(i) {
    var tok = S.tok, faltan = 2;
    function uno() { if (--faltan === 0 && S && S.tok === tok && S.linea === i) mostrarLinea(i + 1); }
    S.timerLinea = setTimeout(uno, voz.on ? 600 : dwell(S.e.lineas[i].t));
    trasVoz(function () { setTimeout(uno, voz.on ? 350 : 0); });
  }

  function pararCuenta() {
    if (S.timerCuenta) { clearTimeout(S.timerCuenta); S.timerCuenta = 0; }
    var i = cuenta.firstChild; i.style.transition = 'none'; i.style.width = '0';
    cuenta.classList.remove('on');
  }

  function mostrarLinea(i) {
    var l = S.e.lineas[i];
    S.linea = i;
    if (S.e.final) sig.hidden = i >= S.e.lineas.length - 1;
    if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; }
    hablar([l.t]);
    escribir(l.t, function () {
      var ultima = S.e.lineas.length - 1;
      if (S.e.final && i >= Math.min(auto ? 1 : 0, ultima) && !extra.querySelector('.ficha')) fichaFinal();
      if (i < ultima) {
        if (auto) esperarLectura(i);
      } else {
        S.fin = true;
        if (S.e.final) return;
        if (!S.e.interactiva && !S.tocado) preparaAvance(); else if (S.listo || S.tocado) sig.classList.add('late');
      }
    });
    if (l.al) l.al(g);
  }

  function preparaAvance() {
    if (!auto) { sig.classList.add('late'); return; }
    var tok = S.tok;
    if (voz.habla) { trasVoz(function () { if (S && S.tok === tok && auto) preparaAvance(); }); return; }
    var ms = Math.max(2200, dwell(S.texto) * 0.6);
    var i = cuenta.firstChild;
    cuenta.classList.add('on');
    i.style.transition = 'none'; i.style.width = '0'; void i.offsetWidth;
    i.style.transition = 'width ' + ms + 'ms steps(24)'; i.style.width = '100%';
    S.timerCuenta = setTimeout(function () { if (S && S.tok === tok) ir(idx + 1); }, ms);
  }

  function siguiente() {
    if (!S || S.trans) return;
    if (S.tecleo) { terminarTecleo(); return; }
    pararCuenta();
    if (S.linea < S.e.lineas.length - 1) { mostrarLinea(S.linea + 1); return; }
    ir(idx + 1);
  }

  /* ---------- escena final: ficha, qué sigue y botón al caso (página o Colab) ---------- */
  var DESPUES_PAGINA = ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de ver los datos.',
    'Firmas tu decisión antes de saber qué pasó.'];
  var DESPUES_COLAB = ['Se abre Google Colab en otra pestaña.',
    { t: 'Guardas tu copia y ejecutas la primera celda.', u: '../../colab.html', n: 'Ver la guía de Colab' },
    'Apuestas antes de ver los datos y firmas tu decisión.'];
  function fichaFinal() {
    var herr = '';
    if (C.herramientas && C.herramientas.length) {
      herr = '<div><p class="herr-t">HERRAMIENTAS QUE PRACTICARAS</p><ul class="herr">' +
        C.herramientas.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></div>';
    } else if (C.herramientasOcultas) {
      var n = C.herramientasOcultas, b = '';
      for (var i = 0; i < n; i++) b += '<li class="bloq" aria-hidden="true">? ? ?</li>';
      herr = '<div><p class="herr-t">HERRAMIENTAS</p><ul class="herr">' + b + '</ul>' +
        '<p class="nota" style="margin-top:8px">Este caso guarda en secreto sus herramientas: se revelan al resolverlo.</p></div>';
    }
    var fuentes = (C.fuentes || []).map(function (f) {
      return '<li><a href="' + esc(f.u) + '" target="_blank" rel="noopener noreferrer">' + esc(f.t) + '</a>' + (f.n ? ' &mdash; ' + esc(f.n) : '') + '</li>';
    }).join('');
    var creditos = MED_LISTA.map(function (m) {
      return '<li><a href="' + esc(m.fuente) + '" target="_blank" rel="noopener noreferrer">' + esc(m.pie || m.alt) + '</a> &mdash; ' +
        esc(m.credito) + ' (' + esc(m.licencia) + ')</li>';
    }).join('');
    var d = document.createElement('div');
    d.className = 'ficha entra';
    /* Qué sigue después de la intro (C.despues): 2 o 3 títulos cortos para que el paso al caso no tome por sorpresa.
       Cada título es un texto o { t, u, n }: texto, enlace de ayuda (por ejemplo la guía de Colab) y su rótulo.
       Si el caso no define ninguno, se usa el texto por omisión según siga en la página o en Colab. */
    var pasos = (C.despues || []).length ? C.despues : (C.resolver ? DESPUES_PAGINA : DESPUES_COLAB);
    var despues = '<div class="despues"><p class="herr-t">QUE SIGUE</p><ol>' + pasos.map(function (p) {
      if (typeof p === 'string') return '<li>' + esc(p) + '</li>';
      return '<li>' + esc(p.t) + (p.u ? ' <a href="' + esc(p.u) + '" target="_blank" rel="noopener noreferrer">' + esc(p.n || 'Ver cómo') +
        '<span class="sr"> (se abre en una pestaña nueva)</span></a>' : '') + '</li>';
    }).join('') + '</ol></div>';
    /* C.resolver: el caso se resuelve en el sitio (clases 1 a 4). Si no, en Colab (C.colab). */
    var cta = C.resolver
      ? '<a class="btn grande" id="cta" href="' + esc(C.resolver) + '">RESOLVER EL CASO &gt;</a>' +
        '<p class="nota">El caso se resuelve aquí mismo, en el sitio. Entra con tu cuenta de Google para que tu avance cuente; la intro no guarda nada.</p>'
      : '<a class="btn grande" id="cta" href="' + esc(C.colab) + '" target="_blank" rel="noopener noreferrer">' +
        'ABRIR EL CASO EN COLAB &gt;<span class="sr"> (se abre en una pestaña nueva)</span></a>' +
        '<p class="nota">El caso completo se resuelve en Google Colab, y ahí se registra tu avance. Esta página no guarda nada.</p>';
    d.innerHTML =
      '<dl class="tiempos"><div><dt>INTRO</dt><dd>' + esc(C.duracionIntro) + '</dd></div>' +
      '<div><dt>' + (C.resolver ? 'CASO' : 'CUADERNO') + '</dt><dd>' + esc(C.duracionCaso || C.duracionCuaderno) + '</dd></div></dl>' +
      herr + despues + (C.aviso ? '<p class="nota"><b>Aviso de contenido.</b> ' + esc(C.aviso) + '</p>' : '') + cta +
      '<p class="nota">La narración (botón VOZ) es voz sintética, generada con OpenAI TTS; si falta un audio, lee la voz de tu navegador.</p>' +
      (fuentes ? '<details class="fuentes"><summary>Fuentes de las cifras</summary><ul>' + fuentes + '</ul></details>' : '') +
      (creditos ? '<details class="fuentes"><summary>Material de archivo y créditos</summary><ul>' + creditos + '</ul></details>' : '') +
      '<button class="enlace" id="repetir" type="button">Ver la intro otra vez</button>';
    extra.appendChild(d);
    $('repetir').addEventListener('click', function () { ir(0); });
  }

  /* ---------- escenas y transiciones ---------- */
  function limpiar() {
    callar();
    tweens.length = 0;
    parts.forEach(function (q) { if (q.el.parentNode) q.el.parentNode.removeChild(q.el); });
    parts.length = 0;
    if (S) {
      S.timers.forEach(function (id) { clearTimeout(id); clearInterval(id); });
      if (S.tecleo) clearInterval(S.tecleo);
      if (S.timerLinea) clearTimeout(S.timerLinea);
      if (S.timerCuenta) clearTimeout(S.timerCuenta);
    }
    [].forEach.call(esce.querySelectorAll('.flash,.portada,.archivo'), function (n) { n.parentNode.removeChild(n); });
    esce.classList.remove('tiembla');
  }

  function montarEscena(n, desdeCortina) {
    token += 1;
    limpiar();
    idx = n;
    var e = C.escenas[n];
    if (!e.lineas) e.lineas = [{ t: e.texto }];
    var cam = e.camara || { x: 0, y: 0, w: 160 };
    S = { n: n, e: e, tok: token, timers: [], linea: -1, tecleo: null, alTerminar: null, listo: false, fin: false, trans: false,
      cam: { x: cam.x, y: cam.y, w: cam.w }, alTocar: null, texto: '', timerLinea: 0, timerCuenta: 0 };
    lienzo.innerHTML = '<svg viewBox="0 0 160 90" role="' + (e.interactiva ? 'group' : 'img') + '" aria-label="' + esc(e.alt) + '" preserveAspectRatio="xMidYMid meet">' +
      e.arte() + '<g data-parts="1"></g></svg>';
    S.svg = lienzo.firstChild;
    S.parG = S.svg.querySelector('[data-parts]');
    S.capas = [].map.call(S.svg.querySelectorAll('[data-capa]'), function (el) { return { el: el, f: parseFloat(el.getAttribute('data-capa')) }; });
    aplicarCam();
    extra.innerHTML = '';
    pararCuenta();
    sig.classList.remove('late');
    sig.classList.toggle('sec', !!e.interactiva);
    [].forEach.call(pips.children, function (p, i) { p.className = 'pip' + (i < n ? ' hecho' : '') + (i === n ? ' activo' : ''); });
    atras.hidden = n === 0;
    sig.hidden = !!e.final && (reducir || e.lineas.length <= 1);
    saltar.hidden = !!e.final;
    if (e.montar) e.montar(g);
    var empezar = function () {
      if (reducir) {
        escribir(e.lineas.map(function (l) { return l.t; }).join(' '));
        hablar(e.lineas.map(function (l) { return l.t; }));
        e.lineas.forEach(function (l) { if (l.al) l.al(g); });
        S.fin = true;
        if (!e.final && !e.interactiva) sig.classList.add('late');
      } else {
        mostrarLinea(0);
      }
      if (e.final && reducir) fichaFinal();
    };
    if (desdeCortina) g.espera(260, empezar); else empezar();
  }

  function cortina(dir, fin) {
    var c = esce.querySelector('.cortina');
    if (!c) {
      c = document.createElement('div'); c.className = 'cortina';
      for (var i = 0; i < 16; i++) { var b = document.createElement('i'); b.style.setProperty('--i', i); c.appendChild(b); }
      esce.appendChild(c);
    }
    c.className = 'cortina ' + dir;
    setTimeout(function () { if (dir === 'abre' && c.parentNode) c.parentNode.removeChild(c); if (fin) fin(); }, 320 + 16 * 14);
  }

  /* ---------- transiciones pixel entre escenas ----------
     Cada escena elige cómo se entra a ella: e.transicion, o CASO.transiciones[n], o CASO.transicion, o 'persiana'.
     Valor: un nombre ('giro') o un objeto ({ tipo: 'iris', x: 80, y: 45, texto: 'CASO 4.1' }).
     Todas se dibujan en una capa encima del escenario (160 x 90, coordenadas de pantalla): primero cubren
     (k de 0 a 1), se monta la escena nueva debajo y después descubren (k de 1 a 0).
     Sin movimiento reducido no hay transición: la escena cambia en seco. Sin destellos ni parpadeo rápido. */
  var R_ = function (x, y, w, h, c, extra) { return window.Px.R(x, y, w, h, c, extra); };
  function plano(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase(); }
  function azarT(s) { s = s || 7; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function escalon(k, n) { return Math.round(Math.max(0, Math.min(1, k)) * n) / n; }
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function papel() {
    var h = R_(-60, -40, 120, 80, 'var(--tq-papel)') + R_(-60, 38, 120, 2, 'var(--tq-papel-sombra)') + R_(-54, -34, 108, 12, 'var(--tq-tinta)');
    for (var i = 0; i < 6; i++) h += R_(-54, -12 + i * 7, 50, 3, 'var(--tq-papel-sombra)') + R_(4, -12 + i * 7, 50, 3, 'var(--tq-papel-sombra)');
    return h + R_(-54, 30, 108, 4, 'var(--tq-salsa)');
  }

  var TRANS = {
    /* ----- generales ----- */
    persiana: { ms: 360, pausa: 80, pintar: function (k) {
      var o = '', q = escalon(k, 24);
      for (var i = 0; i < 16; i++) {
        var h = Math.round(Math.max(0, Math.min(1, q * 1.6 - i * 0.04)) * 90);
        if (h > 0) o += R_(i * 10, i % 2 ? 90 - h : 0, 10, h, i % 2 ? 'var(--tq-noche)' : 'var(--tq-sombra)');
      }
      return o;
    } },
    mosaico: { ms: 420, pausa: 80, pintar: function (k) {
      var o = '', q = escalon(k, 20), az = azarT(19);
      for (var y = 0; y < 18; y++) {
        var x0 = -1;
        for (var x = 0; x <= 32; x++) {
          var on = x < 32 && (BAYER[(y % 4) * 4 + (x % 4)] / 16 * 0.75 + az() * 0.25) < q;
          if (on && x0 < 0) x0 = x;
          if (!on && x0 >= 0) { o += R_(x0 * 5, y * 5, (x - x0) * 5, 5, 'var(--tq-sombra)'); x0 = -1; }
        }
      }
      return o;
    } },
    iris: { ms: 480, pausa: 100, pintar: function (k, f, t, op) {
      var cx = op.x != null ? op.x : 80, cy = op.y != null ? op.y : 45, q = escalon(k, 22);
      var rMax = Math.ceil(Math.sqrt(Math.pow(Math.max(cx, 160 - cx), 2) + Math.pow(Math.max(cy, 90 - cy), 2))) + 2;
      var r = Math.round((1 - q) * rMax), o = '';
      if (r <= 0) return R_(0, 0, 160, 90, 'var(--tq-sombra)');
      for (var y = 0; y < 90; y += 2) {
        var dy = y + 1 - cy;
        if (Math.abs(dy) >= r) { o += R_(0, y, 160, 2, 'var(--tq-sombra)'); continue; }
        var hw = Math.round(Math.sqrt(r * r - dy * dy) / 2) * 2;
        if (cx - hw > 0) o += R_(0, y, cx - hw, 2, 'var(--tq-sombra)');
        if (cx + hw < 160) o += R_(cx + hw, y, 160 - cx - hw, 2, 'var(--tq-sombra)');
      }
      return o;
    } },
    barrido: { ms: 420, pausa: 60, pintar: function (k, fase) {
      var q = escalon(k, 30), o = '', borde, j, y;
      if (fase === 'cubre') {
        borde = Math.round((q * 176 - 8) / 2) * 2;
        if (borde > 0) o += R_(0, 0, borde, 90, 'var(--tq-sombra)');
        for (j = 0; j < 4; j++) for (y = 0; y < 90; y += 2) if (((y / 2) + j) % (j + 2) === 0) o += R_(borde + j * 2, y, 2, 2, 'var(--tq-sombra)');
        if (borde > 0 && borde < 160) o += R_(borde - 1, 0, 1, 90, 'var(--tq-comal)');
      } else {
        borde = Math.round(((1 - q) * 176 - 8) / 2) * 2;
        if (borde < 160) o += R_(Math.max(0, borde), 0, 160 - Math.max(0, borde), 90, 'var(--tq-sombra)');
        for (j = 0; j < 4; j++) for (y = 0; y < 90; y += 2) if (((y / 2) + j) % (j + 2) === 0) o += R_(borde - 2 - j * 2, y, 2, 2, 'var(--tq-sombra)');
        if (borde > 0 && borde < 160) o += R_(borde, 0, 1, 90, 'var(--tq-comal)');
      }
      return o;
    } },
    giro: { ms: 360, pausa: 60, pintar: function (k) {
      var w = Math.round(escalon(k, 10) * 80);
      if (w <= 0) return '';
      return R_(0, 0, w, 90, 'var(--tq-sombra)') + R_(160 - w, 0, w, 90, 'var(--tq-sombra)') +
        (w < 80 ? R_(w, 0, 1, 90, 'var(--tq-comal)') + R_(159 - w, 0, 1, 90, 'var(--tq-comal)') : R_(79, 0, 2, 90, 'var(--tq-comal)'));
    } },
    titulo: { ms: 380, pausa: 900, pintar: function (k, f, t, op) {
      var h = Math.round(escalon(k, 15) * 45), o = '';
      if (h <= 0) return '';
      o = R_(0, 0, 160, h, 'var(--tq-sombra)') + R_(0, 90 - h, 160, h, 'var(--tq-sombra)');
      if (h < 45) return o + R_(0, h - 1, 160, 1, 'var(--tq-comal)') + R_(0, 90 - h, 160, 1, 'var(--tq-comal)');
      if (op.texto) o += window.Px.texto(80, 47, plano(op.texto), 7, 'var(--tq-crema)') + R_(56, 53, 48, 1, 'var(--tq-comal)');
      return o;
    } },

    /* ----- ligadas a un caso ----- */
    puerta: { ms: 520, pausa: 140, son: 'puerta', pintar: function (k) {
      var w = Math.round(escalon(k, 16) * 80), o = '';
      if (w <= 0) return '';
      [0, 1].forEach(function (lado) {
        var x = lado ? 160 - w : 0;
        o += R_(x, 0, w, 90, 'var(--tq-madera)');
        for (var px = 0; px < 2; px++) {
          var bx = lado ? x + 10 + px * 34 : x + w - 70 + px * 34;
          if (bx > x - 4 && bx + 26 < x + w + 4) o += R_(bx, 12, 26, 28, 'var(--tq-cafe)') + R_(bx + 2, 14, 22, 24, 'var(--tq-madera)') + R_(bx, 52, 26, 28, 'var(--tq-cafe)') + R_(bx + 2, 54, 22, 24, 'var(--tq-madera)');
        }
        if (w > 6) o += R_(lado ? x + 3 : x + w - 6, 44, 3, 6, 'var(--tq-comal)');
      });
      o += R_(0, 0, 160, 4, 'var(--tq-piedra)') + R_(0, 86, 160, 4, 'var(--tq-piedra)');
      if (w >= 80) o += R_(79, 0, 2, 90, 'var(--tq-cafe)');
      return o;
    } },
    periodico: { ms: 600, pausa: 160, pintar: function (k, f, t, op) {
      var paso = Math.round(escalon(k, 16) * 16);
      if (paso === 0) return '';
      var s = (0.1 + (paso / 16) * 1.6).toFixed(2);
      return '<g transform="translate(80 45) rotate(' + paso * 45 + ') scale(' + s + ')">' + papel() +
        window.Px.texto(0, -25, plano(op.texto || 'EL DIARIO'), 6, 'var(--tq-papel)') + '</g>';
    } },
    humo: { ms: 620, pausa: 140, pintar: function (k, fase) {
      var q = escalon(k, 24), o = '', tonos = ['var(--tq-crema-suave)', 'var(--tq-papel-sombra)', 'var(--tq-papel)'];
      for (var j = 0; j < 3; j++) for (var i = 0; i < 5; i++) {
        var n = j * 5 + i, r = Math.round(Math.max(0, Math.min(1, q * 1.35 - ((n * 7) % 5) * 0.06)) * 27);
        if (r > 1) o += window.Px.disco(16 + i * 32 + (j % 2) * 8, 14 + j * 31, r, tonos[n % 3]);
      }
      var ax = fase === 'cubre' ? Math.round(-40 + k * 110) : Math.round(70 + (1 - k) * 130), ay = 30;
      o += '<g transform="translate(' + ax + ' ' + ay + ')">' + R_(0, 4, 30, 5, 'var(--tq-noche)') + R_(26, 2, 6, 5, 'var(--tq-noche)') +
        R_(8, 0, 12, 13, 'var(--tq-noche)') + R_(-2, 0, 4, 6, 'var(--tq-noche)') + R_(22, 5, 4, 2, 'var(--tq-vidrio)') + '</g>';
      return o;
    } },
    agua: { ms: 600, pausa: 140, pintar: function (k, f, t) {
      var h = Math.round(escalon(k, 26) * 104), o = '', fase = Math.round(t / 120);
      if (h <= 0) return '';
      for (var i = 0; i < 40; i++) {
        var y = 90 - h + Math.round(2 * Math.sin(i * 0.7 + fase * 0.6));
        o += R_(i * 4, y, 4, 2, 'var(--tq-vidrio)') + R_(i * 4, y + 2, 4, Math.max(0, 92 - y), 'var(--tq-anil)');
        if (i % 7 === 3 && h > 20) o += R_(i * 4 + 1, y + 10 + ((fase * 3 + i * 5) % Math.max(1, h - 14)), 2, 2, 'var(--tq-vidrio)');
      }
      return o;
    } },
    apagon: { ms: 700, pausa: 200, pintar: function (k) {
      var paso = Math.round(escalon(k, 30) * 30), o, az = azarT(41);
      if (paso === 0) return '';
      o = R_(0, 0, 160, 90, 'var(--tq-sombra)', 'opacity="' + Math.min(1, paso / 18).toFixed(2) + '"');
      o += R_(18, 46, 124, 14, 'var(--tq-noche)') + R_(30, 42, 96, 4, 'var(--tq-noche)') + R_(10, 50, 8, 6, 'var(--tq-noche)');
      for (var i = 0; i < 46; i++) {
        var x = 20 + Math.floor(az() * 120), y = 44 + Math.floor(az() * 14), umbral = 6 + Math.floor(az() * 22);
        if (paso < umbral) o += R_(x, y, 1, 1, 'var(--tq-comal)');
      }
      return o;
    } },
    /* 13.11: los indicadores se quedan en blanco uno a uno (el de combustible primero, como en la cabina real) y todo se apaga */
    cabina: { ms: 760, pausa: 160, pintar: function (k, fase, t) {
      var paso = Math.round(escalon(k, 24) * 24), o = '';
      if (paso === 0) return '';
      if (fase === 'descubre') return R_(0, 0, 160, 90, 'var(--tq-sombra)', 'opacity="' + (paso / 24).toFixed(2) + '"');
      o = '<g opacity="' + Math.min(1, paso / 6).toFixed(2) + '">' + R_(0, 0, 160, 90, 'var(--tq-panel)') + R_(0, 0, 160, 10, 'var(--tq-noche)') + R_(0, 70, 160, 20, 'var(--tq-noche)');
      [[40, 'FUEL'], [80, 'ALT'], [120, 'SPD']].forEach(function (gg, i) {
        var vivo = i === 0 ? paso < 5 : paso < 12 + i * 3;
        o += window.Px.disco(gg[0], 40, 16, 'var(--tq-noche)') + window.Px.disco(gg[0], 40, 14, vivo ? 'var(--tq-ventana-noche)' : 'var(--tq-sombra)');
        if (vivo) {
          var ang = [10, 30, -20][i], rad = (ang - 90) * Math.PI / 180;
          for (var r = 2; r < 12; r += 2) o += R_(Math.round(gg[0] + Math.cos(rad) * r), Math.round(40 + Math.sin(rad) * r), 2, 2, 'var(--tq-comal)');
        }
        o += window.Px.texto(gg[0], 64, gg[1], 4, vivo ? 'var(--tq-crema-suave)' : 'var(--tq-vacio)');
      });
      o += '</g>';
      if (paso >= 18) o += R_(0, 0, 160, 90, 'var(--tq-sombra)', 'opacity="' + ((paso - 17) / 7).toFixed(2) + '"');
      return o;
    } },
    escarcha: { ms: 640, pausa: 160, pintar: function (k, f, t, op) {
      var paso = Math.round(escalon(k, 28) * 28), o, az = azarT(23);
      if (paso === 0) return '';
      var q = paso / 28;
      o = R_(0, 0, 160, 90, 'var(--tq-vidrio)', 'opacity="' + (0.15 + 0.35 * q).toFixed(2) + '"');
      for (var b = 0; b < 4; b++) {
        var cx = b % 2 ? 160 : 0, cy = b > 1 ? 90 : 0, sx = b % 2 ? -1 : 1, sy = b > 1 ? -1 : 1;
        for (var n = 0; n < 16; n++) {
          var ang = az() * Math.PI / 2, largo = Math.round((24 + az() * 70) * q), dx = Math.cos(ang) * sx, dy = Math.sin(ang) * sy;
          for (var r = 0; r < largo; r += 3) {
            var x = Math.round(cx + dx * r), y = Math.round(cy + dy * r);
            o += R_(x, y, 2, 2, r % 9 === 0 ? 'var(--tq-papel)' : 'var(--tq-crema-suave)');
            if (r % 12 === 6) o += R_(x - 2, y + 1, 2, 1, 'var(--tq-papel)') + R_(x + 2, y - 1, 2, 1, 'var(--tq-papel)');
          }
        }
      }
      if (paso >= 26) o += R_(0, 0, 160, 90, 'var(--tq-crema-suave)', 'opacity=".85"') + (op.texto ? window.Px.texto(80, 49, plano(op.texto), 8, 'var(--tq-ventana-noche)') : '');
      return o;
    } },
    sobres: { ms: 640, pausa: 140, pintar: function (k, fase) {
      var q = escalon(k, 30), o = '', az = azarT(77);
      for (var i = 0; i < 110; i++) {
        var x = Math.floor(az() * 150) - 4, yf = Math.floor(az() * 96) - 8, ret = az() * 0.45, col = az() < 0.5;
        var tt = Math.min(1, Math.max(0, (q - ret) / 0.55));
        if (tt <= 0) continue;
        var y = fase === 'cubre' ? Math.round(-20 + (yf + 20) * (1 - Math.pow(1 - tt, 3))) : Math.round(yf - (1 - tt) * 120);
        var ladeo = Math.round((1 - tt) * 6) * (i % 2 ? 1 : -1);
        o += '<g transform="translate(' + x + ' ' + y + ') rotate(' + ladeo + ' 10 7)">' + R_(0, 0, 22, 14, 'var(--tq-papel)') + R_(0, 13, 22, 1, 'var(--tq-papel-sombra)') +
          R_(1, 1, 10, 1, 'var(--tq-papel-sombra)') + R_(11, 1, 10, 1, 'var(--tq-papel-sombra)') + R_(9, 6, 4, 4, col ? 'var(--tq-anil)' : 'var(--tq-comal)') + '</g>';
      }
      if (q >= 1) o = R_(0, 0, 160, 90, 'var(--tq-papel-sombra)') + o;
      return o;
    } }
  };

  var capaT = null, rafT = 0;
  function opcionesTrans(n) {
    var e = C.escenas[n] || {}, v = e.transicion || (C.transiciones && C.transiciones[n]) || C.transicion || 'persiana';
    var op = typeof v === 'string' ? { tipo: v } : v;
    if (!TRANS[op.tipo]) op = { tipo: 'persiana' };
    return op;
  }
  function correrTrans(op, fase, fin) {
    var tr = TRANS[op.tipo];
    if (!capaT || !capaT.parentNode) {
      capaT = document.createElement('div'); capaT.className = 'trans'; capaT.setAttribute('aria-hidden', 'true');
      capaT.innerHTML = '<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"></svg>';
      esce.appendChild(capaT);
    }
    var svg = capaT.firstChild, t0 = null, ult = null;
    cancelAnimationFrame(rafT);
    function paso(now) {
      if (t0 === null) t0 = now;
      var u = Math.min(1, (now - t0) / tr.ms), k = fase === 'cubre' ? u : 1 - u;
      var html = tr.pintar(k, fase, now - t0, op);
      if (html !== ult) { svg.innerHTML = html; ult = html; }
      if (u < 1) { rafT = requestAnimationFrame(paso); return; }
      if (fase === 'descubre' && capaT && capaT.parentNode) { capaT.parentNode.removeChild(capaT); capaT = null; }
      if (fin) fin();
    }
    rafT = requestAnimationFrame(paso);
  }
  function transicion(n, entre) {
    var op = opcionesTrans(n), tr = TRANS[op.tipo];
    if (op.tipo === 'titulo' && !op.texto) op.texto = 'CASO ' + C.id;
    sfx(tr.son || 'whoosh');
    correrTrans(op, 'cubre', function () {
      setTimeout(function () { entre(); correrTrans(op, 'descubre'); }, tr.pausa || 100);
    });
  }

  function ir(n) {
    if (n < 0 || n >= C.escenas.length) return;
    if (S && S.trans) return;
    if (!S || reducir) { montarEscena(n, false); return; }
    S.trans = true;
    pararCuenta();
    if (window.Px && window.requestAnimationFrame) transicion(n, function () { montarEscena(n, true); });
    else { sfx('whoosh'); cortina('cierra', function () { montarEscena(n, true); cortina('abre'); }); }
  }

  /* ---------- toques sobre el dibujo (ratón, dedo o teclado) ---------- */
  function tocar(n) {
    if (!S || !S.alTocar) return;
    /* si la persona se pone a explorar, la escena deja de avanzar sola: ella decide cuándo seguir */
    S.tocado = true;
    pararCuenta();
    if (S.fin && !S.e.final) sig.classList.add('late');
    S.alTocar(n.getAttribute('data-hot'), n);
  }
  esce.addEventListener('click', function (e) {
    var n = e.target.closest && e.target.closest('[data-hot]');
    if (n) tocar(n);
  });
  esce.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var n = e.target.closest && e.target.closest('[data-hot]');
    if (n) { e.preventDefault(); tocar(n); }
  });

  /* ---------- controles ---------- */
  sig.addEventListener('click', siguiente);
  atras.addEventListener('click', function () { ir(idx - 1); });
  saltar.addEventListener('click', function () { ir(C.escenas.length - 1); });
  snd.addEventListener('click', function () {
    sonidoOn = !sonidoOn;
    snd.textContent = 'SONIDO: ' + (sonidoOn ? 'SI' : 'NO');
    snd.setAttribute('aria-pressed', String(sonidoOn));
    sfx('pop');
  });
  bvoz.addEventListener('click', function () {
    voz.on = !voz.on;
    bvoz.textContent = 'VOZ: ' + (voz.on ? 'SI' : 'NO');
    bvoz.setAttribute('aria-pressed', String(voz.on));
    /* al encenderla lee la línea en pantalla; al apagarla, el guion sigue sin esperar */
    if (voz.on && S && S.texto) hablar(reducir ? S.e.lineas.map(function (l) { return l.t; }) : [S.texto]); else callar(true);
  });
  aut.addEventListener('click', function () {
    auto = !auto;
    aut.textContent = 'AUTO: ' + (auto ? 'SI' : 'NO');
    aut.setAttribute('aria-pressed', String(auto));
    if (!auto) {
      if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; }
      pararCuenta();
      if (S.fin && !S.e.final) sig.classList.add('late');
    } else if (S && !S.tecleo) {
      if (S.fin && !S.e.interactiva && !S.e.final) preparaAvance();
      else if (!S.fin) esperarLectura(S.linea);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''))) return;
    if (e.key === 'ArrowRight' && !sig.hidden) siguiente();
    else if (e.key === 'ArrowLeft' && !atras.hidden) ir(idx - 1);
  });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) ultimo = 0; });

  /* para pruebas automáticas: window.__intro.ir(n) */
  window.__intro = { ir: ir, g: g, estado: function () { return S; }, medios: function () { return MED_LISTA.slice(); } };

  /* arranque: si el caso declara su material real, se carga antes de la primera escena (máximo 1.5 s de espera) */
  if (window.fetch) {
    fetch('voz/indice.json').then(function (r) { return r.ok ? r.json() : null; }).then(function (ix) {
      ((ix && ix.lineas) || []).forEach(function (l) { if (l && l.t && l.archivo) voz.pista[l.t] = 'voz/' + l.archivo; });
    }).catch(function () { /* sin audios: la voz del navegador lee las líneas */ });
  }
  var arrancado = false;
  function arrancar() { if (arrancado) return; arrancado = true; ir(0); }
  if (C.medios && window.fetch) {
    var espera = setTimeout(arrancar, 1500);
    fetch(C.medios).then(function (r) { return r.ok ? r.json() : null; }).then(function (m) {
      ((m && m.items) || []).forEach(function (it) {
        if (it && it.estado === 'listo' && it.id) { MED[it.id] = it; MED_LISTA.push(it); }
      });
    }).catch(function () { /* sin material: la intro sigue igual */ }).then(function () { clearTimeout(espera); arrancar(); });
  } else {
    arrancar();
  }
})();
